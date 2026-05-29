// Fetches S&P 500 (GSPC.INDX) constituents from EOD Historical Data, plus
// bulk year-end closes for each constituent, and writes per-year
// positive/negative counts + the index return to data/spx-constituents.json.
//
// Requires EODHD_API_KEY in env. In CI: the GitHub Actions secret of the
// same name. Locally:
//
//   EODHD_API_KEY=your_key node scripts/update-constituents.mjs
//
// The deck's slide 16 reads the resulting JSON to populate the three
// year-panel cards (return %, constituent split, subtitle).

import fs from 'node:fs/promises';
import path from 'node:path';

const EODHD_BASE = 'https://eodhd.com/api';
const INDEX_TICKER = 'GSPC.INDX';
const OUT_PATH = path.join('data', 'spx-constituents.json');
const UA = 'roth-deck-spx-updater/1.0 (+https://github.com/ynsbiz3502/yields4u-static-decks)';

function getApiKey() {
  const key = process.env.EODHD_API_KEY;
  if (!key) throw new Error(
    'EODHD_API_KEY is not set. In CI it comes from the GitHub Actions secret\n' +
    'of the same name. Locally:\n' +
    '  EODHD_API_KEY=your_key node scripts/update-constituents.mjs'
  );
  return key;
}

async function fetchJsonAuthed(urlNoToken, apiKey, label) {
  const sep = urlNoToken.includes('?') ? '&' : '?';
  const full = `${urlNoToken}${sep}api_token=${apiKey}&fmt=json`;
  const res = await fetch(full, { headers: { 'User-Agent': UA } });
  if (!res.ok) throw new Error(`${label}: HTTP ${res.status}`);
  return await res.json();
}

async function fetchComponents(apiKey) {
  console.log(`Fetching constituents for ${INDEX_TICKER}`);
  const j = await fetchJsonAuthed(`${EODHD_BASE}/fundamentals/${INDEX_TICKER}`, apiKey, 'Fundamentals');
  // Components live under j.Components for index funds; some payloads put them
  // under j.General.Components instead.
  const comps = (j && j.Components) || (j && j.General && j.General.Components) || {};
  const tickers = Object.values(comps)
    .map(c => (c && c.Code ? String(c.Code).toUpperCase() : ''))
    .filter(Boolean);
  return Array.from(new Set(tickers));
}

async function fetchBulkOnDate(apiKey, date) {
  const url = `${EODHD_BASE}/eod-bulk-last-day/US?date=${date}`;
  const j = await fetchJsonAuthed(url, apiKey, `Bulk(${date})`);
  return Array.isArray(j) ? j : [];
}

async function fetchBulkLatest(apiKey) {
  const url = `${EODHD_BASE}/eod-bulk-last-day/US`;
  const j = await fetchJsonAuthed(url, apiKey, 'Bulk(latest)');
  return Array.isArray(j) ? j : [];
}

async function fetchIndexCloseOn(apiKey, ticker, date) {
  const url = `${EODHD_BASE}/eod/${ticker}?from=${date}&to=${date}&period=d`;
  const j = await fetchJsonAuthed(url, apiKey, `IndexClose(${ticker}@${date})`);
  if (Array.isArray(j) && j.length > 0) {
    const row = j[0];
    if (typeof row.adjusted_close === 'number' && Number.isFinite(row.adjusted_close)) return row.adjusted_close;
    if (typeof row.close === 'number' && Number.isFinite(row.close)) return row.close;
  }
  return null;
}

// Find the latest weekday on or before Dec 31 of `year` that returns a
// useful bulk payload. Some weekday Dec dates are market holidays — keep
// stepping back until we hit a real trading day.
async function fetchYearEndBulk(apiKey, year) {
  for (let d = 31; d >= 20; d--) {
    const date = `${year}-12-${String(d).padStart(2, '0')}`;
    try {
      const bulk = await fetchBulkOnDate(apiKey, date);
      if (bulk.length > 100) {
        console.log(`Year-end ${year}: ${bulk.length} rows on ${date}`);
        return { date, bulk };
      }
    } catch (_) { /* try next */ }
  }
  throw new Error(`Could not get year-end bulk for ${year}`);
}

