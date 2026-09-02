import { getTranslations, setRequestLocale } from 'next-intl/server';
import { getContent } from '@/lib/content';
import type { Locale } from '@/lib/schemas';
import Section from '@/components/ui/Section';
import Hero from '@/components/sections/Hero';
import Core from '@/components/sections/Core';
import Trajectory from '@/components/sections/Trajectory';
import Vector from '@/components/sections/Vector';
import Work from '@/components/sections/Work';
import Repos from '@/components/sections/Repos';
import Signals from '@/components/sections/Signals';
import Contact from '@/components/sections/Contact';

export default async function IndexPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  const content = await getContent();
  const t = await getTranslations();
  const l = locale as Locale;

  return (
    <>
      <Hero
        content={content}
        locale={l}
        labels={{ work: t('nav.work'), contact: t('nav.contact') }}
      />

      <Section id="core" label={t('sections.core')} index={1}>
        <Core content={content} locale={l} />
      </Section>

      <Section id="vector" label={t('sections.vector')} index={2}>
        <Vector content={content} locale={l} />
      </Section>

      <Section id="trajectory" label={t('sections.trajectory')} index={3}>
        <Trajectory content={content} locale={l} />
      </Section>

      <Section id="work" label={t('sections.work')} index={4}>
        <Work content={content} locale={l} labels={{ readMore: t('work.readMore') }} />
        <Repos />
      </Section>

      <Section id="signals" label={t('sections.signals')} index={5}>
        <Signals content={content} locale={l} />
      </Section>

      <Section id="contact" label={t('sections.contact')} index={6}>
        <Contact content={content} locale={l} />
      </Section>
    </>
  );
}
