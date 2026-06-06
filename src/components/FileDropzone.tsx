'use client'

import { useCallback, useState } from 'react'

interface FileDropzoneProps {
  label: string
  accept?: string
  hint?: string
  file: File | null
  onFileChange: (file: File | null) => void
}

export default function FileDropzone({
  label,
  accept = '.pdf,application/pdf',
  hint,
  file,
  onFileChange,
}: FileDropzoneProps) {
  const [isDragging, setIsDragging] = useState(false)

  const handleFiles = useCallback(
    (files: FileList | null) => {
      const next = files?.[0] ?? null
      if (!next) return
      onFileChange(next)
    },
    [onFileChange]
  )

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-[var(--ink)]">{label}</label>
      <div
        onDragOver={(event) => {
          event.preventDefault()
          setIsDragging(true)
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault()
          setIsDragging(false)
          handleFiles(event.dataTransfer.files)
        }}
        className={`rounded-2xl border border-dashed px-4 py-6 text-center transition sm:px-6 sm:py-8 ${
          isDragging
            ? 'border-[var(--ink)] bg-[var(--canvas-soft)]'
            : 'border-[var(--hairline-strong)] bg-[var(--canvas-soft-2)]'
        }`}
      >
        <p className="break-all text-sm font-medium text-[var(--ink)]">
          {file ? file.name : 'Tap to browse or drop a PDF here'}
        </p>
        {hint ? <p className="mt-2 text-xs leading-5 text-[var(--mute)]">{hint}</p> : null}
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          <label className="inline-flex min-h-10 cursor-pointer items-center rounded-full border border-[var(--hairline)] bg-[var(--surface)] px-4 py-2 text-sm font-medium text-[var(--ink)] hover:bg-[var(--canvas-soft)]">
            Choose file
            <input
              type="file"
              accept={accept}
              className="hidden"
              onChange={(event) => handleFiles(event.target.files)}
            />
          </label>
          {file ? (
            <button
              type="button"
              onClick={() => onFileChange(null)}
              className="min-h-10 px-2 text-xs text-[var(--link)] underline"
            >
              Remove
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
