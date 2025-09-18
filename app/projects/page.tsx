"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import ProjectsSection from "@/components/ProjectsSection";
import { useLanguage } from "@/hooks/use-language";

export default function ProjectsPage() {
  const { language } = useLanguage();
  return (
    <>
      <ProjectsSection />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
        className="text-center mt-12"
      >
        <Link
          href="/"
          className="inline-flex items-center px-6 py-3 bg-gray-900 dark:bg-youtube-dark-surface2 text-white dark:text-youtube-dark-text rounded-lg hover:bg-gray-800 dark:hover:bg-youtube-dark-hover transition-colors duration-200"
        >
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          {language === "en" ? "Back to Home" : "กลับหน้าหลัก"}
        </Link>
      </motion.div>
    </>
  );
}