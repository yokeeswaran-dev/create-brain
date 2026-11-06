# Shape — deciding what the brain is made of

The template set is a **menu, not a ruler.** This file is how you choose from it.

## Why this exists

The first brain this factory was generalised from matched almost none of the default file list.
It had `README-TEAM.md` and `scripts/`, a `topology.md` in place of a graph, and grouped its
facts by **place** (`environments/`, `access/`, `mesh/`, `security/`) instead of by
`facts/<area>.md`. It had no `ontology.md`, no `graph.md`, no `plans/`. Its own `SKILL.md` said
*"Files and folders — you decide the layout"*, and it carried three area-specific sections that
the generic template had no way to produce.

That was not that brain being wrong. That was the shape its area demanded. The fixed file list
was the thing that was wrong.

A brain handed every generic file when it needed six of them plus a setup guide is a worse
brain: it carries empty ceremony the reader has to skim past, and it is missing the one file the
team actually needed.

## The rule that keeps adaptation honest

> **Adaptation chooses from the menu. It never invents content.**

Dropping `graph.md` because no question needs more than one hop is adaptation. Writing a
`graph.md` full of plausible edges is the failure law 2 exists to prevent. Shape decides
**which files exist**; evidence decides **what goes in them**. Those two never trade places.

## How to decide — use the charter

The charter's **Must answer** list (the 3 real questions from SCOPE) is the test. For each
component below, ask:

> *Which of the 3 questions cannot be answered without this?*

None → leave it out, and record that in the Shape record. This is what ties the brain's shape to
what the person actually wanted instead of to a template.

## When the test is borderline — the asymmetry rule

Several tests land on a maybe. **Do not flip a coin, and do not reach for a blanket default:**
ask which mistake costs more for *that specific component*, and make the cheaper mistake.

| Component | Cost of having it needlessly | Cost of lacking it when needed | Borderline → |
|---|---|---|---|
| `ontology.md` | one small file, mild ceremony | Keys collide, facts become unfindable, and doctor check 15 cannot run at all | **IN** |
| `decisions.md` | an empty file | conventions live nowhere, and PLAN cannot detect a kind-B conflict | **IN** |
| `conflicts.md` | an empty file | a contradiction has nowhere to go at the exact moment it matters most | **IN** |
| `plans/` | an empty folder | ACT has no gate — the one failure that can damage the area | **IN** |
| `graph.md` | empty tables, law 12 ceremony | no blast radius, so PLAN loses its safety check | **IN** if the brain can write; **OUT** if read-only |
| `README-TEAM.md` | TODOs nobody fills in | a teammate follows a wrong step and loses an hour, and trust with it | **IN** above one person |
| `journal.md` | DOCTOR nags about staleness forever | evidence lost during one long session | **OUT** |
| `secrets.example.md` | **invites someone to put a real value in a shared folder** | one extra setup step | **OUT** |
| `scripts/` | a stale wrapper to maintain | a zone is unreachable — but you find out immediately | **OUT** |
| custom fact layout | folders holding one file each | one file passes 300 lines, then RESHAPE splits it — cheap | **OUT** |
| `upstream.md` | an empty file | nothing: it is created on the first `U-` | **OUT** |

**Why this beats one blanket rule.** "When unsure leave it out" is right for `journal.md` and
actively wrong for `plans/` — an ACT with no plan gate is the only shape error that can break the
area rather than just annoy a reader. And `secrets.example.md` is the one component where having
it needlessly is the *greater* hazard, because an unused credentials template in a shared folder
is an invitation.

The RESHAPE escape hatch is real but not symmetric either: **adding** a component later is cheap
(IDs survive a move, law 4), while **removing** one that has accumulated content means deciding
what to do with that content. That is why the table leans IN wherever the content matters.

---

## Tier 1 — the spine (always, no test)

Five things. Below this it is not a brain.

| Component | Why it is unconditional |
|---|---|
| `SKILL.md` | the laws, the modes, and the frontmatter. Without the frontmatter nothing auto-loads and the brain is invisible (law 5). |
| `index.md` | the map. Every mode starts by reading it. Carries the charter, the Shape record and the reshape rubric. |
| `changelog.md` | the audit trail. A brain whose history is unknown cannot be trusted by a second person. |
| `doctor.md` | its own integrity checklist. A brain that needs another skill to stay healthy is not finished — **trim its rows to the shape, never drop the file.** |
| at least one fact file | a brain with no facts is a folder. |

