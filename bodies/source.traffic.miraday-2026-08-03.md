# MiraDay Traffic provider access STOP

Traffic receipt：`msg_03d8827cb66f8aba`；采集时间约 2026-08-03T08:05–08:06Z。

目标对象为 `mira.day`，Similarweb contract 是 root-only、最近 closed 6m、Worldwide、All Traffic；Semrush contract 是 root-domain Domain Overview。

Similarweb 在报告加载前返回 `ERR_CONNECTION_CLOSED`，最终为 `chrome-error://chromewebdata/`；Semrush 在报告加载前明确返回登录过期/无效，随后进入 error page。两者均未到达对象、scope 或指标页。

因此状态是 provider access STOP，不是 no-data、零流量或低样本。没有可用 displayed/raw/derived 数值，也不能做 visits、rank、keyword、backlink 或 trend 推断。只有在授权入口恢复且能从可见页面确认完整 scope 时才刷新，并保留本次 STOP lineage。
