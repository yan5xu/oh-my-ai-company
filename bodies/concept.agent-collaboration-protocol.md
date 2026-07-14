## 定义

Agent Collaboration Protocol（ACP）是 [[company.bloome]] 对多 Agent 协作约束的命名。它不是一个中心调度器，而是让 Agent 在共享环境里遵守可见任务状态、新鲜环境感知和输出边界。

## 最小机制

1. 共享 task state：任务、负责人、进度、剩余工作对所有参与者可见。
2. Fresh sensing：开始前、执行中和发布前重新读取共享环境，避免提交过期结果。
3. Safe output boundary：完成后停止写入，避免重复发布和相互覆盖。
4. 可见房间：消息、交接、纠错和最终结果都进入同一对话，让人可以随时打断和审阅。

## 研究判断

ACP 把多 Agent 问题从“谁更聪明”转向“共享环境是否足够可读”。它值得作为产品模式追踪，但当前主要证据来自 Bloome 官方文章和早期外部体验，尚缺大规模任务成功率、重复率、冲突率和人工接管率。

证据：[[source.bloome.acp]]、[[source.bloome.group-workspace]]、[[source.bloome.xhs-guizang]]。
