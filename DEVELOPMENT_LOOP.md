# DEVELOPMENT LOOP — Autonomous Execution Procedure

This file defines exactly how an agent (human or autonomous) works through `MASTER_PLAN.md`, task by task, without losing state between sessions. If you are resuming after an interruption, start at **"Resume procedure"** below, not at the top.

The loop:

```
READ → PLAN → DEVELOP → TEST → FIX → VERIFY → COMMIT → PUSH → LOG → UPDATE PLAN → NEXT TASK → REPEAT
```

---

## 1. READ

Before touching any code:

1. Read `PROGRESS.md` — current phase, current task, blockers.
2. Read the tail of `EXECUTION_LOG.md` (last 3–5 entries) — what was just done, what failed, what fixes were attempted.
3. Read the current task's row in `MASTER_PLAN.md` — dependencies, acceptance criteria, required tests.
4. Read the relevant section(s) of `docs/FUTURE-ENVIRONMENT-LAYER.md` named in that task — it is the spec of record; `MASTER_PLAN.md` only tracks status.
5. Run `git status` and `git log --oneline -5` — confirm the working tree matches what `PROGRESS.md` claims. If it doesn't (uncommitted changes not mentioned in `PROGRESS.md`, or a task marked `Done` with no matching commit), stop and reconcile before proceeding — treat the mismatch as a blocker (§6).

## 2. PLAN

Confirm the task's dependencies (the "Depends on" column) are all `Done` in `MASTER_PLAN.md`. If not, that dependency is the actual next task — do not skip ahead.

If the task is `P5-T00` (the Robot.jsx design decision) or any other task explicitly marked as needing a human decision, do not guess — go to blocker handling (§6) instead of proceeding.

State in one sentence what you're about to build and which files you expect to touch, matching the task's row in `MASTER_PLAN.md`.

## 3. DEVELOP

Implement only the current task — not the next one, not a convenient adjacent cleanup. Match the file paths named in `MASTER_PLAN.md` / the design doc exactly; if a path must diverge, note why in the log entry (§9).

Keep the change scoped so it is independently testable and revertable. A task that turns out to be larger than expected should be split into sub-steps rather than expanded silently — update `MASTER_PLAN.md` if the task genuinely needs to be broken up.

## 4. TEST

Run, in this order:

1. `npm test` (content/data model tests — must stay green throughout this plan; nothing in `MASTER_PLAN.md` should ever touch `src/data/*` in a way that breaks these).
2. `npm run build` (production build must succeed clean, no warnings introduced).
3. The task-specific manual/visual checks listed in that task's "Required tests" in `MASTER_PLAN.md` (DevTools inspection, reduced-motion toggle, mobile viewport, keyboard nav, Lighthouse spot-check, screen-reader check — whichever apply).

A task is not testable-by-inspection-alone if it changes visual/interactive behavior — actually exercise it (dev server + browser), don't infer correctness from reading the diff.

## 5. FIX (retry behavior)

If any test in step 4 fails:

1. Diagnose the root cause from the actual error — do not guess-and-retry blindly.
2. Apply a fix.
3. Re-run the full test sequence from step 4, step 1 (not just the test that failed — a fix can regress something else).
4. **Retry budget: 3 attempts per task.** Count resets only when a genuinely new root cause is identified (not a variation of the same fix).
5. If the 3rd attempt still fails, stop implementing and go to blocker handling (§6). Do not commit a failing state. Do not silently weaken the acceptance criteria to make the task "pass."

## 6. VERIFY

Before committing, re-check the task's acceptance criteria in `MASTER_PLAN.md` line by line. All must be satisfied — not "mostly," not "the important ones." If an acceptance criterion cannot be met as written, that is itself a blocker (§7) — do not redefine the criterion post hoc to match what was built.

## 7. Blocker handling

A blocker is: an unresolved test failure after 3 fix attempts, a task requiring a human decision (e.g. `P5-T00`), an acceptance criterion that cannot be satisfied as specified, a dependency that turns out to be `Done` in name only, or a repository-state mismatch found in step 1.

On a blocker:

1. Do **not** commit or push partial/broken work.
2. Do **not** mark the task `Done` in `MASTER_PLAN.md` or `PROGRESS.md`.
3. Set `PROGRESS.md`'s status to `Blocked`, with a specific description of the blocker and what's needed to unblock it (a decision, a missing credential, a design clarification, etc).
4. Append an `EXECUTION_LOG.md` entry documenting the attempts made and why they failed (§9 format, `Validation` section shows the FAIL, `Next` section states what unblocks it).
5. **Stop.** Wait for human input. Do not move to a different task to "stay busy" — a skipped blocker becomes an invisible landmine for whoever resumes next. If genuinely independent, unblocked work exists in a different phase with no dependency on the blocked task, it's acceptable to say so explicitly in `PROGRESS.md` and switch to it — but never silently.

