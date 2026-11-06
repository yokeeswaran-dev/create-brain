# facts/<topic> — <what this file covers>

<TODO: one or two lines on the scope of this file, and the access path its facts came from.>

Format is in `SKILL.md`. Key grammar and types are in `ontology.md`.

Split this file at about 300 lines — **by meaning, never by size.** Name both halves for what
they hold (`http-routes.md` + `messaging.md`), never `<topic>-part2.md` and never `misc.md`: a
file nobody can guess the contents of is a file nobody opens, so it rots while still reading ✅.
The test is *could someone guess which file holds the answer from the question alone?*

When a fact moves to another file, **the ID does not change** — update `index.md` in the same
step and write a `changelog.md` line.

## Facts

### F-nnn: <short title>
- Key: `<zone>.<type>.<name>.<property>`
- Zone: <zone>
- Badge: ✅ VERIFIED
- Fact: <one clear sentence>
- Proof:
  - Source: command | file | user | transcript
  - Command/File: `<the exact command, or path:line>`
  - Output (key lines only): `<the lines that prove it>`
  - Seen: <date>, project <folder>
- Links: <E-, F-, D-, S- IDs>
- Last checked: <date>
- History:

<!-- A fact whose thing no longer exists gets `- Status: retired <date> — <why>` added, keeps its
     badge and proof, and stays here. It is history: it can be cited as "it used to be X", but it
     never backs a current answer. Retiring is not deleting (law 4). -->

