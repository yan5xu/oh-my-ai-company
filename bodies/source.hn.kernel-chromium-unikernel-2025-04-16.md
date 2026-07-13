# Show HN: We Put Chromium on a Unikernel

URL: https://news.ycombinator.com/item?id=43705144

Published: 2025-04-16 · Evidence: S3 community thread, with official founder replies.

- 132 points、46 comments。
- 帖子称 warm Docker pool 启动约 5 秒，unikernel 为 10-20ms；headful active image 约 8GB。
- 创始人解释真正驱动力不只是冷启动，而是 session pause/resume：任务中断时可保存状态且不占 active compute。
- 讨论中的有效质疑：warm pool 是否已足够、snapshot 对密码学 nonce 的安全影响、是否属于“真正 unikernel”、bot fingerprinting，以及 8GB active image 的资源开销。
- 对比 2025-07-30 的泛产品 HN 提交（1 point / 0 comments），具体技术 artifact、数据和开源代码明显更能引发开发者讨论。
