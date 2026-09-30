# zhin-adapter-douyin

抖音桌面 IM 适配器 —— 一个可发布为 **npm 依赖**的 Zhin.js 插件包。安装到任意 Zhin 应用后，为宿主提供 `douyin` 平台端点、`#抖音登录` / `#抖音验证` 命令与真实账号消息收发。

## ✨ 特性

- 扫码登录（二维码通过聊天窗口直接发送），支持二次验证（短信验证码 / 账号密码）
- 启动时优先恢复本地会话（cookie 落盘），无需每次重连重新扫码
- 真实昵称/头像：登录/恢复后通过 SDK `user.self()` 同步覆盖
- 多账号：一个插件实例挂多个 endpoint（`endpoints[]`）
- 媒体收发：图片（base64/url/path）、文件、引用消息回复；音频段自动降级
- 基于 [douyin.ts](https://www.npmjs.com/package/douyin.ts) SDK：连接、心跳、收发、事件桥全部走 SDK，零自研协议栈

## � 安装（在宿主 Zhin 应用）

```bash
pnpm add zhin-adapter-douyin
```

推荐用 Zhin CLI 安装/卸载——自动写入或移除 `package.json#zhin.plugins` 清单（`install` 支持 `--dry-run` 预览改动、`--no-enable` 只装依赖不写配置）：

```bash
npx zhin install zhin-adapter-douyin          # 安装 + 自动写入清单
npx zhin uninstall plugin zhin-adapter-douyin --remove-pkg   # 卸载 + 移除清单与依赖
```

也可以手动挂载进宿主应用的 `package.json#zhin.plugins` 清单：

```json
{
  "zhin": {
    "plugins": [
      { "package": "zhin-adapter-douyin", "instanceKey": "douyin" }
    ]
  }
}
```

`instanceKey` 是实例键（须以字母开头），用于区分多实例。本包为根插件（`type: plugin`），配置写在宿主 `zhin.config.yml` 顶层 `plugin:` 段：

## ⚙️ 配置（宿主 zhin.config.yml）

```yaml
plugin:
  endpoints:
    - id: douyin                # 账号实例标识（必填，#抖音登录 选中、日志前缀用）
```

账号实例字段（均可在单个 endpoint 内覆盖顶层）：

| 字段 | 说明 |
| --- | --- |
| `id` | 账号实例标识（必填），用于 `#抖音登录 <id>` 选中账号 |
| `uid` | 抖音平台 uid（纯数字字符串）；提供时优先恢复本地会话 |
| `cookies` | 手动注入 cookie；未提供且本地无会话时走扫码登录 |
| `userAgent` | 本 endpoint 的 UA 覆盖 |

## 🤖 使用

- 首次登录：向机器人发送 **`#抖音登录`** 触发扫码 👉 抖音 APP 扫码并确认（多账号时 `#抖音登录 <id>`）
- 二次验证：按提示发送 **`#抖音验证 <验证码>`**（密码验证则回复账号密码）
- 启动时若本地已有会话会自动恢复，无会话时发送 `#抖音登录` 手动弹码

## 💾 数据与状态

会话数据落盘在宿主应用的 `accountsDir`（默认 `<cwd>/data/douyin/accounts`）：

- `accounts.json` — 多账号 cookie / 昵称 / 头像（按 uid 存储，登录自动写入）

## 🔧 本地开发

仓库本身可独立运行调试（作为根插件）：`pnpm dev` / `pnpm build`（tsc --noEmit）。

```
zhin-adapter-douyin/
├── plugin.ts                  # 根插件入口（definePlugin，name: douyin）
├── adapters/
│   └── douyin/index.ts        # defineAdapter：组装 Accounts + DouyinEndpoint 注册为 douyin 平台
├── schema.json                # 插件配置契约（JSON Schema）
├── commands/
│   ├── 抖音登录/index.ts      # #抖音登录：手动发起扫码登录
│   └── 抖音验证/index.ts      # #抖音验证 <验证码/密码>：提交二步验证
└── src/
    ├── endpoint.ts            # DouyinEndpoint：基于 douyin.ts SDK 的端点（登录/连接/收发/事件桥）
    ├── accounts.ts            # 账号会话落盘（accounts.json，按 uid 存 cookie）
    ├── protocol.ts            # 配置模型（Cfg/EpCfg）与地址/会话映射
    ├── state.ts               # 运行时状态 Token 与 endpoint 实例注册表
    └── index.ts               # 包内导出出口
```

> 发布为 npm 包时，`package.json` 需补充 `files` 白名单（`plugin.js`、`schema.json`、`commands/`、`lib/`、`README.md` 等）与 `main`/`types` 入口。

## 📚 参考

- [Zhin.js 官方文档](https://zhin.js.org)
- [GitHub](https://github.com/zhinjs/zhin)

## 许可证

MIT License