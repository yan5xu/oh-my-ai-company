export type FieldValue = string | number | boolean | null | FieldValue[] | Record<string, unknown>;

export interface PublicObject {
  id: string;
  type_id: string;
  title: string;
  body?: string;
  body_path?: string;
  fields: Record<string, FieldValue>;
  created_at: string;
  updated_at: string;
}

export interface PublicLink {
  id: number;
  kind: string;
  relation: string;
  line?: number;
  text?: string;
  object_id: string;
  title: string;
  type_id: string;
}

export interface GraphEdge {
  id: number;
  from_object_id: string;
  to_object_id: string;
  kind: string;
  relation: string;
}

export interface TypeSummary {
  id: string;
  name: string;
  description: string;
  object_count: number;
}

export interface Meta {
  name: string;
  description: string;
  generated_at: string | null;
  object_count: number;
  link_count: number;
  type_count: number;
}
