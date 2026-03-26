export type StressLabel = 'Low' | 'Moderate' | 'High'

/** 1 = Low, 2 = Moderate, 3 = High — for charts and aggregates */
export type StressNumeric = 1 | 2 | 3

export type MoodScore = 1 | 2 | 3 | 4 | 5

export interface DailyWellnessEntry {
  id: string
  userId: string
  /** ISO date YYYY-MM-DD (local calendar day) */
  entryDate: string
  sleepHours: number
  studyHours: number
  mood: MoodScore
  stressLabel: StressLabel
  stressNumeric: StressNumeric
  journal?: string
  createdAt: string
  updatedAt: string
}
