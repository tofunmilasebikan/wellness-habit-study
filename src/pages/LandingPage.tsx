import { Link } from 'react-router-dom'
import { APP_NAME } from '@/lib/constants'

export function LandingPage() {
  return (
    <div className="min-h-svh bg-surface">
      <header className="border-b border-border bg-surface-elevated/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <Link
            to="/faq"
            className="text-xs font-semibold uppercase tracking-wide text-text-muted hover:text-text"
          >
            FAQ
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-text shadow-soft transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <h1 className="mb-6 max-w-2xl text-4xl font-semibold tracking-tight text-text md:text-5xl">
          {APP_NAME}
        </h1>
        <p className="mb-10 max-w-2xl text-lg leading-relaxed text-text-muted">
          A simple daily check-in for sleep, study, mood, and stress that helps
          you notice patterns over time through clear charts and monthly
          highlights.
        </p>

        <div className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h2 className="mb-2 text-base font-semibold text-text">
              Structured check-ins
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              A quick daily check-in that takes under a minute. Keep your
              tracking consistent without overthinking it.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h2 className="mb-2 text-base font-semibold text-text">
              Visual summaries
            </h2>
            <p className="text-sm leading-relaxed text-text-muted">
              See your habits as trends and breakdowns so patterns are easier to
              spot over time.
            </p>
          </div>
        </div>

        <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            to="/login"
            className="rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
          >
            Sign in to use the app
          </Link>
          <Link
            to="/signup"
            className="rounded-full border border-border bg-surface-elevated px-6 py-3 text-xs font-semibold text-text shadow-soft transition-opacity hover:opacity-90"
          >
            Create account
          </Link>
        </div>
      </div>
    </div>
  )
}
