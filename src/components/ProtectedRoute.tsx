import { Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { isSupabaseConfigured } from '@/lib/supabase'

export function ProtectedRoute() {
  const { user, loading } = useAuth()
  const location = useLocation()
  const supabaseReady = isSupabaseConfigured()

  if (!supabaseReady) {
    return (
      <div className="flex min-h-svh flex-col items-center justify-center gap-4 bg-surface px-4">
        <p className="max-w-md text-center text-text-muted">
          Supabase is not configured. Add{' '}
          <code className="rounded bg-border/60 px-1.5 py-0.5 text-sm text-text">
            VITE_SUPABASE_URL
          </code>{' '}
          and{' '}
          <code className="rounded bg-border/60 px-1.5 py-0.5 text-sm text-text">
            VITE_SUPABASE_ANON_KEY
          </code>{' '}
          to <code className="text-sm">.env</code>, then restart the dev server.
        </p>
        <Link
          to="/"
          className="rounded-full border border-border bg-surface-elevated px-5 py-2 text-sm font-medium text-text shadow-soft"
        >
          Back to home
        </Link>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-surface text-text-muted">
        Loading…
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <Outlet />
}
