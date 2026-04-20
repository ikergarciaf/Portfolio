import { NextRequest, NextResponse } from "next/server";

const IKER_CONTEXT = `
You are Iker García Fernández, a cybersecurity and AI specialist. 
Answer questions in the FIRST PERSON ("I", "me", "my"), naturally and professionally.
Keep answers concise (2-4 sentences). Be friendly and direct.
IMPORTANT: Always respond in the same language as the user's message (Spanish or English).
FORMATTING: Use **bold** for key technologies or achievements to make them stand out.

== ABOUT IKER ==
Full name: Iker García Fernández
Location: Toledo, Spain
Status: Actively looking for work — available immediately

== TECHNICAL STACK (PRIORITY ORDER) ==
1. **Cybersecurity**: Penetration Testing, Network Security, AI Security, DevSecOps, OSINT, Ethical Hacking, Vulnerability Analysis, Privilege Escalation.
2. **Artificial Intelligence**: Machine Learning, Deep Learning, AI implementation in security and web environments.
3. **Development**: Python, React, Next.js, Laravel, Docker, Linux.

== EXPERIENCE ==
- Fullstack Developer Intern at **devlab:studio®** (March 2025 – June 2025)

== PROJECTS ==
1. **CD Puebla Sport**: Full web platform for a sports club (https://sport.cdpuebla.es/).
2. **Pentesting & Security Audit**: Full ethical hacking cycle (OSINT, Black-box, Command Injection, Privilege Escalation) — 9 flags captured.

== EDUCATION ==
- **Master's Degree in Cybersecurity** — IMF Smart Education × Deloitte
- **Specialization Course in Artificial Intelligence** — Fedeto Business School
- **Professional Degree in ASIR** — IES Ribera del Tajo

== LANGUAGES ==
- Spanish: Native
- English: B2

== LOOKING FOR ==
Roles in **Cybersecurity**, **Artificial Intelligence**, or **Web Development**. Open to remote or on-site positions in Spain.
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

    type GeminiMsg = { role: "user" | "model"; parts: { text: string }[] };
    const geminiMessages: GeminiMsg[] = [];

    for (const m of messages) {
      const role: "user" | "model" = m.role === "user" ? "user" : "model";
      if (geminiMessages.length === 0 && role === "model") continue;

      const lastMsg = geminiMessages[geminiMessages.length - 1];
      if (lastMsg && lastMsg.role === role) {
        lastMsg.parts[0].text += "\n" + m.content;
      } else {
        geminiMessages.push({ role, parts: [{ text: m.content }] });
      }
    }

    if (geminiMessages.length === 0 || geminiMessages[0].role !== "user") {
      return NextResponse.json({ error: "Invalid message sequence" }, { status: 400 });
    }

    // Use gemma-3-4b-it as it's the most reliable with current free tier quotas
    const model = "gemma-3-4b-it";
    
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            { role: "user", parts: [{ text: `SYSTEM CONTEXT: ${IKER_CONTEXT}\n\nYou are Iker. Respond naturally.` }] },
            { role: "model", parts: [{ text: "Understood. I am Iker and I will respond to users based on my profile, prioritizing cybersecurity and AI." }] },
            ...geminiMessages,
          ],
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 429) {
        return NextResponse.json(
          { error: "Quota exceeded. Please try again in a few seconds." },
          { status: 429 }
        );
      }
      return NextResponse.json(
        { error: data.error?.message || `Gemini returned ${response.status}` },
        { status: 500 }
      );
    }

    const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) {
      return NextResponse.json({ error: "No response text" }, { status: 500 });
    }

    return NextResponse.json({ reply: text });
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
