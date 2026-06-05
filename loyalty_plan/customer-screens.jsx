// Loop — customer-side prototype screens
// 9 key screens, themed per BRAND. Renders inside <IOSDevice>.

const { useState } = React;

// ─── Shared atoms ─────────────────────────────────────────
function Pill({ children, bg, color, style = {} }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      height: 22, padding: '0 10px', borderRadius: 999,
      fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1,
      textTransform: 'uppercase', background: bg, color, fontWeight: 500,
      ...style,
    }}>{children}</div>
  );
}

function ProgressRing({ progress, total, color, bg, size = 120, label }) {
  const r = (size - 14) / 2;
  const c = 2 * Math.PI * r;
  const dash = (progress / total) * c;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={bg} strokeWidth="10"/>
      <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="10"
        strokeLinecap="round"
        strokeDasharray={`${dash} ${c - dash}`}
        transform={`rotate(-90 ${size/2} ${size/2})`}/>
      {label}
    </svg>
  );
}

function ScreenLabel({ children }) {
  return (
    <div style={{
      position: 'absolute', top: -28, left: 0,
      fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.4,
      textTransform: 'uppercase', color: '#6B645C',
    }}>{children}</div>
  );
}

// ─── SCREEN 1: QR landing ────────────────────────────────
function S01_Landing({ b }) {
  return (
    <div style={{ height: '100%', background: b.hero, position: 'relative', overflow: 'hidden' }}>
      {/* big illustration / mark */}
      <div style={{ position: 'absolute', top: 60, left: 0, right: 0, height: 360, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: b.fontDisplay, fontSize: 200, color: b.dark ? b.accent : '#fff', opacity: 0.06 }}>{b.rewardEmoji}</div>
      </div>
      {/* content bottom card */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        background: b.surface, borderRadius: '32px 32px 0 0',
        padding: '32px 28px 50px',
      }}>
        <Pill bg={b.accentSoft} color={b.accentInk} style={{ marginBottom: 18 }}>
          <span style={{ width:6, height:6, borderRadius: '50%', background: b.accent }} />
          Loyalty by Loop
        </Pill>
        <h1 style={{
          fontFamily: b.fontDisplay, fontWeight: 400,
          fontSize: 38, lineHeight: 1.05, letterSpacing: '-0.02em',
          margin: '0 0 14px', color: b.ink,
        }}>{b.welcome}</h1>
        <p style={{ fontSize: 16, color: b.inkSoft, lineHeight: 1.45, margin: '0 0 28px' }}>
          {b.promise}
        </p>
        <button style={{
          width: '100%', height: 54, borderRadius: 14, border: 0,
          background: b.ink, color: b.surface, fontSize: 16, fontWeight: 500,
          fontFamily: b.fontUi, cursor: 'pointer',
        }}>Start with phone number →</button>
        <div style={{ textAlign: 'center', fontSize: 12, color: b.mute, marginTop: 16, fontFamily: b.fontUi }}>
          Your data stays with {b.name}. Always.
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 2: Phone entry ───────────────────────────────
function S02_Phone({ b }) {
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 28px 0', position: 'relative' }}>
      <div style={{ fontFamily: b.fontDisplay, fontSize: 22, color: b.ink }}>{b.name}</div>
      <div style={{ marginTop: 40 }}>
        <div style={{ fontSize: 13, color: b.mute, marginBottom: 8, fontFamily: '"Geist Mono", monospace', letterSpacing: 1, textTransform: 'uppercase' }}>
          Your phone
        </div>
        <h2 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 30, lineHeight: 1.1, margin: '0 0 8px', color: b.ink, letterSpacing: '-0.015em' }}>
          We'll send a WhatsApp OTP — nothing else.
        </h2>
        <p style={{ fontSize: 14, color: b.inkSoft, lineHeight: 1.5, margin: '0 0 32px' }}>
          One field. No password, no app. Welcome on your first scan.
        </p>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: b.surface, border: `1px solid ${b.line}`, borderRadius: 14,
          padding: '16px 18px',
        }}>
          <span style={{ fontFamily: b.fontUi, color: b.ink, fontSize: 17 }}>🇮🇳</span>
          <span style={{ fontFamily: b.fontUi, color: b.ink, fontSize: 17, fontWeight: 500 }}>+91</span>
          <div style={{ width: 1, height: 24, background: b.line }} />
          <input placeholder="98 765 43210" defaultValue="98 765 43210"
            style={{ flex: 1, border: 0, background: 'transparent', fontFamily: b.fontUi, fontSize: 17, color: b.ink, outline: 'none' }}/>
        </div>
        <button style={{
          width: '100%', height: 54, borderRadius: 14, border: 0,
          background: b.accent, color: b.dark ? b.ink : '#fff',
          fontSize: 16, fontWeight: 500, marginTop: 18,
          fontFamily: b.fontUi, cursor: 'pointer',
        }}>Send OTP →</button>
      </div>
    </div>
  );
}

