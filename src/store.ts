import { existsSync, mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const SESSION_FILE = 'session.json'

export interface Rec {
  platformUid: string
  session: Ses
  /** 登录接口返回的 user_data 等原始资料 */
  userData?: Record<string, unknown>
  screenName?: string
  avatarUrl?: string
  /** ticket_guard 密钥（ImClient 持久化用） */
  ticketGuard?: Guard
  /** 登录时的桌面设备身份（device_register 签发） */
  deviceProfile?: { deviceId: string; installId: string; guid: string }
  createdAt: string
  updatedAt: string
}

export interface Ses {
  cookies: string
  /** msToken 单独存以便快速过期检查 */
  msToken?: string
  /** Desktop IM 稳定设备 ID（324+7 位数字，webid 形态；Cookie 通道发送必需） */
  deviceId?: string
  /** 上次验证时间（ISO） */
  verifiedAt?: string
}

/** ticket_guard 密钥记录（与 ImClient 的 StoredTicketGuard 结构一致） */
export interface Guard {
  privateKeyPem: string
  createdAt: string
}

export interface SessionHealth {
  /** sid_guard 距过期剩余秒数；无法解析时 undefined */
  remainingSec?: number
  /** 是否已过期 */
  expired: boolean
}

export type RestoreOutcome = 'ok' | 'expired' | 'missing'

export interface StoreOptions {
  /** 账号数据根目录，默认 `<cwd>/data/douyin/accounts` */
  accountsDir?: string
}

/** 账号会话持久化：每个账号一个目录 `<accountsDir>/<platformUid>/session.json` */
export class Store {
  private readonly accountsDir: string

  constructor (options: StoreOptions = {}) {
    this.accountsDir = options.accountsDir ?? join(process.cwd(), 'data', 'douyin', 'accounts')
    mkdirSync(this.accountsDir, { recursive: true })
  }

  /** 账号数据根目录（用于设备身份持久化） */
  get accountsDirectory (): string { return this.accountsDir }

  /** 读取单个账号；不存在返回 undefined */
  load (platformUid: string): Rec | undefined {
    const file = join(this.accountsDir, platformUid, SESSION_FILE)
    if (!existsSync(file)) return undefined
    return JSON.parse(readFileSync(file, 'utf8')) as Rec
  }

  /** 写入/覆盖账号 */
  save (platformUid: string, data: Rec): void {
    const dir = join(this.accountsDir, platformUid)
    mkdirSync(dir, { recursive: true })
    writeFileSync(join(dir, SESSION_FILE), JSON.stringify(data, null, 2))
  }

  /** 更新 ticket_guard 密钥（ImClient 持久化用） */
  updateTicketGuard (platformUid: string, record: Guard): void {
    const prev = this.load(platformUid)
    if (!prev) return
    this.save(platformUid, { ...prev, ticketGuard: record, updatedAt: new Date().toISOString() })
  }

  /** Desktop IM 稳定设备 ID（324+7 位数字）；无则生成并立即落盘 */
  ensureDeviceId (platformUid: string): string {
    const current = this.load(platformUid)?.session.deviceId?.trim()
    if (current) return current
    const deviceId = `324${String(Math.floor(Math.random() * 10_000_000)).padStart(7, '0')}`
    const record = this.load(platformUid)
    if (record) {
      this.save(platformUid, {
        ...record,
        session: { ...record.session, deviceId },
        updatedAt: new Date().toISOString(),
      })
    }
    return deviceId
  }

  /** 列出所有已落盘账号 */
  list (): Rec[] {
    if (!existsSync(this.accountsDir)) return []
    return readdirSync(this.accountsDir, { withFileTypes: true })
      .filter(d => d.isDirectory())
      .map(d => this.load(d.name))
      .filter((a): a is Rec => a !== undefined)
  }

  /** 删除账号目录 */
  remove (platformUid: string): void {
    rmSync(join(this.accountsDir, platformUid), { recursive: true, force: true })
  }
}

/**
 * 解析 `sid_guard` cookie：`<sid>|<issued_unix>|<ttl_sec>|<expire_date>`
 * 返回距过期剩余秒数。
 */
export function sidTtl (cookies: string): number | undefined {
  const match = cookies.match(/sid_guard=([^;]+)/)
  if (!match) return undefined
  const decoded = decodeURIComponent(match[1]!)
  const parts = decoded.split('|')
  if (parts.length < 3) return undefined
  const issuedAt = parseInt(parts[1]!, 10)
  const ttlSec = parseInt(parts[2]!, 10)
  if (isNaN(issuedAt) || isNaN(ttlSec)) return undefined
  const expiresAt = issuedAt + ttlSec
  return expiresAt - Math.floor(Date.now() / 1000)
}

/** 检查 Session 健康状态（不走网络，纯本地解析） */
export function health (account: Rec): SessionHealth {
  const remaining = sidTtl(account.session.cookies)
  const expired = remaining !== undefined && remaining <= 0
  const result: SessionHealth = { expired }
  if (remaining !== undefined) result.remainingSec = remaining
  return result
}

/**
 * 本地恢复评估：无账号 / cookies 为空 → `missing`；
 * sid_guard 本地已过期 → `expired`；返回 undefined 表示本地健康，
 * 是否真正可用需上层构建 client 后走网络验证确认。
 */
export function localRestore (
  account: Rec | undefined,
): RestoreOutcome | undefined {
  if (!account?.session.cookies?.trim()) return 'missing'
  if (health(account).expired) return 'expired'
  return undefined
}