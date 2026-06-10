/* ══ main.js — rendering + all interactions ═══════════════════════════ */
'use strict';

// ── SVG arch diagram templates ──────────────────────────────────────────
function archSVG(id) {
  if (id === 'synthesis') return `
    <svg viewBox="0 0 520 215" role="img" aria-label="Synthesis architecture">
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#5a4f3d"/></marker></defs>
      <text x="10" y="16" class="acap">Prerequisite DAG</text>
      <circle cx="40" cy="64" r="18" class="an lit"/><text x="40" y="68" text-anchor="middle" class="anl w">A</text>
      <circle cx="120" cy="48" r="18" class="an lit"/><text x="120" y="52" text-anchor="middle" class="anl w">B</text>
      <circle cx="120" cy="100" r="18" class="an"/><text x="120" y="104" text-anchor="middle" class="anl">C</text>
      <circle cx="200" cy="74" r="18" class="an"/><text x="200" y="78" text-anchor="middle" class="anl">D</text>
      <path d="M58,58 L102,51" class="aedge"/><path d="M58,70 L102,96" class="aedge"/>
      <path d="M138,54 L182,66" class="aedge"/><path d="M138,96 L182,80" class="aedge"/>
      <circle cx="14" cy="143" r="8" class="an lit"/><text x="28" y="147" class="acap">mastered</text>
      <circle cx="14" cy="163" r="8" class="an"/><text x="28" y="167" class="acap">pending / locked</text>
      <text x="295" y="16" class="acap">Update Loop</text>
      <rect x="295" y="28" width="210" height="28" rx="14" class="aloop"/><text x="400" y="47" text-anchor="middle" class="anl">learner answers question</text>
      <path d="M400,56 L400,72" class="aedge"/>
      <rect x="295" y="74" width="210" height="28" rx="14" class="aloop"/><text x="400" y="93" text-anchor="middle" class="anl">BKT updates mastery score</text>
      <path d="M400,102 L400,118" class="aedge"/>
      <rect x="295" y="120" width="210" height="28" rx="14" class="aloop"/><text x="400" y="139" text-anchor="middle" class="anl">DAG unlocks next concept</text>
      <path d="M400,148 L400,164" class="aedge"/>
      <rect x="295" y="166" width="210" height="28" rx="14" class="aloop"/><text x="400" y="185" text-anchor="middle" class="anl">SM-2 schedules next review</text>
      <path d="M295,180 C240,210 195,168 138,102" class="aedge"/>
    </svg>`;
  if (id === 'possah') return `
    <svg viewBox="0 0 520 200" role="img" aria-label="Possah architecture">
      <defs><marker id="ar" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0,0 L6,3 L0,6 Z" fill="#5a4f3d"/></marker></defs>
      <text x="10" y="16" class="acap">3-Layer Supabase Client</text>
      <rect x="10" y="26" width="140" height="26" rx="5" class="an"/><text x="80" y="43" text-anchor="middle" class="anl">public.ts (browser)</text>
      <rect x="10" y="64" width="140" height="26" rx="5" class="an"/><text x="80" y="81" text-anchor="middle" class="anl">server.ts (API routes)</text>
      <rect x="10" y="102" width="140" height="26" rx="5" class="an lit"/><text x="80" y="119" text-anchor="middle" class="anl w">admin.ts (webhooks)</text>
      <path d="M80,52 L80,64" class="aedge"/><path d="M80,90 L80,102" class="aedge"/>
      <text x="10" y="152" class="acap">Permission scope</text>
      <text x="10" y="166" class="acap" style="fill:var(--ck)">public → anon key · server → service role (scoped) · admin → full service</text>
      <text x="300" y="16" class="acap">Payment Flow</text>
      <rect x="300" y="26" width="200" height="26" rx="13" class="aloop"/><text x="400" y="43" text-anchor="middle" class="anl">client checkout intent</text>
      <path d="M400,52 L400,64" class="aedge"/>
      <rect x="300" y="64" width="200" height="26" rx="13" class="aloop"/><text x="400" y="81" text-anchor="middle" class="anl">server re-validates price</text>
      <path d="M400,90 L400,102" class="aedge"/>
      <rect x="300" y="102" width="200" height="26" rx="13" class="aloop"/><text x="400" y="119" text-anchor="middle" class="anl">Razorpay order created</text>
      <path d="M400,128 L400,140" class="aedge"/>
      <rect x="300" y="140" width="200" height="26" rx="13" class="aloop"/><text x="400" y="157" text-anchor="middle" class="anl">webhook + idempotency guard</text>
      <path d="M400,166 L400,178" class="aedge"/>
      <rect x="300" y="178" width="200" height="22" rx="11" class="an lit"/><text x="400" y="193" text-anchor="middle" class="anl w">order fulfilled</text>
    </svg>`;
  return '';
}

