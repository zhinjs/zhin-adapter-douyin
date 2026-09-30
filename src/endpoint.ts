import { ClientEndpoint } from 'zhin.js/adapter'
import type {
  EndpointChannel,
  EndpointControl,
  EndpointManagement,
  EndpointPendingRequest,
  EndpointSendRequest,
} from 'zhin.js/adapter'
import type { EndpointContentPort, EndpointContentResolveContext } from 'zhin.js/adapter'
import { buildNotice, buildRequest, composeSideEventName, senderFromId } from '@zhin.js/core'
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
import { getAdapterLogger, truncatePreview } from '@zhin.js/logger'
import { Bot, chatIdOf, login, type BotMessage, type MsgBody, type NoticeEvent, type RequestEvent } from 'douyin.ts'
import { inConv, outAddr } from './protocol.js'
import type { EpCfg } from './protocol.js'
import type { Accounts } from './accounts.js'

export interface Opts {
  /** 能力路由 id（CapabilityId，运行时为 string 使用，跨版本品牌类型不兼容故声明为 string） */
  readonly id: string
  readonly config: EpCfg
  readonly accounts: Accounts
}

/** SDK 未导出 `SendMessageResponse`：从 msg.send 返回类型推断 */
type SendResponse = Awaited<ReturnType<Bot['msg']['send']>>
/** SDK 未导出 `ForwardNode`：从 forward 发送体载荷推断节点数组 */
type ForwardNodes = Extract<MsgBody, { type: 'forward' }>['nodes']

/** 入站事件去重阀（notice/request 瞬时风暴防护） */
const SIDE_EVENT_DEDUPE_HOLD_MILLIS = 30_000

/** 出站媒体段（image/video/file/audio，Extract 对 SegmentBase 联合无效故显式声明） */
type MediaSendSegment = {
  type: 'image' | 'video' | 'file' | 'audio'
  data: { media: MediaRef; alt?: string; duration?: number; name?: string }
  platform?: Readonly<Record<string, unknown>>
}

/** 入站 BotMessage → canonical Segment[]（文本/图片/视频/文件/语音/合并转发）。 */
export function inboundToSegments(message: BotMessage): Segment[] {
  const segments: Segment[] = []
  const text = message.text ?? ''
  switch (message.type) {
    case 'text':
    case 'emoji':
    case 'share':
    case 'userCard':
    case 'link':
      if (text) segments.push({ type: 'text', data: { text } })
      break
    case 'image': {
      const url = message.image.originUrls?.[0] ?? message.image.largeUrls?.[0] ?? message.image.mediumUrls?.[0] ?? message.image.thumbUrls?.[0]
      if (url) segments.push({ type: 'image', data: { media: { kind: 'url', value: url } } })
      break
    }
    case 'video': {
      const url = message.video.checkPics?.[0] ?? message.video.inlinePic ?? ''
      if (url) segments.push({ type: 'video', data: { media: { kind: 'url', value: url }, ...(text ? { alt: text } : {}) } })
      break
    }
    case 'audio': {
      const url = message.audio.urls?.[0] ?? message.audio.uri
      if (url) segments.push({ type: 'audio', data: { media: { kind: 'url', value: url } } })
      break
    }
    case 'file':
      segments.push({ type: 'file', data: { media: { kind: 'url', value: message.file.uri, file_name: message.file.name } } })
      break
    case 'forward': {
      const entries: ForwardEntry[] = message.nodes.map(node => ({
        actor: { id: node.uid, displayName: node.nickname },
        ...(node.createTime ? { timestamp: node.createTime } : {}),
        segments: [{ type: 'text', data: { text: node.text } }],
      }))
      segments.push({ type: 'forward', data: { forward_id: message.serverMessageId ?? '', title: '[合并转发]', entries } })
      break
    }
    default:
      if (text) segments.push({ type: 'text', data: { text } })
      break
  }
  return segments
}

