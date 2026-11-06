#!/usr/bin/env node
// brain-doctor — the mechanical half of DOCTOR.
//
// Runs the checks a machine can settle exactly, so the model spends its attention on the ones
// that need judgement. Read-only by construction: it opens files and prints. It never writes,
// never fixes, never touches the brain's own records. Zero dependencies on purpose — no
// package.json, no npm install, no node_modules in a brain folder.
//
//   node brain-doctor.mjs <path-to-brain>     audit one brain
//   node brain-doctor.mjs --selfcheck [path]  audit the create-brain factory itself
//
// Exit 0 = nothing unsafe. Exit 1 = at least one UNSAFE NOW finding. Exit 2 = bad usage.
//
// It prints what it did NOT check. A tool that silently covers 60% of a checklist is worse
// than no tool, because the gap looks like a pass.

import { readFileSync, readdirSync, statSync, existsSync } from 'node:fs';
import { join, relative, sep } from 'node:path';

const VERSION = '1';
const ID = '[FERDCPQSU]';
const STALE_DAYS = 30;
const MAX_FACT_LINES = 300;
const MAX_INDEX_IDS = 150;

// ---------------------------------------------------------------- collect

const walk = (dir, out = []) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (e.name === 'node_modules' || e.name === '.git') continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
};

const findings = [];
const add = (sev, check, msg) => findings.push({ sev, check, msg });
const UNSAFE = 'UNSAFE NOW', ROT = 'ROTTING', INC = 'INCOMPLETE';

// ---------------------------------------------------------------- helpers

const today = new Date();
const isoRe = /^\d{4}-\d{2}-\d{2}$/;
const daysSince = (iso) => Math.floor((today - new Date(iso + 'T00:00:00Z')) / 86400000);

// An ID counts as DEFINED by a `### F-001` block, or by a table row — but **a table row only
// counts in a registry file**. `index.md` and `graph.md` are registries, where the row IS the
// record. Everywhere else `| F-004 |` is a reference inside an example (plan templates are full
// of them), and treating those as definitions reports every one as a duplicate. Learned by
// running this against a real brain and getting two false positives.
const REGISTRY = /(^|\/)(index|graph)\.md$/;
const defsIn = (text, relPath = '') => {
  const out = new Set();
  for (const m of text.matchAll(new RegExp(`^### (${ID}-\\d{3})\\b`, 'gm'))) out.add(m[1]);
  if (REGISTRY.test(relPath)) {
    for (const m of text.matchAll(new RegExp(`^\\|\\s*(${ID}-\\d{3})\\s*\\|`, 'gm'))) out.add(m[1]);
  }
  return out;
};

