-- DOSOV School Management System Database Schema

-- Admin Users Table
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  full_name TEXT,
  role TEXT DEFAULT 'admin',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Hero Section Settings
CREATE TABLE hero_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT DEFAULT 'DOSOV - Zamonaviy Ta\'lim',
  subtitle TEXT DEFAULT 'Kelajagingizni biz bilan quring',
  background_type TEXT DEFAULT 'gradient', -- 'gradient', 'image', 'video'
  background_url TEXT,
  video_url TEXT,
  stats_years TEXT DEFAULT '15+',
  stats_students TEXT DEFAULT '5000+',
  stats_staff TEXT DEFAULT '150+',
  cta_text TEXT DEFAULT 'Ro\'yxatdan o\'tish',
  cta_link TEXT DEFAULT '#contact',
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Statistics Settings
CREATE TABLE stats_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  students_count INTEGER DEFAULT 5200,
  staff_count INTEGER DEFAULT 156,
  achievements_count INTEGER DEFAULT 342,
  admission_percent INTEGER DEFAULT 89,
  rooms_count INTEGER DEFAULT 28,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Staff Table
CREATE TABLE staff (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name TEXT NOT NULL,
  role TEXT NOT NULL, -- 'director', 'deputy', 'teacher', 'staff'
  subject TEXT,
  phone TEXT,
  email TEXT,
  photo_url TEXT,
  bio TEXT,
  position TEXT, -- For leadership roles
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- History/Milestones Table
CREATE TABLE milestones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  is_director BOOLEAN DEFAULT false, -- For director history
  director_name TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- News Table
CREATE TABLE news (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  content TEXT,
  category TEXT NOT NULL, -- 'elon', 'maqola', 'ozgarish', 'tadbir'
  image_url TEXT,
  author TEXT,
  is_published BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  view_count INTEGER DEFAULT 0,
  published_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Achievements Table
CREATE TABLE achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'olimpiada', 'sport', 'ilmiy', 'sertifikat'
  level TEXT, -- 'mintaqa', 'viloyat', 'respublika', 'xalqaro'
  student_name TEXT,
  student_photo_url TEXT,
  teacher_name TEXT,
  award_date DATE,
  image_url TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Table
CREATE TABLE activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT NOT NULL, -- 'olimpiada', 'sport', 'madaniyat', 'hashar', 'bayram'
  date DATE,
  image_url TEXT,
  location TEXT,
  participants_count INTEGER,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Library Books Table
CREATE TABLE library_books (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  author TEXT,
  category TEXT NOT NULL, -- 'darslik', 'badiy', 'ichki'
  grade INTEGER, -- For textbooks (1-11)
  publisher TEXT,
  year INTEGER,
  quantity INTEGER DEFAULT 1,
  cover_url TEXT,
  description TEXT,
  is_published BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Schedule Table
CREATE TABLE schedule (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  grade INTEGER NOT NULL, -- 1-11
  tur TEXT NOT NULL, -- 'A' or 'B'
  day TEXT NOT NULL, -- 'Dushanba', 'Seshanba', etc.
  lesson_number INTEGER NOT NULL, -- 1-6
  subject TEXT NOT NULL,
  teacher_id UUID REFERENCES staff(id),
  room TEXT,
  week_type TEXT DEFAULT 'both', -- 'even', 'odd', 'both'
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert default admin user (password: admin123)
-- Note: In production, use proper password hashing
INSERT INTO admin_users (email, password_hash, full_name, role) 
VALUES ('admin@dosov.uz', 'admin123', 'Admin', 'super_admin');

-- Insert default hero settings
INSERT INTO hero_settings (title, subtitle) 
VALUES ('DOSOV - Zamonaviy Ta\'lim', 'Kelajagingizni biz bilan quring');

-- Insert default stats
INSERT INTO stats_settings (students_count, staff_count, achievements_count, admission_percent, rooms_count)
VALUES (5200, 156, 342, 89, 28);