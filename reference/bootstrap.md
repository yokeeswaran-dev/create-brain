# Bootstrap playbooks — getting the first real facts

A scaffold is an empty folder. Bootstrap is what makes it a brain.

**Two rules govern all of this, and you need both.** Each one alone produces a useless brain.

**Rule 1 — never guess.** 20 proven facts and 10 honest `Q-` gaps beat 60 facts where 40 are
guesses. A brain's whole value is that its ✅ claims can be trusted without checking. One
fabricated fact destroys that, because from then on everything must be checked.

**Rule 2 — breadth before depth.** Rule 1 alone licenses a brain that is perfectly honest and
completely useless: 20 deep facts about 2 modules out of 20 answers nothing, and the person
cannot tell from outside that it is thin. So bootstrap in **two passes**:

| Pass | Goal | What a fact looks like |
|---|---|---|
| **1 — breadth** | **name every top-level thing in the area.** Every module, endpoint group, zone, topic, table, step — nothing left unlisted | "this exists, here, at this path" with a `file:line`. Thin is fine; **absent is not** |
| **2 — depth** | only what the charter's three questions actually need | how it works, what it connects to, what breaks if it changes |

**Why breadth first:** "I have no facts about X" and "X does not exist" are completely different
answers, and only pass 1 lets the brain tell them apart. A brain that has *named* all 20 modules
and detailed 3 of them is immediately useful — it can route any question and say honestly where
it is shallow. One that detailed 3 and never looked at the rest cannot.

### Breadth has an altitude, and a cap

"Name everything" means **everything at the altitude the ontology declares** — not every file in
the repo. A 10,000-file monorepo has perhaps 12 modules; the modules are the entities, the files
are not. If pass 1 is producing a fact per file, the entity type is wrong, not the sweep.

And when one type genuinely has too many instances, **do not write 400 facts.** Record:

- the **count**, from the counting probe,
- the **probe itself**, so anyone can enumerate on demand,
- the handful that the charter's questions actually touch,
- a `Q-` holding the rest, with that same probe.

> `F-031: the API exposes 412 endpoints (see Q-006 for the enumeration probe). 9 are recorded —
> the ones the three charter questions touch.`

That is one honest fact plus a reusable probe, instead of 400 rows nobody reads and nobody
re-verifies. **A cap of roughly 100 instances per type** is the point to switch — past that the
facts rot faster than they earn their keep, and Coverage carries the real number anyway.

Then **record the ratio** (see "Coverage" below), so thinness is visible instead of being
discovered later when the brain fails someone.

## The common sequence (every brain type)

1. **Prove the access path first.** A brain that cannot reach its zone can verify nothing.
   Record it as `F-001` and as the zone's approved path in `ontology.md`. If a zone cannot be
   reached at all, record that too — "this zone is not reachable from here" is a real, useful
   fact.
2. **Sweep for entities** with the type's probe below. One `E-` row each, every row citing the
   fact that proves it exists.
3. **Sweep for relations.** Each edge needs the evidence its relation type requires. No
   evidence, no edge — open a `Q-` instead.