// ─── SCREEN 3: OTP ───────────────────────────────────────
function S03_OTP({ b }) {
  const digits = ['8', '4', '7', '1', '', ''];
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 28px 0' }}>
      <div style={{ fontFamily: b.fontDisplay, fontSize: 22, color: b.ink }}>{b.name}</div>
      <div style={{ marginTop: 50 }}>
        <h2 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 6px', color: b.ink, letterSpacing: '-0.02em' }}>
          Check WhatsApp.
        </h2>
        <p style={{ fontSize: 14, color: b.inkSoft, margin: '0 0 36px' }}>
          We sent a 6-digit code to +91 98 765 43210.
        </p>
        <div style={{ display: 'flex', gap: 10, justifyContent: 'space-between' }}>
          {digits.map((d, i) => (
            <div key={i} style={{
              flex: 1, height: 58, borderRadius: 12,
              border: `1.5px solid ${i === 4 ? b.accent : b.line}`,
              background: b.surface,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: b.fontDisplay, fontSize: 30, color: b.ink,
            }}>{d}{i === 4 ? <span style={{ display: 'inline-block', width: 2, height: 28, background: b.accent, marginLeft: 1, animation: 'blink 1s infinite' }}/> : null}</div>
          ))}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24, fontSize: 13, fontFamily: b.fontUi }}>
          <span style={{ color: b.mute }}>Resend in 0:32</span>
          <span style={{ color: b.accent, fontWeight: 500 }}>Open WhatsApp →</span>
        </div>
      </div>
      <style>{`@keyframes blink { 0%, 49% { opacity: 1 } 50%, 100% { opacity: 0 } }`}</style>
    </div>
  );
}

