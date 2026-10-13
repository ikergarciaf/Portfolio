import { NextRequest, NextResponse } from "next/server"

const IKER_CONTEXT = `
You are Iker García Fernández, a cybersecurity analyst.
Answer questions in the FIRST PERSON ("I", "me", "my"), naturally and professionally.
IMPORTANT: Always respond in the same language as the user's message (Spanish or English).
Only state facts listed below. If asked about something not listed (certifications, employers, tools), say honestly that I don't have it yet or that it is not part of my profile. Never invent experience.

== FORMATTING RULES ==
- Use **bold** for key technologies, project names, and achievements.
- For LISTS (especially when asked about projects, skills, studies, or experience), respond with a SHORT intro sentence followed by a bulleted list. Use "- " at the start of each bullet (one per line).
- Each bullet: start with the **project/item name in bold**, then a dash, then a 1-line description.
- Keep the total reply under ~6 short bullets. Do not write long paragraphs when a list fits better.
- For non-list questions, keep answers to 2-4 sentences.

== ABOUT IKER ==
Full name: Iker García Fernández
Location: Toledo, Spain
Status: Actively looking for work in cybersecurity — available immediately
Contact: ikergarciafdez1@gmail.com · linkedin.com/in/ikergarciaf · github.com/ikergarciaf

== TECHNICAL STACK ==
- Offensive security: Kali Linux, Nmap, Burp Suite, Metasploit, Nikto, OWASP ZAP, penetration testing, vulnerability analysis, web security, OSINT, Android app analysis (apktool, jadx, adb).
- Networks and systems: Wireshark, traffic analysis, network security, DNS, DHCP, HTTP, FTP, SMTP, WLAN, Linux, Windows Server, Docker, Ansible.
- Scripting and AI: Bash, PowerShell, Python, Machine Learning, automation, security of AI-based applications.
- Development: React, TypeScript, Next.js, Python (FastAPI), Node.js (Express), PostgreSQL.

== EXPERIENCE ==
- Intern at **devlab:studio®** (March 2025 – June 2025, Madrid, hybrid): I built the whole backend and database of two real client websites, elalquilador.com and obrasimpala.com.

== CYBERSECURITY PROJECTS (all solo) ==
- **Security audit: OSINT + exploitation** — Phase I passive black-box recon (OSINT, DNS, Shodan) with no active testing against the real organization; Phase II on a vulnerable VM: anonymous FTP, exposed credentials, command injection, privilege escalation to root via sudo misconfiguration, 9 flags.
- **Web pentest: WackoPicko** — OWASP ZAP scan (16 alerts) and manual exploitation of 12 vulnerabilities (XSS, SQLi, LFI, directory traversal, weak credentials, predictable session ID, IDOR, logic flaw) with fixes.
- **Android app audit** — static and dynamic analysis: exported components, AES with hardcoded key, cleartext traffic, a backdoor, root/emulator detection bypass.

== DEVELOPMENT PROJECTS (solo) ==
- **Nexora** — SaaS for clinic management (in development): React, TypeScript, Express, Prisma, PostgreSQL, Stripe, JWT and Google OAuth.
- **PalmoSL** — AI business automation for Palmo Suministro Integral (email classification and replies, stock forecasting). Built with AI tools as part of the AI specialization course.

== EDUCATION ==
- **Master's in Cybersecurity** — IMF Business School with Deloitte and Universidad Católica de Ávila (Nov 2025 – Nov 2026, in progress)
- **Specialization Course in Artificial Intelligence** — Fedeto Business School (2026)
- **Higher Vocational Diploma in Network Systems Administration (ASIR)** — IES Ribera del Tajo (2023 – 2025)

== LANGUAGES ==
- Spanish: Native
- English: B2

== CERTIFICATIONS ==
None yet; I plan to get one in the future.

== LOOKING FOR ==
Roles in **Cybersecurity** (offensive security, pentesting, web and mobile application security). Open to remote or on-site positions in Spain.
`;

type ChatMessage = { role: "user" | "assistant"; content: string }
type GeminiMessage = { role: "user" | "model"; parts: { text: string }[] }

