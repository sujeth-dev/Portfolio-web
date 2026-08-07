import { labProjects } from '../data/projects'
import PixelRobot from '../components/common/PixelRobot'
import ScrollReveal from '../components/common/ScrollReveal'

export default function Lab() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Lab</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Experiments</h1>
            <PixelRobot size={32} />
          </div>
          <p className="lab-intro">
            Side projects, prototypes, and things built for the joy of building.
            Some are live, some are perpetual works-in-progress, all taught me something.
          </p>
        </ScrollReveal>

        <div className="lab-grid">
          {labProjects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 100}>
              <div className="lab-cartridge" style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                <div className={`lab-cartridge-stripe ${p.color}`} />
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginTop: 8 }}>
                  <div className="lab-cartridge-name">{p.name}</div>
                  <span className={`lab-cartridge-status ${p.status.toLowerCase()}`}>
                    {p.status}
                  </span>
                </div>
                <p className="lab-cartridge-desc">{p.tagline}</p>
                <div className="project-card-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                {p.description && (
                  <p className="lab-cartridge-detail">{p.description}</p>
                )}
                <div className="lab-cartridge-links">
                  {p.url && (
                    <a
                      href={p.url}
                      className="mini-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.url.includes('github.com') ? 'Source ↗' : 'View ↗'}
                    </a>
                  )}
                  {p.sourceUrl && (
                    <a
                      href={p.sourceUrl}
                      className="mini-card-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: 'var(--cobalt)' }}
                    >
                      Source ↗
                    </a>
                  )}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
