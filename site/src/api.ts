import type { GraphEdge, Meta, PublicLink, PublicObject, TypeSummary } from "./types";

async function getJSON<T>(url: string): Promise<T> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${response.status}`);
  return response.json() as Promise<T>;
}

export const api = {
  meta: () => getJSON<Meta>("/api/meta"),
  types: () => getJSON<TypeSummary[]>("/api/types"),
  objects: (type: string, q: string, offset: number, limit = 50) => {
    const params = new URLSearchParams({ type, q, offset: String(offset), limit: String(limit) });
    return getJSON<{ items: PublicObject[]; total: number; limit: number; offset: number }>(`/api/objects?${params}`);
  },
  object: (id: string) => getJSON<{ object: PublicObject; links: PublicLink[]; backlinks: PublicLink[] }>(`/api/objects/${encodeURIComponent(id)}`),
  graph: (center: string, depth = 1) => getJSON<{ center: string; nodes: PublicObject[]; edges: GraphEdge[] }>(`/api/graph?center=${encodeURIComponent(center)}&depth=${depth}`)
};
