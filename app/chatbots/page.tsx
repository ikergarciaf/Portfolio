import { LanguageProvider } from "@/context/language-context"
import ChatbotsContent from "./chatbots-content"

export default function ChatbotsPage() {
  return (
    <LanguageProvider>
      <ChatbotsContent />
    </LanguageProvider>
  )
}
