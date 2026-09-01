/**
 * Content integrity gate.
 *
 * Enforces PORTFOLIO_PLAN.md §4 (unsupported-claim exclusions), §23 (content-lint rule) and
 * §30 acceptance criteria 1–3. If any of these fail, the copy has drifted from its sources.
 */

import {
  achievements,
  aiMlIntent,
  capabilities,
  education,
  experience,
  identity,
  projects,
  skillClusters,
  sourceNote,
} from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

/** Collect every user-facing string in the content layer, tagged with where it came from. */
function collectStrings(value: unknown, path: string, out: { path: string; text: string }[] = []) {
  if (typeof value === 'string') {
    out.push({ path, text: value });
  } else if (Array.isArray(value)) {
    value.forEach((v, i) => collectStrings(v, `${path}[${i}]`, out));
  } else if (value && typeof value === 'object') {
    for (const [k, v] of Object.entries(value)) {
      collectStrings(v, `${path}.${k}`, out);
    }
  }
  return out;
}

const allContent = {
  identity,
  education,
  experience,
  aiMlIntent,
  skillClusters,
  achievements,
  projects,
  capabilities,
  chapters,
  sourceNote,
};

const strings = collectStrings(allContent, 'content');

/**
 * Paths allowed to contain external links. Achievements only, and only the owner-supplied
 * URLs: Helios Protocol's demo/repo and the LeetCode profile. Projects stay link-free.
 */
const EXTERNAL_LINK_ALLOWLIST = /^content\.achievements\[\d+\]\.links/;

describe('factual sourcing', () => {
  const sourced: [string, { source?: unknown }][] = [
    ['identity', identity],
    ['education', education],
    ['aiMlIntent', aiMlIntent],
    ['sourceNote', sourceNote],
    ...experience.map((e, i) => [`experience[${i}]`, e] as [string, { source?: unknown }]),
    ...skillClusters.map((s, i) => [`skillClusters[${i}]`, s] as [string, { source?: unknown }]),
    ...achievements.map((a, i) => [`achievements[${i}]`, a] as [string, { source?: unknown }]),
    ...projects.map((p, i) => [`projects[${i}]`, p] as [string, { source?: unknown }]),
    ...capabilities.map((c, i) => [`capabilities[${i}]`, c] as [string, { source?: unknown }]),
  ];

  it.each(sourced)('%s carries a non-empty source', (_name, record) => {
    expect(record.source).toBeDefined();
    const s = record.source;
    if (Array.isArray(s)) {
      expect(s.length).toBeGreaterThan(0);
    } else {
      expect(typeof s).toBe('string');
      expect(String(s).length).toBeGreaterThan(0);
    }
  });
});

