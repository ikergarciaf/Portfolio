"use client"

import { useEffect, useRef, useState, type FormEvent } from "react"
import { MessageCircle, Send, X } from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

function renderInline(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, index) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={index} className="font-semibold text-white">{part.slice(2, -2)}</strong>
      : part
  )
}

function renderAssistantMessage(text: string) {
  const blocks: React.ReactNode[] = []
  let bullets: string[] = []

  const flushBullets = () => {
    if (!bullets.length) return
    blocks.push(
      <ul key={`list-${blocks.length}`} className="my-2 space-y-1.5 pl-1">
        {bullets.map((bullet, index) => (
          <li key={index} className="flex gap-2">
            <span className="text-cyan-400" aria-hidden="true">•</span>
            <span>{renderInline(bullet)}</span>
          </li>
        ))}
      </ul>
    )
    bullets = []
  }

  text.split(/\r?\n/).forEach((line, index) => {
    const trimmed = line.trim()
    const bullet = trimmed.match(/^[-*•]\s+(.+)$/)
    if (bullet) {
      bullets.push(bullet[1])
      return
    }
    flushBullets()
    if (trimmed) {
      blocks.push(<p key={`paragraph-${index}`} className="my-1 first:mt-0 last:mb-0">{renderInline(trimmed)}</p>)
    }
  })
  flushBullets()

  return <>{blocks}</>
}

export default function ChatWidget() {
  const [open, setOpen] = useState(false)
  const [lang, setLang] = useState<"es" | "en">("es")
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const language = navigator.language.startsWith("es") ? "es" : "en"
    setLang(language)
    setMessages([{
      role: "assistant",
      content: language === "es"
        ? "Hola, soy el asistente de perfil de Iker. Pregúntame sobre su experiencia, proyectos o habilidades."
        : "Hi! I'm Iker's profile assistant. Ask me about his experience, projects, or skills.",
    }])
  }, [])

  useEffect(() => {
    if (open) bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages, open])

  const send = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = input.trim()
    if (!text || loading) return

    const userMessage: Message = { role: "user", content: text }
    const conversation = [...messages, userMessage]
    setMessages(conversation)
    setInput("")
    setError("")
    setLoading(true)

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: conversation, lang }),
      })
      const data = await response.json()
      if (!response.ok || typeof data.reply !== "string") {
        throw new Error(data.error || `HTTP ${response.status}`)
      }
      setMessages((current) => [...current, { role: "assistant", content: data.reply }])
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : "No se pudo contactar con el asistente.")
    } finally {
      setLoading(false)
    }
  }

  const toggleLanguage = () => {
    const next = lang === "es" ? "en" : "es"
    setLang(next)
    setMessages([{
      role: "assistant",
      content: next === "es"
        ? "Hola, soy el asistente de perfil de Iker. Pregúntame sobre su experiencia, proyectos o habilidades."
        : "Hi! I'm Iker's profile assistant. Ask me about his experience, projects, or skills.",
    }])
    setError("")
  }

  return (
    <div className="fixed bottom-5 right-5 z-[60]">
      {open && (
        <section
          className="mb-3 flex h-[min(32rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl border border-slate-700 bg-[#0b1120] shadow-2xl shadow-black/50"
          aria-label={lang === "es" ? "Chat con el asistente de Iker" : "Chat with Iker's assistant"}
        >
          <header className="flex items-center justify-between border-b border-slate-800 px-4 py-3">
            <div>
              <h2 className="font-semibold text-white">Iker García</h2>
              <p className="text-xs text-slate-400">
                {lang === "es" ? "Asistente de perfil" : "Profile assistant"}
              </p>
            </div>
            <button
              type="button"
              onClick={toggleLanguage}
              className="rounded-lg border border-slate-700 px-2 py-1 font-mono text-xs text-cyan-400"
              aria-label={lang === "es" ? "Switch to English" : "Cambiar a español"}
            >
              {lang.toUpperCase()}
            </button>
          </header>
          <div className="flex-1 space-y-3 overflow-y-auto p-4" aria-live="polite">
            {messages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`max-w-[90%] rounded-xl px-3 py-2 text-sm ${
                  message.role === "user"
                    ? "ml-auto whitespace-pre-wrap bg-cyan-500 text-slate-950"
                    : "bg-slate-800 text-slate-100"
                }`}
              >
                {message.role === "assistant"
                  ? renderAssistantMessage(message.content)
                  : message.content}
              </div>
            ))}
            {loading && <p className="text-sm text-slate-400">{lang === "es" ? "Escribiendo..." : "Typing..."}</p>}
            <div ref={bottomRef} />
          </div>
          {error && (
            <p role="alert" className="border-t border-red-900/60 px-4 py-2 text-xs text-red-300">
              {error}
            </p>
          )}
          <form onSubmit={send} className="flex gap-2 border-t border-slate-800 p-3">
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder={lang === "es" ? "Escribe tu pregunta..." : "Ask me anything..."}
              aria-label={lang === "es" ? "Tu pregunta" : "Your question"}
              className="min-w-0 flex-1 rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-cyan-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              aria-label={lang === "es" ? "Enviar pregunta" : "Send question"}
              className="rounded-lg bg-cyan-500 px-3 text-slate-950 disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Close chat" : "Open chat"}
        aria-expanded={open}
        className="ml-auto flex size-14 items-center justify-center rounded-full border border-cyan-400/40 bg-[#111827] text-cyan-400 shadow-lg shadow-cyan-950/50 transition hover:scale-105"
      >
        {open ? <X size={21} /> : <MessageCircle size={21} />}
      </button>
    </div>
  )
}
