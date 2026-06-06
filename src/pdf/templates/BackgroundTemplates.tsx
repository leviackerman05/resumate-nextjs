import { Page, Text, View, Svg, Defs, LinearGradient, Stop, Rect } from '@react-pdf/renderer'
import type { TemplateProps } from './shared'
import { LetterContent, contactLine } from './LetterContent'

export function SidebarTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data, '\n')

  return (
    <Page size="LETTER" style={{ fontFamily: 'Helvetica', fontSize: layout.fontSize }}>
      <View style={{ flexDirection: 'row', minHeight: '100%' }}>
        <View
          style={{
            width: '32%',
            backgroundColor: '#171717',
            paddingTop: layout.margin,
            paddingHorizontal: 20,
            paddingBottom: layout.margin,
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontFamily: 'Helvetica-Bold',
              fontSize: layout.headerSize + 2,
              marginBottom: 12,
            }}
          >
            {data.candidateName}
          </Text>
          {contact ? (
            <Text style={{ color: '#d4d4d4', fontSize: layout.fontSize - 1, lineHeight: 1.5 }}>
              {contact}
            </Text>
          ) : null}
          <View style={{ marginTop: 24, height: 3, width: 36, backgroundColor: '#0070f3' }} />
        </View>
        <View
          style={{
            width: '68%',
            paddingTop: layout.margin,
            paddingBottom: layout.margin,
            paddingHorizontal: layout.margin - 8,
            backgroundColor: '#ffffff',
          }}
        >
          <LetterContent data={data} layout={layout} />
        </View>
      </View>
    </Page>
  )
}

export function GradientTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)
  const headerHeight = 96

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: 'Helvetica',
        fontSize: layout.fontSize,
        backgroundColor: '#f8fafc',
        paddingTop: headerHeight + 24,
        paddingBottom: layout.margin,
        paddingHorizontal: layout.margin,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: headerHeight,
        }}
      >
        <Svg width="612" height={headerHeight} viewBox="0 0 612 96">
          <Defs>
            <LinearGradient id="headerGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor="#0070f3" />
              <Stop offset="50%" stopColor="#5b21b6" />
              <Stop offset="100%" stopColor="#db2777" />
            </LinearGradient>
          </Defs>
          <Rect x="0" y="0" width="612" height="96" fill="url(#headerGrad)" />
        </Svg>
        <View style={{ position: 'absolute', top: 22, left: layout.margin, right: layout.margin }}>
          <Text style={{ color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: layout.headerSize + 4 }}>
            {data.candidateName}
          </Text>
          {contact ? (
            <Text style={{ color: '#f5f5f5', fontSize: layout.fontSize - 1, marginTop: 4 }}>{contact}</Text>
          ) : null}
        </View>
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          borderRadius: 6,
          padding: 20,
          borderWidth: 1,
          borderColor: '#e2e8f0',
        }}
      >
        <LetterContent data={data} layout={layout} />
      </View>
    </Page>
  )
}

export function ElegantTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: 'Times-Roman',
        fontSize: layout.fontSize,
        backgroundColor: '#f7f3ea',
        padding: layout.margin - 8,
      }}
    >
      <View
        style={{
          flex: 1,
          borderWidth: 1,
          borderColor: '#c9b896',
          padding: layout.margin - 4,
          backgroundColor: '#fffdf8',
        }}
      >
        <View style={{ borderBottomWidth: 1, borderBottomColor: '#e8dcc8', paddingBottom: 10, marginBottom: layout.sectionGap + 4 }}>
          <Text style={{ fontFamily: 'Times-Bold', fontSize: layout.headerSize + 3, color: '#2c2416' }}>
            {data.candidateName}
          </Text>
          {contact ? (
            <Text style={{ fontFamily: 'Times-Roman', fontSize: layout.fontSize - 1, color: '#6b5c45', marginTop: 4 }}>
              {contact}
            </Text>
          ) : null}
        </View>
        <LetterContent
          data={data}
          layout={layout}
          textColor="#2c2416"
          mutedColor="#6b5c45"
          closingLine="Warm regards,"
        />
      </View>
    </Page>
  )
}

