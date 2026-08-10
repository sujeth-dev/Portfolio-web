# EXECUTION LOG

> Append-only. Never edit or delete a prior entry — to correct one, append a new entry that says so. Newest entries at the bottom. Format is fixed; see `DEVELOPMENT_LOOP.md` §10.

Entry template:

```
## YYYY-MM-DD HH:MM — <task-id>

Action:
<what was done, one or two sentences>

Changed:
- file1
- file2

Validation:
- unit tests: PASS|FAIL
- build: PASS|FAIL
- (other checks relevant to the task): PASS|FAIL

Git:
- commit: <hash or "none">
- push: SUCCESS|FAILED|"not applicable"

Next:
<task-id of what comes next, or blocker description>
```

---

## 2026-08-09 23:42 — P0-T00

Action:
Inspection/design/plan/document run (no feature implementation, per instructions). Read `docs/FUTURE-ENVIRONMENT-LAYER.md` (the existing Phase 3 design doc, 10 sections, phases 0–9, previously undocumented in any tracked plan). Read current repo state: `package.json`, `README.md`, full `src/` tree, `test/` tree, git log/status. Ran baseline `npm test` and `npm run build` to confirm a clean starting point. Cross-checked the design doc against actual repo state and found one drift: the design doc's Robot Integration section (§2, Phase 5) assumes `src/components/robot/Robot.jsx` (8-pose robot) still exists to be wrapped by a new `RobotCompanion.jsx` — but commit `5209461` ("Replace Robot with PixelRobot mascot everywhere, including favicon") deleted that file and replaced all usages with `src/components/common/PixelRobot.jsx`. Recorded this as an explicit open design question gating Phase 5 (`P5-T00`) rather than silently resolving it. Created `MASTER_PLAN.md` (10 phases broken into 45 small tasks, each with dependencies/acceptance criteria/required tests, mapped 1:1 to the design doc's own phase structure), `DEVELOPMENT_LOOP.md` (the exact READ→PLAN→DEVELOP→TEST→FIX→VERIFY→COMMIT→PUSH→LOG→UPDATE PLAN→NEXT TASK→REPEAT loop, retry budget, blocker handling, resume procedure), `PROGRESS.md` (current-state snapshot), and this file.

Changed:
- MASTER_PLAN.md (new)
- DEVELOPMENT_LOOP.md (new)
- PROGRESS.md (new)
- EXECUTION_LOG.md (new)

Validation:
- unit tests: PASS (6/6, `test/content.test.js`, baseline check — no code changed)
- build: PASS (clean, `dist/` produced — baseline check, no code changed)
- gsap/lenis presence check: NOT PRESENT (confirms Phase 0 has genuinely not started yet)

Git:
- commit: none (planning/documentation files not yet committed — awaiting user confirmation per this session's scope: "do NOT implement project features," commit left to explicit request)
- push: not applicable

Next:
P0-T01 — `npm install gsap lenis`, per `MASTER_PLAN.md` Phase 0 and `DEVELOPMENT_LOOP.md`. Before starting, the executing agent should also register the Phase 5 open design question with the user at the appropriate time (not blocking — P0 through P4/P6 and most of P7 can proceed first).

## 2026-08-09 23:52 — P0-T01

Action:
Installed GSAP and Lenis as production dependencies and confirmed their resolved versions in both npm manifests.

Changed:
- package.json
- package-lock.json
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- dependency presence check: PASS (`gsap@3.15.0`, `lenis@1.3.26`)
- task-specific manual checks: not applicable (dependency-only task; Phase 0 runtime checks begin after provider wiring)

Git:
- commit: self (`P0-T01: install GSAP and Lenis`)
- push: SUCCESS

Next:
P0-T02 — create `InteractionContext.js` and `InteractionProvider.jsx` per design doc §2A.

## 2026-08-10 00:00 — P0-T02

Action:
Created the interaction context and provider from design doc §2A. The provider owns Lenis lifecycle, runs Lenis and interpolated mouse/scroll metrics through one GSAP ticker, publishes the specified context shape and root CSS variables, tracks mobile state/current section, and disables motion under the existing reduced-motion hook.

Changed:
- src/systems/InteractionContext.js
- src/systems/InteractionProvider.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct provider bundle check: PASS (`esbuild`, browser ESM)
- context shape/spec review: PASS
- manual DevTools/reduced-motion checks: deferred to P0-T04 because the provider is intentionally not mounted until that task

Git:
- commit: self (`P0-T02: add interaction provider and context`)
- push: SUCCESS

Next:
P0-T03 — create `src/styles/interaction-layer.css` per design doc §4.

## 2026-08-10 00:02 — P0-T03

Action:
Created the interaction-layer stylesheet from design doc §4 with the full custom-property contract, shared stacking tokens, contained parallax positioning, active-animation-only `will-change`, and reduced-motion neutralization.

Changed:
- src/styles/interaction-layer.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct CSS parse check: PASS (`lightningcss`)
- §4 custom-property and runtime-rule review: PASS
- manual DevTools/reduced-motion checks: deferred to P0-T04 when this stylesheet is imported

Git:
- commit: self (`P0-T03: add interaction layer styles`)
- push: SUCCESS

Next:
P0-T04 — mount the provider, import the stylesheet, remove native smooth scrolling, and complete Phase 0 runtime validation.

## 2026-08-10 00:12 — P0-T04

Action:
Mounted `InteractionProvider` around the app shell inside `BrowserRouter`, imported the interaction-layer stylesheet, and removed native smooth scrolling. Completed Phase 0 runtime validation in local Chrome via the DevTools protocol, including pointer movement, wheel scrolling, computed root variables, visual layout, and reduced-motion emulation.

Changed:
- src/App.jsx
- src/main.jsx
- src/index.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (GSAP/Lenis bundled; JS 118.87KB gzip, CSS 4.17KB gzip)
- root custom properties: PASS (mouse, normalized mouse, velocity, direction, and section progress update live)
- Lenis/native scroll check: PASS (`html.lenis` active; computed `scroll-behavior: auto`)
- reduced-motion emulation: PASS (Lenis class removed; all motion variables frozen at neutral)
- visual layout check: PASS (settled 1280×800 homepage capture; no new visible layer or layout shift)
- browser runtime exceptions: PASS (none)

Git:
- commit: self (`P0-T04: wire interaction foundation`)
- push: SUCCESS

Next:
P1-T01 — create `useScrollEngine.js` per design doc §2B.

## 2026-08-10 00:15 — P1-T01

Action:
Created the §2B `useScrollEngine` hook as a thin ScrollTrigger wrapper. It exposes progress, active state, and direction; forwards progress/enter/leave callbacks in both scroll directions; and tears down its trigger and GSAP context on dependency changes or unmount.

Changed:
- src/hooks/useScrollEngine.js
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct hook bundle check: PASS (`esbuild`, browser ESM with ScrollTrigger)
- API/cleanup review: PASS (matches §2B signature and return shape; explicit trigger kill + context revert)
- task-specific manual checks: not applicable until P1-T04 consumes the hook

Git:
- commit: self (`P1-T01: add ScrollTrigger engine hook`)
- push: SUCCESS

Next:
P1-T02 — create `useMouseProximity.js` per design doc §2D.

## 2026-08-10 00:17 — P1-T02

Action:
Created the §2D `useMouseProximity` hook using the provider's shared, lerped pointer values. It computes 0–1 proximity, near state, and pointer angle on the shared GSAP ticker, supports normalized or binary radius behavior, returns neutral values for reduced motion/mobile, and removes its ticker callback on cleanup.

Changed:
- src/hooks/useMouseProximity.js
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct hook bundle check: PASS (`esbuild`, browser ESM)
- API/runtime-rule review: PASS (matches §2D return shape; no raw mouse handler or extra rAF loop; ticker cleanup present)
- task-specific manual checks: deferred until P1-T07/P5/P8 consumers are mounted

Git:
- commit: self (`P1-T02: add mouse proximity hook`)
- push: SUCCESS

Next:
P1-T03 — create `CompactHeader.jsx` and `compact-header.css`.

## 2026-08-10 00:20 — P1-T03

Action:
Created the compact project-page header and styles: an exact 44px sticky control strip with semantic back navigation, breadcrumb, project-file indicator, configurable accent line, responsive truncation, and visible keyboard focus.

Changed:
- src/components/layout/CompactHeader.jsx
- src/styles/compact-header.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct component bundle check: PASS (`esbuild`, browser ESM)
- direct CSS parse check: PASS (`lightningcss`)
- semantics/responsive/focus review: PASS
- project-page visual and keyboard checks: deferred to P1-T07/P1-T08 when the header is mounted

Git:
- commit: self (`P1-T03: add compact project header`)
- push: SUCCESS

Next:
P1-T04 — create `ProjectStage.jsx` and `project-stage.css` with five scroll states.

## 2026-08-10 00:24 — P1-T04

Action:
Created the generic ProjectStage shell and styles for identity, problem, architecture, engineering, and results progress bands. It exposes continuous progress to future SVG scenes, reuses existing architecture diagrams where available, includes generic fallbacks/state navigation, forces the results state under reduced motion, and becomes a 200px non-sticky strip below 768px.

Changed:
- src/components/project/ProjectStage.jsx
- src/styles/project-stage.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct component bundle check: PASS (`esbuild`, browser ESM)
- direct CSS parse check: PASS (`lightningcss`)
- five-state/reduced-motion/mobile review: PASS
- per-project visual transitions: deferred to P1-T05; mounted page checks deferred to P1-T07

Git:
- commit: self (`P1-T04: add five-state project stage`)
- push: SUCCESS

Next:
P1-T05 — create Synaptic, Possah, and Velmont lazy-loaded stage compositions.

## 2026-08-10 00:28 — P1-T05

Action:
Created three project-specific decorative SVG scenes and wired them into ProjectStage through literal `React.lazy` imports and Suspense. Synaptic draws a knowledge graph and BKT mastery bars, Possah moves a package through a payment terminal/receipt flow, and Velmont draws a blueprint building with construction measurements; all consume continuous stage progress and sit behind the generic state UI.

Changed:
- src/components/project/ProjectStage.jsx
- src/components/project/stages/SynapticStage.jsx
- src/components/project/stages/PossahStage.jsx
- src/components/project/stages/VelmontStage.jsx
- src/styles/project-stage.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- direct ProjectStage bundle check: PASS (`esbuild`, browser ESM including all scene modules)
- direct CSS parse check: PASS (`lightningcss`)
- lazy-loading/scene identity/accessibility review: PASS (three literal dynamic imports; decorative SVGs `aria-hidden`)
- mounted three-project desktop/mobile/reduced-motion checks: deferred to P1-T07 when ProjectStage is integrated

Git:
- commit: self (`P1-T05: add lazy project stage scenes`)
- push: SUCCESS

Next:
P1-T06 — create `ProjectNav.jsx` with previous/all-work/next navigation and enlarged next-project preview.

## 2026-08-10 10:02 — P1-T06

Action:
Created the semantic project navigation with previous and all-work routes plus an enlarged, project-accented next-project preview. Added explicit responsive grid placement so the preview stacks first on mobile and the final project collapses without an empty row, with visible hover and keyboard-focus states.

Changed:
- src/components/project/ProjectNav.jsx
- src/index.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 20.86KB / 4.64KB gzip; JS 366.93KB / 118.87KB gzip)
- responsive layout: PASS (1280px and 375px; no horizontal overflow; first/middle/final navigation states checked)
- link destinations: PASS (previous, all work, and next routes)
- hover and keyboard focus: PASS (accent transform/shadow; 3px focus-visible outline)

Git:
- commit: self (`P1-T06: add project navigation`)
- push: SUCCESS

Next:
P1-T07 — mount the compact header, scrolling content, sticky ProjectStage, and ProjectNav in the restructured project page.

## 2026-08-10 10:14 — P1-T07

Action:
Restructured featured case studies into one 55/45 scene with scrolling semantic content and a sticky ProjectStage driven by scene progress. Wired CompactHeader and ProjectNav, added the 200px non-sticky mobile stage above content, and reset project scenes before ScrollTrigger initialization during next-project route changes.

Changed:
- src/pages/ProjectPage.jsx
- src/index.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 30.54KB / 6.56KB gzip; main JS 418.64KB / 138.67KB gzip; three stage scenes emitted as lazy chunks)
- desktop layout and five-state transitions: PASS (all 3 featured projects at 1280×800; exact 55/45 columns; sticky top 68px; identity → problem → architecture → engineering → results)
- mobile fallback: PASS (all 3 projects at 375×812; 200px relative stage above content; no horizontal overflow)
- reduced motion: PASS (results state at 100%, content visible, Lenis inactive)
- keyboard and route navigation: PASS (natural content-to-project-nav tab order; no trap; next route returns to scroll top in identity state)
- browser runtime exceptions: PASS (none)

Git:
- commit: self (`P1-T07: integrate project page scene`)
- push: SUCCESS

Next:
P1-T08 — conditionally render the full Nav versus CompactHeader on project routes and complete the Phase 1 validation gate.

## 2026-08-10 10:33 — P1-T08

Action:
Centralized route-aware header selection in App: featured project routes now render the project-specific CompactHeader and no main Nav, while Home, Work, Lab, About, and non-project routes retain the full Nav. Removed the page-local header mount and completed the full Phase 1 regression gate. Preserved the newly recorded direction that ProjectStage is the primary storytelling surface and that Phase 3 will replace P1's interim static mobile strip with a real mobile scroll system.

Changed:
- src/App.jsx
- src/pages/ProjectPage.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 30.54KB / 6.56KB gzip; main JS 418.70KB / 138.71KB gzip; three stage scenes remain lazy chunks)
- conditional headers: PASS (full Nav on Home/Work/Lab/About; only 44px CompactHeader on all 3 featured project routes)
- desktop Phase 1 regression: PASS (all 3 projects at 1280×800; exact 55/45 layout; sticky stage; all 5 states)
- mobile Phase 1 regression: PASS (all 3 projects at 375×812; 200px relative interim stage; no overflow)
- reduced motion: PASS (results state at 100%, content visible, Lenis inactive)
- keyboard navigation: PASS (natural CompactHeader → case-study links → ProjectNav order; no trap)
- browser runtime exceptions: PASS (none)

