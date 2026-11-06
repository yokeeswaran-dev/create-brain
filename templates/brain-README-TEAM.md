# <BRAIN-NAME> — team setup

> **Scaffold this file only when the Shape record says yes** — 2+ people, or setup is more than
> two steps, or the brain lives on shared storage. A solo local brain does not need it.
>
> Written for **the teammate, not for Claude.** Plain English, no jargon from the brain's own
> vocabulary, every command copy-pasteable. Assume they have never heard of a "brain skill".
> Delete every section marked *(shared storage only)* / *(git only)* that does not apply.

This folder is <TODO: the team's shared memory of X>. It holds <TODO: N> recorded facts about
<TODO: the main things>.

It is a **Claude Code skill.** Once set up, you ask Claude questions in plain English
(<TODO: "a real example question">) and it answers from these files, **with proof**. When you
discover something new, it records it here and everyone else sees it.

<TODO: *(shared storage only)* There is **one real copy**, in <where>. Your laptop points at it
with a link, so you are always reading and writing the same files as everyone else.>

---

## Before you start

| You need | Why |
|---|---|
| Claude Code installed | This is a Claude Code skill. |
| <TODO: Node.js / Python / nothing> | <TODO: only if the brain has scripts> |
| <TODO: access to the shared folder / repo> | <TODO: where the files live> |
| <TODO: credentials — which ones, and who to ask> | <TODO: only if the brain has secrets> |

---

## One-time setup (about <TODO: N> minutes)

### Step 1 — Back up anything you already have

Skip this if `<TODO: path>` does not exist yet.

```
<TODO: the move/backup command>
```

### Step 2 — Get the files

<TODO: pick one and delete the other.>

**(git only)**
```bash
# the brain is version-controlled with the project
git pull
# it is already at .claude/skills/<BRAIN-NAME>/ — nothing else to do
```

**(shared storage only)**
```cmd
mklink /J "%USERPROFILE%\.claude\skills\<BRAIN-NAME>" "<TODO: the local synced path>"
```
<TODO: Explain what the link is and that admin rights are not needed for `/J`. If the path has
spaces, say the quotes matter. Show the success line they should see.>

> <TODO: *(shared storage only)* The sync client has to download the folder before this works.
> Right-click it → **"Always keep on this device"**, or the files stay as cloud placeholders and
> the skill cannot read them offline.>

### Step 3 — Put your own secrets on your own machine *(only if this brain has secrets)*

Secrets are **not** in the shared folder, on purpose. Each person keeps their own copy:

```bash
mkdir -p ~/.claude/<BRAIN-NAME>-secrets
cp ~/.claude/skills/<BRAIN-NAME>/secrets.example.md ~/.claude/<BRAIN-NAME>-secrets/secrets.md
chmod 600 ~/.claude/<BRAIN-NAME>-secrets/secrets.md
```

Then fill in: <TODO: list each `S-` ID, what it is, and **who to ask for it**>.

<TODO: If a script parses this file, say so and say what the format must be exactly.>

### Step 4 — Check it works

```
<TODO: the one command that proves setup is correct>
```

You should see <TODO: the expected output>. If not, see Troubleshooting.

---

## Daily use

Just ask Claude. The skill loads itself whenever you mention <TODO: the trigger words from the
description>, or paste <TODO: the kind of output it captures>.

```
<TODO: three real questions a teammate would actually ask>
```

It answers in a fixed shape: **Answer**, **Proof** (fact IDs backed by real evidence),
**Unverified parts**, **Unknown**. If something is not recorded it says so and gives you the
command to find out — **it does not guess.**

<TODO: *(only if the brain has scripts)* To run a query yourself:>
```
<TODO: the invocation>
```
<TODO: State plainly that it is read-only by design and which verbs are refused.>

---

## Rules for the shared folder — please read *(shared storage only)*

There is one copy and several writers. Five rules:

1. **Never delete or rewrite a fact that is not yours.** If a fact is wrong, do not overwrite
   it. Move the old value into that fact's `History` line with today's date and the reason. The
   format is in `SKILL.md`.
2. **Never settle a disagreement by picking a side.** If your evidence contradicts a recorded
   fact, open a `C-` entry in `conflicts.md` with **both** proofs, and mark both facts
   `⚠️ UNVERIFIED (conflict C-nnn)`.
3. **Write your name and the date in `changelog.md`** for every change, so others know who to
   ask.
4. **Avoid two people editing at once.** Say so in the team chat before a big capture or a
   reorganise. Small additions to different files are fine in parallel; two people rewriting
   `index.md` at the same time is not.
5. **Check for conflict copies** now and then, and after any day when more than one person
   captured facts. <TODO: the command, if there is a helper script.>

Facts are **append-mostly**, which is what makes this workable: most updates add a new block or
a new proof line rather than changing existing text.

### What shared storage does and does not protect you from

<TODO: Adapt to the actual sync tool. The three things a teammate must know:>

- **Version history** — <TODO: whether the tool keeps it, and how to restore. "Nothing is
  permanently lost by one bad edit" is worth saying if true.>
- **Split edits are the real risk, not lost edits** — <TODO: most sync tools do not merge text.
  If two people edit one file, both are kept: the winner under the real name, the loser under a
  renamed copy, **with no warning**. The skill only reads the real name, so the other person's
  facts are silently absent. That is what rule 5 catches.>
- **Sync is fast, not instant** — <TODO: expected delay. If you are about to build on something
  a teammate just recorded, wait a moment and re-read.>

---

## Troubleshooting

<TODO: One entry per failure you actually hit during setup. Error message as the heading, cause
and fix underneath. These are worth more than everything above — write them as you hit them,
not from imagination.>

**`<the exact error text>`**
<TODO: what causes it and the fix.>

**Claude says "Not in <BRAIN-NAME> yet" for something you know is recorded**
<TODO: the likely causes in order — sync lag, a conflict copy, a stale link.>

---

## What is where

Read `index.md` first — it is the map, and it lists every file and every ID. `SKILL.md` holds
the rules Claude follows.

| Path | What is inside |
|---|---|
| `index.md` | The map. Every file, every ID, open conflicts. |
| `SKILL.md` | The rules: how it captures, answers, badges ✅ / ⚠️, and resolves conflicts. |
| <TODO: one row per file this brain actually has — match the Shape record, not the generic list> | |

<TODO: If the brain has an access rule that catches people out — a path that *looks* equivalent
but authenticates as a different identity and returns different answers — say it here, in bold,
with the date it bit someone. That is the single most useful paragraph in this file.>
