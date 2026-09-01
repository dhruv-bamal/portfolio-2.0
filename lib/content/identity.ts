import type { Education, Experience, Identity } from './types';

/**
 * TODO: Owner input required (T1) — the new custom domain has not been purchased yet.
 * The previous portfolio URL is retired by owner directive and must never appear on this site.
 * Swap this one constant once the domain is registered.
 */
export const SITE = {
  domainPlaceholder: 'TODO: new custom domain',
  /** Used only for metadataBase; replaced when T1 resolves. */
  originPlaceholder: 'https://example.invalid',
  title: 'Dhruv Bamal — Backend Engineer',
  description:
    'Backend engineer building transaction-safe APIs, multi-tenant systems with audit trails, and asynchronous pipelines with exactly-once guarantees.',
} as const;

export const identity: Identity = {
  name: 'Dhruv Bamal',
  roleHeadline: 'Backend Engineer',
  location: 'Ghaziabad, U.P., India',
  locationShort: 'Ghaziabad, IN',
  email: 'bamaldhruv1105@gmail.com',
  phone: '+91 9810505413',
  links: {
    linkedin: 'https://linkedin.com/in/dhruv-bamal',
    github: 'https://github.com/dhruv-bamal',
  },
  summary: [
    'Backend Engineer with systems design foundation and 200+ DSA problems solved in C++.',
    'Built production-grade APIs, databases, and distributed systems using Node.js, TypeScript, PostgreSQL, and Redis.',
    'Proficient in transaction safety, concurrent request handling, background job processing, and Docker deployment.',
  ],
  positioning:
    'Transaction safety, concurrent request handling, and background job processing — in Node.js, TypeScript, PostgreSQL and Redis.',
  source: 'resume',
};

export const education: Education = {
  degree: 'B.Tech',
  field: 'Computer Science and Engineering',
  institution: 'SRM Institute of Science and Technology, Ghaziabad',
  years: '2023 – 2027',
  cgpa: '7.35 / 10',
  source: 'resume',
};

export const experience: Experience[] = [
  {
    title: 'Y Combinator Startup Simulation',
    program: 'Forage Virtual Internship',
    kind: 'simulation',
    description:
      "Completed Y Combinator's working-startup simulation, learning early-stage dynamics, product-market fit, and entrepreneurial problem-solving.",
    source: 'resume',
  },
];

/** Forward-looking learning intent only — never expertise, experience, or credentials. */
export const aiMlIntent = {
  statement:
    'Currently strengthening backend fundamentals, and beginning to learn AI implementation and machine-learning models with the aim of moving toward AI/ML work in future.',
  source: 'owner-session-answer' as const,
};
