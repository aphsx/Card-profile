"use client";

import React from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/hooks/use-language";
import Link from "next/link";

export default function AboutPage() {
  const { language } = useLanguage();

  const skills = [
    { category: "Frontend", items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "HTML5", "CSS3", "JavaScript"] },
    { category: "Backend", items: ["Node.js", "Express.js", "Python", "Firebase", "MongoDB", "REST APIs"] },
    { category: "Tools & Others", items: ["Git", "GitHub", "VS Code", "Figma", "Photoshop", "Vercel"] }
  ];

  const experiences = [
    {
      title: { en: "Full Stack Developer", th: "นักพัฒนาฟูลสแตค" },
      company: "Center of Specialty Innovation (CoSI)",
      period: { en: "2023 - Present", th: "2566 - ปัจจุบัน" },
      description: {
        en: "Developing web applications and innovation management systems. Working with modern technologies like React, Node.js, and cloud services.",
        th: "พัฒนาเว็บแอปพลิเคชันและระบบจัดการนวัตกรรม ทำงานกับเทคโนโลยีสมัยใหม่เช่น React, Node.js และบริการคลาวด์"
      }
    },
    {
      title: { en: "Computer Science Student", th: "นักศึกษาวิทยาการคอมพิวเตอร์" },
      company: "Bangkok University",
      period: { en: "2022 - Present", th: "2565 - ปัจจุบัน" },
      description: {
        en: "Studying Computer Science with focus on software engineering, web development, and data structures & algorithms.",
        th: "ศึกษาวิทยาการคอมพิวเตอร์โดยเน้นวิศวกรรมซอฟต์แวร์ การพัฒนาเว็บ และโครงสร้างข้อมูลและอัลกอริทึม"
      }
    }
  ];

  const interests = [
    { name: { en: "Photography", th: "การถ่ายภาพ" }, icon: "📸" },
    { name: { en: "Traveling", th: "การท่องเที่ยว" }, icon: "✈️" },
    { name: { en: "Drawing", th: "การวาดรูป" }, icon: "🎨" },
    { name: { en: "Gaming", th: "เกม" }, icon: "🎮" },
    { name: { en: "Music", th: "ดนตรี" }, icon: "🎵" },
    { name: { en: "Reading", th: "การอ่าน" }, icon: "📚" }
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-4xl mx-auto px-4 py-8"
    >
      {/* Header */}
      <div className="text-center mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-4xl font-bold text-gray-900 dark:text-youtube-dark-text mb-4"
        >
          {language === "en" ? "About Me" : "เกี่ยวกับฉัน"}
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-lg text-gray-600 dark:text-youtube-dark-textSecondary max-w-2xl mx-auto"
        >
          {language === "en"
            ? "Get to know more about my journey, skills, and interests in technology and beyond."
            : "เรียนรู้เพิ่มเติมเกี่ยวกับการเดินทาง ทักษะ และความสนใจของฉันในเทคโนโลยีและอื่นๆ"}
        </motion.p>
      </div>

      {/* About Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="mb-12"
      >
        <div className="bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 p-8 border dark:border-youtube-dark-surface3">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-6">
            {language === "en" ? "My Story" : "เรื่องราวของฉัน"}
          </h2>
          <div className="prose prose-lg max-w-none">
            {language === "en" ? (
              <div className="space-y-4 text-gray-600 dark:text-youtube-dark-textSecondary">
                <p>
                  Hello! I'm <strong className="text-gray-900 dark:text-youtube-dark-text">Aphisit Danchaodang</strong>, 
                  a passionate Full Stack Web Developer and Computer Science student at Bangkok University. 
                  I have a genuine love for creating digital solutions that make a difference.
                </p>
                <p>
                  My journey in programming started during my university years, where I discovered the power of 
                  turning ideas into functional applications. I specialize in modern web technologies like React, 
                  Next.js, and Node.js, always staying updated with the latest trends and best practices.
                </p>
                <p>
                  Currently, I work at the Center of Specialty Innovation (CoSI), where I contribute to building 
                  innovative systems and platforms. I enjoy the collaborative nature of development and the 
                  satisfaction of solving complex problems with elegant code.
                </p>
                <p>
                  Beyond coding, I'm passionate about photography, traveling, and exploring creative outlets like 
                  drawing. I believe that diverse interests fuel creativity and bring fresh perspectives to 
                  problem-solving in tech.
                </p>
              </div>
            ) : (
              <div className="space-y-4 text-gray-600 dark:text-youtube-dark-textSecondary">
                <p>
                  สวัสดีครับ! ผมชื่อ <strong className="text-gray-900 dark:text-youtube-dark-text">อภิสิทธิ์ ด่านเจ้าแดง</strong> 
                  เป็นนักพัฒนาเว็บไซต์ฟูลสแตคที่มีความหลงใหลและเป็นนักศึกษาวิทยาการคอมพิวเตอร์ที่มหาวิทยาลัยกรุงเทพ 
                  ผมมีความรักในการสร้างโซลูชันดิจิทัลที่สร้างความแตกต่าง
                </p>
                <p>
                  การเดินทางในโลกของการเขียนโปรแกรมเริ่มต้นขึ้นในช่วงเรียนมหาวิทยาลัย 
                  ที่ซึ่งผมได้ค้นพบพลังของการเปลี่ยนไอเดียให้กลายเป็นแอปพลิเคชันที่ใช้งานได้จริง 
                  ผมเชี่ยวชาญในเทคโนโลยีเว็บสมัยใหม่อย่าง React, Next.js และ Node.js 
                  และติดตามแนวโน้มและแนวปทักติบพื้นฐานใหม่ๆ อยู่เสมอ
                </p>
                <p>
                  ปัจจุบันผมทำงานที่ Center of Specialty Innovation (CoSI) 
                  ซึ่งผมได้มีส่วนร่วมในการสร้างระบบและแพลตฟอร์มที่เป็นนวัตกรรม 
                  ผมชอบลักษณะการทำงานร่วมกันในการพัฒนาและความพึงพอใจในการแก้ปัญหาที่ซับซ้อนด้วยโค้ดที่สวยงาม
                </p>
                <p>
                  นอกเหนือจากการเขียนโค้ด ผมมีความหลงใหลในการถ่ายภาพ การท่องเที่ยว 
                  และการสำรวจช่องทางสร้างสรรค์อย่างการวาดรูป 
                  ผมเชื่อว่าความสนใจที่หลากหลายจะเป็นเชื้อเพลิงให้กับความคิดสร้างสรรค์และนำมุมมองใหม่ๆ 
                  มาสู่การแก้ปัญหาในโลกเทคโนโลยี
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {/* Skills Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-6">
          {language === "en" ? "Skills & Technologies" : "ทักษะและเทคโนโลยี"}
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 p-6 border dark:border-youtube-dark-surface3"
            >
              <h3 className="text-lg font-semibold text-gray-900 dark:text-youtube-dark-text mb-4">
                {skillGroup.category}
              </h3>
              <div className="space-y-2">
                {skillGroup.items.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="inline-block bg-gray-100 dark:bg-youtube-dark-surface2 text-gray-700 dark:text-youtube-dark-textSecondary px-3 py-1 rounded-full text-sm mr-2 mb-2"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Experience Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-6">
          {language === "en" ? "Experience" : "ประสบการณ์"}
        </h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + index * 0.1, duration: 0.5 }}
              className="bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 p-6 border dark:border-youtube-dark-surface3"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-youtube-dark-text">
                  {exp.title[language]}
                </h3>
                <span className="text-blue-600 dark:text-blue-400 font-medium">
                  {exp.period[language]}
                </span>
              </div>
              <p className="text-gray-700 dark:text-youtube-dark-textSecondary font-medium mb-2">
                {exp.company}
              </p>
              <p className="text-gray-600 dark:text-youtube-dark-textSecondary">
                {exp.description[language]}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Interests Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.5 }}
        className="mb-12"
      >
        <h2 className="text-2xl font-bold text-gray-900 dark:text-youtube-dark-text mb-6">
          {language === "en" ? "Interests & Hobbies" : "ความสนใจและงานอดิเรก"}
        </h2>
        <div className="bg-white dark:bg-youtube-dark-surface rounded-xl shadow-lg dark:shadow-black/50 p-6 border dark:border-youtube-dark-surface3">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {interests.map((interest, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.1, duration: 0.3 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-gray-50 dark:bg-youtube-dark-surface2 hover:bg-gray-100 dark:hover:bg-youtube-dark-hover transition-colors duration-200"
              >
                <span className="text-2xl">{interest.icon}</span>
                <span className="text-gray-700 dark:text-youtube-dark-textSecondary font-medium">
                  {interest.name[language]}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Contact CTA */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="text-center"
      >
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl shadow-lg p-8 text-white">
          <h2 className="text-2xl font-bold mb-4">
            {language === "en" ? "Let's Connect!" : "มาเชื่อมต่อกัน!"}
          </h2>
          <p className="mb-6 opacity-90">
            {language === "en"
              ? "I'm always open to discussing new opportunities, collaborations, or just having a chat about technology."
              : "ผมพร้อมที่จะหารือเกี่ยวกับโอกาสใหม่ๆ การทำงานร่วมกัน หรือแค่คุยเกี่ยวกับเทคโนโลยี"}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="mailto:aphisit@example.com"
              className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              {language === "en" ? "Email Me" : "ส่งอีเมล"}
            </a>
            <Link
              href="/"
              className="inline-flex items-center px-6 py-3 bg-white/20 hover:bg-white/30 rounded-lg transition-colors duration-200"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              {language === "en" ? "Back to Home" : "กลับหน้าหลัก"}
            </Link>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}