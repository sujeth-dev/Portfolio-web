# PROGRESS

> Machine-readable-ish status snapshot. Updated after every task per `DEVELOPMENT_LOOP.md` §11. If this file and `EXECUTION_LOG.md` ever disagree, `EXECUTION_LOG.md` (append-only, chronological) wins — fix this file to match it.

**Last updated:** 2026-08-10 10:33
**Branch:** `work`

---

## Current phase

**Phase 2 — ScrollReveal Upgrade + Velocity** (`MASTER_PLAN.md` → Phase 2)
Status: In Progress

## Current task

**P2-T01** — Rewrite `src/components/common/ScrollReveal.jsx` internals to GSAP ScrollTrigger while preserving the existing external API.
Dependency Phase 1 is complete.

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

(Prerequisite work — PixelRobot rollout, card-grid fixes — was already completed on `main`/`work` before this plan existed: commits `5209461` and `1475eb7`. See `EXECUTION_LOG.md` P0-T00 entry for the baseline this plan starts from.)

## Blockers

None currently active.

**Upcoming, not-yet-active:** Phase 5 (`P5-T00`) decision recorded on 2026-08-09: extend `src/components/common/PixelRobot.jsx` with expressive poses and creatively bring the pixel robot to life with a friendly Claude-bot-like personality. Do not restore the deleted `Robot.jsx`. This decision does not change task order; formal Phase 5 implementation still begins only after its dependencies are complete.

## Next action

Start `P2-T01`: migrate ScrollReveal internals to GSAP ScrollTrigger without changing its props or any call site, then run visual regressions on every consuming page.

## Repository baseline at plan creation (2026-08-09)

- `npm test`: 6/6 pass (`test/content.test.js`)
- `npm run build`: clean — `dist/index.html` 0.96KB, CSS 17.76KB (gzip 3.93KB), JS 274.48KB (gzip 85.09KB)
- `gsap`, `lenis`: not present in `package.json` (confirms P0 has not started)
- Uncommitted at plan creation (unrelated to this plan — do not touch): modified `whiteboard/*.docx` files, untracked `clg-placement/`, `docs/`, `whiteboard/Sujeth_Resume_V2_styled.docx`, `whiteboard/research/ats-scorecard-2026-06-10.md`. These belong to Sujeth's separate placement-prep/career workspace, not this dev loop.
