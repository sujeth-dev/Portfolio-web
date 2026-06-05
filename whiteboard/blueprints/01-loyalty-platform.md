# Blueprint: Loop — Ship & Sell

> Design is done. Architecture is locked. This doc is about finishing the build, deploying, and getting real restaurants using it.

---

## Product Status

**Name:** Loop — Restaurant Retention Engine
**Stage:** MVP1 architecture complete. Code partially built. Deployment and outreach remaining.
**Stack confirmed:** Next.js + Supabase (Postgres + RLS) + BullMQ/Upstash Redis + Interakt/AiSensy (WhatsApp) + Razorpay + Vercel
**Market:** Bangalore-first. Independent restaurants. Anti-aggregator narrative.

### 22 Open Decisions — Top 5 Resolved

| ID | Decision | Resolved |
|----|----------|---------|
| D-001 | Shared WABA vs per-restaurant numbers | Shared for MVP1, per-number as Premium upsell P2 |
| D-002 | Static vs time-locked QR | Static MVP1, time-locked P2 |
| D-003 | Reward expiry | 14 days default, recommend by restaurant type |
| D-004 | Pricing model | Tiered + 6-month minimum + WhatsApp credit bundles |
| D-005 | Coupon format | Customer sees word-style (BREW-8K4), counter accepts both |

Remaining 17 decisions: deferred to Phase 2 or resolved during design-partner beta.

---

## MVP1 Build Completion Tracker

| Feature | Status |
|---------|--------|
| Multi-tenant Postgres schema + RLS | — |
| Restaurant onboarding wizard (4 steps) | — |
| QR code generation + brand theming | — |
| Phone OTP via WhatsApp (1-field, 60s) | — |
| Welcome moment + endowed progress (1/5) | — |
| Customer dashboard (progress bar, activities, rewards) | — |
| Activity submission + async verification queue | — |
| Reward unlock + coupon flow (6-digit, 14d expiry) | — |
| Counter mode (4 states + IndexedDB offline cache) | — |
| Admin dashboard (KPIs + customer list + CSV export) | — |
| Verification queue (2h/6h SLA) | — |
| BullMQ async WhatsApp queue | — |
| 7 pre-approved WhatsApp templates | — |
| Win-back sequences (D30/D60/D90) | — |
| Razorpay payment-redirect adapter | — |
| Friend referral (automatic) | — |
| Birthday/off-peak/streak cron triggers | — |
| Sentry error monitoring + Axiom logs | — |
| Stripe/Razorpay subscription billing | — |

Mark each DONE as you complete it. All must be DONE before first restaurant onboarding.

---

## Deployment Checklist

Before onboarding any restaurant, verify all of these:

- [ ] Vercel deployment live at custom domain
- [ ] Supabase production project (not local dev)
- [ ] Environment variables set in Vercel (not .env.local)
- [ ] Upstash Redis connected + BullMQ workers running (Vercel Cron or Fly.io)
- [ ] WhatsApp BSP (Interakt/AiSensy) account live, 7 templates approved by Meta
- [ ] Razorpay test → production mode switched
- [ ] Sentry project live, capturing errors
- [ ] QR code generates correctly for test restaurant
- [ ] End-to-end flow tested: scan QR → OTP → welcome → add visit → unlock reward → counter redemption
- [ ] Admin dashboard loads KPIs correctly
- [ ] CSV export works

---

## Who to Target: Ideal Design Partner Profile

You want the first 5 restaurants to succeed. Pick carefully.

**Green flags (approach these):**
- Independent restaurant (not a chain or franchise)
- 50–300 covers, table-service
- 4.0+ on Zomato/Swiggy with 100+ reviews
- Has an Instagram page with 2k–50k followers (they care about community)
- No current loyalty program (no stamp cards, no app)
- Been open 1+ year (not a new launch)
- Owner/GM is reachable and involved day-to-day

**Red flags (skip for now):**
- Part of a large chain (decision-making too slow)
- Less than 6 months old (too unstable)
- POS-dependent (needs POS integration = Phase 2)
- Purely delivery-focused (no in-store visit loop)
- Already using a competitor loyalty tool

