# Composio CLI 语义设计审计（0.2.32）

## 研究问题

从一个终端 Agent 的视角，Composio CLI 如何组织认证、工具发现、连接修复、执行、
本地编排和 Developer Platform 管理？哪些设计值得 Parall Clip 借鉴，哪些行为会破坏
稳定的 Agent 机器合同？

本笔记补充 [[company.composio]]、[[note.composio-concept-model-2026-07-29]] 与
[[note.composio-ux-walkthrough-2026-07-29]]。这里只审计本机已安装的真实 CLI 和
随安装器部署的 Codex 插件，不把结论外推到其他版本。

## 精确来源与边界

- CLI：`/Users/cp/.composio/composio`
- 版本：`0.2.32`
- 二进制：macOS arm64 Mach-O，SHA-256
  `cc3372efc03213eefeb81328125a87fef899e5bfc2eb2a59292f83369b73efc8`
- 安装来源：官方安装器固定稳定包 `@composio/cli@0.2.32`
- Codex 插件：`composio` `0.2.2`，与 CLI 独立版本
- 未登录测试：独立临时 `HOME` 与 `XDG_CONFIG_HOME`
- 已登录测试：只执行 `whoami`、工具搜索、连接列表、schema 获取和 `--dry-run`
- 没有登录、登出、连接、断开连接、真实写操作、升级或配置修改
- 没有回显 API key、OAuth token、连接 ID、email 或 provider 私有载荷

已有真实只读执行证据沿用 UX walkthrough 中的
`GITHUB_GET_THE_AUTHENTICATED_USER`。该次执行证明调用链可用，但也证明完整 provider
payload 会超过任务所需字段。

## 一句话结论

Composio CLI 不是传统的资源管理 CLI。它首先是一条面向 Agent 的
`search → execute` 工具消费通道，其次是一个本地 workflow runtime
（`run`、`proxy`），最后才通过 `dev` 命名空间暴露 Developer Platform 管理面。

这个大结构是清楚的；当前 `0.2.32` 的机器合同和凭据边界却没有同等成熟。成功结果
通常是 JSON，但错误仍是人类终端文本；未登录时多个命令会静默 `exit 0`；本地明文
API key 文件权限为 `0644`；高风险绕过和 raw proxy 也直接暴露在默认执行面。

## 命令语义地图

| 层 | 主要命令 | 语义 |
| --- | --- | --- |
| Agent 消费主路径 | `search`、`execute`、`link` | 按自然语言用例发现 tool slug，检查连接与参数，然后执行 |
| 连接观察 | `connections list/remove` | 查看或移除 FOR YOU 连接；`remove` 交互确认且默认 No |
| 本地编排 | `run` | 在内置 Bun ESNext runtime 中注入 `execute/search/proxy/subAgent/zod` |
| 逃生舱 | `proxy` | 绕过专用 tool，直接调用带托管认证的 provider HTTP API |
| Schema 与事件目录 | `tools`、`triggers`、`artifacts` | 浏览 schema、trigger type 和 cwd-scoped session artifact |
| Developer Platform | `dev ...` | Project、Toolkit、Auth Config、Connected Account、Trigger、Log、Playground |
| 代码生成 | `generate` | 为 TypeScript 或 Python 生成 toolkit/tool/trigger 类型 |
| 账号与本机安装 | `login/logout/whoami/orgs/setup/config/files/upgrade` | CLI session、组织上下文、Agent host 插件、本地状态 |
| 隐藏 Agent identity | `signup`、`agent ...` | Agent 注册、key 登录、identity、inbox、human claim；根帮助未列出 |

这张地图对应 Composio 的两条产品轴：

1. `search/execute/link/connections` 更接近 FOR YOU 的消费路径。
2. `dev` 更接近 Developer Platform 的项目化控制面。
3. `Native Tool` 与 `MCP` 是工具交付协议；CLI 是本地 Agent 的消费与编排入口，
   不是第三种凭证模型。

## Agent 主流程

CLI 根帮助主动把常规任务压缩为：

```text
search → execute
          └─ 缺连接时 link，再重试原命令
```

更完整的 Agent 流程是：

1. 已知 slug 时直接 `execute`，未知时用自然语言 `search`。
2. `search` 不只返回 slug，还返回执行计划、已知陷阱、primary/related tools、
   connected toolkits 和 next steps。
