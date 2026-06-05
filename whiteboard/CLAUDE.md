# Claude Code Agent Instructions — Sujeth's Summer OS

This folder contains Sujeth's planning system. Sujeth types short commands; the agent reads the right files and responds — no manual file opening needed.

**Week numbering:** Week 1 = Jun 4–8 2026. Calculate current week from today's date.
**Daily log path:** `tracking/daily-logs/YYYY-MM-DD.md`
**Weekly report path:** `tracking/weekly-reports/week-NN.md` (zero-padded, e.g. week-02.md)

If today's daily log doesn't exist: create it by copying `schedule/daily-template.md`, renaming to today's date, and filling in Day N (count from Jun 4 2026 = Day 1).

---

## Commands

### `schedule`
**What to read:** `schedule/master-schedule.md` + current week row in all 4 plan files (`plan/01-loyalty-platform-plan.md`, `plan/02-job-pipeline-plan.md`, `plan/03-placement-readiness-plan.md`, `plan/04-freelance-plan.md`)

**What to output:**
- Tomorrow's date + day number
- Time blocks from master-schedule.md
- One specific task per pillar pulled from this week's plan row
- What Loop day type it is (BUILD day = Mon/Wed/Fri, OUTREACH day = Tue/Thu)
- DSA pattern for this week (from the placement plan)

---

### `morning`
**What to read:** `tracking/progress.md` + today's daily log

**What to output:**
- Quick snapshot: 4 numbers vs targets (problems solved X/200, apps X/250, restaurants X/5, freelance income ₹X)
- Today's focus per pillar (from the daily log if it exists, else generate from this week's plan)
- One reminder: what was rolled from yesterday if anything wasn't done

---

### `progress today`
**What to read:** Today's daily log (`tracking/daily-logs/YYYY-MM-DD.md`)

**What to output:**
- Done checkboxes status (what's checked, what isn't)
- DSA: problems solved today + running streak
- Any blockers noted
- Rolled tasks if any ("X wasn't done — move to tomorrow?")

If the log doesn't exist yet: say "No log for today yet — type `update today` to create it."

---

### `progress week`
**What to read:** All daily logs from Mon–today this week + `tracking/weekly-reports/week-NN.md` if it exists + `tracking/progress.md`

**What to output — a table:**

| Pillar | Target (this week) | Actual so far | Gap |
|--------|-------------------|---------------|-----|
| Loop (feature/outreach) | from plan | count from logs | +/- |
| Applications | from plan | count from logs | +/- |
| DSA problems | from plan | count from logs | +/- |
| Freelance outreach | from plan | count from logs | +/- |

Then: on track / behind / ahead per pillar + one line recommendation if behind.

---

### `reschedule`
**What to read:** Today's daily log (what wasn't done) + tomorrow's date + this week's plan targets + `schedule/master-schedule.md`

**What to output:**
- List of tasks not done today → proposed roll to tomorrow
- Tomorrow's adjusted plan (rolled tasks slotted into the right time block)
- If gap is large (3+ days of rollover): flag it and suggest reducing scope
- Ask: "Write this to tomorrow's log? (yes/no)"

If yes: create/update tomorrow's daily log with the adjusted focus.

---

### `update today`
**What to do:** Ask these 5 questions one at a time, then write everything to today's log and update `tracking/progress.md`.

Questions:
1. "Loop: what did you do? (or 'nothing')"
2. "Jobs: applied to how many? messaged how many?"
3. "DSA: how many problems? which pattern?"
4. "Freelance: what did you do? (or 'nothing')"
5. "Energy today: morning / afternoon / evening (1-10 each) + one line how it felt"

After answers:
- Mark the done checkboxes in today's log
- Update the numbers in `tracking/progress.md` (problems solved total, apps total, etc.)
- Auto-calculate DSA streak from daily logs
- Write the "One Line" feeling
- Output: "Updated. [summary of what changed]"

---

### `week review`
**What to read:** All daily logs from this week + `plan/` files for this week's targets + `milestones/phase-X-*.md` for month checkpoint

**What to do:**
- Aggregate all numbers from daily logs
- Compare to weekly targets from plan files
- Generate filled-in weekly review using `schedule/weekly-template.md` as the structure
- Write it to `tracking/weekly-reports/week-NN.md`
- Update the Weekly Velocity row in `tracking/progress.md`
- Output: the review + "Written to week-NN.md"

---

## Reference (if Sujeth asks "how do I..." questions)

| Question | File to read |
|----------|-------------|
| How to approach a restaurant | `blueprints/01-loyalty-platform.md` → Outreach Scripts section |
| What pattern to do next in DSA | `blueprints/03-placement-readiness.md` → DSA pattern order |
| Where to apply for jobs | `blueprints/02-job-pipeline.md` → Where to Apply section |
| Who to contact for freelance | `blueprints/04-freelance.md` → relevant industry section |
| What's the LinkedIn post for today | `schedule/linkedin-schedule.md` → day of week posting schedule |
| Overall targets and phase | `blueprints/00-master-overview.md` |
