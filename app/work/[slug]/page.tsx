import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArchitectureDiagram } from '@/components/casestudy/ArchitectureDiagram';
import { CaseChapter } from '@/components/casestudy/CaseChapter';
import { Reveal } from '@/components/ui/Reveal';
import { getProject, getProjectNeighbours, projects, sourceNote } from '@/lib/content';

import s from './case-study.module.css';

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const project = getProject(params.slug);
  if (!project) return { title: 'Not found' };
  return {
    title: project.name,
    description: project.oneLiner,
  };
}

/** Stack layers worth naming on a case study; the rest is detail for the repository. */
const HEADLINE_LAYERS = [
  'Runtime',
  'Runtime / language',
  'Framework',
  'Database',
  'Cache / queue',
  'Queue',
  'Background jobs',
  'Testing',
  'CI',
];

/**
 * Case study as a five-chapter story: the problem, the promise, how it works, the proof, and
 * what it deliberately does not do.
 *
 * Deliberately not a transcription of the README. The previous version rendered thirteen
 * blocks — intended users, the full workflow, every engineering decision, every metric name,
 * the whole roadmap, a thirteen-row stack table — which is a specification, not a case study.
 * A reader deciding whether to interview someone needs the guarantee and the mechanism that
 * delivers it; the rest was noise competing with the parts that matter.
 */
export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(project.slug);
  // The strongest proofs lead; the exhaustive list belongs in the test suite, not here.
  const proofs = project.proofs.slice(0, 4);
  const stack = project.stack.filter((row) => HEADLINE_LAYERS.includes(row.layer));

  return (
    <main
      id="main"
      className={s.page}
      style={{
        ['--accent' as string]: `var(--${project.accent})`,
        ['--accent-text' as string]: `var(--${project.accent}-text)`,
      }}
    >
      {/* ---- Opening: dark band tinted by the project's jewel ---- */}
      <header className={s.hero}>
        <div className={`shell ${s.heroInner}`}>
          <nav aria-label="Breadcrumb" className={`mono ${s.breadcrumb}`}>
            <Link className="link" href="/#work" data-cursor="Back">
              ← The Instrument
            </Link>
            <span aria-hidden="true">/</span>
            <span>Complication {project.index}</span>
          </nav>

          <h1 className={`display ${s.title}`}>{project.name}</h1>
          <p className={`mono ${s.mechanism}`}>{project.mechanismName}</p>
          <p className={s.oneLiner}>{project.oneLiner}</p>
        </div>
        <span className={s.heroGlow} aria-hidden="true" />
      </header>

      <article className={s.body} data-surface="paper">
        <div className="shell">
          {/* ---- 01 The problem ---- */}
          <CaseChapter index="01" title="The problem">
            <p className={s.prose}>{project.problem}</p>
          </CaseChapter>

          {/* ---- 02 The guarantee: the hook the whole study turns on ---- */}
          <CaseChapter index="02" title="The guarantee" variant="feature">
            <p className={s.claim}>{project.guarantee.claim}</p>
            <p className={s.prose}>{project.guarantee.detail}</p>
          </CaseChapter>

          {/* ---- 03 How it works ---- */}
          <CaseChapter index="03" title="How it works">
            <Reveal variant="wipe" className={s.diagramFrame}>
              <ArchitectureDiagram project={project} />
            </Reveal>

            <p className={s.prose} style={{ marginTop: 'var(--s-7)' }}>
              {project.solution}
            </p>

            <ol className={s.steps}>
              {project.mechanismSteps.map((m, i) => (
                <Reveal as="li" key={i} variant="rise" delay={i * 55} className={s.step}>
                  <span className={`mono ${s.stepIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                  <div>
                    <p className={s.stepText}>{m.step}</p>
                    {m.note && <p className={`mono-plain ${s.stepNote}`}>{m.note}</p>}
                  </div>
                </Reveal>
              ))}
            </ol>

            {project.states && (
              <Reveal variant="rise" className={s.states}>
                <h3 className={`mono ${s.subhead}`}>State transitions</h3>
                <ul className={s.stateList}>
                  {project.states.map((st) => (
                    <li key={st.from} className={s.stateRow}>
                      <code className={s.stateFrom}>{st.from}</code>
                      <span aria-hidden="true" className={s.stateArrow}>
                        →
                      </span>
                      <span className={s.stateTo}>
                        {st.to.map((to) => (
                          <code key={to} className={s.stateChip}>
                            {to}
                          </code>
                        ))}
                      </span>
                      {st.note && <p className={`mono-plain ${s.stateNote}`}>{st.note}</p>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </CaseChapter>

          {/* ---- 04 Proof ---- */}
          <CaseChapter index="04" title="Proof">
            <p className={s.prose}>
              What the tests hold the system to — the cases that would break it if the guarantee
              did not hold.
            </p>
            <ul className={s.proofList}>
              {proofs.map((p, i) => (
                <Reveal as="li" key={p} variant="rise" delay={i * 70} className={s.proof}>
                  {p}
                </Reveal>
              ))}
            </ul>
          </CaseChapter>

          {/* ---- 05 Boundaries: kept, because the honesty is the point ---- */}
          <CaseChapter index="05" title="What it doesn’t do" variant="boundary">
            <p className={s.prose}>{project.scopeBoundaries}</p>
          </CaseChapter>

          {/* ---- Built with ---- */}
          <Reveal variant="rise" className={s.stackBlock}>
            <h2 className={`mono ${s.subhead}`}>Built with</h2>
            <ul className={s.stackList}>
              {stack.map((row) => (
                <li key={row.layer} className={s.stackItem}>
                  {row.tech}
                </li>
              ))}
            </ul>
          </Reveal>

          {/* ---- Source (T3 reserved slot) ---- */}
          <Reveal variant="rise" className={s.sourceBlock}>
            <p className={`mono ${s.sourceNoteText}`}>{sourceNote.note}</p>
            <a
              className={s.sourceLink}
              href={sourceNote.href}
              target="_blank"
              rel="noreferrer noopener"
              data-cursor="Visit"
            >
              {sourceNote.hrefLabel}
              <span aria-hidden="true">↗</span>
            </a>
          </Reveal>
        </div>
      </article>

      {/* ---- Onward ---- */}
      <nav className={s.pager} aria-label="Other complications">
        <div className={`shell ${s.pagerInner}`}>
          {prev && (
            <Link className={s.pagerLink} href={`/work/${prev.slug}`} data-cursor="Previous">
              <span className={`mono ${s.pagerLabel}`}>← Previous</span>
              <span className={s.pagerName}>{prev.name}</span>
            </Link>
          )}
          {next && (
            <Link
              className={`${s.pagerLink} ${s.pagerNext}`}
              href={`/work/${next.slug}`}
              data-cursor="Next"
            >
              <span className={`mono ${s.pagerLabel}`}>Next →</span>
              <span className={s.pagerName}>{next.name}</span>
            </Link>
          )}
        </div>
      </nav>
    </main>
  );
}
