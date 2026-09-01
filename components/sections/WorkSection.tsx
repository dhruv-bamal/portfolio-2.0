import Link from 'next/link';

import { HorizontalRail } from '@/components/sections/HorizontalRail';
import { projects } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * Projects & Work (plan §13.5, §15) — a chamber walk.
 *
 * The three chambers travel horizontally while the section is pinned, so the walk reads as
 * moving along a row of exhibits rather than scrolling past three stacked blocks. The rail
 * falls back to a vertical stack on touch, narrow viewports and reduced motion.
 */
export function WorkSection() {
  const chapter = chapters[4];

  return (
    <section id="work" className="see-through" aria-labelledby="work-title">
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className={`chapter ${s.workIntro}`}>
        <div className="shell">
          <p className="mono chapter-label">
            <span>{chapter.index}</span>
            <span>Projects &amp; Work</span>
          </p>

          <h2 id="work-title" className={`display ${s.spreadTitle}`}>
            Three complications.
          </h2>
          <p className={s.chamberCopy} style={{ marginTop: 0 }}>
            Three production-grade backend systems, each built around one hard guarantee. Every
            repository is private; the engineering is documented in full.
          </p>
        </div>
      </div>

      <HorizontalRail count={projects.length} labels={projects.map((p) => p.name)}>
        {projects.map((p, i) => (
          <article
            key={p.slug}
            id={`chamber-${p.slug}`}
            className={s.panel}
            style={{ ['--accent' as string]: `var(--${p.accent})` }}
            aria-labelledby={`chamber-${p.slug}-title`}
            data-chamber={i}
          >
            <div className={`shell ${s.panelGrid}`}>
              <div>
                <p className={`display ${s.chamberIndex}`}>{p.index}</p>
                <h3 id={`chamber-${p.slug}-title`} className={`display ${s.chamberName}`}>
                  {p.name}
                </h3>
                <p className={`mono ${s.chamberMechanism}`}>{p.mechanismName}</p>
                <p className={s.chamberCopy}>{p.chamberCopy}</p>
                <p className={s.chamberCopy}>{p.oneLiner}</p>

                <ul className={s.chamberStack} aria-label={`${p.name} core stack`}>
                  {['NestJS', 'TypeScript', 'PostgreSQL', 'Redis', 'BullMQ'].map((t) => (
                    <li className={s.chip} key={t}>
                      {t}
                    </li>
                  ))}
                </ul>

                <div className={s.chamberActions}>
                  <Link className="btn" href={`/work/${p.slug}`} data-cursor="Open case study">
                    Open case study
                  </Link>
                </div>
              </div>

              <div>
                <ul className={s.phases}>
                  {p.phases.map((ph, idx) => (
                    <li key={ph.id} className={s.phase} data-active={idx === 0} data-phase={idx}>
                      <p className={`mono ${s.phaseLabel}`}>{ph.label}</p>
                      <p className={s.phaseCaption}>{ph.caption}</p>
                    </li>
                  ))}
                </ul>

                <p className={`mono-plain ${s.phaseCaption}`} style={{ marginTop: 'var(--s-6)' }}>
                  Scope — {p.scopeBoundaries}
                </p>
              </div>
            </div>
          </article>
        ))}
      </HorizontalRail>
    </section>
  );
}