3. 写操作前可用 `--get-schema` 和 `--dry-run`。
4. `execute` 默认检查 schema 和 connected account。
5. 少量独立调用可用 `--parallel`；有控制流时转到 `run`。
6. 专用 tool 不覆盖 provider API 时，最后才用 `proxy`。

这比“先浏览完整工具目录，再自己拼命令”更适合 Agent。工具发现的返回值本身就是一份
面向 Agent 的计划，而不是普通搜索结果。

## 成功输出合同

实际只读结果显示：

- `search` 默认输出 JSON，`--human` 才切换为格式化文本。
- `whoami` 输出 JSON，包括 account type、当前 org 和控制能力状态。
- `connections list` 输出按 toolkit 分组的 JSON。
- `tools info` 与 `execute --get-schema` 输出 slug、version、schema path 和 input schema。
- `execute --dry-run` 输出 `successful`、`dryRun`、slug、arguments、userId 和 schema
  version/path。
- 真实 `execute` 返回 execution 结果和 log ID。
- `run` 的 helper 返回解析后的对象，并提供 `result.prompt()` 供 LLM 使用。

工具 schema 会缓存到 `~/.composio/tool_definitions/`，大输出和运行文件进入按 cwd
划分的 session artifact 目录。这使 Agent 可以把“发现、schema、执行、文件结果”
串成可重复的本地工作流。

## 机器合同缺陷

### 1. 未登录静默成功

在独立、无凭据的 `HOME` 中，以下命令都返回 `exit 0`，同时 stdout/stderr 均为空：

- `whoami`
- `search`
- `execute <slug> --get-schema`
- `link github --list`
- `orgs list`
- `dev projects list`

Agent 无法区分“没有结果”“未认证”“后端未调用”。这比清晰的 `UNAUTHENTICATED`
结构化错误更危险，因为自动化会把它误判为成功。

### 2. 成功 JSON，错误不是 JSON

参数错误、404 tool、schema 校验失败均为 `exit 1`，但错误输出是带 emoji、计时、
内部 `src/bin.ts` 文件名和整段 help 的终端文本。没有全局 `--json` 或稳定 error
envelope。未知命令还会重复打印同一错误两次。

所以当前合同是“成功适合机器、失败适合人”，不适合可靠 Agent 分支处理。

### 3. Help 与真实命令树漂移

- 默认根帮助不列 `connections`。
- 即使 `--help full`，仍不列 `signup`、`agent`、`install`。
- 未知命令错误反而暴露这些命令。
- `dev` 根帮助列出 `connected-accounts link`、`projects switch`，但相应
  `--help` 回退到了 `dev` 根帮助。
- `dev` 根帮助称 `triggers disable` 需要配置开关和 `--dangerously-allow`，
  该子命令 help 却不显示该 flag。
- `search --limit` 文档限定 `1-1000`，实测 `--limit 0` 被接受并返回结果。
- 新旧 help renderer 混用，部分命令即使设置 `NO_COLOR=1` 仍输出 ANSI 控制码。

### 4. 安全控制主要靠调用者纪律

- 根文案鼓励 “use execute aggressively”。
- `execute` 直接暴露 `--skip-connection-check`、
  `--skip-tool-params-check`、`--skip-checks`。
- `proxy` 可直接发 GET/POST/PUT/DELETE/PATCH，脱离 tool schema。
- 常规写 tool 没有统一的确认、审批、idempotency key 或危险动作分级。
- `search` 的 `next_steps` 会提示 Agent “无需等待用户，直接继续 link/execute”。
- Codex Skill 另行要求写前消歧、超时后查状态、禁止跨 surface 自动重试；这说明
  关键安全语义主要存在于 Agent prompt，而不是 CLI 强制合同中。

### 5. 数据最小化只停留在建议

`search` 会建议只返回少量非敏感字段，但真实只读执行仍返回完整 provider payload，
包括任务不需要的账号字段。搜索计划不会自动转化为服务端输出 allowlist。

## 认证与本地状态

`login` 支持浏览器 session，也支持 `--user-api-key <text>`。后者会让凭据进入 argv
和 shell history；没有对应的 `--key-env` 或 stdin 入口。

本机只读元数据检查发现：

