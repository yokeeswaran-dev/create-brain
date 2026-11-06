# create-brain

**What it is:** a skill that builds other skills. You point it at an area — a repo, an API, a
database, a cluster, a team process — and it builds a **brain**: a skill that knows that area,
answers from proof instead of guessing, and does work inside it without breaking things.

**The point:** stop re-explaining your project every session. The brain remembers, and it keeps
itself up to date.

---

## Quick start

```
/create-brain I need a brain for this repo
```

That is enough. It asks you up to 7 questions, picks the right shape, shows you a table, and
builds it.

---

## The longer prompt (skips the questions)

Paste this in **any repo** and fill the `<>` parts:

```
/create-brain Create a brain for this project so it can answer questions about the
codebase and do work inside it without me feeding context every time.

Area: <one sentence — e.g. "the billing service and everything in this repo">
Zones: code = this repo on disk, read directly
       runtime-local = the service running on my laptop via <start command>
Must answer:
  1) <a real question you actually ask>
  2) <a real question you actually ask>
  3) <a real question you actually ask>
Actions: observe + plan only; ask me before any write
Lives in: .claude/skills/<name>-brain/ (committed with the repo)
Evidence: repo files, git history, <build/test command> output,
          CLAUDE.md / AGENTS.md / ADRs, and my own answers
Users: <just me | team of N, shared by git>
Neighbours: <cluster-brain for anything deployed | none>

Run SHAPE first and show me the shape table before you create anything.
Then BOOTSTRAP deeply from the real code: proof for every fact, an honest Q- for
every gap, no guesses. Finish by answering my three questions back to me from the
brain — that is the acceptance test.
```

### The `Must answer` list is the part that matters

Those three questions decide **which files the brain gets**. Make them real questions you have
actually had to dig for:

| Good | Weak |
|---|---|
| "Where do I add an endpoint, and where does its test go?" | "Explain the architecture" |
| "What breaks if I change this handler?" | "Document the code" |
| "Which command must pass before I raise an MR?" | "Know everything" |

Vague questions give you a generic brain. Specific ones give you a useful one.

---

## You do not need magic words

**No.** The mode names (`capture`, `backfill`, `verify`, `doctor`) are labels the brain uses for
itself, not a vocabulary you have to learn. Plain words reach the right place:

| You say | What happens |
|---|---|
| "remember this", "note that", "save it", "update yourself" | CAPTURE |
| "what do you know about X", "where is X", "how does X work" | ANSWER |
| "is that still true?", "that looks old", "are you sure?" | VERIFY |
| "you should already know this", "look at our old sessions" | BACKFILL |
| "check yourself", "anything broken in your notes?" | DOCTOR |
| "plan X", "add X", "how do I do X" | PLAN |
| "go ahead", "do it" | ACT |
| "this doesn't fit anywhere", "you need somewhere to keep X" | RESHAPE |

If a request could be two modes, the brain says which one it is doing and carries on. It will
never tell you to rephrase.

---

## What happens without you asking

Four things are **automatic**. You should never have to remember them:

| Automatic | When |
|---|---|
| **Capture** | whenever something new appears — and once over the whole session, the first time the brain is used in it |
| **Backfill** | on **first contact with a part of the area it holds no facts about**, before answering |
| **Conflict detection** | the moment two proofs disagree. It never picks a side quietly |
| **Inline verify** | when an answer would rest on a stale fact, it re-checks it instead of handing you a warning |

**Why this is safe:** writing facts into its own notes is bookkeeping, not a change to your
system. Changes to your *code, data or infrastructure* always need your approval. Only two things
inside its own folder need asking — **deleting** a fact, and **reshaping** itself.

So in normal use you just work, and it keeps up.

---

## Three things that keep it from going stale

### It knows when something is **gone**, not just when it's unverified

A badge says *how well do I know this*. It cannot say *does this still exist*. Treating those as
one thing is how a memory becomes **confidently stale** — a module deleted yesterday still has a
proven, recently-checked fact, and nothing catches it.

So a fact about something that no longer exists is **retired**, not deleted:

- It keeps its ✅ badge and its proof. It *was* true — it is history, not a guess.
- It **can never be the answer** to a current question. It can only be cited as *"it used to be
  X, retired on <date>"*.
- Its entity and every connection into it are retired in the same step, so the graph never claims
  something still depends on a thing that is gone.
- Nothing is lost. The block, the proof and the history all stay.

The self-audit's **first check on any brain over a month old** is: every proven fact that points
at a file — does that file still exist?

### It shows you how thin it is

**A fact count tells you nothing.** 18 facts and 180 facts look identical from outside, and the
usual way you discover a brain is too thin is when it fails you mid-task.

So bootstrap works in two passes — **name everything first**, then add depth only where your
three questions need it — and records the ratio:

| Thing | Found | Recorded | Gap |
|---|---|---|---|
| module | 8 | 8 | — |
| endpoint | 47 | 12 | Q-004 |

Counts come from a real counting command, never an estimate, and **every gap gets an open
question**. A visible `12 / 47` is the most useful thing in a young brain: it tells you exactly
how far to trust it.

This also means *"I have no fact about X"* and *"X does not exist"* are never confused. It will
only say the second if a retirement or a probe proves it.

### It splits sensibly as it fills up

Two different limits, two different fixes:

| When | What happens |
|---|---|
| a fact file gets long (~300 lines) | **splits by meaning** — `http-routes.md` + `messaging.md`, **never** `architecture-part2.md`, never `misc.md` |
| the map file gets long (~150 entries) | **tiers, never splits** — it keeps the map and the counts; the detail tables move into the files they describe |

