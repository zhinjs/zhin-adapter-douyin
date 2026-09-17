import { ClientEndpoint } from 'zhin.js/adapter'
import type {
  EndpointChannel,
  EndpointControl,
  EndpointManagement,
  EndpointPendingRequest,
  EndpointSendRequest,
} from 'zhin.js/adapter'
import type { EndpointContentPort, EndpointContentResolveContext } from 'zhin.js/adapter'
import { buildNotice, buildRequest, senderFromId, type LoginAssist } from '@zhin.js/core'
import type {
  ConversationMessage,
  ConversationReference,
  ConversationRef,
  ConversationResolution,
  ForwardEntry,
  ForwardSegment,
  MediaRef,
  MentionSegment,
  ReplySegment,
  Segment,
  SegmentBase,
  TextSegment,
} from '@zhin.js/im-contract'
import { formatCompact, getAdapterLogger, truncatePreview } from '@zhin.js/logger'
import { join } from 'node:path'
import type { CapabilityId } from 'zhin.js'
import type { Http } from './http.js'
import { setupDevice, type DesktopDeviceIdentity } from './device.js'
import { self, twid, warmup } from './warmup.js'
import { Im } from './im/client.js'
import type {
  ChatMessage,
  ConversationAddress,
  InboundMessage,
  NoticeEvent,
  ParsedMessageContent,
  RequestEvent,
  SendMessageReference,
  SendMessageResponse,
} from './im/types.js'
import type { TextMention } from './im/content.js'
import { Store, localRestore } from './store.js'
import type { Rec } from './store.js'
import type { Qs } from './qr.js'
import { runQrLogin } from './login.js'
import { inConv, outAddr, groupAddr } from './protocol.js'
import type { EpCfg } from './protocol.js'

export interface Opts {
  readonly id: CapabilityId
  readonly config: EpCfg
  readonly http: Http
  readonly store: Store
  readonly loginAssist: LoginAssist
}

/** 入站事件去重阀（notice/request 瞬时风暴防护） */
const SIDE_EVENT_DEDUPE_HOLD_MILLIS = 30_000

/** 出站媒体段（image/video/file/audio，Extract 对 SegmentBase 联合无效故显式声明） */
type MediaSendSegment = {
  type: 'image' | 'video' | 'file' | 'audio'
  data: { media: MediaRef; alt?: string; duration?: number; name?: string }
  platform?: Readonly<Record<string, unknown>>
}

/** 入站 parsed 内容 → canonical Segment[]（文本/图片/视频/文件/语音/合并转发）。 */
export function inboundToSegments (message: InboundMessage): Segment[] {
  const parsed = message.parsed
  const segments: Segment[] = []
  switch (parsed.kind) {
    case 'text':
    case 'emoji':
    case 'link':
    case 'share':
    case 'user':
      if (parsed.text) segments.push({ type: 'text', data: { text: parsed.text } })
      break
    case 'image': {
      const url = parsed.image.originUrls[0] ?? parsed.image.largeUrls[0] ?? parsed.image.mediumUrls[0]
      if (url) segments.push({ type: 'image', data: { media: { kind: 'url', value: url } } })
      break
    }
    case 'video': {
      const url = parsed.video.checkPics?.[0] ?? ''
      segments.push({
        type: 'video',
        data: {
          media: { kind: 'url', value: url },
          ...(parsed.text ? { alt: parsed.text } : {}),
        },
      })
      break
    }
    case 'audio': {
      const url = parsed.audio.urls[0]
      if (url) segments.push({ type: 'audio', data: { media: { kind: 'url', value: url } } })
      break
    }
    case 'file': {
      const file = parsed.file
      segments.push({
        type: 'file',
        data: { media: { kind: 'url', value: file.uri, file_name: file.name } },
      })
      break
    }
    case 'forward': {
      const entries: ForwardEntry[] = parsed.nodes.map(node => ({
        actor: { id: node.uid, displayName: node.nickname },
        timestamp: node.createTime ? node.createTime * 1000 : undefined,
        segments: [{ type: 'text', data: { text: node.text } }],
      }))
      segments.push({
        type: 'forward',
        data: { forward_id: message.serverMessageId ?? '', title: '[合并转发]', entries },
      })
      break
    }
    default:
      if (message.text) segments.push({ type: 'text', data: { text: message.text } })
      break
  }
  return segments
}

