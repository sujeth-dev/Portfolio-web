# MASTER PLAN — Interaction Layer + Environmental World

> Source design doc: [`docs/FUTURE-ENVIRONMENT-LAYER.md`](docs/FUTURE-ENVIRONMENT-LAYER.md) (27KB, fully specified — read it before starting any task below; this file tracks execution status only, the design doc is the spec of record).
> This plan implements Portfolio Phase 3 as ten build phases (P0–P9), matching section 8 of the design doc.
> Repository state confirmed at plan creation (2026-08-09): `npm test` 6/6 pass, `npm run build` clean (274KB JS / 85KB gzip, 17.76KB CSS). `gsap` and `lenis` are NOT in `package.json` yet — P0 is the true starting point.

## How to read this file

- **Status** values: `Not Started` / `In Progress` / `Blocked` / `Done`.
- A phase's tasks are ordered; do not start task N+1 until task N is `Done` (Dependencies column is intra-phase unless noted).
- "Required tests" are the minimum gate for marking a task `Done`. `npm test` and `npm run build` must pass for every task with no exceptions — additional manual/visual checks are listed where the design doc's section 12 checklist applies.
- When a task's status changes, update it here AND in `PROGRESS.md`, then append an entry to `EXECUTION_LOG.md`. See `DEVELOPMENT_LOOP.md` for the exact procedure.

---

## Robot design decision (resolved for P5)

**Robot.jsx no longer exists.** Commit `5209461` ("Replace Robot with PixelRobot mascot everywhere, including favicon") deleted `src/components/robot/Robot.jsx` (the 8-pose robot: wave/inspect/build/sleep/lost/goggles/signal/read) and replaced every usage with the simplified `src/components/common/PixelRobot.jsx`. The design doc's section 2 ("Robot Integration") and Phase 5 assume `RobotCompanion.jsx` wraps the still-existing `Robot.jsx`. This is stale.

The available options were:
1. Restore multi-pose `Robot.jsx` from git history (`git show 5209461^:src/components/robot/Robot.jsx`) and build `RobotCompanion` around it as originally specified.
2. Extend `PixelRobot.jsx` with a `pose` prop and redesign `RobotCompanion` around the simplified mascot instead.

**Decision recorded 2026-08-09:** choose option 2. Extend `PixelRobot.jsx` with expressive poses and give the existing pixel mascot a lively, friendly, Claude-bot-like personality. Do not restore `Robot.jsx`. This does not change task order; P5-T00 remains the formal checkpoint for confirming the recorded decision before implementation.

---

## Project page end-state vision (recorded for P1, drives P3)

**Decided 2026-08-10:** the right-side `ProjectStage` is not a decorative panel — at full development it is the primary storytelling surface of the project page. The left column carries supporting case-study text; the visual system carries the actual narrative through its 5 states (identity → problem → architecture → engineering → results) as the user scrolls. Phases 2–8 (backgrounds, parallax, cursor, velocity, robot) enrich this same system — they do not replace it. P1's sticky 55/45 split is the permanent desktop foundation, not a temporary preview.

This means **mobile needs its own real system, not a disabled fallback.** The plan as originally written (P1-T07, and design doc mobile rules) treats mobile as static: 200px illustration strip, no stickiness, parallax/backgrounds/velocity all disabled below 768px. That strip is an interim placeholder only. Mobile is expected to get a genuine scroll-driven version of the same 5-state story — non-sticky (no split layout on a narrow screen), but with its own scroll-triggered state transitions and lighter motion, folded into Phase 3 (see P3-T06 below) rather than staying an afterthought. `docs/FUTURE-ENVIRONMENT-LAYER.md`'s mobile section is stale on this point and should be revised when P3-T06 lands.

---

## Phase 0 — Foundation

**Goal:** Lenis + GSAP wired in, mouse/scroll CSS vars live, zero visual change.
**Depends on:** nothing (portfolio Phase 2 / PixelRobot rollout already complete per commits `5209461`, `1475eb7`).
**Status:** Done

