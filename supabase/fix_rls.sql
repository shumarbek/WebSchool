-- Fresh setup compatibility: custom browser-side admin CRUD requires RLS disabled.
-- Run after schema.sql if RLS was enabled manually.

ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE stats_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE staff DISABLE ROW LEVEL SECURITY;
ALTER TABLE milestones DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE library_books DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedule DISABLE ROW LEVEL SECURITY;

INSERT INTO admin_users (email, password_hash, full_name, role)
VALUES ('admin@dosov.uz', 'admin123', 'Admin', 'admin')
ON CONFLICT (email) DO UPDATE SET
  password_hash = EXCLUDED.password_hash,
  full_name = EXCLUDED.full_name,
  role = 'admin',
  updated_at = NOW();
