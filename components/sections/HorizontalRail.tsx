'use client';

import { useEffect, useRef } from 'react';

import { useQuality } from '@/components/providers/Providers';
import { scrollProgress, sceneState } from '@/lib/scroll/progress';

import s from './sections.module.css';

/**
 * Horizontal rail for the three project chambers.
 *
 * Vertical scrolling drives horizontal travel while the rail is pinned. This is scroll-jacking
 * by design (plan §6 permits it in short, signposted scenes), so it obeys the same rules as the
 * flagship: a visible position indicator, natural reversal, and a real escape.
 *
 * It degrades to an ordinary vertical stack whenever horizontal travel would be the wrong
 * interaction — touch pointers, narrow viewports, and reduced motion — with no JS involved in
 * that path at all.
 */
export function HorizontalRail({
  children,
  count,
  labels,
}: {
  children: React.ReactNode;
  count: number;
  labels: string[];
}) {
  const outer = useRef<HTMLDivElement>(null);
  const track = useRef<HTMLDivElement>(null);
  const dots = useRef<HTMLDivElement>(null);
  const { resolved, reducedMotion } = useQuality();

  useEffect(() => {
    if (!resolved) return;

    const el = outer.current;
    const rail = track.current;
    if (!el || !rail) return;

    // The fallback conditions are checked here rather than in CSS alone, so the pin is never
    // created for a visitor who will not benefit from it.
    const wantsHorizontal =
      !reducedMotion &&
      window.matchMedia('(min-width: 900px)').matches &&
      window.matchMedia('(pointer: fine)').matches;

    if (!wantsHorizontal) {
      el.dataset.mode = 'stack';
      return;
    }
    el.dataset.mode = 'rail';

    let ctx: { revert: () => void } | undefined;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const panels = gsap.utils.toArray<HTMLElement>(`.${s.panel}`, rail);
        if (panels.length < 2) return;

        const distance = () => rail.scrollWidth - el.offsetWidth;

        gsap.to(rail, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: el,
            start: 'top top',
            // Travel one viewport-height of scroll per panel transition, so the rate feels
            // like scrolling rather than being dragged.
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              scrollProgress.work = self.progress;

              // Which chamber is on stage — drives the scene's jewel accent.
              const idx = Math.min(count - 1, Math.round(self.progress * (count - 1)));
              sceneState.activeProject = idx;
              (['work0', 'work1', 'work2'] as const).forEach((key, i) => {
                const span = 1 / (count - 1 || 1);
                scrollProgress[key] = Math.max(
                  0,
                  Math.min(1, 1 - Math.abs(self.progress - i * span) / span),
                );
              });

              if (dots.current) {
                dots.current.dataset.active = String(idx);
                dots.current.style.setProperty('--rail-progress', String(self.progress));
              }
            },
            onLeave: () => {
              sceneState.activeProject = -1;
            },
            onLeaveBack: () => {
              sceneState.activeProject = -1;
            },
          },
        });
      }, el);

      ScrollTrigger.refresh();
    })();

    return () => ctx?.revert();
  }, [resolved, reducedMotion, count]);

  return (
    <div ref={outer} className={s.rail} data-mode="stack">
      <div ref={track} className={s.railTrack}>
        {children}
      </div>

      {/* Position indicator — a pinned scene must always say where the visitor is (plan §6). */}
      <div ref={dots} className={s.railProgress} data-active="0" aria-hidden="true">
        <span className={s.railBar}>
          <span className={s.railBarFill} />
        </span>
        <span className={`mono ${s.railLabels}`}>
          {labels.map((l, i) => (
            <span key={l} className={s.railLabel} data-i={i}>
              {l}
            </span>
          ))}
        </span>
      </div>
    </div>
  );
}
