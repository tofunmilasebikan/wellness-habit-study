# HabitScope (Wellness Habit Study)

HabitScope is a web app for structured daily wellness tracking and reflection.  
It was built as a college seminar project under **Wellness Habit Study**.

Users can log daily entries (sleep, study, mood, stress, journal), view history, explore analytics, and generate a monthly wrap summary.

## Project framing

- Personal wellness tracking and reflection
- Academic self-monitoring application
- Multi-user web app with private user data
- Pattern observation over time from structured check-ins

## Current features

- Email/password sign up and sign in (Supabase Auth)
- Daily check-in form with:
  - sleep hours
  - study hours
  - mood (1-5)
  - stress label (Low / Moderate / High)
  - optional journal
- History table with:
  - saved entries
  - summary cards
  - delete entry action
- Month-based dashboard snapshot
- Monthly wrap view with:
  - averages
  - stress frequency
  - highlights
  - streaks
  - mini-awards
  - top lists
- Analytics page with month-filtered charts:
  - trend chart (mood, sleep, study, stress)
  - mood distribution
  - stress distribution
- FAQ page and landing experience

## Tech stack

- React + TypeScript + Vite
- Tailwind CSS
- Recharts
- Supabase (Auth + Postgres + RLS)

## Data model highlights

Main table: `daily_wellness_entries`

Key fields:

- `user_id` (owner of entry)
- `entry_date`
- `sleep_hours`
- `study_hours`
- `mood` (1-5)
- `stress_label` (`Low` | `Moderate` | `High`)
- `stress_numeric` (1 | 2 | 3)
- `journal`
- timestamps

Stress mapping used by analytics:

- Low = 1
- Moderate = 2
- High = 3

## Local development

### 1) Install dependencies

```bash
npm install
```

### 2) Configure Supabase

Create a local `.env` file with your Supabase project values:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-project-anon-key
```

This app is built with Vite, so only variables prefixed with `VITE_` are exposed to the browser.

## Vercel deployment

Add the same two variables in Vercel under Project Settings -> Environment Variables:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

Make sure both values come from the same Supabase project. If you see `Invalid API key` in production, the deployed build usually has the wrong key or a stale build. After updating either variable in Vercel, trigger a new deployment so the client bundle is rebuilt with the new values.
