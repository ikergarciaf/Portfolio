"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const QUESTIONS = {
  es: [
    "¿Cuál es tu stack técnico?",
    "¿Buscas trabajo ahora mismo?",
    "¿Qué proyectos has hecho?",
    "¿Qué estudios tienes?",
    "¿Qué experiencia laboral tienes?",
    "¿En qué tipo de empresa quieres trabajar?",
    "¿Qué sabes de ciberseguridad?",
    "¿Hablas inglés?",
  ],
  en: [
    "What's your tech stack?",
    "Are you available for work?",
    "Tell me about your projects",
    "What's your educational background?",
    "What work experience do you have?",
    "What kind of company are you looking for?",
    "What do you know about cybersecurity?",
    "What languages do you speak?",
  ],
};

const WELCOME = {
  es: "¡Hola! Soy el asistente de Iker. Pregúntame lo que quieras sobre su experiencia, proyectos o habilidades 👋",
  en: "Hey! I'm Iker's AI assistant. Ask me anything about his experience, skills or projects 👋",
};

const PLACEHOLDER = { es: "Escribe tu pregunta...", en: "Ask me anything..." };
const SUBTITLE = { es: "Asistente IA · responde al instante", en: "AI assistant · replies instantly" };

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [lang, setLang] = useState<"es" | "en">("en");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const detected = navigator.language?.startsWith("es") ? "es" : "en";
    setLang(detected);
    setMessages([{ role: "assistant", content: WELCOME[detected] }]);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), 50);
  }, [messages, open]);

  const switchLang = () => {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    setMessages([{ role: "assistant", content: WELCOME[next] }]);
    setApiError(null);
  };

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    setApiError(null);
    const userMsg: Message = { role: "user", content: text.trim() };
    const next = [...messages, userMsg];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, lang }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setMessages([...next, { role: "assistant", content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setApiError(msg);
      setMessages([
        ...next,
        {
          role: "assistant",
          content:
            lang === "es"
              ? "Ups, algo ha fallado. Inténtalo de nuevo."
              : "Something went wrong. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const showSuggestions = messages.length <= 1;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        style={{
          position: "fixed", bottom: "24px", right: "24px",
          width: "52px", height: "52px", borderRadius: "50%",
          background: "#0f172a", border: "none", cursor: "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          zIndex: 1000, transition: "transform 0.15s",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.07)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? (
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="white" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div style={{
          position: "fixed", bottom: "88px", right: "24px",
          width: "340px", maxHeight: "540px",
          background: "#ffffff", border: "1px solid #e2e8f0",
          borderRadius: "16px", display: "flex", flexDirection: "column",
          zIndex: 1000, overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}>

          {/* Header */}
          <div style={{ background: "#0f172a", padding: "14px 16px", display: "flex", alignItems: "center", gap: "10px" }}>
            <div style={{
              width: "34px", height: "34px", borderRadius: "50%",
              background: "#334155", display: "flex", alignItems: "center",
              justifyContent: "center", fontSize: "13px", fontWeight: 600,
              color: "#e2e8f0", flexShrink: 0,
            }}>IG</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: 0, fontSize: "14px", fontWeight: 600, color: "#f8fafc" }}>Iker García</p>
              <p style={{ margin: 0, fontSize: "11px", color: "#94a3b8" }}>{SUBTITLE[lang]}</p>
            </div>
            <button
              onClick={switchLang}
              title="Switch language"
              style={{
                fontSize: "11px", padding: "3px 8px", borderRadius: "20px",
                border: "1px solid #475569", background: "transparent",
                color: "#94a3b8", cursor: "pointer",
              }}
            >{lang === "es" ? "EN" : "ES"}</button>
          </div>

          {/* Messages */}
          <div style={{
            flex: 1, overflowY: "auto", padding: "14px",
            display: "flex", flexDirection: "column", gap: "10px",
            background: "#f8fafc",
          }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start" }}>
                <div style={{
                  maxWidth: "84%", padding: "9px 13px",
                  borderRadius: m.role === "user" ? "14px 14px 4px 14px" : "14px 14px 14px 4px",
                  background: m.role === "user" ? "#0f172a" : "#ffffff",
                  color: m.role === "user" ? "#f8fafc" : "#1e293b",
                  fontSize: "13.5px", lineHeight: "1.55",
                  border: m.role === "assistant" ? "1px solid #e2e8f0" : "none",
                }}>
                  {m.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{
                display: "flex", gap: "5px", padding: "8px 12px",
                background: "white", borderRadius: "14px 14px 14px 4px",
                border: "1px solid #e2e8f0", width: "fit-content",
              }}>
                {[0, 1, 2].map((i) => (
                  <span key={i} style={{
                    width: "7px", height: "7px", borderRadius: "50%",
                    background: "#94a3b8", display: "inline-block",
                    animation: `bounce 1s ease-in-out ${i * 0.18}s infinite`,
                  }} />
                ))}
              </div>
            )}

            {apiError && (
              <p style={{ fontSize: "11px", color: "#e24b4a", margin: 0, textAlign: "center" }}>
                ⚠ {apiError}
              </p>
            )}

            {/* Suggested questions — full list as buttons */}
            {showSuggestions && (
              <div style={{ display: "flex", flexDirection: "column", gap: "5px", marginTop: "2px" }}>
                {QUESTIONS[lang].map((q) => (
                  <button
                    key={q}
                    onClick={() => send(q)}
                    style={{
                      fontSize: "12.5px", padding: "8px 12px",
                      borderRadius: "10px", border: "1px solid #e2e8f0",
                      background: "white", color: "#334155",
                      cursor: "pointer", textAlign: "left",
                      transition: "background 0.1s",
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.background = "#f1f5f9")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "white")}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div style={{ padding: "10px 12px", borderTop: "1px solid #e2e8f0", display: "flex", gap: "8px", background: "white" }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={PLACEHOLDER[lang]}
              style={{
                flex: 1, fontSize: "13px", padding: "8px 12px",
                borderRadius: "20px", border: "1px solid #e2e8f0",
                outline: "none", background: "#f8fafc", color: "#1e293b",
              }}
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              style={{
                width: "34px", height: "34px", borderRadius: "50%",
                background: input.trim() && !loading ? "#0f172a" : "#e2e8f0",
                border: "none", cursor: input.trim() && !loading ? "pointer" : "default",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0, transition: "background 0.15s",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                  stroke={input.trim() && !loading ? "white" : "#94a3b8"}
                  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); opacity: 0.5; }
          50% { transform: translateY(-6px); opacity: 1; }
        }
      `}</style>
    </>
  );
}
