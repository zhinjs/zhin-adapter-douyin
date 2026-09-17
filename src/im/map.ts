import { log } from '../log.js'
import type {
  ChatMessage,
  FriendInfo,
  GroupInfo,
  PrivateThread,
  StrangerInfo,
  ThreadPeer,
} from './types.js'

export function isGroup (conversationId: string): boolean {
  return /^\d+$/.test(conversationId.trim())
}

export function listItem (raw: Record<string, unknown>): GroupInfo {
  const conversationId = String(raw['conversationId'] ?? '')
  const conversationType = Number(raw['conversationType'] ?? 0)
  // 群头像在 conversationCoreInfo.icon（对齐 douyin-im）；extInfo 仅补 name 等
  const core = raw['conversationCoreInfo'] as Record<string, unknown> | undefined
  const ext = raw['extInfo'] as Record<string, unknown> | undefined
  const setting = (raw['userSetting'] ?? raw['conversationSettingInfo']) as
    | Record<string, unknown>
    | undefined
  const memberBox = (raw['members'] ?? raw['firstPageParticipants']) as
    | { members?: Array<Record<string, unknown>>; participants?: Array<Record<string, unknown>> }
    | undefined
  const avatar = String(core?.['icon'] ?? ext?.['icon'] ?? core?.['avatar'] ?? ext?.['avatar'] ?? '')
  if (isGroup(conversationId) && !avatar) {
    // 群头像缺失：dump decode 原始字段辅助定位数据源
    log.debug(
      `[douyin:im] 群头像缺失: keys=${JSON.stringify(Object.keys(raw))} ` +
      `core=${JSON.stringify(core)?.slice(0, 400)} ext=${JSON.stringify(ext)?.slice(0, 400)}`,
    )
  }
  const ownerUid = String(ext?.['ownerUid'] ?? ext?.['owner'] ?? core?.['owner'] ?? '')
  // participants 键为 userId（对齐 douyin-im member['uid'] ?? member['userId']）
  const members = (memberBox?.members ?? memberBox?.participants ?? []).map((member) => {
    const secUid = String(member['secUid'] ?? '')
    return {
      uid: String(member['uid'] ?? member['userId'] ?? ''),
      role: Number(member['role'] ?? 0),
      ...(secUid ? { secUid } : {}),
    }
  }).filter((member) => member.uid && member.uid !== '0')
  return {
    conversationId,
    conversationShortId: String(raw['conversationShortId'] ?? ''),
    conversationType,
    isGroup: conversationType === 2 || isGroup(conversationId),
    name: String(ext?.['name'] ?? ''),
    ...(avatar ? { avatar } : {}),
    ...(ownerUid && ownerUid !== '0' ? { ownerUid } : {}),
    lastMessageTime: Number(setting?.['lastMsgTime'] ?? 0),
    members,
  }
}

/**
 * 从 conversationId 解析对端 UID。
 * jumpbyte 私信格式: "0:1:{uid_a}:{uid_b}"
 */
export function peer (conversationId: string, myUid: string): string {
  const parts = conversationId.split(':')
  if (parts.length >= 4 && parts[1] === '1') {
    const uidA = parts[2]!
    const uidB = parts[3]!
    if (uidA === myUid) return uidB
    if (uidB === myUid) return uidA
    return uidB
  }
  return ''
}

/** 从 conversation 元数据构建 thread（对齐 douyin-im mapThread：peer 资料取 firstPageParticipants/userInfo 的 alias） */
export function meta (
  conv: Record<string, unknown>,
  messages: Record<string, unknown>[],
  myUid: string,
): PrivateThread {
  const threadId = (conv['conversationId'] as string) ?? ''
  const conversationType = (conv['conversationType'] as number) ?? 1
  const peerUid = peer(threadId, myUid)

  const participantPage = (conv['firstPageParticipants'] ?? conv['members']) as
    | { members?: Array<Record<string, unknown>>; participants?: Array<Record<string, unknown>> }
    | undefined
  const userInfo = conv['userInfo'] as Record<string, unknown> | undefined
  const candidates = participantPage?.participants ?? participantPage?.members ?? []
  const peerMember = candidates.find(
    (member) => String(member['userId'] ?? member['uid'] ?? '') === peerUid,
  )
  const peerInfo = peerMember ??
    (String(userInfo?.['userId'] ?? userInfo?.['uid'] ?? '') === peerUid ? userInfo : undefined)
  const peerSecUid = String(peerInfo?.['secUid'] ?? '')
  const peerNick = String(peerInfo?.['alias'] ?? peerInfo?.['nickname'] ?? '')

  const thread: PrivateThread = {
    threadId,
    ...(conv['conversationShortId'] != null
      ? { conversationShortId: String(conv['conversationShortId']) }
      : {}),
    conversationType,
    peer: {
      uid: peerUid,
      nickname: peerNick,
      ...(peerSecUid ? { secUid: peerSecUid } : {}),
    },
    unreadCount: Number(conv['badgeCount'] ?? conv['unreadCount'] ?? 0),
    updateTime: Number(
      (conv['extInfo'] as Record<string, unknown> | undefined)?.['lastActiveTime'] ?? 0,
    ),
    ...(conv['inboxType'] != null ? { inboxType: conv['inboxType'] as number } : {}),
  }

  const lastMsg = messages.find((m) => (m['conversationId'] as string) === threadId)
  if (lastMsg) {
    thread.lastMessage = msg(lastMsg)
    if (!thread.updateTime) thread.updateTime = thread.lastMessage.createTime
  }

  return thread
}

