"use client";
import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleMenu = () => setIsOpen((v) => !v);
  const toggleTheme = () => {
    setIsDarkMode((v) => !v);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("dark");
    }
  };

  return (
    <header className="w-full dark:bg-gray-950 py-4">
      <div className="mx-auto max-w-2xl px-4 sm:px-6 xl:px-0 flex items-center justify-between">
        <Link href="/" className="break-words" aria-label="Home">
          <div className="flex items-center">
            <div className="text-lg sm:text-2xl font-bold hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400">
              aphsx dev
            </div>
          </div>
        </Link>

        <button
          onClick={toggleMenu}
          className="block sm:hidden text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400"
          aria-label="Toggle Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-6 w-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.75h16.5M3.75 12h16.5M3.75 18.25h16.5" />
          </svg>
        </button>

        <nav
          className={`fixed top-0 left-0 z-50 h-full w-3/4 bg-white dark:bg-gray-900 shadow-lg transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300 ease-in-out sm:static sm:translate-x-0 sm:flex sm:items-center sm:bg-transparent sm:shadow-none sm:w-auto`}
        >
          <ul className="flex flex-col items-start space-y-6 px-6 pt-20 sm:flex-row sm:space-y-0 sm:space-x-6 sm:pt-0">
            <li>
              <Link href="/portfolio" className="text-lg font-medium text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400">
                Portfolio
              </Link>
            </li>
            <li>
              <Link href="/projects" className="text-lg font-medium text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/about" className="text-lg font-medium text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400">
                About
              </Link>
            </li>
            <li className="sm:hidden">
              <button onClick={toggleTheme} aria-label="Theme switcher" type="button" className="flex items-center justify-center text-lg font-medium text-gray-900 hover:text-blue-500 dark:text-gray-100 dark:hover:text-primary-400">
                {isDarkMode ? "Light Mode" : "Dark Mode"}
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {isOpen && <div onClick={toggleMenu} className="fixed inset-0 z-40 bg-black bg-opacity-50 sm:hidden"></div>}
    </header>
  );
};

export default Navbar;
