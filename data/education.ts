export interface EducationItem {
  id: number;
  institution: string;
  degree: { en: string; th: string };
  period: { en: string; th: string };
  description: { en: string; th: string };
  cta?: { label: { en: string; th: string }; href: string };
}

export const education: EducationItem[] = [
  {
    id: 1,
    institution: "Bangkok University",
    degree: { en: "Computer Science (B.Sc.)", th: "วิทยาการคอมพิวเตอร์ (ปริญญาตรี)" },
    period: { en: "2023 – Present", th: "2566 – ปัจจุบัน" },
    description: {
      en: "The power of first impressions cannot be underestimated, and the gateway to capitalizing on them lies in exceptional website design...",
      th: "พลังของความประทับใจแรกพบไม่อาจมองข้ามได้ และกุญแจสำคัญในการใช้ประโยชน์จากสิ่งนี้คือการออกแบบเว็บไซต์ที่ยอดเยี่ยม...",
    },
    cta: { label: { en: "View Github", th: "ดู Github" }, href: "https://github.com/aphsx" },
  },
  {
    id: 2,
    institution: "Matthayomwatmaikrongtong School",
    degree: { en: "High School", th: "มัธยมศึกษา" },
    period: { en: "2018", th: "2561" },
    description: {
      en: "While I may not fit the conventional mold of a product manager, my diverse skill set in research, product design, and product coordination...",
      th: "แม้ผมอาจไม่ได้อยู่ในกรอบของผู้จัดการผลิตภัณฑ์แบบดั้งเดิม แต่ทักษะที่หลากหลายของผมในด้านการวิจัย การออกแบบผลิตภัณฑ์ และการประสานงานผลิตภัณฑ์...",
    },
    cta: { label: { en: "View Products", th: "ดูผลงาน" }, href: "/projects" },
  },
];
