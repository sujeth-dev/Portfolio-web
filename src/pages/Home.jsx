import { useState } from 'react'
import { Link } from 'react-router-dom'
import { meta } from '../data/meta'
import { getFeatured, getSecondary, getOther } from '../data/projects'
import { experiences } from '../data/experience'
import { skillGroups } from '../data/skills'
import { now } from '../data/now'
import PixelRobot from '../components/common/PixelRobot'
import AnimatedPixelRobot from '../components/common/AnimatedPixelRobot'
import ScrollReveal from '../components/common/ScrollReveal'
import VelocityEffects from '../components/systems/VelocityEffects'
import { SectionBackground } from '../components/systems/SectionBackground'
import { useAccordionRefresh } from '../hooks/useAccordionRefresh'

const featured = getFeatured()
const secondary = getSecondary()
const other = getOther()

export default function Home() {
  const [experienceExpanded, setExperienceExpanded] = useState(false)
  useAccordionRefresh(experienceExpanded)

  return (
    <>
      {/* ── Hero ── */}
      <section className="hero interaction-layer">
        <SectionBackground theme="open" />
        <div className="container">
          <div className="hero-grid">
            <ScrollReveal>
              <div className="hero-title">{meta.subtitle}</div>
            </ScrollReveal>
            <ScrollReveal delay={150}>
              <h1 className="hero-name-wrap">
                <span className="sr-only">{meta.name}</span>
                <AnimatedPixelRobot />
              </h1>
            </ScrollReveal>
            <ScrollReveal delay={300}>
              <p className="hero-desc">{meta.summary}</p>
            </ScrollReveal>
            <ScrollReveal delay={450}>
              <div className="hero-actions">
                <Link to="/work" className="btn btn-primary">View Work</Link>
                <a href={`mailto:${meta.email}`} className="btn btn-secondary">Get in Touch</a>
              </div>
              <div className="ticker">
                <span className="led led-on" />
                <span>currently building: {now.building[0]}</span>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* ── Zigzag ── */}
      <div className="zigzag" />

      {/* ── Selected Work ── */}
      <section className="section interaction-layer" id="work">
        <SectionBackground theme="technical" />
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Selected Work</span>
            <h2 style={{ fontSize: 'clamp(28px, 3vw, 40px)', marginBottom: 32 }}>
              Things I've built
            </h2>
          </ScrollReveal>

          <div className="projects-grid">
            {featured.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 100}>
                <Link to={`/work/${p.slug}`} className="project-card">
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
                    <span className="project-card-cta">Explore →</span>
                    <PixelRobot size={16} />
                  </div>
                </Link>
              </ScrollReveal>
            ))}
          </div>

          {/* Secondary projects */}
          <div className="secondary-grid">
            {secondary.map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 100}>
                <a
                  href={p.url || p.sourceUrl || '#'}
                  className="mini-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mini-card-name">
                    {p.name}
                    <span className={`badge badge-${p.status}`} style={{ marginLeft: 8, verticalAlign: 'middle' }}>
                      {p.statusLabel}
                    </span>
                  </div>
                  <div className="mini-card-desc">{p.tease}</div>
                  <div className="mini-card-stack">{p.stack.join(' · ')}</div>
                  {p.url && <span className="mini-card-link">{p.urlLabel} ↗</span>}
                </a>
              </ScrollReveal>
            ))}
            {other.slice(0, 3).map((p, i) => (
              <ScrollReveal key={p.slug} delay={i * 100}>
                <a
                  href={p.url || p.sourceUrl || '#'}
                  className="mini-card"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="mini-card-name">{p.name}</div>
                  <div className="mini-card-desc">{p.tease}</div>
                  <div className="mini-card-stack">{p.stack.join(' · ')}</div>
                  {p.url && <span className="mini-card-link">{p.urlLabel} ↗</span>}
                </a>
              </ScrollReveal>
            ))}
          </div>

          <ScrollReveal>
            <div style={{ textAlign: 'center', marginTop: 40 }}>
              <Link to="/work" className="btn btn-ghost">View All Work →</Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Skills Toolbox ── */}
      <section className="section interaction-layer" style={{ background: 'var(--cream)' }}>
        <SectionBackground theme="technical" intensity={0.35} />
        <div className="container">
          <ScrollReveal>
            <span className="section-label" style={{ background: 'var(--cream)' }}>Toolbox</span>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', marginBottom: 32 }}>
              What I build with
            </h2>
          </ScrollReveal>
          <div className="skills-grid">
            {skillGroups.map((g, i) => (
              <ScrollReveal key={g.label} delay={i * 80}>
                <VelocityEffects effects={['lag']}>
                  <div className="skill-group">
                    <div className="skill-group-label">{g.label}</div>
                    <div className="skill-group-items">
                      {g.items.map((s) => (
                        <span key={s} className="tag">{s}</span>
                      ))}
                    </div>
                  </div>
                </VelocityEffects>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Experience ── */}
      <section className="section" id="experience">
        <div className="container">
          <ScrollReveal>
            <span className="section-label">Experience</span>
            <h2 style={{ fontSize: 'clamp(24px, 2.5vw, 32px)', marginBottom: 20 }}>
              Where I've worked
            </h2>
          </ScrollReveal>
          <button
            type="button"
            className="accordion-toggle"
            onClick={() => setExperienceExpanded((value) => !value)}
            aria-expanded={experienceExpanded}
            aria-controls="experience-list"
          >
            {experienceExpanded ? 'Hide experience' : `View experience (${experiences.length})`}
          </button>
          <div
            id="experience-list"
            className="accordion-panel"
            data-expanded={experienceExpanded}
            role="region"
            aria-label="Work experience timeline"
          >
            <div className="accordion-panel__inner">
              <div className="exp-list">
                {experiences.map((e, i) => (
                  <ScrollReveal key={i} delay={i * 100}>
                    <div className="exp-item">
                      <div className="exp-meta">
                        <div className="exp-role">{e.role}</div>
                        <div className="exp-org">{e.org}</div>
                        <div className="exp-period">{e.period}</div>
                        <div style={{ marginTop: 8 }}>
                          <span className="stamp">{e.type === 'formal' ? 'Role' : 'Venture'}</span>
                        </div>
                      </div>
                      <div>
                        <ul className="exp-bullets">
                          {e.bullets.map((b, j) => (
                            <li key={j}>{b}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Currently ── */}
      <section className="section" style={{ background: 'var(--cream)' }}>
        <div className="container">
          <ScrollReveal>
            <span className="section-label silkscreen" style={{ background: 'var(--cream)' }}>
              CURRENTLY.EXE
            </span>
          </ScrollReveal>
          <ScrollReveal delay={100}>
            <div className="currently-grid">
              <div className="currently-item">
                <div className="currently-label">Building</div>
                <ul className="currently-list">
                  {now.building.map((item, i) => <li key={i}>▸ {item}</li>)}
                </ul>
              </div>
              <div className="currently-item">
                <div className="currently-label">Exploring</div>
                <ul className="currently-list">
                  {now.exploring.map((item, i) => <li key={i}>▸ {item}</li>)}
                </ul>
              </div>
              <div className="currently-item">
                <div className="currently-label">Learning</div>
                <ul className="currently-list">
                  {now.learning.map((item, i) => <li key={i}>▸ {item}</li>)}
                </ul>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="section-dark interaction-layer">
        <SectionBackground theme="signal" />
        <div className="zigzag zigzag-dark" aria-hidden="true" />
        <div className="container">
          <div className="contact-section">
            <ScrollReveal>
              <PixelRobot size={40} />
              <h2 className="contact-heading" style={{ marginTop: 16 }}>Let's build something</h2>
              <p className="contact-desc">
                I'm always interested in new projects, collaborations, and opportunities.
              </p>
              <div className="contact-actions">
                <a href={`mailto:${meta.email}`} className="btn btn-primary">
                  Say Hello
                </a>
                <a
                  href={meta.linkedin}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LinkedIn
                </a>
                <a
                  href={meta.github}
                  className="btn btn-secondary"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  GitHub
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </>
  )
}
