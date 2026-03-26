export type MonthKey = `${number}-${string}`

export function monthKeyFromISODate(isoDate: string): string {
  // isoDate is YYYY-MM-DD
  return isoDate.slice(0, 7)
}

export function currentMonthKey(): string {
  const d = new Date()
  const yyyy = d.getFullYear()
  const mm = String(d.getMonth() + 1).padStart(2, '0')
  return `${yyyy}-${mm}`
}

export function formatMonthLabel(monthKey: string): string {
  // monthKey is YYYY-MM
  const [yyyy, mm] = monthKey.split('-').map((s) => s.trim())
  const monthIndex = Number(mm) - 1
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  const name = months[monthIndex] ?? mm
  return `${name} ${yyyy}`
}

