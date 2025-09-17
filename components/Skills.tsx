import {
  FaReact,
  FaHtml5,
  FaCss3Alt,
  FaJs,
  FaNodeJs,
  FaPython,
} from "react-icons/fa";
import { SiNextdotjs as FaNextjs } from "react-icons/si";

export const SkillsAndFrameworks = () => {
  return (
    <section className="mt-6 max-w-5xl mx-auto">
      <h2 className="text-left font-bold text-4xl mt-10 ml-0">Skills and Frameworks</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaNextjs className="text-black group-hover:text-black" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Next.js</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaReact className="text-black group-hover:text-blue-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">React</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaHtml5 className="text-black group-hover:text-orange-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">HTML5</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaCss3Alt className="text-black group-hover:text-blue-600" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">CSS3</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaJs className="text-black group-hover:text-yellow-500" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">JavaScript</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaNodeJs className="text-black group-hover:text-green-600" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Node.js</span>
        </div>
        <div className="relative group flex flex-col items-center p-2 bg-white border border-zinc-800 rounded-md shadow hover:shadow-lg">
          <FaPython className="text-black group-hover:text-green-400" size={36} />
          <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">Python</span>
        </div>
      </div>
    </section>
  );
};

export default SkillsAndFrameworks;
