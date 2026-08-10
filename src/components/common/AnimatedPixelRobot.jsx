import { useEffect, useRef, useState } from 'react'
import { useInteraction } from '../../systems/InteractionContext'
import { cn } from '../../utils/cn'
import '../../styles/animated-pixel-robot.css'

const AFK_MS = 45000
const EXPRESSIONS = ['happy', 'surprised', 'wink', 'dizzy']
const EXPRESSION_MS = 1800

export default function AnimatedPixelRobot({ size } = {}) {
  const dimensionProps = size ? { width: size, height: size } : {}
  const { reducedMotion, isMobile } = useInteraction()
  const [isAsleep, setIsAsleep] = useState(false)
  const [expression, setExpression] = useState(null)
  const afkTimer = useRef(null)
  const expressionTimer = useRef(null)

  useEffect(() => {
    if (reducedMotion || isMobile) return undefined

    const wake = () => {
      setIsAsleep(false)
      clearTimeout(afkTimer.current)
      afkTimer.current = setTimeout(() => setIsAsleep(true), AFK_MS)
    }

    wake()
    window.addEventListener('mousemove', wake)
    window.addEventListener('scroll', wake, { passive: true })

    return () => {
      window.removeEventListener('mousemove', wake)
      window.removeEventListener('scroll', wake)
      clearTimeout(afkTimer.current)
    }
  }, [reducedMotion, isMobile])

  useEffect(() => () => clearTimeout(expressionTimer.current), [])

  const cycleExpression = () => {
    setExpression((current) => {
      const index = current ? EXPRESSIONS.indexOf(current) : -1
      return EXPRESSIONS[(index + 1) % EXPRESSIONS.length]
    })
    clearTimeout(expressionTimer.current)
    expressionTimer.current = setTimeout(() => setExpression(null), EXPRESSION_MS)
  }

  return (
    <svg
      {...dimensionProps}
      viewBox="0 0 9 9"
      shapeRendering="crispEdges"
      className={cn('animated-pixel-robot', isAsleep && 'is-asleep', expression && `is-${expression}`)}
      role="img"
      aria-label="Pixel robot mascot"
      onClick={cycleExpression}
    >
      <g className="animated-pixel-robot__body">
        <rect x="2" y="1" width="5" height="1" fill="#E2402D" />
        <rect x="1" y="2" width="7" height="4" fill="#E2402D" />
        <g className="animated-pixel-robot__eye-look">
          <rect x="3" y="3" width="1" height="1" fill="#F5EEDC" className="animated-pixel-robot__eye" />
        </g>
        <g className="animated-pixel-robot__eye-look animated-pixel-robot__eye-look--right">
          <rect x="5" y="3" width="1" height="1" fill="#F5EEDC" className="animated-pixel-robot__eye animated-pixel-robot__eye--right" />
        </g>
        <rect x="2" y="6" width="5" height="2" fill="#221E1C" />
      </g>
      {isAsleep && (
        <>
          <text x="6.6" y="0.6" className="animated-pixel-robot__zzz animated-pixel-robot__zzz--1">z</text>
          <text x="7.6" y="-0.4" className="animated-pixel-robot__zzz animated-pixel-robot__zzz--2">z</text>
        </>
      )}
    </svg>
  )
}
