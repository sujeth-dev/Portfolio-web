import { useState } from 'react'
import ScrollReveal from '../common/ScrollReveal'
import ArchDiagram from './ArchDiagram'
import VelocityEffects from '../systems/VelocityEffects'
import { useAccordionRefresh } from '../../hooks/useAccordionRefresh'

export default function CaseStudyPanel({ project }) {
  const [expanded, setExpanded] = useState(false)
  useAccordionRefresh(expanded)

  return (
    <div className="project-case-study">
      <button
        type="button"
        className="accordion-toggle"
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls="case-study-panel"
      >
        {expanded ? 'Hide full case study' : 'Read the full case study'}
      </button>

      <div
        id="case-study-panel"
        className="accordion-panel"
        data-expanded={expanded}
        role="region"
        aria-label={`${project.name} full case study`}
      >
        <div className="accordion-panel__inner">
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
