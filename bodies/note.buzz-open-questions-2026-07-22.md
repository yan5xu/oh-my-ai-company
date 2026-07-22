# Buzz open questions

1. Block 内部到底有多少人/团队/agent 使用 Buzz？是否承载生产工作，还是主要是构建团队的 dogfood？
2. Hosted beta 的活跃 communities、DAU/WAU、retention 和 workload 规模是什么？
3. Hosted 免费之后如何收费？community、storage、agent runtime、enterprise support 还是其他？
4. Channel membership 作为主要 ACL 能否覆盖企业对 least privilege、field-level secret、agent capability 和跨 channel delegation 的需求？
5. Privacy 的默认 180 天与 Support 的 365 天保留期如何统一？
6. Hosted messages/DM/media 非 E2E；agent prompt/output 经第三方 model provider 时，DPA、subprocessor、data residency、enterprise opt-out 如何处理？
7. Workflow approval executor、rate limiting、merge coordinator、issues、mobile 和 push 何时达到可迁移团队的成熟度？
8. Block 提交给 Nostr 的 agent identity extension 是否会被 upstream 接受？
9. Self-hosted relay 的运营成本、升级兼容、备份和灾备是否有正式 SLA/guide？
10. Buzz Mesh 的 peer trust、prompt privacy、accounting 和资源滥用如何治理？
11. Jack launch 的注意力能否转化为持续 external contributors 和真实团队迁移？
12. Terms 对 hosted competitive benchmarking 的限制是否只针对 hosted Service，不影响 Apache-2.0 self-hosted evaluation？当前按最保守边界处理。

## 更新触发器

- GitHub stars/releases/contributors 和 main status 在 launch 后 7 天、30 天显著变化。
- Hosted pricing、usage limits 或 enterprise terms 发布。
- 官方公布 Block 内部或外部 adoption/retention。
- Approval、mobile、forge、E2E DM、rate limit 由在建变为 ships。
- Privacy/Support retention 冲突被修订。
- Similarweb 出现可绑定 buzz.xyz 的真实 series；或 Semrush report date、AI/SEO cards、card-chart semantic split 出现实质变化。
- 出现独立客户案例、迁移复盘或安全事件。
