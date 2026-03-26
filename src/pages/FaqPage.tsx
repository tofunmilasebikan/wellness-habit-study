export function FaqPage() {
  return (
    <div className="min-h-svh bg-surface px-4 py-12">
      <div className="mx-auto w-full max-w-3xl">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
          FAQ
        </h1>
        <p className="mb-8 text-sm leading-relaxed text-text-muted">
          Quick answers about HabitScope.
        </p>

        <div className="space-y-3">
          <details className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
            <summary className="cursor-pointer select-none text-sm font-semibold text-text">
              What is HabitScope?
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              HabitScope is a simple daily check-in app for tracking sleep,
              study, mood, and stress. It turns your entries into charts and
              summaries so you can reflect on patterns over time.
            </p>
          </details>

          <details className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
            <summary className="cursor-pointer select-none text-sm font-semibold text-text">
              Is this free?
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">Yes.</p>
          </details>

          <details className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
            <summary className="cursor-pointer select-none text-sm font-semibold text-text">
              I am having trouble logging in?
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              First, make sure you are using the same email you signed up with.
              If your Supabase project has email confirmation enabled, check your
              inbox (and spam) for a confirmation link before signing in. If you
              still cannot access your account, try resetting your password in
              Supabase or create a new account with a different email for testing.
            </p>
          </details>

          <details className="rounded-2xl border border-border bg-surface-elevated p-5 shadow-soft">
            <summary className="cursor-pointer select-none text-sm font-semibold text-text">
              Is it safe to log in my hours?
            </summary>
            <p className="mt-3 text-sm leading-relaxed text-text-muted">
              It is highly recommended to log your habits consistently. It helps
              you build a clearer picture of your routine over time and makes
              the charts and monthly summaries more meaningful.
            </p>
          </details>
        </div>

        <div className="mt-8 flex justify-center">
          <a
            href="/"
            className="text-xs font-medium text-text-muted hover:text-text"
          >
            ← Back
          </a>
        </div>
      </div>
    </div>
  )
}