/** 从单条 message 记录构建 thread（无 conversations 字段时） */
export function conv (raw: Record<string, unknown>, myUid: string): PrivateThread {
  const threadId = (raw['conversationId'] as string) ?? ''
  const conversationType = (raw['conversationType'] as number) ?? 1
  const peerUid = peer(threadId, myUid) ||
    (conversationType === 1 ? String(raw['sender'] ?? '') : '')
  const ext = raw['ext'] as Record<string, string> | undefined
  const thread: PrivateThread = {
    threadId,
    ...(raw['conversationShortId'] != null
      ? { conversationShortId: String(raw['conversationShortId']) }
      : {}),
    conversationType,
    peer: {
      uid: peerUid,
      nickname: '',
      ...(raw['secSender'] && String(raw['sender']) === peerUid
        ? { secUid: String(raw['secSender']) }
        : {}),
    },
    unreadCount: 0,
    updateTime: (raw['createTime'] as number) ?? 0,
    ...(ext?.['s:is_stranger'] === 'true' ? { isStranger: true } : {}),
  }
  if (raw['content']) {
    thread.lastMessage = msg(raw)
  }
  return thread
}

export function dedupe (threads: PrivateThread[]): PrivateThread[] {
  const byId = new Map<string, PrivateThread>()
  for (const t of threads) {
    const prev = byId.get(t.threadId)
    if (!prev || t.updateTime >= prev.updateTime) {
      byId.set(t.threadId, t)
    }
  }
  return [...byId.values()]
}

export function msg (raw: Record<string, unknown>): ChatMessage {
  const senderSecUid = String(raw['secSender'] ?? '')
  const indexInConversation = String(raw['indexInConversation'] ?? '')
  const indexInConversationV2 = String(raw['indexInConversationV2'] ?? '')
  return {
    msgId: String(raw['serverMessageId'] ?? ''),
    threadId: (raw['conversationId'] as string) ?? '',
    senderUid: String(raw['sender'] ?? ''),
    ...(senderSecUid ? { senderSecUid } : {}),
    content: (raw['content'] as string) ?? '',
    msgType: (raw['messageType'] as number) ?? 0,
    createTime: (raw['createTime'] as number) ?? 0,
    status: (raw['status'] as number) ?? 0,
    ...(indexInConversation ? { indexInConversation } : {}),
    ...(indexInConversationV2 ? { indexInConversationV2 } : {}),
  }
}

/** thread 对端信息 → 业务 peer 摘要 */
function threadPeerSummary (thread: PrivateThread): { uid: string; secUid?: string; nickname: string } {
  const peerInfo = thread.peer as ThreadPeer
  return {
    uid: peerInfo.uid,
    ...(peerInfo.secUid ? { secUid: peerInfo.secUid } : {}),
    nickname: peerInfo.nickname ?? '',
  }
}

/** P2P 会话线程 → 好友信息 */
export function toFriend (thread: PrivateThread): FriendInfo | undefined {
  const peerInfo = threadPeerSummary(thread)
  if (!peerInfo.uid || !/^\d+$/.test(peerInfo.uid)) return undefined
  return {
    uid: peerInfo.uid,
    ...(peerInfo.secUid ? { secUid: peerInfo.secUid } : {}),
    nickname: peerInfo.nickname,
    conversationId: thread.threadId,
    conversationShortId: thread.conversationShortId ?? '',
    ...(thread.lastMessage ? { lastMessage: thread.lastMessage } : {}),
    lastMessageTime: thread.lastMessage?.createTime ?? thread.updateTime,
    unreadCount: thread.unreadCount,
  }
}

/** 陌生人会话线程 → 陌生人信息 */
export function toStranger (thread: PrivateThread): StrangerInfo | undefined {
  const peerInfo = threadPeerSummary(thread)
  if (!peerInfo.uid) return undefined
  return {
    uid: peerInfo.uid,
    ...(peerInfo.secUid ? { secUid: peerInfo.secUid } : {}),
    ...(peerInfo.nickname ? { nickname: peerInfo.nickname } : {}),
    conversationId: thread.threadId,
    conversationShortId: thread.conversationShortId ?? '',
    ...(thread.lastMessage ? { lastMessage: thread.lastMessage } : {}),
    lastMessageTime: thread.lastMessage?.createTime ?? thread.updateTime,
    unreadCount: thread.unreadCount,
  }
}