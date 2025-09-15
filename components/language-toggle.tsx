"use client";

import { useLanguage } from "@/hooks/use-language";
import { Icon } from "@iconify/react";

export function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();
  const isEnglish = language === "en";

  const handleToggle = () => setLanguage(isEnglish ? "th" : "en");

  return (
    <button
      onClick={handleToggle}
      className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white/80 border border-gray-200 rounded-lg backdrop-blur-sm hover:bg-white hover:shadow-md transition-all duration-200"
      aria-label="Switch language"
    >
      <Icon icon="ri:translate-2" className="text-lg" />
      <span>{isEnglish ? t("switchToThai") : t("switchToEnglish")}</span>
    </button>
  );
}
