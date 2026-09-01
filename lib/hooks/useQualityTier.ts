'use client';

import { useEffect, useState } from 'react';

/**
 * Quality tiers (plan §26). Each is an art-directed edition, not a degraded page.
 *  full     — every scene, threshold shader, DPR ≤ 2
 *  adaptive — DPR ≤ 1.5, simplified parts, masked 2D threshold wipe
 *  reduced  — composed stills, instant transitions (prefers-reduced-motion)
 *  none     — no WebGL: the Patent Drawing Edition
 */
export type QualityTier = 'full' | 'adaptive' | 'reduced' | 'none';

export interface Quality {
  tier: QualityTier;
  dpr: number;
  /** True when any real-time 3D should mount. */
  webgl: boolean;
  reducedMotion: boolean;
  /** True once detection has run on the client. */
  resolved: boolean;
}

/** Server-safe default: assume the base (no-WebGL) edition until the client says otherwise. */
const INITIAL: Quality = {
  tier: 'none',
  dpr: 1,
  webgl: false,
  reducedMotion: false,
  resolved: false,
};

function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    const gl =
      canvas.getContext('webgl2') ||
      canvas.getContext('webgl') ||
      canvas.getContext('experimental-webgl');
    if (!gl) return false;
    // Release the probe context immediately.
    const lose = (gl as WebGLRenderingContext).getExtension('WEBGL_lose_context');
    lose?.loseContext();
    return true;
  } catch {
    return false;
  }
}

interface NavigatorWithHints extends Navigator {
  deviceMemory?: number;
  connection?: { saveData?: boolean; effectiveType?: string };
}

function detect(): Quality {
  const reducedMotion =
    window.matchMedia('(prefers-reduced-motion: reduce)').matches ||
    document.documentElement.dataset.motion === 'reduced';

  const webgl = detectWebGL();
  if (!webgl) {
    return { tier: 'none', dpr: 1, webgl: false, reducedMotion, resolved: true };
  }
  if (reducedMotion) {
    // Still render the world, but as composed stills with no scrubbed cinematics.
    return { tier: 'reduced', dpr: Math.min(window.devicePixelRatio, 1.5), webgl: true, reducedMotion, resolved: true };
  }

  const nav = navigator as NavigatorWithHints;
  const cores = nav.hardwareConcurrency ?? 4;
  const memory = nav.deviceMemory ?? 4;
  const saveData = nav.connection?.saveData === true;
  const slowNetwork = /^(slow-2g|2g|3g)$/.test(nav.connection?.effectiveType ?? '');
  const coarse = window.matchMedia('(pointer: coarse)').matches;
  const narrow = window.innerWidth < 900;

  const constrained = saveData || slowNetwork || cores <= 4 || memory <= 4 || (coarse && narrow);

  return constrained
    ? { tier: 'adaptive', dpr: Math.min(window.devicePixelRatio, 1.5), webgl: true, reducedMotion, resolved: true }
    : { tier: 'full', dpr: Math.min(window.devicePixelRatio, 2), webgl: true, reducedMotion, resolved: true };
}

export function useQualityTierDetection(): Quality {
  const [quality, setQuality] = useState<Quality>(INITIAL);

  useEffect(() => {
    const apply = () => setQuality(detect());
    apply();

    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addEventListener('change', apply);

    // WebGL context loss anywhere on the page drops us to the Patent Drawing Edition.
    const onLost = () =>
      setQuality((q) => ({ ...q, tier: 'none', webgl: false, resolved: true }));
    window.addEventListener('webglcontextlost', onLost, true);

    return () => {
      motionQuery.removeEventListener('change', apply);
      window.removeEventListener('webglcontextlost', onLost, true);
    };
  }, []);

  return quality;
}
