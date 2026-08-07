import { labProjects } from '../data/projects'
import Robot from '../components/robot/Robot'
import ScrollReveal from '../components/common/ScrollReveal'

export default function Lab() {
  return (
    <section className="section">
      <div className="container">
        <ScrollReveal>
          <span className="section-label">Lab</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
            <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)' }}>Experiments</h1>
            <Robot pose="goggles" size={40} />
          </div>
          <p style={{ color: 'var(--muted)', marginBottom: 40, maxWidth: 500 }}>
            Side projects, prototypes, and things built for the joy of building.
          </p>
        </ScrollReveal>

        <div className="lab-grid">
          {labProjects.map((p, i) => (
            <ScrollReveal key={p.slug} delay={i * 100}>
              <div className="lab-cartridge">
                <div className={`lab-cartridge-stripe ${p.color}`} />
                <div className="lab-cartridge-name">{p.name}</div>
                <p className="lab-cartridge-desc">{p.tagline}</p>
                <div className="project-card-stack">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">{s}</span>
                  ))}
                </div>
                {p.url && (
                  <a
                    href={p.url}
                    className="mini-card-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ marginTop: 12, display: 'inline-block' }}
                  >
                    View ↗
                  </a>
                )}
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
