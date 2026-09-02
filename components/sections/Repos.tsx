import { getTranslations } from 'next-intl/server';

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  pushed_at: string;
}

/**
 * Server-side, unlike the previous implementation which read
 * `process.env.GITHUB_AUTH_TOKEN` inside a client component — where it is
 * always undefined, so every call went out unauthenticated against the shared
 * 60/hour IP limit. Here the token is real and the response is cached for an
 * hour, so the page never waits on GitHub.
 */
async function fetchRepos(): Promise<Repo[]> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'X-GitHub-Api-Version': '2022-11-28',
  };
  if (process.env.GITHUB_AUTH_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_AUTH_TOKEN}`;
  }

  try {
    const res = await fetch(
      'https://api.github.com/users/lagerqvr/repos?sort=pushed&direction=desc&per_page=4&type=owner',
      { headers, next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];
    const json = (await res.json()) as Repo[];
    return Array.isArray(json) ? json.slice(0, 4) : [];
  } catch {
    return [];
  }
}

export default async function Repos() {
  const t = await getTranslations('work');
  const repos = await fetchRepos();

  if (repos.length === 0) return null;

  return (
    <div className="mt-16 md:mt-24">
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-3">
        <h3 className="label text-text">
          {t('repos')} <span className="label-dim">— —</span>
        </h3>
        <span className="label label-dim">{t('reposNote')}</span>
      </div>

      <ul className="grid gap-px bg-hairline sm:grid-cols-2">
        {repos.map((repo) => (
          <li key={repo.id} className="bg-ground">
            <a
              href={repo.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-2 p-5 transition-colors duration-150 ease-[steps(4,end)] hover:bg-panel"
            >
              <div className="flex items-baseline justify-between gap-3">
                <span className="text-[0.9375rem] text-text group-hover:text-sodium">
                  {repo.name}
                </span>
                {repo.language ? <span className="label label-dim shrink-0">{repo.language}</span> : null}
              </div>
              {repo.description ? (
                <p className="text-sm leading-relaxed text-muted">{repo.description}</p>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
