# NanoCorp 调研过程与反思（2026-07-15）
## 本轮怎么跑

从 Polsia 的直接竞品候选进入，先查 vault，确认 NanoCorp 尚未建模；随后按官网/Docs → 公开经营看板 → 定价/条款 → launch/GTM → 流量 → founder/历史主体 → 融资 → 社区/中文世界 → 竞品边界扩张。

这轮没有注册新账户或创建公司。登录页可达，但实际注册、生成公司和支付会产生外部副作用；产品体验边界明确记为 public surface + docs + live data。

## 本轮新增的方法候选

1. **公开指标分母审计**：headline 之外固定找 denominator。NanoCorp 的 29,108 created、28,266 live 与 197 earning，比任何一个单独数字都更有判断力。
2. **平台收入 / 用户结果双账**：vendor ARR 与 customer revenue 分开，避免“平台卖得好”被写成“客户经营成功”。
3. **补贴 cohort 审计**：Ambassador credits、比赛奖金、referral credits 和 paid acquisition 分开；成功故事要注明是否被补贴。
4. **主体 pivot 资本连续性**：法律主体连续可保留投资边，但必须标出 legacy product 和时间，不能把历史轮次包装成新产品融资。
5. **公开 API 数据最小化**：只保存业务 aggregate；即使 endpoint 公开，也不复制邮件正文、任务内容或个人细节。
6. **Vendor comparison 时效审计**：比较页优先作为 positioning/SEO source；每个竞品事实仍回到当前一手源。

## 与过往轮次的关系

Polsia 已经提出公开经营指标复算、公司生成漏斗与零员工边界；NanoCorp 是第二个高自治样本，进一步补出“平台收入 vs 用户收入”“Ambassador 补贴 cohort”“历史主体融资连续性”三个维度。它使 [[concept.live-operating-dashboard-as-gtm]] 从单一样本变成可比较模式，也形成 [[concept.production-trace-agent-harness-loop]]。

## 工具与证据问题

- 机器重启清空了 `/tmp` 截图和旧的临时 Memex 入口；Memex 已统一改用工作区环境提供的持久 `mmx` 命令。Pinix Edge 曾短暂离线，恢复后继续截图与社区检索，没有为临时故障另造抓取流程。
- Product Hunt 页面本身遇到 Cloudflare 验证，但官方图片 CDN 可读取。最终保留官网、官方产品素材、定价、只含 aggregate 的 live 看板和第三方流量趋势五张图，并逐图目视检查；没有保存 live feed 中的邮件/任务细节。
- 中文检索噪音高；最终精确重试 LinuxDo/V2EX 均为 no_results，搜狗微信找到一篇可完整抓取的 launch 当天周报。该文只按 S3 二次传播保存，不升级为独立用户复盘；平台空结果仍只表述为“本轮未抓到”。
- Product Hunt、HN、YC、LinkedIn、Docs、官方 blog 与流量数据均有可复核 URL；抓取到 partial 的用户帖没有补猜完整结论。

## 收尾标准

- company/person/investor/investment/source/touchpoint/traffic/note/concept 形成强关系；
- 融资边显示 legacy-product，不制造 2026 新轮；
- assets 补齐并逐图目视检查；
- Company Research Map 和 Company Investors 真查询；
- `refresh`、`issues=0`、Git diff、公开边界和 OMAC handoff 均完成后才算 public-ready。

关联方法：[[method.product-research-workflow-v0]]。