// ─── SCREEN 4: Welcome (1/5 counted) ─────────────────────
function S04_Welcome({ b }) {
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 28px 0', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
      {/* confetti dots */}
      {[...Array(12)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: 6, height: 6, borderRadius: '50%',
          background: i % 2 ? b.accent : b.contrast, opacity: 0.7,
          top: `${10 + (i * 7) % 30}%`, left: `${(i * 23) % 90 + 5}%`,
        }}/>
      ))}
      <div style={{ marginTop: 30, fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 2, color: b.mute, textTransform: 'uppercase' }}>
        Your first visit just counted
      </div>
      <h1 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 38, lineHeight: 1.05, margin: '14px 0 32px', color: b.ink, letterSpacing: '-0.02em' }}>
        You're in.<br/><i style={{ color: b.accent }}>1 of {b.loopTotal}</i> already.
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '20px 0 28px' }}>
        <ProgressRing
          progress={1} total={b.loopTotal}
          color={b.accent} bg={b.line} size={160}
          label={
            <g>
              <text x="80" y="78" textAnchor="middle" fontFamily={b.fontDisplay} fontSize="48" fill={b.ink}>1</text>
              <text x="80" y="100" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="10" fill={b.mute} letterSpacing="2">OF {b.loopTotal}</text>
            </g>
          }
        />
      </div>
      <div style={{
        background: b.surface, border: `1px solid ${b.line}`, borderRadius: 14,
        padding: '16px 20px', textAlign: 'left',
      }}>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.2, textTransform: 'uppercase', color: b.mute, marginBottom: 6 }}>
          Your reward
        </div>
        <div style={{ fontFamily: b.fontDisplay, fontSize: 22, color: b.ink, lineHeight: 1.15 }}>
          {b.rewardName} {b.rewardEmoji}
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 5: Dashboard ─────────────────────────────────
function S05_Dashboard({ b }) {
  const pct = (b.progress / b.loopTotal) * 100;
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 22px 80px', overflowY: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
        <div>
          <div style={{ fontFamily: b.fontDisplay, fontSize: 22, color: b.ink, lineHeight: 1 }}>{b.name}</div>
          <div style={{ fontFamily: b.fontUi, fontSize: 12, color: b.mute, marginTop: 2 }}>Hi, Priya</div>
        </div>
        <div style={{ width: 34, height: 34, borderRadius: '50%', background: b.surface, border: `1px solid ${b.line}`, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, color: b.ink, fontWeight: 500 }}>P</div>
      </div>

      {/* Main progress card */}
      <div style={{
        background: b.surface, border: `1px solid ${b.line}`,
        borderRadius: 18, padding: '22px 22px 26px', position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: 1.4, textTransform: 'uppercase', color: b.mute, marginBottom: 8 }}>
              {b.loopTotal - b.progress} more visits
            </div>
            <div style={{ fontFamily: b.fontDisplay, fontSize: 26, color: b.ink, lineHeight: 1.1, letterSpacing: '-0.015em' }}>
              {b.rewardName.toLowerCase()}<br/>almost ready.
            </div>
          </div>
          <ProgressRing
            progress={b.progress} total={b.loopTotal}
            color={b.accent} bg={b.line} size={68}
            label={<text x="34" y="40" textAnchor="middle" fontFamily={b.fontDisplay} fontSize="22" fill={b.ink}>{b.progress}/{b.loopTotal}</text>}
          />
        </div>
        <div style={{ marginTop: 18, height: 8, borderRadius: 4, background: b.line, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: b.accent, borderRadius: 4 }}/>
        </div>
      </div>

      {/* Activities */}
      <div style={{ marginTop: 22, marginBottom: 10 }}>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: b.mute }}>
          Earn faster — 3 active
        </div>
      </div>
      {[
        { t: b.activity.title, r: b.activity.reward, due: '2 days left' },
        { t: 'Refer a friend who visits', r: 'free starter for both', due: 'always on' },
        { t: 'Visit on a weekday lunch', r: 'double progress', due: 'today' },
      ].map((a, i) => (
        <div key={i} style={{
          background: b.surface, border: `1px solid ${b.line}`,
          borderRadius: 12, padding: '14px 16px', marginTop: 8,
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, color: b.ink, fontWeight: 500, fontFamily: b.fontUi }}>{a.t}</div>
            <div style={{ fontSize: 12, color: b.inkSoft, marginTop: 2 }}>→ {a.r}</div>
          </div>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, color: b.mute, letterSpacing: 1, textTransform: 'uppercase', whiteSpace: 'nowrap' }}>{a.due}</div>
        </div>
      ))}

      <div style={{ marginTop: 24, fontSize: 12, color: b.mute, textAlign: 'center', fontFamily: b.fontUi }}>
        18 members redeemed this week ↗
      </div>
    </div>
  );
}

