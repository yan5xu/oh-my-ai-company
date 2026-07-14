Agent 平台的竞争正从“能不能构建一个 Agent”进入“上线后谁负责”。[[company.ema]] 的 Autopilot 把生命周期明确写成 Discover、Build、Debug、Test、Maintain、Evolve，并把 broken approval chain、规则变化、组织重组、connector 故障和 drift 视为主要工作。[[source.ema.autopilot-2026-04-29]]

这个控制面至少需要：

- 可版本化 workflow、配置与依赖图；
- 上线前 evaluation、edge-case 与 compliance test；
- 运行时 logs、metrics、trace、feedback 与 decision lineage；
- Agent、connector、data flow 的故障定位和恢复；
- 组织/政策/系统变化后的影响分析；
- human approval、rollback、权限与审计；
- 持续优化但不让自动更新越过治理边界。

与 [[concept.ai-employee-operating-system]] 的区别：后者描述长期 AI 劳动力需要哪些管理原语；本概念聚焦 day-2 operations，即已经上线的 Agent 如何长期保持可用、合规和与组织现实一致。

当前信心为 medium：Ema 的产品方向和官方功能清楚，但尚缺客户侧长期故障率、测试覆盖、维护成本、回滚和多月稳定性数据。
