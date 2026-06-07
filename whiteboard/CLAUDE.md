# Claude Code Agent Instructions — Sujeth's Summer OS

This folder is Sujeth's planning and execution system. Sujeth types short commands; the agent reads the right files and responds — no manual file opening needed.

**Week numbering:** Week 1 = Jun 4–8 2026. Calculate current week from today's date.
**Daily log path:** `logs/daily/YYYY-MM-DD.md`
**Weekly report path:** `logs/weekly/week-NN.md` (zero-padded, e.g. week-02.md)

If today's daily log doesn't exist: create it from `schedule/daily-template.md`, rename to today's date, fill in Day N (count from Jun 4 2026 = Day 1).

---

## Commands

### `morning`
**What to read:** `progress.md` + today's daily log + `research/` folder

**What to do:**
1. Check `progress.md` for current week gap vs targets
2. Check if `research/jobs-YYYY-MM-DD.md` exists for today — if not, research jobs now:
   - Web search Wellfound, LinkedIn jobs, YC Work at a Startup, Internshala
   - Roles: "Full Stack Engineer", "SDE-I", "Product Engineer" — Bangalore or Remote — posted last 48h
   - Filter: Series A–C startups preferred; skip MNCs unless product-focused
   - Output 5–8 results: Company | Role | Link | One-line note (why worth applying)
   - Save to `research/jobs-YYYY-MM-DD.md`
3. Pull restaurant targets from the active `research/restaurants-[AREA].md` (area noted in weekly brief)
4. Pull freelance prospects from `research/freelance-smb.md` and `research/freelance-tier2.md`
5. Ask: **"Mode A (full), B (reduced), or C (off day)?"**
6. Output a specific named task list — not time blocks, actual targets:

```
Today — Mode [X] | Day [N] of 91

Loop ([build/outreach] day):
  → [specific feature task OR restaurant name + address to walk in to]

Jobs:
  → Apply: [Company A] ([role]) | [Company B] ([role]) | [Company C] ([role])
  → + [N] more via LinkedIn Easy Apply (queue in today's jobs file)

Freelance:
  → [specific prospect name + business + what to do]

DSA:
  → [N] problems — pattern: [pattern] — LeetCode #XXX, #XXX, #XXX

LinkedIn:
  → [post topic from weekly brief, OR "engage only today"]
```

---

### `week plan` ← run every Sunday evening
**What to read:** `progress.md` + `strategy/freelance.md` + `strategy/loop.md` + last week's weekly report

**What to do:**
1. Ask: "Which Bangalore area for Loop outreach this week?"
2. Ask: "Which Tier 1 industry focus for freelance this week?" (schools, pharmacies, field service, equipment rental, cooperatives, NGOs)
3. Run 4 research tasks:

**Research A — Restaurants in chosen area**
- Web search: Independent restaurants/cafés in [area] — not chains, decent footfall, QSR/café/dine-in
- For each: Name | Address | Type | Google rating | Best walk-in window | Approach angle
- Save 6–10 results to `research/restaurants-[AREA].md`

**Research B — Tier 1 freelance (SMB) prospects**
- Web search: [chosen industry] businesses in Bangalore — independent operators, not franchise
- For each: Business name | Area | Owner name if findable | Contact method (walk-in / WhatsApp / phone)
- Save 10–15 results to `research/freelance-smb.md`

**Research C — Tier 2 industrial targets**
- Web search: Manufacturers / real estate firms / jewellery businesses in Bangalore, 50–500 employees
- For each: Company name | Industry | Size estimate | Decision-maker title | Entry point angle (CA, network, LinkedIn)
- Save 3–5 results to `research/freelance-tier2.md`

**Research D — Founder outreach targets**
- Web search: Series A–C Bangalore startups currently hiring Full Stack / SDE-I
- For each: Startup name | Founder name | LinkedIn or Twitter handle | Why relevant
- 5–8 founders — include in `research/weekly-brief-YYYY-MM-DD.md`

