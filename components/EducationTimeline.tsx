"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import { education } from "@/data/education";

export default function EducationTimeline() {
  const { language } = useLanguage();

  return (
    <section className="mb-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-6">
        {language === "en" ? "Education" : "การศึกษา"}
      </h2>

      <div className="relative pl-6">
        {/* Vertical line */}
        <span className="absolute left-3 top-0 bottom-0 w-px bg-gray-200 dark:bg-youtube-dark-surface2" />

        <div className="space-y-6">
          {education.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.4 }}
              className="relative bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 p-6 border dark:border-youtube-dark-surface3"
            >
              {/* Dot */}
              <span className="absolute -left-[7px] top-6 w-3 h-3 rounded-full bg-blue-600" />

              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-youtube-dark-text">
                    {item.institution}
                  </h3>
                  <p className="text-gray-700 dark:text-youtube-dark-textSecondary">
                    {item.degree[language]}
                  </p>
                </div>
                <span className="mt-2 md:mt-0 text-blue-600 dark:text-blue-400 font-medium">
                  {item.period[language]}
                </span>
              </div>

              <p className="text-gray-600 dark:text-youtube-dark-textSecondary mb-4">
                {item.description[language]}
              </p>

              {item.cta && (
                <a
                  href={item.cta.href}
                  className="inline-flex items-center px-4 py-2 bg-gray-900 dark:bg-youtube-dark-surface2 text-white dark:text-youtube-dark-text rounded-lg hover:bg-gray-800 dark:hover:bg-youtube-dark-hover transition-colors duration-200"
                >
                  {item.cta.label[language]}
                </a>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
