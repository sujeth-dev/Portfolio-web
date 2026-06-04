// ══ data.js — edit this file to add / update projects and experience ══
// To add a featured project: push one object to featuredProjects
// To add a mini project:     push one object to otherProjects
// To add an experience:      push one object to experiences

const featuredProjects = [
  {
    id: 'synthesis',
    num: '01',
    label: 'featured',
    category: 'Adaptive Learning System',
    name: 'Synthesis',
    meta: 'Synthesis · Solo',
    status: { cls: 'live', text: 'Live' },
    tease: 'Curricula as dependency graphs, not playlists — learners only reach what they\'re genuinely ready for.',
    lead: 'Personalizes <em>what you study next</em> — so time goes where learning is actually needed.',
    bullets: [
      '<b>31-node prerequisite graph</b> — each concept has defined dependencies; you can\'t reach D without mastering A → B → C.',
      '<b>Bayesian Knowledge Tracing</b> — probabilistic mastery across 5 states (ready / learning / fragile / mastered / blocked); updates on every answer.',
      '<b>SM-2 spaced repetition</b> — review scheduling so retention compounds over time instead of cramming before an exam.',
      '<b>Motivation FSM</b> — 4-state machine (neutral / winning / bored / frustrated) adapts encouragement overlays to your streak in real time.',
    ],
    why: 'Most platforms move every student through the same fixed curriculum. Synthesis routes each learner through only what they actually need — the right concept, at the right time. The hard part wasn\'t any one algorithm; it was making all three systems agree as one coherent loop, not three features bolted on.',
    demo: {
      url: 'https://synthesis-adaptive-learning.vercel.app/demo',
      label: 'synthesis-adaptive-learning.vercel.app/demo',
    },
    arch: {
      caption: 'Three systems that have to agree: the <strong>DAG</strong> controls what\'s reachable, <strong>BKT</strong> decides what\'s mastered, and <strong>SM-2</strong> decides when it returns. The feedback loop back to the graph is what makes it a real adaptive engine, not three features running in parallel.',
      svg: 'synthesis',
    },
    stack: ['Next.js 14', 'TypeScript', '@xyflow/react', 'dagre', 'SQLite', 'JWT'],
    links: [
      { text: 'Live demo ↗', href: 'https://synthesis-adaptive-learning.vercel.app/demo', solid: true },
      { text: 'Code ↗', href: 'https://github.com/sujeth-dev', solid: false },
    ],
  },
  {
    id: 'possah',
    num: '02',
    label: 'featured',
    category: 'Production Commerce Platform',
    name: 'Possah',
    meta: 'Possah · thepossah.com',
    status: { cls: 'live', text: 'Live' },
    tease: 'Real money in, real errors caught, real flows verified — the full lifecycle, not just a cart.',
    lead: 'A commerce backend built to be <em>production-safe</em> — idempotent payments, real-time inventory, and 24 schema migrations without downtime.',
    bullets: [
      '<b>3-layer Supabase client</b> — server.ts / public.ts / admin.ts — each with scoped permissions so client code can never touch restricted tables.',
      '<b>Razorpay server-side price re-validation</b> — client-sent amount is always re-checked against the DB before capture; manipulation is structurally impossible.',
      '<b>Idempotency guard on webhooks</b> — duplicate delivery can\'t double-fulfil an order; the guard is a DB-level constraint, not an application check.',
      '<b>24 schema migrations, zero downtime</b> — additive-only migrations on Supabase Postgres; rollback path documented for each.',
    ],
    why: 'Most hobby commerce projects fake the hard parts — mock payments, no real inventory sync, no webhook reliability. Possah was built as if the business depended on it: every payment path has a failure mode handled, every webhook has an idempotency key, and every DB change has a migration script.',
    demo: {
      url: 'https://thepossah.com',
      label: 'thepossah.com',
    },
    arch: {
      caption: 'Three layers of database access ensure every caller has exactly the permissions it needs. The payment flow adds an extra re-validation step on the server — amount, SKU, and stock are all re-checked before the charge is captured.',
      svg: 'possah',
    },
    stack: ['Next.js 14', 'TypeScript', 'Supabase', 'Razorpay', 'Postgres', 'Row-Level Security'],
    links: [
      { text: 'Live site ↗', href: 'https://thepossah.com', solid: true },
      { text: 'Code ↗', href: 'https://github.com/sujeth-dev', solid: false },
    ],
  },
  {
    id: 'zingara',
    num: '03',
    label: 'paid client',
    category: 'Restaurant Website',
    name: 'Zingara',
    meta: 'Zingara · zingararestaurant.co.in',
    status: { cls: 'client', text: 'Paid Client' },
    tease: 'A digital home for a Bangalore restaurant, designed to drive customers to WhatsApp, Swiggy, and Zomato.',
    lead: 'Built to <em>convert visitors into orders</em> — every CTA points to WhatsApp, Swiggy, or Zomato.',
    bullets: [
      '<b>Single conversion goal</b> — the entire layout funnels toward three actions: WhatsApp reservation, Swiggy order, Zomato order.',
      '<b>Mobile-first</b> — most restaurant traffic is mobile; the card layout and CTA sizing were designed for thumb reach first.',
      '<b>Fast load</b> — no JS framework, static HTML/CSS, images compressed and lazy-loaded.',
    ],
    why: 'A Bangalore restaurant with no digital presence was losing walk-in customers to competitors who were discoverable on Swiggy and Zomato. The brief was simple: build a fast, credible page that makes it easy for a customer who just found them to take the next step.',
    demo: {
      url: 'https://zingararestaurant.co.in',
      label: 'zingararestaurant.co.in',
    },
    arch: null,
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    links: [
      { text: 'Live site ↗', href: 'https://zingararestaurant.co.in', solid: true },
    ],
  },
  {
    id: 'fitness',
    num: '04',
    label: 'paid client',
    category: 'Gym Website',
    name: 'Fitness Garage',
    meta: 'Fitness Garage · fitness-garage.in',
    status: { cls: 'client', text: 'Paid Client' },
    tease: 'Every page designed around one job: convert visitors into members.',
    lead: '<em>One goal</em> — turn a website visit into a gym enquiry. Every section moves toward that.',
    bullets: [
      '<b>Lead-first layout</b> — "Book a free trial" is visible above the fold on every device.',
      '<b>Proof sections</b> — trainer bios, member testimonials, and equipment photos placed to answer objections before the CTA.',
      '<b>WhatsApp integration</b> — direct link to the gym\'s number; lower friction than a form for the target audience.',
    ],
    why: 'Independent gyms compete against franchises that have polished marketing. Fitness Garage needed a site that felt credible and professional enough to convert visitors who found them through search or a poster — with a CTA path simple enough that even someone just browsing would know what to do next.',
    demo: {
      url: 'https://fitness-garage.in',
      label: 'fitness-garage.in',
    },
    arch: null,
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    links: [
      { text: 'Live site ↗', href: 'https://fitness-garage.in', solid: true },
    ],
  },
];

