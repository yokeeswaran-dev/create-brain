# Block grammar and ID rules

Every block format in one place, with the reason behind each rule. The generated brain carries
the formats it needs in its own files; this is the full reference for building and auditing.

## ID rules

| Rule | Why |
|---|---|
| IDs are `<letter>-<3 digits>`: `F-012`, `E-004`, `R-007` | sortable, greppable, stable in links |
| **An ID never changes**, even when its block moves to another file | links stay valid; `index.md` records where it lives now |
| Before claiming the next ID, **grep the files for `### F-<id>`** — not just `index.md` | a block can exist in a file before its index row is written; two sessions capturing at once will otherwise claim the same ID and silently collide |
| A removed block keeps its ID row, marked `_(REMOVED <date> — why)_` | a reader who finds an old reference needs to know it was removed on purpose, not lost |
| An ID collision is resolved by **renumbering the one with fewer inbound references**, and noting the renumber on both | the changelog and other blocks already point at the other one |
| In **examples and templates**, write IDs as `F-nnn` — never with digits | a heading or an example table row carrying a three-digit ID reads exactly like a real record, so it surfaces later as a phantom duplicate or a dangling link. This is doctor check 35, and it is the root cause of several other checks firing at once |

## Dates and paths — the two things that break on a second machine

Both of these look like formatting nits and are not. A brain is shared by git or by a folder, so
anything machine-specific inside it is a fact that stops being true the moment someone else
opens it.

| Rule | Why |
|---|---|
| **Every date is `YYYY-MM-DD`.** `Seen`, `Last checked`, `Opened`, `Decided`, `retired` — all of them | the 30-day staleness rule is arithmetic. "Nov 3", "03/11/26" and "last Tuesday" cannot be compared, so a brain with loose dates silently stops ageing its own facts and drifts into confident fiction |
| **Proof paths are relative to the area root**, never absolute | a proof path that starts at a drive letter or a home directory is true on exactly one machine. On a teammate's laptop every `file:line` proof is dead, so doctor check 30 reports the whole brain as rotten and they learn to ignore it. `src/x.js:12` works everywhere |
| **The charter records `Area root:`** — where those relative paths start from | without it nothing can resolve them, so check 30 cannot run at all. For a project brain it is usually the repo root the skill folder sits under |
| A **command** proof may name a host or cluster, because that is the thing being described | a cluster name is a fact about the area. A laptop path is a fact about one laptop |

## Badges

Two only. `✅ VERIFIED` or `⚠️ UNVERIFIED (reason)`, reason being `you said`, `guess`, `old`, or
`conflict C-xxx`.

| Rule | Why |
|---|---|
| ✅ only from real output seen in a session | memory and general knowledge are exactly where confident wrongness comes from |
| the person's statements are ⚠️ (you said), however certain they sound | people misremember their own systems; this is not distrust, it is bookkeeping |
| ✅ older than 30 days becomes ⚠️ (old) **when you read it** | a brain that silently ages into fiction is worse than an empty one |
| a `guess` must list `Built from:` | so a wrong conclusion can be traced to which input was wrong |

## F- — fact

```
### F-012: <short title>
- Key: <zone>.<type>.<name>.<property>
- Zone: <zone>
- Badge: ✅ VERIFIED | ⚠️ UNVERIFIED (reason)
- Status: retired <date> — <why>      (omit entirely while live)
- Fact: <one clear sentence>
- Proof:
  - Source: command | file | user | transcript
  - Command/File: `<exact command, or path:line>`
  - Output (key lines only): `<the lines that prove it>`
  - Seen: <date>, project <folder>
- Built from: F-003, F-007        (guess only)
- Links: F-003, E-004, D-002
- Last checked: <date>
- History: <old value> (<date>, <reason>)
```

**One claim per fact.** Two claims in one block cannot be badged separately, so when half is
disproved the whole block becomes untrustworthy.

**Proof must be reproducible.** "Checked the cluster" is not proof; the command and the lines
it printed are. A proof the next person cannot re-run is a `you said` in disguise.

## Retirement — when the thing itself is gone

A badge says *how well do we know this*. It cannot say *does this still exist*. Those are
different questions, and conflating them is how a brain becomes **confidently stale**: a module
deleted yesterday still has a ✅ fact checked last week, and nothing in the badge or the
`Last checked` date catches it.

So a fact or entity about something that no longer exists gets:

```
- Status: retired 2026-11-04 — module removed in the auth rewrite
```

| Rule | Why |
|---|---|
| `Status` is **absent while live.** Only retirement adds the line | otherwise every fact in every brain needs a no-op line, and churn hides real change |
| **The badge does not change.** A retired ✅ stays ✅ | it *was* true and the proof is still real. It is history, not a guess — inventing a third badge for this would blur what badges mean |
| A retired fact **can never back a current answer** | it may be cited as history: "it used to be X, retired on \<date\>" |
| **Retiring is not deleting** (law 4). The block, its proof and its History all stay | the next person who finds an old reference needs to learn it was retired on purpose, not lost |
| Retire the **entity** and every edge touching it goes too — retired or re-pointed | an edge to a thing that no longer exists is the graph lying about the present |
| Retirement needs **evidence**, like anything else: the file is gone, the probe returns nothing, the person says it was removed | "I think that was deleted" is a `Q-`, not a retirement |

