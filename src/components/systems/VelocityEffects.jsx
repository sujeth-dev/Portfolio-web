import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { useInteraction } from '../../systems/InteractionContext'
import { cn } from '../../utils/cn'
import '../../styles/velocity-effects.css'

const VELOCITY_CEILING = 2000
const MAX_SKEW = 2
const MAX_STRETCH = 0.01
const MAX_LAG_OFFSET = 8

function clamp(value, min = -1, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export default function VelocityEffects({
  children,
  effects = [],
  className,
}) {
  const elementRef = useRef(null)
  const { scrollVelocity, reducedMotion } = useInteraction()
  const hasSkew = effects.includes('skew')
  const hasStretch = effects.includes('stretch')
  const hasLag = effects.includes('lag')

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    gsap.killTweensOf(element)

    if (reducedMotion) {
      element.dataset.interactionActive = 'false'
      gsap.set(element, {
        '--velocity-skew': '0deg',
        '--velocity-stretch': 1,
        '--velocity-lag': '0px',
      })
      return undefined
    }

    const normalizedVelocity = clamp(scrollVelocity / VELOCITY_CEILING)
    const isMoving = Math.abs(normalizedVelocity) > 0.00025

    gsap.to(element, {
      '--velocity-skew': `${hasSkew ? normalizedVelocity * MAX_SKEW : 0}deg`,
      '--velocity-stretch': hasStretch
        ? 1 + Math.abs(normalizedVelocity) * MAX_STRETCH
        : 1,
      '--velocity-lag': `${hasLag ? normalizedVelocity * -MAX_LAG_OFFSET : 0}px`,
      duration: isMoving ? 0.12 : 0.25,
      delay: isMoving && hasLag ? 0.02 : 0,
      ease: 'power2.out',
      overwrite: true,
      onStart: () => {
        element.dataset.interactionActive = 'true'
      },
      onComplete: () => {
        element.dataset.interactionActive = 'false'
      },
    })

    return () => {
      gsap.killTweensOf(element)
    }
  }, [hasLag, hasSkew, hasStretch, reducedMotion, scrollVelocity])

  useEffect(() => () => {
    const element = elementRef.current
    if (!element) return

    gsap.killTweensOf(element)
    element.dataset.interactionActive = 'false'
  }, [])

  return (
    <div ref={elementRef} className={cn('velocity-effects', className)}>
      {children}
    </div>
  )
}
