# Yields4U static decks

Static HTML decks served from GitHub Pages at
[ynsbiz3502.github.io/yields4u-static-decks](https://ynsbiz3502.github.io/yields4u-static-decks).
The Yields4U dashboard generates per-prospect deck URLs with query-string
parameters (e.g. `?balance=1500000&firstName=Robert&auto=1`) and the decks
render entirely client-side.

| File | Purpose |
|---|---|
| `roth-conversion-timing.html` | Roth conversion timing deck. |
| `tax-loss-harvesting.html` | Tax-loss harvesting deck. |
| `index.html` | Landing page. |
| `data/spx-monthly.json` | 24 months of S&P 500 monthly closes. Read by slide 16 of the Roth deck. |
| `scripts/update-spx.mjs` | Node script that refreshes `data/spx-monthly.json` from Stooq. |
| `.github/workflows/update-spx.yml` | Monthly GitHub Action that runs the update script and commits any change. |

## Automatic S&P 500 data refresh (slide 16)

Slide 16 of the Roth deck shows the S&P 500's trajectory across the last
~24 months with drawdown periods shaded red. The data behind that chart
lives in `data/spx-monthly.json` and is refreshed automatically:

1. **Schedule:** `.github/workflows/update-spx.yml` runs at **12:00 UTC on
   the 1st of every month**. The cron expression is `0 12 1 * *`.
2. **Source:** the script GETs Stooq's monthly close CSV for `^SPX`:
   `https://stooq.com/q/d/l/?s=%5Espx&i=m`. No API key required.
3. **Output:** the last 24 *completed* months land in
   `data/spx-monthly.json`. The in-progress month is dropped so the chart
   never shows a partial close.
4. **Commit:** if the file changed, the workflow commits with the message
   `Update S&P 500 monthly data (YYYY-MM-DD)` and pushes. GitHub Pages
   redeploys within a minute.
5. **Fallback:** the HTML inlines the most recent series as a defensive
   default. If the fetch ever fails, the chart still renders with whatever
   was inlined at deploy time — it just won't be current.

### Manual trigger

Go to **Actions → Update S&P 500 monthly data → Run workflow** in GitHub
to refresh on demand (e.g. right after a slide-16 design change).

### Manual edit

Hand-editing `data/spx-monthly.json` is fine — change the series, commit,
push. The next scheduled run will overwrite with Stooq data.

### What does NOT auto-update

The two **year-panel cards** at the top of slide 16 (year label,
`+23%` / `+14%` index return, "A Green Year" subtitle, `340 / 160`
constituent split) are still hardcoded in `roth-conversion-timing.html`.
Stooq doesn't publish a per-year constituent up/down count, so those
need a manual edit once a year. Search the HTML for `data-slide="16"`
and update the two `<div class="...year...">` blocks.

## Running the script locally

```bash
cd static-decks
node scripts/update-spx.mjs
git diff data/spx-monthly.json
```

Node 18+ required (the script uses the built-in `fetch`).
