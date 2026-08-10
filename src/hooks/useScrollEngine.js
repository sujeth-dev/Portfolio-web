import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const initialState = {
  progress: 0,
  isActive: false,
  direction: 'idle',
}

function useLatest(value) {
  const ref = useRef(value)

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref
}

export function useScrollEngine(
  elementRef,
  {
    start = 'top bottom',
    end = 'bottom top',
    scrub = true,
    pin = false,
    onProgress,
    onEnter,
    onLeave,
  } = {},
) {
  const [state, setState] = useState(initialState)
  const onProgressRef = useLatest(onProgress)
  const onEnterRef = useLatest(onEnter)
  const onLeaveRef = useLatest(onLeave)

  useEffect(() => {
    const element = elementRef?.current

    if (!element) return undefined

    let trigger
    const context = gsap.context(() => {
      const updateState = (self, isActive = self.isActive) => {
        const next = {
          progress: self.progress,
          isActive,
          direction: self.direction > 0 ? 'down' : 'up',
        }

        setState((previous) =>
          Math.abs(previous.progress - next.progress) > 0.001 ||
          previous.isActive !== next.isActive ||
          previous.direction !== next.direction
            ? next
            : previous,
        )
      }

      const handleEnter = (self) => {
        updateState(self, true)
        onEnterRef.current?.(self)
      }

      const handleLeave = (self) => {
        updateState(self, false)
        onLeaveRef.current?.(self)
      }

      trigger = ScrollTrigger.create({
        trigger: element,
        start,
        end,
        scrub,
        pin,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          updateState(self)
          onProgressRef.current?.(self.progress, self)
        },
        onEnter: handleEnter,
        onEnterBack: handleEnter,
        onLeave: handleLeave,
        onLeaveBack: handleLeave,
      })
    }, element)

    return () => {
      trigger?.kill()
      context.revert()
    }
  }, [elementRef, start, end, scrub, pin, onProgressRef, onEnterRef, onLeaveRef])

  return state
}
