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
              src="/CSI00138.jpg"
              alt="Profile"
              className="object-cover w-full h-full scale-150"
              style={{ objectPosition: "50% 20%" }}
              />
            </div>
            
          </div>

          {/* Right side */}
          <div className="flex-1 items-center">
            <h2 className="text-xl md:text-2xl font-bold">
              Aphisit Danchaodangs
            </h2>
            <p className="text-sm text-gray-600">
              Full Stack Web Developer | Programmer
            </p>
            <a
              href="https://www.linkedin.com/in/aphisit-danchaodang-108037358/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {/* <button className="mt-2 bg-gray-900 text-white px-4 py-1 rounded-lg">
                Portfolio
              </button> */}
            </a>
            {/* Icons */}
            <div className="flex gap-4 text-center mt-4">
                <a
                href="https://www.linkedin.com/in/aphisit-danchaodang-108037358/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Icon icon="ri:linkedin-box-fill" className="text-[1.5rem]" />
                </a>
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
              <button className=" bg-gray-900 text-white px-4 py-1 rounded-lg">
                Portfolio
              </button>
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
              
              {/* <a
                href="https://aphsx-portfolio.vercel.app/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:user-fill" className="text-[1.5rem]" />
              </a> */}
            </div>
            {/* <p className="mt-4 text-gray-600 text-sm">
              I am a Full Stack Web Developer and Programmer at the{" "}
              <a
              href="https://cosi.bu.ac.th/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
              >
              Center of Specialty Innovation
              </a>.
            </p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
