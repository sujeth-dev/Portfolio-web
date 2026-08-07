const poses = {
  wave: (
    <>
      {/* Antenna */}
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Head */}
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Eyes */}
      <rect x="17" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      <rect x="26" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      {/* Mouth */}
      <rect x="19" y="21" width="10" height="2" fill="var(--ink)" rx="1" />
      {/* Body */}
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Body detail */}
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--red)" />
      {/* Left arm (down) */}
      <rect x="6" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Right arm (waving up) */}
      <rect x="36" y="18" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" transform="rotate(-30 39 24)" />
      {/* Legs */}
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  inspect: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* One big eye (magnifying glass) */}
      <circle cx="21" cy="17" r="5" fill="none" stroke="var(--ink)" strokeWidth="2" />
      <rect x="25" y="20" width="6" height="2" fill="var(--ink)" transform="rotate(45 25 20)" />
      <rect x="29" y="14" width="4" height="4" fill="var(--ink)" rx="1" />
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--cobalt)" />
      <rect x="6" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="36" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  build: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="17" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      <rect x="26" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      <rect x="20" y="21" width="8" height="2" fill="var(--ink)" rx="1" />
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--green)" />
      <rect x="6" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      {/* Right arm holding wrench */}
      <rect x="36" y="26" width="6" height="14" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="38" y="20" width="3" height="8" fill="var(--muted)" />
      <rect x="36" y="18" width="7" height="4" rx="1" fill="var(--muted)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  sleep: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Closed eyes */}
      <line x1="17" y1="16" x2="22" y2="16" stroke="var(--ink)" strokeWidth="2" />
      <line x1="26" y1="16" x2="31" y2="16" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="21" width="8" height="2" fill="var(--ink)" rx="1" />
      {/* Zzz */}
      <text x="38" y="10" fontFamily="var(--font-label)" fontSize="8" fill="var(--muted)">z</text>
      <text x="42" y="6" fontFamily="var(--font-label)" fontSize="6" fill="var(--faint)">z</text>
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--muted)" />
      <rect x="8" y="34" width="6" height="10" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="34" y="34" width="6" height="10" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  lost: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Confused eyes */}
      <text x="17" y="19" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink)">?</text>
      <text x="27" y="19" fontFamily="var(--font-mono)" fontSize="8" fill="var(--ink)">?</text>
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--red)" />
      {/* Holding map */}
      <rect x="2" y="28" width="10" height="14" rx="1" fill="var(--cream)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="4" y1="32" x2="10" y2="32" stroke="var(--faint)" strokeWidth="0.5" />
      <line x1="4" y1="35" x2="10" y2="35" stroke="var(--faint)" strokeWidth="0.5" />
      <line x1="4" y1="38" x2="10" y2="38" stroke="var(--faint)" strokeWidth="0.5" />
      <rect x="36" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  goggles: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Goggles */}
      <rect x="14" y="12" width="20" height="8" rx="3" fill="var(--cream)" stroke="var(--ink)" strokeWidth="1.5" />
      <circle cx="20" cy="16" r="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="1" />
      <circle cx="28" cy="16" r="3" fill="var(--cobalt)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="20" y="21" width="8" height="2" fill="var(--ink)" rx="1" />
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1" />
      <rect x="6" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="36" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  signal: (
    <>
      {/* Antenna extended with signal waves */}
      <rect x="22" y="0" width="4" height="8" fill="var(--ink)" />
      <circle cx="24" cy="0" r="3" fill="var(--red)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="17" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      <rect x="26" y="14" width="5" height="5" fill="var(--ink)" rx="1" />
      {/* Smile */}
      <path d="M20 21 Q24 24 28 21" stroke="var(--ink)" strokeWidth="1.5" fill="none" />
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--red)" />
      <rect x="6" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="36" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
  read: (
    <>
      <rect x="22" y="2" width="4" height="6" fill="var(--ink)" />
      <rect x="20" y="0" width="8" height="4" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="12" y="8" width="24" height="18" rx="3" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      {/* Reading eyes (looking down) */}
      <rect x="17" y="16" width="5" height="4" fill="var(--ink)" rx="1" />
      <rect x="26" y="16" width="5" height="4" fill="var(--ink)" rx="1" />
      <rect x="20" y="22" width="8" height="2" fill="var(--ink)" rx="1" />
      <rect x="14" y="28" width="20" height="16" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="2" />
      <rect x="20" y="32" width="8" height="4" rx="1" fill="var(--cobalt)" />
      {/* Holding book */}
      <rect x="4" y="32" width="10" height="12" rx="1" fill="var(--cream)" stroke="var(--ink)" strokeWidth="1.5" />
      <line x1="9" y1="32" x2="9" y2="44" stroke="var(--ink)" strokeWidth="1" />
      <rect x="36" y="30" width="6" height="12" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="16" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
      <rect x="26" y="46" width="6" height="8" rx="2" fill="var(--yellow)" stroke="var(--ink)" strokeWidth="1.5" />
    </>
  ),
}

export default function Robot({ pose = 'wave', size = 48, className = '' }) {
  return (
    <svg
      viewBox="0 0 48 56"
      width={size}
      height={size * (56 / 48)}
      className={className}
      aria-hidden="true"
      style={{ display: 'inline-block', verticalAlign: 'middle' }}
    >
      {poses[pose] || poses.wave}
    </svg>
  )
}
