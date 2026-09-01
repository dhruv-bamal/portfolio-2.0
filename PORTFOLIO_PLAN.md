# PORTFOLIO_PLAN.md — Dhruv Bamal, Portfolio 2.0

> **Provenance & supersession statement.** This plan was produced and revised using **only** the
> current-session research paper (`modern_ui_ux_portfolio_pattern.md`) and the files uploaded in
> this session (resume PDF, ProcureFlow / SlotSure / DealerSync README PDFs, certificate image),
> plus owner answers given directly in this session. **All prior portfolio plans, prior project
> sets, saved-memory decisions, prior guardrails, and prior creative directions are superseded
> and were not used as sources.** Every personal or project fact below carries a source note.
> Missing or unverifiable information is marked `TODO: Owner input required`. This document
> contains no implementation code.

---

## 1. Executive Summary

Portfolio 2.0 is an immersive, art-directed, real-time-3D portfolio for **Dhruv Bamal, Backend
Engineer** (source: resume). It is built around one original creative concept — **EXACTLY ONCE**:
a colossal precision instrument, part clockwork and part sculpture, that never counts twice. The
visitor "winds" the instrument by scrolling, passes through its escape wheel in a flagship
cinematic transition, and discovers Dhruv's three backend systems working inside it as jeweled
complications.

The concept is factually grounded: "exactly once," idempotency, state machines, row-level
locking, and audit trails are verbatim engineering guarantees in the three project READMEs. An
escapement — a mechanism that releases exactly one tooth per beat — is the physical embodiment
of those guarantees. The visual world is therefore truthful about the work while being
sculptural, cinematic, and experimental rather than a literal "backend visualization" (no
servers, terminals, or dashboards on screen).

The experience alternates dark exhibit-lit 3D chapters with high-key paper-white editorial
spreads (a contrast structure taken directly from the research paper), contains the seven
required sections (Hero, About, Achievements, Skills, Projects & Work, What I Can Build,
Contact), gives the three projects the deepest treatment as working sub-mechanisms with
deep-linkable case-study routes, and ships four art-directed quality tiers down to a fully
semantic no-WebGL "Patent Drawing Edition." Factual integrity is enforced by a typed content
layer in which every fact carries a source reference.

## 2. Source-File Inventory

| # | File (this session) | Role | Used for |
|---|---|---|---|
| 1 | `modern_ui_ux_portfolio_pattern.md` | Primary visual/UX authority | Concept rules, interaction patterns, 3D/scroll/typography direction, performance & accessibility doctrine |
| 2 | `resume-dhruv-backend-engineer (1).pdf` | Factual authority | Identity, contact, education, experience, skills, achievements, links |
| 3 | `ProcureFlow-README.pdf` (7 pp) | Factual authority | ProcureFlow project facts |
| 4 | `SlotSure-README.pdf` (6 pp) | Factual authority | SlotSure project facts |
| 5 | `DealerSync-README.pdf` (7 pp) | Factual authority | DealerSync project facts |
| 6 | Certificate image (in-session upload) | Factual authority + visual asset | Hackathon 1st-place certificate; approved for display |
| 7 | Owner messages in this session | Factual authority | Answers to the 8 owner questions; Helios Protocol details and public links; AI/ML learning intent; audience/creative directives |

No other source — including saved memories or any earlier plan — was used.

## 3. Confirmed Factual Content Inventory

### 3.1 Identity and headline information (source: resume)
- Name: **Dhruv Bamal**. Role headline: **Backend Engineer**.
- Location: Ghaziabad, U.P., India.
- Contact: bamaldhruv1105@gmail.com · +91 9810505413 (owner approved public display).
- Links: linkedin.com/in/dhruv-bamal · github.com/dhruv-bamal. (The resume also lists
  dhruv-bamal-portfolio.vercel.app — owner directive 2026-09-01: that old URL is **retired and
  must not appear anywhere on the new site**; a new custom domain will be purchased → T1.)

### 3.2 Professional positioning (source: resume summary, near-verbatim)
Backend Engineer with a systems-design foundation and 200+ DSA problems solved in C++. Built
**production-grade** APIs, databases, and distributed systems using Node.js, TypeScript,
PostgreSQL, and Redis. Proficient in transaction safety, concurrent request handling, background
job processing, and Docker deployment. ("Production-grade" is the resume's own wording and is
owner-authorized; "deployed / live / in production" is **not** claimed anywhere — see §4.)

### 3.3 Education (source: resume)
B.Tech CSE, 2023–2027, SRM Institute of Science and Technology, Ghaziabad. CGPA 7.35/10
(owner approved public display).

### 3.4 Experience (source: resume)
Y Combinator Startup Simulation — Forage Virtual Internship: completed YC's working-startup
simulation (early-stage dynamics, product-market fit, entrepreneurial problem-solving).
Always presented as a **simulation**, never as employment.

### 3.5 Backend engineering skills (source: resume, nine clusters verbatim)
1. Backend APIs — Node.js, NestJS, Express.js, REST API design, JWT & OAuth
2. Databases — PostgreSQL, SQL, Prisma ORM, Transaction safety, Row-level locking
3. Reliability — ACID transactions, Idempotency, Retry strategies, State machines
4. Background Jobs — Redis, BullMQ, Asynchronous queues
5. System Design — Scalability, Fault tolerance, Event-driven architecture
6. DevOps — Docker, Docker Compose, CI/CD (GitHub Actions)
7. Full Stack — React 18, Next.js, TypeScript
8. Languages — TypeScript, JavaScript, C++, Java, SQL, DSA
9. Tools — Git, GitHub, Jest, Supertest

### 3.6 Achievements (sources: resume + certificate + owner messages; owner confirmed the resume line and the certificate describe the **same event**)
- **1st Place, Prompt Rachna 2.0 (Techstacy 2.0 Hackathon)** — team **Spring Storm** (Dhruv Bamal
  with teammate Prakhar Chaudhary); qualified through a virtual round; finals held live at
  Unstop Headquarters, Saket, Delhi; among 100+ participants; judges included Diggaj Sharma and
  Yash Goyal (source: owner message). Certificate: "1st team … Prompt Rachna x Design Forge,
  14 March 2026, conducted by The Computer Society of India Student's chapter and Tech4Hack"
  (source: certificate image; approved for display).
- **Winning project: Helios Protocol** — a cyberpunk-themed interactive storytelling experience:
  multiple branching storylines and endings, hidden routes, time-sensitive quick-time events,
  story-integrated mini-games, choice-driven gameplay, custom cyberpunk UI/UX (source: owner
  message). **Live demo:** https://cyber-death2-0.vercel.app/ · **Repository:**
  https://github.com/Prakhar3518/CyberDeath2.0 (owner-supplied; the only public project links).
- **200+ problems solved on LeetCode** with consistent practice in C++ (source: resume).
- **Forage YC Startup Simulation** completed (source: resume; listed under experience, may be
  cross-referenced here as a credential).