// ─── SCREEN 6: Activity submit ───────────────────────────
function S06_Activity({ b }) {
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 24px 0' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 26, fontSize: 13, color: b.inkSoft, fontFamily: b.fontUi }}>
        ← Back
      </div>
      <Pill bg={b.accentSoft} color={b.accentInk}>{b.activity.reward}</Pill>
      <h1 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 30, lineHeight: 1.1, margin: '14px 0 14px', color: b.ink, letterSpacing: '-0.02em' }}>
        {b.activity.title}
      </h1>
      <p style={{ fontSize: 14, color: b.inkSoft, lineHeight: 1.5, margin: '0 0 24px' }}>
        Once you submit, we'll verify within 2 hours. Your reward unlocks the second it's approved.
      </p>
      <div style={{
        background: b.surface, border: `1.5px dashed ${b.line}`, borderRadius: 14,
        padding: '40px 20px', textAlign: 'center',
      }}>
        <div style={{ fontSize: 32, marginBottom: 8, opacity: 0.4 }}>📷</div>
        <div style={{ fontSize: 14, color: b.ink, fontWeight: 500, fontFamily: b.fontUi }}>Drop a screenshot</div>
        <div style={{ fontSize: 12, color: b.mute, marginTop: 4 }}>or paste a link</div>
      </div>
      <button style={{
        width: '100%', height: 52, borderRadius: 14, border: 0,
        background: b.ink, color: b.surface, fontSize: 15, fontWeight: 500,
        fontFamily: b.fontUi, marginTop: 18, opacity: 0.5,
      }}>Submit for review</button>

      <div style={{ display: 'flex', gap: 10, marginTop: 18, padding: '14px 16px', background: b.surface, border: `1px solid ${b.line}`, borderRadius: 12 }}>
        <div style={{ width: 4, alignSelf: 'stretch', background: b.accent, borderRadius: 2 }}/>
        <div style={{ fontSize: 12, color: b.inkSoft, lineHeight: 1.5 }}>
          <b style={{ color: b.ink }}>2-hour SLA.</b> You'll get a WhatsApp the moment your reward unlocks.
        </div>
      </div>
    </div>
  );
}

// ─── SCREEN 7: Reward unlocked (full screen) ─────────────
function S07_Unlocked({ b }) {
  return (
    <div style={{ height: '100%', background: b.accent, color: b.dark ? b.ink : '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '60px 28px 80px', position: 'relative', overflow: 'hidden' }}>
      {[...Array(8)].map((_, i) => (
        <div key={i} style={{
          position: 'absolute', width: 200 + i*40, height: 200 + i*40,
          borderRadius: '50%', border: `1px solid ${b.dark ? b.accentInk : 'rgba(255,255,255,0.08)'}`,
          top: `calc(50% - ${100 + i*20}px)`, left: `calc(50% - ${100 + i*20}px)`,
          opacity: 0.4 - i*0.04, pointerEvents: 'none',
        }}/>
      ))}
      <div>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', opacity: 0.7 }}>
          Loop complete · reward unlocked
        </div>
      </div>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: 84, lineHeight: 1, marginBottom: 16 }}>{b.rewardEmoji}</div>
        <h1 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 52, lineHeight: 1, margin: '0 0 8px', letterSpacing: '-0.025em' }}>
          {b.rewardName}.
        </h1>
        <p style={{ fontSize: 15, opacity: 0.85, lineHeight: 1.45 }}>
          Show your code at the counter.<br/>Expires in 14 days.
        </p>
      </div>
      <button style={{
        height: 56, borderRadius: 14, border: 0,
        background: b.dark ? b.ink : 'rgba(0,0,0,0.85)',
        color: b.dark ? b.accent : '#fff',
        fontSize: 16, fontWeight: 500, fontFamily: b.fontUi, cursor: 'pointer',
      }}>Show my coupon →</button>
    </div>
  );
}

