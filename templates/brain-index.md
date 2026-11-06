# <BRAIN-NAME> — index

_Last updated: <date>_

The map for this brain. **Always read this file first.** If a file listed here does not exist,
or a file exists that is not listed, **fix this file before answering anything**.

## Charter

- **Area:** <TODO: one sentence>
- **Owns:** <TODO: what facts belong here>
- **Does NOT own:** <TODO: what belongs to a neighbour brain, naming the brain>
- **Zones:** <TODO: list — full detail in `ontology.md`>
- **Action policy:** observe + plan; ask before any write. <TODO: note any operate-by-default zone>
- **Must answer:** 1) <TODO> 2) <TODO> 3) <TODO>
- **Evidence sources:** <TODO: list>
- **Users:** <TODO: solo | team of N, shared by git | shared storage>
- **Created:** <date> by <who>, from the `create-brain` template <version>.

## Shape

What this brain is made of, and **why**. Decided at creation from the "Must answer" list above,
using the include-when tests in `create-brain/reference/shape.md`.

**A component marked `no` is deliberately absent, not missing.** DOCTOR must not report it as a
fault, and UPGRADE must not add it back unless the reason has changed.

`From` says where each row came from: `asked` (a SCOPE answer), `recipe`, or **`inferred`** — my
own reading, which nobody confirmed. **The inferred rows are the ones to check.**

| Component | In? | From | Why |
|---|---|---|---|
| `ontology.md` | <TODO> | asked | <TODO: 2+ zones, a type-rich recipe, or names that clash. Default IN> |
| `graph.md` | <TODO> | asked | <TODO: does any of the 3 questions need more than one hop?> |
| `decisions.md` | <TODO> | **inferred** | <TODO: are there settled choices that should constrain future work? Nobody is asked this directly> |
| `conflicts.md` | <TODO> | asked | <TODO: 2+ writers, or 2+ sources that can disagree?> |
| `journal.md` | <TODO> | **inferred** | <TODO: does evidence arrive faster than it can be distilled? Nobody is asked this directly> |
| `plans/` | <TODO> | asked | <TODO: may this brain change anything at all?> |
| `secrets.example.md` | <TODO> | asked | <TODO: does reaching any zone need a credential?> |
| `scripts/` | <TODO> | asked | <TODO: can every zone be reached by an existing CLI in one step?> |
| `README-TEAM.md` | <TODO> | asked | <TODO: 2+ people, >2 setup steps, or shared storage?> |
| `upstream.md` | lazy | **inferred** | created on the first `U-`; never asked about |
| fact layout | <TODO> | **inferred** | <TODO: `facts/<area>.md`, or real folders if facts group by place> |
| Modes dropped | <TODO: none> | asked | <TODO: e.g. PLAN + ACT — this brain is read-only> |
| Area sections | <TODO> | asked | <TODO: the Tier 3 rules added to `SKILL.md`> |

### The rubric — when a component earns its place

RESHAPE uses this to judge whether something new is **genuinely needed**. It lives here so I
never have to read another skill in order to grow.

| Component | Earns its place when |
|---|---|
| `ontology.md` | 2+ zones, or a type-rich area, or two things share a name. **Default in** |
| `graph.md` | a real question needs **more than one hop** ("what breaks if I change X") |
| `decisions.md` | there are settled choices that should constrain future work |
| `conflicts.md` | 2+ writers, or 2+ evidence sources that can disagree |
| `journal.md` | evidence arrives faster than it can be distilled |
| `plans/` | I may change anything at all (any ACT) |
| `secrets.example.md` | reaching any zone needs a credential |
| `scripts/` | a zone cannot be reached by an existing CLI in one step |
| `README-TEAM.md` | 2+ people, or setup is more than 2 steps, or shared storage |
| custom fact layout | facts group naturally by place or subsystem |
| a new ontology type | the evidence keeps showing a thing no existing type fits |
| an area section in `SKILL.md` | a rule is true of this area that a generic law gets wrong |

