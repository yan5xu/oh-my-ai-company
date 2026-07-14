# Sapiom authoring agents 文档

Authoring MCP 可通过 `npx -y @sapiom/mcp` 启动。SDK 使用 `defineAgent` 构建 typed graph，支持共享 state、显式 goto/terminate/fail/retry、bounded loops、pause/resume、human gates、subagents、schedule 和 cloud deployment。

本地测试可使用 deterministic stubs。文档提示自动 retry 上限并非 SDK 强制，需要开发者自己限定循环；本地 run 的默认上限为 3。`run_local` 不会自动在入口拒绝 malformed input，输入校验应在 step 或 deployed execution 中完成。

证据边界：官方文档。命令面与两步本地 workflow 已另行实测；云端 runtime 未验证。
