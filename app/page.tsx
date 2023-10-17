import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import TypingEffect from "./components/common/TypingEffect";

export default function Home() {

  return (
    <main className="bg-white dark:bg-black">
      <div className="container mx-auto px-4 pt-20 min-h-[calc(100vh - 64px)]">
        {/* Hero */}
        <div className="flex items-start justify-start md:justify-center pt-10">
          {/* Wrapper for blobs and text */}
          <div className="relative w-full max-w-2xl">
            {/* Blobs */}
            <div className="absolute top-0 left-0 right-0 bottom-0 z-0 max-w-xs md:max-w-3xl">
              <div className="absolute top-0 -left-4 w-36 h-36 md:w-44 md:h-44 bg-blue-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
              <div className="absolute top-0 -right-4 w-36 h-36 md:w-44 md:h-44 bg-red-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
              <div className="absolute -bottom-8 left-20 w-36 h-36 md:w-44 md:h-44 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Text container */}
            <div className="w-full relative flex flex-col items-left md:items-center">
              <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-red-500 leading-fix pb-3">
                <TypingEffect />
              </h1>
              <p className="text-gray-600 dark:text-gray-500">Discover what I&apos;ve created</p>
            </div>
          </div>
        </div>

        {/* Profile Section */}
        <div className="w-full mt-5 flex flex-col justify-center items-center main">

        </div>
      </div>
    </main>
  )
}
