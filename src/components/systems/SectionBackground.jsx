import { useRef } from 'react'
import { useInteraction } from '../../systems/InteractionContext'
import { useSectionProgress } from '../../hooks/useSectionProgress'
import { ParallaxLayer } from './ParallaxLayer'
import '../../styles/section-backgrounds.css'

const FADE_BAND = 0.15

function crossfadeOpacity(progress, isInView) {
  if (!isInView) return 0
  if (progress < FADE_BAND) return progress / FADE_BAND
  if (progress > 1 - FADE_BAND) return (1 - progress) / FADE_BAND
  return 1
}

export function SectionBackground({ theme, intensity = 1, className = '' }) {
  const { reducedMotion, isMobile } = useInteraction()
  const sectionRef = useRef(null)
  const { progress, isInView } = useSectionProgress(sectionRef)

  const opacity =
    (isMobile ? 0 : reducedMotion ? 1 : crossfadeOpacity(progress, isInView)) * intensity

  return (
    <div
      ref={sectionRef}
      className={`section-background ${isMobile ? '' : `bg-${theme}`} ${className}`.trim()}
      style={{ opacity }}
      aria-hidden="true"
    >
      {!isMobile && <ParallaxLayer layer={1} className="section-background__pattern" />}
    </div>
  )
}
