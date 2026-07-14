## 本轮实际路径

种子是“AI employee 赛道还缺哪些主流公司”。先查 Memex，确认 Ema 尚未入库；随后从官网、Builder Docs、产品页、客户案例、融资公告、TechCrunch、KPMG、LinkedIn/X、Product Hunt/HN、Reddit、微信、小红书和网站流量逐层补证据，最后回到产品控制面、客户落地和 GTM 网络做综合。[[company.ema]]

## 相比前几轮新增的研究动作

1. **成熟 enterprise product 要审 customer proof ladder。** 不只收集 logo：区分供应商 case、合作伙伴互证、客户高管自述、独立审计。Ema 中 Hitachi/AMS 是供应商案例，Merge 是供应商互证，Artico CEO 公开帖才是客户侧确认。
2. **产品 claim 要按生命周期拆。** 过去常看 build/deploy；本轮新增 Discover、Debug、Test、Maintain、Evolve 的 day-2 审计，形成 [[concept.agent-lifecycle-control-plane]]。
3. **集成数量要追供应链。** “200+/250+ connectors”背后有 Merge unified API，说明产品广度可能来自第三方集成层；研究应继续问 read/write depth、scope、fallback 与 ownership。
4. **浏览器能力单独成轨。** App Navigator 不是普通 connector，应独立检查 login、session、MFA、页面漂移、恢复点、证据与人工接管。
5. **融资图要处理跨轮累计口径。** Ema 的 2,500 万美元横跨 seed/Series A，后续把 Series A 扩到 5,000 万美元；投资边保留参与和 lead，不把累计金额虚假分配给单家。

## 本轮失败与纠偏

- Google adapter 遇到 429/sorry 页，转用已登录 Browser、平台 adapter 与直接官方来源；没有把空结果当“无信息”。
- Reddit 因 Ema/Emma/EMA 同名严重污染，保留为 S4 检索边界，不汇总无关帖子。
- 网站流量月线与 total visits 不一致、Jan/Feb 为 0，保留 raw points 和口径冲突，不计算半年增长率。
- `source.item.item_type` 缺少 documentation、announcement、case_study、search_result，只能压成 article/snapshot；这是 schema 缺口，后续应与 Memex owner 讨论，当前不阻塞证据落库。
- 首页截图第一次受滚动位置和 cookie 弹窗影响，拒绝 cookie、回到顶部后重截；原生图优先使用 Autopilot、客户案例和创始人头像。

## 不应过度总结的地方

Ema 的 partner-led enterprise GTM 不适用于所有 AI employee 产品；Product Hunt/HN 弱也不代表这些平台对 developer tool 无效。当前只能说：对高客单、重集成、受监管产品，创始人网络、战略资本、实施伙伴和 lighthouse customer 比公共 launch 榜单更接近主增长路径。

## 给下一轮的操作更新

研究 Relevance AI、Lindy、11x 时复用这几个检查项，但只在真实材料支持时展开：customer proof ladder、connector supply chain、API/browser 双轨、day-2 lifecycle、implementation partner、累计融资口径。对 SMB/self-serve 产品仍要回到 pricing、activation、community 和流量，不套 Ema 模板。
