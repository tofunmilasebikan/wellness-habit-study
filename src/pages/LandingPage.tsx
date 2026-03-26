import { Link } from 'react-router-dom'
import { Disclaimer } from '@/components/Disclaimer'
import { APP_NAME } from '@/lib/constants'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-surface">
      <header className="border-b border-border bg-surface-elevated/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <span className="text-sm font-semibold uppercase tracking-wide text-primary-muted">
            Academic self-monitoring
          </span>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-sm font-medium text-text shadow-soft transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <p className="mb-3 text-sm font-medium text-primary-muted">
          Personal observational wellness study
        </p>
        <h1 className="mb-6 max-w-2xl text-4xl font-semibold tracking-tight text-text md:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
          A calm web app for structured daily habit and wellness logging. Track
          sleep, study time, mood, and stress over time—then explore patterns in
          your own data through simple charts and summaries. Built for coursework
          and personal reflection, not clinical use.
        </p>

        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h2 className="mb-2 text-base font-semibold text-text">
              Structured check-ins
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              Log hours slept, study or reading time, mood (1–5), stress level
              (Low / Moderate / High), and a short journal prompt—so your entries
              stay consistent for later analysis.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h2 className="mb-2 text-base font-semibold text-text">
              Visual summaries
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              Turn daily rows into trends and distributions you can explain in
              class: mood over time, habit lines, stress breakdowns, and light
              comparisons such as sleep versus mood.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link
            to="/login"
            className="rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Sign in to use the app
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-border bg-surface-elevated px-6 py-3 text-sm font-semibold text-text shadow-soft transition-opacity hover:opacity-90"
          >
            Create account
          </Link>
        </div>

        <div className="mt-16 max-w-2xl">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
