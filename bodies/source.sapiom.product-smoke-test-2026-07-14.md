# Sapiom CLI 与 authoring MCP 本地实测

2026-07-14 在临时目录完成无账号低风险 smoke test：

1. `npx -y @sapiom/cli --help` 正常返回命令面。
2. CLI scaffold 生成 TypeScript agent 项目；执行文档要求的 `npm install` 后，`agents check .` 返回 `2 step(s), graph OK`。
3. 通过 `@sapiom/mcp` stdio 调用本地运行工具，完成两步 workflow；无 paid calls，`unusedStubs=[]`，`stubWarnings=[]`。

脚手架会创建 git repo、`AGENTS.md`、`CLAUDE.md`、`.sapiom-dev/stubs.json`；匿名 telemetry 可用 `SAPIOM_TELEMETRY_DISABLED=1` 关闭。

证据边界：只验证本地 authoring/check/run 路径。没有账号、没有 cloud deploy、没有真实 provider/paid capability、没有生产可靠性测试。
