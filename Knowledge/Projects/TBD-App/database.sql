-- Create the todos table in your Supabase database
-- Run this in the Supabase SQL Editor (new projects)

CREATE TABLE todos (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  task TEXT NOT NULL,
  is_complete BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  details TEXT DEFAULT NULL,
  priority SMALLINT NOT NULL DEFAULT 1 CHECK (priority >= 0 AND priority <= 2),
  due_at TIMESTAMPTZ DEFAULT NULL
);

-- Optional: Insert some sample data
INSERT INTO todos (task, is_complete, priority, details, due_at) VALUES
('Set up Supabase project', false, 2, NULL, NULL),
('Create the todos table', true, 1, 'Include Phase C columns', NULL),
('Connect Next.js to Supabase', false, 1, NULL, NOW() + INTERVAL '7 days'),
('Deploy the application', false, 0, NULL, NULL);

-- Optional: Create an index for better performance
CREATE INDEX idx_todos_created_at ON todos (created_at DESC);
CREATE INDEX idx_todos_is_complete ON todos (is_complete);
CREATE INDEX idx_todos_priority ON todos (priority DESC);
CREATE INDEX idx_todos_due_at ON todos (due_at);
