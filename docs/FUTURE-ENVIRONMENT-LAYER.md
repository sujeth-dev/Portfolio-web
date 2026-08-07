# Future Development: Environmental World Layer

> Status: **Planned** | Priority: Phase 3
> Prerequisite: Phase 2 complete (pixel robot icon, card fixes)

---

## Design Philosophy

"An imaginary developer workshop from a future designed in the 1980s" — warm, curious, expressive. NASA control room + Nintendo toy + electronics bench. NOT cyberpunk.

**Density:** 60-70% clean/readable, 20-30% environmental character, 5-10% tiny discoveries.

## Implementation Scope

1. One connected environmental background system (cables)
2. One robot character (3 states)
3. Hero environment ("Entry Station")
4. Project-machine language (work card power-up effects)
5. Lab environment (workbench feel)
6. 3-5 ambient animation types (LED blink, antenna rotate, cursor blink, data pulse, fan)
7. 3 small optional interactions

## Architecture Decisions

1. **No context/provider** — each section's decorations are independent, local state only
2. **Separate CSS file** — `src/styles/environment.css` imported from `main.jsx`. Clean separation from design system. All `@keyframes` here.
3. **CSS animations only** (except robot idle timer) — GPU-composited `transform` + `opacity`. Automatically handled by existing `prefers-reduced-motion` media query.
4. **Absolute positioning within relative section wrappers** — decorations at `z-index: 0`, content at `z-index: 1`. `pointer-events: none` on all decorations.
5. **Cable system as static SVG** — approximate positions via viewBox percentages, no JS measurement needed. Decorative, not precise.
6. **Hidden on mobile** (< 768px) — environmental elements get `display: none`. Mobile stays clean and fast.

## Z-Index Strategy

```
z-index: -1   -> EnvironmentLayer (full-page cables)
z-index:  0   -> Section decorations (absolute in section)
z-index:  1   -> Section content (.env-content class)
z-index: 99   -> Mobile menu (existing)
z-index: 100  -> Nav (existing)
z-index: 200  -> Trifold overlay (existing)
```

## Component Structure

5 new files:

```
src/
  components/environment/
    EnvironmentLayer.jsx    -- Full-page cable/pipe SVG overlay (placed in App.jsx)
    SectionEnv.jsx          -- Wrapper: adds position:relative + per-section decorations
    Ambient.jsx             -- Named exports: BlinkingLED, RotatingAntenna, BlinkingCursor,
                               TurningFan, PulsingCable, TinySatellite, DataPulse
    WorkshopRobot.jsx       -- Animated pixel-art robot character (idle/inspect/typing)
  styles/
    environment.css         -- All @keyframes, .env-* classes, responsive rules
```

## Component Specifications

### EnvironmentLayer.jsx

Full-page SVG overlay behind all content. Contains 2 vertical cable paths running along the page margins (outside 1200px content area). Cables use stroke-dasharray animation for flowing data pulse effect.

- SVG: `position: fixed; top: 0; left: 0; width: 100%; height: 100vh; z-index: -1; pointer-events: none`
- 2 cables: left margin (~5% from edge) and right margin, drawn as cubic Bezier curves
- Base stroke: `var(--border)` 2px
- Animated overlay stroke: `var(--cobalt)` 2px, `stroke-dasharray: 20 40`, offset cycles over 15s
- Junction nodes (small squares) at approximate section boundaries
- Hidden below 768px

### SectionEnv.jsx

Wrapper that:
1. Adds `position: relative; overflow: hidden` to the section
2. Renders section-specific decorations at z-index 0 based on `section` prop
3. Wraps children in a `div` with `position: relative; z-index: 1`

Sections and their decorations:

**`section="hero"` (Entry Station)**
- Top-right corner: monitor SVG (60x40) with BlinkingCursor inside and 3 text-line rects that cycle opacity
- Above monitor: RotatingAntenna
- Right side: LED strip (5 dots, staggered blink)
- Right side: Small satellite crossing on 25s loop
- Interaction: click LED strip to toggle blink pattern

**`section="work"` (Production Floor)**
- Cards get a "power-up" effect when entering viewport -- accent stripe transitions from muted to lit (CSS transition triggered by `.visible` class from ScrollReveal)
- Left margin: vertical pipe with small gauge circle
- Interaction: hovering featured card makes accent stripe glow (box-shadow with project accent color)

**`section="lab"` (Experimental Playground)**
- Background: subtle cross-hatch pattern (CSS `repeating-linear-gradient`)
- 2-3 loose wire SVGs (curved paths with gentle `rotate` sway animation, `transform-origin: top`)
- Warning stripe at top (diagonal yellow/ink, 6px tall bar)
- TurningFan near section heading

**`section="contact"` (Transmission Station)**
- Signal arcs: 3 concentric arcs scaling outward from antenna with fading opacity (8s loop)
- Signal strength meter: 4 vertical bars lighting up in sequence
- Interaction: click antenna for burst animation (one-shot CSS class on `animationend`)

### Ambient.jsx -- Named SVG Exports