### 3.7 AI/ML learning direction and current status (source: owner statement, this session)
Dhruv is currently strengthening backend fundamentals and **intends to learn AI implementation
and machine-learning models**, aiming to move toward AI/ML in the future. This appears on the
site only as a forward-looking learning statement (e.g., "currently exploring AI/ML
foundations") — never as expertise, experience, projects, or credentials (see §4).

### 3.8 Production-grade projects (sources: the three READMEs; per-project detail)

#### ProcureFlow (source: ProcureFlow-README.pdf)
- **What:** multi-tenant purchase and expense approval API for multi-branch businesses.
- **Problem:** SMBs run purchase requests, vendor approvals, and reimbursements over WhatsApp,
  spreadsheets, email, and paper — delayed decisions, duplicates, weak accountability,
  inconsistent rules, no audit trail.
- **Solution:** centralizes purchase/expense workflows across organizations, branches, and
  departments; routes requests through role- and amount-based approval rules; records every
  decision in an audit log; generates asynchronous finance reports.
- **Target users:** business owners; finance/ops administrators; branch managers; department
  managers; employees/requesters; vendor coordinators.
- **Core workflow:** employee creates request → manager reviews → finance verifies
  budget/vendor → owner approves high-value requests → immutable audit events → approved /
  rejected / needs changes.
- **Key engineering (README verbatim-faithful):** short-lived JWT access tokens; refresh-token
  rotation and revocation (stored as hashes); RBAC roles Owner / Admin / Manager / Employee /
  Viewer; tenant isolation enforced server-side on every protected query; multi-step approvals
  by role and amount thresholds; immutable audit logs (actor, org, action, resource, timestamp,
  safe metadata); BullMQ worker for async monthly CSV report export; Redis rate limits; DTO
  validation; health/readiness endpoints; structured logs with no secrets.
- **Stack:** Node.js · TypeScript (strict) · NestJS · REST + Swagger/OpenAPI · PostgreSQL ·
  Prisma · Redis · BullMQ · JWT + bcrypt/Argon2 · Jest + Supertest · Docker + Compose · GitHub
  Actions.
- **Testing story (README):** duplicate-email rejection; cross-organization access blocked;
  Viewer cannot approve; approval transition rules enforced; refresh-token reuse rejected after
  rotation; report job queued and status retrievable.
- **Scope boundaries (README, kept verbatim in spirit):** intentionally no real accounting, UPI
  reimbursements, GST, OCR, or ERP integrations — focus is the secure workflow backend.
- **Status/links:** private repository → "Source" links point to github.com/dhruv-bamal (owner
  directive). Not deployed; presented as production-grade engineering (owner-authorized).

#### SlotSure (source: SlotSure-README.pdf)
- **What:** capacity-aware appointment and reservation API for clinics, service centers,
  coaching institutes, and multi-branch businesses.
- **Problem:** limited-slot businesses schedule via phone/WhatsApp/spreadsheets — double
  booking, never-released holds, inconsistent availability, poor utilization visibility.
- **Solution:** publishes availability, holds capacity temporarily, confirms reservations,
  handles cancellations, and auto-releases expired holds.
- **Target users:** branch administrators; service providers/staff; receptionists; customers;
  business owners.
- **Booking algorithm (README, 9 steps):** validate input → begin transaction → lock
  slot-capacity row → verify remaining capacity > 0 → create reservation `held` with expiry →
  decrement capacity → commit → schedule delayed expiry job → respond.
- **State machine (README):** held → confirmed | expired | cancelled; confirmed → completed |
  cancelled; invalid transitions rejected (an expired reservation cannot be confirmed; a
  cancelled reservation cannot be cancelled again).
- **Key engineering:** capacity never updated outside the reservation transaction; idempotency
  keys prevent duplicate reservations on retries; expiry workers are idempotent — running the
  same job twice cannot restore capacity twice (**"exactly once"**); webhook dedup per provider
  event ID; Redis rate limiting; waitlist; audit logs; booking metrics; Docker Compose for API,
  worker, PostgreSQL, Redis.
- **Stack:** Node.js · TypeScript · NestJS · REST + Swagger · PostgreSQL · Prisma plus raw SQL
  where lock semantics require it · Redis · BullMQ · Jest + Supertest · k6/Artillery load tests
  · Docker + Compose · GitHub Actions.
- **Testing story (README):** two concurrent requests race for the final slot — only one wins;
  repeated idempotency key creates no second reservation; expired hold restores capacity
  exactly once; repeated webhook creates no duplicate confirmation; cross-branch authorization
  enforced; rate-limit responses correct.
- **Scope boundaries (README):** a scheduling/reservation demonstration backend — no real
  medical records, live payments, or healthcare decisions; mock data and a payment simulator.
- **Status/links:** private repository → profile link; not deployed; production-grade
  presentation authorized.

#### DealerSync (source: DealerSync-README.pdf)
- **What:** asynchronous distributor order-import and exception-management API for merchants,
  wholesalers, and operations teams.
- **Problem:** order files arrive in inconsistent CSV/Excel formats (unknown headers, invalid
  SKUs, duplicate external order IDs, invalid quantities, missing customers); synchronous
  imports are slow, error-prone, and time out on large files.
- **Solution:** accepts CSV uploads, creates an import batch, processes asynchronously in a
  worker, validates and deduplicates rows, stores valid orders, records invalid rows with
  actionable reasons, exposes progress, analytics, and downloadable error reports.
- **Target users:** distributor owners; operations managers; data-entry teams; merchant
  administrators; warehouse coordinators; finance/admin teams.
- **Core workflow:** upload → header/metadata validation → batch saved `queued` → BullMQ job →
  worker parses rows in bounded batches → per-row validation (SKU exists; positive integer
  quantity; customer present; valid date; external order ID unique per merchant) → valid rows
  inserted, invalid rows recorded with reasons → progress updated → status + error-report CSV.
- **Import states (README):** queued · processing · completed · partially_completed · failed ·
  cancelled.
- **Key engineering:** upload request returns quickly (no inline parsing); bounded-batch
  processing controls memory; partial success — bad rows never discard valid rows; retry with
  exponential backoff; deterministic key / unique constraint prevents duplicate external
  orders; **idempotent workers — retries cannot create duplicate records**; import state
  persists across worker restarts; error-category analytics; audit logs for upload, reprocess,
  cancel.
- **Stack:** Node.js · TypeScript · NestJS · REST + Swagger · PostgreSQL · Prisma/SQL layer ·
  Redis + BullMQ · streaming/batched CSV parser · Jest + Supertest · Docker + Compose · GitHub
  Actions.
- **Testing story (README):** invalid file type rejected; missing required header caught; valid
  rows imported while invalid rows get actionable messages; duplicate external order creates no
  second order; worker retry duplicates nothing; large imports report progress; cross-merchant
  access blocked; error report contains expected failed rows.
- **Scope boundaries (README):** CSV ingestion and operational exception handling — not an ERP,
  accounting platform, WMS, marketplace suite, or data warehouse.
- **Status/links:** private repository → profile link; not deployed; production-grade
  presentation authorized.

**Note on metrics:** the READMEs define metric *names* (e.g., reservation counters, import/job
counters, duration metrics) as designed observability instrumentation. No numeric values exist,
so the site may describe the *instrumentation design* but never displays metric names as
achieved outcomes.

### 3.9 Existing visual assets
- Certificate image (approved for display; to be exported as an optimized web asset).
- Resume PDF (approved for public download; hosted as the download asset).
- **To be authored during the build (owner directive):** one custom SVG architecture diagram
  per project, in the site's engraved technical-drawing style, derived from each README's
  architecture/workflow text; used as project thumbnails, case-study headers, and no-WebGL
  plates. No screenshots exist or are required.

## 4. Unsupported-Claim Exclusions

The following will **not** appear anywhere on the site, because no current-session source
supports them:
- Employers, clients, freelance engagements, internships other than the Forage **simulation**.
- Deployment claims for ProcureFlow / SlotSure / DealerSync ("deployed", "live", "in
  production", demo links) — owner confirmed they are not deployed. "Production-grade" is the
  only permitted strength wording (resume + owner authorization).
- User counts, traffic, revenue, uptime, latency numbers, or any numeric outcome/metric values.
- Public-repository claims for the three backend projects (repos are private; links go to the
  GitHub profile only).
- AI/ML expertise, AI/ML projects, AI/ML certifications, or completed ML work (learning intent
  only, per §3.7). Helios Protocol is presented as an interactive storytelling web experience —
  not as an AI project.
- Testimonials, team-leadership claims (Helios is honestly presented as a two-person team
  effort — "team Spring Storm with Prakhar Chaudhary" — without leadership claims).
- Certifications beyond the Forage simulation and the hackathon certificate.
- Any project not in the current-session uploads (no legacy or archived projects).
- The previous portfolio URL (dhruv-bamal-portfolio.vercel.app) — owner directed that it must
  not appear anywhere on the new site; it is added to the content denylist (§23).

## 5. Missing-Content TODOs

| # | Item | Placement | Status / handling |
|---|---|---|---|
| T1 | New custom domain — owner will purchase one; name TBD. The old vercel.app URL is retired and never appears on the site | Metadata, canonical URL, footer | `TODO: Owner input required` — build uses a single placeholder domain constant, swapped once purchased |
| T2 | OG/social share image | Metadata | **Deferred by owner** (2026-09-01) — not a v1 requirement; revisit post-launch if needed |
| T3 | Per-project public repo URLs | Case-study "Source" blocks | **Reserved slots confirmed by owner** — repos will be made public in the future; profile link + "private, available on request" wording until each URL lands |
| T4 | Favicon / mark | Header, metadata | **Resolved — authored** at `public/favicon.svg`: the escape-wheel mark (brass wheel on void tile, one released tooth in paper white); ICO/PNG fallbacks generated at build |

No other content gaps remain; all eight blocking questions were answered (§6).

## 6. Required Owner Input

All eight questions were asked and **answered by the owner in this session**; recorded here so
the implementation phase inherits them as decisions:

1. **Project source links?** Repos are **private**. Every project "Source" action links to the
   GitHub profile: github.com/dhruv-bamal. Copy never implies public code.
2. **Resume vs certificate event naming?** **Same event.** Canonical presentation: "1st Place —
   Prompt Rachna 2.0 (Techstacy 2.0 Hackathon)", with the certificate shown as the artifact.
3. **Certificate display?** **Yes**, displayed art-directed within the research paper's rules
   (lazy-loaded, alt-texted, integrated into the visual world).
4. **Phone & CGPA?** **Show both** — phone in Contact, CGPA in About/Education.
5. **Resume download?** **Yes, public.** The uploaded resume PDF is hosted as the download.
6. **Project imagery?** **Author custom SVG architecture diagrams** per project (engraved
   technical-drawing style) and use them as thumbnails/case-study art.
7. **Deployment status wording?** Projects are **not deployed**; present them as
   **production-grade** (authorized), with no live/demo claims.
8. **Helios Protocol?** Full details supplied (team, venue, judges, features) plus public
   live-demo and repository links — used in Achievements (§3.6).

**Follow-up directives (owner, 2026-09-01, second round):**

9. **Domain:** a new custom domain will be purchased for this site; the previous
   dhruv-bamal-portfolio.vercel.app URL must not be included anywhere on the new site
   (T1 stays open only for the new domain name).
10. **Favicon:** authored now — the escape-wheel mark at `public/favicon.svg` (T4 resolved).
11. **Repo links:** keep reserved slots in every case study — the repos will be made public
    in the future (T3 confirmed as designed).
12. **OG/social image:** leave out for now; a future consideration only (T2 deferred).

Remaining open item: T1 (domain name). Nothing blocks implementation.

## 7. Original Creative Concept

### EXACTLY ONCE

**One-sentence creative thesis:** *A colossal precision instrument that never counts twice —
the visitor winds it by scrolling, passes through its escape wheel, and finds each of Dhruv's
systems working inside it as a jeweled complication.*

**Narrative premise.** A monumental open "movement" — escape wheel, balance, gear trains, and
three jeweled complications — hangs in a dark void, lit like a museum exhibit. Scrolling winds
the mechanism. The flagship transition carries the camera between the spokes of the escape
wheel at the exact instant the pallet releases one tooth: *you enter exactly once.* Inside is
the movement hall, where the portfolio's chapters live. At the end, the instrument strikes
(a purely visual, silent chime), the case closes, and the back plate is engraved with Dhruv's
contact details.

**Why this concept is grounded and original.** Idempotency, "exactly once," state machines,
row-level locks, and audit trails are verbatim guarantees in the three READMEs. An escapement
is the physical, centuries-old embodiment of "exactly once" — one tooth per beat, never two.
The metaphor is therefore *true* rather than decorative, yet nothing on screen is a server,
terminal, or dashboard: the world is sculptural and cinematic, satisfying the research paper's
"living sculptural machine moving through impossible rooms" archetype and its
concept-before-effects principle. It avoids every banned default (no dark-template-with-blobs,
no glass cards, no logo walls, no fade-up-card grid).

**Emotional progression (Hero → Contact):** curiosity (what is this machine?) → passage
(crossing the wheel — commitment) → comprehension (the complications are real systems) →
confidence (evidence: achievements, skills) → possibility (parts recombine into what he can
build next) → invitation (the strike; the engraved plate).

**Interaction philosophy:** the visitor is the mainspring. Nothing advances without their
input; everything that advances does so exactly once and can be reversed by unwinding
(scrolling back). Major motion is cinematic and damped; controls are instant and tactile.

**Audio policy:** the experience requires **no audio** anywhere. "Chime" and "strike" are
visual events (light, motion, type).

## 8. Art Direction

- **World in one line:** a horologist's impossible exhibit hall — machined brass, black void,
  paper-white workbenches.
- **Contrast system (paper §2):** monumental display serif vs. tiny mono dial-labels; dark
  cinematic 3D chapters vs. high-key editorial reading spreads; slow damped camera vs.
  instant micro-interactions; dense engraved detail vs. near-empty voids between chapters.
- **Geometry:** precise, machined, radial — wheels, arbors, ratchets, combs, drums. No organic
  blobs, no floating abstract spheres.
- **Light:** theatrical exhibit lighting — one key light per scene, soft rim on brass edges,
  jewel accents self-illuminated at low intensity; interior hall lit as if by the jewels.
- **Texture:** brushed-metal anisotropy, engraved hairlines, smoked glass; restrained — texture
  supports the material world (paper §7), never becomes noise.
- **Signature repeated behaviors (paper: pick one or two and repeat):** (1) the *beat* — motion
  quantized to escapement ticks; (2) the *jewel-refraction threshold* — the same refractive
  shader marks every major crossing (flagship entry, case-study entry, contact strike).
- **Derivative-stack avoidance (paper §2):** no purple-gradient glassmorphism, no particle
  trails, no generic grain overlay, no cursor trail, no tech-logo wall.

## 9. Persistent 3D Protagonist

**"The Instrument"** — one continuous mechanical movement, custom-built and original
(procedural geometry + Blender-authored parts; license-clean by construction, per the paper's
custom-asset guidance).

**Anatomy:** central escape wheel + pallet fork; balance wheel with hairspring; mainspring
barrel; going train (gear chain); three jeweled complications (ruby / sapphire / citrine);
hammers + gong ring (for the final strike); case halves and engraved back plate.

**State per chapter:**

| Chapter | Instrument state |
|---|---|
| Hero | Assembled, suspended ¾ view; idles at one beat per ~2s; jewels dim |
| Flagship transition | Escape wheel becomes the world; pallet releases one tooth; camera passes through |
| About | Interior hall; mainspring barrel dominant — the energy source; slow uncoiling as the camera drifts |
| Achievements | Struck medallions presented on plinths; hammers at rest behind them |
| Skills | Full exploded view along an axis; parts grouped by the resume's nine clusters |
| Projects & Work | Each complication assembles and *runs its true mechanism* (see §13/§15) |
| What I Can Build | Loose parts drift, then assemble into three abstract new complications |
| Contact | Reassembly; the strike (hammers rise and fall silently, light blooms); case closes; engraved back plate faces the visitor |

The protagonist never becomes static decoration: every chapter changes its configuration,
camera relationship, or running behavior (paper §3.1).

## 10. Visual World Definition

- **Spaces:** (1) the **Void Gallery** — exterior exhibit space (hero, flagship approach);
  (2) the **Movement Hall** — interior world containing About → What I Can Build; (3) the
  **Workbenches** — paper-white editorial planes that slide in for sustained reading and case
  studies; (4) the **Back Plate** — contact finale.
- **Camera language (paper §5):** slow dolly for approach; orbit for inspection (Skills,
  complications); point-of-view travel for the flagship pass; sudden scale shift when the
  wheel becomes architecture; framed reveals as gears occlude and disclose content. The camera
  is always directed — no free-floating drift.
- **Scale logic:** the instrument reads hand-sized in the hero and cathedral-sized inside —
  the flagship pass performs the scale inversion.
- **DOM/canvas relationship (paper §5):** all real content is semantic DOM; the canvas
  provides depth, material, and cinema. DOM type aligns to 3D surfaces at set pieces; canvas
  objects pass in front of/behind DOM text for depth; hovering DOM project titles tints the
  scene's jewel accent.

## 11. Information Architecture

- **Home (`/`)** — single cinematic scroll narrative, seven anchored chapters:
  `#hero` → (flagship transition) → `#about` → `#achievements` → `#skills` → `#work`
  (three complication scenes) → `#build` → `#contact`.
- **Case studies** — `/work/procureflow`, `/work/slotsure`, `/work/dealersync` (deep-linkable,
  direct-entry safe; each renders fully without the home transition having played).
- **Utility routes** — resume download (static PDF asset); 404 styled as a "missing tooth"
  plate (content-complete, navigable home).
- **Content precedence:** every chapter's copy is short on the home narrative and complete in
  case studies / editorial spreads — the cinematic layer never withholds information
  (paper §10: no waiting for animation to access key text).

## 12. Navigation System

- **Persistent minimal header** (paper §4 table): name mark (the authored escape-wheel mark
  from `public/favicon.svg` + "Dhruv Bamal"), chapter-index button, "Contact", "Resume ↓". Header recedes to a hairline
  during pinned scenes and returns on free scroll.
- **Chapter index overlay:** a full-screen art-directed **movement diagram** — the instrument
  drawn as an engraved schematic; each labeled part is a link to its chapter/route. Keyboard
  operable, focus-trapped, `Esc` closes.
- **Progress artifact (paper §3.7):** a small winding dial (bottom edge) showing chapter
  position as mainspring tension — not a generic progress bar.
- **In-case-study nav:** prev/next complication links + "Back to the Instrument" (returns to
  `#work` anchor).
- **Baseline:** all navigation also exists as plain anchor links; browser history and deep
  links behave normally (paper §10).

## 13. Section-by-Section Storyboard

Global rules for every section: audio is never required (silent by design); all copy is
semantic DOM; reduced-motion and no-WebGL variants preserve 100% of content; every pinned
scene has a visible skip control and releases scroll at both ends; keyboard focus order
follows reading order.

### 13.1 Hero
- **Content (sources: resume):** `DHRUV BAMAL` monumental; mono meta line "Backend Engineer —
  Ghaziabad, IN"; one-line positioning drawn from the resume summary (systems design,
  transaction safety, Node.js/TypeScript/PostgreSQL/Redis); cue label "scroll to wind".
- **Hierarchy:** name → role/meta → cue.
- **Composition:** name set full-bleed across the viewport; the Instrument floats center-right,
  overlapping the type's baseline (grid violated deliberately, paper §4).
- **3D state:** assembled instrument, one beat per ~2s; jewels glint on beat.
- **Camera:** static ¾ with ≤2° pointer parallax (desktop only).
- **Scroll:** free scroll for one viewport, then the flagship pin begins.
- **Type:** display serif at maximum scale; mono meta pinned to grid lines.
- **Cursor:** default dot; over the instrument → ring + "Wind".
- **Hover:** instrument tilts ≤2°; beat highlights.
- **Keyboard/focus:** skip-intro link is the first focusable element ("Skip to content").
- **Mobile/touch:** no parallax; shorter type; beat animation retained.
- **Reduced motion:** static composed frame; beat replaced by a subtle opacity pulse ≤1/2s or
  none; cue reads "scroll to continue".
- **No-WebGL:** engraved SVG plate of the instrument (Patent Drawing Edition hero).
- **Transition out:** into §14 (flagship).

### 13.2 About
- **Content (sources: resume + owner statement):** final-year B.Tech CSE at SRM IST Ghaziabad
  (2023–2027, CGPA 7.35/10); backend focus and systems-design thinking; 200+ DSA problems in
  C++; Forage YC startup **simulation**; one forward line: currently strengthening backend
  fundamentals and exploring AI/ML foundations (learning intent wording only).
- **Composition:** first Workbench spread — paper-white plane slides across the hall; hard
  black text; the mainspring barrel looms behind in soft focus, uncoiling slowly.
- **3D state:** Movement Hall established; mainspring dominant.
- **Camera:** slow lateral drift bound to scroll (free scroll, no pin).
- **Type:** editorial — display headline "Wound by hand." styled question of energy/origin;
  text face for body; mono margin notes (education dates, CGPA) on grid lines.
- **Cursor:** native text cursor over copy (paper §3.5: keep native behavior where needed).
- **Hover/keyboard/touch:** margin notes expand on hover/focus/tap for detail.
- **Reduced motion / No-WebGL:** static barrel plate; full text immediately.
- **Transition:** the workbench slides off; hammers rise into frame → Achievements.

### 13.3 Achievements
- **Content (sources: §3.6):** lead exhibit — 1st Place, Prompt Rachna 2.0 (Techstacy 2.0
  Hackathon), team Spring Storm with Prakhar Chaudhary, virtual round → live finals at Unstop
  HQ, Saket, Delhi, 100+ participants; Helios Protocol summary + feature list; live-demo and
  repo links (section's only external links); certificate displayed as a framed, engraved
  plate (lazy-loaded image, full alt text). Supporting medallions: 200+ LeetCode in C++;
  Forage YC simulation.
- **Composition:** three struck medallions on plinths in the hall; the hackathon medallion is
  double-size with the certificate plate beside it.
- **3D state:** hammers at rest behind plinths (they struck these medallions).
- **Camera:** short pinned sequence — dolly past each plinth (3 beats), then release.
- **Type:** engraved-style headline treatment; mono captions (date, venue, team).
- **Cursor:** ring + "Inspect" over medallions; "Visit ↗" over external links.
- **Hover/focus:** medallion tilts to reveal engraved reverse (detail text); links underline
  with displacement.
- **Mobile:** vertical stack; tap to flip medallions.
- **Reduced motion:** medallions pre-flipped where focused; no dolly — sections fade in
  instantly.
- **No-WebGL:** medallions as engraved SVG plates; certificate as a plain framed image.
- **Transition:** camera rises; the movement pulls apart along its axis → Skills.

### 13.4 Skills
- **Content (source: resume, §3.5 clusters verbatim):** the nine clusters with their items.
- **Composition:** full exploded view of the Instrument; each part-group labeled by a mono
  callout naming a cluster; a side column lists the active cluster's items as DOM text.
- **3D state:** exploded along a diagonal axis; parts idle-rotate almost imperceptibly.
- **Camera:** pinned orbit — scroll scrubs a 90° arc across the exploded view.
- **Scroll:** pinned for the arc; skippable.
- **Type:** cluster names in display size; items in text face; indices in mono.
- **Cursor:** ring + "Illuminate" over part-groups.
- **Hover/focus/tap:** activating a cluster lights its parts, dims others, and swaps the side
  column; keyboard cycles clusters with arrow keys; every cluster's items are also in the DOM
  list regardless of interaction (no hover-only content).
- **Mobile:** horizontal snap-scroll of cluster cards under a fixed exploded-view render.
- **Reduced motion:** static exploded render; clusters as an accessible accordion.
- **No-WebGL:** exploded-view engraved SVG plate with numbered callouts; same accordion.
- **Transition:** parts re-collapse and the first jewel flares ruby → Projects & Work.

### 13.5 Projects & Work
The deepest treatment. Three sequential pinned complication scenes; each jewel accent tints
scene light and UI accents. Detailed model in §15; storyboard summary:

- **ProcureFlow — the Approval Train (ruby).** A request-token enters the going train and
  advances through pallet-gates labeled by role and amount threshold (Manager → Finance →
  Owner, from the README workflow). One scripted pass shows a rejection: the token is turned
  back, **and the audit ring engraves the event anyway** — the immutable audit trail made
  visible. Copy: problem → mechanism → stack → scope honesty (§3.8). CTA: "Open case study."
- **SlotSure — the Reservation Escapement (sapphire).** A tooth is caught by the pallet
  (`held`) while an expiry dial winds down; it either seats fully (`confirmed`) or springs
  back (`expired`) restoring capacity **exactly once**; a second attempt at an invalid
  transition visibly refuses (state machine from the README). A twin tooth demonstrates the
  concurrency race: two arrive, one wins.
- **DealerSync — the Sorting Barrel (citrine).** A rotating drum feeds row-pins through a
  validation comb; valid pins seat into the order wheel; invalid pins drop into labeled trays
  ("SKU unknown", "duplicate order ID", "invalid quantity" — README validation examples); a
  progress dial fills; a scripted retry pass re-runs the drum **without duplicating seated
  pins** (idempotent workers).

Per-scene specs: pinned scroll-scrub of the mechanism's single demonstration loop (forward =
run, backward = unwind); DOM copy panel synchronized to loop phases; mono endpoint-style
labels used sparingly as engraved captions; cursor ring + "Open case study" on the CTA;
keyboard: scene reachable and skippable, CTA focusable, demonstration described via visually
hidden text; mobile: shorter loops, tap-to-advance phases; reduced motion: three composed
stills (start/decision/outcome) with full copy; no-WebGL: the project's authored SVG
architecture diagram + copy. Transition between scenes: the current jewel dims as the next
flares; transition into a case study: shared-element expansion (§14 notes, §15).

### 13.6 What I Can Build
- **Content (derived strictly from §3.5 + §3.8 capabilities; no new claims):**
  transaction-safe REST APIs; multi-tenant systems with RBAC and audit trails;
  reservation/capacity logic with idempotency guarantees; asynchronous import/exception
  pipelines with BullMQ workers; Dockerized, CI-tested backends (GitHub Actions); plus the
  forward-looking AI/ML learning line (intent wording only).
- **Composition:** loose parts drift in the void, then assemble into three abstract *new*
  complications (unnamed, clearly hypothetical) as the visitor scrolls; each assembly pairs
  with one capability statement.
- **Camera:** gentle push-in per assembly (short pin, 3 beats).
- **Cursor/hover:** hovering a capability statement pre-assembles its parts.
- **Mobile/reduced/no-WebGL:** capability list as an editorial spread; assemblies as engraved
  vignettes or omitted.
- **Transition:** all parts fly home to the reassembling Instrument → Contact.

### 13.7 Contact
- **Content (sources: resume + owner approvals):** email (mailto + copy-to-clipboard), phone
  +91 9810505413, LinkedIn, GitHub, resume download (hosted PDF). Short invitation line in
  neutral voice (no invented availability/rate claims).
- **Composition:** **the Strike** — hammers rise and fall (silent; light bloom on the gong
  ring), dials align, the case closes, and the engraved **back plate** fills the frame with
  the contact details as engraved DOM text.
- **3D state:** full reassembly → strike → case closed; then a resting one-beat idle continues
  (the world stays alive behind the plate).
- **Camera:** pulls back through the hall, out past the wheel (a brief reversed echo of the
  flagship pass), settling on the back plate.
- **Type:** engraved display for the invitation; mono for the details rows.
- **Cursor:** magnetic on the two primary actions (Email, Resume).
- **Keyboard:** all actions are real links/buttons; visible brass focus ring.
- **Mobile:** plate is a simple full-width panel; tap targets ≥44px.
- **Reduced motion:** straight cut to the back plate.
- **No-WebGL:** engraved SVG back-plate panel.
- **End state:** no further scroll; footer hairline with © name and the new custom domain
  (TODO T1 — placeholder constant until purchased; the retired vercel.app URL never appears).

## 14. Flagship Cinematic Transition Storyboard — "Through the Escape Wheel"

The signature interaction (paper §3.2–3.3), between Hero and About.

1. **Entry composition:** instrument ¾ view; escape wheel visibly beating; hero type standing
   in front of it in space.
2. **Affordance:** mono cue "scroll to wind" plus a winding progress arc around the wheel
   hub; the arc fills with scroll progress so control is legible at all times.
3. **Stage 1 (progress 0–0.35):** camera dollies toward the wheel; the name's letters divide
   and slide apart along the spoke lines (kinetic type as architecture, paper §3.4); meta
   text dissolves.
4. **Stage 2 (0.35–0.75):** the wheel grows past architectural scale; spokes sweep the frame
   in beat-quantized steps; the jewel-refraction shader ramps at the rim; depth increases via
   controlled focus, not motion blur.
5. **Threshold (0.75–0.85):** the pallet releases **one tooth** — in that single beat the
   camera slips between two spokes. One decisive crossing frame: brief chromatic split
   (transition-only effect, paper-sanctioned) and a light-field wipe.
6. **Stage 3 (0.85–1.0):** the Movement Hall settles into place; scale has inverted (the
   mechanism is now the world); the About workbench approaches; the pin releases into free
   scroll.
7. **Reverse:** scrolling up replays everything backward exactly; the wheel expels the camera
   on a beat (scroll-scrub symmetry, paper §3.2).
8. **DOM synchronization:** hero type transforms and About copy fades in on the same
   ScrollTrigger progress value; no content exists only inside the canvas.
9. **Desktop:** full sequence, ~2.5 viewport-heights of pinned scroll.
10. **Mobile:** ~1.5 viewport-heights; no pointer parallax; identical narrative beats.
11. **Reduced motion:** a two-frame crossfade (exterior still → interior still) triggered at
    the same scroll boundary; all content immediately available; skip link unnecessary but
    present.
12. **No-WebGL:** a pair of engraved poster plates (outside/inside) with a hairline "you are
    here" seam; normal scrolling.
13. **Escape routes:** "Skip" control visible during the pin; `Esc` and the skip link jump to
    `#about`; header/menu remain reachable (paper §6 scroll-jacking rules).
14. **Technical strategy:** one R3F camera bound to a GSAP ScrollTrigger timeline synced
    through Lenis; a single coordinated frame loop; the wheel's high-detail rim geometry
    loads only for this scene and is disposed after (kept if the user is likely to reverse —
    heuristic: keep while `#about` is in view).
15. **Performance risks & mitigations:** fill-rate spike during the fullscreen shader ramp →
    cap DPR during the ramp, pause hall rendering until the threshold; touch scroll-fighting →
    shorter pin, larger release margins; low-tier devices → the adaptive tier replaces the
    shader ramp with a masked 2D wipe over the same camera path.

## 15. Project Gallery and Case-Study Plan

- **Gallery model:** not a card grid — a sequential *chamber walk* (the three pinned
  complication scenes of §13.5), navigable also from the movement-diagram menu and by anchor
  links. A compact DOM list (title, one-liner, stack, accent) exists above the scenes for
  scanning, printing, and assistive access — the maximal visuals never replace the clear
  textual index (paper §3.6).
- **Entry transition (unique):** activating "Open case study" locks the complication's jewel
  in the frame center; the jewel's refraction fills the viewport (the signature threshold
  behavior) and resolves into the case study's paper-white workbench, whose header diagram
  occupies the same spatial origin (shared-element continuity, paper §4). Direct URL entry
  skips this and renders the workbench immediately.
