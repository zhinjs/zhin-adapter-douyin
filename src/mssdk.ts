import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { createHash } from 'node:crypto'
import { aBogus, FINGERPRINT } from './sign.js'
import { AID, ORIGIN } from './qsign.js'
import type { Http } from './http.js'

const MSSDK_ORIGIN = 'https://mssdk.bytedance.com'

const MSSDK_MAGIC = 538969122

interface MssdkTokenBodyTemplate {
  magic: number
  version: number
  dataType: number
  strData: string
  ulr: number
}

interface BuildMssdkTokenBodyOptions {
  strData?: string
  tspFromClient?: number
}

const DEFAULT_TEMPLATE_PATH = join(process.cwd(), 'fixtures/captured/bootstrap/mssdk_token.body.json')

export function mssdkTpl (
  filePath = process.env['MSSDK_STR_DATA_PATH'],
): MssdkTokenBodyTemplate {
  const paths = filePath ? [filePath] : [DEFAULT_TEMPLATE_PATH]
  for (const p of paths) {
    try {
      const raw = JSON.parse(readFileSync(p, 'utf8')) as Record<string, unknown>
      const strData = String(raw['strData'] ?? '')
      if (!strData) continue
      return {
        magic: Number(raw['magic'] ?? MSSDK_MAGIC),
        version: Number(raw['version'] ?? 1),
        dataType: Number(raw['dataType'] ?? 8),
        strData,
        ulr: Number(raw['ulr'] ?? 0),
      }
    } catch {
      continue
    }
  }
  throw new Error(
    'MSSDK strData template not found; set MSSDK_STR_DATA_PATH or add fixtures/captured/bootstrap/mssdk_token.body.json',
  )
}

function getMssdkTokenTemplate (): MssdkTokenBodyTemplate {
  return mssdkTpl()
}

export function mssdkBody (options: BuildMssdkTokenBodyOptions = {}): string {
  const tpl = options.strData
    ? { ...getMssdkTokenTemplate(), strData: options.strData }
    : getMssdkTokenTemplate()
  return JSON.stringify({
    magic: tpl.magic,
    version: tpl.version,
    dataType: tpl.dataType,
    strData: tpl.strData,
    tspFromClient: options.tspFromClient ?? Date.now(),
    ulr: tpl.ulr,
  })
}

interface FetchMssdkTokenOptions {
  strData?: string
  tspFromClient?: number
}

