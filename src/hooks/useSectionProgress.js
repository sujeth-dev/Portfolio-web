import { useEffect, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const initialState = {
  progress: 0,
  isInView: false,
}

export function useSectionProgress(sectionRef) {
  const [state, setState] = useState(initialState)

  useEffect(() => {
    const element = sectionRef?.current
    if (!element) return undefined

    let trigger
    const context = gsap.context(() => {
      const setInView = (isInView) =>
        setState((previous) =>
          previous.isInView === isInView ? previous : { ...previous, isInView },
        )

      trigger = ScrollTrigger.create({
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          setState((previous) =>
            Math.abs(previous.progress - self.progress) > 0.001
              ? { ...previous, progress: self.progress }
              : previous,
          )
        },
        onEnter: () => setInView(true),
        onEnterBack: () => setInView(true),
        onLeave: () => setInView(false),
        onLeaveBack: () => setInView(false),
      })
    }, element)

    return () => {
      trigger?.kill()
      context.revert()
    }
  }, [sectionRef])

  return state
}