**What notices it.** Three paths, all already in the brain: a probe that used to work and now
returns nothing (VERIFY), a `file:line` proof whose file no longer exists (DOCTOR), and work
that removes the thing (ACT → CAPTURE). The first and last are free; the middle one is a check.

## E- — entity (node)

```
### E-004: <entity name>
- Type: <from ontology.md>
- Zone: <zone>
- Key: <zone>.<type>.<name>
- Identity: <the stable name — and never an instance name>
- Status: retired <date> — <why>      (omit entirely while live)
- Facts: F-012, F-018
- Edges out: R-007
- Edges in: R-002
- Note: <former names, conditions, anything that matters>
```

An entity with no facts is an **orphan** — either find proof it exists, or remove it. An entity
whose real-world thing is gone is **retired**, not removed; the difference is that an orphan was
never proved and a retirement was.

## R- — relation (edge)

```
### R-007: <from> --<relation>--> <to>
- Relation: <from ontology.md>
- From: E-004
- To: E-009
- Badge: ✅ | ⚠️ (reason)
- Evidence: F-022
- Note: <direction notes, conditions>
```

**An edge needs its own evidence.** Both ends existing proves nothing about a connection
between them — that inference is the single most common way a knowledge graph becomes fiction.

## D- — decision

```
### D-002: <the choice, in one line>
- Status: active | superseded by D-009
- Decided: <date>, by <who>
- Context: <what forced a choice>
- Decision: <what we do now>
- Why: <the reason>
- Rejected: <other options, and why not>
- Source: <my words | file:line | team rule file | P-nnn>
- Applies to: <E- IDs or "all of <area>">
- Links: F-012, P-003
```

`Rejected:` is what stops the same argument recurring. A decision without it gets re-opened.

## C- — conflict

```
### C-004: <what disagrees>
- Facts involved: F-012, F-034
- Old claim (<date>): <claim + proof>
- New claim (<date>): <claim + proof>
- Fake conflict check: <different zone / time / identity?>
- What would settle it: `<probe>`
- Status: OPEN | Settled <date> — <result>
- Lesson: <what rule changes so it cannot recur>
```

**Always run the fake-conflict check first.** Most apparent contradictions are two true facts
about different zones, times or identities — those get **different Keys**, not a conflict.

## Q- — open question

```
### Q-007: <the question>
- Opened: <date>
- Why it matters: <what cannot be answered or planned without it>
- Probe that closes it: `<exact read-only command or file>`
- Blocks: P-003, F-041
- Status: open | closed <date> by F-052
```

A `Q-` with no probe is a complaint, not a question. If no probe exists, say what would have to
change to make one possible.

## P- — plan

Full template: `templates/brain-plan.md`. Required sections: facts relied on, unknowns and
blocking assumptions, idea conflicts, blast radius, steps, verification, rollback, facts to
capture after, log.

## S- — secret

```
### S-001: <what it is>
- Zone: <zone>
- Type: token | password | username | key | connection string | config file
- Value: `<only in the copy outside the brain folder>`
- Used for: <what needs it, with F- IDs>
- Where it comes from: <command or place to get a fresh one>
- Expires: <date or unknown>
- Captured: <date>
```

Values live **outside** the brain folder. `Where it comes from` matters more than the value —
tokens expire, and a stale value with no refresh instruction looks usable and is not.

## U- — upstream proposal

A brain's record of friction caused by the **factory**, not by its area. Full template:
`templates/brain-upstream.md`. Lives in the brain's `upstream.md`; triaged by HARVEST.

```
### U-nnn: <the friction, in one line>
- Raised: <date>, by <brain>, template <version>
- Status: open | applied <date> in create-brain <version> | rejected <date> — <reason>
- What happened: <the real event, once per occurrence, with dates>
- Evidence: <fact IDs, the command and its output, or what the rule produced>
- Root cause in the factory: <the law number, the include-when test, or the template file>
- Proposed change: <which file, and what it should say instead>
- Blast radius: <which future brains change; whether existing brains need an UPGRADE>
```

| Rule | Why |
|---|---|
| `U-` requires **evidence of a real event**, never a hypothetical | a template shaped by imagined problems grows ceremony nobody needed |
| The brain **never edits `create-brain`** — it only writes `U-` | the factory is shared; an unreviewed edit changes every future brain |
| `Status` is the only line HARVEST edits | the rest is the brain's record of what it saw, and stays as written |
| A rejection must carry its **reason** | without it, the same proposal comes back next month |
| Two brains raising the same `U-` is strong signal | one brain's friction may be local; two is the template |

`U-` IDs are per-brain and never appear in a `Links:` line — a proposal is about the template,
not about the area, so it is not evidence for any fact.
