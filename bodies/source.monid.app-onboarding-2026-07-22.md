# Monid account onboarding and Cloudflare challenge

2026-07-22 在用户授权的 `pinixc browser` default profile 中：

1. 选择 Codex 作为 agent。
2. 页面要求向 Codex 发送 `set up https://monid.ai/SKILL.md`。
3. 注册入口支持 GitHub、Google 和 email/password。
4. 点击 Google sign-up 后出现 Cloudflare `Verify you are human`。
5. 按人机验证边界停止自动操作，未脚本绕过；等待用户手动完成后再继续。

![Signup](../assets/monid/app-signup-2026-07-22.png)

![Cloudflare challenge](../assets/monid/app-cloudflare-challenge-2026-07-22.png)

证据边界：partial。确认 onboarding 与 auth surface；尚未验证 `$1` credit、API key、budget、真实 run、扣费、失败不扣费或退款。