// ─── SCREEN 8: Coupon ────────────────────────────────────
function S08_Coupon({ b }) {
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 24px 0' }}>
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', marginBottom: 24, fontSize: 13, color: b.inkSoft, fontFamily: b.fontUi }}>
        ← Back
      </div>
      <div style={{
        background: b.surface, border: `1px solid ${b.line}`, borderRadius: 18,
        padding: '32px 24px 24px',
      }}>
        <Pill bg={b.accentSoft} color={b.accentInk} style={{ marginBottom: 18 }}>
          <span style={{ width: 6, height: 6, borderRadius: '50%', background: b.accent }}/>
          Active · expires in 14 days
        </Pill>
        <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.4, textTransform: 'uppercase', color: b.mute, marginBottom: 8 }}>
          Show at counter
        </div>
        <h1 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 32, lineHeight: 1.05, margin: '0 0 20px', color: b.ink, letterSpacing: '-0.02em' }}>
          {b.rewardName}
        </h1>
        <div style={{
          background: b.bg, border: `1px dashed ${b.line}`, borderRadius: 12,
          padding: '24px 16px', textAlign: 'center', marginBottom: 14,
        }}>
          <div style={{
            fontFamily: b.fontDisplay, fontSize: 44, color: b.ink,
            letterSpacing: '0.18em', lineHeight: 1,
          }}>{b.coupon}</div>
        </div>
        <div style={{ fontSize: 12, color: b.mute, textAlign: 'center', marginBottom: 18 }}>
          Bound to +91 98 765 43210 · single use
        </div>
        <div style={{ height: 1, background: b.line, margin: '0 -24px 18px' }}/>
        <div style={{ fontSize: 13, color: b.inkSoft, lineHeight: 1.5 }}>
          <b style={{ color: b.ink }}>{b.name}</b><br/>
          <span style={{ color: b.mute }}>{b.tagline}</span>
        </div>
      </div>

      {/* New loop hint */}
      <div style={{
        background: b.dark ? b.surface : '#FCFAF4', border: `1px solid ${b.line}`,
        borderRadius: 12, padding: '14px 16px', marginTop: 14,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div>
          <div style={{ fontFamily: '"Geist Mono", monospace', fontSize: 9.5, letterSpacing: 1.2, textTransform: 'uppercase', color: b.mute }}>
            Next up
          </div>
          <div style={{ fontFamily: b.fontDisplay, fontSize: 17, color: b.ink, marginTop: 2 }}>
            Weekend brunch streak
          </div>
        </div>
        <div style={{ fontSize: 14, color: b.accent, fontWeight: 500 }}>→</div>
      </div>
    </div>
  );
}

// ─── SCREEN 9: Win-back / Day 30 ─────────────────────────
function S09_Winback({ b }) {
  return (
    <div style={{ height: '100%', background: b.bg, padding: '60px 28px 0', textAlign: 'center', display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginTop: 30, fontFamily: '"Geist Mono", monospace', fontSize: 10, letterSpacing: 1.6, textTransform: 'uppercase', color: b.mute }}>
        Day 30 · We've missed you
      </div>
      <h1 style={{ fontFamily: b.fontDisplay, fontWeight: 400, fontSize: 42, lineHeight: 1.05, margin: '18px 0 24px', color: b.ink, letterSpacing: '-0.025em' }}>
        Your <i style={{ color: b.accent }}>journey</i><br/>is still waiting.
      </h1>
      <div style={{ display: 'flex', justifyContent: 'center', margin: '12px 0 28px' }}>
        <ProgressRing
          progress={b.progress} total={b.loopTotal}
          color={b.accent} bg={b.line} size={140}
          label={
            <g>
              <text x="70" y="68" textAnchor="middle" fontFamily={b.fontDisplay} fontSize="38" fill={b.ink}>{b.progress}</text>
              <text x="70" y="88" textAnchor="middle" fontFamily="Geist Mono, monospace" fontSize="9" fill={b.mute} letterSpacing="2">OF {b.loopTotal}</text>
            </g>
          }
        />
      </div>
      <p style={{ fontSize: 15, color: b.inkSoft, lineHeight: 1.5, margin: '0 28px 32px' }}>
        Come back this week and pick up<br/>right where you left off. {b.rewardName.toLowerCase()} is still yours.
      </p>
      <button style={{
        margin: '0 0 0', height: 54, borderRadius: 14, border: 0,
        background: b.accent, color: b.dark ? b.ink : '#fff', fontSize: 16, fontWeight: 500,
        fontFamily: b.fontUi, cursor: 'pointer',
      }}>See what's new this week</button>
      <div style={{ fontSize: 12, color: b.mute, marginTop: 18 }}>
        Don't want messages? Reply STOP to opt out anytime.
      </div>
    </div>
  );
}

