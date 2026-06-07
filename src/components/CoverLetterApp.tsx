'use client'

import dynamic from 'next/dynamic'
import { useSession, signIn } from 'next-auth/react'
import { useEffect, useMemo, useState } from 'react'
import FileDropzone from './FileDropzone'
import DownloadPdfButton from './DownloadPdfButton'
import TemplatePicker from './TemplatePicker'
import Logo from './Logo'
import {
  DENSITY_OPTIONS,
  LENGTH_OPTIONS,
  TONE_OPTIONS,
  type CoverLetterData,
  type Density,
  type Length,
  type TemplateId,
  type Tone,
  type UsageInfo,
} from '@/lib/types'
import { estimatePageFit } from '@/lib/pdf-fit'
import { sanitizeText } from '@/lib/sanitize'

const PdfPreview = dynamic(() => import('./PdfPreview'), {
  ssr: false,
  loading: () => (
    <div className="flex h-[min(50vh,520px)] min-h-[360px] items-center justify-center rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft)] text-sm text-[var(--mute)] sm:h-[600px] lg:h-[720px]">
      Loading preview...
    </div>
  ),
})

async function readJsonResponse(response: Response) {
  const contentType = response.headers.get('content-type') ?? ''

  if (!contentType.includes('application/json')) {
    const text = await response.text()
    throw new Error(
      response.status >= 500
        ? 'Server error while processing your request. Please try again in a moment.'
        : text.slice(0, 200) || `Request failed (${response.status})`
    )
  }

  return response.json()
}

async function parsePdf(file: File) {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch('/api/parse', {
    method: 'POST',
    body: formData,
  })
  const payload = await readJsonResponse(response)
  if (!response.ok) {
    throw new Error(payload.error ?? 'Failed to parse PDF')
  }
  return payload.text as string
}

function buildPlainText(data: CoverLetterData) {
  return [
    data.candidateName,
    [data.email, data.phone, data.location].filter(Boolean).join(' | '),
    '',
    data.date,
    data.recipient,
    data.company,
    data.companyAddress,
    `RE: ${data.jobTitle}`,
    '',
    data.salutation,
    ...data.paragraphs,
    data.closing,
    '',
    'Sincerely,',
    data.signature,
  ]
    .filter((line, index, arr) => line || arr[index + 1])
    .join('\n')
}

