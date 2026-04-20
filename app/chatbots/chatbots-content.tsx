"use client"

import { useLang } from "@/context/language-context"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Bot } from "lucide-react"

interface Chatbot {
  name: string
  description: { en: string; es: string }
  tech: readonly string[]
  url: string
  color: string
}

const CHATBOTS: Chatbot[] = [
  {
    name: "IKEA Chatbot",
    description: {
      en: "Virtual assistant that helps users navigate IKEA's catalogue, find products, check availability, and get answers about assembly, delivery and store services.",
      es: "Asistente virtual que ayuda a los usuarios a navegar el catálogo de IKEA, encontrar productos, consultar disponibilidad y resolver dudas sobre montaje, entrega y servicios de tienda.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "react-markdown"],
    url: "https://ikeachatbot.vercel.app/",
    color: "#0058A3",
  },
  {
    name: "Movistar Chatbot",
    description: {
      en: "Customer support assistant for Movistar that handles tariff inquiries, contract management, technical issues and coverage information with real-time data visualisation.",
      es: "Asistente de atención al cliente de Movistar que gestiona consultas de tarifas, contratos, incidencias técnicas e información de cobertura con visualización de datos en tiempo real.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "Recharts"],
    url: "https://movistar-chatbot.vercel.app/",
    color: "#019DF4",
  },
  {
    name: "SEUR Chatbot",
    description: {
      en: "Logistics assistant for SEUR that lets users track shipments, schedule deliveries, report incidents and get information about shipping rates and collection points.",
      es: "Asistente logístico de SEUR que permite rastrear envíos, programar entregas, reportar incidencias y consultar tarifas y puntos de recogida.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js"],
    url: "https://seurchatbot.vercel.app/",
    color: "#E30613",
  },
  {
    name: "Sanitas Chatbot",
    description: {
      en: "Health insurance assistant for Sanitas that guides users through policy coverage, appointment booking, authorisations, and finding the nearest medical centres.",
      es: "Asistente de seguros de salud de Sanitas que orienta a los usuarios sobre coberturas, citas médicas, autorizaciones y localización de centros médicos más cercanos.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "Radix UI", "shadcn/ui"],
    url: "https://sanitaschatbot.vercel.app/",
    color: "#00A19A",
  },
  {
    name: "Aena Chatbot",
    description: {
      en: "Airport services assistant for Aena that provides real-time flight status, terminal information, parking options, transport connections and airport facilities.",
      es: "Asistente de servicios aeroportuarios de Aena que ofrece estado de vuelos en tiempo real, información de terminales, aparcamiento, transporte y servicios del aeropuerto.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "react-markdown"],
    url: "https://aenachatbot.vercel.app/",
    color: "#003082",
  },
]

export default function ChatbotsContent() {
  const { t } = useLang()

  return (
    <div className="min-h-screen bg-[#0b1120] text-white flex flex-col">
      <Nav />

      <main className="flex-1 pt-32 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Back link */}
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 font-mono text-xs text-slate-500 hover:text-[#06b6d4] transition-colors mb-12 group"
            aria-label={t("Back to portfolio", "Volver al portfolio")}
          >
            <ArrowLeft size={14} className="group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" />
            {t("Back to portfolio", "Volver al portfolio")}
          </Link>

          {/* Page header */}
          <div className="flex items-center gap-6 mb-4">
            <h1 className="text-3xl font-bold text-white flex-shrink-0 whitespace-nowrap">
              <span className="font-mono text-[#06b6d4] mr-2 opacity-70">03.</span>
              {t("AI Chatbots", "Chatbots con IA")}
            </h1>
            <div
              className="h-px flex-1"
              style={{ background: "linear-gradient(to right, rgba(51,65,85,0.6), transparent)" }}
              aria-hidden="true"
            />
          </div>

          <p className="text-slate-400 text-sm leading-relaxed mb-16 max-w-2xl font-mono">
            <span className="text-[#06b6d4]/60">{"// "}</span>
            {t(
              "Conversational AI assistants built for real brands using Google Gemini, React and Express.",
              "Asistentes de IA conversacionales construidos para marcas reales usando Google Gemini, React y Express."
            )}
          </p>

          {/* Chatbots grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {CHATBOTS.map((bot) => (
              <article
                key={bot.name}
                className="group bg-[#111827]/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-[#1e293b] hover:border-[#06b6d4]/25 transition-all duration-300 flex flex-col"
              >
                {/* Banner */}
                <div className="h-32 flex justify-center items-center relative overflow-hidden bg-gradient-to-b from-[#0f172a]/80 to-[#111827]/40">
                  <Bot
                    size={48}
                    className="text-slate-700 group-hover:text-[#06b6d4] transition-all duration-500 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{ background: "radial-gradient(circle at 50% 60%, rgba(6,182,212,0.08) 0%, transparent 65%)" }}
                    aria-hidden="true"
                  />
                  {/* Brand accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                    style={{ background: bot.color }}
                    aria-hidden="true"
                  />
                </div>

                <div className="p-6 flex flex-col flex-1">
                  {/* Title row */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <h2 className="text-base font-bold text-white group-hover:text-[#06b6d4] transition-colors duration-300 leading-snug">
                      {bot.name}
                    </h2>
                    <a
                      href={bot.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="shrink-0 inline-flex items-center gap-1 text-slate-600 hover:text-[#06b6d4] text-xs transition-colors font-mono mt-0.5"
                      aria-label={t(`Open ${bot.name}`, `Abrir ${bot.name}`)}
                    >
                      <ArrowUpRight size={14} aria-hidden="true" />
                      {t("Open", "Abrir")}
                    </a>
                  </div>

                  <p className="text-sm text-slate-400 leading-relaxed mb-5 flex-1">
                    {t(bot.description.en, bot.description.es)}
                  </p>

                  {/* Tech chips */}
                  <ul className="flex flex-wrap gap-2" aria-label={t("Technologies used", "Tecnologías usadas")}>
                    {bot.tech.map((tech) => (
                      <li
                        key={tech}
                        className="font-mono text-xs text-[#06b6d4] bg-[#06b6d4]/8 border border-[#06b6d4]/12 px-2 py-0.5 rounded"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>

                  {/* CTA button */}
                  <a
                    href={bot.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-6 flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#1e293b] hover:border-[#06b6d4]/40 bg-[#0f172a]/60 hover:bg-[#06b6d4]/5 text-slate-400 hover:text-[#06b6d4] text-sm font-medium transition-all duration-300"
                    aria-label={t(`Try ${bot.name}`, `Probar ${bot.name}`)}
                  >
                    <Bot size={15} aria-hidden="true" />
                    {t("Try chatbot", "Probar chatbot")}
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
