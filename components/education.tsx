"use client"

import Image from "next/image"
import { useLang } from "@/context/language-context"
import { CheckCircle2 } from "lucide-react"
import SectionHeader from "@/components/section-header"

interface EducationItem {
  logo: string
  logoAlt: string
  type: { en: string; es: string }
  title: { en: string; es: string }
  institution: string
  status: "in-progress" | "completed"
}

const EDUCATION: EducationItem[] = [
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/imf-hgCBw2iMuOsz3xgZOzv2xslu8D2jFe.png",
    logoAlt: "IMF Smart Education × UCAV",
    type: { en: "Master's Degree", es: "Máster" },
    title: { en: "Cybersecurity", es: "Ciberseguridad" },
    institution: "IMF Smart Education × Deloitte",
    status: "in-progress",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/fedeto-tWxMAErRna712kI8p8f4pvmjl75rI4.png",
    logoAlt: "Fedeto — CEOE · CEPYME",
    type: { en: "Specialization Course", es: "Curso de Especialización" },
    title: { en: "Artificial Intelligence", es: "Inteligencia Artificial" },
    institution: "Fedeto Business School",
    status: "in-progress",
  },
  {
    logo: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/ribera-nn4AHt7hhpgK7Ak0ivE02Q5JA47c9x.png",
    logoAlt: "IES Ribera del Tajo",
    type: { en: "Professional Degree", es: "Grado Superior" },
    title: {
      en: "Networked Computer Systems Administration (ASIR)",
      es: "Administración de Sistemas Informáticos en Red (ASIR)",
    },
    institution: "IES Ribera del Tajo",
    status: "completed",
  },
]

export default function Education() {
  const { t } = useLang()

  return (
    <section id="education" className="relative py-28" aria-label="Education">
      {/* Subtle top glow to blend with previous section */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader number="01" en="Education" es="Formación" />

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {EDUCATION.map((item) => (
            <article
              key={item.institution}
              className="group relative bg-[#111827]/60 backdrop-blur-sm rounded-2xl border border-[#1e293b] p-6 card-hover flex flex-col overflow-hidden"
            >
              {/* Inner glow on hover */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl pointer-events-none"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(6,182,212,0.06) 0%, transparent 60%)" }}
                aria-hidden="true"
              />

              {/* Logo */}
              <div className="bg-white rounded-xl p-5 h-32 flex items-center justify-center mb-6 overflow-hidden">
                <Image
                  src={item.logo}
                  alt={item.logoAlt}
                  width={200}
                  height={100}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Content */}
              <div className="flex-1 relative">
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest mb-2 block text-[#06b6d4]/70">
                  {t(item.type.en, item.type.es)}
                </span>
                <h3 className="text-lg font-bold text-white leading-snug mb-2">
                  {t(item.title.en, item.title.es)}
                </h3>
                <p className="text-slate-500 text-sm">{item.institution}</p>
              </div>

              {/* Status badge — no hard border, just spacing */}
              <div className="pt-5 mt-5 relative">
                {item.status === "in-progress" ? (
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-[#06b6d4]/10 text-[#06b6d4] rounded-full border border-[#06b6d4]/15">
                    <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full pulse-dot" aria-hidden="true" />
                    {t("In Progress", "En Curso")}
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-3 py-1.5 bg-white/5 text-slate-400 rounded-full border border-white/8">
                    <CheckCircle2 size={11} aria-hidden="true" />
                    {t("Completed", "Completado")}
                  </span>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
