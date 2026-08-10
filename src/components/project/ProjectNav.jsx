import { Link } from 'react-router-dom'

function DirectionLink({ project, direction }) {
  if (!project) return null

  const isNext = direction === 'next'

  return (
    <Link
      to={`/work/${project.slug}`}
      className={`project-nav__direction project-nav__direction--${direction}`}
      style={{ '--project-nav-accent': project.visual?.accent || 'var(--red)' }}
      aria-label={`${isNext ? 'Next project' : 'Previous project'}: ${project.name}`}
      data-cursor="VIEW"
    >
      <span className="project-nav__label silkscreen">
        {isNext ? 'Next project' : 'Previous'}
      </span>
      <span className="project-nav__project-row">
        {!isNext && <span aria-hidden="true">←</span>}
        <strong>{project.name}</strong>
        {isNext && <span aria-hidden="true">→</span>}
      </span>
      {isNext && (
        <span className="project-nav__preview">
          <span className="project-nav__preview-mark" aria-hidden="true">
            {project.name.slice(0, 2).toUpperCase()}
          </span>
          <span className="project-nav__preview-copy">
            <span className="mono">{project.category}</span>
            <span>{project.tagline}</span>
          </span>
        </span>
      )}
    </Link>
  )
}

export default function ProjectNav({ prev, next }) {
  return (
    <nav
      className={`project-nav${next ? '' : ' project-nav--no-next'}`}
      aria-label="Project navigation"
    >
      <DirectionLink project={prev} direction="prev" />
      <Link to="/work" className="project-nav__all silkscreen" data-cursor="VIEW">
        <span className="project-nav__grid-icon" aria-hidden="true">
          <i />
          <i />
          <i />
          <i />
        </span>
        All work
      </Link>
      <DirectionLink project={next} direction="next" />
    </nav>
  )
}
