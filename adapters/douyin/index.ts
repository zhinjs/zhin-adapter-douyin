/**
 * Convention entry: `adapters/douyin/index.ts` → discover → defineAdapter.
 */
import { join } from 'node:path';
import { defineAdapter } from 'zhin.js/adapter';
import { DouyinEndpoint } from '../../src/endpoint.js';
import { stateToken, endpointRegistry } from '../../src/state.js';
import { Accounts } from '../../src/accounts.js';
import { config, type Cfg } from '../../src/protocol.js';

export { DouyinEndpoint } from '../../src/endpoint.js';
export type { Opts } from '../../src/endpoint.js';

declare module '@zhin.js/core' {
  interface AdapterEndpoints {
    douyin: import('../../src/endpoint.js').DouyinEndpoint;
  }
}

export default defineAdapter<Cfg>({
  capabilities: ['inbound', 'outbound'],
  operations: ['recall', 'reaction'],
  segments: {
    outboundMedia: ['base64', 'url', 'path'],
    interactive: 'text',
  },
  create(context) {
    const cfg = config(context.config);
    const accounts = new Accounts(
      (context.config as Cfg).accountsDir ?? join(process.cwd(), 'data/douyin/accounts'),
    );
    const endpoint = new DouyinEndpoint({ id: context.id, config: cfg, accounts });
    // 注册到插件运行时状态（douyin.endpoint list 的"运行中"数据源）
    context.use(stateToken).endpoints.set(cfg.id, {
      id: cfg.id,
      mode: 'direct',
    });
    // 实例句柄注册表：供 douyin.endpoint login 命令触发扫码（state 值域不承载实例）
    endpointRegistry.set(cfg.id, endpoint);
    return endpoint;
  },
});