| ID | Task | Depends on | Status |
|---|---|---|---|
| P0-T01 | `npm install gsap lenis`; confirm versions land in `package.json` + `package-lock.json` | — | Done |
| P0-T02 | Create `src/systems/InteractionContext.js` (context shape per design doc §2A) and `src/systems/InteractionProvider.jsx` (Lenis init, GSAP ticker, mouse lerp at 0.08/frame, `useReducedMotion` wiring) | P0-T01 | Done |
| P0-T03 | Create `src/styles/interaction-layer.css` (custom properties block from design doc §4, `will-change` rules, reduced-motion overrides) | P0-T02 | Done |
| P0-T04 | Wire `<InteractionProvider>` around the app in `src/App.jsx`; remove `scroll-behavior: smooth` from `src/index.css`; import `interaction-layer.css` in `src/main.jsx` | P0-T02, P0-T03 | Done |

**Acceptance criteria (phase-level):**
- `npm run build` succeeds with `gsap`/`lenis` bundled.
- DevTools inspection of `:root` shows `--mouse-x`, `--mouse-y`, `--mouse-x-norm`, `--mouse-y-norm`, `--scroll-vel`, `--scroll-dir`, `--section-progress` updating live.
- Smooth scroll is driven by Lenis (native `scroll-behavior: smooth` removed).
- No visible layout/visual change on any page vs. current `main`.
- `prefers-reduced-motion: reduce` freezes CSS vars at neutral and disables Lenis (native scroll fallback).

**Required tests:** `npm test`, `npm run build`, manual DevTools check of `:root` custom properties, manual reduced-motion toggle check (OS or DevTools emulation).

---

## Phase 1 — Project Page Scene (proving ground)

**Goal:** Project pages (`/work/:slug`) become the single self-contained page where every new system is built and proven before touching the homepage.
**Depends on:** P0 done.
**Status:** Done

| ID | Task | Depends on | Status |
|---|---|---|---|
| P1-T01 | Create `src/hooks/useScrollEngine.js` (ScrollTrigger wrapper, auto-cleanup on unmount) | P0 | Done |
| P1-T02 | Create `src/hooks/useMouseProximity.js` (radius/normalize, GSAP-ticker throttled) | P0 | Done |
| P1-T03 | Create `src/components/layout/CompactHeader.jsx` + `src/styles/compact-header.css` (44px control strip, breadcrumb, accent line) | P0 | Done |
| P1-T04 | Create `src/components/project/ProjectStage.jsx` + `src/styles/project-stage.css` (5 scroll states: identity → problem → architecture → engineering → results) | P1-T01 | Done |
| P1-T05 | Create the 3 lazy-loaded stage sub-components: `src/components/project/stages/SynapticStage.jsx`, `PossahStage.jsx`, `VelmontStage.jsx` (per-project SVG compositions, design doc §3) | P1-T04 | Done |
| P1-T06 | Create `src/components/project/ProjectNav.jsx` (prev/all-work/next, enlarged next-project preview) | P0 | Done |
| P1-T07 | Restructure `src/pages/ProjectPage.jsx` into the two-column sticky layout (55% scroll content / 45% sticky `ProjectStage`); wire `CompactHeader` + `ProjectNav`; mobile fallback = 200px illustration strip, no stickiness, below 768px (interim only — see P3-T06) | P1-T02–P1-T06 | Done |
| P1-T08 | Conditional `Nav` vs `CompactHeader` routing logic in `src/App.jsx` | P1-T07 | Done |

**Acceptance criteria:** All 5 scroll states render and transition correctly for all 3 featured projects (Synaptic, Possah, Velmont); `CompactHeader` replaces main `Nav` only on `/work/:slug`; mobile viewport (375px) shows stacked illustration strip with no pinning; keyboard tab order stays natural through scroll content; reduced motion renders final state immediately with no animation.

**Required tests:** `npm test`, `npm run build`, manual pass through all 3 project pages at desktop + 375px width, reduced-motion toggle check, keyboard-only navigation check.

---

## Phase 2 — ScrollReveal Upgrade + Velocity

**Goal:** Existing reveal animations migrate to GSAP ScrollTrigger under the same external API; restrained velocity effects added.
**Depends on:** P1 done.
**Status:** Done

