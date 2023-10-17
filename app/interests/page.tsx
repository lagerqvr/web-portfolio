import React from "react";
import Image from "next/image";

const Interests = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                Interests
            </h1>
            <h3 className="text-lg text-gray-500 w-full md:w-[400px] text-center py-20">Coming soon! 🏗️</h3>
        </div>
    </div>;
};

export default Interests;