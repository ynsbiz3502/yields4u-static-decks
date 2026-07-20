// roth-engine.mjs — the Roth conversion / RMD / IRMAA tax engine.
// THE single authored source. Consumed two ways:
//   1. Inlined (exports stripped) into deck HTML between ROTH-ENGINE markers by build.mjs.
//   2. Vendored verbatim to functions/_shared/roth-engine.ts for Supabase edge functions.
// Extracted 2026-07-20 from roth-conversion-challenger-v3.html with zero behavior change —
// verified by engine/test-golden.mjs against fixtures/golden.json (49 cases, exact equality).
// Keep this file dependency-free ES2020: no DOM, no Node/Deno APIs.

export const ULT = {
  73:26.5, 74:25.5, 75:24.6, 76:23.7, 77:22.9, 78:22.0,
  79:21.1, 80:20.2, 81:19.4, 82:18.5, 83:17.7, 84:16.8,
  85:16.0, 86:15.2, 87:14.4, 88:13.7, 89:12.9, 90:12.2,
  91:11.5, 92:10.8, 93:10.1, 94: 9.5, 95: 8.9
};

// 2026 federal brackets (approx). Thresholds for taxable income.
export const BRACKETS_MFJ = [
  [23850,    0.10],
  [96950,    0.12],
  [206700,   0.22],
  [394600,   0.24],
  [501050,   0.32],
  [751600,   0.35],
  [Infinity, 0.37]
];
export const BRACKETS_SINGLE = [
  [11925,    0.10],
  [48475,    0.12],
  [103350,   0.22],
  [197300,   0.24],
  [250525,   0.32],
  [626350,   0.35],
  [Infinity, 0.37]
];
export const STD_DED = { MFJ: 30000, Single: 15000 };

export function computeTax(income, status) {
  const taxable = Math.max(0, income - STD_DED[status]);
  const br = status === 'MFJ' ? BRACKETS_MFJ : BRACKETS_SINGLE;
  let tax = 0, prev = 0;
  for (const [max, rate] of br) {
    const slice = Math.min(taxable, max) - prev;
    if (slice > 0) tax += slice * rate;
    prev = max;
    if (taxable <= max) break;
  }
  return tax;
}

// Same as computeTax but scales the bracket thresholds + standard deduction by
// `inflFactor` so the per-year tax matches the IRS's annual CPI indexing.
export function computeTaxIndexed(income, status, inflFactor) {
  const f = inflFactor || 1;
  const taxable = Math.max(0, income - STD_DED[status] * f);
  const br = status === 'MFJ' ? BRACKETS_MFJ : BRACKETS_SINGLE;
  let tax = 0, prev = 0;
  for (const [max, rate] of br) {
    const ceiling = max === Infinity ? Infinity : max * f;
    const slice = Math.min(taxable, ceiling) - prev;
    if (slice > 0) tax += slice * rate;
    prev = ceiling;
    if (taxable <= ceiling) break;
  }
  return tax;
}

// Like computeTaxIndexed but adds ratePtShift (e.g. 0.10) to every bracket rate.
export function computeTaxIndexedShifted(income, status, inflFactor, ratePtShift) {
  const f = inflFactor || 1;
  const taxable = Math.max(0, income - STD_DED[status] * f);
  const br = status === 'MFJ' ? BRACKETS_MFJ : BRACKETS_SINGLE;
  let tax = 0, prev = 0;
  for (const [max, rate] of br) {
    const ceiling = max === Infinity ? Infinity : max * f;
    const slice = Math.min(taxable, ceiling) - prev;
    if (slice > 0) tax += slice * (rate + ratePtShift);
    prev = ceiling;
    if (taxable <= ceiling) break;
  }
  return Math.max(0, tax);
}