export default function CoverLetterApp() {
  const { data: session } = useSession()
  const [resumeFile, setResumeFile] = useState<File | null>(null)
  const [jdFile, setJdFile] = useState<File | null>(null)
  const [jdText, setJdText] = useState('')
  const [tone, setTone] = useState<Tone>('professional')
  const [length, setLength] = useState<Length>('standard')
  const [templateId, setTemplateId] = useState<TemplateId>('modern')
  const [density, setDensity] = useState<Density>('standard')
  const [coverLetter, setCoverLetter] = useState<CoverLetterData | null>(null)
  const [usage, setUsage] = useState<UsageInfo | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const pageFit = useMemo(() => {
    if (!coverLetter) return null
    return estimatePageFit(coverLetter, density)
  }, [coverLetter, density])

  useEffect(() => {
    if (!session) {
      setUsage(null)
      return
    }

    fetch('/api/usage')
      .then((res) => (res.ok ? res.json() : null))
      .then((data) => {
        if (data) setUsage(data)
      })
      .catch(() => undefined)
  }, [session])

  useEffect(() => {
    if (!session) {
      setCoverLetter(null)
    }
  }, [session])

  const generateLetter = async () => {
    setError(null)

    if (!session) {
      await signIn('google')
      return
    }

    if (!resumeFile) {
      setError('Please upload your resume as a PDF.')
      return
    }

    if (!jdText.trim() && !jdFile) {
      setError('Please paste a job description or upload a JD PDF.')
      return
    }

    setLoading(true)

    try {
      const resumeText = await parsePdf(resumeFile)
      const resolvedJdText = jdText.trim() || (jdFile ? await parsePdf(jdFile) : '')

      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          resumeText,
          jdText: resolvedJdText,
          tone,
          length,
        }),
      })

      const payload = await readJsonResponse(response)

      if (!response.ok) {
        throw new Error(payload.error ?? 'Failed to generate cover letter')
      }

      setCoverLetter(payload.coverLetter)
      setUsage(payload.usage ?? null)
    } catch (generationError) {
      setError(generationError instanceof Error ? generationError.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const updateField = <K extends keyof CoverLetterData>(key: K, value: CoverLetterData[K]) => {
    if (!coverLetter) return
    setCoverLetter({ ...coverLetter, [key]: value })
  }

  const updateParagraph = (index: number, value: string) => {
    if (!coverLetter) return
    const paragraphs = [...coverLetter.paragraphs]
    paragraphs[index] = sanitizeText(value)
    setCoverLetter({ ...coverLetter, paragraphs })
  }

  const addParagraph = () => {
    if (!coverLetter) return
    setCoverLetter({ ...coverLetter, paragraphs: [...coverLetter.paragraphs, ''] })
  }

  const removeParagraph = (index: number) => {
    if (!coverLetter) return
    setCoverLetter({
      ...coverLetter,
      paragraphs: coverLetter.paragraphs.filter((_, i) => i !== index),
    })
  }

  const copyPlainText = async () => {
    if (!coverLetter) return
    await navigator.clipboard.writeText(buildPlainText(coverLetter))
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const downloadTxt = () => {
    if (!coverLetter) return
    const blob = new Blob([buildPlainText(coverLetter)], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'cover-letter.txt'
    link.click()
    URL.revokeObjectURL(url)
  }

  if (!coverLetter) {
    return (
      <section className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-12">
        <div className="mb-8 text-center sm:mb-10">
          <div className="mb-5 flex justify-center sm:mb-6">
            <Logo showWordmark={false} size="lg" />
          </div>
          <p className="mb-3 inline-flex max-w-full rounded-full border border-[var(--hairline)] bg-[var(--canvas-soft)] px-3 py-1 text-xs font-medium text-[var(--mute)]">
            Resume + JD to polished cover letter
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            Generate a tailored cover letter in minutes
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-sm text-[var(--body)] sm:text-base">
            Upload your resume PDF, add a job description, and get an editable, single-page cover letter with high-quality PDF export.
          </p>
        </div>

        <div className="rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-4 shadow-sm sm:p-8">
          <div className="space-y-8">
            <FileDropzone
              label="Resume (PDF required)"
              file={resumeFile}
              onFileChange={setResumeFile}
              hint="We extract text from your resume to personalize the letter."
            />

            <div>
              <label htmlFor="jd-text" className="mb-2 block text-sm font-medium text-[var(--ink)]">
                Job description
              </label>
              <textarea
                id="jd-text"
                value={jdText}
                onChange={(event) => setJdText(event.target.value)}
                rows={8}
                placeholder="Paste the job description here..."
                className="w-full rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft-2)] px-4 py-3 text-sm text-[var(--ink)] outline-none transition focus:border-[var(--ink)]"
              />
              <p className="mt-2 text-xs text-[var(--mute)]">Or upload a JD PDF below.</p>
            </div>

            <FileDropzone
              label="Job description PDF (optional)"
              file={jdFile}
              onFileChange={setJdFile}
              hint="Used when you prefer uploading the JD instead of pasting it."
            />

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="tone" className="mb-2 block text-sm font-medium text-[var(--ink)]">
                  Tone
                </label>
                <select
                  id="tone"
                  value={tone}
                  onChange={(event) => setTone(event.target.value as Tone)}
                  className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2.5 text-sm"
                >
                  {TONE_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="length" className="mb-2 block text-sm font-medium text-[var(--ink)]">
                  Length
                </label>
                <select
                  id="length"
                  value={length}
                  onChange={(event) => setLength(event.target.value as Length)}
                  className="w-full rounded-xl border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2.5 text-sm"
                >
                  {LENGTH_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {!session ? (
              <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft)] px-4 py-3 text-sm text-[var(--body)]">
                Sign in with Google to generate up to 5 cover letters per day. We do not save your letters.
              </div>
            ) : usage ? (
              <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft)] px-4 py-3 text-sm text-[var(--body)]">
                {usage.unlimited
                  ? 'Unlimited generations for your account.'
                  : `${usage.remaining} of ${usage.limit} generations remaining today.`}
              </div>
            ) : null}

            {error ? (
              <div className="rounded-2xl border border-[var(--error-soft)] bg-[var(--error-soft)] px-4 py-3 text-sm text-[var(--error-deep)]">
                {error}
              </div>
            ) : null}

            <button
              type="button"
              onClick={generateLetter}
              disabled={loading}
              className="w-full rounded-full bg-[var(--ink)] px-6 py-3 text-sm font-medium text-[var(--on-ink)] transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Generating cover letter...' : session ? 'Generate cover letter' : 'Sign in and generate'}
            </button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6 space-y-4">
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-[var(--ink)] sm:text-2xl">
            Edit your cover letter
          </h2>
          <p className="mt-1 text-sm text-[var(--mute)]">
            Update any field, switch templates, and download a crisp single-page PDF.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-2 sm:flex sm:flex-wrap sm:gap-3">
          <button
            type="button"
            onClick={() => setCoverLetter(null)}
            className="rounded-full border border-[var(--hairline)] px-3 py-2.5 text-xs font-medium text-[var(--ink)] hover:bg-[var(--canvas-soft)] sm:px-4 sm:text-sm"
          >
            Start over
          </button>
          <button
            type="button"
            onClick={generateLetter}
            disabled={loading}
            className="rounded-full border border-[var(--hairline)] px-3 py-2.5 text-xs font-medium text-[var(--ink)] hover:bg-[var(--canvas-soft)] disabled:opacity-60 sm:px-4 sm:text-sm"
          >
            {loading ? 'Regenerating...' : 'Regenerate'}
          </button>
          <button
            type="button"
            onClick={copyPlainText}
            className="rounded-full border border-[var(--hairline)] px-3 py-2.5 text-xs font-medium text-[var(--ink)] hover:bg-[var(--canvas-soft)] sm:px-4 sm:text-sm"
          >
            {copied ? 'Copied' : 'Copy text'}
          </button>
          <button
            type="button"
            onClick={downloadTxt}
            className="rounded-full border border-[var(--hairline)] px-3 py-2.5 text-xs font-medium text-[var(--ink)] hover:bg-[var(--canvas-soft)] sm:px-4 sm:text-sm"
          >
            Download .txt
          </button>
          <DownloadPdfButton
            data={coverLetter}
            templateId={templateId}
            density={density}
            className="col-span-2 w-full sm:col-span-1 sm:w-auto"
          />
        </div>
      </div>

      {error ? (
        <div className="mb-6 rounded-2xl border border-[var(--error-soft)] bg-[var(--error-soft)] px-4 py-3 text-sm text-[var(--error-deep)]">
          {error}
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2 lg:gap-8">
        <div className="order-2 space-y-6 rounded-3xl border border-[var(--hairline)] bg-[var(--surface)] p-4 sm:p-6 lg:order-1">
          <div className="grid gap-4 sm:grid-cols-2">
            {([
              ['candidateName', 'Full name'],
              ['email', 'Email'],
              ['phone', 'Phone'],
              ['location', 'Location'],
              ['recipient', 'Recipient'],
              ['company', 'Company'],
              ['companyAddress', 'Company address'],
              ['jobTitle', 'Job title'],
              ['date', 'Date'],
              ['salutation', 'Salutation'],
              ['closing', 'Closing line'],
              ['signature', 'Signature'],
            ] as const).map(([key, label]) => (
              <div key={key} className={key === 'companyAddress' || key === 'closing' ? 'sm:col-span-2' : ''}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[var(--mute)]">
                  {label}
                </label>
                <input
                  value={coverLetter[key]}
                  onChange={(event) => updateField(key, sanitizeText(event.target.value))}
                  className="w-full rounded-xl border border-[var(--hairline)] px-3 py-2 text-sm"
                />
              </div>
            ))}
          </div>

          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-sm font-medium text-[var(--ink)]">Body paragraphs</h3>
              <button
                type="button"
                onClick={addParagraph}
                className="text-xs font-medium text-[var(--link)]"
              >
                Add paragraph
              </button>
            </div>
            <div className="space-y-3">
              {coverLetter.paragraphs.map((paragraph, index) => (
                <div key={index}>
                  <div className="mb-1 flex items-center justify-between">
                    <span className="text-xs text-[var(--mute)]">Paragraph {index + 1}</span>
                    {coverLetter.paragraphs.length > 1 ? (
                      <button
                        type="button"
                        onClick={() => removeParagraph(index)}
                        className="text-xs text-[var(--error-deep)]"
                      >
                        Remove
                      </button>
                    ) : null}
                  </div>
                  <textarea
                    value={paragraph}
                    onChange={(event) => updateParagraph(index, event.target.value)}
                    rows={4}
                    className="w-full rounded-xl border border-[var(--hairline)] px-3 py-2 text-sm"
                  />
                </div>
              ))}
            </div>
          </div>

          <TemplatePicker value={templateId} onChange={setTemplateId} />

          <div>
            <label className="mb-2 block text-sm font-medium text-[var(--ink)]">Density</label>
            <select
              value={density}
              onChange={(event) => setDensity(event.target.value as Density)}
              className="w-full rounded-xl border border-[var(--hairline)] px-4 py-2.5 text-sm"
            >
              {DENSITY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          {pageFit ? (
            <div className="rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft)] px-4 py-3 text-sm text-[var(--body)]">
              <span className="font-medium text-[var(--ink)]">{pageFit.wordCount} words</span>
              {' · '}
              {pageFit.fitsOnOnePage ? 'Likely fits on one page' : 'Content is long; try Compact density or shorten paragraphs'}
            </div>
          ) : null}
        </div>

        <div className="order-1 lg:order-2">
          <p className="mb-3 text-sm font-medium text-[var(--ink)] lg:hidden">Preview</p>
          <PdfPreview data={coverLetter} templateId={templateId} density={density} />
        </div>
      </div>
    </section>
  )
}
