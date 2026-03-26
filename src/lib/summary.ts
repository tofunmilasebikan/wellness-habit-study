import { monthKeyFromISODate } from '@/lib/dates'
import type { EntryRow } from '@/hooks/useEntries'

export type StressCounts = { Low: number; Moderate: number; High: number }

export type MonthSummary = {
  monthKey: string
  count: number
  avgSleep: number
  avgStudy: number
  avgMood: number
  stressCounts: StressCounts
  mostCommonStress: keyof StressCounts
  bestMoodDay: string | null
  mostStressDay: string | null
  insightLine: string | null
}

function round1(n: number): number {
  return Number(n.toFixed(1))
}

export function listMonths(rows: EntryRow[]): string[] {
  const set = new Set<string>()
  for (const r of rows) set.add(monthKeyFromISODate(r.entry_date))
  const months = Array.from(set)
  months.sort((a, b) => (a < b ? 1 : a > b ? -1 : 0))
  return months
}

export function summarizeMonth(rows: EntryRow[], monthKey: string): MonthSummary {
  const monthRows = rows.filter((r) => monthKeyFromISODate(r.entry_date) === monthKey)

  const stressCounts: StressCounts = { Low: 0, Moderate: 0, High: 0 }
  for (const r of monthRows) {
    const key = r.stress_label as keyof StressCounts
    if (key in stressCounts) stressCounts[key]++
  }

  const count = monthRows.length
  const avgSleep =
    count === 0
      ? 0
      : monthRows.reduce((acc, r) => acc + Number(r.sleep_hours), 0) / count
  const avgStudy =
    count === 0
      ? 0
      : monthRows.reduce((acc, r) => acc + Number(r.study_hours), 0) / count
  const avgMood =
    count === 0 ? 0 : monthRows.reduce((acc, r) => acc + Number(r.mood), 0) / count

  const mostCommonStress = (Object.entries(stressCounts).sort((a, b) => {
    if (b[1] !== a[1]) return b[1] - a[1]
    // Tie-break preference: Moderate then Low then High (neutral default)
    const order = { Moderate: 0, Low: 1, High: 2 } as const
    return order[a[0] as keyof typeof order] - order[b[0] as keyof typeof order]
  })[0]?.[0] ?? 'Moderate') as keyof StressCounts

  let bestMoodDay: string | null = null
  let bestMood = -Infinity
  for (const r of monthRows) {
    const m = Number(r.mood)
    if (m > bestMood) {
      bestMood = m
      bestMoodDay = r.entry_date
    }
  }

  let mostStressDay: string | null = null
  let mostStress = -Infinity
  for (const r of monthRows) {
    const s = Number(r.stress_numeric)
    if (s > mostStress) {
      mostStress = s
      mostStressDay = r.entry_date
    }
  }

  const insightLine = computeSimpleInsight(monthRows)

  return {
    monthKey,
    count,
    avgSleep: round1(avgSleep),
    avgStudy: round1(avgStudy),
    avgMood: round1(avgMood),
    stressCounts,
    mostCommonStress,
    bestMoodDay,
    mostStressDay,
    insightLine,
  }
}

function median(nums: number[]): number | null {
  if (nums.length === 0) return null
  const s = [...nums].sort((a, b) => a - b)
  const mid = Math.floor(s.length / 2)
  return s.length % 2 === 0 ? (s[mid - 1] + s[mid]) / 2 : s[mid]
}

function computeSimpleInsight(rows: EntryRow[]): string | null {
  if (rows.length < 6) return null

  const sleeps = rows.map((r) => Number(r.sleep_hours)).filter((n) => Number.isFinite(n))
  const med = median(sleeps)
  if (med === null) return null

  const higher = rows.filter((r) => Number(r.sleep_hours) > med)
  const lowerEq = rows.filter((r) => Number(r.sleep_hours) <= med)
  if (higher.length < 2 || lowerEq.length < 2) return null

  const avgMoodHigher =
    higher.reduce((acc, r) => acc + Number(r.mood), 0) / higher.length
  const avgMoodLower =
    lowerEq.reduce((acc, r) => acc + Number(r.mood), 0) / lowerEq.length

  const diff = avgMoodHigher - avgMoodLower
  if (Math.abs(diff) < 0.4) return 'Your mood stayed fairly steady across different sleep amounts.'

  if (diff > 0) {
    return 'On higher-sleep days, your mood tended to be higher.'
  }
  return 'On higher-sleep days, your mood tended to be lower.'
}

