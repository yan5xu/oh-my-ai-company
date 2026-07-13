# Kernel runtime, Managed Auth and bot detection docs

Primary URL: https://www.kernel.sh/docs/browsers/authentication

Collected: 2026-07-13 · Evidence: S1 current docs.

- browser create 文档称 sandboxed Chromium 在 30ms 内启动，支持 CDP/WebDriver/live view；空闲 5 秒可 standby，保存状态并停止 usage billing。
- Managed Auth 支持 SSO/OAuth、TOTP、SMS/email/push OTP 和会话监控；官方称 credentials encrypted and never sent to the LLM。
- unikernel runtime 可把 app code 与 browser 共置，并用 snapshot 保存完整状态。
- bot detection 文档列出 headful、stealth、proxies、profiles、pools、in-VM Playwright、Patchright、native computer controls、Bezier mouse movement 与 GPU。
- 本轮没有 Kernel API key，未做独立运行测试。
