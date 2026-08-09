import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInteraction } from '../systems/InteractionContext'

const neutralState = {
  proximity: 0,
  isNear: false,
  angle: 0,
}

const EPSILON = 0.001

function clamp(value, min = 0, max = 1) {
  return Math.min(max, Math.max(min, value))
}

export function useMouseProximity(
  elementRef,
  { radius = 200, normalize = true } = {},
) {
  const { mouseX, mouseY, reducedMotion, isMobile } = useInteraction()
  const mouse = useRef({ x: mouseX, y: mouseY })
  const [state, setState] = useState(neutralState)
  mouse.current = { x: mouseX, y: mouseY }

  useEffect(() => {
    if (reducedMotion || isMobile) {
      setState(neutralState)
      return undefined
    }

    const safeRadius = Math.max(radius, 1)

    const tick = () => {
      const element = elementRef?.current
      if (!element) return

      const rect = element.getBoundingClientRect()
      const pointerX = mouse.current.x * window.innerWidth
      const pointerY = mouse.current.y * window.innerHeight
      const deltaX = pointerX - (rect.left + rect.width / 2)
      const deltaY = pointerY - (rect.top + rect.height / 2)
      const distance = Math.hypot(deltaX, deltaY)
      const isNear = distance <= safeRadius
      const proximity = normalize ? clamp(1 - distance / safeRadius) : Number(isNear)
      const angle = Math.atan2(deltaY, deltaX)
      const next = { proximity, isNear, angle }

      setState((previous) =>
        Math.abs(previous.proximity - next.proximity) > EPSILON ||
        previous.isNear !== next.isNear ||
        Math.abs(previous.angle - next.angle) > EPSILON
          ? next
          : previous,
      )
    }

    gsap.ticker.add(tick)
    return () => gsap.ticker.remove(tick)
  }, [elementRef, radius, normalize, reducedMotion, isMobile])

  return state
}
