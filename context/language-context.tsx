"use client"

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react"

export type Lang = "en" | "es"

interface LanguageContextType {
  lang: Lang
  toggle: () => void
  t: (en: string, es: string) => string
}

const LanguageContext = createContext<LanguageContextType | null>(null)

const STORAGE_KEY = "portfolio-lang"

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("es")

  // Rehydrate from localStorage on mount (avoids SSR mismatch)
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY) as Lang | null
    if (saved === "en" || saved === "es") setLang(saved)
  }, [])

  const toggle = () =>
    setLang((prev) => {
      const next: Lang = prev === "en" ? "es" : "en"
      localStorage.setItem(STORAGE_KEY, next)
      // Update the <html lang> attribute dynamically
      document.documentElement.lang = next
      return next
    })

  const t = (en: string, es: string) => (lang === "en" ? en : es)

  return (
    <LanguageContext.Provider value={{ lang, toggle, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLang() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error("useLang must be used inside LanguageProvider")
  return ctx
}
