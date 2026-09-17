import { randomUUID } from 'node:crypto'
import { log } from './log.js'
import { Jar } from './jar.js'
import {
  AID,
  ORIGIN,
  APP_KEY,
  WEB_UA,
  DESKTOP_AID,
  DESKTOP_ORIGIN,
  DESKTOP_APP_KEY,
  aidSign,
  noonTs,
  normPath,
  randBiz,
  randHex,
} from './qsign.js'

export interface Resp<T = unknown> {
  ok: boolean
  status: number
  headers: Headers
  data: T
  rawText: string
}

export const FAIL = {
  captcha: 'captcha',
  'passport-verification': 'passport-verification',
  challenge: 'challenge',
  empty: 'empty',
  'invalid-json': 'invalid-json',
  http: 'http',
} as const
export type FailKind = keyof typeof FAIL

/** 仅携带诊断元数据，不包含请求 query、凭据与响应体 */
export class HttpErr extends Error {
  override readonly name = 'HttpErr'
  readonly kind: FailKind
  readonly status: number
  readonly endpoint: string
  readonly logId: string | undefined

  constructor (
    kind: FailKind,
    status: number,
    url: string,
    headers: Headers,
  ) {
    const endpoint = new URL(url).pathname
    const logId = headers.get('x-tt-logid') ?? undefined
    super(`Douyin ${kind}: HTTP ${status} ${endpoint}${logId ? ` (logid=${logId})` : ''}`)
    this.kind = kind
    this.status = status
    this.endpoint = endpoint
    this.logId = logId
  }
}

/** 仅用于 JSON 接口；HTML/protobuf 响应由调用方自行解码 */
export function parseJson<T> (response: Resp<string>, url: string): T {
  const { status, headers, rawText, ok } = response
  const fail = (kind: FailKind): never => {
    throw new HttpErr(kind, status, url, headers)
  }
  let decoded: unknown
  try {
    decoded = JSON.parse(rawText)
  } catch {
    if (headers.get('x-vc-bdturing-parameters')) return fail('captcha')
    if (headers.get('x-tt-verify-passport-decision')) return fail('passport-verification')
    if (/__ac_nonce|_\$jsvmprt/.test(rawText)) return fail('challenge')
    if (!ok) return fail('http')
    return fail(rawText.trim() ? 'invalid-json' : 'empty')
  }
  if (!ok) return fail('http')
  if (decoded === null || typeof decoded !== 'object') return fail('invalid-json')
  return decoded as T
}

export interface HttpConfig {
  userAgent?: string
  /** 默认请求超时毫秒；RequestInit.signal 显式传入时优先生效 */
  requestTimeoutMs?: number
  /** 浏览器复制的 Cookie 或上一轮会话 */
  initialCookies?: string
  msToken?: string
  /** 默认 true：Passport 查询串自动计算 a_bogus（供上层 signPassportQuery 读取） */
  enableABogus?: boolean
  /** 默认 true：按 path + 当日 UTC 正午 ts 自动计算 x-tt-passport-aid-sign */
  enableAutoAidSign?: boolean
  bizTraceId?: string
}

/**
 * 抖音 HTTP 客户端（creator-web）：Cookie/UA/超时封装 + Passport 请求头 + 标准参数。
 * 仅纯 HTTP 部分，登录流程由上层组装。
 */
export class Http {
  readonly jar: Jar
  readonly enableABogus: boolean
  readonly enableAutoAidSign: boolean
  bizTraceId: string
  /** 服务端注册的桌面设备身份（登录时注入；'0' 表示未注册） */
  deviceId = '0'
  installId = '0'
  guid = randHex(32)

  private readonly requestTimeoutMs: number
  private readonly userAgent: string
  private readonly verifyPortrait = `${randomUUID()}.login`

  constructor (config: HttpConfig = {}) {
    this.requestTimeoutMs = config.requestTimeoutMs ?? 30_000
    if (!Number.isSafeInteger(this.requestTimeoutMs) || this.requestTimeoutMs <= 0 || this.requestTimeoutMs > 2_147_483_647) {
      throw new RangeError('requestTimeoutMs must be an integer between 1 and 2147483647')
    }
    this.jar = new Jar(config.initialCookies)
    this.userAgent = config.userAgent ?? WEB_UA
    this.enableABogus = config.enableABogus ?? true
    this.enableAutoAidSign = config.enableAutoAidSign ?? true
    if (config.msToken != null) this.jar.set('msToken', config.msToken)
    this.bizTraceId = config.bizTraceId ?? this.jar.get('biz_trace_id') ?? randBiz()
    if (!this.jar.has('biz_trace_id')) this.jar.set('biz_trace_id', this.bizTraceId)
  }

  getCookies (): string {
    return this.jar.toHeader()
  }

  /** 导入已保存的会话 Cookie（恢复连接时注入，HTTP 通道以此识别 imapi 会话） */
  setCookies (cookies: string): void {
    this.jar.merge(cookies)
  }

  setMsToken (value: string): void {
    this.jar.set('msToken', value)
  }

  getMsToken (): string | undefined {
    return this.jar.get('msToken')
  }

  getUserAgent (): string {
    return this.userAgent
  }

  /** 注入服务端注册的桌面设备身份（device_register 签发） */
  setDevice (device: { deviceId: string; installId: string; guid: string }): void {
    this.deviceId = device.deviceId
    this.installId = device.installId
    this.guid = device.guid
  }

  hasDesktopDevice (): boolean {
    return this.deviceId !== '0' && /^\d+$/.test(this.deviceId)
  }

