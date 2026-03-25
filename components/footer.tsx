"use client"

import { useLang } from "@/context/language-context"

const CURRENT_YEAR = new Date().getFullYear()

export default function Footer() {
  const { t } = useLang()

  return (
    <footer className="relative py-8 mt-4">
      {/* Subtle top fade — no hard line */}
      <div
        className="absolute top-0 inset-x-0 h-px pointer-events-none"
        style={{ background: "linear-gradient(to right, transparent, rgba(6,182,212,0.15), transparent)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
        <span className="font-mono text-slate-700 text-sm">
          <span className="text-[#06b6d4]/60">{"<"}</span>
          IkerGarcía
          <span className="text-[#06b6d4]/60">{">"}/</span>
        </span>
        <p className="text-slate-700 text-sm text-center">
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