4. **Write the facts** — one claim each, with proof.
5. **Record the decisions you were told** as `D-`. Check for team rules already written down
   (a `CLAUDE.md`, an ADR folder, a project rules file, a README's conventions section) and seed
   `D-` from those with the file as `Source:`.
6. **Open a `Q-` for every gap.** Gaps are the most valuable bootstrap output — they are the
   agenda for VERIFY.
7. **Draw the graph.** Validate the mermaid before writing; add the text fallback. (Skip if the
   Shape record excluded `graph.md` — record the things as plain facts instead.)
8. **Fill `index.md`** completely, then run DOCTOR on yourself.
9. **Write the Coverage block** (below). Open a `Q-` for every shortfall.
10. **Check the charter is satisfied.** Take the three "Must answer" questions and actually answer
    them from the brain. An honest `Q-` against one is fine. **Nowhere to record the answer is
    not** — that is a shape error. Fix the shape now, and raise a `U-` in `upstream.md` if the
    include-when test in `shape.md` was what chose wrong.
11. **Report:** `<brain>: N facts, N entities, N relations, N decisions, N open questions` —
    plus the coverage line, which is the number that tells the person whether to trust it yet.

## Coverage — make thinness visible

A fact count says nothing on its own. **18 facts and 180 facts look identical from outside**,
and the only way anyone finds out a brain is too thin to use is when it fails them mid-task.

So pass 1 counted things. Record what it counted, next to what you recorded, in `index.md`:

```markdown
## Coverage

Counted at bootstrap, refreshed on every breadth sweep. _Last counted: <date>_

| Thing | Found | Recorded | Gap |
|---|---|---|---|
| module | 8 | 8 | — |
| http-endpoint | 47 | 12 | Q-004 |
| topic | 6 | 6 | — |
| config-key | 31 | 9 | Q-005 |
```

Rules that make it honest:

- **"Found" comes from a counting probe, not an estimate** — `ls`, a `grep -c`, a catalog query.
  Put the probe in the `Q-` so the next sweep re-runs the same one and the numbers are comparable.
- **Every gap gets a `Q-`.** A shortfall with no open question is just an unflattering number
  nobody acts on.
- **Never round up, and never leave a row out because it looks bad.** A visible `12 / 47` is the
  single most useful thing in a young brain — it tells the person exactly how far to trust it.
- **Refresh it on every breadth sweep.** A coverage table from three months ago is a `⚠️ (old)`
  fact about the brain itself.

## Stop rules

Stop the sweep when any of these happens — do not push on:

- The evidence runs out. Write the `Q-` and move on.
- You are about to record something because it is *probably* true. That is a guess; it needs a
  `Q-` or a ⚠️ (guess) badge with `Built from:`.
- A probe needs a write. Writes are not part of bootstrap. Ask, or record a `Q-`.
- A fact belongs to a neighbour brain's zone. CONSULT that brain and reference its ID — never
  copy its fact into a local `F-`. If the neighbour is not installed, record the boundary and
  the probe, and move on.
- The zone needs a tool that was not planned at SHAPE. Stop and say so: that is a reshape
  decision for the person, not something to improvise mid-sweep.

---

## Playbook — project / codebase brain

Read-only, all of it. Work outside-in: how it starts, then what it exposes, then what it calls.

| Step | Probe | What it yields |
|---|---|---|
| Entry point | `package.json` / `pom.xml` / `pyproject.toml` — the `main`, `scripts`, `dependencies` count | the `command` entities, the composition root, how it runs and is tested |
| Module map | list the top-level source dirs; find the registration/wiring function and grep for it | the `module` entities, each with a `file:line` proof |
| Wiring | grep the composition root for where each module is attached | the `registers` edges, each with `file:line` |
| HTTP surface | grep for route definitions (`app.get`, `@GetMapping`, router files) | the `http-endpoint` entities |
| Event surface | grep for emit/subscribe/consume calls | the `event` and `topic` entities |
| Outbound calls | grep for the HTTP client and the base-URL config keys | the `external-service` entities and `calls` edges |
| Config | read the config files; grep where each key is read | the `config-key` entities and `reads-config` edges |
| Tests | list the test dirs; read the test command and any coverage config | the `test-suite` entities, `covered-by` edges, and the real coverage floor |
| Conventions | read `CLAUDE.md`, `AGENTS.md`, ADRs, team rule files, `CONTRIBUTING.md` | the first `D-` decisions, cited to those files |
| History | `git log --oneline -20`, and the branch naming in use | how work flows here; often a `D-` about process |

**Order matters.** The wiring sweep before the route sweep: once you know how modules attach,
the routes group themselves by owner instead of becoming one flat list of hundreds.

**The honest `Q-`s this always leaves:** the complete route inventory of a large legacy entry
file, the complete event inventory, per-module coverage. Do not fake these — a partial
inventory presented as complete is worse than an open question, because nobody re-checks it.

---

## Playbook — infra / cluster brain

**Access and identity before anything else.** Record, per zone: the approved path, the
identity it acts as, and what that identity may do (`auth can-i`, `sts get-caller-identity`,
or the equivalent). Permission facts explain future "not found" answers that would otherwise
look like absence.

Then: zones → namespaces → workloads (stable names only) → services and routes → datastores
and how they are reached → identities and what they can reach.

**Do not record instance names as entities.** Pods, containers and task instances churn; they
belong inside proof blocks.

**Set every zone's action policy to check-only.** The person opens specific zones to
operate-by-default, by name, later.

---

## Playbook — API brain

Spec first (cheap, offline), live second (truth).

1. Read the spec on disk — endpoints, schemas, auth schemes, error codes. Every spec-derived
   fact is **⚠️ (you said)**: a published spec is a claim about behaviour, not evidence of it.
2. Make real read-only calls where allowed. Those upgrade facts to ✅.
3. **Where the spec and reality differ, record both and open a `C-`.** That difference is
   usually the single most valuable thing in the brain.
4. Find consumers by grepping the calling codebases for the paths.

---

## Playbook — data / schema brain

1. List databases, schemas, tables — read-only catalog queries only.
2. Record keys and foreign keys; these are the `references` edges and they are provable.
3. Lineage (`derived-from`) is usually **not** provable from the catalog. Ask, record as ⚠️
   (you said), and open a `Q-` naming what would prove it.
4. Keys must include the table — two same-named columns in different tables are different
   entities.

---

## Playbook — process / team brain

Mostly the person's words, so most facts start ⚠️ (you said) — correct, not weak.

1. Walk one real recent piece of work end to end, step by step, in their words.
2. Record steps, owners, gates, environments as entities; `precedes` edges give the flow.
3. Then look for the rare ✅ sources: CI config, pipeline files, branch protection, ticket
   templates, deployment scripts. These prove what actually gates what.
4. **Where the stated process and the CI config disagree, open a `C-`.** That gap is normally
   the real reason work gets stuck.