| ID | Task | Depends on | Status |
|---|---|---|---|
| P2-T01 | Rewrite `src/components/common/ScrollReveal.jsx` internals to GSAP ScrollTrigger, preserving its existing external props/API so no call sites change | P1 | Done |
| P2-T02 | Create `src/components/systems/VelocityEffects.jsx` + `src/styles/velocity-effects.css` (skew ≤2deg, stretch ≤1.01 scaleY, 20ms lag — all lerp to 0 on scroll stop) | P1 | Done |
| P2-T03 | Apply `VelocityEffects` to project pages and a small, named subset of Home sections (per design doc §5 Homepage table: Skills group cards; no Thoughts section currently exists in Home) | P2-T02 | Done |

**Acceptance criteria:** Every existing `ScrollReveal` call site behaves identically (no prop changes needed); velocity effects are visually subtle and fully settle within ~300ms of scroll stopping; reduced motion disables velocity effects entirely.

**Required tests:** `npm test`, `npm run build`, visual regression pass on every page using `ScrollReveal` (Home, Work, Lab, About, ProjectPage), reduced-motion check.

---

## Phase 3 — Parallax + Section Backgrounds + Mobile Scroll System

**Goal:** Living, per-section backgrounds with 3-layer parallax depth on desktop; a real scroll-driven mobile version of `ProjectStage` replacing the static fallback strip.
**Depends on:** P1 done (P2 not required but recommended done first for a stable base).
**Status:** Done

| ID | Task | Depends on | Status |
|---|---|---|---|
| P3-T01 | Create `src/hooks/useParallax.js` (layer 1/2/3 strengths per design doc §2C table; no-op on reduced-motion/mobile) | P1 | Done |
| P3-T02 | Create `src/hooks/useSectionProgress.js` (thin ScrollTrigger wrapper for theme crossfade) | P1 | Done |
| P3-T03 | Create `src/components/systems/ParallaxLayer.jsx` + `src/components/systems/SectionBackground.jsx` | P3-T01, P3-T02 | Done |
| P3-T04 | Create `src/styles/section-backgrounds.css` with all 5 themes: `.bg-open`, `.bg-technical`, `.bg-messy`, `.bg-warm`, `.bg-signal` | P3-T03 | Done |
| P3-T05 | Add backgrounds to project pages first (validate), then Home page sections per design doc §5 table | P3-T04 | Done |
| P3-T06 | Build the mobile scroll-driven `ProjectStage`: non-sticky, inline layout (no split/pin), state transitions (identity → problem → architecture → engineering → results) driven by `useSectionProgress` scroll position instead of desktop's pin+scrub; lighter parallax (single layer or none per perf budget) via `useParallax`'s mobile path; replaces the static 200px illustration strip from P1-T07. Update `docs/FUTURE-ENVIRONMENT-LAYER.md` mobile section to match. | P3-T02, P3-T01, P1-T07 | Done |

**Acceptance criteria:** 3 parallax layers visibly respond differently to mouse/scroll on desktop; backgrounds crossfade gradually through scroll (no hard section cuts); background responds to `--mouse-x-norm`/`--mouse-y-norm`; mobile (<768px) no longer shows a static illustration strip — it shows the same 5-state story via scroll-triggered transitions, with parallax/background motion scaled down (not fully disabled) per the P3-T06 design; reduced motion still renders the final state immediately with no animation on both desktop and mobile.

