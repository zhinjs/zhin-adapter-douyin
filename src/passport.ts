/**
 * desktop lite Passport 传输层（imdesktop 域 + jumpbyte a_bogus 签名）。
 * 供扫码 MFA（qr.ts）与登录安全验证（verif.ts）共用。
 */
import { DESKTOP_VER, deskParams, randHex, randToken } from './qsign.js'
import { jaBogus } from './sign.js'
import type { Http } from './http.js'
import type { MfaResp } from './qr.js'

export const LITE_AID = '339757'

/** 设备 ID 兜底：进程级随机 hex。登录时若已注册桌面设备则优先用注册 DID */
const LITE_DEVICE_ID = randHex(16)

const baseQuery = (deviceId?: string): Record<string, string> => ({
  passport_jssdk_version: '5.1.2',
  passport_jssdk_type: 'lite',
  is_from_ttaccountsdk: '1',
  aid: LITE_AID,
  language: 'zh',
  account_app_language: 'zh',
  is_new_login: '1',
  is_from_iesaccountsaas: '1',
  biz_trace_id: randHex(8),
  new_authn_sdk_version: '1.0.0.421-web',
  device_id: deviceId ?? LITE_DEVICE_ID,
  iid: '0',
  version_code: DESKTOP_VER,
  device_platform: 'PC',
})

/** desktop lite Passport 表单 POST（imdesktop 域 + jumpbyte a_bogus） */
export async function litePost (
  http: Http,
  path: string,
  body: Record<string, string>,
): Promise<MfaResp> {
  const query = { ...baseQuery(http.hasDesktopDevice() ? http.deviceId : undefined), msToken: randToken() }
  const bodyWire = deskParams(body)
  const queryWire = deskParams(query)
  const aBogus = jaBogus({
    userAgent: http.getUserAgent(),
    query: queryWire,
    body: bodyWire,
  })
  const url = `https://imdesktop.douyin.com${path}?${queryWire}&a_bogus=${encodeURIComponent(aBogus)}`
  const res = await http.requestJson<MfaResp>(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Referer: 'https://imdesktop.douyin.com',
    },
    body: bodyWire,
  })
  if (!res.ok) {
    throw new Error(`${path} failed: HTTP ${res.status} ${res.rawText.slice(0, 200)}`)
  }
  return res.data
}