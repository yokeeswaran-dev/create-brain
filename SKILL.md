---
name: create-brain
description: The brain factory. Creates a new self-maintaining "brain" skill for any area — a project, a codebase, an API, a database, a cluster, a team process — shaped to what that area actually needs: verified facts with proof, a typed ontology, a walkable knowledge graph, PLAN/ACT modes so the brain can do assigned work without breaking things, its own integrity checklist, and where the area demands it, its own read-only scripts and a team setup guide. The brain it builds captures, backfills, audits and reshapes itself without being asked and without needing this skill again. Use it to SCOPE what kind of brain is needed, SHAPE which files and powers it gets, SCAFFOLD the folder, BOOTSTRAP the first real facts from evidence, UPGRADE a brain built on an older template, DOCTOR a brain that cannot yet audit itself, or HARVEST the improvements a brain has proposed back into this template. Always use when asked to "create a brain", "make a skill that understands X", "build a memory for this project", "I need a brain for <area>", "set up a knowledge graph for X", "make a skill like my other brain skill", "upgrade my brain skill", or "check my brain skill".
---

# create-brain — the factory that builds brain skills

A **brain** is a skill that holds the truth about one area and then works inside it.
It remembers facts with proof, refuses to guess, keeps a typed ontology and a knowledge
graph, turns an idea into a fact-backed plan, and does the work without breaking things.

Brains are plain Markdown skills. This one builds them.

Your job here is **not** to answer questions about any system. Your job is to **build a brain
that can**. You have 7 modes: SCOPE, SHAPE, SCAFFOLD, BOOTSTRAP, UPGRADE, DOCTOR, HARVEST.

## Laws of brain-building (never break)

1. **Shape follows the requirement, not the template.** The file list is a **menu**, not a
   ruler. Decide what the brain is made of from the charter's three real questions, using the
   include-when tests in `reference/shape.md`, and **write the choice into the brain's Shape
   record**. A brain that gets 11 generic files when it needed 6 plus a setup guide is a worse
   brain. The first brain this pattern was generalised from matched almost none of the default list.
2. **Markdown first. Scripts only as a capability layer.** Knowledge lives in `.md` files,
   always. A script is allowed when a zone **cannot be reached or verified without one** — a
   cluster behind a jump host is the classic case — and then it meets the contract in
   `reference/scripts.md`: read-only by
   allowlist, writes behind an explicit flag, secrets resolved outside the folder,
   `node_modules` never part of the brain, and the brain still answers honestly when the script
   cannot run. A script never stores facts and never writes to the brain's files.
3. **A scaffold is never finished with invented content.** Anything not known from evidence or
   from the person stays as a visible `<TODO: ...>` marker. A placeholder is honest; a guess
   that looks like a fact is the one failure that destroys a brain's value. Law 1 chooses which
   files exist; it never licenses filling them in.
4. **BOOTSTRAP must produce real facts.** Every `F-` written during bootstrap carries proof —
   a command with its output, or `file:line`, or the person's exact words. An empty brain is
   acceptable; a brain full of plausible fiction is not.
5. **The generated `SKILL.md` must have frontmatter with `name:` and a trigger-rich
   `description:`.** The description is the only thing that makes the skill auto-load. Refuse to
   call a scaffold complete without it. See "Writing the description" below.
6. **Never invent a brain's laws.** Copy the 12 laws from `templates/brain-SKILL.md` as they
   are. Area-specific rules are **added** as their own `SKILL.md` sections (Tier 3 in
   `shape.md`) — never substituted for a law, never silently dropped. A dropped **mode** is
   recorded in the Shape record; a dropped **law** is not allowed.
7. **UPGRADE never touches existing facts.** It adds missing files, sections and modes. It does
   not rewrite, renumber or delete any `F-`, `C-`, `S-` or their History — and it does not add
   back a component the Shape record says was deliberately left out.
