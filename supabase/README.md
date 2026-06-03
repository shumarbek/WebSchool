# Supabase fresh setup

1. Create a new Supabase project.
2. Open SQL Editor and run `schema.sql`.
3. Copy the project URL and anon key into `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

4. Start the app and login at `/admin/login`.

Default admin:

```text
Email: admin@dosov.uz
Password: admin123
Role: admin
```

Notes:

- No public demo content is inserted during setup.
- Only one hero settings row, one platform settings row, and one statistics settings row are seeded.
- Staff roles are `mamuriyat`, `pedagog`, `mutaxassis`, and `xizmat`; `xizmat` stores only activity type and count.
- Statistics staff count is calculated from the `staff` table by the app, not edited manually.
- `fix_rls.sql` is only needed if RLS is enabled manually later.
- `cleanup_sample_content.sql` is optional and only for older/demo databases.
