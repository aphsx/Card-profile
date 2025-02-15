import { Icon } from "@iconify/react";

export default function Home() {
  return (
    <div className="w-screen h-screen flex justify-center items-center bg-gray-200">
      <div className="bg-white rounded-lg shadow-md max-w-3xl w-full p-6">
        <div className="relative flex items-start gap-12">
          {/* ฝั่งซ้าย */}
          <div className="flex-1 flex-col items-center relative">
            {/* รูปภาพ */}
            <div className="absolute -top-16 left-1 w-48 h-48 rounded-full border-4 border-white overflow-hidden">
              <img
                src="https://cosi.bu.ac.th/_next/image?url=%2Fapi%2Ffiles%2F1d0358fc33a8cf2528c2be755e2be5.jpg&w=640&q=75"
                alt="Profile"
                className="object-cover w-full h-full bg-gray"
                style={{ objectPosition: "50% 20%" }}
              />
            </div>

            {/* Followers และ Following */}
            <div className="flex gap-4 text-center mt-36 ml-6">
              <a
                href="https://github.com/Kataruna"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:github-fill" className="text-[1.5rem]" />
              </a>

              <a
                href="https://github.com/Kataruna"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:github-fill" className="text-[1.5rem]" />
              </a>
              <a
                href="https://github.com/Kataruna"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:github-fill" className="text-[1.5rem]" />
              </a>
              <a
                href="https://github.com/Kataruna"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Icon icon="ri:github-fill" className="text-[1.5rem]" />
              </a>
            </div>
          </div>

          {/* ฝั่งขวา */}
          <div className=" ml-4">
            <h2 className="text-2xl font-bold">Aphisit Danchaodang</h2>
            <p className="text-sm text-gray-600">
              Full Stack Web Developer | Programmer
            </p>
            <button className="mt-2 bg-blue-500 text-white px-4 py-1 rounded-lg">
              Follow
            </button>
            <p className="mt-4 text-gray-600 text-sm">
              Web developer | Open source | Full Stack | React js | Next js |
              Problem solving | CSS | Javascript | Passionate about creating
              innovative solutions to complex problems
            </p>
          </div>
        </div>

        {/* <div className="flex mt-6 border-t pt-4">
          <button className="flex-1 text-blue-500 border-b-2 border-blue-500 pb-2">
            Posts
          </button>
          <button className="flex-1 text-gray-600 pb-2">Notices</button>
        </div> */}
      </div>
    </div>
  );
}