**Best restaurant types for MVP1:**
- Specialty cafes (high-frequency, daily/weekly visitors) — Koramangala, Indiranagar
- Casual dining with a regular crowd — HSR, Jayanagar
- Bars/brewpubs with social regulars — Indiranagar, Church Street
- Avoid fine dining for first 5 (slow loop, lower frequency)

---

## Where to Find Them: Bangalore-Specific

### Google Maps searches (copy-paste these)
- "specialty cafe Koramangala"
- "brunch cafe Indiranagar"
- "independent restaurant HSR Layout"
- "rooftop cafe Indiranagar"
- "bakery cafe Jayanagar"
- "craft beer Indiranagar"

Filter: 4.0+ stars, 100+ reviews, not a chain brand.

### Zomato research
- Go to zomato.com/bangalore → filter by area + category
- Look at restaurants with "Loved by locals" tag (repeat customers = loyalty-minded owner)
- Check if they have their own loyalty program listed — if yes, skip

### Instagram hunt
- Hashtags: #koramangalacafe #indiranagarfood #bangalorecafe #bangalorerestaurant
- Filter: 2k–50k followers, posts about community/regulars/loyalty → approach
- DM them if walk-in isn't possible

### Referrals
- Ask Zingara/Fitness Garage clients: "Do you know any restaurant owners who'd be open to a quick chat?"
- Any personal network in the F&B space: college friends working in restaurants, family contacts

---

## Outreach Playbook

### Best channel: Walk-in (highest conversion)
**When:** Tuesday–Thursday, 2–5pm (slow period, owner/GM available)
**Who to ask for:** "Is the owner or manager around for 5 minutes?"

**Opening line (memorise this):**
> "Hi, I'm building a loyalty tool specifically for restaurants like yours — WhatsApp-based, no app needed for customers. I'm looking for 5 design partners in Bangalore who'd get it completely free for 3 months in exchange for feedback. It takes 30 minutes to set up. Would you be open to a quick 10-minute chat?"

**If they say yes → next step immediately:**
> "Great. When's a good time this week — maybe Thursday afternoon? I'll bring a short demo."

**If they say they're busy:**
> "Totally fine. Can I leave you my number? I'll also send a quick WhatsApp message so you have it."

---

### WhatsApp cold message (send after walk-in OR if walk-in not possible)

```
Hi [Name],

I'm Sujeth — I build software products. I'm launching Loop, a WhatsApp loyalty tool 
for restaurants in Bangalore.

I visited [Restaurant Name] recently — love what you've built. I'm looking for 5 
design partners who'd get it free for 3 months and help shape the product.

Key points:
• Customers join via QR code — no app download needed
• All communication through WhatsApp (85%+ open rates)
• You own all the customer data — not Zomato, not us
• Takes 30 minutes to set up, works from day 1

Happy to show you a live demo at your place this week. 
10 minutes is all I need.

Would Tuesday/Thursday afternoon work?
```

---

### Cold email (for restaurateurs with a listed email)

```
Subject: Free loyalty tool for [Restaurant Name] — 3-month design partner offer

Hi [Name],

I'm Sujeth, building Loop — a WhatsApp-native loyalty platform for Bangalore restaurants.

I'm onboarding 5 design partners (completely free for 3 months) before our public 
launch. In exchange, you help shape the product with real feedback.

What you get:
- Customers join via QR scan, no app needed
- Loop sends WhatsApp messages automatically when customers earn/redeem rewards
- You see who's coming back, who's lapsed, and what's working
- You own the data — not Zomato, not Swiggy

Setup takes 30 minutes. I'll do it with you on-site.

Worth a quick call this week? 15 minutes over phone or in person.

— Sujeth
[phone] | [portfolio link]
```

---

### Objection Handling (the 5 you'll hear most)

**1. "We already have a stamp card system."**
> "Stamp cards are great for simplicity, but they can't message customers when they're about to lapse, and you have no data on who's actually returning. Loop does both — and customers don't need to carry anything. Worth seeing the difference?"