// ── Build one featured card face ────────────────────────────────────────
function buildCardFace(p, i) {
  return `
    <article class="pcard rv d${Math.min(i + 1, 6)}" data-id="${p.id}" tabindex="0" role="button" aria-label="Open ${p.name} case study">
      <div class="sheet">
        <div class="creases"></div>
        <div class="crease-v"></div>
        <div class="dogear"></div>
        <div class="pc-face">
          <span class="pc-idx">${p.num} — ${p.label}</span>
          <span class="pc-meta">${p.meta}</span>
          <h2 class="pc-ptitle">${p.category}</h2>
          <p class="pc-tease">${p.tease}</p>
          <div class="pc-spacer"></div>
          <div class="pc-spill">
            <span class="pc-status ${p.status.cls}">${p.status.text}</span>
            <button class="pc-arrow">Open case study ↗</button>
          </div>
        </div>
      </div>
    </article>`;
}

// ── Build one mini project card ─────────────────────────────────────────
function buildMiniCard(p, i) {
  return `
    <div class="mini rv d${Math.min(i + 1, 6)}">
      <div class="mname">${p.name}${p.pill ? `<span class="mpill">${p.pill}</span>` : ''}</div>
      <div class="mdesc">${p.desc}</div>
      <div class="mstack">${p.stack}</div>
      <a class="mlink" href="${p.link}" target="_blank" rel="noopener">${p.linkText}</a>
    </div>`;
}

// ── Build one experience item ───────────────────────────────────────────
function buildExpItem(e, i) {
  return `
    <div class="exp-item rv d${Math.min((i % 3) + 1, 6)}">
      <div>
        <div class="exp-role">${e.role}</div>
        <div class="exp-org">${e.org}</div>
        <div class="exp-period">${e.period}</div>
        <span class="exp-badge ${e.type}">${e.type === 'formal' ? 'Role' : 'Venture'}</span>
      </div>
      <div>
        <ul class="exp-bullets">${e.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
        ${e.highlight ? `<div class="exp-hl">${e.highlight}</div>` : ''}
      </div>
    </div>`;
}

