import type { Metadata } from "next"
import { Inter, Fira_Code } from "next/font/google"
import "./globals.css"

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
  title: "Iker García | AI & Cybersecurity",
  description:
    "Portfolio of Iker García Fernández — AI & Cybersecurity specialist. Pentesting, infrastructure security, machine learning, and custom web development.",
  keywords: ["cybersecurity", "AI", "pentesting", "portfolio", "web development", "OSINT"],
  authors: [{ name: "Iker García Fernández" }],
  openGraph: {
    title: "Iker García | AI & Cybersecurity",
    description: "AI & Cybersecurity specialist portfolio",
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
