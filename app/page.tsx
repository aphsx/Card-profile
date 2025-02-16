import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="w-screen min-h-screen flex flex-col items-center justify-center bg-gray-200 p-4">
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl p-6">
        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-12">
          {/* Left side */}
          <div className="w-full md:w-auto flex flex-col items-center relative">
            {/* Profile Image */}
            <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white overflow-hidden -mt-16 md:-mt-20">
              <img
                src="https://cosi.bu.ac.th/_next/image?url=%2Fapi%2Ffiles%2F1d0358fc33a8cf2528c2be755e2be5.jpg&w=640&q=75"
                alt="Profile"
                className="object-cover w-full h-full"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>
            {/* Icons */}
            <div className="flex gap-4 text-center mt-6">
              <a
                className="relative group"
                href="https://www.instagram.com/_aphsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:instagram-fill" className="text-[1.5rem]" />
                {/* <span className="absolute bottom-full mb-2 hidden group-hover:block text-xs bg-black text-white px-2 py-1 rounded">
                  Instagram
                </span> */}
              </a>
              <a
                href="https://github.com/aphsx"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:github-fill" className="text-[1.5rem]" />
              </a>
              <a
                href="https://www.youtube.com/@WSench"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:youtube-fill" className="text-[1.5rem]" />
              </a>
              <a
                href="https://aphsx-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:user-fill" className="text-[1.5rem]" />
              </a>
            </div>
          </div>

          {/* Right side */}
          <div className="flex-1 mt-4 md:mt-0">
            <h2 className="text-xl md:text-2xl font-bold">
              Aphisit Danchaodang
            </h2>
            <p className="text-sm text-gray-600">
              Full Stack Web Developer | Programmer
            </p>
            <a
              href="https://www.instagram.com/_aphsx"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="mt-2 bg-gray-900 text-white px-4 py-1 rounded-lg">
                Follow
              </button>
            </a>
            <p className="mt-4 text-gray-600 text-sm">
              I am a Computer Science student at Bangkok University. | working
              as a Full Stack Web Developer and Programmer at the Center of
              Specialty Innovation (CoSI).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
