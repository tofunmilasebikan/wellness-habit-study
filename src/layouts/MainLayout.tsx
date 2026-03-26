import { DISCLAIMER_SHORT } from '@/lib/constants'
import { useAuth } from '@/contexts/AuthContext'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'

const linkClass = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-full px-4 py-2 text-sm font-medium transition-colors',
    isActive
      ? 'bg-primary text-primary-foreground'
      : 'text-text-muted hover:bg-border/40 hover:text-text',
  ].join(' ')

export function MainLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  async function handleSignOut() {
    await signOut()
    navigate('/', { replace: true })
  }

  const label = user?.email ?? 'Account'

  return (
    <div className="flex min-h-svh flex-col">
      <header className="border-b border-border bg-surface-elevated/90 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4 md:px-6">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <NavLink
              to="/app"
              className="shrink-0 text-lg font-semibold tracking-tight text-text"
            >
              Wellness Habit Study
            </NavLink>
            <span
              className="hidden max-w-[200px] truncate text-sm text-text-muted sm:inline"
              title={label}
            >
              {label}
            </span>
          </div>
          <nav className="flex flex-wrap items-center gap-1 md:gap-2">
            <NavLink to="/app" className={linkClass} end>
              Dashboard
            </NavLink>
            <NavLink to="/app/check-in" className={linkClass}>
              Check-in
            </NavLink>
            <NavLink to="/app/history" className={linkClass}>
              History
            </NavLink>
            <NavLink to="/app/analytics" className={linkClass}>
              Analytics
            </NavLink>
            <button
              type="button"
              onClick={handleSignOut}
              className="rounded-full px-4 py-2 text-sm font-medium text-text-muted transition-colors hover:bg-border/40 hover:text-text"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>

      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-4 py-8 md:px-6 md:py-10">
        <Outlet />
      </main>

      <footer className="border-t border-border bg-surface-elevated py-6">
        <p className="mx-auto max-w-5xl px-4 text-center text-sm text-text-muted md:px-6">
          {DISCLAIMER_SHORT}{' '}
          <Link to="/" className="text-primary-muted hover:underline">
            Home
          </Link>
        </p>
      </footer>
    </div>
  )
}
