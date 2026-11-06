# Brain recipes

Starting points per brain type: the zones, entity types and relation types to begin with.

**Type-rich vs type-poor.** The `ontology.md` shape test asks which this is, because counting a
brain's real entity types before the sweep is circular — the recipe hands you ten of them up
front, so a count would pass every time.

| Recipe | Types | `ontology.md` |
|---|---|---|
| 1 Project / codebase | **type-rich** (10 below) | in |
| 2 Infra / cluster | **type-rich** (9 below) | in |
| 3 API | **type-rich** (6 below) | in |
| 4 Data / schema | **type-rich** (7 below) | in |
| 5 Process / team | **type-poor** (7 listed, but a real one usually uses 2-3) | in only with 2+ zones, or names that clash |

**A recipe is a starting point, not the truth.** Correct it from evidence during BOOTSTRAP —
drop a type nothing matches, add a type the evidence demands. Never keep a type just because
the recipe listed it, and never record a thing the ontology has no type for.

---

## 1. Project / codebase brain

For "understand this repo and work in it". The most common kind.

**Zones:** `code` (the repo on disk, read directly), `runtime-local` (the thing running on the
laptop), plus a reference-only zone for anything owned by a neighbour brain.

**Entity types**

| Type | Identity rule | Required properties |
|---|---|---|
| `module` | the folder or package name, never a file path | entrypoint, what it owns, test location |
| `http-endpoint` | method + path, exactly as routed | handler, auth, owning module |
| `event` | the event or message name as the code emits it | direction (in/out), payload shape, owning module |
| `handler` | the exported function name | file, what it is called by |
| `datastore` | the logical store name | kind, how it is reached, owning module |
| `topic` / `queue` | the topic name as configured | producer, consumer, partitions |
| `external-service` | the service name the team uses | base URL source, auth, callers |
| `config-key` | the key as written in config | where read, default, who consumes it |
| `test-suite` | the test file or folder | what it covers, how it runs |
| `command` | the npm/make/script name | what it does, when it is run |

**Relation types:** `registers` (module → endpoint/event), `handles` (handler → endpoint/event),
`calls` (module → external-service), `publishes` / `consumes` (module → topic),
`reads-config` (module → config-key), `persists-to` (module → datastore),
`covered-by` (module → test-suite), `imports` (module → module).

**Evidence that counts:** `file:line` for anything structural. A route is proven by the line
that registers it, not by a doc that mentions it. Docs are ⚠️ (you said) at best — they go
stale silently.

---

## 2. Infra / cluster brain

For "what is running where, and is it healthy". Referred to below as a `cluster-brain`.

**Zones:** one per cluster or environment. **Each zone names its own approved path and the
identity it acts as** — this is the zone property that matters most here, because two paths
into one cluster with different credentials give different answers to the same question.

**Entity types:** `cluster`, `namespace`, `workload` (deployment/statefulset — never a pod
name), `service`, `ingress-route`, `datastore`, `identity` (service account / IAM role),
`config` (configmap/env var), `secret-ref`.

**Relation types:** `runs-in` (workload → namespace), `exposed-by` (workload → service),
`routes-to` (ingress-route → service), `reads` (workload → datastore),
`acts-as` (workload → identity), `can-access` (identity → namespace/resource),
`same-code-as` (workload → workload, across clusters).

**Special care:** the action policy per zone is the whole safety story. Default every zone to
check-only; the person opens specific zones to operate-by-default, by name.

---

## 3. API brain

For "what does this API accept, return, and who calls it".

**Zones:** `spec` (the contract on disk), `live-<env>` (a running instance per environment).

**Entity types:** `endpoint`, `schema` (request/response shape), `auth-scheme`, `consumer`
(who calls it), `error-code`, `rate-limit`.

**Relation types:** `accepts` / `returns` (endpoint → schema), `protected-by` (endpoint →
auth-scheme), `called-by` (endpoint → consumer), `can-return` (endpoint → error-code),
`superseded-by` (endpoint → endpoint).

**The trap:** a published spec is **not** evidence of behaviour. A spec-derived fact is ⚠️
until a real call proves it. Record both when they differ — that difference is usually the most
valuable thing in the brain.

---

## 4. Data / schema brain

For "where does this data live, what shape is it, where did it come from".

**Zones:** one per database or warehouse.

**Entity types:** `database`, `schema`, `table` / `view`, `column` (only when it carries
meaning worth a fact), `key` (primary/foreign), `job` (what writes it), `report` (what reads
it).

**Relation types:** `contains`, `references` (foreign key), `derived-from` (lineage),
`written-by` (table → job), `read-by` (table → report), `joins-to`.

**The trap:** identity. Two columns with the same name in different tables are different
entities. Key grammar must include the table.

---

## 5. Process / team brain

For "how does work actually flow here" — the knowledge that lives only in people's heads.

**Zones:** usually one (`process`), sometimes split per team.

**Entity types:** `workflow`, `step`, `role`, `environment`, `gate` (an approval),
`artifact` (what a step produces), `tool`.

**Relation types:** `precedes` (step → step), `owned-by` (step → role),
`approves` (role → gate), `produces` (step → artifact), `deploys-to` (workflow →
environment), `uses` (step → tool).

**Evidence here is mostly the person's words**, so most facts start ⚠️ (you said) — and that is
correct, not a weakness. Upgrade one to ✅ when a run of the process is actually observed. CI
configs, pipeline files and ticket templates are the rare ✅ sources.

---

## Typical shape per recipe

Starting points for SHAPE, not conclusions. Run the real include-when tests in `shape.md`
against the charter's three questions — this table only says where each type usually lands.

| Recipe | Usually needs | Usually skips | Scripts? | Area sections to expect |
|---|---|---|---|---|
| **Project / codebase** | ontology, graph, decisions, plans | journal, secrets | no — the repo is on disk and `git`/`grep` reach it | where tests go; the build/test command that gates a merge; which files are excluded from coverage |
| **Infra / cluster** | ontology, graph, conflicts, secrets, README-TEAM | journal | **often yes** — if the only path is SSH/jump host/wrapper, as in `cluster-brain` | the access rule (one approved path, and which look-alike path is **not** accepted as proof); the per-zone operate policy |
| **API** | ontology, conflicts, plans | graph (unless consumers matter), journal | sometimes — a saved request collection or a call script | spec-is-not-behaviour; which environment is safe to call |
| **Data / schema** | ontology, graph (lineage), secrets | plans (usually read-only — drop ACT), journal | **often yes** — a read-only query runner | which queries are safe; row-count limits; never run against prod without asking |
| **Process / team** | decisions, conflicts | ontology (one zone), graph (unless steps fan out), secrets | no | who may approve what; where the written rule lives when it disagrees with practice |

Two patterns worth noticing:

- **A data or API brain is often read-only.** Drop PLAN and ACT and `plans/` together, and say so
  in the Shape record. Keeping the modes and omitting the folder is the broken middle.
- **A team brain almost always needs `README-TEAM.md` and the shared-folder discipline section**,
  whatever its recipe. Question 7 of SCOPE decides that, not the recipe.

## Choosing between one brain and two

| Signal | What it means |
|---|---|
| The area needs "and" to describe | probably two brains |
| Two parts have different approved paths and identities | two **zones**, possibly two brains |
| A fact would be equally at home in either | one brain |
| Another brain already owns some of it | one brain, **referencing** the other (never copying) |

When unsure, start with one brain and more zones. Splitting later is cheap — moving a fact
keeps its ID. Merging two brains that grew apart is not.