---

## Tier 2 — conditional components

Each has an **include-when** test. If the test does not pass, leave it out and say so in the
Shape record — an omission that is written down is a decision; an omission that is silent is a
defect.

| Component | Include when | If skipped |
|---|---|---|
| `ontology.md` | **2+ zones**, or the recipe is a **type-rich** one (project / infra / api / data — see `recipes.md`), or two things share a name and must be told apart. **Default IN** | asked | put the Key grammar and the zone list as a short section in `index.md` — the Key rule itself is never skipped, only the file. Realistically this is only out for a single-zone `process` brain with two or three kinds of thing |
| `graph.md` | a real question needs **more than one hop** ("what breaks if I change X", "how does A reach B", "who depends on this") | asked | drop `E-`/`R-` IDs and law 12's blast-radius step with them. Say so, because PLAN loses its safety check |
| `decisions.md` | the area has **settled choices that should constrain future work** (conventions, patterns, "we always do X") | asked | a pure observation brain has no authority over how work is done; keep `D-` out entirely rather than leaving an empty file |
| `conflicts.md` | **2+ writers**, or **2+ evidence sources that can disagree** (spec vs live, two clusters, doc vs code) | asked | keep the conflict **process** in `SKILL.md` regardless — a single-source brain can still meet a contradiction — but hold the entries in `index.md` until there is a second one |
| `journal.md` | evidence arrives **faster than it can be distilled** — long live-debugging sessions, noisy command output | inferred | if capture is always immediate, the journal is an empty file that DOCTOR then checks for staleness forever |
| `plans/` | the brain may **change** anything (any ACT at all) | asked | a reference-only brain should drop PLAN and ACT from its modes too, and say so. Do not keep the modes and omit the folder |
| `secrets.example.md` | reaching **any** zone needs a credential | asked | never scaffold it "just in case" — an unused secrets template invites someone to fill it in a shared folder |
| `scripts/` | a zone **cannot be reached or verified** without a tool, and no existing CLI does it in one step | asked | see `scripts.md`. The classic case is a cluster behind a jump host: with no query wrapper, that brain cannot verify a single fact |
| `README-TEAM.md` | **2+ people** will use or write it, or setup is **more than 2 steps**, or it lives on **shared storage** (a synced cloud folder or a network drive) | a solo local brain needs no onboarding guide. A shared one needs it badly — see the template |
| `upstream.md` | the person wants the **improvement loop** back to `create-brain` | inferred | otherwise the brain creates it lazily on its first `U-`. Do not scaffold an empty one |
| **custom topic layout** | facts group naturally by **place or subsystem** rather than falling into one bucket | replaces `facts/<area>.md` with real folders — `environments/`, `access/`, `mesh/`. Easier to find things, and splits before the 300-line limit bites |

### Counting entity types at SHAPE time — don't

An earlier version of the `ontology.md` test read *"4+ entity types"*, and it was **vacuous**:
you do not know your real types until BOOTSTRAP has swept the area, and the recipe hands you ten
of them up front, so every project brain passed the test before any evidence existed. A test that
always passes is not a test.

The replacement is decidable at SHAPE time because it asks about the **recipe**, not about the
area's eventual contents. `recipes.md` marks each recipe type-rich or type-poor; only the
type-poor one can land outside, and only then with a single zone.

**The general lesson, which applies to any new test added here:** a shape test may only use what
is knowable *before* the sweep — the charter, the zones, the recipe, the number of people. Any
test that needs the facts in order to decide which file the facts go in is circular, and will
quietly answer "yes" every time.

---

## Tier 3 — area-specific `SKILL.md` sections

**This tier matters most and the generic template cannot produce it.** These are the rules that
are true of this area and of nothing else. They go in the generated `SKILL.md` as their own
`## ` sections, below the laws.

Write one whenever the area has a rule a generic brain would get wrong. Three worked examples,
all taken from a cluster brain:

| Section | What it pins down | Why generic laws were not enough |
|---|---|---|
| **Access rule — the wrapper only** | every cluster query goes through the approved wrapper (SSH to a jump host, then a containerised CLI); output from a locally-installed CLI is **not accepted as proof** | law 10 says "one approved path per zone" but cannot know that the local CLI authenticates as a *different identity with different permissions* and silently returns different answers to the same question |
| **Operation policy — `main` vs `sandbox`** | `sandbox` is operate-by-default; `main` is check-only | law 6 defaults everything to ask-first; only the person knows which namespace is the safe playground |
| **Shared-folder write discipline** | append-mostly, never settle a disagreement by picking a side, run the conflict-copy check | law 4 covers overwriting, but not a sync client keeping **both** edits and hiding one under a different filename with no warning |

