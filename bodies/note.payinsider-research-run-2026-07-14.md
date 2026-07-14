# PayInsider 调研过程记录：2026-07-14

## 本轮 seed 与问题

CP 直接给出 `payinsider.com`。首轮误判风险是把它当成支付媒体或泛支付 SaaS，因此最小闭环先回答：它卖给谁、是否有真实产品、承担什么支付责任、规模如何、为什么可能与 Agent commerce 有关。

## 实际跑过的路径

1. 官网与 sitemap：定位产品页、隐私政策、博客、定价残留和 API Docs。
2. 动态 CTA：追踪免费试用接口，验证它确实返回沙盒注册页，没有保存临时 token。
3. 产品域拆分：从营销域扩到 `pay-insider.com` 的商户、沙盒、SDK、产品与资源子域。
4. API 文档：读取对象模型、Hosted Checkout、Version Log 和 Connections 页面。
5. 前端能力面：检查公开商户后台 bundle 中的路由、对账、订阅、风险、商品和开发者模块；只作为实现证据，不当作采用证据。
6. 法律与公司：用香港公司注册处 CSV、隐私政策和政府项目报道交叉公司时间线。
7. 创始人与融资：LinkedIn + 创始人长访谈 + 融资/portfolio 搜索，确认当前只有 bootstrapped 创始人口径，没有披露估值。
8. 流量：分别检查营销域和产品域，记录产品域包含子域的访问与设备分布。
9. 社区：X、HN、Reddit、Product Hunt、V2EX、Linux.do、即刻、微信、小红书和 Facebook；有效结论是样本不足。
10. 竞品：按支付编排、Billing、MoR 和 Agent payment 四层分类，避免把所有支付公司列成同类。

## 这轮改变了什么判断

- **开始时**：公开声量和官网流量都很小，容易判断成概念项目。
- **补完后**：沙盒注册、商户后台、v2 API 文档、版本记录和前端模块共同证明产品真实；但客户采用、效果和收入仍不可验证。
- **开始时**：可把它归成“多 PSP 聚合”。
- **补完后**：更准确的 wedge 是订阅支付连续性，路由只是其中一环。
- **开始时**：创始人说 80% 交易来自欧美，容易理解为已有欧美客户基础。
- **补完后**：同一访谈明确美国第一家本土商户仍是缺口，交易地域和客户地域必须拆开。

## 失败与降级

- 已撤下定价页的服务器正文仍存在，但浏览器水合后显示 404：降为 S4 历史信号，不当当前报价。
- 官网的 API Docs 入口指向沙盒 CRM 登录，但独立的 `docs.payinsider.com` 可公开访问：用直接文档域补证，并记录入口不一致。
- Similarweb 营销域没有数据：改查产品域及子域，但不把 Checkout 流量当成商户用户。
- 社区搜索大量同名和无关结果：不把空结果写成“用户没有意见”，只标公开样本不足。
- 文档版本早于公司主体：保留冲突，不猜前置主体。

## 本轮新增的候选方法

1. **营销域与产品域分开审计。** B2B 支付、API、browser infra 等产品的使用常发生在 app、checkout、sandbox 或 API 子域，营销官网流量会严重低估产品触达。
2. **动态 CTA 可以验证产品入口。** 注册按钮背后的 API、重定向和表单比静态文案更接近真实产品状态；临时凭证不能进入资料库。
3. **公开前端包只能证明能力面。** 模块和路由可以证明工程存在，但不能证明生产使用、稳定性或客户规模。
4. **撤下页面是历史证据，不是当前事实。** sitemap、SSR 残留和 404 前正文可用于理解商业设计，但必须标 stale/withdrawn。
5. **版本记录与法律主体要交叉。** 当产品时间早于公司成立，应保留冲突，继续找前置主体或资产迁移证据。

这些动作已补进 [[method.product-research-workflow-v0]]，但仍是候选经验，需要在更多支付/企业基础设施公司中复验。

## 本轮产物

- 主体：[[company.payinsider]]
- 人物：[[person.lin-wang-payinsider]]、[[person.pari-jing-payinsider]]
- 流量：[[traffic.similarweb.payinsider-2026-h1]]
- 概念：[[concept.subscription-payment-continuity]]
- 判断：[[note.payinsider-product-takeaway-2026-07-14]]
- 证据：15 条 `source.item`
- 触点：官网、Docs、Blog、LinkedIn、Facebook、商户后台和两位创始人 LinkedIn
