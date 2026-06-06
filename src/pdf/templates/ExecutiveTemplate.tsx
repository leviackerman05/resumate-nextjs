import { Page, Text, View } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { sharedStyles } from './shared'

export function ExecutiveTemplate({ data, layout }: TemplateProps) {
  const styles = sharedStyles(layout)
  const contact = [data.email, data.phone, data.location].filter(Boolean).join(' · ')

  return (
    <Page size="LETTER" style={styles.page}>
      <View style={{ borderBottomWidth: 1, borderBottomColor: '#171717', paddingBottom: 8, marginBottom: layout.sectionGap + 6 }}>
        <Text style={{ fontSize: layout.headerSize + 3, fontFamily: 'Times-Bold' }}>{data.candidateName}</Text>
        {contact ? <Text style={{ ...styles.headerMeta, fontFamily: 'Times-Roman', marginTop: 4 }}>{contact}</Text> : null}
      </View>
      <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>{data.date}</Text>
      <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>{data.recipient}</Text>
      <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>{data.company}</Text>
      {data.companyAddress ? (
        <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>{data.companyAddress}</Text>
      ) : null}
      <Text style={{ ...styles.section, fontFamily: 'Times-Bold', marginTop: layout.sectionGap + 2 }}>
        Re: {data.jobTitle}
      </Text>
      <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>{data.salutation}</Text>
      {data.paragraphs.map((paragraph, index) => (
        <Text key={index} style={{ ...styles.paragraph, fontFamily: 'Times-Roman' }}>
          {paragraph}
        </Text>
      ))}
      <Text style={{ ...styles.paragraph, fontFamily: 'Times-Roman' }}>{data.closing}</Text>
      <Text style={{ ...styles.section, fontFamily: 'Times-Roman' }}>Respectfully,</Text>
      <Text style={{ ...styles.signature, fontFamily: 'Times-Bold' }}>{data.signature}</Text>
    </Page>
  )
}
