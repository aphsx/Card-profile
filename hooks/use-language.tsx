"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

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
    follow: "Follow my portfolio",
    description:
      "I am a Computer Science student at Bangkok University. | working as a Full Stack Web Developer and Programmer at the",
    centerLink: "Center of Specialty Innovation",
    switchToThai: "English",
    switchToEnglish: "Thai",
    typingText: "Always learning, always coding.",
    aboutTitle: "About Me",
    aboutP1:
      "I'm a Full-Stack web developer skilled in building dynamic user interfaces with React and Next.js, and developing robust APIs with Node.js. I enjoy solving complex problems and crafting user-friendly web applications.",
    aboutP2:
      "Beyond coding, I love photography, traveling, and exploring creative hobbies like drawing.",
    aboutBtn: "My portfolio",
    skillsTitle: "Skills and Frameworks",
    navbarPortfolio: "Portfolio",
    navbarProjects: "Projects",
    navbarAbout: "About",
    themeLightMode: "Light Mode",
    themeDarkMode: "Dark Mode",
  },
  th: {
    name: "อภิสิทธิ์ ด่านเจ้าแดง",
    title: "นักพัฒนาเว็บไซต์ Fullstack | Programer",
    follow: "ติดตาม ผลงาน",
    description: "นักศึกษาวิทยาการคอมพิวเตอร์ที่มหาวิทยาลัยกรุงเทพ | ทำงานเป็นนักพัฒนาเว็บไซต์ Fullstack และโปรแกรมเมอร์ที่",
    centerLink: "Center of Specialty Innovation.",
    switchToThai: "English",
    switchToEnglish: "Thai",
    typingText: "เรียนรู้อยู่เสมอ เขียนโค้ดอยู่เสมอ",
    aboutTitle: "เกี่ยวกับฉัน",
    aboutP1:
      "ผมเป็นนักพัฒนาเว็บแบบ Full-Stack ถนัดการสร้าง UI แบบไดนามิกด้วย React และ Next.js และพัฒนา API ด้วย Node.js ผมชอบแก้ปัญหาที่ซับซ้อนและสร้างเว็บที่ใช้งานง่าย",
    aboutP2:
      "นอกเหนือจากการเขียนโค้ด ผมชอบถ่ายภาพ ท่องเที่ยว และทำงานศิลปะอย่างการวาดรูป",
    aboutBtn: "ดูผลงาน",
    skillsTitle: "ทักษะและเฟรมเวิร์ก",
    navbarPortfolio: "ผลงาน",
    navbarProjects: "โปรเจกต์",
    navbarAbout: "เกี่ยวกับ",
    themeLightMode: "โหมดสว่าง",
    themeDarkMode: "โหมดมืด",
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children, initialLanguage = "en" }: { children: ReactNode; initialLanguage?: Language }) {
  const [language, setLanguage] = useState<Language>(initialLanguage)

  useEffect(() => {
    // Persist language and reflect on document
    try {
      localStorage.setItem("lang", language)
      document.documentElement.setAttribute("lang", language)
      // set cookie for SSR to read on next request
      const oneYear = 60 * 60 * 24 * 365
      document.cookie = `lang=${language}; path=/; max-age=${oneYear}`
    } catch {}
  }, [language])

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