/** 将入站原始消息归一到 zhin IncomingMessage。conversation.endpoint.id 必须是 CapabilityId（框架按 record id 路由），endpointId 为实例名。 */
function inboundToIncoming (capabilityKey: string, instanceKey: string, message: InboundMessage) {
  const conversation = inConv(capabilityKey, {
    conversationId: message.conversationId,
    conversationShortId: message.conversationShortId,
    conversationType: message.conversationType as 1 | 2,
  }) as ConversationRef
  const replyTo = message.reference ? { id: message.reference.referencedMessageId } : undefined
  return Object.freeze({
    conversation,
    message: { conversation, id: message.serverMessageId ?? '' },
    content: message.text,
    segments: inboundToSegments(message),
    sender: senderFromId(message.senderUid, undefined),
    endpointId: instanceKey,
    replyTo,
    metadata: Object.freeze({
      msgType: message.messageType,
      conversationId: message.conversationId,
      conversationShortId: message.conversationShortId,
      conversationType: message.conversationType,
      index: message.indexInConversation,
      ...(message.reference ? { referenceHint: message.reference.hint } : {}),
    }),
  })
}

/**
 * Douyin IM endpoint：连接 = ImClient WS 生命周期；入站 message/notice/request 归一后
 * 走 ClientEndpoint 事件门闩（open 前缓冲，close 后丢弃）。
 */
export class DouyinEndpoint extends ClientEndpoint<Im> {
  readonly #logger: ReturnType<typeof getAdapterLogger>
  readonly #options: Opts
  readonly #loginOwner = Object.freeze({})
  readonly #messageContent = new Map<string, ConversationMessage>()
  readonly #sideSeen = new Map<string, number>()
  #client: Im | undefined
  #started = false
  #bound = false

  constructor (options: Opts) {
    super()
    this.#options = options
    this.#logger = getAdapterLogger('douyin', options.id)
  }

  /** 原生客户端；未登录时为 undefined（框架 start/emit 均读取该值，不可抛错）。 */
  get client (): Im {
    return this.#client as Im
  }

  /** 出站控制面取客户端，未登录时给出友好错误。 */
  #needClient (): Im {
    if (!this.#client) throw new Error(`douyin endpoint「${this.endpointName}」未登录`)
    return this.#client
  }

  get endpointName (): string {
    return this.#options.config.id
  }

  /* -- 生命周期 ----------------------------------------------------------- */

