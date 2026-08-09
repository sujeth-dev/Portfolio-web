import ArchDiagram from './ArchDiagram'
import { useInteraction } from '../../systems/InteractionContext'
import '../../styles/project-stage.css'

const stageStates = [
  { id: 'identity', label: 'Identity' },
  { id: 'problem', label: 'Problem' },
  { id: 'architecture', label: 'Architecture' },
  { id: 'engineering', label: 'Engineering' },
  { id: 'results', label: 'Results' },
]

function clamp(value) {
  return Math.min(1, Math.max(0, Number.isFinite(value) ? value : 0))
}

function ProjectMonogram({ name }) {
  const monogram = name
    .split(/\s+/)
    .map((word) => word[0])
    .join('')
    .slice(0, 2)

  return <span className="project-stage__monogram">{monogram}</span>
}

export default function ProjectStage({ project, scrollProgress = 0, children }) {
  const { reducedMotion } = useInteraction()
  const progress = reducedMotion ? 1 : clamp(scrollProgress)
  const activeIndex = Math.min(stageStates.length - 1, Math.floor(progress * 5))
  const activeState = stageStates[activeIndex]
  const accent = project.visual?.accent || 'var(--red)'

  return (
    <aside
      className="project-stage"
      data-state={activeState.id}
      style={{
        '--stage-accent': accent,
        '--stage-progress': progress,
      }}
      aria-label={`${project.name} project visualization: ${activeState.label}`}
    >
      <div className="project-stage__topbar">
        <span className="project-stage__eyebrow silkscreen">Visual system</span>
        <span className="project-stage__readout mono">
          {String(Math.round(progress * 100)).padStart(3, '0')}%
        </span>
      </div>

      <div className="project-stage__viewport">
        <div className="project-stage__grid" aria-hidden="true" />

        <div
          className="project-stage__panel project-stage__panel--identity"
          data-active={activeIndex === 0}
          aria-hidden={activeIndex !== 0}
        >
          <span className="project-stage__state-label silkscreen">01 / Identity</span>
          <ProjectMonogram name={project.name} />
          <strong className="project-stage__project-name">{project.name}</strong>
          <span className="project-stage__project-tagline">{project.tagline}</span>
        </div>

        <div
          className="project-stage__panel project-stage__panel--problem"
          data-active={activeIndex === 1}
          aria-hidden={activeIndex !== 1}
        >
          <span className="project-stage__state-label silkscreen">02 / Problem signal</span>
          <div className="project-stage__problem-signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>Constraint detected</strong>
          <span className="project-stage__summary">
            {project.problem || 'Mapping the core system constraint.'}
          </span>
        </div>

        <div
          className="project-stage__panel project-stage__panel--architecture"
          data-active={activeIndex === 2}
          aria-hidden={activeIndex !== 2}
        >
          <span className="project-stage__state-label silkscreen">03 / Architecture</span>
          {project.architecture ? (
            <ArchDiagram id={project.architecture.svg} />
          ) : (
            <div className="project-stage__node-map" aria-hidden="true">
              <span />
              <span />
              <span />
              <span />
            </div>
          )}
        </div>

        <div
          className="project-stage__panel project-stage__panel--engineering"
          data-active={activeIndex === 3}
          aria-hidden={activeIndex !== 3}
        >
          <span className="project-stage__state-label silkscreen">04 / Engineering</span>
          <div className="project-stage__terminal mono" aria-hidden="true">
            <span>$ system.inspect()</span>
            {project.stack.slice(0, 4).map((item) => (
              <span key={item}>+ {item}</span>
            ))}
            <span className="project-stage__terminal-ok">✓ production path ready</span>
          </div>
        </div>

        <div
          className="project-stage__panel project-stage__panel--results"
          data-active={activeIndex === 4}
          aria-hidden={activeIndex !== 4}
        >
          <span className="project-stage__state-label silkscreen">05 / Result</span>
          <div className="project-stage__result-mark" aria-hidden="true">✓</div>
          <strong>{project.statusLabel || 'System shipped'}</strong>
          <span className="project-stage__summary">
            {project.result || 'Validated, documented, and ready for the next iteration.'}
          </span>
        </div>

        {children ? <div className="project-stage__visual-slot">{children}</div> : null}
      </div>

      <ol className="project-stage__rail" aria-label="Project visualization states">
        {stageStates.map((state, index) => (
          <li
            key={state.id}
            className={index === activeIndex ? 'is-active' : index < activeIndex ? 'is-complete' : ''}
            aria-current={index === activeIndex ? 'step' : undefined}
          >
            <span className="project-stage__rail-dot" aria-hidden="true" />
            <span className="silkscreen">{state.label}</span>
          </li>
        ))}
      </ol>
    </aside>
  )
}