**Acceptance note (adjusted 2026-08-10, DEVELOPMENT_LOOP.md §11):** "3 parallax layers visibly respond differently" is verified functionally (the `useParallax` hook's layer 1/2/3 strength table, §2C) but only layer 1 has a live visual consumer today — `SectionBackground`'s pattern (P3-T03/T05) and the mobile `ProjectStage` grid (P3-T06). None of P3-T01 through P3-T06 scoped a layer-2 ("environment": machines, screens) or layer-3 ("foreground": stickers, robot, controls) consumer — those belong to visual elements this phase's task list never asked for. Per the "foundation now, enrichment later" pattern already established for Phases 1–2, layers 2/3 will get real consumers as later phases add the elements they're meant for (richer `ProjectStage` scene compositions, `RobotCompanion` in P5, etc.). Not treated as a blocker: every literal P3 task deliverable is complete and independently verified.

**Required tests:** `npm test`, `npm run build`, manual scroll-through on project pages + Home at desktop and 375px (confirming mobile state transitions fire correctly), Lighthouse Performance spot-check (target stays ≥90 — full audit is P9).

---

## Phase 4 — Cursor Companion + Scroll Progress

**Goal:** Cursor label system and a Retro Toy scroll-progress gauge.
**Depends on:** P0 done.
**Status:** Done

| ID | Task | Depends on | Status |
|---|---|---|---|
| P4-T01 | Create `src/components/systems/CursorCompanion.jsx` + `src/styles/cursor-companion.css` (delegated mouseenter/mouseleave, `data-cursor` label pill, hidden on mobile/reduced-motion) | P0 | Done |
| P4-T02 | Create `src/components/systems/ScrollProgressIndicator.jsx` + `src/styles/scroll-indicator.css` (machine gauge, section notches, LED dots; robot marker deferred — see P5 open question) | P0 | Done |
| P4-T03 | Add `data-cursor="VIEW\|OPEN\|PLAY\|TRY\|EXPLORE"` attributes to interactive elements across Work, Lab, ProjectPage, Nav | P4-T01 | Done |
| P4-T04 | Mount `CursorCompanion` + `ScrollProgressIndicator` in `src/App.jsx` | P4-T01, P4-T02 | Done |

**Acceptance criteria:** Cursor companion appears with the correct label over every `data-cursor` element and nowhere else; scroll gauge tracks position and LED dots activate per section; both hidden below 768px and under reduced motion; `ScrollProgressIndicator` has `aria-label` + `aria-valuenow`.

**Required tests:** `npm test`, `npm run build`, manual hover pass over all `data-cursor` elements, screen-reader spot check on `ScrollProgressIndicator` (VoiceOver/NVDA or axe DevTools), mobile viewport check.

---

## Phase R1 — User Revision Round (Preview Feedback, 2026-08-10)

**Goal:** Address a batch of feedback the user gave after reviewing the production preview of Phases 0–4, before continuing to Phase 6. Recorded per `DEVELOPMENT_LOOP.md` §11 ("this file is allowed to evolve"). Full triage context, investigation findings, and the Plan-agent validation for R1-T05 live in the approved plan at the time this phase was added; summarized here for execution.
**Depends on:** P0–P4 done (all satisfied). Independent of Phase 6 — this phase is simply prioritized ahead of it in execution order per the user's explicit request.
**Status:** All 10 tasks Done. One follow-up remains outside this table: `R1-T02`'s robot color-combination Artifact is still awaiting the user's pick — a site-wide palette swap will be a small follow-up task once they choose. Phase 6 resumes next.

| ID | Task | Depends on | Status |
|---|---|---|---|
| R1-T01 | Home hero: replace `<h1 className="hero-name">{meta.name}</h1>` with a new `AnimatedPixelRobot` (same silhouette/palette as `PixelRobot`, minimal idle motion — blink, bob, tilt — frozen under reduced motion). `Nav.jsx` logo untouched. **Human checkpoint: present result for approval before continuing to the next task.** | — | Done — user approved 2026-08-10 |
| R1-T02 | Publish an Artifact presenting 4–6 alternate `PixelRobot` color-combination recommendations (light + dark background contexts). Human-decision checkpoint (like `P5-T00`) — do not apply site-wide; record as awaiting-decision and move on. | R1-T01 | Done — awaiting user's color pick |
| R1-T03 | Remove `ScrollProgressIndicator`'s LED dots (`.scroll-indicator__leds`/`__led` + the `currentSection`-matching logic that drives them); keep the track/fill/notch gauge. | — | Done |
| R1-T04 | Delete `CursorCompanion.jsx` + `cursor-companion.css` and its `AppShell` mount entirely; add a plain custom retro-pixel CSS `cursor` (data-URI SVG) site-wide instead. Remove the now-dead `data-cursor` attributes added in P4-T03 (`Work.jsx`, `Lab.jsx`, `ProjectPage.jsx`, `ProjectNav.jsx`, `Nav.jsx`). | — | Done |
| R1-T05 | Restructure `ProjectPage.jsx`: collapse the 55/45 grid to a single column — hero → full-width sticky `ProjectStage` (own dedicated scroll-track `min-height`, decoupled from case-study height) → new collapsed-by-default `CaseStudyPanel` accordion (all 7 case-study sections moved in, unchanged content) → `ProjectNav`. `ScrollTrigger.refresh()` on toggle. No changes to `ProjectStage.jsx`/`useScrollEngine.js`/`useSectionProgress.js`/`CompactHeader.jsx`/`ProjectNav.jsx`. | P1 (done) | Done |
| R1-T06 | Enrich the project-page visual system's background (richer pattern/per-project accent on the `technical` theme instance used by `ProjectStage`'s `SectionBackground`, scoped so the shared `.bg-technical` used elsewhere is untouched). | R1-T05 | Done |
| R1-T07 | Make Home hero's `.bg-open` background livelier: add a second dot layer at a different scale + a slow continuous ambient `@keyframes` drift, off under reduced motion. | — | Done |
| R1-T08 | Home's `#experience` section starts collapsed (heading + toggle only) and expands the full `.exp-list` on click, via the same accordion idiom as R1-T05. | — | Done |
| R1-T09 | Animate Contact section's `.bg-signal` ring pattern with a slow continuous drift/rotation, off under reduced motion. | — | Done |
| R1-T10 | Fix the zigzag/"paper-cut" border (currently invisible — `.zigzag`/`.zigzag-dark` alternate `var(--bg)` against sections that are also `var(--bg)`, a zero-contrast no-op) so it reads as a visible torn edge regardless of neighboring section color; extend the same treatment to `Nav`/`CompactHeader` (bottom edge) and `Footer` (top edge). | — | Done |

