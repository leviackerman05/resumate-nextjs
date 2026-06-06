import { StyleSheet } from '@react-pdf/renderer'
import type { CoverLetterData } from '@/lib/types'
import type { PdfLayout } from '@/lib/pdf-fit'

export interface TemplateProps {
  data: CoverLetterData
  layout: PdfLayout
}

export function sharedStyles(layout: PdfLayout) {
  return StyleSheet.create({
    page: {
      fontFamily: 'Helvetica',
      fontSize: layout.fontSize,
      lineHeight: layout.lineHeight / layout.fontSize,
      color: '#171717',
      paddingTop: layout.margin,
      paddingBottom: layout.margin,
      paddingHorizontal: layout.margin,
    },
    headerName: {
      fontSize: layout.headerSize + 2,
      fontFamily: 'Helvetica-Bold',
      marginBottom: 4,
    },
    headerMeta: {
      fontSize: layout.fontSize - 1,
      color: '#4d4d4d',
      marginBottom: layout.sectionGap,
    },
    section: {
      marginBottom: layout.sectionGap,
    },
    label: {
      fontFamily: 'Helvetica-Bold',
    },
    paragraph: {
      marginBottom: layout.sectionGap,
      textAlign: 'justify',
    },
    signature: {
      marginTop: layout.sectionGap,
      fontFamily: 'Helvetica-Bold',
    },
  })
}
