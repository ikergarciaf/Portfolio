# 🛡️ Iker García | AI & Cybersecurity Portfolio

Bienvenido a mi portfolio personal. Este proyecto es una plataforma de alto rendimiento diseñada para mostrar mi trayectoria en **Ciberseguridad**, **Inteligencia Artificial** y **Desarrollo Web Full-Stack**.

> **Live Demo:** https://portfolioikerg.vercel.app

---

## 🚀 Perfil Profesional

Soy un especialista enfocado en la convergencia entre la IA y la seguridad informática. Mi trabajo se centra en:
* **Pentesting & Auditoría:** Análisis de vulnerabilidades, OSINT y escalada de privilegios.
* **Machine Learning:** Implementación de modelos para la automatización de detección de amenazas.
* **Desarrollo Seguro:** Creación de infraestructuras web robustas y optimizadas.

## 🛠️ Stack Tecnológico

El sitio está construido con las últimas tecnologías del ecosistema web para garantizar velocidad y seguridad:

* **Framework:** [Next.js 15](https://nextjs.org/) (App Router).
* **Lenguaje:** [TypeScript](https://www.typescriptlang.org/) para un código robusto y tipado.
* **Estilos:** [Tailwind CSS 4](https://tailwindcss.com/) con animaciones personalizadas.
* **Contexto:** Gestión de estado bilingüe (EN/ES) con persistencia en `localStorage`.
* **Iconografía:** Lucide React.

## 📂 Proyectos Destacados

* **Pentesting & Security Audit:** Ciclo completo de hacking ético con 9 flags capturadas, incluyendo análisis de inyección de comandos y XSS.
* **CD Puebla Sport:** Plataforma web completa con enfoque en rendimiento y despliegue seguro en hosting.
* **Dominios Premium IA:** Gestión de activos digitales como `agenteautonomo.es`.

## 🎓 Formación Continua

* **Máster en Ciberseguridad:** IMF Smart Education × Deloitte (En curso).
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
│   ├── services.tsx
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