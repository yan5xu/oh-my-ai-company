# Migrating Most Managed-Agent Traffic from Claude to DeepSeek
2026-06-24 官方工程文章。Lindy 称把大部分 managed-agent 流量迁到 Atlas Cloud 上的 DeepSeek v4 Flash，部分路径保留 Sonnet；迁移部分推理成本约降 90%。

评估链包括 offline eval、内部 rollout、小流量线上测试与多周 retention。Kimi K2.6 虽通过离线评测，却在小规模 live rollout 中失败。成本和结果均为公司自报。
