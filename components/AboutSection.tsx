import Link from "next/link";

export default function AboutSection() {
  return (
    <div className="opacity-100 transform-none">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">About Me</h2>
      <p className="text-base text-gray-700 leading-relaxed">
        I&apos;m a Full-Stack web developer skilled in building dynamic user interfaces with React and Next.js, and developing robust APIs with Node.js. I enjoy solving complex problems and crafting user-friendly web applications.
      </p>
      <p className="text-base text-gray-700 leading-relaxed mt-4">
        Beyond coding, I love photography, traveling, and exploring creative hobbies like drawing.
      </p>
      <div className="text-center mt-8">
        <Link href="/portfolio" className="inline-flex items-center px-6 py-2 bg-black text-white font-semibold rounded-md hover:bg-blue-500 transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
          My portfolio
          <svg viewBox="0 0 24 24" className="w-5 h-5 ml-2" fill="currentColor" aria-hidden="true">
            <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"></path>
          </svg>
        </Link>
      </div>
    </div>
  );
}