Each is a small, self-contained SVG component:

| Export | viewBox | Animation | Duration |
|---|---|---|---|
| `BlinkingLED` | 32x8 | 4 circles, opacity 1->0.3, staggered delays | 2-4s each |
| `RotatingAntenna` | 24x48 | Crossbar rotates 360deg around mast top | 20s |
| `BlinkingCursor` | 6x14 | Rect opacity 1->0 with `steps(2)` | 1s |
| `TurningFan` | 24x24 | 4 blades rotate 360deg | 8s |
| `DataPulse` | Takes `d` path | stroke-dashoffset 0->24 | 3s |
| `TinySatellite` | 12x12 | translateX edge-to-edge | 25s |

Colors: `var(--border)`, `var(--muted)`, `var(--cobalt)` -- recessive, never competing with content.

### WorkshopRobot.jsx -- Animated Character

Pixel-art robot, ~48x56 viewBox (same proportions as existing Robot.jsx). Rendered in the hero workshop vignette area.

Three CSS-driven states:
- **idle** -- default. Head bobs (translateY 0->-2px, 4s). Eyes blink every 6s (eye rects go to 0 height for 150ms).
- **inspect** -- Eyes shift sideways (x-position alternates). Triggered after random 10-20s interval.
- **typing** -- Arms move up/down rapidly (`steps(2)` 0.3s). Triggered after random 15-25s interval.

State machine:
- `useState` for current state
- `setTimeout` to randomly switch between states (guarded by `useReducedMotion()`)
- Each state lasts 3-5s then returns to idle
- If reduced motion: stays in idle with no animations

Uses design token colors via CSS custom properties. Position: inside the hero workshop vignette box, replacing the current static PixelRobot.

## Integration Points

| Existing File | Change |
|---|---|
| `src/App.jsx` | Add `<EnvironmentLayer />` as sibling of `<main>` |
| `src/main.jsx` | Add `import './styles/environment.css'` |
| `src/pages/Home.jsx` | Wrap hero, work, skills, experience, thoughts, and contact sections with `<SectionEnv section="...">`. Replace hero vignette PixelRobot with `<WorkshopRobot />`. |
| `src/pages/Lab.jsx` | Wrap with `<SectionEnv section="lab">` |
| `src/pages/About.jsx` | Wrap with `<SectionEnv section="about">` (minimal decorations -- bookshelf, coffee cup) |
| `src/index.css` | No changes -- environment CSS is additive in its own file |

## Animation Timing

| Type | Duration | Easing |
|---|---|---|
| Ambient loops (LED, fan, antenna) | 8-30s | `ease-in-out` or `steps()` |
| Cable data pulse | 15s | `linear` |
| Robot state transitions | 150-350ms | `var(--ease-snap)` |
| Section enter (power-up) | 400-800ms | `var(--ease-snap)` |
| Interaction responses | 200-400ms | `var(--ease-snap)` |

## Responsive Strategy

- **Desktop (>1200px):** Full environment -- cables, all decorations, robot, interactions
- **Tablet (768-1200px):** Reduced -- cables hidden, decorations scaled down, robot stays in hero
- **Mobile (<768px):** Minimal -- nearly everything hidden (hero vignette already hidden), keep only 1-2 tiny ambient hints (a single blinking LED near a section label)

## Implementation Order

### Phase B -- Environmental Foundation
1. Create `src/styles/environment.css` with all `@keyframes`, `.env-*` base classes, responsive rules
2. Create `Ambient.jsx` with the 6 named SVG exports
3. Create `SectionEnv.jsx` wrapper component
4. Create `EnvironmentLayer.jsx` cable system
5. Add cable layer to `App.jsx`, import CSS in `main.jsx`

### Phase C -- Section Environments + Robot
6. Create `WorkshopRobot.jsx` with idle/inspect/typing states
7. Wire hero environment (monitor, antenna, LED, satellite, robot) into Home.jsx
8. Wire work environment (card power-up effect, pipe/gauge) into Home.jsx
9. Wire lab environment (cross-hatch, wires, fan, warning stripe) into Lab.jsx
10. Wire contact environment (signal arcs, meter) into Home.jsx

### Phase D -- Interactions
11. Hero LED strip click toggle
12. Work card hover glow (accent color box-shadow)
13. Contact antenna burst animation

## Verification Checklist

- [ ] `npm run build` -- clean, no errors
- [ ] Vertical cables visible on page margins (desktop only)
- [ ] Hero has monitor, antenna, LED strip, satellite decorations
- [ ] Workshop robot in hero vignette with idle blinking animation
- [ ] Work cards have power-up glow on viewport enter
- [ ] Lab page has cross-hatch background, loose wires, fan
- [ ] Contact section has signal arcs and meter
- [ ] Three interactions work (LED click, card hover glow, antenna click)
- [ ] `prefers-reduced-motion` -- all animations frozen, robot in static idle
- [ ] Mobile (375px) -- environmental elements hidden, content clean
- [ ] No layout shift, no jank, no interference with text readability