- **Case-study template (`/work/[slug]`):** paper-white editorial route with hard black type:
  1. Header: project name, one-line description, jewel accent rule, **authored SVG
     architecture diagram** (engraved technical-drawing style; also the project's thumbnail
     asset site-wide).
  2. Problem (README).
  3. Solution (README).
  4. Target users (README).
  5. Core workflow — rendered as an engraved step-strip (README arrows preserved).
  6. The mechanism — the project's signature algorithm/state machine, annotated
     (SlotSure: 9-step booking algorithm + state machine; ProcureFlow: approval routing +
     audit; DealerSync: batch pipeline + import states).
  7. Engineering decisions — security/integrity lists (README).
  8. Testing story — the concurrency/idempotency scenarios (README), presented as "proofs".
  9. Observability — instrumentation *design* (metric names as designed telemetry, explicitly
     not results).
  10. Scope boundaries — the README's honesty section, kept prominent (differentiator).
  11. Future improvements (README).
  12. Stack table (README).
  13. Source — GitHub profile link with wording "Repository private — source available on
      request via GitHub" (owner directive); slot reserved for future public URL (TODO T3).
  14. Prev/next complication nav + return to the Instrument.
- **Deep linking:** every route and every home chapter anchor is directly addressable and
  renders complete content on first load.

