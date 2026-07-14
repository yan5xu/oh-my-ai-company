# 如何在 Multica 拥有一位 24/7 的高级数据分析师
# 24/7 数据分析 Agent 案例

**证据等级：S1，官方案例。**

案例用 Mac mini 运行 Multica daemon，以 Claude/Codex 执行，通过只读 kubectl、PostHog 和 PostgreSQL 凭据访问数据，加载数据分析 Skill，再用 Autopilot 定期创建 Issue。名为 `db-boy` 的 Agent 生成周报、广告分析和用户画像，并为异常创建后续 Issue。

它证明官方已把 Multica 用于 coding 之外的数据工作，并展示真实配置方式；但案例仍由官方提供，不能据此推断独立客户规模或一般企业安全性。关联：[[company.multica]]。
