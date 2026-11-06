# <BRAIN-NAME> — upstream proposals to `create-brain`

Friction this brain hit that was caused by **the factory**, not by this area.

This brain **proposes and never edits `create-brain` directly.** The factory is shared: a brain
changing it would change every future brain with no review. `create-brain`'s **HARVEST** mode
reads this file, triages each entry, and writes the result back here — including rejections, so
the same proposal is not raised twice.

## When to raise a `U-`

Only for **real, repeated** friction. Evidence is required: what happened, not what might.

| Raise one | Do not raise one |
|---|---|
| A law was followed and produced a wrong or unsafe result | A law felt verbose |
| A component the shape omitted turned out to be needed, twice | A component *might* be needed one day |
| Something needed has no slot in the catalogue at all | A component exists but was skipped on purpose — that is a reshape |
| An include-when test gave the wrong answer for this area | A one-off quirk of this area — that is an area-specific `SKILL.md` section |
| A question inside the charter cannot be answered because the shape has nowhere to put it | — |

The last row is **always** a factory bug: the charter's "Must answer" list is the contract, so a
shape that cannot satisfy it was mis-chosen.

## Block format

```
### U-nnn: <the friction, in one line>
- Raised: <date>, by <BRAIN-NAME>, template <version>
- Status: open | applied <date> in create-brain <version> | rejected <date> — <reason>
- What happened: <the real event, once per occurrence, with dates>
- Evidence: <fact IDs, the command and its output, the session, or what the rule produced>
- Root cause in the factory: <the law number, the include-when test, or the template file>
- Proposed change: <the specific edit — which file, what it should say instead>
- Blast radius: <which future brains this changes, and whether existing brains need an UPGRADE>
```

`Status` is the only line HARVEST edits. Everything else is this brain's record and stays as
written.

## Proposals

_(none yet)_

<!--
### U-nnn: <title>
- Raised: <date>, by <BRAIN-NAME>, template v2
- Status: open
- What happened: <...>
- Evidence: <...>
- Root cause in the factory: <...>
- Proposed change: <...>
- Blast radius: <...>
-->
