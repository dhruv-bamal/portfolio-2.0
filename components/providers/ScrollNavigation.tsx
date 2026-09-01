'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

import type { LenisLike } from '@/lib/scroll/lenisInstance';
import { getLenis } from '@/lib/scroll/lenisInstance';

/**
 * Navigation behaviour for a Lenis-controlled document.
 *
 * Three things a smooth-scrolled site has to do that a normal one gets for free:
 *
 * 1. **Anchors must glide.** A plain `href="#work"` performs a native jump, which Lenis neither
 *    animates nor knows about — the page teleports and Lenis' internal position then has to
 *    catch up. Same-page hash links are intercepted and handed to `lenis.scrollTo`.
 * 2. **Anchors must clear the fixed header.** Landing exactly on a section's top tucks its first
 *    line under the header, so every target is offset by the header's height.
 * 3. **Going back must return you where you were.** Leaving the home page for a case study and
 *    pressing Back otherwise drops you at the hero, forcing a re-scroll through the whole
 *    flagship to get back to the projects you were reading.
 */
export function ScrollNavigation() {
  const pathname = usePathname();
  const cameFromPopState = useRef(false);

  /** Offset a scroll target by the fixed header, plus a little breathing room. */
  const headerOffset = useCallback(() => {
    const raw = getComputedStyle(document.documentElement).getPropertyValue('--header-h');
    const h = parseInt(raw, 10);
    return -((Number.isFinite(h) ? h : 72) + 16);
  }, []);

  const scrollToTarget = useCallback((hash: string, immediate = false) => {
    if (!hash || hash === '#') return false;
    let el: Element | null = null;
    try {
      el = document.querySelector(hash);
    } catch {
      return false;
    }
    if (!el) return false;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(el as HTMLElement, { offset: headerOffset(), immediate });
    } else {
      // Reduced motion, or Lenis not running: native behaviour, still header-aware.
      const y = window.scrollY + el.getBoundingClientRect().top + headerOffset();
      window.scrollTo({ top: y, behavior: immediate ? 'auto' : 'smooth' });
    }
    return true;
  }, [headerOffset]);

  // ---- 1 & 2: same-page anchor clicks glide, header-aware ----
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as Element | null)?.closest?.('a');
      if (!anchor) return;

      const href = anchor.getAttribute('href');
      if (!href) return;

      // Same-document targets only: "#x", or "/#x" while already on "/".
      let hash = '';
      if (href.startsWith('#')) hash = href;
      else if (href.startsWith('/#') && pathname === '/') hash = href.slice(1);
      else return;

      if (!document.querySelector(hash)) return;

      // preventDefault only. Same-page anchors are plain <a> elements (see SiteHeader and
      // MovementMenu), so nothing downstream needs blocking — and crucially React's own
      // onClick handlers still run, which is what closes the menu after a jump.
      e.preventDefault();
      scrollToTarget(hash);
      // Keep the URL honest without letting the browser re-jump.
      if (history.replaceState) history.replaceState(null, '', hash);
    };

    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, [pathname, scrollToTarget]);

  // ---- 3: restore position on back/forward, and honour a hash on arrival ----
  useEffect(() => {
    const onPop = () => {
      cameFromPopState.current = true;
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  useEffect(() => {
    // Record where the reader is, so a later Back can put them back.
    let frame = 0;
    const save = () => {
      frame = 0;
      try {
        sessionStorage.setItem(`scroll:${pathname}`, String(Math.round(window.scrollY)));
      } catch {
        /* private mode — restoration is a nicety, not a requirement */
      }
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(save);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      save();
    };
  }, [pathname]);

  useEffect(() => {
    // Layout has to settle — fonts, the 3D canvas mounting, and ScrollTrigger's pin spacers all
    // change document height — before any target position means anything.
    let cancelled = false;

    const run = async () => {
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      if (cancelled) return;
      await new Promise((r) => setTimeout(r, 260));
      if (cancelled) return;
      ScrollTrigger.refresh();

      const hash = window.location.hash;
      const wasPop = cameFromPopState.current;
      cameFromPopState.current = false;

      if (hash && scrollToTarget(hash, true)) return;

      if (wasPop) {
        let saved: string | null = null;
        try {
          saved = sessionStorage.getItem(`scroll:${pathname}`);
        } catch {
          saved = null;
        }
        if (saved) {
          const y = Number(saved);
          if (Number.isFinite(y) && y > 0) {
            const lenis = getLenis();
            if (lenis) lenis.scrollTo(y, { immediate: true });
            else window.scrollTo(0, y);
          }
        }
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [pathname, scrollToTarget]);

  return null;
}

export type { LenisLike };
