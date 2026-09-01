import { CopyButton } from '@/components/ui/CopyButton';
import { SITE, identity } from '@/lib/content';
import { chapters } from '@/lib/content/capabilities';

import s from './sections.module.css';

/**
 * Contact (plan §13.7) — the strike, then the engraved back plate.
 * Every action is a real link or button; nothing depends on the canvas.
 */
export function ContactSection() {
  const chapter = chapters[6];
  const year = new Date().getFullYear();

  return (
    <section id="contact" className={`chapter see-through`} aria-labelledby="contact-title">
      <p className="visually-hidden">{chapter.sceneDescription}</p>

      <div className="shell">
        <p className="mono chapter-label">
          <span>{chapter.index}</span>
          <span>Contact</span>
        </p>

        <div className={s.backPlate}>
          <h2 id="contact-title" className={`display ${s.contactTitle}`}>
            The strike.
          </h2>
          <p className={s.contactInvite}>
            If you are hiring backend engineers, or you have a system where correctness under
            concurrency matters, I would be glad to talk.
          </p>

          <ul className={s.contactRows}>
            <li className={s.contactRow}>
              <span className={`mono ${s.contactRowLabel}`}>Email</span>
              <a className={`link ${s.contactRowValue}`} href={`mailto:${identity.email}`}>
                {identity.email}
              </a>
            </li>
            <li className={s.contactRow}>
              <span className={`mono ${s.contactRowLabel}`}>Phone</span>
              <a
                className={`link ${s.contactRowValue}`}
                href={`tel:${identity.phone.replace(/\s/g, '')}`}
              >
                {identity.phone}
              </a>
            </li>
            <li className={s.contactRow}>
              <span className={`mono ${s.contactRowLabel}`}>GitHub</span>
              <a
                className={`link ${s.contactRowValue}`}
                href={identity.links.github}
                target="_blank"
                rel="noreferrer noopener"
              >
                github.com/dhruv-bamal ↗
              </a>
            </li>
            <li className={s.contactRow}>
              <span className={`mono ${s.contactRowLabel}`}>LinkedIn</span>
              <a
                className={`link ${s.contactRowValue}`}
                href={identity.links.linkedin}
                target="_blank"
                rel="noreferrer noopener"
              >
                linkedin.com/in/dhruv-bamal ↗
              </a>
            </li>
            <li className={s.contactRow}>
              <span className={`mono ${s.contactRowLabel}`}>Based in</span>
              <span className={s.contactRowValue}>{identity.location}</span>
            </li>
          </ul>

          <div className={s.contactActions}>
            <a className="btn" href={`mailto:${identity.email}`} data-cursor="Write">
              Write to me
            </a>
            <a className="btn btn-ghost" href="/resume/dhruv-bamal-backend-engineer.pdf" download data-cursor="Download">
              Résumé (PDF) ↓
            </a>
            <CopyButton value={identity.email} label="Copy email" />
          </div>
        </div>

        <footer className={`mono ${s.footer}`}>
          <span>
            © {year} {identity.name}
          </span>
          {/* TODO: Owner input required (T1) — replace with the new custom domain once purchased. */}
          <span style={{ color: 'var(--text-on-void-dim)' }}>{SITE.domainPlaceholder}</span>
          <span>Exactly once.</span>
        </footer>
      </div>
    </section>
  );
}