8. **One brain owns one area; neighbours are consulted, never copied.** Before creating a
   brain, check `built.md` for overlap. A fact belonging to another brain is referenced as
   `<brain>:F-nnn` and fetched by invoking that skill. Every brain must still answer its own
   charter completely with every neighbour absent. See `reference/neighbours.md`.
9. **Secrets never enter a brain folder.** Scaffold `secrets.example.md` only, and point the
   real file outside the folder.
10. **Log what you did.** Every brain you create or change gets a `changelog.md` entry dated
    today, and this folder's `built.md` gets one line.
11. **A brain proposes; the factory decides.** A brain records friction caused by this template
    as a `U-` in its `upstream.md` and **never edits `create-brain` itself**. HARVEST triages
    those and writes the result back — including rejections, with the reason.
12. **Do not change these laws unless asked.**

## Mode 1 — SCOPE (what brain is needed)

Trigger: "I need a brain for X", "create a brain", "make a skill that understands X".

Ask **at most 7 questions**, in one batch, skipping any the person already answered:

1. **Area** — what is the one area this brain owns? (One sentence. If it needs "and", it is
   probably two brains.)
2. **Zones** — what distinct places exist inside it, and **how is each reached**? (A cluster
   brain's zones are typically `local`, `staging`, `prod`; a project brain's are usually `code`
   and `runtime-local`.) The *how* is what decides whether a script is needed.
3. **Questions it must answer** — name 3 real questions the person wants answered without
   feeding any context. This is both the acceptance test for the brain **and** the test SHAPE
   uses to pick its files.
4. **Actions it may take** — default is **observe + plan, ask before any write**. Ask whether
   any zone should be operate-by-default (a `sandbox` namespace usually can be; `prod` never is).
5. **Where it lives** — project brain → the repo's `.claude/skills/<name>/` (git-shared);
   cross-project brain → `~/.claude/skills/<name>/`.
