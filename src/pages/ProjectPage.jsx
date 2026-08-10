import { useLayoutEffect, useRef } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import ScrollReveal from '../components/common/ScrollReveal'
import CaseStudyPanel from '../components/project/CaseStudyPanel'
import ProjectNav from '../components/project/ProjectNav'
import ProjectStage from '../components/project/ProjectStage'
import { SectionBackground } from '../components/systems/SectionBackground'
import { projects, getBySlug } from '../data/projects'
import { useScrollEngine } from '../hooks/useScrollEngine'

function ProjectScene({ project, prev, next }) {
  const sceneRef = useRef(null)
  const trackRef = useRef(null)

  useLayoutEffect(() => {
    window.scrollTo(0, 0)
  }, [project.slug])

  // Scroll engine tracks the dedicated stage track, not the whole section —
  // its length must stay constant regardless of whether the case-study
  // accordion below is open or closed, so the stage's 5-state scrub never
  // desyncs when the page's total height changes.
  const { progress } = useScrollEngine(trackRef, {
    start: 'top 44px',
    end: 'bottom bottom',
    scrub: true,
  })
  const accent = project.visual?.accent || 'var(--red)'

  return (
    <section
      ref={sceneRef}
      className="project-scene interaction-layer"
      style={{ '--project-accent': accent }}
      aria-labelledby="project-title"
    >
      <SectionBackground theme="technical" />
      <div className="container project-scene__grid">
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

        <div className="project-stage-container" ref={trackRef}>
          <ProjectStage project={project} scrollProgress={progress} />
        </div>

        <CaseStudyPanel project={project} />

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
