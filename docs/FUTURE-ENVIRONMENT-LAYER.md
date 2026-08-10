# Portfolio Phase 3 — Interaction Layer + Environmental World

> Status: **Planned** | Priority: Phase 3
> Prerequisite: Phase 2 complete (PixelRobot everywhere, card fixes)
> References: [segerman.dev](https://segerman.dev) (scroll-driven showcase, depth), [goodgrowth.com](https://goodgrowth.com) (playful environment, retro energy)

**Target feel:** A high-end creative developer portfolio that LOOKS and FEELS like Sujeth's retro-futuristic workshop. Simple document structure + sophisticated interaction layer. NOT a visual clone of either reference — adapted to the Retro Toy identity.

---

## 1. Library Choices

| Library | Size (gzip) | Purpose |
|---|---|---|
| **GSAP** (+ ScrollTrigger) | ~40KB | Scroll-driven pinning, timeline sequencing, performant DOM animation. Free since Webflow acquisition. Animates via inline transforms/opacity (GPU-composited), never triggers layout. Built-in `matchMedia` for responsive breakpoints, single rAF loop via `gsap.ticker`. |
| **Lenis** | ~3KB | Smooth scrolling with interpolation. Exposes normalized scroll velocity and progress. First-class GSAP ScrollTrigger integration via `lenis.on('scroll', ScrollTrigger.update)`. |

**Why NOT Framer Motion:** Wraps every animated element in a React component, causing React re-renders on every frame. GSAP operates outside React's render cycle -- categorically better for a scroll-driven interaction layer with dozens of animated elements.

**No WebGL by default.** Build with CSS transforms, SVG, GSAP, DOM. Only introduce WebGL if a specific component genuinely needs it.

---

## 2. Core Systems (Hooks & Modules)

### 2A. InteractionProvider -- Top-level orchestrator

**File:** `src/systems/InteractionProvider.jsx` + `src/systems/InteractionContext.js`

Wraps entire app (inside `BrowserRouter` in `main.jsx`). Initializes Lenis and GSAP. Provides context:

```
InteractionContext = {
  lenisRef:        RefObject<Lenis>
  scrollProgress:  number          // 0-1 global
  scrollVelocity:  number          // pixels/sec, smoothed
  scrollDirection: 'up' | 'down' | 'idle'
  mouseX:          number          // 0-1 viewport-relative
  mouseY:          number          // 0-1 viewport-relative
  reducedMotion:   boolean
  currentSection:  string          // 'hero' | 'work' | 'skills' | ...
  isMobile:        boolean         // < 768px
}
```

Sets CSS custom properties on `:root` every tick:
- `--mouse-x`, `--mouse-y` (0-1)
- `--mouse-x-norm`, `--mouse-y-norm` (centered, -0.5 to 0.5)
- `--scroll-vel` (clamped 0-1)
- `--scroll-dir` (1 down, -1 up)
- `--section-progress` (0-1 through current section)

Mouse values lerped at 0.08 factor per frame via `gsap.ticker` (not raw mousemove).

When `reducedMotion` is true: Lenis disabled (native scroll), GSAP durations to 0, CSS vars frozen at neutral.

### 2B. useScrollEngine

**File:** `src/hooks/useScrollEngine.js`

```js
useScrollEngine(elementRef, { start, end, scrub, pin, onProgress, onEnter, onLeave })
// Returns: { progress, isActive, direction }
```

Wraps GSAP ScrollTrigger for individual elements. Auto-cleanup on unmount.

### 2C. useParallax

**File:** `src/hooks/useParallax.js`

```js
useParallax(elementRef, { layer: 1|2|3, mouseStrength, scrollStrength, axis })
```

| Layer | Mouse strength | Scroll strength | Purpose |
|---|---|---|---|
| 1 (background) | 0.01 | 0.02 | terrain, grid, patterns |
| 2 (environment) | 0.03 | 0.05 | machines, screens, structures |
| 3 (foreground) | 0.05 | 0.03 | signs, stickers, robot, controls |

Applies `transform: translate3d(dx, dy, 0)` via GSAP.set. No-ops when `reducedMotion` or `isMobile`.

### 2D. useMouseProximity

**File:** `src/hooks/useMouseProximity.js`

```js
useMouseProximity(elementRef, { radius: 200, normalize: true })
// Returns: { proximity: 0-1, isNear: boolean, angle: radians }
```

Used by project cards for "wake up" effects, Robot for look-toward direction. Throttled to 60fps via GSAP ticker.

### 2E. useSectionProgress

**File:** `src/hooks/useSectionProgress.js`

```js
useSectionProgress(sectionRef)
// Returns: { progress: 0-1, isInView: boolean }
```

Thin wrapper over ScrollTrigger. Used by the background system to blend between section themes.

---

## 3. Component Architecture

### New System Components

**`src/components/systems/ParallaxLayer.jsx`**
- Props: `{ layer: 1|2|3, className, style, children }`
- Wrapper div with appropriate z-index and `pointer-events: none`

**`src/components/systems/StickyStage.jsx`** -- The signature feature
- Props: `{ items: Array<{ id, visualComponent, content }>, className }`
- Creates tall container (items.length x 100vh)
- Pins visual stage using ScrollTrigger `pin: true`
- Tracks active item based on scroll position
- Transitions between items' visual environments via GSAP timelines
- Content scrolls on left; visual stage stays fixed on right
- Mobile: stacks vertically, no pinning

**`src/components/systems/SectionBackground.jsx`**
- Props: `{ theme: 'open' | 'technical' | 'messy' | 'warm' | 'signal' }`
- Per-section living backgrounds with SVG patterns and decorative elements
- All elements use `useParallax` at layer 1 strength
- Themes crossfade via `useSectionProgress`
- Responds to pointer via `--mouse-x-norm` / `--mouse-y-norm`

**`src/components/systems/CursorCompanion.jsx`**
- Fixed-position div following mouse with delayed lerp (factor 0.15)
- Interactive elements get `data-cursor="VIEW|OPEN|PLAY|TRY|EXPLORE"` attributes
- Delegated `mouseenter`/`mouseleave` on document reads these
- Hidden by default; fades in only over interactive elements
- Hidden on mobile and reduced motion

**`src/components/systems/ScrollProgressIndicator.jsx`**
- Fixed right side, vertically centered
- Retro Toy machine gauge: 2px border, cream fill, section notches
- Tiny PixelRobot (12px) moves along the track
- LED dots per section mark active area
- Hidden below 768px

**`src/components/systems/TypographyMotion.jsx`**
- Props: `{ text, as: 'h1'|'h2'|'h3'|'span', effect: 'slide-in' | 'mask-reveal' | 'parallax-drift' }`
- `slide-in`: text slides from left/right on scroll, can clip behind adjacent objects
- `mask-reveal`: clip-path expands on scroll
- `parallax-drift`: slight translateY at 0.03x scroll speed
- All via ScrollTrigger scrub. Reduced motion: immediate render.

**`src/components/systems/VelocityEffects.jsx`**
- Props: `{ children, effects: ('skew' | 'stretch' | 'lag')[] }`
- `skew`: up to 2deg skewY based on `--scroll-vel`
- `stretch`: up to 1.01 scaleY
- `lag`: 20ms delay on translateY
- All lerp back to 0 when scrolling stops. Extremely restrained.

### Robot Integration

**`src/components/robot/RobotCompanion.jsx`**
- Props: `{ pose, position: {x,y} | 'auto', lookAtMouse: boolean, size }`
- Wraps existing `Robot.jsx` (8 poses: wave, inspect, build, sleep, lost, goggles, signal, read)
- `lookAtMouse`: subtle rotation toward mouse via `useMouseProximity`
- Strategic placements (not continuous following -- makes appearances meaningful):
  - Hero: wave, lookAtMouse
  - Work section: inspect when card hovered
  - Experience: build
  - Contact: signal with animated antenna arcs
  - Lab: goggles
  - About: read
  - 404: lost with mouse follow

### Inner Page Components

**`src/components/layout/CompactHeader.jsx`**
- Props: `{ backTo, backLabel, breadcrumb, links }`
- 44px height control strip for inner pages (vs main Nav's 60px)
- Silkscreen breadcrumb, compact nav links
- Retro Toy console feel

**`src/components/project/ProjectStage.jsx`**
- Props: `{ project, scrollProgress: 0-1 }`
- Sticky right side (45% width), evolving visual composition
- 5 scroll states: introduction -> problem -> architecture -> engineering -> results
- Per-project visual identity:
  - **Synaptic** (`knowledge-machine`): SVG knowledge graph nodes pulsing, edges drawing, BKT bars
  - **Possah** (`payment-terminal`): terminal screen, receipt printer animation, Razorpay flow
  - **Velmont** (`blueprint`): blueprint grid, construction lines, wireframe building
- Mobile (< 768px, updated 2026-08-10 per P3-T06): non-sticky, stacked in normal flow above the scrolling content — no split layout, no pin. Renders all 5 states as separate inline panels, each independently revealed via `useSectionProgress` as it scrolls into view (not the desktop single-instance crossfade driven by one continuous `scrollProgress`). Shares panel content with desktop (`ProjectMonogram`, problem bars, `ArchDiagram`/node-map fallback, terminal, result mark) rather than mounting the lazy per-project SVG scenes, per the mobile performance budget. Carries one subthreshold `ParallaxLayer` (layer 1, `mobileScale: 0.3`) as its only motion, an explicit opt-in exception to the layer being fully disabled on mobile elsewhere (see §9).

**`src/components/project/ProjectNav.jsx`**
- Props: `{ prev, next }`
- Bottom: <- PREVIOUS / ALL WORK / NEXT PROJECT ->
- Next project gets enlarged preview card with accent color
- Creates natural exploration loop

**Project Stage sub-components** (lazy-loaded):
- `src/components/project/stages/SynapticStage.jsx`
- `src/components/project/stages/PossahStage.jsx`
- `src/components/project/stages/VelmontStage.jsx`

---

## 4. CSS Architecture

### New CSS Files

| File | Purpose |
|---|---|
| `src/styles/interaction-layer.css` | Base system styles, new `:root` custom properties, parallax layer positioning, `will-change` optimizations, reduced-motion overrides |
| `src/styles/cursor-companion.css` | Fixed cursor label, Silkscreen font, ink/cream pill, show/hide transitions |
| `src/styles/scroll-indicator.css` | Machine gauge, section notches, LED dots, robot marker |
| `src/styles/section-backgrounds.css` | 5 background themes (.bg-open, .bg-technical, .bg-messy, .bg-warm, .bg-signal), mouse-responsive transforms |
| `src/styles/typography-motion.css` | Heading motion effects, oversized text styles, clip-path reveals |
| `src/styles/sticky-stage.css` | Two-column stage layout, visual transitions, image reveal metaphors (CRT, shutter, mask) |
| `src/styles/compact-header.css` | 44px control strip, breadcrumb, accent line |
| `src/styles/project-stage.css` | Per-project visual compositions, 5 scroll state classes |
| `src/styles/velocity-effects.css` | Scroll-velocity transforms (skew, stretch, lag) |

### New Custom Properties (added to `:root`)

```css
/* Mouse tracking (set by JS every frame) */
--mouse-x: 0.5;
--mouse-y: 0.5;
--mouse-x-norm: 0;
--mouse-y-norm: 0;

/* Scroll tracking (set by JS every frame) */
--scroll-vel: 0;
--scroll-dir: 1;
--section-progress: 0;

/* Interaction z-indices */
--z-bg: -10;
--z-env: -5;
--z-fg: -1;
--z-content: 1;
--z-cursor-companion: 9999;
--z-scroll-indicator: 150;
```

### Changes to `src/index.css`

- **Remove** `scroll-behavior: smooth` from `html` rule (line 5) -- Lenis handles this
- Add new custom properties to existing `:root` block
- Add reduced-motion rules for new interaction-layer animations

---

## 5. Page-by-Page Integration

### Homepage (`/`)

**Interaction intensity: 70% experience / 30% reading**

| Section | Background theme | Key interactions |
|---|---|---|
| Hero | `open` | TypographyMotion mask-reveal on hero name; RobotCompanion(wave, lookAtMouse) replaces PixelRobot in vignette; workshop card tilts toward mouse |
| Selected Work | `technical` | **StickyStage** -- the 3 featured projects pin a visual stage on the right while text scrolls on the left. Per-project: accent color crossfades, visual composition transitions, robot pose changes. Secondary/other grids remain below the stage as-is. |
| Skills | `technical` (lighter) | VelocityEffects(lag) on skill group cards; TypographyMotion slide-in on heading |
| Experience | (default) | Upgraded ScrollReveal via GSAP; RobotCompanion(build) near heading |
| Thoughts | `warm` | VelocityEffects(lag) on thought cards |
| Contact | `signal` | RobotCompanion(signal) with animated antenna arcs; signal wave circles (SVG) |

**Sticky Stage detail:** As user scrolls through the selected work section:
- Synaptic active -> background: connected nodes, pulsing mastery states, robot studying screen
- Possah active -> background transitions to: package conveyor, payment terminal, receipt printer
- Velmont active -> environment shifts to: blueprint grid, construction lines, interface wireframe
- Transitions are continuous during scrolling, not hard cuts

### Work Page (`/work`)

**Interaction intensity: 30% experience / 70% reading**

- SectionBackground(technical) at reduced opacity (0.3)
- `data-cursor="VIEW"` on project cards
- Enhanced hover: accent stripe glows (box-shadow with accent color), card lifts more, cursor companion appears, robot changes pose
- Filter tabs: GSAP scaleX spring on active underline
- No sticky stage (homepage feature only)

### Project Pages (`/work/:slug`) -- PRIMARY PROVING GROUND

**Interaction intensity: 25% experience / 75% reading**

> **Implementation note:** Project pages are built FIRST as the proving ground for the interaction system. All new systems (InteractionProvider, useScrollEngine, useParallax, CompactHeader, ProjectStage) are developed, tested, and previewed here before being expanded to the homepage and other pages. This keeps the blast radius small and allows iteration on a focused, self-contained page.

Each project page is ONE coherent visual composition that unfolds through scroll.

**Layout restructure:**
```
<CompactHeader backTo="/work" breadcrumb="WORK / SYNAPTIC" />
<div class="project-scene">
  <div class="project-scroll-content">  <!-- left 55%, scrolls -->
    <!-- all text content -->
  </div>
  <div class="project-stage-container">  <!-- right 45%, sticky -->
    <ProjectStage project={project} scrollProgress={progress} />
  </div>
</div>
```

**Scroll states** (user just scrolls normally -- no snap, no viewport lock):
- 0-0.2: Project identity, logo/accent, name reveal
- 0.2-0.4: Visual representation of the problem space
- 0.4-0.6: Architecture diagram draws itself (edges, nodes animate in)
- 0.6-0.8: Engineering highlights visualized (code-like elements, terminal outputs)
- 0.8-1.0: Final state, CTA elements, links

**Mobile (< 768px, updated 2026-08-10 per P3-T06):** `ProjectStage` is `position: relative` (non-sticky) and renders above the scrolling content, but is no longer a static 200px strip. It's a genuine scroll-driven mini-story: all 5 states stack in normal document flow as separate panels, each fading and sliding in on its own as the user scrolls it into view (via `useSectionProgress`, not the desktop pin+scrub). The user scrolls through identity → problem → architecture → engineering → results before reaching the case-study text below, rather than glimpsing one frozen state before the strip scrolls away.

**Robot:** Appears twice -- near "The Problem" heading (inspect, 32px) and near "Next Project" (wave, 28px).

**ProjectNav:** <- PREVIOUS / ALL WORK / NEXT -> with large preview card for next project.

### Lab Page (`/lab`)

**Interaction intensity: 50% experience / 50% exploration**

- SectionBackground(messy): scattered dots, irregular grid, prototype aesthetic
- `data-cursor="TRY"` / `data-cursor="EXPLORE"` on lab cartridges
- Enhanced hover: rotation increases (+/-1deg to +/-2deg)
- Prototype LED effects: small colored circles scattered around background, blinking at different rates
- RobotCompanion(goggles, 40px) replaces PixelRobot in heading

### About Page (`/about`)

**Interaction intensity: 35% experience / 65% reading**

- SectionBackground(warm): subtle warm radial gradient
- Dev card: mouse-responsive tilt via `useMouseProximity` (max 3deg)
- RobotCompanion(read, 36px) replaces PixelRobot in dev card

### 404 Page

- RobotCompanion(lost, 64px) replaces PixelRobot, with mouse follow (looks toward mouse)
- No other interaction additions

---

## 6. Background System Detail

The background is NOT a static cream fill. It's a living but restrained system that changes per section.

**Ingredients:** abstract geometric terrain, moving grid, technical lines, pixel textures, machine silhouettes, pipes, wires, blueprint marks, dots, status labels, faint schematics.

**Per-section themes:**
- **Hero (open):** welcoming, sparse geometric shapes, a few floating elements
- **Work (technical):** denser grid, machine silhouettes, technical line patterns, blueprint marks
- **Lab (messy):** scattered, irregular dots, prototype aesthetic
- **About (warm):** warmer cream, soft radial gradient
- **Contact (signal):** dark background with signal wave circles

Transitions happen gradually through scroll, not as hard section boundaries. Driven by `useSectionProgress` crossfading between themes.

Background responds to pointer position:
```css
transform: translate(calc(var(--mouse-x-norm) * 5px), calc(var(--mouse-y-norm) * 5px));
```

---

## 7. Mouse & Scroll Interaction Detail

### Pointer System (one shared handler)
```
mousemove -> raw position -> lerp (0.08/frame via gsap.ticker) -> CSS custom properties
```

Different elements consume `--mouse-x-norm` / `--mouse-y-norm` at different strengths -- creating the diorama depth effect without attaching handlers to dozens of elements.

### Parallax Depth (3 layers)
- Layer 1 (Background): mouse response very small, scroll response small
- Layer 2 (Environment): mouse response medium, scroll response medium
- Layer 3 (Foreground): mouse response slightly stronger, scroll response small

Creates dimensional feel without requiring 3D.

### Scroll Velocity Effects
- Faster scrolling -> objects lag slightly, typography skews 1-2deg, layers stretch subtly
- Settles when scrolling stops
- Extremely restrained -- premium feel without changing navigation

### Proximity Interactions
Objects respond before clicked:
- Cable lights activate, button label appears, machine starts idling
- Artwork slightly separates into layers, sticker lifts, robot notices pointer
- Use proximity only on important visual objects

---

## 8. Implementation Phases

Each phase is independently deployable. **Project pages are the proving ground** -- new systems are built, tested, and previewed on project pages first, then expanded to the homepage and other pages.

### Phase 0: Foundation (1-2 days)
- `npm install gsap lenis`
- Create `InteractionProvider` (Lenis init, GSAP ticker, mouse tracking, CSS vars)
- Wire `useReducedMotion` into provider
- Remove `scroll-behavior: smooth` from `index.css`
- Wrap app in `<InteractionProvider>` in `App.jsx`
- Create `src/styles/interaction-layer.css`
- **Result:** Smooth scrolling works. Mouse CSS vars set. No visual changes.

### Phase 1: Project Page Scene -- The Proving Ground (3-4 days)
- Create `CompactHeader`, `ProjectStage`, `ProjectNav`
- Create `useScrollEngine` hook
- Create `useMouseProximity` hook
- Create `RobotCompanion` wrapping `Robot.jsx`
- Create 3 project-specific stage sub-components (lazy-loaded)
- Restructure `ProjectPage.jsx` to two-column sticky layout
- Build 5 scroll states per project visualization
- Conditional Nav vs CompactHeader via App.jsx
- **Result:** Project pages become single-scene unfolding experiences. All core systems proven on a focused page.

### Phase 2: ScrollReveal Upgrade + Velocity (1-2 days)
- Rewrite `ScrollReveal` internals to use GSAP ScrollTrigger (same external API)
- Create `VelocityEffects` component + CSS
- Add velocity effects to project pages and a few Home sections
- **Result:** Existing reveals use GSAP. Subtle velocity effects visible.

### Phase 3: Parallax + Section Backgrounds (2-3 days)
- Create `useParallax`, `ParallaxLayer`, `SectionBackground`
- Create all 5 background themes CSS
- Add backgrounds to project pages first, then Home page sections
- **Result:** Living backgrounds responding to scroll and mouse.

### Phase 4: Cursor Companion + Scroll Progress (1-2 days)
- Create `CursorCompanion` + `ScrollProgressIndicator`
- Add `data-cursor` attributes to interactive elements across all pages
- Mount both in `App.jsx`
- **Result:** Cursor companion over interactive elements. Scroll gauge visible.

### Phase 5: Robot Integration Across Site (1-2 days)
- Place Robot strategically across all pages (not just project pages)
- Replace relevant `PixelRobot` instances (keep PixelRobot for tiny uses: nav, footer, card footers)
- **Result:** Robot.jsx finally used throughout. Robot responds to mouse.

### Phase 6: Typography Motion (1 day)
- Create `TypographyMotion` component + CSS
- Apply to hero name, section titles, selected oversized headings
- **Result:** Headings have scroll-driven motion. Body copy stays static.

### Phase 7: Sticky Stage -- Homepage Project Showcase (3-4 days)
- Create `StickyStage` component + CSS
- Restructure "Selected Work" on Home to use sticky stage for featured projects
- Build transition timelines between 3 featured projects
- Build per-project visual environments (SVG-based)
- Mobile fallback: stacked cards, no pinning
- **Result:** The signature scroll-driven project showcase on homepage.

### Phase 8: Inner Page Polish (1-2 days)
- Work page: enhanced project hover with accent glow
- Lab page: prototype LED effects + goggles robot
- About page: dev-card tilt + reading robot
- 404: lost robot with mouse follow
- **Result:** All pages at their appropriate interaction level.

### Phase 9: Performance Audit + Cleanup (1-2 days)
- Lighthouse target: Performance 90+, Accessibility 100
- Audit `will-change` usage
- Verify all ScrollTrigger/Lenis cleanup on unmount
- Test reduced motion: everything disabled
- Test mobile: environmental elements hidden, clean scrolling
- Code-split interaction layer for mobile
- **Result:** Production-ready.

---

## 9. Performance Budget

**Bundle additions:**
- GSAP core: ~28KB gzip
- ScrollTrigger: ~12KB gzip
- Lenis: ~3KB gzip
- New CSS: ~8-12KB
- **Total: ~55KB gzip** (acceptable for a portfolio)

**Runtime rules:**
1. Animated properties: ONLY `transform` and `opacity` (GPU-composited)
2. `will-change: transform` only on actively-animating elements
3. One rAF loop via GSAP ticker -- no additional rAF calls
4. Mouse handler throttled to GSAP ticker (not raw mousemove)
5. ~15-20 ScrollTrigger instances on Home, ~8 per project page
6. CSS `contain: layout style paint` on parallax containers
7. Mobile (< 768px): parallax, cursor companion, scroll indicator, and section backgrounds all disabled, with one named exception (updated 2026-08-10 per P3-T06): the mobile `ProjectStage`'s single background `ParallaxLayer` (layer 1) opts into a reduced-strength mobile path (`mobileScale: 0.3`) via `useParallax`, instead of the hook's default full no-op on mobile. Everything else in this rule is unchanged.

**Loading:**
- GSAP/Lenis imported top-level (needed immediately)
- Project-specific `ProjectStage` sub-components lazy-loaded via `React.lazy()`

---

## 10. Accessibility

**Reduced motion** (critical path):
- `useReducedMotion()` hook (exists at `src/hooks/useReducedMotion.js`) consumed by `InteractionProvider`
- When true: Lenis disabled, GSAP duration to 0, CSS vars frozen, CursorCompanion hidden, VelocityEffects no-op, backgrounds static
- Existing `@media (prefers-reduced-motion: reduce)` block in `index.css` handles CSS animations

**Keyboard:** All interactive elements focusable. CursorCompanion has `pointer-events: none`. StickyStage content in natural tab order. No keyboard traps.

**Screen readers:** All decorative SVG `aria-hidden="true"`. ScrollProgressIndicator has `aria-label` + `aria-valuenow`. TypographyMotion renders semantic heading elements.

**Color:** No palette changes. Cursor companion uses `--ink` / `--cream` (contrast > 7:1).

---

## 11. File Manifest

### New Files (29)

**Systems:**
- `src/systems/InteractionProvider.jsx`
- `src/systems/InteractionContext.js`

**Hooks:**
- `src/hooks/useScrollEngine.js`
- `src/hooks/useParallax.js`
- `src/hooks/useMouseProximity.js`
- `src/hooks/useSectionProgress.js`

**System components:**
- `src/components/systems/ParallaxLayer.jsx`
- `src/components/systems/StickyStage.jsx`
- `src/components/systems/SectionBackground.jsx`
- `src/components/systems/CursorCompanion.jsx`
- `src/components/systems/ScrollProgressIndicator.jsx`
- `src/components/systems/TypographyMotion.jsx`
- `src/components/systems/VelocityEffects.jsx`

**Robot:**
- `src/components/robot/RobotCompanion.jsx`

**Layout:**
- `src/components/layout/CompactHeader.jsx`

**Project:**
- `src/components/project/ProjectStage.jsx`
- `src/components/project/ProjectNav.jsx`
- `src/components/project/stages/SynapticStage.jsx`
- `src/components/project/stages/PossahStage.jsx`
- `src/components/project/stages/VelmontStage.jsx`

**Styles:**
- `src/styles/interaction-layer.css`
- `src/styles/cursor-companion.css`
- `src/styles/scroll-indicator.css`
- `src/styles/section-backgrounds.css`
- `src/styles/typography-motion.css`
- `src/styles/sticky-stage.css`
- `src/styles/compact-header.css`
- `src/styles/project-stage.css`
- `src/styles/velocity-effects.css`

### Modified Files (12)

- `package.json` -- add `gsap`, `lenis`
- `src/main.jsx` -- import `interaction-layer.css`
- `src/App.jsx` -- wrap in InteractionProvider, add CursorCompanion + ScrollProgressIndicator, conditional Nav vs CompactHeader
- `src/index.css` -- remove `scroll-behavior: smooth`, add new custom properties, interaction-layer reduced-motion rules
- `src/components/common/ScrollReveal.jsx` -- internals to GSAP ScrollTrigger (same API)
- `src/components/layout/Nav.jsx` -- `data-cursor` attributes, subtle scroll progress bar
- `src/pages/Home.jsx` -- section wrappers, SectionBackground, TypographyMotion, StickyStage, RobotCompanion, VelocityEffects
- `src/pages/ProjectPage.jsx` -- two-column sticky layout, ProjectStage, CompactHeader, ProjectNav
- `src/pages/Work.jsx` -- `data-cursor` attributes, enhanced hover
- `src/pages/Lab.jsx` -- SectionBackground, RobotCompanion, LED effects
- `src/pages/About.jsx` -- SectionBackground, RobotCompanion, dev-card tilt
- `src/pages/NotFound.jsx` -- RobotCompanion(lost) with mouse follow

### Unchanged Files

- `src/hooks/useInView.js` -- kept (may still be used)
- `src/hooks/useReducedMotion.js` -- kept as-is (consumed by InteractionProvider)
- `src/hooks/useScrollTop.js` -- kept
- `src/utils/cn.js` -- kept
- `src/components/common/PixelRobot.jsx` -- kept for tiny inline uses (nav logo, footer)
- `src/components/robot/Robot.jsx` -- kept as-is (consumed by RobotCompanion wrapper)
- `src/components/layout/Footer.jsx` -- kept
- `src/components/project/ArchDiagram.jsx` -- kept (used within ProjectStage)
- `src/components/project/ProjectOverlay.jsx` -- kept (Work page trifold)
- `src/data/*` -- all 5 data files unchanged
- `vite.config.js` -- unchanged
- `vercel.json` -- unchanged

---

## 12. Verification

- [ ] `npm run build` clean after each phase
- [ ] Smooth scrolling works (Lenis active, native scroll-behavior removed)
- [ ] Mouse CSS vars updating on `:root` (inspect with DevTools)
- [ ] **Project pages working first** -- single-scene unfolding, sticky ProjectStage, CompactHeader, ProjectNav
- [ ] Parallax depth visible -- 3 layers respond differently to mouse and scroll
- [ ] Section backgrounds change through scroll (open -> technical -> messy -> warm -> signal)
- [ ] Background responds to mouse position
- [ ] Cursor companion appears over `data-cursor` elements with correct labels
- [ ] Scroll progress gauge tracks position, robot marker moves, LEDs activate
- [ ] Homepage sticky stage: 3 projects pin and transition during scroll
- [ ] CompactHeader renders on inner pages, full Nav on homepage
- [ ] Robot appears at strategic positions, responds to mouse (looks toward)
- [ ] Typography motion: headings animate on scroll
- [ ] Velocity effects: subtle skew/stretch on fast scroll, settles when stopped
- [ ] `prefers-reduced-motion`: everything disabled, content immediately visible
- [ ] Mobile (375px): environmental elements hidden, no pinning, clean scrolling
- [ ] Lighthouse: Performance 90+, Accessibility 100
- [ ] No layout shift, no jank, no interference with text readability
