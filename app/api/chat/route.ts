import { NextRequest, NextResponse } from "next/server";

const IKER_CONTEXT = `
You are a personal AI assistant on Iker García Fernández's portfolio website.
Answer questions AS Iker, in first person, naturally and professionally.
Keep answers concise (2-4 sentences). Be friendly, direct, and honest.
If asked something outside this context, say you prefer they reach out directly.
IMPORTANT: Always respond in the same language as the user's message. If they write in Spanish, reply in Spanish. If in English, reply in English.

== ABOUT IKER ==
Full name: Iker García Fernández
Location: Toledo, Spain
Status: Actively looking for work — available immediately

== EXPERIENCE ==
- Fullstack Developer Intern at devlab:studio® (March 2025 – June 2025)

== TECHNICAL SKILLS ==
Security: Penetration Testing, Network Security, AI Security, DevSecOps, OSINT, Ethical Hacking, Vulnerability Analysis, Privilege Escalation
AI/ML: Machine Learning, Deep Learning, Artificial Intelligence
Development: Python, React, Next.js, Laravel, Docker, Linux

== PROJECTS ==
1. CD Puebla Sport (https://sport.cdpuebla.es/)
   Full web platform for a sports club — custom design, performance optimization, and secure hosting deployment.

2. Pentesting & Security Audit
   Full ethical hacking cycle: OSINT, black-box reconnaissance, vulnerability analysis
   (Command Injection, FTP anonymous access, XSS), privilege escalation to root — 9 flags captured.

== EDUCATION ==
- Master's Degree in Cybersecurity — IMF Smart Education × Deloitte
- Specialization Course in Artificial Intelligence — Fedeto Business School
- Professional Degree in Networked Computer Systems Administration (ASIR) — IES Ribera del Tajo

== LANGUAGES ==
- Spanish: Native
- English: B2

== LOOKING FOR ==
Companies in Cybersecurity, Artificial Intelligence, or Web Development.
Open to remote or on-site positions in Spain.
`;

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json();

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "GEMINI_API_KEY is not set in environment variables" },
        { status: 500 }
      );
    }

    // Gemini expects alternating user/model turns — ensure first is always user
    const geminiMessages = messages
      .filter((m: { role: string; content: string }) => m.role !== "assistant" || messages.indexOf(m) > 0)
      .map((m: { role: string; content: string }) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      }));

    // Gemini API requires turns to alternate strictly; filter out the initial assistant welcome if needed
    const filtered = geminiMessages.filter(
      (m: { role: string }, i: number) =>
        i === 0 ? m.role === "user" : m.role !== geminiMessages[i - 1]?.role
    );

    if (filtered.length === 0 || filtered[filtered.length - 1].role !== "user") {
      return NextResponse.json({ error: "Invalid message sequence" }, { status: 400 });
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: {
            parts: [{ text: IKER_CONTEXT }],
          },
          contents: filtered,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API error:", data);
      return NextResponse.json(
        { error: data.error?.message || `Gemini returned ${response.status}` },
        { status: 500 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Unexpected Gemini response shape:", JSON.stringify(data));
      return NextResponse.json(
        { error: "No text in Gemini response" },
        { status: 500 }
      );
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    console.error("Chat route error:", msg);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
