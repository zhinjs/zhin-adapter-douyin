import type { LoginAssist } from '@zhin.js/core'
import { formatCompact } from '@zhin.js/logger'
import type { Http } from './http.js'
import { getQr, pollQr } from './qr.js'
import type { Qs } from './qr.js'

type Logger = {
  info(message: string): void
  warn(message: string): void
  debug(message: string): void
}

export interface Opts {
  http: Http
  assist: LoginAssist
  adapter: string
  endpointKey: string
  owner: object
  logger: Logger
  /** 单步输入超时（sms / auth），默认 3 分钟 */
  stepTimeoutMs?: number
  /** 扫码轮询超时，默认 120 秒 */
  pollTimeoutMs?: number
  /** 二维码就绪回调（dataURL 图片 + 跳转链接）；经此把二维码发到命令会话，而非终端待办 */
  onQr?: (image: string, url?: string) => void
  /** 验证中心二次验证回调（把官方验证页链接推送到命令会话，供用户打开完成滑块/短信验证） */
  onVerifyUrl?: (url: string) => void
  /** 短信/密码二次验证回调：由命令层实现（等用户在会话里用「抖音验证 <code>」提交）；缺省回退 LoginAssist 待办 */
  onMfa?: (info: { maskedMobile?: string; kind?: 'sms' | 'password' }) => string | Promise<string>
  /** 扫码状态变化回调（new/scanned/verifying/verified/confirmed…），透传给命令会话做实时提示 */
  onStatus?: (status: string) => void
  /** 链路追踪：追加到 qr_trace 日志 */
  trace?: (line: string) => void
}

/**
 * 驱动一次抖音扫码登录：投递二维码待办 → 轮询扫码状态 →
 * 二次验证（短信/密码/链接验证）经 LoginAssist 挂起待办等待输入。
 * 成功返回 QrSession；失败抛错并清理该 owner 的全部待办。
 */
export async function runQrLogin (options: Opts): Promise<Qs> {
  const { http, assist, adapter, endpointKey, owner, logger } = options
  const stepTimeoutMs = options.stepTimeoutMs ?? 180_000
  assist.cancelOwned(owner, 'replaced_by_qrcode')

  const qr = await getQr(http)
  logger.info(formatCompact({ op: 'qr_ready', endpoint: endpointKey, expire: qr.expireTime }))
  // 扫码轮询无需人工输入，不投递 LoginAssist 待办（避免 CLI 终端打印），改由 onQr 把二维码图发到会话
  options.onQr?.(`data:image/png;base64,${qr.qrcodeBase64}`, qr.qrcodeIndexUrl)

  try {
    // 与展示给用户的二维码同一 token 轮询（qrLogin 会重新取码导致扫码不生效，参考 Karin 同 token 轮询）
    const session = await pollQr(http, qr.token, {
      timeoutMs: options.pollTimeoutMs ?? 120_000,
      onStatus: status => {
        logger.info(formatCompact({ op: 'qr_status', endpoint: endpointKey, status }))
        options.onStatus?.(status)
      },
      trace: line => logger.debug(formatCompact({ op: 'qr_trace', endpoint: endpointKey, line: options.trace ? `${options.trace(line)} - ${line}` : line })),
      onVerifyUrl: url => {
        logger.warn(formatCompact({ op: 'qr_verify', endpoint: endpointKey, url }))
        options.onVerifyUrl?.(url)
        void assist.waitForInput(adapter, endpointKey, 'auth', {
          message: '扫码触发安全验证，请在浏览器完成验证后回来确认',
          url,
        }, { owner, timeoutMs: stepTimeoutMs }).catch(() => undefined)
      },
      onMfa: options.onMfa
        ? (info) => options.onMfa!({
          maskedMobile: info.maskedMobile,
          kind: info.kind === 'password' ? 'password' : 'sms',
        })
        : async info => {
            const type = info.kind === 'password' ? 'auth' : 'sms'
            const value = await assist.waitForInput(adapter, endpointKey, type, {
              message: info.kind === 'password'
                ? '扫码触发密码二次验证，请提交账号密码'
                : `扫码触发短信验证，请提交收到的验证码${info.maskedMobile ? `（${info.maskedMobile}）` : ''}`,
            }, { owner, timeoutMs: stepTimeoutMs })
            return loginValue(value)
          },
    })
    assist.cancelOwned(owner, 'login_ok')
    logger.info(formatCompact({ op: 'login_ok', endpoint: endpointKey, uid: session.platformUid }))
    return session
  } catch (error) {
    assist.cancelOwned(owner, 'login_failed')
    logger.warn(formatCompact({
      op: 'login_failed',
      endpoint: endpointKey,
      error: error instanceof Error ? error.message : String(error),
    }))
    throw error
  }
}

export function loginValue (value: string | Record<string, unknown>): string {
  if (typeof value === 'string') return value.trim()
  for (const key of ['code', 'password', 'ticket', 'value']) {
    if (typeof value[key] === 'string') return (value[key] as string).trim()
  }
  return JSON.stringify(value)
}