**Acceptance criteria (phase-level):** All ten tasks' individual acceptance criteria met; no regression to Phases 0–4's existing acceptance criteria; `npm test`/`npm run build` clean throughout; reduced-motion and mobile (375px) regressions checked wherever a task touches animation/layout (R1-T01, T05–T10).

**Required tests:** `npm test`, `npm run build` per task; task-specific manual/visual passes as detailed per task above (dev server + production `vite preview`); reduced-motion toggle; mobile viewport; keyboard-only pass for the two new accordions (R1-T05, R1-T08).

---

## Phase R2 — User Revision Round 2 (2026-08-10)

**Goal:** Address a second batch of feedback given after reviewing the R1 preview — hero background restraint + liveliness, matching the project-page background to it, a minimal single-line scroll indicator, removing the Workshop Status card, a symmetric Selected Work grid, a real "rock-drop" ripple on the Contact section circle, curated robot micro-interactions, more robot color options, an About-page duplicate-name fix, and a paper-cut-border redesign now that a concrete reference exists.
**Depends on:** Phase R1 done (all satisfied). Independent of Phase 6 — prioritized ahead of it, same as R1 was.
**Status:** In Progress

| ID | Task | Depends on | Status |
|---|---|---|---|
| R2-T01 | Home hero background: add `mask-image` radial fade to `.bg-open .section-background__pattern` (visible center, transparent edges), drop opacity to ~0.12, widen tile spacing. Add a cursor-illumination glow layer inside the hero driven by the existing global `--mouse-x`/`--mouse-y` CSS vars (no new JS tracking needed). Split the hero's single `ScrollReveal` wrapper into per-element staggered reveals (name/desc/actions) using the existing `ScrollReveal` component — no Framer Motion, matches the design doc's explicit "why not Framer Motion" decision. Add a low-opacity (~4%) CSS-only grain/noise overlay to the hero. | R2-T04 | Done |
| R2-T02 | ProjectPage background: remove the two `linear-gradient` grid-line layers from `.bg-technical .section-background__pattern` (dots only, matching R2-T01's tamed hero treatment — mask fade, opacity, spacing); leave `.project-stage-bg::before` (accent glow) and `.project-stage-bg .section-background__pattern::after` (accent dot layer) untouched so the per-project color feel is kept. Note: `.bg-technical` is shared with Home's Selected Work / Skills sections — verify those aren't unintentionally changed, or split into a dedicated modifier if they must stay denser. | R2-T01 | Done — scoped via a `.bg-technical.project-stage-bg` modifier, `.bg-technical` itself untouched |
| R2-T03 | Simplify `ScrollProgressIndicator` to a single minimal line: remove the per-section `.scroll-indicator__notch` marks (and `getSectionMarks`/`marks` state that drives them), reduce `.scroll-indicator__track` to a thin borderless line. Keep the scroll-progress `__fill` behavior. | — | Done |
| R2-T04 | Remove Home hero's Workshop Status card (the `.workshop-vignette` block in `Home.jsx`, including the "ALL SYSTEMS ONLINE" line and the React/Node/Postgres/Ship tag row). Collapse `.hero-grid` to a single column now that the second column is empty. Keep `.led`/`.led-on` CSS (still used by the hero ticker) and `.tag` CSS (still used by project cards). | — | Done |
| R2-T05 | Make `.projects-grid`/`.secondary-grid` symmetric across breakpoints: replace `repeat(auto-fill, minmax(...))` with explicit breakpoint column counts (1/2/3-col) so column count doesn't shift unpredictably mid-range; normalize `.project-card-tease` height via `line-clamp` so row heights don't wobble with tease-text length. | — | Done |
| R2-T06 | Fix the Contact "Let's build something" background circle: enable `bg-signal`'s ring effect on mobile (currently fully disabled by `SectionBackground`'s `isMobile` opacity-zero rule), and replace the single synchronized `bg-signal-pulse` scale animation with staggered expanding-ring elements — born at the center, growing radius, fading as they expand (a rock-dropped-in-water ripple), at higher visibility than the current 0.07-0.08 alpha values. | — | Done |
| R2-T07 | Add curated micro-interactions to `AnimatedPixelRobot` (hero mascot only): idle look-around (independent of the existing blink), AFK/sleep mode with floating "Zzz" after 45s of no mouse movement, an occasional CRT glitch flicker, cursor-tracking eyes (reuse the existing, currently-unused `useMouseProximity` hook), hover head-bop, and click expression cycling (happy/surprised/wink/dizzy). All ambient effects (look-around, AFK, glitch, cursor-tracking) off under reduced motion / mobile, matching the codebase's existing hook conventions. Explicitly out of scope for this task: audio bleeps, theme toggle, status-color tie-in (its data source is removed by R2-T04), form-focus glance, copy-feedback checkmarks, scroll-rail buddy (separate, already-planned `P5-T03`), section costumes, Konami code, draggable physics, speech bubbles — larger/separate scope, revisit later if wanted. | — | Done — idle-look-around and cursor-tracking merged into one mechanism (see log); did not end up needing `useMouseProximity` — driven by the existing global `--mouse-x-norm`/`--mouse-y-norm` CSS vars instead |
| R2-T08 | Add 4 new color combinations to the existing "PixelRobot — Color Study" Artifact — Phosphor Amber (`#FF9E00`/`#221E1C`/`#121212`), Arcade Tangerine (`#FF6B35`/`#F5EEDC`/`#221E1C`), Amber Ink Hybrid (`#FF8C00`/`#221E1C`/`#221E1C`), Terminal Invert (`#221E1C`/`#FF9E00`/`#FF9E00`) — and republish to the same Artifact URL. Still a human-decision checkpoint like `R1-T02` — no site-wide apply until the user picks. | R1-T02 | Done — 14 options now live at the same Artifact URL, still awaiting the user's pick |
| R2-T09 | About page: remove the duplicate visible name — delete the standalone `<h1>{meta.name}</h1>` in `About.jsx`, give the page a proper contextual `<h1>` instead (e.g. "About"). Keep `meta.name` only inside `.dev-card-name` in the dev card. | — | Not Started |
| R2-T10 | Redesign the zigzag/paper-cut border using the Retro Toy reference found at `Downloads/Design style exploration and branding/Retro Toy Direction/*.dc.html`: replace the current uniform repeating-triangle tile with the reference's irregular hand-torn `clip-path` polygon (`polygon(0 42%,5% 22%,11% 46%,18% 20%,26% 44%,34% 18%,42% 44%,51% 22%,60% 46%,68% 20%,76% 44%,84% 22%,92% 46%,100% 24%,100% 100%,0 100%)`, confirmed reused verbatim across all 5 reference pages), layered over the existing opaque ink backing so R1-T10's contrast fix (never invisible against a matching neighbor color) is preserved. | R1-T10 | Not Started |

