import React from 'react';

const Footer = () => {
    return (
        <div className="bg-black text-white fixed bottom-0 left-0 w-full py-4 mb-4">
            <div className="container mx-auto">
                <div className="flex flex-wrap justify-evenly items-center space-x-4">
                    <p className="text-gray-500 text-sm mb-2 md:mb-0">contact@lagerqvr.com</p>
                    <div>
                        <a href="https://github.com/lagerqvr/" className="hover:text-white text-gray-500 text-sm mr-5">github</a>
                        <a href="https://www.linkedin.com/in/rasmus-lagerqvist/" className="hover:text-white text-gray-500 text-sm mr-5">linkedin</a>
                        <a href="mailto:contact@lagerqvr.com" className="hover:text-white text-gray-500 text-sm mr-5">email</a>
                        <a href="https://t.me/lagerqvr" className="hover:text-white text-gray-500 text-sm mr-5">telegram</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
