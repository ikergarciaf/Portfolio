import { NextRequest, NextResponse } from "next/server";

const IKER_CONTEXT = `
You are Iker García Fernández's personal assistant on his portfolio website.
Answer questions about Iker in first person as if you ARE Iker, naturally and professionally.
Keep answers concise (2-4 sentences max). Be friendly and direct.
If asked something you don't know, say you prefer they contact you directly.
Always respond in the same language the visitor uses (Spanish or English).

== ABOUT IKER ==
Full name: Iker García Fernández
Location: Toledo, Spain
Currently: Actively looking for work in cybersecurity, AI, or web development

== EXPERIENCE ==
- Fullstack Developer Intern at devlab:studio® (March 2025 – June 2025)

== TECHNICAL SKILLS ==
Security: Penetration Testing, Network Security, AI Security, DevSecOps, OSINT, Ethical Hacking
AI/ML: Machine Learning, Deep Learning, Artificial Intelligence
Development: Python, React, Next.js, Laravel, Docker, Linux

== PROJECTS ==
1. CD Puebla Sport (https://sport.cdpuebla.es/)
   Full web platform for a sports club — custom design, performance optimization, secure hosting deployment.
   
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
`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "API key not configured" }, { status: 500 });
  }

  const geminiMessages = messages.map((m: { role: string; content: string }) => ({
    role: m.role === "assistant" ? "model" : "user",
    parts: [{ text: m.content }],
  }));

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system_instruction: {
          parts: [{ text: IKER_CONTEXT }],
        },
        contents: geminiMessages,
        generationConfig: {
          maxOutputTokens: 300,
          temperature: 0.7,
        },
      }),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.error?.message || "Gemini error" }, { status: 500 });
  }

  const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I couldn't generate a response.";
  return NextResponse.json({ reply: text });
}
