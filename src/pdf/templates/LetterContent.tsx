import { Text } from '@react-pdf/renderer'
import type { CoverLetterData } from '@/lib/types'
import type { PdfLayout } from '@/lib/pdf-fit'
import { sharedStyles } from './shared'

interface LetterContentProps {
  data: CoverLetterData
  layout: PdfLayout
  subjectPrefix?: string
  closingLine?: string
  textColor?: string
  mutedColor?: string
}

export function LetterContent({
  data,
  layout,
  subjectPrefix = 'RE:',
  closingLine = 'Sincerely,',
  textColor = '#171717',
  mutedColor = '#4d4d4d',
}: LetterContentProps) {
  const styles = sharedStyles(layout)

  return (
    <>
      <Text style={{ ...styles.section, color: textColor }}>{data.date}</Text>
      <Text style={{ ...styles.section, color: textColor }}>{data.recipient}</Text>
      <Text style={{ ...styles.section, color: textColor }}>{data.company}</Text>
      {data.companyAddress ? (
        <Text style={{ ...styles.section, color: textColor }}>{data.companyAddress}</Text>
      ) : null}
      <Text style={{ ...styles.section, fontFamily: 'Helvetica-Bold', color: textColor }}>
        {subjectPrefix} {data.jobTitle}
      </Text>
      <Text style={{ ...styles.section, color: textColor }}>{data.salutation}</Text>
      {data.paragraphs.map((paragraph, index) => (
        <Text key={index} style={{ ...styles.paragraph, color: textColor }}>
          {paragraph}
        </Text>
      ))}
      <Text style={{ ...styles.paragraph, color: textColor }}>{data.closing}</Text>
      <Text style={{ ...styles.section, color: mutedColor }}>{closingLine}</Text>
      <Text style={{ ...styles.signature, color: textColor }}>{data.signature}</Text>
    </>
  )
}

export function contactLine(data: CoverLetterData, separator = ' · ') {
  return [data.email, data.phone, data.location].filter(Boolean).join(separator)
}
