import { useState } from 'react'
import { getFeatured, getSecondary, getOther } from '../data/projects'
import PixelRobot from '../components/common/PixelRobot'
import ScrollReveal from '../components/common/ScrollReveal'
import ProjectOverlay from '../components/project/ProjectOverlay'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Products' },
  { key: 'secondary', label: 'Client' },
  { key: 'other', label: 'Other' },
]

const featured = getFeatured()
const secondary = getSecondary()
const other = getOther()

function MiniCard({ p }) {
  const href = p.url || p.sourceUrl
  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag {...linkProps} className="mini-card" style={{ display: 'flex', flexDirection: 'column' }}>
      <div className="mini-card-name">
        {p.name}
        <span className={`badge badge-${p.status}`} style={{ marginLeft: 8, verticalAlign: 'middle' }}>
          {p.statusLabel}
        </span>
      </div>
      <div className="mini-card-desc">{p.tease}</div>
      <div className="mini-card-stack">{p.stack.join(' · ')}</div>
      {href && (
        <span className="mini-card-link">
          {p.url ? `${p.urlLabel || 'Visit'} ↗` : 'Source Code ↗'}
        </span>
      )}
    </Tag>
  )
}

function OtherCard({ p }) {
  const href = p.url || p.sourceUrl
  const Tag = href ? 'a' : 'div'
  const linkProps = href ? { href, target: '_blank', rel: 'noopener noreferrer' } : {}
  return (
    <Tag {...linkProps} className="other-card">
      <div className="other-card-name">
        {p.name}
        <span className={`badge badge-${p.status}`} style={{ marginLeft: 8, verticalAlign: 'middle' }}>
          {p.statusLabel}
        </span>
      </div>
      <div className="other-card-desc">{p.tease}</div>
      <div className="other-card-stack">{p.stack.join(' · ')}</div>
      {href && (
        <span className="other-card-link">
          {p.url ? 'Visit ↗' : 'Code ↗'}
        </span>
      )}
    </Tag>
  )
}

export default function Work() {
  const [active, setActive] = useState('all')
  const [overlayProject, setOverlayProject] = useState(null)

  const showFeatured = active === 'all' || active === 'featured'
  const showSecondary = active === 'all' || active === 'secondary'
  const showOther = active === 'all' || active === 'other'

  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Work</span>
          <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 8 }}>
            All Projects
          </h1>
          <p style={{ color: 'var(--muted)', marginBottom: 32, maxWidth: 500 }}>
            Production platforms, client work, tools, and experiments.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="filter-tabs">
            {filters.map((f) => (
              <button
                key={f.key}
                className={`filter-tab${active === f.key ? ' active' : ''}`}
                onClick={() => setActive(f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </ScrollReveal>

        {/* Featured Projects */}
        {showFeatured && featured.length > 0 && (
          <>
            {active === 'all' && (
              <ScrollReveal>
                <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 16, marginBottom: 16 }}>Products</h3>
              </ScrollReveal>
            )}
            <div className="projects-grid">
              {featured.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 60}>
                  <div
                    className="project-card"
                    onClick={() => setOverlayProject(p)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === 'Enter') setOverlayProject(p) }}
                  >
                    <div className="project-card-accent" style={{ background: p.visual?.accent || 'var(--red)' }} />
                    <div className="project-card-header">
                      <div>
                        <div className="project-card-category">{p.category}</div>
                        <div className="project-card-name">{p.name}</div>
                      </div>
                      <span className={`badge badge-${p.status}`}>{p.statusLabel}</span>
                    </div>
                    <p className="project-card-tease">{p.tease}</p>
                    <div className="project-card-stack">
                      {p.stack.slice(0, 4).map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                    <div className="project-card-footer">
                      <span className="project-card-cta">Open Case Study →</span>
                      <PixelRobot size={14} />
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {/* Secondary / Client Projects */}
        {showSecondary && secondary.length > 0 && (
          <>
            <ScrollReveal>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>Client Work</h3>
              <p style={{ color: 'var(--muted)', fontSize: 14, marginBottom: 20 }}>
                Shipped for real businesses — live and earning.
              </p>
            </ScrollReveal>
            <div className="secondary-grid">
              {secondary.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}>
                  <MiniCard p={p} />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}

        {/* Other Projects */}
        {showOther && other.length > 0 && (
          <>
            <ScrollReveal>
              <h3 style={{ fontSize: 16, fontWeight: 700, marginTop: 40, marginBottom: 16, color: 'var(--muted)' }}>
                More Projects
              </h3>
            </ScrollReveal>
            <div className="other-grid">
              {other.map((p, i) => (
                <ScrollReveal key={p.slug} delay={i * 80}>
                  <OtherCard p={p} />
                </ScrollReveal>
              ))}
            </div>
          </>
        )}
      </div>

      {overlayProject && (
        <ProjectOverlay
          project={overlayProject}
          onClose={() => setOverlayProject(null)}
        />
      )}
    </section>
  )
}
