import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { Session, User } from '@supabase/supabase-js'
import {
  getSupabaseConfigError,
  normalizeSupabaseErrorMessage,
  supabase,
} from '@/lib/supabase'

type AuthResult = { error: Error | null }

type AuthContextValue = {
  configError: string | null
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<AuthResult>
  signUp: (email: string, password: string) => Promise<AuthResult>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextValue | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [configError, setConfigError] = useState<string | null>(() =>
    getSupabaseConfigError(),
  )
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(
    () => supabase !== null && getSupabaseConfigError() === null,
  )

  useEffect(() => {
    if (!supabase) return

    let cancelled = false

    supabase.auth.getSession().then(({ data: { session: s }, error }) => {
      if (cancelled) return

      if (error) {
        const normalized = normalizeSupabaseErrorMessage(error.message)
        if (normalized.isConfigError) {
          setConfigError(normalized.message)
        }
        setLoading(false)
        return
      }

      setSession(s)
      setUser(s?.user ?? null)
      setLoading(false)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, s) => {
      setSession(s)
      setUser(s?.user ?? null)
    })

    return () => {
      cancelled = true
      subscription.unsubscribe()
    }
  }, [])

  const signIn = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error(configError ?? 'Supabase is not configured.') }
    }
    if (configError) {
      return { error: new Error(configError) }
    }
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })
    if (!error) {
      return { error: null }
    }

    const normalized = normalizeSupabaseErrorMessage(error.message)
    if (normalized.isConfigError) {
      setConfigError(normalized.message)
    }

    return { error: new Error(normalized.message) }
  }, [configError])

  const signUp = useCallback(async (email: string, password: string) => {
    if (!supabase) {
      return { error: new Error(configError ?? 'Supabase is not configured.') }
    }
    if (configError) {
      return { error: new Error(configError) }
    }
    const { error } = await supabase.auth.signUp({
      email: email.trim(),
      password,
    })
    if (!error) {
      return { error: null }
    }

    const normalized = normalizeSupabaseErrorMessage(error.message)
    if (normalized.isConfigError) {
      setConfigError(normalized.message)
    }

    return { error: new Error(normalized.message) }
  }, [configError])

  const signOut = useCallback(async () => {
    if (!supabase) return
    await supabase.auth.signOut()
  }, [])

  const value = useMemo(
    () => ({
      configError,
      user,
      session,
      loading,
      signIn,
      signUp,
      signOut,
    }),
    [configError, user, session, loading, signIn, signUp, signOut],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

/** Auth context consumer — exported from this file alongside Provider for a single import path. */
// eslint-disable-next-line react-refresh/only-export-components -- hook paired with Provider
export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext)
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return ctx
}
