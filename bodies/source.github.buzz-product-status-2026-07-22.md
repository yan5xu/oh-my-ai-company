# Buzz implementation status and limits

官方 VISION / VISION_PROJECTS / ARCHITECTURE / SECURITY 文档将能力拆成已交付、在建和设计：

- 已交付：core relay/auth/pubsub/search/audit、desktop、channels/threads/DMs/canvases/media、workflow engine、ACP/MCP、buzz-cli、agent personas/teams、Git smart HTTP + NIP-34、Huddles voice、Buzz Mesh。
- 在建：workflow approval gates 只有 DB/API/UI 基础，executor 尚不能 persist/resume；Flutter mobile active development；huddle recording/tracks 尚未完成。
- 设计：project binding、merge coordinator、NIP-34 issues、web-of-trust reputation、developer portal、push 与 culture features。
- ARCHITECTURE 还列出生产 rate limiter 尚未实现、部分 workflow actions 为 stub 等限制。
- SECURITY 明确 Buzz pre-1.0，只积极支持 main；旧 release best-effort。Channel membership 是主要访问控制边界；audit hash chain 可检测篡改但不能抵抗拥有 DB 写权限的攻击者；relay 自身不强制 TLS，需要部署层终止；headless 无 keyring 时私钥回退为 0600 文件。

VISION 中 10k humans + 50k agents、600k events/day、<50ms p99 是目标，不是实际 load/adoption 证据。

![Buzz product UI: humans and agents in one channel](../assets/buzz/channel-agents-official-2026-07-22.png)
