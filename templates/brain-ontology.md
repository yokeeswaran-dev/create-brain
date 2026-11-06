# <BRAIN-NAME> — ontology

The schema of this brain. It is what makes a fact *typed* instead of loose text, and what makes
`graph.md` walkable by machine.

**Rule: nothing gets recorded that the ontology has no type for.** If evidence shows a thing
that does not fit, add the type here first — in the same session, with a `changelog.md` line.
Guessing a type is as bad as guessing a fact.

## Key grammar

```
<zone>.<type>.<name>.<property>
```

- `zone` — one of the zones below
- `type` — one of the entity types below
- `name` — the entity's **stable** identity (see each type's identity rule)
- `property` — what is being claimed about it

The same Key must always mean the same thing. Two facts with the same Key and different values
are a **conflict**, not two facts. Two things that only *look* the same but live in different
zones get **different Keys** — that is the "fake conflict" check in the Conflict process.

Examples: `code.module.billing.entrypoint`, `staging.service.postgres.port`.

## Zones

A zone is a distinct place inside this area, with its own way in and its own permissions.

| Zone | What it is | Approved path (law 10) | Action policy | Identity it acts as |
|---|---|---|---|---|
| <TODO> | <TODO> | <TODO: the one way to reach it> | observe + plan | <TODO> |

**Why the approved path is per-zone:** two paths into the same place usually have different
identities and different permissions, so they answer the same question differently. Answering
from the wrong path gives a confidently wrong answer. If the approved path is unavailable, say
so and stop.

## Entity types

One block per type. An entity is a **thing**; a fact is a **claim about** a thing.

```
### T-<type-name>
- Key prefix: <zone>.<type-name>.<name>
- What it is: <one line>
- Identity rule: <what counts as the stable name — and what must NEVER be used as the name,
  e.g. "the deployment name, never a pod name" / "the folder name, never a file path">
- Required properties: <the facts an instance of this type should eventually have>
- Allowed relations: <relation> -> <target type>, <relation> -> <target type>
- Lives in: facts/<file>.md
```

<TODO: fill from the recipe in `create-brain/reference/recipes.md`, then correct from evidence.>

## Relation types

One block per type. A relation is an **edge**; it needs its own evidence, not just two
entities existing.

```
### R-<relation-name>
- From: <entity types allowed on the source side>
- To: <entity types allowed on the target side>
- What it means: <one line>
- Evidence required: <what proves this edge — file:line, a config value, observed traffic,
  a schema reference. "Both ends exist" is NOT evidence for an edge.>
- Direction matters: yes | no
- Transitive: yes | no   (can it be chained when walking the graph?)
```

<TODO: fill from the recipe, then correct from evidence.>

## Instance naming — the trap to avoid

Record **stable** names, never instance names. An instance name changes on every restart,
redeploy or rerun, so a fact keyed to one is stale the moment it is written.

| Record this | Not this |
|---|---|
| the deployment / service name | the pod or container instance name |
| the module or folder name | one file path inside it |
| the table name | a row id |
| the job name | one run id |

Instance names belong **inside the proof block** — they are what you saw, not what you claim.
