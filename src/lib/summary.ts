import { monthKeyFromISODate } from '@/lib/dates'
import type { EntryRow } from '@/hooks/useEntries'

export type StressCounts = { Low: number; Moderate: number; High: number }

export type MonthSummary = {
  monthKey: string
  count: number
  avgSleep: number
  avgStudy: number
  avgMood: number
  totalSleep: number
  totalStudy: number
  stressCounts: StressCounts
  mostCommonStress: keyof StressCounts
  bestMoodDay: string | null
  mostStressDay: string | null
  moodGoodDays: number
  moodGoodPct: number
  stressPct: StressCounts
  streakLongest: number
  streakCurrent: number
  topMoodDays: { date: string; mood: number }[]
  topStudyDays: { date: string; study: number }[]
  topStressDays: { date: string; stress: number }[]
  miniAwards: {
    focusDay: string | null
    rechargeDay: string | null
    balanceDay: string | null
  }
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
  const totalSleep = monthRows.reduce((acc, r) => acc + Number(r.sleep_hours), 0)
  const totalStudy = monthRows.reduce((acc, r) => acc + Number(r.study_hours), 0)
  const avgSleep =
    count === 0
      ? 0
      : totalSleep / count
  const avgStudy =
    count === 0
      ? 0
      : totalStudy / count
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

  const moodGoodDays = monthRows.filter((r) => Number(r.mood) >= 4).length
  const moodGoodPct = count === 0 ? 0 : Math.round((moodGoodDays / count) * 100)

  const stressPct: StressCounts = {
    Low: count === 0 ? 0 : Math.round((stressCounts.Low / count) * 100),
    Moderate: count === 0 ? 0 : Math.round((stressCounts.Moderate / count) * 100),
    High: count === 0 ? 0 : Math.round((stressCounts.High / count) * 100),
  }

  const { longest, current } = computeStreaks(monthRows)

  const topMoodDays = [...monthRows]
    .sort((a, b) => Number(b.mood) - Number(a.mood) || (a.entry_date < b.entry_date ? -1 : 1))
    .slice(0, 3)
    .map((r) => ({ date: r.entry_date, mood: Number(r.mood) }))

  const topStudyDays = [...monthRows]
    .sort(
      (a, b) =>
        Number(b.study_hours) - Number(a.study_hours) ||
        (a.entry_date < b.entry_date ? -1 : 1),
    )
    .slice(0, 3)
    .map((r) => ({ date: r.entry_date, study: Number(r.study_hours) }))

  const topStressDays = [...monthRows]
    .sort(
      (a, b) =>
        Number(b.stress_numeric) - Number(a.stress_numeric) ||
        (a.entry_date < b.entry_date ? -1 : 1),
    )
    .slice(0, 3)
    .map((r) => ({ date: r.entry_date, stress: Number(r.stress_numeric) }))

  const miniAwards = computeMiniAwards(monthRows, { avgSleep, avgStudy, avgMood })

  const insightLine = computeSimpleInsight(monthRows)

  return {
    monthKey,
    count,
    avgSleep: round1(avgSleep),
    avgStudy: round1(avgStudy),
    avgMood: round1(avgMood),
    totalSleep: round1(totalSleep),
    totalStudy: round1(totalStudy),
    stressCounts,
    mostCommonStress,
    bestMoodDay,
    mostStressDay,
    moodGoodDays,
    moodGoodPct,
    stressPct,
    streakLongest: longest,
    streakCurrent: current,
    topMoodDays,
    topStudyDays,
    topStressDays,
    miniAwards,
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

function toDayNumber(iso: string): number {
  // iso is YYYY-MM-DD; parse as UTC midnight to avoid TZ drift.
  const [y, m, d] = iso.split('-').map(Number)
  return Date.UTC(y, m - 1, d) / 86400000
}

function computeStreaks(rows: EntryRow[]): { longest: number; current: number } {
  if (rows.length === 0) return { longest: 0, current: 0 }
  const days = Array.from(new Set(rows.map((r) => r.entry_date)))
    .sort()
    .map(toDayNumber)

  let longest = 1
  let run = 1
  for (let i = 1; i < days.length; i++) {
    if (days[i] === days[i - 1] + 1) {
      run++
      longest = Math.max(longest, run)
    } else {
      run = 1
    }
  }

  // Current streak (ending on latest logged day)
  let current = 1
  for (let i = days.length - 1; i >= 1; i--) {
    if (days[i] === days[i - 1] + 1) current++
    else break
  }

  return { longest, current }
}

function computeMiniAwards(
  rows: EntryRow[],
  avgs: { avgSleep: number; avgStudy: number; avgMood: number },
): { focusDay: string | null; rechargeDay: string | null; balanceDay: string | null } {
  if (rows.length === 0) return { focusDay: null, rechargeDay: null, balanceDay: null }

  let focusDay: string | null = null
  let bestStudy = -Infinity
  let rechargeDay: string | null = null
  let bestSleep = -Infinity
  let balanceDay: string | null = null
  let bestBalance = Infinity

  for (const r of rows) {
    const study = Number(r.study_hours)
    const sleep = Number(r.sleep_hours)
    if (study > bestStudy) {
      bestStudy = study
      focusDay = r.entry_date
    }
    if (sleep > bestSleep) {
      bestSleep = sleep
      rechargeDay = r.entry_date
    }

    const mood = Number(r.mood)
    const score =
      Math.abs(sleep - avgs.avgSleep) +
      Math.abs(study - avgs.avgStudy) +
      Math.abs(mood - avgs.avgMood)
    if (score < bestBalance) {
      bestBalance = score
      balanceDay = r.entry_date
    }
  }

  return { focusDay, rechargeDay, balanceDay }
}

