import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import { paragraphs } from '@/lib/rich-text';
import { t, type Locale, type SiteContent } from '@/lib/schemas';

export default function Core({ content, locale }: { content: SiteContent; locale: Locale }) {
  const body = paragraphs(t(content.core.body, locale));

  return (
    <div className="grid gap-10 md:grid-cols-[7rem_1fr] md:gap-16 lg:grid-cols-[10rem_1fr]">
      <Reveal className="shrink-0">
        <Image
          src={content.profile.avatar}
          alt={content.profile.name}
          width={72}
          height={72}
          className="pixelated h-16 w-16 border border-hairline md:h-20 md:w-20"
          unoptimized
        />
      </Reveal>

      <div className="max-w-3xl space-y-6">
        {body.map((paragraph, i) => (
          <Reveal key={i} delay={i * 70}>
            <p
              className={
                i === 0
                  ? 'text-xl leading-[1.45] tracking-[-0.015em] text-text md:text-[1.75rem]'
                  : 'text-base leading-relaxed text-muted md:text-lg'
              }
            >
              {paragraph}
            </p>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
