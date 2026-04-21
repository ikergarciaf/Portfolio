"use client"

import { useLang } from "@/context/language-context"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import Link from "next/link"
import { ArrowLeft, ArrowUpRight, Bot } from "lucide-react"
import Image from "next/image"

interface Chatbot {
  name: string
  description: { en: string; es: string }
  tech: readonly string[]
  url: string
  accentColor: string
  logoBg: string
  logoSrc: string
  logoAlt: string
}

const CHATBOTS: Chatbot[] = [
  {
    name: "IKEA Chatbot",
    description: {
      en: "Conversational assistant powered by the Gemini 1.5 Flash API with a custom system prompt that encodes IKEA's product catalogue, assembly FAQs and store policies. The React + Vite frontend streams responses via an Express proxy that injects the API key server-side, keeping credentials out of the client bundle. react-markdown renders structured responses with clickable links.",
      es: "Asistente conversacional impulsado por la API Gemini 1.5 Flash con un system prompt personalizado que codifica el catálogo de IKEA, las FAQs de montaje y las políticas de tienda. El frontend React + Vite transmite respuestas en streaming a través de un proxy Express que inyecta la API key en el servidor, evitando exponer credenciales en el cliente. react-markdown renderiza respuestas estructuradas con enlaces clicables.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "react-markdown"],
    url: "https://ikeachatbot.vercel.app/",
    accentColor: "#0058A3",
    logoBg: "bg-white",
    logoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KyYVisHA4RYB1OO0YW9Gc7fD2bCKI1.png",
    logoAlt: "IKEA logo",
  },
  {
    name: "Movistar Chatbot",
    description: {
      en: "Customer support agent for Movistar built with a multi-turn conversation history fed to Gemini 1.5 Flash, allowing context-aware follow-ups on tariffs, contracts and outages. Recharts renders real-time data visualisations (coverage maps, usage graphs) inline in the chat. The Express backend handles session state and rate-limiting on the API calls.",
      es: "Agente de soporte al cliente de Movistar construido con un historial de conversación multi-turno enviado a Gemini 1.5 Flash, permitiendo seguimiento contextual sobre tarifas, contratos e incidencias. Recharts renderiza visualizaciones de datos en tiempo real (mapas de cobertura, gráficas de consumo) directamente en el chat. El backend Express gestiona el estado de sesión y el rate-limiting de las llamadas a la API.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "Recharts"],
    url: "https://movistar-chatbot.vercel.app/",
    accentColor: "#019DF4",
    logoBg: "bg-[#019DF4]",
    logoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xm050Hw5bCNh7ofRgbkWyW7dZrB9pp.png",
    logoAlt: "Movistar logo",
  },
  {
    name: "SEUR Chatbot",
    description: {
      en: "Logistics assistant that simulates SEUR's tracking and customer service flow using Gemini 1.5 Flash with a domain-specific system prompt covering shipment statuses, delivery rescheduling and pick-up point lookup. The Express API layer validates tracking number formats before forwarding to the LLM, reducing hallucinations with structured input constraints.",
      es: "Asistente logístico que simula el flujo de seguimiento y atención al cliente de SEUR usando Gemini 1.5 Flash con un system prompt específico del dominio que cubre estados de envío, reprogramación de entregas y búsqueda de puntos de recogida. La capa de API Express valida los formatos de número de seguimiento antes de enviarlos al LLM, reduciendo alucinaciones con restricciones de entrada estructurada.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js"],
    url: "https://seurchatbot.vercel.app/",
    accentColor: "#E63312",
    logoBg: "bg-white",
    logoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-vpYTZifdUqz7NVtcf7R1xkL3IoTPg7.png",
    logoAlt: "SEUR logo",
  },
  {
    name: "Sanitas Chatbot",
    description: {
      en: "Health insurance assistant built with Radix UI primitives and shadcn/ui components for an accessible, WCAG-compliant interface. Gemini 1.5 Flash is prompted with a medical-services knowledge base covering policy coverage, authorisation flows and clinic finders. Conversation state is managed with React Context, and the UI uses optimistic updates so responses feel instant while the stream loads.",
      es: "Asistente de seguros de salud construido con primitivas de Radix UI y componentes shadcn/ui para una interfaz accesible y conforme a WCAG. Gemini 1.5 Flash se invoca con una base de conocimiento de servicios médicos que cubre coberturas, flujos de autorización y localizadores de clínicas. El estado de la conversación se gestiona con React Context, y la UI usa actualizaciones optimistas para que las respuestas se perciban instantáneas mientras carga el stream.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "Radix UI", "shadcn/ui"],
    url: "https://sanitaschatbot.vercel.app/",
    accentColor: "#0099CC",
    logoBg: "bg-white",
    logoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-H5EzPRw3iVURPyR80Wal1iu5Xwnmiy.png",
    logoAlt: "Sanitas logo",
  },
  {
    name: "Aena Chatbot",
    description: {
      en: "Airport services assistant for Aena leveraging Gemini 1.5 Flash with a structured prompt that covers live flight status queries, terminal maps, parking rate tables and ground transport options. react-markdown parses Gemini's markdown output into formatted flight cards and tables. The Express server caches frequent route queries with an in-memory TTL store to cut API latency on repeated requests.",
      es: "Asistente de servicios aeroportuarios de Aena que aprovecha Gemini 1.5 Flash con un prompt estructurado que cubre consultas de estado de vuelos en tiempo real, mapas de terminales, tarifas de aparcamiento y transporte terrestre. react-markdown parsea la salida markdown de Gemini en tarjetas de vuelo y tablas formateadas. El servidor Express almacena en caché las consultas frecuentes con un store TTL en memoria para reducir la latencia de la API en peticiones repetidas.",
    },
    tech: ["React", "Vite", "Tailwind CSS", "Google Gemini", "Express", "Node.js", "react-markdown"],
    url: "https://aenachatbot.vercel.app/",
    accentColor: "#7AB800",
    logoBg: "bg-white",
    logoSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-AcfAoj18FPK4RRnTVBORSXmwHozRJQ.png",
    logoAlt: "Aena logo",
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
                {/* Logo banner */}
                <div className={`h-32 flex justify-center items-center relative overflow-hidden ${bot.logoBg}`}>
                  <Image
                    src={bot.logoSrc}
                    alt={bot.logoAlt}
                    width={160}
                    height={72}
                    className="object-contain max-h-16 w-auto px-4 group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                  {/* Brand accent bar */}
                  <div
                    className="absolute bottom-0 left-0 right-0 h-0.5 opacity-60 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ backgroundColor: bot.accentColor }}
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
                  <ul className="flex flex-wrap gap-2 mb-6" aria-label={t("Technologies used", "Tecnologías usadas")}>
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
                    className="mt-auto flex items-center justify-center gap-2 w-full py-2.5 rounded-xl border border-[#1e293b] hover:border-[#06b6d4]/40 bg-[#0f172a]/60 hover:bg-[#06b6d4]/5 text-slate-400 hover:text-[#06b6d4] text-sm font-medium transition-all duration-300"
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
