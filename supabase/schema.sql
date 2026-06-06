-- DOSOV School Management System
-- Fresh Supabase setup script. Run this once in Supabase SQL Editor.

CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT NOT NULL DEFAULT 'admin' CHECK (role = 'admin'),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS hero_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT 'DOSOV Maktabi',
  subtitle TEXT DEFAULT 'Zamonaviy ta''lim va ochiq boshqaruv platformasi',
  background_type TEXT DEFAULT 'gradient' CHECK (background_type IN ('gradient', 'image', 'video')),
  background_url TEXT,
  video_url TEXT,
  cta_text TEXT DEFAULT 'Yangiliklar',
  cta_link TEXT DEFAULT '#news',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS platform_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone TEXT,
  email TEXT,
  address TEXT,
  address_map_url TEXT,
  youtube_url TEXT,
  instagram_url TEXT,
  telegram_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS site_visits (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  path TEXT,
  user_agent TEXT,
  visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS ai_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  model TEXT DEFAULT 'gemini-1.5-flash',
  platform_context TEXT,
  is_enabled BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS stats_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  students_count INTEGER DEFAULT 0,
  achievements_count INTEGER DEFAULT 0,
  admission_percent INTEGER DEFAULT 0,
  rooms_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT,
  role TEXT NOT NULL CHECK (role IN ('mamuriyat', 'pedagog', 'mutaxassis', 'xizmat')),
  position TEXT,
  subject TEXT,
  work_type TEXT,
  service_count INTEGER DEFAULT 1 CHECK (service_count >= 0),
  experience_years INTEGER DEFAULT 0 CHECK (experience_years >= 0),
  qualification_level TEXT,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  bio TEXT,
  awards TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT staff_required_fields CHECK (
    (role = 'xizmat' AND work_type IS NOT NULL)
    OR (role <> 'xizmat' AND full_name IS NOT NULL)
  )
);

CREATE TABLE IF NOT EXISTS milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  month INTEGER DEFAULT 1 CHECK (month BETWEEN 1 AND 12),
  title TEXT NOT NULL,
  description TEXT,
  is_director BOOLEAN DEFAULT false,
  director_name TEXT,
  image_url TEXT,
  image_urls TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL CHECK (category IN ('elon', 'maqola', 'ozgarish', 'tadbir')),
  image_url TEXT,
  author TEXT,
  event_start_at TIMESTAMP WITH TIME ZONE,
  responsible_person_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  responsible_person TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('olimpiada', 'sport', 'ilmiy', 'sertifikat')),
  stage TEXT CHECK (stage IS NULL OR stage IN ('dostona', 'tuman', 'viloyat', 'respublika', 'osiya', 'jahon')),
  certificate_type TEXT CHECK (certificate_type IS NULL OR certificate_type IN ('milliy', 'cefr', 'ielts', 'toefl', 'topik', 'a-level', 'sat')),
  participants JSONB DEFAULT '[]'::jsonb,
  teacher_ids UUID[] DEFAULT '{}',
  teacher_names TEXT[] DEFAULT '{}',
  award_date DATE,
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL CHECK (category IN ('olimpiada', 'sport', 'madaniyat', 'hashar', 'bayram')),
  date DATE,
  image_url TEXT,
  image_urls TEXT[] DEFAULT '{}',
  video_urls TEXT[] DEFAULT '{}',
  teacher_ids UUID[] DEFAULT '{}',
  teacher_names TEXT[] DEFAULT '{}',
  location TEXT,
  location_url TEXT,
  participants_count INTEGER,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS library_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  category TEXT NOT NULL CHECK (category IN ('darslik', 'badiy', 'ichki')),
  grade INTEGER CHECK (grade IS NULL OR grade BETWEEN 1 AND 11),
  publisher TEXT,
  year INTEGER,
  cover_url TEXT,
  view_url TEXT,
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade INTEGER NOT NULL CHECK (grade BETWEEN 1 AND 11),
  tur TEXT NOT NULL CHECK (tur IN ('A', 'B')),
  day TEXT NOT NULL CHECK (day IN ('Dushanba', 'Seshanba', 'Chorshanba', 'Payshanba', 'Juma', 'Shanba')),
  lesson_number INTEGER NOT NULL CHECK (lesson_number BETWEEN 1 AND 8),
  subject TEXT NOT NULL,
  teacher_id UUID REFERENCES staff(id) ON DELETE SET NULL,
  room TEXT,
  start_time TIME,
  end_time TIME,
  week_type TEXT DEFAULT 'both' CHECK (week_type IN ('even', 'odd', 'both')),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE (grade, tur, day, lesson_number)
);

CREATE INDEX IF NOT EXISTS idx_staff_active_order ON staff(is_active, role, display_order);
CREATE INDEX IF NOT EXISTS idx_staff_featured ON staff(is_active, is_featured, display_order);
CREATE INDEX IF NOT EXISTS idx_news_published_date ON news(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_achievements_published_date ON achievements(is_published, award_date DESC);
CREATE INDEX IF NOT EXISTS idx_activities_published_date ON activities(is_published, date DESC);
CREATE INDEX IF NOT EXISTS idx_library_published_title ON library_books(is_published, title);
CREATE INDEX IF NOT EXISTS idx_schedule_lookup ON schedule(is_active, grade, tur, day, lesson_number);
CREATE INDEX IF NOT EXISTS idx_milestones_date ON milestones(year, month);
CREATE INDEX IF NOT EXISTS idx_site_visits_visited_at ON site_visits(visited_at DESC);

-- Public content tables are browser-managed through Supabase anon key in this project.
-- Admin login credentials are server-only env variables, not database seed data.
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;
ALTER TABLE hero_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_visits DISABLE ROW LEVEL SECURITY;
ALTER TABLE ai_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE stats_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE staff DISABLE ROW LEVEL SECURITY;
ALTER TABLE milestones DISABLE ROW LEVEL SECURITY;
ALTER TABLE news DISABLE ROW LEVEL SECURITY;
ALTER TABLE achievements DISABLE ROW LEVEL SECURITY;
ALTER TABLE activities DISABLE ROW LEVEL SECURITY;
ALTER TABLE library_books DISABLE ROW LEVEL SECURITY;
ALTER TABLE schedule DISABLE ROW LEVEL SECURITY;

-- Initial records: only empty settings rows. No sample content is inserted.
INSERT INTO hero_settings (title, subtitle, cta_text, cta_link, is_active)
SELECT 'DOSOV Maktabi', 'Zamonaviy ta''lim va ochiq boshqaruv platformasi', 'Yangiliklar', '#news', true
WHERE NOT EXISTS (SELECT 1 FROM hero_settings);

INSERT INTO platform_settings (phone, email, address, youtube_url, instagram_url, telegram_url)
SELECT '', '', '', '', '', ''
WHERE NOT EXISTS (SELECT 1 FROM platform_settings);

INSERT INTO stats_settings (students_count, achievements_count, admission_percent, rooms_count)
SELECT 0, 0, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM stats_settings);
