# Polsia 有界增量研究更新

**对象**：[[company.polsia]] → `polsia.com`  
**cutoff**：2026-08-02  
**基线**：2026-07-15 research-complete  
**问题**：过去约 18 天定位、产品入口、经营数据、用户反馈和 Traffic 是否发生实质变化。

## 结论

原判断仍成立：Polsia 是托管式自治公司操作系统/公司工厂，不是普通 AI employee workspace。新增证据没有证明它已经解决可靠性和 customer outcome，但出现了两个值得更新的变化。

第一，**产品入口从“从零创建公司”扩展为“创建新公司 / 运营已有公司”双路径**。已有公司只先提交 website；首页明确 free to start、no credit card。[[source.polsia.onboarding-2026-08-02]]

第二，**规模继续快速增长，但漏斗质量未同步改善**。约 18 天内，官方自报 subscription MRR +25.7%、paying users +41.5%、active companies +36.6%；trial-to-paid 从 12.9% 降到 10.3%，30-day paid churn 从 52.1% 升到 55.3%。[[source.polsia.public-dashboard-api-2026-08-02]]

这组组合比 headline `$9.37M` 更重要：Polsia 仍能快速拉新和付费，但高 churn 尚未改善，customer company 是否产生收入仍无公开 cohort。

## 产品与适用对象

当前更合理的 fit 假设是：

- 从零创业路径擅长快速生成、展示和持续执行，但结果不确定，需承担测试成本；
- 已有业务、已有收入、问题边界清楚且能持续验收的 operator，可能更容易把 Polsia 当自动执行层；
- DNS、email、支持和复杂集成仍是决定能否从 demo 进入真实运营的关键短板。

这个判断来自当前 onboarding 与两位具名 LinkedIn 用户的同向证据，仍不是已验证 PMF。[[source.linkedin.eric-ferreira-polsia-review-2026-08-02]] [[source.linkedin.tobayi-howton-polsia-review-2026-08-02]]

## 经营数据拆账

headline `$9.3678M` 可复算为：

- subscription MRR `$531,610.08 × 12 = $6.3793M`；
- 过去 30 天其他现金流 `$249,036.88 × 12 = $2.9884M`。

相比 7 月 15 日，订阅年化占 headline 的比例由约 59.5% 提升至约 68.1%。这使 headline 的经常性结构有所改善，但仍是 run rate，不是审计收入。

官方 API 的 `dailyMetrics.arr=$6.3477M` 实际等于当时 subscription MRR `$528,976 × 12`；top-level `arr_usd=$9.3678M` 则包含任务包、广告、boost、域名等年化。两个字段名称相似、语义不同，后续引用必须带 provenance。

## 新反馈

- Tobayi Howton：前端生成体验真实有价值，但 DNS、邮件静默失败和支持无响应阻断生产使用。[[source.linkedin.tobayi-howton-polsia-review-2026-08-02]]
- Eric Ferreira：绿地创业暂不适合；已有收入、明确 pain point 和测试预算时值得考虑。[[source.linkedin.eric-ferreira-polsia-review-2026-08-02]]
- Reddit 一个月用户自述只获得未转化 leads；其他讨论更多是营销质疑，不是使用证据。[[source.reddit.polsia-profit-question-2026-07-27]] [[source.reddit.polsia-claims-verification-2026-07-30]]

这些样本强化可靠性与结果差距，不能代表总体用户。

## 未变化

- 首页主定位仍是 “AI That Runs Your Company While You Sleep” 与 “Never Hire Again”。
- Terms 仍为 2026-06-19，广告平台费和客户支付 fee 均为 20%，14 天 hold、$50 最低提现、$500/月 cap 等公开合同未见变化。
- Privacy 仍为 2026-06-24；subprocessor 大栈与 7 月 15 日记录一致。
- 创始人近期公开内容继续强化 everyone is a founder、AI 3.0 和 Polsia end state 等叙事，没有新的可核验融资或团队变化。

## Traffic 与 STOP

当前 Similarweb/Semrush 均在 report 载入前连接关闭，无法更新。旧 Similarweb 是 include-subdomains=true，与本次 root-only contract 不可比；不使用旧 5.248M visits 作为当前 root-only 值。[[source.traffic.polsia-provider-stop-2026-08-02]]

## 证据不能支持

1. `$9.37M ARR` 等于纯 SaaS ARR或审计收入；
2. 13,366 paying users 各自运营独立成功公司；
3. 14,734 active companies 有客户、收入或 accepted outcome；
4. churn 上升由产品质量单一导致；
5. 两位具名用户与少量 Reddit 评论代表总体；
6. 新增 `GROW MY COMPANY` 入口已经完成成熟迁移能力；
7. Traffic provider STOP 等于流量下降或 no-data。

## 更新触发器

- 官方公开 accepted outcomes、客户公司收入 cohort 或 churn 定义；
- trial-to-paid/churn 连续两个以上快照发生方向性改善；
- Grow My Company 公布迁移范围、连接方式或案例；
- DNS/email/support 出现官方修复或多用户复测；
- Similarweb/Semrush 入口恢复并能确认完整 root-only scope；
- 价格、20% fee、提现 cap 或 Terms 版本改变。

