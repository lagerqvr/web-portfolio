'use client';

import { useParams } from 'next/navigation';
import { usePathname, Link } from '@/lib/i18n/navigation';
import { LOCALES } from '@/lib/schemas';

/**
 * Swaps the locale on the current path. `usePathname` from next-intl's
 * navigation returns the path without the locale prefix, so the same href works
 * on the home page and on a case study.
 */
export default function LocaleSwitcher({ className }: { className?: string }) {
  const pathname = usePathname();
  const params = useParams();
  const active = typeof params.locale === 'string' ? params.locale : 'en';

  return (
    <div className={`label flex items-center gap-1.5 ${className ?? ''}`}>
      {LOCALES.map((locale, i) => (
        <span key={locale} className="flex items-center gap-1.5">
          {i > 0 ? <span className="text-hairline-hi" aria-hidden="true">/</span> : null}
          <Link
            href={pathname}
            locale={locale}
            hrefLang={locale}
            aria-current={locale === active ? 'true' : undefined}
            className={
              locale === active
                ? 'text-text'
                : 'text-dim transition-colors duration-150 ease-[steps(4,end)] hover:text-text'
            }
          >
            {locale.toUpperCase()}
          </Link>
        </span>
      ))}
    </div>
  );
}
