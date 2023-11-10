import Image from 'next/image';
import React from 'react';
import { ProjectsListProps } from '../types/types';

const ProjectsList: React.FC<ProjectsListProps> = ({ projects }) => {
    return (
        <>
            {projects.map((project, index) => (
                <div key={index} className="flex flex-col md:flex-row items-start py-6">
                    <Image width={150} height={150} className="w-44 h-44 md:w-40 md:h-40 rounded mr-0 md:mr-4 mb-4 md:mb-0" src={project.imgSrc} alt={`${project.title} Logo`} />
                    <div>
                        <h3 className="text-xl mb-2 font-bold text-black dark:text-white pt-3 md:pt-0">{project.title}</h3>
                        <p className="text-gray-500">{project.description}</p>
                        {project.link ? (
                            <p className="pt-5 text-black dark:text-white"><a href={project.link}>Read more</a></p>
                        ) : (
                            <p className="pt-5 text-black dark:text-white line-through">Read more</p>
                        )}
                    </div>
                </div>
            ))}
        </>
    );
}

export default ProjectsList;
