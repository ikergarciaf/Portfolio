"use client"

import { useLang } from "@/context/language-context"

interface SectionHeaderProps {
  number: string
  en: string
  es: string
}

export default function SectionHeader({ number, en, es }: SectionHeaderProps) {
  const { t } = useLang()
  return (
    <div className="flex items-center gap-6 mb-14">
      <h2 className="text-3xl font-bold text-white flex-shrink-0 whitespace-nowrap">
        <span className="font-mono text-[#06b6d4] mr-2 opacity-70">{number}.</span>
        {t(en, es)}
      </h2>
      {/* Replaced hard line with soft gradient fade */}
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, rgba(51,65,85,0.6), transparent)" }}
        aria-hidden="true"
      />
    </div>
  )
}