export async function mssdkFetch (
  http: Http,
  options: FetchMssdkTokenOptions = {},
): Promise<string | undefined> {
  const body = mssdkBody(options)
  const res = await http.requestRaw(`${MSSDK_ORIGIN}/web/r/token?ms_appid=${AID}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'text/plain;charset=UTF-8',
      Origin: ORIGIN,
      Referer: `${ORIGIN}/`,
    },
    body,
  })
  const header = res.headers.get('x-ms-token')
  if (header) {
    http.setMsToken(header)
    return header
  }
  return http.getMsToken()
}

export const SIGN_CMDS = new Set([100, 609, 610, 611])

interface FrontierSignOptions {
  userAgent?: string
  screenFingerprint?: string
}

export function frontierHdrs (
  payload: Uint8Array,
  opts: FrontierSignOptions = {},
): { key: string; value: string }[] {
  const stub = createHash('md5').update(payload).digest('hex')
  const headers: { key: string; value: string }[] = [
    { key: 'X-MS-STUB', value: stub },
  ]

  const userAgent =
    opts.userAgent ??
    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/148.0.0.0 Safari/537.36'

  try {
    const xBogus = aBogus({
      userAgent,
      query: stub,
      body: '',
      screenFingerprint: opts.screenFingerprint ?? FINGERPRINT,
      bdmsPreset: '1.0.1.16',
    })
    if (xBogus) {
      headers.push({ key: 'X-Bogus', value: xBogus })
    }
  } catch {
  }

  return headers
}

export function srcInfo (plain: string): string {
  let out = ''
  for (const ch of plain) {
    out += ((ch.codePointAt(0) ?? 0) ^ 5).toString(16)
  }
  return out
}

export function srcInfoDec (encoded: string): string {
  const chars: string[] = []
  let i = 0
  while (i < encoded.length) {
    if (i + 2 <= encoded.length) {
      try {
        const b = Number.parseInt(encoded.slice(i, i + 2), 16)
        chars.push(String.fromCodePoint(b ^ 5))
        i += 2
        continue
      } catch {
      }
    }
    const b = Number.parseInt(encoded.slice(i, i + 1), 16)
    chars.push(String.fromCodePoint(b ^ 5))
    i += 1
  }
  return chars.join('')
}

export function encInfo (browserInfo: Record<string, unknown>): string {
  return srcInfo(JSON.stringify(browserInfo))
}

export const BROWSER_INFO: Record<string, unknown> = {
  hardwareConcurrency: 10,
  webdriver: false,
  chromedriver: false,
  shelldriver: false,
  plugins: 5,
  permissions: [{ name: 'notifications', state: 'prompt' }],
  innerHeight: 982,
  innerWidth: 1728,
  outerHeight: 1117,
  outerWidth: 1728,
  stoargeStatus: {
    indexedDB: {
      idb: 'object',
      open: 'function',
      indexedDB: 'object',
      IDBKeyRange: 'function',
      openDatabase: 'undefined',
      isSafari: false,
      hasFetch: true,
    },
    localStorage: { isSupportLStorage: true, size: 0, write: true },
    storageQuotaStatus: { usage: 0, quota: 10737426463, isPrivate: false },
  },
  webgl: {
    vendor: 'Google Inc. (Apple)',
    renderer:
      'ANGLE (Apple, ANGLE Metal Renderer: Apple M5, Unspecified Version)',
  },
  notificationPermission: 'default',
  performance: {
    timeOrigin: Date.now(),
    usedJSHeapSize: 50_000_000,
    navigationTiming: {
      entryType: 'navigation',
      initiatorType: 'navigation',
      name: 'https://creator.douyin.com/creator-micro/home',
    },
  },
  request_host: 'creator.douyin.com',
  request_pathname: '/creator-micro/home',
  browser: {
    t: String(Date.now()),
    bit_protocol: 'false',
    bit_helper: false,
  },
}

export function deskInfo (deviceId: string): Record<string, unknown> {
  return {
    hardwareConcurrency: 8,
    webdriver: false,
    chromedriver: false,
    shelldriver: false,
    plugins: 5,
    permissions: [{ name: 'notifications', state: 'granted' }],
    innerHeight: 484,
    innerWidth: 726,
    outerHeight: 484,
    outerWidth: 726,
    stoargeStatus: {
      indexedDB: {
        idb: 'object', open: 'function', indexedDB: 'object', IDBKeyRange: 'function',
        openDatabase: 'function', isSafari: false, hasFetch: false,
      },
      localStorage: { isSupportLStorage: true, size: 1993, write: true },
      storageQuotaStatus: { usage: 0, quota: 36104626176, isPrivate: false },
    },
    webgl: {
      vendor: 'Google Inc. (Google)',
      renderer: 'ANGLE (Google, Vulkan 1.3.0 (SwiftShader Device (Subzero) (0x0000C0DE)), SwiftShader driver)',
    },
    notificationPermission: 'granted',
    performance: {
      timeOrigin: 1787813991280.3,
      usedJSHeapSize: 18200000,
      navigationTiming: {
        decodedBodySize: 2527,
        entryType: 'navigation',
        initiatorType: 'navigation',
        name: `file:///renderer/login/index.html?window=login&channel=0&guid=${deviceId}`,
        renderBlockingStatus: 'non-blocking',
      },
    },
    request_host: '',
    request_pathname: '/renderer/login/index.html',
    browser: { t: '7781993187871', bit_protocol: 'false', bit_helper: false },
  }
}