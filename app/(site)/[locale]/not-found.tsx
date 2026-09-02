import { getTranslations } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';

export default async function NotFound() {
  const t = await getTranslations('notFound');

  return (
    <div className="mx-auto flex min-h-[70svh] w-full max-w-4xl flex-col justify-center px-5 py-32 md:px-10">
      <span className="label label-dim">404 — —</span>
      <h1 className="mt-6 text-[clamp(2rem,6vw,4rem)] font-medium tracking-[-0.03em]">
        {t('title')}
      </h1>
      <p className="mt-4 max-w-md text-muted">{t('body')}</p>
      <div className="mt-10">
        <Link href="/" className="pill">
          {t('home')} <span aria-hidden="true">⊕</span>
        </Link>
      </div>
    </div>
  );
}
