export interface GithubRepo {
    id: number;
    name: string;
    description: string;
}

export interface GithubData {
    githubUsername: string;
}

export interface MediaItem {
    title: string;
    description: string;
    imgSrc: string;
    link: string;
}

export interface MediaData {
    heading: string;
    description: string;
    items: MediaItem[];
}

export type MediaType = 'podcasts' | 'youtube';

export interface MediaSectionProps {
    type: MediaType;
    data: MediaData;
}

export type FormData = {
    name: string;
    email: string;
    message: string;
};

export interface ExperienceProps {
    title: string;
    desc: string;
    year: string;
    company: string;
    companyLink: string;
}

export interface Project {
    title: string;
    description: string;
    imgSrc: string;
    link?: string;
}

export interface ProjectsListProps {
    projects: Project[];
}

export interface BuzzwordListProps {
    buzzwords: string[];
}