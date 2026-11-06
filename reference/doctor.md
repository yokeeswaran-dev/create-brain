# Doctor — the integrity checklist

Run every check. Report a table: **Check | Result | What to fix**.

**Fix nothing without asking, with one exception:** `index.md` drift. A wrong map makes every
answer unsafe, so correcting it is always allowed — and always logged in `changelog.md`.

## Before you start — read the Shape record

Open `index.md` → `## Shape` first. **A component it marks `no` is deliberately absent, not
missing.** Checks 1, 2 and 15 are scoped by it: a brain with no `graph.md` has no orphan
entities and no unproven edges to find, and reporting them trains the person to ignore the
audit.

If the brain has **no Shape record at all**, that is finding 21 — it was built before the shape
rules or by hand. Reconstruct it from what is actually there, with the person, before judging
anything else. Until it exists you cannot tell a deliberate omission from a defect, which is the
whole point of the record.

## Checks

| # | Check | How | Why it matters |
|---|---|---|---|
| 1 | **Index drift — missing file** | every file listed in `index.md` exists | the brain will try to read it mid-answer and silently fall back to guessing |
| 2 | **Index drift — unlisted file** | every `.md` in the folder is listed | an unlisted fact file is never read, so its facts are invisible while looking true |
| 3 | **Index drift — missing ID row** | grep `### [FERDCPQ]-` across all files; every hit has an `index.md` row | ANSWER starts from the index; an unindexed fact is a fact nobody finds |
| 4 | **Index drift — phantom ID row** | every `index.md` ID row resolves to a real block | a row pointing nowhere reads as "we know this" when nothing is recorded |
| 5 | **Duplicate IDs** | the same `### X-nnn` appearing twice | two different claims under one ID; links become ambiguous |
| 6 | **Dangling links** | every ID in a `Links:` / `From:` / `To:` / `Evidence:` / `Blocks:` line exists — see the two exceptions under "Two things this check must not get wrong" | a link to nothing hides a lost fact |
| 7 | **Orphan entities** | every `E-` has at least one fact in `Facts:` | an entity with no proof is a guess wearing a node's clothes |
| 8 | **Unproven edges** | every `R-` has an `Evidence:` fact that exists | "both ends exist" is not proof of a connection — the main way a graph turns into fiction |
| 9 | **Stale ✅ facts** | `Last checked` more than 30 days ago | must be downgraded to ⚠️ (old); a brain that silently ages into fiction is worse than an empty one |
| 10 | **Guesses without parents** | every ⚠️ (guess) has `Built from:` | a wrong conclusion cannot be traced to the wrong input |
| 11 | **Probeless questions** | every `Q-` has a `Probe that closes it` | otherwise it is a complaint, and VERIFY cannot act on it |
| 12 | **Open conflicts not badged** | every open `C-`'s facts are badged ⚠️ (conflict C-nnn) | a disputed fact that still reads ✅ is the worst state in the brain |
| 13 | **Secrets in the folder** | match assigned **values** (`token: <12+ chars>`), not the bare words — `secrets.example.md` and the docs legitimately contain "password" and "token", and a check that cries wolf on its own documentation gets ignored | a brain folder gets shared; a value inside it leaks the moment it is |
| 14 | **Oversized files** | any fact file over ~300 lines | big files get skimmed, and skimming is how facts get missed |
| 15 | **Untyped facts** | every fact's Key uses a type that exists in `ontology.md` | an untyped fact cannot be found by Key or placed in the graph |
| 16 | **Undrained journal** | `journal.md` entries with no `→ F-nnn` and older than a session | evidence rotting in the inbox; nobody answers from the journal |
| 17 | **Superseded decisions still active** | every `D-` marked superseded names its replacement, and the replacement exists | PLAN will enforce a rule the team has already dropped |
| 18 | **Stuck plans** | `P-` still `in-progress` with no log entry for a while | half-done work with no record of where it stopped |
| 19 | **Frontmatter** | `SKILL.md` has `name:` and a trigger-rich `description:` | without it the skill never auto-loads, and the whole brain is invisible |
| 20 | **Leftover TODOs** | `<TODO:` markers still present | an unfinished scaffold pretending to be a brain |
| 21 | **Shape record missing** | `index.md` has a `## Shape` section | without it nobody can tell a deliberate omission from a lost file, so every later audit is guesswork |
| 22 | **Shape drift** | every component the Shape record says `yes` exists, and nothing marked `no` is present | a shape that no longer describes the folder is worse than none — it actively misleads |
| 23 | **Charter not satisfied** | each of the three "Must answer" questions can actually be answered from the brain today | this is the brain's contract. A `Q-` against one of them is honest; **no way to record the answer** is a shape error, and a factory bug worth a `U-` |
| 24 | **Modes promised but trimmed** | every mode section in `SKILL.md` is one the Shape record keeps, and vice versa | a mode left in but unsupported is a promise the brain cannot keep; a mode trimmed but still listed gets invoked and fails |
| 25 | **Script contract** | for each `scripts/` entry: read-only by allowlist, writes behind an explicit flag, secrets resolved from outside the folder, listed in `index.md` → Scripts and in the read-only probe list | a script is the one part of a brain that can change the world. An unlisted or unbounded one is the largest risk in the folder |
| 26 | **`node_modules` committed** | no `node_modules/` inside the brain, and it is gitignored / excluded from the shared folder | it bloats the share, breaks across operating systems, and buries the brain's actual content under thousands of files |
| 27 | **Neighbour table incomplete** | every neighbour row has a **How to consult** cell naming what to invoke, what to ask, and what to do when it is absent | without the absent-case line the brain fails instead of degrading, and a half answer gets presented as a whole one |
| 28 | **`README-TEAM.md` stale** | its setup steps and its file table still match reality (run check 22 against it) | a teammate follows it literally. A wrong step there costs an hour and the brain's credibility |
| 29 | **`U-` without evidence** | every `U-` has a `What happened` describing a real event, not a hypothetical | HARVEST will reject it anyway; better to catch it here than to carry a wish as a finding |
| 30 | **Dead proof** | every live ✅ fact whose `Command/File` is a `path:line` — that file still exists | **the confidently-stale failure.** A fact checked 10 days ago about a file deleted yesterday still reads ✅, and neither the badge nor `Last checked` catches it. This is the cheap check that does. A hit means **retire the fact**, not delete it |
| 31 | **Retired entity with live edges** | no `R-` points at an entity marked `Status: retired` unless that edge is retired too | an edge into something that no longer exists makes the graph lie about the present, and blast-radius walking then guards a thing that is already gone |
| 32 | **Coverage missing or stale** | `index.md` has a `## Coverage` block, every shortfall has a `Q-`, and `Last counted` is recent | without it, 18 facts and 180 facts look identical from outside, and nobody learns the brain is too thin until it fails them mid-task |
| 33 | **Fact file split by size, not meaning** | no fact file named `*-part2`, `*-2`, `*-old`, `misc`, `other`, `general` | a file nobody can guess the contents of is a file nobody looks in, so it rots while still reading ✅. Fix by RESHAPE: split on the real seam |
| 34 | **Index over ~150 IDs still untiered** | past ~150 IDs, `index.md` holds the map and counts rather than the full per-ID tables | the index is read before **every** answer. Fact files are on demand; this one is not, so it is the only file whose size is a permanent running cost |
| 35 | **Placeholder IDs written with digits** | no file named `TEMPLATE.md` or `*.example.md` writes an ID with three digits in its examples — they must be `-nnn` | **this is the root cause of phantom duplicates and dangling links.** A heading or an example table row carrying a three-digit ID reads exactly like a real record, so it surfaces later as two confusing symptoms instead of one obvious cause |

