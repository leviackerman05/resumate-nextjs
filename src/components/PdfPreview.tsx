'use client'

import { Document, PDFViewer } from '@react-pdf/renderer'
import { useEffect, useMemo, useState } from 'react'
import type { CoverLetterData, Density, TemplateId } from '@/lib/types'
import { computePdfLayout } from '@/lib/pdf-fit'
import { renderCoverLetterDocument } from '@/pdf/templates'

interface PdfPreviewProps {
  data: CoverLetterData
  templateId: TemplateId
  density: Density
}

function usePreviewHeight() {
  const [height, setHeight] = useState(480)

  useEffect(() => {
    const updateHeight = () => {
      if (window.innerWidth < 640) {
        setHeight(Math.min(Math.max(window.innerHeight * 0.5, 360), 520))
        return
      }

      if (window.innerWidth < 1024) {
        setHeight(600)
        return
      }

      setHeight(720)
    }

    updateHeight()
    window.addEventListener('resize', updateHeight)
    return () => window.removeEventListener('resize', updateHeight)
  }, [])

  return height
}

export default function PdfPreview({ data, templateId, density }: PdfPreviewProps) {
  const layout = useMemo(() => computePdfLayout(data, density), [data, density])
  const height = usePreviewHeight()

  return (
    <div className="overflow-hidden rounded-2xl border border-[var(--hairline)] bg-[var(--canvas-soft)]">
      <PDFViewer width="100%" height={height} showToolbar={false} className="border-0">
        <Document>
          {renderCoverLetterDocument(templateId, { data, layout })}
        </Document>
      </PDFViewer>
    </div>
  )
}
