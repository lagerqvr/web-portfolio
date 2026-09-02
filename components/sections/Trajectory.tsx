import Reveal from '@/components/ui/Reveal';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Trajectory({
  content,
  locale,
}: {
  content: SiteContent;
  locale: Locale;
}) {
  const entries = [...content.trajectory].sort((a, b) => b.sortKey - a.sortKey);

  return (
    <ol className="border-t border-hairline">
      {entries.map((entry, i) => (
        <Reveal as="li" key={entry.id} delay={i * 50} className="border-b border-hairline">
          <div className="group grid gap-3 py-7 md:grid-cols-[8.5rem_1fr] md:gap-10 md:py-9">
            <div className="flex items-center gap-2.5 md:block">
              <span
                aria-hidden="true"
                className={`inline-block h-1.5 w-1.5 shrink-0 md:mb-3 ${
                  entry.kind === 'education' ? 'bg-dim' : 'bg-sodium'
                }`}
              />
              <span className="label label-dim tabular">{entry.period}</span>
            </div>

            <div className="max-w-3xl">
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                <h3 className="text-lg tracking-[-0.015em] text-text md:text-xl">
                  {t(entry.role, locale)}
                </h3>
                {entry.orgUrl ? (
                  <a
                    href={entry.orgUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="label text-dim transition-colors duration-150 ease-[steps(4,end)] hover:text-text"
                  >
                    {entry.org}
                  </a>
                ) : (
                  <span className="label text-dim">{entry.org}</span>
                )}
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted">
                {t(entry.body, locale)}
              </p>
            </div>
          </div>
        </Reveal>
      ))}
    </ol>
  );
}
