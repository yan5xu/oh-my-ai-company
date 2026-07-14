CREATE TABLE IF NOT EXISTS indexnow_state (
  url TEXT PRIMARY KEY,
  fingerprint TEXT NOT NULL,
  submitted_at TEXT NOT NULL
);