Git:
- commit: self (`P1-T08: route project compact header`)
- push: SUCCESS

Next:
P2-T01 — migrate ScrollReveal internals to GSAP ScrollTrigger while preserving its public API and call sites.

## 2026-08-10 10:37 — P2-T01

Action:
Replaced ScrollReveal's IntersectionObserver/CSS-transition internals with a one-shot GSAP ScrollTrigger animation while preserving the existing children, className, and millisecond delay API. Reused the interaction layer's active-animation marker for bounded will-change and made reduced motion render immediately without creating a trigger.

Changed:
- src/components/common/ScrollReveal.jsx
- src/index.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 30.42KB / 6.54KB gzip; main JS 418.99KB / 138.82KB gzip)
- call-site compatibility: PASS (all existing Home, Work, Lab, About, and ProjectPage usages unchanged; 52 mounted instances exercised)
- reveal lifecycle: PASS (off-screen hidden; triggers on entry; delays preserved; settles once; stays visible when revisited)
- reduced motion: PASS (all reveals immediately visible, settled, and inactive on every consuming page)
- cleanup review: PASS (GSAP context reverts on dependency change/unmount; active marker cleared)
- browser runtime exceptions: PASS (none)

Git:
- commit: self (`P2-T01: migrate ScrollReveal to GSAP`)
- push: SUCCESS

Next:
P2-T02 — create the reusable VelocityEffects component and restrained velocity-effects stylesheet.

## 2026-08-10 10:41 — P2-T02

Action:
Created the reusable VelocityEffects wrapper and stylesheet. It maps the provider's shared velocity to independently selectable skew, stretch, and translated-lag effects, caps every value, applies the specified 20ms lag response, marks will-change only while tweening, and eases exactly back to neutral after scrolling stops.

Changed:
- src/components/systems/VelocityEffects.jsx
- src/styles/velocity-effects.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (final tree; temporary mounted build also PASS with component and CSS included)
- runtime caps: PASS (observed max 1.9084deg skew, 1.009542 scaleY, 7.6336px lag; all below specified limits)
- settling: PASS (skew 0deg, scaleY 1, lag 0px, active marker false within 300ms after scroll stopped)
- reduced motion: PASS (neutral variables, transform none, active marker false during wheel input)
- cleanup review: PASS (in-flight GSAP tweens killed on updates and unmount)

Git:
- commit: self (`P2-T02: add velocity effects`)
- push: SUCCESS

Next:
P2-T03 — apply VelocityEffects to project pages and the named Home Skills and Thoughts card groups.

## 2026-08-10 10:44 — P2-T03

Action:
Applied the combined restrained velocity response to the project-page narrative column and lag-only response to the four Home skill-group cards, exactly limiting the integration to the named existing targets. The design document's named Thoughts cards do not exist in the current Home implementation, so no new section was invented; the mismatch is recorded in the plan.

Changed:
- src/pages/ProjectPage.jsx
- src/pages/Home.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 30.80KB / 6.63KB gzip; main JS 420.10KB / 139.15KB gzip)
- integration scope: PASS (one project narrative wrapper; four Home skill wrappers; zero VelocityEffects elsewhere on Home)
- project layout regression: PASS (55/45 desktop ratio, sticky stage, no horizontal overflow)
- runtime response and settling: PASS (non-zero restrained transforms during scroll; exact 0deg / 1 / 0px neutral state and inactive marker after stop)
- mobile regression: PASS (375px, 200px relative stage, no horizontal overflow)
- reduced motion: PASS (transform none, inactive marker false)
- Thoughts target audit: NOT APPLICABLE (no Thoughts section/cards exist in current Home page)

Git:
- commit: self (`P2-T03: apply velocity effects`)
- push: SUCCESS

Next:
P3-T01 — create the three-layer parallax hook with responsive and reduced-motion behavior.

## 2026-08-10 11:00 — P3-T01

Action:
Created the §2C `useParallax` hook. It reads the provider's lerped mouse position via a render-updated ref (matching the `useMouseProximity` pattern) and drives a per-element GSAP `gsap.set` transform on the shared ticker: mouse offset scaled by viewport dimensions and the layer's `mouseStrength`, plus a scroll-linked offset from a local ScrollTrigger (`top bottom` → `bottom top`, scrubbed) scaled by `scrollStrength`. Layer 1/2/3 default strengths match the design doc table exactly (0.01/0.02, 0.03/0.05, 0.05/0.03) and can be overridden per call. Reduced motion or mobile clears any transform and skips creating a ticker callback or ScrollTrigger entirely.

Changed:
- src/hooks/useParallax.js
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (unchanged bundle — hook not yet consumed by any component)
- direct hook bundle check: PASS (`esbuild`, browser ESM)
- §2C signature/strength-table review: PASS (matches `useParallax(elementRef, { layer, mouseStrength, scrollStrength, axis })`; layer table exact)
- reduced-motion/mobile no-op review: PASS (early return, `clearProps: 'transform'`, no ticker/trigger created)
- task-specific manual checks: not applicable until P3-T03 (`ParallaxLayer`) consumes the hook

Git:
- commit: self (`P3-T01: add parallax hook`)
- push: SUCCESS

Next:
P3-T02 — create `useSectionProgress.js` as a thin ScrollTrigger wrapper for theme crossfade.

## 2026-08-10 11:05 — P3-T02

Action:
Created the §2E `useSectionProgress` hook: a thin ScrollTrigger wrapper tracking a single element's own pass through the viewport (`top bottom` → `bottom top`, scrubbed) and returning `{ progress, isInView }`, matching the design doc's exact signature and return shape for the background system's future theme crossfade.

Changed:
- src/hooks/useSectionProgress.js
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (unchanged bundle — hook not yet consumed)
- direct hook bundle check: PASS (`esbuild`, browser ESM)
- §2E signature/return-shape review: PASS
- cleanup review: PASS (trigger.kill + gsap.context revert on unmount/ref change)
- task-specific manual checks: not applicable until P3-T03 (`SectionBackground`) consumes the hook

Git:
- commit: self (`P3-T02: add section progress hook`)
- push: SUCCESS

Next:
P3-T03 — create `ParallaxLayer.jsx` and `SectionBackground.jsx`.

## 2026-08-10 11:12 — P3-T03

Action:
Created `ParallaxLayer.jsx`, a thin `layer`-indexed wrapper that attaches `useParallax` to a ref and maps layer 1/2/3 to the existing `--z-bg`/`--z-env`/`--z-fg` stacking tokens, reusing the `.parallax-layer` positioning class already defined in `interaction-layer.css`. Created `SectionBackground.jsx`, a per-section themed container: it always mounts its ref-bearing div (so `useSectionProgress` keeps working correctly across responsive breakpoint changes, avoiding a stale-closure hook-never-reattaches bug), crossfades opacity across its own scroll pass using `useSectionProgress`'s progress/isInView, forces static full opacity under reduced motion, and suppresses its theme class, pattern layer, and opacity (rather than unmounting) on mobile per the design doc's §9 "section backgrounds disabled on mobile" rule. Added a minimal `.section-background` base-positioning rule (and its reduced-motion override) to `interaction-layer.css`, since that file is explicitly scoped for base system/positioning styles; left all 5 `.bg-*` theme fills for P3-T04 as planned.

Changed:
- src/components/systems/ParallaxLayer.jsx
- src/components/systems/SectionBackground.jsx
- src/styles/interaction-layer.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (JS bundle unchanged — neither component consumed yet; CSS 30.95KB / 6.65KB gzip, +0.15KB from the new base rule)
- direct component bundle check: PASS (`esbuild`, browser ESM, both components)
- props/behavior review vs §3 spec: PASS (ParallaxLayer: `{ layer, className, style, children }`, correct z-index, pointer-events none via existing class; SectionBackground: `{ theme }`, layer-1 parallax pattern, crossfade via `useSectionProgress`)
- reduced-motion/mobile review: PASS (reduced motion → opacity 1 static, no transition; mobile → opacity 0, no theme class, no pattern layer, ref still mounted)
- task-specific manual/visual checks: not applicable until P3-T05 mounts `SectionBackground` on real pages

Git:
- commit: self (`P3-T03: add parallax layer and section background`)
- push: SUCCESS

Next:
P3-T04 — create `src/styles/section-backgrounds.css` with all 5 themes.

## 2026-08-10 11:18 — P3-T04

Action:
Created `section-backgrounds.css` with the five themes named in the design doc (`.bg-open`, `.bg-technical`, `.bg-messy`, `.bg-warm`, `.bg-signal`), built entirely from existing `index.css` design tokens (no new colors introduced). Each theme sets the section wash color on `.section-background` itself and a distinct dot/grid/scatter/glow/ring pattern on the `.section-background__pattern` child. Deliberately did not add a separate CSS `--mouse-x-norm`/`--mouse-y-norm` transform rule on that pattern element: it's already the `ParallaxLayer` from P3-T03, whose `useParallax` hook writes an inline GSAP transform every frame from the same underlying lerped mouse position — a competing CSS transform rule on the same element/property would just be silently overridden by the inline style, so the §6 "responds to pointer position" criterion is met through the existing JS path instead of a redundant one. Imported the new stylesheet directly in `SectionBackground.jsx`, matching this codebase's per-component CSS import convention.

Changed:
- src/styles/section-backgrounds.css
- src/components/systems/SectionBackground.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (bundle unchanged — `SectionBackground` still unconsumed by any page)
- direct CSS bundle/parse check: PASS (`esbuild` CSS bundler, 1.8kb output)
- direct component bundle check: PASS (`esbuild`, browser ESM, CSS import stubbed)
- theme/token review: PASS (all 5 themes present; colors sourced only from existing `--bg`/`--bg-dark`/`--cream`/`--border`/`--faint`/`--yellow` tokens)
- task-specific manual/visual checks: not applicable until P3-T05 mounts `SectionBackground` on real pages

Git:
- commit: self (`P3-T04: add section background themes`)
- push: SUCCESS

Next:
P3-T05 — mount SectionBackground on project pages first, validate, then Home page sections.

## 2026-08-10 11:40 — P3-T05

Action:
Mounted `SectionBackground` for the first time. Design doc §5 names a theme for every Home section and for the standalone Work/Lab/About pages, but not for the dynamic project-page scene (`/work/:slug`) — since `MASTER_PLAN.md`'s own task row still says "project pages first (validate)", resolved that gap as an implementing judgment call: `technical` theme on the project-page scene, matching the Work page's own technical assignment and the case-study content's technical nature (documented here rather than guessed silently). Wrapped each target section (project scene; Home Hero/Selected-Work/Skills/Contact) in the existing `.interaction-layer` utility class so each background's `z-index: -10` stays contained to its own local stacking context instead of interacting with unrelated sections. Added an `intensity` prop to `SectionBackground` (multiplies final opacity) to implement the "Skills: technical (lighter)" wording from §5 — used `intensity={0.35}` there; the same prop is available for Work page's later "reduced opacity 0.3" case in Phase 8. Left Experience/Currently (no theme in §5) and the non-existent Thoughts section (already dead per P2-T03) untouched, and left Work/Lab/About standalone pages untouched since their `SectionBackground` assignments belong to Phase 8 (P8-T02/T03), not this task.

