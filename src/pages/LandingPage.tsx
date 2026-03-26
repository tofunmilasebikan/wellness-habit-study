import { Link } from 'react-router-dom'
import { APP_NAME } from '@/lib/constants'

function WrapPreviewContent({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'p-3' : 'p-5'}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
            Monthly wrap preview
          </p>
          <p className={compact ? 'mt-1 text-sm font-semibold text-text' : 'mt-1 text-base font-semibold tracking-tight text-text'}>
            March Wrap
          </p>
          <p className={compact ? 'mt-0.5 text-[11px] text-text-muted' : 'mt-1 text-sm text-text-muted'}>
            Sign in and this summary becomes yours.
          </p>
        </div>
        <span className="rounded-full border border-border bg-surface px-2.5 py-1 text-[10px] font-semibold text-text-muted">
          Preview
        </span>
      </div>

      <div className={compact ? 'mt-3 grid grid-cols-2 gap-2' : 'mt-4 grid grid-cols-2 gap-3'}>
        <div className="rounded-2xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Avg mood</p>
          <p className={compact ? 'mt-0.5 text-base font-semibold text-text' : 'mt-1 text-lg font-semibold text-text'}>
            4.0
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Avg sleep</p>
          <p className={compact ? 'mt-0.5 text-base font-semibold text-text' : 'mt-1 text-lg font-semibold text-text'}>
            7.2h
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Most common stress</p>
          <p className={compact ? 'mt-0.5 text-base font-semibold text-text' : 'mt-1 text-lg font-semibold text-text'}>
            Low
          </p>
        </div>
        <div className="rounded-2xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Good mood days</p>
          <p className={compact ? 'mt-0.5 text-base font-semibold text-text' : 'mt-1 text-lg font-semibold text-text'}>
            65%
          </p>
        </div>
      </div>

      <div className={compact ? 'mt-3 rounded-2xl border border-border bg-primary/10 p-3' : 'mt-3 rounded-2xl border border-border bg-primary/10 p-4'}>
        <p className="text-[10px] font-semibold uppercase tracking-wide text-text-muted">
          Insight
        </p>
        <p className={compact ? 'mt-1 text-[12px] leading-snug text-text' : 'mt-1 text-sm leading-snug text-text'}>
          On higher-sleep days, your mood tended to be higher.
        </p>
      </div>

      <div className={compact ? 'mt-3 grid grid-cols-3 gap-2' : 'mt-3 grid grid-cols-3 gap-2'}>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Low</p>
          <p className="mt-0.5 text-[12px] font-semibold text-text">8</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">Moderate</p>
          <p className="mt-0.5 text-[12px] font-semibold text-text">6</p>
        </div>
        <div className="rounded-xl border border-border bg-surface p-3">
          <p className="text-[10px] text-text-muted">High</p>
          <p className="mt-0.5 text-[12px] font-semibold text-text">3</p>
        </div>
      </div>
    </div>
  )
}

function SvgLaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <svg
        viewBox="0 0 980 620"
        className="w-full"
        aria-hidden="true"
      >
        {/* lid */}
        <rect x="40" y="20" width="900" height="520" rx="44" fill="#0f1215" />
        <rect x="72" y="54" width="836" height="452" rx="30" fill="#0b0d10" />
        {/* camera */}
        <circle cx="490" cy="38" r="6" fill="#2a323a" />
        <circle cx="490" cy="38" r="3" fill="#0b0d10" />

        {/* base */}
        <path
          d="M40 552 H940 C955 552 967 564 967 579 V592 C967 603 958 612 947 612 H33 C22 612 13 603 13 592 V579 C13 564 25 552 40 552 Z"
          fill="#101418"
        />
        <rect x="340" y="566" width="300" height="20" rx="10" fill="#2a323a" opacity="0.65" />
      </svg>

      {/* screen area */}
      <div className="absolute left-[7.3%] top-[8.7%] h-[67.5%] w-[85.4%] overflow-hidden rounded-[18px] bg-surface">
        {/* simple browser chrome */}
        <div className="flex items-center gap-2 border-b border-border bg-surface-elevated px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <span className="h-2 w-2 rounded-full bg-border" />
          <div className="ml-2 flex-1 truncate rounded-lg border border-border bg-surface px-2 py-1 text-[11px] text-text-muted">
            habitscope.app / monthly-wrap
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}

function SvgPhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative w-full">
      <svg viewBox="0 0 360 740" className="w-full" aria-hidden="true">
        {/* body */}
        <rect x="18" y="12" width="324" height="716" rx="52" fill="#0f1215" />
        {/* bezel */}
        <rect x="34" y="30" width="292" height="680" rx="44" fill="#0b0d10" />
        {/* notch */}
        <rect x="120" y="34" width="120" height="26" rx="13" fill="#0f1215" />
        <circle cx="240" cy="47" r="6" fill="#2a323a" />
        <rect x="150" y="44" width="64" height="8" rx="4" fill="#2a323a" opacity="0.8" />
      </svg>

      {/* screen */}
      <div className="absolute left-[12%] top-[6.5%] h-[87%] w-[76%] overflow-hidden rounded-[32px] bg-surface">
        {children}
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
              className="rounded-full border border-border bg-surface-elevated px-4 py-2 text-xs font-semibold text-text shadow-soft transition-opacity hover:opacity-90"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="rounded-full bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
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
                className="rounded-full bg-primary px-6 py-3 text-xs font-semibold text-primary-foreground shadow-soft transition-opacity hover:opacity-90"
              >
                Sign in to use the app
              </Link>
              <Link
                to="/signup"
                className="rounded-full border border-border bg-surface-elevated px-6 py-3 text-xs font-semibold text-text shadow-soft transition-opacity hover:opacity-90"
              >
                Create account
              </Link>
            </div>
          </div>

          <div className="md:justify-self-end">
            <div className="relative mx-auto w-full max-w-[620px]">
              <div className="absolute -inset-8 -z-10 rounded-[40px] bg-primary/10 blur-2xl" />

              <div className="relative">
                <SvgLaptopFrame>
                  <WrapPreviewContent />
                </SvgLaptopFrame>

                <div className="absolute -bottom-10 right-2 w-[34%] max-w-[220px] drop-shadow-[0_20px_40px_rgba(0,0,0,0.18)] md:right-4">
                  <SvgPhoneFrame>
                    <WrapPreviewContent compact />
                  </SvgPhoneFrame>
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
