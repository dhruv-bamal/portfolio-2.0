# IMPLEMENTATION_READINESS_REVIEW.md

Pre-implementation review for **Portfolio 2.0 — Dhruv Bamal**, conducted before any code was
written.

---

## 1. Files Reviewed

| File | Role | Read |
|---|---|---|
| `PORTFOLIO_PLAN.md` (984 lines, 31 sections) | Approved source of truth | Complete |
| `modern_ui_ux_portfolio_pattern.md` (643 lines, 13 sections) | Visual/UX research authority | Complete |
| `resume-dhruv-backend-engineer (1).pdf` | Factual: identity, education, skills, achievements | Complete (text extracted) |
| `ProcureFlow-README.pdf` (7 pp) | Factual: project 1 | Complete (text extracted) |
| `SlotSure-README.pdf` (6 pp) | Factual: project 2 | Complete (text extracted) |
| `DealerSync-README.pdf` (7 pp) | Factual: project 3 | Complete (text extracted) |
| `hackathon-certificate.jpeg` | Factual + display asset | Visually inspected |
| Owner session directives | Factual: 12 recorded answers/directives | Applied |

Repository state at review time: `PORTFOLIO_PLAN.md` and `public/favicon.svg` only. Not a git
repository. Node v24.19.0, npm 11.17.0.

## 2. Approved Plan Summary

**Concept — EXACTLY ONCE.** A colossal precision instrument that never counts twice. The visitor
winds it by scrolling, passes through its escape wheel in a flagship cinematic transition, and
finds three backend systems running inside it as jeweled complications. The metaphor is grounded
in verbatim README guarantees (idempotency, "exactly once", state machines, row-level locking).

**Structure.** One cinematic home route with seven anchored chapters (Hero → About →
Achievements → Skills → Projects & Work → What I Can Build → Contact), plus three deep-linkable
case-study routes and a 404 plate.

**World.** Dark exhibit-lit "Void Gallery" and "Movement Hall" alternating with high-key
paper-white editorial "Workbench" spreads. Brass/steel/jewel materials, Instrument Serif +
Schibsted Grotesk + IBM Plex Mono, beat-quantized mechanical motion.

**Stack.** Next.js App Router + TypeScript, Three.js + React Three Fiber + drei, GSAP
ScrollTrigger + Lenis, typed TS content layer, Jest + Playwright + axe.

**Four art-directed tiers.** Full immersive → adaptive → reduced-motion → no-WebGL "Patent
Drawing Edition" (a complete alternate edition, not a degraded page).

## 3. Confirmed Factual-Source Rules

Carried into implementation as hard constraints:

1. **Only current-session sources** supply personal/project facts. Every content record carries a
   `source` field; a Jest content-lint test fails the build if any is missing.
2. **"Production-grade" is permitted** (resume's own wording, owner-authorized). **"Deployed",
   "live", "in production", "production-tested"** are forbidden for the three backend projects.
3. **Repos are private.** Every project Source control links to the GitHub *profile* with the
   wording "Repository private — source available on request". Reserved slot retained for future
   public URLs (T3).
4. **No metric values.** READMEs define metric *names* as designed instrumentation only; these are
   presented explicitly as telemetry design, never as achieved results.
5. **No AI/ML claims.** One neutral forward-looking learning-intent line only.
6. **Helios Protocol** appears only in Achievements, with its owner-supplied public demo and repo
   links — the only external project links on the site.
7. **The retired `dhruv-bamal-portfolio.vercel.app` URL appears nowhere**; it is in the denylist.
8. **Phone, CGPA, certificate, and resume download are owner-approved** for public display.

## 4. Potential Technical Risks

| # | Risk | Assessment | Mitigation adopted |
|---|---|---|---|
| R1 | Lenis + ScrollTrigger + R3F desync (pin jumping, resize drift) | **High likelihood, high impact** — the most common failure mode in this class of site | Single scroll source of truth: Lenis drives `gsap.ticker`; ScrollTrigger updates from Lenis; scroll progress written to a **plain mutable module store**; R3F reads it in `useFrame`. Zero React state on the animation path. `ScrollTrigger.refresh()` on resize. |
| R2 | 3D authoring time — plan allows Blender-authored sculptural parts | **High likelihood** for a build of this size | Plan §31 already sanctions procedural-first. **Decision: 100% procedural geometry**, no Blender step, no external GLB. This removes the entire asset-pipeline risk *and* guarantees license-cleanliness by construction. Recorded as a deviation in §5 below. |
| R3 | Fill-rate spike during the flagship shader ramp | Medium | DPR clamped during ramp; background scene paused until threshold; adaptive tier substitutes a masked 2D wipe over the same camera path. |
| R4 | Font network dependency at build time | Medium | `next/font/google` downloads and **self-hosts** at build with `display: swap` and metric fallbacks — satisfies §16's self-hosting and CLS requirements. |
| R5 | Scroll-jack fatigue / recruiter impatience | Medium | Pins limited to short scenes; skip control in every pinned scene; `Esc` escapes; a scannable DOM work index sits above the cinematic chambers. |
| R6 | WebGL context loss mid-journey | Low | `webglcontextlost` listener downgrades to the Patent Drawing Edition with scroll position preserved. |
| R7 | Fact drift while writing copy | Low but unacceptable | All copy originates in the typed content layer; content-lint + denylist tests gate it. |

## 5. Required Implementation Adjustments

Three adjustments to the approved plan, none of which reduce visual ambition:

**A5.1 — Procedural-only 3D (plan §25 contingency exercised).** The plan permits Blender-authored
sculptural parts with a documented contingency to "simplify sculpted parts to machined
primitives — consistent with the material language." That contingency is exercised up front: the
entire Instrument is built from parametric geometry (extruded tooth profiles, lathe-turned
arbors, instanced gear teeth). This preserves the machined material language exactly, removes the
GLB/Draco/KTX2 pipeline and its ~1.5MB budget, and makes every asset license-clean by
construction. Consequence: the §25 compression pipeline is **not needed for v1** and is documented
as unused rather than silently dropped.

**A5.2 — "Target users" wording.** The READMEs use the heading "Target users". Rendered as-is
alongside a denylist containing "users", this creates a false positive and a faint ambiguity. The
site renders this field as **"Built for"** — identical meaning, unambiguously design intent rather
than a claim of having users. The denylist targets *claim patterns* (`\d+ users`, "our users",
"active users") rather than the bare word.

**A5.3 — Content-lint as pattern rules, not word bans.** A naive word denylist would reject
legitimate resume vocabulary (e.g. "Docker deployment"). The lint uses precise claim patterns and
per-field allowances (e.g. Helios Protocol's owner-supplied demo link is explicitly allowed;
project entries are not).

## 6. Blocking Conflicts

**None.** One non-blocking open item remains: **T1 — the new custom domain name**, which the owner
will purchase. The build uses a single `SITE.domain` placeholder constant, clearly marked TODO,
consumed by metadata and the footer, swappable in one line. The retired vercel.app URL is denylisted.

T2 (OG image) is owner-deferred. T3 (public repo URLs) has reserved slots. T4 (favicon) is
resolved and authored.

---

STATUS: READY FOR IMPLEMENTATION
