"use client"

import { useLang } from "@/context/language-context"
import { Smartphone, Rocket, Handshake, Mail, Globe } from "lucide-react"
import SectionHeader from "@/components/section-header"

const SERVICE_CARDS = [
  {
    icon: <Smartphone size={24} className="text-[#06b6d4]" aria-hidden="true" />,
    title: { en: "Mobile Friendly", es: "Adaptable a Móviles" },
    description: {
      en: "Your website will look and work perfectly on smartphones, tablets, and desktop computers.",
      es: "Tu página web se verá y funcionará perfectamente en teléfonos, tablets y ordenadores.",
    },
  },
  {
    icon: <Rocket size={24} className="text-[#06b6d4]" aria-hidden="true" />,
    title: { en: "Fast & Secure", es: "Rápida y Segura" },
    description: {
      en: "I apply my cybersecurity background to ensure your site is hardened and optimized to load instantly.",
      es: "Aplico mis conocimientos en ciberseguridad para asegurar tu web y optimizarla para cargar al instante.",
    },
  },
  {
    icon: <Handshake size={24} className="text-[#06b6d4]" aria-hidden="true" />,
    title: { en: "Ready to Grow", es: "Lista para Crecer" },
    description: {
      en: "Stand out from the competition and attract new customers with a modern, professional digital storefront.",
      es: "Destaca frente a la competencia y atrae nuevos clientes con un escaparate digital moderno y profesional.",
    },
  },
] as const

const DOMAINS = ["agenteautonomo.es", "agentesverticales.es"] as const

export default function Services() {
  const { t } = useLang()

  return (
    <>
      {/* ── Web Services ─────────────────────────────────── */}
      <section id="services" className="relative py-28" aria-label="Web Services">
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] pointer-events-none"
          style={{ background: "radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)" }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader number="03" en="Web Services" es="Servicios Web" />

          <div className="text-center mb-14 max-w-2xl mx-auto">
            <p className="font-mono text-[#06b6d4]/80 text-xs uppercase tracking-widest mb-3">
              {t("For Businesses & Entrepreneurs", "Para Negocios y Emprendedores")}
            </p>
            <h3 className="text-3xl font-bold text-white mb-4">
              {t("Need a Website for Your Business?", "¿Necesitas una web para tu negocio?")}
            </h3>
            <p className="text-slate-400 text-base leading-relaxed">
              {t(
                "Having a professional online presence is crucial today. I design and build tailored websites that are fast, beautiful, and easy to use. You focus on your business, I handle the tech.",
                "Tener una presencia profesional en internet es fundamental. Diseño y creo páginas web a medida que son rápidas, atractivas y fáciles de usar. Tú te centras en tu negocio, yo me encargo de la tecnología."
              )}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-14">
            {SERVICE_CARDS.map((card) => (
              <div
                key={card.title.en}
                className="group bg-[#111827]/60 backdrop-blur-sm p-7 rounded-2xl border border-[#1e293b] hover:border-[#06b6d4]/25 transition-all duration-300 text-center card-hover"
              >
                <div className="w-12 h-12 bg-[#06b6d4]/10 border border-[#06b6d4]/15 rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:bg-[#06b6d4]/18 group-hover:border-[#06b6d4]/30 transition-all duration-300">
                  {card.icon}
                </div>
                <h4 className="text-base text-white font-bold mb-2">
                  {t(card.title.en, card.title.es)}
                </h4>
                <p className="text-slate-400 text-sm leading-relaxed">
                  {t(card.description.en, card.description.es)}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="mailto:ikergarciafdez1@gmail.com"
              className="inline-flex items-center gap-2 bg-white text-[#0b1120] font-bold py-4 px-10 rounded-full hover:bg-slate-100 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.12)] hover:shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:scale-105"
            >
              <Mail size={17} aria-hidden="true" />
              {t("Contact me to start your project", "Contáctame para empezar tu web")}
            </a>
          </div>
        </div>
      </section>

      {/* ── Premium Domains ───────────────────────────────── */}
      <section className="relative py-20" aria-label="Premium AI Domains">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-[#06b6d4]/8 border border-[#06b6d4]/18 px-4 py-1.5 rounded-full mb-8">
            <span className="w-1.5 h-1.5 bg-[#06b6d4] rounded-full pulse-dot" aria-hidden="true" />
            <span className="text-[#06b6d4] font-mono text-[11px] uppercase tracking-widest font-bold">
              Digital Assets
            </span>
          </div>

          <h3 className="text-2xl font-bold text-white mb-8">
            {t("Premium AI Domains For Sale", "Dominios Premium de IA en Venta")}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto mb-8">
            {DOMAINS.map((domain) => (
              <div
                key={domain}
                className="group bg-[#111827]/60 backdrop-blur-sm p-5 rounded-xl border border-[#1e293b] hover:border-[#06b6d4]/30 transition-all duration-300 relative overflow-hidden cursor-default"
              >
                <Globe
                  size={44}
                  className="absolute right-3 bottom-2 text-[#06b6d4] opacity-5 group-hover:opacity-20 transition-opacity duration-300"
                  aria-hidden="true"
                />
                <span className="font-mono text-sm font-bold text-slate-400 group-hover:text-[#06b6d4] transition-colors duration-300">
                  {domain}
                </span>
              </div>
            ))}
          </div>

          <p className="text-slate-600 text-sm">
            {t("Interested?", "¿Interesado?")}{" "}
            <a href="mailto:ikergarciafdez1@gmail.com" className="text-[#06b6d4]/80 hover:text-[#06b6d4] hover:underline transition-colors">
              {t("Contact me", "Contáctame")}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
