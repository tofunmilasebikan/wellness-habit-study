import type { StressLabel, StressNumeric } from '@/types/wellness'

const MAP: Record<StressLabel, StressNumeric> = {
  Low: 1,
  Moderate: 2,
  High: 3,
}

export function stressToNumeric(label: StressLabel): StressNumeric {
  return MAP[label]
}

export const STRESS_LABELS: StressLabel[] = ['Low', 'Moderate', 'High']
