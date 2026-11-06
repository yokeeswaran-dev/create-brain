# <BRAIN-NAME> — knowledge graph

The things in <AREA> and how they connect. Types come from `ontology.md`.

**Only fact-backed links are drawn here.** Every edge names the `F-` ID(s) that prove it.
- **Solid** arrow (`-->`) = at least one ✅ VERIFIED fact backs the link
- **Dashed** arrow (`-.->`) = only ⚠️ UNVERIFIED facts back it

"Both ends exist" is not evidence for an edge. An edge needs its own proof — the evidence type
its relation requires in `ontology.md`.

## Nodes

`Status` is blank while live, `retired <date>` once the real thing is gone.

| ID | Type | Name | Zone | Status | Key facts | Fact file |
|---|---|---|---|---|---|---|
| | | | | | | |

## Edges

| ID | From | Relation | To | Badge | Status | Evidence |
|---|---|---|---|---|---|---|
| | | | | | | |

## Retirement — keep the graph honest about the present

When a thing in <AREA> is removed, mark its node `Status: retired <date> — <why>` and **retire or
re-point every edge touching it, in the same step.**

An edge into something that no longer exists is the graph **lying about the present**, and it is
worse than a missing edge: law 12's blast-radius walk would then guard a dependency that is
already gone, and let the real one through. `doctor.md` check 31 catches it.

Retired nodes and edges **stay in these tables** (law 4) and are **left out of the diagram** —
the picture shows what is there now. Record what was removed in the node's `Note:` so the history
is still reachable.

## Diagram

<TODO: validate the mermaid syntax before writing, and keep the text fallback below it.>

```mermaid
flowchart TD
  <TODO>

  classDef verified fill:#c9e7c9,stroke:#2a7a2a
  classDef unverified fill:#fdecc8,stroke:#a67c00,stroke-dasharray: 4 2
```

**Text fallback** (for when the diagram will not render):

```
<TODO: the same structure as indented text>
```

## How to walk this graph

Two jobs. Both are mechanical — follow the steps, do not eyeball it.

### Job 1 — multi-hop answers ("does A reach B, and through what?")

1. Find A in the node table. Take its **Edges out**.
2. Follow each edge whose relation is marked `Transitive: yes` in `ontology.md`.
3. Stop when you reach B, or when there are no transitive edges left.
4. In the answer, name **every edge** in the path with its `F-` ID and its badge. One dashed
   edge anywhere in the path makes the whole path unverified — say that in the Answer line.
5. If no path exists, say so, and open a `Q-` if the person expected one. "No recorded path"
   is not the same as "no path exists" — be exact about which you mean.

### Job 2 — blast radius ("what breaks if I change X?") — law 12

Run this **before** planning any change, every time.

1. Find X in the node table. Take its **Edges in** — these are the things that depend on X.
2. For each inbound edge, name the source entity and what it relies on. That is the
   break-list.
3. Walk one more hop out from each of those, for relations marked `Transitive: yes` — a
   second-order break is still a break.
4. For every entity on the list, check whether the brain actually has a fact about *how* it
   depends on X. **If it does not, that is a `Q-`, and it is a blocking assumption for the
   plan** — an unknown consumer is exactly how changes break things.
5. Put the result in the plan's Blast radius table: **Entity | Change | Inbound edges | Guard**.

### Keeping the graph honest

- A new entity needs a fact proving it exists before it gets an `E-` row.
- A node with no facts is an **orphan** — DOCTOR flags it. Either find proof or remove it.
- When a fact is downgraded to ⚠️, every edge that cites it becomes dashed. Fix them in the
  same step.
- When an entity is renamed in reality, the `E-` ID stays and the old name moves to a `Note:`
  line. IDs never change.
