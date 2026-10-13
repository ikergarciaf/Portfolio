"use client"

import { useLang } from "@/context/language-context"
import { Mail, Linkedin, Github, Send, FileText } from "lucide-react"

export default function Contact() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative py-28" aria-label="Contact">
      {/* Central ambient glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(6,182,212,0.07) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
        {/* Section label */}
        <p className="font-mono text-[#06b6d4]/70 text-xs uppercase tracking-widest mb-4">
          <span className="opacity-60"></span>{" "}
          {t("Get in touch", "Ponte en contacto")}
        </p>

        <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
          {t("Let's Work", "Trabajemos")}{" "}
          <span className="text-[#06b6d4] glow-cyan">{t("Together", "Juntos")}</span>
        </h2>

        <p className="text-slate-400 text-base leading-relaxed mb-12 max-w-lg mx-auto">
          {t(
            "I'm looking for my first role in cybersecurity: pentesting, offensive security or web application security. If my profile fits your team, let's talk.",
            "Busco mi primer puesto en ciberseguridad: pentesting, seguridad ofensiva o seguridad de aplicaciones web. Si mi perfil encaja con tu equipo, hablemos."
          )}
        </p>

        {/* Main CTA */}
        <a
          href="mailto:ikergarciafdez1@gmail.com"
          className="group inline-flex items-center gap-3 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0b1120] font-bold py-4 px-12 rounded-xl transition-all duration-200 text-base shadow-[0_0_32px_rgba(6,182,212,0.35)] hover:shadow-[0_0_48px_rgba(6,182,212,0.55)] hover:scale-105"
        >
          <Send size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" aria-hidden="true" />
          {t("Contact Me", "Contáctame")}
        </a>

        <div className="mt-4 mb-16">
          <a
            href={t("/CV_IkerGarcia_EN.pdf", "/CV_IkerGarcia.pdf")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#06b6d4] font-mono text-sm transition-colors"
          >
            <FileText size={16} aria-hidden="true" />
            {t("Download CV (PDF)", "Descargar CV (PDF)")}
          </a>
        </div>

        {/* Social links */}
        <div className="flex items-center justify-center gap-6">
          {[
            {
              href: "https://www.linkedin.com/in/ikergarciaf",
              label: "LinkedIn",
              icon: <Linkedin size={20} aria-hidden="true" />,
              external: true,
            },
            {
              href: "https://github.com/ikergarciaf",
              label: "GitHub",
              icon: <Github size={20} aria-hidden="true" />,
              external: true,
            },
            {
              href: "mailto:ikergarciafdez1@gmail.com",
              label: "Email",
              icon: <Mail size={20} aria-hidden="true" />,
              external: false,
            },
          ].map(({ href, label, icon, external }) => (
            <a
              key={label}
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              aria-label={label}
              className="flex flex-col items-center gap-2 text-slate-600 hover:text-[#06b6d4] transition-all duration-200 hover:-translate-y-1"
            >
              <div className="p-3 rounded-xl border border-[#1e293b] hover:border-[#06b6d4]/30 bg-[#111827]/60 hover:bg-[#06b6d4]/8 transition-all duration-200">
                {icon}
              </div>
              <span className="font-mono text-xs">{label}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