## 16. Typography System

Fresh selection for this concept (roles per paper §7); all faces free via Google Fonts with
licensed upgrade paths noted as options:

- **Display — Instrument Serif:** high-contrast display serif for the name, chapter titles,
  and engraved headlines. (Option: a licensed Signifier/Ivar-class serif later.)
- **Text — Schibsted Grotesk:** body copy, case-study prose. (Option: Suisse-class grotesk.)
- **Utility — IBM Plex Mono:** dial indices, timestamps, endpoint-style captions, metadata,
  cue labels.
- **Scale (clamp-based):** Display-XL ~ clamp(4rem → 9vw → 11rem) hero name; D1 ~
  clamp(3rem → 6vw → 6.5rem); H2 2.5rem; H3 1.75rem; body 1.0625–1.125rem/1.65; caption
  0.875rem; mono-meta 0.75–0.8125rem tracked +0.06em.
- **Hierarchy rules:** display serif never used below H3; mono never used for paragraphs;
  body text never set on the void background (reading happens on paper spreads).
- **Kinetic type (paper §3.4, used sparingly):** hero name splits along spoke lines during
  the flagship pass; chapter numerals rotate/settle like dial numerals; case-study titles
  expand from the shared-element transition. Body copy is never animated while readable.
- **Loading:** self-hosted WOFF2 subsets, `font-display: swap` with metric-compatible
  fallbacks to prevent CLS.

