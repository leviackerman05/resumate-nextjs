import type { ReactElement } from 'react'
import type { TemplateId } from '@/lib/types'
import type { TemplateProps } from './shared'
import { ModernTemplate } from './ModernTemplate'
import { ClassicTemplate } from './ClassicTemplate'
import { MinimalTemplate } from './MinimalTemplate'
import { ExecutiveTemplate } from './ExecutiveTemplate'
import { AccentTemplate } from './AccentTemplate'
import {
  SidebarTemplate,
  GradientTemplate,
  ElegantTemplate,
  CorporateTemplate,
  CreativeTemplate,
  ProfessionalTemplate,
  MonochromeTemplate,
} from './BackgroundTemplates'

export function renderCoverLetterDocument(
  templateId: TemplateId,
  props: TemplateProps
): ReactElement {
  switch (templateId) {
    case 'classic':
      return <ClassicTemplate {...props} />
    case 'minimal':
      return <MinimalTemplate {...props} />
    case 'executive':
      return <ExecutiveTemplate {...props} />
    case 'accent':
      return <AccentTemplate {...props} />
    case 'sidebar':
      return <SidebarTemplate {...props} />
    case 'gradient':
      return <GradientTemplate {...props} />
    case 'elegant':
      return <ElegantTemplate {...props} />
    case 'corporate':
      return <CorporateTemplate {...props} />
    case 'creative':
      return <CreativeTemplate {...props} />
    case 'professional':
      return <ProfessionalTemplate {...props} />
    case 'monochrome':
      return <MonochromeTemplate {...props} />
    case 'modern':
    default:
      return <ModernTemplate {...props} />
  }
}
