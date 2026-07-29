# Composio 官网滚动快照

首次采集：2026-07-21；复核：2026-07-29。

URL：<https://composio.dev/>

## 可见及服务端渲染事实

- 首页把 Composio 描述为面向 1,000+ 应用的 just-in-time tool call、安全的
  delegated auth、sandbox environment 和 parallel execution。
- 导航区分 FOR YOU、Developer Platform、CLI、Enterprise 和 MCP Gateway。
- 页面展示 Managed Auth、Trigger、context-aware Session、Tool Discovery 以及
  model/framework independence。
- FOR YOU 面向 Claude、Codex、Cursor、OpenClaw 和 Hermes 等个人客户端；
  Developer Platform 面向 SDK、执行与认证基础设施。
- 服务端 HTML 含有标记为 `data-agent-readable` 和
  `data-agent-signup-instructions` 的 `template`。2026-07-29 复核时，当前文本
  要求 Agent 在完成注册或输入凭据前先向用户确认。

## 边界

首页数字和结果属于厂商口径。Agent-readable template 是可观察实现事实，但本次
没有测试它对所有 Agent 或 crawler 的实际影响。
