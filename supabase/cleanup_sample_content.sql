-- Optional cleanup: keep only one latest record per content table.
-- Run this manually in Supabase SQL editor only if the existing database contains sample/demo rows.

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY display_order ASC, created_at ASC) AS rn FROM staff
)
DELETE FROM staff WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(published_at, created_at) DESC) AS rn FROM news
)
DELETE FROM news WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(award_date, created_at::date) DESC, created_at DESC) AS rn FROM achievements
)
DELETE FROM achievements WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY COALESCE(date, created_at::date) DESC, created_at DESC) AS rn FROM activities
)
DELETE FROM activities WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY title ASC, created_at ASC) AS rn FROM library_books
)
DELETE FROM library_books WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY grade ASC, tur ASC, day ASC, lesson_number ASC) AS rn FROM schedule
)
DELETE FROM schedule WHERE id IN (SELECT id FROM ranked WHERE rn > 1);

WITH ranked AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY display_order ASC, year ASC, created_at ASC) AS rn FROM milestones
)
DELETE FROM milestones WHERE id IN (SELECT id FROM ranked WHERE rn > 1);
