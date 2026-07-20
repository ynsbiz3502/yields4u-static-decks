// build.mjs — single source of truth for the Roth tax engine.
//
// Reads engine/roth-engine.mjs and:
//   1. Inlines it (with `export ` prefixes stripped) into each deck HTML listed in
//      TARGETS, replacing whatever sits between the ROTH-ENGINE markers.
//   2. Vendors the module verbatim to ../functions/_shared/roth-engine.ts for
//      Supabase edge functions (generated file — never hand-edit).
//
//   node build.mjs           # regenerate
//   node build.mjs --check   # exit 1 if any generated artifact is stale (pre-commit)
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const CHECK = process.argv.includes('--check');

const TARGETS = ['roth-conversion-challenger-v3.html'];
const BEGIN = '/* === ROTH-ENGINE:BEGIN — generated from engine/roth-engine.mjs by build.mjs; do not edit between markers === */';
const END = '/* === ROTH-ENGINE:END === */';

const module_ = fs.readFileSync(path.join(HERE, 'engine/roth-engine.mjs'), 'utf8');

// Strip the module header comment (everything up to the first export) and the
// `export ` prefixes — yielding the exact classic-script text the deck runs.
const firstExport = module_.indexOf('export ');
if (firstExport < 0) throw new Error('no exports found in engine/roth-engine.mjs');
const inline = module_.slice(firstExport).replace(/^export (?=(const|function|let) )/gm, '').trimEnd();
const block = BEGIN + '\n' + inline + '\n' + END;

let stale = 0;
for (const target of TARGETS) {
  const file = path.join(HERE, target);
  const html = fs.readFileSync(file, 'utf8');
  const b = html.indexOf(BEGIN), e = html.indexOf(END);
  if (b < 0 || e < 0) throw new Error(`${target}: ROTH-ENGINE markers not found`);
  const next = html.slice(0, b) + block + html.slice(e + END.length);
  if (next !== html) {
    stale++;
    if (!CHECK) { fs.writeFileSync(file, next); console.log(`${target}: engine block regenerated`); }
    else console.error(`${target}: engine block is STALE`);
  } else if (!CHECK) console.log(`${target}: up to date`);
}

// Vendored Deno copy — module text verbatim under a generated-file header.
const tsPath = path.join(HERE, '../functions/_shared/roth-engine.ts');
const tsHeader = `// GENERATED FILE — do not edit. Source: static-decks/engine/roth-engine.mjs
// Regenerate with:  node static-decks/build.mjs
`;
const ts = tsHeader + module_;
const tsCurrent = fs.existsSync(tsPath) ? fs.readFileSync(tsPath, 'utf8') : null;
if (ts !== tsCurrent) {
  stale++;
  if (!CHECK) { fs.mkdirSync(path.dirname(tsPath), { recursive: true }); fs.writeFileSync(tsPath, ts); console.log('functions/_shared/roth-engine.ts: regenerated'); }
  else console.error('functions/_shared/roth-engine.ts: STALE');
} else if (!CHECK) console.log('functions/_shared/roth-engine.ts: up to date');

if (CHECK) {
  if (stale) { console.error(`build --check: ${stale} stale artifact(s). Run: node build.mjs`); process.exit(1); }
  console.log('build --check: all generated artifacts up to date');
}