- `/Users/cp`：`0750`
- `~/.composio`：`0755`
- `~/.composio/user_data.json`：regular、nlink 1、`0644`
- `user_data.json` 包含明文字符串字段 `api_key`
- `config.json` 同样为 `0644`

由于 home 对同组用户可遍历，而 auth 文件对 group/other 可读，本机同组用户可读取该
API key。隔离 `HOME` 中 CLI 新建的 `.composio` 和 JSON 文件也分别是 `0755` 与
`0644`，说明这是当前默认创建模式，不是旧文件遗留。

组织级网页登录还明确授权 CLI 访问账号下全部组织、全部项目并代表用户执行。宽 session
加上宽文件权限，使本地凭据存储成为高优先级风险。

## Codex 插件如何让 Agent 使用 CLI

安装器不仅部署二进制，还安装 Codex Skill 与 hooks：

- Skill 在终端/Codex 环境优先选择本地 CLI，hosted MCP 作为另一 surface。
- Skill 规定已知 slug 直接执行，未知能力先 search/schema，再 execute。
- Skill 规定缺连接时 link 后回到原命令。
- Skill 要求写前消歧、失败后查状态、禁止不确定写操作跨 surface 重放。
- SessionStart hook 会运行 `whoami` 判断登录，并后台读取 toolkit 列表缓存。
- UserPromptSubmit hook 根据 toolkit 名称命中用户 prompt，主动注入“优先使用
  Composio CLI”的上下文。

因此 Composio 的 Agent UX 不是单靠 CLI help 完成的，而是
“CLI 机器能力 + Skill 操作规程 + hooks 自动路由”的组合。CLI `0.2.32` 与插件
`0.2.2` 独立版本，存在行为与 prompt 约束不同步的风险。

## 值得借鉴

1. 用例优先：用户或 Agent 先描述目标，再得到稳定 tool slug。
2. 默认机器输出：正常搜索、schema、连接与执行都优先 JSON。
3. 就地修复：执行发现缺连接时直接提示 link，完成后回到原任务。
4. schema 与 dry-run：先检查参数和连接，再允许真实写。
5. 消费面与开发面分层：日常 Agent 命令保持短，Project/Auth Config/Log 放入
   `dev`。
6. 从单调用平滑升级：`execute` → `--parallel` → `run`，不必立刻引入 SDK 项目。
7. Skill 负责教 Agent 正确使用 CLI，而不是假设所有 Agent 会自行理解 help。

## 不应照搬

1. 未认证时 `exit 0` 空输出。
2. 只有成功 JSON、错误却是终端文本。
3. 把明文 API key 写入 `0644` 文件，或允许 key 直接出现在 argv。
4. 默认 consumer 面暴露 raw proxy、跳过全部检查和无限制本地代码 runtime。
5. 用 prompt 纪律代替执行层授权、确认、幂等和审计。
6. 把搜索建议当成输出最小化或权限约束。
7. 帮助文档、解析器和隐藏命令同时演进而不保持单一命令树。

## 对 Parall Clip 的启发（不是产品决定）

Parall Clip CLI 面向 Agent，可以借鉴 Composio 的 goal-first discovery，但机器合同
应该更严格：

- 主路径可继续围绕 `search/list → inspect → install → exec`，并在响应中直接给出
  下一步，而不是要求 Agent猜测状态。
- 成功和失败都使用稳定 JSON envelope；未认证、无权限、离线、未安装必须非零退出。
- `auth status` 应显示非 secret 的 org、key identity、能力范围和 command grants。
- `list/search` 应明确给出 installed/availability 真值，不用 `null` 表示未知而无解释。
- CLI secret 只允许 env/stdin/受控文件注入，本地目录 `0700`、文件 `0600`。
- 高风险绕过能力不应出现在默认 Agent 面；需要时放入显式高级命名空间并由权限控制。
- Agent Skill 应描述完整消费流程和失败恢复，但不能代替 CLI 自身的安全与错误合同。
- 人类连接、设备登录和权限配置继续由 Edge + Console 承担；CLI 聚焦 Agent 的稳定执行。

## 结论边界

本轮证明的是本机 `0.2.32` 的语义和真实行为，不代表未来版本。没有评估 SDK 代码质量、
全部 1000+ toolkit、吞吐、长期稳定性或企业版 enhanced controls。这里列出的 Parall
启发仅供后续产品讨论，未修改 Parall 文档、代码或优先级。