export function CorporateTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: 'Helvetica',
        fontSize: layout.fontSize,
        backgroundColor: '#eef4fb',
      }}
    >
      <View style={{ backgroundColor: '#0f2d52', paddingVertical: 18, paddingHorizontal: layout.margin }}>
        <Text style={{ color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: layout.headerSize + 3 }}>
          {data.candidateName}
        </Text>
        {contact ? (
          <Text style={{ color: '#cbd5e1', fontSize: layout.fontSize - 1, marginTop: 4 }}>{contact}</Text>
        ) : null}
      </View>
      <View style={{ height: 4, backgroundColor: '#0070f3' }} />
      <View style={{ paddingTop: layout.margin, paddingBottom: layout.margin, paddingHorizontal: layout.margin }}>
        <LetterContent data={data} layout={layout} subjectPrefix="Application:" closingLine="Respectfully," />
      </View>
    </Page>
  )
}

export function CreativeTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: 'Helvetica',
        fontSize: layout.fontSize,
        backgroundColor: '#f5f3ff',
        paddingTop: layout.margin,
        paddingBottom: layout.margin,
        paddingHorizontal: layout.margin,
      }}
    >
      <View
        style={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: 120,
          height: 120,
          backgroundColor: '#ddd6fe',
          opacity: 0.7,
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: 40,
          left: 0,
          width: 80,
          height: 80,
          backgroundColor: '#fbcfe8',
          opacity: 0.6,
        }}
      />
      <View
        style={{
          backgroundColor: '#ffffff',
          borderLeftWidth: 5,
          borderLeftColor: '#7c3aed',
          padding: 22,
          borderRadius: 4,
        }}
      >
        <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: layout.headerSize + 3, color: '#4c1d95', marginBottom: 4 }}>
          {data.candidateName}
        </Text>
        {contact ? (
          <Text style={{ fontSize: layout.fontSize - 1, color: '#6b7280', marginBottom: layout.sectionGap + 2 }}>
            {contact}
          </Text>
        ) : null}
        <LetterContent data={data} layout={layout} closingLine="Best," />
      </View>
    </Page>
  )
}

export function ProfessionalTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)

  return (
    <Page
      size="LETTER"
      style={{
        fontFamily: 'Helvetica',
        fontSize: layout.fontSize,
        backgroundColor: '#ffffff',
        paddingTop: layout.margin,
        paddingBottom: layout.margin,
        paddingHorizontal: layout.margin,
      }}
    >
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: layout.sectionGap + 6 }}>
        <View>
          <Text style={{ fontSize: layout.fontSize - 2, color: '#9ca3af', letterSpacing: 1.5 }}>
            COVER LETTER
          </Text>
          <Text style={{ fontFamily: 'Helvetica-Bold', fontSize: layout.headerSize + 4, color: '#111827', marginTop: 4 }}>
            {data.candidateName}
          </Text>
          {contact ? (
            <Text style={{ fontSize: layout.fontSize - 1, color: '#6b7280', marginTop: 4 }}>{contact}</Text>
          ) : null}
        </View>
      </View>
      <View style={{ height: 1, backgroundColor: '#e5e7eb', marginBottom: layout.sectionGap + 4 }} />
      <View style={{ backgroundColor: '#f9fafb', padding: 18, borderRadius: 4 }}>
        <LetterContent data={data} layout={layout} />
      </View>
    </Page>
  )
}

export function MonochromeTemplate({ data, layout }: TemplateProps) {
  const contact = contactLine(data)

  return (
    <Page size="LETTER" style={{ fontFamily: 'Helvetica', fontSize: layout.fontSize, backgroundColor: '#111111' }}>
      <View style={{ paddingTop: layout.margin, paddingHorizontal: layout.margin, paddingBottom: 12 }}>
        <Text style={{ color: '#ffffff', fontFamily: 'Helvetica-Bold', fontSize: layout.headerSize + 5 }}>
          {data.candidateName}
        </Text>
        {contact ? (
          <Text style={{ color: '#a3a3a3', fontSize: layout.fontSize - 1, marginTop: 6 }}>{contact}</Text>
        ) : null}
      </View>
      <View
        style={{
          backgroundColor: '#ffffff',
          marginHorizontal: 24,
          marginBottom: 24,
          padding: layout.margin - 8,
          borderRadius: 2,
        }}
      >
        <LetterContent data={data} layout={layout} />
      </View>
    </Page>
  )
}