function getLocalReply(messages: ChatMessage[], lang: "es" | "en") {
  const question = messages
    .filter((message) => message.role === "user")
    .map((message) => message.content)
    .join(" ")
    .toLocaleLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")

  if (/proyect|project|portfolio|nexora|palmo|wackopicko|write.?up/.test(question)) {
    return lang === "es"
      ? "He trabajado en proyectos individuales de ciberseguridad y desarrollo:\n- **Auditoría OSINT y explotación** — 9 flags en una máquina virtual vulnerable, sin pruebas activas sobre la organización real.\n- **Pentest de WackoPicko** — Explotación manual de 12 vulnerabilidades y propuestas de corrección.\n- **Auditoría Android** — Análisis estático y dinámico de una aplicación vulnerable.\n- **Nexora** — SaaS para clínicas, actualmente en desarrollo.\n- **PalmoSL** — Automatización empresarial con IA."
      : "I've worked on individual cybersecurity and software projects:\n- **OSINT and exploitation audit** — 9 flags on a vulnerable VM, with no active testing against the real organization.\n- **WackoPicko pentest** — Manual exploitation of 12 vulnerabilities and remediation proposals.\n- **Android audit** — Static and dynamic analysis of a vulnerable app.\n- **Nexora** — Clinic-management SaaS, currently in development.\n- **PalmoSL** — AI-powered business automation."
  }

  if (/estudio|formacion|educacion|education|degree|master|curso|study/.test(question)) {
    return lang === "es"
      ? "Mi formación combina sistemas, ciberseguridad e inteligencia artificial:\n- **Máster en Ciberseguridad** — IMF Business School, Deloitte y UCAV (en curso).\n- **Especialización en Inteligencia Artificial** — Fedeto Business School.\n- **ASIR** — Administración de Sistemas Informáticos en Red, IES Ribera del Tajo."
      : "My education combines systems, cybersecurity, and AI:\n- **Master's in Cybersecurity** — IMF Business School, Deloitte, and UCAV (in progress).\n- **Specialization in Artificial Intelligence** — Fedeto Business School.\n- **Network Systems Administration (ASIR)** — IES Ribera del Tajo."
  }

  if (/experiencia|experience|trabaj|work|emple|job|contrat|hire/.test(question)) {
    return lang === "es"
      ? "Estoy buscando oportunidades en ciberseguridad y tengo disponibilidad inmediata. Hice prácticas en **devlab:studio®** (marzo–junio de 2025), donde desarrollé el backend y la base de datos de dos webs de clientes: elalquilador.com y obrasimpala.com."
      : "I'm actively looking for cybersecurity opportunities and am available immediately. I interned at **devlab:studio®** (March–June 2025), building the backend and database for two client websites: elalquilador.com and obrasimpala.com."
  }

  if (/habilidad|stack|tecnolog|skill|tool|know|sabes/.test(question)) {
    return lang === "es"
      ? "Mi stack incluye **Kali Linux, Nmap, Burp Suite, Metasploit, OWASP ZAP**, análisis web y Android, **Wireshark, Linux, Docker, Python, Bash, PowerShell, React, TypeScript, Next.js** y PostgreSQL."
      : "My stack includes **Kali Linux, Nmap, Burp Suite, Metasploit, OWASP ZAP**, web and Android analysis, **Wireshark, Linux, Docker, Python, Bash, PowerShell, React, TypeScript, Next.js**, and PostgreSQL."
  }

  if (/contact|email|correo|linkedin|github|ubicacion|location|where|donde/.test(question)) {
    return lang === "es"
      ? "Estoy en **Toledo, España** y abierto a puestos remotos o presenciales en España. Puedes escribirme a **ikergarciafdez1@gmail.com**, o encontrarme en LinkedIn como **ikergarciaf** y en GitHub como **ikergarciaf**."
      : "I'm based in **Toledo, Spain** and open to remote or on-site roles in Spain. You can email me at **ikergarciafdez1@gmail.com**, or find me on LinkedIn and GitHub as **ikergarciaf**."
  }

  if (/idioma|language|ingles|english|certificacion|certification/.test(question)) {
    return lang === "es"
      ? "Mi idioma nativo es el **español** y tengo nivel **B2 de inglés**. Todavía no tengo certificaciones profesionales."
      : "My native language is **Spanish**, and I have **B2 English**. I don't have professional certifications yet."
  }

  if (/ciberseguridad|security|pentest|vulnerab|android|owasp|osint/.test(question)) {
    return lang === "es"
      ? "Me centro en **seguridad ofensiva, pentesting y seguridad de aplicaciones web y móviles**. He documentado auditorías de OSINT y explotación en laboratorio, un pentest de WackoPicko y un análisis de seguridad Android, incluyendo medidas de mitigación."
      : "I focus on **offensive security, penetration testing, and web and mobile application security**. I've documented a lab-based OSINT and exploitation audit, a WackoPicko pentest, and an Android security analysis, including remediation measures."
  }

  return lang === "es"
    ? "Soy **Iker García**, analista de ciberseguridad de Toledo, especializado en seguridad ofensiva y pentesting. Pregúntame por mis proyectos, experiencia, formación o stack técnico."
    : "I'm **Iker García**, a cybersecurity analyst based in Toledo, focused on offensive security and penetration testing. Ask me about my projects, experience, education, or technical stack."
}

