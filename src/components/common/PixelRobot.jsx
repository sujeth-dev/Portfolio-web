export default function PixelRobot({ size = 24 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 9 9" shapeRendering="crispEdges" aria-hidden="true">
      <rect x="2" y="1" width="5" height="1" fill="#E2402D"/>
      <rect x="1" y="2" width="7" height="4" fill="#E2402D"/>
      <rect x="3" y="3" width="1" height="1" fill="#F5EEDC"/>
      <rect x="5" y="3" width="1" height="1" fill="#F5EEDC"/>
      <rect x="2" y="6" width="5" height="2" fill="#221E1C"/>
    </svg>
  )
}
