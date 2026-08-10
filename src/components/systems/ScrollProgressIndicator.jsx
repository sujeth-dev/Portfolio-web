import { useInteraction } from '../../systems/InteractionContext'
import '../../styles/scroll-indicator.css'

export default function ScrollProgressIndicator() {
  const { scrollProgress, reducedMotion, isMobile } = useInteraction()

  const disabled = reducedMotion || isMobile
  if (disabled) return null

  const progressPercent = Math.round(scrollProgress * 100)

  return (
    <div className="scroll-indicator">
      <div
        className="scroll-indicator__track"
        role="progressbar"
        aria-label="Page scroll progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={progressPercent}
      >
        <div className="scroll-indicator__fill" style={{ height: `${progressPercent}%` }} />
      </div>
    </div>
  )
}