describe('unsupported-claim denylist (plan §4)', () => {
  /** Claim patterns, not bare words — see readiness review A5.3. */
  const patterns: { name: string; re: RegExp }[] = [
    { name: 'deployment claim', re: /\bdeployed\b/i },
    { name: 'in-production claim', re: /\bin production\b/i },
    { name: 'production-tested claim', re: /\bproduction[- ]tested\b/i },
    { name: 'live-system claim', re: /\b(is|are|now)\s+live\b/i },
    { name: 'numeric user count', re: /\b\d[\d,]*\+?\s*(active\s+|monthly\s+|daily\s+)?users\b/i },
    { name: 'possessive user claim', re: /\b(our|its|my|the app'?s)\s+users\b/i },
    { name: 'client claim', re: /\b(our|my)\s+clients?\b/i },
    { name: 'revenue claim', re: /\b(revenue|arr|mrr)\b/i },
    { name: 'uptime claim', re: /\b\d+(\.\d+)?\s*%\s*uptime\b/i },
    { name: 'traffic-scale claim', re: /\b(requests|rps|qps)\s+per\s+(second|day)\b/i },
    { name: 'AI/ML expertise claim', re: /\b(ai|ml|machine[- ]learning)\s+(expert|expertise|specialist|engineer)\b/i },
    { name: 'AI/ML experience claim', re: /\b(experienced|proficient|skilled)\s+in\s+(ai|ml|machine learning)\b/i },
    { name: 'retired portfolio URL', re: /dhruv-bamal-portfolio\.vercel\.app/i },
    { name: 'testimonial framing', re: /\b(testimonial|clients?\s+say)\b/i },
    { name: 'freelance claim', re: /\bfreelance\b/i },
    { name: 'team-leadership claim', re: /\b(i\s+)?(led|leading|managed)\s+(a|the|my)\s+team\b/i },
  ];

  for (const { name, re } of patterns) {
    it(`contains no ${name}`, () => {
      const hits = strings.filter((s) => re.test(s.text));
      expect(hits.map((h) => `${h.path}: ${h.text}`)).toEqual([]);
    });
  }
});

describe('banned generic portfolio phrases', () => {
  const banned = [
    'passionate',
    'crafting digital experiences',
    'pixel perfect',
    'think outside the box',
    'guru',
    'ninja',
    'rockstar',
    'wearing many hats',
    'i love to code',
    'bringing ideas to life',
  ];

  it.each(banned)('does not use "%s"', (phrase) => {
    const re = new RegExp(phrase.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    const hits = strings.filter((s) => re.test(s.text));
    expect(hits.map((h) => h.path)).toEqual([]);
  });
});

describe('project set (plan §30.3)', () => {
  it('contains exactly the three current-session projects', () => {
    expect(projects.map((p) => p.slug)).toEqual(['procureflow', 'slotsure', 'dealersync']);
  });

  it('mentions no legacy project names', () => {
    const legacy = /\b(closeloop|arthos|clickscope|helios protocol)\b/i;
    const offenders = strings.filter(
      (s) => legacy.test(s.text) && !s.path.startsWith('content.achievements'),
    );
    expect(offenders.map((o) => o.path)).toEqual([]);
  });

  it('gives no project a public repository or demo link', () => {
    const projectStrings = collectStrings(projects, 'projects');
    const urls = projectStrings.filter((s) => /https?:\/\//i.test(s.text));
    expect(urls.map((u) => `${u.path}: ${u.text}`)).toEqual([]);
  });

  it('routes the source note to the GitHub profile with a private-repo note', () => {
    expect(sourceNote.href).toBe('https://github.com/dhruv-bamal');
    expect(sourceNote.note.toLowerCase()).toContain('private');
    // T3 reserved slot stays empty until the owner publishes the repositories.
    expect(sourceNote.reservedPublicUrl).toBeNull();
  });

  it('keeps every project’s scope boundaries and proofs present', () => {
    for (const p of projects) {
      expect(p.scopeBoundaries.length).toBeGreaterThan(40);
      expect(p.proofs.length).toBeGreaterThan(0);
      expect(p.instrumentation.note.toLowerCase()).toContain('not measured results');
    }
  });
});

describe('external links', () => {
  it('permits external project links only for Helios Protocol in Achievements', () => {
    const urlStrings = strings.filter((s) => /^https?:\/\//i.test(s.text));
    for (const s of urlStrings) {
      const allowed =
        EXTERNAL_LINK_ALLOWLIST.test(s.path) ||
        s.path.startsWith('content.identity.links') ||
        s.path === 'content.sourceNote.href';
      expect(allowed ? 'allowed' : `${s.path}: ${s.text}`).toBe('allowed');
    }
  });
});

describe('AI/ML positioning (plan §3.7)', () => {
  it('states learning intent only', () => {
    expect(aiMlIntent.statement).toMatch(/learn|beginning|aim/i);
    expect(aiMlIntent.statement).not.toMatch(/\b(built|shipped|deployed|experienced|certified)\b/i);
  });
});

describe('experience framing (plan §3.4)', () => {
  it('marks the Forage programme explicitly as a simulation', () => {
    expect(experience[0].kind).toBe('simulation');
    expect(experience[0].title.toLowerCase()).toContain('simulation');
  });
});
