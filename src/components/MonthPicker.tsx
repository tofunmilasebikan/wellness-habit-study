import { formatMonthLabel } from '@/lib/dates'

export function MonthPicker({
  value,
  options,
  onChange,
}: {
  value: string
  options: string[]
  onChange: (monthKey: string) => void
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl border border-border bg-surface-elevated px-4 py-3 shadow-soft">
      <span className="text-sm font-semibold text-text">Month</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-[210px] rounded-xl border border-border bg-surface px-3 py-2 text-sm text-text outline-none ring-primary focus:ring-2"
      >
        {options.map((m) => (
          <option key={m} value={m}>
            {formatMonthLabel(m)}
          </option>
        ))}
      </select>
    </label>
  )
}