## 17. Layout System

- **Grid:** 12-column fluid grid, 4px base unit; gutters 16/24/32px by breakpoint; max
  reading measure 68ch on workbench spreads.
- **Spacing scale:** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96 · 128 · 192px.
- **Breakpoints:** sm 640 · md 768 · lg 1024 · xl 1280 · 2xl 1536 (desktop-first cinematic
  scenes, mobile-first editorial spreads).
- **Grid violation (deliberate, paper §4):** hero name exceeds the grid full-bleed; the
  instrument overlaps section boundaries during transitions; workbench spreads snap strictly
  back to the grid — the alternation is the layout rhythm.
- **Rules & lines:** 1px hairlines ("engravings") for dividers, margins notes, and diagram
  strokes; corner radius 0 (machined edges) except pill CTAs (radius full).
- **Shadow:** none decorative; only a soft contact shadow beneath 3D objects.

## 18. Color, Material, and Lighting System

**Color tokens (roles first; values are the working proposal):**

| Token | Value | Role |
|---|---|---|
| `void` | #0C0C10 | Cinematic chapter background |
| `void-deep` | #08080B | Flagship threshold, vignettes |
| `paper` | #F6F4EF | Editorial/workbench background |
| `ink` | #16151A | Text on paper |
| `paper-dim` | #E9E6DE | Panel fills, table stripes on paper |
| `text-on-void` | #EDEBE6 | Short DOM labels over void |
| `brass` | #C9A96A | Highlights, focus ring, progress dial |
| `steel` | #9BA0A8 | Secondary metal, disabled states |
| `ruby` | #C4384F (text-safe #A32B40) | ProcureFlow accent |
| `sapphire` | #3D6FBF (text-safe #2F5493) | SlotSure accent |
| `citrine` | #C98B2D (text-safe #8F6317) | DealerSync accent |

