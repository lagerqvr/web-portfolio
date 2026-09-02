import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Geist, Geist_Mono } from 'next/font/google';
import { NextIntlClientProvider, hasLocale } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { routing } from '@/lib/i18n/routing';
import { getContent } from '@/lib/content';
import { LOCALES, type Locale } from '@/lib/schemas';
import { SITE_URL, localePath, localeUrl } from '@/lib/site';
import { serializeJsonLd } from '@/lib/json-ld';
import Header from '@/components/nav/Header';
import Footer from '@/components/nav/Footer';
import '../../globals.css';

const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap' });

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};

  const t = await getTranslations({ locale, namespace: 'meta' });

  return {
    metadataBase: new URL(SITE_URL),
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: localePath(locale as Locale),
      languages: {
        ...Object.fromEntries(LOCALES.map((l) => [l, localePath(l)])),
        'x-default': '/',
      },
    },
    openGraph: {
      type: 'profile',
      url: localeUrl(locale as Locale),
      title: t('title'),
      description: t('description'),
      siteName: 'Rasmus Lagerqvist',
      locale,
    },
    twitter: { card: 'summary_large_image', title: t('title'), description: t('description') },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  const content = await getContent();

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: content.profile.name,
    jobTitle: content.profile.role,
    url: localeUrl(locale as Locale),
    email: `mailto:${content.contact.email}`,
    address: { '@type': 'PostalAddress', addressLocality: 'Vaasa', addressCountry: 'FI' },
    alumniOf: [
      { '@type': 'CollegeOrUniversity', name: 'Åbo Akademi University' },
      { '@type': 'CollegeOrUniversity', name: 'Arcada University of Applied Sciences' },
    ],
    worksFor: { '@type': 'Organization', name: 'CGI' },
    knowsLanguage: ['fi', 'sv', 'en'],
    knowsAbout: ['Application security', 'DevSecOps', 'On-device language models', 'Full-stack development'],
    sameAs: [content.social.github, content.social.linkedin].filter(Boolean),
  };

  return (
    <html lang={locale} className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <body className="flex min-h-svh flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: serializeJsonLd(jsonLd) }}
        />
        <NextIntlClientProvider>
          <Header onIndex />
          <main className="grow">{children}</main>
          <Footer content={content} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
