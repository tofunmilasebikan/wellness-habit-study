import { Link, useSearchParams } from 'react-router-dom'
import { MonthPicker } from '@/components/MonthPicker'
import { currentMonthKey } from '@/lib/dates'
import { listMonths, summarizeMonth } from '@/lib/summary'
import { useEntries, filterByMonth } from '@/hooks/useEntries'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-text">{value}</p>
    </div>
  )
}

export function DashboardPage() {
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
              Dashboard
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
              A quick snapshot of your month.
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
        ) : (
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <StatCard label="Entries" value={String(summary.count)} />
            <StatCard label="Avg sleep" value={`${summary.avgSleep}h`} />
            <StatCard label="Avg study" value={`${summary.avgStudy}h`} />
            <StatCard label="Avg mood" value={String(summary.avgMood)} />
            <StatCard label="Most common stress" value={summary.mostCommonStress} />
          </div>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
          <h2 className="mb-2 text-base font-semibold text-text">Quick actions</h2>
          <div className="flex flex-wrap gap-2">
            <Link
              to="/app/check-in"
              className="rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-90"
            >
              Log today’s check-in
            </Link>
            <Link
              to="/app/history"
              className="rounded-full border border-border bg-surface px-5 py-2 text-xs font-semibold text-text shadow-soft hover:opacity-90"
            >
              View history
            </Link>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
          <h2 className="mb-2 text-base font-semibold text-text">Monthly Wrap</h2>
          <p className="mb-4 text-sm text-text-muted">
            A clean summary of your month with highlights.
          </p>
          <Link
            to={`/app/wrap?month=${encodeURIComponent(month)}`}
            className="inline-flex rounded-full bg-primary px-5 py-2 text-xs font-semibold text-primary-foreground shadow-soft hover:opacity-90"
          >
            View wrap
          </Link>
        </div>
      </div>

      <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
        <div className="mb-3 flex items-center justify-between gap-4">
          <h2 className="text-base font-semibold text-text">Recent entries</h2>
          <Link
            to="/app/history"
            className="text-xs font-semibold text-text-muted hover:text-text"
          >
            See all
          </Link>
        </div>

        {loading ? (
          <p className="text-sm text-text-muted">Loading…</p>
        ) : monthRows.length === 0 ? (
          <p className="text-sm text-text-muted">
            No entries for this month yet.
          </p>
        ) : (
          <div className="divide-y divide-border">
            {monthRows.slice(0, 5).map((r) => (
              <div key={r.entry_date} className="flex items-center gap-4 py-3">
                <div className="min-w-[110px] text-sm font-medium text-text">
                  {r.entry_date}
                </div>
                <div className="text-sm text-text-muted">
                  Mood {r.mood} • {r.stress_label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

