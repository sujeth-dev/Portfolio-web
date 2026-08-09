export default function PossahStage({ progress = 0, activeState }) {
  const packageOffset = 250 * Math.min(1, progress / 0.72)
  const receipt = Math.max(0, Math.min(1, (progress - 0.55) / 0.35))

  return (
    <svg
      className="project-stage-scene project-stage-scene--possah"
      viewBox="0 0 520 420"
      aria-hidden="true"
      data-state={activeState}
    >
      <rect className="possah-scene__terminal" x="278" y="54" width="178" height="224" rx="12" />
      <rect className="possah-scene__screen" x="300" y="78" width="134" height="96" rx="4" />
      <text x="318" y="110">PAYMENT</text>
      <text x="318" y="140" className="possah-scene__approved">APPROVED ✓</text>
      <g className="possah-scene__keys">
        {[0, 1, 2, 3, 4, 5].map((key) => (
          <rect key={key} x={306 + (key % 3) * 42} y={194 + Math.floor(key / 3) * 30} width="28" height="18" rx="3" />
        ))}
      </g>
      <path className="possah-scene__belt" d="M32 300 H486" />
      <g className="possah-scene__package" transform={`translate(${packageOffset} 0)`}>
        <rect x="54" y="240" width="86" height="58" />
        <path d="M54 256 H140 M97 240 V298" />
      </g>
      <rect className="possah-scene__printer" x="368" y="286" width="96" height="54" rx="5" />
      <rect className="possah-scene__receipt" x="384" y="338" width="64" height={58 * receipt} />
      <text className="project-stage-scene__caption" x="34" y="368">ORDER → VERIFY → FULFIL</text>
    </svg>
  )
}
