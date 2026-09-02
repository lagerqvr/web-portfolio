'use client';

import { useEffect, useRef, type ReactNode } from 'react';

/**
 * Adds the resolved state once an element enters the viewport, so content
 * settles from coarse to sharp the way the dither field does. Observes once
 * and disconnects — this is decoration, not a scroll-linked animation.
 */
export default function Reveal({
  children,
  className,
  delay = 0,
  as: Tag = 'div',
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  as?: 'div' | 'li' | 'section' | 'article';
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      node.classList.add('is-resolved');
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          node.style.transitionDelay = `${delay}ms`;
          node.classList.add('is-resolved');
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [delay]);

  return (
    // @ts-expect-error -- polymorphic tag with a shared ref type
    <Tag ref={ref} className={`resolve ${className ?? ''}`}>
      {children}
    </Tag>
  );
}
