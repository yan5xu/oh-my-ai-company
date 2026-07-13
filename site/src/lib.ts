import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function textValue(value: unknown): string {
  if (Array.isArray(value)) return value.map(textValue).filter(Boolean).join(", ");
  if (value && typeof value === "object") return JSON.stringify(value);
  return value === null || value === undefined ? "" : String(value);
}

export function tagsFor(fields: Record<string, unknown>) {
  const value = fields.tags ?? fields.category ?? fields.kind ?? fields.role;
  if (Array.isArray(value)) return value.map(String).filter(Boolean).slice(0, 4);
  if (typeof value === "string") return value.split(",").map((tag) => tag.trim()).filter(Boolean).slice(0, 4);
  return [];
}

export function summaryFor(fields: Record<string, unknown>) {
  return textValue(fields.one_liner ?? fields.description ?? fields.bio ?? fields.definition ?? fields.statement ?? fields.positioning ?? fields.website ?? fields.url);
}

export function mediaURL(src: string | undefined) {
  if (!src) return "";
  if (/^(https?:|data:|blob:)/.test(src)) return src;
  const normalized = src.replace(/^\.\.\//, "").replace(/^\.\//, "").replace(/^\//, "");
  if (normalized.startsWith("assets/")) return `/media/${normalized}`;
  return src;
}