/** 将入站 SDK 消息归一到 zhin IncomingMessage。endpoint.id 必须是 CapabilityId（框架按 record id 路由）。 */
function inboundToIncoming(capabilityKey: string, instanceKey: string, message: BotMessage) {
  const conversation = inConv(capabilityKey, {
    conversationId: message.conversationId,
    conversationShortId: message.conversationShortId,
    conversationType: message.conversationType as 1 | 2,
  }) as ConversationRef
  const replyTo = message.reference ? { id: message.reference.referencedMessageId } : undefined
  return Object.freeze({
    conversation,
    message: { conversation, id: message.serverMessageId ?? '' },
    content: message.text ?? '',
    segments: inboundToSegments(message),
    sender: senderFromId(message.senderUid, message.senderNickname ?? undefined),
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
 * Douyin IM endpoint：以 douyin.ts Bot 为原生客户端。
 * 登录 = SDK login() 扫码（cookie 落盘 accounts.json）；连接 = Bot.start()；
 * 入站 message/notice/request 归一后走 ClientEndpoint 事件门闩。
 */
export class DouyinEndpoint extends ClientEndpoint<Bot> {
  readonly #logger: ReturnType<typeof getAdapterLogger>
  readonly #options: Opts
  /** serverMessageId → BotMessage（回复引用与 content resolve 用，防内存膨胀限 1000 条） */
  readonly #messages = new Map<string, BotMessage>()
  readonly #sideSeen = new Map<string, number>()
  #client: Bot | undefined
  #started = false
  #bound = false
  #release: (() => void) | undefined

  constructor(options: Opts) {
    super()
    this.#options = options
    this.#logger = getAdapterLogger('douyin', options.id)
  }

  /** 原生客户端；未登录时为 undefined（框架 start/emit 均读取该值，不可抛错）。 */
  get client(): Bot {
    return this.#client as Bot
  }

  /** 出站控制面取客户端，未登录时给出友好错误。 */
  #needClient(): Bot {
    if (!this.#client) throw new Error(`douyin endpoint「${this.endpointName}」未登录`)
    return this.#client
  }

  get endpointName(): string {
    return this.#options.config.id
  }

  /* -- 生命周期 ----------------------------------------------------------- */

  /** 启动时若已存在本地会话（accounts.json）自动恢复连接；否则保持 offline 等待命令触发扫码。 */
  async start(signal: AbortSignal): Promise<void> {
    if (this.#started) return
    this.#started = true
    signal.addEventListener('abort', () => this.stop(), { once: true })
    const account = await this.#options.accounts.get(this.#options.config.uid)
    const cookie = this.#options.config.cookies ?? account?.record.cookie
    const uid = this.#options.config.uid ?? account?.uid
    if (!cookie) return
    await this.#connect(cookie, uid)
    this.#logger.info(`douyin connected (sdk) | uid: ${this.#client?.id ?? uid}`)
    // 恢复的会话可能是旧 nickname/头像，异步刷新为真实资料
    if (uid) void this.#refreshStoredProfile(uid)
  }

  open(): void {
    super.open()
  }

  stop(): void {
    if (!this.#started && !this.#bound) return
    this.#started = false
    this.#bound = false
    this.#release?.()
    this.#release = undefined
    this.#client?.stop()
    this.#client = undefined
  }

  /* -- 登录与连接 ----------------------------------------------------------- */

  /**
   * 由「抖音登录」命令触发：优先恢复本地会话；否则 SDK login() 扫码登录并落盘。
   * onQr/onVerifyUrl/onMfa/onStatus 用于把二维码/验证链接/验证码输入接到命令会话。
   */
  async login(
    onQr?: (image: string, url?: string) => void,
    onVerifyUrl?: (url: string) => void,
    onMfa?: (info: { maskedMobile?: string; kind?: 'sms' | 'password' }) => string | Promise<string>,
    onStatus?: (status: string) => void,
  ): Promise<string> {
    const name = this.endpointName
    // 已登录直接返回，避免命令阻塞在重复扫码
    if (this.#client) return `douyin「${name}」已登录（uid=${this.#client.id}）`
    const account = await this.#options.accounts.get(this.#options.config.uid)
    if (account) {
      await this.#connect(account.record.cookie, account.uid)
      this.#logger.info(`restored local session | uid: ${account.uid}`)
      return `douyin「${name}」已恢复本地会话（uid=${account.uid}）`
    }
    const session = await login({
      ...(this.#options.config.userAgent ? { userAgent: this.#options.config.userAgent } : {}),
      log: this.#logger,
      onQr: qr => onQr?.(qr.base64 ?? qr.url, qr.url),
      onVerifyUrl,
      onMfa: async info => (onMfa ? await onMfa(info) : ''),
      onStatus,
    })
    await this.#options.accounts.save(session.userId, {
      cookie: session.cookie,
      nickname: session.userData?.screen_name ?? session.userData?.name,
      avatar: session.userData?.avatar_url,
    })
    await this.#connect(session.cookie, session.userId)
    this.#logger.info(`login ok | uid: ${session.userId} (${session.userData?.screen_name ?? ''})`)
    return `抖音账号 ${session.userId}(${name}) 登录成功`
  }

  async #connect(cookie: string, uid?: string): Promise<void> {
    this.#client = new Bot({
      cookie,
      ...(uid ? { userId: uid } : {}),
      ...(this.#options.config.userAgent ? { userAgent: this.#options.config.userAgent } : {}),
      log: this.#logger,
    })
    this.#bind()
    await this.#client.start()
  }

  /** 连接后异步刷新本地会话的真实昵称/头像并回写（save 为 merge 语义，保留 cookie）。 */
  async #refreshStoredProfile(uid: string): Promise<void> {
    try {
      const profile = await this.#needClient().user.self()
      if (!profile.nickname && !profile.avatar) return
      await this.#options.accounts.save(uid, { nickname: profile.nickname, avatar: profile.avatar })
      this.#logger.info(`self profile refreshed | uid: ${uid} | ${profile.nickname ?? ''}`)
    } catch (error) {
      this.#logger.debug(`self profile refresh skipped: ${error instanceof Error ? error.message : String(error)}`)
    }
  }

  /* -- 事件桥 -------------------------------------------------------------- */

  #bind(): void {
    if (this.#bound) return
    const client = this.#client
    if (!client) return
    this.#bound = true
    const onMessage = (message: BotMessage): void => {
      void this.#deliverMessage(message).catch(error => {
        this.#logger.warn(`deliver message failed: ${String(error)}`)
      })
    }
    const onNotice = (event: NoticeEvent): void => { void this.#deliverNotice(event).catch(() => undefined) }
    const onRequest = (event: RequestEvent): void => { void this.#deliverRequest(event).catch(() => undefined) }
    client.on('message', onMessage)
    client.on('message:edited', onMessage)
    client.on('notice', onNotice)
    client.on('request', onRequest)
    this.#release = () => {
      client.off('message', onMessage)
      client.off('message:edited', onMessage)
      client.off('notice', onNotice)
      client.off('request', onRequest)
    }
  }

  /* -- 入站分发 ------------------------------------------------------------ */

  async #deliverMessage(message: BotMessage): Promise<void> {
    const key = this.#options.config.id
    const incoming = inboundToIncoming(String(this.#options.id), key, message)
    this.#logger.info(
      `recv ${incoming.conversation.kind}:${incoming.conversation.id}`
      + ` from ${message.senderUid}`
      + ` | ${truncatePreview(message.text ?? '', 80)}`,
    )
    const id = message.serverMessageId ?? ''
    if (id) {
      if (this.#messages.size > 1000) {
        const oldest = this.#messages.keys().next()
        if (!oldest.done) this.#messages.delete(oldest.value)
      }
      this.#messages.set(id, message)
    }
    try {
      await this.emit('message.receive', incoming)
    } catch (error) {
      this.#logger.warn(`message emit failed: ${String(error)}`)
    }
  }

  async #deliverNotice(event: NoticeEvent): Promise<void> {
    const key = this.#options.config.id
    const withActor = event as unknown as { recallUid?: string; peerUid?: string; operatorUid?: string; senderUid?: string; members?: { uid?: string; nickname?: string }[]; operators?: { uid?: string; nickname?: string }[]; conversationShortId?: string; conversationId?: string; conversationType?: number }
    const actorUid = String(withActor.recallUid ?? withActor.peerUid ?? withActor.operatorUid ?? withActor.senderUid ?? withActor.members?.[0]?.uid ?? withActor.operators?.[0]?.uid ?? '')
    const actorName = String(withActor.members?.[0]?.nickname ?? withActor.operators?.[0]?.nickname ?? '')
    const sceneId = String(withActor.conversationShortId ?? withActor.conversationId ?? actorUid ?? '')
    let sceneType = 'friend'
    if (event.type.startsWith('group')) sceneType = 'group'
    else if (event.type.startsWith('conversation') || event.type.startsWith('message')) {
      sceneType = withActor.conversationType === 2 ? 'group' : 'private'
    }
    const dedupeKey = `notice:${event.type}:${sceneId}:${actorUid}`
    if (this.#dedupe(dedupeKey)) return
    const id = `douyin:${event.type}:${sceneId}:${actorUid}`
    const subType = event.type.replace(/^group\.|^friend\.|^conversation\.|^message\./, '')
    const notice = buildNotice<NoticeEvent>(event, {
      id,
      type: 'notice',
      name: composeSideEventName('notice', sceneType, subType),
      clientAdapter: 'douyin',
      endpointId: key,
      timestamp: Date.now(),
      actor: senderFromId(actorUid, actorName || undefined),
      ...(sceneId ? { conversation: { kind: sceneType === 'group' ? 'group' as const : 'private' as const, id: sceneId } } : {}),
      // core 1.1.35/1.1.39 双版本类型分裂（旧 `$` 前缀 / 新命名），tools 断言规避 excess 检查
    } as never)
    void this.emit('notice.receive', notice).catch(error => {
      this.#logger.warn(`notice emit failed: ${String(error)}`)
    })
  }

  async #deliverRequest(event: RequestEvent): Promise<void> {
    const key = this.#options.config.id
    const isGroup = event.type === 'group.join-request'
    const scene = isGroup ? 'group' : 'friend'
    const applicantUid = String((event as { applicantUid?: string }).applicantUid ?? '')
    const sceneId = String(
      (event as { conversationShortId?: string }).conversationShortId
      ?? (event as { conversationId?: string }).conversationId
      ?? applicantUid
      ?? '',
    )
    const dedupeKey = `request:${event.type}:${sceneId}:${applicantUid}`
    if (this.#dedupe(dedupeKey)) return
    // 审定键：friend=uid / group=requestId（缺省时查群待审列表补首个）
    let reviewKey: string
    if (isGroup) {
      const requestId = (event as { requestId?: string }).requestId
        ?? (await this.#needClient().grp.requests(chatIdOf(event)).catch(() => []))[0]?.requestId
        ?? ''
      reviewKey = `group:${requestId}`
    } else {
      reviewKey = `friend:${applicantUid}`
    }
    const id = `douyin:${event.type}:${sceneId}:${applicantUid}`
    const request = buildRequest<RequestEvent>(event, {
      id,
      type: 'request',
      name: composeSideEventName('request', scene, 'add'),
      clientAdapter: 'douyin',
      endpointId: key,
      timestamp: Date.now(),
      actor: senderFromId(applicantUid, undefined) ?? { id: applicantUid, name: '' },
      comment: String((event as { content?: string }).content ?? ''),
      ...(sceneId ? { conversation: { kind: scene === 'group' ? 'group' as const : 'private' as const, id: sceneId } } : {}),
      $approve: async () => { await this.#reviewRequest(reviewKey, true) },
      $reject: async () => { await this.#reviewRequest(reviewKey, false) },
      // core 1.1.35/1.1.39 双版本类型分裂（旧 `$` 前缀 / 新命名），tools 断言规避 excess 检查
    } as never)
    void this.emit('request.receive', request).catch(error => {
      this.#logger.warn(`request emit failed: ${String(error)}`)
    })
  }

  #dedupe(key: string): boolean {
    const now = Date.now()
    const last = this.#sideSeen.get(key) ?? 0
    if (now - last < SIDE_EVENT_DEDUPE_HOLD_MILLIS) return true
    this.#sideSeen.set(key, now)
    return false
  }

  /* -- 出站 ---------------------------------------------------------------- */

  async send({ conversation, payload }: EndpointSendRequest): Promise<string> {
    const bot = this.#needClient()
    const chatId = outAddr(conversation)
    const segments: readonly Segment[] = typeof payload === 'string'
      ? [{ type: 'text', data: { text: payload } }]
      : Array.isArray(payload)
        ? payload
        : (payload ? [payload] : [])
    const chunk = extractSendChunk(segments)
    if (chunk.unsupported.length) {
      this.#logger.warn(`unsupported segments: ${chunk.unsupported.map(segment => segment.type).join(',')}`)
    }
    if (!chunk.text && !chunk.reply && !chunk.media && !chunk.forward) {
      throw new Error('douyin send dropped: 出站载荷为空，无有效文本/媒体/转发/引用内容')
    }
    let response: SendResponse
    if (chunk.forward) {
      const nodes: ForwardNodes = chunksToForwardNodes(chunk.forward)
      response = await bot.msg.send(chatId, { type: 'forward', nodes })
    } else if (chunk.media && chunk.reply) {
      this.#logger.warn('douyin 媒体消息不支持携带引用，忽略 reply 段')
      response = await this.#sendMediaBody(bot, chatId, chunk.media)
    } else if (chunk.reply) {
      const ats = this.#atsOf(chunk.mentions)
      response = await bot.msg.reply(chatId, this.#replyTarget(chunk.reply.data.message_id), chunk.text, ats && ats.length ? { ats } : undefined)
    } else if (chunk.media) {
      response = await this.#sendMediaBody(bot, chatId, chunk.media)
    } else {
      const ats = this.#atsOf(chunk.mentions)
      response = await bot.msg.send(chatId, { type: 'text', text: chunk.text, ...(ats && ats.length ? { ats } : {}) })
    }
    const id = response.serverMessageId
    if (response.statusCode !== 0 || !id || id === '0') {
      throw new Error(`douyin send failed: statusCode=${response.statusCode} msg=${response.statusMsg}`)
    }
    this.#logger.info(`send ${conversation.kind}:${conversation.id} | id: ${id} | ${truncatePreview(chunk.text, 80)}`)
    return id
  }

  /** 媒体发送：image/video/file 直发简写源（SDK send 自动上传），audio 降级为文件。 */
  async #sendMediaBody(bot: Bot, chatId: string, segment: MediaSendSegment): Promise<SendResponse> {
    const media = segment.data.media
    const input = await this.#mediaInput(media)
    switch (segment.type) {
      case 'image':
        return bot.msg.send(chatId, { type: 'image', image: input })
      case 'video':
        return bot.msg.send(chatId, { type: 'video', video: { source: input } })
      case 'audio':
        this.#logger.warn('douyin 无原生语音通道，audio 降级为文件发送')
        return bot.msg.send(chatId, { type: 'file', file: { source: input, name: media.file_name ?? segment.data.name ?? 'voice.bin' } })
      default:
        return bot.msg.send(chatId, { type: 'file', file: { source: input, name: media.file_name ?? 'file' } })
    }
  }

  /** MediaRef → SDK MediaInput：data: URI 剥离解码、base64 解码为字节，其余（URL/路径/裸 base64）原样交 SDK。 */
  async #mediaInput(media: MediaRef): Promise<string | Uint8Array | ArrayBuffer> {
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
    return media.value
  }

  /** 回复目标：优先取缓存 BotMessage（带引用元数据），未命中给最小兜底。 */
  #replyTarget(messageId: string): BotMessage {
    const cached = this.#messages.get(messageId)
    if (cached) return cached
    return {
      cmd: 0,
      conversationId: '',
      conversationShortId: '',
      conversationType: 1,
      senderUid: '',
      content: '',
      messageType: 1,
      serverMessageId: messageId,
      createTime: String(Date.now() * 1000),
      raw: {},
      type: 'text',
      text: '',
    } as unknown as BotMessage
  }

  #atsOf(mentions: readonly MentionSegment[]): { uid: string; nickname?: string }[] | undefined {
    const result: { uid: string; nickname?: string }[] = []
    for (const mention of mentions) {
      if (!mention.data.target) continue
      result.push({ uid: mention.data.target, ...(mention.data.name ? { nickname: mention.data.name } : {}) })
    }
    return result.length ? result : undefined
  }

  /* -- control -------------------------------------------------------------- */

  readonly control: EndpointControl = Object.freeze({
    recall: async ({ conversation, id }) => {
      const bot = this.#needClient()
      const { recalled, statusMsg } = await bot.msg.recall(outAddr(conversation), id)
      if (!recalled) throw new Error(`douyin recall failed: ${statusMsg}`)
    },
    addReaction: async ({ conversation, id }, emoji) => {
      const bot = this.#needClient()
      await bot.msg.react(outAddr(conversation), id, emoji, true)
      return emoji
    },
    removeReaction: async ({ conversation, id }, reactionId) => {
      const bot = this.#needClient()
      await bot.msg.react(outAddr(conversation), id, reactionId, false)
      return undefined
    },
  } satisfies EndpointControl)

  /* -- management ----------------------------------------------------------- */

  readonly management: EndpointManagement = Object.freeze({
    listFriends: async () => {
      const friends = await this.#needClient().frd.list()
      return friends.map(friend => ({ user_id: friend.uid, nickname: friend.nickname, remark: '' }))
    },
    listGroups: async () => {
      const groups = await this.#needClient().grp.list()
      return groups.map(group => ({ group_id: group.conversationShortId, name: group.name }))
    },
    listChannels: async (): Promise<readonly EndpointChannel[]> => {
      const bot = this.#needClient()
      const groups = await bot.grp.list()
      const friends = await bot.frd.list()
      return [
        ...groups.map(group => ({ id: `group:${group.conversationShortId || group.conversationId}`, name: group.name || group.conversationShortId })),
        ...friends.map(friend => ({ id: `private:${friend.conversationShortId || friend.conversationId}`, name: friend.nickname || friend.uid })),
      ]
    },
    listGroupMembers: async (groupId) => {
      const bot = this.#needClient()
      const rawId = groupId.replace(/^group:/, '')
      const groups = await bot.grp.list()
      const group = groups.find(item => item.conversationShortId === rawId || item.conversationId === rawId)
      if (!group) return []
      const members = await bot.grp.members(group.chatId)
      return members.map(member => ({ user_id: member.uid, nickname: member.nickname ?? member.uid }))
    },
    listRequests: async () => {
      const bot = this.#needClient()
      const requests: EndpointPendingRequest[] = []
      for (const item of await bot.frd.requests()) {
        requests.push({
          platform_request_id: `friend:${item.applicantUid}`,
          type: 'friend',
          scene_type: 'friend',
          scene_id: item.applicantUid,
          actor_id: item.applicantUid,
          actor_name: item.nickname ?? undefined,
          comment: item.message ?? undefined,
          created_at: item.requestedAt ? Number(item.requestedAt) : Date.now(),
        })
      }
      for (const item of await bot.grp.requests()) {
        requests.push({
          platform_request_id: `group:${item.requestId}`,
          type: 'group',
          scene_type: 'group',
          scene_id: item.groupShortId,
          actor_id: item.applicantUid,
          actor_name: item.applicantNickname ?? undefined,
          created_at: item.createdAt ? Number(item.createdAt) : Date.now(),
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

  async #reviewRequest(requestId: string, approve: boolean): Promise<void> {
    const bot = this.#needClient()
    if (requestId.startsWith('friend:')) {
      const uid = requestId.slice('friend:'.length)
      if (approve) await bot.frd.approve(uid)
      else await bot.frd.reject(uid)
      return
    }
    const id = requestId.startsWith('group:') ? requestId.slice('group:'.length) : requestId
    if (approve) await bot.grp.approve(id)
    else await bot.grp.reject(id)
  }

  /* -- content port ---------------------------------------------------------- */

  readonly content: EndpointContentPort = Object.freeze({
    resolve: async (reference: ConversationReference, _context: EndpointContentResolveContext): Promise<ConversationResolution> => {
      if (reference.kind !== 'message') {
        return { status: 'unsupported', code: 'douyin_unsupported_reference', message: reference.kind }
      }
      const cached = this.#messages.get(reference.message.id)
      if (cached) return { status: 'resolved', reference, value: this.#toConversationMessage(cached) }
      const messages = await this.#historyLookup(reference.message.conversation, reference.message.id)
      if (messages.length === 0) {
        return { status: 'not_found', code: 'douyin_message_not_observed', message: reference.message.id }
      }
      return { status: 'resolved', reference, value: messages[0] }
    },
  } satisfies EndpointContentPort)

  #toConversationMessage(message: BotMessage): ConversationMessage {
    const incoming = inboundToIncoming(String(this.#options.id), this.#options.config.id, message)
    const conversation = incoming.conversation as ConversationRef
    return {
      ref: { conversation, id: message.serverMessageId ?? '' },
      actor: incoming.sender,
      segments: incoming.segments,
      timestamp: Number(message.createTime ?? Date.now()) / 1e3,
      ...(message.reference
        ? { replyTo: { conversation, id: message.reference.referencedMessageId } }
        : {}),
    }
  }

  /** content 未命中缓存时回溯会话历史查找目标消息（SDK createTime 为微秒，转毫秒 /1e3）。 */
  async #historyLookup(conversation: ConversationRef, targetId: string): Promise<ConversationMessage[]> {
    const bot = this.#needClient()
    const history = await bot.chat.history(outAddr(conversation), { count: 30 })
    const found = history.find(message => message.msgId === targetId)
    if (!found) return []
    return [{
      ref: { conversation, id: found.msgId },
      actor: senderFromId(found.senderUid, undefined),
      segments: [{ type: 'text', data: { text: found.content || '[非文本消息]' } }],
      timestamp: found.createTime / 1e3,
    }]
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

function segmentToText(segment: Segment): string {
  if (segment.type !== 'text') return ''
  const text = (segment as TextSegment).data.text
  return typeof text === 'string' ? text : ''
}

/** 合并转发 entries → SDK ForwardNode[]（msgId 用时间戳生成，保证同批唯一）。 */
function chunksToForwardNodes(forward: ForwardSegment): ForwardNodes {
  return (forward.data.entries ?? []).map((entry, index) => ({
    uid: entry.actor?.id ?? '',
    nickname: entry.actor?.displayName ?? '',
    text: entry.segments.map(segmentToText).join(''),
    msgType: 7,
    aweType: 700,
    msgId: String(BigInt(Date.now()) * 1000n + BigInt(index)),
    ...(entry.timestamp ? { createTime: Number(entry.timestamp) } : {}),
  }))
}

/** 从 canonical segments 提取单一发送原语：文本 / @ / 媒体 / 转发 / 引用 + 未支持段。 */
export function extractSendChunk(segments: readonly Segment[]): SendChunk {
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