# Clink 开发者文档与 Agent Payment API

采集于 2026-07-14，入口为官方 `llms.txt`。

## 能力面

- 商品、价格、Checkout、一次性支付、订阅、优惠、退款、订单、发票、客户门户、Webhook。
- Agent Payment Session：`POST /order/payment-session`，核心参数为 customer email、amount、currency。
- Skill Marketplace：上传 `SKILL.md` package、审核、发布、版本、Tips、Users 指标与付费充值 Webhook。
- 外部 PSP：支持多个 provider 和 provider account，要求 raw PAN capability，可配置路由。
- Webhook 使用 HMAC SHA-256，最多重试 10 次，约一天内完成，不保证顺序。
- payout 文档目前只列美国与香港银行账户。

## 成熟度边界

- Quickstart 与 JS SDK 已展示 embedded/Elements 方向；Integration 页仍写 publishable key 支持“currently working on”，存在文档口径差异。
- Skill Marketplace 有完整产品截图与流程，但本轮未验证公开实时市场入口。
- Docs 给出的主要服务端点仍包含 UAT，符合邀请制 onboarding 状态。

入口：<https://docs.clinkbill.com/llms.txt>

关联：[[company.clink]]、[[concept.merchant-agent-readiness]]。
