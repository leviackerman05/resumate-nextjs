export function sanitizeText(text: string): string {
  return text
    .replace(/[\u2014\u2013]/g, '-')
    .replace(/\s+-\s+/g, ', ')
    .replace(/\s{2,}/g, ' ')
    .trim()
}

export function sanitizeCoverLetterValue<T extends string | string[]>(value: T): T {
  if (Array.isArray(value)) {
    return value.map((item) => sanitizeText(item)).filter(Boolean) as T
  }

  return sanitizeText(value) as T
}

export function countWords(text: string): number {
  return text
    .trim()
    .split(/\s+/)
    .filter(Boolean).length
}

export function getTotalWordCount(data: {
  paragraphs: string[]
  salutation?: string
  closing?: string
}): number {
  const parts = [
    data.salutation ?? '',
    ...data.paragraphs,
    data.closing ?? '',
  ]

  return countWords(parts.join(' '))
}
