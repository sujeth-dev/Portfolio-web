import { useRef } from 'react'
import { useScrollEngine } from '../../hooks/useScrollEngine'
import { useParallax } from '../../hooks/useParallax'
import { useInteraction } from '../../systems/InteractionContext'
import '../../styles/typography-motion.css'

function clamp(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0))
}

export default function TypographyMotion({
  text,
  as: As = 'h2',
  effect = 'slide-in',
  className = '',
}) {
  const { reducedMotion } = useInteraction()

  // Only one of these refs ever gets attached to the rendered element (see
  // below), so whichever hook isn't relevant for the current `effect`
  // simply no-ops (both bail out early when their element is null).
  const revealRef = useRef(null)
  const driftRef = useRef(null)

  const { progress: scrollProgress } = useScrollEngine(revealRef, {
    start: 'top 85%',
    end: 'top 40%',
    scrub: true,
  })

  useParallax(driftRef, { mouseStrength: 0, scrollStrength: 0.03, axis: 'y' })

  const isReveal = effect === 'slide-in' || effect === 'mask-reveal'
  const progress = reducedMotion ? 1 : clamp(scrollProgress)

  return (
    <As
      ref={isReveal ? revealRef : driftRef}
      className={`typography-motion typography-motion--${effect} ${className}`.trim()}
      style={isReveal ? { '--motion-progress': progress } : undefined}
    >
      {text}
    </As>
  )
}