**2. "We're too busy right now."**
> "I completely understand. That's exactly why I'm offering on-site setup — I come to you, and we have it running in 30 minutes during your slow period. No extra work for your team."

**3. "We don't want to share customer data."**
> "You won't be sharing data — you'll be gaining it. Right now you don't know your regulars' names or numbers. Loop gives you that data. You own it entirely. We never sell it or use it for other restaurants."

**4. "We already tried [some loyalty app] and it didn't work."**
> "Most loyalty apps fail because customers have to download something. Loop runs entirely on WhatsApp — 85% of messages get opened. No downloads, no friction. That's the difference."

**5. "How much does it cost?"**
> "For design partners, it's free for 3 months. After that, our Starter plan is ₹3,500/month — about ₹115/day. If Loop brings back even one regular a day who'd otherwise not have come back, it pays for itself."

---

## Sales Process: Day by Day

| Day | Action |
|-----|--------|
| Day 0 | Walk-in. Have the conversation. Get a "yes, let's talk more." |
| Day 1 | Send WhatsApp follow-up (template above). Confirm time for demo. |
| Day 3 | Demo visit (at their place, 10–15 min). Show the end-to-end flow on your phone. |
| Day 5 | If no response: one more WhatsApp ping. "Hey [Name], just following up. Happy to adjust the timing." |
| Day 7 | Setup session (co-sit, 30 min). Walk through the 4-step onboarding wizard together. |
| Day 8 | First QR code printed and on the counter. First test customer scan done with staff. |
| Day 14 | Check-in call: how many scans? Any issues? Collect first feedback. |
| Day 30 | Month 1 review: show them their data (customers, visits, return rate). |

**Target:** 5 design partners in Weeks 3–5. At least 1 by end of Week 4.

---

## Design Partner Offer

Tell them exactly this:
> "You get 3 months completely free. In exchange: let me observe how your team uses it, give me honest feedback every 2 weeks, and if it works for you, consider staying on as a paid customer."

What you get from them:
- Real usage data
- Feedback on UX and restaurant workflow
- A case study (with their permission)
- First paid revenue conversion

---

## Onboarding Runbook (what to do at setup session)

### Step 1: Restaurant profile (10 min)
- Restaurant name, logo, brand colours
- Operating hours
- WhatsApp number for customer comms
- Razorpay account (or set up together)

### Step 2: Loop config (10 min)
- Choose loop type: visits-based (recommended for MVP1)
- Set target visits for first reward (5 visits is the default)
- Set reward name and description ("Free dessert of your choice")
- Set expiry (14 days recommended)

### Step 3: Staff setup (5 min)
- Create 1 admin account (owner email)
- Create 1 staff account (for counter mode)
- Test counter mode on their phone/tablet
- Show them the 4 states: idle → typing → valid → invalid

### Step 4: First customer (5 min)
- Scan the QR code yourself with your phone
- Go through the whole flow: OTP → welcome → dashboard
- Let the owner see how it looks from a customer's perspective

### Go-live checklist:
- [ ] QR code printed and placed at counter/table
- [ ] Staff know how to use counter mode
- [ ] Owner knows how to access dashboard
- [ ] WhatsApp templates confirmed active

---

## Daily Non-Negotiables for Loop

Before ending each day, check:
1. Did I make build progress? (at least 1 feature moved forward)
2. Did I do at least 1 outreach? (walk-in, WhatsApp, or email)
3. For design partners: did I check their dashboard for any issues?

---

## Success Metrics by Phase

| Metric | Phase 1 (Jun) | Phase 2 (Jul) | Phase 3 (Aug) |
|--------|--------------|--------------|--------------|
| MVP1 build complete | YES/NO | — | — |
| Deployed | YES/NO | — | — |
| Restaurants contacted | 5 | 15 | 25 |
| Design partners signed | 1 | 3 | 5 |
| Active restaurants | 0 | 2 | 5 |
| MRR | ₹0 | ₹7,000 | ₹35,000 |
| Case study written | — | — | YES/NO |
