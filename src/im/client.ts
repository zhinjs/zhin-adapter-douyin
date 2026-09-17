import type { Http } from '../http.js'
import { log } from '../log.js'
import { Ws, type WsCloseEvent, type WsReconnectEvent } from '../proto/ws.js'
import { decTree } from '../proto/wire.js'
import { ImProtoTransport } from './pipe.js'
import { toInbound, pushes, reacts } from './recv.js'
import { notice, notices } from './notify.js'
import { Uploader } from './upload.js'
import type { VideoAsset, FileUploadAsset } from './upload.js'
import type { ImageAsset, FileAssetPayload, TextMention } from './content.js'
import * as inbox from './inbox.js'
import * as send from './send.js'
import type {
  ActionResult,
  ChatMessage,
  ConversationAddress,
  FriendInfo,
  FriendRequestInfo,
  GroupInfo,
  GroupJoinRequestInfo,
  GroupMemberInfo,
  InboundMessage,
  ModifyReactionItem,
  NoticeEvent,
  PrivateThread,
  RecallItem,
  RecallResult,
  RequestEvent,
  SendMessageReference,
  SendMessageResponse,
  StrangerInfo,
} from './types.js'
import { FriendRequestStatus, GroupJoinRequestStatus } from './types.js'

export interface ImClientOptions {
  http: Http
  /** 当前账号数字 uid（Android frontier device_id + 自发消息过滤） */
  userId: string
  /** 浏览器复制的 Cookie 串（WS 握手用；HTTP 通道使用 http 实例内的 Cookie） */
  cookies: string
  /** Desktop IM 设备 ID（收件箱 Cookie 查询/动作通道用） */
  deviceId?: string
}

export type ImClientEventMap = {
  message: [message: InboundMessage]
  notice: [notice: NoticeEvent]
  request: [request: RequestEvent]
  reconnecting: [event: WsReconnectEvent]
  close: [event: WsCloseEvent]
}

export type ImClientEvent = keyof ImClientEventMap

export type EventListener<T extends ImClientEvent> = (...args: ImClientEventMap[T]) => void

export interface SendMediaItem extends ConversationAddress {
  /** 图片（uploadImage 结果）或视频（uploadVideo 结果 + 尺寸）或文件（uploadFile 结果）三选一 */
  image?: ImageAsset
  video?: {
    asset: VideoAsset
    poster: ImageAsset
    width: number
    height: number
    checkPics?: string[]
  }
  file?: FileAssetPayload
  /** 引用消息构造（媒体 + reference 时走引用媒体通道） */
  reference?: SendMessageReference
}

/**
 * IM 消息业务门面：收消息走 Android Frontier WS 推送，
 * 发消息统一 HTTP cookie 通道（native ImOption profile，cmd=100），
 * HTTP 同时承担收件箱查询/动作与媒体上传。方法直接转发到各模块。
 */
export class Im {
  private readonly options: ImClientOptions
  private readonly http: Http
  private readonly userId: string
  private readonly cookies: string
  private readonly deviceId: string
  private readonly transport: ImProtoTransport
  private readonly uploader: Uploader
  private readonly inboxCtx: inbox.InboxContext
  /** Android Frontier 长连接：接收推送 */
  private readonly ws: Ws
  private readonly handlers = new Map<ImClientEvent, Set<(...args: any[]) => void>>()

  constructor (options: ImClientOptions) {
    this.options = options
    this.http = options.http
    this.userId = options.userId
    this.cookies = options.cookies
    this.deviceId = options.deviceId ?? ''
    this.transport = new ImProtoTransport(this.http)
    this.uploader = new Uploader(this.http, async () => this.userId)
    this.ws = new Ws({
      userId: options.userId,
      cookies: options.cookies,
      callbacks: {
        onMessage: bytes => this.handleFrame(bytes),
        onReconnecting: event => this.emit('reconnecting', event),
        onClose: event => this.emit('close', event),
      },
    })
    this.inboxCtx = {
      transport: this.transport,
      deviceId: this.deviceId,
      platformUid: options.userId,
    }
  }

