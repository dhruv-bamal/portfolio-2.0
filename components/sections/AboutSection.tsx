import { aiMlIntent, education, experience, identity } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * About (plan §13.2) — the first paper-white workbench spread.
 * All sustained reading happens on paper, guaranteeing contrast (plan §27).
 */
export function AboutSection() {
  const chapter = chapters[1];

  return (
    <section
      id="about"
      data-surface="paper"
      className={`chapter surface-paper ${s.spread}`}
      aria-labelledby="about-title"
    >
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className="shell">
        <p className={`mono chapter-label`}>
          <span>{chapter.index}</span>
          <span>About</span>
        </p>

        <div className={s.spreadGrid}>
          <div>
            <h2 id="about-title" className={`display ${s.spreadTitle}`}>
              Wound by hand.
            </h2>

            <p className={s.lede}>
              A backend engineer whose interest sits where correctness is hardest: the moment two
              requests arrive at once and only one may win.
            </p>

            <div className={`${s.body}`} style={{ marginTop: 'var(--s-6)' }}>
              {identity.summary.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <p>
                Currently in the final years of a B.Tech in Computer Science and Engineering at{' '}
                {education.institution}.
              </p>
              <p>{aiMlIntent.statement}</p>
            </div>
          </div>

          <aside aria-label="Record">
            <ul className={s.marginNotes}>
              <li className={s.marginNote}>
                <span className={`mono ${s.marginNoteLabel}`}>Education</span>
                <span className={s.marginNoteValue}>
                  {education.degree}, {education.field}
                </span>
                <span className="mono-plain" style={{ color: 'var(--ink-soft)' }}>
                  {education.institution}
                </span>
              </li>
              <li className={s.marginNote}>
                <span className={`mono ${s.marginNoteLabel}`}>Years</span>
                <span className={s.marginNoteValue}>{education.years}</span>
              </li>
              <li className={s.marginNote}>
                <span className={`mono ${s.marginNoteLabel}`}>CGPA</span>
                <span className={s.marginNoteValue}>{education.cgpa}</span>
              </li>
              {experience.map((e) => (
                <li className={s.marginNote} key={e.title}>
                  <span className={`mono ${s.marginNoteLabel}`}>Programme</span>
                  <span className={s.marginNoteValue}>{e.title}</span>
                  <span className="mono-plain" style={{ color: 'var(--ink-soft)' }}>
                    {e.program} — simulation
                  </span>
                </li>
              ))}
              <li className={s.marginNote}>
                <span className={`mono ${s.marginNoteLabel}`}>Based in</span>
                <span className={s.marginNoteValue}>{identity.location}</span>
              </li>
            </ul>
          </aside>
        </div>
      </div>
    </section>
  );
}
