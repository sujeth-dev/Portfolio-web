import { meta } from '../data/meta'
import { skillGroups } from '../data/skills'
import PixelRobot from '../components/common/PixelRobot'
import ScrollReveal from '../components/common/ScrollReveal'

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="about-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(32px, 4vw, 64px)', alignItems: 'start' }}>
          <div className="about-content">
            <ScrollReveal>
              <span className="section-label">About</span>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}>
                The person behind the projects
              </h1>
            </ScrollReveal>

            <ScrollReveal delay={100}>
              <p>
                I'm a software engineering student in Bengaluru who ships production systems end to end.
                Not prototypes, not demos — real products that handle real money, real users, and real failure modes.
              </p>
              <p>
                What I care about most is the gap between "works on my machine" and "works in production."
                That gap is where the interesting engineering lives — idempotent webhooks, zero-downtime migrations,
                permission scoping, race condition guards. The things that separate a school project from a real system.
              </p>
              <p>
                I think about software the way an engineer thinks about infrastructure: reliability first,
                then performance, then elegance. Code that nobody notices because it just works is the best code.
              </p>
              <p>
                When I'm not building, I'm usually reading about system design patterns, exploring AI/ML tooling,
                or walking into local businesses in Bangalore trying to understand their problems well enough to build solutions.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={200}>
              <h2 style={{ fontSize: 20, marginTop: 40, marginBottom: 16 }}>Education</h2>
              <div className="exp-item" style={{ marginBottom: 32 }}>
                <div className="exp-meta">
                  <div className="exp-role">B.E. Computer Science</div>
                  <div className="exp-org">University Visvesvaraya College of Engineering (UVCE)</div>
                  <div className="exp-period">Bengaluru · 2022 – 2026</div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={300}>
              <h2 style={{ fontSize: 20, marginTop: 24, marginBottom: 16 }}>Let's connect</h2>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                <a href={`mailto:${meta.email}`} className="btn btn-primary">Email</a>
                <a href={meta.linkedin} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                <a href={meta.github} className="btn btn-secondary" target="_blank" rel="noopener noreferrer">GitHub</a>
                <a href={meta.resumePath} className="btn btn-ghost" target="_blank" rel="noopener noreferrer">Resume</a>
              </div>
            </ScrollReveal>
          </div>

          {/* Developer Card */}
          <ScrollReveal delay={200}>
            <div className="dev-card" style={{ position: 'sticky', top: 80 }}>
              <div style={{ textAlign: 'center', marginBottom: 16 }}>
                <PixelRobot size={40} />
              </div>
              <div className="dev-card-header">
                <div>
                  <div className="dev-card-name">{meta.name}</div>
                  <div className="dev-card-title">{meta.title}</div>
                </div>
                <div className="starburst">
                  <span style={{ fontSize: 7, lineHeight: 1, textAlign: 'center' }}>2026</span>
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--faint)', marginTop: 8 }}>
                {meta.location}
              </div>
              <div className="dev-card-stats">
                {[
                  { label: 'Frontend', pct: 90 },
                  { label: 'Backend', pct: 85 },
                  { label: 'Systems', pct: 75 },
                  { label: 'Design', pct: 60 },
                ].map((s) => (
                  <div className="dev-card-stat" key={s.label}>
                    <span className="dev-card-stat-label" style={{ width: 70 }}>{s.label}</span>
                    <div className="dev-card-stat-bar">
                      <div className="dev-card-stat-fill" style={{ width: `${s.pct}%` }} />
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, width: 30 }}>
                      {s.pct}%
                    </span>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                {skillGroups.flatMap((g) => g.items).slice(0, 8).map((s) => (
                  <span key={s} className="tag" style={{ fontSize: 9 }}>{s}</span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
