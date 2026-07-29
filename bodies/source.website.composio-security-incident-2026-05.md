# Composio 2026 年 5 月安全事件公告

发布时间：2026-05-21；采集时间：2026-07-29。

URL：<https://composio.dev/blog/composio-may-2026-security-incident>

## 公布范围

Composio 披露内部系统遭到未授权访问。持续更新的公告称：

- 少量用户的 GitHub token 被泄露；
- 另有少量用户受到特定 API Key 影响；
- 攻击者以大量 exploit 组合探测后，在内部 agentic monitoring tool 获得立足点；
- 公告涉及内部 GitHub token 和员工 Gmail OAuth token；
- 客户被建议撤销 Connected Account token 并轮换 API Key，尤其是 Composio
  无法集中撤销的凭据。

## Composio 声明的整改

公司称已轮换平台凭据，在 provider API 允许时撤销约 100 个 Toolkit 的 token，
对 token 返回进行脱敏，增加 IP restriction/allowlist，发布入侵指标并联系受影响
客户和 provider。

公告称删除 connection 不一定使 provider 凭据失效；在当时更新节点，少于 5% 的
连接无法通过标准 provider API 完成撤销。

## 边界

该页面包含连续更新快照，采集时仍是持续演进的事件公告。本调研不声称调查已经最终
结束，也不声称公开范围穷尽全部影响。
