import { Link } from 'react-router-dom'
import PixelRobot from '../common/PixelRobot'
import { meta } from '../../data/meta'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <PixelRobot size={20} />
          <span className="footer-text">
            Built by {meta.name} — Bengaluru
          </span>
        </div>
        <div className="footer-links">
          <Link to="/work" className="footer-link">Work</Link>
          <Link to="/lab" className="footer-link">Lab</Link>
          <Link to="/about" className="footer-link">About</Link>
          <a href={meta.github} className="footer-link" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href={meta.linkedin} className="footer-link" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  )
}
