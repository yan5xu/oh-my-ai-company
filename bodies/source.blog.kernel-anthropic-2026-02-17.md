# Evaluating computer use models with Anthropic

URL: https://www.kernel.sh/blog/anthropic

Author: [[person.catherine-jue]] · Published: 2026-02-17 · Evidence: S1 partner announcement.

- Anthropic 使用 Kernel 对 Sonnet 4.6 computer use 做真实网站压力测试。
- Kernel 构造了一个“找到登录页”的 benchmark，覆盖 254 个站点。
- 文章称 Sonnet 4.6 在该 benchmark 上到达正确登录页的比例为 79.1%，在所测 Anthropic models 中最高。
- 该案例说明 browser infrastructure 不只服务生产 agent，也可以成为 CUA eval/runtime；但 benchmark 设计与结果由 Kernel 发布，本轮未获得 Anthropic 独立技术报告交叉验证。
