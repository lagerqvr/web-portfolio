import type { Locale } from './schemas';

export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://lagerqvr.com';

/** Path for a locale under `localePrefix: 'as-needed'` — `en` carries no prefix. */
export function localePath(locale: Locale, path = ''): string {
  const suffix = path.replace(/^\/+/, '');
  const base = locale === 'en' ? '' : `/${locale}`;
  return suffix ? `${base}/${suffix}` : base || '/';
}

export function localeUrl(locale: Locale, path = ''): string {
  return `${SITE_URL}${localePath(locale, path)}`;
}