6. **Evidence sources** — what may be read to learn the truth? (repo files, a read-only CLI, a
   DB, docs, the person's own knowledge.)
7. **Who else uses it** — just them, or a team? If a team, do the files travel by **git** or by
   **shared storage** (a synced cloud folder or a network drive)? This decides `README-TEAM.md`
   and whether the brain needs shared-folder write discipline.

Then pick the matching recipe from `reference/recipes.md` (project / infra / api / data /
process) and write the **charter** — paste this into the new brain's `index.md`:

```markdown
## Charter
- Area: <one sentence>
- Area root: <the path all relative proof paths start from, e.g. `../../..` for a repo brain>
- Owns: <what facts belong here>
- Does NOT own: <what belongs to a neighbour brain, with the brain's name>
- Zones: <list>
- Action policy: <default + any operate-by-default zone>
- Must answer: 1) … 2) … 3) …
- Evidence sources: <list>
- Users: <solo | team of N, shared by git | shared storage>
- Created: <YYYY-MM-DD> by <who>
```

**`Area root` is not optional.** Proof paths are recorded relative to it so they resolve on every
machine, not just the one the brain was built on. Without it, doctor check 30 cannot run and a
teammate sees every `file:line` proof as dead. Dates are `YYYY-MM-DD` everywhere, because the
30-day staleness rule is arithmetic.

Name the brain `<area>-brain` (`service-brain`, `api-brain`, `billing-brain`). Keep it short — it is
typed as `/<name>`.

## Mode 2 — SHAPE (what the brain is made of)

Trigger: straight after SCOPE. **Never skip it** — skipping it is choosing the full generic file set
by default, which is law 1's failure.

Read `reference/shape.md` and work the catalogue:

1. **Tier 1 — the spine.** `SKILL.md`, `index.md`, `changelog.md`, one fact file. No test;
   always in.
2. **Tier 2 — conditional components.** For each, apply its include-when test against the
   charter's three questions: *which of them cannot be answered without this?* None → out.
   When a test lands on a maybe, use the **asymmetry rule** in `shape.md` — ask which mistake
   costs more for *that* component and make the cheaper one. It is not one blanket default:
   borderline `plans/` goes **in** (an ACT with no gate can damage the area), borderline
   `secrets.example.md` goes **out** (an unused credentials template in a shared folder is an
   invitation).
3. **Tier 3 — area-specific `SKILL.md` sections.** The rules true of this area and of nothing
   else. **This tier is the most valuable thing you produce, and the generic template cannot
   generate it.** Expect 1 to 4. Zero means you have not asked enough.
4. **Mode trimming.** A read-only brain drops PLAN and ACT; a brain with no neighbours drops
   CONSULT. Remove the section from `SKILL.md` rather than leaving it in unused — an unused mode
   is a promise the brain cannot keep.
5. **Scripts.** If a zone cannot be reached by an existing CLI in one step, plan one against
   `reference/scripts.md`. Otherwise stay Markdown-only — most brains should.

Then **show the person the shape as a table and get agreement before scaffolding.** This is the
cheapest moment to change it; reshaping after bootstrap means moving facts.

**Flag the inferred rows when you show it.** SCOPE's 7 questions cannot settle all 11 tests —
`decisions.md`, `journal.md`, the fact layout and `upstream.md` are **read off the recipe and the
charter, not answered by anyone**. Mark each row `asked` / `recipe` / `inferred` and name the
inferred ones in a sentence: *"I assumed you have written conventions, so `decisions.md` is in —
correct me."* Those four are the rows most likely to be wrong, and this glance is the only thing
between an inference and a permanent decision. Do **not** solve this by adding more questions:
the 7-cap exists because an interrogation up front is how people abandon a tool before it has
done anything for them.

Write the agreed result into `index.md` as the **Shape record** (format in `shape.md`). It is
what lets DOCTOR tell a deliberate omission from a missing file, and what stops UPGRADE adding
back what was deliberately left out.

## Mode 3 — SCAFFOLD (create the folder)

1. Confirm the target path does not already exist. If it does, switch to UPGRADE.
2. Create the folder and copy **only the components the Shape record includes**, renaming
   `brain-X.md` → `X.md`:

   | Template | Becomes | Tier | Role |
   |---|---|---|---|
   | `brain-SKILL.md` | `SKILL.md` | spine | the 12 laws, 9 ID types, 11 modes. **Copy as-is** except the frontmatter, the `<TODO>` markers, trimmed modes, and the added area sections. |
   | `brain-index.md` | `index.md` | spine | the map. Read first, always. Carries the charter, the Shape record and the reshape rubric. |
   | `brain-changelog.md` | `changelog.md` | spine | every change, dated |
   | `brain-doctor.md` | `doctor.md` | spine | **the brain's own integrity checklist.** Delete the rows for excluded components — a check that cannot fire produces phantom findings |
   | `brain-facts.md` | `facts/<area>.md`, or the custom layout | spine | first fact file |
   | `brain-ontology.md` | `ontology.md` | conditional | zones, entity types, relation types, Key grammar |
   | `brain-graph.md` | `graph.md` | conditional | nodes, edges, mermaid, how to walk it |
   | `brain-decisions.md` | `decisions.md` | conditional | `D-` entries |
   | `brain-conflicts.md` | `conflicts.md` | conditional | `C-` entries |
   | `brain-journal.md` | `journal.md` | conditional | raw evidence inbox |
   | `brain-plan.md` | `plans/TEMPLATE.md` | conditional | the `P-` plan shape |
   | `brain-secrets.example.md` | `secrets.example.md` | conditional | template only, never values |
   | `brain-README-TEAM.md` | `README-TEAM.md` | conditional | the teammate's setup guide |
   | `brain-upstream.md` | `upstream.md` | lazy | `U-` proposals; created on first use unless asked for up front |

3. Fill the frontmatter. Fill the charter and the Shape record into `index.md`. Fill zones into
   `ontology.md` — or into `index.md` if the ontology file was shaped out.
4. Add the Tier 3 area sections to `SKILL.md`, each dated. Remove the section for every trimmed
   mode, and drop the `Files` rows for every component left out.
5. Leave every unknown as `<TODO: ...>`. Do not invent entity types that the recipe did not
   give you and the evidence has not shown.
6. Offer to copy `scripts/brain-doctor.mjs` into the brain's own `scripts/`, so it can run its
   own mechanical audit. **Optional** — a brain audits itself from `doctor.md` with no script at
   all; this only makes it faster. Say which you did.
7. **Run `node scripts/brain-doctor.mjs <new-brain-path>`.** It must come back with no UNSAFE
   findings before you call the scaffold done. Leftover `<TODO:` markers are expected at this
   point and are cleared by BOOTSTRAP.
8. Report the created tree and go straight into BOOTSTRAP — a scaffold alone is not useful.

### Writing the description (law 5)

The description is the trigger. Build it from the charter in this shape:

> `<What the brain knows, in one line — area + zones + the main things it holds>. Use it to
> ANSWER any question about <area>, to CAPTURE facts automatically whenever <evidence types>
> appear in the session, and to PLAN work inside <area>. Always use for questions about
> <8-15 concrete trigger words: names, tools, files, commands, concepts>.`

The trigger words matter most. Use the real nouns the person types — service names, file
names, tool names — not abstractions.

## Mode 4 — BOOTSTRAP (the first real facts)

Trigger: right after SCAFFOLD, or "bootstrap <brain>".

Follow the matching playbook in `reference/bootstrap.md`. The shape is the same for every
brain type:

1. **Prove the access path first.** A brain that cannot reach its zone can verify nothing.
   Record it as `F-001` and as a zone row in `ontology.md`. If a script was planned, it must
   actually work here, before anything else is recorded.
2. **Sweep for entities — breadth before depth.** Pass 1: **name every top-level thing in the
   area**, even if the fact is only "this exists, here, at this path". Pass 2: detail only what
   the charter's three questions need. Record each as an `E-` row in `graph.md` with the fact
   that proves it exists; if the graph was shaped out, record it as a plain fact.
   *Why this order:* "I have no fact about X" and "X does not exist" are different answers, and
   only pass 1 lets the brain tell them apart. A brain that named all 20 modules and detailed 3
   is useful; one that detailed 3 and never looked at the rest is not — however honest it is.
3. **Sweep for relations.** Each edge needs its evidence type from the ontology (`file:line`,
   a config value, observed traffic). No edge without a fact ID.
4. **Write the facts.** One claim each, with proof, badge, Key, Links, Last checked.
5. **Record the decisions you were told** as `D-` — conventions, patterns, "we always do X".
   If the project has written rules already (a `CLAUDE.md`, a team rules file, an ADR
   folder), seed `D-` from those with that file as the source, so the brain agrees with the
   rules the team already has instead of competing with them.
6. **Open a `Q-` for every gap you hit** — with the exact probe that would close it. Gaps are
   the most valuable bootstrap output; they are what VERIFY works through later.
7. **Draw the graph** and render the mermaid. Validate the syntax before writing; include the
   text fallback.
8. **Fill `index.md`** — every file, every ID, every open conflict.
9. **Write the Coverage block** — what pass 1 counted against what is recorded, with a `Q-` for
   every shortfall. Counts come from a real counting probe, never an estimate. This is what makes
   a thin brain visibly thin instead of a surprise later.
10. **Check the charter is satisfied.** Take the three "Must answer" questions and actually
    answer them from the brain. If one cannot be answered because the shape has nowhere to hold
    it, that is a **shape error** — fix it now, and raise a `U-` if the include-when test was at
    fault (law 11).
11. **Report:** `<brain>: N facts, N entities, N relations, N decisions, N open questions`, plus
    the coverage line — that is the number that tells the person whether to trust it yet.

Do **not** try to be complete. A bootstrap that records 20 proven facts and 10 honest `Q-`
gaps is far better than one that records 60 facts where 40 are guesses.

## Mode 5 — UPGRADE (move a brain to a newer template)

Trigger: "upgrade <brain>", "add the graph to <brain>".

**Only template-version changes belong here.** A brain keeps up with its own area by itself —
that is its RESHAPE mode. If a brain simply needs somewhere to put a new kind of fact, a new
zone, a new ontology type or a split fact file, **it does that on its own and does not need
this factory.** Do not do a brain's reshaping for it; say so and let it.

What UPGRADE is for: the brain was built on an older template and is missing laws, modes or
mechanisms that version brought in — a v1 brain has no Shape record, no `doctor.md`, no CONSULT,
no RESHAPE, so it cannot yet maintain itself.

1. Read the brain's `SKILL.md`, `index.md` and **Shape record**. List what it has, what the
   current template has, and **what the Shape record says was deliberately omitted**.
2. Show the person the diff as a table — **file / section / what would be added / why** — and
   ask before writing. An upgrade touches many files at once; it is the highest-risk write.
3. **Never propose adding a component the Shape record excluded** unless its reason has changed.
   If it has, say what changed: "a second writer appeared, so `README-TEAM.md` and the
   shared-folder section now apply".
4. Add only what is missing. Law 7: existing facts, IDs, proofs and History are untouched.
5. When adding `ontology.md` / `graph.md` to a brain that has neither, derive them **from the
   facts already there** — not from fresh probes. Every entity and edge cites the existing
   `F-` IDs. If a fact is too vague to type, leave it out and open a `Q-`.
6. Update the Shape record with the new reason and the date, and log the upgrade in the brain's
   `changelog.md` with what was added and what was left alone.

## Mode 6 — DOCTOR (second opinion, and legacy brains)

Trigger: "doctor <brain>", "check my brain".

**A brain audits itself.** From v3 every brain ships `doctor.md` — its own checklist — and its
own DOCTOR mode. **Prefer that.** If the brain can audit itself, say so and let it: a brain that
needs another skill to stay healthy is not finished.

This mode exists for exactly two cases:

1. **A brain with no `doctor.md`** — built on v1 or v2, or hand-built before this factory existed. It cannot
   self-audit yet. Run the audit here, then offer an UPGRADE so it never needs this again.
2. **A second opinion** — the brain's own report is suspect, or it is the brain's *shape* under
   question rather than its content. A checker cannot always see its own blind spot.

**Run the script first** — it settles the mechanical checks exactly and tells you which ones it
skipped:

```bash
node scripts/brain-doctor.mjs <path-to-brain>
```

Then **read the Shape record** — a component it deliberately excludes is not a finding, and
reporting it as one trains the person to ignore the audit — and work through the judgement checks
in `reference/doctor.md` that the script listed as not covered. Report a table:
**Check | Result | What to fix**. Fix nothing without asking, except `index.md` drift — a wrong
map makes every answer unsafe, so correcting it is always allowed and always logged.

Use `--selfcheck .` to audit **this factory** before a release: template ID leaks, a check-count
mismatch between `reference/doctor.md` and `templates/brain-doctor.md`, missing templates,
drifted counts, leaked project names.

## Mode 7 — HARVEST (collect what the brains learned)

Trigger: "harvest", "any upstream proposals?", or before releasing a new template version.

The brains are the only things that find out where this template is wrong. They are in the
area, doing the work, hitting the friction. That knowledge has to come back or every future
brain repeats it.

1. For each brain in `built.md`, read its `upstream.md`. Skip the ones with none.
2. For each `U-` with `Status: open`, check it carries **evidence of a real event**, not a
   hypothetical. No evidence → reject, with that as the reason.
3. Triage into **apply now** / **apply with changes** / **reject** / **needs the person**. Two
   brains raising the same `U-` is strong signal; say so.
4. Show the person the triage table and get agreement before editing anything in this folder.
5. Apply the accepted ones. Bump the template version in `built.md`, and name which brains would
   need an UPGRADE to pick the change up.
6. **Write the result back into each brain's `upstream.md`** — `Status: applied <date> in
   create-brain <version>` or `Status: rejected <date> — <reason>`. Rejections matter as much as
   acceptances: without the reason recorded, the same proposal comes back next month.

## Neighbour brains (law 8)

Two brains must never hold two copies of the same fact — they drift, and then neither can be
trusted, because a reader cannot tell which copy is current. The generated brain gets:

- a `## Neighbour brains` table in `index.md` with four columns: **brain | owns | reference as |
  how to consult**. The fourth column is what makes collaboration real instead of a note in a
  file.
- a **CONSULT** mode: when a question crosses into a neighbour's area, invoke that skill, ask
  only what it owns, and carry its fact IDs verbatim — never restate a neighbour's fact locally.
- an **independence rule**: with every neighbour absent, the brain still answers its own charter
  in full, and says plainly which part is owned elsewhere, plus the probe that would get it.
- cross-brain conflicts opened **in the brain that owns the disputed fact**, not in both.

Full protocol in `reference/neighbours.md`.

## Reference files (read on demand)

| File | When to read it |
|---|---|
| `reference/shape.md` | **SHAPE** — the component catalogue, the include-when tests, mode trimming, the Shape record |
| `reference/recipes.md` | SCOPE — picking the brain type and its starting entity/relation types |
| `reference/grammar.md` | writing any `F- E- R- C- D- P- Q- S- U-` block — the exact formats and the ID rules |
| `reference/bootstrap.md` | BOOTSTRAP — the per-type evidence sweep |
| `reference/neighbours.md` | SHAPE and HARVEST — brain-to-brain consulting, and the `U-` loop |
| `reference/scripts.md` | SHAPE — whether this brain needs a script, and the contract if it does |
| `reference/doctor.md` | DOCTOR and UPGRADE — the integrity checklist |
| `built.md` | which brains exist, who owns which zones, the template version history |
| `MAINTAINING.md` | **auditing or changing this skill** — the invariants, the end-to-end test, the bug patterns it keeps producing, and what not to "clean up" |

## Division of labour — the brain lives on its own

A brain that needs this factory to stay healthy is not finished. **Build it so it does not come
back.** What belongs where:

| Job | Owner |
|---|---|
| Record new facts, drain the journal, spot conflicts | **the brain** — CAPTURE, automatic |
| Mine past sessions for what it should already know | **the brain** — BACKFILL, automatic on first contact with an uncovered part |
| Re-check stale facts | **the brain** — VERIFY, and inline whenever an answer would rest on one |
| Audit its own integrity | **the brain** — DOCTOR, against its own `doctor.md` |
| Grow its own shape: a new file, zone, ontology type, area rule, fact split, script | **the brain** — RESHAPE, gated by evidence and one question to the person |
| Ask a neighbour for what it does not own | **the brain** — CONSULT |
| Birth a brain: scope, shape, scaffold, bootstrap | **this factory** |
| Move a brain to a newer template version | **this factory** — UPGRADE |
| Change the template itself | **this factory** — HARVEST of `U-` |

So: **this factory births and versions; the brain lives.** When a brain's need is "somewhere to
put this new thing", that is RESHAPE and it does it itself — do not do it for it.

## What this factory does NOT do

- It does not answer questions about any system. That is the generated brain's job.
- It does not maintain a brain day to day. Capture, backfill, verify, audit and reshape all
  belong to the brain. Doing them here teaches a brain to be helpless.
- It does not change an existing brain unless asked for an UPGRADE by name.
- It does not create workflow stages or git hooks. A brain is a plain skill — with its own read-only
  scripts only when law 2's test is met.
- It does not edit itself on a brain's say-so. A brain proposes a `U-`; HARVEST decides (law 11).
