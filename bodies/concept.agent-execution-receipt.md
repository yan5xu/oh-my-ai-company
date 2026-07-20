> **定义**：把一次 Agent 执行的目标、输入、步骤、工具、来源、校验、异常、人工介入和最终结果保存为可追溯对象，使任务可以复核、审计和比较，而不只留下最终回答。

[[company.maisa|Maisa]] 将这种机制称为 Chain of Work。它试图回答的不是“Agent 想了什么”，而是“Agent 实际做了什么、依据什么、哪些检查通过、哪里失败、最后交付了什么”。这与不可验证的 Chain of Thought 不同，也比普通 activity log 更接近业务证据。

一个完整的执行收据至少应包含：任务与 acceptance criteria、输入版本、工具和权限、每一步输入输出、外部系统副作用、规则校验、retry/fallback、人工审批或接管、最终 accepted/rejected 状态、成本与时延，以及可复现所需的模型/代码/配置版本。

但“有 trace”不等于“治理有效”。如果日志可被修改、遗漏副作用、没有 accepted outcome、无法关联权限与成本，或者 self-healing 变更不进入版本和审批，执行收据仍可能只是漂亮的运行历史。后续跨公司比较时，应区分 observability、auditability、evaluation 和 accountability。

当前核心证据：[[source.maisa.chain-of-work]]、[[source.maisa.trust]]。与生产 trace 驱动 harness、独立 validator 和任务合同相关，但不是同一概念。
