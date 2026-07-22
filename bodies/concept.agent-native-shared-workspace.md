# Agent-native shared workspace

这个模式的关键不是在 Slack、GitHub 或项目管理工具上增加 AI 按钮，而是把人、Agent、消息、代码、任务、审批和持续上下文放进同一权限与事件环境。

Buzz 当前是高信号案例：Agent 有独立身份与 owner authorization，channel 同时承载讨论和执行，ACP/MCP 连接不同 harness，Git/workflow/audit 进入同一系统。它也暴露了该模式的核心难点：多人多 Agent 的 ACL/context leakage、审批和可撤销授权、企业历史迁移、hosted 与 self-hosted 信任边界、E2E encryption、移动端和 forge 成熟度。

证据：[[source.block-engineering.buzz-2026-07-21]] [[source.github.buzz-product-status-2026-07-22]] [[source.hackernews.buzz-launch-2026-07-21]].