**Acceptance criteria (phase-level):** All ten tasks' individual acceptance criteria met; no regression to Phases 0–4 / R1's existing acceptance criteria; `npm test`/`npm run build` clean throughout; reduced-motion and mobile (375px) regressions checked wherever a task touches animation/layout (R2-T01, T02, T03, T04, T06, T07, T10).

**Required tests:** `npm test`, `npm run build` per task; task-specific manual/visual passes (dev server + production `vite preview`); reduced-motion toggle; mobile viewport.

---

## Phase 5 — Robot Integration Across Site

**Goal:** A companion robot appears at strategic points across all pages (not just project pages), responds to mouse proximity.
**Depends on:** P0 done, AND the robot design decision above recorded in `PROGRESS.md`.
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P5-T00 | Resolve open design question (restore `Robot.jsx` vs. extend `PixelRobot.jsx` with poses); record decision + rationale in `PROGRESS.md` | — | Not Started |
| P5-T01 | Create `src/components/robot/RobotCompanion.jsx` wrapping the decided component; `lookAtMouse` via `useMouseProximity` | P5-T00, P1-T02 | Not Started |
| P5-T02 | Place `RobotCompanion` at each strategic position from design doc §2 "Robot Integration" table (Hero, Work-card-hover, Experience, Contact, Lab, About, 404); replace only the relevant `PixelRobot` instances, keep `PixelRobot` for nav/footer/tiny inline uses | P5-T01 | Not Started |
| P5-T03 | Wire robot marker into `ScrollProgressIndicator` (12px, moves along track) | P5-T01, P4-T02 | Not Started |

