import { Link } from 'react-router-dom'
import Robot from '../components/robot/Robot'

export default function NotFound() {
  return (
    <section className="section">
      <div className="container">
        <div className="not-found">
          <Robot pose="lost" size={80} />
          <div className="not-found-code">404</div>
          <div className="not-found-text">
            This page doesn't exist. The robot is confused too.
          </div>
          <Link to="/" className="btn btn-primary" style={{ marginTop: 16 }}>
            Go Home
          </Link>
        </div>
      </div>
    </section>
  )
}
