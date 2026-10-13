"use client"

import { useLang } from "@/context/language-context"
import {
  ArrowUpRight,
  FileText,
  Github,
  ShieldCheck,
  Globe,
  Smartphone,
  Stethoscope,
  Bot,
} from "lucide-react"
import type { LucideIcon } from "lucide-react"
import SectionHeader from "@/components/section-header"
import Link from "next/link"

interface Project {
  Icon: LucideIcon
  category: { en: string; es: string }
  title: { en: string; es: string }
  description: { en: string; es: string }
  tech: readonly string[]
  link?: { href: string; label: string; kind: "pdf" | "github" | "internal" }
}

const PROJECTS: Project[] = [
  {
    Icon: ShieldCheck,
    category: { en: "Cybersecurity", es: "Ciberseguridad" },
    title: {
      en: "Security Audit: OSINT + Exploitation",
      es: "Auditoría de Seguridad: OSINT + Explotación",
    },
    description: {
      en: "Phase I (passive black box): OSINT, DNS analysis and Shodan, with no active testing against the real organization. Phase II (vulnerable VM): anonymous FTP, client-side exposed credentials, command injection and privilege escalation to root through a sudo misconfiguration — 9 flags captured.",
      es: "Fase I (caja negra pasiva): OSINT, análisis DNS y Shodan, sin pruebas activas sobre la organización real. Fase II (máquina vulnerable): FTP anónimo, credenciales expuestas en el cliente, inyección de comandos y escalada a root por mala configuración de sudo — 9 flags capturadas.",
    },
    tech: ["Nmap", "Burp Suite", "Nikto", "theHarvester", "Amass", "Shodan", "Kali Linux"],
    link: { href: "/Auditoria_IMF.pdf", label: "View PDF Report", kind: "pdf" },
  },
  {
    Icon: Globe,
    category: { en: "Cybersecurity", es: "Ciberseguridad" },
    title: { en: "Web Pentest: WackoPicko", es: "Pentest Web: WackoPicko" },
    description: {
      en: "OWASP ZAP crawl and Active Scan (16 alerts) plus manual exploitation of 12 vulnerabilities: XSS (reflected, stored, multi-step), SQL Injection, LFI, directory traversal, weak credentials, predictable session ID, IDOR and a business logic flaw. Includes fixes with corrected code.",
      es: "Rastreo y Active Scan con OWASP ZAP (16 alertas) y explotación manual de 12 vulnerabilidades: XSS (reflejado, almacenado, multi-step), SQL Injection, LFI, directory traversal, credenciales débiles, ID de sesión predecible, IDOR y logic flaw. Incluye medidas de prevención con código corregido.",
    },
    tech: ["OWASP ZAP", "SQLi", "XSS", "IDOR", "PHP", "MySQL"],
    link: { href: "/WackoPicko.pdf", label: "View PDF Report", kind: "pdf" },
  },
  {
    Icon: Smartphone,
    category: { en: "Cybersecurity", es: "Ciberseguridad" },
    title: { en: "Android App Audit", es: "Auditoría de App Android" },
    description: {
      en: "Static and dynamic analysis of an intentionally vulnerable app: excessive permissions, unprotected exported components, AES with hardcoded key and static IV, exposed ContentProvider, cleartext traffic, a /devlogin backdoor and root/emulator detection bypass.",
      es: "Análisis estático y dinámico de una app vulnerable a propósito: permisos excesivos, componentes exportados sin protección, AES con clave hardcodeada e IV estático, ContentProvider expuesto, tráfico en texto plano, backdoor /devlogin y bypass de detección de root y emulador.",
    },
    tech: ["apktool", "jadx", "adb", "Genymotion", "Burp Suite"],
    link: { href: "/Auditoria_AndroidDevice.pdf", label: "View PDF Report", kind: "pdf" },
  },
  {
    Icon: Stethoscope,
    category: { en: "Development", es: "Desarrollo" },
    title: { en: "Nexora: Clinic Management SaaS", es: "Nexora: SaaS de Gestión para Clínicas" },
    description: {
      en: "Platform for clinics and healthcare professionals covering scheduling, medical records, billing and AI tools, with JWT and Google OAuth authentication. Solo project, currently in development.",
      es: "Plataforma para clínicas y profesionales de la salud con agenda, historia clínica, facturación y herramientas de IA, con autenticación mediante JWT y Google OAuth. Proyecto individual, en desarrollo.",
    },
    tech: ["React 19", "TypeScript", "Express", "Prisma", "PostgreSQL", "Stripe", "Docker"],
    link: { href: "https://github.com/ikergarciaf/Nexora", label: "GitHub", kind: "github" },
  },
  {
    Icon: Bot,
    category: { en: "Development · AI", es: "Desarrollo · IA" },
    title: { en: "PalmoSL: AI Business Automation", es: "PalmoSL: Automatización Empresarial con IA" },
    description: {
      en: "System for Palmo Suministro Integral that automates email handling (AI classification and replies) and forecasts stock with purchase alerts. Built with AI tools as part of the AI specialization course.",
      es: "Sistema para Palmo Suministro Integral que automatiza la atención de emails (clasificación y respuesta con IA) y predice el stock con alertas de compra. Desarrollado con herramientas de IA dentro del curso de especialización.",
    },
    tech: ["Python", "FastAPI", "React", "TypeScript", "Google Sheets"],
    link: { href: "https://github.com/ikergarciaf/PalmoSL", label: "GitHub", kind: "github" },
  },
]

