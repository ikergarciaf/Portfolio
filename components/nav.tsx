"use client"

import { useState, useEffect } from "react"
import { useLang } from "@/context/language-context"
import { Mail, Linkedin, Github, Menu, X } from "lucide-react"

const NAV_LINKS = [
  { href: "#about",     en: "About",        es: "Sobre Mí"  },
  { href: "#education", en: "Education",    es: "Formación" },
  { href: "#projects",  en: "Projects",     es: "Proyectos" },
  { href: "#services",  en: "Web Services", es: "Servicios" },
  { href: "#contact",   en: "Contact",      es: "Contacto"  },
] as const

export default function Nav() {
  const { lang, toggle, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0b1120]/90 backdrop-blur-md shadow-[0_1px_0_0_rgba(6,182,212,0.08)]"
          : "bg-transparent"
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#about"
            className="font-mono text-xl font-bold text-white tracking-tighter select-none shrink-0"
            aria-label="Iker García — home"
          >
            <span className="text-[#06b6d4]">{"<"}</span>
            IkerGarcía
            <span className="text-[#06b6d4]">{">"}/</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-slate-500 hover:text-[#06b6d4] transition-colors duration-200 px-3 py-2 rounded-md hover:bg-[#06b6d4]/5"
              >
                {t(link.en, link.es)}
              </a>
            ))}
          </div>

          {/* Social + lang toggle */}
          <div className="hidden md:flex items-center gap-3">
            <a href="mailto:ikergarciafdez1@gmail.com" aria-label="Email"
              className="text-slate-600 hover:text-[#06b6d4] transition-colors p-1.5">
              <Mail size={16} />
            </a>
            <a href="https://www.linkedin.com/in/ikergarciaf" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"
              className="text-slate-600 hover:text-[#06b6d4] transition-colors p-1.5">
              <Linkedin size={16} />
            </a>
            <a href="https://github.com/ikergarciaf" target="_blank" rel="noopener noreferrer" aria-label="GitHub"
              className="text-slate-600 hover:text-[#06b6d4] transition-colors p-1.5">
              <Github size={16} />
            </a>
            <button
              onClick={toggle}
              className="ml-1 font-mono text-[11px] border border-[#1e293b] hover:border-[#06b6d4]/50 bg-[#111827]/80 text-slate-400 hover:text-[#06b6d4] px-3 py-1.5 rounded-lg transition-all duration-200"
              aria-label={`Switch to ${lang === "en" ? "Spanish" : "English"}`}
            >
              {lang === "en" ? "EN → ES" : "ES → EN"}
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-slate-500 hover:text-white transition p-1"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0b1120]/95 backdrop-blur-md px-6 pb-6 pt-4 flex flex-col gap-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-slate-300 hover:text-[#06b6d4] transition-colors font-medium py-2 text-sm"
              onClick={() => setMenuOpen(false)}
            >
              {t(link.en, link.es)}
            </a>
          ))}
          <div className="flex items-center gap-4 pt-4 mt-2"
            style={{ borderTop: "1px solid rgba(30,41,59,0.6)" }}>
            <a href="mailto:ikergarciafdez1@gmail.com" aria-label="Email" className="text-slate-500 hover:text-[#06b6d4] transition-colors"><Mail size={16} /></a>
            <a href="https://www.linkedin.com/in/ikergarciaf" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-slate-500 hover:text-[#06b6d4] transition-colors"><Linkedin size={16} /></a>
            <a href="https://github.com/ikergarciaf" target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-slate-500 hover:text-[#06b6d4] transition-colors"><Github size={16} /></a>
            <button onClick={toggle} className="ml-auto font-mono text-[11px] border border-[#1e293b] bg-[#111827] text-slate-400 hover:text-[#06b6d4] px-3 py-1.5 rounded-lg transition-all">
              {lang === "en" ? "EN → ES" : "ES → EN"}
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}
