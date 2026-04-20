"use client"

import { useLang } from "@/context/language-context"
import { ArrowUpRight, FileText } from "lucide-react"
import SectionHeader from "@/components/section-header"

interface Project {
  icon: React.ReactNode
  iconBadge: React.ReactNode
  title: { en: string; es: string }
  description: { en: string; es: string }
  tech: readonly string[]
  link?: { href: string; label: string; icon: React.ReactNode }
}

const PROJECTS: Project[] = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-14 h-14 text-slate-700 group-hover:text-[#06b6d4] transition-all duration-500 group-hover:scale-110"
        aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    iconBadge: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#06b6d4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
      </svg>
    ),
    title: { en: "CD Puebla Sport", es: "CD Puebla Sport" },
    description: {
      en: "Full web platform for a sports club — custom design, performance optimization, and secure hosting deployment.",
      es: "Plataforma web completa para un club deportivo — diseño personalizado, optimización de rendimiento y despliegue seguro.",
    },
    tech: ["Laravel", "Tailwind CSS", "Web Hosting", "MySQL"],
    link: { href: "https://sport.cdpuebla.es", label: "sport.cdpuebla.es", icon: <ArrowUpRight size={15} aria-hidden="true" /> },
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor"
        strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
        className="w-14 h-14 text-slate-700 group-hover:text-[#06b6d4] transition-all duration-500 group-hover:scale-110"
        aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    iconBadge: (
      <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#06b6d4]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    title: { en: "Pentesting & Security Audit", es: "Pentesting y Auditoría de Seguridad" },
    description: {
      en: "Full ethical hacking cycle: OSINT, black-box reconnaissance, vulnerability analysis (Command Injection, FTP anon, XSS), and privilege escalation to root — 9 flags captured.",
      es: "Ciclo completo de hacking ético: OSINT, reconocimiento caja negra, análisis de vulnerabilidades (Inyección de comandos, FTP anónimo, XSS) y escalada de privilegios a root — 9 flags capturadas.",
    },
    tech: ["Nmap", "Burp Suite", "Nikto", "Linux", "OSINT", "Kali Linux"],
    link: { href: "/Auditoria.pdf", label: "View PDF Report", icon: <FileText size={15} aria-hidden="true" /> },
  },
]

export default function Projects() {
  const { t } = useLang()

  return (
    <section id="projects" className="relative py-28" aria-label="Projects">
      <div
        className="absolute top-0 right-0 w-[350px] h-[350px] pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.05) 0%, transparent 70%)" }}
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader number="02" en="Technical Projects" es="Proyectos Técnicos" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {PROJECTS.map((project) => (
            <article
              key={project.title.en}
              className="group bg-[#111827]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#1e293b] card-hover relative"
            >
              {/* Banner */}
              <div className="h-44 flex justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0f172a]/80 to-[#111827]/40">
                {project.icon}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at 50% 60%, rgba(6,182,212,0.1) 0%, transparent 65%)" }}
                  aria-hidden="true"
                />
              </div>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <div className="p-2 rounded-lg bg-[#06b6d4]/10 border border-[#06b6d4]/15">
                    {project.iconBadge}
                  </div>
                  {project.link && (
                    <a
                      href={project.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-slate-500 hover:text-[#06b6d4] text-xs transition-colors font-mono"
                      aria-label={`Open ${project.title.en}`}
                    >
                      {project.link.icon}
                      {project.link.label}
                    </a>
                  )}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#06b6d4] transition-colors duration-300">
                  {t(project.title.en, project.title.es)}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {t(project.description.en, project.description.es)}
                </p>

                <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
                  {project.tech.map((tech) => (
                    <li key={tech} className="font-mono text-xs text-[#06b6d4] bg-[#06b6d4]/8 border border-[#06b6d4]/12 px-2 py-0.5 rounded">
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <p className="text-center text-slate-700 font-mono text-sm mt-12">
          <span className="text-[#06b6d4]/60">{"// "}</span>
          {t("More projects coming soon...", "Más proyectos próximamente...")}
        </p>
      </div>
    </section>
  )
}