  async start (signal: AbortSignal): Promise<void> {
    if (this.#started) return
    this.#started = true
    signal.addEventListener('abort', () => this.stop(), { once: true })
    const record = await this.#restoreRecord()
    if (!record) {
      return
    }
    await this.#connect(record)
    this.#logger.info(`connected (im websocket) | uid: ${record.platformUid}`)
    // 旧 session.json 可能是 passport 默认昵称 + mosaic 占位头像，恢复后异步刷新为真实资料
    void this.#refreshStoredProfile(record.platformUid)
  }

  open (): void {
    super.open()
  }

  stop (): void {
    if (!this.#started && !this.#bound) return
    this.#started = false
    if (this.#client) this.#client.stop()
  }

  /* -- 登录与恢复 ----------------------------------------------------------- */

  /** 由「抖音登录」命令触发：恢复本地会话，否则扫码登录并落盘；onQr/onVerifyUrl/onMfa 用于把二维码图/验证链接/验证码输入接到命令会话。 */
  async login (
    onQr?: (image: string, url?: string) => void,
    onVerifyUrl?: (url: string) => void,
    onMfa?: (info: { maskedMobile?: string; kind?: 'sms' | 'password' }) => string | Promise<string>,
    onStatus?: (status: string) => void,
  ): Promise<string> {
    const name = this.endpointName
    // 保留旧连接直至新会话就绪：登录期间命令的二维码/提示回复仍须经 send() 送达（karin 同款：扫码不杀旧 ws）
    const wasActive = !!this.#client
    const record = await this.#restoreRecord()
    if (record && !wasActive) {
      await this.#connect(record)
      this.#logger.info(formatCompact({ op: 'restore', uid: record.platformUid }))
      return `douyin「${name}」已恢复本地会话（uid=${record.platformUid}）`
    }
    // 登录前置（对齐参考实现）：护照预热(设备认证凭据) → 注册设备签发 DID → ttwid 预热。
    // 恒为 status=new 的根因是匿名 device_id=0 + 浏览器 UA，服务端无法把 App 扫码确认绑定到本会话。
    await warmup(this.#options.http).catch(() => undefined)
    let identity: DesktopDeviceIdentity | undefined
    try {
      identity = await setupDevice(join(this.#options.store.accountsDirectory, 'device.json'), this.#options.http)
      this.#logger.info(formatCompact({ op: 'device', id: identity.deviceId, iid: identity.installId, ua: this.#options.http.getUserAgent() }))
    } catch (error) {
      this.#logger.warn(`device register skipped: ${error instanceof Error ? error.message : String(error)}`)
    }
    await twid(this.#options.http).catch(() => undefined)
    const session = await runQrLogin({
      http: this.#options.http,
      assist: this.#options.loginAssist,
      adapter: 'douyin',
      endpointKey: this.#options.config.id,
      owner: this.#loginOwner,
      logger: this.#logger,
      onQr,
      onVerifyUrl,
      onMfa,
      onStatus,
    })
    // 对齐参考实现 finishLogin：passport 的昵称是"用户xxx"默认名、avatar_url 是 mosaic 占位，
    // 需用桌面 IM 自我资料（GET /aweme/v1/web/user/profile/self/）的真实昵称/头像覆盖后再落盘
    const profile = await self(this.#options.http).catch((error) => {
      this.#logger.debug(`[douyin] self profile fetch skipped: ${error instanceof Error ? error.message : String(error)}`)
      return undefined
    })
    if (profile) {
      session.userData = {
        ...session.userData,
        ...(profile.nickname ? { screen_name: profile.nickname, name: profile.nickname } : {}),
        ...(profile.avatar ? { avatar_url: profile.avatar } : {}),
      }
      this.#logger.info(formatCompact({ op: 'self_profile', uid: session.platformUid, nickname: profile.nickname }))
    }
    this.#saveSession(session, identity)
    const deviceId = identity?.deviceId ?? this.#options.store.ensureDeviceId(session.platformUid)
    // 新会话就绪后才替换连接：先停旧 ws、解除旧事件绑定，再建新 client，避免 WS 残留
    if (this.#client) {
      this.#release?.()
      this.#release = undefined
      this.#bound = false
      this.#client.stop()
      this.#client = undefined
    }
    this.#client = this.#buildClient(session.platformUid, session.cookies, deviceId)
    this.#bind()
    await this.#client.start()
    return `抖音账号 ${session.platformUid}(${name}) 登录成功`
  }

  /** 就绪连接：注入会话凭据 → 应用设备信息 → 建 client → 绑定事件 → 启 WS → 打印加载统计。 */
  async #connect (record: Rec): Promise<void> {
    // 恢复的连接必须把会话 cookie 重新注入 HTTP 客户端，否则 imapi 网关无法识别会话
    this.#options.http.setCookies(record.session.cookies)
    if (record.session.msToken) this.#options.http.setMsToken(record.session.msToken)
    this.#applyDevice(record)
    this.#client = this.#buildClient(record.platformUid, record.session.cookies, record.session.deviceId)
    this.#bind()
    await this.#client.start()
  }

  async #restoreRecord (): Promise<Rec | undefined> {
    const store = this.#options.store
    const configured = this.#options.config.uid
    const account = configured
      ? store.load(configured)
      : store.list().sort((a, b) => b.updatedAt.localeCompare(a.updatedAt))[0]
    return account && localRestore(account) === undefined ? account : undefined
  }

  #applyDevice (record: Rec): void {
    if (record.deviceProfile) {
      this.#options.http.setDevice(record.deviceProfile)
      return
    }
    const deviceId = this.#options.store.ensureDeviceId(record.platformUid)
    this.#options.http.setDevice({ deviceId, installId: '0', guid: this.#options.http.guid })
  }

  #buildClient (uid: string, cookies: string, deviceId?: string): Im {
    return new Im({ http: this.#options.http, userId: uid, cookies, deviceId })
  }

  #saveSession (session: Qs, deviceProfile?: DesktopDeviceIdentity): void {
    const store = this.#options.store
    const uid = session.platformUid
    const prev = store.load(uid)
    const now = new Date().toISOString()
    store.save(uid, {
      platformUid: uid,
      session: {
        cookies: session.cookies,
        msToken: this.#options.http.getMsToken(),
        deviceId: deviceProfile?.deviceId ?? store.ensureDeviceId(uid),
      },
      ...(session.userData
        ? {
            userData: session.userData as Record<string, unknown>,
            screenName: session.userData.screen_name ?? session.userData.name,
            avatarUrl: session.userData.avatar_url,
          }
        : {}),
      ...(prev?.ticketGuard ? { ticketGuard: prev.ticketGuard } : {}),
      ...(deviceProfile
        ? { deviceProfile }
        : prev?.deviceProfile
          ? { deviceProfile: prev.deviceProfile }
          : {}),
      createdAt: prev?.createdAt ?? now,
      updatedAt: now,
    })
  }

  /** 恢复连接后异步刷新本地会话的真实昵称/头像并回写 store（失败仅 debug，不阻断连接） */
  async #refreshStoredProfile (uid: string): Promise<void> {
    try {
      const prev = this.#options.store.load(uid)
      if (!prev) return
      const prevName = String(prev.userData?.screen_name ?? '')
      const prevAvatar = String(prev.userData?.avatar_url ?? '')
      // 已是真实昵称/头像（非护照默认名「用户xxx」、非 mosaic 占位）则跳过，避免每次重连重复拉取
      if (!/^用户\d+$/.test(prevName) && prevAvatar && !prevAvatar.includes('mosaic')) return
      const profile = await self(this.#options.http)
      if (!profile.nickname && !profile.avatar) return
      const userData = { ...(prev.userData ?? {}) }
      if (profile.nickname) {
        userData.screen_name = profile.nickname
        userData.name = profile.nickname
      }
      if (profile.avatar) userData.avatar_url = profile.avatar
      this.#options.store.save(uid, {
        ...prev,
        userData,
        screenName: String(userData.screen_name ?? prev.screenName ?? ''),
        avatarUrl: String(userData.avatar_url ?? prev.avatarUrl ?? ''),
        updatedAt: new Date().toISOString(),
      })
      this.#logger.info(formatCompact({ op: 'self_profile_refresh', uid, nickname: profile.nickname }))
    } catch (error) {
      this.#logger.debug(`[douyin] self profile refresh skipped: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /* -- 事件桥 -------------------------------------------------------------- */

  #bind (): void {
    if (this.#bound) return
    const client = this.#client
    if (!client) return
    this.#bound = true
    const onMessage = (message: InboundMessage): void => {
      void this.#deliverMessage(message).catch(error => {
        this.#logger.warn(formatCompact({ op: 'deliver_message_failed', error: String(error) }))
      })
    }
    const onNotice = (event: NoticeEvent): void => { void this.#deliverNotice(event).catch(() => undefined) }
    const onRequest = (event: RequestEvent): void => { void this.#deliverRequest(event).catch(() => undefined) }
    client.on('message', onMessage)
    client.on('notice', onNotice)
    client.on('request', onRequest)
    this.#release = () => {
      client.off('message', onMessage)
      client.off('notice', onNotice)
      client.off('request', onRequest)
    }
  }

  #release?: () => void

  /* -- 入站分发 ------------------------------------------------------------ */

  async #deliverMessage (message: InboundMessage): Promise<void> {
    const key = this.#options.config.id
    const incoming = inboundToIncoming(String(this.#options.id), key, message)
    this.#logger.info(
      `recv ${incoming.conversation.kind}:${incoming.conversation.id}`
      + ` from ${message.senderUid}`
      + ` | ${truncatePreview(message.text ?? '', 80)}`,
    )
    const id = message.serverMessageId ?? ''
    this.#messageContent.set(id, {
      ref: { conversation: incoming.conversation, id },
      actor: incoming.sender,
      segments: incoming.segments,
      timestamp: Number(message.createTime ?? Date.now()) * 1000,
      ...(message.reference
        ? { replyTo: { conversation: incoming.conversation, id: message.reference.referencedMessageId } }
        : {}),
    })
    try {
      await this.emit('message.receive', incoming)
    } catch (error) {
      this.#logger.warn(formatCompact({ op: 'message_emit_failed', id, error: String(error) }))
    }
  }

