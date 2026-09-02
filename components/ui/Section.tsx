import type { ReactNode } from 'react';

/**
 * Full-bleed hairline-separated band with the mono metadata header from the
 * reference: label on the left, zero-padded index on the right.
 */
export default function Section({
  id,
  label,
  index,
  children,
  className,
}: {
  id: string;
  label: string;
  index: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`hairline scroll-mt-16 ${className ?? ''}`}>
      <div className="mx-auto w-full max-w-6xl px-5 py-20 md:px-10 md:py-32">
        <div className="mb-12 flex items-start justify-between gap-6 md:mb-20">
          <h2 className="label">
            {label} <span className="label-dim">— —</span>
          </h2>
          <span className="label label-dim tabular shrink-0">
            {String(index).padStart(2, '0')} —
          </span>
        </div>
        {children}
      </div>
    </section>
  );
}
