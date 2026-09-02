'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Wordmark } from '@/components/ui/Mark';
import LocaleSwitcher from './LocaleSwitcher';

const SECTIONS = ['core', 'vector', 'trajectory', 'work', 'signals', 'contact'] as const;

export default function Header({ onIndex }: { onIndex: boolean }) {
  const t = useTranslations('nav');
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the page behind the mobile overlay.
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // On a case study the section anchors don't exist, so link back to the index.
  const href = (id: string) => (onIndex ? `#${id}` : `/#${id}`);

  return (
    <>
      <a
        href="#core"
        className="label sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:border focus:border-hairline-hi focus:bg-panel focus:px-4 focus:py-2"
      >
        {t('skip')}
      </a>

      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-200 ease-[steps(6,end)] ${
          scrolled ? 'border-b border-hairline bg-ground/92 backdrop-blur-sm' : ''
        }`}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 md:px-10 md:py-5">
          <Link href="/" aria-label="Home">
            <Wordmark />
          </Link>

          <nav className="hidden items-center gap-6 lg:flex">
            {SECTIONS.map((id) => (
              <a
                key={id}
                href={href(id)}
                className="label text-dim transition-colors duration-150 ease-[steps(4,end)] hover:text-text"
              >
                {t(id)}
              </a>
            ))}
            <LocaleSwitcher className="ml-1 border-l border-hairline pl-4" />
          </nav>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={t('menu')}
            aria-expanded={open}
            className="label flex items-center gap-2 lg:hidden"
          >
            {t('menu')}
            <span aria-hidden="true" className="flex flex-col gap-[3px]">
              <span className="block h-px w-4 bg-text" />
              <span className="block h-px w-4 bg-text" />
            </span>
          </button>
        </div>
      </header>

      {open ? (
        <div className="fixed inset-0 z-50 flex flex-col bg-ground lg:hidden">
          <div className="flex items-center justify-between px-5 py-4">
            <Wordmark />
            <button type="button" onClick={() => setOpen(false)} aria-label={t('close')} className="label">
              {t('close')}
            </button>
          </div>

          <nav className="flex grow flex-col justify-center gap-1 px-5">
            {SECTIONS.map((id, i) => (
              <a
                key={id}
                href={href(id)}
                onClick={() => setOpen(false)}
                className="flex items-baseline gap-4 border-b border-hairline py-4 text-3xl tracking-[-0.03em] text-text"
              >
                <span className="label label-dim tabular">{String(i + 1).padStart(2, '0')}</span>
                {t(id)}
              </a>
            ))}
          </nav>

          <div className="px-5 py-8">
            <LocaleSwitcher />
          </div>
        </div>
      ) : null}
    </>
  );
}
