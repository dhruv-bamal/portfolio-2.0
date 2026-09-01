'use client';

import { createContext, useContext, useEffect, useRef, useState } from 'react';

import { type Quality, useQualityTierDetection } from '@/lib/hooks/useQualityTier';
import { type LenisLike, setLenis } from '@/lib/scroll/lenisInstance';
import { sceneState } from '@/lib/scroll/progress';

const QualityContext = createContext<Quality>({
  tier: 'none',
  dpr: 1,
  webgl: false,
  reducedMotion: false,
  resolved: false,
});

export const useQuality = () => useContext(QualityContext);

interface MotionPrefContext {
  motionReduced: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionPrefContext>({
  motionReduced: false,
  toggleMotion: () => {},
});

export const useMotionPreference = () => useContext(MotionContext);

/**
 * Scroll + quality providers.
 *
 * Lenis owns scrolling and drives GSAP's ticker, so DOM tweens, ScrollTrigger and the R3F
 * frame loop all advance from one clock (plan §24 layer separation, §26 runtime discipline).
 */
export function Providers({ children }: { children: React.ReactNode }) {
  const quality = useQualityTierDetection();
  const [manualReduced, setManualReduced] = useState(false);
  const lenisRef = useRef<{ destroy: () => void; raf: (t: number) => void } | null>(null);

  const motionReduced = quality.reducedMotion || manualReduced;

  // Mirror the manual toggle onto <html> so CSS can respond too.
  useEffect(() => {
    document.documentElement.dataset.motion = manualReduced ? 'reduced' : 'full';
  }, [manualReduced]);

  useEffect(() => {
    if (!quality.resolved) return;

    let disposed = false;
    let cleanup: (() => void) | undefined;

    (async () => {
      const [{ default: Lenis }, { gsap }, { ScrollTrigger }] = await Promise.all([
        import('lenis'),
        import('gsap'),
        import('gsap/ScrollTrigger'),
      ]);
      if (disposed) return;

      gsap.registerPlugin(ScrollTrigger);

      // Reduced motion: no smoothing/inertia at all — native scrolling only.
      if (motionReduced) {
        setLenis(null);
        ScrollTrigger.refresh();
        cleanup = () => {
          ScrollTrigger.getAll().forEach((t) => t.kill());
        };
        return;
      }

      const lenis = new Lenis({
        // A longer glide than the default: the flagship is a camera move, and a short lerp
        // makes the wheel pass feel stepped rather than flown.
        lerp: window.matchMedia('(pointer: coarse)').matches ? 0.14 : 0.075,
        wheelMultiplier: 0.9,
        smoothWheel: true,
        // Never smooth touch: it fights native momentum and hurts usability (plan §27).
        syncTouch: false,
      });
      lenisRef.current = lenis as unknown as { destroy: () => void; raf: (t: number) => void };
      setLenis(lenis as unknown as LenisLike);
      if (process.env.NODE_ENV !== 'production') {
        (window as unknown as Record<string, unknown>).__lenis = lenis;
      }

      lenis.on('scroll', ScrollTrigger.update);

      const tick = (time: number) => lenis.raf(time * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);

      ScrollTrigger.refresh();

      cleanup = () => {
        gsap.ticker.remove(tick);
        ScrollTrigger.getAll().forEach((t) => t.kill());
        lenis.destroy();
        setLenis(null);
        lenisRef.current = null;
      };
    })();

    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [quality.resolved, motionReduced]);

  // Pause the render loop when the tab is hidden (plan §26).
  useEffect(() => {
    const onVisibility = () => {
      sceneState.paused = document.visibilityState === 'hidden';
    };
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Pointer parallax feed — written to the mutable store, never to React state.
  useEffect(() => {
    if (motionReduced) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const onMove = (e: PointerEvent) => {
      sceneState.pointerX = (e.clientX / window.innerWidth) * 2 - 1;
      sceneState.pointerY = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, [motionReduced]);

  const effectiveQuality: Quality = motionReduced
    ? { ...quality, reducedMotion: true, tier: quality.webgl ? 'reduced' : 'none' }
    : quality;

  return (
    <QualityContext.Provider value={effectiveQuality}>
      <MotionContext.Provider
        value={{ motionReduced, toggleMotion: () => setManualReduced((v) => !v) }}
      >
        {children}
      </MotionContext.Provider>
    </QualityContext.Provider>
  );
}
