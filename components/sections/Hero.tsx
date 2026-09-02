import DitherField from '@/components/dither/DitherField';
import { renderRich } from '@/lib/rich-text';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Hero({
  content,
  locale,
  labels,
}: {
  content: SiteContent;
  locale: Locale;
  labels: { status: string; work: string; contact: string };
}) {
  const { profile, hero } = content;

  return (
    <header className="relative isolate flex min-h-[92svh] flex-col justify-between overflow-hidden md:min-h-[94svh]">
      {/* Dither field sits behind everything and receives the pointer ripples. */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <DitherField pixelSize={6} intensity={0.8} />
      </div>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            'linear-gradient(to bottom, rgba(8,9,10,0.20) 0%, rgba(8,9,10,0.55) 42%, rgba(8,9,10,0.72) 68%, rgba(8,9,10,0.96) 100%)',
        }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl grow flex-col justify-between px-5 pb-10 pt-28 md:px-10 md:pb-14 md:pt-32">
        <div className="flex items-start justify-between gap-6">
          <span className="label text-text">
            {profile.name} <span className="label-dim">— —</span>
          </span>
          <span className="label label-dim hidden shrink-0 text-right sm:block">
            {profile.location}
          </span>
        </div>

        <div className="py-16 md:py-20">
          <h1 className="max-w-5xl text-[clamp(2.1rem,7.2vw,5.25rem)] font-medium leading-[1.03] tracking-[-0.035em] text-balance">
            {renderRich(t(hero.headline, locale))}
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:mt-10 md:text-lg">
            {t(hero.sub, locale)}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3 md:mt-12">
            <a href="#work" className="pill">
              {labels.work} <span aria-hidden="true">⊕</span>
            </a>
            <a href="#contact" className="pill">
              {labels.contact} <span aria-hidden="true">⊕</span>
            </a>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
          <span className="label label-dim flex items-center gap-2">
            <span
              aria-hidden="true"
              className="inline-block h-1.5 w-1.5 shrink-0 bg-sodium"
            />
            {t(profile.status, locale)}
          </span>
          <span className="label label-dim tabular">{labels.status}</span>
        </div>
      </div>
    </header>
  );
}
