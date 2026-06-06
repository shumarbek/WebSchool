# WebSchool Platform

Professional school management and public information platform built with Next.js and Supabase. The project includes a public website, a protected admin panel, content management modules, schedule management, staff/library/history sections, notifications, visit tracking, and Gemini-powered Smart AI.

## Features

- Public website for school news, achievements, activities, staff, history, library, schedule, contact information, and map links.
- Admin panel for managing platform content from one place.
- Supabase-backed data storage for all dynamic content.
- Secure admin authentication using server-only environment variables and httpOnly session cookies.
- Smart AI assistant powered by Gemini, with platform data context and admin-configurable model/context.
- Notification bell for new news and scheduled event reminders.
- Visit tracking for the last 30 days in the admin dashboard.
- Responsive light/dark UI with card modals, media previews, and mobile-friendly navigation.

## Tech Stack

- Next.js 14
- React 18
- Tailwind CSS
- Supabase
- Framer Motion
- Lucide React
- Gemini API through Google AI Studio

## Project Structure

```text
app/                 Next.js routes, admin pages, and API routes
components/          Shared UI and public website components
context/             Admin auth context
hooks/               Reusable client hooks
lib/                 Supabase clients/helpers
supabase/            SQL schema, migrations, and database utilities
```

## Requirements

- Node.js 18 or newer
- npm
- Supabase project
- Gemini API key, optional but required for full Smart AI responses

## Environment Variables

Create `.env.local` in the project root. Use `.env.example` as a template.

```env
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key

# Server-only secrets. Never expose these with NEXT_PUBLIC.
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-admin-password
ADMIN_FULL_NAME=Admin
ADMIN_SESSION_SECRET=long-random-session-secret
GEMINI_API_KEY=your-gemini-api-key
```

Important:
- `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are public browser variables.
- Admin credentials, session secret, and Gemini key must remain server-only.
- Restart the dev server after changing `.env.local`.

## Supabase Setup

1. Create a new Supabase project.
2. Open Supabase SQL Editor.
3. Run `supabase/schema.sql`.
4. If you are updating an older database, also run `supabase/add_responsible_teacher_links.sql`.
5. Copy project URL and anon key into `.env.local`.

Additional SQL files:
- `supabase/fix_rls.sql`: compatibility helper if RLS was enabled manually.
- `supabase/cleanup_sample_content.sql`: optional cleanup for old/demo databases.
- `supabase/action_history.sql`: optional action history table.

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

Admin panel:

```text
http://localhost:3000/admin/login
```

Login uses `ADMIN_EMAIL` and `ADMIN_PASSWORD` from `.env.local`.

## Production Build

```bash
npm run build
npm run start
```

## Admin Modules

- Dashboard: statistics, content counts, system status, visit metrics.
- Staff: administration, teachers, specialists, and service staff.
- Schedule: class-based weekly schedule management.
- News: announcements, articles, changes, and events.
- Achievements: olympiad, sport, and certificate achievements.
- Activities: school activities with media, location, and assigned teachers.
- Library: books and digital resources.
- History: school history and director milestones.
- Settings: hero, contact, social, video/image settings.
- Smart AI: model selection and platform context configuration.
- Stats: public statistics settings.

## Smart AI

Smart AI answers user questions using:
- platform settings,
- staff data,
- schedule data,
- news and events,
- achievements,
- activities,
- library books,
- history records,
- manually written platform context from the admin panel.

Gemini API key is read only from:

```env
GEMINI_API_KEY=...
```

The API key is not stored in Supabase and is not exposed to the browser.

## Security Notes

- Admin password is not stored in Supabase.
- Admin login is handled by server API routes:
  - `/api/admin/login`
  - `/api/admin/me`
  - `/api/admin/logout`
- Admin session is stored in an httpOnly cookie.
- Do not commit `.env.local`.
- Use a strong `ADMIN_PASSWORD`.
- Use a long random `ADMIN_SESSION_SECRET`.
- Rotate credentials before production deployment.

## Notifications

The header notification bell shows:
- recently published news,
- event reminders for 3 days before the event,
- event-day reminder for 1 day.

Read notification state is stored locally in the browser.

## Visit Tracking

Public page visits are recorded in `site_visits`. Admin routes are ignored. The dashboard displays a 30-day visit summary.

## Verification

Run before deployment:

```bash
npm run build
```

The build should complete without errors.

## Deployment Checklist

- Supabase schema applied.
- `.env.local` or hosting environment variables configured.
- Admin password changed from any placeholder value.
- `ADMIN_SESSION_SECRET` generated securely.
- `GEMINI_API_KEY` configured if Smart AI should use Gemini.
- Production build passes.

