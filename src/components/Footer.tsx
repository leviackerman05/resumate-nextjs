import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-[var(--hairline)] bg-[var(--canvas)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-6 text-xs text-[var(--mute)] sm:flex-row sm:px-6">
        <p>© {new Date().getFullYear()} Resumate. Free AI cover letter generator.</p>
        <Link href="/privacy" className="font-medium text-[var(--ink)] hover:text-[var(--link)]">
          Privacy Policy
        </Link>
      </div>
    </footer>
  )
}