function isChatMessage(value: unknown): value is ChatMessage {
  if (typeof value !== "object" || value === null) return false
  const message = value as Record<string, unknown>
  return (
    (message.role === "user" || message.role === "assistant") &&
    typeof message.content === "string" &&
    message.content.trim().length > 0 &&
    message.content.length <= 2000
  )
}

export async function POST(req: NextRequest) {
  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: "Request body must be valid JSON" }, { status: 400 })
  }

  if (typeof body !== "object" || body === null) {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 })
  }

  const { messages, lang: requestedLang } = body as Record<string, unknown>
  if (
    !Array.isArray(messages) ||
    messages.length === 0 ||
    messages.length > 20 ||
    !messages.every(isChatMessage) ||
    !messages.some((message) => message.role === "user")
  ) {
    return NextResponse.json({ error: "Invalid messages. Send up to 20 user/assistant messages." }, { status: 400 })
  }

  const chatMessages = messages as ChatMessage[]
  const lang = requestedLang === "en" || requestedLang === "es"
    ? requestedLang
    : /[¿¡áéíóúñ]/i.test(chatMessages.at(-1)?.content ?? "") ? "es" : "en"
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    return NextResponse.json({ reply: getLocalReply(chatMessages, lang), mode: "profile" })
  }

  const geminiMessages: GeminiMessage[] = []
  for (const message of chatMessages) {
    if (message.role === "assistant" && geminiMessages.length === 0) continue
    const role = message.role === "user" ? "user" : "model"
    const previous = geminiMessages.at(-1)
    if (previous?.role === role) {
      previous.parts[0].text += `\n${message.content}`
    } else {
      geminiMessages.push({ role, parts: [{ text: message.content }] })
    }
  }

  if (geminiMessages[0]?.role !== "user") {
    return NextResponse.json({ error: "Conversation must start with a user message" }, { status: 400 })
  }

  try {
    const model = "gemini-2.5-flash"
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": apiKey,
        },
        body: JSON.stringify({
          systemInstruction: { parts: [{ text: IKER_CONTEXT.trim() }] },
          contents: geminiMessages,
          generationConfig: {
            maxOutputTokens: 300,
            temperature: 0.7,
          },
        }),
        signal: AbortSignal.timeout(20_000),
      }
    )
    const data: unknown = await response.json()
    const result = data as {
      error?: { message?: string }
      candidates?: { content?: { parts?: { text?: string }[] } }[]
    }

    if (!response.ok) {
      const status = response.status === 429 ? 429 : 502
      return NextResponse.json(
        { error: result.error?.message || `Gemini returned ${response.status}` },
        { status }
      )
    }

    const reply = result.candidates?.[0]?.content?.parts?.[0]?.text
    if (!reply) {
      return NextResponse.json({ error: "Gemini returned an empty response" }, { status: 502 })
    }
    return NextResponse.json({ reply, mode: "gemini" })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown Gemini request error"
    return NextResponse.json({ error: `Could not reach Gemini: ${message}` }, { status: 502 })
  }
}
