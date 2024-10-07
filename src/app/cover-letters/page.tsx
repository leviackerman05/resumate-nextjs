import Link from 'next/link'
import AuthStatus from '../AuthStatus'

export default function CoverLetters() {
  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <h1 className="text-2xl font-semibold mb-6 text-black">My Cover Letters</h1>
            <AuthStatus />
            <p className="mb-4 text-black">You don't have any cover letters yet.</p>
            <Link href="/cover-letters/new" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Create New Cover Letter
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}