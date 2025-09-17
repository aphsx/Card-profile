"use client";
import ProfileSection from "@/components/ProfileSection";
import AboutSection from "@/components/AboutSection";
import SkillsAndFrameworks from "@/components/Skills";
import { motion } from "framer-motion";

export default function PortfolioPage() {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 120, damping: 16 }}
      className="mx-auto max-w-2xl px-4 sm:px-6 xl:px-0 space-y-10"
    >
      <ProfileSection />
      <AboutSection />
      <SkillsAndFrameworks />
    </motion.div>
  );
}
