import { defineCommand } from 'zhin.js/command'
import { mfaState } from '../../src/state.js'

/**
 * 抖音验证：提交扫码登录二步验证的短信验证码/账号密码。
 * 登录触达二次验证时，把收到的验证码用「抖音验证 <验证码>」提交。
 */
export default defineCommand({
  description: '提交扫码登录二步验证的验证码/密码（需先发送「抖音登录」触发）',
  alias: ['#抖音验证'],
  params: { value: { type: 'string', description: '短信验证码或账号密码' } },
  execute({ params }) {
    if (!mfaState.pending) return '当前没有等待输入的扫码二次验证'
    const value = String(params.value ?? '').trim()
    if (!value) return '用法：抖音验证 验证码/密码'
    return mfaState.submit(value) ? '验证输入已提交，请稍候…' : '当前没有等待输入的扫码二次验证'
  },
})