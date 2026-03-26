import { MonthPicker } from '@/components/MonthPicker'
import { useEntries, filterByMonth } from '@/hooks/useEntries'
import { currentMonthKey } from '@/lib/dates'
import { listMonths, summarizeMonth } from '@/lib/summary'
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  BarChart,
  Bar,
} from 'recharts'
import { useSearchParams } from 'react-router-dom'

function StatCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-4">
      <p className="text-xs text-text-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold text-text">{value}</p>
    </div>
  )
}

export function AnalyticsPage() {
  const { rows, loading, error } = useEntries()
  const [params, setParams] = useSearchParams()

  const months = listMonths(rows)
  const fallbackMonth = months[0] ?? currentMonthKey()
  const selected = params.get('month') ?? fallbackMonth
  const month = months.includes(selected) ? selected : fallbackMonth

  function setMonth(m: string) {
    setParams((prev) => {
      const next = new URLSearchParams(prev)
      next.set('month', m)
      return next
    })
  }

  const monthRows = filterByMonth(rows, month)
  const summary = summarizeMonth(rows, month)

  const trend = monthRows
    .slice()
    .sort((a, b) => (a.entry_date < b.entry_date ? -1 : 1))
    .map((r) => ({
      date: r.entry_date.slice(5), // MM-DD
      mood: Number(r.mood),
      sleep: Number(r.sleep_hours),
      study: Number(r.study_hours),
      stress: Number(r.stress_numeric),
    }))

  const moodDist = [1, 2, 3, 4, 5].map((m) => ({
    mood: String(m),
    days: monthRows.filter((r) => Number(r.mood) === m).length,
  }))

  const stressDist = [
    { stress: 'Low', days: summary.stressCounts.Low },
    { stress: 'Moderate', days: summary.stressCounts.Moderate },
    { stress: 'High', days: summary.stressCounts.High },
  ]

  return (
    <div className="grid gap-6">
      <div className="rounded-2xl border border-border bg-surface-elevated p-8 shadow-soft">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div>
            <h1 className="mb-2 text-2xl font-semibold tracking-tight text-text">
              Analytics
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-text-muted">
              Trends and distributions for the selected month.
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

      {loading ? null : monthRows.length === 0 ? (
        <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
          <p className="text-sm text-text-muted">No entries for this month yet.</p>
        </div>
      ) : (
        <div className="grid gap-6">
          <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
            <h2 className="mb-3 text-base font-semibold text-text">
              Daily trends
            </h2>
            <div className="h-[320px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="mood" stroke="#84b59f" strokeWidth={2} />
                  <Line type="monotone" dataKey="sleep" stroke="#5c6b64" strokeWidth={2} />
                  <Line type="monotone" dataKey="study" stroke="#2d3a34" strokeWidth={2} />
                  <Line type="monotone" dataKey="stress" stroke="#6a9a82" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <p className="mt-2 text-xs text-text-muted">
              Mood is 1–5. Stress is 1 (Low) to 3 (High).
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
              <h2 className="mb-3 text-base font-semibold text-text">
                Mood distribution
              </h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={moodDist}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="mood" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="days" fill="#84b59f" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
              <h2 className="mb-3 text-base font-semibold text-text">
                Stress distribution
              </h2>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={stressDist}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="stress" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Bar dataKey="days" fill="#6a9a82" radius={[10, 10, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

