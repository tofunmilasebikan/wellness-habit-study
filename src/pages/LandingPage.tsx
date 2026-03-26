import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { APP_NAME } from '@/lib/constants'

const desktopMetrics = [
  { label: 'Average', value: '7.2h' },
  { label: 'Best night', value: '8.1h' },
  { label: 'Streak', value: '6 days' },
]

const mobileMetrics = [
  { label: 'Sleep', value: '7.2h' },
  { label: 'Mood', value: '4.0' },
]

const ctaBaseClass =
  'inline-flex items-center justify-center rounded-full border transition duration-200 ease-out cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-surface'

const primaryCtaClass =
  'border-[#3f6f5d] bg-[linear-gradient(180deg,#5f9d84_0%,#477463_100%)] text-white shadow-[0_16px_30px_rgba(71,116,99,0.3)] ring-1 ring-white/35 hover:-translate-y-0.5 hover:border-[#355b4d] hover:shadow-[0_20px_34px_rgba(71,116,99,0.38)] hover:brightness-105 active:translate-y-0 active:scale-[0.99] focus-visible:ring-[#5f9d84]/40'

const secondaryCtaClass =
  'border-[#b8cbc0] bg-[#f4f8f5] text-[#264034] shadow-[0_12px_24px_rgba(45,58,52,0.1)] ring-1 ring-white/80 hover:-translate-y-0.5 hover:border-[#8ea99a] hover:bg-[#eef5f0] hover:shadow-[0_16px_30px_rgba(45,58,52,0.14)] active:translate-y-0 active:scale-[0.99] focus-visible:ring-[#5f9d84]/30'