Accent logic (paper §7): project accents are *jewel* colors — used for scene light tint, UI
accents, diagram highlights; text-safe variants guarantee WCAG AA on paper. Spectral effects
(chromatic split) are reserved exclusively for threshold moments.

**Materials:** brushed brass and steel (anisotropic highlight), smoked glass (case),
low-emissive jewel glass (refraction at thresholds), matte black plinth. Rule: metals must
read as machined and premium at every tier; if a material reads cheap on a device tier, the
tier substitutes the engraved-SVG treatment rather than a degraded material.

**Lighting:** one key light + soft rim per scene (baked where static); jewels as low-intensity
accent emitters; the Movement Hall's ambient derives from the active chapter's accent;
no bloom-heavy post stack — post-processing is limited to the threshold chromatic split and
subtle vignette, both tier-gated.

## 19. Motion System

- **Personality:** mechanical. Cinematic moves are slow and damped; mechanisms advance in
  discrete *beats*; micro-interactions are instant (paper §3.7).
- **Duration tokens:** `micro` 120–200ms · `ui` 300–500ms · `scene` 800–1200ms ·
  `cinematic` scroll-scrubbed (no fixed duration) · `beat` = 2s idle tick.
- **Easing set:** `settle` cubic-bezier(0.22, 1, 0.36, 1) for arrivals; `damp`
  cubic-bezier(0.45, 0, 0.15, 1) for camera; `pallet-snap` — a custom snap-with-1-frame
  overshoot ease for beat advances (authored via GSAP CustomEase); linear mapping for all
  scroll-scrubbed timelines.
- **Springs:** magnetic CTA ~ stiffness 220 / damping 18; medallion tilt ~ stiffness 150 /
  damping 14 (or Framer-style equivalents if implemented in CSS/WAAPI).
- **Scroll velocity behavior:** Lenis lerp ~0.1 desktop, ~0.16 touch; velocity influences
  only cosmetic glint intensity — never layout, readability, or content timing.
- **Transition rules:** chapter transitions use shared spatial logic (object carries over,
  jewel threshold, or workbench slide) — default crossfades are banned except in the
  reduced-motion tier, where they are the rule.
- **Choreography discipline:** one element of a composition moves at a time during reading
  moments; full-scene motion only in pinned cinematic scenes.

## 20. Interaction System

- **Cursor states (paper §3.5):** `default` small dot; `interactive` ring + label ("Wind",
  "Inspect", "Illuminate", "Open case study", "Visit ↗", "Copy"); `magnetic` on primary CTAs
  (Email, Resume, Open case study); `drag` (horizontal skill-card strip on mobile only —
  cursor suppressed there anyway); native cursor preserved over body text, forms, and links
  in editorial spreads. Custom cursor is fully disabled on touch and under
  `prefers-reduced-motion`.
- **Hover:** always cosmetic-plus — every hover reveal has a focus and tap equivalent, and
  the revealed content also exists in DOM flow.
- **Focus:** brass 2px ring, offset 2px, on every interactive element; `:focus-visible` only.
- **Buttons:** rest → hover (brass underline sweep + magnetic ≤6px) → active (1-beat "tick"
  compression) → focus ring → disabled (steel, no motion).
- **Links:** hairline underline; hover displaces underline 1px with accent color; visited
  states unstyled (single-session narrative).
- **Cards/medallions/plinths:** rest → hover tilt ≤6° + accent rim → active flip/expand →
  focus ring identical to hover affordance.
- **Forms:** contact uses mailto + copy-to-clipboard buttons (no server form in v1) —
  "Copied" confirmation appears as an engraved stamp animation + ARIA live announcement.
- **Loading states:** the winding indicator — a small arc that fills per beat (used for
  route transitions and lazy 3D scenes); skeleton = engraved outline plates.
- **Error states:** 404/failed-asset plates in the engraving style with plain-language copy
  and a home link; WebGL context loss → automatic downgrade to Patent Drawing Edition with a
  quiet notice.
- **Keyboard map:** Tab order = reading order; arrow keys cycle skill clusters; `Esc` exits
  overlay menu and skips any pinned scene; skip-intro is the first tab stop.

## 21. Component Tree

