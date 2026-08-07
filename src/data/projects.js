export const projects = [
  {
    slug: 'synaptic',
    name: 'Synaptic',
    tagline: 'Adaptive learning engine that personalizes what you study next',
    category: 'Adaptive Learning System',
    tier: 'featured',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://synaptic-adaptive-learning.vercel.app/demo',
    urlLabel: 'synaptic-adaptive-learning.vercel.app',
    sourceUrl: 'https://github.com/sujeth-dev/ai-learning-platfrom',
    stack: ['Next.js', 'TypeScript', 'SQLite', 'React Flow', 'JWT'],
    tease: 'Curricula as dependency graphs, not playlists — learners only reach what they\'re genuinely ready for.',
    lead: 'Personalizes what you study next — so time goes where learning is actually needed.',
    problem:
      'Most platforms move every student through the same fixed curriculum. There\'s no adaptation — everyone gets the same path regardless of what they already know or struggle with.',
    solution:
      'Synaptic routes each learner through only what they actually need — the right concept, at the right time. Three interlocking systems (prerequisite DAG, Bayesian Knowledge Tracing, and SM-2 spaced repetition) work as one coherent loop.',
    highlights: [
      '31-node prerequisite graph — each concept has defined dependencies; you can\'t reach D without mastering A → B → C.',
      'Bayesian Knowledge Tracing — probabilistic mastery across 5 states (ready / learning / fragile / mastered / blocked); updates on every answer.',
      'SM-2 spaced repetition — review scheduling so retention compounds over time instead of cramming.',
      'Interactive React Flow knowledge maps that visualize topic dependencies, with custom knowledge-graph data structures modeling learner progression.',
    ],
    architecture: {
      svg: 'synaptic',
      caption:
        'Three systems that have to agree: the DAG controls what\'s reachable, BKT decides what\'s mastered, and SM-2 decides when it returns.',
    },
    decisions:
      'The hard part wasn\'t any one algorithm; it was making all three systems agree as one coherent loop, not three features bolted on. Each system had to feed back into the others — mastery changes unlock new DAG paths, which create new SM-2 scheduling entries.',
    result: 'Live demo with full adaptive engine running client-side. Demonstrates the complete learning loop.',
    reflection:
      'Building three interconnected state machines taught me more about system design than any course could. The constraint of making them work together — not just independently — forced genuinely thoughtful architecture.',
    year: '2024–2025',
    role: 'Solo Engineer',
    visual: { theme: 'knowledge-machine', accent: '#1B57A6' },
  },
  {
    slug: 'possah',
    name: 'Possah',
    tagline: 'Production e-commerce platform for a live apparel brand',
    category: 'Production Commerce Platform',
    tier: 'featured',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://thepossah.com',
    urlLabel: 'thepossah.com',
    sourceUrl: 'https://github.com/sujeth-dev/Possah',
    stack: ['Next.js', 'TypeScript', 'Supabase', 'Razorpay', 'Sentry', 'Playwright', 'Vitest'],
    tease: 'Real money in, real errors caught, real flows verified — the full lifecycle, not just a cart.',
    lead: 'A commerce backend built to be production-safe — idempotent payments, real-time inventory, and 24 schema migrations without downtime.',
    problem:
      'Most hobby commerce projects fake the hard parts — mock payments, no real inventory sync, no webhook reliability. The business needed a platform that handled real money safely.',
    solution:
      'Built as if the business depended on it: every payment path has a failure mode handled, every webhook has an idempotency key, and every DB change has a migration script.',
    highlights: [
      '3-layer Supabase client — server.ts / public.ts / admin.ts — each with scoped permissions so client code can never touch restricted tables.',
      'Razorpay server-side price re-validation — client-sent amount is always re-checked against the DB before capture.',
      'Idempotency guard on webhooks — duplicate delivery can\'t double-fulfil an order; the guard is a DB-level constraint.',
      'Playwright end-to-end and Vitest unit suites covering checkout, auth, and order flows, catching regressions before release.',
    ],
    architecture: {
      svg: 'possah',
      caption:
        'Three layers of database access ensure every caller has exactly the permissions it needs. The payment flow adds an extra re-validation step on the server.',
    },
    decisions:
      'Chose additive-only migrations over destructive ones — harder to manage but zero-downtime guarantee. Idempotency keys are DB constraints, not application-level checks, because the database is the last line of defense.',
    result: 'Live commerce platform processing real transactions for a Bangalore apparel brand.',
    reflection:
      'Possah taught me that the distance between "works in demo" and "works in production" is enormous. Every edge case — duplicate webhooks, race conditions on inventory, partial payment failures — required its own carefully designed guard.',
    year: '2024–2025',
    role: 'Solo Engineer',
    visual: { theme: 'payment-terminal', accent: '#E2402D' },
  },
  {
    slug: 'velmont',
    name: 'Velmont Design Studio',
    tagline: 'Website and admin panel for a B2B interior contracting firm',
    category: 'Client Platform',
    tier: 'featured',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://velmontdesign.com',
    urlLabel: 'velmontdesign.com',
    sourceUrl: 'https://github.com/sujeth-dev/Velmont',
    stack: ['HTML', 'CSS', 'JavaScript', 'Firebase', 'Vercel'],
    tease: 'Complete business platform — public site, admin panel, and self-serve content management.',
    lead: 'Built as a complete business platform — not just a website, but the tools the client uses daily to manage their business.',
    problem:
      'A design consultancy needed more than a portfolio site — they needed project management, client communication, and content updates without developer dependency.',
    solution:
      'Delivered a dual-interface platform: a polished public site for clients and prospects, plus a private admin dashboard for the studio team to manage projects and content.',
    highlights: [
      'Dual-interface architecture — public-facing site and private admin dashboard sharing the same Firebase backend.',
      'Secure admin panel letting the client add, edit, publish, and unpublish projects and upload images independently.',
      'Auto-scrolling portfolio carousel, contact form, and responsive layouts.',
      'Firestore security rules scoping read/write access per user role.',
    ],
    architecture: null,
    decisions:
      'Firebase over a custom backend because the client needed to manage content independently without technical support. The tradeoff was less flexibility in queries, but the real-time sync and built-in auth were worth it for this use case.',
    result: 'Delivered and deployed. Client uses the admin panel daily for business operations.',
    reflection:
      'First paid client project that went beyond "build and hand off." Had to think about the client as a daily user, not just a launch audience.',
    year: '2025',
    role: 'Freelance Engineer',
    visual: { theme: 'blueprint', accent: '#2A8C4A' },
  },
  {
    slug: 'zingara',
    name: 'Zingara',
    tagline: 'Digital home for a Bangalore restaurant — designed to drive orders',
    category: 'Business Web Product',
    tier: 'secondary',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://zingararestaurant.co.in',
    urlLabel: 'zingararestaurant.co.in',
    sourceUrl: 'https://github.com/sujeth-dev/Zingara-website',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    tease: 'Every CTA points to WhatsApp, Swiggy, or Zomato.',
    lead: 'Built to convert visitors into orders — every CTA points to WhatsApp, Swiggy, or Zomato.',
    problem:
      'A Bangalore restaurant with no digital presence was losing walk-in customers to competitors who were discoverable on Swiggy and Zomato.',
    solution:
      'Built a fast, credible page that makes it easy for a customer who just found them to take the next step. Single conversion goal — the entire layout funnels toward three actions.',
    highlights: [
      'Single conversion goal — funnels toward WhatsApp reservation, Swiggy order, Zomato order.',
      'Mobile-first — card layout and CTA sizing designed for thumb reach.',
      'Fast load — no JS framework, static HTML/CSS, images compressed and lazy-loaded.',
    ],
    architecture: null,
    decisions: null,
    result: 'Live. Restaurant has a discoverable digital presence for the first time.',
    reflection: null,
    year: '2024',
    role: 'Freelance',
    visual: { theme: 'storefront', accent: '#E2402D' },
  },
  {
    slug: 'fitness-garage',
    name: 'Fitness Garage',
    tagline: 'Gym website designed around one job — convert visitors into members',
    category: 'Business Web Product',
    tier: 'secondary',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://fitness-garage.in',
    urlLabel: 'fitness-garage.in',
    sourceUrl: 'https://github.com/sujeth-dev/Fitness-Garage',
    stack: ['HTML', 'CSS', 'JavaScript', 'Vercel'],
    tease: 'Every page designed around one job: convert visitors into members.',
    lead: 'One goal — turn a website visit into a gym enquiry. Every section moves toward that.',
    problem:
      'Independent gyms compete against franchises with polished marketing. Needed a site credible enough to convert visitors from search.',
    solution:
      'Lead-first layout with "Book a free trial" visible above the fold on every device. Proof sections answer objections before the CTA.',
    highlights: [
      '"Book a free trial" visible above the fold on every device.',
      'Proof sections — trainer bios, testimonials, equipment photos placed before the CTA.',
      'WhatsApp integration — direct link, lower friction than a form.',
    ],
    architecture: null,
    decisions: null,
    result: 'Live. Converts search traffic into gym enquiries.',
    reflection: null,
    year: '2024',
    role: 'Freelance',
    visual: { theme: 'storefront', accent: '#1B57A6' },
  },
  {
    slug: 'aivorain',
    name: 'Aivorain India',
    tagline: 'Professional digital presence for a B2B DYMO printer solutions provider',
    category: 'Business Website',
    tier: 'other',
    status: 'live',
    statusLabel: 'Live',
    url: 'https://www.aivoraindia.com/',
    urlLabel: 'aivoraindia.com',
    sourceUrl: null,
    stack: ['HTML', 'CSS', 'JavaScript'],
    tease: 'B2B digital presence structured for search discovery and enquiry.',
    lead: null,
    problem: null,
    solution: null,
    highlights: null,
    architecture: null,
    decisions: null,
    result: null,
    reflection: null,
    year: '2024',
    role: 'Freelance',
    visual: null,
  },
  {
    slug: 'gadget-store',
    name: 'Gadget Store',
    tagline: 'Full-stack commerce: Flutter app, React admin, Express backend',
    category: 'Full-Stack Commerce',
    tier: 'other',
    status: 'code',
    statusLabel: 'Code',
    url: null,
    urlLabel: null,
    sourceUrl: 'https://github.com/sujeth-dev/gadgetstore-flutter',
    stack: ['Flutter', 'React', 'Express'],
    tease: 'Flutter mobile app, React admin dashboard, Express backend off one API.',
    lead: null,
    problem: null,
    solution: null,
    highlights: null,
    architecture: null,
    decisions: null,
    result: null,
    reflection: null,
    year: '2024',
    role: 'Solo',
    visual: null,
  },
]