The rule for splitting is one question: *could someone guess which file holds the answer, from
the question alone?* "Part 2" fails that, and `misc.md` is where facts go to die — nobody opens
it, so nobody re-checks it, so it rots while still looking verified.

If there is no natural seam, that is **information**: usually one concept is doing the work of
three, or the area is really two places. Both are reshape questions, not filing problems.

---

## The brain looks after itself

This skill **births** a brain and **versions** its template. Everything else is the brain's own
job — it should not need to come back here.

| Job | Who |
|---|---|
| Record facts, spot conflicts, drain the journal | the brain (automatic) |
| Mine past sessions for what it should know | the brain (automatic) |
| Re-check stale facts | the brain |
| Audit its own integrity | the brain, against its own `doctor.md` |
| Grow its own shape — a new file, zone, concept, rule, or script | the brain, via RESHAPE |
| Ask a neighbour brain for what it does not own | the brain, via CONSULT |
| Create a brain | **this skill** |
| Move a brain to a newer template | **this skill** (UPGRADE) |
| Change the template itself | **this skill** (HARVEST) |

### Reshaping — the brain grows, but only when it must

If something new appears that the brain has nowhere to put — a new environment, a new kind of
thing, a file that got too big, a rule that a generic law gets wrong — it adds it **itself**.
Four gates stop it growing clutter:

1. Driven by **evidence it already holds**, not by anticipation.
2. It has **bitten twice**, or it blocks one of your three questions.
3. **Nothing it already has** can hold it.
4. **You agree.** One line of reason, one line of change, then it waits.

It never removes a law and never removes a fact. Reshaping moves where knowledge lives, never
whether it is true.

---

## Two things you will hit

### A brain already covers this area

**Do not create a second one** — one brain owns one area, or the two will drift and neither can
be trusted. If the existing one is thin, deepen it instead:

```
/create-brain Upgrade <name>-brain to the current template, then deepen it. It is too
thin to answer without context. Keep every existing fact untouched. Add the Shape
record, its own doctor.md, CONSULT and RESHAPE. Then bootstrap deeply across the
whole repo and backfill from my past sessions.
```

Check `built.md` first — it lists which brains exist and which area each one owns.

### The question crosses two areas

A backend repo and its client, or a repo and the cluster it runs on, are **separate brains that
consult each other** — not one bigger brain:

```
/create-brain Create client-brain for the front-end at <path>, as a neighbour of
service-brain. client-brain owns the client; service-brain owns the backend;
cluster-brain owns anything deployed. Wire the CONSULT tables both ways so one
question can cross the HTTP boundary.
```

**Why separate:** the test for who owns a fact is **which zone proves it**. A config value read
from a file on disk is the repo brain's fact (`file:line` proof). The same key's value inside a
running container is the cluster brain's fact (command proof). Those are **two different facts**,
not one fact in two places — which is exactly why copying them into both brains goes wrong.

Three brains that ask each other beat one brain that copies.

---

## What is in this skill

| Path | What it is |
|---|---|
| `SKILL.md` | the 12 laws and the 7 modes (SCOPE, SHAPE, SCAFFOLD, BOOTSTRAP, UPGRADE, DOCTOR, HARVEST) |
| `reference/shape.md` | **the component menu** and the include-when tests — how a brain's files get chosen |
| `reference/recipes.md` | starting points per brain type: project, infra, API, data, process |
| `reference/bootstrap.md` | how to get the first real facts, per type |
| `reference/grammar.md` | the exact block formats and ID rules |
| `reference/neighbours.md` | how brains consult each other without copying |
| `reference/scripts.md` | when a brain may have code, and the contract it must meet |
| `reference/doctor.md` | the integrity checklist (for brains too old to audit themselves) |
| `templates/` | the files a new brain is made from |
| `scripts/brain-doctor.mjs` | runs the mechanical half of the audit. Zero dependencies, read-only, exit 1 if anything is unsafe |
| `built.md` | which brains exist, who owns which area, template history |
| `MAINTAINING.md` | for auditing or changing this skill itself — read it before you touch anything here |

### Checking a brain is healthy

```bash
node scripts/brain-doctor.mjs <path-to-brain>     # audit one brain
node scripts/brain-doctor.mjs --selfcheck .       # audit this skill's own templates
```

It settles the checks a machine can settle exactly — duplicate IDs, dangling links, dead proof
paths, stale facts, leaked secrets, oversized files — and **prints the ones it did not run**, so
the gap never looks like a pass. Exit 1 on anything unsafe, so CI can gate on it.

Zero dependencies: no `npm install`, nothing to keep up to date.

**A brain never needs it.** Every brain ships its own checklist and audits itself by hand if the
script is not there. The script only makes it faster — a brain that needed another tool installed
to stay healthy would not be finished.

---

## Honest limits

- **A brain is never "complete", and it is built to admit that.** It says *"Not in `<brain>` yet,
  here is the command"* rather than guessing. That refusal is the feature — it is what makes the
  ✅ facts worth trusting without checking.
- **Your statements are recorded as unverified (⚠️), however certain you sound.** Not distrust —
  people misremember their own systems. A fact turns ✅ only when real output or `file:line`
  proves it.
- **A fact older than 30 days is downgraded to "old"** when it is read. A brain that quietly ages
  into fiction is worse than an empty one.
- **One brain, one area.** If an area needs the word "and" to describe, it is probably two.
- **Facts are Markdown.** No service, no database. Share it with git, or copy the folder.
