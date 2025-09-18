import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { SiNextdotjs as FaNextjs } from "react-icons/si";
import { useLanguage } from "@/hooks/use-language";

export const SkillsAndFrameworks = () => {
  const { t } = useLanguage();
  return (
    <section className="mt-6 max-w-5xl mx-auto">
      <h2 className="text-left font-bold text-4xl mt-10 ml-0 text-gray-800 dark:text-youtube-dark-text">{t("skillsTitle")}</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaNextjs className="text-black dark:text-youtube-dark-text group-hover:text-black dark:group-hover:text-youtube-dark-textSecondary" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">Next.js</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaReact className="text-black dark:text-youtube-dark-text group-hover:text-blue-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">React</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaHtml5 className="text-black dark:text-youtube-dark-text group-hover:text-orange-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">HTML5</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaCss3Alt className="text-black dark:text-youtube-dark-text group-hover:text-blue-600" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">CSS3</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaJs className="text-black dark:text-youtube-dark-text group-hover:text-yellow-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">JavaScript</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaNodeJs className="text-black dark:text-youtube-dark-text group-hover:text-green-600" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">Node.js</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white dark:bg-youtube-dark-surface2 border border-zinc-800 dark:border-youtube-dark-surface3 rounded-md shadow hover:shadow-lg transition-colors">
          <FaPython className="text-black dark:text-youtube-dark-text group-hover:text-green-400" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black dark:bg-youtube-dark-surface text-white dark:text-youtube-dark-text px-2 py-1 rounded">Python</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsAndFrameworks;
