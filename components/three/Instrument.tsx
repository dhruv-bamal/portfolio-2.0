'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import {
  arborGeometry,
  escapeWheelGeometry,
  gearGeometry,
  hairspringGeometry,
  jewelGeometry,
  mainspringGeometry,
  palletForkGeometry,
  ringGeometry,
} from './geometry';
import { jewelMaterial, materials } from './materials';
import { sceneState, scrollProgress, smoothstep } from '@/lib/scroll/progress';

const TEETH = 15;
const ANGLE_PER_TOOTH = (Math.PI * 2) / TEETH;
const BEAT_SECONDS = 2;

/**
 * Where the escapement sits inside the instrument, and the point the camera aims for during
 * the flagship pass. Exported so the camera rig and the scene agree on one number.
 */
export const ESCAPEMENT_POSITION: [number, number, number] = [0.16, -0.2, 0.06];

/** Radius and azimuth of the open sector the camera flies through (between two spokes). */
export const GAP_RADIUS = 0.33;
export const GAP_AZIMUTH = Math.PI / 4;

/** Fast release, then dwell — the escapement's characteristic motion. */
function releaseEase(t: number) {
  // easeOutCubic over the first fraction of the beat, flat afterwards.
  const k = Math.min(t / 0.18, 1);
  return 1 - Math.pow(1 - k, 3);
}

/**
 * The Instrument (plan §9) — the persistent 3D protagonist.
 *
 * Everything here is procedural. Motion is quantised to beats: once per beat the pallet
 * releases the escape wheel by exactly one tooth. Never two. That is the concept, running.
 */
