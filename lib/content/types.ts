/**
 * Typed content layer for Portfolio 2.0.
 *
 * Every fact-bearing record carries a `source` naming the current-session file it came from.
 * `tests/content.test.ts` fails the build if a source is missing or if denylisted claim
 * patterns appear in rendered copy.
 */

export type Source =
  | 'resume'
  | 'procureflow-readme'
  | 'slotsure-readme'
  | 'dealersync-readme'
  | 'certificate'
  | 'owner-session-answer';

export interface Sourced {
  source: Source | Source[];
}

export type JewelAccent = 'ruby' | 'sapphire' | 'citrine';

export interface Identity extends Sourced {
  name: string;
  roleHeadline: string;
  location: string;
  locationShort: string;
  email: string;
  phone: string;
  links: {
    linkedin: string;
    github: string;
  };
  /** Near-verbatim resume professional summary, split into readable clauses. */
  summary: string[];
  /** One-line positioning used in the hero. */
  positioning: string;
}

export interface Education extends Sourced {
  degree: string;
  field: string;
  institution: string;
  years: string;
  cgpa: string;
}

export interface Experience extends Sourced {
  title: string;
  program: string;
  /** Explicit: this is a simulation, never presented as employment. */
  kind: 'simulation';
  description: string;
}

export interface SkillCluster extends Sourced {
  id: string;
  index: string;
  name: string;
  items: string[];
  /** Which group of Instrument parts this cluster illuminates in the 3D scene. */
  partGroup: string;
}

export interface AchievementLink {
  label: string;
  href: string;
  external: true;
}

export interface Achievement extends Sourced {
  id: string;
  title: string;
  summary: string;
  /** Engraved reverse-side detail, revealed on hover/focus/tap. */
  detail: string[];
  meta: { label: string; value: string }[];
  links?: AchievementLink[];
  certificate?: {
    src: string;
    alt: string;
    caption: string;
  };
  featured?: boolean;
}

export interface WorkflowStep {
  actor: string;
  action: string;
}

export interface MechanismState {
  from: string;
  to: string[];
  note?: string;
}

export interface Project extends Sourced {
  slug: string;
  name: string;
  index: string;
  accent: JewelAccent;
  oneLiner: string;
  /** The mechanism archetype this project runs as inside the Instrument. */
  mechanism: 'approval-train' | 'reservation-escapement' | 'sorting-barrel';
  mechanismName: string;
  /** Short narrative shown in the cinematic chamber. */
  chamberCopy: string;
  problem: string;
  solution: string;
  /** README heading is "Target users"; rendered as "Built for" (see readiness review A5.2). */
  builtFor: string[];
  workflow: WorkflowStep[];
  /** The signature algorithm or pipeline, step by step. */
  mechanismSteps: { step: string; note?: string }[];
  /** State machine, where the project defines one. */
  states?: MechanismState[];
  decisions: string[];
  /** Testing scenarios from the README, presented as proofs. */
  proofs: string[];
  /** Metric names are designed instrumentation, never achieved results. */
  instrumentation: {
    note: string;
    names: string[];
  };
  scopeBoundaries: string;
  futureImprovements: string[];
  stack: { layer: string; tech: string }[];
  /** Phase labels for the three-still reduced-motion sequence. */
  phases: { id: string; label: string; caption: string }[];
}

export interface Capability extends Sourced {
  id: string;
  statement: string;
  detail: string;
  derivedFrom: string[];
}

export interface Chapter {
  id: string;
  anchor: string;
  index: string;
  title: string;
  /** Visually-hidden description of the 3D scene state for screen readers. */
  sceneDescription: string;
}
