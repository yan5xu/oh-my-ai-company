# New tools and features in the Responses API

OpenAI 于 2025-05-21 正式为 Responses API 发布 background mode。它让耗时数分钟的推理任务异步运行，客户端可轮询状态或重新接收事件，从而减少连接中断和 timeout 对单次任务的影响。

Background mode 是 long-running task 的执行原语，不是长期 Agent：它不创建稳定身份，不负责跨任务记忆、计划触发、工作环境、凭据治理或组织协作。

