# Maintaining and auditing `create-brain`

**Read this before auditing or changing this skill.** It assumes you know nothing about it and
have no memory of how it was built. `README.md` is for people *using* the skill; this file is for
whoever is *checking or changing* it.

## What this skill is, in one paragraph

`create-brain` is a factory. It builds **brains**: self-contained Claude Code skills that hold
verified knowledge about one area and work inside it. The factory has 7 modes (SCOPE, SHAPE,
SCAFFOLD, BOOTSTRAP, UPGRADE, DOCTOR, HARVEST) and 12 laws. The brain it produces has 11 modes
and its own 12 laws, picks its own file set from a menu (`reference/shape.md`), audits itself
against its own checklist (`templates/brain-doctor.md`), grows its own shape (RESHAPE), and
proposes template fixes back here (`U-` entries, harvested by HARVEST). **The factory births and
versions; the brain lives.** A brain that needs this skill installed to stay healthy is a bug.

## Step 1 — run the machine checks

```bash
node scripts/brain-doctor.mjs --selfcheck .
```

**Must print `0 finding(s), 0 unsafe` and exit 0.** It checks: real-looking IDs in templates,
check-count parity between the two checklists, promised templates that do not exist, reference
files that do not exist, stated counts that have drifted, and environment leaks (absolute paths,
IP addresses, internal hostnames, email addresses).

That script is also the thing to audit *with*, against real brains:

```bash
node scripts/brain-doctor.mjs <path-to-some-brain>
```

Exit 0 = nothing unsafe, 1 = at least one UNSAFE finding, 2 = bad usage.

## Step 2 — check the invariants selfcheck cannot

```bash
# fixed forever: both law sets are 12, by the factory's law 6 and the brain's law 9
sed -n '/^## Laws of brain-building/,/^## Mode 1/p' SKILL.md | grep -cE '^[0-9]+\. \*\*'
sed -n '/^## The 12 laws/,/^### If the person asks/p' templates/brain-SKILL.md | grep -cE '^[0-9]+\. \*\*'

# must match each other (selfcheck enforces this one)
grep -cE '^\| [0-9]+ \|' reference/doctor.md
grep -cE '^\| [0-9]+ \|' templates/brain-doctor.md

# must match the newest entry in built.md
grep -c '^## Mode' SKILL.md                    # factory modes
grep -c '^## Mode' templates/brain-SKILL.md    # brain modes

# balanced code fences — an odd count means a truncated block
for f in $(find . -name "*.md"); do n=$(grep -c '^```' "$f"); [ $((n%2)) -ne 0 ] && echo "ODD $f"; done

node --check scripts/brain-doctor.mjs          # the script still parses
```

**Both law counts are 12 and must stay 12.** Modes may be added; laws may not be invented, and a
brain may trim a *mode* but never a *law*.

## Step 3 — the test that actually finds bugs

Reading the files finds drift. **Building a brain finds bugs.** Every real defect in this skill's
history was found this way, not by reading. Repeat it after any change to `templates/` or
`reference/shape.md`:

1. **Pick four contrasting areas** and answer SCOPE's 7 questions for each as a user would. Use
   deliberately different shapes — e.g. a solo code repo (git, no credentials), a multi-cluster
   infra area (several people, shared storage, credentials, a jump host), a read-only data area,
   and a tiny read-only process area.
2. **Apply all 11 include-when tests** from `reference/shape.md` to each.
3. **Check the shapes differ.** If all four come out the same, **the adaptivity is fake** — that
   is the single most important thing this test proves. The type-poor process area should skip
   both `ontology.md` and `graph.md`; the read-only areas should drop PLAN, ACT **and** `plans/`
   together.
4. **Actually scaffold the smallest one** into a scratch folder — copy only the included
   templates, trim the dropped modes out of `SKILL.md`, trim the dead rows out of `doctor.md`,
   and fill the charter, Shape record, Files table and Coverage block.
5. **Audit it**: `node scripts/brain-doctor.mjs <scratch-path>`. Expect **zero UNSAFE and zero
   ROTTING**. Leftover `<TODO:` markers under check 20 are correct at this stage — BOOTSTRAP
   clears them.
6. **Delete the scratch folder using a literal path**, never a shell variable or a command
   substitution.

Pick the *smallest* shape to scaffold, because it exercises the **skip** paths, which are the
least-tested code in the skill.

## The bug patterns this skill keeps producing

Check these first. Each has bitten more than once.

### 1. A check that fires on the documentation explaining it

**Three separate instances so far.** The secrets check matched the word "password" in the brain's
own secrets template. The ID rule used three-digit IDs in the sentence saying "do not use
three-digit IDs" — which made *every brain ever scaffolded* report two phantom dangling links.
The leak check flagged the factory's own illustration of "an absolute path is bad", written as a
real absolute path.

> **House rule: describe the bad pattern, never instantiate it.**

A check that cries wolf on its own docs is worse than no check, because people learn to ignore
the whole report. When you add a check, grep this skill for its own pattern before shipping.

### 2. A test that cannot be answered when it runs

`ontology.md` once required "4+ entity types" — unknowable at SHAPE time, because types come from
the sweep that happens *later*, and the recipe hands you ten up front so it passed every time.

> **A shape test may only use what is knowable before the sweep** — the charter, the zones, the
> recipe, the headcount. A test that needs the facts in order to decide which file the facts go
> in is circular and will quietly answer "yes".

### 3. A stated count drifting from reality

"8 modes", "the 11-file template", "29 checks" have all gone stale. Prefer wording with no number
in it. Where a number is unavoidable, selfcheck checks these two: the brain's `You have N jobs`
line against its Mode sections, and the two checklists against each other.

### 4. Hardcoding this machine's specifics

The leak detector originally listed one team's repo and cluster names — useless elsewhere and
blind to anyone else's. It now detects the *shapes* that are always environment-specific. Same
rule applies anywhere else you are tempted to hardcode: **detect the shape, not the instance.**

### 5. A bulk edit silently removing a heading

A `## Diagram` heading was once dropped by an edit whose replacement text omitted it, leaving an
orphaned code block. The balanced-fence loop in Step 2 catches this class.

