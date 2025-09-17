"use client";

import { useEffect, useState } from "react";

export default function ProfileSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isRemoving, setIsRemoving] = useState(false);
  const text = "Always learning, always coding.";

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
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        APHISIT DANCHAODANG
      </h2>
      <h5 className="text-lg text-gray-600 mb-6" style={{ minHeight: "1.7em" }}>
        {text.slice(0, currentIndex) || " "}
      </h5>
    </section>
  );
}
