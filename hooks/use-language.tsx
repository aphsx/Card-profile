'use client';

import { useState, useEffect } from 'react';

type Language = 'en' | 'cs';

interface UseLanguageReturn {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

export function useLanguage(): UseLanguageReturn {
  const [language, setLanguage] = useState<Language>('en');

  const translations: Record<Language, Record<string, string>> = {
    en: {
      welcome: 'Welcome to our website',
      about: 'About Us',
      contact: 'Contact',
      // Add more translations as needed
    },
    cs: {
      welcome: 'Vítejte na našich stránkách',
      about: 'O nás',
      contact: 'Kontakt',
      // Add more translations as needed
    },
  };

  useEffect(() => {
    const stored = localStorage.getItem('language');
    if (stored === 'en' || stored === 'cs') {
      setLanguage(stored);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return { language, setLanguage: handleSetLanguage, t };
}
