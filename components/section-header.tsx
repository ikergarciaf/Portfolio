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
    <div className="mb-14 flex items-center gap-6">
      <h2 className="shrink-0 whitespace-nowrap text-3xl font-bold text-white">
        <span className="mr-2 font-mono text-[#06b6d4] opacity-70">{number}.</span>
        {t(en, es)}
      </h2>
      <div
        className="h-px flex-1"
        style={{ background: "linear-gradient(to right, rgba(51,65,85,0.6), transparent)" }}
        aria-hidden="true"
      />
    </div>
  )
}
