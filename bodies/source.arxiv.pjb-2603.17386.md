# PJB: A Reasoning-Aware Benchmark for Person-Job Retrieval

提交于 2026-03-18，署名 CareerInternational Research Team。

论文提出 PJB v1.0：近 300 个完整 JD、近 200,000 份去标识完整简历、2,000+ 正相关判断，覆盖六类行业岗位，用于诊断 person-job retrieval 的领域与推理差异。

重要边界：数据来自 2025-01-01 之后的内部搜索日志；相关性由两阶段 LLM-as-a-Judge 加约 20% query 的人工抽检产生；只保留正标签，缺失 pair 无法区分负样本与未进 pool；推理标签是启发式规则；论文称数据只限内部受控研究访问。它能证明 Career International 团队的技术研究和 MiraDay 引用的 benchmark 存在，不能单独证明 MiraDay 线上匹配质量或公平性。
