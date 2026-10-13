import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"
import ChatWidget from "@/components/ChatWidget";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
})

const firaCode = Fira_Code({
  subsets: ["latin"],
  variable: "--font-fira-code",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Iker García | Cybersecurity Analyst",
  description:
    "Portfolio of Iker García Fernández — Cybersecurity Analyst focused on offensive security, pentesting and web and mobile application security.",
  keywords: ["cybersecurity", "pentesting", "offensive security", "OWASP", "OSINT", "web security", "Android security", "portfolio"],
  authors: [{ name: "Iker García Fernández" }],
  openGraph: {
    title: "Iker García | Cybersecurity Analyst",
    description: "Cybersecurity Analyst portfolio: pentesting, web and Android security audits",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // NOTE: lang is set to "es" as default since the author is Spanish.
    // Dynamic lang switching via JS is handled client-side in the context,
    // but the HTML attribute defaults to "es" for SEO / screen readers.
    <html lang="es" className={`${inter.variable} ${firaCode.variable}`}>
      <body className="font-sans antialiased">
        {children}
        <ChatWidget />
      </body>
    </html>
  )
}
