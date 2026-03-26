import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Disclaimer } from '@/components/Disclaimer'
import { useAuth } from '@/contexts/AuthContext'

export function SignupPage() {
  const { user, loading, signUp } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [busy, setBusy] = useState(false)

  if (!loading && user) {
    return <Navigate to="/app" replace />
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)

    if (password !== confirm) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Use at least 6 characters for your password.')
      return
    }

    setBusy(true)
    try {
      const { error: err } = await signUp(email, password)
      if (err) {
        setError(err.message)
        return
      }
      navigate('/login', {
        replace: true,
        state: {
          flash:
            'Account created. If email confirmation is on in Supabase, check your inbox before signing in.',
        },
      })
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
          Create account
        </h1>

        <form
          onSubmit={onSubmit}
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
        >
          {error ? (
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

          <label className="mb-4 block">
            <span className="mb-1 block text-sm font-medium text-text">
              Password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
          </label>

          <label className="mb-6 block">
            <span className="mb-1 block text-sm font-medium text-text">
              Confirm password
            </span>
            <input
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
          </label>

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
          >
            {busy ? 'Creating account…' : 'Sign up'}
          </button>

          <p className="mt-4 text-center text-sm text-text-muted">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-primary-muted hover:underline">
              Sign in
            </Link>
          </p>
        </form>

        <p className="mt-6 text-center">
          <Link to="/" className="text-sm text-text-muted hover:text-text">
            ← Back to home
          </Link>
        </p>

        <div className="mt-10">
          <Disclaimer />
        </div>
      </div>
    </div>
  )
}
