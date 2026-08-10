import { useEffect, useState } from 'react'
import { useInteraction } from '../../systems/InteractionContext'
import '../../styles/scroll-indicator.css'

function getSectionMarks() {
  const sections = [...document.querySelectorAll('[data-section], main section')]
  const docHeight = Math.max(document.documentElement.scrollHeight - window.innerHeight, 1)

  return sections.map((section, index) => {
    // Must match InteractionProvider's own currentSection resolution exactly
    // (dataset.section || id || first class || 'section') so LED highlighting
    // actually lines up with the section useInteraction() reports as active.
    const id = section.dataset.section || section.id || section.classList[0] || 'section'
    const top = section.getBoundingClientRect().top + window.scrollY
    return { key: `${id}-${index}`, id, position: Math.min(Math.max(top / docHeight, 0), 1) }
  })
}

export default function ScrollProgressIndicator() {
  const { scrollProgress, currentSection, reducedMotion, isMobile } = useInteraction()
  const [marks, setMarks] = useState([])

  const disabled = reducedMotion || isMobile

  useEffect(() => {
    if (disabled) return undefined

    const updateMarks = () => setMarks(getSectionMarks())
    updateMarks()

    window.addEventListener('resize', updateMarks)
    return () => window.removeEventListener('resize', updateMarks)
  }, [disabled])

  if (disabled) return null

  const progressPercent = Math.round(scrollProgress * 100)

  return (
    <div className="scroll-indicator">
      <div className="scroll-indicator__leds">
        {marks.map((mark) => (
          <span
            key={mark.key}
            className="scroll-indicator__led"
            style={{ top: `${mark.position * 100}%` }}
            data-active={mark.id === currentSection ? 'true' : 'false'}
          />
        ))}
      </div>
      <div
        className="scroll-indicator__track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
      >
        {marks.map((mark) => (
          <span
            key={mark.key}
            className="scroll-indicator__notch"
            style={{ top: `${mark.position * 100}%` }}
          />
        ))}
        <div className="scroll-indicator__fill" style={{ height: `${progressPercent}%` }} />
      </div>
    </div>
  )
}
