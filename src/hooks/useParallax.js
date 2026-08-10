import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInteraction } from '../systems/InteractionContext'

gsap.registerPlugin(ScrollTrigger)

const LAYER_STRENGTHS = {
  1: { mouseStrength: 0.01, scrollStrength: 0.02 },
  2: { mouseStrength: 0.03, scrollStrength: 0.05 },
  3: { mouseStrength: 0.05, scrollStrength: 0.03 },
}

const SCROLL_AMPLITUDE = 400

export function useParallax(
  elementRef,
  { layer = 1, mouseStrength, scrollStrength, axis = 'both' } = {},
) {
  const { mouseX, mouseY, reducedMotion, isMobile } = useInteraction()
  const mouse = useRef({ x: mouseX, y: mouseY })
  mouse.current = { x: mouseX, y: mouseY }

  const strengths = LAYER_STRENGTHS[layer] ?? LAYER_STRENGTHS[1]
  const resolvedMouseStrength = mouseStrength ?? strengths.mouseStrength
  const resolvedScrollStrength = scrollStrength ?? strengths.scrollStrength
  const useX = axis === 'both' || axis === 'x'
  const useY = axis === 'both' || axis === 'y'

  useEffect(() => {
    const element = elementRef?.current
    if (!element) return undefined

    if (reducedMotion || isMobile) {
      gsap.set(element, { clearProps: 'transform' })
      return undefined
    }

    const scroll = { offset: 0 }
    let trigger
    const context = gsap.context(() => {
      trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          scroll.offset = (self.progress - 0.5) * SCROLL_AMPLITUDE * resolvedScrollStrength
        },
      })
    }, element)

    const tick = () => {
      const x = useX
        ? (mouse.current.x - 0.5) * window.innerWidth * resolvedMouseStrength
        : 0
      const y =
        (useY ? (mouse.current.y - 0.5) * window.innerHeight * resolvedMouseStrength : 0) +
        (useY ? scroll.offset : 0)

      gsap.set(element, { x, y })
    }

    gsap.ticker.add(tick)

    return () => {
      gsap.ticker.remove(tick)
      trigger?.kill()
      context.revert()
      gsap.set(element, { clearProps: 'transform' })
    }
  }, [
    elementRef,
    reducedMotion,
    isMobile,
    useX,
    useY,
    resolvedMouseStrength,
    resolvedScrollStrength,
  ])
}
