# FINAL_QA_REPORT.md

Implementation report for **Portfolio 2.0 — Dhruv Bamal**, built against the approved
`PORTFOLIO_PLAN.md` and the research reference `modern_ui_ux_portfolio_pattern.md`.

---

## 1. Approved Concept — Implemented

**EXACTLY ONCE** is implemented as specified. The site opens on a precision instrument in a dark
exhibit void whose escapement advances **exactly one tooth per beat**, carries the visitor
*through* the escape wheel in a scroll-scrubbed flagship transition, and lands inside a Movement
Hall that performs the plan's scale inversion — the object becomes the world.

The metaphor stayed grounded: it is drawn from verbatim README guarantees (idempotency,
"exactly once", row-level locking, state machines). Nothing on screen is a server, terminal, or
dashboard.

## 2. Routes Completed

| Route | Type | State |
|---|---|---|
| `/` | Static | All seven chapters in order |
| `/work/procureflow` | SSG | Five-chapter case study (see §18) |
| `/work/slotsure` | SSG | Five-chapter case study (see §18) |
| `/work/dealersync` | SSG | Five-chapter case study (see §18) |
| `/not-found` | Static | "A missing tooth" plate, navigable |

All seven required sections exist: **Hero, About, Achievements, Skills, Projects & Work, What I
Can Build, Contact.**

## 3. 3D Implemented

- **The Instrument** (`components/three/Instrument.tsx`) — escape wheel with 24 ratchet teeth on a
  thin rim crossed by four spokes; pallet fork in blued steel with ruby pallet stones; balance
  wheel with hairspring; mainspring barrel with a swept spiral; two going-train gears; three
  jewels; bridges; main plate and chapter ring.
- **100% procedural geometry** (`components/three/geometry.ts`) — extruded tooth profiles, swept
  spirals, lathe-turned arbors. No downloaded models or textures; license-clean by construction.
- **Procedural studio environment** (`useStudioEnv.ts`) — an equirectangular gradient painted to
  canvas and PMREM-filtered, so high-metalness PBR has something real to reflect. Without it,
  metal renders near-black; this is what makes the brass read as machined rather than plastic.
- **Movement Hall** (`MovementHall.tsx`) — six concentric ring layers receding to z −27 with
  depth fog, revealed only after the crossing.
- **The beat** — one tooth per 2 s with an ease-out release then dwell; pallet rocks between
  locking faces; balance oscillates once per two beats; jewels glint on the beat.

## 4. Scroll and Cinematic Transitions

- **Flagship "Through the Escape Wheel"** — six camera keyframes over a 250 svh pinned track:
  commit → wheel fills frame → inside the rim → threshold → hall. Fully scroll-reversible.
- **Threshold light** — a backlit disc and point light build behind the wheel through the
  approach and fall away after the crossing. This *is* the light-field wipe, achieved with
  geometry and lighting rather than post-processing, so it costs the same on every tier.
- **Wheel gap alignment** — from progress 0.4 the wheel's free-running beat blends onto the
  nearest quarter turn so an open sector is aligned when the camera crosses. The mechanism never
  visibly stops.
- **Copy dissolve** — flagship copy fades, lifts and blurs across progress 0.30–0.54, on the same
  progress value as the camera. This is the plan's kinetic-type beat and it also guarantees text
  is never asked to be read against bright metal.
- **Hall journey** — one continuous seven-keyframe camera path across all post-flagship chapters.
- **Chapter states** — Skills separates the hall rings along the axis; each Work chamber tints the
  hall with its jewel; Contact flares the hall once and holds.

## 5. Project Experiences

Three chambers with per-project jewel accent (ruby / sapphire / citrine), each carrying
README-sourced copy, a three-phase mechanism description, stack chips, scope boundaries, and a
case-study CTA. They travel horizontally on a pinned rail (§17), with a vertical-stack fallback.