4. Generate 3–4 LinkedIn post ideas for the week with opening hook line (Mon/Wed/Fri)
5. Write all output to `research/weekly-brief-YYYY-MM-DD.md` (use this Monday's date)
6. Output: summary of what was found + "Ready for Monday. Type `morning` when you wake up."

---

### `research jobs` ← run any morning as standalone
**What to do:**
- Web search: Wellfound, LinkedIn jobs, YC Work at a Startup, Internshala
- Roles: "Full Stack Engineer", "SDE-I", "Product Engineer", "Backend Engineer"
- Location: Bangalore or Remote | Posted: last 48 hours
- Filter: Series A–C preferred; skip MNCs unless product-focused
- Output: 5–8 results — Company | Role | Link | One-line note
- Save to `research/jobs-YYYY-MM-DD.md`

---

### `research restaurants [area]` ← run ad-hoc or called inside week plan
**What to do:**
- Web search: Independent restaurants/cafés in [area] — not chains
- For each: Name | Full address | Type | Google Maps rating | Best walk-in window | Approach angle
- Save 6–10 results to `research/restaurants-[AREA].md`
- Output: the list + "Saved to research/restaurants-[AREA].md"

---

### `schedule`
**What to read:** `schedule.md` + `progress.md` + `strategy/dsa.md` (for current week's pattern)

**What to output:**
- Tomorrow's date + day number
- Time blocks (Mode A default)
- One specific task per pillar based on current week position
- Whether tomorrow is Loop BUILD day or OUTREACH day
- DSA pattern for this week

---

### `progress today`
**What to read:** Today's daily log (`logs/daily/YYYY-MM-DD.md`)

**What to output:**
- Done checkboxes status
- DSA: problems solved today + running streak
- Any blockers noted
- Rolled tasks ("X wasn't done — move to tomorrow?")

If log doesn't exist: "No log for today yet — type `update today` to create it."

---

### `progress week`
**What to read:** All daily logs Mon–today this week + `progress.md`

**What to output:**

| Pillar | Target (this week) | Actual so far | Gap |
|--------|-------------------|---------------|-----|
| Loop (features/outreach) | from strategy | count from logs | +/- |
| Applications | from strategy | count from logs | +/- |
| DSA problems | from strategy | count from logs | +/- |
| Freelance outreach | from strategy | count from logs | +/- |

Then: on track / behind / ahead per pillar + one-line recommendation if behind.

---

### `update today`
**What to do:** Ask 5 questions one at a time, then write to today's log and update `progress.md`.

Questions:
1. "Loop: what did you do? (or 'nothing')"
2. "Jobs: applied to how many? messaged how many?"
3. "DSA: how many problems? which pattern?"
4. "Freelance: what did you do? (or 'nothing')"
5. "Energy today: morning / afternoon / evening (1–10 each) + one line how it felt"

After answers:
- Mark done checkboxes in today's log
- Update numbers in `progress.md` (cumulative totals)
- Auto-calculate DSA streak from daily logs
- Write the "One Line" feeling
- Output: "Updated. [summary of what changed]"

---

### `reschedule`
**What to read:** Today's daily log (what wasn't done) + tomorrow's date + `schedule.md` + `progress.md`

**What to output:**
- Tasks not done today → proposed roll to tomorrow
- Tomorrow's adjusted plan (rolled tasks slotted in)
- If today's `research/jobs-YYYY-MM-DD.md` exists — note it can be reused tomorrow
- If gap is large (3+ days of rollover): flag it, suggest reducing scope
- Ask: "Write this to tomorrow's log? (yes/no)"

---

### `week review` ← run Sunday evening before week plan
**What to read:** All daily logs from this week + `progress.md` + `milestones.md` (for phase targets)

**What to do:**
- Aggregate numbers from daily logs
- Compare to weekly targets in `strategy/` files
- Generate filled-in review:

```
# Week [N] Review — [Date range]

## Numbers
| Pillar | Target | Actual | Delta |
|--------|--------|--------|-------|
| Loop outreach contacts | | | |
| Applications sent | | | |
| DSA problems | | | |
| Freelance outreach | | | |
| LinkedIn posts | | | |

## What Worked
## What Didn't Work
## One Adjustment for Next Week
## Morale (1–10): __ | Reason: __
## Next week's most important task per pillar
- Loop:
- Jobs:
- DSA:
- Freelance:
```

- Write to `logs/weekly/week-NN.md`
- Update Weekly Velocity row in `progress.md`
- Output: the review + "Written to week-NN.md. Now run `week plan`."

---

## Reference (quick lookups)

| Question | File |
|----------|------|
| Restaurant outreach scripts | `strategy/loop.md` → Outreach Scripts section |
| DSA pattern order | `strategy/dsa.md` → 10-pattern sequence |
| Where to apply for jobs | `strategy/jobs.md` → Where to Apply section |
| Freelance industry approach | `strategy/freelance.md` → relevant industry section |
| LinkedIn post templates | `strategy/linkedin.md` → Post Templates section |
| Overall targets and phases | `strategy/overview.md` |
| Phase milestone checklists | `milestones.md` |