  async #deliverNotice (event: NoticeEvent): Promise<void> {
    const key = this.#options.config.id
    const uid = String((event as { uid?: unknown }).uid ?? '')
    const sceneId = String((event as { sceneId?: string }).sceneId ?? '')
    const sceneType =
      (event as { sceneType?: string }).sceneType ?? (event.type.startsWith('group') ? 'group' : 'friend')
    const dedupeKey = `notice:${event.type}:${sceneId}:${uid}`
    if (this.#dedupe(dedupeKey)) return
    const id = `douyin:${event.type}:${sceneId}:${uid}`
    const notice = buildNotice(event, {
      $adapter: 'douyin' as never,
      $endpoint: key,
      $type: 'notice' as const,
      $id: id,
      $scene_id: sceneId,
      $scene_type: sceneType,
      $sub_type: event.type.replace(/^group\.|^friend\.|^conversation\.|^message\./, ''),
      $actor: senderFromId(uid, String((event as { nickname?: unknown }).nickname ?? '')),
      $timestamp: Date.now(),
    })
    void this.emit('notice.receive', notice).catch(error => {
      this.#logger.warn(formatCompact({ op: 'notice_emit_failed', id, error: String(error) }))
    })
  }

  async #deliverRequest (event: RequestEvent): Promise<void> {
    const key = this.#options.config.id
    const scene = event.type === 'friend.request' ? 'friend' : 'group'
    const sceneId = String(event.type === 'friend.request'
      ? (event as { applicantUid?: unknown }).applicantUid ?? ''
      : (event as { conversationShortId?: unknown }).conversationShortId ?? '')
    const uid = String((event as { applicantUid?: unknown }).applicantUid ?? '')
    const id = `douyin:${event.type}:${sceneId}:${uid}`
    const reviewId = event.type === 'friend.request'
      ? `friend:${uid}`
      : `group:${String((event as { requestId?: unknown }).requestId ?? '')}`
    const dedupeKey = `request:${event.type}:${sceneId}:${uid}`
    if (this.#dedupe(dedupeKey)) return
    const request = buildRequest(event, {
      $adapter: 'douyin' as never,
      $endpoint: key,
      $type: 'request' as const,
      $id: id,
      $scene_id: sceneId,
      $scene_type: scene,
      $sub_type: 'add',
      $actor:
        senderFromId(uid, String((event as { applicantNickname?: unknown }).applicantNickname ?? ''))
        ?? { id: uid, name: '' },
      $comment: String((event as { message?: unknown }).message ?? ''),
      $timestamp: Date.now(),
      $approve: async () => { await this.#reviewRequest(reviewId, true) },
      $reject: async () => { await this.#reviewRequest(reviewId, false) },
    })
    void this.emit('request.receive', request).catch(error => {
      this.#logger.warn(formatCompact({ op: 'request_emit_failed', id, error: String(error) }))
    })
  }

  #dedupe (key: string): boolean {
    const now = Date.now()
    const last = this.#sideSeen.get(key) ?? 0
    if (now - last < SIDE_EVENT_DEDUPE_HOLD_MILLIS) return true
    this.#sideSeen.set(key, now)
    return false
  }

  /* -- 出站 ---------------------------------------------------------------- */

  async send ({ conversation, payload }: EndpointSendRequest): Promise<string> {
    this.#needClient()
    const address = outAddr(conversation)
    this.#logger.debug(formatCompact({ op: 'send_payload', raw: truncatePreview(JSON.stringify(payload), 300) }))
    const segments: readonly Segment[] = typeof payload === 'string'
      ? [{ type: 'text', data: { text: payload } }]
      : Array.isArray(payload)
        ? payload
        : (payload ? [payload] : [])
    const chunk = extractSendChunk(segments)
    this.#logger.debug(formatCompact({
      op: 'send_chunk',
      text: truncatePreview(chunk.text, 120),
      media: chunk.media ? `${chunk.media.type}:${chunk.media.data.media.kind}` : undefined,
      reply: chunk.reply ? chunk.reply.data.message_id : undefined,
      forward: chunk.forward ? chunk.forward.data.forward_id : undefined,
      unsupported: chunk.unsupported.length ? chunk.unsupported.map(segment => segment.type).join(',') : undefined,
    }))
    if (chunk.unsupported.length) {
      this.#logger.warn(formatCompact({
        op: 'send_unsupported_segments',
        types: chunk.unsupported.map(segment => segment.type).join(','),
      }))
    }
    if (!chunk.text && !chunk.reply && !chunk.media && !chunk.forward) {
      this.#logger.warn(formatCompact({ op: 'send_dropped', reason: 'empty_payload' }))
      throw new Error('douyin send dropped: 出站载荷为空，无有效文本/媒体/转发/引用内容')
    }
    let response: SendMessageResponse
    let phase = 'send'
    try {
      if (chunk.forward) {
        phase = 'forward'
        response = await this.#sendForward(address, chunk.forward.data.entries ?? [])
      } else if (chunk.media && chunk.reply) {
        phase = 'media+reply'
        response = await this.#sendMedia(address, chunk.media, await this.#replyReference(chunk.reply.data.message_id))
      } else if (chunk.reply) {
        phase = 'reply'
        response = await this.#sendReply(address, chunk)
      } else if (chunk.media) {
        phase = 'media'
        response = await this.#sendMedia(address, chunk.media)
      } else {
        phase = 'text'
        response = await this.#sendText(address, chunk.text, chunk.mentions)
      }
    } catch (error) {
      this.#logger.debug(formatCompact({
        op: 'send_failed',
        phase,
        error: error instanceof Error ? error.message : String(error),
      }))
      throw error
    }
    const id = response.serverMessageId
    if (!id || id === '0') {
      const message = `douyin send failed: statusCode=${response.statusCode} msg=${response.statusMsg}`
      this.#logger.debug(formatCompact({ op: 'send_failed', phase, error: message }))
      throw new Error(message)
    }
    this.#logger.debug(formatCompact({
      op: 'send_ok',
      phase,
      id,
      text: truncatePreview(chunk.text, 80),
    }))
    this.#logger.info(
      `send ${conversation.kind}:${conversation.id}`
      + ` | id: ${id}`
      + ` | ${truncatePreview(chunk.text, 80)}`,
    )
    return id
  }

  async #sendReply (address: ConversationAddress, chunk: SendChunk): Promise<SendMessageResponse> {
    const target = await this.#replyTarget(chunk.reply!.data.message_id)
    return this.client.reply({
      ...address,
      text: chunk.text,
      referencedMessageId: target.id,
      referencedMessageType: 1,
      referencedUid: target.uid,
      ...(target.name ? { nickname: target.name } : {}),
    })
  }

  async #sendForward (address: ConversationAddress, entries: readonly ForwardEntry[]): Promise<SendMessageResponse> {
    const selfUid = this.#options.config.uid ?? ''
    const nodes = entries.map((entry, index) => ({
      uid: entry.actor?.id ?? selfUid,
      nickname: entry.actor?.displayName ?? '',
      text: entry.segments.map(segmentToText).join(''),
      msgType: 7,
      aweType: 700,
      msgId: String(BigInt(Date.now()) * 1000n + BigInt(index)),
    }))
    return this.client.sendMergeForward({ ...address, nodes, selfUid })
  }

  /** 发送媒体：image/video/file 直发，audio 降级为文件；可选携带引用（reply 段） */
  async #sendMedia (address: ConversationAddress, segment: MediaSendSegment, reference?: SendMessageReference): Promise<SendMessageResponse> {
    const bytes = await this.#mediaBytes(segment.data.media)
    if (segment.type === 'image') {
      return this.client.sendMedia({
        ...address,
        image: await this.client.uploadImage(bytes),
        ...(reference ? { reference } : {}),
      })
    }
    if (segment.type === 'video') {
      const asset = await this.client.uploadVideo(bytes)
      const poster = { oid: '', skey: '', md5: asset.md5, dataSize: 0, width: 0, height: 0 }
      return this.client.sendMedia({
        ...address,
        video: { asset, poster, width: 0, height: 0 },
        ...(reference ? { reference } : {}),
      })
    }
    if (segment.type === 'audio') {
      this.#logger.warn(formatCompact({ op: 'send_audio_fallback', reason: 'no_native_voice_channel' }))
      return this.client.sendMedia({
        ...address,
        file: await this.client.uploadFile(bytes, segment.data.media.file_name ?? segment.data.name ?? 'voice.bin'),
        ...(reference ? { reference } : {}),
      })
    }
    return this.client.sendMedia({
      ...address,
      file: await this.client.uploadFile(bytes, segment.data.media.file_name ?? 'file'),
      ...(reference ? { reference } : {}),
    })
  }

  async #replyReference (messageId: string): Promise<SendMessageReference> {
    const cached = this.#messageContent.get(messageId)
    const hint = JSON.stringify({
      refmsg_type: 1,
      content: '',
      refmsg_uid: cached?.actor?.id ?? '',
      refmsg_sec_uid: '',
      nickname: cached?.actor?.displayName ?? '',
      refmsg_content: '',
      version: 0,
      itemId: '',
      scene_type: 0,
    })
    return { referencedMessageId: messageId, hint }
  }

  async #sendText (address: ConversationAddress, text: string, mentions: readonly MentionSegment[]): Promise<SendMessageResponse> {
    return this.client.sendText(address, text, this.#textMentions(text, mentions))
  }

  #textMentions (text: string, mentions: readonly MentionSegment[]): TextMention[] | undefined {
    const result: TextMention[] = []
    for (const mention of mentions) {
      const needle = mention.data.name ?? mention.data.target
      if (!needle) continue
      const location = text.indexOf(needle)
      if (location < 0) continue
      result.push({ uid: mention.data.target, text: needle, location, length: needle.length })
    }
    return result.length ? result : undefined
  }

  async #replyTarget (messageId: string): Promise<{ id: string; uid: string; name: string }> {
    const cached = this.#messageContent.get(messageId)
    return { id: messageId, uid: cached?.actor?.id ?? '', name: cached?.actor?.displayName ?? '' }
  }

  async #mediaBytes (media: MediaRef): Promise<Uint8Array> {
    // 兼容 dataURL：框架把业务侧 `data.url` 归一为 MediaRef(kind:'url')，
    // 值可能是 `data:image/png;base64,...`，并非可请求的 http URL
    const dataUrl = media.value.match(/^data:(?:[^;,]+)?(;base64)?,([\s\S]*)$/)
    if (dataUrl) {
      const [, encoded, body] = dataUrl
      return encoded
        ? new Uint8Array(Buffer.from(body, 'base64'))
        : new TextEncoder().encode(decodeURIComponent(body))
    }
    if (media.kind === 'base64') {
      return new Uint8Array(Buffer.from(media.value, 'base64'))
    }
    if (media.kind === 'path' || media.kind === 'file') {
      const { readFile } = await import('node:fs/promises')
      return new Uint8Array(await readFile(media.value))
    }
    const response = await this.#options.http.requestBytes(media.value)
    return response.data
  }

  /* -- control -------------------------------------------------------------- */

  readonly control: EndpointControl = Object.freeze({
    recall: async ({ conversation, id }) => {
      this.#needClient()
      const address = outAddr(conversation)
      const { recalled } = await this.client.recall({ ...address, serverMessageId: id })
      if (!recalled) throw new Error('douyin recall failed')
    },
    addReaction: async ({ conversation, id }, emoji) => {
      this.#needClient()
      const address = outAddr(conversation)
      const uid = this.#options.config.uid ?? ''
      await this.client.modifyReaction({ ...address, serverMessageId: id, emoji, operatorUid: uid, enabled: true })
      return emoji
    },
    removeReaction: async ({ conversation, id }, reactionId) => {
      this.#needClient()
      const address = outAddr(conversation)
      const uid = this.#options.config.uid ?? ''
      await this.client.modifyReaction({ ...address, serverMessageId: id, emoji: reactionId, operatorUid: uid, enabled: false })
      return undefined
    },
  } satisfies EndpointControl)

  /* -- management ----------------------------------------------------------- */

  readonly management: EndpointManagement = Object.freeze({
    listFriends: async () => {
      this.#needClient()
      const friends = await this.client.getFriendList()
      return friends.map(friend => ({ user_id: friend.uid, nickname: friend.nickname, remark: '' }))
    },
    listGroups: async () => {
      this.#needClient()
      const groups = await this.client.getGroupList()
      return groups.map(group => ({ group_id: group.conversationShortId, name: group.name }))
    },
    listChannels: async (): Promise<readonly EndpointChannel[]> => {
      this.#needClient()
      // 收件箱历史（cmd=203）恢复最近会话：私聊 + 群线程
      const threads = await this.client.getRecentThreads()
      // 群名补齐：cmd=2006 会话列表才有群名，cmd=203 群线程 peer 无昵称
      const groups = await this.client.getGroupList()
      const groupNames = new Map<string, string>()
      for (const group of groups) {
        if (group.name) {
          groupNames.set(group.conversationShortId, group.name)
          groupNames.set(group.conversationId, group.name)
        }
      }
      return [...threads]
        .sort((a, b) => b.updateTime - a.updateTime)
        .map((thread): EndpointChannel | undefined => {
          const id = thread.threadId || thread.conversationShortId || ''
          if (!id) return undefined
          const isGroup = thread.conversationType === 2
          const peerName = (thread.peer?.nickname ?? '').trim()
          const name = isGroup
            ? groupNames.get(id) ?? groupNames.get(thread.conversationShortId ?? '') ?? ''
            : peerName || (thread.peer?.uid ?? '')
          return {
            // 前缀自描述场景，host wireConversation 会剥离（channelType 缺省时据此定 kind）
            id: `${isGroup ? 'group' : 'private'}:${id}`,
            name: name || id,
          }
        })
        .filter((channel): channel is EndpointChannel => channel != null)
    },
    listGroupMembers: async (groupId) => {
      this.#needClient()
      const address = await this.#groupAddress(groupId)
      if (!address) return []
      const members = await this.client.getGroupMembers(address)
      return members.map(member => ({ user_id: member.uid, nickname: member.nickname ?? member.uid }))
    },
    listRequests: async () => {
      this.#needClient()
      const requests: EndpointPendingRequest[] = []
      const friendRequests = await this.client.getFriendRequests()
      for (const item of friendRequests) {
        requests.push({
          platform_request_id: `friend:${item.applicantUid}`,
          type: 'friend',
          scene_type: 'friend',
          scene_id: item.applicantUid,
          actor_id: item.applicantUid,
          actor_name: item.nickname ?? undefined,
          comment: item.message ?? undefined,
          created_at: Number(item.requestedAt ?? Date.now()),
        })
      }
      const groupRequests = await this.client.getGroupJoinRequests()
      for (const item of groupRequests) {
        requests.push({
          platform_request_id: `group:${item.requestId}`,
          type: 'group',
          scene_type: 'group',
          scene_id: item.groupShortId,
          actor_id: item.applicantUid,
          actor_name: item.applicantNickname ?? undefined,
          created_at: Date.now(),
        })
      }
      return requests
    },
  approveRequest: async (requestId) => {
      await this.#reviewRequest(requestId, true)
    },
    rejectRequest: async (requestId) => {
      await this.#reviewRequest(requestId, false)
    },
  } satisfies EndpointManagement)

  async #reviewRequest (requestId: string, approve: boolean): Promise<void> {
    this.#needClient()
    if (requestId.startsWith('friend:')) {
      const uid = requestId.slice('friend:'.length)
      if (approve) await this.client.approveFriend(uid)
      else await this.client.rejectFriend(uid)
      return
    }
    const id = requestId.startsWith('group:') ? requestId.slice('group:'.length) : requestId
    if (approve) await this.client.approveGroupJoin(id)
    else await this.client.rejectGroupJoin(id)
  }

  async #groupAddress (id: string): Promise<ConversationAddress | undefined> {
    return groupAddr(await this.client.getGroupList(), id)
  }

  /* -- content port ---------------------------------------------------------- */

  readonly content: EndpointContentPort = Object.freeze({
    resolve: async (reference: ConversationReference, _context: EndpointContentResolveContext) => {
      if (reference.kind !== 'message') {
        return { status: 'unsupported', code: 'douyin_unsupported_reference', message: reference.kind }
      }
      const cached = this.#messageContent.get(reference.message.id)
      if (cached) return { status: 'resolved', reference, value: cached }
      const messages = await this.#historyLookup(reference.message.conversation, reference.message.id)
      if (messages.length === 0) {
        return { status: 'not_found', code: 'douyin_message_not_observed', message: reference.message.id }
      }
      const value = messages[0]
      return { status: 'resolved', reference, value }
    },
  } satisfies EndpointContentPort)

  async #historyLookup (conversation: ConversationRef, targetId: string): Promise<ConversationMessage[]> {
    this.#needClient()
    const address = outAddr(conversation)
    const history: ChatMessage[] = await this.client.getChatHistory({ ...address, count: 30 })
    const found = history.find(message => message.msgId === targetId)
    if (!found) return []
    const inbound = await this.#historyToInbound(conversation, found)
    return [inbound]
  }

  async #historyToInbound (conversation: ConversationRef, found: ChatMessage): Promise<ConversationMessage> {
    const { parseMsg } = await import('./im/content.js')
    const parsed: ParsedMessageContent = parseMsg(found.content, found.msgType)
    const text = parsed.text || '[非文本消息]'
    const segments: Segment[] = [{ type: 'text', data: { text } }]
    return {
      ref: { conversation, id: found.msgId },
      actor: senderFromId(found.senderUid, undefined),
      segments,
      timestamp: found.createTime * 1000,
    }
  }
}

