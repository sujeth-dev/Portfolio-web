import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import ArchDiagram from './ArchDiagram'

export default function ProjectOverlay({ project, onClose }) {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  if (!project) return null

  return (
    <div className="trifold-overlay active" onClick={(e) => { if (e.target === e.currentTarget) onClose() }}>
      <div className="trifold-backdrop" onClick={onClose} />
      <div className="trifold-card">
        <button className="trifold-close" onClick={onClose} aria-label="Close">✕</button>

        {/* Header */}
        <div className="trifold-header" style={{ borderTopWidth: 5, borderTopStyle: 'solid', borderTopColor: project.visual?.accent || 'var(--red)' }}>
          <div className="trifold-header-category">{project.category}</div>
          <div className="trifold-header-name">{project.name}</div>
          <div className="trifold-header-tagline">{project.tagline}</div>
          <div className="trifold-header-meta">
            <span className={`badge badge-${project.status}`}>{project.statusLabel}</span>
            <span className="project-meta-item">{project.role}</span>
            <span className="project-meta-item">{project.year}</span>
          </div>
        </div>

        {/* Trifold Body */}
        <div className="trifold-body">
          {/* Top Flap */}
          <div className="trifold-top-outer">
            <div className="trifold-top-inner">
              <div className="trifold-top">
                <div className="trifold-shade" />
                {project.lead && <p className="trifold-lead">{project.lead}</p>}
                {project.highlights && (
                  <ul className="trifold-bullets">
                    {project.highlights.map((h, i) => <li key={i}>{h}</li>)}
                  </ul>
                )}
              </div>
            </div>
          </div>

          {/* Center — Demo Shell */}
          <div className="trifold-center">
            {project.url ? (
              <div className="trifold-demo-shell">
                <div className="trifold-demo-bar">
                  <span className="trifold-demo-dot" style={{ background: '#ff5f57' }} />
                  <span className="trifold-demo-dot" style={{ background: '#febc2e' }} />
                  <span className="trifold-demo-dot" style={{ background: '#28c840' }} />
                  <span className="trifold-demo-url">{project.urlLabel}</span>
                </div>
                <div className="trifold-demo-body">
                  <a href={project.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">
                    Open Live Site ↗
                  </a>
                </div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '32px 16px', color: 'var(--faint)', fontFamily: 'var(--font-mono)', fontSize: 12 }}>
                Source code available — no live demo
              </div>
            )}
          </div>

          {/* Bottom Flap */}
          <div className="trifold-bottom-outer">
            <div className="trifold-bottom-inner">
              <div className="trifold-bottom">
                <div className="trifold-shade" />

                {project.architecture && (
                  <div style={{ padding: '20px 28px', background: 'rgba(34,28,20,0.02)' }}>
                    <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--muted)', marginBottom: 12 }}>
                      Architecture
                    </div>
                    <div className="arch-box" style={{ margin: 0 }}>
                      <ArchDiagram id={project.architecture.svg} />
                    </div>
                    {project.architecture.caption && (
                      <p className="arch-caption">{project.architecture.caption}</p>
                    )}
                  </div>
                )}

                {project.decisions && (
                  <div style={{ padding: '0 28px 16px' }}>
                    <div className="trifold-decisions">
                      <div className="trifold-decisions-label">Decisions & Trade-offs</div>
                      <p>{project.decisions}</p>
                    </div>
                  </div>
                )}

                <div className="trifold-footer">
                  <div className="trifold-chips">
                    {project.stack.map((s) => <span key={s} className="tag">{s}</span>)}
                  </div>
                  <div className="trifold-links">
                    {project.url && (
                      <a href={project.url} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: 11 }} target="_blank" rel="noopener noreferrer">
                        Live ↗
                      </a>
                    )}
                    {project.sourceUrl && (
                      <a href={project.sourceUrl} className="btn btn-secondary" style={{ padding: '8px 16px', fontSize: 11 }} target="_blank" rel="noopener noreferrer">
                        Source ↗
                      </a>
                    )}
                    <Link to={`/work/${project.slug}`} className="btn btn-ghost" style={{ padding: '8px 16px', fontSize: 11 }}>
                      Full Case Study →
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
