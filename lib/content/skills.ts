import type { SkillCluster } from './types';

/**
 * The nine skill clusters, verbatim from the resume.
 * `partGroup` maps each cluster to a group of Instrument parts that illuminate when active.
 */
export const skillClusters: SkillCluster[] = [
  {
    id: 'backend-apis',
    index: '01',
    name: 'Backend APIs',
    items: ['Node.js', 'NestJS', 'Express.js', 'REST API design', 'JWT & OAuth'],
    partGroup: 'going-train',
    source: 'resume',
  },
  {
    id: 'databases',
    index: '02',
    name: 'Databases',
    items: ['PostgreSQL', 'SQL', 'Prisma ORM', 'Transaction safety', 'Row-level locking'],
    partGroup: 'mainplate',
    source: 'resume',
  },
  {
    id: 'reliability',
    index: '03',
    name: 'Reliability',
    items: ['ACID transactions', 'Idempotency', 'Retry strategies', 'State machines'],
    partGroup: 'escapement',
    source: 'resume',
  },
  {
    id: 'background-jobs',
    index: '04',
    name: 'Background Jobs',
    items: ['Redis', 'BullMQ', 'Asynchronous queues'],
    partGroup: 'barrel',
    source: 'resume',
  },
  {
    id: 'system-design',
    index: '05',
    name: 'System Design',
    items: ['Scalability', 'Fault tolerance', 'Event-driven architecture'],
    partGroup: 'bridges',
    source: 'resume',
  },
  {
    id: 'devops',
    index: '06',
    name: 'DevOps',
    items: ['Docker', 'Docker Compose', 'CI/CD (GitHub Actions)'],
    partGroup: 'case',
    source: 'resume',
  },
  {
    id: 'full-stack',
    index: '07',
    name: 'Full Stack',
    items: ['React 18', 'Next.js', 'TypeScript'],
    partGroup: 'dial',
    source: 'resume',
  },
  {
    id: 'languages',
    index: '08',
    name: 'Languages',
    items: ['TypeScript', 'JavaScript', 'C++', 'Java', 'SQL', 'DSA'],
    partGroup: 'jewels',
    source: 'resume',
  },
  {
    id: 'tools',
    index: '09',
    name: 'Tools',
    items: ['Git', 'GitHub', 'Jest', 'Supertest'],
    partGroup: 'regulator',
    source: 'resume',
  },
];
