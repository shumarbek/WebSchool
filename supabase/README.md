# Supabase fresh setup

1. Create a new Supabase project.
2. Open SQL Editor and run `schema.sql`.
3. Copy the project URL and anon key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=strong-password
ADMIN_FULL_NAME=Admin
ADMIN_SESSION_SECRET=long-random-secret
GEMINI_API_KEY=your-gemini-api-key
```

4. Start the app and login at `/admin/login`.

Admin login and password are read from server-only `.env.local` variables. Never prefix admin credentials or Gemini API key with `NEXT_PUBLIC`.

Notes:

- No public demo content is inserted during setup.
- Only one hero settings row, one platform settings row, and one statistics settings row are seeded.
- Staff roles are `mamuriyat`, `pedagog`, `mutaxassis`, and `xizmat`; `xizmat` stores only activity type and count.
- Statistics staff count is calculated from the `staff` table by the app, not edited manually.
- `fix_rls.sql` is only needed if RLS is enabled manually later.
- `cleanup_sample_content.sql` is optional and only for older/demo databases.