// ── Populate overlay with project data ──────────────────────────────────
function populateOverlay(p) {
  document.getElementById('ov-idx').textContent = `${p.num} — ${p.label}`;
  document.getElementById('ov-title').textContent = p.category;
  document.getElementById('ov-meta').textContent = p.meta;

  // TOP panel
  const top = document.getElementById('ov-top');
  top.innerHTML = `
    <div class="ov-shade"></div>
    <p class="ov-lead">${p.lead}</p>
    <ul class="ov-bullets">${p.bullets.map(b => `<li>${b}</li>`).join('')}</ul>
    <div class="ov-why">
      <span class="ov-why-label">Why it was built</span>
      <p>${p.why}</p>
    </div>`;

  // CENTER panel — demo
  const center = document.getElementById('ov-center');
  if (p.demo) {
    center.innerHTML = `
      <div class="ov-demo-shell">
        <div class="ov-demo-bar">
          <span class="ov-tl" style="background:#ff5f57"></span>
          <span class="ov-tl" style="background:#febc2e"></span>
          <span class="ov-tl" style="background:#28c840"></span>
          <span class="ov-url">${p.demo.label}</span>
        </div>
        <div class="ov-demo-cta">
          <a class="ov-lnk solid" href="${p.demo.url}" target="_blank" rel="noopener">Open live site ↗</a>
        </div>
      </div>`;
  } else {
    center.innerHTML = `
      <div class="ov-demo-placeholder">
        <span class="plbl">Live demo coming soon</span>
        ${p.links.filter(l => l.solid).map(l => `<a class="ov-lnk solid" href="${l.href}" target="_blank" rel="noopener">${l.text}</a>`).join('')}
      </div>`;
  }

  // BOTTOM panel — arch + stack
  const bottom = document.getElementById('ov-bottom');
  const hasSVG = p.arch && p.arch.svg;
  bottom.innerHTML = `
    <div class="ov-shade"></div>
    ${hasSVG ? `
    <div class="ov-arch-section">
      <div class="ov-arch-label">How it works — the engine</div>
      <div class="ov-arch-box">${archSVG(p.arch.svg)}</div>
      <p class="ov-arch-note">${p.arch.caption}</p>
    </div>` : ''}
    <div class="ov-footer">
      <div class="ov-chips">${p.stack.map(s => `<span class="ov-chip">${s}</span>`).join('')}</div>
      <div class="ov-links">
        ${p.links.map(l => `<a class="ov-lnk${l.solid ? ' solid' : ''}" href="${l.href}" target="_blank" rel="noopener">${l.text}</a>`).join('')}
        <button class="ov-close-btn" id="ov-close-bottom">✕ Close</button>
      </div>
    </div>`;

  // re-wire the close button inside bottom panel
  document.getElementById('ov-close-bottom')?.addEventListener('click', closeOverlay);
}

// ── Overlay open / close ────────────────────────────────────────────────
const overlay    = document.getElementById('card-overlay');
const ovBackdrop = document.getElementById('ov-backdrop');
const ovCloseX   = document.getElementById('ov-close-x');
const ovHandle   = document.getElementById('ov-handle');

function openOverlay(projectId, sourceEl) {
  const p = featuredProjects.find(x => x.id === projectId);
  if (!p) return;
  populateOverlay(p);

  const ovCard = document.getElementById('ov-card');

  if (sourceEl) {
    const rect    = sourceEl.getBoundingClientRect();
    const centerX = window.innerWidth  / 2;
    const centerY = window.innerHeight / 2;
    const fromX   = (rect.left + rect.width  / 2) - centerX;
    const fromY   = (rect.top  + rect.height / 2) - centerY;
    const ovW     = Math.min(1080, window.innerWidth - 48);
    const fromS   = rect.width / ovW;

    ovCard.style.transition = 'none';
    ovCard.style.transform  = `translate(${fromX}px,${fromY}px) scale(${fromS})`;
    ovCard.style.opacity    = '0.55';
  }

  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  overlay.scrollTop = 0;

  requestAnimationFrame(() => requestAnimationFrame(() => {
    ovCard.style.transition = '';
    ovCard.style.transform  = '';
    ovCard.style.opacity    = '';
  }));

  ovCloseX.focus();
}

let _closing = false;
function closeOverlay() {
  if (_closing) return;
  _closing = true;
  const ovCard = document.getElementById('ov-card');

  // freeze flaps in current position during shrink-out
  const outers = overlay.querySelectorAll('.ov-top-outer,.ov-bottom-outer');
  const panels  = overlay.querySelectorAll('.ov-top,.ov-bottom');
  outers.forEach(el => el.style.transition = 'none');
  panels.forEach(el => el.style.transition  = 'none');

  ovCard.style.transition = 'transform 0.28s cubic-bezier(.5,0,.4,1.25), opacity 0.22s ease';
  ovCard.style.transform  = 'scale(0.9) translateY(14px)';
  ovCard.style.opacity    = '0';

  setTimeout(() => {
    overlay.classList.remove('active');
    document.body.style.overflow = '';
    ovCard.style.transition = 'none';
    ovCard.style.transform  = '';
    ovCard.style.opacity    = '';
    requestAnimationFrame(() => requestAnimationFrame(() => {
      outers.forEach(el => el.style.transition = '');
      panels.forEach(el => el.style.transition  = '');
      ovCard.style.transition = '';
      _closing = false;
    }));
  }, 300);
}

