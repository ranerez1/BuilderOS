-- Run in Supabase SQL Editor on an existing database that already has `todos`
-- (adds Phase C columns without recreating the table)

ALTER TABLE todos
  ADD COLUMN IF NOT EXISTS details TEXT DEFAULT NULL,
  ADD COLUMN IF NOT EXISTS priority SMALLINT NOT NULL DEFAULT 1,
  ADD COLUMN IF NOT EXISTS due_at TIMESTAMPTZ DEFAULT NULL;

ALTER TABLE todos DROP CONSTRAINT IF EXISTS todos_priority_check;
ALTER TABLE todos ADD CONSTRAINT todos_priority_check
  CHECK (priority >= 0 AND priority <= 2);

CREATE INDEX IF NOT EXISTS idx_todos_priority ON todos (priority DESC);
CREATE INDEX IF NOT EXISTS idx_todos_due_at ON todos (due_at);
