"use client"

import { useEffect, useState, useMemo } from "react"
import { useLang } from "@/context/language-context"
import { Github, FileText, ChevronDown } from "lucide-react"

const TERMINAL_LINES = {
  en: [
    "$ whoami",
    "> Iker García Fernández",
    "$ cat specialization.txt",
    "> Offensive Security · Pentesting · AI",
    "$ nmap -sV localhost",
    "> PORT 443 — SECURED ✓",
  ],
  es: [
    "$ whoami",
    "> Iker García Fernández",
    "$ cat especialización.txt",
    "> Seguridad Ofensiva · Pentesting · IA",
    "$ nmap -sV localhost",
    "> PUERTO 443 — ASEGURADO ✓",
  ],
} as const

const SKILLS = [
  "Penetration Testing",
  "Web App Security",
  "Android Security",
  "OWASP ZAP",
  "Burp Suite",
  "Nmap",
  "Metasploit",
  "Kali Linux",
  "OSINT",
  "Wireshark",
  "Linux",
  "Python",
  "Bash / PowerShell",
  "Docker",
] as const

const STATS = [
  { value: "9",  en: "Flags captured",        es: "Flags capturadas" },
  { value: "3",  en: "Security audits",       es: "Auditorías de seguridad" },
  { value: "12", en: "Web vulns exploited",   es: "Vulns. web explotadas" },
] as const

export default function Hero() {
  const { lang, t } = useLang()
  const [visibleLines, setVisibleLines] = useState(0)
  const [mounted, setMounted] = useState(false)

  const lines = useMemo(() => TERMINAL_LINES[lang], [lang])

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    setVisibleLines(0)
    if (!mounted) return
    const timers = lines.map((_, i) =>
      setTimeout(() => setVisibleLines(i + 1), i * 500 + 300)
    )
    return () => timers.forEach(clearTimeout)
  }, [mounted, lang, lines])

  return (
    <section
      id="about"
      className="relative min-h-screen flex flex-col justify-center pt-20 overflow-hidden"
      aria-label="About Iker García"
    >
      {/* Large ambient glow */}
      <div
        className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.09) 0%, transparent 68%)" }}
        aria-hidden="true"
      />
      {/* Secondary glow bottom-right */}
      <div
        className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

          {/* ── Left ────────────────────────────────────────── */}
          <div>
            {/* Status badge */}
            <div className="inline-flex items-center gap-2 bg-[#1e293b]/80 backdrop-blur-sm border border-[#06b6d4]/25 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#06b6d4] pulse-dot" aria-hidden="true" />
              <span className="font-mono text-[11px] text-[#06b6d4] uppercase tracking-widest font-bold">
                {t("Open to opportunities", "Disponible para oportunidades")}
              </span>
            </div>

            <p className="font-mono text-[#06b6d4] text-sm mb-3 tracking-wide">
              {t("Hello World, my name is", "Hola Mundo, mi nombre es")}
            </p>

            <h1 className="text-5xl md:text-[4.5rem] font-extrabold text-white tracking-tight leading-none mb-4">
              Iker García
            </h1>
            <h2 className="text-2xl md:text-4xl font-extrabold text-slate-400 mb-8 glow-cyan">
              {t("Cybersecurity Analyst", "Cybersecurity Analyst")}
            </h2>

            <p className="text-base text-slate-400 leading-relaxed max-w-lg mb-10">
              {t("I'm a ", "Soy analista de ")}
              <span className="text-[#06b6d4] font-semibold">
                {t("Cybersecurity Analyst", "Ciberseguridad")}
              </span>
              {t(
                " focused on offensive security, penetration testing and web and mobile application security. I document findings and remediation measures, and I bring applied AI and full-stack development to the table.",
                " especializado en seguridad ofensiva, pentesting y seguridad de aplicaciones web y móviles. Documento hallazgos y medidas de mitigación, y aporto IA aplicada y desarrollo full stack."
              )}
            </p>

            {/* Skill tags */}
            <div className="flex flex-wrap gap-2 mb-10" aria-label="Skills">
              {SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="rounded border border-[#06b6d4]/12 bg-[#06b6d4]/8 px-2 py-0.5 font-mono text-xs text-[#06b6d4]"
                >
                  {skill}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <a
                href={t("/CV_IkerGarcia_EN.pdf", "/CV_IkerGarcia.pdf")}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#06b6d4] hover:bg-[#22d3ee] text-[#0b1120] font-bold py-3 px-7 rounded-lg transition-all duration-200 shadow-[0_0_24px_rgba(6,182,212,0.3)] hover:shadow-[0_0_32px_rgba(6,182,212,0.5)]"
              >
                <FileText size={17} aria-hidden="true" />
                {t("View My CV", "Ver mi CV")}
              </a>
              <a
                href="https://github.com/ikergarciaf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-slate-600/70 hover:border-[#06b6d4] text-slate-300 hover:text-[#06b6d4] font-bold py-3 px-7 rounded-lg transition-all duration-200 bg-white/[0.02] hover:bg-[#06b6d4]/5"
              >
                <Github size={17} aria-hidden="true" />
                GitHub
              </a>
            </div>
          </div>

          {/* ── Right: terminal ─────────────────────────────── */}
          <div className="hidden lg:block" aria-hidden="true">
            <div className="bg-[#111827]/90 backdrop-blur-sm rounded-2xl border border-[#1e293b] overflow-hidden shadow-[0_0_60px_rgba(6,182,212,0.08)]">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-5 py-3.5 bg-[#0b1120]/80 border-b border-[#1e293b]">
                <span className="w-3 h-3 rounded-full bg-[#ef4444]/80" />
                <span className="w-3 h-3 rounded-full bg-[#f59e0b]/80" />
                <span className="w-3 h-3 rounded-full bg-[#22c55e]/80" />
                <span className="ml-4 font-mono text-xs text-slate-500">iker@kali:~$</span>
              </div>

              {/* Terminal output */}
              <div className="p-7 font-mono text-sm space-y-2.5 min-h-[240px]">
                {lines.slice(0, visibleLines).map((line, i) => (
                  <div key={i}>
                    {line.startsWith("$") ? (
                      <span className="text-[#22d3ee]">{line}</span>
                    ) : (
                      <span className="text-slate-300">{line}</span>
                    )}
                  </div>
                ))}
                {visibleLines < lines.length && (
                  <span className="text-[#06b6d4] cursor-blink"> </span>
                )}
              </div>
            </div>

            {/* Stat cards */}
            <div className="grid grid-cols-3 gap-3 mt-4">
              {STATS.map(({ value, en, es }) => (
                <div
                  key={value}
                  className="bg-[#111827]/70 backdrop-blur-sm border border-[#1e293b] rounded-xl p-4 text-center hover:border-[#06b6d4]/30 transition-all duration-300"
                >
                  <div className="text-2xl font-extrabold text-[#06b6d4] font-mono">{value}</div>
                  <div className="text-xs text-slate-500 mt-1">{t(en, es)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#education"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-slate-600 hover:text-[#06b6d4] transition-colors animate-bounce"
        aria-label="Scroll to Education"
      >
        <ChevronDown size={28} />
      </a>
    </section>
  )
}
