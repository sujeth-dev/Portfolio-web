import { useEffect, useRef } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInteraction } from '../systems/InteractionContext'

// Toggling a `grid-template-rows: 0fr/1fr` accordion changes the height of
// everything below it. GSAP only recomputes ScrollTrigger positions on an
// explicit refresh, not on an arbitrary CSS-transition-driven height change,
// so every accordion in the interaction layer needs this after each toggle.
export function useAccordionRefresh(expanded) {
  const { reducedMotion } = useInteraction()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return undefined
    }

    const delay = reducedMotion ? 0 : 340
    const timer = setTimeout(() => ScrollTrigger.refresh(), delay)
    return () => clearTimeout(timer)
  }, [expanded, reducedMotion])
}
