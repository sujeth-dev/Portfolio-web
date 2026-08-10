# PROGRESS

> Machine-readable-ish status snapshot. Updated after every task per `DEVELOPMENT_LOOP.md` §11. If this file and `EXECUTION_LOG.md` ever disagree, `EXECUTION_LOG.md` (append-only, chronological) wins — fix this file to match it.

**Last updated:** 2026-08-10 13:05
**Branch:** `work`

---

## Current phase

**Phase 4 — Cursor Companion + Scroll Progress** (`MASTER_PLAN.md` → Phase 4)
Status: In Progress

## Current task

**P4-T02** — Create `src/components/systems/ScrollProgressIndicator.jsx` + `src/styles/scroll-indicator.css`.
Dependency P0 is complete. (Independent of P4-T01, already done. Phase 6 (`useReducedMotion`-only dependency, P1) remains eligible in parallel — see MASTER_PLAN.md's phase dependency graph.)

## Completed tasks

- **P0-T01** — Installed GSAP 3.15.0 and Lenis 1.3.26; tests and production build pass.
- **P0-T02** — Added the interaction context/provider with one GSAP ticker, Lenis lifecycle, lerped mouse and scroll metrics, responsive state, CSS-variable updates, and reduced-motion behavior.
- **P0-T03** — Added the interaction-layer variable contract, stacking tokens, parallax base, active-only `will-change`, and reduced-motion overrides.
- **P0-T04** — Mounted the provider, imported the interaction stylesheet, removed native smooth scrolling, and completed Phase 0 browser validation.
- **P1-T01** — Added the ScrollTrigger engine hook with progress/activity/direction state, lifecycle callbacks, and automatic cleanup.
- **P1-T02** — Added the shared-pointer proximity hook with radius falloff, near state, angle, reduced-motion/mobile neutralization, and GSAP-ticker cleanup.
- **P1-T03** — Added the semantic 44px compact header with back navigation, breadcrumb, project-file status, configurable accent line, responsive layout, and focus styling.
- **P1-T04** — Added the generic five-state ProjectStage with continuous progress token, architecture reuse/fallbacks, state rail, reduced-motion final state, and 200px mobile strip.
- **P1-T05** — Added lazy-loaded Synaptic knowledge-machine, Possah payment-terminal, and Velmont blueprint SVG scenes driven by continuous stage progress.
- **P1-T06** — Added previous/all-work/next project navigation with an enlarged accent preview for the next case study, responsive stacking, and visible keyboard focus.
- **P1-T07** — Restructured featured case studies into the 55/45 scrolling-content/sticky-stage scene, wired the compact header and project navigation, added the 200px mobile stage fallback, and connected all five scroll states.
- **P1-T08** — Centralized route-aware header selection in App so featured project routes render only CompactHeader while all other routes retain the full Nav; completed the Phase 1 regression gate.
- **P2-T01** — Migrated ScrollReveal internals from IntersectionObserver/CSS transitions to one-shot GSAP ScrollTriggers while preserving every existing prop and call site, including delay and reduced-motion behavior.
- **P2-T02** — Added the reusable VelocityEffects wrapper with capped skew/stretch/lag transforms, a 20ms lag response, bounded will-change activation, exact settling, and reduced-motion neutralization.
- **P2-T03** — Applied combined restrained velocity response to the project narrative and lag-only response to all four Home skill-group cards; confirmed the planned Thoughts target has no current Home section or call site.
- **P3-T01** — Added `useParallax.js`: layer 1/2/3 mouse/scroll strengths per design doc §2C, GSAP-driven `translate3d`-equivalent offset via `gsap.set`, no-op with transform cleared on reduced-motion/mobile.
- **P3-T02** — Added `useSectionProgress.js`: thin ScrollTrigger wrapper per design doc §2E returning `{ progress, isInView }`, for the background system's theme crossfade.
- **P3-T03** — Added `ParallaxLayer.jsx` (layer-indexed wrapper applying `useParallax`) and `SectionBackground.jsx` (per-section themed container that crossfades opacity via `useSectionProgress`, stays static under reduced motion, and disables its visual output — while keeping its scroll-tracking ref mounted — on mobile). Added minimal `.section-background` base positioning to `interaction-layer.css`; the 5 theme fills remain P3-T04's scope.
- **P3-T04** — Added `section-backgrounds.css` with all 5 themes (`.bg-open`, `.bg-technical`, `.bg-messy`, `.bg-warm`, `.bg-signal`) built from the existing Retro Toy design tokens; each theme paints its wash color on `.section-background` and its dot/grid/scatter/glow/ring pattern on the `.section-background__pattern` child (the `ParallaxLayer`), which is already nudged by `useParallax`'s own mouse/scroll response — no separate CSS mouse-transform was layered on top to avoid fighting GSAP's inline transform.
- **P3-T05** — Mounted `SectionBackground` on the featured project-page scene (`technical` — project pages have no named theme in design doc §5, so this documents that judgment call) and on Home's Hero (`open`), Selected Work (`technical`), Skills (`technical`, `intensity=0.35` for "lighter"), and Contact (`signal`) sections, each wrapped in the existing `.interaction-layer` utility so the background's negative z-index stays scoped to its own section. Added an `intensity` prop to `SectionBackground` for the Skills/Work-page "lighter/reduced opacity" cases named in §5. Verified with real Playwright scroll-throughs (not `fullPage` screenshots, which don't fire ScrollTrigger) on Home and the Synaptic project page at 1280×900 and 375×812, plus a reduced-motion pass — zero console/page errors, correct per-section theming, correct mobile disable, no layout shift or readability regressions.
- **P3-T06** — Replaced the interim 200px mobile strip with a genuine non-sticky, scroll-driven five-state story: `ProjectStage` now branches to a `MobileProjectStage` on mobile that stacks all 5 states as separate panels in normal flow, each independently revealed via `useSectionProgress` as it scrolls into view, sharing panel content with desktop through an extracted `PanelBody` helper (no lazy per-project SVG scenes on mobile, per the perf budget). Added a single `ParallaxLayer(layer=1, mobileScale=0.3)` background accent, which required extending `useParallax`/`ParallaxLayer` with an opt-in `mobileScale` path (default 0, preserving every existing caller's exact no-op-on-mobile behavior). Updated `docs/FUTURE-ENVIRONMENT-LAYER.md`'s stale mobile-strip language in §3, §5, and §9. **Caught and fixed a real performance regression during verification**: an initial `scrub:true` per-panel implementation dropped mobile Lighthouse Performance from an 82 baseline (measured on the pre-Phase-3 commit via a throwaway git worktree) to 64, driven by Total Blocking Time ballooning 90ms→680ms across 5 concurrently-scrubbing `ScrollTrigger` instances. Added a `once` option to `useSectionProgress` (disables `scrub`, and — after discovering GSAP's native `once: true` does *not* suppress `onLeave`/`onLeaveBack` as expected — added an explicit state-latch so `isInView` can only ever transition false→true once `once` is set, verified via direct DOM inspection through a full scroll-down-then-up sequence). Final mobile Performance: 84 (net improvement over the 82 baseline); Accessibility 100.
- **P4-T01** — Added `CursorCompanion.jsx` + `cursor-companion.css`: a fixed-position label pill lerping toward the mouse (factor 0.15, own independent tracking) that shows the hovered element's `data-cursor` value. Used document-level `mouseenter`/`mouseleave` (capture phase) with a direct `dataset.cursor` check rather than `closest()`, so hovering a nested child inside a `data-cursor` element doesn't flicker the label — `mouseleave` on a child would resolve to the same ancestor via `closest()` and incorrectly clear it. Renders nothing (not just hidden) on mobile or under reduced motion. Verified via a temporary mount in `App.jsx`/`Nav.jsx` (reverted before commit, confirmed via empty `git diff`) plus Playwright hover/reduced-motion/mobile checks; mounting the component for real is P4-T04 and rolling out `data-cursor` attributes site-wide is P4-T03.

(Prerequisite work — PixelRobot rollout, card-grid fixes — was already completed on `main`/`work` before this plan existed: commits `5209461` and `1475eb7`. See `EXECUTION_LOG.md` P0-T00 entry for the baseline this plan starts from.)

## Blockers

None currently active.

**Non-blocking note recorded 2026-08-10:** Phase 3's acceptance criterion "3 parallax layers visibly respond differently" is functionally true (verified in `useParallax`'s own layer 1/2/3 strength table) but only layer 1 has a live UI consumer today (`SectionBackground`, mobile `ProjectStage` grid). No task in P3-T01–T06 scoped a layer-2/3 consumer — see `MASTER_PLAN.md`'s Phase 3 "Acceptance note" for the full reasoning. Layers 2/3 are expected to gain real consumers as later phases add the elements they're meant for (richer `ProjectStage` scenes, `RobotCompanion` in P5).

**Upcoming, not-yet-active:** Phase 5 (`P5-T00`) decision recorded on 2026-08-09: extend `src/components/common/PixelRobot.jsx` with expressive poses and creatively bring the pixel robot to life with a friendly Claude-bot-like personality. Do not restore the deleted `Robot.jsx`. This decision does not change task order; formal Phase 5 implementation still begins only after its dependencies are complete.

## Next action

Start `P4-T02`: create `src/components/systems/ScrollProgressIndicator.jsx` + `src/styles/scroll-indicator.css` (Retro Toy machine gauge, section notches, LED dots; robot marker deferred to P5). Independent of `P4-T01`. `aria-label` + `aria-valuenow` are required per Phase 4's acceptance criteria.

## Repository baseline at plan creation (2026-08-09)

- `npm test`: 6/6 pass (`test/content.test.js`)
- `npm run build`: clean — `dist/index.html` 0.96KB, CSS 17.76KB (gzip 3.93KB), JS 274.48KB (gzip 85.09KB)
- `gsap`, `lenis`: not present in `package.json` (confirms P0 has not started)
- Uncommitted at plan creation (unrelated to this plan — do not touch): modified `whiteboard/*.docx` files, untracked `clg-placement/`, `docs/`, `whiteboard/Sujeth_Resume_V2_styled.docx`, `whiteboard/research/ats-scorecard-2026-06-10.md`. These belong to Sujeth's separate placement-prep/career workspace, not this dev loop.
