# 订阅支付连续性

订阅支付不是一次交易，而是跨越数月或数年的状态机。支付凭证、商品价格、订阅状态、PSP、发卡行、风控规则和用户意愿都会变化；任何一层失败都可能变成非自愿流失。

一个完整的连续性控制面通常包括：

- token 或支付凭证在合规边界内持续可用；
- 多 PSP 路由和失败切换；
- 按拒绝原因、时间和用户风险决定重试；
- dunning、邮件通知和客户自助更新支付方式；
- 商品、价格、优惠、试用、proration 和按量计费；
- 退款、拒付、手续费、结算和银行入账对账；
- MRR、ARR、churn、授权率和挽回收入分析。

[[company.payinsider]] 的产品把这些动作放在同一平台，说明其 wedge 不只是“连接多家 PSP”，而是持续维护订阅收入。这个模式可用于比较支付编排、Billing、MoR 和 Agent commerce 产品，但目前主要来自 PayInsider 一例，信心为 medium。

证据：[[source.payinsider.homepage-2026-07-14]]、[[source.payinsider.docs-api-2026-07-14]]。