  /* -- 接收 + 发送（均为 Android Frontier WS） ---------------------------- */

  /** 连接 Android Frontier WS 长连接并开始接收群聊/私聊消息 */
  async start (): Promise<void> {
    if (this.ws.connected) return
    await this.ws.connect()
  }

  /** 停止接收并关闭连接 */
  stop (): void {
    this.ws.close()
  }

  /** 事件注册：message / notice / request / reconnecting / close（start 前注册同样生效） */
  on<T extends ImClientEvent> (event: T, callback: EventListener<T>): void {
    let set = this.handlers.get(event)
    if (!set) {
      set = new Set()
      this.handlers.set(event, set)
    }
    set.add(callback as (...args: any[]) => void)
  }

  off<T extends ImClientEvent> (event: T, callback: EventListener<T>): void {
    this.handlers.get(event)?.delete(callback as (...args: any[]) => void)
  }

  private emit<T extends ImClientEvent> (event: T, ...args: ImClientEventMap[T]): void {
    for (const handler of this.handlers.get(event) ?? []) {
      (handler as EventListener<T>)(...args)
    }
  }

  /** Android Frontier 帧分发：原生通知/请求 + 消息推送（过滤自发，命令消息分流为 notice/request） */
  private handleFrame (bytes: Uint8Array): void {
    for (const item of notices(bytes)) {
      if (item.type === 'friend.request' || item.type === 'group.join-request') {
        this.emit('request', item)
      } else {
        this.emit('notice', item)
      }
    }
    const items = pushes(bytes)
    let emitted = 0
    for (const reaction of reacts(bytes)) {
      this.emit('notice', reaction)
      emitted++
    }
    for (const push of items) {
      if (push.senderUid === this.userId) continue
      // cmd=500 高位类型为通话/房间信令（50013/50018/50020…），不作为聊天消息分发
      if (push.messageType >= 50000) continue
      const event = notice(push)
      if (event) {
        if (event.type === 'friend.request' || event.type === 'group.join-request') {
          this.emit('request', event)
        } else {
          this.emit('notice', event)
        }
        emitted++
        continue
      }
      this.emit('message', toInbound(push))
      emitted++
    }
    // 无产出推送帧诊断：property 帧（含 f500）打印完整子树，其余打印概要
    if (emitted === 0) {
      const wire = JSON.stringify(decTree(bytes))
      const len = wire.includes('"f":500') ? 3800 : 0
      if (len && /0:\d+:\d+:\d+/.test(wire)) {
        log.debug(`[douyin:im] property帧无产出 ${bytes.length}B wire=${wire.slice(0, len)}`)
      }
    }
  }

  /* -- 发送 ------------------------------------------------------------- */

  /**
   * 发送全部走 Android Frontier WS cmd=100 直发
   * （ext 携带 s:send_ignore_ticket=true，无需会话 ticket 与设备真值）。
   */

  async sendText (address: ConversationAddress, text: string, mentions?: TextMention[]): Promise<SendMessageResponse> {
    return send.sendText(this.sendCtx(), address, text, mentions)
  }

  /** 合并转发（messageType=136） */
  async sendMergeForward (options: send.SendForwardOptions): Promise<SendMessageResponse> {
    return send.sendMerge(this.sendCtx(), options)
  }

  /** 发送图片/视频/文件（媒体需先 uploadImage/uploadVideo/uploadFile） */
  async sendMedia (item: SendMediaItem): Promise<SendMessageResponse> {
    const ctx = this.sendCtx()
    if (item.image) return send.sendImage(ctx, { ...item, image: item.image })
    if (item.video) {
      const { asset, poster, width, height, checkPics } = item.video
      return send.sendVideo(ctx, {
        ...item,
        video: { tkey: asset.tkey, skey: asset.skey, md5: asset.md5, poster, width, height, ...(checkPics ? { checkPics } : {}) },
      })
    }
    if (item.file) return send.sendFile(ctx, { ...item, file: item.file })
    return Promise.reject(new Error('sendMedia requires image, video or file'))
  }

