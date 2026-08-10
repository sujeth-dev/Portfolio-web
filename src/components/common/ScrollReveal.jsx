import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useInteraction } from '../../systems/InteractionContext'
import { cn } from '../../utils/cn'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollReveal({ children, className, delay = 0 }) {
  const elementRef = useRef(null)
  const { reducedMotion } = useInteraction()

  useEffect(() => {
    const element = elementRef.current
    if (!element) return undefined

    if (reducedMotion) {
      element.dataset.interactionActive = 'false'
      gsap.set(element, { autoAlpha: 1, y: 0 })

      return () => {
        gsap.set(element, { clearProps: 'opacity,visibility,transform' })
      }
    }

    const context = gsap.context(() => {
      gsap.fromTo(
        element,
        { autoAlpha: 0, y: 20 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.5,
          delay: Math.max(0, Number(delay) || 0) / 1000,
          ease: 'power2.out',
          onStart: () => {
            element.dataset.interactionActive = 'true'
          },
          onComplete: () => {
            element.dataset.interactionActive = 'false'
          },
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            once: true,
          },
        },
      )
    }, element)

    return () => {
      element.dataset.interactionActive = 'false'
      context.revert()
    }
  }, [delay, reducedMotion])

  return (
    <div
      ref={elementRef}
      className={cn('reveal', className)}
    >
      {children}
    </div>
  )
}
