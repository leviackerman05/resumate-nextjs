'use client'

import { TEMPLATE_OPTIONS, type TemplateId } from '@/lib/types'

interface TemplatePickerProps {
  value: TemplateId
  onChange: (value: TemplateId) => void
}

export default function TemplatePicker({ value, onChange }: TemplatePickerProps) {
  return (
    <div>
      <label className="mb-3 block text-sm font-medium text-[var(--ink)]">Template</label>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATE_OPTIONS.map((option) => {
          const selected = value === option.value

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(option.value)}
              className={`rounded-2xl border p-3 text-left transition ${
                selected
                  ? 'border-[var(--ink)] bg-[var(--canvas-soft)] ring-1 ring-[var(--ink)]'
                  : 'border-[var(--hairline)] hover:border-[var(--hairline-strong)] hover:bg-[var(--canvas-soft)]'
              }`}
            >
              <div
                className="mb-3 h-14 w-full overflow-hidden rounded-lg border border-[var(--hairline)] sm:h-16"
                style={{ background: option.preview }}
              />
              <p className="text-sm font-medium text-[var(--ink)]">{option.label}</p>
              <p className="mt-1 text-xs leading-4 text-[var(--mute)]">{option.description}</p>
            </button>
          )
        })}
      </div>
    </div>
  )
}