  async reply (options: send.ReplyOptions): Promise<SendMessageResponse> {
    return send.reply(this.sendCtx(), options)
  }

  recall (item: RecallItem): Promise<RecallResult> {
    return inbox.recall(this.inboxCtx, this.deviceId, item)
  }

  /** 消息表情回应（cmd=705 set_property，emoji 为抖音 skey 文本键） */
  modifyReaction (item: ModifyReactionItem): Promise<{ statusCode: number; statusMsg: string }> {
    return inbox.reaction(this.inboxCtx, this.deviceId, item)
  }

  /* -- 上传 ------------------------------------------------------------- */

  uploadImage (data: Uint8Array): Promise<ImageAsset> {
    return this.uploader.uploadImage(data)
  }

  uploadVideo (data: Uint8Array): Promise<VideoAsset> {
    return this.uploader.uploadVideo(data)
  }

  uploadFile (data: Uint8Array, name: string): Promise<FileUploadAsset> {
    return this.uploader.uploadFile(data, name)
  }

  /* -- 收件箱 / 联系人 ---------------------------------------------------- */

  getFriendList (options: inbox.InboxListOptions = {}): Promise<FriendInfo[]> {
    return inbox.getFriendList(this.inboxCtx, this.deviceId, options)
  }

  getGroupList (options: inbox.InboxListOptions = {}): Promise<GroupInfo[]> {
    return inbox.getGroupList(this.inboxCtx, this.deviceId, options)
  }

  /** 收件箱最近会话线程（cmd=203 get_by_user_init：私聊 + 群），按服务端顺序返回 */
  getRecentThreads (options: inbox.InboxListOptions = {}): Promise<PrivateThread[]> {
    return inbox.threads(this.inboxCtx, this.deviceId, options)
  }

  getGroupMembers (address: ConversationAddress): Promise<GroupMemberInfo[]> {
    return inbox.members(this.inboxCtx, this.deviceId, address)
  }

  getStrangerList (options: inbox.InboxListOptions = {}): Promise<StrangerInfo[]> {
    return inbox.getStrangerList(this.inboxCtx, options)
  }

  getChatHistory (
    address: ConversationAddress & { cursor?: number; count?: number },
  ): Promise<ChatMessage[]> {
    return inbox.history(this.inboxCtx, this.deviceId, address)
  }

  getFriendRequests (options: { status?: FriendRequestStatus } = {}): Promise<FriendRequestInfo[]> {
    return inbox.friends(this.inboxCtx, this.deviceId, options)
  }

  getGroupJoinRequests (
    options: { conversationShortId?: string } = {},
  ): Promise<GroupJoinRequestInfo[]> {
    return inbox.joins(this.inboxCtx, this.deviceId, options)
  }

  /* -- 申请审批 ----------------------------------------------------------- */

  approveFriend (applicantUid: string): Promise<ActionResult> {
    return inbox.reviewFriend(this.inboxCtx, this.deviceId, applicantUid, FriendRequestStatus.APPROVED)
  }

  rejectFriend (applicantUid: string): Promise<ActionResult> {
    return inbox.reviewFriend(this.inboxCtx, this.deviceId, applicantUid, FriendRequestStatus.REJECTED)
  }

  approveGroupJoin (requestId: string): Promise<ActionResult & { request?: GroupJoinRequestInfo }> {
    return inbox.reviewJoin(this.inboxCtx, this.deviceId, requestId, GroupJoinRequestStatus.APPROVED)
  }

  rejectGroupJoin (requestId: string): Promise<ActionResult & { request?: GroupJoinRequestInfo }> {
    return inbox.reviewJoin(this.inboxCtx, this.deviceId, requestId, GroupJoinRequestStatus.REJECTED)
  }

  /** 设置群名（cmd=902） */
  setGroupName (address: ConversationAddress, name: string): Promise<ActionResult> {
    return inbox.rename(this.inboxCtx, this.deviceId, address, name)
  }

  /** 统一发送上下文：HTTP cookie 通道（native ImOption profile） */
  private sendCtx (): send.SendContext {
    return { transport: this.transport, deviceId: this.deviceId }
  }
}