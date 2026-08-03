# CRE-T1 Preview Technical Report

提交于 2026-03-18，署名 CareerInternational Research Team。

论文提出 Thought 1 / CRE-T1，一类在 query 侧生成有限推理轨迹并压缩成向量的生成式检索模型。论文称 T1-4B 在 BRIGHT 原始 query 设置下优于多种 contrastive baseline，并接近多阶段 retrieval + reranking 管线。

该论文支持 MiraDay 的 reasoning retrieval 技术血缘，但 MiraDay 文档使用名称 MRE，公开材料没有给出 MRE 与 CRE-T1 线上部署版本的精确映射。本轮也未独立重跑 BRIGHT，故榜单和性能仍按论文/厂商证据表达。
