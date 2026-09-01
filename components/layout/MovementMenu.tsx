'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

import { useMotionPreference } from '@/components/providers/Providers';
import { chapters } from '@/lib/content/capabilities';
import { identity, projects } from '@/lib/content';

import styles from './MovementMenu.module.css';

/**
 * Chapter index as an engraved movement diagram (plan §12).
 * Focus-trapped, Esc-closable, and operable entirely by keyboard.
 */
export function MovementMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const restoreFocusTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreFocusTo.current = document.activeElement as HTMLElement;

    const node = dialogRef.current;
    const focusables = () =>
      Array.from(
        node?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );

    focusables()[0]?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== 'Tab') return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = prevOverflow;
      restoreFocusTo.current?.focus?.();
    };
  }, [open, onClose]);

  const { motionReduced, toggleMotion } = useMotionPreference();

  if (!open) return null;

  return (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-label="Chapter index"
      ref={dialogRef}
    >
      <div className={styles.inner}>
        <div className={styles.head}>
          <p className="mono">Movement diagram — index</p>
          <button type="button" className={`mono ${styles.close}`} onClick={onClose}>
            Close ✕
          </button>
        </div>

        <div className={styles.body}>
          <nav aria-label="Chapters" className={styles.chapters}>
            <ol className={styles.chapterList}>
              {chapters.map((c) => (
                <li key={c.id}>
                  <Link href={`/${c.anchor}`} className={styles.chapterLink} onClick={onClose}>
                    <span className={`mono ${styles.chapterIndex}`}>{c.index}</span>
                    <span className={`display ${styles.chapterTitle}`}>{c.title}</span>
                  </Link>
                </li>
              ))}
            </ol>
          </nav>

          <div className={styles.side}>
            <div className={styles.sideBlock}>
              <p className={`mono ${styles.sideLabel}`}>Complications</p>
              <ul className={styles.sideList}>
                {projects.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/work/${p.slug}`}
                      className={styles.sideLink}
                      onClick={onClose}
                      data-accent={p.accent}
                    >
                      <span className={styles.jewel} aria-hidden="true" />
                      {p.name}
                      <span className={`mono ${styles.sideNote}`}>{p.mechanismName}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.sideBlock}>
              <p className={`mono ${styles.sideLabel}`}>Direct</p>
              <ul className={styles.sideList}>
                <li>
                  <a className={styles.sideLink} href={`mailto:${identity.email}`}>
                    {identity.email}
                  </a>
                </li>
                <li>
                  <a
                    className={styles.sideLink}
                    href="/resume/dhruv-bamal-backend-engineer.pdf"
                    download
                  >
                    Résumé (PDF) ↓
                  </a>
                </li>
                <li>
                  <a
                    className={styles.sideLink}
                    href={identity.links.github}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    GitHub ↗
                  </a>
                </li>
                <li>
                  <a
                    className={styles.sideLink}
                    href={identity.links.linkedin}
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    LinkedIn ↗
                  </a>
                </li>
              </ul>
            </div>

            <div className={styles.sideBlock}>
              <p className={`mono ${styles.sideLabel}`}>Display</p>
              <button type="button" className={styles.toggle} onClick={toggleMotion}>
                <span className={styles.toggleBox} data-on={motionReduced} aria-hidden="true" />
                <span>Reduce motion</span>
              </button>
              <p className={`mono-plain ${styles.toggleNote}`}>
                {motionReduced
                  ? 'Cinematics are held as composed stills. All content remains available.'
                  : 'Full cinematic motion. Your system setting is respected automatically.'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
