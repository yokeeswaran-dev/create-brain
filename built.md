# Brains built from this factory

One row per brain, so the next UPGRADE knows what exists and **law 8 (one brain owns one area)**
can be checked before creating another. **Fill this in as you build them** — a factory that does
not know which brains exist cannot stop two of them owning the same facts.

| Brain | Area | Location | Created | Template version |
|---|---|---|---|---|
| | | | | |

## Zone ownership across brains

Check this before creating a brain, so two brains never own the same facts.

| Zone / area | Owned by |
|---|---|
| | |

The test for who owns a fact is **which zone proves it**. A config value read from a file on
disk belongs to the repo brain (`file:line` proof); the same key's value inside a running
container belongs to the cluster brain (command proof). Those are **two different facts**, not
one fact in two places. Write each boundary into both brains' `index.md` → "Neighbour brains",
so the two descriptions mirror each other.

## Template version history

- **v1** — first release. 12 laws, 8 ID types (`F- E- R- D- C- P- Q- S-`), 8 modes
  (OBSERVE, CAPTURE, ANSWER, PLAN, ACT, VERIFY, BACKFILL, DOCTOR), typed ontology, knowledge
  graph with blast-radius walking, plan template with idea-conflict resolution.

- **v2** — **adaptive shape, scripts, team docs, neighbour consulting, upstream loop.** Written
  after noticing that the first brain this pattern was generalised from matched almost none of
  v1's fixed file list. It had a team setup guide, a `scripts/` folder **with `node_modules`**
  (which v1 law 1 forbade outright), a `topology.md` instead of a graph, and grouped its facts by
  **place** rather than into one `facts/<area>.md`. It had no ontology, no graph, no plans. Its
  own `SKILL.md` already said *"you decide the layout"* and carried three area-specific sections
  v1 had no way to produce. The fixed file list was the thing that was wrong.

  Factory changes:
  - **Law 1 replaced** — shape follows the requirement; the file list is a menu, not a ruler.
  - **Law 2 replaced** (was the blanket script ban) — Markdown first, scripts as a capability
    layer under a 9-rule contract.
  - **Law 11 added** — a brain proposes template changes; it never edits the factory.
  - **Laws 6, 7, 8 extended** — area sections are added, not substituted; UPGRADE must not
    re-add a deliberate omission; neighbours are consulted, not just referenced.
  - **Mode SHAPE added** — the component catalogue with include-when tests, mode trimming, and
    the Shape record written into the brain's `index.md`.
  - **Mode HARVEST added** — triage the `U-` proposals the brains raised, and write the result
    back including rejections with reasons.
  - **SCOPE gained question 7** — who else uses it, and whether it travels by git or shared
    storage. That decides `README-TEAM.md`.
  - **BOOTSTRAP gained a charter check** — answer the three "Must answer" questions from the
    finished brain; a question with nowhere to record its answer is a shape error, not a gap.
  - New references: `shape.md`, `neighbours.md`, `scripts.md`.
  - New templates: `brain-upstream.md`, `brain-README-TEAM.md`.
  - `doctor.md`: reads the Shape record first; checks 21-29 added (shape record, shape drift,
    charter satisfied, trimmed-mode mismatch, script contract, committed `node_modules`,
    neighbour consult cells, stale team guide, evidence-free `U-`); **every probe now excludes
    `node_modules`**, without which the duplicate-ID and secrets greps are unusable in a brain
    that has scripts.
  - `recipes.md`: typical shape per recipe type.

  Brain template: 10 modes (CONSULT and PROPOSE added), 9 ID types (`U-` added), law 12 reworded
  to work without a graph, `Files` table marked by tier and trimmable, `index.md` gained the
  Shape record and a **How to consult** column on the neighbour table.

