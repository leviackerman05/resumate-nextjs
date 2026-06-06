export type Tone = 'professional' | 'enthusiastic' | 'formal' | 'conversational'
export type Length = 'short' | 'standard' | 'long'
export type Density = 'compact' | 'standard' | 'spacious'
export type TemplateId =
  | 'modern'
  | 'classic'
  | 'minimal'
  | 'executive'
  | 'accent'
  | 'sidebar'
  | 'gradient'
  | 'elegant'
  | 'corporate'
  | 'creative'
  | 'professional'
  | 'monochrome'

export interface CoverLetterData {
  candidateName: string
  email: string
  phone: string
  location: string
  recipient: string
  company: string
  companyAddress: string
  jobTitle: string
  date: string
  salutation: string
  paragraphs: string[]
  closing: string
  signature: string
}

export interface GenerateOptions {
  tone: Tone
  length: Length
  resumeText: string
  jdText: string
}

export interface UsageInfo {
  used: number
  remaining: number
  limit: number
  unlimited?: boolean
}

export const TONE_OPTIONS: { value: Tone; label: string }[] = [
  { value: 'professional', label: 'Professional' },
  { value: 'enthusiastic', label: 'Enthusiastic' },
  { value: 'formal', label: 'Formal' },
  { value: 'conversational', label: 'Conversational' },
]

export const LENGTH_OPTIONS: { value: Length; label: string }[] = [
  { value: 'short', label: 'Short (~250 words)' },
  { value: 'standard', label: 'Standard (~320 words)' },
  { value: 'long', label: 'Long (~380 words)' },
]

export const DENSITY_OPTIONS: { value: Density; label: string }[] = [
  { value: 'compact', label: 'Compact' },
  { value: 'standard', label: 'Standard' },
  { value: 'spacious', label: 'Spacious' },
]

export const TEMPLATE_OPTIONS: { value: TemplateId; label: string; description: string; preview: string }[] = [
  { value: 'modern', label: 'Modern', description: 'Bold dark header bar', preview: 'linear-gradient(180deg,#171717 40%,#fff 40%)' },
  { value: 'classic', label: 'Classic', description: 'Traditional business letter', preview: 'linear-gradient(180deg,#fff 100%,#fff 100%)' },
  { value: 'minimal', label: 'Minimal ATS', description: 'Plain, ATS-friendly', preview: '#ffffff' },
  { value: 'executive', label: 'Executive', description: 'Refined serif styling', preview: 'linear-gradient(180deg,#fafafa 100%,#fff 100%)' },
  { value: 'accent', label: 'Accent', description: 'Blue accent sidebar line', preview: 'linear-gradient(90deg,#0070f3 4%,#fff 4%)' },
  { value: 'sidebar', label: 'Sidebar', description: 'Dark sidebar with contact info', preview: 'linear-gradient(90deg,#171717 32%,#fff 32%)' },
  { value: 'gradient', label: 'Gradient', description: 'Colorful header, card body', preview: 'linear-gradient(135deg,#0070f3,#7928ca,#db2777)' },
  { value: 'elegant', label: 'Elegant', description: 'Parchment frame and warm tones', preview: 'linear-gradient(180deg,#f7f3ea 100%,#fffdf8 100%)' },
  { value: 'corporate', label: 'Corporate', description: 'Navy header, light blue page', preview: 'linear-gradient(180deg,#0f2d52 18%,#eef4fb 18%)' },
  { value: 'creative', label: 'Creative', description: 'Soft purple with accent card', preview: 'linear-gradient(180deg,#f5f3ff 100%,#fff 60%)' },
  { value: 'professional', label: 'Professional', description: 'Clean gray content panel', preview: 'linear-gradient(180deg,#fff 55%,#f9fafb 55%)' },
  { value: 'monochrome', label: 'Monochrome', description: 'Dark frame, white letter card', preview: 'linear-gradient(180deg,#111 30%,#fff 30%)' },
]

export const DAILY_GENERATION_LIMIT = 5
