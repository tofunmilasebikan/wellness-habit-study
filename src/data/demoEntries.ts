import { stressToNumeric } from '@/lib/stress'
import type { DailyWellnessEntry, StressLabel } from '@/types/wellness'

/** Stable id for seeded / offline demo rows */
export const DEMO_USER_ID = '00000000-0000-4000-8000-000000000001'

type Row = [string, number, number, 1 | 2 | 3 | 4 | 5, StressLabel]

/** Feb 16–Mar 17 sample (personal observational study); year 2026 for classroom demos */
const RAW: Row[] = [
  ['2026-02-16', 6.9, 2.5, 5, 'High'],
  ['2026-02-17', 6.7, 2.7, 3, 'Moderate'],
  ['2026-02-18', 8.1, 5.1, 3, 'Moderate'],
  ['2026-02-19', 7.6, 3.1, 4, 'High'],
  ['2026-02-20', 8.1, 2.9, 4, 'Low'],
  ['2026-02-21', 7.4, 2.3, 3, 'High'],
  ['2026-02-22', 6.2, 4.2, 3, 'Moderate'],
  ['2026-02-23', 6.9, 5.4, 4, 'Low'],
  ['2026-02-24', 8.0, 5.0, 4, 'Low'],
  ['2026-02-25', 6.0, 3.0, 3, 'Low'],
  ['2026-02-26', 8.3, 3.8, 4, 'Low'],
  ['2026-02-27', 6.5, 3.4, 3, 'Low'],
  ['2026-02-28', 6.4, 2.1, 4, 'Low'],
  ['2026-03-01', 8.0, 4.8, 5, 'Low'],
  ['2026-03-02', 6.3, 5.5, 3, 'High'],
  ['2026-03-03', 8.0, 4.5, 4, 'Low'],
  ['2026-03-04', 7.6, 2.4, 4, 'High'],
  ['2026-03-05', 7.3, 3.7, 4, 'Low'],
  ['2026-03-06', 7.2, 3.1, 4, 'High'],
  ['2026-03-07', 8.2, 2.6, 3, 'Low'],
  ['2026-03-08', 7.6, 2.2, 4, 'Moderate'],
  ['2026-03-09', 6.5, 3.3, 5, 'Moderate'],
  ['2026-03-10', 7.4, 4.6, 4, 'Low'],
  ['2026-03-11', 7.0, 3.1, 4, 'Moderate'],
  ['2026-03-12', 8.2, 5.0, 5, 'Low'],
  ['2026-03-13', 8.3, 3.0, 3, 'Low'],
  ['2026-03-14', 6.3, 3.2, 4, 'Moderate'],
  ['2026-03-15', 6.2, 5.1, 3, 'Moderate'],
  ['2026-03-16', 6.7, 2.5, 5, 'Low'],
  ['2026-03-17', 6.4, 3.7, 4, 'Moderate'],
]

export const demoWellnessEntries: DailyWellnessEntry[] = RAW.map(
  ([entryDate, sleepHours, studyHours, mood, stressLabel]) => ({
    id: `demo-${entryDate}`,
    userId: DEMO_USER_ID,
    entryDate,
    sleepHours,
    studyHours,
    mood,
    stressLabel,
    stressNumeric: stressToNumeric(stressLabel),
    journal: undefined,
    createdAt: `${entryDate}T12:00:00.000Z`,
    updatedAt: `${entryDate}T12:00:00.000Z`,
  }),
)
