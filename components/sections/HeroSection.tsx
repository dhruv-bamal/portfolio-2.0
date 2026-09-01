import { identity } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * Hero (plan §13.1). The name is the LCP element — DOM text, never canvas.
 */
export function HeroSection() {
  const chapter = chapters[0];

  return (
    <section id="hero" className={`${s.hero} see-through`} aria-labelledby="hero-name">
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className={`shell ${s.heroGrid}`}>
        <p className={`mono ${s.heroMeta}`}>
          <span>{identity.roleHeadline}</span>
          <span aria-hidden="true">—</span>
          <span>{identity.locationShort}</span>
        </p>

        <h1 id="hero-name" className={`display ${s.heroName}`}>
          <span className={s.heroNameLine}>Dhruv</span>
          <span className={s.heroNameLine}>Bamal</span>
        </h1>

        <p className={s.heroPositioning}>{identity.positioning}</p>

        <p className={`mono ${s.heroCue}`}>
          <span className={s.heroCueRule} aria-hidden="true" />
          <span>Scroll to wind</span>
        </p>
      </div>
    </section>
  );
}
