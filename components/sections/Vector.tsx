import Reveal from '@/components/ui/Reveal';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Vector({ content, locale }: { content: SiteContent; locale: Locale }) {
  return (
    <div>
      <Reveal>
        <p className="mb-14 max-w-2xl text-lg leading-[1.5] tracking-[-0.01em] text-text md:mb-20 md:text-2xl">
          {t(content.vector.intro, locale)}
        </p>
      </Reveal>

      <ol className="grid gap-px bg-hairline sm:grid-cols-2">
        {content.vector.modes.map((mode, i) => (
          <Reveal
            as="li"
            key={mode.id}
            delay={i * 60}
            // An odd final card spans the row rather than sitting alone.
            className={`bg-ground ${
              content.vector.modes.length % 2 === 1 && i === content.vector.modes.length - 1
                ? 'sm:col-span-2'
                : ''
            }`}
          >
            <div className="flex h-full flex-col gap-4 p-6 md:p-8">
              <div className="flex items-baseline justify-between gap-4">
                <span className="label text-text">{mode.label}</span>
                <span className="label label-dim tabular shrink-0">
                  {String(i + 1).padStart(2, '0')}
                </span>
              </div>
              <h3 className="text-xl tracking-[-0.02em] text-text md:text-2xl">
                {t(mode.title, locale)}
              </h3>
              <p className="text-[0.9375rem] leading-relaxed text-muted">
                {t(mode.body, locale)}
              </p>
            </div>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