export function Instrument({ quality }: { quality: 'full' | 'adaptive' | 'reduced' }) {
  const root = useRef<THREE.Group>(null);
  const escapeWheel = useRef<THREE.Group>(null);
  const pallet = useRef<THREE.Group>(null);
  const balance = useRef<THREE.Group>(null);
  const barrel = useRef<THREE.Group>(null);
  const trainA = useRef<THREE.Mesh>(null);
  const trainB = useRef<THREE.Mesh>(null);
  const jewels = useRef<THREE.Group>(null);
  const thresholdGlow = useRef<THREE.Mesh>(null);
  const thresholdLight = useRef<THREE.PointLight>(null);

  const elapsed = useRef(0);
  const reduced = quality === 'reduced';
  const simple = quality !== 'full';

  const geo = useMemo(
    () => ({
      escape: escapeWheelGeometry({ teeth: TEETH }),
      pallet: palletForkGeometry(),
      gearBig: gearGeometry({ teeth: simple ? 24 : 36, radius: 0.62, innerRadius: 0.14 }),
      gearSmall: gearGeometry({ teeth: simple ? 16 : 24, radius: 0.38, innerRadius: 0.1 }),
      balanceRim: ringGeometry(0.4, 0.48, 0.05, simple ? 32 : 64),
      chapterRing: ringGeometry(1.42, 1.5, 0.02, simple ? 48 : 96),
      barrelRing: ringGeometry(0.6, 0.68, 0.24, simple ? 32 : 64),
      spring: mainspringGeometry(),
      hairspring: hairspringGeometry(),
      jewel: jewelGeometry(0.055),
      arbor: arborGeometry(0.022, 0.5),
    }),
    [simple],
  );

  useFrame((_, delta) => {
    if (sceneState.paused) return;

    // Reduced motion: hold a composed frame, no running mechanism (plan §26 tier 3).
    if (!reduced) elapsed.current += Math.min(delta, 0.05);
    const t = elapsed.current;

    const beatT = t / BEAT_SECONDS;
    const beatIndex = Math.floor(beatT);
    const within = beatT - beatIndex;
    const release = releaseEase(within);

    sceneState.beatPhase = within;
    sceneState.beatCount = beatIndex;

    // Escape wheel: advances exactly one tooth per beat, snapping on release.
    if (escapeWheel.current) {
      const free = -(beatIndex + release) * ANGLE_PER_TOOTH;

      // During the flagship approach the wheel eases onto a spoke gap, so the camera has an
      // opening to cross at the threshold (plan §14.5). Beat motion blends into alignment
      // rather than being cut — the mechanism never visibly stops.
      const fp = scrollProgress.flagship;
      if (fp > 0.4) {
        const quarter = Math.PI / 2;
        const aligned = Math.round(free / quarter) * quarter;
        const blend = smoothstep((fp - 0.4) / 0.35);
        escapeWheel.current.rotation.z = free + (aligned - free) * blend;
      } else {
        escapeWheel.current.rotation.z = free;
      }
    }

    // Pallet fork: rocks from one locking face to the other during the release.
    if (pallet.current) {
      const from = beatIndex % 2 === 0 ? -1 : 1;
      const swing = from + (-from - from) * 0 + (-2 * from) * release;
      pallet.current.rotation.z = swing * 0.13;
    }

    // Balance wheel: one full oscillation every two beats.
    if (balance.current) {
      balance.current.rotation.z = Math.sin(beatT * Math.PI) * 0.85;
    }

    // Going train: continuous, geared down from the escapement.
    if (trainA.current) trainA.current.rotation.z = t * 0.16;
    if (trainB.current) trainB.current.rotation.z = -t * 0.27;
    if (barrel.current) barrel.current.rotation.z = t * 0.05;

    // Jewels glint on the beat.
    if (jewels.current) {
      const glint = 0.3 + Math.max(0, 1 - within * 6) * 0.75;
      jewels.current.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        mat.emissiveIntensity = glint;
      });
    }

    // Threshold: light builds behind the wheel through the approach, peaks at the crossing,
    // then falls away once the visitor is inside the movement.
    {
      const fp = scrollProgress.flagship;
      const build = smoothstep((fp - 0.28) / 0.52); // 0 at 0.28 → 1 at 0.80
      const fall = 1 - smoothstep((fp - 0.86) / 0.14); // fades after the crossing
      const level = build * fall;

      if (thresholdGlow.current) {
        const mat = thresholdGlow.current.material as THREE.MeshBasicMaterial;
        mat.opacity = level * 0.92;
        const grow = 1 + build * 1.9;
        thresholdGlow.current.scale.setScalar(grow);
      }
      if (thresholdLight.current) {
        thresholdLight.current.intensity = level * 14;
      }
    }

    // Idle breathing tilt, plus pointer parallax. Never more than a couple of degrees.
    if (root.current) {
      const px = sceneState.pointerX;
      const py = sceneState.pointerY;
      const targetY = reduced ? 0 : px * 0.06 + Math.sin(t * 0.22) * 0.02;
      const targetX = reduced ? 0 : py * 0.04 + Math.cos(t * 0.17) * 0.015;
      root.current.rotation.y += (targetY - root.current.rotation.y) * 0.05;
      root.current.rotation.x += (targetX - root.current.rotation.x) * 0.05;
    }
  });

  return (
    <group ref={root} scale={0.92}>
      {/* Main plate — the dark ground the polished parts sit against */}
      <mesh geometry={geo.chapterRing} material={materials.brassDark} position={[0, 0, -0.16]} />
      <mesh position={[0, 0, -0.24]} material={materials.plate}>
        <circleGeometry args={[1.46, simple ? 48 : 96]} />
      </mesh>

      {/* Mainspring barrel — the energy source, upper left */}
      <group ref={barrel} position={[-0.82, 0.62, -0.06]} scale={0.82}>
        <mesh geometry={geo.barrelRing} material={materials.brass} />
        <mesh geometry={geo.spring} material={materials.steel} scale={[0.82, 0.82, 0.8]} />
        <mesh geometry={geo.arbor} material={materials.steel} />
      </group>

      {/* Going train — transmits power from the barrel toward the escapement */}
      <mesh
        ref={trainA}
        geometry={geo.gearBig}
        material={materials.brass}
        position={[-0.72, -0.32, -0.08]}
        scale={0.8}
      />
      <mesh
        ref={trainB}
        geometry={geo.gearSmall}
        material={materials.brass}
        position={[-0.16, 0.28, -0.07]}
        scale={0.85}
      />

      {/* The escapement — escape wheel and pallet fork, the heart of the instrument */}
      <group position={ESCAPEMENT_POSITION} scale={0.72}>
        {/* Threshold light: dark until the visitor commits, then it builds behind the wheel so
            the teeth and spokes silhouette against it. Crossing it is the light-field wipe of
            plan §14.5 — no post-processing needed, so it costs the same on every tier. */}
        <mesh ref={thresholdGlow} position={[0, 0, -0.55]}>
          <circleGeometry args={[1.25, simple ? 32 : 64]} />
          <meshBasicMaterial
            color="#ffeccb"
            transparent
            opacity={0}
            depthWrite={false}
            toneMapped={false}
          />
        </mesh>
        <pointLight ref={thresholdLight} position={[0, 0, -0.42]} intensity={0} color="#ffe9c2" distance={6} />
        <group ref={escapeWheel}>
          <mesh geometry={geo.escape} material={materials.steel} />
          {/* Four fine spokes leave four open sectors; the camera crosses one of them. */}
          {[0, Math.PI / 2].map((r) => (
            <mesh key={r} rotation={[0, 0, r]} material={materials.steel} position={[0, 0, 0.004]}>
              <boxGeometry args={[1.86, 0.055, 0.032]} />
            </mesh>
          ))}
          <mesh material={materials.steel} rotation={[Math.PI / 2, 0, 0]}>
            <cylinderGeometry args={[0.12, 0.12, 0.08, 20]} />
          </mesh>
        </group>

        {/* Pallet fork, riding the wheel's rim: it holds, then releases, one tooth */}
        <group ref={pallet} position={[0, 0.99, 0.09]} scale={0.6}>
          <mesh geometry={geo.pallet} material={materials.bluedSteel} />
          <mesh
            geometry={geo.jewel}
            material={jewelMaterial('ruby')}
            position={[-0.44, 0.06, 0.055]}
            scale={0.7}
          />
          <mesh
            geometry={geo.jewel}
            material={jewelMaterial('ruby')}
            position={[0.44, 0.06, 0.055]}
            scale={0.7}
          />
        </group>
      </group>

      {/* Balance wheel and hairspring — lower left, the regulating organ */}
      <group ref={balance} position={[-0.66, -0.74, 0.06]} scale={0.78}>
        <mesh geometry={geo.balanceRim} material={materials.brass} />
        {[0, Math.PI / 2].map((r) => (
          <mesh key={r} rotation={[0, 0, r]} material={materials.brass}>
            <boxGeometry args={[0.94, 0.03, 0.03]} />
          </mesh>
        ))}
        {!simple && (
          <mesh geometry={geo.hairspring} material={materials.bluedSteel} position={[0, 0, 0.08]} />
        )}
        <mesh geometry={geo.arbor} material={materials.steel} />
      </group>

      {/* The three jewels — one per project, set into the plate on the right */}
      <group ref={jewels}>
        <mesh
          geometry={geo.jewel}
          material={jewelMaterial('ruby')}
          position={[1.14, 0.62, 0.02]}
          scale={1.25}
        />
        <mesh
          geometry={geo.jewel}
          material={jewelMaterial('sapphire')}
          position={[1.3, 0.02, 0.02]}
          scale={1.25}
        />
        <mesh
          geometry={geo.jewel}
          material={jewelMaterial('citrine')}
          position={[1.16, -0.58, 0.02]}
          scale={1.25}
        />
      </group>

      {/* Bridges — the cocks that hold the arbors, adding depth in front of the wheels */}
      <mesh material={materials.brassDark} position={[-0.52, 0.12, 0.14]} rotation={[0, 0, 0.72]}>
        <boxGeometry args={[1.25, 0.17, 0.028]} />
      </mesh>
      <mesh material={materials.brassDark} position={[-0.66, -0.74, 0.16]} rotation={[0, 0, -0.3]}>
        <boxGeometry args={[0.86, 0.15, 0.028]} />
      </mesh>
    </group>
  );
}
