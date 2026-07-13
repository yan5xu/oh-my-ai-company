# 受认可的 Agent 身份与委托

## 定义

Agent 在获得终端用户明确授权后代表用户访问网站；授权应可追踪、可撤销，网站能识别和审计这个 agent，而不是把所有自动化都视为未知 bot。

## 为什么是独立概念

它不同于 stealth/proxy，也不同于登录态管理：

- Stealth 让 agent 更难被识别。
- Managed Auth 让 agent 能登录用户账户。
- Sanctioned identity 让网站知道“是谁的 agent、代表谁、被授予什么权限”。

[[company.kernel]] 与 Cloudflare/Vercel 的 Web Bot Auth，以及 [[company.browserbase]] 的 agent identity 路线，都在探索这一层。

## 当前证据与边界

- [[source.blog.kernel-cloudflare-2026-04-21]]：HTTP message signatures 与 Web Bot Auth。
- [[source.blog.kernel-vision-2026-07-10]]：explicit、traceable、revocable delegation。
- [[source.browserbase.cloudflare-identity-2026-07-11]]：相邻公司也在推进 agent identity。

目前仍是 candidate thesis。身份标准能否被足够多网站采用、如何与用户登录和细粒度权限结合，尚未验证。
