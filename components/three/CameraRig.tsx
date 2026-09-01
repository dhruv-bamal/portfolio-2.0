'use client';

import { useFrame, useThree } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

import { ESCAPEMENT_POSITION, GAP_AZIMUTH, GAP_RADIUS } from './Instrument';
import { scrollProgress, sceneState, smoothstep } from '@/lib/scroll/progress';

interface Keyframe {
  at: number;
  pos: [number, number, number];
  look: [number, number, number];
  fov: number;
}

/**
 * The flagship camera path — "Through the Escape Wheel" (plan §14).
 *
 * Scroll progress is the only clock: scrubbing back replays the flight exactly in reverse
 * (plan §14.7). Keyframes are sampled and interpolated with a smoothstep so the camera reads
 * as damped and directed rather than linear.
 */
function buildKeyframes(portrait: boolean): Keyframe[] {
  const [wx, wy, wz] = ESCAPEMENT_POSITION;
  // The point inside an open sector that the camera threads through.
  const gx = wx + Math.cos(GAP_AZIMUTH) * GAP_RADIUS;
  const gy = wy + Math.sin(GAP_AZIMUTH) * GAP_RADIUS;

  // Landscape pushes the instrument right of the headline. Portrait cannot do that — there is
  // no horizontal room — so it lifts the instrument into the upper field instead and the hero
  // copy takes the lower half. Text is never asked to sit on top of the mechanism.
  const heroLook: [number, number, number] = portrait ? [0.1, -1.35, 0] : [-0.95, 0.05, 0];
  const heroPos: [number, number, number] = portrait ? [0.15, -0.35, 6.4] : [0, 0, 4.9];

  // The wheel reads as architecture only while it still fits the frame; past that the rim
  // leaves the view and there is nothing to see. The approach therefore dwells in the
  // 2.4 → 1.1 band, and only the last fifth of the scroll actually crosses the plane.
  return [
    { at: 0, pos: heroPos, look: heroLook, fov: 42 },
    // Stage 1 — the camera commits and swings onto the wheel's axis.
    { at: 0.3, pos: [wx * 0.5, wy * 0.5 + 0.06, 3.1], look: [wx, wy, wz], fov: 41 },
    // Stage 2 — the wheel grows to fill the frame; teeth sweep the edges.
    { at: 0.62, pos: [gx * 0.85, gy * 0.85, 1.55], look: [gx * 0.4, gy * 0.4, wz], fov: 39 },
    // Stage 3 — inside the rim, threading an open sector between two spokes.
    { at: 0.8, pos: [gx, gy, 0.42], look: [gx, gy, wz - 0.6], fov: 42 },
    // Threshold — one beat, one tooth, and the camera is through.
    { at: 0.89, pos: [gx, gy, -0.12], look: [gx * 0.7, gy * 0.7, -1.6], fov: 47 },
    // Stage 4 — the movement hall opens out behind the plate.
    { at: 1, pos: [gx * 0.5, gy * 0.35, -2.4], look: [0, -0.1, -6], fov: 50 },
  ];
}

function sample(frames: Keyframe[], p: number) {
  let a = frames[0];
  let b = frames[frames.length - 1];
  for (let i = 0; i < frames.length - 1; i++) {
    if (p >= frames[i].at && p <= frames[i + 1].at) {
      a = frames[i];
      b = frames[i + 1];
      break;
    }
  }
  const span = b.at - a.at;
  const t = span <= 0 ? 0 : smoothstep((p - a.at) / span);
  return { a, b, t };
}

/**
 * After the crossing the camera travels the movement hall as one continuous move, driven by
 * a single journey value rather than per-section jumps (plan §10 camera language).
 */
function hallKeyframes(): Keyframe[] {
  return [
    // Arrival, just inside.
    { at: 0, pos: [0.28, 0.03, -2.4], look: [0, -0.1, -6], fov: 50 },
    // Drifting past the mainspring depths — About.
    { at: 0.2, pos: [-0.9, 0.35, -4.2], look: [0.4, -0.2, -9], fov: 48 },
    // Rising for the struck medallions — Achievements.
    { at: 0.38, pos: [0.7, 0.9, -5.6], look: [-0.2, 0, -10], fov: 46 },
    // Pulling wide for the exploded view — Skills.
    { at: 0.55, pos: [-1.2, -0.5, -7.2], look: [0.3, 0.2, -12], fov: 52 },
    // Down among the complications — Work.
    { at: 0.75, pos: [0.9, -0.7, -9], look: [-0.3, 0.1, -14], fov: 47 },
    // Parts recombining — What I Can Build.
    { at: 0.9, pos: [-0.5, 0.4, -11], look: [0.2, -0.1, -16], fov: 45 },
    // Settling onto the back plate — Contact.
    { at: 1, pos: [0, 0, -13], look: [0, 0, -18], fov: 42 },
  ];
}

export function CameraRig() {
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const portrait = size.height > size.width;

  const frames = useMemo(() => buildKeyframes(portrait), [portrait]);
  const hall = useMemo(() => hallKeyframes(), []);
  const pos = useRef(new THREE.Vector3());
  const look = useRef(new THREE.Vector3());
  const target = useRef(new THREE.Vector3());
  const tmp = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (sceneState.paused) return;

    const p = scrollProgress.flagship;

    // Past the threshold the hall path takes over, blended in over the last stretch of the
    // flagship so there is no visible hand-off.
    if (p >= 0.995) {
      const j = scrollProgress.page;
      const { a, b, t } = sample(hall, j);
      pos.current.set(...a.pos).lerp(tmp.current.set(...b.pos), t);
      look.current.set(...a.look).lerp(tmp.current.set(...b.look), t);

      const k = 1 - Math.exp(-6 * Math.min(delta, 0.05));
      camera.position.lerp(pos.current, k);
      target.current.lerp(look.current, k);
      camera.lookAt(target.current);

      const fov = a.fov + (b.fov - a.fov) * t;
      if (Math.abs(camera.fov - fov) > 0.01) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      return;
    }

    const { a, b, t } = sample(frames, p);

    pos.current.set(...a.pos).lerp(tmp.current.set(...b.pos), t);
    look.current.set(...a.look).lerp(tmp.current.set(...b.look), t);

    // Pointer parallax, strongest in the hero and tapering to nothing at the threshold.
    const parallax = (1 - smoothstep(p / 0.5)) * 0.16;
    pos.current.x += sceneState.pointerX * parallax;
    pos.current.y += -sceneState.pointerY * parallax * 0.6;

    // Softer than the hall path: through the wheel the camera should glide, not track the
    // scroll input tightly. Lenis smooths the input; this smooths the response.
    const k = 1 - Math.exp(-5.5 * Math.min(delta, 0.05));
    camera.position.lerp(pos.current, k);
    target.current.lerp(look.current, k);
    camera.lookAt(target.current);

    const fov = a.fov + (b.fov - a.fov) * t;
    if (Math.abs(camera.fov - fov) > 0.01) {
      camera.fov = fov;
      camera.updateProjectionMatrix();
    }
  });

  return null;
}