// ---- IRMAA: Medicare Part B + Part D income-related surcharge (illustrative, 2025 schedule) ----
// A real retirement cost the model previously ignored. Once on Medicare (age 65+), MAGI above
// the tiers below adds an annual premium surcharge PER beneficiary. Doing-nothing RMDs push MAGI
// into these tiers for life; converting front-loads MAGI for the runway years, then drops below
// them — so IRMAA is both a do-nothing cost and a convert-path saving. MAGI basis = the model's
// taxableInc (IRA draw + 85% of SS + other) ~ AGI. Thresholds and surcharge $ are indexed to
// inflation (inflFactor), matching the federal-bracket treatment.
export const IRMAA_START_AGE = 65;
export const IRMAA_TIERS_MFJ    = [212000, 266000, 334000, 400000, 750000];
export const IRMAA_TIERS_SINGLE = [106000, 133000, 167000, 200000, 500000];
export const IRMAA_SURCHARGE    = [1050, 2640, 4230, 5830, 6360]; // per beneficiary / yr (Part B + Part D), tiers 1..5
export function irmaaAnnual(magi, status, inflFactor, age) {
  if (!age || age < IRMAA_START_AGE) return 0;
  const f = inflFactor || 1;
  const tiers = status === 'MFJ' ? IRMAA_TIERS_MFJ : IRMAA_TIERS_SINGLE;
  let perPerson = 0;
  for (let i = 0; i < tiers.length; i++) { if (magi > tiers[i] * f) perPerson = IRMAA_SURCHARGE[i] * f; }
  const beneficiaries = status === 'MFJ' ? 2 : 1; // both spouses on Medicare under MFJ
  return perPerson * beneficiaries;
}

// SECURE 2.0 RMD start age, derived from birth year (current year - age):
// born 1951-1959 → 73; born 1960 or later → 75. Earlier cohorts began at 72
// and are already past their start age either way, so 73 is safe for them.
export function rmdStartAge(currentAge) {
  const birthYear = new Date().getFullYear() - currentAge;
  return birthYear >= 1960 ? 75 : 73;
}

// Assumed age at death — the end of the lifetime projection horizon. Driven by the
// Advanced "Age of death" field (default 95). Once a client is past 90 the default
// becomes current age + 10 so the horizon always stays ahead of them. Always > current age.
export function deathAge(inputs) {
  const ca = inputs.currentAge || 63;
  const d = inputs.ageOfDeath;
  if (Number.isFinite(d) && d > ca) return d;
  return ca > 90 ? ca + 10 : 95;
}
// Estate / widow "life-expectancy planning target" — historically a fixed age 85. Held
// at 85 for typical clients; for older clients it slides to just past current age (never
// beyond death) so the referenced projection year still exists in the simulation.
export function lifeExpAge(inputs) {
  return Math.min(deathAge(inputs), Math.max(85, (inputs.currentAge || 63) + 1));
}

