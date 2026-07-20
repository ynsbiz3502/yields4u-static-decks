// Golden-master test: engine/roth-engine.mjs must reproduce fixtures/golden.json
// EXACTLY (===, no tolerance). golden.json was captured from the pre-extraction
// inline engine and cross-checked against the live GitHub Pages deck on 2026-07-20.
//
//   node engine/test-golden.mjs
//
// Note: heir.yearOfPassing and rmdStartAge depend on the current calendar year.
// yearOfPassing is checked as (currentYear + years) rather than against the stored
// value, so the suite stays green across year boundaries; everything else is exact.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { simulate, simulateConvert, lifetimeSavingsAtShift, computeHeirImpact } from './roth-engine.mjs';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const cases = JSON.parse(fs.readFileSync(path.join(HERE, 'fixtures/cases.json'), 'utf8'));
const golden = JSON.parse(fs.readFileSync(path.join(HERE, 'fixtures/golden.json'), 'utf8'));

const fnv = s => { let x = 0x811c9dc5; for (let i = 0; i < s.length; i++) { x ^= s.charCodeAt(i); x = Math.imul(x, 0x01000193) >>> 0; } return x.toString(16); };
const currentYear = new Date().getFullYear();

let checks = 0, failures = [];
const eq = (id, field, got, want) => {
  checks++;
  if (got !== want) failures.push(`${id} ${field}: got ${got}, want ${want}`);
};

for (const g of golden.cases) {
  const c = cases.find(x => x.id === g.id);
  if (!c) { failures.push(`${g.id}: case missing from cases.json`); continue; }
  const inputs = c.inputs;
  const sim = simulate(inputs);
  const cv0 = simulateConvert(inputs, 0);
  const heir = computeHeirImpact(inputs, sim);

  eq(g.id, 'savings0', lifetimeSavingsAtShift(inputs, sim, 0), g.savings0);
  eq(g.id, 'savingsP20', lifetimeSavingsAtShift(inputs, sim, 0.20), g.savingsP20);
  for (const k of ['before', 'after', 'lost', 'rothInherit', 'heirRate', 'targetAge', 'years'])
    eq(g.id, `heir.${k}`, heir[k], g.heir[k]);
  eq(g.id, 'heir.yearOfPassing', heir.yearOfPassing, currentYear + g.heir.years);
  for (const k of ['lifetimeRMD', 'lifetimeTax', 'peakRMD', 'lifetimeTaxableInc', 'lifetimeFederalTax', 'lifetimeIRMAA', 'finalBalance'])
    eq(g.id, `sim.${k}`, sim[k], g.sim[k]);
  eq(g.id, 'sim.rowsLen', sim.rows.length, g.sim.rowsLen);
  eq(g.id, 'sim.yearlyLen', sim.yearly.length, g.sim.yearlyLen);
  eq(g.id, 'sim.yearlyHash', fnv(JSON.stringify(sim.yearly)), g.sim.yearlyHash);
  eq(g.id, 'sim.rowsHash', fnv(JSON.stringify(sim.rows)), g.sim.rowsHash);
  for (const k of ['lifetimeTax', 'lifetimeIRMAA', 'finalRoth', 'finalTrad', 'doneAge'])
    eq(g.id, `cv0.${k}`, cv0[k], g.cv0[k]);
  eq(g.id, 'cv0.magiCap', String(cv0.magiCap), g.cv0.magiCap);
}

// Full per-year deep equality for the two debug cases.
for (const [id, wantYearly] of Object.entries(golden.fullYearly || {})) {
  const c = cases.find(x => x.id === id);
  const gotYearly = simulate(c.inputs).yearly;
  eq(id, 'fullYearly.length', gotYearly.length, wantYearly.length);
  for (let i = 0; i < Math.min(gotYearly.length, wantYearly.length); i++)
    for (const k of Object.keys(wantYearly[i]))
      eq(id, `fullYearly[${i}].${k}`, gotYearly[i][k], wantYearly[i][k]);
}

if (failures.length) {
  console.error(`GOLDEN MASTER FAILED — ${failures.length} of ${checks} checks:`);
  for (const f of failures.slice(0, 40)) console.error('  ' + f);
  process.exit(1);
}
console.log(`golden master: ${checks} checks across ${golden.cases.length} cases — all exact`);
