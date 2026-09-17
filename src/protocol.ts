import type { ConversationRef } from '@zhin.js/im-contract'
import type { ConversationAddress } from './im/types.js'

/* ---------------------------------------------------------------------------
 * 配置模型
 * ------------------------------------------------------------------------- */

/** 单个 Douyin endpoint（账号）配置 */
export interface EpCfg {
  /** 实例 key（唯一，`douyin.endpoint` 命令以它为名） */
  id: string
  /** 抖音平台 UID（纯数字字符串）；会话恢复 / 本地账号标识 */
  uid?: string
  /** 手动注入 cookie；未提供且本地无账号时走扫码登录 */
  cookies?: string
  msToken?: string
  deviceId?: string
  userAgent?: string
  /** 会话落盘目录（默认 `<cwd>/data/douyin/accounts`） */
  accountsDir?: string
  [key: string]: unknown
}

export interface Cfg {
  /** 会话落盘目录（默认 `<cwd>/data/douyin/accounts`） */
  accountsDir?: string
  /** 全局 UA 覆盖 */
  userAgent?: string
  endpoints?: EpCfg[]
  [key: string]: unknown
}

/**
 * 解析单个 endpoint 配置。
 * 框架多端点展开后 `context.config` 已是「顶层共享 + entry 覆盖」的 per-endpoint view
 * （`endpoints` 键被剥离、`id` 强制为 entry.id），此处只做字段校验与默认兜底。
 */
export function config (input: unknown): EpCfg {
  const base = (input && typeof input === 'object' ? input : {}) as Cfg
  const id = typeof base.id === 'string' && base.id.trim() !== '' ? base.id : ''
  if (!id) {
    throw new TypeError('douyin.endpoints[].id 必填（当前 endpoint 缺少账号实例 id）')
  }
  const result: EpCfg = { id }
  const copy = [
    'uid', 'cookies', 'msToken', 'deviceId', 'userAgent', 'accountsDir',
  ] as const
  for (const field of copy) {
    const value = base[field]
    if (typeof value === 'string' && value.trim() !== '') result[field] = value
  }
  return result
}

/* ---------------------------------------------------------------------------
 * 会话寻址
 * ------------------------------------------------------------------------- */

/**
 * 入站原始会话 → zhin ConversationRef。
 * endpoint.adapter 取 endpointKey 的 adapter 段（多实例 key 形如 `douyin\0<name>`）。
 * id 必须取完整 conversationId（私聊 `0:1:{uid_a}:{uid_b}`，群纯数字），否则出站 receiver 无效；
 * 会话短号放入 threadId，供 outAddr 回填 conversationShortId。
 */
export function inConv (endpointKey: string, address: ConversationAddress): ConversationRef {
  return {
    endpoint: { id: endpointKey, adapter: endpointKey.split('\0')[0] ?? endpointKey },
    kind: address.conversationType === 2 ? 'group' : 'private',
    id: address.conversationId || address.conversationShortId,
    ...(address.conversationShortId && address.conversationShortId !== address.conversationId
      ? { threadId: address.conversationShortId }
      : {}),
  }
}

/** zhin ConversationRef → 抖音 ConversationAddress（出站发送用）。 */
export function outAddr (conversation: ConversationRef): ConversationAddress {
  const shortId = conversation.threadId
    ?? (conversation.kind === 'group' ? conversation.id : '')
  return {
    conversationId: conversation.id,
    conversationShortId: shortId,
    conversationType: conversation.kind === 'group' ? 2 : 1,
  }
}

/* ---------------------------------------------------------------------------
 * 联系人寻址
 * ------------------------------------------------------------------------- */

/** 好友 uid → 会话地址：匹配 uid 或 conversationShortId。 */
export function friendAddr (
  list: readonly { uid: string; conversationShortId: string }[],
  uid: string,
): ConversationAddress | undefined {
  const friend = list.find(entry => entry.uid === uid || entry.conversationShortId === uid)
  if (!friend) return undefined
  return {
    conversationId: friend.conversationShortId,
    conversationShortId: friend.conversationShortId,
    conversationType: 1,
  }
}

/** 群 id → 会话地址：匹配 conversationShortId / conversationId / 群名。 */
export function groupAddr (
  list: readonly { conversationId: string; conversationShortId: string; name: string }[],
  id: string,
): ConversationAddress | undefined {
  const group = list.find(entry => {
    return entry.conversationShortId === id || entry.conversationId === id || entry.name === id
  })
  if (!group) return undefined
  return {
    conversationId: group.conversationId,
    conversationShortId: group.conversationShortId,
    conversationType: 2,
  }
}

/* ---------------------------------------------------------------------------
 * 发送器
 * ------------------------------------------------------------------------- */

/** 抖音 skey 表情键（faceId 1-6 的兼容映射表，与 karin 一致）。 */
export const KEYS: readonly string[] = [
  '[爱心]',
  '[调皮]',
  '[惊讶]',
  '[酷]',
  '[喜欢你]',
  '[墨镜脸]',
] as const

export function reaction (faceId: number | string): string | undefined {
  const index = Number(faceId)
  if (Number.isFinite(index) && index >= 1 && index <= KEYS.length) {
    return KEYS[index - 1]
  }
  return undefined
}