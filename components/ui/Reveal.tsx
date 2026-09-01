'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './Reveal.module.css';

/**
 * Scroll-reveal primitive for DOM content.
 *
 * Uses IntersectionObserver rather than a ScrollTrigger per element — these are one-shot
 * entrances, not scrubbed timelines, so they should not cost a scroll subscription each.
 * Under reduced motion the element is simply visible from the start: the reveal is the
 * decoration, the content is not.
 */
export function Reveal({
  children,
  as: Tag = 'div',
  delay = 0,
  variant = 'rise',
  className = '',
  ...rest
}: {
  children: React.ReactNode;
  as?: 'div' | 'li' | 'section' | 'article' | 'p';
  delay?: number;
  variant?: 'rise' | 'wipe' | 'assemble';
  className?: string;
  /** Passed through so a revealed landmark keeps its accessible name. */
  'aria-labelledby'?: string;
  'aria-label'?: string;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setShown(true);
      return;
    }

    // threshold must stay 0. The `wipe` variant starts at clip-path: inset(0 100% 0 0), and
    // clipping is applied to the observer's intersection rect — so a clipped element reports
    // intersectionRatio 0 no matter how much of it is on screen, and any positive threshold
    // can never be met. The element would stay hidden permanently.
    // Timing comes from rootMargin instead: fire once the top crosses 85% of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setShown(true);
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: '0px 0px -15% 0px', threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Tag
      ref={ref as never}
      /* `is-revealed` is a plain global marker, not a CSS-module class. Other modules need to
         style descendants once a Reveal has fired, and a hashed module class cannot be
         targeted from another module's stylesheet. */
      className={`${styles.reveal} ${styles[variant]} ${
        shown ? `${styles.shown} is-revealed` : ''
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </Tag>
  );
}