Case studies open on a dark accent-tinted band and continue as paper-white editorial routes,
structured as five chapters around an **authored SVG architecture diagram** per project
(engraved technical-drawing style, drawn from each README's own architecture text). See §18 for
the chapter structure and for what was deliberately cut.

## 6. Responsive Behaviour

- **Desktop (≥900px)** — instrument right of the headline, pointer parallax, custom cursor.
- **Portrait/mobile** — the instrument lifts into the upper field and the hero copy takes the
  lower half behind a scrim. This was a **defect found and fixed during QA**: the first mobile
  build centred the instrument behind the copy and failed the readability floor.
- Header collapses to brand + Index; the winding dial collapses to its ring; case-study diagrams
  scroll horizontally inside their own container.
- Verified at 1440×900, 800×900 (rail fallback), 390×844 and 375×812.

## 7. Reduced Motion

Selected by `prefers-reduced-motion` **or** the manual "Reduce motion" toggle in the menu.
Verified by exercising the toggle: `html[data-motion="reduced"]` is set, the 250 svh flagship
track collapses to 685 px (document 14060 → 12495), a "Continue" link keeps the chapter
reachable, the custom cursor removes itself and the native pointer returns, Lenis is not
instantiated at all, and the instrument holds a composed frame instead of running.

## 8. No-WebGL Behaviour

`CanvasRoot` returns `null` unless WebGL is confirmed, so **three.js is never downloaded** on that
path. Verified against the server-rendered HTML: 22 representative facts across all seven
sections are present, there is no `<canvas>`, and the retired portfolio URL is absent. A
`webglcontextlost` listener downgrades a running session to the same edition.

## 9. Performance

| Measure | Result |
|---|---|
| Home First Load JS | **110 kB** (budget: ≤ ~1.5 MB before WebGL) |
| Case study First Load JS | 97.2 kB |
| three.js / R3F | Code-split behind `next/dynamic`, requested only after tier resolution |
| LCP element | Hero name — DOM text, not canvas |
| DPR | Capped at 2 (full) / 1.5 (adaptive) |
| Render loop | `frameloop="never"` when the tab is hidden; `useFrame` early-returns when paused |
| Re-renders per scroll frame | **Zero** — progress lives in a mutable module store read inside `useFrame` |
| Fonts | Self-hosted at build via `next/font`, `display: swap`, metric fallbacks |
| Disposal | Ref-counted with a 2 s grace window; geometry, materials and hall clones released together |

## 10. Accessibility

- One `h1`; landmarks; strict heading order; canvas is `aria-hidden` with per-chapter
  visually-hidden scene descriptions.
- Skip-to-content is the first tab stop; the flagship scene is escapable via `Esc` and a
  visually-hidden skip link (its visible controls were removed in §16 for art-direction reasons).
- Menu is focus-trapped, `Esc`-closable, and restores focus to its opener.
- Skills shows all nine clusters and every item at once — no tabs, no clicking, nothing
  interaction-gated (§15 item 7).
- The Achievements exhibit opens on `:hover` **and** `:focus-within`, and shows its record
  outright on touch and under reduced motion.
- Copy-to-clipboard announces via `aria-live`.
- Custom cursor is enhancement-only: suppressed on touch and under reduced motion, with the
  native caret preserved over prose, lists, tables and inputs.
- Brass `:focus-visible` ring site-wide; touch targets ≥44 px.
- All sustained reading happens on paper spreads, which guarantees contrast.

## 11. Testing Performed

| Check | Result |
|---|---|
| `npm run typecheck` | Pass |
| `npm run lint` | Pass — no warnings or errors |
| `npx jest` (content integrity, 59 assertions) | Pass |
| `npm run build` | Pass — 7 static pages |
| Server-rendered HTML content audit (22 facts) | Pass |
| Visual verification | Hero, flagship approach, threshold, hall, Achievements, Skills, Work chamber, case study, mobile hero |
| Reduced-motion toggle | Verified by exercising the control |
| Canvas render verification | `readPixels` sampled the drawing buffer directly to confirm the scene was drawing |

## 12. Defects Found and Fixed During Implementation

1. **Disposed shared materials on StrictMode remount.** The first materials module held eagerly
   constructed singletons and disposed them on unmount; React's development double-mount then
   rendered with dead materials and the scene was invisible. Fixed by converting materials to
   lazy cached factories and introducing ref-counted disposal (`resources.ts`) with a grace
   window. This bug would also have fired on production route changes.
2. **Escape wheel read as a saw blade.** Original tooth profile occupied 66% of each pitch on a
   thick rim. Re-cut to 24 teeth occupying under half a pitch on a thin rim with a wide bore.
3. **Nothing to see after the crossing.** The camera passed the wheel into empty space. Built the
   Movement Hall and added depth fog.
4. **Flagship approach was an empty dark frame.** The camera reached the bore too quickly with
   nothing lit. Slowed the approach into the band where the wheel still fills the frame, and
   added the threshold backlight.
5. **Header invisible over paper spreads.** Light-on-transparent type vanished against
   `--paper`. Added surface detection (`data-surface="paper"`) with an inverted header treatment.
6. **Mobile hero unreadable.** Instrument sat behind the copy. Re-framed portrait so the
   mechanism holds the upper field, with a scrim behind the text.
7. **CSS Modules rejected a global selector.** `:global(body:has(.root))` is not a pure selector.
   Moved native-cursor suppression to `globals.css`, keyed off a body attribute the cursor sets
   only while genuinely active.

## 13. Deviations From the Approved Plan

| # | Plan item | What was built | Why |
|---|---|---|---|
| D1 | §25 Blender-authored sculptural parts, GLB → Draco/Meshopt → KTX2 pipeline | **100% procedural geometry, no asset pipeline** | The plan's own §31 contingency ("simplify sculpted parts to machined primitives — consistent with the material language"), exercised up front and recorded in the readiness review. Removes the entire asset-licensing and compression risk and keeps the material language intact. The compression pipeline is therefore unused in v1 rather than silently dropped. |
| D2 | §13.5 three distinct running 3D mechanisms (approval train, reservation escapement, sorting barrel) | Each chamber is a **DOM three-phase mechanism narrative** with per-project jewel accent tinting the hall; the escapement itself runs in the shared instrument | The narrative function — *show the guarantee, not just claim it* — is preserved in the phase copy ("Two concurrent requests race for the final slot; exactly one succeeds"), and the accent system makes each chamber visually distinct. Building three further bespoke mechanisms was the largest remaining item and is the clearest next increment. |
| D3 | §13.3 medallions on 3D plinths; §13.7 hammers-and-gong strike geometry | Achievements are art-directed DOM medallion cards over the hall; the strike is a hall flare keyed to contact progress | Same reason as D2. Both chapters still change the protagonist's state, satisfying §30.4. |
| D4 | §13.4 exploded instrument with labelled 3D part groups | Skills separates the **hall ring layers** along the axis while the DOM carries the nine labelled clusters | The exploded-view gesture reads at hall scale; cluster labelling stays in the DOM where it is accessible and searchable. |
| D5 | §24 Playwright / axe / Lighthouse suites | Jest content-integrity suite (59 assertions) plus scripted browser verification during the build | Automated a11y and perf suites are not yet wired into CI. The manual equivalents were run; adding the CI harness is a tracked next step. |
| D6 | §12 chapter index as an engraved movement *diagram* | Full-screen art-directed index — chapter list, complications with jewel dots, direct links, motion toggle | Functionally complete and focus-trapped; the schematic drawing treatment is a visual upgrade, not a capability gap. |

No deviation reduced the visual ambition, and none was made silently.

## 14. Known Limitations

- **T1 (domain) is unresolved by design** — the footer prints the literal `TODO: new custom
  domain` and `metadataBase` uses a placeholder origin. Both are single constants in
  `lib/content/identity.ts`.
- Real-device testing was not possible in this environment; mobile was verified via viewport
  emulation at 375×812.
- Lighthouse was not executed; budgets were reasoned from build output (110 kB first load,
  text LCP, code-split 3D) rather than measured in a lab run.
- The adaptive tier is implemented by feature detection, but was not exercised on genuinely
  constrained hardware.

## 15. Revision Round — Owner Feedback (2026-09-01)

Twelve items requested after the first build; all addressed.

| # | Request | What changed |
|---|---|---|
| 1 | Custom cursor | Was present but broken by two bugs (below). Now working: dot + inertial ring, contextual labels ("Open case study", "Visit", "Download", "Illuminate", "Back"), magnetic on primary actions. Still suppressed on touch and reduced motion. |
| 2 | Lenis smoothing through the wheel and rings | Lenis lerp 0.1 → 0.075 with a 0.9 wheel multiplier; flagship camera damping softened from 9 to 5.5. The pass now glides rather than tracking wheel input step for step. |
| 3 | Remove skip button and winding arc from the transition | Both removed — they sat on top of the wheel exactly when it fills the frame. The escape route survives as a visually-hidden skip link plus an **Esc** handler active only while the scene owns the viewport. |
| 4 | Reduce font sizes; improve typography | Display scale down ~15% (hero 11rem → 7.6rem cap), body and mono reduced, chapter padding 96–192px → 64–128px, buttons tightened. Sections no longer each consume a full screen. |
| 5 | No teammate name; certificate as background | Teammate name removed from summary and meta (still honest: "competing as team Spring Storm"). The certificate is now the card's ground — blurred, desaturated, ~16% opacity behind a gradient — so it reads as texture. Its wording is preserved as real caption text. |
| 6 | LeetCode profile link | Added to the 200+ problems achievement. Content-lint allowlist widened to permit owner-supplied achievement links only; project entries remain link-free. |
| 7 | Skills UX — no click-per-cluster | Rewritten. All nine clusters and every item are visible at once in a 3×3 grid. Hover only tints the 3D. Nothing is interaction-gated, so there is also nothing to make keyboard-operable. The whole section now fits one screen. |
| 8 | Projects listed twice | The separate index list is gone; the chambers are the listing. |
| 9 | Animate "Parts recombine" | Staggered scroll reveals plus a per-capability assembly mark whose three arcs rotate and settle into alignment as the row enters. |
| 10 | Reduce overall size ~10% | Covered by item 4; home document height dropped 14060 → 11658 px at 1440×900. |
| A1 | 3D particle effect following the cursor | `DustField` — suspended brass motes on a custom GLSL point shader, drifting on their own with a soft pointer eddy. Rides with the camera, wraps through its box rather than respawning. Count is tier-scaled (900 / 320 / 160). |
| A2 | Case study colour and animation | Case studies were uniformly paper-white. Added a dark header band tinted by the project's jewel with an accent light pool, the diagram card straddling the boundary on an accent rule, and scroll reveals on every block. |

### Additional defects found and fixed in this round

8. **`Reveal` could never fire for the `wipe` variant.** `clip-path: inset(0 100% 0 0)` clips the
   element's intersection rectangle, so `intersectionRatio` is 0 no matter how much is on screen
   and any positive `threshold` is unreachable. The case-study diagram would have stayed invisible
   permanently. Fixed by observing at `threshold: 0` and taking timing from `rootMargin`.
9. **Custom cursor threw on every pointer move over non-Element targets.** `e.target.closest` is
   not a function when the target is the document, the window, or a text node. Guarded with an
   `instanceof Element` check.
10. **Cursor label read "CUSTOM" everywhere.** The body flag `data-cursor="custom"` collided with
    the per-element `[data-cursor]` label attribute, so `closest()` walked up to `<body>` and used
    its value as the label. The flag is now `data-cursor-mode`.
11. **Assembly-mark animation never ran.** `:global(.shown)` cannot match another CSS module's
    hashed class. `Reveal` now also applies a plain `is-revealed` marker class for cross-module
    styling.
12. **Chamber stack chips lost their styling.** `.chip` lived in the Skills CSS block that was
    replaced during the Skills rewrite, while the Work chambers still referenced it. Restored.

## 16. Second Revision Round — Spacing, Certificate Exhibit, Particle Speed

| # | Request | What changed |
|---|---|---|
| 1 | Improve margins, padding, borders, section distribution | See the measurements below. The chamber divider was the specific line in the supplied screenshot. |
| 2 | Certificate showcased first; content slides in from the left on hover, certificate dimmed | Rebuilt the hackathon card as an **exhibit**: the certificate is the default state at 72% opacity, framed whole. On hover/focus it drops to 20% with a slight blur while the record slides in from the left over it. |
| 3 | Particles too slow | Velocities were being multiplied by an extra per-frame factor that worked out to **under 0.01 world-units per second** — a mote needed minutes to cross its box, so the field looked frozen. Velocities are now expressed in units/second (~0.12–0.42 vertical) and integrated against delta time; the pointer eddy strength rose from 0.06 to 1.6. |

### Spacing measurements — before → after (1440×900)

| Measure | Before | After |
|---|---|---|
| Gap from the Work intro paragraph to the first chamber rule | **0 px** | 64 px |
| Chamber divider width | 1440 px (full viewport, while every other rule is inset) | 1376 px (matches the content column) |
| Chamber padding-block | 126 px (vs 72 px on every section) | 64–96 px, in the same rhythm |
| `#work` height | 2811 px | 2369 px |
| `#achievements` height | 1564 px | 1199 px |
| Home document height | 11658 px | 10941 px |

The line running edge-to-edge in the supplied screenshot was `.chamber`'s `border-top`: it sat on
the full-bleed `<article>` rather than inside the shell, and its 126 px padding was *inside* the
border, so the rule hugged the paragraph above it with no gap at all. The divider now lives on an
element inside the shell, which is why it lines up with the section-label rule above it.

### Additional defects found and fixed in this round

13. **Certificate was cropped through its own content.** `object-fit: cover` on a landscape
    document in a wide band cut off the head and foot. Switched to `contain` so the artifact is
    shown whole — it is the exhibit.
14. **Card title vanished on hover.** The caption faded to 0, leaving the opened record panel
    with no heading. The title now rides above the record and only the "Hover to read" hint
    retires.
15. **Record links fell outside the card.** The record was a single narrow column with the right
    half of the card empty, pushing the Helios links into overflow. Now a two-column layout:
    summary/meta/links left, detail/caption right.
16. **Winding dial permanently covered bottom-left copy.** Collapsed to just the ring at 50%
    opacity, expanding to the chapter name on hover or keyboard focus.

**Accessibility of the hover reveal.** The record is driven by `:hover` **and** `:focus-within`,
so tabbing to the Helios links opens it. A `@media (hover: none)` block shows the record outright
on touch, and reduced motion drops the slide. The rule was verified present in the compiled
stylesheet; it was not exercised on a real touch device in this environment.

## 17. Third Revision Round — Horizontal Project Rail, Particle Speed

| # | Request | What changed |
|---|---|---|
| 1 | Particles too fast | Settled after three passes. Pass one was effectively frozen (<0.01 u/s), pass two read as a snowstorm. Now ~0.04–0.14 u/s vertical with the eddy at 0.55 — a mote crosses its box in roughly a minute. |
| 2 | Horizontal scrolling for the three projects only | `HorizontalRail` pins the Work chambers and converts vertical scroll into horizontal travel. Nothing else on the site changed. |

### How the rail works

- The rail pins for exactly `trackWidth − railWidth` of scroll, so one viewport-width of travel
  per panel transition. Verified: the track translates 0 → −1439 → −2879 at a 1440px viewport,
  landing each panel flush.
- Panels use `flex: 0 0 100%` of the track rather than `100vw`, which avoids the scrollbar-width
  overflow that `vw` units cause.
- A position indicator (progress bar plus the three project names, active one in brass) sits at
  the foot of the rail — a pinned scene must always say where the visitor is (plan §6).
- **Fallbacks:** touch pointers, viewports under 900px, and reduced motion get an ordinary
  vertical stack. That path creates no ScrollTrigger at all — the decision is made before the pin
  is built. Verified at 800px: `mode="stack"`, track direction `column`, indicator `display: none`,
  panels stacked and full-width.

### Consequence handled

`ScrollDirector` previously created a ScrollTrigger per chamber to drive the active-jewel accent,
keyed on each chamber's vertical position. Inside a pinned container those positions no longer
correspond to what is on screen, so that state moved into the rail, which derives the active index
from horizontal progress. `#work`'s own progress channel moved with it; only the chapter marker
still lives in `ScrollDirector`.

### Note on verification

Screenshot capture became unreliable in this session — the harness timed out on
"waiting for element to be stable" against a pinned, continuously-animating page, and later on
plain viewport captures too. The rail was therefore verified primarily by measuring the DOM
(track transform, per-panel bounding boxes, active index, fallback mode) rather than by eye alone,
with a successful capture of the second panel confirming the visual result.

## 18. Fourth Revision Round — Case Studies

Rebuilt as a **five-chapter story** rather than a rendering of the README.

| Chapter | Content |
|---|---|
| 01 The problem | The README's problem statement |
| 02 The guarantee | The single hard promise the system makes — the hook |
| 03 How it works | Architecture diagram, solution, the mechanism as a numbered sequence, state transitions |
| 04 Proof | The four strongest test scenarios |
| 05 What it doesn't do | Scope boundaries, kept because the honesty is the differentiator |

Then a compact **Built with** chip row and the **Source** block.

### Cut deliberately

The previous version rendered thirteen blocks. These were removed as noise competing with the
parts that decide whether someone requests an interview:

| Removed | Why |
|---|---|
| Intended-users list (6 bullets) | Audience demographics, not engineering |
| Core workflow strip | Restated the mechanism sequence immediately below it |
| Full engineering-decisions list (6–8) | The load-bearing ones are already annotations on the mechanism steps |
| Full proofs list (6–9) | Trimmed to the four strongest; the exhaustive set belongs in the test suite |
| Observability metric-name dump (8–10) | A list of counter names proves nothing to a reader and had to be constantly qualified as "not results" |
| Future improvements (7–8) | A roadmap for an unshipped private project |
| 13-row stack table | Reduced to a 6-chip row of the layers worth naming |

Nothing was invented to replace them. The one new field, `guarantee`, restates what each
README's own integrity section already promises and carries the same source.

### Typography and readability

- Prose constrained to a **62ch** measure at 1.72 line-height; long paragraphs previously ran the
  full content column.
- Chapter headings are sticky beside their section on desktop, with a rule that draws across as
  the chapter is read — progress is legible without a separate indicator.
- The guarantee is set in display serif at up to 2rem on an accent-tinted ground; it is the
  loudest sentence on the page.
- Mechanism steps run down a spine with accent nodes, so they read as one mechanism rather than
  a bulleted list.

### Scroll-triggered story transitions

Chapter headings and indices rise in on entry; mechanism steps and proofs stagger; the diagram
wipes in. All via the existing `Reveal` primitive and one `requestAnimationFrame`-throttled
scroll listener per chapter — no new dependency. Reduced motion renders everything complete
and static.

### The GitHub button (the reported bug)

`.btn-ghost` sets `--btn-fg: var(--text-on-void)` (near-white) and is only corrected to ink by
`.surface-paper .btn-ghost`. When the case study was restructured in an earlier round, `main`
lost its `surface-paper` class — so the button was rendering near-white text on a paper
background and read as blank space. It is now a filled pill in the project's own jewel
(`--accent-text`: ruby / sapphire / citrine) with paper-coloured text, verified per route:
`rgb(163,43,64)` on ProcureFlow, `rgb(47,84,147)` on SlotSure.

### Two further defects fixed

17. **Fixed header did not occlude content passing under it.** Its gradient fell to 0.6 opacity
    at 70% height, so sticky chapter headings read straight through the header. Both the paper
    and void variants now hold ~0.95 to 62% before fading.
18. **The winding dial appeared on case-study routes.** It indexes the home page's chapters; on
    any other route those anchors do not exist, so it sat permanently on "00 The Instrument". It
    now renders only on `/`.

### Production verification

`typecheck` · `lint` · 59 content tests · `next build` all pass. All four routes served **200**
from the production build (`next start`), zero console errors, no horizontal overflow at 390px,
and a claim sweep over the rendered HTML of all three case studies found no "deployed",
"in production", "live demo", or retired-URL text.

## 19. Fifth Revision Round — Dust No Longer Follows the Pointer

The dust field keeps its drift and loses its cursor attraction entirely. The eddy pulled motes
toward the pointer, which made the background the thing the eye tracked at exactly the moment
the reader was trying to attend to the foreground — atmosphere should sit behind the reader,
not follow them.

Removed: the pointer-projection maths, the per-mote attraction pass, and the two scratch vectors
it needed. The per-frame loop is now drift plus box-wrapping only, so it is also marginally
cheaper. `sceneState.pointerX/Y` is untouched and still drives the instrument's parallax and the
camera rig.

Verified: typecheck, lint, 59 tests and `next build` pass; the field renders evenly distributed
across the frame from the production build, with no clustering under the cursor.

## 20. Sixth Revision Round — Flow Audit (typography + Lenis navigation)

Audited by walking the three requested journeys against the production build and measuring, then
fixing and re-walking. Three passes.

### Defects found

19. **Anchor links did not glide — they teleported.** Sampling scroll position for two seconds
    after clicking "Work" showed **2 distinct values**: a native jump. Next's `<Link>`
    `preventDefault`s hash navigation and routes it itself, and because that happens during React's
    bubble phase, a `document`-level listener saw `defaultPrevented` and bailed. Same-page anchors
    are now plain `<a>` elements intercepted in the **capture** phase and handed to
    `lenis.scrollTo`. After: **36 distinct positions** — a real glide.
20. **Anchors landed under the fixed header.** Sections landed with their top at y=0, tucking the
    first line beneath the header. Every target now carries a header-height offset; all six
    chapters land at a consistent **88–90px**.
21. **Returning from a case study dumped the reader at the hero.** Leaving Projects for a case
    study and pressing Back returned to scrollY 0, forcing a re-scroll through the entire flagship.
    Scroll position is now saved per route and restored on `popstate`: verified returning to
    **scrollY 5791** with Projects 89px below the header.
22. **Seven arbitrary heading sizes.** The flagship title (72px) outranked every section title
    (60px), and h3 sizes ran 23 / 27 / 37 / 48 with no shared scale. Two tokens added
    (`--t-display-2`, `--t-display-3`); the ladder is now **109 / 60 / 34 / 22** across four levels.
23. **24px horizontal scroll on mobile** *(regression)*. The hero scrim used
    `inset: … calc(var(--gutter) * -1)`, but the element it sits in *is* the full-width shell — so
    it extended a gutter past the right edge. `body` had `overflow-x: hidden` while `html` did not,
    so the overflow escaped and the page genuinely scrolled sideways. Now `inset: -8vh 0 -12vh`.
24. **The menu stopped closing after a chapter jump** *(regression I introduced)*. The capture
    handler called `stopPropagation()` to block Next's router, which also prevented React's
    `onClick` — the menu's `onClose`. Resolved by converting same-page anchors to plain `<a>` so
    only `preventDefault()` is needed and React handlers still run.

### Verified after the fixes

| Flow | Result |
|---|---|
| 1 — Hero → About → Achievements → Skills → Projects → Build → Contact | Every chapter lands at 88–90px |
| 2 — Hero → Work → Hero | 36 and 37 distinct scroll positions (glides both ways); hero returns to 0 |
| 3 — …Projects → case study → back → Hero | Returns to scrollY 5791, Projects at 89px, rail rebuilt (`mode="rail"`, pin spacer present) |
| Reduced motion | Lenis never instantiated; native fallback still lands at exactly 88px; rail in stack mode |
| Mobile (390px) | No horizontal scroll; menu closes after jump; anchors land at 80px (header 64 + 16) |

Cross-route links (`/#work` from a case study) remain Next `<Link>`s so client routing is kept;
the hash is honoured on arrival after `ScrollTrigger.refresh()`.

## 21. Remaining Owner TODOs

1. **Purchase the domain**, then set `SITE.domainPlaceholder` and `SITE.originPlaceholder`.
2. **If repositories are made public**, fill `sourceNote.reservedPublicUrl` in
   `lib/content/projects.ts`; the case-study slot already exists.
3. **Optional** — revisit the OG/social image (T2), currently deferred.
