import React from "react";
import FavoritesSection from "./ListFavorites";
import data from "../constants/data"

const Interests = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)] w-full md:w-[800px] leading-8">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                {data.favorites.heading}
            </h1>
        </div>
        <div className="flex flex-col pt-5 px-8">
            <p className="text-gray-500 mb-6">
                {data.favorites.description}
            </p>
            <FavoritesSection type="podcasts" data={data.favorites.podcasts} />
            <FavoritesSection type="youtube" data={data.favorites.youtube} />
        </div>
    </div>;
};

export default Interests;