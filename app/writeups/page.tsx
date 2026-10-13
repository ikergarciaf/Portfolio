import { LanguageProvider } from "@/context/language-context"
import WriteupsContent from "./writeups-content"

export const metadata = { title: "Write-ups | Iker García" }

export default function WriteupsPage() {
  return (
    <LanguageProvider>
      <WriteupsContent />
    </LanguageProvider>
  )
}
