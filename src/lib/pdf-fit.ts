import type { Density } from './types'
import { getTotalWordCount } from './sanitize'
import type { CoverLetterData } from './types'

export interface PdfLayout {
  fontSize: number
  lineHeight: number
  margin: number
  headerSize: number
  sectionGap: number
}

export function computePdfLayout(data: CoverLetterData, density: Density): PdfLayout {
  const wordCount = getTotalWordCount(data)
  const baseFont =
    density === 'compact' ? 10 : density === 'spacious' ? 11.5 : 10.5

  let fontSize = baseFont

  if (wordCount > 300) fontSize -= 0.5
  if (wordCount > 360) fontSize -= 0.5
  if (wordCount > 420) fontSize -= 0.5
  if (wordCount < 240) fontSize += 0.5

  const margin =
    density === 'compact' ? 44 : density === 'spacious' ? 68 : 56

  return {
    fontSize,
    lineHeight: fontSize * 1.45,
    margin,
    headerSize: fontSize + 5,
    sectionGap: density === 'compact' ? 8 : density === 'spacious' ? 14 : 10,
  }
}

export function estimatePageFit(data: CoverLetterData, density: Density) {
  const wordCount = getTotalWordCount(data)
  const layout = computePdfLayout(data, density)
  const estimatedLines = Math.ceil(wordCount / 12)
  const maxLines =
    density === 'compact' ? 52 : density === 'spacious' ? 42 : 48

  return {
    wordCount,
    fitsOnOnePage: estimatedLines <= maxLines,
    layout,
  }
}