**Plus the four gates in `SKILL.md` → RESHAPE:** driven by evidence I already hold; it has bitten
twice or it blocks a charter question; nothing I already have can hold it; and the person agrees.

**If a call is borderline, ask which mistake costs more** — it is not one blanket default.
Borderline **in**: `ontology.md`, `decisions.md`, `conflicts.md`, `plans/`, `README-TEAM.md`
(lacking them breaks something). Borderline **out**: `journal.md`, `secrets.example.md`,
`scripts/`, a custom layout, `upstream.md` (having them needlessly is the worse cost — an unused
credentials template in a shared folder is an invitation). Adding later is cheap because IDs
survive a move; removing something that has filled up is not.

## Neighbour brains

A fact belonging to another brain's zone is **referenced, never copied** — write
`<other-brain>:F-nnn`. If that fact turns out to be wrong, open the conflict **in that brain**.

**This brain works alone.** With every neighbour absent it still answers its own charter in
full, and says which part is owned elsewhere plus the probe that would get it.

| Brain | Owns | Reference as | How to consult |
|---|---|---|---|
| <TODO: e.g. cluster-brain> | <TODO: the clusters — namespaces, pods, access paths> | `cluster-brain:F-nnn` | <TODO: invoke the `cluster-brain` skill. Ask it for <what it owns>, not for <what it does not>. Carry its fact IDs verbatim. If absent: say "<that part> is owned by `cluster-brain`, which is not installed here" and give the probe.> |

## Files

<TODO: delete the row for every component the Shape record marks `no`. A row pointing at a file
that does not exist sends every mode looking for it.>

| File | What is inside |
|---|---|
| `SKILL.md` | The 12 laws, the modes, the fact format, the read-only probe list. |
| `index.md` | This map. |
| `changelog.md` | Every change, dated. |
| `doctor.md` | My own integrity checklist. I audit myself; no other skill is needed. |
| `facts/<area>.md` | <TODO: name each fact file for **what it holds**, so the right one is guessable from the question.> |
| `ontology.md` | Zones, entity types, relation types, Key grammar. |
| `graph.md` | Node table, edge table, mermaid diagram, how to walk it. |
| `decisions.md` | `D-` settled choices. |
| `conflicts.md` | `C-` conflicts, open and closed. |
| `plans/` | `P-` feature plans. `TEMPLATE.md` is the shape. |
| `journal.md` | Raw evidence inbox, drained into facts at capture time. |
| `secrets.example.md` | Secrets template. Real values live outside this folder. |
| `README-TEAM.md` | Setup guide for a teammate. |
| `upstream.md` | `U-` proposals back to `create-brain`. |

## Scripts

<TODO: delete this section if the Shape record says no scripts. Each one must meet the contract
in `create-brain/reference/scripts.md`: read-only by allowlist, writes behind an explicit flag,
secrets outside this folder, and it never writes to the brain's own files.>

| Path | What it does | Can it write? |
|---|---|---|
| <TODO: `scripts/x.js`> | <TODO> | <TODO: no — reports only / only with `--<flag>`, in <zone> only> |
| `scripts/brain-doctor.mjs` | the mechanical half of my own DOCTOR checklist. Optional — I audit myself without it | no — reports only, exit 1 if anything is unsafe |

## Block formats

`F-` is in `SKILL.md`. The rest:

```
### E-nnn: <entity name>
- Type: <entity type from ontology.md>
- Zone: <zone>
- Key: <zone>.<type>.<name>
- Identity: <the stable name — never an instance name>
- Status: retired <date> — <why>      (omit entirely while live)
- Facts: F-nnn, F-nnn
- Edges out: R-nnn, R-nnn
- Edges in: R-nnn
```

```
### R-nnn: <from> --<relation>--> <to>
- Relation: <relation type from ontology.md>
- From: E-nnn
- To: E-nnn
- Badge: ✅ VERIFIED | ⚠️ UNVERIFIED (reason)
- Evidence: F-nnn   (the fact that proves this connection)
- Note: <anything that matters about the direction or conditions>
```

