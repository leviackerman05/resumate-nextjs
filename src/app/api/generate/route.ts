import { getServerSession } from 'next-auth'
import { NextResponse } from 'next/server'
import { authOptions } from '@/lib/auth-options'
import { generateCoverLetter } from '@/lib/groq'
import { checkAndIncrementUsage } from '@/lib/rate-limit'
import type { GenerateOptions } from '@/lib/types'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Sign in with Google to generate cover letters.' }, { status: 401 })
    }

    const body = (await request.json()) as Partial<GenerateOptions>

    if (!body.resumeText?.trim() || !body.jdText?.trim()) {
      return NextResponse.json(
        { error: 'Resume text and job description text are required.' },
        { status: 400 }
      )
    }

    const usage = await checkAndIncrementUsage(session.user.email)

    if (!usage.allowed) {
      return NextResponse.json(
        {
          error: "You've used all 5 cover letters for today. Your limit resets at midnight UTC.",
          usage,
        },
        { status: 429 }
      )
    }

    const coverLetter = await generateCoverLetter({
      tone: body.tone ?? 'professional',
      length: body.length ?? 'standard',
      resumeText: body.resumeText.trim(),
      jdText: body.jdText.trim(),
    })

    return NextResponse.json({ coverLetter, usage })
  } catch (error) {
    console.error('Generate error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate cover letter' },
      { status: 500 }
    )
  }
}
