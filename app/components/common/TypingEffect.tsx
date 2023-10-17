'use client';
import React from "react";
import Typewriter from 'typewriter-effect';

const TypeEffect: React.FC = () => {
    return (
        <div className="flex flex-col sm:flex-row items-baseline">
            <span className="mr-2 flex-shrink-0">Creating</span>
            <div className="flex-grow">
                <Typewriter
                    options={{
                        strings: ['value', 'apps', 'websites', 'solutions', 'products', 'services', 'pipelines', 'memes'],
                        autoStart: true,
                        loop: true,
                    }}
                />
            </div>
        </div>
    );
};

export default TypeEffect;

