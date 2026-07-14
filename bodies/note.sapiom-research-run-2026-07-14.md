# Sapiom 本轮调研流程与反思

这是一轮过程记录，不代表以后所有 Agent infra 公司都按同一目录执行。更新方法前回看了 Kernel、Browserless、Browser Use、Hyperbrowser 与 Tolmo 最近几轮，只保留 Sapiom 真正增加的动作。

## 本轮怎么展开

1. **从 Accel 网络 seed 进入**：复用既有 `company.sapiom` 与 Accel source/investment，先查已知再补深度。
2. **重建产品时间线**：官网、旧 package、融资报道、收购、Mastercard 与新 runtime 并排，避免用当前 tagline 覆盖早期产品。
3. **逐层审计产品**：把 Create / Run / Act / Control / Pay 拆开，对照 docs、API、package 年龄与公开功能。
4. **做无账号实测**：CLI scaffold、graph check、authoring MCP、本地两步 workflow；明确没有测试 cloud deploy 和 paid capability。
5. **团队和资本网络**：核对创始人前史、公开员工、Fewsats 技术资产、seed 参投方与 AP4M 合作边界。
6. **规模双轨**：网站访问/渠道/关键词与官方 backend transactions/agents 分开，不互相替代。
7. **社区 objection 对照控制面**：把 Reddit 的 spend/retry/vendor/human-gate 问题逐条对照治理 docs，而不是只做情绪摘要。
8. **竞品按控制点分类**：payment/KYA、protocol/rail、runtime/workflow、supplier 四层，避免把能力供应商当竞品。
9. **补中文与 launch 平台**：微信、小红书、HN、Reddit、Product Hunt；未命中与抓取失败分开。
10. **资产化**：主体、人物、投资、触点、流量、source、note、concept、图片和 X list 一起落库。

## 本轮新增的两项方法

### 产品层成熟度审计

平台型首页会把多层能力呈现成统一产品，但各层的发布时间、API 完整度和实测状态可能完全不同。以后遇到“一体化平台”时，可做一张 layer matrix：

- 该层何时首次发布；
- 是否有 docs/API/package；
- 能否无账号或低风险实测；
- 有哪些真实使用/客户证据；
- 营销承诺里有哪些尚未落到公开接口。

Sapiom 的 gateway 已有数月历史，agent runtime 只发布数天。若只看首页，会把两层误认为同一成熟度。

### 社区 objection 转成 control-surface audit

社区负反馈的价值不只是“有人担心”。对 Agent 支付/治理产品，应把具体 failure mode 映射到产品控制面：

- 单次/周期/任务总额上限；
- retry 与累计成本；
- 新 vendor / capability approval；
- 不可逆交易与恢复；
- 身份、授权和审计。

这样能区分“产品已经回应”“只在营销叙事中回应”“当前没有公开证据”三种状态。

## 工具与证据边界

- Product Hunt 搜索返回同名噪声；只存 S4 metadata，不推出“没有发布”。
- LinkedIn employees 结果混入无关人物；只保留高置信成员，不用 adapter count 当团队规模。
- 小红书直达结果只有 metadata，没有视频转录；不用于产品采用判断。
- V2EX、Linux.do、即刻、知乎当前无 adapter；Google `site:` 未命中不是平台全量检索。
- 网站 traffic 是第三方估算；官方 backend scale 是 S1 自报。二者都保留边界。
- 官网计数器在初始文本与 hydration 后状态不一致；只记录为官网 claim，不当独立规模证据。

## 对既有方法的克制更新

只建议给 [[method.product-research-workflow-v0]] 加两项候选：平台产品的 layer maturity audit，以及把社区 objection 映射到 control surface。它们在 Sapiom 上有效，但仍需更多支付、治理与 runtime 公司复验。

本轮对象：[[company.sapiom]]。核心判断：[[note.sapiom-product-takeaway-2026-07-14]]；竞品边界：[[note.sapiom-competitor-map-2026-07-14]]。
