'use client';

import { useEffect, useRef, useState } from 'react';

import styles from './CaseChapter.module.css';

/**
 * One chapter of a case study.
 *
 * The heading sticks while its section is in view and its rule draws across as the reader
 * moves through it, so progress through the story is legible without a separate progress bar.
 * The whole effect is decoration: the heading and content are ordinary semantic DOM, and under
 * reduced motion the chapter simply renders complete and static.
 */
export function CaseChapter({
  index,
  title,
  variant = 'default',
  children,
}: {
  index: string;
  title: string;
  variant?: 'default' | 'feature' | 'boundary';
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setEntered(true);
      setProgress(1);
      return;
    }

    let frame = 0;
    const measure = () => {
      frame = 0;
      const r = el.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 as the chapter's top reaches the middle of the screen, 1 as its bottom leaves it.
      const total = r.height + vh * 0.5;
      const travelled = vh * 0.75 - r.top;
      const p = Math.max(0, Math.min(1, travelled / total));
      setProgress(p);
      if (r.top < vh * 0.85 && r.bottom > 0) setEntered(true);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <section
      ref={ref}
      className={`${styles.chapter} ${styles[variant]} ${entered ? styles.entered : ''}`}
      aria-labelledby={`chapter-${index}`}
      style={{ ['--chapter-progress' as string]: String(progress) }}
    >
      <div className={styles.aside}>
        <div className={styles.stickyHead}>
          <p className={`mono ${styles.index}`}>{index}</p>
          <h2 id={`chapter-${index}`} className={styles.title}>
            {title}
          </h2>
          <span className={styles.progressRule} aria-hidden="true">
            <span className={styles.progressFill} />
          </span>
        </div>
      </div>

      <div className={styles.content}>{children}</div>
    </section>
  );
}
