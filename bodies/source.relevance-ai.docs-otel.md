# Relevance AI OpenTelemetry 事件导出文档

Enterprise 可把 Agent invocation、模型、输入输出、工具调用、token、Workforce version 与状态以 OTEL logs/traces 写入客户 S3。临时 staging 数据 30 天后清理。

PII redaction 只作用于导出数据，不代表实时会话和平台内部存储已同步脱敏。Prompt injection detection 只给 trace 标记，不自动阻断或重写执行。