ovBackdrop?.addEventListener('click', closeOverlay);
ovCloseX?.addEventListener('click', closeOverlay);
ovHandle?.addEventListener('click', closeOverlay);
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeOverlay(); });

// ── Render featured cards ───────────────────────────────────────────────
const projGrid = document.getElementById('proj-grid');
if (projGrid) {
  projGrid.innerHTML = featuredProjects.map(buildCardFace).join('');
  projGrid.querySelectorAll('.pcard').forEach(card => {
    const id = card.dataset.id;
    card.addEventListener('click', () => openOverlay(id, card));
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openOverlay(id, card); }
    });
  });
}

// ── Render mini projects ────────────────────────────────────────────────
const miniGrid = document.getElementById('mini-grid');
if (miniGrid) miniGrid.innerHTML = otherProjects.map(buildMiniCard).join('');

// ── Render experience ───────────────────────────────────────────────────
const formalList  = document.getElementById('exp-formal-list');
const ventureList = document.getElementById('exp-venture-list');
if (formalList)  formalList.innerHTML  = experiences.filter(e => e.type === 'formal').map(buildExpItem).join('');
if (ventureList) ventureList.innerHTML = experiences.filter(e => e.type === 'venture').map((e,i) => buildExpItem(e,i)).join('');

// ── Custom cursor (dot only) ────────────────────────────────────────────
const dot = document.querySelector('.cur-dot');
if (dot) {
  document.addEventListener('mousemove', e => {
    dot.style.left = e.clientX + 'px';
    dot.style.top  = e.clientY + 'px';
  });
}

// ── Scroll progress bar ─────────────────────────────────────────────────
const progressBar = document.getElementById('progress-bar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const pct = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100;
    progressBar.style.width = Math.min(pct, 100) + '%';
  }, { passive: true });
}

// ── Counter / float animations ──────────────────────────────────────────
function animateCounter(el) {
  const raw   = el.dataset.count || '';
  const float = el.dataset.float || '';
  if (!raw && !float) return;
  const isFloat = !!float;
  const target  = isFloat ? parseFloat(float) : parseInt(raw);
  const suffix  = isFloat ? '' : (raw.replace(/[0-9]/g, ''));
  const dur     = 1400;
  const start   = performance.now();
  (function tick(now) {
    const t   = Math.min((now - start) / dur, 1);
    const ease = 1 - Math.pow(1 - t, 3);
    const val  = isFloat ? (target * ease).toFixed(1) : Math.round(target * ease);
    el.textContent = val + suffix;
    if (t < 1) requestAnimationFrame(tick);
  })(start);
}

// ── Scroll reveal (IntersectionObserver) ───────────────────────────────
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      const mn = entry.target.querySelector('[data-count],[data-float]');
      if (mn) animateCounter(mn);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.rv,.rv-l').forEach(el => revealObserver.observe(el));
// also observe metric containers
document.querySelectorAll('.metric').forEach(el => revealObserver.observe(el));

// ── Nav active link ─────────────────────────────────────────────────────
const sections   = document.querySelectorAll('section[id], div[id]');
const navLinks   = document.querySelectorAll('.nav-links a');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === '#' + entry.target.id));
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });
sections.forEach(s => activeObserver.observe(s));

// ── Magnetic buttons ────────────────────────────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = e.clientX - (r.left + r.width  / 2);
    const dy = e.clientY - (r.top  + r.height / 2);
    btn.style.transform = `translate(${dx * .18}px, ${dy * .22}px)`;
  });
  btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
