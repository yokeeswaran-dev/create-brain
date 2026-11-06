# P-nnn: <the goal, in one line>

**This is the plan template.** Copy it to `plans/P-00n-<slug>.md`. Every section is required —
an empty section means the thinking was skipped, not that it did not apply. Write "none" where
there is genuinely nothing.

- **Status:** draft | approved | in-progress | done | abandoned
- **Asked:** <date>, by <who>
- **Their exact words:** "<verbatim — never paraphrased, so the intent cannot drift>"
- **Restated:** <the ask in one line, as you understood it>
- **Zones touched:** <zones from ontology.md>
- **Action policy for those zones:** <what needs approval>

## Facts this plan relies on

Every row must be a real ID. If a step rests on something with no fact, it belongs in Unknowns.

**No row may be a retired fact.** A retired fact describes something that no longer exists, so a
plan built on one is a plan against a system that is gone. If the only fact on a Key is retired,
re-verify the thing first — that is an Unknown, not a foundation.

| Fact | Badge | What the plan assumes from it |
|---|---|---|
| F-nnn | ✅ | <...> |
| F-nnn | ⚠️ (old) | <...> |

## Unknowns and blocking assumptions

A plan never ships with a silent assumption. Each row is either closed before ACT, or accepted
by the person as a risk.

| ID | Unknown | Probe that closes it | Blocking? | If we are wrong |
|---|---|---|---|---|
| Q-nnn | <...> | `<command>` | yes | <what breaks> |

## Idea conflicts

| Kind | What clashes | Resolution |
|---|---|---|
| A / B / C | <the ask> vs <F-nnn or D-nnn> | <what was agreed, and the new `D-` if one was recorded> |

Write "none" if the ask agrees with everything recorded. **Never resolve a kind A or kind B
conflict alone** — both need the person.

## Blast radius (law 12)

From `graph.md` → "Job 2". One row per entity this touches.

**Count live edges only.** A retired edge is a dependency that no longer exists; guarding it
wastes the work and, worse, hides the real dependency behind a false sense of coverage. If an
inbound edge looks stale but is not marked retired, that is an Unknown — verify it before ACT.

| Entity | Change | Inbound edges (who could break) | Guard |
|---|---|---|---|
| E-nnn | <...> | R-nnn from E-nnn | <the test or check that catches it> |

**Unknown consumers:** <list any entity whose dependency is not proven by a fact — each is a
`Q-` and a blocking assumption above. An unknown consumer is how changes break things.>

## Steps

Each step names a real file or a real command. "Update the config" is not a step; "add
`X_ENABLED` to `config/app.json`" is.

1. **<what>** — `<file or command>` — *why:* <reason> — *expect:* <the observable result>
2. …

## Verification

The exact commands, with the output that means success. Someone else must be able to run this
without asking a question.

```bash
<command>
```
Expect: `<output>`

## Rollback

How to undo each step, in reverse order. If a step cannot be undone, **say so here** — that
changes how carefully it gets approved.

1. …

## Facts to capture after

What this work will prove, that the brain does not know yet. Captured at the end of ACT.

| Key | What to record | How it will be proven |
|---|---|---|
| | | |

## Log

Filled during ACT. One line per step, with what actually happened.

- <date> — step 1 — <result>
- <date> — **STOPPED** — reality disagreed with F-nnn → opened C-nnn
