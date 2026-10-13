"use client"

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react"

type Lang = "en" | "es"

interface LanguageContextValue {
  lang: Lang
  toggle: () => void
  t: (en: string, es: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE_KEY = "portfolio-lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === "en" || saved === "es") setLang(saved)
  }, [])

  const toggle = () => {
    setLang((current) => {
      const next = current === "en" ? "es" : "en"
      localStorage.setItem(STORAGE_KEY, next)
      document.documentElement.lang = next
      return next
    })
  }

  const t = (en: string, es: string) => (lang === "en" ? en : es)

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const context = useContext(LanguageContext)
  if (!context) throw new Error("useLang must be used inside LanguageProvider")
  return context
}
