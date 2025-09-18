export type Language = "en" | "th";

export interface Project {
  id: number;
  title: { en: string; th: string };
  description: { en: string; th: string };
  image?: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  status: "completed" | "in-progress" | "planned";
}

export const PROJECT_IMAGE_PLACEHOLDER = "/images/placeholder.svg" as const;

export const projects: Project[] = [
  {
    id: 1,
    title: {
      en: "E-Medical Project",
      th: "โปรเจค E-Medical",
    },
    description: {
      en: "A comprehensive medical management system with patient records, appointment scheduling, and prescription management.",
      th: "ระบบจัดการทางการแพทย์ที่ครอบคลุม รวมประวัติผู้ป่วย การนัดหมาย และการจัดการใบสั่งยา",
    },
    image: "/images/EmedProject.png",
    technologies: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Node.js",
    ],
    liveUrl: "https://emed-project.vercel.app",
    githubUrl: "https://github.com/aphsx/emed-project",
    status: "completed",
  },
  {
    id: 2,
    title: {
      en: "Portfolio Website",
      th: "เว็บไซต์แสดงผลงาน",
    },
    description: {
      en: "Personal portfolio website showcasing my projects, skills, and experience with modern design and animations.",
      th: "เว็บไซต์แสดงผลงานส่วนตัว แสดงโปรเจค ทักษะ และประสบการณ์ พร้อมดีไซน์และแอนิเมชันสมัยใหม่",
    },
    image: "/images/portfolio.png",
    technologies: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Framer Motion",
      "TypeScript",
    ],
    liveUrl: "https://aphsx-portfolio.vercel.app",
    githubUrl: "https://github.com/aphsx/portfolio",
    status: "completed",
  },
  {
    id: 3,
    title: {
      en: "CoSI Innovation Platform",
      th: "แพลตฟอร์มนวัตกรรม CoSI",
    },
    description: {
      en: "Innovation management platform for Center of Specialty Innovation with project tracking and collaboration tools.",
      th: "แพลตฟอร์มจัดการนวัตกรรมสำหรับ Center of Specialty Innovation พร้อมเครื่องมือติดตามโปรเจคและการทำงานร่วมกัน",
    },
    image: "/images/CoSI Overall news.png",
    technologies: ["React", "Node.js", "MongoDB", "Express.js", "Material-UI"],
    liveUrl: "https://cosi.bu.ac.th",
    status: "in-progress",
  },
];
