"use client";

import { useState, useRef, useEffect } from "react";

// Renders **bold**, line breaks and "- " bullets
const renderContent = (text: string) => {
  const lines = text.split("\n");
  const blocks: React.ReactNode[] = [];
  let bulletBuffer: string[] = [];

  const flushBullets = (key: string) => {
    if (bulletBuffer.length === 0) return;
    blocks.push(
      <ul key={`ul-${key}`} className="chat-bullets">
        {bulletBuffer.map((b, i) => (
          <li key={i}>{renderInline(b)}</li>
        ))}
      </ul>
    );
    bulletBuffer = [];
  };

  lines.forEach((line, idx) => {
    const trimmed = line.trim();
    if (/^[-*•]\s+/.test(trimmed)) {
      bulletBuffer.push(trimmed.replace(/^[-*•]\s+/, ""));
    } else {
      flushBullets(`b${idx}`);
      if (trimmed.length > 0) {
        blocks.push(<p key={`p${idx}`} className="chat-paragraph">{renderInline(trimmed)}</p>);
      }
    }
  });
  flushBullets("end");
  return <>{blocks}</>;
};

const renderInline = (text: string) =>
  text.split(/(\*\*.*?\*\*)/).map((part, i) =>
    part.startsWith("**") && part.endsWith("**")
      ? <strong key={i}>{part.slice(2, -2)}</strong>
      : <span key={i}>{part}</span>
  );

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
    "¿Qué sabes de ciberseguridad?",
    "¿En qué tipo de empresa quieres trabajar?",
  ],
  en: [
    "What's your tech stack?",
    "Are you available for work?",
    "Tell me about your projects",
    "What's your educational background?",
    "What do you know about cybersecurity?",
    "What kind of company are you looking for?",
  ],
};

