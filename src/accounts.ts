import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export interface AccountRecord {
  cookie: string;
  nickname?: string;
  avatar?: string;
  updatedAt: number;
}

export type Records = Record<string, AccountRecord>;

/**
 * 账号会话落盘：单 JSON 文件（`<dir>/accounts.json`）按 uid 存 cookie。
 * 目录默认 `<cwd>/data/douyin/accounts`，可被配置 accountsDir 覆盖。
 */
export class Accounts {
  readonly #dir: string;
  readonly file: string;

  constructor(dir: string) {
    this.#dir = dir;
    this.file = join(dir, 'accounts.json');
  }

  async load(): Promise<Records> {
    try {
      const raw = await readFile(this.file, 'utf8');
      const parsed = JSON.parse(raw) as unknown;
      return parsed && typeof parsed === 'object' ? (parsed as Records) : {};
    } catch {
      return {};
    }
  }

  /** 取指定 uid 的账号；未指定时取最近更新的账号。 */
  async get(uid?: string): Promise<{ uid: string; record: AccountRecord } | undefined> {
    const records = await this.load();
    if (uid && records[uid]) return { uid, record: records[uid] };
    if (!uid) {
      const entries = Object.entries(records).sort((a, b) => b[1].updatedAt - a[1].updatedAt);
      const latest = entries[0];
      if (latest) return { uid: latest[0], record: latest[1] };
    }
    return undefined;
  }

  async save(uid: string, record: Partial<AccountRecord>): Promise<void> {
    const records = await this.load();
    records[uid] = { ...records[uid], ...record, updatedAt: Date.now() };
    await mkdir(this.#dir, { recursive: true });
    await writeFile(this.file, JSON.stringify(records, null, 2), 'utf8');
  }
}