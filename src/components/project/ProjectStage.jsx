import { lazy, Suspense, useRef } from 'react'
import ArchDiagram from './ArchDiagram'
import { ParallaxLayer } from '../systems/ParallaxLayer'
import { useInteraction } from '../../systems/InteractionContext'
import { useSectionProgress } from '../../hooks/useSectionProgress'
import '../../styles/project-stage.css'

const stageStates = [
  { id: 'identity', label: 'Identity', eyebrow: '01 / Identity' },
  { id: 'problem', label: 'Problem', eyebrow: '02 / Problem signal' },
  { id: 'architecture', label: 'Architecture', eyebrow: '03 / Architecture' },
  { id: 'engineering', label: 'Engineering', eyebrow: '04 / Engineering' },
  { id: 'results', label: 'Results', eyebrow: '05 / Result' },
]

const stageScenes = {
  synaptic: lazy(() => import('./stages/SynapticStage')),
  possah: lazy(() => import('./stages/PossahStage')),
  velmont: lazy(() => import('./stages/VelmontStage')),
}

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

function PanelBody({ stateId, project }) {
  switch (stateId) {
    case 'identity':
      return (
        <>
          <ProjectMonogram name={project.name} />
          <strong className="project-stage__project-name">{project.name}</strong>
          <span className="project-stage__project-tagline">{project.tagline}</span>
        </>
      )
    case 'problem':
      return (
        <>
          <div className="project-stage__problem-signal" aria-hidden="true">
            <span />
            <span />
            <span />
          </div>
          <strong>Constraint detected</strong>
          <span className="project-stage__summary">
            {project.problem || 'Mapping the core system constraint.'}
          </span>
        </>
      )
    case 'architecture':
      return project.architecture ? (
        <ArchDiagram id={project.architecture.svg} />
      ) : (
        <div className="project-stage__node-map" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
        </div>
      )
    case 'engineering':
      return (
        <div className="project-stage__terminal mono" aria-hidden="true">
          <span>$ system.inspect()</span>
          {project.stack.slice(0, 4).map((item) => (
            <span key={item}>+ {item}</span>
          ))}
          <span className="project-stage__terminal-ok">✓ production path ready</span>
        </div>
      )
    case 'results':
      return (
        <>
          <div className="project-stage__result-mark" aria-hidden="true">✓</div>
          <strong>{project.statusLabel || 'System shipped'}</strong>
          <span className="project-stage__summary">
            {project.result || 'Validated, documented, and ready for the next iteration.'}
          </span>
        </>
      )
    default:
      return null
  }
}

function MobileStagePanel({ state, project }) {
  const { reducedMotion } = useInteraction()
  const panelRef = useRef(null)
  const { progress, isInView } = useSectionProgress(panelRef, { once: true })
  const revealed = reducedMotion || isInView

  return (
    <div
      ref={panelRef}
      className="project-stage__mobile-panel"
      data-revealed={revealed}
      style={{ '--mobile-panel-progress': clamp(progress) }}
    >
      <span className="project-stage__state-label silkscreen">{state.eyebrow}</span>
      <div className="project-stage__mobile-panel-body">
        <PanelBody stateId={state.id} project={project} />
      </div>
    </div>
  )
}

function MobileProjectStage({ project, accent }) {
  return (
    <aside
      className="project-stage project-stage--mobile"
      style={{ '--stage-accent': accent }}
      aria-label={`${project.name} project visualization`}
    >
      <div className="project-stage__topbar">
        <span className="project-stage__eyebrow silkscreen">Visual system</span>
      </div>
      <ParallaxLayer layer={1} mobileScale={0.3} className="project-stage__grid" />
      <div className="project-stage__mobile-stack">
        {stageStates.map((state) => (
          <MobileStagePanel key={state.id} state={state} project={project} />
        ))}
      </div>
    </aside>
  )
}

export default function ProjectStage({ project, scrollProgress = 0, children }) {
  const { reducedMotion, isMobile } = useInteraction()
  const accent = project.visual?.accent || 'var(--red)'

  if (isMobile) {
    return <MobileProjectStage project={project} accent={accent} />
  }

  const progress = reducedMotion ? 1 : clamp(scrollProgress)
  const activeIndex = Math.min(stageStates.length - 1, Math.floor(progress * 5))
  const activeState = stageStates[activeIndex]
  const Scene = stageScenes[project.slug]

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

        {stageStates.map((state, index) => (
          <div
            key={state.id}
            className={`project-stage__panel project-stage__panel--${state.id}`}
            data-active={activeIndex === index}
            aria-hidden={activeIndex !== index}
          >
            <span className="project-stage__state-label silkscreen">{state.eyebrow}</span>
            <PanelBody stateId={state.id} project={project} />
          </div>
        ))}

        {children || Scene ? (
          <div className="project-stage__visual-slot">
            {children || (
              <Suspense fallback={<div className="project-stage__scene-fallback" />}>
                <Scene progress={progress} activeState={activeState.id} />
              </Suspense>
            )}
          </div>
        ) : null}
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