// Only the `## Files` and `## Scripts` sections of index.md list the brain's OWN files. A
// backticked `*.md` anywhere else is usually a file in the AREA being described — a real fact
// about the repo, not a broken link. Second false positive from the same real-brain run.
const ownFileRegions = (index) => {
  const out = [];
  for (const m of index.matchAll(/^##+\s+(Files|Scripts)\b([\s\S]*?)(?=^##\s|\Z)/gm)) out.push(m[2]);
  return out.join('\n');
};

// A reference is any bare ID. `other-brain:F-066` is a CROSS-BRAIN pointer, not a local ID —
// resolving it is that brain's job, so it must never be reported as dangling.
const refsIn = (text) => {
  const out = new Set();
  for (const m of text.matchAll(new RegExp(`(^|[^\\w:-])(${ID}-\\d{3})\\b`, 'gm'))) out.add(m[2]);
  return out;
};

const blocksIn = (text) => {
  const parts = text.split(/^### /m).slice(1);
  return parts.map((p) => {
    const id = (p.match(new RegExp(`^(${ID}-\\d{3})`)) || [])[1];
    return id ? { id, body: p } : null;
  }).filter(Boolean);
};

const field = (body, name) => {
  const m = body.match(new RegExp(`^- ${name}:\\s*(.*)$`, 'm'));
  return m ? m[1].trim() : null;
};

// ---------------------------------------------------------------- brain audit

function auditBrain(root) {
  if (!existsSync(root)) { console.error(`[ERROR] no such folder: ${root}`); process.exit(2); }
  const files = walk(root);
  const rel = (p) => relative(root, p).split(sep).join('/');
  const read = (p) => readFileSync(p, 'utf8');

  const indexPath = join(root, 'index.md');
  const hasIndex = existsSync(indexPath);
  if (!hasIndex) add(UNSAFE, 1, 'index.md is missing — every mode starts by reading it');
  const index = hasIndex ? read(indexPath) : '';

  // -- 1/2 index drift, both ways
  if (hasIndex) {
    for (const f of files) {
      const r = rel(f);
      if (r === 'index.md') continue;
      if (!index.includes(r) && !index.includes(r.split('/').pop())) {
        add(UNSAFE, 2, `${r} exists but is not listed in index.md — its facts are invisible`);
      }
    }
    for (const m of ownFileRegions(index).matchAll(/`([a-zA-Z0-9_./-]+\.md)`/g)) {
      const cand = m[1];
      if (cand.includes('<') || /^brain-/.test(cand)) continue;
      if (!files.some((f) => rel(f) === cand || rel(f).endsWith('/' + cand))) {
        add(UNSAFE, 1, `index.md lists ${cand}, which does not exist`);
      }
    }
  }

  // -- 5 duplicate IDs  +  3/4 index coverage of IDs
  const where = new Map();
  for (const f of files) for (const id of defsIn(read(f), rel(f))) {
    if (!where.has(id)) where.set(id, []);
    where.get(id).push(rel(f));
  }
  for (const [id, locs] of where) {
    const real = locs.filter((l) => l !== 'index.md');
    if (new Set(real).size > 1) {
      add(UNSAFE, 5, `${id} is defined in more than one place: ${[...new Set(real)].join(', ')}`);
    }
  }

  // -- 6 dangling links
  const defined = new Set(where.keys());
  for (const f of files) {
    for (const id of refsIn(read(f))) {
      if (!defined.has(id)) add(UNSAFE, 6, `${rel(f)} references ${id}, which is defined nowhere`);
    }
  }

  // -- block-level checks
  let verified = 0, retired = 0, factCount = 0;
  const retiredIds = new Set();
  const areaRoot = (index.match(/^-\s*\*\*Area root:\*\*\s*(.+)$/m) || [])[1]?.trim()
    .replace(/[`]/g, '');

  for (const f of files) {
    const text = read(f);
    for (const { id, body } of blocksIn(text)) {
      const status = field(body, 'Status');
      if (status && /^retired/i.test(status)) { retired++; retiredIds.add(id); }

      if (id.startsWith('F-')) {
        factCount++;
        const badge = field(body, 'Badge') || '';
        const last = field(body, 'Last checked');
        const isOk = badge.includes('✅');
        if (isOk) verified++;

        // -- 12 date discipline (everything downstream needs it)
        if (last && !isoRe.test(last)) {
          add(ROT, 9, `${id} Last checked "${last}" is not YYYY-MM-DD — staleness cannot be computed`);
        } else if (isOk && last && !status && daysSince(last) > STALE_DAYS) {
          add(ROT, 9, `${id} is ✅ but last checked ${daysSince(last)} days ago — downgrade to ⚠️ (old)`);
        }

        // -- 10 guesses must name their parents
        if (/guess/i.test(badge) && !field(body, 'Built from')) {
          add(INC, 10, `${id} is ⚠️ (guess) with no "Built from:" — a wrong conclusion cannot be traced`);
        }

        // -- 30 dead proof: a path:line proof whose file is gone
        const cf = field(body, 'Command/File') || (body.match(/Command\/File:\s*`([^`]+)`/) || [])[1];
        if (isOk && !status && cf) {
          const raw = cf.replace(/`/g, '').trim();
          const looksPath = /^[.\w][\w./\\-]*\.[a-zA-Z]{1,5}(:\d+)?$/.test(raw);
          if (looksPath) {
            const bare = raw.split(':')[0];
            if (/^[A-Za-z]:[\\/]/.test(bare) || bare.startsWith('/')) {
              add(ROT, 30, `${id} proof uses an absolute path (${bare}) — it will not resolve on another machine`);
            } else if (areaRoot) {
              const abs = join(root, areaRoot, bare);
              if (!existsSync(abs)) {
                add(UNSAFE, 30, `${id} is ✅ but its proof file is gone: ${bare} — retire the fact`);
              }
            }
          }
        }
      }

      if (id.startsWith('E-')) {
        const facts = field(body, 'Facts');
        if (!facts || !/\w-\d{3}/.test(facts)) {
          add(INC, 7, `${id} is an entity with no facts — an orphan is a guess wearing a node's clothes`);
        }
      }
      if (id.startsWith('R-')) {
        const ev = field(body, 'Evidence');
        if (!ev || !/F-\d{3}/.test(ev)) {
          add(UNSAFE, 8, `${id} is an edge with no Evidence fact — "both ends exist" proves nothing`);
        }
      }
      if (id.startsWith('Q-')) {
        if (!/Probe/i.test(body)) add(INC, 11, `${id} has no probe — VERIFY cannot act on it`);
      }
    }
  }

  // -- 31 retired entity with live edges
  for (const f of files) {
    for (const { id, body } of blocksIn(read(f))) {
      if (!id.startsWith('R-')) continue;
      if (/^retired/i.test(field(body, 'Status') || '')) continue;
      for (const side of ['From', 'To']) {
        const t = (field(body, side) || '').match(/E-\d{3}/);
        if (t && retiredIds.has(t[0])) {
          add(UNSAFE, 31, `${id} is a live edge into retired entity ${t[0]} — the graph is lying about the present`);
        }
      }
    }
  }

  // -- 13 secrets. Match assigned VALUES, not the words. Three rounds of false positives taught
  //    this: the brain's own SKILL.md, doctor.md and secrets.example.md all legitimately contain
  //    "password" and "token" as prose, and a markdown table cell (`| secret: | token... |`)
  //    looks like an assignment. So: the brain's own structural docs are skipped, the value may
  //    not contain a pipe, and it must carry a digit — real credentials do, English prose rarely.
  const DOC_FILES = /(^|\/)(SKILL|doctor|README-TEAM|secrets\.example)\.md$/;
  for (const f of files) {
    if (DOC_FILES.test(rel(f))) continue;
    for (const m of read(f).matchAll(/(password|token|secret|api[_-]?key)\s*[:=]\s*`?([^\s`<>|]{16,})`?/gi)) {
      const val = m[2];
      if (/^[<(]|placeholder|example|your|nnn|xxx|\.\.\./i.test(val)) continue;
      if (!/\d/.test(val)) continue;
      add(UNSAFE, 13, `${rel(f)} may contain a real secret value (${m[1]}: ${val.slice(0, 6)}****)`);
    }
  }

  // -- 14 / 33 / 34 size and naming.
  //    Check 14 is about FACT files. SKILL.md, doctor.md and README-TEAM.md are long by design
  //    and must never be split — telling someone to split their laws file is noise that teaches
  //    them to ignore the report.
  const STRUCTURAL = /(^|\/)(SKILL|index|doctor|README-TEAM|changelog|upstream|conflicts|decisions|ontology|graph|journal|secrets\.example)\.md$/;
  for (const f of files) {
    const r = rel(f), n = read(f).split('\n').length;
    if (!STRUCTURAL.test(r) && n > MAX_FACT_LINES) {
      add(ROT, 14, `${r} is ${n} lines — split it BY MEANING (never -part2, never misc)`);
    }
    if (/(part\d|-\d+\.md$|misc|other|general)/i.test(r.split('/').pop())) {
      add(ROT, 33, `${r} is named by size or is a catch-all — nobody can guess what is in it, so it rots unread`);
    }
  }
  // -- 35 placeholder IDs written with digits. The ROOT CAUSE of several checks firing at once:
  //    a `# P-000` heading or an `| F-004 |` example row inside a template or example file looks
  //    exactly like a real record, so it surfaces later as a phantom duplicate or dangling link.
  //    Reporting the cause once beats reporting two symptoms.
  for (const f of files) {
    const r = rel(f);
    if (!/(^|\/)(TEMPLATE|.*\.example)\.md$/i.test(r)) continue;
    const hits = new Set();
    for (const m of read(f).matchAll(new RegExp(`(^#+\\s*|^\\|\\s*)(${ID}-\\d{3})\\b`, 'gm'))) hits.add(m[2]);
    for (const h of hits) {
      add(ROT, 35, `${r} uses a real-looking ID (${h}) in an example — write it as -nnn, or it reads as a record and trips the duplicate and dangling checks`);
    }
  }

  if (hasIndex) {
    const idRows = (index.match(new RegExp(`^\\|\\s*${ID}-\\d{3}\\s*\\|`, 'gm')) || []).length;
    if (idRows > MAX_INDEX_IDS) {
      add(ROT, 34, `index.md carries ${idRows} ID rows (> ${MAX_INDEX_IDS}) — tier it: keep the map and counts, move per-ID tables into the files they describe`);
    }
  }

  // -- 19 / 20 / 21 / 32 scaffold completeness
  const skillPath = join(root, 'SKILL.md');
  if (!existsSync(skillPath)) add(UNSAFE, 19, 'SKILL.md is missing');
  else {
    const s = read(skillPath);
    if (!/^---[\s\S]*?^name:\s*\S+/m.test(s)) add(UNSAFE, 19, 'SKILL.md frontmatter has no name: — the skill will never auto-load');
    if (!/^description:\s*\S+/m.test(s)) add(UNSAFE, 19, 'SKILL.md frontmatter has no description: — nothing will trigger it');
  }
  for (const f of files) {
    const c = (read(f).match(/<TODO:/g) || []).length;
    if (c) add(INC, 20, `${rel(f)} still has ${c} <TODO: marker${c > 1 ? 's' : ''}`);
  }
  if (hasIndex) {
    if (!/^##\s+Shape\b/m.test(index)) add(INC, 21, 'index.md has no ## Shape record — a deliberate omission cannot be told from a lost file');
    if (!/^##\s+Coverage\b/m.test(index)) add(INC, 32, 'index.md has no ## Coverage block — 18 facts and 180 facts look identical from outside');
    if (!areaRoot) add(INC, 30, 'the charter has no "Area root:" — check 30 (dead proof) cannot resolve relative proof paths');
  }
  if (!existsSync(join(root, 'doctor.md'))) {
    add(INC, 21, 'doctor.md is missing — this brain cannot audit itself without another skill');
  }

  // -- 26 node_modules
  const nm = [];
  (function scan(d) {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      if (!e.isDirectory()) continue;
      if (e.name === 'node_modules') { nm.push(rel(join(d, e.name))); continue; }
      if (e.name !== '.git') scan(join(d, e.name));
    }
  })(root);
  for (const p of nm) add(ROT, 26, `${p} is committed inside the brain — gitignore it and run npm install per machine`);

  return { files: files.length, facts: factCount, verified, retired };
}

// ---------------------------------------------------------------- factory selfcheck

function selfcheck(root) {
  const read = (p) => existsSync(p) ? readFileSync(p, 'utf8') : '';
  const T = join(root, 'templates'), R = join(root, 'reference');

  // A real-looking ID inside a TEMPLATE becomes a false duplicate in every brain built from it.
  for (const f of existsSync(T) ? readdirSync(T) : []) {
    for (const m of read(join(T, f)).matchAll(new RegExp(`^### (${ID}-\\d{3})`, 'gm'))) {
      add(UNSAFE, 'T1', `templates/${f} uses a real-looking ID (${m[1]}) — write it as -nnn or every brain self-reports a false duplicate`);
    }
  }

  // The brain's own checklist must not fall behind the factory's.
  const a = (read(join(R, 'doctor.md')).match(/^\|\s*\d+\s*\|/gm) || []).length;
  const b = (read(join(T, 'brain-doctor.md')).match(/^\|\s*\d+\s*\|/gm) || []).length;
  if (a !== b) add(UNSAFE, 'T2', `reference/doctor.md has ${a} checks but templates/brain-doctor.md has ${b} — a brain would audit itself against a stale list`);

  // Every template SCAFFOLD promises must exist.
  for (const m of read(join(root, 'SKILL.md')).matchAll(/`(brain-[a-zA-Z.-]+\.md)`/g)) {
    if (m[1] === 'brain-X.md') continue;
    if (!existsSync(join(T, m[1]))) add(UNSAFE, 'T3', `SKILL.md promises templates/${m[1]}, which does not exist`);
  }

  // Every reference file SKILL.md points at must exist.
  for (const m of read(join(root, 'SKILL.md')).matchAll(/`(reference\/[a-z-]+\.md)`/g)) {
    if (!existsSync(join(root, m[1]))) add(UNSAFE, 'T4', `SKILL.md points at ${m[1]}, which does not exist`);
  }

  // Counts stated in prose drift silently; catch the two that matter.
  const bs = read(join(T, 'brain-SKILL.md'));
  const modes = (bs.match(/^## Mode \d+/gm) || []).length;
  const stated = (bs.match(/You have (\d+) jobs/) || [])[1];
  if (stated && Number(stated) !== modes) add(UNSAFE, 'T5', `brain-SKILL.md says ${stated} jobs but defines ${modes} Mode sections`);
  const laws = (bs.match(/^\d+\. \*\*/gm) || []).length;
  if (!/## The 12 laws/.test(bs)) add(UNSAFE, 'T6', 'brain-SKILL.md has no "## The 12 laws" heading');

  // Leaked environment details make the factory unshareable. A hardcoded list of one team's
  // names would be useless on anyone else's machine and would silently miss theirs, so detect
  // the SHAPES that are always environment-specific instead.
  const leaks = [
    [/\b[A-Za-z]:[\\/](?:Users|work|repos|dev)[\\/]\S+/, 'an absolute path'],
    [/(^|\s)\/(?:home|Users)\/[a-z][\w.-]*\//i, 'an absolute home path'],
    [/\b(?:\d{1,3}\.){3}\d{1,3}\b/, 'an IP address'],
    [/\b[\w.-]+\.(?:internal|corp|local|intranet)\b/i, 'an internal hostname'],
    [/\b[\w.+-]+@[\w-]+\.[a-z]{2,}\b/i, 'an email address'],
  ];
  for (const f of walk(root)) {
    const r = relative(root, f).split(sep).join('/');
    if (r === 'built.md') continue;              // built.md is this factory's own history
    const text = read(f);
    for (const [re, what] of leaks) {
      const m = text.match(re);
      if (m) add(ROT, 'T7', `${r} contains ${what} (${m[0].slice(0, 40)}) — the factory is meant to be generic and shareable`);
    }
  }

  return { modes, laws, checks: a };
}

// ---------------------------------------------------------------- report

const NOT_CHECKED = [
  '15 fact Keys match a type in ontology.md (needs the ontology read)',
  '16 journal entries drained (needs judgement on age)',
  '17 superseded decisions name a live replacement',
  '18 stuck plans (needs judgement on "a while")',
  '22 shape drift — does the Shape record still describe the folder',
  '23 charter satisfied — can the 3 questions actually be answered',
  '24 modes promised vs trimmed (needs the Shape record read)',
  '25 script contract — read-only allowlist, write flag, secret paths',
  '27 neighbour "How to consult" cells are complete',
  '28 README-TEAM.md still matches reality',
  '29 every U- describes a real event',
];

const args = process.argv.slice(2);
if (!args.length || args.includes('-h') || args.includes('--help')) {
  console.log(`brain-doctor v${VERSION}

  node brain-doctor.mjs <path-to-brain>     audit one brain
  node brain-doctor.mjs --selfcheck [path]  audit the create-brain factory

Read-only. Exit 1 if anything is UNSAFE NOW.`);
  process.exit(args.length ? 0 : 2);
}

const self = args[0] === '--selfcheck';
const target = (self ? args[1] : args[0]) || '.';
const stats = self ? selfcheck(target) : auditBrain(target);

console.log(`\nbrain-doctor v${VERSION}  —  ${self ? 'selfcheck' : 'brain'}: ${target}\n`);

let unsafe = 0;
for (const sev of [UNSAFE, ROT, INC]) {
  const rows = findings.filter((f) => f.sev === sev);
  if (!rows.length) continue;
  if (sev === UNSAFE) unsafe = rows.length;
  console.log(sev);
  for (const r of rows) console.log(`  [${String(r.check).padEnd(3)}] ${r.msg}`);
  console.log('');
}

if (!findings.length) console.log('No mechanical findings.\n');

if (!self) {
  console.log('NOT CHECKED HERE — these need judgement, do them from doctor.md:');
  for (const n of NOT_CHECKED) console.log(`  ${n}`);
  console.log('');
  console.log(`${stats.files} files, ${stats.facts} facts (${stats.verified} verified, ${stats.retired} retired)`);
} else {
  console.log(`${stats.modes} modes, ${stats.checks} checks in the checklist`);
}
console.log(`${findings.length} finding(s), ${unsafe} unsafe\n`);
process.exit(unsafe ? 1 : 0);