Verified with real browser automation rather than static analysis: started `npm run preview`, drove Playwright/Chromium against Home and the Synaptic project page. First attempt used `fullPage` screenshots and showed most below-fold content missing — traced this to a capture artifact (resizing the viewport instantly for a full-page shot never fires the real scroll events ScrollReveal's GSAP ScrollTrigger and Lenis depend on, so those triggers never activate) rather than a real regression; re-verified by driving genuine `page.mouse.wheel` scroll steps instead, which produced fully correct renders at both viewport sizes. Also captured a `reducedMotion: 'reduce'` context pass, where ScrollReveal's existing immediate-render behavior meant even the `fullPage` shot came back fully populated, corroborating the capture-artifact diagnosis.

Changed:
- src/components/systems/SectionBackground.jsx
- src/pages/ProjectPage.jsx
- src/pages/Home.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 32.24KB / 6.91KB gzip; main JS 422.60KB / 139.91KB gzip — `SectionBackground`/`ParallaxLayer` now actually bundled, consistent size increase from P3-T03/T04's previously-unconsumed components)
- browser console/page errors: PASS (none, across all scroll-through and reduced-motion passes)
- desktop (1280×900) scroll-through: PASS — Home Hero shows sparse dot pattern, Selected Work and Skills show the technical grid at full and 0.35 intensity respectively (Skills barely tinted, as intended), Contact shows the signal ring pattern cleanly against the existing dark section, project page shows the technical grid behind the case-study narrative without hurting text contrast
- mobile (375×812) scroll-through: PASS — `SectionBackground` correctly renders nothing (opacity 0, no theme class, no pattern layer) on both Home and the project page; only the pre-existing site-wide body dot pattern remains; no horizontal overflow, no layout shift
- reduced motion: PASS — full opacity, static, all `ScrollReveal` content immediately visible, no animation
- z-index containment review: PASS (`.interaction-layer` isolation scopes each section's negative z-index background locally; no bleed observed between sections in any screenshot)

Git:
- commit: self (`P3-T05: mount section backgrounds`)
- push: SUCCESS

Next:
P3-T06 — build the mobile scroll-driven ProjectStage (non-sticky, inline, five-state), replacing the interim 200px strip. Also resolve, as part of that task, whether `useParallax`'s current hard no-op on `isMobile` (P3-T01) needs an opt-in "mobile path" to satisfy this task's "lighter parallax... via useParallax's mobile path" wording.

## 2026-08-10 12:35 — P3-T06

Action:
Replaced the interim static 200px mobile `ProjectStage` strip with a genuine scroll-driven five-state story. `ProjectStage` now checks `isMobile` and branches entirely to a new `MobileProjectStage`, which stacks all 5 states (identity → problem → architecture → engineering → results) as separate panels in normal document flow — non-sticky, no split/pin, matching the task's explicit layout requirement. Each panel independently reveals via its own `useSectionProgress(panelRef, { once: true })` call as it scrolls into view, rather than the desktop single-instance crossfade driven by one continuous `scrollProgress` prop. Extracted the existing per-state panel markup (monogram, problem bars, `ArchDiagram`/node-map fallback, terminal, result mark) into a shared `PanelBody` helper so desktop and mobile render identical content with zero duplication; desktop's own rendering path is otherwise untouched. Deliberately did not mount the lazy per-project SVG scenes (Synaptic/Possah/Velmont) on mobile, matching the design doc's mobile performance budget. Added one `ParallaxLayer(layer=1, mobileScale=0.3)` as the mobile stage's only motion.

That single parallax layer required resolving the open question flagged in the P3-T05 log entry: `useParallax` (P3-T01) hard no-ops on `isMobile` with no exception, but this task's wording ("lighter parallax... via `useParallax`'s mobile path") implies an opt-in path should exist. Extended `useParallax`/`ParallaxLayer` with a `mobileScale` option (default `0`, preserving the exact prior no-op for every existing caller — `SectionBackground`'s pattern layer never passes it) that scales both mouse and scroll strength on mobile instead of skipping entirely. Documented this as an explicit, named exception in `docs/FUTURE-ENVIRONMENT-LAYER.md` §9 rather than silently contradicting its general "parallax... disabled on mobile" rule. Also updated that doc's §3 (`ProjectStage.jsx` spec) and §5 (Project Pages mobile behavior), both of which described the now-removed static strip.

Verification surfaced a real performance regression, caught and fixed before commit (DEVELOPMENT_LOOP.md §5 FIX):
- First implementation gave each `MobileStagePanel` a plain, continuously-scrubbed `useSectionProgress` call. A mobile-throttled Lighthouse run (default CLI preset: mobile form factor, 4x CPU slowdown) against the Synaptic project page scored Performance 64.
- To determine whether this was a genuine regression or a pre-existing condition, checked out the last pre-Phase-3 commit (`5b70d5e`) into a disposable `git worktree`, built and served it, and ran the identical Lighthouse check: baseline Performance was 82. This confirmed a real ~18-point regression from this task's own code, traced to Total Blocking Time ballooning from 90ms to 680ms — five concurrently-scrubbing `ScrollTrigger` instances (each with an `onUpdate`-driven `setState` on every ~0.001 progress delta) on one page, on top of the project page's pre-existing ScrollReveal/useScrollEngine triggers.
- Fix: added an `once` option to `useSectionProgress` (P3-T02's hook) that disables `scrub` entirely for one-shot reveal use, used by `MobileStagePanel`. Re-measured: Performance 83, materially recovering the baseline.
- While verifying the fix's visual correctness (scroll down through all 5 panels, then back up — panels should stay revealed, matching typical one-shot reveal UX and avoiding a flicker-on-scroll-up), direct DOM inspection (`data-revealed` attributes + `scrollY` at each step) caught a second bug: GSAP's native `ScrollTrigger` `once: true` option does **not** suppress `onLeave`/`onLeaveBack` as its name suggests — panels were un-revealing again as soon as they scrolled out of view, contradicting the intended "reveal once and stay" behavior. Fixed by adding an explicit state latch in `useSectionProgress` itself (once `previous.isInView` is `true` under `once` mode, further `setInView` calls are ignored) plus a manual `trigger.kill()` right after the first true reveal — verified correct via the same DOM-inspection script through a full down-then-up scroll sequence, and via direct screenshot after that sequence. Final Lighthouse re-check after this correctness fix: Performance 84 (no regression from the latch), Accessibility 100.
- This whole loop (build → Lighthouse spot-check → root-cause via baseline worktree comparison → fix → re-verify both performance and correctness with real Playwright scroll automation and direct DOM state inspection, not just visual screenshots) is the reason this task's log entry is long: a screenshot-only check would have shown "content displays" in both the broken and fixed versions, since the bug only manifested across a scroll-down-then-up sequence.

Also re-checked Phase 3's combined acceptance-criteria block (this repo's convention checks it once after a phase's last task) against actual UI state: "3 parallax layers visibly respond differently" is functionally true in the hook but layers 2/3 have no live consumer yet, since no P3 task asked for one. Adjusted `MASTER_PLAN.md`'s Phase 3 acceptance-criteria block directly (permitted per DEVELOPMENT_LOOP.md §11) with an explicit note rather than silently claiming full compliance or treating it as a blocker — every literal task deliverable in P3-T01–T06 is independently complete and verified.

Changed:
- src/hooks/useParallax.js
- src/hooks/useSectionProgress.js
- src/components/systems/ParallaxLayer.jsx
- src/components/project/ProjectStage.jsx
- src/styles/project-stage.css
- docs/FUTURE-ENVIRONMENT-LAYER.md
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6, re-run after every fix iteration)
- build: PASS (CSS 33.14KB / 7.04KB gzip; main JS 423.31KB / 140.20KB gzip)
- browser console/page errors: PASS (none, across every Playwright pass)
- desktop (1280×900) regression: PASS — Synaptic project page sticky stage, five-state crossfade, and per-project SVG scenes render identically to pre-P3-T06 behavior
- mobile (375×812) scroll-through, all 3 featured projects: PASS — Synaptic, Possah, Velmont each show a genuine 5-panel scroll story with correct accent colors, correct architecture content (`ArchDiagram` for Synaptic/Possah, node-map fallback for Velmont), dashed panel separators, and the subtle parallax grid
- reveal-latch correctness (scroll down 5 steps, then up 5 steps back to top): PASS — verified via direct DOM inspection (`data-revealed` + `scrollY` per step) and a final screenshot; all panels remain revealed throughout
- reduced motion: PASS — full `fullPage` screenshot renders every mobile panel and all text content immediately, confirming both `ScrollReveal` and the new mobile panels skip animation entirely
- Lighthouse mobile spot-check (Synaptic project page, default CLI preset — mobile, 4x CPU, throttled network): Performance 84 vs. an 82 pre-Phase-3 baseline (net improvement, not a regression); Accessibility 100
- Lighthouse desktop-preset spot-check: Performance 90, Accessibility 95
- z-index/stacking review: PASS (`.project-stage--mobile` gets `position: relative; isolation: isolate;`, containing the `ParallaxLayer`'s negative z-index locally)

Git:
- commit: self (`P3-T06: add mobile scroll-driven project stage`)
- push: SUCCESS

Next:
P4-T01 — create `CursorCompanion.jsx` + `cursor-companion.css` (Phase 4 is next eligible phase; depends only on P0, already Done).

## 2026-08-10 13:05 — P4-T01

Action:
Created `src/components/systems/CursorCompanion.jsx`: a fixed-position label pill that lerps toward the raw mouse position (factor 0.15, independent of `InteractionProvider`'s own 0.08-factor lerp, tracked via its own `mousemove` listener + `gsap.ticker` tick) and reads `data-cursor` off whatever element the pointer is over via document-level `mouseenter`/`mouseleave` listeners registered with `capture: true`. Deliberately used `mouseenter`/`mouseleave` rather than `mouseover`/`mouseout`, and checked `event.target.dataset.cursor` directly rather than `event.target.closest('[data-cursor]')`: since `mouseenter`/`mouseleave` fire only on the exact element whose boundary was crossed (no bubble-emulation for descendants), a direct-attribute check means moving across a `data-cursor` element's internal children (e.g. an icon + text inside one link) never fires a spurious leave/re-enter on the parent — `closest()` would have misfired here, since a child's own `mouseleave` event resolves to the same ancestor via `closest()`, clearing the label while the pointer is still inside the parent. Renders `null` entirely (no listeners attached, no DOM node) under `reducedMotion` or `isMobile`, per the design doc and acceptance criteria. Added `src/styles/cursor-companion.css`: `position: fixed`, `pointer-events: none`, `z-index: var(--z-cursor-companion)` (pre-existing token, previously unused), opacity crossfade via `[data-visible]`, pill styled from existing tokens (`--yellow` fill, `--ink` border, `--shadow-sm`, `--font-label`), plus a `display: none` fallback for both the `(max-width: 767px)` and `(prefers-reduced-motion: reduce)` media queries (belt-and-suspenders alongside the JS-level `null` return).

This task only creates the component per its `MASTER_PLAN.md` row — mounting in `App.jsx` is P4-T04 and rolling out `data-cursor` attributes across pages is P4-T03, so neither was done here. To exercise the component before either of those tasks exists, temporarily mounted `<CursorCompanion />` in `App.jsx` and added a single `data-cursor="VIEW"` attribute to `Nav.jsx`'s logo link, ran a Playwright verification pass, then reverted both files back to their exact original content (confirmed via `git diff` showing zero changes) before committing — only the two new files were staged and committed.

Changed:
- src/components/systems/CursorCompanion.jsx (new)
- src/styles/cursor-companion.css (new)
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 33.14KB / 7.04KB gzip; main JS 423.31KB / 140.20KB gzip — CursorCompanion not yet in the bundle since nothing imports it until P4-T04)
- manual hover pass (temporary mount, Playwright, 1280×900): PASS — pill hidden before hover (`data-visible="false"`), shows "VIEW" over the `data-cursor="VIEW"` element, stays visible and correctly labeled when hovering a nested child of that element (no flicker), hides again on moving away
- reduced motion (temporary mount, Playwright): PASS — `.cursor-companion` does not exist in the DOM at all (`exists: false`)
- mobile viewport 375×812 (temporary mount, Playwright): PASS — `.cursor-companion` does not exist in the DOM at all
- browser console/page errors: PASS (none)
- working-tree cleanliness: PASS — `App.jsx`/`Nav.jsx` temporary test edits reverted and confirmed via empty `git diff` before staging; only the two new files committed

Git:
- commit: self (`P4-T01: add cursor companion component`, `753d0c3`)
- push: SUCCESS

Next:
P4-T02 — create `ScrollProgressIndicator.jsx` + `scroll-indicator.css` (machine gauge, section notches, LED dots; depends only on P0, already Done; independent of P4-T01).

## 2026-08-10 13:35 — P4-T02

Action:
Created `src/components/systems/ScrollProgressIndicator.jsx`: a fixed-right, vertically-centered Retro Toy gauge (`role="progressbar"`, `aria-label="Page scroll progress"`, `aria-valuemin`/`aria-valuemax`/`aria-valuenow` driven by `useInteraction().scrollProgress`). It discovers the current page's sections via `document.querySelectorAll('[data-section], main section')` — the same selector `InteractionProvider` already uses internally for `currentSection` — and renders one tick-mark notch plus one LED dot per section, positioned proportionally along the track by each section's scroll-top fraction of total document height. The LED for whichever section matches `currentSection` lights up (`--green` fill + glow). Per `MASTER_PLAN.md`'s P4-T02 row (overriding the design doc's mention of a robot marker), no robot is included — that's deferred to P5-T03. Renders `null` (fully unmounted, not just CSS-hidden) under `reducedMotion` or `isMobile`, matching `CursorCompanion`'s pattern and justified functionally too: `InteractionProvider` zeroes `scrollProgress` to 0 permanently under reduced motion, so rendering a "live" gauge in that state would be actively misleading, not just decorative.

**Caught and fixed a real bug during verification (DEVELOPMENT_LOOP.md §5 FIX, attempt 1 of 3, new root cause):** the first implementation generated each section's matching id as `` `${classList[0] || 'section'}-${index}` `` to guarantee unique React keys, but `InteractionProvider`'s own `currentSection` resolution has no such index suffix (`dataset.section || id || classList[0] || 'section'`). Any section without a stable `id` (4 of Home's 6 sections) therefore never matched, and the "active LED" was silently `undefined` the entire time — direct DOM inspection via Playwright (checking `.scroll-indicator__led[data-active="true"]` after both initial load and a full scroll-through) caught this; a screenshot alone would not have, since the gauge track and fill height rendered correctly regardless. Fixed by computing the match-id with the exact same fallback chain (no suffix) and using a separate `` `${id}-${index}` `` value only for the React `key` prop. Re-verified: active LED now correctly reports `~2%` near the top (hero) and `100%` after scrolling to the bottom (final section), matching `currentSection` at each point.

Changed:
- src/components/systems/ScrollProgressIndicator.jsx (new)
- src/styles/scroll-indicator.css (new)
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6, re-run after the fix)
- build: PASS (CSS 34.23KB / 7.21KB gzip; main JS 424.61KB / 140.53KB gzip while temporarily mounted for verification — not part of the actual committed bundle since nothing imports it until P4-T04)
- manual scroll pass (temporary mount, Playwright, 1280×900, Home page): PASS — `role="progressbar"` + `aria-label`/`aria-valuemin`/`aria-valuemax`/`aria-valuenow` all present and correct (0 at top, 100 at bottom), 6 sections detected (matches Home.jsx's 6 `<section>` elements), active LED tracks scroll position correctly after the fix
- reduced motion (temporary mount, Playwright): PASS — `.scroll-indicator` does not exist in the DOM at all
- mobile viewport 375×812 (temporary mount, Playwright): PASS — `.scroll-indicator` does not exist in the DOM at all
- browser console/page errors: PASS (none)
- screen-reader spot check: no `axe-core` in `node_modules`; performed a manual ARIA-structure audit instead (role/label/value attributes confirmed present and semantically correct above; decorative notch/LED `<span>`s carry no interactive semantics and need none, being plain children of the labelled `progressbar` container)
- working-tree cleanliness: PASS — `App.jsx` temporary test mount reverted and confirmed via empty `git diff --stat` before staging; only the two new files committed

Git:
- commit: self (`P4-T02: add scroll progress indicator component`, `5702a4a`)
- push: SUCCESS

Next:
P4-T03 — add `data-cursor="VIEW|OPEN|PLAY|TRY|EXPLORE"` attributes to interactive elements across Work, Lab, ProjectPage, Nav (depends on P4-T01, Done).

## 2026-08-10 14:05 — P4-T03

Action:
Rolled out `data-cursor` attributes per the design doc's explicit assignments plus judgment calls for the parts it left unspecified (§5 names `VIEW` on Work project cards and `TRY`/`EXPLORE` on Lab cartridges, but never assigns `OPEN` or `PLAY` to a concrete location, and never mentions ProjectPage or Nav specifics at all despite `MASTER_PLAN.md`'s P4-T03 row listing both). Decisions made and applied:
- **Work.jsx** (`project-card`): featured-tier cards (internal `Link` to a case study) get `VIEW`; secondary/other-tier cards (external `<a target="_blank">`) get `OPEN` — the design doc's literal "VIEW on project cards" wording covers the case-study cards; `OPEN` was the natural unused vocabulary word for "opens an external destination."
- **Lab.jsx** (`lab-cartridge`, the whole cartridge div, not the inner "View ↗" link): `TRY` if the entry has a live `url` (something to actually go try), `EXPLORE` if not (concept-only entry with nothing to launch — e.g. AirDraw, `url: null`). No field in the data model names this distinction explicitly; this is a documented interpretive choice, not a spec-literal one.
- **ProjectPage.jsx**: all three external CTA links (`project-meta-link`, "Live Site ↗", "Source Code ↗") get `OPEN`.
- **ProjectNav.jsx**: prev/next `DirectionLink`s and the "All work" link all get `VIEW`, consistent with Work page's case-study convention (all three navigate to more internal case-study content).
- **Nav.jsx**: `OPEN` on Resume, GitHub, and LinkedIn links (desktop nav bar and mobile drawer duplicates) — all open an external destination in a new tab. Deliberately did **not** add `data-cursor` to the four in-app nav links (Home/Work/Lab/About) or the hamburger toggle — none of the five vocabulary words fit plain in-app navigation or a UI control, and the design doc never assigns cursor labels to ordinary nav links anywhere.
- `PLAY` is left unused: no element on the current site is an embedded/playable demo (Lab entries only link out); forcing it onto something would be inventing content rather than labeling it. Documented rather than silently ignored.

**Caught and fixed a false-positive test failure during verification (DEVELOPMENT_LOOP.md §5 FIX, attempt 1 of 3 — root cause was the test harness, not the product):** an initial Playwright pass using manual `mouse.move()` to each card's `boundingBox()` coordinates reported the 6 non-featured Work cards and both ProjectNav links showing no label at all. Before assuming a real bug, checked the underlying DOM directly (`getAttribute('data-cursor')` on all 9 `.project-card`s) — every attribute was present and correct, `VIEW`/`OPEN` exactly as intended. Root cause: those elements were below the fold (grid overflow / bottom-of-page nav), so `boundingBox()` returned viewport-relative coordinates outside the actual visible canvas, and `mouse.move()` (unlike `.hover()`) does not auto-scroll. Rewrote the check to use Playwright's `elementHandle.hover()` (which scrolls the target into view first) after an initial full scroll-through to let `ScrollReveal` un-hide each element (a bare `.hover()` on a still-`opacity:0` `ScrollReveal` child times out, correctly, since it's genuinely not interactable yet). Re-ran: 19/19 checks passed except one expected non-match (`.project-nav__direction--prev` not present on Synaptic, since it's the first featured project and has no previous — confirmed correct by separately checking the prev-link on Possah, which does have a previous project, and it passed).

Changed:
- src/components/layout/Nav.jsx
- src/components/project/ProjectNav.jsx
- src/pages/Lab.jsx
- src/pages/ProjectPage.jsx
- src/pages/Work.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 33.14KB / 7.04KB gzip; main JS 423.62KB / 140.26KB gzip)
- manual hover pass (temporary `CursorCompanion` mount in `App.jsx`, reverted before commit, Playwright, 1280×900): PASS — 20/20 checks correct across Work (9 cards), Lab (2 cartridges), ProjectPage (3 external CTAs + 2 ProjectNav directions on Possah, All-work link on Synaptic), and Nav (GitHub/LinkedIn/Resume) after fixing the off-screen-hover test-harness bug
- direct DOM attribute audit (no hover simulation): PASS — all 9 Work cards, both Lab cartridges, both ProjectNav direction links, and all Nav external links carry the intended `data-cursor` value
- browser console/page errors: PASS (none)
- working-tree cleanliness: PASS — `App.jsx` temporary mount reverted, confirmed via empty `git diff --stat` before staging; only the five intended files committed

Git:
- commit: self (`P4-T03: add data-cursor attributes across Work, Lab, ProjectPage, Nav`, `6e9f5ea`)
- push: SUCCESS

Next:
P4-T04 — mount `CursorCompanion` + `ScrollProgressIndicator` in `src/App.jsx` (depends on P4-T01 and P4-T02, both Done). This is the last task in Phase 4 — after it, re-check Phase 4's combined acceptance criteria block.

## 2026-08-10 14:40 — P4-T04

Action:
Mounted both `CursorCompanion` and `ScrollProgressIndicator` for real. `App` itself renders `<InteractionProvider>`, so it cannot call `useInteraction()` on its own context — split its body into a new internal `AppShell` component rendered as `InteractionProvider`'s child, which does the actual rendering (header selection, both new systems, `<Routes>`, `Footer`) and can consume the context. `ScrollProgressIndicator` is given `key={location.pathname}` so it fully remounts (and recomputes its section marks) on every client-side route change, rather than staying keyed to whatever page first mounted it.

**Caught and fixed a real, pre-existing bug during verification (DEVELOPMENT_LOOP.md §5 FIX, attempt 1 of 3, genuinely new root cause), only surfaced because this task is the first to actually exercise the interaction system across a live client-side route change with a real UI consumer of `scrollProgress`:** after navigating from a fully-scrolled Home to `/work`, the gauge stayed stuck at 100% instead of resetting toward 0. Root cause: `useScrollTop` (existing since before this plan, `src/hooks/useScrollTop.js`) calls native `window.scrollTo(0, 0)` directly on route change. Lenis (active since P0-T02) doesn't know about that jump — its own `raf()` loop, run every frame via `InteractionProvider`'s `gsap.ticker` tick, was reading its own stale internal `animatedScroll`/`targetScroll` and reapplying it via its own `wrapper.scrollTo()` on the very next frame, snapping the page back to wherever Lenis last thought it was. Confirmed via direct `window.scrollY` polling across a route change (constant non-zero value for many frames, never reaching 0) before assuming the bug was in `ScrollProgressIndicator` itself. Fixed by giving `useScrollTop` a second parameter for the live Lenis instance, calling `lenis.scrollTo(0, { immediate: true })` when one exists (confirmed via reading `node_modules/lenis/dist/lenis.mjs` that `immediate: true` applies `setScroll` synchronously, no animation) and falling back to plain `window.scrollTo(0, 0)` when not (reduced motion, where `InteractionProvider` never creates a Lenis instance at all — so the fallback is exactly correct there, not just harmless). `useScrollTop` couldn't reach `lenisRef` from where it was previously called (inside `App`, outside the provider), which is what motivated the `AppShell` split above — it wasn't scope creep, the fix required it structurally.

Also worth recording: this fix's dev-server verification initially looked broken (window.scrollY only settling after ~500ms, several polling samples showing the stale value), which read like the fix hadn't worked. Before concluding that, re-ran the identical check against a production build (`vite preview`) instead of the Vite dev server, where the reset completed within a single 100ms poll — confirming the delay was dev-server module-count/unminified-JS overhead from Work.jsx mounting 9 `ScrollReveal`/`ScrollTrigger` instances at once, not a flaw in the fix itself. All Phase 4 acceptance verification below was performed against the production build for this reason.

Re-checked Phase 4's combined acceptance criteria block (`MASTER_PLAN.md` line 137) against the live, fully-mounted app:
- "Cursor companion appears with the correct label over every `data-cursor` element and nowhere else" — PASS (verified across all four pages in P4-T03; re-confirmed here on live Home)
- "scroll gauge tracks position" — PASS (0 at top, 100 at bottom of Home; correctly resets after client-side navigation to a different page, per the fix above)
- "LED dots activate per section" — PASS (P4-T02, re-confirmed: `led count: 1` on `/work`, correctly matching Work.jsx's single `<section>`)
- "both hidden below 768px and under reduced motion" — PASS (both components entirely absent from the DOM, not just CSS-hidden, in both states)
- "`ScrollProgressIndicator` has `aria-label` + `aria-valuenow`" — PASS (`role="progressbar"`, `aria-label="Page scroll progress"`, `aria-valuenow` present and numerically correct)

All five criteria satisfied. Phase 4 marked Done.

Changed:
- src/App.jsx
- src/hooks/useScrollTop.js
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 34.84KB / 7.29KB gzip; main JS 426.14KB / 140.90KB gzip)
- Phase 4 combined acceptance criteria: PASS, all 5 (detailed above), verified against a production build (`vite preview`) via Playwright — mount check, hover-label check, scroll-tracking check pre/post navigation, mobile (375px) absence check, reduced-motion absence check
- scroll-reset regression check: PASS — reduced-motion route navigation still resets to `scrollY: 0` via the native fallback path (unaffected by the Lenis-path fix)
- browser console/page errors: PASS (none)

Git:
- commit: self (`P4-T04: mount cursor companion and scroll progress indicator`, `c5f8740`)
- push: SUCCESS

Next:
Phase 4 is fully Done. Phase 5 is NOT next: even though a robot decision is already recorded (`MASTER_PLAN.md` line 24, 2026-08-09), `P5-T00` is explicitly named in `DEVELOPMENT_LOOP.md` §2 as a task this loop must never guess on — treat it as blocker handling (§6), not silent proceeding, regardless of a decision existing elsewhere. Leaving Phase 5 alone. Phase 6 (Typography Motion, depends only on P1, already Done) has no such gate — starting there. `P6-T01`: create `TypographyMotion.jsx` + `typography-motion.css`.
Phase 3 is fully Done. Phase 4 (`P4-T01` — `CursorCompanion.jsx`) is the next eligible phase per the dependency graph (depends only on P0, already done); Phase 6 (Typography Motion, depends only on P1) is also eligible in parallel if preferred.

## 2026-08-10 15:10 — Phase R1 planning (no code changed)

Action:
User reviewed the production preview (`vite preview`, port 4173) of Phases 0–4 and gave a large batch of feedback, delivered as a voice transcript covering nine distinct concerns: (1) wants alternative color-combination recommendations for the `PixelRobot` mascot before picking one to roll out everywhere; (2) `ScrollProgressIndicator`'s green LED dots "light up randomly" / "it'll not work" — remove them; (3) `CursorCompanion`'s `VIEW`-label pill on Work project cards "is also not good" — replace the whole label-pill interaction with a retro-style cursor; (4) on `ProjectPage`, the visual system (`ProjectStage`) should become the primary content, with the written case study becoming a small, secondary, optionally-viewable element instead of the current 55/45 dominant-text layout; (5) further improve the project pages' visual-system background; (6) Home's hero `.bg-open` dot pattern should be made livelier/more animated; (7) Home's Experience section should start collapsed and expand on interaction instead of being fully expanded on load; (8) Contact section's background circles (already praised as "very, very beautiful") should move slowly instead of being static; (9) a "paper-cut" (zigzag) border that previously existed between sections is missing and should be restored, plus newly added to the header and footer.

Entered plan mode to triage this into tracked work rather than acting ad hoc, per the user's explicit "note this down page by page" request. Read the current live state of every file involved (`ProjectPage.jsx`, `ProjectStage.jsx`, `Home.jsx`, `Work.jsx`, `Nav.jsx`, `Footer.jsx`, `CursorCompanion.jsx`/css, `ScrollProgressIndicator.jsx`/css, `SectionBackground.jsx`, `ParallaxLayer.jsx`, `useParallax.js`, `section-backgrounds.css`, `index.css`'s zigzag rules) and ran a Plan sub-agent against the real code specifically for the riskiest item (the ProjectPage restructure), to validate the sticky-scroll mechanics before committing to an approach in the plan.