const WELCOME = {
  es: "Hola, soy el asistente IA de Iker. Pregúntame lo que quieras sobre su experiencia, proyectos o habilidades.",
  en: "Hey! I'm Iker's AI assistant. Ask me anything about his experience, skills or projects.",
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
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMsg], lang }),
      });

      const data = await res.json();

      if (!res.ok || !data.reply) {
        throw new Error(data.error || `HTTP ${res.status}`);
      }

      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Unknown error";
      setApiError(msg);
      setMessages((prev) => [
        ...prev,
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

  const showSuggestions = true;

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open chat"
        className="chat-toggle-btn"
      >
        <span className="chat-toggle-pulse" />
        {open ? (
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
            <path d="M5 5l10 10M15 5L5 15" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" />
          </svg>
        ) : (
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"
              stroke="#06b6d4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>

      {/* Chat panel */}
      {open && (
        <div className="chat-panel">
          <div className="chat-scanlines" />

          {/* Header */}
          <div className="chat-header">
            <div className="chat-avatar">
              <span>IG</span>
              <span className="chat-avatar-dot" />
            </div>
            <div className="chat-header-info">
              <p className="chat-header-name">Iker García</p>
              <p className="chat-header-sub">{SUBTITLE[lang]}</p>
            </div>
            <button onClick={switchLang} className="chat-lang-btn">
              {lang === "es" ? "EN" : "ES"}
            </button>
          </div>

          {/* Messages */}
          <div className="chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`chat-msg-row ${m.role}`}>
                {m.role === "assistant" && (
                  <div className="chat-ai-icon">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="#06b6d4" strokeWidth="1.5" />
                      <path d="M8 12h8M12 8v8" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                )}
                <div className={`chat-bubble ${m.role}`}>
                  {renderContent(m.content)}
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg-row assistant">
                <div className="chat-ai-icon">
                  <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="#06b6d4" strokeWidth="1.5" />
                    <path d="M8 12h8M12 8v8" stroke="#06b6d4" strokeWidth="1.5" strokeLinecap="round" />
                  </svg>
                </div>
                <div className="chat-bubble assistant chat-typing">
                  <span /><span /><span />
                </div>
              </div>
            )}

            {apiError && (
              <p className="chat-error">⚠ {apiError}</p>
            )}

            {showSuggestions && (
              <div className="chat-suggestions">
                {QUESTIONS[lang].map((q) => (
                  <button key={q} onClick={() => send(q)} className="chat-suggestion-btn">
                    <span className="chat-suggestion-arrow">›</span>
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="chat-input-row">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder={PLACEHOLDER[lang]}
              className="chat-input"
            />
            <button
              onClick={() => send(input)}
              disabled={!input.trim() || loading}
              className={`chat-send-btn ${input.trim() && !loading ? "active" : ""}`}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      )}

      <style>{`
        .chat-toggle-btn {
          position: fixed;
          bottom: 28px;
          right: 28px;
          width: 52px;
          height: 52px;
          border-radius: 50%;
          background: #0b1120;
          border: 1.5px solid rgba(6,182,212,0.5);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          box-shadow: 0 0 18px rgba(6,182,212,0.15);
        }
        .chat-toggle-btn:hover {
          border-color: #06b6d4;
          box-shadow: 0 0 28px rgba(6,182,212,0.35);
          transform: scale(1.06);
        }
        .chat-toggle-pulse {
          position: absolute;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          border: 1.5px solid rgba(6,182,212,0.3);
          animation: chat-pulse-ring 2.5s ease-out infinite;
          pointer-events: none;
        }
        @keyframes chat-pulse-ring {
          0%   { transform: scale(1); opacity: 0.7; }
          100% { transform: scale(1.55); opacity: 0; }
        }
        .chat-panel {
          position: fixed;
          bottom: 92px;
          right: 28px;
          width: 352px;
          max-height: 560px;
          background: #0b1120;
          border: 1px solid rgba(6,182,212,0.22);
          border-radius: 16px;
          display: flex;
          flex-direction: column;
          z-index: 1000;
          overflow: hidden;
          box-shadow:
            0 0 0 1px rgba(6,182,212,0.06),
            0 24px 64px -12px rgba(0,0,0,0.7),
            0 0 40px -8px rgba(6,182,212,0.12);
          font-family: 'Inter', system-ui, -apple-system, sans-serif;
          animation: chat-slide-in 0.22s cubic-bezier(0.16,1,0.3,1) forwards;
        }
        @keyframes chat-slide-in {
          from { opacity: 0; transform: translateY(12px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        .chat-scanlines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(6,182,212,0.015) 2px,
            rgba(6,182,212,0.015) 4px
          );
          pointer-events: none;
          z-index: 10;
          border-radius: 16px;
        }
        .chat-header {
          background: rgba(30,41,59,0.8);
          border-bottom: 1px solid rgba(6,182,212,0.15);
          padding: 13px 16px;
          display: flex;
          align-items: center;
          gap: 11px;
          backdrop-filter: blur(8px);
          flex-shrink: 0;
        }
        .chat-avatar {
          position: relative;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
          border: 1.5px solid rgba(6,182,212,0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 12px;
          font-weight: 700;
          color: #06b6d4;
          letter-spacing: 0.04em;
          flex-shrink: 0;
        }
        .chat-avatar-dot {
          position: absolute;
          bottom: 1px;
          right: 1px;
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #22c55e;
          border: 1.5px solid #0b1120;
          animation: pulse-dot 2s ease-in-out infinite;
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.3); }
        }
        .chat-header-info { flex: 1; min-width: 0; }
        .chat-header-name {
          margin: 0;
          font-size: 13.5px;
          font-weight: 600;
          color: #f1f5f9;
          letter-spacing: 0.01em;
        }
        .chat-header-sub {
          margin: 0;
          font-size: 10.5px;
          color: #06b6d4;
          letter-spacing: 0.03em;
          opacity: 0.8;
        }
        .chat-lang-btn {
          font-size: 10px;
          font-weight: 600;
          letter-spacing: 0.08em;
          padding: 4px 9px;
          border-radius: 6px;
          border: 1px solid rgba(6,182,212,0.3);
          background: rgba(6,182,212,0.06);
          color: #06b6d4;
          cursor: pointer;
          transition: background 0.15s, border-color 0.15s;
        }
        .chat-lang-btn:hover {
          background: rgba(6,182,212,0.14);
          border-color: rgba(6,182,212,0.5);
        }
        .chat-messages {
          flex: 1;
          overflow-y: auto;
          padding: 14px 14px 10px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          scrollbar-width: thin;
          scrollbar-color: rgba(6,182,212,0.2) transparent;
        }
        .chat-messages::-webkit-scrollbar { width: 4px; }
        .chat-messages::-webkit-scrollbar-thumb {
          background: rgba(6,182,212,0.2);
          border-radius: 4px;
        }
        .chat-msg-row {
          display: flex;
          gap: 7px;
          align-items: flex-end;
        }
        .chat-msg-row.user { justify-content: flex-end; }
        .chat-msg-row.assistant { justify-content: flex-start; }
        .chat-ai-icon {
          width: 22px;
          height: 22px;
          border-radius: 50%;
          background: rgba(6,182,212,0.08);
          border: 1px solid rgba(6,182,212,0.22);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-bottom: 2px;
        }
        .chat-bubble {
          max-width: 82%;
          padding: 9px 13px;
          font-size: 13px;
          line-height: 1.6;
          border-radius: 14px;
        }
        .chat-bubble.user {
          background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
          color: #0b1120;
          font-weight: 500;
          border-radius: 14px 14px 4px 14px;
          box-shadow: 0 2px 12px rgba(6,182,212,0.25);
        }
        .chat-bubble.assistant {
          background: rgba(30,41,59,0.7);
          color: #cbd5e1;
          border: 1px solid rgba(6,182,212,0.14);
          border-radius: 14px 14px 14px 4px;
          backdrop-filter: blur(4px);
        }
        .chat-typing {
          display: flex;
          gap: 4px;
          align-items: center;
          padding: 11px 14px;
        }
        .chat-typing span {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #06b6d4;
          display: inline-block;
          opacity: 0.4;
          animation: chat-dot-bounce 1.2s ease-in-out infinite;
        }
        .chat-typing span:nth-child(2) { animation-delay: 0.18s; }
        .chat-typing span:nth-child(3) { animation-delay: 0.36s; }
        @keyframes chat-dot-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.4; }
          50% { transform: translateY(-5px); opacity: 1; }
        }
        .chat-error {
          font-size: 11px;
          color: #f87171;
          margin: 0;
          text-align: center;
          padding: 4px 0;
        }
        .chat-suggestions {
          display: flex;
          flex-direction: column;
          gap: 4px;
          margin-top: 4px;
        }
        .chat-suggestion-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 12px;
          padding: 8px 11px;
          border-radius: 9px;
          border: 1px solid rgba(6,182,212,0.14);
          background: rgba(6,182,212,0.04);
          color: #94a3b8;
          cursor: pointer;
          text-align: left;
          transition: background 0.15s, border-color 0.15s, color 0.15s;
          letter-spacing: 0.01em;
        }
        .chat-suggestion-btn:hover {
          background: rgba(6,182,212,0.1);
          border-color: rgba(6,182,212,0.3);
          color: #e2e8f0;
        }
        .chat-suggestion-arrow {
          color: #06b6d4;
          font-size: 15px;
          line-height: 1;
          flex-shrink: 0;
        }
        .chat-input-row {
          padding: 10px 12px;
          border-top: 1px solid rgba(6,182,212,0.12);
          display: flex;
          gap: 8px;
          align-items: center;
          background: rgba(11,17,32,0.95);
          flex-shrink: 0;
        }
        .chat-input {
          flex: 1;
          font-size: 13px;
          padding: 9px 14px;
          border-radius: 10px;
          border: 1px solid rgba(6,182,212,0.2);
          background: rgba(30,41,59,0.5);
          color: #f1f5f9;
          outline: none;
          transition: border-color 0.15s, box-shadow 0.15s;
          font-family: inherit;
        }
        .chat-input::placeholder { color: #475569; }
        .chat-input:focus {
          border-color: rgba(6,182,212,0.5);
          box-shadow: 0 0 0 2px rgba(6,182,212,0.08);
        }
        .chat-send-btn {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          border: 1px solid rgba(6,182,212,0.15);
          background: rgba(6,182,212,0.06);
          color: #475569;
          cursor: default;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: all 0.15s;
        }
        .chat-send-btn.active {
          background: linear-gradient(135deg, #0891b2 0%, #06b6d4 100%);
          border-color: transparent;
          color: #0b1120;
          cursor: pointer;
          box-shadow: 0 2px 12px rgba(6,182,212,0.3);
        }
        .chat-send-btn.active:hover {
          box-shadow: 0 4px 18px rgba(6,182,212,0.45);
          transform: scale(1.05);
        }
      `}</style>
    </>
  );
}
