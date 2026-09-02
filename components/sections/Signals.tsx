import Reveal from '@/components/ui/Reveal';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Signals({ content, locale }: { content: SiteContent; locale: Locale }) {
  // Group by category while preserving the authored order of both.
  const groups: { category: string; items: SiteContent['signals']['items'] }[] = [];
  for (const item of content.signals.items) {
    const group = groups.find((g) => g.category === item.category);
    if (group) group.items.push(item);
    else groups.push({ category: item.category, items: [item] });
  }

  return (
    <div>
      <Reveal>
        <p className="mb-14 max-w-2xl text-lg leading-[1.5] tracking-[-0.01em] text-text md:mb-20 md:text-2xl">
          {t(content.signals.intro, locale)}
        </p>
      </Reveal>

      <div className="space-y-10">
        {groups.map((group, gi) => (
          <Reveal key={group.category} delay={gi * 60}>
            <div className="grid gap-3 md:grid-cols-[8.5rem_1fr] md:gap-10">
              <span className="label label-dim pt-1">{group.category}</span>
              <ul className="border-t border-hairline">
                {group.items.map((item) => {
                  const note = t(item.note, locale);
                  const inner = (
                    <>
                      <span className="text-[0.9375rem] text-text">{item.label}</span>
                      <span className="text-[0.9375rem] leading-relaxed text-muted">{note}</span>
                    </>
                  );

                  return (
                    <li key={item.id} className="border-b border-hairline">
                      {item.url ? (
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group grid gap-1 py-4 md:grid-cols-[14rem_1fr] md:gap-6"
                        >
                          <span className="text-[0.9375rem] text-text transition-colors duration-150 ease-[steps(4,end)] group-hover:text-sodium">
                            {item.label} <span aria-hidden="true" className="text-dim">↗</span>
                          </span>
                          <span className="text-[0.9375rem] leading-relaxed text-muted">{note}</span>
                        </a>
                      ) : (
                        <div className="grid gap-1 py-4 md:grid-cols-[14rem_1fr] md:gap-6">{inner}</div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
