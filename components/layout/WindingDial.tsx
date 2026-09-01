'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { chapters } from '@/lib/content/capabilities';

import styles from './WindingDial.module.css';

/**
 * Chapter progress as a winding dial (plan §12) — mainspring tension, not a generic bar.
 * It is also a real navigation control: each notch is a link to its chapter.
 */
export function WindingDial() {
  const arcRef = useRef<SVGCircleElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();
  // The dial indexes the home page's chapters; on any other route those anchors do not exist.
  const onHome = pathname === '/';

  useEffect(() => {
    if (!onHome) return;
    let frame = 0;
    const C = 2 * Math.PI * 15;

    const measure = () => {
      frame = 0;
      const doc = document.documentElement;
      const max = doc.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;

      if (arcRef.current) arcRef.current.style.strokeDashoffset = String(C * (1 - p));
      setVisible(window.scrollY > window.innerHeight * 0.5);

      // Which chapter currently owns the upper third of the viewport.
      let current = 0;
      chapters.forEach((c, i) => {
        const el = document.querySelector(c.anchor);
        if (el && el.getBoundingClientRect().top <= window.innerHeight * 0.35) current = i;
      });
      setActive(current);
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
  }, [onHome]);

  if (!onHome) return null;

  const chapter = chapters[active];

  return (
    <nav
      className={`winding-dial ${styles.dial} ${visible ? styles.visible : ''}`}
      aria-label="Chapter progress"
    >
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden="true" className={styles.svg}>
        <circle cx="18" cy="18" r="15" fill="none" stroke="var(--rule-void)" strokeWidth="1.5" />
        <circle
          ref={arcRef}
          cx="18"
          cy="18"
          r="15"
          fill="none"
          stroke="var(--brass)"
          strokeWidth="1.5"
          strokeLinecap="round"
          transform="rotate(-90 18 18)"
          style={{ strokeDasharray: 2 * Math.PI * 15, strokeDashoffset: 2 * Math.PI * 15 }}
        />
      </svg>

      <a href={chapter.anchor} className={`mono ${styles.label}`}>
        <span className={styles.index}>{chapter.index}</span>
        <span className={styles.title}>{chapter.title}</span>
      </a>
    </nav>
  );
}
