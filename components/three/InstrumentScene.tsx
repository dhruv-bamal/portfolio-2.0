'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense, useEffect, useState } from 'react';
import * as THREE from 'three';

import { CameraRig } from './CameraRig';
import { DustField } from './DustField';
import { Instrument } from './Instrument';
import { MovementHall } from './MovementHall';
import { acquireSceneResources, releaseSceneResources } from './resources';
import { useStudioEnv } from './useStudioEnv';
import { sceneState } from '@/lib/scroll/progress';

function Stage({ tier }: { tier: 'full' | 'adaptive' | 'reduced' }) {
  useStudioEnv();

  return (
    <>
      {/* Theatrical exhibit lighting: one key, one rim, a low fill (plan §18). */}
      <ambientLight intensity={0.18} />
      <directionalLight position={[3.2, 4.5, 5]} intensity={2.1} color="#fff3dd" />
      <directionalLight position={[-4, -1.5, 2]} intensity={0.7} color="#7d8ea8" />
      <pointLight position={[0.4, -0.3, 1.6]} intensity={1.4} color="#c9a96a" distance={7} />
      {/* A dim lamp deep in the hall so the interior has somewhere to recede toward. */}
      <pointLight position={[0, 0, -8]} intensity={26} color="#c9a96a" distance={26} />

      {/* Depth fog: the hall must fall away into darkness, not end at a visible last ring. */}
      <fog attach="fog" args={['#0c0c10', 6, 22]} />

      <Instrument quality={tier} />
      <MovementHall simple={tier !== 'full'} />
      {/* Dust count is the cheapest thing to scale by tier, so it is the first lever. */}
      <DustField
        count={tier === 'full' ? 900 : tier === 'adaptive' ? 320 : 160}
        reduced={tier === 'reduced'}
      />
    </>
  );
}

export function InstrumentScene({
  tier,
  dpr,
}: {
  tier: 'full' | 'adaptive' | 'reduced';
  dpr: number;
}) {
  // Pause the render loop entirely when the tab is hidden (plan §26).
  const [running, setRunning] = useState(true);

  useEffect(() => {
    const onVisibility = () => setRunning(document.visibilityState !== 'hidden');
    document.addEventListener('visibilitychange', onVisibility);
    onVisibility();
    return () => document.removeEventListener('visibilitychange', onVisibility);
  }, []);

  // Shared geometry/material lifetime is ref-counted, so a StrictMode remount or a route
  // change does not tear down resources the next mount immediately needs.
  useEffect(() => {
    acquireSceneResources();
    return releaseSceneResources;
  }, []);

  return (
    <Canvas
      frameloop={running ? 'always' : 'never'}
      dpr={[1, dpr]}
      gl={{
        antialias: tier === 'full',
        powerPreference: 'high-performance',
        alpha: true,
      }}
      camera={{ position: [0, 0, 4.9], fov: 42, near: 0.05, far: 60 }}
      onCreated={({ gl, scene, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
        sceneState.paused = false;
        if (process.env.NODE_ENV !== 'production') {
          (window as unknown as Record<string, unknown>).__r3f = { scene, camera, gl };
        }
      }}
    >
      <Suspense fallback={null}>
        <Stage tier={tier} />
        <CameraRig />
      </Suspense>
    </Canvas>
  );
}
