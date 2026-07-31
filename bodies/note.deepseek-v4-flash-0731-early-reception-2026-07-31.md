# DeepSeek V4 Flash 0731 发布首日市场反馈

**cutoff**：2026-07-31 21:30 CST 左右，距离官方发布约 6.5 小时。

## 对象消歧

本轮市场俗称“DeepSeek V4 正式版”，但一手来源对应的精确对象是 **DeepSeek-V4-Flash-0731 Official API / public beta**。V4-Pro 正式版尚未发布，App/Web 也没有同步更新。[[source.deepseek.v4-flash-0731-release]] [[source.deepseek.v4-flash-0731-clarification]]

## 初步结论

首日最清楚的共识不是“它已经全面打赢了谁”，而是：**它把可用的 coding/agent 能力压到了非常低的 API 成本，并让高 token、高并发的 agent workflow 变得更可负担。**

但真实质量反馈尚未收敛。官方 agent benchmark 很强，爱范儿五项实测也给出正向结果；与此同时，X 上出现核心功能未完成、二次修复仍失败、SVG 质量仍处中档和单次超长等待等反例。当前更合理的判断是：**首日性价比信号强，agent post-training 改进可信；是否达到 Opus 级、是否全面超过 GLM5.2、是否能替代高端模型，证据不足。**

## 反馈矩阵

| 维度 | 首日观察 | 证据强度 |
| --- | --- | --- |
| 价格与缓存 | 官方价格极低；有 Codex 用户报告 148M tokens/人民币 9.4 元、97% cache hit | 高（价格）；中低（单用户成本） |
| Coding / Agent | 官方 9 项 benchmark 大幅提升；爱范儿五项任务全部完成；若干 Codex/Claude Code 用户报告一次完成 | 中；官方 Harness 和小样本限制明显 |
| 真实质量 | 正向称推理、精度、文风改善；负向称游戏核心功能未工作、SVG 仍中档 | 低到中，尚无共识 |
| 速度与稳定性 | 有用户称很快；也有 504 秒无输出的单点异常；Artificial Analysis 尚无速度结果 | 低 |
| 输出效率 | Artificial Analysis Intelligence Index 较高，但输出 token 约为其模型中位数 3.4 倍 | 中，提示“便宜/词”不等于“省/任务” |
| 开放权重 | 官方 MIT 权重引发 LocalLLaMA 强烈正面反馈 | 高（开放事实），低（实际部署覆盖） |
| 本地部署 | 公开权重体量大，官方示例使用 4×GB300；普通消费级部署仍依赖量化 | 中 |
| 产品覆盖 | 仅 Flash API 更新；text-only，无 vision；App/Web 与 V4-Pro 未更新 | 高 |

## 官方 benchmark 如何看

官方结果足以支持“相对 Preview 的 agent post-training 有显著提升”，但不能直接写成跨厂商全面排名：

1. Code Agent benchmark 使用未发布的 DeepSeek Harness；
2. 使用 minimal mode、max effort、temperature=1.0、top_p=0.95；
3. DSBench-FullStack 与 DSBench-Hard 为内部评测；
4. 用户与第三方尚未在统一 harness 上充分复现；
5. 多数首日社交帖子只是转发图表，没有实际任务。

官方模型卡、方法与截图：[[source.deepseek.v4-flash-0731-model-card]] [[source.deepseek.v4-flash-0731-release]]

## 与现有 V4-Pro 的价格比较

| 每 1M tokens | V4 Flash 0731 | 当前 V4-Pro | Flash 相对 Pro |
| --- | ---: | ---: | ---: |
| 输入，cache hit | $0.0028 | $0.003625 | 低约 22.8% |
| 输入，cache miss | $0.14 | $0.435 | 低约 67.8% |
| 输出 | $0.28 | $0.87 | 低约 67.8% |
| 并发上限 | 2500 | 500 | Flash 为 5 倍 |

1M 未缓存输入加 1M 输出的名义费用为 Flash $0.42、Pro $1.305，Pro 约为 Flash 的 3.11 倍。大量输入命中缓存时，差距会明显缩小；实际每任务成本仍取决于输出长度、重试和成功率。这里比较的是 2026-07-31 仍在售的 **V4-Pro 当前版本**，不是尚未发布的 V4-Pro 正式升级版。[[source.deepseek.v4-flash-0731-pricing]]

## 独立证据

Artificial Analysis 给出 Intelligence Index 50 和极低价格，支持高 intelligence-per-dollar；但它用约 210M output tokens 完成评测，而同页中位数约 62M，且首日没有速度结果。[[source.artificial-analysis.deepseek-v4-flash-0731]]

爱范儿五项 coding/agent hands-on 以约人民币 2.85 元完成 393 次 API 请求和约 3422 万 tokens，是目前最具体的中文第三方正面证据。但任务数只有五个、没有长期回归或公开完整 harness。[[source.ifanr.deepseek-v4-flash-0731-hands-on]]

## 社区反馈

- X：价格和 Codex 接入最受欢迎；直接动手样本正负并存，benchmark 转发远多于可复现测试。[[source.x.deepseek-v4-flash-0731-launch-reception]]
- Reddit：开放权重、低价和 public beta 更新获强烈正向反应；高赞讨论也反复强调要等第三方实测、不要把 benchmark 当生产结果。[[source.reddit.deepseek-v4-flash-0731-launch-reception]]
- Hacker News：开发者倾向把它视为熟悉代码库、并行任务和成本敏感 workflow 的候选；对陌生代码、高风险任务和一次成功率仍更谨慎。[[source.hackernews.deepseek-v4-flash-0731-launch-reception]]

## 证据不能支持的说法

1. “DeepSeek V4-Pro 已正式发布”——错误。
2. “DeepSeek App/Web 已升级到 V4”——错误。
3. “V4 Flash 已被用户证明全面超过 Opus 4.8 或 GLM5.2”——证据不足。
4. “官方 benchmark 等于真实生产能力”——错误；Harness、effort、数据集和任务分布不同。
5. “每 token 便宜，所以每任务一定最便宜”——证据不足；长输出、重试和失败会改变总成本。
6. “开放权重等于普通用户可以低成本本地运行”——错误；权重体量和硬件门槛仍高。
7. “首日社交热度等于稳定口碑或采用”——错误。

## 未知与更新触发器

当前未知：官方 API 的峰值稳定性、长上下文可靠性、工具调用错误率、复杂仓库回归、hallucination、生产级 p50/p95 延迟、量化损失、数据处理/地域路由影响，以及 V4-Pro 与 App/Web 的正式更新时间。

建议在以下条件出现时更新：

1. 发布后 48–72 小时出现可复现的第三方 agent/coding eval；
2. Artificial Analysis 补充速度或 token-efficiency 数据；
3. 主流 provider 完成 0731 路由并有稳定性数据；
4. V4-Pro 或 App/Web 正式更新；
5. 出现公开 production case、长上下文或工具调用回归报告。

## 采集边界

本轮只使用 pinixc：官方网页/X、Hugging Face、Artificial Analysis、微信、X、Reddit、Hacker News。小红书对三组查询均返回登录/权限墙，因此记录为未覆盖，不视为无反馈。样本极早、偏开发者和 agent 用户，不能代表大众用户或长期生产。