## 8. COMMIT

Commit only after step 6 (VERIFY) passes cleanly.

- One commit per completed task (matches the granularity of `MASTER_PLAN.md`'s task IDs). Do not batch multiple tasks into one commit — it breaks the log's traceability and makes `git bisect` useless for this plan.
- Commit message format: `<task-id>: <short description>` (e.g. `P0-T02: add InteractionProvider and context`). Body may reference the design doc section if useful.
- Stage specific files by name — never `git add -A` / `git add .` blindly. Review `git status` after staging.
- Never use `--no-verify`, `--no-gpg-sign`, or amend an existing commit as part of this loop. If a pre-commit hook fails, fix the underlying issue and create a new commit.
- Never commit a task whose tests are failing, partially implemented, or whose acceptance criteria are unmet — that's what §7 is for.

## 9. PUSH

Push immediately after each commit, to the current branch (`work` at plan creation time — confirm with `git branch --show-current` if resuming after a long gap, in case the branch changed).

- Only push commits that came from a completed, verified task per this loop. Never push a commit made outside this loop's discipline (e.g., someone else's in-progress work) without checking with the user first.
- Do not force-push. Do not push to `main` directly — this plan operates on the feature/work branch; merging to `main` is a separate, human-triggered decision outside this loop's scope.
- If the push is rejected (remote has diverged), stop and reconcile manually — do not force-push to resolve it.

## 10. LOG

Append one entry to `EXECUTION_LOG.md` for every task, whether it succeeded or hit a blocker. Use the exact format defined in `EXECUTION_LOG.md`'s header. Never edit or delete a previous entry — this file is append-only, full stop, even to correct a typo (append a correction as a new entry instead).

## 11. UPDATE PLAN

After logging:

- Flip the task's `Status` cell in `MASTER_PLAN.md` to `Done` (or leave as `Blocked` per §7).
- Update `PROGRESS.md`: move the completed task into "Completed tasks," advance "Current task" to the next eligible task per the dependency graph, clear or update "Blockers," update "Next action."
- If the task revealed that a later task's scope, file list, or acceptance criteria in `MASTER_PLAN.md` needs adjustment, edit `MASTER_PLAN.md` directly (this file is allowed to evolve — the design doc `docs/FUTURE-ENVIRONMENT-LAYER.md` is not, without a human decision).

## 12. NEXT TASK → REPEAT

Return to READ (§1) for the next eligible task per the dependency graph in `MASTER_PLAN.md`. If no eligible task remains (all remaining tasks blocked or all phases done), stop and report status — do not invent new work outside `MASTER_PLAN.md`.

---

## Resume procedure (start here if picking this up cold)

1. Read `PROGRESS.md` in full.
2. Read the last 5 entries of `EXECUTION_LOG.md`.
3. Run `git log --oneline -10` and `git status`; diff against what `PROGRESS.md`/`EXECUTION_LOG.md` claim.
4. If they agree: resume at READ (§1) for the "Current task" named in `PROGRESS.md`.
5. If they disagree (e.g., a commit exists that isn't logged, or a logged task has no matching commit): treat as a blocker (§7) — reconcile the documentation to match actual repository state (repository state is always the source of truth) before doing anything else. Append a log entry explaining the reconciliation.
6. If `PROGRESS.md` shows `Blocked`: do not resume automatic execution. Surface the blocker to the user and wait — unless the blocking condition (e.g. a named human decision) has visibly been resolved since (check `PROGRESS.md` for a recorded decision, or ask).

## Non-negotiables

- Repository files (`git log`, `git status`, actual file contents) always outrank what any planning doc claims. If they conflict, the docs are wrong and get fixed.
- Never implement a task out of dependency order to "make progress."
- Never commit code that fails `npm test` or `npm run build`.
- Never mark a task `Done` without its acceptance criteria actually verified (not just "should work").
- Never silently resolve a task marked as needing a human decision.
- This loop does not touch `src/data/*.js` content, resume files, or anything under `whiteboard/`/`clg-placement/` — those are unrelated to this plan; leave them alone unless a task explicitly calls for it.
