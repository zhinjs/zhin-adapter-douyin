import type { ConversationRef } from '@zhin.js/im-contract';

/* ---------------------------------------------------------------------------
 * 配置模型
 * ------------------------------------------------------------------------- */

/** 单个 Douyin endpoint（账号）配置 */
export interface EpCfg {
  /** 实例 key（唯一） */
  id: string;
  /** 抖音平台 UID（纯数字字符串）；会话恢复 / 本地账号标识 */
  uid?: string;
  /** 手动注入 cookie；未提供且本地无账号时走扫码登录 */
  cookies?: string;
  /** UA 覆盖 */
  userAgent?: string;
  [key: string]: unknown;
}

export interface Cfg {
  /** 会话落盘目录（默认 `<cwd>/data/douyin/accounts`） */
  accountsDir?: string;
  /** 全局 UA 覆盖 */
  userAgent?: string;
  endpoints?: EpCfg[];
  [key: string]: unknown;
}

/**
 * 解析单个 endpoint 配置。
 * 框架多端点展开后 `context.config` 已是「顶层共享 + entry 覆盖」的 per-endpoint view，
 * 此处只做字段校验与默认兜底。
 */
export function config(input: unknown): EpCfg {
  const base = (input && typeof input === 'object' ? input : {}) as Cfg;
  const id = typeof base.id === 'string' && base.id.trim() !== '' ? base.id : '';
  if (!id) {
    throw new TypeError('douyin.endpoints[].id 必填（当前 endpoint 缺少账号实例 id）');
  }
  const result: EpCfg = { id };
  const copy = ['uid', 'cookies', 'userAgent'] as const;
  for (const field of copy) {
    const value = base[field];
    if (typeof value === 'string' && value.trim() !== '') result[field] = value;
  }
  return result;
}

/* ---------------------------------------------------------------------------
 * 会话寻址
 * ------------------------------------------------------------------------- */

/**
 * 入站原始会话信息 → zhin ConversationRef。
 * id 取完整 conversationId（私聊形如 `0:1:{uid_a}:{uid_b}`，群纯数字）；
 * 会话短号放入 threadId，供出站回填 conversationShortId。
 */
export function inConv(
  endpointKey: string,
  address: {
    conversationId?: string;
    conversationShortId?: string;
    conversationType?: number;
  },
): ConversationRef {
  return {
    endpoint: { id: endpointKey, adapter: endpointKey.split('\0')[0] ?? endpointKey },
    kind: address.conversationType === 2 ? 'group' : 'private',
    id: address.conversationId || address.conversationShortId || '',
    ...(address.conversationShortId && address.conversationShortId !== address.conversationId
      ? { threadId: address.conversationShortId }
      : {}),
  };
}

/** zhin ConversationRef → SDK chatId（`type:shortId:conversationId`）。 */
export function outAddr(conversation: ConversationRef): string {
  const shortId = conversation.threadId
    ?? (conversation.kind === 'group' ? conversation.id : '');
  return `${conversation.kind === 'group' ? 2 : 1}:${shortId}:${conversation.id}`;
}