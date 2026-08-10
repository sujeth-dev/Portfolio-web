import { useLayoutEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ScrollReveal from '../components/common/ScrollReveal'
import ArchDiagram from '../components/project/ArchDiagram'
import ProjectNav from '../components/project/ProjectNav'
import ProjectStage from '../components/project/ProjectStage'
import VelocityEffects from '../components/systems/VelocityEffects'
import { projects, getBySlug } from '../data/projects'
import { useScrollEngine } from '../hooks/useScrollEngine'

function ProjectScene({ project, prev, next }) {
  const sceneRef = useRef(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [project.slug])

  const { progress } = useScrollEngine(sceneRef, {
    start: 'top 44px',
    end: 'bottom bottom',
    scrub: true,
  })
  const accent = project.visual?.accent || 'var(--red)'

  return (
    <section
      ref={sceneRef}
      className="project-scene"
      style={{ '--project-accent': accent }}
      aria-labelledby="project-title"
    >
      <div className="container project-scene__grid">
          <VelocityEffects
            className="project-scroll-content"
            effects={['skew', 'stretch', 'lag']}
          >
          <article>
            <header className="project-hero">
              <ScrollReveal>
                <p className="project-scene__eyebrow silkscreen">Case study</p>
                <h1 id="project-title" className="project-name">{project.name}</h1>
                <p className="project-tagline">{project.tagline}</p>
                <div className="project-meta-row">
                  <span className={`badge badge-${project.status}`}>{project.statusLabel}</span>
                  <span className="project-meta-item">{project.role}</span>
                  <span className="project-meta-item">{project.year}</span>
                  {project.url && (
                    <a
                      href={project.url}
                      className="project-meta-item project-meta-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.urlLabel} ↗
                    </a>
                  )}
                </div>
                <div className="project-stack-row">
                  {project.stack.map((item) => (
                    <span key={item} className="tag">{item}</span>
                  ))}
                </div>
                {(project.url || project.sourceUrl) && (
                  <div className="project-links-row">
                    {project.url && (
                      <a href={project.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                        Live Site ↗
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a href={project.sourceUrl} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">
                        Source Code ↗
                      </a>
                    )}
                  </div>
                )}
              </ScrollReveal>
            </header>

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

          <div className="project-stage-container">
            <ProjectStage project={project} scrollProgress={progress} />
          </div>

          <div className="project-scene__nav">
            <ScrollReveal>
              <ProjectNav prev={prev} next={next} />
            </ScrollReveal>
          </div>
      </div>
    </section>
  )
}

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getBySlug(slug)

  if (!project || project.tier !== 'featured') {
    return <Navigate to="/work" replace />
  }

  const featuredProjects = projects.filter((item) => item.tier === 'featured')
  const currentFeaturedIndex = featuredProjects.findIndex((item) => item.slug === slug)
  const prev = featuredProjects[currentFeaturedIndex - 1]
  const next = featuredProjects[currentFeaturedIndex + 1]

  return <ProjectScene key={project.slug} project={project} prev={prev} next={next} />
}
