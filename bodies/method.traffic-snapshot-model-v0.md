# 流量指标建模 v0：traffic.snapshot

## 决策

不把流量字段直接塞进 `company`。新增独立类型 `traffic.snapshot`。

原因：流量是时间序列，同一家公司会有多次抓取、不同时间段、不同口径、不同平台来源。如果直接写进 `company`，会覆盖历史，且无法表达 Similarweb / Semrush / Google Trends / GA / GSC 的不同口径。

## 心智

- `company`：主体事实，尽量稳定，例如官网、创始人、产品定位、标签。
- `source.item`：证据原文/抓取记录，例如一页 Similarweb 报告或一篇文章。
- `traffic.snapshot`：从证据中抽取出来的结构化指标，用来横向比较和排序。

## MVP 字段

核心维度：
- 主体与证据：company、source_item、platform、domain、period_start、period_end、collected_at。
- 规模：total_visits、monthly_visits、unique_visitors。
- 质量：visit_duration_seconds、pages_per_visit、bounce_rate_pct、desktop/mobile share。
- 排名：global_rank、country_rank、category_rank。
- 渠道：direct、organic_search、paid_search、referral、organic_social、paid_social、gen_ai、email、display_ads。
- 搜索：search_traffic、keyword_count、branded/nonbranded search。
- 竞品/相邻：similar_domains。
- 口径：geo、web_source、include_subdomains、quality、notes。

## 第一批迁移

已迁移 7 条 Similarweb 快照：
- [[traffic.similarweb.hyperbrowser-2026-01-2026-06]]
- [[traffic.similarweb.browserbase-2026-01-2026-06]]
- [[traffic.similarweb.viktor-2026-01-2026-06]]
- [[traffic.similarweb.tasklet-2025-12-2026-05]]
- [[traffic.similarweb.arga-labs-2026-01-2026-06]]
- [[traffic.similarweb.hyperagent-2026-01-2026-06]]
- [[traffic.similarweb.adept-2026-01-2026-06]]

## 使用方式

横向看规模和渠道：

```bash
mmx -C "$VAULT" query traffic.snapshot --select company,monthly_visits,direct_pct,organic_search_pct,paid_search_pct,organic_social_pct,paid_social_pct --where platform=Similarweb
```

看某家公司历史：

```bash
mmx -C "$VAULT" query traffic.snapshot --select title,period_start,period_end,monthly_visits,direct_pct,organic_search_pct --where company=company.hyperbrowser
```

## 后续再考虑

暂时不在 `company` 上加 latest_monthly_visits / latest_traffic_snapshot。等快照数量多、横向查询频繁后，再考虑加冗余字段做列表展示优化。

## Kernel 样本补充：API-first infra 的解释边界

新增 [[traffic.similarweb.kernel-2026-01-2026-06]] 后，需要明确：`traffic.snapshot` 是网站注意力快照，不是产品调用量快照。

对 API-first 基础设施，报告必须把两类规模拆开：

- **Acquisition / attention**：website visits、referral、search、social、geo。
- **Usage / workload**：API calls、sessions、jobs、compute hours、客户案例调用量、并发、错误率。

Kernel 的网站流量远低于 Browserbase/Browserless，但官方披露的单客户 sessions 和 browsers launched 很高。正确做法不是二选一，而是同时呈现、标明来源，并解释两者衡量的问题不同。

另外，Similarweb 的 similar sites 只表示流量、搜索或受众邻接。必须再用产品定位、客户任务、输入输出、部署层级和替代关系判断 direct competitor / adjacent / noise。
