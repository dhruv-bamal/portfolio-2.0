import type { Project } from '@/lib/content';

import s from './ArchitectureDiagram.module.css';

/**
 * Authored SVG architecture diagrams (owner directive 6, plan §3.9 / §25).
 *
 * Drawn in the site's engraved technical-drawing language — hairline strokes, mono labels,
 * no fills. Each diagram is derived from its README's own architecture and workflow text.
 * These double as the no-WebGL "Patent Drawing Edition" plates.
 */

const W = 900;
const H = 430;

function Box({
  x,
  y,
  w = 150,
  h = 54,
  label,
  sub,
  accent = false,
}: {
  x: number;
  y: number;
  w?: number;
  h?: number;
  label: string;
  sub?: string;
  accent?: boolean;
}) {
  return (
    <g>
      <rect
        x={x}
        y={y}
        width={w}
        height={h}
        className={accent ? s.boxAccent : s.box}
        vectorEffect="non-scaling-stroke"
      />
      <text x={x + w / 2} y={sub ? y + h / 2 - 3 : y + h / 2 + 4} className={s.label}>
        {label}
      </text>
      {sub && (
        <text x={x + w / 2} y={y + h / 2 + 13} className={s.sub}>
          {sub}
        </text>
      )}
    </g>
  );
}

function Arrow({
  from,
  to,
  dashed = false,
  label,
}: {
  from: [number, number];
  to: [number, number];
  dashed?: boolean;
  label?: string;
}) {
  const [x1, y1] = from;
  const [x2, y2] = to;
  const midX = (x1 + x2) / 2;
  const midY = (y1 + y2) / 2;
  return (
    <g>
      <line
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        className={dashed ? s.lineDashed : s.line}
        markerEnd="url(#arrowhead)"
        vectorEffect="non-scaling-stroke"
      />
      {label && (
        <text x={midX} y={midY - 6} className={s.edgeLabel}>
          {label}
        </text>
      )}
    </g>
  );
}

function Defs() {
  return (
    <defs>
      <marker
        id="arrowhead"
        markerWidth="7"
        markerHeight="7"
        refX="6"
        refY="3.5"
        orient="auto"
        markerUnits="strokeWidth"
      >
        <path d="M0,0 L7,3.5 L0,7 Z" className={s.arrowFill} />
      </marker>
    </defs>
  );
}

function ProcureFlowDiagram() {
  return (
    <>
      <Box x={20} y={188} label="API client" sub="Swagger / REST" />
      <Arrow from={[170, 215]} to={[228, 215]} />
      <Box x={232} y={170} w={170} h={92} label="NestJS controllers" sub="DTO validation" />
      <Arrow from={[317, 262]} to={[317, 304]} />
      <Box x={232} y={308} w={170} h={62} label="JWT guard → RBAC" sub="tenant checked server-side" accent />
      <Arrow from={[402, 215]} to={[462, 215]} />
      <Box x={466} y={170} w={170} h={92} label="Services" sub="approval rules" accent />

      <Arrow from={[636, 190]} to={[706, 150]} />
      <Box x={710} y={120} w={168} h={54} label="PostgreSQL" sub="Prisma" />
      <Arrow from={[636, 215]} to={[706, 215]} />
      <Box x={710} y={188} w={168} h={54} label="Redis" sub="rate limits, job state" />
      <Arrow from={[636, 240]} to={[706, 282]} />
      <Box x={710} y={256} w={168} h={54} label="BullMQ worker" sub="report export" />

      <Arrow from={[551, 262]} to={[551, 336]} dashed />
      <Box x={466} y={340} w={170} h={54} label="Audit log" sub="every decision, always" accent />

      <text x={20} y={40} className={s.title}>
        ProcureFlow — request path
      </text>
      <line x1={20} y1={52} x2={880} y2={52} className={s.rule} vectorEffect="non-scaling-stroke" />
      <text x={20} y={412} className={s.footnote}>
        Approved or rejected, the audit entry is written either way.
      </text>
    </>
  );
}

