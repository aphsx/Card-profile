"use client";

import React, { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { useLanguage } from "@/hooks/use-language";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/data/projects";

export default function Home() {
  const { t, language } = useLanguage();
  const featuredProjects = projects.slice(0, 2);
  const [showSections, setShowSections] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show other sections when user scrolls down more than half viewport height
      const threshold = window.innerHeight * 0.6;
      if (currentScrollY > threshold) {
        setShowSections(true);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-youtube-dark-bg dark:via-youtube-dark-surface dark:to-youtube-dark-bg">


      {/* Fixed Navigation */}
      <div className="fixed top-6 right-6 z-50 flex items-center gap-3">
        <ThemeToggle />
        <LanguageToggle />
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center px-4 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl"
        >
          {/* Main Profile Card */}
          <div className="bg-white/80 dark:bg-youtube-dark-surface/90 backdrop-blur-sm rounded-2xl shadow-xl dark:shadow-2xl border border-gray-200/50 dark:border-youtube-dark-surface2/50 p-8 md:p-12">
            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-16">
              {/* Profile Section */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="flex flex-col items-center text-center lg:text-left"
              >
                {/* Profile Image */}
                <div className="relative mb-6">
                  <div className="w-40 h-40 lg:w-48 lg:h-48 rounded-full overflow-hidden border-4 border-gradient-to-r from-blue-500 to-purple-600 p-1">
                    <div className="w-full h-full rounded-full overflow-hidden bg-white dark:bg-youtube-dark-surface2">
                      <img
                        src="/CSI00138.jpg"
                        alt="Profile"
                        className="object-cover w-full h-full scale-150"
                        style={{ objectPosition: "50% 20%" }}
                      />
                    </div>
                  </div>
                  {/* Status indicator */}
                  <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-3 border-white dark:border-youtube-dark-surface animate-pulse"></div>
                </div>

                {/* Social Links */}
                <div className="flex gap-4 mb-6">
                  {[
                    {
                      href: "https://www.linkedin.com/in/aphisit-danchaodang-108037358/",
                      icon: "ri:linkedin-box-fill",
                      color: "hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20",
                      label: "LinkedIn"
                    },
                    {
                      href: "https://www.instagram.com/_aphsx",
                      icon: "ri:instagram-fill",
                      color: "hover:text-pink-500 hover:bg-pink-50 dark:hover:bg-pink-900/20",
                      label: "Instagram"
                    },
                    {
                      href: "https://github.com/aphsx",
                      icon: "ri:github-fill",
                      color: "hover:text-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50",
                      label: "GitHub"
                    },
                    {
                      href: "https://www.youtube.com/@WSench",
                      icon: "ri:youtube-fill",
                      color: "hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20",
                      label: "YouTube"
                    },
                  ].map(({ href, icon, color, label }, index) => (
                    <motion.a
                      key={index}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                      className={`p-3 rounded-full text-gray-600 dark:text-youtube-dark-textSecondary transition-all duration-300 ${color} transform hover:scale-110`}
                      aria-label={label}
                    >
                      <Icon icon={icon} className="text-xl" />
                    </motion.a>
                  ))}
                </div>
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex-1 space-y-6"
              >
                <div className="space-y-3">
                  <h1 className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                    {t("name")}
                  </h1>
                  <p className="text-lg text-gray-600 dark:text-youtube-dark-textSecondary font-medium">
                    {t("title")}
                  </p>
                </div>

                <p className="text-gray-700 dark:text-youtube-dark-textSecondary leading-relaxed">
                  {t("description")}{" "}
                  <a
                    href="https://cosi.bu.ac.th/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4 transition-colors"
                  >
                    {t("centerLink")}
                  </a>
                  .
                </p>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Link href="/portfolio">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      {t("follow")}
                    </motion.button>
                  </Link>
                  <Link href="https://aphsx-portfolio.vercel.app/">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-6 py-3 border-2 border-gray-300 dark:border-youtube-dark-surface2 text-gray-700 dark:text-youtube-dark-text rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-youtube-dark-surface2 transition-all duration-300"
                    >
                      <Icon icon="ri:external-link-line" className="inline mr-2" />
                      {language === "en" ? "Portfolio Site" : "เว็บไซต์แสดงผลงาน"}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Scroll Indicator - Hide after scroll */}
          <AnimatePresence>
            {!showSections && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: 1, duration: 0.6 }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center"
              >
                <p className="text-sm text-gray-500 dark:text-youtube-dark-textSecondary mb-3 font-medium">
                  {language === "en" ? "Scroll to explore" : "เลื่อนเพื่อสำรวจ"}
                </p>
                <motion.div
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                  className="p-2 rounded-full border-2 border-gray-300 dark:border-youtube-dark-surface2 hover:bg-gray-100 dark:hover:bg-youtube-dark-surface2 transition-colors cursor-pointer"
                  onClick={() => {
                    window.scrollTo({
                      top: window.innerHeight,
                      behavior: 'smooth'
                    });
                  }}
                >
                  <Icon icon="ri:arrow-down-line" className="w-5 h-5 text-gray-600 dark:text-youtube-dark-textSecondary" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </section>

      {/* Portfolio Navigation Section - Only show after scroll */}
      <AnimatePresence>
        {showSections && (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="py-20 bg-white/50 dark:bg-youtube-dark-surface/50"
          >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6">
              {language === "en" ? "Explore My World" : "สำรวจโลกของฉัน"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-youtube-dark-textSecondary max-w-2xl mx-auto leading-relaxed">
              {language === "en"
                ? "Dive into my professional journey, creative projects, and technical expertise"
                : "ดำดิ่งสู่การเดินทางในอาชีพ โปรเจคสร้างสรรค์ และความเชี่ยวชาญทางเทคนิค"}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: language === "en" ? "About Me" : "เกี่ยวกับฉัน",
                description: language === "en" ? "Discover my background, journey, and passion for technology" : "ค้นพบประวัติ การเดินทาง และความหลงใหลในเทคโนโลยี",
                icon: "ri:user-heart-line",
                href: "/portfolio",
                gradient: "from-blue-500 to-cyan-500",
                bgGradient: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20"
              },
              {
                title: language === "en" ? "Projects" : "โปรเจค",
                description: language === "en" ? "Explore innovative solutions and creative developments" : "สำรวจโซลูชั่นที่เป็นนวัตกรรมและการพัฒนาที่สร้างสรรค์",
                icon: "ri:code-s-slash-line",
                href: "/projects",
                gradient: "from-green-500 to-emerald-500",
                bgGradient: "from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              },
              {
                title: language === "en" ? "Skills" : "ทักษะ",
                description: language === "en" ? "Dive deep into my technical skills and frameworks" : "เจาะลึกทักษะเทคนิคและเฟรมเวิร์คของฉัน",
                icon: "ri:tools-fill",
                href: "/portfolio#skills",
                gradient: "from-purple-500 to-pink-500",
                bgGradient: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.15, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <Link href={item.href}>
                  <div className={`relative bg-gradient-to-br ${item.bgGradient} p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden`}>
                    {/* Background decoration */}
                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-white/20 to-transparent rounded-full -translate-y-16 translate-x-16 group-hover:scale-150 transition-transform duration-700"></div>

                    {/* Icon */}
                    <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${item.gradient} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon icon={item.icon} className="text-2xl text-white" />
                    </div>

                    {/* Content */}
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {item.description}
                    </p>

                    {/* Arrow */}
                    <div className="flex items-center text-gray-500 dark:text-gray-400 group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                      <span className="text-sm font-medium mr-2">
                        {language === "en" ? "Explore" : "สำรวจ"}
                      </span>
                      <Icon icon="ri:arrow-right-line" className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
          </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Featured Projects Section - Only show after scroll */}
      <AnimatePresence>
        {showSections && (
          <motion.section
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-youtube-dark-bg dark:via-youtube-dark-surface dark:to-youtube-dark-bg"
          >
        <div className="max-w-6xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 dark:from-white dark:via-gray-200 dark:to-white bg-clip-text text-transparent mb-6">
              {language === "en" ? "Featured Works" : "ผลงานเด่น"}
            </h2>
            <p className="text-xl text-gray-600 dark:text-youtube-dark-textSecondary max-w-3xl mx-auto leading-relaxed">
              {language === "en"
                ? "Showcasing innovative solutions and creative developments that demonstrate my passion for technology"
                : "นำเสนอโซลูชั่นนวัตกรรมและการพัฒนาสร้างสรรค์ที่แสดงถึงความหลงใหลในเทคโนโลยี"}
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-8 mb-16">
            {featuredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.8 }}
                viewport={{ once: true }}
                whileHover={{ y: -8 }}
                className="group"
              >
                <div className="bg-white dark:bg-youtube-dark-surface rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
                  {/* Project Image */}
                  {project.image && (
                    <div className="relative h-64 lg:h-72 overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title[language]}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Status Badge */}
                      <div className="absolute top-4 right-4">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm border ${
                          project.status === 'completed'
                            ? 'bg-green-100/90 text-green-800 border-green-200'
                            : 'bg-blue-100/90 text-blue-800 border-blue-200'
                        }`}>
                          {project.status === 'completed'
                            ? (language === "en" ? "Completed" : "เสร็จสิ้น")
                            : (language === "en" ? "In Progress" : "กำลังดำเนินการ")
                          }
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Project Content */}
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {project.title[language]}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                      {project.description[language]}
                    </p>

                    {/* Technologies */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 text-gray-700 dark:text-gray-200 text-sm rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-800 dark:to-purple-800 text-blue-700 dark:text-blue-200 text-sm rounded-lg font-medium">
                          +{project.technologies.length - 4}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-4">
                      {project.liveUrl && (
                        <motion.a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                        >
                          <Icon icon="ri:external-link-line" className="mr-2" />
                          {language === "en" ? "Live Demo" : "ดูเดโม"}
                        </motion.a>
                      )}
                      {project.githubUrl && (
                        <motion.a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex items-center px-4 py-2 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-200 rounded-xl font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300"
                        >
                          <Icon icon="ri:github-line" className="mr-2" />
                          {language === "en" ? "Source Code" : "ซอร์สโค้ด"}
                        </motion.a>
                      )}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <Link href="/projects">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 dark:from-white dark:via-gray-100 dark:to-white text-white dark:text-gray-900 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 group"
              >
                {language === "en" ? "Explore All Projects" : "สำรวจโปรเจคทั้งหมด"}
                <Icon icon="ri:arrow-right-line" className="ml-3 text-xl group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
            </Link>
          </motion.div>
          </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* Additional content to make page scrollable */}
      {!showSections && (
        <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 dark:from-youtube-dark-surface dark:via-youtube-dark-bg dark:to-youtube-dark-surface flex items-center justify-center">
          <div className="text-center space-y-6 px-4">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                {language === "en" ? "Keep Scrolling..." : "เลื่อนต่อไป..."}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {language === "en"
                  ? "Discover more about my work and experience below"
                  : "ค้นพบเพิ่มเติมเกี่ยวกับงานและประสบการณ์ของฉันด้านล่าง"}
              </p>
            </motion.div>
          </div>
        </div>
      )}
    </div>
  );
}