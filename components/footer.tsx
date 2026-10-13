"use client"

import { useLang } from "@/context/language-context"

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative mt-4 py-8">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.15), transparent)" }}
        aria-hidden="true"
      />
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 sm:flex-row sm:px-6 lg:px-8">
        <span className="font-mono text-sm text-slate-700">
          <span className="text-[#06b6d4]/60">&lt;</span>IkerGarcía<span className="text-[#06b6d4]/60">&gt;/</span>
        </span>
        <p className="text-center text-sm text-slate-700">
          &copy; {CURRENT_YEAR} Iker García Fernández &mdash;{" "}
          {t("Built with Next.js & Tailwind.", "Hecho con Next.js y Tailwind.")}
        </p>
        <span className="font-mono text-xs text-slate-800">
          {t("Designed & developed by Iker", "Diseñado y desarrollado por Iker")}
        </span>
      </div>
    </footer>
  )
}
