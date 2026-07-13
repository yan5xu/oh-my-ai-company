# Hyperbrowser 本轮调研流程与反思

## 这轮怎么跑

1. Google 粗扫确定主体：官网、docs、YC、GitHub、X/LinkedIn、HN、Reddit、Product Hunt、中文社区。
2. 先读官网，再读 docs/llms.txt。对 browser infra 产品，docs 比官网更能暴露真实产品边界。
3. 拆产品层：sessions / web API / HyperAgent / MCP / sandboxes / pricing / stealth-captcha-profiles。
4. 用 GitHub 看开发者生态，不只看一个 repo：org repo 组合比单仓 stars 更能说明 GTM 路线。
5. 用 YC/HN 看 launch 叙事和早期反馈。
6. 用 Reddit 看生产化风险，尤其 long-running browser agent 的稳定性。
7. 补 X/LinkedIn 人和公司触点，能确认的 founder 才入监控，低置信账号不硬挂。
8. 补中文源：微信/小红书有泛工具传播，linux.do/v2ex 未搜到有效讨论。
9. 尝试 Similarweb；第一次完整 Similarweb 数据视图登录过期，只记录公开摘要，不做流量结构判断。用户重新登录后补抓 overview、流量来源、搜索、受众、类似网站，并升级 Similarweb source。

## 本轮新增的方法经验

- Browser infra 公司必须读 docs index。官网只会讲一句话定位，docs 才能看出它到底是 browser pool、web data API、agent framework、MCP gateway 还是 sandbox runtime。
- Product Hunt 没有搜到不能直接说“没发过”，只能说 adapter 被 Cloudflare 挡、Google 粗搜未发现有效 PH 产品页。
- 中文社区要分“工具介绍流”和“真实开发者反馈”。小红书/公众号可以说明进入内容流，但不能证明产品采用。
- Similarweb 失败时不要补脑：登录态过期就是登录态过期，公开摘要只能当弱信号；登录恢复后再把同一个 source 从 partial 升级为 full，避免重复 URL 制造两条证据。
- founder X 账号必须高置信。Akshay 本轮只确认 LinkedIn，Shri 确认 X；低置信的同名/旧账号不入触点。

## 工具缺口

- Similarweb 需要更稳定的登录态检测或重登提醒；这次手动登录后可以正常抓 overview/渠道/搜索/受众/类似网站。
- Product Hunt adapter 在搜索页遇到 Cloudflare/security challenge 时只能返回空壳，需要更明确标注 blocked/challenge。
- 微信 search 能拿结果，但缺少公开文章正文抓取子命令；目前只能做搜索结果快照。

补充：Product Hunt 搜索本轮单独沉淀为 [[source.producthunt.hyperbrowser-search-2026-07-13]]，质量标为 empty_shell/S4。它只能解释“本轮没抓到”，不能证明产品没有 PH launch。

补充：Similarweb 重新登录后，[[source.similarweb.hyperbrowser-public-summary-2026-07-13]] 已从公开摘要升级为完整流量 source。关键结论：6 个月总访问 400,144，月均 25,724；直接/自然搜索/自然社媒/外链是主要渠道；搜索词仍强绑定 HyperAgent/Hyperbrowser 自有心智；相似网站前列包括 Browserbase、Browser Use、Skyvern、Browsercloud、Lightpanda、Browserless docs。