- **v3** — **renamed to `create-brain`; the brain now maintains itself.** Written after two
  observations: that the mode names read like a vocabulary the person had to memorise, and that
  a brain needing another skill to stay healthy is not finished.

  Factory changes:
  - Renamed from `team-brain` → `create-brain`. The name now fits the split: **this skill
    creates and versions; the brain lives.**
  - **`doctor.md` added to the spine** — every brain ships its own integrity checklist, rows
    trimmed to its own shape. A brain audits itself.
  - **DOCTOR demoted to a second opinion** — it now exists only for brains with no `doctor.md`
    (v1, v2, hand-built) and for when a brain's own report, or its *shape*, is what is in
    question.
  - **UPGRADE narrowed to template-version changes only.** Keeping up with the area is the
    brain's RESHAPE job; the factory must not do a brain's reshaping for it.
  - **"Division of labour" table added** — who owns capture, backfill, verify, audit, reshape,
    consult, birth, version, template.
  - `shape.md`: spine is now five, and "Reshaping later" rewritten — the brain reshapes itself,
    so the include-when tests must be **copied into the brain's `index.md`**, because a brain
    cannot read this skill's reference files.
  - `README.md` added — quick start, the long prompt, the no-magic-words table, what runs
    automatically, and the two cases every user hits (a brain already owns the area; the question
    crosses two areas).

  Brain template changes:
  - **Mode 11 RESHAPE** — the brain grows its own shape: a component, a zone, an ontology type,
    an area rule, a fact-file split, a script, or a trimmed mode restored. Gated by four tests
    (evidence it already holds; bitten twice or blocks a charter question; nothing existing can
    hold it; the person agrees). It never removes a law and never removes a fact.
  - **"How the modes fire — there are no magic words"** — a plain-language trigger table. Every
    mode's `Trigger:` line rewritten from a keyword to natural phrasings.
  - **"What runs by itself"** — OBSERVE, CAPTURE, the conflict process, and now **BACKFILL on
    first contact with an uncovered part of the area**. Backfill was keyword-only before, so it
    could never fire on its own — a real bug, not a nicety.
  - **The write distinction made explicit** — writing facts into the brain's own files is
    bookkeeping and never needs permission; law 6 governs changes to the *area*. Only deleting a
    block and RESHAPE need asking. This is what makes "stays in sync without being told" safe.
  - **ANSWER gained two steps** — backfill before answering about an uncovered part, and verify
    a stale fact inline rather than handing over a warning and waiting to be told.
  - `index.md` gained the **reshape rubric** — the include-when tests in short form, so the
    brain can judge "genuinely needed" on its own.
  - 11 modes; `doctor.md` in the Files table.

- **v3.1** — **all project-specific names removed.** Every example is now a generic invented
  name (`service-brain`, `client-brain`, `cluster-brain`, `billing-service`, `staging`, `prod`,
  `sandbox`, `cluster_query.js`) and the registry above ships empty. A factory carrying one
  team's repo names, cluster names, hostnames and paths is not shareable, and those names were
  never what the rules depended on — the reasoning behind each rule survives without them.

