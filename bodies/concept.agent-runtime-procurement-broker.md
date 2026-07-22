# Agent runtime procurement broker

传统 API marketplace 在开发阶段由人选 provider、建账户、拿 key、接 billing。这个候选模式把采购决策移到 Agent 运行时：

1. 根据任务 discover providers/endpoints；
2. inspect schema、price、constraints；
3. 在预算和 policy 下选择；
4. run 并统一付款；
5. 保留 provenance、cost、failure 与 refund 记录。

[[company.monid]] 是当前最直接样本；[[company.sapiom]]、[[company.anyway]]、[[company.nevermined]]、[[company.skyfire]] 分别从 runtime、wallet/ledger、monetization、identity/payment 邻近。

这个模式的真实壁垒可能来自 provider distribution、价格/质量路由数据、wallet/预算和可靠性，而不是 endpoint 目录数量。

待复验：用户 OAuth actions、enterprise governance、provider concentration、failure billing 和高频 workload 的直接签约替代。
