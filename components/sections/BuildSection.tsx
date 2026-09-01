import { Reveal } from '@/components/ui/Reveal';
import { aiMlIntent, capabilities } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * What I Can Build (plan §13.6) — capabilities generalised only from demonstrated work.
 *
 * Each row carries a small assembling mark: loose parts that converge into a complication as
 * the row enters view. It is the section's thesis — parts recombine — stated in motion rather
 * than only in the heading.
 */
export function BuildSection() {
  const chapter = chapters[5];

  return (
    <section
      id="build"
      data-surface="paper"
      className={`chapter surface-paper ${s.spread}`}
      aria-labelledby="build-title"
    >
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className="shell">
        <p className="mono chapter-label">
          <span>{chapter.index}</span>
          <span>What I can build</span>
        </p>

        <Reveal variant="rise">
          <h2 id="build-title" className={`display ${s.spreadTitle}`}>
            Parts recombine.
          </h2>
          <p className={s.lede}>
            Each of these is a mechanism already built once, generalised — not a promise made from
            nothing.
          </p>
        </Reveal>

        <ul className={s.capabilities}>
          {capabilities.map((c, i) => (
            <Reveal as="li" key={c.id} variant="assemble" delay={i * 90} className={s.capability}>
              <div className={s.capabilityHead}>
                <AssemblyMark index={i} />
                <h3 className={s.capabilityStatement}>{c.statement}</h3>
              </div>
              <div>
                <p className={s.capabilityDetail}>{c.detail}</p>
                <p className={`mono ${s.derivedFrom}`}>Built from — {c.derivedFrom.join(' · ')}</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal variant="wipe">
          <aside className={s.intentNote}>
            <p className="mono" style={{ color: 'var(--ink-soft)', marginBottom: 'var(--s-3)' }}>
              Currently exploring
            </p>
            <p className={s.capabilityDetail}>{aiMlIntent.statement}</p>
          </aside>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * A small machined mark whose three arcs and hub settle into alignment when the row appears.
 * Each capability gets a different phase so the column does not pulse in unison.
 */
function AssemblyMark({ index }: { index: number }) {
  const rings = [0, 1, 2];
  return (
    <span className={s.assemblyMark} aria-hidden="true">
      <svg viewBox="0 0 48 48" width="40" height="40">
        {rings.map((r) => (
          <circle
            key={r}
            cx="24"
            cy="24"
            r={20 - r * 6}
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray={`${18 + r * 6} ${120}`}
            strokeLinecap="round"
            style={{
              transformOrigin: '24px 24px',
              animationDelay: `${index * 90 + r * 120}ms`,
            }}
            className={s.assemblyRing}
          />
        ))}
        <circle cx="24" cy="24" r="2.4" fill="currentColor" />
      </svg>
    </span>
  );
}
