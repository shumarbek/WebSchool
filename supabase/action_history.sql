-- Optional action history table for admin activity auditing.
-- Only the admin role is used.

CREATE TABLE IF NOT EXISTS action_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES admin_users(id) ON DELETE SET NULL,
  user_email TEXT NOT NULL,
  user_role TEXT NOT NULL DEFAULT 'admin' CHECK (user_role = 'admin'),
  action_type TEXT NOT NULL CHECK (action_type IN ('create', 'update', 'delete', 'login', 'logout')),
  table_name TEXT NOT NULL,
  record_id UUID,
  record_title TEXT,
  old_value JSONB,
  new_value JSONB,
  ip_address TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE action_history DISABLE ROW LEVEL SECURITY;