## What `--selfcheck` does NOT check

A tool that silently covers part of a checklist is worse than none, because the gap looks like a
pass. These need a person or a model:

- Whether the **prose is still true** after an edit — the biggest risk by far, and invisible to
  every grep here.
- Whether a **law still makes sense**, and whether a new law contradicts an existing one.
- Whether `reference/shape.md`'s include-when tests still **discriminate** (that is Step 3).
- Whether `README.md` still describes what the skill actually does.
- Whether `built.md`'s newest entry matches what was really changed.
- Whether the four **inferred** shape rows (`decisions.md`, `journal.md`, fact layout,
  `upstream.md`) are still the right things to infer rather than ask.

## Making a change safely

| Change | Also do this |
|---|---|
| Add a doctor check | Add it to **both** `reference/doctor.md` and `templates/brain-doctor.md` — selfcheck fails on a mismatch. Add it to the script only if a machine can settle it exactly; otherwise add it to the script's `NOT_CHECKED` list so the gap is visible. |
| Add a template | List it in SKILL.md's SCAFFOLD table and give it a tier. Selfcheck fails if SKILL.md promises a template that is missing. |
| Add a shape component | Add the include-when test to `reference/shape.md`, a row to the asymmetry table, a row to the Shape record in `templates/brain-index.md`, and a row to the reshape rubric there. The rubric must be **copied into the brain**, because a brain cannot read this skill's reference files. |
| Add or change a mode | Update the brain's `You have N jobs` line, the modes-fire table, the Files table, and the mode-trimming table in `shape.md`. Renumber the Mode headings. |
| Change a law | Think hard. Laws are referenced by number across every file. Grep for `law <n>` first. |
| Change the script | `node --check`, then run it against a real brain **and** a scratch scaffold. A checker that always passes is worthless; confirm it still fails on something. |
| Anything at all | Append an entry to `built.md` saying what changed and **why**, including anything you decided *not* to do. The why is the part that stops the next person undoing it. |

## Known-fragile, and open questions

Honest list. None of these is a defect; all are worth watching.

- **`templates/brain-SKILL.md` is around 470 lines** and loads on every brain invocation.
  Trimming three modes saved only ~70 lines. If it proves heavy in practice, move the rarely-read
  detail (block formats, retirement rules) into a brain-side reference file loaded on demand.
- **The shape questions have never been answered by a real person** — only simulated. That is the
  largest untested surface, and one real run teaches more than another audit.
- **Four of eleven shape tests are inferences**, labelled `inferred` in the Shape record. The
  safeguard is that SHAPE reads them aloud for correction. If people routinely correct the same
  row, convert it into a question and accept an 8th.
- **`templates/brain-README-TEAM.md` has ~38 `<TODO:` markers.** Intentional — it is the most
  context-specific file in a brain — but it is a lot to fill, and an unfilled one is worse than
  none because a teammate follows it literally.
- **No locking.** Two sessions capturing at once can claim the same ID. Handled reactively
  (grep before claiming; renumber the one with fewer inbound references) which is the right
  trade for a Markdown system, but it is a real race.

## What not to "clean up"

Things that look like cruft and are load-bearing:

- **`built.md` ships with an empty brain registry.** A factory carrying one team's brain list is
  not shareable. Each installation fills it in.
- **The script has zero dependencies, deliberately.** No `package.json`, no `npm install`, no
  `node_modules` — which is also why the brain template can forbid `node_modules` without
  contradicting itself. Do not add a dependency to save a few lines.
- **`built.md` is excluded from the leak check**, because it is this factory's own history and
  legitimately names the skill's former name.
- **The brain's checklist duplicates the factory's.** That is not redundancy — it is what lets a
  brain audit itself with this skill absent. Selfcheck keeps the copies in parity.
- **Examples use `F-nnn`, never digits.** See bug pattern 1.