  /** 创作者平台标准查询参数（浏览器兼容格式） */
  buildStandardParams (): URLSearchParams {
    const params = new URLSearchParams({
      aid: '2906',
      app_name: 'aweme_creator_platform',
      device_platform: 'web',
      referer: '',
      user_agent: this.userAgent,
      cookie_enabled: 'true',
      screen_width: '1512',
      screen_height: '982',
      browser_language: 'zh-CN',
      browser_platform: 'MacIntel',
      browser_name: 'Mozilla',
      browser_version: this.userAgent.replace(/^Mozilla\//, ''),
      browser_online: 'true',
      timezone_name: 'Asia/Shanghai',
    })
    const msToken = this.getMsToken()
    if (msToken) params.set('msToken', msToken)
    return params
  }

  /** Passport 接口请求头；imdesktop（桌面客户端）与 creator（创作者 web）分流 */
  passportHeaders (requestUrl?: string): Record<string, string> {
    const desktop = Boolean(requestUrl?.startsWith(DESKTOP_ORIGIN))
    const headers: Record<string, string> = {
      Accept: 'application/json, text/javascript',
      Referer: desktop ? DESKTOP_ORIGIN : `${ORIGIN}/creator-micro/home`,
    }
    const csrf = this.jar.get('passport_csrf_token') ?? this.jar.get('passport_csrf_token_default')
    if (csrf) headers['x-tt-passport-csrf-token'] = csrf
    headers['x-tt-passport-trace-id'] = this.bizTraceId
    const aidSignHeader = this.resolveAidSign(requestUrl, desktop)
    if (aidSignHeader) headers['x-tt-passport-aid-sign'] = aidSignHeader
    if (desktop) {
      headers['x-tt-passport-verify-portrait'] = this.verifyPortrait
      return headers
    }
    const secsdk = buildSecsdkCsrfToken(this.jar.get('x-web-secsdk-uid'))
    if (secsdk) headers['x-secsdk-csrf-token'] = secsdk
    headers['x-tt-passport-verify-portrait'] = this.verifyPortrait
    return headers
  }

  private resolveAidSign (requestUrl?: string, desktop = false): string | undefined {
    if (!this.enableAutoAidSign || !requestUrl) return undefined
    try {
      const path = new URL(requestUrl).pathname
      return aidSign({
        aid: desktop ? DESKTOP_AID : AID,
        appKey: desktop ? DESKTOP_APP_KEY : APP_KEY,
        path: normPath(path),
        ts: noonTs(),
      })
    } catch {
      return undefined
    }
  }

  async requestRaw (url: string, init: RequestInit = {}): Promise<Resp<string>> {
    const res = await this.fetchResponse(url, init)
    const rawText = await res.text()
    const path = new URL(url, 'https://douyin.invalid').pathname
    log.debug(`[douyin:http] ${(init.method ?? 'GET').toUpperCase()} ${res.status} ${path}${rawText ? ` 响应: ${rawText.length > 5000 ? `${rawText.slice(0, 5000)}...(截断,共${rawText.length}字符)` : rawText}` : '(空)'}`)
    return { ok: res.ok, status: res.status, headers: res.headers, data: rawText, rawText }
  }

  async requestJson<T> (url: string, init: RequestInit = {}): Promise<Resp<T>> {
    const res = await this.requestRaw(url, init)
    const data = parseJson<T>(res, url)
    return { ...res, data }
  }

  async requestBytes (url: string, init: RequestInit = {}): Promise<{ ok: boolean; status: number; headers: Headers; data: Uint8Array }> {
    const res = await this.fetchResponse(url, init)
    const data = new Uint8Array(await res.arrayBuffer())
    const path = new URL(url, 'https://douyin.invalid').pathname
    const hexHead = [...data.slice(0, 256)].map(b => b.toString(16).padStart(2, '0')).join('')
    log.debug(`[douyin:http] ${(init.method ?? 'GET').toUpperCase()} ${res.status} ${path} (${data.byteLength} bytes) hex[${Math.min(256, data.byteLength)}]: ${hexHead}${data.byteLength > 256 ? '...' : ''}`)
    return { ok: res.ok, status: res.status, headers: res.headers, data }
  }

  private async fetchResponse (url: string, init: RequestInit): Promise<Response> {
    const cookie = this.jar.toHeader()
    const headers: Record<string, string> = {
      'User-Agent': this.userAgent,
      ...(init.headers as Record<string, string> | undefined),
    }
    if (cookie) headers.Cookie = cookie

    const res = await fetch(url, {
      ...init,
      headers,
      signal: init.signal ?? AbortSignal.timeout(this.requestTimeoutMs),
    })
    this.absorbSetCookie(res.headers)
    const msHeader = res.headers.get('x-ms-token')
    if (msHeader) this.setMsToken(msHeader)
    return res
  }

  private absorbSetCookie (headers: Headers): void {
    const list = typeof headers.getSetCookie === 'function'
      ? headers.getSetCookie()
      : collectSetCookieFallback(headers)
    for (const line of list) {
      this.jar.mergeSetCookie(line)
    }
  }
}

function collectSetCookieFallback (headers: Headers): string[] {
  const raw = (headers as Headers & { raw?: () => Record<string, string[]> }).raw?.()
  if (!raw?.['set-cookie']) {
    const single = headers.get('set-cookie')
    return single ? [single] : []
  }
  return raw['set-cookie']
}

/** 常见形态：`000100000001` + `x-web-secsdk-uid` 去连字符 */
function buildSecsdkCsrfToken (webSecsdkUid?: string): string | undefined {
  if (!webSecsdkUid) return undefined
  return `000100000001${webSecsdkUid.replace(/-/g, '')}`
}