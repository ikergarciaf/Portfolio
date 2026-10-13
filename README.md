# 🛡️ Iker García | Cybersecurity Analyst Portfolio

Bienvenido a mi portfolio personal. Este proyecto es una plataforma de alto rendimiento diseñada para mostrar mi trayectoria en **Ciberseguridad ofensiva**, **Inteligencia Artificial aplicada** y **Desarrollo Web Full-Stack**.

> **Live Demo:** https://portfolioikerg.vercel.app

---

## 🚀 Perfil Profesional

Soy analista de ciberseguridad enfocado en seguridad ofensiva, pentesting y seguridad de aplicaciones web y móviles. Mi trabajo se centra en:
* **Pentesting & Auditoría:** reconocimiento (OSINT), explotación y post-explotación en entornos controlados, con informes y medidas de mitigación.
* **Seguridad de aplicaciones:** análisis web (OWASP ZAP, Burp Suite) y de apps Android (apktool, jadx, adb).
* **IA y desarrollo:** automatización con IA y desarrollo full stack (React, TypeScript, Python).

## 🛠️ Stack Tecnológico

El sitio está construido con las últimas tecnologías del ecosistema web para garantizar velocidad y seguridad:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un código robusto y tipado.
* **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) con animaciones personalizadas.
* **Contexto:** Gestión de estado bilingüe (EN/ES) con persistencia en `localStorage`.
* **Iconografía:** Lucide React.

## 📂 Proyectos Destacados

* **Auditoría de Seguridad (OSINT + explotación):** reconocimiento caja negra y explotación en máquina vulnerable (FTP anónimo, command injection, escalada a root) — 9 flags.
* **Pentest Web WackoPicko:** OWASP ZAP + 12 vulnerabilidades explotadas manualmente (XSS, SQLi, LFI, IDOR, logic flaw...) con medidas de prevención.
* **Auditoría de App Android:** análisis estático y dinámico (componentes exportados, criptografía débil, tráfico en claro, backdoor, bypass de root/emulador).
* **Nexora:** SaaS de gestión para clínicas (en desarrollo).
* **PalmoSL:** automatización empresarial con IA para Palmo Suministro Integral.

## 🎓 Formación Continua

* **Máster en Ciberseguridad:** IMF Business School × Deloitte × UCAV (En curso).
* **Especialización en IA:** Fedeto Business School (En curso).
* **ASIR:** Administración de Sistemas Informáticos en Red.

---

## 🛠️ Instalación y Desarrollo

Si deseas replicar este entorno localmente:

1.  **Clonar el repositorio:**
    ```bash
    git clone https://github.com/ikergarciaf/Portfolio.git
    ```
2.  **Instalar dependencias:**
    ```bash
    npm install
    ```
3.  **Ejecutar en modo desarrollo:**
    ```bash
    npm run dev
    ```
4.  **Chatbot (opcional):** sin configuración, el chat responde localmente sobre el perfil y los proyectos. Para habilitar respuestas generativas, define `GEMINI_API_KEY` en `.env.local` con una clave de Google AI Studio y reinicia el servidor.

## 🔐 Seguridad y Buenas Prácticas

Este repositorio ha sido optimizado eliminando dependencias innecesarias y corrigiendo errores de configuración para mejorar el bundle size y la seguridad del despliegue.

---

Hecho con 💻 y 🛡️ por **Iker García Fernández**.

## 🗂 Estructura de archivos

```
mi-portfolio/
├── app/
│   ├── globals.css          ← único archivo CSS (fusionado)
│   ├── layout.tsx           ← Server Component
│   └── page.tsx             ← Server Component
├── components/
│   ├── section-header.tsx   ← NUEVO: componente compartido
│   ├── nav.tsx
│   ├── hero.tsx
│   ├── education.tsx
│   ├── projects.tsx
│   ├── contact.tsx
│   └── footer.tsx
├── context/
│   └── language-context.tsx ← con localStorage + lang dinámico
├── hooks/
│   └── use-mobile.ts        ← fuente única
├── lib/
│   └── utils.ts
├── next.config.mjs          ← corregido
├── package.json             ← dependencias limpias
└── tsconfig.json
```