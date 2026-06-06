'use client'

interface UserAvatarProps {
  name?: string | null
  image?: string | null
  className?: string
}

function getInitials(name?: string | null) {
  if (!name) return '?'
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].charAt(0).toUpperCase()
  return `${parts[0].charAt(0)}${parts[parts.length - 1].charAt(0)}`.toUpperCase()
}

export default function UserAvatar({ name, image, className = 'h-8 w-8' }: UserAvatarProps) {
  if (image) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={image}
        alt=""
        referrerPolicy="no-referrer"
        className={`${className} rounded-full border border-[var(--hairline)] object-cover`}
      />
    )
  }

  return (
    <div
      className={`${className} flex items-center justify-center rounded-full border border-[var(--hairline)] bg-[var(--canvas-soft)] text-xs font-medium text-[var(--ink)]`}
      aria-hidden="true"
    >
      {getInitials(name)}
    </div>
  )
}
