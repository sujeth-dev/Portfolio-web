const diagrams = {
  synaptic: (
    <svg viewBox="0 0 520 215" role="img" aria-label="Synaptic architecture">
      <defs>
        <marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x="10" y="16" className="acap">Prerequisite DAG</text>
      <circle cx="40" cy="64" r="18" className="an lit" />
      <text x="40" y="68" textAnchor="middle" className="anl w">A</text>
      <circle cx="120" cy="48" r="18" className="an lit" />
      <text x="120" y="52" textAnchor="middle" className="anl w">B</text>
      <circle cx="120" cy="100" r="18" className="an" />
      <text x="120" y="104" textAnchor="middle" className="anl">C</text>
      <circle cx="200" cy="74" r="18" className="an" />
      <text x="200" y="78" textAnchor="middle" className="anl">D</text>
      <path d="M58,58 L102,51" className="aedge" />
      <path d="M58,70 L102,96" className="aedge" />
      <path d="M138,54 L182,66" className="aedge" />
      <path d="M138,96 L182,80" className="aedge" />
      <circle cx="14" cy="143" r="8" className="an lit" />
      <text x="28" y="147" className="acap">mastered</text>
      <circle cx="14" cy="163" r="8" className="an" />
      <text x="28" y="167" className="acap">pending / locked</text>
      <text x="295" y="16" className="acap">Update Loop</text>
      <rect x="295" y="28" width="210" height="28" rx="14" className="aloop" />
      <text x="400" y="47" textAnchor="middle" className="anl">learner answers question</text>
      <path d="M400,56 L400,72" className="aedge" />
      <rect x="295" y="74" width="210" height="28" rx="14" className="aloop" />
      <text x="400" y="93" textAnchor="middle" className="anl">BKT updates mastery score</text>
      <path d="M400,102 L400,118" className="aedge" />
      <rect x="295" y="120" width="210" height="28" rx="14" className="aloop" />
      <text x="400" y="139" textAnchor="middle" className="anl">DAG unlocks next concept</text>
      <path d="M400,148 L400,164" className="aedge" />
      <rect x="295" y="166" width="210" height="28" rx="14" className="aloop" />
      <text x="400" y="185" textAnchor="middle" className="anl">SM-2 schedules next review</text>
      <path d="M295,180 C240,210 195,168 138,102" className="aedge" />
    </svg>
  ),
  possah: (
    <svg viewBox="0 0 520 200" role="img" aria-label="Possah architecture">
      <defs>
        <marker id="ar2" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--muted)" />
        </marker>
      </defs>
      <text x="10" y="16" className="acap">3-Layer Supabase Client</text>
      <rect x="10" y="26" width="140" height="26" rx="5" className="an" />
      <text x="80" y="43" textAnchor="middle" className="anl">public.ts (browser)</text>
      <rect x="10" y="64" width="140" height="26" rx="5" className="an" />
      <text x="80" y="81" textAnchor="middle" className="anl">server.ts (API routes)</text>
      <rect x="10" y="102" width="140" height="26" rx="5" className="an lit" />
      <text x="80" y="119" textAnchor="middle" className="anl w">admin.ts (webhooks)</text>
      <path d="M80,52 L80,64" className="aedge" />
      <path d="M80,90 L80,102" className="aedge" />
      <text x="10" y="152" className="acap">Permission scope</text>
      <text x="10" y="166" className="acap">public → anon key · server → service role · admin → full service</text>
      <text x="300" y="16" className="acap">Payment Flow</text>
      <rect x="300" y="26" width="200" height="26" rx="13" className="aloop" />
      <text x="400" y="43" textAnchor="middle" className="anl">client checkout intent</text>
      <path d="M400,52 L400,64" className="aedge" />
      <rect x="300" y="64" width="200" height="26" rx="13" className="aloop" />
      <text x="400" y="81" textAnchor="middle" className="anl">server re-validates price</text>
      <path d="M400,90 L400,102" className="aedge" />
      <rect x="300" y="102" width="200" height="26" rx="13" className="aloop" />
      <text x="400" y="119" textAnchor="middle" className="anl">Razorpay order created</text>
      <path d="M400,128 L400,140" className="aedge" />
      <rect x="300" y="140" width="200" height="26" rx="13" className="aloop" />
      <text x="400" y="157" textAnchor="middle" className="anl">webhook + idempotency guard</text>
      <path d="M400,166 L400,178" className="aedge" />
      <rect x="300" y="178" width="200" height="22" rx="11" className="an lit" />
      <text x="400" y="193" textAnchor="middle" className="anl w">order fulfilled</text>
    </svg>
  ),
}

export default function ArchDiagram({ id }) {
  if (!diagrams[id]) return null
  return <div className="arch-box">{diagrams[id]}</div>
}
