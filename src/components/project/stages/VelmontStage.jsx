export default function VelmontStage({ progress = 0, activeState }) {
  const draw = Math.min(1, progress / 0.82)

  return (
    <svg
      className="project-stage-scene project-stage-scene--velmont"
      viewBox="0 0 520 420"
      aria-hidden="true"
      data-state={activeState}
    >
      <defs>
        <pattern id="velmont-grid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M20 0H0V20" fill="none" />
        </pattern>
      </defs>
      <rect className="velmont-scene__grid" width="520" height="420" fill="url(#velmont-grid)" />
      <g className="velmont-scene__building" style={{ strokeDashoffset: 920 * (1 - draw) }}>
        <path d="M92 326 V164 L220 86 L346 164 V326 Z" />
        <path d="M220 86 V326 M92 164 H346 M142 326 V222 H196 V326 M246 214 H306 V268 H246 Z" />
        <path d="M72 346 H372 M68 150 L220 58 L372 150" />
      </g>
      <g className="velmont-scene__measurements" style={{ opacity: draw }}>
        <path d="M396 94 V326 M386 104 L396 94 L406 104 M386 316 L396 326 L406 316" />
        <text x="416" y="216" transform="rotate(90 416 216)">2400 PX</text>
        <text x="92" y="374">INTERFACE ELEVATION / V-03</text>
      </g>
    </svg>
  )
}
