import userData from '@/utils/constants/data';
import React from 'react';

const Footer = () => {
    return (
        <div className="dark:bg-black bg-white w-full py-6 pt-10">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-evenly items-center space-x-4">
                    <p className="text-gray-500 text-sm mb-2 md:mb-0">contact@lagerqvr.com</p>
                    <div>
                        <a href={userData.socialLinks.github} className="hover:text-black dark:hover:text-white text-gray-500 text-sm mr-5">github</a>
                        <a href={userData.socialLinks.linkedin} className="hover:text-black dark:hover:text-white text-gray-500 text-sm mr-5">linkedin</a>
                        <a href={userData.socialLinks.email} className="hover:text-black dark:hover:text-white text-gray-500 text-sm mr-5">email</a>
                        <a href={userData.socialLinks.telegram} className="hover:text-black dark:hover:text-white text-gray-500 text-sm mr-5">telegram</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;


