PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS types (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT ''
);

CREATE TABLE IF NOT EXISTS objects (
  id TEXT PRIMARY KEY,
  type_id TEXT NOT NULL,
  title TEXT NOT NULL,
  body TEXT NOT NULL DEFAULT '',
  body_path TEXT NOT NULL DEFAULT '',
  fields_json TEXT NOT NULL DEFAULT '{}',
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (type_id) REFERENCES types(id)
);

CREATE INDEX IF NOT EXISTS idx_objects_type_title ON objects(type_id, title);
CREATE INDEX IF NOT EXISTS idx_objects_updated ON objects(updated_at DESC);

CREATE TABLE IF NOT EXISTS links (
  id INTEGER PRIMARY KEY,
  from_object_id TEXT NOT NULL,
  to_object_id TEXT NOT NULL,
  kind TEXT NOT NULL,
  relation TEXT NOT NULL,
  line INTEGER NOT NULL DEFAULT 0,
  text TEXT NOT NULL DEFAULT '',
  resolved INTEGER NOT NULL DEFAULT 1,
  FOREIGN KEY (from_object_id) REFERENCES objects(id),
  FOREIGN KEY (to_object_id) REFERENCES objects(id)
);

CREATE INDEX IF NOT EXISTS idx_links_from ON links(from_object_id);
CREATE INDEX IF NOT EXISTS idx_links_to ON links(to_object_id);

CREATE TABLE IF NOT EXISTS metadata (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL
);

CREATE VIRTUAL TABLE IF NOT EXISTS object_search USING fts5(
  id UNINDEXED,
  title,
  body,
  fields
);