function indexBulkByCode(bulk) {
  const map = new Map();
  for (const r of bulk) {
    if (!r || typeof r.code !== 'string') continue;
    const code = r.code.toUpperCase();
    const adj = (typeof r.adjusted_close === 'number' && Number.isFinite(r.adjusted_close))
      ? r.adjusted_close
      : (typeof r.close === 'number' && Number.isFinite(r.close) ? r.close : null);
    if (adj != null && adj > 0) map.set(code, adj);
  }
  return map;
}

function countPosNeg(tickers, startMap, endMap) {
  let positive = 0, negative = 0, missing = 0;
  for (const t of tickers) {
    const s = startMap.get(t);
    const e = endMap.get(t);
    if (s == null || e == null) { missing++; continue; }
    if (e > s) positive++;
    else negative++; // exactly-flat is rare; bucketed as negative
  }
  return { positive, negative, missing };
}

function roundedPct(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number' || !b) return null;
  return Math.round(((a / b) - 1) * 1000) / 10; // 1 decimal
}

async function main() {
  const apiKey = getApiKey();
  const tickers = await fetchComponents(apiKey);
  console.log(`Got ${tickers.length} SP500 constituents`);
  if (tickers.length < 400) throw new Error(`Too few components: ${tickers.length}`);

  const currentYear = new Date().getUTCFullYear();
  const y0 = currentYear - 3; // reference year-end before y1
  const y1 = currentYear - 2;
  const y2 = currentYear - 1;

  // Bulk constituent closes at each year boundary + latest.
  const y0End = await fetchYearEndBulk(apiKey, y0);
  const y1End = await fetchYearEndBulk(apiKey, y1);
  const y2End = await fetchYearEndBulk(apiKey, y2);
  const latestBulk = await fetchBulkLatest(apiKey);
  const latestDate = (latestBulk[0] && latestBulk[0].date) || null;
  console.log(`Latest bulk date: ${latestDate}`);

  const m0 = indexBulkByCode(y0End.bulk);
  const m1 = indexBulkByCode(y1End.bulk);
  const m2 = indexBulkByCode(y2End.bulk);
  const mL = indexBulkByCode(latestBulk);

  // GSPC.INDX closes on each ref date for per-year index returns.
  const [idx0, idx1, idx2, idxL] = await Promise.all([
    fetchIndexCloseOn(apiKey, INDEX_TICKER, y0End.date),
    fetchIndexCloseOn(apiKey, INDEX_TICKER, y1End.date),
    fetchIndexCloseOn(apiKey, INDEX_TICKER, y2End.date),
    latestDate ? fetchIndexCloseOn(apiKey, INDEX_TICKER, latestDate) : Promise.resolve(null),
  ]);

  const out = {
    updated_at: new Date().toISOString(),
    source: `${EODHD_BASE}/fundamentals/${INDEX_TICKER} + eod-bulk-last-day/US`,
    total_constituents: tickers.length,
    years: [
      {
        label: String(y1),
        ytd: false,
        ref_start: y0End.date, ref_end: y1End.date,
        index_close_start: idx0, index_close_end: idx1,
        index_return_pct: roundedPct(idx1, idx0),
        ...countPosNeg(tickers, m0, m1),
      },
      {
        label: String(y2),
        ytd: false,
        ref_start: y1End.date, ref_end: y2End.date,
        index_close_start: idx1, index_close_end: idx2,
        index_return_pct: roundedPct(idx2, idx1),
        ...countPosNeg(tickers, m1, m2),
      },
      {
        label: String(currentYear),
        ytd: true,
        as_of: latestDate,
        ref_start: y2End.date,
        index_close_start: idx2, index_close_end: idxL,
        index_return_pct: roundedPct(idxL, idx2),
        ...countPosNeg(tickers, m2, mL),
      },
    ],
  };

  await fs.mkdir(path.dirname(OUT_PATH), { recursive: true });
  await fs.writeFile(OUT_PATH, JSON.stringify(out, null, 2) + '\n');
  console.log(`Wrote ${OUT_PATH}`);
  for (const y of out.years) {
    const label = y.ytd ? `${y.label} YTD` : y.label;
    const ret = y.index_return_pct != null ? `${y.index_return_pct >= 0 ? '+' : ''}${y.index_return_pct}%` : 'n/a';
    console.log(`  ${label}: ${y.positive} pos / ${y.negative} neg (${y.missing} missing) — index ${ret}`);
  }
}

main().catch(err => { console.error('update-constituents failed:', err); process.exit(1); });
