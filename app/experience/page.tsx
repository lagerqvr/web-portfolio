import data from "../constants/data";
import React from "react";
import { ExperienceProps } from "../types/types";

export default function Experience() {
    return (
        <div className="bg-white dark:bg-black pb-20">
            <div className="max-w-6xl mx-auto h-15">
                <h1 className="text-4xl font-bold py-5 text-center text-black dark:text-white">
                    {data.experience.heading}
                </h1>
            </div>
            <div className="bg-white dark:bg-black pt-5">
                <div className="grid grid-cols-1 bg-white dark:bg-black max-w-xl mx-auto">
                    {/* Experience card */}
                    {data.experience.positions.map((exp, idx) => (
                        <>
                            <ExperienceCard
                                key={idx}
                                title={exp.title}
                                desc={exp.desc}
                                year={exp.year}
                                company={exp.company}
                                companyLink={exp.companyLink}
                            />
                            {idx === data.experience.positions.length - 1 ? null : (
                                <div className="divider-container flex flex-col items-center -mt-2">
                                    <div className="w-4 h-4 bg-green-500 rounded-full relative">
                                        <div className="w-4 h-4 bg-green-500 rounded-full relative animate-ping"></div>
                                    </div>
                                    <div className="w-1 h-24 bg-gray-200 dark:bg-gray-500 rounded-full -mt-2"></div>
                                </div>
                            )}
                        </>
                    ))}
                </div>
            </div>
        </div>
    );
}

const ExperienceCard: React.FC<ExperienceProps> = ({ title, desc, year, company, companyLink }) => {
    return (
        <div className="relative experience-card border border-gray-200 dark:border-gray-600 p-4 rounded-md shadow-xl mx-4">
            <div className="flex justify-between items-baseline">
                <h1 className="font-semibold text-xl text-black dark:text-white">{title}</h1>
                <h1 className="text-sm md:text-xl font-bold text-gray-300 dark:text-gray-500">
                    {year}
                </h1>
            </div>
            <a href={companyLink} className="text-gray-500">
                {company}
            </a>
            <p className="text-gray-600 dark:text-gray-400 my-2">{desc}</p>
        </div>
    );
};
