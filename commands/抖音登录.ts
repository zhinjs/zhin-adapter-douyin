import { createDurableEndpointCommandReply } from 'zhin.js/adapter'
import { defineCommand } from 'zhin.js/command'
import { stateToken, endpointRegistry, mfaState } from '../src/state.js'

/**
 * 抖音登录：扫码登录抖音账号。
 * 启动时若无本地会话不再自动弹码，用此命令手动发起扫码登录。
 */
export default defineCommand({
  description: '抖音登录：扫码登录抖音账号（id 可省，仅一个 endpoint 时自动选择）',
  alias: ['#抖音登录'],
  params: { id: { type: 'string', description: 'endpoint ID' } },
  execute({ params, use, input }) {
    const reply = createDurableEndpointCommandReply(input, use)
    const running = [...use(stateToken).endpoints.values()]
    const id = String(params.id ?? '').trim() || (running.length === 1 ? running[0].id : '')
    if (!id) {
      return running.length === 0
        ? '暂无运行中的 douyin endpoint，请先在 zhin.config.yml 配置 plugins.douyin.endpoints 并重启'
        : `用法：抖音登录 <id>\n可选 id：${running.map(entry => entry.id).join('、')}`
    }
    const endpoint = endpointRegistry.get(id)
    if (!endpoint) return `未找到运行中的 douyin endpoint「${id}」（需先在 zhin.config.yml 配置并重启）`
    // async execute：保持 reply scope 存活，二维码就绪时即可 $reply 图片；结果文本走 durable 通道
    return (async () => {
      try {
        const text = await endpoint.login(
          (image, url) => {
            void input?.$reply?.call(input, {
              type: 'text',
              data: { text: '请使用抖音 APP 扫描二维码完成登录（2 分钟内有效）：' },
            }).catch(() => {})
            void input?.$reply?.call(input, { type: 'image', data: { url: image } }).catch(() => {})
          },
          (verifyUrl) => {
            void input?.$reply?.call(input, {
              type: 'text',
              data: {
                text: `触发登录安全验证，请在浏览器打开链接完成（5 分钟内有效）：\n${verifyUrl}\n若服务部署在远程，请将 127.0.0.1 替换为服务器地址`,
              },
            }).catch(() => {
              void reply(`安全验证链接：${verifyUrl}`)
            })
          },
          (info) => {
            const isPwd = info.kind === 'password'
            const prompt = isPwd
              ? '触发密码二次验证，请回复「#抖音验证 账号密码」（5 分钟内有效）'
              : `触发二次验证，验证码已发送至安全手机${info.maskedMobile ? ` ${info.maskedMobile}` : ''}，请回复「#抖音验证 验证码」（5 分钟内有效）`
            void input?.$reply?.call(input, { type: 'text', data: { text: prompt } }).catch(() => {})
            const timeout = new Promise<never>((_, reject) => {
              setTimeout(() => reject(new Error(isPwd ? '等待密码输入超时' : '等待验证码输入超时')), 5 * 60_000)
            })
            return Promise.race([mfaState.wait(), timeout])
          },
          (status) => {
            // 对齐参考实现：仅回复「已扫码」确认与自定义提示，其余状态静默
            if (status === 'scanned') {
              void input?.$reply?.call(input, { type: 'text', data: { text: '已扫码，请在手机上确认登录' } }).catch(() => {})
            } else if (!['new', 'verifying', 'verified', 'confirmed', 'expired'].includes(status)) {
              void input?.$reply?.call(input, { type: 'text', data: { text: status } }).catch(() => {})
            }
          },
        )
        return text
      } catch (error) {
        mfaState.cancel()
        return `扫码登录失败：${error instanceof Error ? error.message : String(error)}`
      }
    })()
  },
})