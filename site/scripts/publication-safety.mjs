export function matchesSensitivePattern(value, pattern) {
  const text = String(value || "");
  const needle = String(pattern);
  return needle.startsWith("/")
    ? text.includes(needle)
    : text.toLowerCase().includes(needle.toLowerCase());
}
