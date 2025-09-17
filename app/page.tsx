"use client";

import React from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import Link from "next/link";

export default function Home() {
  const { t } = useLanguage();

  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4 relative">
      <div className="fixed top-4 right-4 z-10">
        <LanguageToggle />
      </div>

  <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
          {/* Left Side */}
          <div className="w-full md:w-auto flex flex-col items-center relative">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden -mt-16 md:-mt-20">
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
                },
                {
                  href: "https://www.instagram.com/_aphsx",
                  icon: "ri:instagram-fill",
                },
                {
                  href: "https://github.com/aphsx",
                  icon: "ri:github-fill",
                },
                {
                  href: "https://www.youtube.com/@WSench",
                  icon: "ri:youtube-fill",
                },
                {
                  href: "https://aphsx-portfolio.vercel.app/",
                  icon: "ri:user-fill",
                },
              ].map(({ href, icon }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon icon={icon} className="text-[1.5rem]" />
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="flex-1 flex flex-col gap-1 md:mt-0">
            <h2 className="text-xl md:text-2xl font-bold">{t("name")}</h2>
            <p className="text-sm text-gray-600">{t("title")}</p>
            <Link href="/portfolio">
              <button className="bg-gray-900 text-white px-4 py-1 rounded-lg">
                {t("follow")}
              </button>
            </Link>
            <p className="text-gray-600 text-sm">
              {t("description")}{" "}
              <a
                href="https://cosi.bu.ac.th/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                {t("centerLink")}
              </a>
              .
            </p>
          </div>
        </div>
      </div>
      {/* Down Arrow to navigate to portfolio */}
      <div className="absolute bottom-6 flex justify-center w-full">
        <Link href="/portfolio" aria-label="Go to portfolio" className="animate-bounce text-gray-700 hover:text-black">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
            <path fillRule="evenodd" d="M11.47 3.97a.75.75 0 011.06 0l6 6a.75.75 0 11-1.06 1.06L12.75 6.31v13.94a.75.75 0 01-1.5 0V6.31L6.53 11.03a.75.75 0 11-1.06-1.06l6-6z" clipRule="evenodd" transform="rotate(180 12 12)" />
          </svg>
        </Link>
      </div>
    </div>
  );
}