**Acceptance criteria:** Robot appears only at the specified strategic positions, not as continuous following; pose matches context (wave/inspect/build/signal/goggles/read/lost per design doc); mouse-proximity look-toward is subtle and disabled under reduced motion; `PixelRobot` still used for nav/footer.

**Required tests:** `npm test`, `npm run build`, manual pass over every page confirming correct pose + placement, reduced-motion check.

---

## Phase 6 — Typography Motion

**Goal:** Scroll-driven heading motion; body copy stays static.
**Depends on:** P1 done.
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P6-T01 | Create `src/components/systems/TypographyMotion.jsx` + `src/styles/typography-motion.css` (`slide-in`, `mask-reveal`, `parallax-drift` effects, all via ScrollTrigger scrub, immediate render under reduced motion) | P1 | Done |
| P6-T02 | Apply to hero name, section titles, and the selected oversized headings named in design doc §5 (Home hero mask-reveal, Skills heading slide-in) | P6-T01 | Not Started |

**Acceptance criteria:** Headings animate on scroll; body copy is unaffected; reduced motion renders immediately with no animation; semantic heading elements preserved (no `<div>` substitutions).

**Scope note (adjusted 2026-08-10, `DEVELOPMENT_LOOP.md` §11):** P6-T02's "Home hero mask-reveal" target is stale. `R1-T01` (Phase R1) replaced Home's `<h1 className="hero-name">{meta.name}</h1>` with an animated robot mascot (`AnimatedPixelRobot`, wrapped in a `sr-only` span for the accessible name) — there is no visible hero name text left to apply a text-reveal effect to. P6-T02 will apply `mask-reveal` to a different oversized heading instead (candidates: the hero's `hero-desc` intro line, or `.project-name` on ProjectPage) and `slide-in` to the Skills heading as originally planned; the exact substitution will be decided and recorded when P6-T02 is executed, not guessed here.

**Required tests:** `npm test`, `npm run build`, manual scroll-through of affected headings, reduced-motion check, screen-reader spot check that heading semantics are intact.

---

## Phase 7 — Sticky Stage: Homepage Project Showcase

**Goal:** The signature scroll-driven "Selected Work" showcase on the homepage — the most complex system in this plan.
**Depends on:** P1, P2, P3 done (reuses `ProjectStage`-style visuals, ScrollReveal, and section backgrounds).
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P7-T01 | Create `src/components/systems/StickyStage.jsx` + `src/styles/sticky-stage.css` (tall container, `pin: true`, active-item tracking, mobile fallback = stacked, no pinning) | P1, P3 | Not Started |
| P7-T02 | Restructure "Selected Work" section in `src/pages/Home.jsx` to use `StickyStage` for the 3 featured projects; keep secondary/other project grids unchanged below the stage | P7-T01 | Not Started |
| P7-T03 | Build per-project transition timelines (Synaptic → Possah → Velmont) reusing/adapting the P1 stage sub-components' visuals | P7-T02, P1-T05 | Not Started |

**Acceptance criteria:** 3 featured projects pin and transition continuously (no hard cuts) during scroll; secondary/other project grids render normally below the stage, unaffected; mobile (<768px) falls back to stacked cards, no pinning; reduced motion shows static stacked state.

**Required tests:** `npm test`, `npm run build`, manual scroll-through of Home at desktop and 375px, reduced-motion check, Lighthouse Performance spot-check on Home (this is the heaviest single addition — watch for regressions before P9's full audit).

---

## Phase 8 — Inner Page Polish

**Goal:** Bring Work, Lab, About, and 404 to their designed interaction intensity (design doc §5).
**Depends on:** P3 (backgrounds), P4 (cursor), P5 (robot) done.
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P8-T01 | Work page: `data-cursor="VIEW"` + enhanced hover (accent-glow box-shadow, larger lift, cursor companion, robot pose change); filter tab GSAP scaleX spring on active underline | P4, P5 | Not Started |
| P8-T02 | Lab page: `SectionBackground(messy)`, `data-cursor="TRY"/"EXPLORE"` on cartridges, rotation increase on hover, scattered blinking LED effects, `RobotCompanion(goggles, 40px)` | P3, P4, P5 | Not Started |
| P8-T03 | About page: `SectionBackground(warm)`, dev-card mouse-tilt via `useMouseProximity` (max 3deg), `RobotCompanion(read, 36px)` | P1-T02, P3, P5 | Not Started |
| P8-T04 | 404 page: `RobotCompanion(lost, 64px)` with mouse-follow look-toward | P5 | Not Started |

**Acceptance criteria:** Each page matches its named interaction intensity from design doc §5 with no bleed into other pages; all hover/tilt effects respect reduced motion and are disabled on mobile where specified.

**Required tests:** `npm test`, `npm run build`, manual pass over Work, Lab, About, 404 at desktop + 375px, reduced-motion check.

---

## Phase 9 — Performance Audit + Cleanup

**Goal:** Production-ready. Final gate before this plan is considered complete.
**Depends on:** P0–P8 all done.
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P9-T01 | Lighthouse audit on Home, Work, a project page, Lab, About — target Performance ≥90, Accessibility 100 on every page; fix regressions found | P8 | Not Started |
| P9-T02 | Audit all `will-change: transform` usage — confirm it's applied only to actively-animating elements, removed otherwise | P8 | Not Started |
| P9-T03 | Verify every ScrollTrigger/Lenis instance is cleaned up on unmount (no leaks across route changes — check with React DevTools profiler / manual route-cycling test) | P8 | Not Started |
| P9-T04 | Full reduced-motion regression pass across every page: confirm everything is disabled per design doc §10 | P8 | Not Started |
| P9-T05 | Full mobile (375px) regression pass across every page: environmental elements hidden, no pinning, clean scroll | P8 | Not Started |
| P9-T06 | Code-split the interaction layer for mobile (verify GSAP/Lenis-heavy modules aren't shipped to mobile bundles where unused) | P9-T01–P9-T05 | Not Started |
| P9-T07 | Run the full design doc §12 verification checklist end-to-end and record results | P9-T01–P9-T06 | Not Started |

**Acceptance criteria:** Every item in design doc §12 checked and passing; Lighthouse Performance ≥90 and Accessibility 100 on all 5 representative pages; no layout shift, no jank, no readability interference anywhere.

**Required tests:** `npm test`, `npm run build`, Lighthouse (5 pages), full manual pass per §12 checklist, reduced-motion + mobile regression passes.

---

## Dependency graph (phase level)

```
P0 → P1 → P2
        → P3 → P7
        → P4 → P5(needs P5-T00 decision) → P8
        → P6
(P7 also needs P1+P2+P3)
(P8 needs P3+P4+P5)
P0..P8 → P9
```