const otherProjects = [
  {
    name: 'Blueprint Builder',
    desc: 'Turns messy client requirements into structured specifications and implementation-ready prompts.',
    stack: 'Next.js / TypeScript / Supabase',
    link: 'https://web-builder-1-six.vercel.app/',
    linkText: 'Live ↗',
    pill: null,
  },
  {
    name: 'Aivorain India',
    desc: 'First paid client website — deployed a professional presence for a DYMO printer solutions provider (B2B).',
    stack: 'HTML / CSS / JavaScript',
    link: 'https://www.aivoraindia.com/',
    linkText: 'Live ↗',
    pill: 'Paid client',
  },
  {
    name: 'Gadget Store',
    desc: 'Full-stack commerce: Flutter mobile app, React admin dashboard, Express backend off one API.',
    stack: 'Flutter / React / Express',
    link: 'https://github.com/sujeth-dev',
    linkText: 'Code ↗',
    pill: null,
  },
  {
    name: 'ReviewBoost',
    desc: 'QR-based platform helping businesses convert happy customers into public reviews.',
    stack: 'Next.js / Supabase',
    link: 'https://github.com/sujeth-dev',
    linkText: 'Code ↗',
    pill: null,
  },
  {
    name: 'AirDraw',
    desc: 'Browser tool to draw in mid-air — webcam tracks your fingertip and snaps the path to a clean preset shape.',
    stack: 'React / MediaPipe / Canvas',
    link: '#',
    linkText: 'Demo ↗',
    pill: null,
  },
  {
    name: 'Space Shooter',
    desc: 'Cross-platform arcade game with procedural spawning, progression, collision detection, and persistent scoring.',
    stack: 'Flutter / Flame Engine',
    link: 'https://github.com/sujeth-dev',
    linkText: 'Code ↗',
    pill: null,
  },
];

