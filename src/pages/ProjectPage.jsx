import { useParams, Link, Navigate } from 'react-router-dom'
import { getBySlug, projects } from '../data/projects'
import ScrollReveal from '../components/common/ScrollReveal'
import ArchDiagram from '../components/project/ArchDiagram'

export default function ProjectPage() {
  const { slug } = useParams()
  const project = getBySlug(slug)

  if (!project || project.tier !== 'featured') {
    return <Navigate to="/work" replace />
  }

  const idx = projects.findIndex((p) => p.slug === slug)
  const featuredProjects = projects.filter((p) => p.tier === 'featured')
  const currentFeaturedIdx = featuredProjects.findIndex((p) => p.slug === slug)
  const prev = featuredProjects[currentFeaturedIdx - 1]
  const next = featuredProjects[currentFeaturedIdx + 1]

  return (
    <>
      <section className="project-hero">
        <div className="container">
          <ScrollReveal>
            <Link to="/work" className="project-back">← Back to Work</Link>
            <h1 className="project-name">{project.name}</h1>
            <p className="project-tagline">{project.tagline}</p>
            <div className="project-meta-row">
              <span className={`badge badge-${project.status}`}>{project.statusLabel}</span>
              <span className="project-meta-item">{project.role}</span>
              <span className="project-meta-item">{project.year}</span>
              {project.url && (
                <a
                  href={project.url}
                  className="project-meta-item"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--red)' }}
                >
                  {project.urlLabel} ↗
                </a>
              )}
            </div>
            <div className="project-stack-row">
              {project.stack.map((s) => (
                <span key={s} className="tag">{s}</span>
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
        </div>
      </section>

      <div className="zigzag" />

      <section className="project-content">
        <div className="container">
          {project.problem && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">The Problem</div>
                <p className="project-section-text">{project.problem}</p>
              </div>
            </ScrollReveal>
          )}

          {project.solution && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">What I Built</div>
                <p className="project-section-text">{project.solution}</p>
              </div>
            </ScrollReveal>
          )}

          {project.highlights && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">Engineering Highlights</div>
                <ul className="project-highlights">
                  {project.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          )}

          {project.architecture && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">Architecture</div>
                <ArchDiagram id={project.architecture.svg} />
                {project.architecture.caption && (
                  <p className="arch-caption">{project.architecture.caption}</p>
                )}
              </div>
            </ScrollReveal>
          )}

          {project.decisions && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">Decisions & Trade-offs</div>
                <p className="project-section-text">{project.decisions}</p>
              </div>
            </ScrollReveal>
          )}

          {project.result && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">Result</div>
                <p className="project-section-text">{project.result}</p>
              </div>
            </ScrollReveal>
          )}

          {project.reflection && (
            <ScrollReveal>
              <div className="project-section">
                <div className="project-section-label">Reflection</div>
                <p className="project-section-text">{project.reflection}</p>
              </div>
            </ScrollReveal>
          )}

          {/* Project Navigation */}
          <ScrollReveal>
            <div className="project-nav">
              <div>
                {prev && (
                  <Link to={`/work/${prev.slug}`} className="project-nav-link">
                    ← {prev.name}
                  </Link>
                )}
              </div>
              <div>
                {next && (
                  <Link to={`/work/${next.slug}`} className="project-nav-link">
                    {next.name} →
                  </Link>
                )}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  )
}
