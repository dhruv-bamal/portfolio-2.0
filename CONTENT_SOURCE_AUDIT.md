# CONTENT_SOURCE_AUDIT.md

Traceability record for every fact rendered by **Portfolio 2.0**. Enforced mechanically by
`tests/content.test.ts` (59 assertions), which fails the build if any record loses its source
or if denylisted claim vocabulary appears.

---

## 1. Factual Source Files

| Key | File (uploaded this session) | What it supplied |
|---|---|---|
| `resume` | `resume-dhruv-backend-engineer (1).pdf` | Identity, contact, education, experience, all nine skill clusters, professional summary, LeetCode and hackathon lines |
| `procureflow-readme` | `ProcureFlow-README.pdf` (7 pp) | Every ProcureFlow field |
| `slotsure-readme` | `SlotSure-README.pdf` (6 pp) | Every SlotSure field |
| `dealersync-readme` | `DealerSync-README.pdf` (7 pp) | Every DealerSync field |
| `certificate` | `hackathon-certificate.jpeg` | Certificate wording, date, organisers; displayed as an asset |
| `owner-session-answer` | Owner directives, session 2026-09-01 | Helios Protocol details + links, LeetCode profile URL, repo privacy, deployment wording, phone/CGPA/certificate/resume permissions, AI/ML learning intent, domain retirement |

No other source was used. Saved memories and all prior plans were explicitly superseded.

## 2. Source by Site Section

| Section | Route/anchor | Sources | Notes |
|---|---|---|---|
| Hero | `/#hero` | `resume` | Name, role, location, positioning line derived from the résumé summary |
| Flagship transition | `/` (between hero and about) | — | Concept copy only; contains no personal claims |
| About | `/#about` | `resume`, `owner-session-answer` | Summary lines near-verbatim; education incl. CGPA (owner-approved); Forage programme labelled a simulation; AI/ML line is learning intent only |
| Achievements | `/#achievements` | `resume`, `certificate`, `owner-session-answer` | Hackathon, Helios Protocol, LeetCode, Forage. Carries the site's only external links: Helios demo/repo and the LeetCode profile (all owner-supplied). Per owner directive the teammate's name is not shown; the entry still credits "team Spring Storm" rather than implying solo work. The certificate is displayed as the card's blurred background, with its wording preserved as caption text |
| Skills | `/#skills` | `resume` | Nine clusters, verbatim items |
| Projects & Work | `/#work` | three READMEs | Three chambers (the earlier duplicate index list was removed) |
| What I Can Build | `/#build` | all three READMEs, `resume` | Each capability names what it derives from |
| Contact | `/#contact` | `resume`, `owner-session-answer` | Email, phone, GitHub, LinkedIn, résumé download |
| Case studies | `/work/[slug]` | matching README, `owner-session-answer` | Full 13-block treatment per project |
| 404 | `/not-found` | — | No personal claims |

## 3. Source by Project

All three are sourced **entirely** from their own README. No field mixes sources.

| Field | ProcureFlow | SlotSure | DealerSync |
|---|---|---|---|
| Problem / Solution | README | README | README |
| Built for *(README heading "Target users")* | README | README | README |
| Core workflow | README arrow chain | README arrow chain | README arrow chain |
| Mechanism steps | Approval routing + audit | 9-step booking algorithm | Batch import pipeline |
| State machine | — (none defined) | held/confirmed/expired/cancelled/completed | queued → processing → 4 terminal states |
| Engineering decisions | "Security decisions" list | "Data integrity decisions" list | "Processing principles" list |
| Proofs | "Critical tests" list | "Important scenarios" list | "Critical scenarios" list |
| Observability | health/ready + logging design | 8 metric names | 10 metric names |
| Scope boundaries | README, verbatim in substance | README | README |
| Future improvements | README | README | README |
| Stack table | README | README | README |
| Source link | GitHub profile + private note | same | same |

**Metric handling.** Every metric name is rendered under the heading *Observability* with the
sentence "Designed observability, not measured results." No numeric value is displayed anywhere,
because none exists in any source.

## 4. Omitted Facts and Why

| Omitted | Reason |
|---|---|
| Per-project repository URLs | Repositories are private (owner directive 1). "Source" links resolve to the GitHub profile with the note "Repository private — source available on request". |
| Per-project demo / Swagger URLs | Projects are not deployed (owner directive 7). No demo, live, or hosted-docs claim appears. |
| Deployment status wording | Same. "Production-grade" is used — the résumé's own wording, owner-authorized — and never "deployed", "live", "in production", or "production-tested". |
| Numeric outcomes (users, throughput, latency, uptime, revenue) | No source contains any. Metric *names* are presented as instrumentation design only. |
| Employers and clients | The only professional entry is the Forage **simulation**, always labelled as such. |
| AI/ML expertise, projects, or credentials | Owner stated learning intent only. One neutral forward-looking sentence appears; nothing else. |
| Testimonials, leadership claims | Unsupported. Helios Protocol is credited to "team Spring Storm" — a team effort, not a solo build — with the teammate's name withheld per owner directive. |
| Previous portfolio URL (`dhruv-bamal-portfolio.vercel.app`) | Retired by owner directive 9. Denylisted in `tests/content.test.ts` and verified absent from rendered HTML. |
| Screenshots of the three projects | None exist. Replaced by authored SVG architecture diagrams (owner directive 6). |
| OG / social share image | Owner-deferred (T2). No `opengraph-image` route exists. |
| Teammate's name in the hackathon entry | Withheld at owner request (revision round). The entry still credits "team Spring Storm", so it never implies a solo build. |

## 5. TODOs Requiring Owner Input

| # | Item | Where it surfaces | Current handling |
|---|---|---|---|
| **T1** | **New custom domain — not yet purchased** | `lib/content/identity.ts` → `SITE.domainPlaceholder`, `SITE.originPlaceholder`; rendered in the contact footer; used by `metadataBase` | Footer prints the literal string `TODO: new custom domain`. Swap the two constants in one file when the domain is registered. |
| T3 | Public repository URLs, if/when repos are opened | `lib/content/projects.ts` → `sourceNote.reservedPublicUrl` (currently `null`) | Reserved slot kept, asserted `null` by test. Case studies show the private-repo note until it is filled. |
| T2 | OG/social image | — | Deferred by owner; revisit post-launch. |
| T4 | Favicon | `public/favicon.svg` | **Resolved** — escape-wheel mark authored. |

## 6. Confirmation

- Every fact-bearing record in `lib/content/` carries a non-empty `source`; asserted per record.
- The rendered server HTML was checked for 22 representative facts — all present, with no canvas
  and no retired URL.
- No unsupported personal claim was added at any point. Where a source was silent, the site is
  silent or carries a labelled TODO.
- Copy originates only from the typed content layer; no section component hard-codes a personal
  fact.
