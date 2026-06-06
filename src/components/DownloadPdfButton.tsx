'use client'

import type { CoverLetterData, Density, TemplateId } from '@/lib/types'
import { computePdfLayout } from '@/lib/pdf-fit'
import { renderCoverLetterDocument } from '@/pdf/templates'

interface DownloadPdfButtonProps {
  data: CoverLetterData
  templateId: TemplateId
  density: Density
  className?: string
}

export default function DownloadPdfButton({
  data,
  templateId,
  density,
  className = '',
}: DownloadPdfButtonProps) {
  const handleDownload = async () => {
    const [{ pdf, Document }] = await Promise.all([import('@react-pdf/renderer')])
    const layout = computePdfLayout(data, density)

    const blob = await pdf(
      <Document>
        {renderCoverLetterDocument(templateId, { data, layout })}
      </Document>
    ).toBlob()

    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `${data.candidateName.replace(/\s+/g, '-').toLowerCase() || 'cover-letter'}.pdf`
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      className={`rounded-full bg-[var(--ink)] px-5 py-2.5 text-sm font-medium text-[var(--on-ink)] transition hover:opacity-90 ${className}`}
    >
      Download PDF
    </button>
  )
}
