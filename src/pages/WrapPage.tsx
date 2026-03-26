import { Link, useSearchParams } from 'react-router-dom'
import { MonthPicker } from '@/components/MonthPicker'
import { currentMonthKey } from '@/lib/dates'
import { listMonths, summarizeMonth } from '@/lib/summary'
import { useEntries, filterByMonth } from '@/hooks/useEntries'

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-text">{value}</p>
    </div>
  )
}

export function WrapPage() {
  const { rows, loading, error } = useEntries()
  const [params, setParams] = useSearchParams()

  const months = listMonths(rows)
  const fallbackMonth = months[0] ?? currentMonthKey()
  const selected = params.get('month') ?? fallbackMonth
  const month = months.includes(selected) ? selected : fallbackMonth

  const monthRows = filterByMonth(rows, month)
  const summary = summarizeMonth(rows, month)

  function setMonth(m: string) {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('month', m)
      return next
    })
  }

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
              Monthly Wrap
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
              A snapshot of your month, based on your check-ins.
            </p>
          </div>

          <div className="w-full md:w-auto">
            <MonthPicker
              value={month}
              options={months.length ? months : [currentMonthKey()]}
              onChange={setMonth}
            />
          </div>
        </div>
      </div>

      {error ? (
        <div
          className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft"
          role="alert"
        >
          <p className="text-sm text-red-800">{error}</p>
        </div>
      ) : null}

      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : monthRows.length === 0 ? (
          <div className="space-y-2">
            <p className="text-sm text-text-muted">No entries for this month.</p>
            <Link
              to="/app/check-in"
              className="inline-flex rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-90"
            >
              Log a check-in
            </Link>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
              <Pill label="Entries" value={String(summary.count)} />
              <Pill label="Avg sleep" value={`${summary.avgSleep}h`} />
              <Pill label="Avg study" value={`${summary.avgStudy}h`} />
              <Pill label="Avg mood" value={String(summary.avgMood)} />
              <Pill label="Most common stress" value={summary.mostCommonStress} />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Highlights
                </p>
                <div className="mt-3 space-y-2 text-sm text-text">
                  <p>
                    <span className="text-text-muted">Best mood day: </span>
                    {summary.bestMoodDay ?? '—'}
                  </p>
                  <p>
                    <span className="text-text-muted">Most stressful day: </span>
                    {summary.mostStressDay ?? '—'}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-border bg-surface p-5">
                <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                  Stress frequency
                </p>
                <div className="mt-3 grid grid-cols-3 gap-3 text-sm">
                  <div className="rounded-xl border border-border bg-surface-elevated p-3">
                    <p className="text-xs text-text-muted">Low</p>
                    <p className="mt-1 font-semibold text-text">
                      {summary.stressCounts.Low}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-elevated p-3">
                    <p className="text-xs text-text-muted">Moderate</p>
                    <p className="mt-1 font-semibold text-text">
                      {summary.stressCounts.Moderate}
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-elevated p-3">
                    <p className="text-xs text-text-muted">High</p>
                    <p className="mt-1 font-semibold text-text">
                      {summary.stressCounts.High}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {summary.insightLine ? (
              <div className="rounded-2xl border border-border bg-primary/10 p-5">
                <p className="text-sm font-semibold text-text">Insight</p>
                <p className="mt-1 text-sm leading-relaxed text-text-muted">
                  {summary.insightLine}
                </p>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  )
}

