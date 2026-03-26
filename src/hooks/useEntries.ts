import { useCallback, useEffect, useState } from 'react'
import { demoWellnessEntries } from '@/data/demoEntries'
import { monthKeyFromISODate } from '@/lib/dates'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { StressLabel } from '@/types/wellness'

export type EntryRow = {
  entry_date: string
  sleep_hours: number
  study_hours: number
  mood: number
  stress_label: StressLabel
  stress_numeric: number
  journal: string | null
}

type State = {
  rows: EntryRow[]
  loading: boolean
  error: string | null
  refresh: () => Promise<void>
}

export function useEntries(): State {
  const { user } = useAuth()
  const [rows, setRows] = useState<EntryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const refresh = useCallback(async () => {
    setError(null)

    if (!user) {
      setRows([])
      setLoading(false)
      return
    }

    // If Supabase isn't configured, keep the app usable for demo flows.
    if (!supabase) {
      const demo = demoWellnessEntries.map((e) => ({
        entry_date: e.entryDate,
        sleep_hours: e.sleepHours,
        study_hours: e.studyHours,
        mood: e.mood,
        stress_label: e.stressLabel,
        stress_numeric: e.stressNumeric,
        journal: null,
      }))
      setRows(demo)
      setLoading(false)
      return
    }

    setLoading(true)
    const { data, error: err } = await supabase
      .from('daily_wellness_entries')
      .select(
        'entry_date,sleep_hours,study_hours,mood,stress_label,stress_numeric,journal',
      )
      .order('entry_date', { ascending: false })

    if (err) {
      setError(err.message)
      setRows([])
      setLoading(false)
      return
    }

    setRows((data ?? []) as EntryRow[])
    setLoading(false)
  }, [user])

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- data fetching initializes state from external source
    void refresh()
  }, [refresh])

  return { rows, loading, error, refresh }
}

export function filterByMonth(rows: EntryRow[], monthKey: string): EntryRow[] {
  return rows.filter((r) => monthKeyFromISODate(r.entry_date) === monthKey)
}

