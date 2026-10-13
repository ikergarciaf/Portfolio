"use client"

import { useLang } from "@/context/language-context"
import SectionHeader from "@/components/section-header"

const GROUPS = [
  { en: "Offensive security", es: "Ciberseguridad ofensiva",
    items: ["Kali Linux", "Nmap", "Burp Suite", "Metasploit", "Nikto", "OWASP ZAP", "Pentesting", "Vulnerability analysis", "Web security", "OSINT", "apktool", "jadx", "adb"] },
  { en: "Networks and systems", es: "Redes y sistemas",
    items: ["Wireshark", "Traffic analysis", "DNS", "DHCP", "HTTP", "FTP", "SMTP", "WLAN", "Linux", "Windows Server", "Docker", "Ansible"] },
  { en: "Scripting and AI", es: "Scripting e IA",
    items: ["Bash", "PowerShell", "Python", "Machine Learning", "Automation", "AI application security"] },
  { en: "Development", es: "Desarrollo",
    items: ["React", "TypeScript", "Next.js", "FastAPI", "Node.js / Express", "PostgreSQL"] },
] as const

export default function Skills() {
  const { t } = useLang()
  return (
    <section id="skills" className="relative py-28" aria-label="Skills">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader number="03" en="Technical Skills" es="Habilidades Técnicas" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {GROUPS.map((g) => (
            <div key={g.en} className="bg-[#111827]/60 rounded-2xl border border-[#1e293b] p-6">
              <h3 className="text-white font-bold mb-4">{t(g.en, g.es)}</h3>
              <ul className="flex flex-wrap gap-2">
                {g.items.map((i) => (
                  <li
                    key={i}
                    className="rounded border border-[#06b6d4]/12 bg-[#06b6d4]/8 px-2 py-0.5 font-mono text-xs text-[#06b6d4]"
                  >
                    {i}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
