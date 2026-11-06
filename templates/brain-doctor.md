# <BRAIN-NAME> — my own integrity checklist

**I audit myself.** No other skill is needed for this. DOCTOR runs every check here and reports
**Check | Result | What to fix**.

<TODO: at scaffold, delete the rows for components the Shape record excludes. A brain with no
`graph.md` has no orphan entities and no unproven edges to find; leaving those rows in produces
findings that cannot exist, and a person who sees phantom findings stops reading the report.>

**Fix nothing without asking, with one exception:** `index.md` drift. A wrong map makes every
answer unsafe, so correcting it is always allowed — and always logged in `changelog.md`.

**Read the Shape record in `index.md` first.** A component it marks `no` is deliberately absent,
not missing.

## Checks

| # | Check | How | Why it matters |
|---|---|---|---|
| 1 | **Index drift — missing file** | every file listed in `index.md` exists | I will try to read it mid-answer and silently fall back to guessing |
| 2 | **Index drift — unlisted file** | every `.md` in the folder is listed | an unlisted fact file is never read, so its facts are invisible while looking true |
| 3 | **Index drift — missing ID row** | every defined ID has an `index.md` row | ANSWER starts from the index; an unindexed fact is a fact nobody finds |
| 4 | **Index drift — phantom ID row** | every `index.md` ID row resolves to a real block or table row | a row pointing nowhere reads as "we know this" when nothing is recorded |
| 5 | **Duplicate IDs** | the same `### X-nnn` twice | two claims under one ID; every link to it becomes ambiguous |
| 6 | **Dangling links** | every ID in `Links:` / `From:` / `To:` / `Evidence:` / `Blocks:` exists — mind the three traps below | a link to nothing hides a lost fact |
| 7 | **Orphan entities** | every `E-` has at least one fact in `Facts:` | an entity with no proof is a guess wearing a node's clothes |
| 8 | **Unproven edges** | every `R-` has an `Evidence:` fact that exists | "both ends exist" is not proof of a connection — the main way a graph turns into fiction |
| 9 | **Stale ✅ facts** | `Last checked` more than 30 days ago | must become ⚠️ (old). A brain that silently ages into fiction is worse than an empty one |
| 10 | **Guesses without parents** | every ⚠️ (guess) has `Built from:` | a wrong conclusion cannot be traced to the wrong input |
| 11 | **Probeless questions** | every `Q-` has a probe | otherwise it is a complaint, and VERIFY cannot act on it |
| 12 | **Open conflicts not badged** | every open `C-`'s facts are ⚠️ (conflict C-nnn) | a disputed fact still reading ✅ is the worst state I can be in |
| 13 | **Secrets in this folder** | match assigned **values** (`token: <12+ chars>`), not the bare words — my own `secrets.example.md` and docs legitimately contain "password" and "token", and a check that cries wolf on its own docs gets ignored | this folder gets shared; a value inside it leaks the moment it is |
| 14 | **Oversized files** | any fact file over ~300 lines | big files get skimmed, and skimming is how facts get missed. Fix by RESHAPE |
| 15 | **Untyped facts** | every Key uses a type that exists in `ontology.md` | an untyped fact cannot be found by Key or placed in the graph |
| 16 | **Undrained journal** | `journal.md` entries with no `→ F-nnn`, older than a session | evidence rotting in the inbox; nobody answers from the journal |
| 17 | **Superseded decisions still active** | every superseded `D-` names its replacement, and it exists | PLAN will enforce a rule the team already dropped |
| 18 | **Stuck plans** | `P-` still `in-progress` with no recent log entry | half-done work with no record of where it stopped |
| 19 | **Frontmatter** | `SKILL.md` has `name:` and a trigger-rich `description:` | without it I never auto-load, and all of this is invisible |
| 20 | **Leftover TODOs** | `<TODO:` markers still present | an unfinished scaffold pretending to be a brain |
| 21 | **Shape record present** | `index.md` has a `## Shape` section | without it nobody can tell a deliberate omission from a lost file |
| 22 | **Shape drift** | everything marked `yes` exists; nothing marked `no` is present | a shape record that no longer describes the folder actively misleads. Fix by RESHAPE |
| 23 | **Charter satisfied** | each "Must answer" question can actually be answered today | this is my contract. A `Q-` against one is honest; **nowhere to record the answer** is a shape error → RESHAPE, and a `U-` if the template chose my shape wrong |
| 24 | **Modes promised but trimmed** | every mode section in `SKILL.md` is one the Shape record keeps, and vice versa | a mode left in but unsupported is a promise I cannot keep; a mode trimmed but still listed gets invoked and fails |
| 25 | **Script contract** | each `scripts/` entry is read-only by allowlist, writes are behind an explicit flag, secrets resolve outside this folder, and it is listed in `index.md` → Scripts **and** in the read-only probe list | a script is the one part of me that can change the world. An unlisted or unbounded one is my largest risk |
| 26 | **`node_modules` committed** | none inside this folder, and it is gitignored / excluded from the share | it bloats the share, breaks across operating systems, and buries my content under thousands of files |
| 27 | **Neighbour table complete** | every neighbour row has a **How to consult** cell naming what to invoke, what to ask, and what to do when it is absent | without the absent-case line I fail instead of degrading, and a half answer gets presented as a whole one |
| 28 | **`README-TEAM.md` current** | its setup steps and file table still match reality | a teammate follows it literally. A wrong step costs them an hour and costs me their trust |
| 29 | **`U-` without evidence** | every `U-` describes a real event, not a hypothetical | HARVEST will reject it anyway; better caught here |
| 30 | **Dead proof** | every live ✅ fact whose `Command/File` is a `path:line` — that file still exists | **the confidently-stale failure.** A fact I checked 10 days ago about a file deleted yesterday still reads ✅, and neither the badge nor `Last checked` catches it. A hit means **retire the fact**, never delete it |
| 31 | **Retired entity with live edges** | no `R-` points at an entity marked `Status: retired` unless that edge is retired too | an edge into something gone makes my graph lie about the present, and blast-radius walking then guards a thing that no longer exists |
| 32 | **Coverage missing or stale** | `index.md` has a `## Coverage` block, every shortfall has a `Q-`, and `Last counted` is recent | without it, 18 facts and 180 facts look identical from outside, and nobody learns I am too thin until I fail them mid-task |
| 33 | **Fact file split by size, not meaning** | no fact file named `*-part2`, `*-2`, `*-old`, `misc`, `other`, `general` | a file nobody can guess the contents of is a file nobody opens, so it rots while still reading ✅. Fix by RESHAPE: split on the real seam |
| 34 | **Index over ~150 IDs still untiered** | past ~150 IDs, `index.md` holds the map and counts rather than full per-ID tables | the index is read before **every** answer. Fact files are on demand; this one is not, so its size is a permanent running cost. Fix by RESHAPE |
| 35 | **Placeholder IDs written with digits** | no file named `TEMPLATE.md` or `*.example.md` writes an ID with three digits in its examples — they must be `-nnn` | **this is the root cause of phantom duplicates and dangling links.** A heading or an example table row carrying a three-digit ID reads exactly like a real record, so it surfaces later as two confusing symptoms instead of one obvious cause |

