import { useEffect, useMemo, useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import type { StressLabel } from '@/types/wellness'

type HistoryRow = {
  entry_date: string
  sleep_hours: number
  study_hours: number
  mood: number
  stress_label: StressLabel
  journal: string | null
}

function formatDate(iso: string): string {
  // iso is YYYY-MM-DD
  return iso
}

export function HistoryPage() {
  const { user } = useAuth()
  const [rows, setRows] = useState<HistoryRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [deletingDate, setDeletingDate] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      if (!user) {
        setRows([])
        setLoading(false)
        return
      }
      if (!supabase) {
        setError('App is not configured to load your saved entries.')
        setLoading(false)
        return
      }

      const { data, error: err } = await supabase
        .from('daily_wellness_entries')
        .select(
          'entry_date,sleep_hours,study_hours,mood,stress_label,journal',
        )
        .order('entry_date', { ascending: false })

      if (cancelled) return

      if (err) {
        setError(err.message)
        setRows([])
        setLoading(false)
        return
      }

      setRows((data ?? []) as HistoryRow[])
      setLoading(false)
    }

    void load()
    return () => {
      cancelled = true
    }
  }, [user])

  const summary = useMemo(() => {
    if (!rows.length) return null
    const avgSleep =
      rows.reduce((acc, r) => acc + Number(r.sleep_hours), 0) / rows.length
    const avgStudy =
      rows.reduce((acc, r) => acc + Number(r.study_hours), 0) / rows.length
    const avgMood = rows.reduce((acc, r) => acc + Number(r.mood), 0) / rows.length
    return {
      count: rows.length,
      avgSleep: Number(avgSleep.toFixed(1)),
      avgStudy: Number(avgStudy.toFixed(1)),
      avgMood: Number(avgMood.toFixed(1)),
    }
  }, [rows])

  async function deleteEntry(entryDate: string) {
    if (!user) return
    if (!supabase) {
      setError('App is not configured to delete entries.')
      return
    }

    const ok = window.confirm(`Delete entry for ${entryDate}?`)
    if (!ok) return

    setDeletingDate(entryDate)
    setError(null)
    try {
      const { error: err } = await supabase
        .from('daily_wellness_entries')
        .delete()
        .eq('user_id', user.id)
        .eq('entry_date', entryDate)

      if (err) {
        setError(err.message)
        return
      }

      setRows((prev) => prev.filter((r) => r.entry_date !== entryDate))
    } finally {
      setDeletingDate(null)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
          History
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          Your past check-ins, newest first.
        </p>
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
          role="alert"
        >
          <p className="text-sm text-red-800">{error}</p>
          <p className="mt-2 text-xs text-text-muted">
            If you just saved an entry and don’t see it, this message helps us
            diagnose whether saving or loading is blocked by permissions.
          </p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : rows.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-text-muted">No entries yet.</p>
            <p className="text-xs text-text-muted">
              Add your first check-in, then come back here.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {summary ? (
              <div className="grid gap-3 sm:grid-cols-4">
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-text-muted">Entries</p>
                  <p className="mt-1 text-lg font-semibold text-text">
                    {summary.count}
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-text-muted">Avg sleep</p>
                  <p className="mt-1 text-lg font-semibold text-text">
                    {summary.avgSleep}h
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-text-muted">Avg study</p>
                  <p className="mt-1 text-lg font-semibold text-text">
                    {summary.avgStudy}h
                  </p>
                </div>
                <div className="rounded-2xl border border-border bg-surface p-4">
                  <p className="text-xs text-text-muted">Avg mood</p>
                  <p className="mt-1 text-lg font-semibold text-text">
                    {summary.avgMood}
                  </p>
                </div>
              </div>
            ) : null}

            <div className="overflow-x-auto">
              <table className="w-full min-w-[720px] border-separate border-spacing-0">
                <thead>
                  <tr className="text-left text-xs font-semibold uppercase tracking-wide text-text-muted">
                    <th className="border-b border-border px-3 py-2">Date</th>
                    <th className="border-b border-border px-3 py-2">
                      Sleep (h)
                    </th>
                    <th className="border-b border-border px-3 py-2">
                      Study (h)
                    </th>
                    <th className="border-b border-border px-3 py-2">Mood</th>
                    <th className="border-b border-border px-3 py-2">Stress</th>
                    <th className="border-b border-border px-3 py-2">Journal</th>
                    <th className="border-b border-border px-3 py-2 text-right">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.entry_date} className="text-sm text-text">
                      <td className="border-b border-border px-3 py-2 text-text-muted">
                        {formatDate(r.entry_date)}
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        {Number(r.sleep_hours).toFixed(1)}
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        {Number(r.study_hours).toFixed(1)}
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        {r.mood}
                      </td>
                      <td className="border-b border-border px-3 py-2">
                        {r.stress_label}
                      </td>
                      <td className="border-b border-border px-3 py-2 text-text-muted">
                        {r.journal ? r.journal : '—'}
                      </td>
                      <td className="border-b border-border px-3 py-2 text-right">
                        <button
                          type="button"
                          onClick={() => deleteEntry(r.entry_date)}
                          disabled={deletingDate === r.entry_date}
                          className="rounded-full px-3 py-1 text-xs font-semibold text-text-muted hover:bg-border/40 hover:text-text disabled:opacity-60"
                        >
                          {deletingDate === r.entry_date ? 'Deleting…' : 'Delete'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