export const labProjects = [
  {
    slug: 'airdraw',
    name: 'AirDraw',
    tagline: 'Draw in mid-air — webcam tracks your fingertip and snaps the path to a clean shape',
    description: 'Computer vision experiment using MediaPipe hand tracking to let you draw shapes by moving your finger in front of a webcam. The system recognizes gestures, smooths the drawn path, and snaps it to the nearest geometric shape.',
    stack: ['React', 'MediaPipe', 'Canvas'],
    color: 'cobalt',
    url: 'https://github.com/sujeth-dev/Air-Flow',
    status: 'Experiment',
  },
  {
    slug: 'space-shooter',
    name: 'Space Shooter',
    tagline: 'Cross-platform arcade game with procedural spawning and persistent scoring',
    description: 'A classic shoot-em-up built with Flutter\'s Flame engine. Features procedural enemy spawning, collision detection, particle effects, and a persistent high score system across sessions.',
    stack: ['Flutter', 'Flame Engine'],
    color: 'red',
    url: null,
    status: 'Experiment',
  },
  {
    slug: 'blueprint-builder',
    name: 'Blueprint Builder',
    tagline: 'Turns messy client requirements into structured specs and implementation prompts',
    description: 'A developer tool that takes unstructured project briefs and transforms them into clean specifications with actionable implementation steps. Built to solve my own problem of translating vague client requests into buildable plans.',
    stack: ['Next.js', 'TypeScript', 'Supabase'],
    color: 'yellow',
    url: 'https://web-builder-1-six.vercel.app/',
    status: 'Live',
    sourceUrl: 'https://github.com/sujeth-dev/Web_builder_1',
  },
  {
    slug: 'reviewboost',
    name: 'ReviewBoost',
    tagline: 'QR-based platform helping businesses convert happy customers into reviews',
    description: 'Generates branded QR codes for local businesses. When scanned by a happy customer, it streamlines the review process by routing them directly to the right Google/Yelp review page with pre-filled context.',
    stack: ['Next.js', 'Supabase'],
    color: 'red',
    url: null,
    status: 'Building',
    sourceUrl: 'https://github.com/sujeth-dev/Review_System',
  },
]

export function getFeatured() {
  return projects.filter((p) => p.tier === 'featured')
}

export function getSecondary() {
  return projects.filter((p) => p.tier === 'secondary')
}

export function getOther() {
  return projects.filter((p) => p.tier === 'other')
}

export function getBySlug(slug) {
  return projects.find((p) => p.slug === slug)
}
