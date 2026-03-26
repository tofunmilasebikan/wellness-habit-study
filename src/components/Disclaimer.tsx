import { DISCLAIMER_SHORT } from '@/lib/constants'

export function Disclaimer({ className = '' }: { className?: string }) {
  return (
    <p
      className={`text-center text-sm leading-relaxed text-text-muted ${className}`}
    >
      {DISCLAIMER_SHORT}
    </p>
  )
}
