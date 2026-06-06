import Groq from 'groq-sdk'
import type { CoverLetterData, GenerateOptions } from './types'
import { sanitizeCoverLetterValue, sanitizeText } from './sanitize'

function getGroqClient() {
  const apiKey = process.env.GROQ_API_KEY
  if (!apiKey) {
    throw new Error('GROQ_API_KEY is not configured')
  }
  return new Groq({ apiKey })
}

const lengthTargets: Record<GenerateOptions['length'], string> = {
  short: 'about 220 to 260 words total across body paragraphs',
  standard: 'about 280 to 330 words total across body paragraphs',
  long: 'about 340 to 380 words total across body paragraphs',
}

function formatDate() {
  return new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
}

export async function generateCoverLetter(
  options: GenerateOptions
): Promise<CoverLetterData> {
  const groq = getGroqClient()
  const completion = await groq.chat.completions.create({
    model: 'llama-3.3-70b-versatile',
    temperature: 0.7,
    response_format: { type: 'json_object' },
    messages: [
      {
        role: 'system',
        content: `You write tailored, high-quality job application cover letters.
Return ONLY valid JSON with this exact shape:
{
  "candidateName": string,
  "email": string,
  "phone": string,
  "location": string,
  "recipient": string,
  "company": string,
  "companyAddress": string,
  "jobTitle": string,
  "salutation": string,
  "paragraphs": string[],
  "closing": string,
  "signature": string
}

Rules:
- Use information from the resume and job description.
- Write 3 or 4 body paragraphs in "paragraphs".
- Tone must match the requested tone.
- Keep content concise enough for a single printed page.
- Never use em dashes or en dashes. Use commas, periods, or hyphens instead.
- Do not invent credentials that are not supported by the resume.
- If recipient is unknown, use "Dear Hiring Manager,".
- closing should be one short sentence before the sign-off.`,
      },
      {
        role: 'user',
        content: `Tone: ${options.tone}
Length target: ${lengthTargets[options.length]}

Resume:
${options.resumeText}

Job Description:
${options.jdText}`,
      },
    ],
  })

  const raw = completion.choices[0]?.message?.content

  if (!raw) {
    throw new Error('No response from AI model')
  }

  const parsed = JSON.parse(raw) as Partial<CoverLetterData>

  return {
    candidateName: sanitizeText(parsed.candidateName ?? ''),
    email: sanitizeText(parsed.email ?? ''),
    phone: sanitizeText(parsed.phone ?? ''),
    location: sanitizeText(parsed.location ?? ''),
    recipient: sanitizeText(parsed.recipient ?? 'Hiring Manager'),
    company: sanitizeText(parsed.company ?? ''),
    companyAddress: sanitizeText(parsed.companyAddress ?? ''),
    jobTitle: sanitizeText(parsed.jobTitle ?? ''),
    date: formatDate(),
    salutation: sanitizeCoverLetterValue(parsed.salutation ?? 'Dear Hiring Manager,'),
    paragraphs: sanitizeCoverLetterValue(parsed.paragraphs ?? []),
    closing: sanitizeCoverLetterValue(
      parsed.closing ??
        'Thank you for your time and consideration. I look forward to hearing from you.'
    ),
    signature: sanitizeCoverLetterValue(parsed.signature ?? parsed.candidateName ?? ''),
  }
}
