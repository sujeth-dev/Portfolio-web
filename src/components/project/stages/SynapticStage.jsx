const nodes = [
  [86, 122, 'A'],
  [176, 78, 'B'],
  [182, 176, 'C'],
  [284, 126, 'D'],
]

export default function SynapticStage({ progress = 0, activeState }) {
  const draw = Math.min(1, progress / 0.62)
  const mastery = Math.max(0, Math.min(1, (progress - 0.42) / 0.48))

  return (
    <svg
      className="project-stage-scene project-stage-scene--synaptic"
      viewBox="0 0 520 420"
      aria-hidden="true"
      data-state={activeState}
    >
      <g className="synaptic-scene__edges" style={{ strokeDashoffset: 180 * (1 - draw) }}>
        <path d="M102 114 L160 86" />
        <path d="M102 132 L164 168" />
        <path d="M194 90 L266 119" />
        <path d="M200 168 L268 136" />
      </g>
      <g className="synaptic-scene__nodes">
        {nodes.map(([x, y, label], index) => (
          <g key={label} style={{ opacity: Math.max(0.15, Math.min(1, draw * 2 - index * 0.22)) }}>
            <circle cx={x} cy={y} r="20" />
            <text x={x} y={y + 5} textAnchor="middle">{label}</text>
          </g>
        ))}
      </g>
      <g className="synaptic-scene__mastery">
        <text x="340" y="86">BKT MASTERY</text>
        {[0.86, 0.68, 0.44].map((amount, index) => (
          <g key={amount} transform={`translate(340 ${112 + index * 46})`}>
            <rect width="130" height="18" className="track" />
            <rect width={130 * amount * mastery} height="18" className="value" />
          </g>
        ))}
      </g>
      <text className="project-stage-scene__caption" x="42" y="360">KNOWLEDGE ROUTE / LIVE</text>
    </svg>
  )
}
