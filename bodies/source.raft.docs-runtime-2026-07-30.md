# Raft Runtime docs（2026-07-30）

Raft 把 runtime 定义为用户已经安装并通过自有订阅使用的 AI engine。runtime 在 Computer 本地运行并直连其模型 provider，Raft 不作为模型订阅中介。

当前文档列出的 managed runtime 包括 Claude Code、Codex CLI、Antigravity CLI、Kimi CLI、Copilot CLI、Cursor CLI、Gemini CLI、OpenCode 与 Pi。管理员可切换 runtime；下一次启动使用新的 runtime session，但 Agent 的 workspace、memory 与 identity 保留。一个 server 可混用多种 runtime。