- `AppShell`
  - `Providers` — Lenis scroll, quality-tier context, reduced-motion context, cursor context
  - `Header` — `NameMark`, `IndexButton`, `ContactLink`, `ResumeLink`
  - `MovementDiagramMenu` (overlay chapter index)
  - `WindingDial` (progress artifact)
  - `CustomCursor` (desktop, non-reduced only)
  - `CanvasRoot` (persistent R3F canvas; portal-layered behind/above DOM as needed)
    - `InstrumentScene` — `EscapeWheel`, `PalletFork`, `BalanceWheel`, `MainspringBarrel`,
      `GoingTrain`, `HammersAndGong`, `CaseAndBackPlate`
    - `Complications` — `ApprovalTrain` (ruby), `ReservationEscapement` (sapphire),
      `SortingBarrel` (citrine)
    - `ScrollCameraRig` (ScrollTrigger-bound timelines)
    - `QualityManager` (tier detection: DPR, GPU class, reduced-motion, WebGL support)
    - `Materials` — `BrushedMetal`, `SmokedGlass`, `JewelRefraction`
  - Home page sections (semantic DOM): `HeroSection`, `FlagshipPinSection`, `AboutSection`,
    `AchievementsSection` (`Medallion`, `CertificatePlate`), `SkillsSection`
    (`ClusterCallout`, `ClusterAccordion`), `WorkSection` (`ComplicationChapter` ×3,
    `WorkIndexList`), `BuildSection` (`CapabilityAssembly`), `ContactSection`
    (`BackPlate`, `CopyButton`)
  - Case-study route: `CaseStudyLayout` — `DiagramHeader` (authored SVG), `WorkflowStrip`,
    `MechanismFigure`, `DecisionList`, `ProofList` (testing story), `ScopePlate`,
    `StackTable`, `SourceNote`, `PrevNextNav`
  - Fallback: `PatentPlate` (per-chapter engraved SVG), `StaticPoster`, `NoScriptContent`

## 22. File Structure

- `app/` — `layout`, `page` (home), `work/[slug]/page`, `not-found` (OG image deferred per T2)
- `components/` — `sections/`, `three/`, `ui/`, `fallback/`
- `lib/` — `content/` (typed data, see §23), `hooks/` (scroll, tier, reduced-motion),
  `motion/` (timeline definitions, eases), `seo/`
- `shaders/` — brushed-metal, jewel-refraction, threshold-wipe (GLSL modules)
- `public/` — `favicon.svg` (**authored** — escape-wheel mark; ICO/PNG fallbacks generated at
  build), `resume/dhruv-bamal-resume.pdf`, `certificate/…`, `diagrams/procureflow.svg`,
  `diagrams/slotsure.svg`, `diagrams/dealersync.svg`, `models/…` (compressed GLB), `fonts/…`
- `tests/` — unit (content-lint, tier logic), e2e (Playwright journeys), a11y (axe), perf
  (Lighthouse budgets)
- Root: `PORTFOLIO_PLAN.md` (this file), config files added at implementation time.

## 23. Content Data Schema

Typed data files (TS/JSON) in `lib/content/` — no CMS; content compiled from the uploaded
sources. Every record carries a `source` field naming its origin (resume | procureflow-readme
| slotsure-readme | dealersync-readme | certificate | owner-session-answer). Schema described
(no code):

- **identity** — name, roleHeadline, location, email, phone, links{linkedin, github, site},
  summaryLine, source refs.
- **education** — degree, institution, years, cgpa, source.
- **experience[]** — title, program, kind:"simulation", description, source.
- **skills[9]** — clusterName, items[], instrumentPartGroup (3D mapping), source.
- **achievements[]** — title, detail, date, venue, team[], links{demo?, repo?},
  certificateAsset?, source.
- **projects[3]** — slug, name, oneLiner, accent(jewel), problem, solution, targetUsers[],
  workflowSteps[], mechanism{type: approval-train | reservation-escapement | sorting-barrel,
  steps[], states[]}, decisions[], proofs[] (testing story), instrumentationNote,
  scopeBoundaries, futureImprovements[], stack[{layer, tech}], sourceLink{href: github
  profile, note: "repository private"}, diagramAsset, source.
- **capabilities[]** — statement, derivedFrom[] (project/skill refs), source.
- **aiMlIntent** — single neutral learning-intent string, source: owner-session-answer.
- **chapters[]** — id, anchor, title, sceneState, narrativeCopy refs.
- **Content-lint test (QA rule):** every fact-bearing record must include a non-empty
  `source`; a denylist test fails the build if excluded-claim vocabulary appears ("deployed",
  "in production", "users", "clients", numeric metric values, "AI/ML expert", the retired URL
  "dhruv-bamal-portfolio.vercel.app", etc.) outside approved contexts.

## 24. Technical Stack

| Concern | Choice (paper §11 alignment) |
|---|---|
| Framework | Next.js (App Router) + TypeScript |
| 3D | Three.js + React Three Fiber + drei |
| Scroll & timelines | GSAP ScrollTrigger + Lenis (single synced loop) |
| UI micro-motion | CSS transitions + small GSAP tweens (no second animation framework) |
| Shaders | Custom GLSL modules via R3F shader materials; minimal tier-gated post-processing |
| Content | Typed TS/JSON data layer (§23) — no CMS |
| Assets | Blender → GLB/glTF → Draco/Meshopt + KTX2 (§25) |
| Testing | Jest (unit + content-lint), Playwright (journeys incl. reduced-motion & no-WebGL), axe (a11y), Lighthouse (budgets) |
| Deployment target | Vercel hosting behind the **new custom domain** (T1; the retired vercel.app URL is never shown; deployment execution out of scope for this plan) |

