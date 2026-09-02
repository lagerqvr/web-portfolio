import type { MetadataRoute } from 'next';
import { getContent } from '@/lib/content';
import { LOCALES } from '@/lib/schemas';
import { localeUrl } from '@/lib/site';

/**
 * Native replacement for next-sitemap. Every entry carries the full set of
 * locale alternates so search engines see the three versions as one document.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getContent();
  const lastModified = new Date(content.updatedAt);

  const alternates = (path = '') => ({
    languages: Object.fromEntries(LOCALES.map((l) => [l, localeUrl(l, path)])),
  });

  const paths = ['', ...content.work.map((entry) => `work/${entry.slug}`)];

  return paths.flatMap((path) =>
    LOCALES.map((locale) => ({
      url: localeUrl(locale, path),
      lastModified,
      changeFrequency: path === '' ? ('monthly' as const) : ('yearly' as const),
      priority: path === '' ? 1 : 0.7,
      alternates: alternates(path),
    })),
  );
}
