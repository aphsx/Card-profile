"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/hooks/use-language";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { t } = useLanguage();

  const toggleMenu = () => setIsOpen((v) => !v);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 w-full bg-gray-50/95 dark:bg-youtube-dark-bg/95  py-4 min-h-16 transition-shadow duration-200 ${
      isScrolled 
        ? 'shadow-lg dark:shadow-black/30' 
        : 'shadow-sm dark:shadow-black/20'
    }`}>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 xl:px-0 grid grid-cols-[auto,1fr,auto] items-center">
        <Link href="/" className="break-words" aria-label="Home">
          <div className="flex items-center">
            <div className="text-lg sm:text-2xl font-bold text-gray-900 dark:text-youtube-dark-text hover:text-blue-500 dark:hover:text-youtube-dark-blue transition-colors">
              aphsx dev
            </div>
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="block sm:hidden text-gray-900 dark:text-youtube-dark-text hover:text-blue-500 dark:hover:text-youtube-dark-blue transition-colors"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5M3.75 18.25h16.5" />
          </svg>
        </button>

        <nav
          className={`fixed top-0 left-0 z-50 h-full w-3/4 bg-white dark:bg-youtube-dark-bg shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 sm:flex sm:items-center sm:bg-transparent sm:shadow-none sm:w-auto sm:justify-self-center`}
        >
          <ul className="flex flex-col items-start space-y-6 px-6 pt-20 sm:flex-row sm:space-y-0 sm:space-x-6 sm:pt-0">
            {/* <li>
              <Link href="/portfolio" className="whitespace-nowrap text-lg font-medium text-gray-900 dark:text-youtube-dark-text hover:text-blue-500 dark:hover:text-youtube-dark-blue transition-colors">
                {t("navbarPortfolio")}
              </Link>
            </li> */}
            <li>
              <Link href="/projects" className="whitespace-nowrap text-lg font-medium text-gray-900 dark:text-youtube-dark-text hover:text-blue-500 dark:hover:text-youtube-dark-blue transition-colors">
                {t("navbarProjects")}
              </Link>
            </li>
            <li>
              <Link href="/about" className="whitespace-nowrap text-lg font-medium text-gray-900 dark:text-youtube-dark-text hover:text-blue-500 dark:hover:text-youtube-dark-blue transition-colors">
                {t("navbarAbout")}
              </Link>
            </li>
            <li className="sm:hidden">
              <ThemeToggle />
            </li>
            {/* Language toggle on mobile menu */}
            <li className="sm:hidden">
              <LanguageToggle />
            </li>
          </ul>
        </nav>
        {/* Right-side utilities on larger screens */}
        <div className="hidden sm:flex items-center gap-3 justify-self-end">
          <div className="w-28 shrink-0 flex justify-end">
            <div className="flex items-center gap-2">
              <ThemeToggle />
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>

      {isOpen && <div onClick={toggleMenu} className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"></div>}
    </header>
  );
};

export default Navbar;