const experiences = [
  // ── Formal Roles ──────────────────────────────────────────────────────
  {
    role: 'Marketing Intern',
    org: 'Jobert Apparels Pvt Ltd',
    period: 'Apr 2025 – Oct 2025 · Bengaluru',
    type: 'formal',
    bullets: [
      'Developed 3 new sub-brand identities from scratch — names, logos, slogans tailored to distinct target audiences.',
      'Established the brand\'s complete customer-facing communication channels from zero.',
    ],
    highlight: null,
  },
  {
    role: 'Web Design & Content',
    org: 'Greek God Clothing',
    period: 'Jan 2025 – Apr 2025 · Bengaluru',
    type: 'formal',
    bullets: [
      'Led end-to-end lifecycle for the brand\'s first online store — concept, Figma prototyping, development, live deployment.',
      'Shaped the content calendar around product drops and managed the brand\'s digital presence.',
    ],
    highlight: null,
  },
  {
    role: 'Operations Team Lead',
    org: 'E-Cell, UVCE',
    period: 'Sep 2023 – May 2025 · Bengaluru',
    type: 'formal',
    bullets: [
      'Coordinated logistics, execution, outreach, and cross-functional teams for entrepreneurship events and innovation challenges.',
      'Drove 200+ participants to a case competition through structured planning and a focused content strategy.',
    ],
    highlight: null,
  },
  // ── Ventures ─────────────────────────────────────────────────────────
  {
    role: 'Greek God Clothing',
    org: 'Own Venture',
    period: '2025 · Bengaluru',
    type: 'venture',
    bullets: [
      'Ran a customized clothing venture end-to-end: fabric sourcing, design, marketing shoots, website, fulfilment.',
      'Scaled through targeted outreach to clubs, schools, and bulk orders.',
    ],
    highlight: '~₹50k / month at peak · customized bulk orders for clubs, schools & friends',
  },
  {
    role: 'Gain House',
    org: 'Gym Vending Venture',
    period: '2024–2025 · Bengaluru',
    type: 'venture',
    bullets: [
      'Identified gap: gyms lacked on-site protein shake availability. Negotiated machine placement with gym owners, ran operations.',
      'Shut down after identifying unsustainable margins and maintenance overhead — fast learning, clear exit.',
    ],
    highlight: 'Spotted gap → tested → cut losses when unit economics didn\'t work',
  },
  {
    role: 'Bun & Co',
    org: 'Food Stall',
    period: '2024 · Bengaluru',
    type: 'venture',
    bullets: [
      'Set up and ran a weekend food stall for 1+ months — mun maska, biscuit bun, chocolate bun.',
      'Handled sourcing, pricing, and customer operations directly. Learned the pace of physical commerce.',
    ],
    highlight: null,
  },
];
