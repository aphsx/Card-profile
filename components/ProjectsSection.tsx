"use client";

import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import ProjectCard from "./ProjectCard";
import { projects } from "@/data/projects";

export default function ProjectsSection() {
  const { language } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-youtube-dark-text mb-4"
        >
          {language === "en" ? "My Projects" : "ผลงานของฉัน"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-youtube-dark-textSecondary max-w-2xl mx-auto"
        >
          {language === "en"
            ? "Here are some of the projects I've worked on, showcasing my skills in web development and software engineering."
            : "ต่อไปนี้คือโปรเจคต่างๆ ที่ฉันได้ทำ แสดงให้เห็นทักษะในการพัฒนาเว็บและวิศวกรรมซอฟต์แวร์"}
        </motion.p>
      </div>

      <div className="grid gap-8 md:gap-12">
        {projects.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>
    </motion.div>
  );
}
