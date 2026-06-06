interface LogoProps {
  className?: string
  showWordmark?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const sizes = {
  sm: { icon: 28, gap: 'gap-2', title: 'text-sm', tagline: 'text-xs' },
  md: { icon: 32, gap: 'gap-2.5', title: 'text-sm', tagline: 'text-xs' },
  lg: { icon: 40, gap: 'gap-3', title: 'text-base', tagline: 'text-sm' },
}

export default function Logo({ className = '', showWordmark = true, size = 'md' }: LogoProps) {
  const config = sizes[size]
  const iconSize = config.icon

  return (
    <div className={`flex items-center ${config.gap} ${className}`}>
      <svg
        width={iconSize}
        height={iconSize}
        viewBox="0 0 40 40"
        fill="none"
        aria-hidden="true"
        className="shrink-0"
      >
        <rect x="1" y="1" width="38" height="38" rx="10" fill="var(--ink)" />
        <rect x="10" y="9" width="20" height="24" rx="2" fill="var(--canvas)" />
        <path d="M10 14h20" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <path d="M13 18h14" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M13 22h11" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.55" />
        <path d="M13 26h8" stroke="var(--ink)" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
        <rect x="24" y="24" width="8" height="8" rx="2" fill="#0070f3" />
        <path
          d="M26.5 28.2l1.4 1.4 3.2-3.2"
          stroke="#ffffff"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {showWordmark ? (
        <div className="min-w-0">
          <p className={`${config.title} font-semibold tracking-tight text-[var(--ink)]`}>Resumate</p>
          <p className={`${config.tagline} hidden text-[var(--mute)] sm:block`}>
            AI cover letters from your resume and JD
          </p>
        </div>
      ) : null}
    </div>
  )
}