// ─── WhatsApp preview (out-of-app touchpoint) ────────────
function S10_WhatsApp({ b }) {
  return (
    <div style={{ height: '100%', background: '#ECE5DD', padding: '60px 0 0', display: 'flex', flexDirection: 'column' }}>
      <div style={{ background: '#075E54', padding: '12px 16px 14px', display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'white' }}>←</span>
        <div style={{ width: 36, height: 36, borderRadius: '50%', background: b.accent, display: 'flex', alignItems: 'center', justifyContent: 'center', color: b.dark ? b.ink : '#fff', fontFamily: b.fontDisplay, fontSize: 18 }}>{b.name[0]}</div>
        <div>
          <div style={{ color: 'white', fontSize: 16, fontWeight: 500 }}>{b.name}</div>
          <div style={{ color: 'rgba(255,255,255,0.7)', fontSize: 11 }}>Business · online</div>
        </div>
      </div>
      <div style={{ flex: 1, padding: '20px 12px', display: 'flex', flexDirection: 'column', gap: 10, overflow: 'auto' }}>
        <div style={{ textAlign: 'center', fontSize: 11, color: '#54656F', background: 'rgba(225, 245, 254, 0.92)', padding: '4px 10px', borderRadius: 7, alignSelf: 'center' }}>
          TODAY
        </div>
        <div style={{ alignSelf: 'flex-start', background: 'white', maxWidth: '82%', padding: '10px 12px', borderRadius: 8, boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 14.5, color: '#111', lineHeight: 1.4 }}>
            Hey Priya 👋<br/><br/>
            Welcome to <b>{b.name}</b>. Your first visit just counted — <b>1 of {b.loopTotal}</b> toward your free {b.rewardName.toLowerCase().replace('free ', '')}.
          </div>
          <div style={{ fontSize: 10, color: '#667781', textAlign: 'right', marginTop: 4 }}>9:42 AM ✓✓</div>
        </div>
        <div style={{ alignSelf: 'flex-start', background: 'white', maxWidth: '82%', padding: '10px 12px', borderRadius: 8, boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 14.5, color: '#111', lineHeight: 1.4 }}>
            You're 2 visits away — <b>{b.rewardName.toLowerCase()}</b> almost yours. See you this week?
          </div>
          <div style={{ fontSize: 10, color: '#667781', textAlign: 'right', marginTop: 4 }}>Yesterday ✓✓</div>
        </div>
        <div style={{ alignSelf: 'flex-start', background: 'white', maxWidth: '82%', padding: '10px 12px', borderRadius: 8, boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
          <div style={{ fontSize: 14.5, color: '#111', lineHeight: 1.45 }}>
            🎉 Your <b>{b.rewardName}</b> is ready!<br/><br/>
            Show this code at the counter:<br/>
            <span style={{ fontFamily: '"Geist Mono", monospace', fontSize: 18, letterSpacing: 3, color: b.accentInk }}>{b.coupon}</span><br/><br/>
            Valid for 14 days · single use.
          </div>
          <div style={{ fontSize: 10, color: '#667781', textAlign: 'right', marginTop: 4 }}>Just now ✓✓</div>
        </div>
      </div>
    </div>
  );
}

// ─── Screen index ────────────────────────────────────────
window.CUSTOMER_SCREENS = [
  { id: '01', title: 'QR landing',       desc: 'Hook + one CTA. Reward visible before signup.',     Comp: S01_Landing },
  { id: '02', title: 'Phone entry',      desc: 'One field. No name, no email.',                     Comp: S02_Phone },
  { id: '03', title: 'WhatsApp OTP',     desc: '6 digits via WhatsApp, not SMS.',                   Comp: S03_OTP },
  { id: '04', title: 'Welcome moment',   desc: 'Endowed progress — 1/n already, never zero.',       Comp: S04_Welcome },
  { id: '05', title: 'Dashboard',        desc: 'Progress + 3 activities + reward. Returning view.', Comp: S05_Dashboard },
  { id: '06', title: 'Activity submit',  desc: 'Async verification with instant acknowledgement.',  Comp: S06_Activity },
  { id: '07', title: 'Reward unlocked',  desc: 'Full-screen celebration. Brand-coloured.',          Comp: S07_Unlocked },
  { id: '08', title: 'Coupon',           desc: '6-digit code. Phone-bound. Single use.',            Comp: S08_Coupon },
  { id: '09', title: 'Win-back · D30',   desc: 'Loss-aversion message. Progress still alive.',      Comp: S09_Winback },
  { id: '10', title: 'WhatsApp thread',  desc: 'How the trigger sequence actually reads.',          Comp: S10_WhatsApp },
];
