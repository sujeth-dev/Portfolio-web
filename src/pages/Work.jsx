import { useState } from 'react'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import Robot from '../components/robot/Robot'
import ScrollReveal from '../components/common/ScrollReveal'

const filters = [
  { key: 'all', label: 'All' },
  { key: 'featured', label: 'Products' },
  { key: 'secondary', label: 'Client' },
  { key: 'other', label: 'Other' },
]

export default function Work() {
  const [active, setActive] = useState('all')

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
            const hasPage = p.tier === 'featured'
            const Wrapper = hasPage ? Link : 'a'
            const wrapperProps = hasPage
              ? { to: `/work/${p.slug}` }
              : {
                  href: p.url || p.sourceUrl || '#',
                  target: '_blank',
                  rel: 'noopener noreferrer',
                }

            return (
              <ScrollReveal key={p.slug} delay={i * 60}>
                <Wrapper {...wrapperProps} className="project-card">
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
                    <span className="project-card-cta">
                      {hasPage ? 'Case Study →' : (p.url ? 'Visit ↗' : 'Code ↗')}
                    </span>
                    <Robot pose="inspect" size={18} />
                  </div>
                </Wrapper>
              </ScrollReveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