```
### D-nnn: <the choice, in one line>
- Status: active | superseded by D-nnn
- Decided: <date>, by <who>
- Context: <what forced a choice>
- Decision: <what we do now>
- Why: <the reason>
- Rejected: <the other options and why not>
- Source: <my words | file:line | a team rule file>
- Applies to: E-nnn, E-nnn   (or "all of <area>")
- Links: F-nnn, P-nnn
```

```
### Q-nnn: <the question, in one line>
- Opened: <date>
- Why it matters: <what cannot be answered or planned without it>
- Probe that closes it: `<the exact read-only command or file to read>`
- Blocks: P-nnn, F-nnn
- Status: open | closed <date> by F-nnn
```

`C-` is in `conflicts.md`. `P-` is in `plans/TEMPLATE.md`. `S-` is in `secrets.example.md`.

## Zones

| Zone | What it is | Approved path | Action policy | Facts |
|---|---|---|---|---|
| <TODO> | <TODO> | <TODO> | observe + plan | <TODO> |

## Coverage

How much of the area is actually recorded. **A fact count alone says nothing** — 18 facts and
180 facts look identical from outside, and without this the only way anyone discovers this brain
is too thin is when it fails them mid-task.

_Last counted: <date>_

| Thing | Found | Recorded | Gap |
|---|---|---|---|
| <TODO: entity type> | <TODO: from a counting probe> | <TODO> | <TODO: Q-nnn, or —> |

- **"Found" comes from a counting probe, never an estimate** — `ls`, `grep -c`, a catalog query.
  Keep the probe in the `Q-` so the next sweep re-runs the same one and the numbers compare.
- **Every gap gets a `Q-`** — and **create that `Q-` in the same step.** A shortfall with no open
  question is an unflattering number nobody acts on, and a `Q-` id written here but never created
  is a dangling link that DOCTOR will report forever.
- **Never round up, and never drop a row because it looks bad.** A visible `12 / 47` is the most
  useful thing in a young brain: it tells the person exactly how far to trust it.
- Refresh on every breadth sweep. A three-month-old coverage table is a `⚠️ (old)` fact about
  me.

## Size and tiering

| Limit | Fix |
|---|---|
| a fact file past ~300 lines | RESHAPE: split **by meaning**, never `-part2` or `misc` |
| this file past ~150 IDs | RESHAPE: keep the map and counts here; move the per-ID tables to the top of the file each one describes |

This file is read before **every** answer — fact files are read on demand, this one is not — so
it is the only file whose length is a permanent running cost. It **never splits**: the charter,
Shape record, rubric and neighbour table always stay here.

## Facts

`Status` is blank while live and `retired <date>` once the thing is gone. **It is a separate
column from `Badge` on purpose:** the badge says how well the fact was known and never changes
on retirement — a retired ✅ was true and its proof is still real.

| ID | Key | Title | Zone | Badge | Status | File | Last checked |
|---|---|---|---|---|---|---|---|
| | | | | | | | |

_Retired rows stay listed. Whoever finds an old reference needs to learn it was retired on
purpose, not lost._

## Entities

| ID | Type | Name | Zone | Status | Facts |
|---|---|---|---|---|---|
| | | | | | |

## Relations

| ID | From | Relation | To | Badge | Status | Evidence |
|---|---|---|---|---|---|---|
| | | | | | |

## Decisions

| ID | Decision | Status | Decided |
|---|---|---|---|
| | | | |

## Open questions

| ID | Question | Probe | Blocks | Opened |
|---|---|---|---|---|
| | | | | |

## Plans

| ID | Goal | Status | File |
|---|---|---|---|
| | | | |

## Open conflicts

_(none)_

## Secrets

| ID | What it is | Zone | Used for |
|---|---|---|---|
| | | | |

Real values live outside this folder — see `secrets.example.md`. Never add a value here.
