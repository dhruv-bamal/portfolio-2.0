'use client';

import { skillClusters } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';
import { sceneState } from '@/lib/scroll/progress';

import s from './sections.module.css';

/**
 * Skills (plan §13.4) — the exploded view.
 *
 * Every cluster and every item is readable at a glance. An earlier build gated each cluster
 * behind a tab button, which made a visitor click nine times to read one screen of text;
 * hovering now only tints the 3D scene, and the 3D is decoration. Nothing here requires
 * interaction to be read, so there is also nothing to make keyboard-operable.
 */
export function SkillsSection() {
  const chapter = chapters[3];

  const illuminate = (i: number) => {
    (sceneState as unknown as { activeCluster?: number }).activeCluster = i;
  };

  return (
    <section id="skills" className={`chapter see-through ${s.spread}`} aria-labelledby="skills-title">
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className="shell">
        <p className="mono chapter-label">
          <span>{chapter.index}</span>
          <span>Skills</span>
        </p>

        <div className={s.skillsHead}>
          <h2 id="skills-title" className={`display ${s.spreadTitle}`}>
            Exploded view.
          </h2>
          <p className={s.skillsLede}>
            Nine groups of parts, laid out the way a movement is drawn before it is assembled.
          </p>
        </div>

        <ul className={s.clusterGrid}>
          {skillClusters.map((c, i) => (
            <li
              key={c.id}
              className={s.cluster}
              onMouseEnter={() => illuminate(i)}
              onMouseLeave={() => illuminate(-1)}
            >
              <p className={`mono ${s.clusterMeta}`}>
                <span className={s.clusterIndex}>{c.index}</span>
                <span className={s.clusterRule} aria-hidden="true" />
              </p>
              <h3 className={s.clusterName}>{c.name}</h3>
              <ul className={s.clusterItems}>
                {c.items.map((item) => (
                  <li key={item} className={s.clusterItemText}>
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
