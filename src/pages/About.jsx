import { meta } from '../data/meta'
import { skillGroups } from '../data/skills'
import Robot from '../components/robot/Robot'
import ScrollReveal from '../components/common/ScrollReveal'

const education = [
  {
    degree: 'B.Tech, Artificial Intelligence & Machine Learning',
    school: 'University Visvesvaraya College of Engineering (UVCE)',
    location: 'Bengaluru',
    period: 'Expected 2027',
    detail: 'CGPA 8.9 / 10',
    coursework: 'Data Structures & Algorithms, Software Engineering, DBMS, OOP, Machine Learning, Computer Networks',
  },
  {
    degree: 'Pre-University (PCMC)',
    school: 'Base PU College',
    location: 'Bengaluru',
    period: '2021 – 2023',
    detail: '92%',
  },
  {
    degree: 'Class X',
    school: 'Jaigopal Garodia Rashtrotthana Vidya Kendra',
    location: 'Bengaluru',
    period: '2021',
    detail: '94%',
  },
]

export default function About() {
  return (
    <section className="section">
      <div className="container">
        <div className="about-layout" style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 'clamp(32px, 4vw, 64px)', alignItems: 'start' }}>
          <div className="about-content">
            <ScrollReveal>
              <span className="section-label">About</span>
              <h1 style={{ fontSize: 'clamp(32px, 4vw, 48px)', marginBottom: 24 }}>
                {meta.name}
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
              {education.map((ed, i) => (
                <div key={i} className="exp-item" style={{ marginBottom: 16 }}>
                  <div className="exp-meta">
                    <div className="exp-role">{ed.degree}</div>
                    <div className="exp-org">{ed.school}</div>
                    <div className="exp-period">{ed.location} · {ed.period}</div>
                    {ed.detail && (
                      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--green)', marginTop: 4 }}>
                        {ed.detail}
                      </div>
                    )}
                  </div>
                  {ed.coursework && (
                    <div>
                      <div style={{ fontFamily: 'var(--font-label)', fontSize: 10, textTransform: 'uppercase', color: 'var(--faint)', marginBottom: 6 }}>
                        Coursework
                      </div>
                      <div style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.5 }}>
                        {ed.coursework}
                      </div>
                    </div>
                  )}
                </div>
              ))}
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
                <Robot pose="wave" size={56} />
              </div>
              <div className="dev-card-header">
                <div>
                  <div className="dev-card-name">{meta.name}</div>
                  <div className="dev-card-title">{meta.title}</div>
                </div>
                <div className="starburst">
                  <span style={{ fontSize: 7, lineHeight: 1, textAlign: 'center' }}>2027</span>
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
