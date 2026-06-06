import { Page, Text } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { sharedStyles } from './shared'

export function MinimalTemplate({ data, layout }: TemplateProps) {
  const styles = sharedStyles(layout)
  const contact = [data.email, data.location].filter(Boolean).join(' | ')

  return (
    <Page size="LETTER" style={{ ...styles.page, fontFamily: 'Courier' }}>
      <Text style={{ fontSize: layout.headerSize, fontFamily: 'Courier-Bold', marginBottom: 4 }}>
        {data.candidateName}
      </Text>
      {contact ? <Text style={{ ...styles.headerMeta, fontFamily: 'Courier' }}>{contact}</Text> : null}
      <Text style={styles.section}>{data.date}</Text>
      <Text style={styles.section}>{data.company}</Text>
      <Text style={styles.section}>{data.jobTitle}</Text>
      <Text style={{ ...styles.section, marginTop: layout.sectionGap + 2 }}>{data.salutation}</Text>
      {data.paragraphs.map((paragraph, index) => (
        <Text key={index} style={{ ...styles.paragraph, textAlign: 'left' }}>
          {paragraph}
        </Text>
      ))}
      <Text style={styles.paragraph}>{data.closing}</Text>
      <Text style={styles.section}>Best regards,</Text>
      <Text style={{ ...styles.signature, fontFamily: 'Courier-Bold' }}>{data.signature}</Text>
    </Page>
  )
}
