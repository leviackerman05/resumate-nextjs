'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import type { UsageInfo } from '@/lib/types'
import ThemeToggle from './ThemeToggle'
import UserAvatar from './UserAvatar'
import Logo from './Logo'

interface HeaderProps {
  usage?: UsageInfo | null
}

export default function Header({ usage }: HeaderProps) {
  const router = useRouter()
  const { data: session, status } = useSession()
  const [localUsage, setLocalUsage] = useState<UsageInfo | null>(usage ?? null)
  const [signingOut, setSigningOut] = useState(false)

  useEffect(() => {
    if (usage) {
      setLocalUsage(usage)
    }
  }, [usage])

  useEffect(() => {
    if (status !== 'authenticated') {
      setLocalUsage(null)
      return
    }

    fetch('/api/usage')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setLocalUsage(data)
      })
      .catch(() => undefined)
  }, [status])

  const handleSignOut = async () => {
    setSigningOut(true)
    try {
      await signOut({ redirect: false })
      router.push('/')
      router.refresh()
    } finally {
      setSigningOut(false)
    }
  }

  return (
    <header className="border-b border-[var(--hairline)] bg-[var(--canvas)]">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Logo className="min-w-0 shrink" />

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle />
          {localUsage && session ? (
            <p className="hidden text-xs text-[var(--mute)] lg:block">
              {localUsage.unlimited
                ? 'Unlimited generations'
                : `${localUsage.remaining} of ${localUsage.limit} left today`}
            </p>
          ) : null}

          {status === 'loading' || signingOut ? (
            <span className="text-xs text-[var(--mute)] sm:text-sm">
              {signingOut ? 'Signing out...' : 'Loading...'}
            </span>
          ) : session ? (
            <div className="flex items-center gap-2 sm:gap-3">
              <UserAvatar name={session.user?.name} image={session.user?.image} />
              <div className="hidden text-right md:block">
                <p className="max-w-[160px] truncate text-sm font-medium text-[var(--ink)] lg:max-w-none">
                  {session.user?.name}
                </p>
                <p className="max-w-[160px] truncate text-xs text-[var(--mute)] lg:max-w-none">
                  {session.user?.email}
                </p>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="rounded-full border border-[var(--hairline)] px-3 py-2 text-xs font-medium text-[var(--ink)] transition hover:bg-[var(--canvas-soft)] disabled:opacity-60 sm:px-4 sm:text-sm"
              >
                Sign out
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => signIn('google', { callbackUrl: '/' })}
              className="rounded-full bg-[var(--ink)] px-3 py-2 text-xs font-medium text-[var(--on-ink)] transition hover:opacity-90 sm:px-4 sm:text-sm"
            >
              <span className="sm:hidden">Sign in</span>
              <span className="hidden sm:inline">Sign in with Google</span>
            </button>
          )}
        </div>
      </div>
    </header>
  )
}