**Run check 30 first on anything I have held for more than a month.** It is the only check that
catches a fact which is well-proved, recently checked, correctly badged — and about something
that no longer exists.

## Three traps that produce false findings

**1. An ID can be defined by a table row, not only a `### ` block.** Recording entities,
relations and open questions as rows is allowed and is often better for short records. "Defined"
means either form:

```bash
grep -rhoE "^### [FERDCPQSU]-[0-9]+" . | grep -oE "[FERDCPQSU]-[0-9]+" | sort -u
grep -rhoE "^\| ([FERDCPQSU])-[0-9]{3} \|" . | grep -oE "[FERDCPQSU]-[0-9]{3}" | sort -u
```

**2. A cross-brain reference is not a local ID.** `<other-brain>:F-066` points into a neighbour
and must **never** be reported as dangling — resolving it is that brain's job. Strip
`<brain>:` prefixed references before comparing.

**3. Placeholders in format examples must not be counted.** Examples are written `F-nnn`,
`E-nnn` — no digits — exactly so the duplicate grep finds only real records. If an example here
ever uses a real-looking number, fix the example rather than loosening the check.

## Probes

**Every probe excludes `node_modules`** — without it the duplicate-ID and secrets greps fill
with third-party hits and become unreadable.

```bash
X='--exclude-dir=node_modules'

# duplicate IDs — any output is a real failure
grep -rhoE $X "^### [FERDCPQSU]-[0-9]+" . | sort | uniq -d

# dangling links, handling all three traps
comm -23 \
  <(grep -rhoE $X "([a-z0-9-]+:)?[FERDCPQSU]-[0-9]{3}" . | grep -v ":" | sort -u) \
  <(cat <(grep -rhoE $X "^### [FERDCPQSU]-[0-9]+" . | grep -oE "[FERDCPQSU]-[0-9]+") \
        <(grep -rhoE $X "^\| [FERDCPQSU]-[0-9]{3} \|" . | grep -oE "[FERDCPQSU]-[0-9]{3}") | sort -u)

find . -name "*.md" -not -path "*/node_modules/*" | sort          # files vs index vs Shape
grep -rniE $X "password|bearer |secret:|token:|api[_-]?key" .     # secrets
find . -name "*.md" -not -path "*/node_modules/*" -exec wc -l {} + | sort -rn | head
grep -rn $X "<TODO:" .                                            # scaffold markers
find . -type d -name node_modules                                 # check 26

# dead proof (check 30) — every path:line proof whose file is gone
grep -rhoE $X "Command/File: \`[^\`]+\`" . | sed -E 's/.*`([^`:]+).*/\1/' | sort -u \
  | while read p; do [ -e "$p" ] || echo "MISSING: $p"; done

grep -rn $X "^- Status: retired" .                                # check 31
find . -name "*.md" | grep -iE "part[0-9]|-[0-9]+\.md|misc|other|general|old"   # check 33
grep -cE "^\| [FERDCPQSU]-[0-9]{3} \|" index.md                   # check 34
```

## After the report

Group the findings:

- **Unsafe now** (1-5, 12, 13, 19, 24, 25, 26, 30, 31) — I can give a wrong answer, fail a
  promised mode, or leak. Fix first.
- **Rotting** (9, 14, 16, 17, 18, 22, 28, 32, 33, 34) — accurate today, misleading soon.
- **Incomplete** (7, 8, 10, 11, 15, 20, 21, 23, 27, 29) — honest gaps. Turn each into a `Q-` and
  let VERIFY work through them.

Then route anything structural: **checks 14, 22, 23, 33 and 34 → RESHAPE** (my shape is wrong),
and a template-level cause → **PROPOSE** (`U-`). A clean run still gets a `changelog.md` line.
