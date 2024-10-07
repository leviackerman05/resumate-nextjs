'use client'

import { useSession, signIn, signOut } from 'next-auth/react'
import Link from 'next/link'

export default function AuthStatus() {
  const { data: session } = useSession()

  if (session) {
    return (
      <>
        <p className='text-black'>Signed in as {session.user?.email}</p>
        <button
          onClick={() => signOut()}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 mr-2 px-4 rounded"
        >
          Sign out
        </button>
        <Link href="/cover-letters" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          My Cover Letters
        </Link>
      </>
    )
  }
  return (
    <>
      <p>Not signed in</p>
      <button
        onClick={() => signIn()}
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Sign in
      </button>
    </>
  )
}