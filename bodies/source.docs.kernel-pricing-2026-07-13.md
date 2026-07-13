# Kernel pricing

URL: https://www.kernel.sh/docs/info/pricing

Collected: 2026-07-13 · Evidence: S1 current docs.

- Headless: $0.0000166667/sec，约 $0.06/hour。
- Headful: $0.0001333336/sec，约 $0.48/hour。
- Headful + GPU: $0.0008000016/sec，约 $2.88/hour。
- Developer 免费并含 $5 credits / 5 concurrent；Hobbyist $30/月 / 10；Startup $200/月 / 150；Enterprise custom。
- Managed Auth 在付费计划不收 connection fee；官方举例 100 auth connections 通常少于 $5/月 usage。
- browser pools 只开放给 Startup/Enterprise；standby 停止 usage billing，但仍计入 concurrency。
