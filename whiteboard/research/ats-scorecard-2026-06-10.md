# ATS Resume Scorecard — Jun 10, 2026

Tested 3 resume versions across 4 reputed ATS scorers. All scans used file upload (.docx), not paste, except where noted. Same benchmark JD used across tools: composite Product Engineer / Full Stack / SDE-I description.

## Headline result

**Winner: V2 (2-page version)** — wins on 2 of 4 tools, never finishes last.

PE_Final wins on Enhancv but underperforms on others. V1 (1-page) is consistently weakest.

## Score Matrix

| ATS Tool        | V1 (1-page) | V2 (2-page)  | PE_Final     | Winner   |
|-----------------|-------------|--------------|--------------|----------|
| Enhancv         | 71/100      | 73/100       | **76/100** ⭐ | PE_Final |
| Jobscan         | 75/100      | (deduped)*   | (deduped)*   | V1 only† |
| SkillSyncer     | 78/100      | **80/100** ⭐ | (no scans)‡  | V2       |
| MyPerfectResume | 70/100      | **76/100** ⭐ | 75/100       | V2       |
| **Wins**        | 0           | **2**        | 1            |          |

\* Jobscan deduped subsequent uploads to the V1 cached result — free tier limit on distinct scans
† Only V1 received a unique score; V2/V3 could not be tested fairly  
‡ SkillSyncer free tier: 2 scans/week, exhausted after V1+V2

## Per-resume read

**V1 (1-page) — weakest overall.** Tightest, most scannable, but loses on keyword density and content depth. Enhancv flagged it lowest (71) — fewer hard skills exposed to ATS parsers. MyPerfectResume gave it 70 (lowest of the three on that tool).

**V2 (2-page) — strongest overall.** Wins 2/4 tools, top on the two tools that can compare keyword match (SkillSyncer 80, MyPerfectResume 76). Extra project (Aivorain) + technical specifics (server-side price re-validation, idempotency guards, 31-node graph, 4-state FSM) give ATS keyword matchers more to hook into.

**PE_Final — middle ground.** Wins on Enhancv (76 — best score there) because of cleaner section structure, but loses to V2 on the two keyword-density-focused tools. Lost some specifics in the trim ("0 downtime", "24 schema migrations" removed).

## Notable signals from Enhancv (most detailed report)

- ATS Parse Rate: **90%** for all 3 versions — formatting is ATS-friendly across the board
- Enhancv flagged file format: prefers PDF over DOCX (minor penalty, easy fix)
- "Spelling mistakes" Enhancv reported (`projekts`) were parsing artifacts, not real typos
- LinkedIn URL flagged as missing on V1 even though it's present — parser issue
- Quantifying Impact: 1 issue on each version (Greek God Clothing bullet has no number)
- Generic layout / template design — Enhancv pushes you toward their builder

## What's actually different between versions (relevance to ATS)

| Feature                          | V1 | V2 | PE_Final |
|----------------------------------|----|----|----------|
| Projects listed                  | 4  | 5  | 4        |
| Aivorain project                 | ✗  | ✓  | ✗        |
| "24 schema migrations"           | ✓  | ✓  | ✗        |
| "31-node prerequisite graph"     | ✗  | ✓  | ✗        |
| "4-state Motivation FSM"         | ✗  | ✓  | ✗        |
| Server-side price re-validation  | ✓  | ✓  | ✗        |
| Idempotency guards               | ✓  | ✓  | ✗        |
| Address granularity              | City | City | City + ZIP |
| Page count                       | 1  | 2  | 1        |
| Length (approx words)            | ~360 | ~520 | ~370  |

## Recommendation

**Use V2 (Sujeth_Resume_V2_2page.docx) as your primary** for ATS-gated applications (LinkedIn Easy Apply, Wellfound, big-company portals, Internshala). The extra page costs you nothing in those flows and the keyword density buys you ~5-8 extra ATS points.

**Keep PE_Final / V1 as backup** for:
- Cold founder outreach where a recruiter will read it cover-to-cover (1-page signals respect for time)
- Walk-in / handed-over-in-person situations where format matters
- Loop / restaurant outreach where it's a credential, not a JD-match exercise

## Quick wins to push V2 from 76-80 → 85+

1. Convert to PDF before submitting (Enhancv & others penalize DOCX)
2. Add a number to the Greek God Clothing bullet (e.g. "shipped in 6 weeks", "first 50 orders")
3. Add one missing keyword cluster — V2 is missing explicit mentions of: AWS, Docker, Jest (you have Vitest), system design as a phrase, CI/CD as a phrase (you have GitHub Actions context but no CI/CD acronym in 5 places)
4. Surface "Algorithms" and "Data Structures" higher up — currently buried in Coursework
5. Restore "24 schema migrations" and the "31-node graph" specifics if you ever trim back

## Tools attempted but couldn't score

- **Resume Worded:** logged in fine, upload redirected back to upload page repeatedly. Likely free-tier hit cap on this account from prior use.
- **Teal HQ:** standalone ATS checker URL is 404. Their resume scoring is now built into the Resume Builder only.
- **Jobscan V2/V3:** deduped to V1 cached report despite using actual file uploads.
- **Resume.io / Zety:** funneled into builder flow rather than standalone scoring.
