# Portfolio 2.0 — Dhruv Bamal

An immersive, real-time-3D portfolio for a backend engineer, built around one concept:

> **EXACTLY ONCE** — a precision instrument that never counts twice. You wind it by scrolling,
> pass through its escape wheel, and find three backend systems running inside it as jewelled
> complications.

The metaphor is not decorative. *Exactly once*, idempotency, row-level locking and state machines
are verbatim guarantees from the three project READMEs, and an escapement — a mechanism that
releases one tooth per beat, never two — is their physical form.

---

## Technology

| Concern | Choice |
|---|---|
| Framework | Next.js 14 (App Router) + TypeScript (strict) |
| 3D | Three.js + React Three Fiber + drei |
| Scroll & timelines | GSAP ScrollTrigger + Lenis, sharing one ticker |
| Content | Typed TypeScript data layer — no CMS |
| 3D assets | 100% procedural geometry; no external models or textures |
| Testing | Jest (content integrity) |
| Fonts | Instrument Serif · Schibsted Grotesk · IBM Plex Mono, self-hosted via `next/font` |

### Architecture — four layers

1. **Semantic DOM** (`components/sections/`, `app/`) — the complete site, meaningful without any
   canvas. This is the base layer, not a fallback.
2. **Motion orchestration** (`components/three/ScrollDirector.tsx`, `lib/scroll/progress.ts`) —
   ScrollTrigger writes chapter progress into one plain mutable object.
3. **WebGL** (`components/three/`) — R3F reads that object inside `useFrame`. **No React state is
   on the animation path**, so a 60fps scene triggers zero re-renders.
4. **Fallback** (`useQualityTier.ts`) — four art-directed tiers: full → adaptive → reduced-motion
   → no-WebGL.

---

## Local development

```bash
npm install
```

```bash
npm run dev
```

Then open http://localhost:3000.

No environment variables are required. The site has no backend, no database and no third-party
services — it is fully static.

### Scripts

```bash
npm run check
```

Runs typecheck, lint and tests together. Individually:

| Script | Purpose |
|---|---|
| `npm run dev` | Development server |
| `npm run build` | Production build (7 static pages) |
| `npm run start` | Serve the production build |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint via `next lint` |
| `npm run test` | Jest — content integrity suite |

---

## Content and factual integrity

**All personal and project copy lives in `lib/content/`.** No section component hard-codes a
fact. Every record carries a `source` naming the file it came from.

`tests/content.test.ts` is a build gate, not a formality. It fails if:

- any fact-bearing record loses its `source`;
- denylisted claim patterns appear (deployment claims, numeric user counts, revenue, AI/ML
  expertise, the retired portfolio URL, generic portfolio filler like "passionate");
- a project gains a public repository or demo link;
- the project set drifts from the three current projects.

If you edit copy, run `npm run test` before committing.

### Editing content

| File | Contains |
|---|---|
| `lib/content/identity.ts` | Name, contact, summary, **`SITE` constants (see TODO below)** |
| `lib/content/skills.ts` | The nine skill clusters |
| `lib/content/achievements.ts` | Hackathon, Helios Protocol, LeetCode, Forage |
| `lib/content/projects.ts` | The three projects and the source-link note |
| `lib/content/capabilities.ts` | "What I can build" statements and chapter definitions |

### Open TODO

`SITE.domainPlaceholder` and `SITE.originPlaceholder` in `lib/content/identity.ts` are
placeholders until the new custom domain is purchased. The footer currently prints
`TODO: new custom domain`. Update those two constants and nothing else.

See `CONTENT_SOURCE_AUDIT.md` for full traceability.

---

## Build and deployment

```bash
npm run build
```

Output is fully static (`○ Static` / `● SSG`). Deploy to any static-capable host; Vercel needs no
configuration beyond connecting the repository.

Before going live, set the domain constants above so metadata and the footer are correct.

---

## Assets

All 3D is generated at runtime from parameters in `components/three/geometry.ts` — extruded tooth
profiles, swept spirals, lathe-turned arbors. There are **no model or texture files**, which
means nothing needs Draco/Meshopt/KTX2 compression and every asset is license-clean by
construction.

Static assets in `public/`:

| Path | Notes |
|---|---|
| `favicon.svg` | The escape-wheel mark; one tooth in paper white — the released one |
| `resume/dhruv-bamal-backend-engineer.pdf` | Public download |
| `certificate/prompt-rachna-2-0.jpeg` | Lazy-loaded, fully alt-texted |

Case-study architecture diagrams are authored inline SVG
(`components/casestudy/ArchitectureDiagram.tsx`), so they inherit theme colours and stay crisp at
any resolution.

**Performance:** three.js is code-split behind `next/dynamic` and requested only after the quality
tier resolves — the no-WebGL edition never downloads it. Home first-load JS is ~110 kB, and the
LCP element is the hero name as DOM text.

---

## Accessibility and motion

- Skip-to-content is the first tab stop; every pinned scene has a visible Skip control.
- The menu is focus-trapped, `Esc`-closable, and restores focus on close.
- Skills clusters are ARIA tabs with arrow-key cycling — and all nine are also in a static list,
  so nothing is interaction-gated.
- The custom cursor is enhancement-only: disabled on touch and under reduced motion, with the
  native caret preserved over prose, lists, tables and inputs.
- Brass `:focus-visible` ring throughout; touch targets ≥44 px.
- All sustained reading happens on paper-white spreads, which guarantees contrast.

**Reduced motion** is honoured from `prefers-reduced-motion` and from a manual toggle in the
menu (Index → Display). In that mode Lenis is never instantiated, the flagship scroll track
collapses to a single screen with a Continue link, and the instrument holds a composed frame.
All content remains present.

**No WebGL** yields the complete site as semantic HTML — verified against the server-rendered
output.

---

## Documents

| File | Purpose |
|---|---|
| `PORTFOLIO_PLAN.md` | The approved plan (31 sections) |
| `IMPLEMENTATION_READINESS_REVIEW.md` | Pre-build review, risks, adjustments |
| `FINAL_QA_REPORT.md` | What was built, defects fixed, deviations, limitations |
| `CONTENT_SOURCE_AUDIT.md` | Every fact traced to its source file |
