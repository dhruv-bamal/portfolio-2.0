'use client';

import { useEffect } from 'react';

import { useQuality } from '@/components/providers/Providers';
import { scrollProgress, sceneState } from '@/lib/scroll/progress';

/**
 * The motion-orchestration layer (plan §24).
 *
 * One place that reads the document and writes chapter progress into the shared store. The
 * 3D layer subscribes to those numbers; no component re-renders as the visitor scrolls.
 */
export function ScrollDirector() {
  const { resolved, reducedMotion } = useQuality();

  useEffect(() => {
    if (!resolved) return;

    let ctx: { revert: () => void } | undefined;
    let cancelled = false;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        const track = (
          selector: string,
          write: (p: number) => void,
          opts: { start?: string; end?: string } = {},
        ) => {
          const el = document.querySelector(selector);
          if (!el) return;
          ScrollTrigger.create({
            trigger: el,
            start: opts.start ?? 'top bottom',
            end: opts.end ?? 'bottom top',
            onUpdate: (self) => write(self.progress),
            onToggle: (self) => {
              if (self.isActive) write(self.progress);
            },
          });
        };

        // Per-chapter progress, each 0 → 1 as the section crosses the viewport.
        track('#about', (p) => {
          scrollProgress.about = p;
          if (p > 0 && p < 1) sceneState.chapter = 'about';
        });
        track('#achievements', (p) => {
          scrollProgress.achievements = p;
          if (p > 0 && p < 1) sceneState.chapter = 'achievements';
        });
        track('#skills', (p) => {
          scrollProgress.skills = p;
          if (p > 0 && p < 1) sceneState.chapter = 'skills';
        });
        // #work's own progress and its active-chamber state are owned by HorizontalRail: the
        // chambers live inside a pinned container, so their document positions no longer track
        // what is on screen. Only the chapter marker is set here.
        track('#work', (p) => {
          if (p > 0 && p < 1) sceneState.chapter = 'work';
        });
        track('#build', (p) => {
          scrollProgress.build = p;
          if (p > 0 && p < 1) sceneState.chapter = 'build';
        });
        track('#contact', (p) => {
          scrollProgress.contact = p;
          if (p > 0) sceneState.chapter = 'contact';
        });

        // One journey value spanning everything after the flagship — the camera's path
        // through the movement hall is a single continuous move, not a series of jumps.
        const about = document.querySelector('#about');
        const contact = document.querySelector('#contact');
        if (about && contact) {
          ScrollTrigger.create({
            trigger: about,
            start: 'top bottom',
            endTrigger: contact,
            end: 'bottom bottom',
            onUpdate: (self) => {
              scrollProgress.page = self.progress;
            },
          });
        }

        ScrollTrigger.refresh();
      });
    })();

    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [resolved, reducedMotion]);

  return null;
}
