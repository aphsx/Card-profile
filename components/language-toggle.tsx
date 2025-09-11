"use client"

import { useLanguage } from "@/hooks/use-language"
import { Icon } from "@iconify/react"

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage()

  return (
    <button
      onClick={() => setLanguage(language === "en" ? "th" : "en")}
      className="flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-lg px-3 py-2 text-sm font-medium text-gray-700 hover:bg-white hover:shadow-md transition-all duration-200"
      aria-label="Switch language"
    >
      <Icon icon="ri:translate-2" className="text-lg" />
      <span>{language === "en" ? t("switchToThai") : t("switchToEnglish")}</span>
    </button>
  )
}
