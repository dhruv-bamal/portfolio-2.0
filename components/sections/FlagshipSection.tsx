'use client';

import { useEffect, useRef, useState } from 'react';

import { useQuality } from '@/components/providers/Providers';
import { clamp01, scrollProgress, sceneState } from '@/lib/scroll/progress';

import s from './sections.module.css';

/**
 * Flagship transition — "Through the Escape Wheel" (plan §14).
 *
 * The DOM half of the sequence: a tall scroll track with a sticky stage. Scroll progress is
 * written into the shared store, which the 3D camera rig reads. The copy transforms on the
 * same progress value, so DOM and canvas stay in lockstep (plan §14.8).
 *
 * Reduced motion collapses the track to a single viewport and crossfades instead (plan §14.11).
 */
export function FlagshipSection() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const copyRef = useRef<HTMLDivElement>(null);
  const { reducedMotion, resolved } = useQuality();
  const [crossed, setCrossed] = useState(false);

  useEffect(() => {
    if (!resolved || reducedMotion) return;
    const track = trackRef.current;
    if (!track) return;

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        ScrollTrigger.create({
          trigger: track,
          start: 'top top',
          end: 'bottom bottom',
          onUpdate: (self) => {
            const p = self.progress;
            scrollProgress.flagship = p;
            sceneState.chapter = p >= 1 ? 'about' : p > 0 ? 'flagship' : 'hero';

            // The copy dissolves as the wheel grows past architectural scale (plan §14.3–4).
            // This is both the intended kinetic-type beat and what keeps text off the bright
            // metal: nothing is ever asked to be read against the rim.
            if (copyRef.current) {
              const fade = 1 - clamp01((p - 0.3) / 0.24);
              copyRef.current.style.opacity = String(fade);
              copyRef.current.style.transform = `translateY(${(1 - fade) * -22}px) scale(${1 + (1 - fade) * 0.06})`;
              copyRef.current.style.filter = fade < 1 ? `blur(${(1 - fade) * 4}px)` : 'none';
            }
          },
          onToggle: (self) => {
            if (!self.isActive && self.progress >= 1) setCrossed(true);
          },
        });
      }, track);
    })();

    // Esc is the keyboard escape route now that the visible Skip control is gone.
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return;
      const about = document.querySelector('#about');
      if (!about) return;
      const r = track.getBoundingClientRect();
      // Only while the pinned scene actually owns the viewport.
      if (r.top <= 0 && r.bottom >= window.innerHeight) {
        about.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    document.addEventListener('keydown', onKey);

    return () => {
      document.removeEventListener('keydown', onKey);
      ctx?.revert();
    };
  }, [resolved, reducedMotion]);

  // Reduced motion: no scroll track, no scrub — one screen, then straight into About.
  if (resolved && reducedMotion) {
    return (
      <section className={`${s.flagship} see-through`} aria-labelledby="flagship-title">
        <div className={s.flagshipSticky} style={{ position: 'relative', height: 'auto', paddingBlock: 'var(--s-10)' }}>
          <div className={s.flagshipCopy}>
            <h2 id="flagship-title" className={`display ${s.flagshipTitle}`}>
              Through the escape wheel.
            </h2>
            <p className={s.flagshipNote}>
              An escapement releases exactly one tooth per beat — never two. That is the guarantee
              this work is built on, and the door into it.
            </p>
            <p style={{ marginTop: 'var(--s-6)' }}>
              <a className="btn btn-ghost" href="#about">
                Continue
              </a>
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div ref={trackRef} className={s.flagship} style={{ height: '250svh' }}>
      <section
        ref={stageRef}
        className={`${s.flagshipSticky} see-through`}
        aria-labelledby="flagship-title"
      >
        <div className={s.flagshipCopy} ref={copyRef}>
          <h2 id="flagship-title" className={`display ${s.flagshipTitle}`}>
            Through the escape wheel.
          </h2>
          <p className={s.flagshipNote}>
            An escapement releases exactly one tooth per beat — never two. That is the guarantee
            this work is built on, and the door into it.
          </p>
        </div>

        {/* The scene carries no visible controls: the winding arc and the skip button both sat
            on top of the wheel at exactly the moment it fills the frame, and broke the shot.
            The escape route is preserved as a screen-reader-only link and the Esc key, so the
            pinned scene is still never a trap (plan §14.13). */}
        <a className="visually-hidden" href="#about">
          Skip the transition and continue to About
        </a>

        <p aria-live="polite" className="visually-hidden">
          {crossed ? 'Entered the movement. About section follows.' : ''}
        </p>
      </section>
    </div>
  );
}
