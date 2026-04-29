# MonJob.ci

Base project for a mobile-first opportunity platform in Cote d'Ivoire.

## Stack

- Next.js App Router
- Tailwind CSS
- Lucide React
- Supabase Auth, Postgres, Storage

## Getting started

1. Install dependencies:

```bash
npm install
```

2. Create `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

3. Run the app:

```bash
npm run dev
```

4. Apply the database setup inside Supabase:

- Run `supabase/migrations/0001_initial_schema.sql`
- Optionally run `supabase/seed.sql`

## Initial domain coverage

- Candidate and recruiter profiles
- Jobs, internships, premium trainings
- Verified opportunity workflow
- Application tracking
- Private CV bucket in Supabase Storage