export function simulate(inputs) {
  const { balance, currentAge, growthRate, otherIncome, filingStatus } = inputs;
  const annualWithdrawal = inputs.annualWithdrawal || 0;
  const totalIncomeNeeds = inputs.totalIncomeNeeds || 0;
  const socialSecurity = inputs.socialSecurity || 0;
  const inflationRate = (inputs.inflationRate != null) ? inputs.inflationRate : 0.04;
  const rmdStart = rmdStartAge(currentAge), endAge = deathAge(inputs);

  let bal = balance;
  const yearly = [];          // full per-year breakdown (currentAge .. endAge)
  const rows = [];            // backward-compat: RMD years only (73..endAge)
  let lifetimeRMD = 0, lifetimeTax = 0, peakRMD = 0;
  // Sums for the slide-9 summary cards. Both are nominal (full inflated dollars)
  // so the headline figures look like the actual lifetime totals the prospect
  // would see, not the deflated chart numbers.
  let lifetimeTaxableInc = 0;
  let lifetimeFederalTax = 0;
  let lifetimeIRMAA = 0;
  const baselineTax = computeTax(otherIncome, filingStatus);
  const brackets = filingStatus === 'MFJ' ? BRACKETS_MFJ : BRACKETS_SINGLE;
  const stdDed = STD_DED[filingStatus];

  for (let age = currentAge; age <= endAge; age++) {
    const yearsFromStart = age - currentAge;
    const inflFactor = Math.pow(1 + inflationRate, yearsFromStart);
    const ssYear = socialSecurity * inflFactor;
    const needsYear = totalIncomeNeeds * inflFactor;
    const explicitDraw = annualWithdrawal * inflFactor;

    // Gap = total spending needs - SS. Whatever the gap, that's what the IRA needs to fill.
    const gap = Math.max(0, needsYear - ssYear);
    // Pre-RMD ages: target draw = max(explicit override, computed gap).
    // RMD-age years: actual draw is at least the RMD, bumped up to target if higher.
    const rmd = age >= rmdStart ? (bal / (ULT[age] || 8.9)) : 0;
    const targetDraw = Math.max(explicitDraw, gap);
    const irargrossDraw = Math.max(rmd, targetDraw);
    // Two-bucket framing used by the slide-8 stacked chart:
    //   savingsDraw = the household's lifestyle need from the IRA (capped at total draw)
    //   rmdForced   = the slice of the IRS-forced RMD that exceeds that need
    // Sum of the two = irargrossDraw (the actual $ leaving the IRA each year). This
    // way the blue (savings) bar stays visible every year, even once RMDs cover the
    // whole need, instead of vanishing the moment RMD >= gap.
    const savingsDraw = Math.min(Math.max(0, gap), irargrossDraw);
    const rmdForced = Math.max(0, irargrossDraw - savingsDraw);

    // Taxable income: all IRA draw is taxable, 85% of SS is taxable (simplification), plus otherIncome.
    const taxableInc = irargrossDraw + 0.85 * ssYear + otherIncome;
    const totalTax = computeTax(taxableInc, filingStatus);
    // Bracket thresholds and the standard deduction are indexed to inflation
    // each year (the IRS does this in real life via CPI). Without this, the
    // slide-9 trajectory dramatically overstates bracket creep — income grows
    // with inflation but the brackets stay frozen at today's dollars.
    const yearStdDed = stdDed * inflFactor;
    const taxableAfterStd = Math.max(0, taxableInc - yearStdDed);
    let bracketPct = 0.10;
    for (const [maxT, rate] of brackets) {
      const yearMaxT = maxT === Infinity ? Infinity : maxT * inflFactor;
      bracketPct = rate;
      if (taxableAfterStd <= yearMaxT) break;
    }

    yearly.push({
      age, rmd, rmdForced, ssIncome: ssYear, needsIncome: needsYear,
      savingsDraw, irargrossDraw, taxableInc, bracketPct, inflFactor,
      balance: bal,
    });

    // Accumulate lifetime totals (nominal $) for the summary cards.
    lifetimeTaxableInc += taxableInc;
    lifetimeFederalTax += computeTaxIndexed(taxableInc, filingStatus, inflFactor);
    lifetimeIRMAA += irmaaAnnual(taxableInc, filingStatus, inflFactor, age);

    if (age >= rmdStart) {
      const pct = (rmd / bal) * 100;
      const rmdTax = Math.max(0, totalTax - baselineTax);
      rows.push({ age, rmd, pct, balance: bal, rmdTax });
      lifetimeRMD += rmd;
      lifetimeTax += rmdTax;
      peakRMD = Math.max(peakRMD, rmd);
    }

    bal = Math.max(0, bal - irargrossDraw) * (1 + growthRate);
  }
  return {
    rows, yearly, lifetimeRMD, lifetimeTax, peakRMD,
    lifetimeTaxableInc, lifetimeFederalTax, lifetimeIRMAA,
    finalBalance: bal,
  };
}

