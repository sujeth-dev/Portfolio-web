import { useEffect, useRef, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ScrollReveal from '../common/ScrollReveal'
import ArchDiagram from './ArchDiagram'
import VelocityEffects from '../systems/VelocityEffects'
import { useInteraction } from '../../systems/InteractionContext'

export default function CaseStudyPanel({ project }) {
  const [expanded, setExpanded] = useState(false)
  const { reducedMotion } = useInteraction()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return undefined
    }

    // Toggling changes the height of everything below this panel (ProjectNav,
    // any mobile useSectionProgress triggers) — ScrollTrigger only recomputes
    // on an explicit refresh, not on a CSS-transition-driven height change.
    const delay = reducedMotion ? 0 : 340
    const timer = setTimeout(() => ScrollTrigger.refresh(), delay)
    return () => clearTimeout(timer)
  }, [expanded, reducedMotion])

  return (
    <div className="project-case-study">
      <button
        type="button"
        className="case-study-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls="case-study-panel"
      >
        {expanded ? 'Hide full case study' : 'Read the full case study'}
      </button>

      <div
        id="case-study-panel"
        className="case-study-panel"
        data-expanded={expanded}
        role="region"
        aria-label={`${project.name} full case study`}
      >
        <div className="case-study-panel__inner">
          <VelocityEffects effects={['skew', 'stretch', 'lag']}>
            <article>
              <div className="zigzag project-scene__divider" aria-hidden="true" />

              <div className="project-content">
                {project.problem && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">The Problem</h2>
                      <p className="project-section-text">{project.problem}</p>
                    </section>
                  </ScrollReveal>
                )}

                {project.solution && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">What I Built</h2>
                      <p className="project-section-text">{project.solution}</p>
                    </section>
                  </ScrollReveal>
                )}

                {project.highlights && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">Engineering Highlights</h2>
                      <ul className="project-highlights">
                        {project.highlights.map((highlight) => (
                          <li key={highlight}>{highlight}</li>
                        ))}
                      </ul>
                    </section>
                  </ScrollReveal>
                )}

                {project.architecture && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">Architecture</h2>
                      <ArchDiagram id={project.architecture.svg} />
                      {project.architecture.caption && (
                        <p className="arch-caption">{project.architecture.caption}</p>
                      )}
                    </section>
                  </ScrollReveal>
                )}

                {project.decisions && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">Decisions &amp; Trade-offs</h2>
                      <p className="project-section-text">{project.decisions}</p>
                    </section>
                  </ScrollReveal>
                )}

                {project.result && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">Result</h2>
                      <p className="project-section-text">{project.result}</p>
                    </section>
                  </ScrollReveal>
                )}

                {project.reflection && (
                  <ScrollReveal>
                    <section className="project-section">
                      <h2 className="project-section-label">Reflection</h2>
                      <p className="project-section-text">{project.reflection}</p>
                    </section>
                  </ScrollReveal>
                )}
              </div>
            </article>
          </VelocityEffects>
        </div>
      </div>
    </div>
  )
}
