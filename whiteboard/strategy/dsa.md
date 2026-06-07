# Blueprint: Placement Readiness — DSA + Interview Prep

> 55 problems done. Target: 200 by Aug 31. The key insight: your 13-bucket plan was built for someone learning web dev from scratch. You already know Buckets 4–8. Skip them. Focus your time where you actually have gaps.

---

## Revised Bucket Priority

| Bucket | Topic | Action |
|--------|-------|--------|
| 0 | Language Foundations | DONE (you code daily) |
| 1 | CS Fundamentals | LIGHT (1 hr/week, review only) |
| 2 | SQL | DONE (you use Supabase/Postgres daily) |
| **3** | **DSA** | **PRIMARY — 1 hr/day, every day** |
| 4 | Web Fundamentals | SKIP — you build production web apps |
| 5 | JS/TS Deep Dive | SKIP — you use TypeScript in every project |
| 6 | React/Next.js | SKIP — Next.js is your primary framework |
| 7 | Node/Backend | SKIP — you've built REST APIs with auth, queues, webhooks |
| 8 | Auth & Security | SKIP — you've implemented JWT, OAuth, RLS, idempotency |
| **9** | **System Design** | **BASICS ONLY — 1 hr/week** |
| 10 | AI/ML | SKIP for now — if time in Aug, do basics |
| **11** | **Project Defense** | **BUILD AS YOU SHIP — 30 min/week** |
| **12** | **Behavioral** | **30 min/week, Sunday** |
| 13 | Mock Interviews | START in Aug (Week 10+) |

**Why skip 4–8:** You have production evidence. You've built multi-tenant RLS, async queues, E2E tests, payment webhooks, and adaptive algorithms. Interviewers asking basic web questions will see your projects and move on. Your time is better spent on DSA and interview narrative.

---

## Bucket 3: DSA — The System

### Pattern Order (learn in this sequence)

1. **Arrays & Strings** (Week 1–2) — foundation, everything else builds on this
2. **HashMap / HashSet** (Week 2–3) — frequency counting, 2-sum variants
3. **Sliding Window** (Week 3) — subarray/substring problems
4. **Two Pointers** (Week 3–4) — sorted arrays, linked list problems
5. **Stack & Queue** (Week 4–5) — monotonic stack, next greater element
6. **Linked List** (Week 5) — fast/slow pointer, reversal
7. **Binary Search** (Week 6) — not just sorted arrays, apply to search space
8. **Trees** (Week 7–8) — BFS, DFS, BST properties, path problems
9. **Graphs** (Week 9–10) — BFS/DFS, topological sort, union-find
10. **Dynamic Programming** (Week 11–13) — 1D DP → 2D DP → classic problems

### Daily DSA Routine (1 hour, every day)

**Platform:** LeetCode (free tier is enough)

**How to pick problems:**
1. Open LeetCode → Filter: topic = [current pattern], difficulty = Easy/Medium
2. Do **1 Easy** (warm-up, ~10 min)
3. Do **2 Mediums** (core practice, ~20 min each)
4. Total: 3 problems per session

**The 20-minute rule:**
- If you're stuck for 20+ minutes with no progress → look at the solution approach (not full code)
- Implement it yourself after reading the approach
- Add it to your notes: "Pattern used: X. Trick: Y."

**After solving, ask yourself:**
- What pattern did this use?
- What was the key insight I missed?
- What's the time and space complexity?
- Could this be solved differently?

**Never skip the review.** Understanding why > solving by luck.

### DSA Notes Format (keep it simple)

For each pattern, maintain a note:
```
## [Pattern Name]

### When to use
[one sentence trigger]

### Template / approach
[pseudocode or key steps]

### Problems solved
- [Problem name] — [key insight]
- [Problem name] — [key insight]

### Watch out for
[edge cases, common mistakes]
```

### Weekly DSA targets

| Week | Pattern | Problems target |
|------|---------|----------------|
| 1 | Arrays & Strings | 15 |
| 2 | Arrays + HashMap | 15 |
| 3 | Sliding Window + Two Pointers | 15 |
| 4 | Stack & Queue | 12 |
| 5 | Linked List | 12 |
| 6 | Binary Search | 12 |
| 7 | Trees (BFS/DFS) | 15 |
| 8 | Trees (BST + paths) | 15 |
| 9 | Graphs (BFS/DFS) | 15 |
| 10 | Graphs (advanced) | 12 |
| 11 | DP (1D) | 15 |
| 12 | DP (2D + classics) | 15 |
| 13 | Review + mock problems | 12 |
| **Total new** | | **~170** |

55 done + ~170 new = **225 total** by end of summer. Target exceeded.

---

## Bucket 9: System Design — Basics Only (1 hr/week)

You don't need deep system design for SDE-I. You need to not freeze when asked.

**Topics to cover (6 weeks, 1 hr each):**

