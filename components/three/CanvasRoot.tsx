'use client';

import dynamic from 'next/dynamic';

import { useQuality } from '@/components/providers/Providers';

/**
 * Host for the persistent 3D world.
 *
 * The scene is code-split and only requested once the quality tier has resolved and WebGL is
 * confirmed — so the no-WebGL edition never downloads three.js at all (plan §26 loading order).
 * Everything here is decoration: the DOM below carries every fact.
 */
const InstrumentScene = dynamic(
  () => import('./InstrumentScene').then((m) => m.InstrumentScene),
  { ssr: false },
);

export function CanvasRoot() {
  const quality = useQuality();

  if (!quality.resolved || !quality.webgl) return null;

  return (
    <div className="canvas-root" aria-hidden="true">
      <InstrumentScene
        tier={quality.tier === 'none' ? 'adaptive' : quality.tier}
        dpr={quality.dpr}
      />
    </div>
  );
}
