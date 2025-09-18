"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/hooks/use-language";

export default function ProfileSection() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const text = t("typingText");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        if (!isRemoving) {
          if (prevIndex === text.length) {
            setIsRemoving(true);
            return prevIndex;
          }
          return prevIndex + 1;
        } else {
          if (prevIndex === 0) {
            setIsRemoving(false);
            return prevIndex;
          }
          return prevIndex - 1;
        }
      });
    }, isRemoving ? 80 : 100);

    return () => clearInterval(interval);
  }, [isRemoving, text.length]);

  return (
    <section id="aboutus" className="pt-5">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("name")}</h2>
      <h5 className="text-lg text-gray-600 mb-6" style={{ minHeight: "1.7em" }}>
        {text.slice(0, currentIndex) || " "}
      </h5>
    </section>
  );
}
