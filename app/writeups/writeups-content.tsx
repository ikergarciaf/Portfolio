"use client"

import { useLang } from "@/context/language-context"
import Nav from "@/components/nav"
import Footer from "@/components/footer"
import { FileText } from "lucide-react"

type L = { en: string; es: string }
const WRITEUPS: { title: L; scope: L; method: L[]; findings: L[]; fixes: L[]; pdf: string }[] = [
  {
    title: { en: "Security audit: OSINT + exploitation", es: "Auditoría de seguridad: OSINT + explotación" },
    scope: { en: "Two phases: passive black-box recon of an organization, then exploitation of a vulnerable VM provided for the exercise. No active testing was done against the real organization.",
             es: "Dos fases: reconocimiento pasivo de caja negra de una organización y explotación de una máquina vulnerable preparada para el ejercicio. No se hicieron pruebas activas sobre la organización real." },
    method: [
      { en: "Phase I: Google Dorks, theHarvester, Amass, Shodan, nslookup, whois and dig.", es: "Fase I: Google Dorks, theHarvester, Amass, Shodan, nslookup, whois y dig." },
      { en: "Phase II: port and service scan, Nikto, manual analysis with Burp Suite.", es: "Fase II: escaneo de puertos y servicios, Nikto y análisis manual con Burp Suite." },
    ],
    findings: [
      { en: "Anonymous FTP access and credentials exposed in client-side code.", es: "Acceso FTP anónimo y credenciales expuestas en el código del cliente." },
      { en: "Sensitive paths listed in robots.txt and a command injection flaw.", es: "Rutas sensibles en robots.txt y una inyección de comandos." },
      { en: "Privilege escalation to root through a sudo misconfiguration; 9 flags captured.", es: "Escalada a root por mala configuración de sudo; 9 flags capturadas." },
    ],
    fixes: [
      { en: "Disable anonymous FTP, never ship secrets to the client, validate and escape user input, apply least privilege in sudoers.", es: "Desactivar FTP anónimo, no enviar secretos al cliente, validar y escapar entradas, aplicar mínimo privilegio en sudoers." },
    ],
    pdf: "/Auditoria_IMF.pdf",
  },
  {
    title: { en: "Web pentest: WackoPicko", es: "Pentest web: WackoPicko" },
    scope: { en: "Intentionally vulnerable PHP/MySQL app running in a local VM.", es: "Aplicación PHP/MySQL vulnerable a propósito, ejecutada en una máquina virtual local." },
    method: [
      { en: "OWASP ZAP in proxy mode: Spider and Active Scan (16 alerts: 1 high, 4 medium, 7 low, 4 informational).", es: "OWASP ZAP como proxy: Spider y Active Scan (16 alertas: 1 alta, 4 medias, 7 bajas, 4 informativas)." },
      { en: "Manual exploitation of each finding in the browser.", es: "Explotación manual de cada hallazgo desde el navegador." },
    ],
    findings: [
      { en: "XSS (reflected, stored, multi-step, behind JavaScript), reflected and stored SQL injection, LFI, directory traversal.", es: "XSS (reflejado, almacenado, multi-step y tras JavaScript), SQL injection reflejada y almacenada, LFI y directory traversal." },
      { en: "admin/admin credentials, incremental session ID, IDOR and a coupon logic flaw. ZAP missed the logic and session issues.", es: "Credenciales admin/admin, ID de sesión incremental, IDOR y un fallo lógico con cupones. ZAP no detectó los fallos de lógica ni de sesión." },
    ],
    fixes: [
      { en: "htmlspecialchars on output, PDO prepared statements, allowlists for includes, basename() for paths, random session IDs, ownership checks, one-time coupon tracking.", es: "htmlspecialchars en la salida, sentencias preparadas con PDO, listas blancas en includes, basename() en rutas, IDs de sesión aleatorios, comprobación de propiedad y control de cupones usados." },
    ],
    pdf: "/WackoPicko.pdf",
  },
  {
    title: { en: "Android app audit", es: "Auditoría de app Android" },
    scope: { en: "Intentionally vulnerable Android app (InsecureApp) analysed statically and dynamically.", es: "App Android vulnerable a propósito (InsecureApp) analizada de forma estática y dinámica." },
    method: [
      { en: "apktool and jadx for the manifest and code; adb and Genymotion for runtime; Burp Suite for traffic.", es: "apktool y jadx para el manifest y el código; adb y Genymotion en ejecución; Burp Suite para el tráfico." },
    ],
    findings: [
      { en: "Excessive permissions, debuggable app and unprotected exported components.", es: "Permisos excesivos, app debuggable y componentes exportados sin protección." },
      { en: "AES with hardcoded key and static IV, exposed ContentProvider, cleartext traffic.", es: "AES con clave hardcodeada e IV estático, ContentProvider expuesto y tráfico en texto plano." },
      { en: "A /devlogin backdoor and root/emulator detection bypass.", es: "Un backdoor /devlogin y bypass de la detección de root y emulador." },
    ],
    fixes: [
      { en: "Set exported=false and debuggable=false, use Android Keystore with random IVs, enforce HTTPS, remove debug endpoints, treat client-side checks as bypassable.", es: "exported=false y debuggable=false, Android Keystore con IVs aleatorios, forzar HTTPS, eliminar endpoints de depuración y asumir que las comprobaciones en el cliente se pueden saltar." },
    ],
    pdf: "/Auditoria_AndroidDevice.pdf",
  },
]

export default function WriteupsContent() {
  const { t } = useLang()
  const block = (label: L, items: L[]) => (
    <div className="mb-4">
      <h4 className="font-mono text-xs uppercase tracking-widest text-[#06b6d4]/80 mb-2">{t(label.en, label.es)}</h4>
      <ul className="list-disc pl-5 space-y-1 text-sm text-slate-400">
        {items.map((i) => <li key={i.en}>{t(i.en, i.es)}</li>)}
      </ul>
    </div>
  )
  return (
    <>
      <Nav />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-28">
        <h1 className="text-4xl font-extrabold text-white mb-3">Write-ups</h1>
        <p className="text-slate-400 mb-12">{t("Short summaries of my security audits. Full reports are linked on each one.", "Resúmenes cortos de mis auditorías de seguridad. Cada una enlaza a su informe completo.")}</p>
        <div className="space-y-8">
          {WRITEUPS.map((w) => (
            <article key={w.title.en} className="bg-[#111827]/60 rounded-2xl border border-[#1e293b] p-6">
              <h2 className="text-xl font-bold text-white mb-2">{t(w.title.en, w.title.es)}</h2>
              <p className="text-sm text-slate-400 mb-5">{t(w.scope.en, w.scope.es)}</p>
              {block({ en: "Method", es: "Método" }, w.method)}
              {block({ en: "Findings", es: "Hallazgos" }, w.findings)}
              {block({ en: "Remediation", es: "Mitigación" }, w.fixes)}
              <a href={w.pdf} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-[#06b6d4] hover:text-[#22d3ee] font-mono text-sm mt-2">
                <FileText size={15} aria-hidden="true" />{t("View PDF Report", "Ver informe PDF")}
              </a>
            </article>
          ))}
        </div>
      </main>
      <Footer />
    </>
  )
}
