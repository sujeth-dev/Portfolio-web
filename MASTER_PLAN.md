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
**Status:** In Progress

| ID | Task | Depends on | Status |
|---|---|---|---|
| P2-T01 | Rewrite `src/components/common/ScrollReveal.jsx` internals to GSAP ScrollTrigger, preserving its existing external props/API so no call sites change | P1 | Not Started |
| P2-T02 | Create `src/components/systems/VelocityEffects.jsx` + `src/styles/velocity-effects.css` (skew ≤2deg, stretch ≤1.01 scaleY, 20ms lag — all lerp to 0 on scroll stop) | P1 | Not Started |
| P2-T03 | Apply `VelocityEffects` to project pages and a small, named subset of Home sections (per design doc §5 Homepage table: Skills group cards, Thoughts cards) | P2-T02 | Not Started |

**Acceptance criteria:** Every existing `ScrollReveal` call site behaves identically (no prop changes needed); velocity effects are visually subtle and fully settle within ~300ms of scroll stopping; reduced motion disables velocity effects entirely.

**Required tests:** `npm test`, `npm run build`, visual regression pass on every page using `ScrollReveal` (Home, Work, Lab, About, ProjectPage), reduced-motion check.

---

## Phase 3 — Parallax + Section Backgrounds + Mobile Scroll System

**Goal:** Living, per-section backgrounds with 3-layer parallax depth on desktop; a real scroll-driven mobile version of `ProjectStage` replacing the static fallback strip.
**Depends on:** P1 done (P2 not required but recommended done first for a stable base).
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P3-T01 | Create `src/hooks/useParallax.js` (layer 1/2/3 strengths per design doc §2C table; no-op on reduced-motion/mobile) | P1 | Not Started |
| P3-T02 | Create `src/hooks/useSectionProgress.js` (thin ScrollTrigger wrapper for theme crossfade) | P1 | Not Started |
| P3-T03 | Create `src/components/systems/ParallaxLayer.jsx` + `src/components/systems/SectionBackground.jsx` | P3-T01, P3-T02 | Not Started |
| P3-T04 | Create `src/styles/section-backgrounds.css` with all 5 themes: `.bg-open`, `.bg-technical`, `.bg-messy`, `.bg-warm`, `.bg-signal` | P3-T03 | Not Started |
| P3-T05 | Add backgrounds to project pages first (validate), then Home page sections per design doc §5 table | P3-T04 | Not Started |
| P3-T06 | Build the mobile scroll-driven `ProjectStage`: non-sticky, inline layout (no split/pin), state transitions (identity → problem → architecture → engineering → results) driven by `useSectionProgress` scroll position instead of desktop's pin+scrub; lighter parallax (single layer or none per perf budget) via `useParallax`'s mobile path; replaces the static 200px illustration strip from P1-T07. Update `docs/FUTURE-ENVIRONMENT-LAYER.md` mobile section to match. | P3-T02, P3-T01, P1-T07 | Not Started |

**Acceptance criteria:** 3 parallax layers visibly respond differently to mouse/scroll on desktop; backgrounds crossfade gradually through scroll (no hard section cuts); background responds to `--mouse-x-norm`/`--mouse-y-norm`; mobile (<768px) no longer shows a static illustration strip — it shows the same 5-state story via scroll-triggered transitions, with parallax/background motion scaled down (not fully disabled) per the P3-T06 design; reduced motion still renders the final state immediately with no animation on both desktop and mobile.

**Required tests:** `npm test`, `npm run build`, manual scroll-through on project pages + Home at desktop and 375px (confirming mobile state transitions fire correctly), Lighthouse Performance spot-check (target stays ≥90 — full audit is P9).

---

## Phase 4 — Cursor Companion + Scroll Progress

**Goal:** Cursor label system and a Retro Toy scroll-progress gauge.
**Depends on:** P0 done.
**Status:** Not Started

| ID | Task | Depends on | Status |
|---|---|---|---|
| P4-T01 | Create `src/components/systems/CursorCompanion.jsx` + `src/styles/cursor-companion.css` (delegated mouseenter/mouseleave, `data-cursor` label pill, hidden on mobile/reduced-motion) | P0 | Not Started |
| P4-T02 | Create `src/components/systems/ScrollProgressIndicator.jsx` + `src/styles/scroll-indicator.css` (machine gauge, section notches, LED dots; robot marker deferred — see P5 open question) | P0 | Not Started |
| P4-T03 | Add `data-cursor="VIEW\|OPEN\|PLAY\|TRY\|EXPLORE"` attributes to interactive elements across Work, Lab, ProjectPage, Nav | P4-T01 | Not Started |
| P4-T04 | Mount `CursorCompanion` + `ScrollProgressIndicator` in `src/App.jsx` | P4-T01, P4-T02 | Not Started |

**Acceptance criteria:** Cursor companion appears with the correct label over every `data-cursor` element and nowhere else; scroll gauge tracks position and LED dots activate per section; both hidden below 768px and under reduced motion; `ScrollProgressIndicator` has `aria-label` + `aria-valuenow`.

**Required tests:** `npm test`, `npm run build`, manual hover pass over all `data-cursor` elements, screen-reader spot check on `ScrollProgressIndicator` (VoiceOver/NVDA or axe DevTools), mobile viewport check.

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
| P6-T01 | Create `src/components/systems/TypographyMotion.jsx` + `src/styles/typography-motion.css` (`slide-in`, `mask-reveal`, `parallax-drift` effects, all via ScrollTrigger scrub, immediate render under reduced motion) | P1 | Not Started |
| P6-T02 | Apply to hero name, section titles, and the selected oversized headings named in design doc §5 (Home hero mask-reveal, Skills heading slide-in) | P6-T01 | Not Started |

**Acceptance criteria:** Headings animate on scroll; body copy is unaffected; reduced motion renders immediately with no animation; semantic heading elements preserved (no `<div>` substitutions).

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
