"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-youtube-dark-bg p-4 relative">
      <div className="fixed top-4 right-4 z-10 flex items-center gap-2">
        <ThemeToggle />
        <LanguageToggle />
      </div>

  <div className="bg-white dark:bg-youtube-dark-surface rounded-lg shadow-lg dark:shadow-black/50 w-full max-w-3xl p-6 border dark:border-youtube-dark-surface3">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
          {/* Left Side */}
          <div className="w-full md:w-auto flex flex-col items-center relative">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white dark:border-youtube-dark-surface2 overflow-hidden -mt-16 md:-mt-20">
              <img
                src="/CSI00138.jpg"
                alt="Profile"
                className="object-cover w-full h-full scale-150"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>

            {/* Social Icons */}
            <div className="flex gap-4 text-center mt-6">
              {[
                {
                  href: "https://www.linkedin.com/in/aphisit-danchaodang-108037358/",
                  icon: "ri:linkedin-box-fill",
                  color: "hover:text-blue-600",
                },
                {
                  href: "https://www.instagram.com/_aphsx",
                  icon: "ri:instagram-fill",
                  color: "hover:text-pink-500",
                },
                {
                  href: "https://github.com/aphsx",
                  icon: "ri:github-fill",
                  color: "hover:text-gray-600 dark:hover:text-gray-300",
                },
                {
                  href: "https://www.youtube.com/@WSench",
                  icon: "ri:youtube-fill",
                  color: "hover:text-youtube-dark-red",
                },
                {
                  href: "https://aphsx-portfolio.vercel.app/",
                  icon: "ri:user-fill",
                  color: "hover:text-youtube-dark-blue",
                },
              ].map(({ href, icon, color }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-700 dark:text-youtube-dark-textSecondary transition-colors ${color}`}
                >
                  <Icon icon={icon} className="text-[1.5rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col gap-1 md:mt-0">
            <h2 className="text-xl md:text-2xl font-bold text-gray-900 dark:text-youtube-dark-text">{t("name")}</h2>
            <p className="text-sm text-gray-600 dark:text-youtube-dark-textSecondary">{t("title")}</p>
            <p className="text-gray-600 dark:text-youtube-dark-textSecondary text-sm">
              {t("description")}{" "}
              <a
                href="https://cosi.bu.ac.th/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 dark:text-youtube-dark-blue underline hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                {t("centerLink")}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}