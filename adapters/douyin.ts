/**
 * Convention entry: discover `adapters/douyin.ts` → defineAdapter.
 */
import { defineAdapter } from 'zhin.js/adapter';
import { loginAssistToken } from '@zhin.js/core/runtime';
import { DouyinEndpoint } from '../src/endpoint.js';
import { stateToken, endpointRegistry } from '../src/state.js';
import { Http as DouyinHttp } from '../src/http.js';
import { Store as AccountStore } from '../src/store.js';
import { LOGIN_UA } from '../src/qsign.js';
import { config, type Cfg } from '../src/protocol.js';

export { DouyinEndpoint } from '../src/endpoint.js';
export type { Opts } from '../src/endpoint.js';

declare module '@zhin.js/core' {
  interface AdapterEndpoints {
    douyin: import('../src/endpoint.js').DouyinEndpoint;
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
    const store = new AccountStore({ accountsDir: cfg.accountsDir });
    const http = new DouyinHttp({
      userAgent: cfg.userAgent ?? LOGIN_UA,
      initialCookies: cfg.cookies,
      msToken: cfg.msToken,
    });
    const endpoint = new DouyinEndpoint({
      id: context.id,
      config: cfg,
      http,
      store,
      loginAssist: context.use(loginAssistToken),
    });
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