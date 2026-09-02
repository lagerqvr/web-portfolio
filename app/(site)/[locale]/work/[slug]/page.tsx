import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/lib/i18n/navigation';
import { getContent } from '@/lib/content';
import { paragraphs } from '@/lib/rich-text';
import { serializeJsonLd } from '@/lib/json-ld';
import { t, LOCALES, type Locale } from '@/lib/schemas';
import { localePath, localeUrl } from '@/lib/site';
import { routing } from '@/lib/i18n/routing';

export async function generateStaticParams() {
  const content = await getContent();
  return routing.locales.flatMap((locale) =>
    content.work.map((entry) => ({ locale, slug: entry.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const content = await getContent();
  const entry = content.work.find((w) => w.slug === slug);
  if (!entry) return {};

  const l = locale as Locale;
  const description = t(entry.summary, l);
  const path = `work/${slug}`;

  return {
    title: `${entry.title} — ${content.profile.name}`,
    description,
    alternates: {
      canonical: localePath(l, path),
      languages: {
        ...Object.fromEntries(LOCALES.map((x) => [x, localePath(x, path)])),
        'x-default': localePath('en', path),
      },
    },
    openGraph: {
      type: 'article',
      url: localeUrl(l, path),
      title: entry.title,
      description,
    },
  };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const content = await getContent();
  const entry = content.work.find((w) => w.slug === slug);
  if (!entry) notFound();

  const l = locale as Locale;
  const tr = await getTranslations('work');
  const body = paragraphs(t(entry.body, l));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: content.profile.name, item: localeUrl(l) },
      { '@type': 'ListItem', position: 2, name: entry.title, item: localeUrl(l, `work/${slug}`) },
    ],
  };

  return (
    <article className="mx-auto w-full max-w-4xl px-5 pb-24 pt-32 md:px-10 md:pb-32 md:pt-40">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }} />

      <div className="mb-10 flex items-center justify-between gap-4">
        <span className="label text-sodium">{t(entry.kind, l)}</span>
        <span className="label label-dim tabular">{entry.year}</span>
      </div>

      <h1 className="max-w-3xl text-[clamp(2rem,5.5vw,3.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-balance">
        {entry.title}
      </h1>

      {entry.image ? (
        <Image
          src={entry.image}
          alt=""
          width={96}
          height={96}
          className="pixelated mt-10 h-20 w-20 border border-hairline"
          unoptimized
        />
      ) : null}

      <p className="mt-8 max-w-2xl text-lg leading-[1.5] tracking-[-0.01em] text-text md:text-xl">
        {t(entry.summary, l)}
      </p>

      <div className="mt-12 max-w-2xl space-y-6 border-t border-hairline pt-12">
        {body.map((paragraph, i) => (
          <p key={i} className="text-base leading-relaxed text-muted md:text-[1.0625rem]">
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap items-center gap-3 border-t border-hairline pt-10">
        <Link href="/#work" className="pill">
          <span aria-hidden="true">←</span> {tr('back')}
        </Link>
        {entry.link ? (
          <a href={entry.link} target="_blank" rel="noopener noreferrer" className="pill">
            {entry.linkLabel ? t(entry.linkLabel, l) : tr('external')} <span aria-hidden="true">↗</span>
          </a>
        ) : null}
      </div>
    </article>
  );
}
