import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useInteraction } from '../../systems/InteractionContext'
import '../../styles/cursor-companion.css'

const LERP = 0.15

export default function CursorCompanion() {
  const { reducedMotion, isMobile } = useInteraction()
  const elementRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const current = useRef({ x: 0, y: 0 })
  const [label, setLabel] = useState(null)

  const disabled = reducedMotion || isMobile

  useEffect(() => {
    if (disabled) return undefined

    const handleMouseMove = (event) => {
      target.current = { x: event.clientX, y: event.clientY }
    }

    const handleEnter = (event) => {
      const cursor = event.target?.dataset?.cursor
      if (cursor) setLabel(cursor)
    }

    const handleLeave = (event) => {
      const cursor = event.target?.dataset?.cursor
      if (cursor) setLabel(null)
    }

    const tick = () => {
      const element = elementRef.current
      if (!element) return
      current.current.x += (target.current.x - current.current.x) * LERP
      current.current.y += (target.current.y - current.current.y) * LERP
      gsap.set(element, { x: current.current.x, y: current.current.y })
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    document.addEventListener('mouseenter', handleEnter, true)
    document.addEventListener('mouseleave', handleLeave, true)
    gsap.ticker.add(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleEnter, true)
      document.removeEventListener('mouseleave', handleLeave, true)
      gsap.ticker.remove(tick)
    }
  }, [disabled])

  useEffect(() => {
    if (disabled) setLabel(null)
  }, [disabled])

  if (disabled) return null

  return (
    <div
      ref={elementRef}
      className="cursor-companion"
      data-visible={label ? 'true' : 'false'}
      aria-hidden="true"
    >
      <span className="cursor-companion__pill">{label}</span>
    </div>
  )
}
