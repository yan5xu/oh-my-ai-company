# OpenAI API background mode

采集时间：2026-08-03。

Responses API 的 background mode 支持异步执行长任务。客户端提交 `background=true` 后，可按 response ID 查询 `queued` / `in_progress` / terminal 状态，也可以取消；创建时同时启用 stream 可在连接中断后保留后台执行。

它解决“一个任务不因 HTTP 连接或 timeout 中断”的问题，但本身不定义长期 Agent 身份、跨任务记忆、触发器、权限、工作环境或组织关系，因此只是 persistent agent 的执行原语之一。
