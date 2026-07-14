# Agent 外部副作用授权闸门

Agent 在发邮件、创建会议、修改记录等会影响外部世界的动作前，不只依赖主 Agent 的 prompt，也不必把所有动作都退回人工确认。独立 Validator 读取用户授权、真实任务历史与主 Agent 的执行理由，再决定放行、拒绝或要求修正。

[[company.lindy]] 在一次内部误发日历邀请事件后公开了这套机制，并用 60 个样本、不同 prompt 与模型组合持续回归。[[source.lindy.validator-2026]]

它解决的是“授权”而不是一般事实准确率。仍需验证 Validator 自身错误、豁免路径、授权过期、记忆污染、外部 prompt injection 和生产误拦截。
