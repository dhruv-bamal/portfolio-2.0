'use client';

import { useEffect, useRef, useState } from 'react';

import { useQuality } from '@/components/providers/Providers';

import styles from './CustomCursor.module.css';

/**
 * Custom pointer (plan §20).
 *
 * Enhancement only: the native cursor stays available, every label it shows is duplicated by
 * real text or an accessible name, and the whole thing is suppressed on touch and under
 * reduced motion (plan §27 "cursor is enhancement-only").
 */
export function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState('');
  const [enabled, setEnabled] = useState(false);
  const { reducedMotion, resolved } = useQuality();

  useEffect(() => {
    if (!resolved) return;
    // Touch devices and reduced-motion users keep the native pointer untouched.
    if (reducedMotion || window.matchMedia('(pointer: coarse)').matches) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    // Suppress the native pointer only while this is genuinely running.
    document.body.dataset.cursorMode = 'custom';

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const ringPos = { ...pos };
    let frame = 0;

    const onMove = (e: PointerEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0)`;
      }

      // The target is not always an Element — it can be the document, the window, or a text
      // node depending on where the pointer is and how the event was produced.
      const target = e.target;
      const el =
        target instanceof Element ? target.closest<HTMLElement>('[data-cursor]') : null;
      setLabel(el?.dataset.cursor ?? '');
    };

    // The ring trails with inertia; the dot is exact. Immediate where it matters.
    const tick = () => {
      ringPos.x += (pos.x - ringPos.x) * 0.18;
      ringPos.y += (pos.y - ringPos.y) * 0.18;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${ringPos.x}px, ${ringPos.y}px, 0)`;
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);

    window.addEventListener('pointermove', onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
      delete document.body.dataset.cursorMode;
    };
  }, [resolved, reducedMotion]);

  if (!enabled) return null;

  return (
    <div className={styles.root} aria-hidden="true">
      <div ref={dot} className={styles.dot} />
      <div ref={ring} className={`${styles.ring} ${label ? styles.ringActive : ''}`}>
        {label && <span className={`mono ${styles.label}`}>{label}</span>}
      </div>
    </div>
  );
}
