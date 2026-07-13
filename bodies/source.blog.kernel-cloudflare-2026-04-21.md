# Cloudflare and Kernel: Web Bot Auth

URL: https://www.kernel.sh/blog/cloudflare

Author: [[person.catherine-jue]] · Published: 2026-04-21 · Evidence: S1 partner announcement.

- Kernel 与 Cloudflare 推进 IETF Web Bot Auth；此前也与 Vercel 合作。
- agent 用 HTTP message signatures 添加 `Signature`、`Signature-Input` 和 `Signature-Agent`，网站可识别合法 agent。
- 开发者可使用自有 keys，Kernel 也计划提供可被 Cloudflare/Vercel 预先认可的默认 keys。
- Web Bot Auth 解决“网站识别 good bot”，不解决用户登录；Managed Auth 负责 authenticated state。
- 这条路线将竞争从 stealth/proxy 对抗扩展到 [[concept.sanctioned-agent-identity]]。