## Two things this check must not get wrong

Both of these produce **false dangling links** and will send you chasing problems that do not
exist. Learned the first time this checklist was run, on `service-brain`.

**1. An ID can be defined by a table row, not only by a `### ` block.** A brain may record its
entities, relations and open questions as rows in `graph.md` / `index.md` rather than as full
blocks — that is allowed and is often the better choice for short records. So "defined" means
either form:

```bash
# defined as a block
grep -rhoE "^### [FERDCPQS]-[0-9]+" . | grep -oE "[FERDCPQS]-[0-9]+" | sort -u
# defined as a table row
grep -rhoE "^\| ([FERDCPQS])-[0-9]{3} \|" . | grep -oE "[FERDCPQS]-[0-9]{3}" | sort -u
```

**2. A cross-brain reference is not a local ID.** `cluster-brain:F-nnn` points into a neighbour
brain and must **never** be reported as dangling — resolving it is that brain's job. Strip
`<brain>:` prefixed references before comparing.

**3. Placeholders in format examples must not be counted.** Every template writes its examples
as `F-nnn`, `E-nnn`, `D-nnn` — no digits — exactly so that the duplicate-ID grep finds only
real records. If a brain's examples use real-looking numbers (`### F-012`), the duplicate check
reports false hits; fix the examples to `-nnn` rather than loosening the check.

