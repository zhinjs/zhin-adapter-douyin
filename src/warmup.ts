import { AID, DESKTOP_ORIGIN, DESKTOP_VER, formBody, passportUrl } from './qsign.js'
import { aBogus } from './sign.js'
import type { Http } from './http.js'

interface SelfProfile {
  uid?: string
  nickname?: string
  /** 真实头像（avatar_thumb.url_list 首个；passport 的 avatar_url 是 mosaic 占位） */
  avatar?: string
}

/** GET /aweme/v1/web/user/profile/self/ — 桌面 IM 自我资料（对齐 douyin-im getSelfProfile） */
export async function self (http: Http): Promise<SelfProfile> {
  const params = new URLSearchParams({
    aid: '339757',
    version_name: DESKTOP_VER,
    version_code: DESKTOP_VER,
    device_platform: 'win32',
    screen_width: '1707',
    screen_height: '1067',
    browser_language: 'zh-CN',
    browser_platform: 'Win32',
    browser_name: 'Mozilla',
    browser_version: http.getUserAgent().replace(/^Mozilla\//, ''),
    browser_online: 'true',
    cookie_enabled: 'true',
    device_id: http.deviceId,
    did: http.deviceId,
    iid: http.installId,
    awemeim_guid: http.guid,
    channel: '0',
  })
  const url = `${DESKTOP_ORIGIN}/aweme/v1/web/user/profile/self/?${params}`
  const res = await http.requestJson<Record<string, unknown>>(url, { method: 'GET' })
  const user = (res.data['user'] ?? {}) as Record<string, unknown>
  const nickname = typeof user['nickname'] === 'string' ? user['nickname'] : undefined
  const uid = user['uid'] ?? user['user_id_str'] ?? user['user_id']
  // 对齐 douyin-im mapProfile：真实头像在 avatar_thumb.url_list
  const thumb = user['avatar_thumb'] as { url_list?: unknown } | undefined
  const avatar = Array.isArray(thumb?.url_list)
    ? thumb.url_list.find((u): u is string => typeof u === 'string' && u !== '')
    : undefined
  return {
    ...(uid != null ? { uid: String(uid) } : {}),
    ...(nickname ? { nickname } : {}),
    ...(avatar ? { avatar } : {}),
  }
}

/**
 * 护照预热（会话恢复用）：get_client_cert（等价参考实现 skipPassportWarmup 第一步）。
 * 使服务端 Set-Cookie `bd_ticket_guard_server_data`（设备认证数据，
 * Cookie 通道发送内容审核的关键信任凭据）。
 */
export async function warmup (http: Http): Promise<void> {
  await getClientCert(http)
}

/** POST /passport/ticket_guard/get_client_cert/，服务端下发 bd_ticket_guard_server_data */
async function getClientCert (http: Http): Promise<void> {
  const query: Record<string, string> = { aid: AID, msToken: http.getMsToken() ?? '' }
  if (query.msToken) {
    query.a_bogus = aBogus({
      userAgent: http.getUserAgent(),
      query: new URLSearchParams(query).toString(),
      body: '',
    })
  }
  const search = new URLSearchParams(query).toString()
  await http.requestRaw(passportUrl('/passport/ticket_guard/get_client_cert/', search), {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: formBody({ server_data: '1', aid: AID }),
  })
}

/** 桌面端 ttwid 预热（imdesktop 域，对齐 douyin-im ttwidCheck；失败不阻断登录） */
export async function twid (http: Http): Promise<void> {
  const body = JSON.stringify({
    aid: 339757,
    service: 'imdesktop.douyin.com',
    unionHost: 'https://ttwid.bytedance.com',
    host: 'https://imdesktop.douyin.com',
    union: false,
    needFid: false,
    fid: '',
    migrate_priority: 0,
  })
  await http.requestRaw(`${DESKTOP_ORIGIN}/ttwid/check/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body,
  })
}