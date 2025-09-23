"use client";

import { useState, useEffect } from "react";

export function ThemeToggle() {
  const [isDark, setIsDark] = useState(false); // Always start false for SSR
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Only after mount, read the actual dark mode state
    setMounted(true);
    if (typeof document !== "undefined") {
      // Check localStorage first, then cookies, then DOM class
      let theme = null;
      try {
        theme = localStorage.getItem("theme");
      } catch {}
      
      if (!theme) {
        // Try to read from cookie
        const cookieTheme = document.cookie
          .split(";")
          .find(row => row.trim().startsWith("theme="))
          ?.split("=")[1];
        theme = cookieTheme;
      }
      
      if (!theme) {
        // Fallback to checking DOM class
        theme = document.documentElement.classList.contains("dark") ? "dark" : "light";
      }
      
      setIsDark(theme === "dark");
    }
  }, []);

  const toggle = () => {
    const next = !isDark;
    const root = document.documentElement;
    root.classList.toggle("dark", next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
      // Also set cookie for SSR
      const oneYear = 60 * 60 * 24 * 365;
      document.cookie = `theme=${next ? "dark" : "light"}; path=/; max-age=${oneYear}`;
    } catch {}
    setIsDark(next);
  };

  // Before mounting, always show moon icon (light mode default)
  if (!mounted) {
    return (
      <button
        className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white/80 dark:bg-youtube-dark-surface/80 dark:border-youtube-dark-surface3 hover:bg-white dark:hover:bg-youtube-dark-hover hover:shadow transition"
        aria-label="Loading theme toggle"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="inline-flex items-center justify-center w-9 h-9 rounded-md border border-gray-300 bg-white/80 dark:bg-youtube-dark-surface/80 dark:border-youtube-dark-surface3 hover:bg-white dark:hover:bg-youtube-dark-hover hover:shadow transition"
    >
      {isDark ? (
        // Sun icon
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500">
          <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
          <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3A.75.75 0 0112 2.25zm0 16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zM4.72 4.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06L4.72 5.78a.75.75 0 010-1.06zm12.44 12.44a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2.25 12a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5H3a.75.75 0 01-.75-.75zm16.5 0a.75.75 0 01.75-.75h1.5a.75.75 0 010 1.5h-1.5a.75.75 0 01-.75-.75zM4.72 19.28a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06L5.78 19.28a.75.75 0 01-1.06 0zm12.44-12.44a.75.75 0 010-1.06l1.06-1.06a.75.75 0 111.06 1.06l-1.06 1.06a.75.75 0 01-1.06 0z" clipRule="evenodd" />
        </svg>
      ) : (
        // Moon icon - crescent moon with outline
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-blue-600">
          <path d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      )}
    </button>
  );
}
