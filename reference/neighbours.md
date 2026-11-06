# Neighbour brains — independence first, then collaboration

Two rules that sound opposed and are not:

1. **A brain must work alone.** If every neighbour is missing, it still answers every question
   inside its own charter, completely, with proof.
2. **A brain must know where its knowledge stops**, and be able to ask the brain that owns the
   rest — without ever copying that brain's facts.

Independence is the floor. Collaboration is the ceiling. Build the floor first.

## Why copying is the thing to avoid

Two brains holding two copies of one fact is worse than one brain not knowing it. The copies
drift — one gets re-verified, the other ages into fiction — and then **neither can be trusted**,
because a reader cannot tell which copy is current. One wrong shared fact costs more than ten
honest gaps.

So: a fact lives in exactly one brain. Everyone else points at it.

---

## The neighbour table

Lives in the generated `index.md`. The first three columns were always there; **the fourth is
what makes collaboration real** instead of a note in a file.

```markdown
## Neighbour brains

A fact belonging to another brain's zone is **referenced, never copied** — write
`<other-brain>:F-nnn`. If that fact turns out wrong, open the conflict **in that brain**.

| Brain | Owns | Reference as | How to consult |
|---|---|---|---|
| `cluster-brain` | the clusters: namespaces, workloads, service accounts, the deployed databases, the access paths | `cluster-brain:F-nnn` | invoke the `cluster-brain` skill. Ask it for a **deployed** value, never for repo structure. Take its fact IDs verbatim into `Links:`. If absent: say "the deployed side is owned by `cluster-brain`, which is not installed here", and give the probe. |
```

The **How to consult** cell answers four things, in this order:

1. **What to invoke** — the skill name, exactly as typed.
2. **What to ask it** — the kind of question it owns. Asking a neighbour something outside its
   charter gets a confident wrong answer, which is the worst outcome available.
3. **What to do with the answer** — carry its fact IDs; never re-badge them as your own.
4. **What to do when it is absent** — the degradation line. Not optional; see below.

---

## Mode CONSULT — the protocol

Trigger: a question, plan step or conflict needs a fact that the charter's **Does NOT own** line
assigns to a neighbour.

1. **Check your own brain first.** If you already hold it, you own it — answer and stop. Do not
   consult for something inside your charter; that is how two brains end up with two copies.
2. **Name the owner** from the neighbour table. If no neighbour owns it either, this is a plain
   gap: open a `Q-` with the probe. Do not go looking for a brain to blame it on.
3. **Invoke that skill** and ask only what it owns, in one specific question.
4. **Carry the answer, do not absorb it.** Record it as `<brain>:F-nnn` in `Links:`. Keep its
   badge as that brain gave it — a neighbour's ⚠️ stays ⚠️ here. **Never create a local `F-`
   that restates a neighbour's fact.**
5. **Say in the answer that it came from a neighbour**, with the brain's name. The person needs
   to know which brain to go to if it is wrong.
6. **If it disagrees with one of your facts**, open the `C-` conflict **in the brain that owns
   the disputed fact** — not in both. Note the cross-reference on your side.
7. **One hop only — never consult the brain that just consulted you.** A brain invoked *by* a
   neighbour answers from its own facts or says it does not have it; it does not hand the
   question back. Two brains that each believe the other owns a fact will round-trip forever and
   neither will answer. This is why the boundary in the charter must **mirror** on both sides: a
   gap in one description and an overlap in the other is exactly what starts the loop.

### When the neighbour is not installed

This is the normal case on a new machine, and it must not look like a failure of your brain.
Answer in this shape:

> **Answer:** <everything you do own, in full>.
> **Not mine:** the deployed values are owned by `cluster-brain`, which is not installed here.
> **Probe:** `<the command that would get it directly>`

Then carry on. Never guess the neighbour's half, and never silently drop it — a half answer
presented as whole is the one failure mode that makes a brain unsafe to rely on.

---

## Deciding the boundary

Write both sides into the charter at SCOPE, and make them mirror each other:

| In your brain | In the neighbour |
|---|---|
| **Owns:** the repo on disk, its structure, conventions, local commands | **Owns:** the clusters, what is deployed, how to reach them |
| **Does NOT own:** anything deployed → `cluster-brain` | **Does NOT own:** repo internals → `service-brain` |

The test for "which brain owns this fact" is **which zone proves it**. A config value read from
`config/app.json` on disk is the repo brain's (`file:line` proof). The same key's value inside a
running pod is the cluster brain's (`kubectl` proof). Those are **two different facts**, not one
fact in two places — and that distinction is what stops the copying problem at its source.

When a fact would be equally at home in either brain, it belongs to **one brain and more zones**,
not to two brains. Splitting later is cheap — a fact keeps its ID when it moves. Merging two
brains that grew apart is not.

---

## Feeding the factory — the `U-` loop

A brain is the only thing that finds out where the template is wrong. It is in the area, doing
the work, hitting the friction. That knowledge must come back or every future brain repeats it.

**Raise a `U-`** in `upstream.md` when the brain hits *real, repeated* friction caused by its
template or its shape — not when something is merely imaginable.

| Raise a `U-` | Do not raise a `U-` |
|---|---|
| A rule was followed and produced a wrong or unsafe result | A rule felt verbose |
| A file the shape omitted turned out to be needed twice | A file *might* be needed one day |
| A needed component has no slot in the catalogue (what `README-TEAM.md` was before it had one) | A component exists but was skipped by choice — that is a reshape, not a factory bug |
| An include-when test gave the wrong answer for this area | A one-off area quirk — that is an area-specific `SKILL.md` section, not a factory change |
| The same `Q-` keeps reopening because the template has nowhere to put its answer | — |

**Evidence is required.** A `U-` carries what happened, not what might. The format is in
`grammar.md`; the file is `templates/brain-upstream.md`.

The brain **proposes and never edits the factory.** `create-brain` is a shared skill; a brain
changing it directly would change every future brain with no review. The factory's **HARVEST**
mode reads these, triages them, and applies or rejects each with a reason — and the rejection is
written back so the same proposal is not raised twice.

### The one `U-` that is always worth raising

If the brain finds itself unable to answer a question that is squarely inside its charter —
because its shape has nowhere to record the answer — that is a factory bug every time. The
charter's "Must answer" list is the contract; a shape that cannot satisfy it was mis-chosen, and
the include-when test that chose it needs fixing in `shape.md`.