**Two investigation findings worth recording:**
- The "missing paper-cut border" is a real, explainable regression, not a misperception: `.zigzag`/`.zigzag-dark` (`src/index.css:264-282`) already exist and are already mounted in all three intended locations, but the pattern works by alternating `var(--bg)` against transparent — and `body`, `.bg-open`, and `.bg-technical` (the section pair the strip sits between on Home) all resolve to the identical `var(--bg)` (#F5EEDC). The strip is rendering with zero contrast on both sides today, not absent. R1-T10 fixes the underlying contrast logic, not just "re-adds" the div.
- Initial plan draft (R1-T01: remove per-card `PixelRobot` repetition, R1-T04: keep `CursorCompanion` but swap its text pill for a cursor-following glyph) was rejected on first review. User clarified: (a) the actual hero-related ask was to replace `Home.jsx`'s `<h1 className="hero-name">` with a new, minimally-animated `PixelRobot` variant (blink/bob/tilt idle motion) — not about reducing repeated card icons, and this specific task should be built first and shown to the user for explicit approval before continuing; (b) `Nav.jsx`'s logo instance stays untouched; (c) `CursorCompanion` should be deleted entirely, not reworked — replaced with a plain custom CSS `cursor` (retro pixel-art data-URI), no React tracking component at all; (d) the ProjectPage restructure plan (R1-T05) was approved as drafted, with one confirmation: preserve the existing scroll-driven "slide by slide" state-reveal feel exactly as it behaves today, just make the stage full-width/primary and the case study collapsible.

Recorded the corrected plan as a new **Phase R1 — User Revision Round (Preview Feedback, 2026-08-10)** in `MASTER_PLAN.md`, inserted after Phase 4 (before Phase 5), 10 tasks (`R1-T01`–`R1-T10`), depending only on already-Done P0–P4 so it doesn't conflict with Phase 6's dependency graph — Phase 6 is deprioritized in execution order only, not removed. `R1-T01` and `R1-T02` are flagged as human-checkpoint tasks (present-and-pause), matching the existing `P5-T00` precedent in this plan for tasks needing a human decision rather than a guess.

Changed:
- MASTER_PLAN.md (new Phase R1 block, 10 tasks)
- PROGRESS.md (current phase/task/next-action repointed to Phase R1 / R1-T01)
- EXECUTION_LOG.md (this entry)

Validation:
- No code changed in this entry — planning/documentation only, so no test/build gate applies.

Git:
- commit: pending (bundled with this entry's push, see below)
- push: pending

Next:
`R1-T01` — build `AnimatedPixelRobot`, replace the hero name heading on `Home.jsx`, verify (dev server + production preview, reduced-motion check), then stop and present the result to the user for approval before starting `R1-T02`.

## 2026-08-10 15:35 — R1-T01

Action:
Replaced `Home.jsx`'s hero `<h1 className="hero-name">{meta.name}</h1>` with a new `AnimatedPixelRobot` component. Created `src/components/common/AnimatedPixelRobot.jsx`: renders the exact same 5-rect pixel silhouette/palette as `PixelRobot.jsx` (no redesign), grouped into a `.animated-pixel-robot__body` wrapper plus two `.animated-pixel-robot__eye` rects, with idle motion added purely via CSS (`src/styles/animated-pixel-robot.css`): a single combined `apr-drift` keyframe (translateY + rotate, ~6.4s loop) on the body for a subtle bob/tilt "thinking" motion, and a separate `apr-blink` keyframe (scaleY dip, ~4.8s loop, slightly offset between the two eyes) for blinking. Kept both as one `transform`-driving keyframe per element rather than stacking multiple `animation` declarations on the same property, since CSS animations don't composite `transform` across separate animations on the same element — an earlier draft with separate bob and tilt animations would have had the second silently override the first.

**Accessibility call not explicitly specified in the plan, made and documented here:** removing the `<h1>` text entirely would have left the page with no semantic top-level heading and no screen-reader-audible name. Instead of dropping the heading, kept `<h1 className="hero-name-wrap">` as the real heading element, containing a new `.sr-only` utility span (added to `src/index.css`'s reset block — a standard clip-based visually-hidden pattern, this codebase had none yet) with `{meta.name}` as its accessible text, followed by the visible `<AnimatedPixelRobot />`. Sighted users see only the robot where the name used to be; screen readers still announce the name as the page's `<h1>`, matching the icon-replacing-text pattern this design system already uses for things like `PixelRobot`'s own `aria-hidden` (the opposite case — decorative-only) but here the accessible name has to survive since it's the *only* representation of the page's h1 content.

`Nav.jsx`'s logo (separate small `PixelRobot` + "SUJETH" text) was explicitly left untouched per the user's correction.

Changed:
- src/pages/Home.jsx
- src/index.css (added `.sr-only` utility)
- src/components/common/AnimatedPixelRobot.jsx (new)
- src/styles/animated-pixel-robot.css (new)
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 35.88KB / 7.53KB gzip; main JS 426.94KB / 141.04KB gzip)
- Playwright pass against production preview (`vite preview`, port 4173): sr-only h1 text reads "Sujeth A S"; exactly one `AnimatedPixelRobot` svg inside the h1; old `.hero-name` element count is 0; `.animated-pixel-robot__body`/`__eye` both have a live `animation-name` under normal motion (`apr-drift`/`apr-blink`) and `none` under `reducedMotion: 'reduce'` emulation; `.nav-logo` still has exactly 1 svg and the text "SUJETH", confirming it wasn't touched; zero console/page errors; at 375px the robot renders centered in the hero container (mobile `.hero-grid` centering still applies to the new block element)
- visual screenshot review (temporary, deleted before commit): hero reads correctly — subtitle, robot mascot where the name was, description, actions, ticker, all still in place with reasonable spacing
- working-tree cleanliness: PASS — temporary Playwright script and screenshot removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
**Stop and present this task's result to the user for explicit approval before starting R1-T02**, per their request to see the hero-robot change first. Do not proceed automatically.

## 2026-08-10 15:55 — R1-T01 approved; R1-T02

Action:
User reviewed the R1-T01 preview (animated hero robot) and replied "continue" — treated as approval. Marked `R1-T01` `Done` in `MASTER_PLAN.md`.

Built `R1-T02`: published a self-contained Artifact ("PixelRobot — Color Study") presenting 5 named color-combination options for the mascot — the current live combo ("Signal Red", `#E2402D`/`#F5EEDC`/`#221E1C`) as a labeled baseline, plus 4 alternatives built only from color tokens that already exist in `src/index.css` rather than inventing new hex values: "Toolbox Yellow" (`--yellow` body, ties to existing CTA/gauge-fill color), "Systems Green" (`--green`, ties to the "all systems online" LED), "Workshop Brown" (`--muted`, quieter, yellow-eye accent), and "Night Ink" (inverted — ink body, yellow eyes, red base accent). Each combo renders the exact same 5-rect SVG geometry as `PixelRobot.jsx` (via a small inline JS generator in the artifact, not copy-pasted markup) at nav scale (26px) and hero scale (96px), against both the site's real light background and its dark Contact-section background, plus a hex swatch strip per role (body/eyes/base). Artifact page itself follows the site's own Retro Toy visual language (hard-shadow bordered cards, cream/ink palette) so the comparison reads as "recommendations for this site," not a generic mockup; system-font stacks were used instead of the site's actual Google Fonts (Silkscreen/Inter Tight/JetBrains Mono) since the Artifact sandbox's CSP blocks external font CDNs — cosmetic-only, doesn't affect the color comparison this artifact exists for.

This is a human-decision checkpoint, same category as `P5-T00` — no site file was touched, nothing applied. Recorded as awaiting the user's pick and moving on to `R1-T03`, per `DEVELOPMENT_LOOP.md` §7's allowance to switch to independent unblocked work rather than stall the whole loop on one pending decision.

Changed:
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md
(no site source files changed by R1-T02; the artifact itself is a separate, non-repository deliverable)

Validation:
- N/A — no site code changed; artifact publish confirmed successful (URL returned).

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T03` — remove `ScrollProgressIndicator`'s LED dots, keep the track/fill/notch gauge.

## 2026-08-10 16:05 — R1-T02 addendum (still no site code changed)

Action:
User asked mid-review for more options in blue/white/black, specifically several blue shades. Added 5 more combos to the same Artifact (redeployed to the same URL): "Blueprint Blue" (mid, desaturated blue — new token), "Deep Navy" (darker/more saturated blue), "Sky Cyan" (brighter/lighter blue — three distinct blue shades as requested), "Ice White" (near-white body, needed a thin ink outline added via a new `outline` flag on the SVG generator so it stays legible against the light stage — same idea as the site's existing bordered-card look, not a new visual language), and "Blackout" (true black body, glowing icy-blue eyes). These 5 are explicitly new colors not currently in the site's token set (the site has no blue today), unlike the first 5 which reused existing tokens — noted directly in the artifact's intro copy so the distinction is clear to the user. Total now 10 named combos.

Changed:
- EXECUTION_LOG.md (this entry)
(artifact itself redeployed, not a repo file)

Next:
Continue to R1-T03.

## 2026-08-10 16:15 — R1-T03

Action:
Removed `ScrollProgressIndicator`'s LED dots per the user's "it'll not work" feedback. Deleted the `.scroll-indicator__leds` wrapper and its per-section `.scroll-indicator__led` spans from `ScrollProgressIndicator.jsx`, along with the `currentSection` destructure from `useInteraction()` (its only consumer was the removed `data-active={mark.id === currentSection}` check) and the inline comment in `getSectionMarks` explaining the now-gone match-against-`InteractionProvider` requirement. `getSectionMarks` itself is kept — its `position` values still drive the tick notches on the track, which the user didn't flag as broken. Removed the corresponding `.scroll-indicator__leds`/`.scroll-indicator__led`/`[data-active='true']` rules from `scroll-indicator.css`; the remaining track/fill/notch CSS is untouched.

Changed:
- src/components/systems/ScrollProgressIndicator.jsx
- src/styles/scroll-indicator.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 35.50KB / 7.48KB gzip; main JS 426.71KB / 141.00KB gzip)
- Playwright pass against production preview (`/work/synaptic`, port 4173): zero `.scroll-indicator__led`/`__leds` elements in the DOM; track still present with 8 notches; `aria-valuenow` reads 0 at top of page and 100 after scrolling to the bottom; fill height tracks the track height correctly (156px/160px near full scroll); zero console/page errors
- working-tree cleanliness: PASS — temporary Playwright script removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T04` — delete `CursorCompanion` entirely, add a plain custom retro-pixel CSS cursor, strip the now-dead `data-cursor` attributes from their 5 call sites.

## 2026-08-10 16:35 — R1-T04

Action:
Deleted `CursorCompanion.jsx` and `cursor-companion.css` entirely, per the user's explicit "no cursor companion needed, remove — just make a cursor" correction to the original plan (which had proposed reworking it into a glyph-swapping follow component). Removed its import and `<CursorCompanion />` mount from `App.jsx`'s `AppShell`. Removed the now-dead `data-cursor="VIEW"/"OPEN"/"TRY"/"EXPLORE"` attributes from all 5 call sites added in P4-T03 (`Work.jsx`, `Lab.jsx`, `ProjectPage.jsx`, `ProjectNav.jsx`, `Nav.jsx` — both desktop and mobile-drawer instances in `Nav.jsx`), since `CursorCompanion` was their only consumer. Removed the now-unused `--z-cursor-companion` token from `interaction-layer.css`.

Replaced it with a plain custom OS cursor via CSS, no React/JS involved: a small pixel-art arrow (SVG polygon, `stroke-linejoin: round` for a chunky retro silhouette) rendered as an inline data-URI in two color variants — ink fill with a cream outline for the default state (reads against both the light page and the dark Contact section) and a yellow fill with an ink outline over interactive elements (`a`, `button`, `[role='button']`, `input[type='submit']`, `.lab-cartridge`, `.project-card`, `.mini-card`) for hover feedback. Both rules are scoped inside `@media (hover: hover) and (pointer: fine)` so touch/mobile devices are unaffected (no `isMobile`/JS check needed — the media feature itself is the correct signal here).

**Caught and fixed a real CSS cascade bug during verification (DEVELOPMENT_LOOP.md §5 FIX, attempt 1 of 3):** an initial Playwright check found `.project-card`'s computed `cursor` was plain `pointer`, not the custom data-URI, even though the selector list explicitly included `.project-card`. Root cause: `index.css` already had several pre-existing `cursor: pointer` declarations (on `.btn`, `.nav-hamburger`, `.project-card`, `.tag`-style buttons) at lines further down the file than the new cursor rules (inserted near the top, right after the reset) — identical specificity (single class selector) means source order decides, and the later declarations were winning. Fixed by prefixing every selector in the hover-cursor rule with a `body` ancestor (`body a, body .project-card, ...`), raising specificity above any plain class/type selector regardless of where it sits in the file, rather than relying on rule ordering (which would be fragile against future edits).

Changed:
- src/App.jsx
- src/components/layout/Nav.jsx
- src/components/project/ProjectNav.jsx
- src/pages/Lab.jsx
- src/pages/ProjectPage.jsx
- src/pages/Work.jsx
- src/index.css
- src/styles/interaction-layer.css
- deleted: src/components/systems/CursorCompanion.jsx, src/styles/cursor-companion.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (72 modules, down from 74 — the two deleted files; CSS 35.59KB / 7.69KB gzip; main JS 425.33KB / 140.67KB gzip)
- Playwright pass against production preview: zero `.cursor-companion` elements in the DOM; `html`'s computed `cursor` resolves to the custom ink-arrow data-URI; `a` elements resolve to the yellow hover variant; `.project-card` resolves to the yellow hover variant (after the specificity fix — failed before it); zero console/page errors on `/work` and after navigating to `/`
- visual render check (temporary HTML preview, deleted before commit): arrow silhouette reads clearly as a classic pointer with a flared tail against both a light and a dark background, and the yellow hover variant is visually distinct
- `grep` confirmed zero remaining references to `CursorCompanion`/`cursor-companion` or `data-cursor` anywhere in `src/`
- working-tree cleanliness: PASS — temporary Playwright/HTML preview scripts removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T05` — restructure `ProjectPage.jsx` so `ProjectStage` becomes full-width/primary with its own dedicated scroll-track, and the case study moves into a new collapsed-by-default `CaseStudyPanel` accordion. This is the largest task in the phase; plan already validated against the real code via a Plan sub-agent during the initial triage.

## 2026-08-10 17:05 — R1-T05

Action:
Restructured `ProjectPage.jsx`'s `ProjectScene` per the user's "visual system should be primary, case study secondary/collapsible" feedback, using the approach a Plan sub-agent validated against the real code during the initial triage. Collapsed the old `.project-scene__grid` (11fr/9fr two-column split: 55% scrolling case-study text / 45% sticky stage) into a single-column stack with `grid-template-areas: 'hero' 'stage' 'study' 'nav'`: hero (unchanged content, now its own grid area instead of being nested inside the text column) → `ProjectStage` full container width → new `CaseStudyPanel` accordion → `ProjectNav` (unchanged).

**The key technical problem, solved as planned:** the sticky stage's scroll-driven 5-state mechanic (`useScrollEngine`, scrub-driven) previously got its scroll runway "for free" from the long case-study text column being taller than the stage. Once that text became a collapsed accordion, the stage would have almost no scroll distance to move through its 5 states. Fixed by pointing `useScrollEngine` at a new dedicated `trackRef` on `.project-stage-container` (not the whole `<section>`), and giving that container an explicit `min-height: 360vh` scoped to `@media (min-width: 768px)` only — independent of whether the accordion below it is open or closed. Reset to `min-height: 0` under `prefers-reduced-motion: reduce` (no scrub happening there, so a multi-viewport-tall empty track would just be dead scroll space) and left unset on mobile (`MobileProjectStage` doesn't consume the `scrollProgress` prop at all — confirmed by reading `ProjectStage.jsx`'s `isMobile` branch — so no mobile-specific min-height logic was needed).

Created `src/components/project/CaseStudyPanel.jsx`: moved the zigzag divider + all 7 conditional case-study sections (Problem/What I Built/Highlights/Architecture/Decisions/Result/Reflection) in unchanged, wrapped in a `useState`-backed toggle (`aria-expanded`/`aria-controls`, mirroring the idiom already used by `Nav.jsx`'s hamburger), collapsed by default. The collapse mechanic uses a `grid-template-rows: 0fr → 1fr` transition + a `visibility` flip delayed to match (so collapsed content is removed from the tab order, not just visually hidden — verified this holds, see below) rather than `height: 0`/`max-height` tricks, which don't animate cleanly against intrinsic content height. Kept `VelocityEffects(skew/stretch/lag)` wrapping the case-study's inner content (previously wrapped the whole text column) — optional per the plan, kept for behavior continuity. Added a `useEffect` on the `expanded` state that calls `ScrollTrigger.refresh()` after a delay (340ms, matched to the CSS transition duration; 0ms under reduced motion, where there's no transition to wait out) — necessary because toggling shifts the height of everything below the panel (`ProjectNav`'s `ScrollReveal` trigger, any mobile `useSectionProgress` triggers), and GSAP only recomputes trigger positions on an explicit refresh, not on an arbitrary CSS-transition-driven height change.

No changes were needed to `ProjectStage.jsx`, `useScrollEngine.js`, `useSectionProgress.js`, `CompactHeader.jsx`, or `ProjectNav.jsx` — confirmed per the plan's expectation.

**Caught and fixed a test-harness bug during verification, not a product bug (consistent with this session's established discipline of not trusting the first anomaly):** an initial Playwright pass sampling the stage's `data-state` at 5 scroll points showed `['identity','identity','results','results','results']` — looked like the stage was skipping straight from state 1 to state 5. Before assuming a real regression, recomputed the scroll math: the test had captured the track's `boundingBox()` once *before* scrolling and kept adding that now-stale viewport-relative `y` to a moving `window.scrollY` on each iteration, compounding drift. Rewrote the check using absolute page-space coordinates matching `useScrollEngine`'s actual trigger config (`start: 'top 44px'`, `end: 'bottom bottom'`) — re-ran, and all 5 states (`identity → problem → architecture → engineering → results`) triggered correctly and in order across all 3 featured projects.

Changed:
- src/pages/ProjectPage.jsx
- src/components/project/CaseStudyPanel.jsx (new)
- src/index.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (73 modules; CSS 36.42KB / 7.80KB gzip; main JS 426.06KB / 140.85KB gzip)
- Playwright pass against production preview across `synaptic`/`possah`/`velmont`: stage renders full container width (equal to hero width, confirming single-column layout); case-study panel starts collapsed (`data-expanded="false"`, ~0px rendered height); all 5 stage states trigger correctly in order across the dedicated scroll track (after the test-math fix above); toggling the accordion flips `aria-expanded`/`data-expanded` and grows the panel to real content height (~1450px on Synaptic); `ProjectNav` remains reachable by scrolling to the bottom with the panel open (confirms no broken layout/overflow)
- reduced-motion pass: stage renders the final "results" state immediately; `.project-stage-container`'s `min-height` computes to `0px` (no dead empty scroll space)
- mobile (375px) pass: `MobileProjectStage` still renders (`.project-stage--mobile` present); DOM order confirmed hero before stage before case study before nav
- keyboard pass: `.case-study-toggle` is focusable (`tabIndex: 0`); Tab from the toggle lands on `ProjectNav`'s "All work" link in both the collapsed and expanded state — correct in both cases, since the case-study body (headings/paragraphs/lists/an inline SVG diagram) contains no interactive elements to begin with, confirmed against the actual project data fields rather than assumed
- visual screenshot review (temporary, deleted before commit): top-of-page view confirms the stage renders large and dominant directly below the hero, exactly matching the "visual system primary" goal; scrolled/expanded view confirms case-study text, `ProjectNav`, and the footer all still render correctly below it
- working-tree cleanliness: PASS — temporary Playwright scripts and screenshots removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T06` — enrich the project-page visual system's background (richer pattern/per-project accent on the `technical` theme instance `ProjectStage`'s `SectionBackground` uses), scoped so the shared `.bg-technical` used elsewhere on the site is untouched.

## 2026-08-10 17:20 — R1-T06

Action:
Enriched the project pages' visual-system background per the user's "improve the visual system background" feedback, now that R1-T05 made it the page's dominant element. Added a `project-stage-bg` modifier class, passed via `SectionBackground`'s existing `className` prop (`<SectionBackground theme="technical" className="project-stage-bg" />` in `ProjectPage.jsx`) rather than editing the shared `.bg-technical` rule Home's Selected Work section also uses. Two additions, both in `section-backgrounds.css`: a soft radial accent glow (`.project-stage-bg::before`) using `color-mix(in srgb, var(--project-accent) 18%, transparent)` — `--project-accent` is already set on the ancestor `.project-scene` and inherits down for free, so each project's background automatically tints toward its own accent color with no JS or per-project CSS needed; and a second, looser accent-tinted dot layer (`.project-stage-bg .section-background__pattern::after`) layered onto the existing `ParallaxLayer` pattern child, so it inherits the same mouse/scroll parallax transform as the base grid pattern — extra depth at zero additional JS cost.

Changed:
- src/pages/ProjectPage.jsx
- src/styles/section-backgrounds.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (73 modules; CSS 36.89KB / 7.87KB gzip; main JS 426.09KB / 140.86KB gzip)
- Playwright pass against production preview: `.project-stage-bg::before` present with the expected radial-gradient background-image on all 3 featured projects (`synaptic`, `possah`, `velmont`); Home's `#work .section-background` (also `bg-technical`) confirmed to have neither the `project-stage-bg` class nor any `::before` content — isolation holds
- visual screenshot review (temporary, deleted before commit): Possah's stage background shows a subtle warm red glow, Synaptic's shows a subtle blue glow — each reads as tied to its own project accent, restrained rather than overpowering
- working-tree cleanliness: PASS — temporary Playwright script and screenshots removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T07` — make Home's hero `.bg-open` background livelier (second dot layer + slow ambient drift, off under reduced motion).

## 2026-08-10 17:30 — R1-T07

Action:
Made Home's hero background livelier per the user's "dot dot dot... can be made a proper environment" feedback. `.bg-open .section-background__pattern` now layers a second, smaller dot grid (28px tile, `--faint` color) on top of the original (64px tile, `--border` color) — "another dot more," per the request — plus a slow continuous ambient `bg-open-drift` keyframe animation (48s linear, infinite) shifting `background-position` for both layers by exactly one of their own tile widths (64px/64px for the first layer, 28px/28px for the second), so the loop wraps seamlessly with no visible jump. This motion is independent of scroll/mouse (unlike the existing layer-1 parallax nudge, which still applies on top via the same `ParallaxLayer` mechanism as before). Disabled under `prefers-reduced-motion: reduce` via a dedicated rule in `section-backgrounds.css`.

Changed:
- src/styles/section-backgrounds.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (73 modules; CSS 37.24KB / 7.93KB gzip; main JS 426.09KB / 140.87KB gzip)
- Playwright pass against production preview: `.hero .section-background__pattern` computed `animation-name` is `bg-open-drift` under normal motion; background-image resolves to 2 `radial-gradient` layers; `animation-name` is `none` under `reducedMotion: 'reduce'` emulation

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T08` — Home's `#experience` section starts collapsed, expands on interaction, using the same accordion idiom as `CaseStudyPanel` (R1-T05).

## 2026-08-10 17:45 — R1-T08

Action:
Made Home's `#experience` section start collapsed per the user's "not be completely expanded at the starting... once you click on experience, the whole thing builds on" feedback. Added `experienceExpanded` state to `Home.jsx`, with an `accordion-toggle` button (`View experience (N)` / `Hide experience`, `N` = `experiences.length`) between the heading and an `accordion-panel` wrapping the existing `.exp-list` (unchanged content/stagger).

Reused the exact accordion mechanic built for R1-T05's `CaseStudyPanel` rather than inventing a second one: extracted its `ScrollTrigger.refresh()`-after-toggle timer into a shared hook, `src/hooks/useAccordionRefresh.js` (same reduced-motion-aware delay logic), and renamed the CSS from `case-study-toggle`/`case-study-panel`/`case-study-panel__inner` to generic `accordion-toggle`/`accordion-panel`/`accordion-panel__inner` in `index.css` and `CaseStudyPanel.jsx`, since the class names were misleading now that a second, unrelated section uses them. Re-verified `ProjectPage`'s case-study accordion still works correctly after the rename (both are driven by CSS class, not React component identity, so this was a pure find-and-replace with no behavior risk — confirmed anyway).

Changed:
- src/pages/Home.jsx
- src/components/project/CaseStudyPanel.jsx
- src/index.css
- src/hooks/useAccordionRefresh.js (new)
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (74 modules; CSS 37.23KB / 7.93KB gzip; main JS 426.56KB / 140.95KB gzip)
- Playwright pass against production preview: `#experience-list` starts `data-expanded="false"` with ~0px rendered height; clicking the toggle flips to `data-expanded="true"` with real content height (~561px) and all 3 `.exp-item`s present in the DOM throughout (never unmounted, just visually/tab-order collapsed); `ProjectPage`'s `#case-study-panel` (Synaptic) still toggles correctly after the class rename
- working-tree cleanliness: PASS — temporary Playwright script removed before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T09` — animate Contact section's `.bg-signal` ring pattern with a slow continuous drift, off under reduced motion.

## 2026-08-10 17:55 — R1-T09

Action:
Animated the Contact section's background circles per the user's "I want the circles to be moving slowly" feedback on a section they'd already called "very, very beautiful." Rather than adding a CSS animation directly to `.bg-signal .section-background__pattern` (which would fight `useParallax`'s GSAP-driven inline `transform` on that same element — the exact class of bug this codebase already avoided once, per P3-T03's log entry — GSAP re-writes that element's `transform` every frame via `gsap.set`, which would fight or get fought by a class-based `@keyframes` animating the same property), added a second, independent ring layer as a `::after` pseudo-element on `.bg-signal` itself (the parent `.section-background` div, which only gets a plain React-driven `opacity` inline style, no GSAP transform). This new layer duplicates the existing repeating-radial-gradient ring pattern at lower opacity and animates its own `transform: scale()` + `opacity` in a slow 12s ease-in-out loop (`bg-signal-pulse`), reading as an outward "signal ping" — thematically apt for a section already styled as a signal/antenna motif. The original static ring layer (`__pattern` child) is completely unchanged, so nothing about the base look moved, only this added layer.

Changed:
- src/styles/section-backgrounds.css
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (74 modules; CSS 37.62KB / 7.99KB gzip; main JS 426.56KB / 140.95KB gzip)
- Playwright pass against production preview: `.section-dark .bg-signal`'s computed `::after` has `animation-name: bg-signal-pulse` and real `content` under normal motion; under `reducedMotion: 'reduce'` emulation, `animation-name` is `none` and `opacity` is `0`
- zero console/page errors

Git:
- commit: self (pending, see below)
- push: pending

Next:
`R1-T10` — fix the zigzag/paper-cut border (currently invisible due to a zero-contrast color match against neighboring sections) and extend the same treatment to `Nav`/`CompactHeader` and `Footer`. Last task in Phase R1.

## 2026-08-10 18:15 — R1-T10 (Phase R1 complete)

Action:
Fixed the "paper-cut" (zigzag) border and extended it to `Nav`, `CompactHeader`, and `Footer`, per the user's feedback that it "used to be there" between sections and should also appear in the header/footer. This was the last task in Phase R1.

**Found and fixed two independent, compounding bugs, not one — caught by verifying each of the 6 target locations individually rather than assuming a single fix covered all of them (DEVELOPMENT_LOOP.md §5 FIX discipline, two genuinely separate root causes):**

1. **Zero-contrast color bug (root cause identified during the original Phase R1 triage, fixed here):** `.zigzag`/`.zigzag-dark` painted "teeth" by alternating a wash color against literal `transparent`, letting whatever sat behind the strip show through the gaps. This only reads as a torn edge if the strip's wash color differs from whatever's actually behind it — which wasn't true at any of the original call sites: `.zigzag` sat between two `var(--bg)` sections (Home hero → Selected Work), and separately `.zigzag-dark` used `var(--bg-dark)` against a `var(--ink)` erase target, and those two tokens are the exact same hex value (`#221E1C`) in `index.css`'s `:root` block. Both were rendering with zero contrast — fully invisible, not styled-wrong. Fixed by giving the strip its own opaque backing instead of relying on page context: `.zigzag` now layers `var(--bg)` teeth over a `var(--ink)` base (`background: linear-gradient(...), linear-gradient(...), var(--ink)`, three comma-separated layers — the last being a plain color is valid CSS `background` shorthand syntax, resolving to `background-image: none` for that layer and `background-color: var(--ink)` for the box); `.zigzag-dark` uses `var(--cream)` teeth over the same `var(--ink)` base (switched from `var(--bg-dark)`, which — being identical to `--ink` — would have re-created the exact same invisibility bug in the new design).

2. **A second, previously-undiscovered bug found while verifying the Contact section specifically:** `.zigzag-dark` never had its own `width`/`height` declared in CSS (only background-related properties) — the original design intent was for it to be combined with the base `.zigzag` class (which has `width: 100%; height: 24px`), but `Home.jsx`'s Contact section rendered it standalone (`className="zigzag-dark"` only). Direct DOM inspection during verification showed `getBoundingClientRect().height === 0` even after the color fix — the element was present and correctly styled, just permanently zero-height, so nothing could ever render regardless of the color contrast. Fixed by changing the JSX to `className="zigzag zigzag-dark"` (proper base+modifier class pairing, matching how modifier classes are used elsewhere in this codebase, e.g. `.badge`/`.badge-live`).

Extended the fixed, contrast-safe pattern to three new locations (not restorations — the design doc never had these): `Nav` (`.nav__zigzag`, absolutely positioned at the sticky header's bottom edge, replacing its flat `border-bottom`), `CompactHeader` (`.compact-header__zigzag`, same treatment, also replacing its flat `border-bottom`), and `Footer` (`.footer__zigzag`, positioned at the top edge, replacing its flat `border-top`, which required adding `position: relative` to `.footer` since it had no positioning context before). `CompactHeader`'s existing accent-color underline pseudo-element (`::after`, previously at `bottom: -2px`) had to be repositioned to `bottom: -26px` — it would otherwise sit inside the new 24px-tall zigzag strip's vertical range and render underneath it (zigzag has `z-index: 1`, the underline had no explicit z-index), hiding the accent color entirely; moved it to render just below the torn edge instead.

Changed:
- src/index.css
- src/styles/compact-header.css
- src/components/layout/Nav.jsx
- src/components/layout/CompactHeader.jsx
- src/components/layout/Footer.jsx
- src/pages/Home.jsx
- MASTER_PLAN.md
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (74 modules; CSS 37.76KB / 8.03KB gzip; main JS 426.82KB / 140.99KB gzip)
- Playwright + screenshot verification against the production preview at all 6 locations: Home hero→Selected Work divider (visible ink/cream zigzag), Home top-of-Contact divider (visible cream/ink zigzag, confirmed only after finding and fixing bug #2 above — a first-pass screenshot after only the color fix still showed a flat boundary, which is what led to the `getBoundingClientRect()` check that caught the height:0 issue), ProjectPage's case-study divider (same `.zigzag` class already verified via 3 other locations, confirmed present), `Nav` (visible, sticky, persists on scroll), `CompactHeader` (visible, accent underline correctly repositioned below it, confirmed via screenshot showing both elements distinctly), `Footer` (visible at page bottom)
- mobile (375px) pass: `.nav__zigzag` renders correctly at the same 24px height, visually confirmed via screenshot
- zero console/page errors across all checks
- working-tree cleanliness: PASS — temporary Playwright scripts and screenshots removed before staging

Git:
- commit: self (pending, see below)
- push: pending

**Phase R1 is now fully Done (10/10 tasks).** One follow-up remains outside the task table: once the user picks a color from `R1-T02`'s still-open Artifact, apply it site-wide to `PixelRobot.jsx`'s hard-coded hex fills as a small standalone task.

Next:
Resume `P6-T01` (Typography Motion) — the task `PROGRESS.md` pointed to before Phase R1 was inserted, unchanged in scope, depends only on P1 (already Done).

## 2026-08-10 18:35 — P6-T01

Action:
Resumed the standing DEVELOPMENT_LOOP cycle at Phase 6 now that Phase R1 is Done, per `PROGRESS.md`'s "Current task." Created `src/components/systems/TypographyMotion.jsx` + `src/styles/typography-motion.css` per design doc §2's spec (`{ text, as, effect }` props, `effect` one of `slide-in`/`mask-reveal`/`parallax-drift`, all ScrollTrigger-scrub-driven, immediate render under reduced motion).

`slide-in` and `mask-reveal` share one mechanism: `useScrollEngine` (the existing ScrollTrigger wrapper) drives a `--motion-progress` CSS custom property (0→1 as the heading scrolls from 85% down the viewport to 40%), which CSS then reads via `calc()` — `slide-in` interpolates `translateX(-48px → 0)` + `opacity(0 → 1)`, `mask-reveal` interpolates `clip-path: inset(0 100%→0% 0 0)` (reveals left-to-right). `parallax-drift` doesn't reuse this mechanism at all — instead of building a second scroll-tracking system, it calls the *existing* `useParallax` hook directly with `scrollStrength: 0.03, mouseStrength: 0, axis: 'y'`, matching the design doc's "slight translateY at 0.03x scroll speed" precisely and reusing `useParallax`'s own already-correct reduced-motion/mobile no-op logic rather than duplicating it.

**A small React-hooks-rules-driven design decision worth recording:** since `effect` determines which of two different scroll-tracking hooks (`useScrollEngine` vs `useParallax`) should actually drive the element, and hooks can't be called conditionally, the component calls *both* unconditionally every render but only attaches the DOM ref to *one* of them (`revealRef` for slide-in/mask-reveal, `driftRef` for parallax-drift) depending on `effect`. Whichever hook's ref never gets attached sees a permanently-null element and no-ops harmlessly (both `useScrollEngine` and `useParallax` already guard on `if (!element) return`), so no wasted `ScrollTrigger`/GSAP tween ever gets created for the unused mechanism — confirmed this holds by reading both hooks' existing guard clauses, not assumed.

Changed:
- src/components/systems/TypographyMotion.jsx (new)
- src/styles/typography-motion.css (new)
- MASTER_PLAN.md (P6-T01 marked Done; added a scope note flagging that P6-T02's "Home hero mask-reveal" target no longer exists as text since R1-T01 replaced the hero name with an animated robot — decided during PLAN, not silently discovered later)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS with the component unused anywhere yet (74 modules, identical hashes to the pre-P6-T01 build — correctly tree-shaken since nothing imports it until P6-T02)
- Playwright pass against a **temporary** mount in `Home.jsx` (three instances, one per effect, reverted before commit — confirmed via `git diff --stat -- src/pages/Home.jsx` showing zero net change): all three render as semantic `<h2>` elements (no `<div>` substitution); at initial page load (element not yet scrolled into its reveal window) `slide-in` shows `translateX(-48px)` + `opacity: 0` and `mask-reveal` shows `clip-path: inset(0 100% 0 0)` — both genuinely start hidden, not just visually similar to hidden; after scrolling, both resolve to the fully-revealed state (`transform: none`-equivalent identity matrix, `opacity: 1`, `clip-path: inset(0 0% 0 0)`); `parallax-drift` shows a nonzero `translateY` (6px) after scrolling, confirming the reused `useParallax` mechanism is live; under `reducedMotion: 'reduce'` emulation, all three render their final/neutral state immediately at page load with no scroll needed (`transform: none`, `opacity: 1`, `clip-path: none` for the reveal effects; `transform: none` for drift, confirming `useParallax`'s own reduced-motion clear-props path fired)
- zero console/page errors
- working-tree cleanliness: PASS — temporary Playwright script and the temporary `Home.jsx` mount both removed/reverted before staging

Git:
- commit: self (pending, see below)
- push: pending

Next:
`P6-T02` — apply `TypographyMotion` to section titles and selected oversized headings: `slide-in` on the Skills heading (unaffected by the R1 changes, proceeds as originally planned), plus a replacement target for the stale "Home hero mask-reveal" (see the scope note in `MASTER_PLAN.md`'s Phase 6 section — to be decided during that task's PLAN step, not guessed here).

## 2026-08-10 17:00 — R2-T04

Action:
User gave a second batch of preview feedback (10 items); inserted `MASTER_PLAN.md` Phase R2 (10 tasks, `R2-T01`–`R2-T10`) ahead of `P6-T02`'s resumption, same precedent as Phase R1. Started at `R2-T04` (first eligible per the dependency graph, since `R2-T01` depends on it). Removed Home hero's `.workshop-vignette` block entirely (`Home.jsx` — the "Workshop Status / ALL SYSTEMS ONLINE / React·Node·Postgres·Ship" card), per the user's explicit "this not needed, remove it" instruction. Collapsed `.hero-grid` from a 2-column grid to a single column (`max-width: 640px`) now that the second column is empty, rather than leaving a stretched-empty grid track.

Changed:
- src/pages/Home.jsx
- src/index.css (`.hero-grid` single-column; removed the now-dead `.workshop-vignette` block; kept `.led`/`.led-on` — still used by the hero ticker — and `.tag` — still used by project cards)
- MASTER_PLAN.md (new Phase R2 table; R2-T04 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (74 modules, clean)
- code review: PASS — confirmed `PixelRobot` import in `Home.jsx` still has two live call sites (project-card footer, Contact section) after removing the workshop-vignette's usage; confirmed no other file references `.workshop-vignette`
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available (unlike prior sessions' Playwright access). Recommend the user confirm visually via `npm run dev`.

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T01 — tame + enliven Home hero background.

## 2026-08-10 17:20 — R2-T01

Action:
Tamed `.bg-open .section-background__pattern` (Home hero dots): opacity `0.6` → `0.13`, tile spacing `64px/28px` → `96px/44px`, and added a `mask-image` radial fade (visible near center, transparent by the edges) so the dots read as a texture behind the headline rather than a wall-to-wall pattern — the drift keyframe's end position was rescaled to match the new 96px tile so the loop stays seamless. Added a cursor-illumination glow (`.hero::after`, `radial-gradient` centered on the already-lerped global `--mouse-x`/`--mouse-y` custom properties — no new JS tracking needed) gated to `(hover: hover) and (pointer: fine)` so it never shows a stale position on touch. Added a low-opacity (3.5%) CSS-only grain texture (`.hero::before`, inline `feTurbulence` SVG data-URI) so the now-sparser background doesn't read as empty. Split the hero's single `ScrollReveal` wrapper into four staggered ones (eyebrow → robot heading → description → actions+ticker, 150ms apart) using the existing `ScrollReveal` component — deliberately did not add Framer Motion, per the design doc's own recorded "why not Framer Motion" decision (`docs/FUTURE-ENVIRONMENT-LAYER.md` §1) and to stay consistent with every other reveal on the site. The "pulse a status LED" suggestion from the user's feedback was already satisfied by existing code: `.led-on` (used on the hero ticker, `Home.jsx`) already has a `led-blink` opacity-pulse animation — no new work needed there, and it's the closest surviving status-indicator now that R2-T04 removed the Workshop Status card.

Changed:
- src/styles/section-backgrounds.css (`.bg-open` tamed + masked)
- src/index.css (`.hero::before`/`.hero::after` glow + grain layers)
- src/pages/Home.jsx (hero `ScrollReveal` split into 4 staggered blocks)
- MASTER_PLAN.md (R2-T01 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (74 modules; CSS 38.50KB / 8.24KB gzip, +0.94KB/+0.29KB gzip from the new pseudo-element rules)
- code review: PASS — confirmed `.hero` already has `position: relative` via the `interaction-layer` class already on the section (`className="hero interaction-layer"`), so the new `::before`/`::after` anchor correctly; confirmed the global reduced-motion catch-all (`index.css:1497`, `*, *::before, *::after { animation-duration: 0.01ms !important; ... }`) already neutralizes `led-blink` and the drift keyframe, and the explicit `display: none` on `.hero::after` under reduced motion is a belt-and-suspenders duplicate of that catch-all, not a gap
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` (mouse glow only shows with a real mouse pointer, not touch/reduced-motion).

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T02 — simplify ProjectPage background to dots-only, matching the tamed hero treatment.

## 2026-08-10 17:35 — R2-T02

Action:
Simplified the project-page background from "grid + dots" to dots-only, matching R2-T01's tamed hero treatment (same 44px dot size, 0.13 opacity, radial mask fade — recentered slightly higher at 35% since the project stage's content starts nearer the top than the hero's). Scoped this via a new `.bg-technical.project-stage-bg .section-background__pattern` rule (three-class specificity, guaranteed to win over the shared `.bg-technical .section-background__pattern` base rule regardless of source order) rather than editing `.bg-technical` itself, since that base theme is also used by Home's Selected Work and Skills sections, which the user did not ask to change. Left `.project-stage-bg::before` (per-project accent glow) and `.project-stage-bg .section-background__pattern::after` (accent dot layer) completely untouched, per the user's explicit "the color feel let that be there."

Changed:
- src/styles/section-backgrounds.css
- MASTER_PLAN.md (R2-T02 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 38.82KB / 8.27KB gzip)
- code review: PASS — confirmed `ProjectPage.jsx:37` renders `<SectionBackground theme="technical" className="project-stage-bg" />`, so the container carries both `.bg-technical` and `.project-stage-bg`, matching the new selector; confirmed `.bg-technical`'s own rule (used standalone by `Home.jsx`'s Selected Work/Skills `SectionBackground` instances, no `project-stage-bg` class there) is byte-for-byte unchanged.
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` on a project page.

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T03 — simplify ScrollProgressIndicator to a single minimal line.

## 2026-08-10 17:45 — R2-T03

Action:
Simplified `ScrollProgressIndicator` to a single minimal line per the user's "single stick, nothing else — no dash" instruction. Removed the per-section `.scroll-indicator__notch` marks entirely, along with the `getSectionMarks()` function, its `marks` state, and the resize-effect that recomputed them (the component is now render-only — no `useEffect`/`useState` left). Reduced `.scroll-indicator__track` from a 6px bordered/filled box (`background: var(--cream); border: 2px solid var(--ink)`) to a bare 2px line (`background: var(--border)`, no border, height 160px→140px) so it reads as a thin premium stick rather than a boxed gauge. The `__fill` progress bar (yellow, rises with scroll) is unchanged — the user's phrasing ("also fine") allowed for keeping the progress behavior, just stripped of the box/notch chrome.

Changed:
- src/components/systems/ScrollProgressIndicator.jsx
- src/styles/scroll-indicator.css
- MASTER_PLAN.md (R2-T03 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 38.67KB / 8.25KB gzip, net decrease from removing the notch rule)
- code review: PASS — grepped the full `src/` tree for `scroll-indicator__notch` and `getSectionMarks`, zero remaining references anywhere
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` (indicator is hidden below 768px and under reduced motion, matching its existing behavior — unchanged by this task).

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T05 — make Selected Work grid symmetric across breakpoints.

## 2026-08-10 17:55 — R2-T05

Action:
Replaced `repeat(auto-fill, minmax(340px/280px, 1fr))` on `.projects-grid`/`.secondary-grid` with explicit breakpoint column counts (1 col below 640px, 2 cols 640–959px, 3 cols from 960px), so the column count changes at fixed points instead of wherever the next 340px/280px card happens to fit at an arbitrary viewport width. Normalized row-height variance from content length by clamping `.project-card-tease` to 3 lines and `.mini-card-desc` to 2 lines (`-webkit-line-clamp`, both already `overflow` boxes) — cards in the same row no longer stretch to wildly different heights depending on tease-text length or stack-tag count. Note honestly recorded: with exactly 3 featured projects, the 3-column desktop breakpoint is fully symmetric, but the 2-column tablet breakpoint still leaves a 1-item last row (inherent to an odd item count over an even column count, not fixable by grid CSS alone) — this is a normal, expected responsive remainder, not the auto-fill unpredictability the user was reacting to.

Changed:
- src/index.css (`.projects-grid`, `.secondary-grid`, `.project-card-tease`, `.mini-card-desc`)
- MASTER_PLAN.md (R2-T05 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 39.01KB / 8.27KB gzip)
- code review: PASS — confirmed 3 `tier: 'featured'` projects (`.projects-grid`) and 5 items in `.secondary-grid` (2 `secondary` + `other.slice(0,3)`) in `src/data/projects.js`, consistent with the breakpoint reasoning above
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` across a few widths (375px, 700px, 1024px, 1280px).

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T06 — fix the Contact "Let's build something" ripple.

## 2026-08-10 18:05 — R2-T06

Action:
Fixed both problems with the Contact section's background circle. (1) Mobile: added an opt-in `mobileOpacity` prop to `SectionBackground` (default `0`, so every existing caller — Home hero, Selected Work, Skills, ProjectPage — keeps its exact current mobile-disabled behavior unchanged) and passed `mobileOpacity={0.6}` only on the Contact section's `<SectionBackground theme="signal" />` call in `Home.jsx`. The static base ring layer (which lives on the `ParallaxLayer`/`.section-background__pattern` child, itself still skipped on mobile per the site's perf budget) stays desktop-only, but the animated ripple layer (which lives directly on `.bg-signal`'s own `::before`/`::after`, not that child) now renders on mobile too. (2) Motion: replaced the single `bg-signal-pulse` keyframe — one repeating-ring pattern uniformly scaling 1→1.18 and fading in place, a synchronized "breathing," not a ripple — with two phase-offset layers (`::before` + `::after`, `animation-delay: -2.5s` on the second) each independently growing from `scale(0.3)`/`opacity 0.7` out to `scale(2)`/`opacity 0` over 5s: a new ripple is always emerging as the last one fades, closer to the requested "rock dropped in water" than one uniform pulse. Raised the ring alpha `0.07`/`0.08` → `0.14` for the visibility-on-laptop half of the complaint, per the user's own suggested fix.

Changed:
- src/components/systems/SectionBackground.jsx (`mobileOpacity` prop)
- src/pages/Home.jsx (Contact section opts in via `mobileOpacity={0.6}`)
- src/styles/section-backgrounds.css (`bg-signal-pulse` → `bg-signal-ripple`, two-phase)
- MASTER_PLAN.md (R2-T06 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 39.08KB / 8.30KB gzip)
- code review: PASS — confirmed every other `<SectionBackground>` call site omits `mobileOpacity`, so its new default (`0`) reproduces the exact prior `isMobile ? 0 : ...` expression byte-for-byte for those callers; confirmed `.bg-signal`'s own base rule (`background: var(--bg-dark)`) and its static-pattern child rule are untouched
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` at a mobile viewport and on a laptop-sized viewport on the Contact section.

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T07 — add curated micro-interactions to AnimatedPixelRobot.

## 2026-08-10 18:20 — R2-T07

Action:
Made `AnimatedPixelRobot` stateful (it was previously a prop-less, event-less decorative SVG — only a CSS `apr-drift` body loop and `apr-blink` eye loop) and added six micro-interactions from the user's curated wishlist, all built on infrastructure already in this codebase rather than new mechanisms:

- **Cursor-tracking / idle look-around** — merged into one mechanism instead of two competing ones: on `(hover: hover) and (pointer: fine)` devices, wrapped each eye rect in a `.animated-pixel-robot__eye-look` `<g>` that continuously reads the already-lerped global `--mouse-x-norm`/`--mouse-y-norm` CSS custom properties via a live `calc()` (no new JS, no `useMouseProximity` call — the values InteractionProvider already writes every frame are enough); on `(hover: none)` (touch) devices, that same wrapper instead runs a timer-based `apr-look` idle-glance keyframe. Nesting the look-transform on a wrapping `<g>`, separate from the eye `<rect>`'s own blink `scaleY` transform, was necessary — two `animation`/transform declarations on the *same* element don't compose in CSS, the later one just wins each frame, so blink and look/track needed different elements to coexist. Reduced motion needs no special-casing here: `--mouse-x-norm`/`--mouse-y-norm` are already forced to `0` under reduced motion by the existing global rule in `interaction-layer.css`, so the tracking `calc()` naturally evaluates to zero offset with zero new code.
- **AFK / sleep mode** — a `useEffect` mouse/scroll-idle timer (45s, matching the user's spec) toggles `isAsleep` state, gated off entirely under `reducedMotion || isMobile` (matching the codebase's existing convention for ambient effects like `useMouseProximity`/`useParallax`). Asleep, the eyes settle into the blink animation's own squished `scaleY(0.15)` pose (reads as closed, reusing geometry rather than adding new shapes) and two small SVG `<text>` "z"s fade-and-float upward on a staggered loop.
- **CRT glitch** — a `steps(1)` keyframe (`apr-glitch`) applied to the root `<svg>` itself (not the body `<g>`, which already owns its own `apr-drift` transform — same same-element-transform-conflict reasoning as look/blink) giving a ~1-frame position+hue jump twice every 9s cycle.
- **Hover head-bop** — pure CSS, no JS: `.animated-pixel-robot:hover .animated-pixel-robot__body { animation: apr-drift ..., apr-bop 0.4s ease-out; }` — a freshly-applied `animation` value restarts on every new `:hover`, so it naturally replays on each hover without any state.
- **Click expression cycling** — an `onClick` handler cycles `expression` through `happy → surprised → wink → dizzy`, each a CSS class (`.is-happy` etc.) overriding the eye rects' transform (three are static poses; `dizzy` spins), auto-reverting to `null` (normal) after 1.8s via a cleared/reset `setTimeout`. Deliberately did not gate this behind `reducedMotion` in JS — the existing blanket `*, *::before, *::after { animation-duration: 0.01ms !important }` catch-all already neutralizes `is-dizzy`'s spin, and the three static poses aren't motion, so no extra guard was needed.

Explicitly out of scope, as recorded in `MASTER_PLAN.md`'s R2-T07 row: audio bleeps, theme toggle, status-color tie-in, form-focus glance, copy-feedback checkmarks, scroll-rail buddy, section costumes, Konami code, draggable physics, speech bubbles.

Added `.animated-pixel-robot` to the site's existing custom-cursor pointer-swap selector list (`index.css`) so hovering the now-clickable mascot shows the same yellow cursor as every other interactive element, instead of a bare `cursor:pointer` that would clash with the site's custom cursor system.

Changed:
- src/components/common/AnimatedPixelRobot.jsx (stateful: AFK timer, click-cycling, eye-look wrapper group)
- src/styles/animated-pixel-robot.css (glitch, bop, look/track, sleep, zzz, expression classes)
- src/index.css (added `.animated-pixel-robot` to the custom-cursor pointer selector list)
- MASTER_PLAN.md (R2-T07 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 41.33KB / 8.74KB gzip; JS 426.59KB / 140.89KB gzip — small increase from the new component state/handlers)
- code review: PASS — confirmed `AnimatedPixelRobot` has exactly one call site (`Home.jsx`'s hero), so no other page is affected; confirmed the reduced-motion block at the bottom of `animated-pixel-robot.css` forces `animation: none !important; transform: none !important` on every new element class added (`__eye-look`, `__zzz`), matching the file's pre-existing pattern for `__body`/`__eye`; confirmed `PixelRobot.jsx` (the separate, non-animated component used in Nav/Footer/cards/About) was not touched.
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev`: hover (bop), click repeatedly (expression cycle), leave the mouse idle 45s (sleep + Zzz), move the mouse near the hero (eye tracking), and a reduced-motion toggle pass.

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T08 — add 4 new color options to the PixelRobot color-study Artifact.

## 2026-08-10 18:30 — R2-T08

Action:
Added 4 new color options to the existing `R1-T02` Artifact ("PixelRobot — Color Study") per the user's request: Phosphor Amber (`#FF9E00`/`#221E1C`/`#121212`), Arcade Tangerine (`#FF6B35`/`#F5EEDC`/`#221E1C`), Amber Ink Hybrid (`#FF8C00`/`#221E1C`/`#221E1C`), Terminal Invert (`#221E1C`/`#FF9E00`/`#FF9E00`), each with the user's own rationale text adapted into the Artifact's existing per-combo prose style. Gave the 4 new entries their own `NEW` tag (amber `combo__tag--newest`, distinct from the existing red `CURRENT` and yellow `OPTION` tags) so they're visually distinguishable as the latest addition. Updated the h1 ("Ten ways" → "14 ways") and intro paragraph to describe the new set. Republished to the same Artifact URL (`https://claude.ai/code/artifact/348b7f0f-f813-4600-a514-d6933459cd42`) so the existing link stays valid — confirmed via `Artifact(url: <existing URL>)`, not a fresh publish. Still a human-decision checkpoint like `R1-T02` itself: nothing applied to any site file, all 14 options remain recommendations only.

Changed:
- (external) Artifact `348b7f0f-f813-4600-a514-d6933459cd42`, republished — no repo source files
- MASTER_PLAN.md (R2-T08 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: not applicable (no repo code changed)
- build: not applicable (no repo code changed)
- Artifact publish: PASS (tool confirmed publish to the same URL, no new URL minted)

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T09 — fix About page duplicate name.

## 2026-08-10 18:40 — R2-T09

Action:
Fixed About page's duplicate name. `meta.name` previously rendered twice: a standalone page `<h1>` (`About.jsx:14-16`) and inside the sticky dev card's `.dev-card-name` (`About.jsx:69`). Replaced the standalone `<h1>`'s text with a short contextual phrase ("The person behind the projects") instead, matching the established eyebrow+heading pattern already used on `Work.jsx` (`section-label` "Work" + h1 "All Projects") and `Lab.jsx` (`section-label` "Lab" + h1 "Experiments") — kept the `section-label` "About" eyebrow as-is, only the h1 content changed. `meta.name` now renders exactly once, inside `.dev-card-name`.

Changed:
- src/pages/About.jsx
- MASTER_PLAN.md (R2-T09 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS
- code review: PASS — grepped `About.jsx` for `meta.name`, exactly one remaining reference (`.dev-card-name`); confirmed the new h1 text matches the site's existing eyebrow+contextual-heading convention rather than inventing a new pattern.
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` on `/about`.

Git:
- commit: self (pending, see below)
- push: pending

Next:
R2-T10 — redesign the paper-cut border using the Retro Toy reference.

## 2026-08-10 18:55 — R2-T10

Action:
Redesigned the zigzag/"paper-cut" border. The user's original pointer (commit `7653c83`, `docs/FUTURE-ENVIRONMENT-LAYER.md`) turned out not to describe a paper-cut border at all when checked (confirmed via `git show 7653c83` — that commit is the Phase 3 GSAP/Lenis/parallax/robot spec, no mention of "paper," "zigzag," or "torn" anywhere in the diff). Asked the user to clarify; they supplied a real reference instead: `Downloads/Design style exploration and branding/Retro Toy Direction/*.dc.html`, a 5-page brand-kit mockup set. Grepped all 5 files for `clip-path` and found the actual paper-cutout separator — the exact same `clip-path: polygon(...)` string reused verbatim across every page (`Landing Page RT`, `Dashboard RT`, `Component Library RT`, `Retro Toy Artifacts`), confirmed by `Design Rationale RT.dc.html`: "The paper-cutout separator is kept exactly as scoped." It's a single irregular jagged-top shape (`polygon(0 42%,5% 22%,11% 46%,18% 20%,26% 44%,34% 18%,42% 44%,51% 22%,60% 46%,68% 20%,76% 44%,84% 22%,92% 46%,100% 24%,100% 100%,0 100%)`) — not the uniform repeating-triangle sawtooth the site currently has.

Rebuilt `.zigzag` around that exact polygon instead of the old tiled `linear-gradient` sawtooth, while keeping R1-T10's contrast-safety fix (an opaque `var(--ink)` backing layer, since the reference's own usage context — a fixed-width container on a single continuous page background — doesn't need that guarantee the way this site's full-bleed strip between differently-colored sections does). Restructured as two pseudo-elements on `.zigzag` itself: `::before` is the full opaque ink rect (always-visible backing, unchanged in spirit from R1-T10); `::after` is the wash-colored (`var(--bg)`, or `var(--cream)` via `.zigzag-dark`) block clipped to the reference's exact polygon, percentage-based so it stretches correctly to any strip width rather than needing to repeat a fixed-size tile. Added `position: relative` to the base `.zigzag` class (previously only the positioned modifier classes — `.nav__zigzag` etc. — set `position`), since the standalone in-flow usages (`Home.jsx`'s Hero→Work divider, `CaseStudyPanel.jsx`) need their own containing block for the new `inset: 0` pseudo-elements to size against.

Changed:
- src/index.css (`.zigzag`/`.zigzag-dark` rebuilt around the reference's clip-path polygon)
- MASTER_PLAN.md (R2-T10 marked Done)
- PROGRESS.md
- EXECUTION_LOG.md

Validation:
- unit tests: PASS (6/6)
- build: PASS (CSS 41.16KB / 8.75KB gzip)
- code review: PASS — confirmed all 6 `zigzag` call sites (`Home.jsx` ×2, `CaseStudyPanel.jsx`, `Nav.jsx`, `Footer.jsx`, `CompactHeader.jsx`) always combine the base `zigzag` class with a modifier, never a bare `zigzag-dark`, so `.zigzag-dark::after`'s color-only override is always paired with base `.zigzag`'s position/size/backing; confirmed the reference's clip-path string was transcribed byte-for-byte via direct grep output, not retyped from memory
- manual/visual browser check: NOT PERFORMED this session — no browser-automation tool available. Recommend the user confirm visually via `npm run dev` against all 6 locations (Home hero→work, Home top-of-Contact, ProjectPage case-study divider, Nav, CompactHeader, Footer) — R1-T10's log entry has the full location list.

Git:
- commit: self (pending, see below)
- push: pending

Next:
Phase R2 is fully Done (10/10 tasks). Resume `P6-T02` (Typography Motion) next, per `PROGRESS.md`.
