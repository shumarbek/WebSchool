ALTER TABLE news
ADD COLUMN IF NOT EXISTS responsible_person_id UUID REFERENCES staff(id) ON DELETE SET NULL;

ALTER TABLE activities
ADD COLUMN IF NOT EXISTS teacher_ids UUID[] DEFAULT '{}';

ALTER TABLE activities
ADD COLUMN IF NOT EXISTS teacher_names TEXT[] DEFAULT '{}';

ALTER TABLE activities
ADD COLUMN IF NOT EXISTS location_url TEXT;

ALTER TABLE platform_settings
ADD COLUMN IF NOT EXISTS address_map_url TEXT;

ALTER TABLE milestones
ADD COLUMN IF NOT EXISTS month INTEGER DEFAULT 1 CHECK (month BETWEEN 1 AND 12);

ALTER TABLE milestones
ADD COLUMN IF NOT EXISTS is_director BOOLEAN DEFAULT false;

ALTER TABLE milestones
ADD COLUMN IF NOT EXISTS director_name TEXT;

ALTER TABLE milestones
ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}';

CREATE INDEX IF NOT EXISTS idx_milestones_date ON milestones(year, month);

CREATE TABLE IF NOT EXISTS site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT,
  user_agent TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON site_visits(visited_at DESC);

ALTER TABLE site_visits DISABLE ROW LEVEL SECURITY;

CREATE TABLE IF NOT EXISTS ai_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  api_key TEXT,
  model TEXT DEFAULT 'gemini-1.5-flash',
  platform_context TEXT,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE ai_settings DISABLE ROW LEVEL SECURITY;
