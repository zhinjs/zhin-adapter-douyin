import { createHash, createHmac, randomBytes } from 'node:crypto'

export const ORIGIN = 'https://creator.douyin.com'

export const AID = '2906'

const PASSPORT_JSSDK_VERSION = '2.4.3'

export const SDK_META = {
  passport_jssdk_version: PASSPORT_JSSDK_VERSION,
  passport_jssdk_type: 'normal',
  is_from_ttaccountsdk: '1',
  language: 'zh',
  account_sdk_source: 'web',
  p_js_v: PASSPORT_JSSDK_VERSION,
  p_js_t: 'pro',
  p_zt: '3.3.1',
  p_ver: '1.0.29',
  request_host: 'https%3A%2F%2Fcreator.douyin.com',
  p_bd: '1.0.1.16',
  is_from_iesaccountsaas: '1',
} as const

export const APP_KEY = '6ddd3ec693f3a124adb29b91b244ece5'

export const DESKTOP_ORIGIN = 'https://imdesktop.douyin.com'
export const DESKTOP_AID = '339757'
export const DESKTOP_VER = '1.2.1'
export const DESKTOP_APP_KEY = '3c452fb664e3de0e936108429a0bc697'
export const LOGIN_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) douyinim/1.2.1 Chrome/130.0.6723.58 Electron/33.2.0-rs.21.release.main.1 Safari/537.36'
export const WEB_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'

const AC_SIGNATURE_HEAD_SEC = '_02B4Z6wo00f01'
const AC_SIGNATURE_HEAD_MS = '_02B4Z6wo00101'

function initNumCalc (calcStr: string, startVal = 0): number {
  let v = startVal
  for (let i = 0; i < calcStr.length; i++) {
    v = ((v ^ calcStr.charCodeAt(i)) * 65599) >>> 0
  }
  return v
}

function getAsciiCode (num: number): number {
  if (num < 26) return num + 65
  if (num < 52) return num + 71
  if (num < 62) return num - 4
  return num - 17
}

function convertToStr (num: number): string {
  let str = ''
  for (const shift of [24, 18, 12, 6, 0]) {
    str += String.fromCharCode(getAsciiCode((num >> shift) & 63))
  }
  return str
}

function checksumTail (signatureWithoutTail: string): string {
  let lastNum = 0
  for (const ch of signatureWithoutTail) {
    lastNum = (lastNum * 65599 + ch.charCodeAt(0)) >>> 0
  }
  return lastNum.toString(16).slice(-2)
}

interface AcSignatureOptions {
  url: string
  acNonce: string
  userAgent: string
  timestampSec?: number
}

export function acSign (options: AcSignatureOptions): string {
  const { url, acNonce, userAgent } = options
  const nowSec = options.timestampSec ?? Math.floor(Date.now() / 1000)
  const nowTime = String(nowSec)

  let acSignature = AC_SIGNATURE_HEAD_SEC
  const timeNum = initNumCalc(nowTime)
  const urlNum = initNumCalc(url, timeNum)
  let binaryNum = (
    (Number(nowTime) ^ ((urlNum % 65521) * 65521)) >>> 0
  ).toString(2)
  binaryNum = binaryNum.padStart(32, '0')
  binaryNum = `10000000110000${binaryNum}`
  const decNum = parseInt(binaryNum, 2)

  acSignature += convertToStr(decNum >> 2)
  acSignature += convertToStr((decNum << 28) | 515)
  acSignature += convertToStr((-1073741824) | ((1219955485 ^ decNum) >>> 6))
  acSignature += String.fromCharCode(
    getAsciiCode((1219955485 ^ decNum) & 63),
  )

  const decInitNum = initNumCalc(String(decNum))
  const nonceNum = initNumCalc(acNonce, decInitNum)
  const uaNum = initNumCalc(userAgent, decInitNum)
  acSignature += convertToStr(
    (((uaNum % 65521) << 16) | (nonceNum % 65521)) >> 2,
  )
  acSignature += convertToStr(
    ((((uaNum % 65521) << 16) ^ (nonceNum % 65521)) << 28) |
      ((524576 ^ decNum) >>> 4),
  )
  acSignature += convertToStr(urlNum % 65521)
  acSignature += checksumTail(acSignature)
  return acSignature
}

interface AcSignatureMsOptions {
  url: string
  acNonce: string
  userAgent: string
  timestampMs?: number
}

