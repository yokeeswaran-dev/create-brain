# Scripts — when a brain needs code, and the contract it must meet

An early version of law 1 forbade scripts outright. It was written from the wrong example. The
first cluster brain built here **could not verify a single fact without its
`scripts/cluster_query.js`**, because every query had to go SSH → jump host → containerised CLI →
the cluster. No shell one-liner does that. Without the script that brain had no evidence at all,
and a brain with no evidence is a folder of guesses.

So scripts are allowed. They are a **capability layer**, and they come with a contract.

## The include-when test

Add `scripts/` only when **both** are true:

1. A zone **cannot be reached or verified** without a tool.
2. **No existing CLI does it in one step.** If `kubectl`, `psql`, `gh` or `curl` already reach
   the zone, use them and put the command in the read-only probe list instead. A script that
   wraps one command for tidiness is a liability, not a capability: it is one more thing that
   can be stale, and it hides the real command from the proof block.

A second, narrower case: a **brain-integrity helper** that is tedious by hand — a
`find-conflict-copies.js` that spots the duplicate files a sync client leaves behind, which
nobody would reliably check manually. Those are DOCTOR helpers and follow the same contract.

If neither applies, stay Markdown-only. Most brains should.

## The one this factory ships: `scripts/brain-doctor.mjs`

The factory has its own script, and it earns its place by the same test. DOCTOR is 35 checks,
several of which are multi-step greps with documented false-positive traps — table-row IDs,
cross-brain references, placeholder IDs, `node_modules` exclusion. Running those by hand is
exactly where mistakes live: **the first time it ran against a real brain it produced two false
positives from its own loose rules**, which is precisely the class of error a human eyeballing
35 greps would have accepted as real.

```bash
node scripts/brain-doctor.mjs <path-to-brain>     # audit one brain
node scripts/brain-doctor.mjs --selfcheck .       # audit this factory's own templates
```

It meets the contract above: **zero dependencies** (so no `package.json`, no `npm install`, no
`node_modules` anywhere), read-only by construction, exit 1 on an UNSAFE NOW finding so CI can
gate on it, and it **prints the checks it did not run** — a tool that silently covers part of a
checklist is worse than no tool, because the gap looks like a pass.

`--selfcheck` is what keeps the factory honest: it catches real-looking IDs in templates, a
check-count mismatch between `reference/doctor.md` and `templates/brain-doctor.md`, promised
templates that do not exist, stated counts that have drifted, and leaked project names.

### A brain never depends on it

**Every brain can audit itself from its own `doctor.md` with no script at all.** That is
deliberate: a brain that needs another skill installed to stay healthy is not finished. The
script is an **accelerator**, not a dependency.

At SCAFFOLD, offer to copy it into the brain's own `scripts/`. If it is there, DOCTOR runs it
first and then works through the judgement checks by hand. If it is not, DOCTOR does all 35 by
hand from the checklist. Same answers, more slowly.

---

## The contract — 9 rules

### 1. Markdown stays the source of truth

A script is a **probe**, never a store. It produces evidence; facts still live in `.md` files
with their proof blocks. A brain whose knowledge is inside a script's logic cannot be read,
reviewed or trusted, and the next person cannot tell what it knows.

### 2. Read-only by default, as an allowlist

Default-deny. Name the safe verbs; refuse everything else, including things you did not think
of. `cluster_query.js` has a `READ_ONLY_VERBS` set, a `GATED_VERBS` set, and then a catch-all that
refuses anything in neither — so a verb nobody anticipated is refused rather than allowed.

A blocklist of dangerous verbs is the wrong shape: the one you forget is the one that costs you.

### 3. Writes need an explicit flag, every time

Anything that can change state — `exec`, `cp`, `port-forward` — requires its own flag
(`--allow-exec`). Not a config setting, not an env var: a flag typed on that invocation, so a
write is always deliberate and always visible in the proof block.

### 4. The script enforces the Action policy in code

If a zone is marked operate-by-default in `SKILL.md`, the script implements that exception for
**that zone only** — `cluster_query.js` permits operations on `sandbox` and refuses the same verb on
`main`. A policy that lives only in prose gets forgotten under time pressure. In code it cannot
be.

### 5. Secrets resolve from outside the brain folder

In this order, and never a fourth: an env var → a path under `~/.claude/<brain>-secrets/` → an
in-folder file **for single-machine setups only**. When nothing is found, the error prints
**every path it tried** and names the setup step. `cluster_query.js` does exactly this, and adds
`Never put secrets.md inside the shared folder.` to the message — because the brain folder gets
shared, and a value inside it leaks the moment it is.

### 6. Dependencies are declared, and failing to find them is actionable

Ship a `package.json`. When a dependency is missing, say which one and the command that fixes
it — `The "ssh2" package is not installed` → `cd scripts && npm install`. Never fail with a raw
stack trace.

`node_modules/` is **not part of the brain.** It is machine-local: gitignore it, exclude it from
the shared folder, and have `README-TEAM.md` tell each person to run `npm install` once. A
committed `node_modules` bloats the share, breaks across operating systems, and buries the
brain's actual content under thousands of files.

### 7. The brain must degrade honestly without it

If the script cannot run, the brain **still answers from its `.md` files**, and says the zone is
unreachable. This is law 10: *if the approved path is unavailable, say so and stop* — never
substitute another path, and never present output from a different path as the answer.

"I cannot reach this zone right now" is a good answer. A guess dressed as a fact is not.

### 8. Output must be quotable as proof

A fact cites `Command:` and the key output lines. So the script prints plainly: no spinners, no
colour codes, no decoration that makes the output unusable inside a proof block. Errors go to
stderr with an `[ERROR]` / `[REFUSED]` prefix so they are never mistaken for data.

### 9. A script never writes to the brain's files

Capture is a reasoning job — matching a Key, checking for a conflict, deciding a badge. A script
that appends facts bypasses all of it and will silently create duplicates and overwrite History.
Scripts report; the brain records.

---

## Review and sharing

Keep a **sample variant** — `cluster_query_sample.js` beside `cluster_query.js` — with no secret
handling, so the script can be read, reviewed or pasted into a ticket without leaking how
credentials are resolved.

In `index.md`, list each script with what it does and whether it can write:

```markdown
| Path | What it does | Can it write? |
|---|---|---|
| `scripts/cluster_query.js` | runs read-only kubectl against a zone via the approved path | only with `--allow-exec`, and only in operate-by-default zones |
| `scripts/find-conflict-copies.js` | finds shared-folder conflict copies | no — reports only |
```

Then add the invocation to the read-only probe list in `SKILL.md`, so ANSWER and VERIFY know it
is safe to run unattended.

## What a script must never be

- A cache of facts. That is what the `.md` files are, and a cache drifts from them.
- A migration or fix-up tool for the brain's own files. Reorganising is a reasoning job with
  law 4 (never lose a fact or its History) hanging over it.
- A reason to skip writing the fact down. The script proves it; the brain records it. If it is
  only in the script's output, nobody knows it tomorrow.
