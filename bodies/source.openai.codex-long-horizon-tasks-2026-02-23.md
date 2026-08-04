# Run long horizon tasks with Codex

OpenAI 开发者博客作者 Derrick Choi 于 2026-02-23 公开了一次约 25 小时、约 1300 万 token 的 Codex 设计工具实验，并明确称其为 experiment，而非 production rollout。

文章使用的核心术语是 long-horizon tasks、long-running teammates 与 durable project memory。所谓 durable project memory 主要由 repo 中的 Prompt.md、Plan.md、Implement.md、Documentation.md 承担：规格、里程碑、验证、决策和当前状态被外部化为可反复读取的文件；Codex 通过 plan/edit/test/observe/repair/update 的循环保持连续性。

该实验支持“长任务能力来自模型加 agent loop、外部状态和持续验证”的解释，但不能证明通用 Persistent Agent 已经生产化，也不能证明 25 小时运行在所有任务上具有同等可靠性。

