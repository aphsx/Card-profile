"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

type Language = "en" | "th"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    name: "Aphisit Danchaodang",
    title: "Full Stack Web Developer | Programmer",
    follow: "Follow",
    description:
      "I am a Computer Science student at Bangkok University. | working as a Full Stack Web Developer and Programmer at the",
    centerLink: "Center of Specialty Innovation",
    switchToThai: "English",
    switchToEnglish: "Thai",
  },
  th: {
    name: "อภิสิทธิ์ ด่านเจ้าแดง",
    title: "นักพัฒนาเว็บไซต์ Fullstack | Programer",
    follow: "ติดตาม",
    description: "นักศึกษาวิทยาการคอมพิวเตอร์ที่มหาวิทยาลัยกรุงเทพ | ทำงานเป็นนักพัฒนาเว็บไซต์ Fullstack และโปรแกรมเมอร์ที่",
    centerLink: "Center of Specialty Innovation.",
    switchToThai: "English",
    switchToEnglish: "Thai",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>("en")

  const t = (key: string): string => {
    return translations[language][key as keyof (typeof translations)["en"]] || key
  }

  return <LanguageContext.Provider value={{ language, setLanguage, t }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}
