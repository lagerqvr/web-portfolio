import React, { useEffect, useState } from 'react';
import getLatestRepos from '../utils/getLatestRepos';
import { GithubRepo, GithubData } from '../utils/getLatestRepos';
import { CodeBracketIcon } from '@heroicons/react/24/outline';

const GithubRepos: React.FC = () => {
    const [repos, setRepos] = useState<GithubRepo[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const data: GithubData = { githubUsername: 'lagerqvr' };
            const token = process.env.GITHUB_AUTH_TOKEN;
            const latestRepos = await getLatestRepos(data, token);
            if (latestRepos) {
                setRepos(latestRepos);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex flex-col">
            {repos.slice(0, 3).map((repo, index) => (
                <div key={index} className="h-58 w-58 bg-gradient-to-r from-blue-500 to-blue-600 text-white p-5 mb-3 rounded">
                    <div className='flex align-baseline'>
                        <h3 className="text-lg font-bold">{repo.name}</h3>
                        <CodeBracketIcon className="w-5 h-5 ml-2 mt-1" />
                    </div>
                    <p className="text-sm">{repo.description}</p>
                    <p className="pt-5">
                        <a href={`https://github.com/lagerqvr/${repo.name}`} target="_blank" rel="noopener noreferrer">
                            View repository
                        </a>
                    </p>

                </div>
            ))}
        </div>
    );
};

export default GithubRepos;
