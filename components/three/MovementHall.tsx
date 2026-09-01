'use client';

import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { gearGeometry, ringGeometry } from './geometry';
import { materials } from './materials';
import { clamp01, sceneState, scrollProgress, smoothstep } from '@/lib/scroll/progress';

/**
 * The Movement Hall (plan §10) — the interior the visitor arrives in after crossing the
 * escape wheel. The scale inversion is the whole point: the same mechanism that read as a
 * hand-sized instrument now reads as architecture receding into depth.
 *
 * Built from the same ring and gear profiles as the Instrument, so the interior is
 * unmistakably the inside of the object we just travelled through.
 */

const LAYERS = [
  { z: -3.2, scale: 2.6, speed: 0.055, tilt: 0.12 },
  { z: -6.4, scale: 4.4, speed: -0.038, tilt: -0.08 },
  { z: -10.2, scale: 6.8, speed: 0.026, tilt: 0.05 },
  { z: -15.0, scale: 9.6, speed: -0.017, tilt: -0.03 },
  { z: -20.5, scale: 12.5, speed: 0.011, tilt: 0.02 },
  { z: -27.0, scale: 16.0, speed: -0.008, tilt: -0.015 },
];

const ACCENTS = ['#c4384f', '#3d6fbf', '#c98b2d'] as const;

export function MovementHall({ simple }: { simple: boolean }) {
  const root = useRef<THREE.Group>(null);
  const layers = useRef<(THREE.Group | null)[]>([]);
  const accentColor = useRef(new THREE.Color('#c9a96a'));
  const scratch = useRef(new THREE.Color());

  const geo = useMemo(
    () => ({
      ring: ringGeometry(0.86, 1, 0.04, simple ? 32 : 64),
      innerRing: ringGeometry(0.52, 0.58, 0.03, simple ? 24 : 48),
      gear: gearGeometry({ teeth: simple ? 20 : 30, radius: 0.5, innerRadius: 0.3, thickness: 0.03 }),
    }),
    [simple],
  );

  useFrame((state, delta) => {
    if (sceneState.paused || !root.current) return;

    // The hall only exists once the visitor has committed to the crossing. Before that it is
    // fully transparent, so the hero composition stays clean.
    const reveal = smoothstep(clamp01((scrollProgress.flagship - 0.55) / 0.3));
    root.current.visible = reveal > 0.01;
    if (!root.current.visible) return;

    const t = state.clock.elapsedTime;

    // Skills draws the movement apart along its axis (plan §9, §13.4): the rings separate,
    // then close again as the chapter passes.
    const explode = Math.sin(clamp01(scrollProgress.skills) * Math.PI) * 1.6;

    // Each complication tints the hall with its jewel while it is on stage (plan §13.5).
    const active = sceneState.activeProject;
    const accentTarget = active >= 0 ? ACCENTS[active] : '#c9a96a';
    accentColor.current.lerp(scratch.current.set(accentTarget), 0.05);

    // The strike: on the final chapter the hall flares once, then holds (plan §13.7).
    const strike = smoothstep(clamp01((scrollProgress.contact - 0.25) / 0.35));

    layers.current.forEach((layer, i) => {
      if (!layer) return;
      const cfg = LAYERS[i];
      layer.rotation.z = t * cfg.speed;
      layer.position.z = cfg.z - explode * (i + 1) * 0.55;

      layer.children.forEach((child) => {
        const mesh = child as THREE.Mesh;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (!mat || !('opacity' in mat)) return;
        // Nearer rings brighten first, so depth resolves front-to-back on arrival.
        const depthBias = 1 - i * 0.12;
        mat.opacity = reveal * depthBias * (0.75 + strike * 0.25);
        if (mat.emissive) {
          mat.emissive.copy(accentColor.current);
          mat.emissiveIntensity = 0.06 + strike * 0.3;
        }
      });
    });
  });

  return (
    <group ref={root} visible={false}>
      {LAYERS.map((cfg, i) => (
        <group
          key={cfg.z}
          ref={(el) => {
            layers.current[i] = el;
          }}
          position={[0, 0, cfg.z]}
          rotation={[cfg.tilt, cfg.tilt * 0.5, 0]}
          scale={cfg.scale}
        >
          <mesh geometry={geo.ring} material={hallMaterial(materials.brass)} />
          <mesh geometry={geo.innerRing} material={hallMaterial(materials.brassDark)} />
          {!simple && i < 3 && (
            <mesh
              geometry={geo.gear}
              material={hallMaterial(materials.steel)}
              position={[1.35, -0.5, -0.3]}
              scale={0.8}
            />
          )}
        </group>
      ))}
    </group>
  );
}

/**
 * The hall reuses the instrument's materials but needs its own transparent clones so fading
 * the interior in does not fade the instrument itself. Cloned once per material, cached.
 */
const clones = new WeakMap<THREE.Material, THREE.Material>();
const cloneList: THREE.Material[] = [];

/** Released alongside the shared caches (plan §25). */
export function disposeHallMaterials() {
  cloneList.forEach((m) => m.dispose());
  cloneList.length = 0;
}

function hallMaterial(base: THREE.MeshStandardMaterial) {
  const hit = clones.get(base);
  if (hit) return hit;
  const clone = base.clone();
  clone.transparent = true;
  clone.opacity = 0;
  clone.depthWrite = false;
  clone.emissive = new THREE.Color('#c9a96a');
  clone.emissiveIntensity = 0.06;
  clones.set(base, clone);
  cloneList.push(clone);
  return clone;
}
