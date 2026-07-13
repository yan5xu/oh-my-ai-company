# Benny customer story

URL: https://www.kernel.sh/customers/benny

Published: 2026-03-05 · Evidence: S1 vendor-published customer case.

- Benny 为 SNAP 用户提供品牌补贴，需要登录 Walmart、Kroger、Instacart 等商户网站持续发现和追踪交易。
- 文章称此前使用 Browserbase headless browsers，扩展到更多站点后遭遇 bot detection 与 cookie restoration 问题。
- Benny 选择 Kernel 的 headful browsers、pause/resume 和 Managed Auth；迁移用时 3 天。
- 官方结果：约 880,000+ browser sessions/月，错误率降低 4.3 倍；省去 Kubernetes 服务与 managed proxy，各约 $36K/年，合计 $72K+。
- 这是直接竞品迁移与规模的强案例，但数据来自 Kernel 官网，未独立审计。
