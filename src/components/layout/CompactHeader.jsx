import { Link } from 'react-router-dom'
import '../../styles/compact-header.css'

export default function CompactHeader({
  backTo = '/work',
  breadcrumb = 'WORK',
  accent = 'var(--red)',
}) {
  return (
    <header
      className="compact-header"
      style={{ '--compact-header-accent': accent }}
    >
      <div className="compact-header__inner">
        <Link
          to={backTo}
          className="compact-header__back silkscreen"
          aria-label="Back to all work"
        >
          <span aria-hidden="true">←</span>
          <span>All work</span>
        </Link>

        <nav className="compact-header__breadcrumb" aria-label="Breadcrumb">
          <span className="compact-header__breadcrumb-label silkscreen">
            {breadcrumb}
          </span>
        </nav>

        <span className="compact-header__status silkscreen">
          <span className="compact-header__status-led" aria-hidden="true" />
          Project file
        </span>
      </div>
      <div className="zigzag compact-header__zigzag" aria-hidden="true" />
    </header>
  )
}
