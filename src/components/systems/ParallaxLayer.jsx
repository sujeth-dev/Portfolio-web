import { useRef } from 'react'
import { useParallax } from '../../hooks/useParallax'

const LAYER_Z_INDEX = {
  1: 'var(--z-bg)',
  2: 'var(--z-env)',
  3: 'var(--z-fg)',
}

export function ParallaxLayer({ layer = 1, mobileScale = 0, className = '', style, children }) {
  const ref = useRef(null)
  useParallax(ref, { layer, mobileScale })

  return (
    <div
      ref={ref}
      className={`parallax-layer ${className}`.trim()}
      style={{ zIndex: LAYER_Z_INDEX[layer] ?? LAYER_Z_INDEX[1], ...style }}
    >
      {children}
    </div>
  )
}
