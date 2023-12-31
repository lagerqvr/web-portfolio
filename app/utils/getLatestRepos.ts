import { GithubData, GithubRepo } from '../types/types';

const getLatestRepos = async (data: GithubData, token?: string): Promise<GithubRepo[] | undefined> => {
    try {
        const username = data.githubUsername;
        let url = `https://api.github.com/search/repositories?q=user:${username}&sort=updated&order=desc`;
        let options: RequestInit = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (token) {
            options.headers = {
                ...options.headers,
                'Authorization': `token ${token}`
            };
        }

        const res = await fetch(url, options);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const jsonData = await res.json();
        let repos: GithubRepo[] = jsonData.items;
        let latestThreeRepos = repos.slice(0, 3);
        return latestThreeRepos;

    } catch (err) {
        console.error(err);
        return undefined;
    }
};

export default getLatestRepos;
