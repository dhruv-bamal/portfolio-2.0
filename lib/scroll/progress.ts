/**
 * The single scroll source of truth (plan §24, §26 "runtime discipline").
 *
 * GSAP ScrollTrigger writes into this plain mutable object; R3F reads it inside `useFrame`.
 * Deliberately NOT React state — nothing here may trigger a re-render, because these values
 * change every frame.
 */

export type ProgressChannel =
  | 'page'
  | 'flagship'
  | 'about'
  | 'achievements'
  | 'skills'
  | 'work'
  | 'work0'
  | 'work1'
  | 'work2'
  | 'build'
  | 'contact';

export const scrollProgress: Record<ProgressChannel, number> = {
  page: 0,
  flagship: 0,
  about: 0,
  achievements: 0,
  skills: 0,
  work: 0,
  work0: 0,
  work1: 0,
  work2: 0,
  build: 0,
  contact: 0,
};

/** Which chapter is currently dominant — drives scene state and lighting accent. */
export const sceneState = {
  chapter: 'hero' as
    | 'hero'
    | 'flagship'
    | 'about'
    | 'achievements'
    | 'skills'
    | 'work'
    | 'build'
    | 'contact',
  /** Index of the active project chamber, or -1. */
  activeProject: -1,
  /** Pointer parallax, normalised to [-1, 1]. Desktop only. */
  pointerX: 0,
  pointerY: 0,
  /** Set true while the tab is hidden or the canvas is off-screen — render loop idles. */
  paused: false,
  /** Continuous beat phase in [0,1); one full cycle per beat. */
  beatPhase: 0,
  /** Increments once per completed beat — the "exactly once" counter. */
  beatCount: 0,
};

export function setProgress(channel: ProgressChannel, value: number) {
  scrollProgress[channel] = value;
}

/** Remap a progress value from [inMin,inMax] to [0,1], clamped. */
export function subRange(p: number, inMin: number, inMax: number) {
  if (inMax <= inMin) return 0;
  const t = (p - inMin) / (inMax - inMin);
  return t < 0 ? 0 : t > 1 ? 1 : t;
}

export const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** Frame-rate independent damping toward a target. */
export function damp(current: number, target: number, lambda: number, dt: number) {
  return lerp(current, target, 1 - Math.exp(-lambda * dt));
}

/** Smoothstep easing, used for camera arrivals inside scrubbed timelines. */
export function smoothstep(t: number) {
  const x = clamp01(t);
  return x * x * (3 - 2 * x);
}
