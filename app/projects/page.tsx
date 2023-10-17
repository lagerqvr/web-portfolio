import React from "react";
import Image from "next/image";

const Projects = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                Projects
            </h1>
        </div>
        <div className="flex flex-col pt-10 px-8">
            <p className="text-gray-500 mb-6">
                Every developer inevitably creates some personal projects to expand their skillset or to solve a problem. Here you can find some of my featured projects and also my most recent creations.
            </p>

            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">Featured projects</h2>
                <p className="text-gray-500 mb-6">
                    These are some my most recent and interesting projects. The source code and more info on some of these projects can be found on <a href="https://www.github.com/lagerqvr" className="text-black dark:text-white">GitHub</a>.
                </p>
                <div className="flex items-start py-6">
                    <Image width={150} height={150} className="w-20 h-20 sm:w-40 sm:h-40 rounded mr-4" src="/img/sitzy.png" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white">Sitzy.app</h3>
                        <p className="text-gray-500">
                            Sitzy.app is an API wrapper that allows users to reserve tickets over the web via the Kide.app API. Built with Javascript, Bootstrap, and Firebase, Sitzy.app serves as an alternate frontend to Kide.app&apos;s API. Due to the nature of the service, Sitzy.app&apos;s source code is not public. The app has been made available exclusively for friends and family.
                        </p>
                        <p className="pt-5 text-black dark:text-white line-through">Read more</p>
                    </div>
                </div>
                <div className="flex items-start py-6">
                    <Image width={150} height={150} className="w-20 h-20 sm:w-40 sm:h-40 rounded mr-4" src="/img/arabia_lunch.png" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white">Arabia Lunch</h3>
                        <p className="text-gray-500">
                            Arabia lunch is a simple frontend for fetching student lunch menus in Arabianranta area in Helsinki. The site currently supports four lunch restaurants; Artebia 135 (Metropolia), Arcada, DIAK and UniCafe Chemicum.

                            The website can be installed on both iOS and Android to function like an application.

                            Built with Vanilla JS and Bootstrap.
                        </p>
                        <p className="pt-5 text-black dark:text-white"><a href="https://github.com/lagerqvr/arabia-lunch">Read more</a></p>
                    </div>
                </div>
                <div className="flex items-start py-6">
                    <Image width={150} height={150} className="w-20 h-20 sm:w-40 sm:h-40 rounded mr-4" src="/img/frunk.png" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white">Frunk</h3>
                        <p className="text-gray-500">
                            Frunk is a simple and user-friendly student card generator that enables alumni to effortlessly create digital student ID cards. Frunk was created as part of a course at Arcada to solve the issue with some graduated friends not being able to join in on a cheap student lunch. The source code for Frunk is not public and the app was created purely for academic purposes.
                        </p>
                        <p className="pt-5 text-black dark:text-white line-through">Read more</p>
                    </div>
                </div>
            </section>

            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">Recent projects</h2>
                <p className="text-gray-500 mb-6">
                    Here are my most recent projects. You can find more info on <a href="https://www.github.com/lagerqvr" className="text-black dark:text-white">GitHub</a>.
                </p>
                <div className="flex flex-col">
                    <div className="h-58 w-58 bg-blue-500 p-5 mb-3 rounded">
                        <h3 className="text-lg font-bold">This is heading</h3>
                        <p className="text-sm">This is a description</p>
                        <p className="pt-5"><a>View repository</a></p>
                    </div>
                    <div className="h-58 w-58 bg-blue-500 p-5 mb-3 rounded">
                        <h3 className="text-lg font-bold">This is heading</h3>
                        <p className="text-sm">This is a description</p>
                        <p className="pt-5"><a>View repository</a></p>
                    </div>
                    <div className="h-58 w-58 bg-blue-500 p-5 mb-3 rounded">
                        <h3 className="text-lg font-bold">This is heading</h3>
                        <p className="text-sm">This is a description</p>
                        <p className="pt-5"><a>View repository</a></p>
                    </div>
                </div>
            </section>
        </div>
    </div>;
};

export default Projects;