Each section states: **what the rule is, when it was set, and what happens if it is broken.**
Date them — `(set 2026-10-14)` — so a reader can tell a current rule from a stale one.

A good brain usually has **1 to 4** of these. Zero is a signal you have not asked the person
enough. More than about six means some belong in `decisions.md` as `D-` entries instead: a
`SKILL.md` section is a rule the brain must *obey*; a `D-` is a choice the team *made*.

---

## Mode trimming

The 11 modes are not all needed by every brain. Trim and record it.

| Brain kind | Modes it needs | Drop |
|---|---|---|
| Reference / read-only | OBSERVE, CAPTURE, ANSWER, VERIFY, BACKFILL, DOCTOR, RESHAPE, PROPOSE | PLAN, ACT (and `plans/`) |
| Project / codebase | all 11 | — |
| Infra with a safe zone | all 11 | — |
| Solo, single-source | all but CONSULT | CONSULT, until a neighbour brain exists |

**Five are never trimmed:** OBSERVE, CAPTURE, ANSWER, DOCTOR and RESHAPE. Those are what make it
a brain that can look after itself — a brain that cannot audit or grow itself has to come back
to this factory for the rest of its life, which is the thing v3 set out to end.

Dropping a mode means **removing its section from `SKILL.md`**, not leaving it in unused. An
unused mode is a promise the brain cannot keep. Record every drop in the Shape record so UPGRADE
does not "helpfully" add it back — and so RESHAPE knows it may restore one when the reason
changes (a read-only brain that is later asked to change things needs PLAN and ACT back).

---

## Growing — how a brain splits as it fills up

Two different limits, hit at different times, with **different fixes.** Do not confuse them.

### Limit 1 — a fact file passes ~300 lines

**Split by meaning. Never by size.**

A file getting long is not a size problem, it is a **signal that it holds more than one topic.**
Find the seam and name both halves for what they hold:

| Do this | Never this |
|---|---|
| `architecture.md` → `http-routes.md` + `messaging.md` + `config.md` | `architecture-part2.md` |
| `environments.md` → `staging.md` + `prod.md` | `environments-2.md`, `environments-old.md` |
| — | `misc.md`, `other.md`, `general.md` |

**The test:** *could someone guess which file holds the answer, from the question alone?*

- "Which topic owns `/orders`?" → obviously `http-routes.md`. **Good split.**
- "Is it in part 1 or part 2?" → unanswerable. **The split failed**, and every lookup now has to
  go through `index.md` — which is the very thing that gets too big next.

`misc.md` is banned for the same reason: it is where facts go to die. Nobody looks there, so
nobody re-checks what is in it, so it rots while still reading ✅.

**What if there is genuinely no seam?** That is rare, and it is information. It usually means one
of two things, and both are RESHAPE questions rather than filing problems:

- **the entity type is too coarse** — 200 facts all keyed `code.module.*` means `module` is doing
  the work of three types. Split the type in `ontology.md` and the files follow.
- **the area is really two zones** — then split by zone, which is always guessable.

If neither is true, split on a **stable, guessable dimension** — by zone, or by Key prefix
(`code-a-m.md` / `code-n-z.md`) — never by insertion order. Alphabetical is ugly but findable;
"part 2" is neither.

**Splitting is always safe:** an **ID never changes when its block moves** (law 4). `F-012` stays
`F-012` in its new file, keeps its History, and `index.md` records where it lives now.

### Limit 2 — `index.md` passes ~150 IDs

This one is about **load cost, not findability.** `index.md` is read before every single answer,
and it carries a row per fact, entity, relation, decision, question and plan. Fact files are read
on demand; the index is not.

So it **tiers** rather than splits — a split map is no map:

| Brain size | `index.md` holds |
|---|---|
| under ~150 IDs | everything: the full per-ID tables. One place to look, which is simpler and worth it while it fits |
| over ~150 IDs | the map only — charter, Shape record, reshape rubric, neighbour table, zones, scripts, open conflicts, **counts**, and a **file → what is inside it** table. The per-ID tables move to the top of the file they describe |

