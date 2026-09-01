import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import { ArchitectureDiagram } from '@/components/casestudy/ArchitectureDiagram';
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

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = getProject(params.slug);
  if (!project) notFound();

  const { prev, next } = getProjectNeighbours(project.slug);

  return (
    <main
      id="main"
      className={s.page}
      style={{ ['--accent' as string]: `var(--${project.accent})`, ['--accent-text' as string]: `var(--${project.accent}-text)` }}
    >
      {/* Dark header band, tinted by the project's jewel. The case studies were uniformly
          paper-white before, which broke the site's dark/light rhythm the moment you left the
          home route. */}
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

      <article className={`shell ${s.body}`} data-surface="paper">
        {/* The diagram card straddles the boundary between the dark band and the paper. */}
        <Reveal variant="wipe" className={s.diagramFrame}>
          <ArchitectureDiagram project={project} />
        </Reveal>

        {/* ---- Problem / Solution ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="problem">
          <h2 id="problem" className={`mono ${s.blockLabel}`}>
            Problem
          </h2>
          <p className={s.prose}>{project.problem}</p>
        </Reveal>

        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="solution">
          <h2 id="solution" className={`mono ${s.blockLabel}`}>
            Solution
          </h2>
          <p className={s.prose}>{project.solution}</p>
        </Reveal>

        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="builtfor">
          <h2 id="builtfor" className={`mono ${s.blockLabel}`}>
            Built for
          </h2>
          <ul className={s.tagList}>
            {project.builtFor.map((u) => (
              <li key={u} className={s.tag}>
                {u}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Workflow ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="workflow">
          <h2 id="workflow" className={`mono ${s.blockLabel}`}>
            Core workflow
          </h2>
          <ol className={s.workflow}>
            {project.workflow.map((w, i) => (
              <li key={`${w.actor}-${i}`} className={s.workflowStep}>
                <span className={`mono ${s.workflowIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                <span>
                  <strong className={s.workflowActor}>{w.actor}</strong> {w.action}
                </span>
              </li>
            ))}
          </ol>
        </Reveal>

        {/* ---- The mechanism ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="mechanism">
          <h2 id="mechanism" className={`mono ${s.blockLabel}`}>
            The mechanism
          </h2>
          <ol className={s.mechanismList}>
            {project.mechanismSteps.map((m, i) => (
              <li key={i} className={s.mechanismStep}>
                <span className={`mono ${s.mechanismIndex}`}>{String(i + 1).padStart(2, '0')}</span>
                <div>
                  <p className={s.mechanismText}>{m.step}</p>
                  {m.note && <p className={`mono-plain ${s.mechanismNote}`}>{m.note}</p>}
                </div>
              </li>
            ))}
          </ol>

          {project.states && (
            <div className={s.states}>
              <h3 className={`mono ${s.blockLabel}`}>State transitions</h3>
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
            </div>
          )}
        </Reveal>

        {/* ---- Engineering decisions ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="decisions">
          <h2 id="decisions" className={`mono ${s.blockLabel}`}>
            Engineering decisions
          </h2>
          <ul className={s.checkList}>
            {project.decisions.map((d) => (
              <li key={d} className={s.checkItem}>
                {d}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Proofs ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="proofs">
          <h2 id="proofs" className={`mono ${s.blockLabel}`}>
            Proofs — what the tests hold to
          </h2>
          <ul className={s.checkList}>
            {project.proofs.map((p) => (
              <li key={p} className={s.checkItem}>
                {p}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Observability ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="observability">
          <h2 id="observability" className={`mono ${s.blockLabel}`}>
            Observability
          </h2>
          <p className={s.prose}>{project.instrumentation.note}</p>
          <ul className={s.metricList}>
            {project.instrumentation.names.map((m) => (
              <li key={m} className={s.metric}>
                {m}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Scope boundaries: kept prominent, it is the differentiator ---- */}
        <Reveal as="section" variant="rise" className={`${s.block} ${s.scope}`} aria-labelledby="scope">
          <h2 id="scope" className={`mono ${s.blockLabel}`}>
            Scope boundaries
          </h2>
          <p className={s.prose}>{project.scopeBoundaries}</p>
        </Reveal>

        {/* ---- Future ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="future">
          <h2 id="future" className={`mono ${s.blockLabel}`}>
            Future improvements
          </h2>
          <ul className={s.tagList}>
            {project.futureImprovements.map((f) => (
              <li key={f} className={s.tag}>
                {f}
              </li>
            ))}
          </ul>
        </Reveal>

        {/* ---- Stack ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="stack">
          <h2 id="stack" className={`mono ${s.blockLabel}`}>
            Stack
          </h2>
          <table className={s.stackTable}>
            <caption className="visually-hidden">{project.name} technology stack by layer</caption>
            <tbody>
              {project.stack.map((row) => (
                <tr key={row.layer}>
                  <th scope="row" className={`mono ${s.stackLayer}`}>
                    {row.layer}
                  </th>
                  <td className={s.stackTech}>{row.tech}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Reveal>

        {/* ---- Source (T3 reserved slot) ---- */}
        <Reveal as="section" variant="rise" className={s.block} aria-labelledby="source">
          <h2 id="source" className={`mono ${s.blockLabel}`}>
            Source
          </h2>
          <p className={s.prose}>{sourceNote.note}</p>
          <p style={{ marginTop: 'var(--s-4)' }}>
            <a
              className="btn btn-ghost"
              href={sourceNote.href}
              target="_blank"
              rel="noreferrer noopener"
            >
              {sourceNote.hrefLabel} ↗
            </a>
          </p>
        </Reveal>

        {/* ---- Prev / next ---- */}
        <nav className={s.pager} aria-label="Other complications">
          {prev && (
            <Link className={s.pagerLink} href={`/work/${prev.slug}`}>
              <span className={`mono ${s.pagerLabel}`}>← Previous</span>
              <span className={s.pagerName}>{prev.name}</span>
            </Link>
          )}
          {next && (
            <Link className={`${s.pagerLink} ${s.pagerNext}`} href={`/work/${next.slug}`}>
              <span className={`mono ${s.pagerLabel}`}>Next →</span>
              <span className={s.pagerName}>{next.name}</span>
            </Link>
          )}
        </nav>
      </article>
    </main>
  );
}