/* ---------------------------------------------------------------------------
 * 出站分段提取（一次发送 = 一条消息主体 + 引用）
 * ------------------------------------------------------------------------- */

/** 完整出站载荷：所有受支持 Segment 类型 + 未支持的扩展段 */
export interface SendChunk {
  /** 全部 text 段拼接 */
  text: string
  /** @ 提及段（与文本叠加为富文本） */
  mentions: MentionSegment[]
  /** 媒体段（image/video/file/audio 取首个） */
  media?: MediaSendSegment
  /** 引用段（与正文合并为引用回复） */
  reply?: ReplySegment
  /** 合并转发段（独占发送） */
  forward?: ForwardSegment
  /** 框架扩展但适配器未支持的段类型 */
  unsupported: Segment[]
}

function segmentToText (segment: Segment): string {
  if (segment.type !== 'text') return ''
  const text = segment.data.text
  return typeof text === 'string' ? text : ''
}

/** 从 canonical segments 提取单一发送原语：文本 / @ / 媒体 / 转发 / 引用 + 未支持段。 */
export function extractSendChunk (segments: readonly Segment[]): SendChunk {
  const reply = segments.find((segment): segment is ReplySegment => segment.type === 'reply')
  const media = segments.find((segment): segment is MediaSendSegment => {
    return segment.type === 'image' || segment.type === 'video' || segment.type === 'file' || segment.type === 'audio'
  })
  const forward = segments.find((segment): segment is ForwardSegment => segment.type === 'forward')
  const mentions = segments.filter((segment): segment is MentionSegment => segment.type === 'mention')
  const text = segments
    .filter((segment): segment is TextSegment => segment.type === 'text')
    .map(segment => segment.data.text)
    .join('')
  const unsupported = segments.filter((segment): segment is SegmentBase => {
    return !['text', 'mention', 'image', 'audio', 'video', 'file', 'reply', 'forward'].includes(segment.type)
  })
  return { text, mentions, media, reply, forward, unsupported }
}