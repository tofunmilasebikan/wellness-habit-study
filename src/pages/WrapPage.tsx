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

function TopList({
  title,
  items,
}: {
  title: string
  items: { left: string; right: string }[]
}) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="text-xs font-semibold uppercase tracking-wide text-text-muted">
        {title}
      </p>
      <div className="mt-3 space-y-2">
        {items.length === 0 ? (
          <p className="text-sm text-text-muted">—</p>
        ) : (
          items.map((it) => (
            <div key={`${it.left}-${it.right}`} className="flex items-baseline justify-between gap-4">
              <p className="text-sm font-medium text-text">{it.left}</p>
              <p className="text-sm text-text-muted">{it.right}</p>
            </div>
          ))
        )}
      </div>
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
            <Link
              to="/app"
              className="mb-3 inline-flex text-xs font-semibold text-text-muted hover:text-text"
            >
              ← Back
            </Link>
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

            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              <Pill label="Total study" value={`${summary.totalStudy}h`} />
              <Pill label="Good mood days (4–5)" value={`${summary.moodGoodDays} (${summary.moodGoodPct}%)`} />
              <Pill label="Longest streak" value={`${summary.streakLongest} days`} />
              <Pill label="Current streak" value={`${summary.streakCurrent} days`} />
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
                  <p>
                    <span className="text-text-muted">Focus Day: </span>
                    {summary.miniAwards.focusDay ?? '—'}
                  </p>
                  <p>
                    <span className="text-text-muted">Recharge Day: </span>
                    {summary.miniAwards.rechargeDay ?? '—'}
                  </p>
                  <p>
                    <span className="text-text-muted">Most Balanced Day: </span>
                    {summary.miniAwards.balanceDay ?? '—'}
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
                    <p className="mt-1 text-xs text-text-muted">
                      {summary.stressPct.Low}%
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-elevated p-3">
                    <p className="text-xs text-text-muted">Moderate</p>
                    <p className="mt-1 font-semibold text-text">
                      {summary.stressCounts.Moderate}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {summary.stressPct.Moderate}%
                    </p>
                  </div>
                  <div className="rounded-xl border border-border bg-surface-elevated p-3">
                    <p className="text-xs text-text-muted">High</p>
                    <p className="mt-1 font-semibold text-text">
                      {summary.stressCounts.High}
                    </p>
                    <p className="mt-1 text-xs text-text-muted">
                      {summary.stressPct.High}%
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <TopList
                title="Top mood days"
                items={summary.topMoodDays.map((d) => ({
                  left: d.date,
                  right: `Mood ${d.mood}`,
                }))}
              />
              <TopList
                title="Top study days"
                items={summary.topStudyDays.map((d) => ({
                  left: d.date,
                  right: `${d.study.toFixed(1)}h`,
                }))}
              />
              <TopList
                title="Top stressful days"
                items={summary.topStressDays.map((d) => ({
                  left: d.date,
                  right: `Stress ${d.stress}`,
                }))}
              />
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