export function acSignMs (options: AcSignatureMsOptions): string {
  const { url, acNonce, userAgent } = options
  const oneTimeStamp = options.timestampMs ?? Date.now()
  const timeStampS = String(oneTimeStamp)

  const calOneStr = (oneStr: string, orgiIv: number): number => {
    let k = orgiIv
    for (let i = 0; i < oneStr.length; i++) {
      k = ((k ^ oneStr.charCodeAt(i)) * 65599) >>> 0
    }
    return k
  }

  const calOneStr3 = (oneStr: string, orgiIv: number): number => {
    let k = orgiIv
    for (let i = 0; i < oneStr.length; i++) {
      k = (k * 65599 + oneStr.charCodeAt(i)) >>> 0
    }
    return k
  }

  const encNumToStr = (oneOrgiEnc: number): string => {
    let s = ''
    for (let i = 24; i >= 0; i -= 6) {
      s += String.fromCharCode(getAsciiCode((oneOrgiEnc >> i) & 63))
    }
    return s
  }

  const a = calOneStr(url, calOneStr(timeStampS, 0)) % 65521
  const b = parseInt(
    `10000000110000${parseInt(
      String((oneTimeStamp ^ (a * 65521)) >>> 0),
      10,
    )
      .toString(2)
      .padStart(32, '0')}`,
    2,
  )
  const bS = String(b)
  const c = calOneStr(bS, 0)
  const d = encNumToStr(b >> 2)
  const e = (b / 4294967296) >>> 0
  const f = encNumToStr((b << 28) | (e >>> 4))
  const g = 582085784 ^ b
  const h = encNumToStr((e << 26) | (g >>> 6))
  const i = String.fromCharCode(getAsciiCode(g & 63))
  const j =
    ((calOneStr(userAgent, c) % 65521) << 16) |
    (calOneStr(acNonce, c) % 65521)
  const k = encNumToStr(j >> 2)
  const l = encNumToStr((j << 28) | ((524576 ^ b) >>> 4))
  const m = encNumToStr(a)
  const n = AC_SIGNATURE_HEAD_MS + d + f + h + i + k + l + m
  const o = parseInt(String(calOneStr3(n, 0)), 10).toString(16).slice(-2)
  return n + o
}

function hmacSha256Hex (key: Uint8Array, message: Uint8Array): string {
  return createHmac('sha256', Buffer.from(key))
    .update(Buffer.from(message))
    .digest('hex')
}

function hexToBytes (hex: string): Uint8Array {
  const normalized = hex.length % 2 === 1 ? `0${hex}` : hex
  return Uint8Array.from(Buffer.from(normalized, 'hex'))
}

function derivePassportSignKey (
  password: Uint8Array,
  salt: Uint8Array,
  extra: Uint8Array,
  length = 32,
): Uint8Array {
  let pw = password
  if (pw.length === 0) {
    pw = new Uint8Array(32)
  }
  const firstHex = hmacSha256Hex(pw, salt)
  const fixedKey = hexToBytes(firstHex)
  let rollingHex = firstHex
  const out: number[] = []
  for (let round = 1; out.length < length; round += 1) {
    const msg = Uint8Array.from([
      ...hexToBytes(rollingHex),
      ...extra,
      round,
    ])
    rollingHex = hmacSha256Hex(fixedKey, msg)
    out.push(...hexToBytes(rollingHex))
  }
  return Uint8Array.from(out.slice(0, length))
}

interface PassportAidSignInput {
  aid: string
  path: string
  ts?: string
  appKey?: string
}

export function aidSign (input: PassportAidSignInput): string {
  const appKey = input.appKey ?? APP_KEY
  const ts = input.ts ?? ''
  const enc = new TextEncoder()
  const key = derivePassportSignKey(
    enc.encode(ts),
    enc.encode(appKey),
    new Uint8Array(0),
    32,
  )
  const message = `aid=${input.aid}&path=${input.path}&ts=${ts}`
  return hmacSha256Hex(key, enc.encode(message))
}

export function normPath (
  path: string,
  hostname = 'creator.douyin.com',
): string {
  if (path.startsWith('/passport') || hostname.includes('sso')) {
    return path
  }
  return `/passport/sso${path}`
}

export function noonTs (date: Date = new Date()): string {
  const noon = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    12,
    0,
    0,
    0,
  )
  return String(Math.floor(noon / 1000))
}

export function mix (plain: string): string {
  const bytes = Buffer.from(plain, 'utf8')
  let out = ''
  for (let i = 0; i < bytes.length; i++) {
    out += ((bytes[i]! ^ 5).toString(16).padStart(2, '0'))
  }
  return out
}

interface PassportSignQsInput {
  query: Record<string, string>
  body?: Record<string, string>
  appKey?: string
}

interface PassportSignQsOutput {
  sign: string
  qs: string
}

function sortedParamString (obj: Record<string, string>, keepFirstN?: number): {
  str: string
  keys: string[]
} {
  let keys = Object.keys(obj).sort()
  if (keepFirstN !== undefined && keepFirstN >= 0) {
    keys = keys.slice(0, keepFirstN)
  }
  const str = keys
    .map((k) => {
      const v = obj[k]
      const val =
        typeof v === 'object' && v !== null ? JSON.stringify(v) : String(v)
      return `${k}=${val}`
    })
    .join('&')
  return { str, keys }
}

