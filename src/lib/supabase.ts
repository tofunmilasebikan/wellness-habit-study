import { createClient, type SupabaseClient } from '@supabase/supabase-js'

function normalizeEnvValue(value: string | undefined): string | undefined {
  const trimmed = value?.trim()
  if (!trimmed) return undefined

  const wrappedInDoubleQuotes =
    trimmed.startsWith('"') && trimmed.endsWith('"')
  const wrappedInSingleQuotes =
    trimmed.startsWith("'") && trimmed.endsWith("'")

  if (wrappedInDoubleQuotes || wrappedInSingleQuotes) {
    const unwrapped = trimmed.slice(1, -1).trim()
    return unwrapped ? unwrapped : undefined
  }

  return trimmed
}

function isValidHttpUrl(value: string): boolean {
  try {
    const parsed = new URL(value)
    return parsed.protocol === 'http:' || parsed.protocol === 'https:'
  } catch {
    return false
  }
}

const url = normalizeEnvValue(import.meta.env.VITE_SUPABASE_URL as string | undefined)
const anonKey = normalizeEnvValue(
  import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined,
)

const supabaseConfigError =
  !url || !anonKey
    ? 'Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in your local .env or deployment environment, then restart or redeploy.'
    : !isValidHttpUrl(url)
      ? 'VITE_SUPABASE_URL is not a valid URL. Update the environment value, then restart or redeploy.'
      : null

/**
 * Supabase client when env is configured; otherwise null (UI can still use demo/local flows).
 */
export const supabase: SupabaseClient | null =
  supabaseConfigError === null ? createClient(url!, anonKey!) : null

export function isSupabaseConfigured(): boolean {
  return supabaseConfigError === null && supabase !== null
}

export function getSupabaseConfigError(): string | null {
  return supabaseConfigError
}

export function normalizeSupabaseErrorMessage(message: string): {
  message: string
  isConfigError: boolean
} {
  if (/invalid api key/i.test(message)) {
    return {
      message:
        'Supabase rejected the configured public API key. Make sure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY both come from the same Supabase project, then redeploy.',
      isConfigError: true,
    }
  }

  return { message, isConfigError: false }
}