- **v4** — **retirement, coverage, and growth rules.** Three gaps found by auditing the skill
  against its own promise rather than by hitting them in use.

  **1. Retirement — the confidently-stale hole.** Nothing marked a fact as being about something
  that **no longer exists**. A badge says *how well do we know this*; it cannot say *does this
  still exist*. So a module deleted yesterday kept a ✅ fact checked last week, and neither the
  badge nor `Last checked` caught it — doctor check 9 only fires after 30 days. That is the
  "confidently wrong" failure the 12 laws exist to prevent, arriving through time instead of
  guessing. Added:
  - `Status: retired <date> — <why>` on `F-` and `E-`, **absent while live** so there is no
    no-op churn. The **badge does not change** — a retired ✅ was true, and its proof is still
    real; it is history, not a guess, so no third badge was invented.
  - ANSWER skips retired facts, may cite them as history, and **never conflates "I have no fact
    about X" with "X does not exist"** — the second needs a retirement or a probe.
  - CAPTURE gained a *the thing is gone* branch, with the distinction that **absence is not a
    conflict**: a conflict is two claims about a thing that exists.
  - Retiring is never deleting (law 4); retiring an entity retires or re-points its edges.
  - Doctor **check 30 (dead proof)** — every live ✅ fact whose proof is a `path:line` must have
    that file still present. One `[ -e ]` per fact, and it catches the whole common case.
  - Doctor **check 31** — no live edge into a retired entity, or the graph lies about the present.

  **2. Coverage — breadth before depth.** `bootstrap.md` said *"20 proven facts beat 60 guesses"*,
  which is right about honesty and **silent about breadth**. It therefore licensed a brain that
  was perfectly honest and completely useless: 20 deep facts about 2 of 20 modules answers
  nothing, and nobody can tell from outside that it is thin. Added:
  - A **second bootstrap rule**: pass 1 names *every* top-level thing in the area ("this exists,
    here"); pass 2 adds depth only where the charter's questions need it.
  - A **Coverage block** in `index.md` — found vs recorded per entity type, counts from a real
    counting probe rather than an estimate, a `Q-` for every shortfall, and a `Last counted`
    date. Doctor **check 32** enforces it.
  - BOOTSTRAP reports the coverage line alongside the fact count, because that is the number
    that says whether to trust the brain yet.

  **3. Growth — two limits with two different fixes**, previously conflated and partly absent:
  - A **fact file past ~300 lines splits by meaning, never by size.** `http-routes.md` +
    `messaging.md`, never `architecture-part2.md`, never `misc.md`. The test is *could someone
    guess which file holds the answer from the question alone?* If there is no natural seam, that
    is information: usually the entity type is too coarse or the area is really two zones — both
    RESHAPE questions. Last resort is a stable guessable dimension (zone, or Key prefix), never
    insertion order. Doctor **check 33** bans the size-based filenames.
  - **`index.md` past ~150 IDs tiers, it does not split.** It is read before *every* answer while
    fact files are read on demand, so it is the only file whose length is a permanent running
    cost. Past the limit it keeps the map, charter, Shape record, rubric, neighbours, zones,
    conflicts and counts; the per-ID tables move to the top of the file they describe. It never
    splits — a split map is no map. Doctor **check 34**.
  - These two are coupled: tiering the index only works if files are named for what they hold.
    `part2` naming makes a tiered index unusable.

  Doctor checks: 29 → **34**, in both the factory's `doctor.md` and the brain's own, with probes
  for each. RESHAPE gained the two growth triggers.

- **v5** — **tooling, and six edge cases found by attacking the design rather than using it.**

  **`scripts/brain-doctor.mjs`** — the factory's first script, justified by its own law 2: DOCTOR
  is 35 checks, several being multi-step greps with documented false-positive traps, and doing
  that by hand is where mistakes live. Zero dependencies (no `package.json`, no `npm install`, no
  `node_modules`), read-only, exit 1 on UNSAFE so CI can gate, and it **prints the checks it did
  not run** — a tool that silently covers part of a checklist is worse than none, because the gap
  looks like a pass. Two modes: `<brain-path>` audits a brain, `--selfcheck` audits this factory
  (template ID leaks, check-count parity between the two checklists, missing templates, drifted
  counts, leaked project names).

  **It was tested by running it against a real v1 brain, and it was wrong twice.** Both false
  positives came from its own loose rules, and both are now encoded as comments in the source:
  - a table row counts as an ID *definition* only in a **registry file** (`index.md`, `graph.md`).
    Everywhere else a three-digit ID in a table row is a reference inside an example, and plan templates are full of
    them — treating those as definitions reported every one as a duplicate.
  - a backticked `*.md` in `index.md` is only a brain file inside the `## Files` / `## Scripts`
    sections. Elsewhere it is usually a file in the **area** being described — a real fact about
    the repo, not a broken link.

  That run also found the **root cause** behind several checks firing together, now **check 35**:
  placeholder IDs written with three digits inside a `TEMPLATE.md` or
  `*.example.md`. They read exactly like real records and surface later as phantom duplicates and
  dangling links. Reporting the cause once beats reporting the symptoms twice.

  **Six edge cases, each confirmed absent before being fixed:**
  1. **Proof paths had no relative-path rule.** An absolute path is true on exactly one machine;
     on a teammate's laptop every `file:line` proof is dead, DOCTOR reports the brain as rotten,
     and they learn to ignore it. Paths are now relative to a new **`Area root:`** charter field —
     without which check 30 cannot resolve anything and so could never have run.
  2. **No date format was mandated.** The 30-day staleness rule is arithmetic; "Nov 3" cannot be
     compared, so a brain with loose dates silently stops ageing its own facts. Now `YYYY-MM-DD`
     everywhere, enforced by the script.
  3. **Circular CONSULT.** Two brains each believing the other owns a fact would round-trip
     forever and neither would answer. Now: **one hop only** — a brain invoked *by* a neighbour
     answers or admits the gap, never hands the question back. The charter boundaries must mirror,
     because a gap on one side and an overlap on the other is what starts the loop.
  4. **The secrets check cried wolf on its own documentation.** It grepped for the *words*
     `password` / `token`, which `secrets.example.md` and the docs legitimately contain. A check
     that fires on its own template gets ignored, which is worse than not having it. Now it
     matches assigned **values** of 12+ characters, skipping placeholders.
  5. **Breadth had no altitude or cap.** "Name everything" on a 10,000-file monorepo is
     unbounded. Now: breadth is at the altitude the ontology declares (12 modules, not 10,000
     files — a fact per file means the entity type is wrong), and past ~100 instances of a type
     record the **count plus the enumeration probe** instead of 400 rows nobody re-verifies.
  6. **No distinction between laws that may be relaxed and laws that may not.** Law 9 lets the
     person change any of them, which is dangerous when applied to law 1. Now split: **6, 8, 11,
     12** are process and may be relaxed on request with a `D-` recording what cover was given
     up; **1-5, 7, 10** are the reason the brain is worth asking, and dropping them "does not make
     me faster, it makes me a confident stranger with a folder of fiction." Asked to guess, the
     brain offers the ⚠️-labelled answer or the one command that settles it — and **never writes
     an unproven claim into a file**, because the files are the part other people trust.

  Doctor checks: 34 → **35**. Also fixed from the previous pass: a stray empty code fence in
  `SKILL.md`, and the `## Diagram` heading accidentally dropped from `brain-graph.md`.

- **v5.1** — **the last three design gaps closed, all three found by simulating SHAPE rather
  than reading it.** Four contrasting areas were run through the 11 include-when tests, then the
  smallest shape was actually scaffolded and audited. That exercise found four template bugs and
  three design gaps; the bugs were fixed in v5, these are the gaps.

  **1. A test that always passed.** `ontology.md` read *"2+ zones, or **4+ entity types**, or two
  things share a name"*. The middle clause was **vacuous**: a brain's real entity types are not
  known until BOOTSTRAP has swept the area, and the recipe hands you ten of them up front — so
  every project brain passed before any evidence existed. Replaced with a clause that is decidable
  *before* the sweep: **is the recipe type-rich?** `recipes.md` now marks each one (project,
  infra, api, data = type-rich; process = type-poor), so only a single-zone process brain can
  land outside. The general rule is now written down: **a shape test may only use what is knowable
  before the sweep** — the charter, the zones, the recipe, the headcount. A test that needs the
  facts in order to decide which file the facts go in is circular and will quietly answer "yes"
  every time.

  **2. No tie-break for a borderline call.** The simulation hit three. The first instinct — "when
  unsure, leave it out" — is **wrong**, because it is right for `journal.md` and dangerous for
  `plans/`: an ACT with no plan gate is the only shape error that can damage the area rather than
  merely annoy a reader. So the rule is now **asymmetric per component**: ask which mistake costs
  more for *that* component and make the cheaper one. Borderline **in** for `ontology.md`,
  `decisions.md`, `conflicts.md`, `plans/`, `README-TEAM.md` — lacking them breaks something.
  Borderline **out** for `journal.md`, `secrets.example.md`, `scripts/`, a custom layout and
  `upstream.md` — and `secrets.example.md` is the one case where having it needlessly is the
  *greater* hazard, because an unused credentials template in a shared folder is an invitation.
  Backed by a second asymmetry: adding a component later is cheap (IDs survive a move, law 4),
  while removing one that has filled up means deciding what to do with the content.

  **3. Four of the eleven tests were inferences dressed as answers.** SCOPE asks 7 questions;
  `decisions.md`, `journal.md`, the fact layout and `upstream.md` are settled by **nobody** — they
  are read off the recipe and the charter. The fix is not questions 8 to 11: the 7-cap exists
  because an interrogation up front is how people abandon a tool before it has done anything for
  them. Instead the Shape record gained a **`From`** column (`asked` / `recipe` / `inferred`), and
  SHAPE must **name the inferred rows out loud** when it shows the table — *"I assumed you have
  written conventions, so `decisions.md` is in — correct me."* One glance is the only thing
  standing between an inference and a permanent decision.

  **Re-verified after the changes.** The four shapes still discriminate — 9 / 13 / 10 / 7 files
  and 11 / 11 / 9 / 8 modes — and the type-poor process brain still correctly skips **both**
  `ontology.md` and `graph.md`, so the new recipe-based test did not collapse into "always in".
  Only one call changed: the solo CLI brain now gains `conflicts.md` on the borderline rule, which
  is right — code and a running binary can contradict each other, and that needs somewhere to go.

- **v5.2** — **the leak detector no longer hardcodes one team's names.** `--selfcheck` checked for
  a literal list of this author's repo, cluster and tool names: useless on anyone else's machine,
  and silently blind to *their* leaks. Replaced with detection of the **shapes** that are always
  environment-specific — absolute paths from a drive letter or a home directory, IP addresses,
  `.internal` / `.corp` / `.local` hostnames, email addresses.

  It immediately found two leaks the name list never would: the factory's own illustrations of
  *"an absolute proof path is bad"* were written as real absolute paths. That is the **third**
  instance of one pattern — a check firing on the documentation that explains it, after the
  secrets check matching the word "password" in its own template and the ID rule using
  three-digit IDs to say "do not use three-digit IDs". The fix is the same every time and is now
  the house style: **describe the bad pattern, never instantiate it.**

- **v5.3** — **`MAINTAINING.md` added**, so the skill can be audited by a session that knows
  nothing about how it was built. `README.md` is for people using the skill; this is for whoever
  is checking or changing it. It carries: the one-paragraph orientation, the machine checks, the
  invariants selfcheck cannot reach, **the end-to-end test that actually finds bugs** (simulate
  four contrasting shapes, confirm they differ, scaffold the smallest, audit it), the five bug
  patterns this skill keeps producing with the house rules that prevent them, what selfcheck does
  **not** check, a change-safely table, the known-fragile list, and what looks like cruft but is
  load-bearing. Written to pass its own checks: selfcheck is clean on it.
