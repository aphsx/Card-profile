"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import type { Project } from "@/data/projects";
import { PROJECT_IMAGE_PLACEHOLDER } from "@/data/projects";

function getStatusColor(status: Project["status"]) {
  switch (status) {
    case "completed":
      return "bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300";
    case "in-progress":
      return "bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300";
    case "planned":
      return "bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300";
    default:
      return "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300";
  }
}

function getStatusText(status: Project["status"], language: "en" | "th") {
  const statusTexts = {
    completed: { en: "Completed", th: "เสร็จสิ้น" },
    "in-progress": { en: "In Progress", th: "กำลังดำเนินการ" },
    planned: { en: "Planned", th: "วางแผน" },
  } as const;
  return statusTexts[status][language];
}

export default function ProjectCard({ project, index = 0 }: { project: Project; index?: number }) {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 * index, duration: 0.5 }}
      className="bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 overflow-hidden border dark:border-youtube-dark-surface3 hover:shadow-xl dark:hover:shadow-black/70 transition-shadow duration-300"
    >
      <div className="md:flex">
        <div className="md:w-1/2">
          <div className="relative h-64 md:h-full">
            <img
              src={project.image || PROJECT_IMAGE_PLACEHOLDER}
              alt={project.title[language]}
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.currentTarget as HTMLImageElement;
                if (target.src.endsWith(PROJECT_IMAGE_PLACEHOLDER)) return;
                target.src = PROJECT_IMAGE_PLACEHOLDER;
              }}
            />
            <div className="absolute top-4 left-4">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status, language)}
              </span>
            </div>
          </div>
        </div>

        <div className="md:w-1/2 p-6 md:p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-3">
            {project.title[language]}
          </h3>
          <p className="text-gray-600 dark:text-youtube-dark-textSecondary mb-4 leading-relaxed">
            {project.description[language]}
          </p>

          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 dark:text-youtube-dark-text mb-2">
              {language === "en" ? "Technologies:" : "เทคโนโลยี:"}
            </h4>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech, techIndex) => (
                <span
                  key={techIndex}
                  className="px-3 py-1 bg-gray-100 dark:bg-youtube-dark-surface2 text-gray-700 dark:text-youtube-dark-textSecondary rounded-full text-sm"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
                {language === "en" ? "Live Demo" : "ดูเดโม"}
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-4 py-2 bg-gray-800 dark:bg-youtube-dark-surface2 hover:bg-gray-900 dark:hover:bg-youtube-dark-hover text-white dark:text-youtube-dark-text rounded-lg transition-colors duration-200"
              >
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                {language === "en" ? "View Code" : "ดูโค้ด"}
              </a>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
