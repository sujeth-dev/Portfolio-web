import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Robot from '../components/robot/Robot'
import ScrollReveal from '../components/common/ScrollReveal'
import ProjectOverlay from '../components/project/ProjectOverlay'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Products' },
  { key: 'secondary', label: 'Client' },
  { key: 'other', label: 'Other' },
]

export default function Work() {
  const [active, setActive] = useState('all')
  const [overlayProject, setOverlayProject] = useState(null)

  const filtered =
    active === 'all' ? projects : projects.filter((p) => p.tier === active)

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

        <div className="projects-grid">
          {filtered.map((p, i) => {
            const isFeatured = p.tier === 'featured'

            if (isFeatured) {
              return (
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
                      <Robot pose="inspect" size={18} />
                    </div>
                  </div>
                </ScrollReveal>
              )
            }

            const href = p.url || p.sourceUrl
            const Tag = href ? 'a' : 'div'
            const wrapperProps = href
              ? { href, target: '_blank', rel: 'noopener noreferrer' }
              : {}

            return (
              <ScrollReveal key={p.slug} delay={i * 60}>
                <Tag {...wrapperProps} className={p.tier === 'other' ? 'other-card' : 'mini-card'} style={p.tier === 'secondary' ? { display: 'flex', flexDirection: 'column' } : undefined}>
                  <div className={p.tier === 'other' ? 'other-card-name' : 'mini-card-name'}>
                    {p.name}
                    <span className={`badge badge-${p.status}`} style={{ marginLeft: 8, verticalAlign: 'middle' }}>
                      {p.statusLabel}
                    </span>
                  </div>
                  <div className={p.tier === 'other' ? 'other-card-desc' : 'mini-card-desc'}>{p.tease}</div>
                  <div className={p.tier === 'other' ? 'other-card-stack' : 'mini-card-stack'}>{p.stack.join(' · ')}</div>
                  {href && (
                    <span className={p.tier === 'other' ? 'other-card-link' : 'mini-card-link'}>
                      {p.url ? `${p.urlLabel || 'Visit'} ↗` : 'Source Code ↗'}
                    </span>
                  )}
                </Tag>
              </ScrollReveal>
            )
          })}
        </div>
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
