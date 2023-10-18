import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

const Interests = () => {
    return <div className="container mx-auto pt-5 bg-white dark:bg-black min-h-[calc(100vh - 64px)] w-full md:w-[800px]">
        <div className="flex flex-col justify-center items-center z-10">
            <h1 className="text-4xl font-bold text-black dark:text-white leading-fix pb-3">
                Favorites
            </h1>
        </div>
        <div className="flex flex-col pt-5 px-8">
            <p className="text-gray-500 mb-6">
                Equality is important, but we all have our favorites. Below, I&apos;ve listed some of my preferred things to listen to and watch. Each of these have a connection to technology in some way. Although I strive to explore new things, these are the ones I consistently return to. I&apos;d like to list all my favorites, but I&apos;ve attempted to keep this list short and sweet. Enjoy!
            </p>

            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">Podcasts</h2>
                <p className="text-gray-500 mb-6">
                    I regularly listen to all these podcasts and can&apos;t recommend them enough. They&apos;re not just packed with useful information, but also provide an excellent opportunity to learn more.
                </p>
                <div className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src="/img/darknet_diaries.jpeg" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">Darknet Diaries</h3>
                        <p className="text-gray-500">
                            Darknet Diaries might not be coding related, but it&apos;s a great podcast for anyone interested in cyber security. The podcast is hosted by Jack Rhysider, who interviews hackers and security experts about their experiences. The podcast is well produced and the stories are always interesting.
                        </p>
                        <Link href='https://darknetdiaries.com/'>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">Visit Website</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src="/img/command_line_heroes.jpeg" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">Command Line Heroes</h3>
                        <p className="text-gray-500">
                            Command Line Heroes is a podcast by Red Hat that explores the history of open source and the people who create it. The podcast is hosted by Saron Yitbarek, who interviews developers and open source advocates about their experiences. This one is also well produced and worth a listen.
                        </p>
                        <Link href='https://www.redhat.com/en/command-line-heroes'>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">Visit Website</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src="/img/syntax.jpeg" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">Syntax</h3>
                        <p className="text-gray-500">
                            Syntax is a podcast hosted by Wes Bos and Scott Tolinski. The podcast is aimed at web developers and covers a wide range of topics. Syntax is a great podcast for anyone interested in web development and the hosts are very knowledgeable.
                        </p>
                        <Link href='https://syntax.fm/'>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">Visit Website</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>

            <section className="mb-8 w-full">
                <h2 className="text-2xl font-semibold mb-3 text-black dark:text-white">YouTube</h2>
                <p className="text-gray-500 mb-6">
                    Here I&apos;ve listed some of my favorite YouTube channels. These channels are all related to technology and I&apos;ve learned a lot from them. I&apos;ve also included a link to their respective channels.
                </p>
                <div className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src="/img/fireship.jpg" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">Fireship</h3>
                        <p className="text-gray-500">
                            Fireship is one of the most entertaining tech channels I&apos;ve found on YouTube. The channel is hosted by Jeff Delaney, who creates short and informative videos about web development. The videos are visually appealing and the content is always interesting and up-to-date.
                        </p>
                        <Link href='https://www.youtube.com/c/fireship'>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">View channel</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-40 h-40 rounded mr-4" src="/img/freecodecamp.jpg" alt="Podcast Logo" />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-5 md:pt-0">freeCodeCamp.org</h3>
                        <p className="text-gray-500">
                            freeCodeCamp is a non-profit organization that provides free coding tutorials and courses. The organization also has a YouTube channel, which is hosted by Beau Carnes. The channel is packed with useful content and the videos are well produced by a wide range of hosts. Even though the channel is more aimed at beginners, they have some more advanced content as well.
                        </p>
                        <Link href='https://www.youtube.com/@freecodecamp'>
                            <div className='flex mt-5 '>
                                <p className="text-black dark:text-white">View Channel</p>
                                <ArrowRightIcon className="w-5 h-5 ml-1 pt-1 text-black dark:text-white" />
                            </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    </div>;
};

export default Interests;