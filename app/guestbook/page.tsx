import React from "react";

const Guestbook = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                Guestbook.
            </h1>
            <p className="text-gray-500 w-full md:w-[400px] text-center">Here you can leave a message for me, hope you enjoyed my site!</p>
            <h3 className="text-lg text-gray-500 w-full md:w-[400px] text-center py-20">Coming soon! 🏗️</h3>
        </div>
    </div>;
};

export default Guestbook;