// Convert-to-Roth path for ONE conversion pace, simulated year by year. `magiCapReal` is the
// MAGI ceiling (today's $) the plan converts up to each year; Infinity reproduces the original
// "even-deplete the IRA across the pre-RMD runway" schedule. The plan always funds the spending
// gap and any RMD first, then converts the remaining room (up to the cap) to Roth — so a finite
// cap holds income under a chosen IRMAA tier. Once the Traditional is empty the gap is met from
// the Roth tax-free (only Social Security stays taxable). Mirrors simulate()'s inflation /
// 85%-of-SS / RMD conventions. ratePtShift prices the path under higher future rates.
export function _convertPath(inputs, ratePtShift, magiCapReal) {
  const shift = ratePtShift || 0;
  const { balance, currentAge, growthRate, filingStatus } = inputs;
  const needs = inputs.totalIncomeNeeds || 0;
  const ss = inputs.socialSecurity || 0;
  const other = inputs.otherIncome || 0;
  const inflationRate = (inputs.inflationRate != null) ? inputs.inflationRate : 0.04;
  const rmdStart = rmdStartAge(currentAge), endAge = deathAge(inputs);
  const evenDeplete = !(magiCapReal > 0 && magiCapReal !== Infinity);
  let trad = balance, roth = 0, lifetimeTax = 0, lifetimeIRMAA = 0, doneAge = null;
  for (let age = currentAge; age <= endAge; age++) {
    const inflFactor = Math.pow(1 + inflationRate, age - currentAge);
    const ssYear = ss * inflFactor;
    const gap = Math.max(0, needs * inflFactor - ssYear);
    let taxableInc;
    if (trad > 0) {
      const rmd = age >= rmdStart ? (trad / (ULT[age] || 8.9)) : 0;
      let convert;
      if (evenDeplete) {
        // Original schedule: even-deplete across the pre-RMD runway; residual years draw the RMD.
        if (age < rmdStart) { const yearsLeft = rmdStart - age; convert = Math.min(Math.max(gap, trad / yearsLeft), trad); }
        else { convert = Math.min(Math.max(rmd, gap), trad); }
      } else {
        // IRMAA-aware: convert up to the MAGI ceiling (after SS + other), never below RMD/gap.
        const room = Math.max(0, magiCapReal * inflFactor - 0.85 * ssYear - other);
        convert = Math.min(Math.max(rmd, gap, room), trad);
      }
      taxableInc = convert + 0.85 * ssYear + other;
      const toRoth = Math.max(0, convert - gap); // gap is spent; the rest funds the Roth
      trad = Math.max(0, trad - convert) * (1 + growthRate);
      roth = (roth + toRoth) * (1 + growthRate);
      if (trad <= 0 && doneAge === null) doneAge = age;
    } else {
      // Fully converted: the gap is met from the Roth, tax-free. Only SS is taxable.
      taxableInc = 0.85 * ssYear + other;
      roth = Math.max(0, roth - gap) * (1 + growthRate);
    }
    lifetimeTax += computeTaxIndexedShifted(taxableInc, filingStatus, inflFactor, shift);
    lifetimeIRMAA += irmaaAnnual(taxableInc, filingStatus, inflFactor, age);
  }
  return { lifetimeTax, lifetimeIRMAA, finalRoth: roth, finalTrad: trad, magiCap: magiCapReal, doneAge };
}

// Candidate conversion paces: the original even-deplete schedule (Infinity) + a grid of MAGI
// ceilings spanning the IRMAA tiers (both filing statuses). The optimizer below picks the pace
// with the lowest lifetime cost = most savings. Cheap: each candidate is one ~33-year pass.
export const CONVERT_CAP_CANDIDATES = (() => {
  const caps = new Set([Infinity]);
  for (let c = 140000; c <= 820000; c += 20000) caps.add(c);
  [106000, 133000, 167000, 200000, 212000, 266000, 334000, 400000, 500000, 750000].forEach(c => caps.add(c));
  return [...caps];
})();