const linkClass =
  "inline-flex items-center gap-1.5 text-slate-500 hover:text-[#06b6d4] text-xs transition-colors font-mono"

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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {PROJECTS.map(({ Icon, category, title, description, tech, link }) => (
            <article
              key={title.en}
              className="group bg-[#111827]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#1e293b] card-hover relative flex flex-col"
            >
              {/* Banner */}
              <div className="h-36 flex justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0f172a]/80 to-[#111827]/40">
                <Icon
                  strokeWidth={1.5}
                  className="w-14 h-14 text-slate-700 group-hover:text-[#06b6d4] transition-all duration-500 group-hover:scale-110"
                  aria-hidden="true"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{ background: "radial-gradient(circle at 50% 60%, rgba(6,182,212,0.1) 0%, transparent 65%)" }}
                  aria-hidden="true"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#06b6d4]/80 bg-[#06b6d4]/10 border border-[#06b6d4]/15 px-2.5 py-1 rounded-lg">
                    {t(category.en, category.es)}
                  </span>
                  {link &&
                    (link.kind === "internal" ? (
                      <Link href={link.href} className={linkClass} aria-label={`Open ${title.en}`}>
                        <ArrowUpRight size={15} aria-hidden="true" />
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={linkClass}
                        aria-label={`Open ${title.en}`}
                      >
                        {link.kind === "pdf" ? (
                          <FileText size={15} aria-hidden="true" />
                        ) : (
                          <Github size={15} aria-hidden="true" />
                        )}
                        {link.kind === "pdf" ? t("View PDF Report", "Ver informe PDF") : link.label}
                      </a>
                    ))}
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#06b6d4] transition-colors duration-300">
                  {t(title.en, title.es)}
                </h3>
                <p className="text-sm text-slate-400 leading-relaxed mb-5">
                  {t(description.en, description.es)}
                </p>

                <ul className="flex flex-wrap gap-2 mt-auto" aria-label="Technologies used">
                  {tech.map((item) => (
                    <li
                      key={item}
                      className="font-mono text-xs text-[#06b6d4] bg-[#06b6d4]/8 border border-[#06b6d4]/12 px-2 py-0.5 rounded"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link href="/writeups" className="inline-flex items-center gap-2 text-[#06b6d4] hover:text-[#22d3ee] font-mono text-sm transition-colors">
            <ArrowUpRight size={16} aria-hidden="true" />
            {t("Read the audit write-ups", "Leer los write-ups de las auditorías")}
          </Link>
        </div>

        <p className="text-center text-slate-700 font-mono text-sm mt-8">
          <span className="text-[#06b6d4]/60">{"// "}</span>
          {t("More projects coming soon...", "Más proyectos próximamente...")}
        </p>
      </div>
    </section>
  )
}
