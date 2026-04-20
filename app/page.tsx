// app/page.tsx — Server Component (no "use client" needed here)
import { LanguageProvider } from "@/context/language-context"
import Nav from "@/components/nav"
import Hero from "@/components/hero"
import Education from "@/components/education"
import Projects from "@/components/projects"
import Services from "@/components/services"
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
        <Services />
        <Contact />
      </main>
      <Footer />
    </LanguageProvider>
  )
}
