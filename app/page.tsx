// app/page.tsx — Server Component (no "use client" needed here)
import { LanguageProvider } from "@/context/language-context"
import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Skills from "@/components/skills"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <LanguageProvider>
      <Nav />
      <main>
        <Hero />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
