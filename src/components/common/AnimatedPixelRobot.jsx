import '../../styles/animated-pixel-robot.css'

export default function AnimatedPixelRobot({ size } = {}) {
  const dimensionProps = size ? { width: size, height: size } : {}

  return (
    <svg
      {...dimensionProps}
      viewBox="0 0 9 9"
      shapeRendering="crispEdges"
      className="animated-pixel-robot"
      role="img"
      aria-label="Pixel robot mascot"
    >
      <g className="animated-pixel-robot__body">
        <rect x="2" y="1" width="5" height="1" fill="#E2402D" />
        <rect x="1" y="2" width="7" height="4" fill="#E2402D" />
        <rect x="3" y="3" width="1" height="1" fill="#F5EEDC" className="animated-pixel-robot__eye" />
        <rect x="5" y="3" width="1" height="1" fill="#F5EEDC" className="animated-pixel-robot__eye animated-pixel-robot__eye--right" />
        <rect x="2" y="6" width="5" height="2" fill="#221E1C" />
      </g>
    </svg>
  )
}
