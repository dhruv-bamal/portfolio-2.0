import { achievements } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * Achievements (plan §13.3) — struck medallions.
 *
 * The hackathon card leads with the certificate itself: the artifact is the exhibit. Pointing
 * at it dims the scan and slides the record in from the left, so the card holds both the
 * evidence and the account of it without showing them at half strength at the same time.
 *
 * Accessibility: the reveal is driven by :hover AND :focus-within, so tabbing to the links
 * opens it. On touch (no hover) and under reduced motion the record is shown outright — the
 * content is never reachable only by pointing.
 */
export function AchievementsSection() {
  const chapter = chapters[2];
  const featured = achievements.find((a) => a.featured);
  const rest = achievements.filter((a) => !a.featured);

  return (
    <section
      id="achievements"
      className={`chapter see-through ${s.spread}`}
      aria-labelledby="achievements-title"
    >
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className="shell">
        <p className="mono chapter-label">
          <span>{chapter.index}</span>
          <span>Achievements</span>
        </p>

        <h2 id="achievements-title" className={`display ${s.spreadTitle}`}>
          Struck records.
        </h2>

        {featured && (
          <article className={s.exhibit} aria-labelledby={`ach-${featured.id}`}>
            {featured.certificate && (
              <div className={s.exhibitPlate}>
                <img
                  src={featured.certificate.src}
                  alt={featured.certificate.alt}
                  loading="lazy"
                  decoding="async"
                />
              </div>
            )}

            {/* Always visible: the card is never an unlabelled image. */}
            <div className={s.exhibitCaption}>
              <h3 id={`ach-${featured.id}`} className={`display ${s.exhibitTitle}`}>
                {featured.title}
              </h3>
              <p className={`mono ${s.exhibitHint}`} aria-hidden="true">
                Hover to read the record
              </p>
            </div>

            {/* Slides in from the left on hover or focus; shown outright on touch. */}
            <div className={s.record}>
              {/* Two columns on wide screens: the record was previously a single narrow column
                  with the whole right half of the card empty, which pushed the links out of
                  view and made them reachable only by scrolling inside the card. */}
              <div className={s.recordInner}>
                <div>
                  <p className={s.recordSummary}>{featured.summary}</p>

                  <ul className={s.metaRows}>
                    {featured.meta.map((m) => (
                      <li className={s.metaRow} key={m.label}>
                        <span className={`mono ${s.metaRowLabel}`}>{m.label}</span>
                        <span className={`mono-plain ${s.metaRowValue}`}>{m.value}</span>
                      </li>
                    ))}
                  </ul>

                  {featured.links && (
                    <div className={s.extLinks}>
                      {featured.links.map((l) => (
                        <a
                          key={l.href}
                          className={`mono ${s.extLink}`}
                          href={l.href}
                          target="_blank"
                          rel="noreferrer noopener"
                          data-cursor="Visit"
                        >
                          {l.label} <span aria-hidden="true">↗</span>
                        </a>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <div className={s.recordDetail}>
                    {featured.detail.map((d) => (
                      <p key={d} className={s.recordSummary}>
                        {d}
                      </p>
                    ))}
                  </div>

                  {featured.certificate && (
                    <p className={`mono-plain ${s.certificateCaption}`}>
                      {featured.certificate.caption}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </article>
        )}

        <div className={s.medallions}>
          {rest.map((a) => (
            <article key={a.id} className={s.medallion} aria-labelledby={`ach-${a.id}`}>
              <div className={s.medallionBody}>
                <h3 id={`ach-${a.id}`} className={`display ${s.medallionTitle}`}>
                  {a.title}
                </h3>
                <p className={s.medallionSummary}>{a.summary}</p>

                <ul className={s.metaRows}>
                  {a.meta.map((m) => (
                    <li className={s.metaRow} key={m.label}>
                      <span className={`mono ${s.metaRowLabel}`}>{m.label}</span>
                      <span className={`mono-plain ${s.metaRowValue}`}>{m.value}</span>
                    </li>
                  ))}
                </ul>

                <div className={s.medallionDetail}>
                  {a.detail.map((d) => (
                    <p key={d} className={s.medallionSummary}>
                      {d}
                    </p>
                  ))}
                </div>

                {a.links && (
                  <div className={s.extLinks}>
                    {a.links.map((l) => (
                      <a
                        key={l.href}
                        className={`mono ${s.extLink}`}
                        href={l.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        data-cursor="Visit"
                      >
                        {l.label} <span aria-hidden="true">↗</span>
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
