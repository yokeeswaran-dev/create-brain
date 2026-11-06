# <BRAIN-NAME> — decisions

Settled choices about <AREA>. A decision is **not** a fact: a fact says how the world *is*, a
decision says what we *do*. Both can be cited by a plan.

**Why this file exists:** without it, the same choice gets re-argued every few weeks, and work
drifts away from the pattern the team agreed on. PLAN mode checks every ask against this file —
an ask that contradicts an active decision is a **kind B conflict** and stops for the person.

A decision is never deleted. It is **superseded**, and the old one stays with the reason.

## Format

```
### D-nnn: <the choice, in one line>
- Status: active | superseded by D-nnn
- Decided: <date>, by <who>
- Context: <what forced a choice — the problem, the constraint, the trigger>
- Decision: <what we do now>
- Why: <the reason — this is the part that stops the re-argument>
- Rejected: <the other options considered, and why not>
- Source: <my words | file:line | a team rule file | a plan P-nnn>
- Applies to: <E- IDs, or "all of <area>">
- Links: F-nnn, P-nnn
```

**Where decisions come from:** the person stating a convention ("we always do X"), a settled
`C-` conflict, a completed plan, or a rule the team already wrote down elsewhere (a
`CLAUDE.md`, an ADR folder, a project rules file). When a written team rule exists, seed the
`D-` from it with that file as `Source:` — so the brain agrees with the rules the team already
has instead of competing with them.

## Decisions

_(none yet)_
