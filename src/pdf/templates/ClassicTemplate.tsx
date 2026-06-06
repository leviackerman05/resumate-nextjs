import { Page, Text } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { sharedStyles } from './shared'

export function ClassicTemplate({ data, layout }: TemplateProps) {
  const styles = sharedStyles(layout)
  const contact = [data.email, data.phone, data.location].filter(Boolean).join(' · ')

  return (
    <Page size="LETTER" style={styles.page}>
      <Text style={styles.headerName}>{data.candidateName}</Text>
      {contact ? <Text style={styles.headerMeta}>{contact}</Text> : null}
      <Text style={styles.section}>{data.date}</Text>
      <Text style={styles.section}>{data.recipient}</Text>
      <Text style={styles.section}>{data.company}</Text>
      {data.companyAddress ? <Text style={styles.section}>{data.companyAddress}</Text> : null}
      <Text style={{ ...styles.section, marginTop: layout.sectionGap + 2 }}>
        <Text style={styles.label}>Subject: </Text>
        Application for {data.jobTitle}
      </Text>
      <Text style={{ ...styles.section, marginTop: layout.sectionGap + 2 }}>{data.salutation}</Text>
      {data.paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
      <Text style={styles.paragraph}>{data.closing}</Text>
      <Text style={styles.section}>Sincerely,</Text>
      <Text style={styles.signature}>{data.signature}</Text>
    </Page>
  )
}
