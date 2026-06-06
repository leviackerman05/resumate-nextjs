import { Page, Text, View } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { sharedStyles } from './shared'

export function AccentTemplate({ data, layout }: TemplateProps) {
  const styles = sharedStyles(layout)
  const contact = [data.email, data.phone, data.location].filter(Boolean).join(' · ')

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={{ flexDirection: 'row', marginBottom: layout.sectionGap + 8 }}>
        <View style={{ width: 4, backgroundColor: '#0070f3', marginRight: 12 }} />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>{data.candidateName}</Text>
          {contact ? <Text style={styles.headerMeta}>{contact}</Text> : null}
        </View>
      </View>
      <Text style={styles.section}>{data.date}</Text>
      <Text style={styles.section}>{data.recipient}</Text>
      <Text style={styles.section}>{data.company}</Text>
      {data.companyAddress ? <Text style={styles.section}>{data.companyAddress}</Text> : null}
      <Text style={{ ...styles.section, color: '#0070f3', fontFamily: 'Helvetica-Bold' }}>
        {data.jobTitle}
      </Text>
      <Text style={{ ...styles.section, marginTop: layout.sectionGap + 2 }}>{data.salutation}</Text>
      {data.paragraphs.map((paragraph, index) => (
        <Text key={index} style={styles.paragraph}>
          {paragraph}
        </Text>
      ))}
      <Text style={styles.paragraph}>{data.closing}</Text>
      <Text style={styles.section}>Kind regards,</Text>
      <Text style={styles.signature}>{data.signature}</Text>
    </Page>
  )
}
