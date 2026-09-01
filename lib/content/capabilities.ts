import type { Capability, Chapter } from './types';

/**
 * "What I Can Build" — generalised strictly from demonstrated work in the three READMEs and
 * the resume skill clusters. No new claims; every statement points back at what it derives from.
 */
export const capabilities: Capability[] = [
  {
    id: 'transaction-safe-apis',
    statement: 'Transaction-safe REST APIs',
    detail:
      'Endpoints whose correctness holds under concurrency — row-level locking, ACID transactions, and state-transition validation rather than optimistic hope.',
    derivedFrom: ['SlotSure booking algorithm', 'Databases cluster', 'Reliability cluster'],
    source: ['slotsure-readme', 'resume'],
  },
  {
    id: 'multi-tenant-rbac',
    statement: 'Multi-tenant systems with RBAC and audit trails',
    detail:
      'Organisation, branch, and department isolation enforced server-side, with role- and amount-based authorization and an immutable record of every decision.',
    derivedFrom: ['ProcureFlow tenancy and approvals', 'Backend APIs cluster'],
    source: ['procureflow-readme', 'resume'],
  },
  {
    id: 'idempotent-pipelines',
    statement: 'Asynchronous pipelines with exactly-once guarantees',
    detail:
      'Queue-backed workers that can be retried safely — idempotency keys, deterministic constraints, and jobs whose second run changes nothing.',
    derivedFrom: ['DealerSync import worker', 'SlotSure expiry worker', 'Background Jobs cluster'],
    source: ['dealersync-readme', 'slotsure-readme', 'resume'],
  },
  {
    id: 'exception-handling',
    statement: 'Import and exception-management workflows',
    detail:
      'Bounded-batch ingestion with partial success, row-level error reporting, actionable failure reasons, and progress that survives a restart.',
    derivedFrom: ['DealerSync import lifecycle'],
    source: 'dealersync-readme',
  },
  {
    id: 'containerised-ci',
    statement: 'Dockerised, CI-tested services',
    detail:
      'Docker Compose environments running API, worker, PostgreSQL and Redis together, with GitHub Actions running lint, unit, integration, and build steps.',
    derivedFrom: ['All three project stacks', 'DevOps cluster'],
    source: ['procureflow-readme', 'slotsure-readme', 'dealersync-readme', 'resume'],
  },
];

export const chapters: Chapter[] = [
  {
    id: 'hero',
    anchor: '#hero',
    index: '00',
    title: 'The Instrument',
    sceneDescription:
      'A precision instrument hangs in a dark exhibit space. Its escape wheel beats once every two seconds.',
  },
  {
    id: 'about',
    anchor: '#about',
    index: '01',
    title: 'Wound by hand',
    sceneDescription:
      'Inside the movement. The mainspring barrel — the source of the instrument’s energy — dominates the view and uncoils slowly.',
  },
  {
    id: 'achievements',
    anchor: '#achievements',
    index: '02',
    title: 'Struck records',
    sceneDescription:
      'Three struck medallions rest on plinths, with the hammers that struck them at rest behind.',
  },
  {
    id: 'skills',
    anchor: '#skills',
    index: '03',
    title: 'Exploded view',
    sceneDescription:
      'The instrument is drawn apart along a diagonal axis, its parts grouped into nine labelled clusters.',
  },
  {
    id: 'work',
    anchor: '#work',
    index: '04',
    title: 'Three complications',
    sceneDescription:
      'Three jewelled complications run in sequence, each demonstrating one system’s real mechanism.',
  },
  {
    id: 'build',
    anchor: '#build',
    index: '05',
    title: 'What I can build',
    sceneDescription:
      'Loose parts drift and assemble into new, unnamed complications — capabilities rather than finished systems.',
  },
  {
    id: 'contact',
    anchor: '#contact',
    index: '06',
    title: 'The strike',
    sceneDescription:
      'The instrument reassembles and strikes. The case closes and its engraved back plate faces the viewer.',
  },
];