// Optimal convert path: search the candidate paces and return the one that MINIMISES lifetime
// cost (federal tax + Medicare IRMAA) at this rate shift — i.e. the schedule that saves the most.
// Single caller: lifetimeSavingsAtShift. Same return shape as the old simulateConvert (+ magiCap/doneAge).
export function simulateConvert(inputs, ratePtShift) {
  let best = null, bestTotal = Infinity;
  for (const cap of CONVERT_CAP_CANDIDATES) {
    const r = _convertPath(inputs, ratePtShift, cap);
    const total = r.lifetimeTax + (r.lifetimeIRMAA || 0);
    if (total < bestTotal) { best = r; bestTotal = total; }
  }
  return best;
}

// Lifetime federal tax SAVED by converting vs. doing nothing, under a bracket-point shift.
// shift = 0.20 means "every bracket +20pts" (12%→32%) — the actual meaning of a 20% rate
// rise, NOT a flat 1.2x bump on the savings. The do-nothing leg reuses the same per-year
// taxable income as the legislative-risk slide (sim.yearly), so the payoff/choice slides
// and the rate-sensitivity toggle all stay consistent with that slide.
export function lifetimeSavingsAtShift(inputs, sim, ratePtShift) {
  const shift = ratePtShift || 0;
  const status = inputs.filingStatus;
  const doNothing = (sim.yearly || []).reduce(
    (s, y) => s + computeTaxIndexedShifted(y.taxableInc, status, y.inflFactor || 1, shift), 0);
  // IRMAA (Medicare surcharge) is a real do-nothing cost and a real convert-path saving, so
  // include it on BOTH legs — the headline savings then reflects the net Medicare impact too.
  const doNothingIRMAA = (sim.yearly || []).reduce(
    (s, y) => s + irmaaAnnual(y.taxableInc, status, y.inflFactor || 1, y.age), 0);
  const cv = simulateConvert(inputs, shift);
  const convert = cv.lifetimeTax + (cv.lifetimeIRMAA || 0);
  return Math.max(0, (doNothing + doNothingIRMAA) - convert);
}

export function computeHeirImpact(inputs, sim) {
  // 10-year rule. Heir inherits IRA, spreads withdrawals 10 years at peak-earning brackets.
  // Assume heir marginal blended ~35% effective (peak earning, MFJ, big lump on top of W-2).
  // Project the IRA balance to the assumed age at death (the Advanced "Age of death"
  // setting — default 95, or current age + 10 once past 90); the heir inherits at that point.
  const targetAge = deathAge(inputs);
  const years = Math.max(1, targetAge - (inputs.currentAge || 63));
  const currentYear = new Date().getFullYear();
  const yearOfPassing = currentYear + years;
  // Balance the heirs actually inherit = the traditional IRA still standing at the death age
  // in the do-nothing projection (after a lifetime of RMDs + income draws), NOT the IRA grown
  // untouched. The last yearly row is age === deathAge. Falls back to gross growth only if the
  // sim is unavailable.
  const _y = (sim && sim.yearly) || [];
  const balanceAtDeath = _y.length
    ? _y[_y.length - 1].balance
    : inputs.balance * Math.pow(1 + inputs.growthRate, years);
  const heirEffectiveRate = 0.37; // 10-yr forced drain lands at the top 37% bracket for peak-earning heirs
  const afterTaxPct = 1 - heirEffectiveRate;
  // Roth alternative: same balance, but heir withdrawals are 100% tax-free.
  return {
    before: balanceAtDeath,
    after: balanceAtDeath * afterTaxPct,
    lost: balanceAtDeath * heirEffectiveRate,
    rothInherit: balanceAtDeath, // tax-free if Roth
    heirRate: heirEffectiveRate,
    targetAge,
    yearOfPassing,
    years
  };
}
