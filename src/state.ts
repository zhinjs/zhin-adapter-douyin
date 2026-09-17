import { defineEndpointRuntimeStateToken } from 'zhin.js/adapter';
import type { DouyinEndpoint } from './endpoint.js';

export const stateToken = defineEndpointRuntimeStateToken('douyin');

/** endpoint 实例注册表：供 login 命令按 id 找到实例触发扫码（state 值域只允许 EndpointRunningInfo）。 */
const registry = new Map<string, DouyinEndpoint>();

export const endpointRegistry = {
  set(id: string, endpoint: DouyinEndpoint): void { registry.set(id, endpoint) },
  get(id: string): DouyinEndpoint | undefined { return registry.get(id) },
}

/** 短信/密码二次验证等待器：登录命令挂起一个 Promise，「抖音验证 <code>」命令喂入验证码 */
let mfaWaiter: ((value: string) => void) | undefined
export const mfaState = {
  wait(): Promise<string> {
    return new Promise<string>((resolve) => { mfaWaiter = resolve })
  },
  submit(value: string): boolean {
    const waiter = mfaWaiter
    mfaWaiter = undefined
    if (!waiter) return false
    waiter(value)
    return true
  },
  cancel(): void {
    mfaWaiter = undefined
  },
  get pending(): boolean { return mfaWaiter != null },
}