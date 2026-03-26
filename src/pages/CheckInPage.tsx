import { useMemo, useState, type FormEvent } from 'react'
import { STRESS_LABELS, stressToNumeric } from '@/lib/stress'
import { supabase } from '@/lib/supabase'
import { useAuth } from '@/contexts/AuthContext'
import type { MoodScore, StressLabel } from '@/types/wellness'

function todayISODate(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  const dd = String(d.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

export function CheckInPage() {
  const { user } = useAuth()

  const [entryDate, setEntryDate] = useState(todayISODate)
  const [sleepHours, setSleepHours] = useState<string>('7.0')
  const [studyHours, setStudyHours] = useState<string>('2.0')
  const [mood, setMood] = useState<MoodScore>(3)
  const [stressLabel, setStressLabel] = useState<StressLabel>('Moderate')
  const [journal, setJournal] = useState<string>('')

  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const parsed = useMemo(() => {
    const sleep = Number(sleepHours)
    const study = Number(studyHours)
    return {
      sleep,
      study,
      sleepOk: Number.isFinite(sleep) && sleep >= 0 && sleep <= 24,
      studyOk: Number.isFinite(study) && study >= 0 && study <= 24,
    }
  }, [sleepHours, studyHours])

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setSuccess(null)

    if (!user) {
      setError('You must be signed in to save an entry.')
      return
    }
    if (!parsed.sleepOk) {
      setError('Sleep hours must be a number between 0 and 24.')
      return
    }
    if (!parsed.studyOk) {
      setError('Study hours must be a number between 0 and 24.')
      return
    }
    if (!supabase) {
      setError('App is not configured to save entries.')
      return
    }

    setBusy(true)
    try {
      const now = new Date().toISOString()
      const payload = {
        user_id: user.id,
        entry_date: entryDate,
        sleep_hours: Number(parsed.sleep.toFixed(1)),
        study_hours: Number(parsed.study.toFixed(1)),
        mood,
        stress_label: stressLabel,
        stress_numeric: stressToNumeric(stressLabel),
        journal: journal.trim() ? journal.trim() : null,
        updated_at: now,
      }

      const { error: upsertError } = await supabase
        .from('daily_wellness_entries')
        .upsert(payload, { onConflict: 'user_id,entry_date' })

      if (upsertError) {
        setError(upsertError.message)
        return
      }

      setSuccess('Saved.')
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft">
        <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
          Daily check-in
        </h1>
        <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
          Log today’s entry. If you submit again for the same date, it will
          update that day.
        </p>
      </div>

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
        {success ? (
          <p className="mb-4 rounded-xl bg-primary/10 px-3 py-2 text-sm text-text">
            {success} You can view it in History.
          </p>
        ) : null}

        <div className="grid gap-4 md:grid-cols-2">
          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text">
              Date
            </span>
            <input
              type="date"
              required
              value={entryDate}
              onChange={(e) => setEntryDate(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
          </label>

          <div className="hidden md:block" />

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text">
              Sleep (hours)
            </span>
            <input
              inputMode="decimal"
              type="number"
              min={0}
              max={24}
              step={0.1}
              required
              value={sleepHours}
              onChange={(e) => setSleepHours(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
            <p className="mt-1 text-xs text-text-muted">Example: 7.5</p>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text">
              Study (hours)
            </span>
            <input
              inputMode="decimal"
              type="number"
              min={0}
              max={24}
              step={0.1}
              required
              value={studyHours}
              onChange={(e) => setStudyHours(e.target.value)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            />
            <p className="mt-1 text-xs text-text-muted">Example: 2.0</p>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text">
              Mood (1–5)
            </span>
            <select
              value={mood}
              onChange={(e) => setMood(Number(e.target.value) as MoodScore)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </label>

          <label className="block">
            <span className="mb-1 block text-sm font-medium text-text">
              Stress
            </span>
            <select
              value={stressLabel}
              onChange={(e) => setStressLabel(e.target.value as StressLabel)}
              className="w-full rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
            >
              {STRESS_LABELS.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </label>
        </div>

        <label className="mt-4 block">
          <span className="mb-1 block text-sm font-medium text-text">
            Journal (optional)
          </span>
          <textarea
            value={journal}
            onChange={(e) => setJournal(e.target.value)}
            rows={4}
            placeholder="How was your day?"
            className="w-full resize-y rounded-xl border border-border bg-surface px-3 py-2 text-text outline-none ring-primary focus:ring-2"
          />
        </label>

        <div className="mt-6 flex items-center justify-between gap-4">
          <p className="text-xs text-text-muted">
            Stress is stored as a label for display and a numeric value for
            charts.
          </p>
          <button
            type="submit"
            disabled={busy}
            className="rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft disabled:opacity-60"
          >
            {busy ? 'Saving…' : 'Save entry'}
          </button>
        </div>
      </form>
    </div>
  )
}

