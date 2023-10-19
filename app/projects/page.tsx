'use client';
import React from "react";
import GithubRepos from "./latestRepos";
import data from "@/app/constants/data";
import ProjectsList from "./ProjectsList";

const Projects = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                {data.projects.heading}
            </h1>
        </div>
        <div className="flex flex-col pt-5 px-8">
            <p className="text-gray-500 mb-6">
                {data.projects.description}
            </p>
            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">{data.projects.heading_featured}</h2>
                <p className="text-gray-500 mb-6">
                    These are some my most recent and interesting projects. The source code and more info on some of these projects can be found on <a href="https://www.github.com/lagerqvr" className="text-black dark:text-white">GitHub</a>.
                </p>
                <ProjectsList projects={data.projects.featured} />
            </section>

            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">{data.projects.heading_recent}</h2>
                <p className="text-gray-500 mb-6">
                    Here are my most recent projects. You can find more info on <a href="https://www.github.com/lagerqvr" className="text-black dark:text-white">GitHub</a>.
                </p>
                <GithubRepos />
            </section>
        </div>
    </div>;
};

export default Projects;