function SlotSureDiagram() {
  return (
    <>
      <Box x={20} y={188} label="Booking request" sub="idempotency key" />
      <Arrow from={[170, 215]} to={[224, 215]} />

      {/* The transaction boundary — the whole point of this system */}
      <rect x={228} y={104} width={430} height={222} className={s.regionAccent} vectorEffect="non-scaling-stroke" />
      <text x={244} y={126} className={s.regionLabel}>
        ONE TRANSACTION
      </text>

      <Box x={248} y={140} w={180} h={50} label="Lock capacity row" accent />
      <Arrow from={[338, 190]} to={[338, 218]} />
      <Box x={248} y={222} w={180} h={50} label="Verify capacity > 0" />
      <Arrow from={[428, 165]} to={[468, 165]} />
      <Box x={472} y={140} w={170} h={50} label="Create reservation" sub="status: held" accent />
      <Arrow from={[557, 190]} to={[557, 218]} />
      <Box x={472} y={222} w={170} h={50} label="Decrement capacity" />

      <Arrow from={[658, 215]} to={[712, 215]} label="commit" />
      <Box x={716} y={188} w={162} h={54} label="PostgreSQL" sub="row-level lock" />

      <Arrow from={[557, 326]} to={[557, 364]} dashed />
      <Box x={452} y={368} w={210} h={50} label="Delayed expiry job" sub="restores capacity exactly once" accent />

      <text x={20} y={40} className={s.title}>
        SlotSure — the reservation transaction
      </text>
      <line x1={20} y1={52} x2={880} y2={52} className={s.rule} vectorEffect="non-scaling-stroke" />
      <text x={20} y={412} className={s.footnote}>
        Capacity is never updated outside this transaction.
      </text>
    </>
  );
}

function DealerSyncDiagram() {
  return (
    <>
      <Box x={20} y={100} label="CSV upload" sub="headers validated" />
      <Arrow from={[170, 127]} to={[228, 127]} />
      <Box x={232} y={100} w={168} h={54} label="Upload API" sub="returns immediately" accent />
      <Arrow from={[316, 154]} to={[316, 196]} />
      <Box x={232} y={200} w={168} h={54} label="Import batch" sub="status: queued" />
      <Arrow from={[400, 227]} to={[458, 227]} />
      <Box x={462} y={200} w={150} h={54} label="Redis / BullMQ" />
      <Arrow from={[537, 254]} to={[537, 292]} />

      <rect x={392} y={296} width={486} height={116} className={s.regionAccent} vectorEffect="non-scaling-stroke" />
      <text x={408} y={318} className={s.regionLabel}>
        WORKER — BOUNDED BATCHES, IDEMPOTENT
      </text>
      <Box x={408} y={330} w={140} h={44} label="Parse rows" />
      <Arrow from={[548, 352]} to={[578, 352]} />
      <Box x={582} y={330} w={140} h={44} label="Validate row" />
      <Arrow from={[722, 352]} to={[752, 352]} />
      <Box x={756} y={330} w={106} h={44} label="Dedupe" />

      <Arrow from={[612, 227]} to={[706, 172]} />
      <Box x={710} y={146} w={168} h={54} label="Orders" sub="valid rows seat" accent />
      <Arrow from={[612, 214]} to={[706, 100]} dashed />
      <Box x={710} y={72} w={168} h={54} label="Failed rows" sub="reason recorded" />

      <text x={20} y={40} className={s.title}>
        DealerSync — asynchronous import
      </text>
      <line x1={20} y1={52} x2={880} y2={52} className={s.rule} vectorEffect="non-scaling-stroke" />
      <text x={20} y={424} className={s.footnote}>
        Partial success: invalid rows never discard valid ones, and a retry seats nothing twice.
      </text>
    </>
  );
}

export function ArchitectureDiagram({ project }: { project: Project }) {
  const title = `${project.name} architecture diagram`;
  return (
    <figure className={s.figure}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className={s.svg}
        role="img"
        aria-labelledby={`diagram-${project.slug}-title diagram-${project.slug}-desc`}
      >
        <title id={`diagram-${project.slug}-title`}>{title}</title>
        <desc id={`diagram-${project.slug}-desc`}>
          {project.mechanismSteps.map((m) => m.step).join(' ')}
        </desc>
        <Defs />
        {project.mechanism === 'approval-train' && <ProcureFlowDiagram />}
        {project.mechanism === 'reservation-escapement' && <SlotSureDiagram />}
        {project.mechanism === 'sorting-barrel' && <DealerSyncDiagram />}
      </svg>
    </figure>
  );
}
