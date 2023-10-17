import React, { useEffect, useState } from 'react';
import getLatestRepos from '../../lib/getLatestRepos';
import { GithubRepo, GithubData } from '../../lib/getLatestRepos';

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
                <div key={index} className="h-58 w-58 bg-gray-400 dark:bg-gray-500 p-5 mb-3 rounded">
                    <h3 className="text-lg font-bold">{repo.name}</h3>
                    <p className="text-sm">{repo.description}</p>
                    <p className="pt-5">
                        <a href={`https://github.com/${repo.name}`} target="_blank" rel="noopener noreferrer">
                            View repository
                        </a>
                    </p>
                </div>
            ))}
        </div>
    );
};

export default GithubRepos;
