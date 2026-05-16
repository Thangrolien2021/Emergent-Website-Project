-- JulianTees designs schema (Cloudflare D1)
-- Apply via:  wrangler d1 execute juliantees-designs-db --file=migrations/0001_init.sql --remote

CREATE TABLE IF NOT EXISTS designs (
  id           TEXT PRIMARY KEY,
  title        TEXT NOT NULL,
  description  TEXT DEFAULT '',
  category     TEXT DEFAULT 'graphic',
  tags         TEXT DEFAULT '',
  featured     INTEGER DEFAULT 0,
  external_url TEXT DEFAULT '',
  images       TEXT NOT NULL,
  created_at   TEXT NOT NULL,
  updated_at   TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_designs_featured ON designs(featured);
CREATE INDEX IF NOT EXISTS idx_designs_created  ON designs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_designs_category ON designs(category);
