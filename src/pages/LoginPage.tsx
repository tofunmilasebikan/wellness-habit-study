import { useState, type FormEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'

export function LoginPage() {
  const { user, loading, signIn, configError } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const state = location.state as {
    from?: { pathname: string }
    flash?: string
  } | null
  const from = state?.from?.pathname ?? '/app'
  const initialFlash = state?.flash ?? null

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [flash, setFlash] = useState<string | null>(initialFlash)
  const [busy, setBusy] = useState(false)

  if (!loading && user) {
    return <Navigate to={from} replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setFlash(null)
    if (configError) {
      setError(configError)
      return
    }
    setBusy(true)
    try {
      const { error: err } = await signIn(email, password)
      if (err) {
        setError(err.message)
        return
      }
      navigate(from, { replace: true })
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-svh bg-surface px-4 py-12">
      <div className="mx-auto w-full max-w-md">
        <p className="mb-2 text-center text-sm font-medium text-primary-muted">
          Wellness Habit Study
        </p>
        <h1 className="mb-6 text-center text-2xl font-semibold tracking-tight text-text">
          Sign in
        </h1>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
        >
          {configError ? (
            <p
              className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              role="alert"
            >
              {configError}
            </p>
          ) : null}
          {flash ? (
            <p className="mb-4 rounded-xl bg-primary/10 px-3 py-2 text-sm text-text">
              {flash}
            </p>
          ) : null}
          {error && !configError ? (
            <p
              className="mb-4 rounded-xl bg-red-50 px-3 py-2 text-sm text-red-800"
              role="alert"
            >
              {error}
            </p>
          ) : null}

          <label className="mb-4 block">
            <span className="mb-1 block text-sm font-medium text-text">
              Email
            </span>
            <input
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
          </label>

          <label className="mb-6 block">
            <span className="mb-1 block text-sm font-medium text-text">
              Password
            </span>
            <input
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={busy || Boolean(configError)}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
          >
            {busy ? 'Signing in…' : 'Sign in'}
          </button>

          <p className="mt-4 text-center text-sm text-text-muted">
            No account?{' '}
            <Link to="/signup" className="font-medium text-primary-muted hover:underline">
              Create one
            </Link>
          </p>
        </form>

        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-text-muted hover:text-text">
            ← Back to home
          </Link>
        </p>

      </div>
    </div>
  )
}