**Layer separation (paper's architecture mandate):** (1) semantic DOM content layer —
complete site meaning without canvas; (2) motion orchestration layer — GSAP/Lenis timelines
reading one scroll source of truth; (3) WebGL layer — R3F scenes subscribed to the same
progress values (no React re-render per frame); (4) fallback layer — Patent Drawing Edition
plates + posters, selected by `QualityManager`.

## 25. 3D Asset Pipeline

- **Authoring:** all geometry original — parametric/procedural where regular (wheels, teeth,
  combs via code-defined profiles) and Blender-authored where sculptural (pallet fork, case,
  hammers). No downloaded models or textures — license-clean by construction.
- **Export:** GLB/glTF; meshes Draco- or Meshopt-compressed; tangents baked where anisotropy
  needs them.
- **Textures:** KTX2/Basis; brushed-metal anisotropy driven procedurally in-shader where
  possible to avoid large maps; AO baked per hero asset; texture resolution proportional to
  on-screen size (paper §9).
- **Budgets:** instrument core ≤ ~1.5MB compressed; each complication ≤ ~800KB, lazy-loaded
  with its chapter; flagship rim-detail LOD loaded only for the pass.
- **LOD & instancing:** gear teeth and row-pins instanced; two LODs per hero part (cinematic /
  adaptive).
- **Disposal:** scene graph disposal on route change and after the flagship pass (subject to
  the reverse-scroll heuristic, §14.14); geometry/material reuse via shared caches.
- **Diagram assets:** the three engraved SVG architecture diagrams are authored in the same
  visual language (hairline strokes, mono labels) and optimized (SVGO) — they serve case-study
  headers, thumbnails, and the Patent Drawing Edition (OG imagery deferred per T2). The
  favicon (`public/favicon.svg`) is already authored in this language and anchors the mark
  system (header name mark, loading dial, 404 plate).

## 26. Performance Plan

- **Critical loading order:** (1) HTML + critical CSS + hero DOM type (LCP target — text, not
  canvas); (2) fonts (subset WOFF2, swap); (3) hero poster (lightweight engraved SVG/AVIF);
  (4) R3F runtime + instrument core (deferred, `requestIdleCallback`-gated); (5) flagship rim
  LOD on approach; (6) later chapters/complications lazy by intersection; (7) case-study
  assets on route intent (hover/focus prefetch).
- **Budgets:** ≤ ~1.5MB transferred before WebGL enhancement; ≤ ~4MB total for the full home
  journey on the full tier; LCP < 2.5s on mid-tier mobile; INP < 200ms; CLS ≈ 0 (fonts
  metric-matched, canvas absolutely positioned).
- **Quality tiers (paper §9, art-directed not degraded):**
  1. **Full immersive** — all scenes, threshold shader, DPR ≤ 2.
  2. **Adaptive immersive** — DPR ≤ 1.5, LOD-low parts, masked 2D threshold wipe, baked
     lighting only.
  3. **Reduced motion** — composed stills + instant transitions; beats become opacity pulses
     or nothing; full content.
  4. **No-WebGL / low-power — "Patent Drawing Edition"** — the entire narrative as engraved
     SVG plates with complete semantic content; framed as an intentional alternate edition.
- **Runtime discipline:** one rAF loop shared by Lenis/GSAP/R3F; scroll progress via refs
  (zero React re-renders per frame); render loop pauses when canvas off-screen or tab hidden;
  DPR re-clamped on resize; context-loss handler downgrades to tier 4 gracefully.
- **Measurement:** Lighthouse CI budgets per route; Playwright perf smoke on a throttled
  profile; real-device spot checks (mid-tier Android) before launch.

## 27. Accessibility Plan

- **Semantics:** one `h1` (hero name); strict heading hierarchy through chapters; landmarks
  (`header`, `nav`, `main`, section labels, `footer`); all meaning present as DOM text —
  canvas is `aria-hidden` decoration with per-chapter visually-hidden scene descriptions.
- **Keyboard:** everything operable — skip-intro first tab stop; `Esc` exits menu and pinned
  scenes; arrow-key cluster cycling has button equivalents; no keyboard traps; focus visibly
  managed across route transitions.
- **Focus visibility:** brass ring system-wide (§20), designed as part of the art direction.
- **Touch & hover:** no hover-only content; tap equivalents for every reveal; targets ≥44px.
- **Drag:** never mandatory; the mobile skill strip also scrolls natively.
- **Cursor:** custom cursor is enhancement-only; native behavior intact where expected.
- **Screen readers:** labels for all icon controls; medallions/complications described; the
  flagship pass announced via live region as a section change, not narrated frame-by-frame;
  certificate has full alt text; copy-to-clipboard announces confirmation.
- **Contrast:** all sustained reading on paper spreads at AA+; short on-void labels checked
  against `void` (AA large-text minimum); accent text uses text-safe variants (§18).
- **Motion preferences:** `prefers-reduced-motion` selects tier 3 globally (no parallax,
  inertia, or scrubbed cinematics); a manual "Reduce motion" toggle mirrors it in the menu.
- **Scroll-jacking boundaries (paper §6):** pins limited to the flagship, skills arc,
  complication scenes, and short achievement dolly; each shows progress, reverses naturally,
  and offers skip; free scroll elsewhere.
- **No-JS:** server-rendered DOM content and navigation remain readable and usable.
- **Deep links & history:** every chapter/route addressable; back/forward never trapped by
  animation state.

## 28. Responsive Plan

- **Desktop (lg+):** full cinematic experience; pointer parallax; custom cursor; 2.5vh
  flagship pin.
- **Tablet (md):** full scenes with adaptive-tier assets; touch interactions; no custom
  cursor; 2vh flagship pin.
- **Mobile (sm):** same narrative and world, tuned — shorter pins (~1.5vh flagship),
  tap-to-advance complication phases, reduced gear counts/instancing, vertical medallion
  stack, horizontal snap skill strip, back-plate contact as a simple panel; type scale floors
  keep the name monumental without overflow; all 3D framed for portrait.
- **Foldables/short viewports:** pins keyed to `svh` units; compositions verified at 320×568
  minimum.
- **Editorial spreads:** mobile-first flow; measures and margins adapt before any content is
  hidden — nothing is desktop-only.

## 29. Build Milestones

| M | Deliverable | Acceptance gate |
|---|---|---|
| M0 | Project scaffold, design tokens, typed content layer with source refs, content-lint test | Lint passes; all §3 facts encoded with sources |
| M1 | **DOM-first semantic site** — all 7 sections + 3 case studies readable end-to-end; authored SVG architecture diagrams; Patent Drawing Edition as the base layer | Full content journey with JS disabled; axe clean |
| M2 | Hero instrument + beat system on the persistent canvas | 60fps desktop / stable mid-tier mobile; LCP unaffected |
| M3 | Flagship wheel-pass prototype (desktop + mobile + reduced + no-WebGL variants) | Reversible scrub; skip/escape verified; tier switches verified |
| M4 | Complication scenes — SlotSure escapement proven first (hardest guarantees), then ProcureFlow train and DealerSync barrel | Each mechanism demonstrates its README behavior legibly |
| M5 | Case-study routes + shared-element entry transitions + deep-link entry | Direct URL entry renders complete; transition continuity verified |
| M6 | Remaining chapter scenes (About, Achievements, Skills, Build, Contact strike) + cursor + micro-interactions + menu/dial | Interaction spec §20 implemented |
| M7 | Performance tiers, budgets, disposal, context-loss handling; full a11y pass | §26 budgets met; §27 checklist green |
| M8 | QA vs §30, cross-device sweep, content accuracy audit | All acceptance criteria pass |

## 30. Acceptance Criteria

Testable checks; all must pass:

1. Every displayed personal/project fact traces to a §2 source (content-lint green; manual
   audit of rendered copy).
2. Zero unsupported claims: no deployment/user/metric-value/AI-expertise/public-repo wording
   anywhere, and the retired vercel.app URL appears nowhere on the site (denylist test green).
3. Only ProcureFlow, SlotSure, and DealerSync appear as portfolio projects; Helios Protocol
   appears only within Achievements; no legacy projects exist anywhere.
4. The persistent 3D protagonist exists and changes state in every chapter (§9 table
   verified visually).
5. The flagship wheel-pass transition exists, is scroll-reversible, and has mobile, reduced-
   motion, and no-WebGL variants.
6. All seven required sections exist in order with their §13 content.
7. Case studies deep-link, render complete on direct entry, and contain all §15 blocks
   including scope boundaries and the private-repo source note.
8. Reduced-motion preserves 100% of content and navigation.
9. No-WebGL (Patent Drawing Edition) preserves 100% of content and navigation.
10. Mobile behavior matches §28 (verified at 320px minimum width).
11. Keyboard-only journey completes every action incl. skipping all pinned scenes; axe
    reports no critical issues; contrast checks pass per §27.
12. Performance budgets of §26 met on the reference devices.
13. All TODOs (T1–T4) remain explicitly labeled until resolved.
14. This plan contains no implementation code, and the site contains no audio requirement.
15. The final line of this document is the exact status line below.

## 31. Risks and Contingency Options

| Risk | Likelihood | Mitigation / contingency |
|---|---|---|
| Complication scenes too complex for mid-tier mobile GPUs | Medium | Instancing + LODs first; contingency: adaptive tier swaps a scene's live mechanism for a 3-still sequence with the same copy (already the reduced-motion design) |
| Flagship shader ramp janks on fill-rate-limited devices | Medium | DPR clamp during ramp; contingency: masked 2D wipe over the same camera path (adaptive tier default) |
| 3D authoring time (Blender sculpting of pallet/case/hammers) exceeds schedule | Medium | Procedural-first modeling covers ~80% of parts; contingency: simplify sculpted parts to machined primitives — consistent with the material language |
| Lenis + ScrollTrigger + R3F sync bugs (pin jumping, resize desync) | Medium | Single scroll source of truth, one rAF loop, resize-refresh handling, Playwright scroll journeys in CI |
| Scroll-jack fatigue / recruiter impatience | Medium | Pins limited to five short scenes; skip controls; the DOM work index above the chambers gives 10-second scanability; header always reachable |
| Font/type flash or CLS from display serif | Low | Subset self-hosted WOFF2, metric-compatible fallbacks, swap |
| Fact drift during copywriting | Low | Content-lint + denylist tests; copy only from the typed content layer |
| Certificate/asset quality on high-DPI screens | Low | Export 2× AVIF/WebP with engraved frame treatment; alt text independent of image quality |
| WebGL context loss mid-journey | Low | Context-loss listener downgrades to Patent Drawing Edition with content position preserved |
| Repos remain private and a recruiter wants code | Accepted | Honest source note + "available on request" wording (owner directive); slots reserved for future public links (T3) |

---

STATUS: READY FOR OPUS 5 ULTRACODE IMPLEMENTATION REVIEW
