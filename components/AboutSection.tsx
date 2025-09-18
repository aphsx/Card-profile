import Link from "next/link";
import { useLanguage } from "@/hooks/use-language";

export default function AboutSection() {
  const { t } = useLanguage();
  return (
    <div className="opacity-100 transform-none">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">{t("aboutTitle")}</h2>
      <p className="text-base text-gray-700 leading-relaxed">{t("aboutP1")}</p>
      <p className="text-base text-gray-700 leading-relaxed mt-4">{t("aboutP2")}</p>
      <div className="text-center mt-8">
        <Link href="/portfolio" className="inline-flex items-center px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          {t("aboutBtn")}
          <svg viewBox="0 0 24 24" className="w-5 h-5 ml-2" fill="currentColor" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
