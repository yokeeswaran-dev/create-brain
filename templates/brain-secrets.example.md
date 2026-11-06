# <BRAIN-NAME> — secrets (TEMPLATE)

**This is the template. It holds no real values, and it is the only secrets file allowed in
this folder.**

Do not fill this file in. Copy it outside the brain folder first:

```bash
mkdir -p ~/.claude/<BRAIN-NAME>-secrets
cp secrets.example.md ~/.claude/<BRAIN-NAME>-secrets/secrets.md
chmod 600 ~/.claude/<BRAIN-NAME>-secrets/secrets.md
```

Then fill in the `Value:` lines **in your copy only**.

**Why outside the folder:** a brain folder gets shared — committed to a repo, copied to a
teammate, pasted into a chat. A secret inside it leaks the moment that happens. Keeping values
out means the brain can be shared freely and still reference what it needs by `S-` ID.

Other files in this brain reference `S-` IDs and never values. Answers mask values
(`abcd****`) unless the person asks to see one.

## Format

```
### S-nnn: <what it is>
- Zone: <zone>
- Type: token | password | username | key | connection string | config file
- Value: `<paste your own>`
- Used for: <what needs it, with F- IDs>
- Where it comes from: <the exact command or place to get a fresh one>
- Expires: <date or unknown>
- Captured: <date>
```

**`Where it comes from` is the most important line.** Tokens expire; a stale value with no
refresh instruction is worse than no entry, because it looks usable.

If an entry is personal — each teammate has their own username and password — say so on the
entry. Never answer with, or copy, another person's personal secret.

## Secrets

_(none yet)_