function PreviewPill({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-full border border-[#e7ece8] bg-white px-3 py-1 text-[11px] font-medium text-[#68766e] shadow-[0_8px_18px_rgba(31,35,38,0.04)]">
      {children}
    </span>
  )
}

function AppPreviewHeader({
  subtitle,
  compact = false,
}: {
  subtitle: string
  compact?: boolean
}) {
  return (
    <div className="flex items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div
          className={[
            'grid shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,#84b59f_0%,#5d83ff_100%)] text-xs font-bold text-white shadow-[0_10px_20px_rgba(122,169,141,0.2)]',
            compact ? 'h-8 w-8' : 'h-9 w-9',
          ].join(' ')}
        >
          H
        </div>
        <div>
          <p className={compact ? 'text-[12px] font-semibold tracking-tight text-[#2a3832]' : 'text-[13px] font-semibold tracking-tight text-[#2a3832]'}>
            HabitScope
          </p>
          <p className="mt-0.5 text-[10px] text-[#78867e]">
            {subtitle}
          </p>
        </div>
      </div>

      {!compact ? (
        <span className="rounded-full border border-[#e7ece8] bg-white px-3 py-1 text-[10px] font-semibold text-[#6b7971] shadow-[0_8px_18px_rgba(31,35,38,0.04)]">
          Soft summary view
        </span>
      ) : null}
    </div>
  )
}

function TrendChart({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={[
        'relative overflow-hidden rounded-[20px] border border-[#e7ece8]',
        compact ? 'mt-3 h-28' : 'mt-4 h-44',
      ].join(' ')}
      style={{
        backgroundImage: [
          'linear-gradient(180deg, rgba(255,255,255,0.94), rgba(246,247,251,0.98))',
          'repeating-linear-gradient(to right, rgba(108,118,135,0.08) 0 1px, transparent 1px 48px)',
          'repeating-linear-gradient(to bottom, rgba(108,118,135,0.08) 0 1px, transparent 1px 42px)',
        ].join(','),
      }}
    >
      <svg
        viewBox={compact ? '0 0 320 160' : '0 0 520 220'}
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
        aria-hidden="true"
      >
        <path
          d={compact
            ? 'M28 104 L72 98 L116 110 L160 84 L204 78 L248 64 L292 68'
            : 'M40 152 L90 144 L140 154 L190 118 L240 102 L290 116 L340 82 L390 88 L440 108 L490 92'}
          stroke="#5068ff"
          strokeWidth={compact ? '5' : '6'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d={compact
            ? 'M28 126 L72 120 L116 116 L160 108 L204 94 L248 98 L292 88'
            : 'M40 176 L90 170 L140 166 L190 150 L240 134 L290 138 L340 118 L390 128 L440 120 L490 112'}
          stroke="#5cb98c"
          strokeWidth={compact ? '4' : '5'}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {!compact ? (
          <>
            <circle cx="240" cy="102" r="6" fill="#5068ff" stroke="#ffffff" strokeWidth="2" />
            <circle cx="340" cy="82" r="6" fill="#ff7f5f" stroke="#ffffff" strokeWidth="2" />
          </>
        ) : null}
      </svg>
    </div>
  )
}

function DesktopPreviewContent() {
  return (
    <div className="h-full bg-[#f7f9f8] p-4 text-[#2f3f37] md:p-5">
      <AppPreviewHeader subtitle="Mobile-style experience" />

      <div className="mt-4 grid gap-3 xl:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <div className="rounded-[24px] border border-[#e7ece8] bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(247,248,251,0.92))] p-5 shadow-[0_16px_32px_rgba(31,35,38,0.06)]">
          <span className="inline-flex rounded-full bg-[#edf3ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5068ff]">
            Wrap unlocked
          </span>
          <h2 className="mt-3 text-[26px] leading-[1.02] font-semibold tracking-[-0.05em] text-[#23302a]">
            Create an account to get your monthly wrap
          </h2>
          <p className="mt-2 text-[13px] leading-6 text-[#74827a]">
            Shorter cards, calmer hierarchy, and a friendlier way to understand your month.
          </p>

          <div className="mt-4 flex flex-wrap gap-2">
            <PreviewPill>sleep</PreviewPill>
            <PreviewPill>mood</PreviewPill>
            <PreviewPill>stress</PreviewPill>
          </div>
        </div>

        <div className="rounded-[22px] border border-[#e7ece8] bg-[#f8fbf9] p-4 shadow-[0_12px_24px_rgba(31,35,38,0.04)]">
          <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d8a82]">
            This month
          </p>
          <div className="mt-3 flex items-end gap-2">
            <span className="text-[52px] leading-none font-semibold tracking-[-0.08em] text-[#24312b]">
              24
            </span>
            <span className="pb-1 text-[11px] text-[#7b8981]">
              entries logged
            </span>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <PreviewPill>better week 3</PreviewPill>
            <PreviewPill>steadier mornings</PreviewPill>
          </div>
        </div>
      </div>

      <div className="mt-3 grid gap-3 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)]">
        <div className="space-y-3">
          <div className="rounded-[22px] border border-[#e7ece8] bg-white p-4 shadow-[0_12px_24px_rgba(31,35,38,0.04)]">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#2b3833]">
                  Sleep quality
                </h3>
                <p className="mt-1 text-[12px] leading-5 text-[#74827a]">
                  Most steady after your longest streak.
                </p>
              </div>
              <span className="rounded-full bg-[#edf7f1] px-2.5 py-1 text-[10px] font-semibold text-[#5a8b72]">
                improving
              </span>
            </div>

            <div className="mt-3 grid grid-cols-3 gap-2">
              {desktopMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[#e7ece8] bg-[#fbfcfb] p-3"
                >
                  <span className="block text-[10px] text-[#7a8880]">
                    {metric.label}
                  </span>
                  <span className="mt-1 block text-[15px] font-semibold tracking-[-0.03em] text-[#2a3832]">
                    {metric.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-[22px] border border-[#e7ece8] bg-white p-4 shadow-[0_12px_24px_rgba(31,35,38,0.04)]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#7d8a82]">
              Mood moments
            </p>
            <p className="mt-2 text-[12px] leading-5 text-[#74827a]">
              Your calmest days grouped around the same bedtime window.
            </p>
          </div>
        </div>

        <div className="rounded-[22px] border border-[#e7ece8] bg-white p-4 shadow-[0_12px_24px_rgba(31,35,38,0.04)]">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="text-[15px] font-semibold tracking-[-0.02em] text-[#2b3833]">
                Month trend
              </h3>
              <p className="mt-1 text-[12px] leading-5 text-[#74827a]">
                A calmer card-stack version of the wrap.
              </p>
            </div>
            <span className="rounded-full bg-[#eef2ff] px-2.5 py-1 text-[10px] font-semibold text-[#5068ff]">
              trend
            </span>
          </div>

          <TrendChart />
        </div>
      </div>
    </div>
  )
}

function PhonePreviewContent() {
  return (
    <div className="h-full bg-[#f7f9f8] p-4 text-[#2f3f37]">
      <AppPreviewHeader subtitle="Card view" compact />

      <div className="mt-4 rounded-[22px] border border-[#e7ece8] bg-[linear-gradient(135deg,rgba(255,255,255,0.97),rgba(247,248,251,0.92))] p-4 shadow-[0_14px_28px_rgba(31,35,38,0.06)]">
        <span className="inline-flex rounded-full bg-[#edf3ff] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#5068ff]">
          March
        </span>
        <h3 className="mt-3 text-[19px] leading-[1.04] font-semibold tracking-[-0.05em] text-[#23302a]">
          Month at a glance
        </h3>
        <p className="mt-2 text-[12px] leading-5 text-[#74827a]">
          Sign up to turn daily check-ins into a short, friendly wrap.
        </p>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {mobileMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-2xl border border-[#e7ece8] bg-white p-3 shadow-[0_10px_20px_rgba(31,35,38,0.04)]"
          >
            <span className="block text-[10px] text-[#7a8880]">
              {metric.label}
            </span>
            <span className="mt-1 block text-[15px] font-semibold tracking-[-0.03em] text-[#2a3832]">
              {metric.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-[22px] border border-[#e7ece8] bg-white p-3.5 shadow-[0_12px_24px_rgba(31,35,38,0.04)]">
        <div className="flex items-center justify-between gap-2">
          <div>
            <h3 className="text-[13px] font-semibold tracking-[-0.02em] text-[#2b3833]">
              Trend
            </h3>
            <p className="mt-0.5 text-[11px] text-[#74827a]">
              Preview
            </p>
          </div>
          <span className="rounded-full bg-[#edf7f1] px-2.5 py-1 text-[10px] font-semibold text-[#5a8b72]">
            softer
          </span>
        </div>

        <TrendChart compact />
      </div>
    </div>
  )
}

function LaptopFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full">
      <div className="relative rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,#252a2f_0%,#181b1f_100%)] p-2.5 shadow-[0_30px_80px_rgba(29,33,38,0.18)]">
        <div className="pointer-events-none absolute left-1/2 top-1.5 h-1 w-20 -translate-x-1/2 rounded-full bg-white/10" />
        <div className="overflow-hidden rounded-[20px] border border-black/5 bg-white shadow-inner">
          <div className="flex items-center gap-2 border-b border-[#edf0ee] bg-white px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8dce5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8dce5]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#d8dce5]" />
            <div className="ml-2 flex-1 truncate rounded-full border border-[#eceff1] bg-[#fbfcfb] px-3 py-1 text-[11px] text-[#7d8a82]">
              habitscope.app / monthly-wrap
            </div>
          </div>
          <div className="aspect-[16/10]">
            {children}
          </div>
        </div>
      </div>

      <div className="-mt-0.5 mx-auto h-4 w-[112%] max-w-[720px] rounded-b-[18px] bg-[linear-gradient(180deg,#c1c7cb_0%,#9ea6ac_100%)] shadow-[0_14px_24px_rgba(31,35,38,0.14)]">
        <div className="mx-auto mt-[3px] h-1 w-36 rounded-full bg-[#55616a]/20" />
      </div>
    </div>
  )
}

function PhoneFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative w-full rounded-[42px] border border-white/15 bg-[linear-gradient(180deg,#2a3036_0%,#161b20_100%)] p-2 shadow-[0_28px_60px_rgba(31,35,38,0.24)]">
      <span className="absolute -left-[2px] top-28 h-10 w-[3px] rounded-full bg-white/10" />
      <span className="absolute -left-[2px] top-44 h-16 w-[3px] rounded-full bg-white/10" />
      <div className="absolute left-1/2 top-3 z-10 h-7 w-24 -translate-x-1/2 rounded-full bg-[#0f1318]" />
      <div className="overflow-hidden rounded-[34px] border border-black/5 bg-white">
        <div className="aspect-[10/21]">
          {children}
        </div>
      </div>
    </div>
  )
}

export function LandingPage() {
  return (
    <div className="min-h-svh bg-surface">
      <header className="border-b border-border bg-surface-elevated/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 md:px-6">
          <Link
            to="/faq"
            className="text-xs font-semibold uppercase tracking-wide text-text-muted hover:text-text"
          >
            FAQ
          </Link>
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/login"
              className={`${ctaBaseClass} ${secondaryCtaClass} px-4 py-2 text-xs font-semibold`}
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className={`${ctaBaseClass} ${primaryCtaClass} px-4 py-2 text-xs font-semibold`}
            >
              Sign up
            </Link>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-5xl px-4 pb-16 pt-12 md:px-6 md:pt-16">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <h1 className="mb-6 text-4xl font-semibold tracking-tight text-text md:text-5xl">
              {APP_NAME}
            </h1>
            <p className="mb-8 text-lg leading-relaxed text-text-muted">
              A simple daily check-in for sleep, study, mood, and stress that
              helps you notice patterns over time through clear charts and
              monthly highlights.
            </p>

            <div className="mb-10 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
                <h2 className="mb-2 text-base font-semibold text-text">
                  Structured check-ins
                </h2>
                <p className="text-sm leading-relaxed text-text-muted">
                  A quick daily check-in that takes under a minute. Keep your
                  tracking consistent without overthinking it.
                </p>
              </div>
              <div className="rounded-2xl border border-border bg-surface-elevated p-6 shadow-soft">
                <h2 className="mb-2 text-base font-semibold text-text">
                  Monthly wrap
                </h2>
                <p className="text-sm leading-relaxed text-text-muted">
                  Sign up, log your check-ins, and get a clean monthly summary
                  with highlights and patterns.
                </p>
              </div>
            </div>

            <div className="mt-2 flex flex-col items-center justify-center gap-3 sm:flex-row sm:justify-start">
              <Link
                to="/login"
                className={`${ctaBaseClass} ${primaryCtaClass} px-6 py-3 text-sm font-semibold`}
              >
                Sign in to use the app
              </Link>
              <Link
                to="/signup"
                className={`${ctaBaseClass} ${secondaryCtaClass} px-6 py-3 text-sm font-semibold`}
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="relative mx-auto w-full max-w-[650px]">
              <div className="absolute -left-10 -top-10 -z-10 h-56 w-56 rounded-full bg-[#7b5ee8]/10 blur-3xl" />
              <div className="absolute -bottom-12 -right-8 -z-10 h-72 w-72 rounded-full bg-primary/20 blur-3xl" />

              <div className="relative">
                <LaptopFrame>
                  <DesktopPreviewContent />
                </LaptopFrame>

                <div className="absolute -bottom-8 right-3 w-[34%] max-w-[220px] md:right-5">
                  <PhoneFrame>
                    <PhonePreviewContent />
                  </PhoneFrame>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* intentionally no extra footer copy */}
      </div>
    </div>
  )
}