function encodeQsKeyNames (keyNames: string[]): string {
  const input = keyNames.join(',')
  const out: string[] = []
  for (let i = 0; i < input.length; i++) {
    const cp = input.charCodeAt(i)
    const bytes: number[] = []
    if (cp >= 0 && cp <= 0x7f) {
      bytes.push(cp)
    } else if (cp >= 0x80 && cp <= 0x7ff) {
      bytes.push(0xc0 | (31 & (cp >> 6)), 0x80 | (63 & cp))
    } else if (
      (cp >= 0x800 && cp <= 0xd7ff) ||
      (cp >= 0xe000 && cp <= 0xffff)
    ) {
      bytes.push(
        0xe0 | (15 & (cp >> 12)),
        0x80 | (63 & (cp >> 6)),
        0x80 | (63 & cp),
      )
    }
    for (const b of bytes) {
      out.push((5 ^ b).toString(16))
    }
  }
  return out.join('')
}

export function signQs (input: PassportSignQsInput): PassportSignQsOutput {
  const appKey = input.appKey ?? APP_KEY
  const body = input.body ?? {}
  const { str: queryStr, keys } = sortedParamString(input.query, 10)
  const { str: bodyStr } = sortedParamString(body)
  const payload = `${queryStr}&${bodyStr}&app_key=${appKey}`
  const sign = createHash('sha256').update(payload, 'utf8').digest('hex')
  const qs = encodeQsKeyNames(keys)
  return { sign, qs }
}

export function randBiz (): string {
  return randomBytes(4).toString('hex')
}

export function formBody (body: Record<string, string>): string {
  return Object.keys(body)
    .map((key) => {
      const value = body[key] ?? ''
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    })
    .join('&')
}

export function passportUrl (path: string, search: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${ORIGIN}${normalized}?${search}`
}

export function deskPassportUrl (path: string, search: string): string {
  const normalized = path.startsWith('/') ? path : `/${path}`
  return `${DESKTOP_ORIGIN}${normalized}?${search}`
}

interface DesktopPassportQueryOptions {
  deviceId: string
  installId: string
  accountSdkSourceInfo?: string
  bizTraceId?: string
  next?: string
  extra?: Record<string, string>
}

export function deskQs (opts: DesktopPassportQueryOptions): Record<string, string> {
  return {
    passport_jssdk_version: '2.4.12',
    passport_jssdk_type: 'normal',
    is_from_ttaccountsdk: '1',
    aid: DESKTOP_AID,
    language: 'zh',
    ts: noonTs(),
    ...(opts.next ? { next: opts.next } : {}),
    ...(opts.extra ?? {}),
    is_new_login: '1',
    is_from_iesaccountsaas: '1',
    account_sdk_source: 'web',
    account_sdk_source_info: opts.accountSdkSourceInfo ?? '',
    p_js_v: '2.4.12',
    p_js_t: 'pro',
    p_zt: '3.3.5',
    p_ver: '1.0.29',
    request_host: 'file://',
    p_bd: '1.0.1.7',
    biz_trace_id: opts.bizTraceId ?? randBiz(),
    device_id: opts.deviceId,
    iid: opts.installId,
    version_code: DESKTOP_VER,
    device_platform: 'PC',
  }
}

const DESKTOP_PARAM_ORDER: Readonly<Record<string, number>> = {
  passport_jssdk_version: 0,
  passport_jssdk_type: 1,
  is_from_ttaccountsdk: 2,
  aid: 3,
  language: 4,
  account_app_language: 5,
  ts: 6,
  next: 7,
  need_logo: 8,
  need_short_url: 9,
  is_new_login: 10,
  is_from_iesaccountsaas: 11,
  account_sdk_source: 12,
  account_sdk_source_info: 13,
  p_js_v: 14,
  p_js_t: 15,
  p_zt: 16,
  p_ver: 17,
  request_host: 18,
  p_bd: 19,
  biz_trace_id: 20,
  new_authn_sdk_version: 21,
  device_id: 22,
  iid: 23,
  version_code: 24,
  device_platform: 25,
  sign: 100,
  qs: 101,
  msToken: 102,
  a_bogus: 103,
}

export function deskParams (params: Record<string, string>): string {
  return Object.keys(params)
    .sort((left, right) => {
      const leftOrder = DESKTOP_PARAM_ORDER[left]
      const rightOrder = DESKTOP_PARAM_ORDER[right]
      if (leftOrder != null && rightOrder != null) return leftOrder - rightOrder
      if (leftOrder != null) return -1
      if (rightOrder != null) return 1
      return left < right ? -1 : left > right ? 1 : 0
    })
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key] ?? '')}`)
    .join('&')
}

const RANDOM_ALPHABET = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_'

export function randToken (length = 128): string {
  return [...randomBytes(length)].map((value) => RANDOM_ALPHABET[value & 63]).join('')
}

export function randHex (length: number): string {
  return [...randToken(length)].map((value) => '0123456789abcdef'[value.charCodeAt(0) & 15]).join('')
}