| Week | Topic |
|------|-------|
| 1 | URL shortener (hashing, redirects, analytics) |
| 2 | Rate limiter (token bucket, sliding window counter) |
| 3 | WhatsApp/messaging system (queues, delivery receipts) |
| 4 | Design a leaderboard (sorted sets, Redis) |
| 5 | Notification system (pub/sub, fan-out) |
| 6 | Design Loop itself (you built it — own this answer) |

**Framework for answering system design (always use this structure):**
1. Clarify requirements (functional + non-functional)
2. Estimate scale (users, requests/sec, storage)
3. High-level design (boxes and arrows)
4. Deep dive into 1–2 components
5. Identify bottlenecks + how to address

---

## Bucket 11: Project Defense — Own Your Work

For each major project, you must be able to:
- Explain it in 3 minutes (what it does, why, impact)
- Answer architecture questions ("why did you choose X over Y?")
- Answer scaling questions ("how would you handle 10x traffic?")
- Defend every decision ("why Supabase? why BullMQ? why WhatsApp?")

### Loop — 3-Minute Pitch
```
Loop is a WhatsApp-native loyalty platform for Indian restaurants. Restaurants 
sign up, get a branded QR code, and customers scan it to join their loyalty 
program — no app download needed. All communication happens via WhatsApp 
(85%+ open rates vs 15% email).

I built the full stack: Next.js frontend, Supabase for multi-tenant Postgres 
with row-level security, BullMQ for async WhatsApp message queuing, and Razorpay 
for subscriptions. The multi-tenancy is done at the DB level — each restaurant's 
data is isolated via RLS, not separate schemas.

Currently onboarding design-partner restaurants in Bangalore. Pricing starts at 
₹3,500/month.
```

**Architecture questions to prep:**
- Why Supabase over plain Postgres? (RLS, auth, realtime, storage in one platform)
- Why BullMQ for WhatsApp? (async, retry logic, rate limiting per BSP, decoupled from web server)
- How does multi-tenancy work? (tenant_id on every table, RLS policies enforce isolation at DB level)
- How would you scale to 1000 restaurants? (connection pooling, Supabase dedicated, Redis for sessions, CDN for QR assets)
- What would you do differently? (consider GraphQL for admin dashboard, better observability from day 1)

### Synthesis — 3-Minute Pitch
```
Synthesis is an adaptive learning platform that routes learners through 
personalized curricula using Bayesian Knowledge Tracing (BKT) + SM-2 
spaced repetition + a prerequisite dependency graph.

The core algorithm estimates a learner's knowledge state probabilistically — 
as they answer questions, BKT updates the probability they've mastered each 
concept. The prerequisite graph ensures they only see advanced concepts after 
prerequisites are mastered. SM-2 schedules review sessions at optimal intervals.

Built on Next.js + Supabase with a visualization layer using @xyflow/react.
```

### Possah — 3-Minute Pitch
```
Possah is a production e-commerce platform with real transactions. Customers 
can browse, add to cart, pay via Razorpay, and receive order confirmations. 
Inventory syncs in real-time across concurrent orders.

The interesting engineering: payment webhook idempotency at the DB constraint 
level (not application logic), server-side price re-validation to prevent 
client manipulation, 24 schema migrations on live Postgres without downtime, 
and a Playwright E2E test suite covering the full checkout flow.
```

---

## Bucket 12: Behavioral — 6 Stories to Prepare

Use **STAR format** for all of these: Situation → Task → Action → Result.

### The 6 Stories (prepare these, then reuse across all interviews)

**1. Built something from zero**
→ Use Loop. Designed the whole architecture, made every product decision, shipped solo.

**2. Solved a hard technical problem**
→ Use Synthesis BKT algorithm, OR the payment idempotency in Possah, OR the BullMQ async queue in Loop.

**3. Handled failure / setback**
→ A bug that broke something in production, a client project that had scope creep, something that didn't go as planned. Be specific.

**4. Worked under pressure / tight deadline**
→ Client project with hard deadline, college exam + shipping simultaneously, etc.

**5. Learned something new quickly**
→ A technology you had to pick up fast for a project (BKT algorithms, Bayesian math, Flutter/Flame engine).

**6. Made a decision with incomplete information**
→ A product decision for Loop (chose WhatsApp over email for notifications), a tech choice (Supabase over Firebase), a scope decision.

### Prep method:
- Write each story in STAR format (1 paragraph each)
- Record yourself saying it out loud — time it (should be 1.5–2 min each)
- Refine until it's tight and natural
- 30 min/week on behavioral (Sunday)

---

## Current State + Target

| Metric | Now | Target |
|--------|-----|--------|
| Problems solved | 55 | 200+ |
| Current streak | ? | Keep going |
| Weakest pattern | — | Identify by Week 3 |
| Project defense prepared | — | All 3 by Week 8 |
| Behavioral stories written | — | All 6 by Week 4 |
| Mock interviews done | 0 | 5+ (start Week 10) |
| System design topics covered | 0 | 6 (1/week) |