Lookup changes from *scan one big table* to *read the map → open the right file → scan its local
table*. **That is why Limit 1 matters first:** if files are named for what they hold, the map is
enough to find anything. If they are named `part2`, tiering the index makes the brain unusable.

**`index.md` itself never splits**, and the charter, Shape record and neighbour table never leave
it. Those are the things every mode needs before it can do anything.

---

## Four of these tests are inferences, not answers — label them

SCOPE asks **7 questions**, deliberately capped so it is not an interrogation. But the tests
above need more than those 7 answers. Mapping them honestly:

| Test | Decided from |
|---|---|
| `ontology.md` | **asked** — zones (Q2); plus the recipe |
| `graph.md` | **asked** — the three questions (Q3) |
| `conflicts.md` | **asked** — users (Q7) and evidence sources (Q6) |
| `plans/` | **asked** — actions (Q4) |
| `secrets.example.md` | **asked** — how each zone is reached (Q2) |
| `scripts/` | **asked** — how each zone is reached (Q2) |
| `README-TEAM.md` | **asked** — users (Q7) |
| `decisions.md` | **inferred** — nobody is asked "do you have conventions"; read it off Q3 and Q6 |
| `journal.md` | **inferred** — nobody is asked whether evidence arrives in bursts |
| custom fact layout | **inferred** — from whether the recipe's entities group by place |
| `upstream.md` | **inferred** — never asked; defaults to lazy |

**So mark every Shape row with where it came from, and say the inferred ones out loud when you
show the table.** Those four are the rows most likely to be wrong, because nobody confirmed
them — and the agreement step is the only thing standing between an inference and a permanent
decision. "I assumed you have written conventions, so `decisions.md` is in — correct me" takes
one line and is the whole safeguard.

Do **not** fix this by adding questions 8 to 11. The 7-question cap exists because an
interrogation up front is how people abandon a tool before it has done anything useful. Infer,
label, and let one glance at the table correct you.

## The Shape record

Write this into the generated `index.md`, right after the Charter. It is what makes adaptivity
safe: without it, DOCTOR cannot tell a deliberate omission from a missing file, and UPGRADE
cannot tell what to leave alone.

```markdown
## Shape

Decided at creation from the charter's "Must answer" list. See `create-brain/reference/shape.md`.
`From` is `asked` (an answer), `inferred` (my reading — check it) or `recipe`.

| Component | In? | From | Why |
|---|---|---|---|
| `ontology.md` | yes | asked | 3 zones with different identities |
| `graph.md` | yes | asked | Q2 ("what breaks if I change X") needs blast radius |
| `decisions.md` | yes | asked | team has written conventions |
| `conflicts.md` | yes | asked | spec and live can disagree |
| `journal.md` | no | inferred | capture is immediate; no long debug sessions |
| `plans/` | yes | asked | brain may change code |
| `secrets.example.md` | no | asked | all zones are local files, no credentials |
| `scripts/` | no | asked | `kubectl` reaches every zone in one command |
| `README-TEAM.md` | yes | 4 people, lives on the shared drive |
| `upstream.md` | lazy | inferred | created on first `U-` |
| fact layout | `environments/` + `access/` | inferred | facts group by cluster, not by one topic |
| Modes dropped | none | asked | — |
| Area sections | Access rule; Operation policy | asked | see `SKILL.md` |
```

## Reshaping later — the brain does this itself

Shape is a decision, not a cage. When a brain outgrows its shape — a second writer appears, a
question starts needing two hops, a zone becomes unreachable without a script, a fact file
passes 300 lines, the evidence keeps showing a thing the ontology has no type for — **that is the
brain's own RESHAPE mode, not an UPGRADE.** It notices the need, proves it from facts it already
holds, asks the person once, moves blocks without changing an ID, and updates its own Shape
record.

So the include-when tests above are not only yours. Copy the short version of them into the
brain's `index.md` as the **reshape rubric** (`brain-index.md` has the table), because the brain
cannot read this file — it is a different skill. That copy is what lets it grow without coming
back here.

**UPGRADE is only for template-version changes** — a v1 brain that has no Shape record, no
`doctor.md`, no CONSULT and no RESHAPE cannot yet maintain itself, so the factory has to hand it
those mechanisms once. After that it is on its own.

If a brain keeps hitting the same missing thing, that is not a brain problem, it is a **factory**
problem: it raises a `U-` in `upstream.md` so the include-when test in this file gets fixed for
everyone. See `neighbours.md` → "Feeding the factory".
