export * from './types';
export * from './identity';
export * from './skills';
export * from './achievements';
export * from './projects';
export * from './capabilities';

/** Human-readable labels for each factual source, used by the content audit. */
export const SOURCE_LABELS: Record<string, string> = {
  resume: 'resume-dhruv-backend-engineer (1).pdf',
  'procureflow-readme': 'ProcureFlow-README.pdf',
  'slotsure-readme': 'SlotSure-README.pdf',
  'dealersync-readme': 'DealerSync-README.pdf',
  certificate: 'hackathon certificate image',
  'owner-session-answer': 'owner directive (session 2026-09-01)',
};
