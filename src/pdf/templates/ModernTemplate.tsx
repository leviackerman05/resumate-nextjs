import { Page, Text, View } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { sharedStyles } from './shared'

export function ModernTemplate({ data, layout }: TemplateProps) {
  const styles = sharedStyles(layout)
  const contact = [data.email, data.phone, data.location].filter(Boolean).join(' | ')

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={{ backgroundColor: '#171717', color: '#ffffff', padding: 16, marginBottom: layout.sectionGap + 4, marginHorizontal: -layout.margin, marginTop: -layout.margin, paddingHorizontal: layout.margin }}>
        <Text style={{ fontSize: layout.headerSize + 4, fontFamily: 'Helvetica-Bold', textAlign: 'center' }}>
          {data.candidateName.toUpperCase()}
        </Text>
        {contact ? (
          <Text style={{ fontSize: layout.fontSize - 1, textAlign: 'center', marginTop: 4, color: '#f5f5f5' }}>
            {contact}
          </Text>
        ) : null}
      </View>

      <Text style={styles.section}>{data.date}</Text>
      <Text style={styles.section}>{data.recipient}</Text>
      <Text style={styles.section}>{data.company}</Text>
      {data.companyAddress ? <Text style={styles.section}>{data.companyAddress}</Text> : null}
      <Text style={{ ...styles.section, fontFamily: 'Helvetica-Bold' }}>RE: {data.jobTitle}</Text>
      <Text style={styles.section}>{data.salutation}</Text>
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
