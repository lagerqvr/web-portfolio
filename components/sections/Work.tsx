import Image from 'next/image';
import { Link } from '@/lib/i18n/navigation';
import Reveal from '@/components/ui/Reveal';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Work({
  content,
  locale,
  labels,
}: {
  content: SiteContent;
  locale: Locale;
  labels: { readMore: string };
}) {
  const featured = content.work.filter((w) => w.featured);
  const rest = content.work.filter((w) => !w.featured);

  return (
    <div className="space-y-16 md:space-y-24">
      <div className="grid gap-px bg-hairline md:grid-cols-2">
        {featured.map((entry, i) => (
          <Reveal key={entry.slug} delay={i * 70} className="bg-ground">
            <Link
              href={`/work/${entry.slug}`}
              className="group flex h-full flex-col gap-5 p-6 transition-colors duration-150 ease-[steps(4,end)] hover:bg-panel md:p-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <span className="label text-sodium">{t(entry.kind, locale)}</span>
                <span className="label label-dim tabular shrink-0">{entry.year}</span>
              </div>

              {entry.image ? (
                <Image
                  src={entry.image}
                  alt=""
                  width={72}
                  height={72}
                  className="pixelated h-14 w-14 border border-hairline"
                  unoptimized
                />
              ) : null}

              <h3 className="text-2xl leading-[1.15] tracking-[-0.025em] text-text md:text-[2rem]">
                {entry.title}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {t(entry.summary, locale)}
              </p>

              <span className="label mt-auto pt-2 text-dim transition-colors duration-150 ease-[steps(4,end)] group-hover:text-text">
                {labels.readMore} <span aria-hidden="true">→</span>
              </span>
            </Link>
          </Reveal>
        ))}
      </div>

      <ol className="border-t border-hairline">
        {rest.map((entry, i) => (
          <Reveal as="li" key={entry.slug} delay={i * 50} className="border-b border-hairline">
            <Link
              href={`/work/${entry.slug}`}
              className="group grid items-baseline gap-2 py-6 md:grid-cols-[8.5rem_1fr_auto] md:gap-8 md:py-7"
            >
              <span className="label label-dim tabular">{entry.year}</span>
              <div className="max-w-2xl">
                <h3 className="text-lg tracking-[-0.015em] text-text md:text-xl">{entry.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-muted">
                  {t(entry.summary, locale)}
                </p>
              </div>
              <span
                aria-hidden="true"
                className="label label-dim hidden transition-colors duration-150 ease-[steps(4,end)] group-hover:text-text md:block"
              >
                →
              </span>
            </Link>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
