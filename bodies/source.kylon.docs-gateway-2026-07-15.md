# Kylon CLI Gateway Run

官方文档称 `kylon gateway run` 是把本地 Agent 接入 Kylon workspace 的推荐入口，组合 registration 与 daemon start。首次运行需要 server URL、provider 与 API key，provider 支持 codex、claude-code、generic；session 保存到 `~/.kylon/gateway-session.json`，daemon 可作为 systemd/launchd 服务运行。该文档直接支持“本地 runtime 接入”判断；未登录实测 Agent assignment 与执行成功率仍未完成。
