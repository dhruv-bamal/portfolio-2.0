/**
 * A module-level handle on the running Lenis instance.
 *
 * Navigation code (anchor clicks, back/forward restoration) needs to drive the same scroller
 * that owns the page. Passing it through React context would mean every consumer re-renders
 * when it is created; this is a single mutable reference set once by the provider, in the same
 * spirit as the scroll-progress store.
 *
 * It is `null` whenever Lenis is not running — reduced motion, or before it has initialised —
 * and callers are expected to fall back to native scrolling in that case.
 */

export interface LenisLike {
  scrollTo: (
    target: number | string | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number },
  ) => void;
  destroy: () => void;
  raf: (time: number) => void;
  stop?: () => void;
  start?: () => void;
}

let instance: LenisLike | null = null;

export function setLenis(next: LenisLike | null) {
  instance = next;
}

export function getLenis(): LenisLike | null {
  return instance;
}