## Useful probes

**Every probe must exclude `node_modules`.** A brain with scripts has thousands of files in
there; without the exclusion the greps are slow, and the duplicate-ID and secrets checks fill
with hits from third-party code and become unreadable. `$X` below is that exclusion.

```bash
X='--exclude-dir=node_modules'

# duplicate IDs — any output here is a real failure
grep -rhoE $X "^### [FERDCPQSU]-[0-9]+" . | sort | uniq -d

# count of defined blocks per type
grep -rhoE $X "^### [FERDCPQSU]-[0-9]+" . | grep -oE "^### [FERDCPQSU]" | sort | uniq -c

# dangling links, handling all three exceptions above
comm -23 \
  <(grep -rhoE $X "([a-z0-9-]+:)?[FERDCPQSU]-[0-9]{3}" . | grep -v ":" | sort -u) \
  <(cat <(grep -rhoE $X "^### [FERDCPQSU]-[0-9]+" . | grep -oE "[FERDCPQSU]-[0-9]+") \
        <(grep -rhoE $X "^\| [FERDCPQSU]-[0-9]{3} \|" . | grep -oE "[FERDCPQSU]-[0-9]{3}") | sort -u)

# files vs index, and vs the Shape record
find . -name "*.md" -not -path "*/node_modules/*" | sort

# secrets
grep -rniE $X "password|bearer |secret:|token:|api[_-]?key" .

# file sizes
find . -name "*.md" -not -path "*/node_modules/*" -exec wc -l {} + | sort -rn | head

# leftover scaffold markers
grep -rn $X "<TODO:" .

# node_modules committed into the brain (check 26)
find . -type d -name node_modules

# dead proof (check 30) — every path:line proof whose file is gone
grep -rhoE $X "Command/File: \`[^\`]+\`" . | sed -E 's/.*`([^`:]+).*/\1/' | sort -u \
  | while read p; do [ -e "$p" ] || echo "MISSING: $p"; done

# retired blocks, and edges that may now dangle (check 31)
grep -rn $X "^- Status: retired" .

# split-by-size filenames (check 33)
find . -name "*.md" -not -path "*/node_modules/*" \
  | grep -iE "part[0-9]|-[0-9]+\.md|misc|other|general|old"

# index size (check 34) — count of ID rows in the index
grep -cE "^\| [FERDCPQSU]-[0-9]{3} \|" index.md

# script write-gates (check 25) — every mutating entry point should be behind a flag
grep -rnE $X "allow-|READ_ONLY|REFUSED|GATED" scripts/ 2>/dev/null
```

Anything referenced and not defined is a dangling link. Anything defined and not referenced is
fine — facts need no inbound links.

## After the report

Group the findings:

- **Unsafe now** (checks 1-5, 12, 13, 19, 24, 25, 26, 30, 31) — the brain can give a wrong
  answer, fail a promised mode, or leak. Fix first.
- **Rotting** (9, 14, 16, 17, 18, 22, 28, 32, 33, 34) — accurate today, misleading soon.
- **Incomplete** (7, 8, 10, 11, 15, 20, 21, 23, 27, 29) — honest gaps. Turn each into a `Q-` and
  let VERIFY work through them.

**Check 30 is the one to run first on any brain more than a month old.** It is the only check
that catches a fact which is well-proved, recently checked, correctly badged — and about
something that no longer exists.

Check 23 is the one to escalate: if a charter question cannot be answered because the brain has
**nowhere to record** the answer, that is a factory bug, not a brain gap. Raise a `U-` in
`upstream.md` so the include-when test that chose this shape gets fixed for every future brain.

A clean doctor run gets a `changelog.md` line too. Knowing when the brain was last audited is
itself a fact worth having.
