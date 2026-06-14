# Strategic Roth Conversion — Deck Reference & Advisor Script

The complete slide-by-slide lockdown for the **Roth Conversion (Challenger)** deck
(`roth-conversion-challenger-v2.html`). For every slide you get: the **on-screen text**
(verbatim), a short **description**, its **purpose** in the Challenger arc, and the
**talk track**. Read the talk track in your own voice; don't recite it.

The deck follows the Challenger structure — **teach → reframe → size the gap → make it
personal → show a new way → take control → make the offer → close** — so the close feels
inevitable, not pushed.

**How to use this**
- Every dollar figure auto-populates from the prospect's intake. Sample figures below
  assume **$1.5M pre-tax IRA, age 63, 7% growth, Married Filing Jointly, $70K income need,
  $40K Social Security**. When you see a number, read what's on the prospect's screen.
- **Pace:** ~70% of the call is Acts 1–3 (the problem and the strategy). The offer is the
  last ~20%. Don't rush to price.
- **Tension is the job.** Around the threats and the wedge slides, the prospect should get a
  little uncomfortable. Hold the line, warmly.
- **Compliance:** every number is *illustrative*, built from their inputs and today's law —
  say so. No guarantees. No "you'll save X." Use "could," "would otherwise," "based on your
  numbers." Route updated claims through compliance. See `[[deck-copy-compliance-language]]`.

**Deck mechanics & conditional slides**
- **48 slides** in the canonical render (MFJ; onboarding-fee toggle retired as of 2026-06-12 — `showFee` hardcoded false). Corner numbers auto-renumber to actual order at render time. All 48 slides verified above-the-fold at 1280×768 (commit `0af53cd`).
- **Filing status:** Slides 10–11 (the widow's-penalty pair) render **only for Married Filing
  Jointly**. Single filers don't see them (≈46 slides), and the Full Circle close (Slide 42)
  swaps its spouse payoff for a single-filer version.
- **Chart rendering (2026-06-14):** Slides 24 (hist-rates), 25 (debt-gdp), 27 (budget-pie), and 29 (legRiskSlide) were fixed for full-width layout. Root cause: `display:flex` on `.slide.active` caused `margin:auto` children to shrink to canvas default width. Fix: `width:100%` on direct slide children + `c.resize()` on navigation + `animation:false` on the pie chart.
- **Persona fork:** Slide 2 lets the prospect self-select **Protector** vs **Steward**. The pick
  pre-selects the matching tier on "Your Choice" (Slide 45) and selects the matching variant of
  the **Full Circle** close (Slide 42). Unset defaults to Steward so the close is always coherent.
  See `[[protector-steward-archetypes]]`.
- **Onboarding-fee toggle** — **RETIRED 2026-06-12.** `showFee` is hardcoded `false`; Slide 44b
  no longer renders and the refundable-90-day card on Slide 48 is gone. See `[[onboarding-fee-toggle]]`
  for historical context.
- **Two service tiers** drive the fee slides: Conversion Only 0.5% / White Glove 1.5%. See
  `[[yields4u-service-tiers]]`.

---

## ACT 1 — How Much? *(The threats: who are you really converting for?)*

### Slide 1 — Here's what we're working with · `data-slide="1"`
- **Kicker:** Before We Begin **Title:** Here's what we're working with, [Name]. **Subtitle:** Four numbers tell the whole story. Let's confirm we're looking at the right picture before we dive in.
- **On screen:** Four cards — Pre-Tax IRA Balance **$1.50M**; Current Age **63** (*12 years until RMDs begin at 75*); Expected Growth **7.0%**; Filing Status **Married Filing Jointly**; plus Total Income **$70K** needed/yr. Footer: "Everything you're about to see is built from these numbers."
- **Purpose:** Confirm the inputs and earn the right to everything after. Establishes that the whole deck is *their* math, live.
- **Talk track:** "Before we get into strategy, let's make sure I'm looking at the right picture: about *[$1.5M]* pre-tax, you're *[63]*, *[7%]* growth, filing *[jointly]*. Change one number and the math changes — I'll show you that too. Does this look right?"

### Slide 2 — Which one are you? · `data-slide="persona-fork"`
- **Kicker:** Which One Are You? **Title:** Almost everyone who calls me is really *one of two people.* **Subtitle:** It's almost never about the money itself — it's about what the money is *for.* After enough of these conversations, I can usually tell which one someone is before they say a word. Read both. One of them is you.
- **On screen:** Two selectable cards. **The Protector** — *"If something happens to me, I have to know my spouse is taken care of — that someone's in their corner as they age, and they never have to face this alone."* What the Protector wants: a team for the rest of your life — people who know your wishes, age in place with you, and step in for the one you leave behind. **The Steward** — *"I've paid taxes my whole life. I'm not about to let the IRS take 40% of what I built before a dollar of it reaches my kids."* What the Steward wants: a machine that gets every dollar to the people you chose instead of the government — and proves it, fast. Bottom banner: "So — which one is more you? Pick the one that fits, and keep the other in the back of your mind. Because by the end, the thing that surprises most people isn't the answer they came for. *It's what it does for the answer they didn't.*"
- **Purpose:** Open the persona loop (Challenger "tailor") and let the prospect self-identify. The pick pre-selects the matching tier on Slide 45 and the matching Full Circle variant (Slide 42); the closing line plants the cross-payoff that Slide 42 delivers. See `[[protector-steward-archetypes]]`.
- **Talk track:** "Almost everyone who calls me is really one of two people. The Protector — making sure their spouse is never left to face this alone. Or the Steward — refusing to let the IRS take the lion's share before it reaches the kids. Which is more you? Pick one — and keep the other in the back of your mind."

### Slide 3 — Deciding to convert? That's the easy part · `data-slide="2"`
- **Kicker:** Agenda **Title:** Deciding to convert? That's the easy part.
- **On screen:** Three questions — **1** How aggressively should you convert? **2** When should you convert? **3** The single number that makes or breaks your conversion. → **Personalized Action Plan**.
- **Purpose:** Set the agenda and reframe the problem from "whether" to "how / when / the 1040 number." Opens three curiosity loops the deck will close.
- **Talk track:** "Deciding *whether* to convert is the easy part. The hard part is three questions most people never get answered — how aggressively, when, and the one number on your return that makes or breaks it."

### Slide 4 — How big is the threat, really? · `data-slide="2-divider"`
- **Kicker:** What's At Stake **Title:** Before the strategy, how big is the threat — really?
- **On screen:** Section divider. "We can't talk about what to do until we know what we're dealing with. So first, let's put a hard number on it."
- **Purpose:** Transition from agenda into the problem. Signals "we quantify before we prescribe."
- **Talk track:** "Before any strategy — let's put a hard number on the threat."

### Slide 5 — At 75, your IRA stops being entirely yours · `data-slide="6"`
- **Kicker:** Why Roth Conversions? **Title:** Because at 75, your IRA stops being entirely yours. **Subtitle:** The reason this whole strategy exists is three letters: RMD — the Required Minimum Distribution. Here's what it does to your $1.50M nest egg.
- **On screen:** "What's an RMD?" explainer. Balance path: Today (63) **$1.5M** → Age 75 **$3.4M** → Age 95 (with RMDs) **$2.8M**. "Without RMDs it would've reached **$13.1M** — about **$10.2M** gets pulled out and taxed along the way."
- **Purpose:** Introduce the mechanism (RMDs) that creates the whole problem. The "$10.2M taxed" number sizes the stakes.
- **Talk track:** "This strategy exists because of three letters: R-M-D. At *[75]* the IRS makes you pull money out whether you need it or not — taxed as ordinary income."

### Slide 6 — So how big is the bite? · `data-slide="7"`
- **Kicker:** Threat 1 of 3 — Your IRA **Title:** So how big is the bite, really?
- **On screen:** **$301K** worst single-year forced withdrawal at the peak. "Starts small — ~1 dollar in 24 at age 75 — and rises every year to ~1 in 9 by 95." **Lifetime tax if you do nothing: $992K.** (RMD escalator chart.)
- **Purpose:** Threat 1 (to the prospect). Quantify the forced withdrawal and the lifetime tax of inaction.
- **Talk track:** "By your 80s the IRS is forcing out *[$301K]* a year — far more than you need to live on."

### Slide 7 — "Wouldn't we take that money out anyway?" · `data-slide="8"`
- **Kicker:** Devil's Advocate **Title:** "Wouldn't we take that money out anyway?" **Subtitle:** You need $70K/yr to live on, Social Security covers $40K — so yes, you'd draw from savings either way. Watch what happens at 75.
- **On screen:** "What you'd take anyway" (the gap between SS and real spending) vs "What the IRS forces on top" (withdrawals beyond need, on their schedule, at your worst rates).
- **Purpose:** Pre-empt the obvious objection. Separates *needed* income from *forced* excess — the real problem.
- **Talk track:** "You'd draw from savings either way. But watch what happens at 75, when the *forced* withdrawal blows past what you actually need."

### Slide 8 — Will all of this cost us more in taxes? · `data-slide="8-divider"`
- **Kicker:** The Only Question That Matters **Title:** Will all of this cost us more in taxes?
- **On screen:** Divider. "Because if RMDs don't actually raise the bill, Roth conversions aren't worth the trouble. Let's check."
- **Purpose:** Honest framing — concede that if it doesn't raise taxes, don't bother. Builds trust before the payoff.
- **Talk track:** "Here's the only question that matters: does any of this raise your tax bill? Let's check honestly."

### Slide 9 — Will our taxes be higher in the future? · `data-slide="9"`
- **Kicker:** Threat 1 — The Bracket Trajectory **Title:** Will our taxes be higher in the future than they are today? **Subtitle:** …your anticipated taxable income in retirement, broken down by bracket and adjusted for inflation (today's dollars).
- **On screen:** Bracket-trajectory chart. Total Income **$6.95M** (age 63–95); Total Taxes **$564K**; Effective Rate **8%**.
- **Purpose:** Show the prospect's *own* income climbing into higher brackets as RMDs stack on Social Security. Threat 1, visualized.
- **Talk track:** "As RMDs stack on Social Security, your income climbs into higher brackets later than you're in today. That's the first threat — and it's just to you. There are two more."

### Slide 10 — Same income. Same bills. Higher bracket. · `data-slide="11"` *(MFJ only)*
- **Kicker:** Threat 2 of 3 — Your Spouse **Title:** Same income. Same bills. Higher bracket. **Subtitle:** When one spouse passes, the survivor files single. Bracket thresholds get cut nearly in half — the same income lands in a higher rate.
- **On screen:** Joint vs Single bracket bars. Tax (Joint) **$10K** / 9% vs Tax (Single) **$18K** / 15% on the same $118K. **The Widow Penalty: $8K/yr · $75K over ~10 years.** "Worse than the chart shows — the smaller SS check stops the month one of you passes."
- **Purpose:** Threat 2 (the surviving spouse) — the "widow's penalty" almost nobody plans for.
- **Talk track:** "When one of you passes, the survivor files *single* — brackets nearly half as wide. Same income, same bills, higher bracket. I call it the widow's penalty."

### Slide 11 — Same chart. Bigger brackets. · `data-slide="12"` *(MFJ only)*
- **Kicker:** Threat 2 of 3 — Your Spouse **Title:** Same income. Same chart. Bigger brackets. **Subtitle:** This is your exact same projection — but filed single.
- **On screen:** Single-filer trajectory chart. Total Taxes (Single) **$976K** / 14% vs 8% joint. **Extra Tax vs Joint: $412K** (age 63–95). The Fix: **Roth** — converting now reduces the IRA balance and the RMDs that drive the penalty.
- **Purpose:** Quantify the lifetime widow's penalty ($412K) and name the fix. Hands off to the solution later.
- **Talk track:** "Your same projection, filed single. Nothing about your life changed — only your filing status did — and it costs *[$412K]*."

### Slide 12 — Your kids get 10 years to empty your IRA · `data-slide="10"`
- **Kicker:** Threat 3 of 3 — Your Kids **Title:** When you pass away, your kids get just 10 years to empty your IRA.
- **On screen:** **$2.5M** lost to the IRS of a projected **$6.6M** IRA at age 85. "Lands on top of the paycheck they're already earning." What your kids keep: **$4.2M** after a 37% cut.
- **Purpose:** Threat 3 (the heirs) — the SECURE Act 10-year rule at the kids' peak rates.
- **Talk track:** "Under the SECURE Act, your kids have 10 years to empty it — every dollar on top of *their* peak income. Most of *[their inheritance]* could go to the IRS in income tax."

### Slide 13 — This Isn't About You. It's About Them. · `data-slide="22"`
- **Kicker:** The Real Reason To Convert **Title:** This Isn't About You. It's About Them. **Subtitle:** The bigger number — usually by 2× — is what your heirs and surviving spouse pay if nothing changes.
- **On screen:** Do nothing: **$2.5M** lost to heirs' tax + **$75K** widow cliff. Plan now: **$6.6M** tax-free to kids + **$0 widow penalty**. "Why it works": a Roth has no lifetime RMDs, no income tax on distributions, no taxable lump-sum for heirs.
- **Purpose:** Act 1 emotional capstone and the central reframe — the "how much" question was never about you.
- **Talk track:** "You came in asking about *your* taxes. The bigger number is what your spouse and kids pay. The question was never about you — it's about them." *(Let it sit.)*

---

## THE REVEAL

### Slide 14 — So, should we do Roth conversions? · `data-slide="14"`
- **Kicker:** Let's Recap **Title:** So — should we do Roth conversions, [Name]?
- **On screen:** Four numbers — Forced Out Beyond Need **$2.7M**; Bracket Climbs **12% → 24%**; Lifetime Tax Doing Nothing **$992K**; Your Kids' Tax Bill **$2.5M**. "Whose tax bill are we optimizing — yours, your spouse's, or your kids'?"
- **Purpose:** Consolidate Act 1 into one screen and pose the real question that sets up the solution.
- **Talk track:** "Four numbers built from your IRA. Should we convert? Pretty clear. The real question nobody asks: *whose* bill are we optimizing?"

---

## ACT 2 — A New Way *(The three levers that decide how much you actually pay)*

### Slide 15 — Converting is the easy part · `data-slide="solution-intro"`
- **Kicker:** The Solution **Title:** Converting Is The Easy Part. Paying The Least In Taxes Is The Real Trick.
- **On screen:** Solution divider.
- **Purpose:** Pivot from problem to method. Sets up the three levers.
- **Talk track:** "Anyone can move money to a Roth — that's a button. Paying the least tax while you do it is the strategy. It comes down to three hidden levers."

### Slide 16 — The Three Hidden Levers · `data-slide="three-levers"`
- **Kicker:** The Solution **Title:** The Three Hidden Levers
- **On screen:** **1** The market. **2** Your tax return. **3** The tax code itself. → "Now — how we pull each one."
- **Purpose:** Name the three levers; promise to show how all three get pulled (most people pull none).
- **Talk track:** "Three things move what you actually pay: the market, your own tax return, and the tax code. Most people pull none of them."

### Slide 17 — Lever 1: The Market · `data-slide="buffett-dips"`
- **Kicker:** Lever 1 — The Market
- **On screen:** Buffett: "Be fearful when others are greedy, and greedy when others are fearful." Dip frequency: **5%** routine (~every 3.5 mo) · **10%** correction (~18 mo) · **20%** bear (~3.5 yrs).
- **Purpose:** Reframe market drops as a recurring *discount* for conversions.
- **Talk track:** "Every market drop is somebody else panicking. For a conversion, that fear is a discount — and the market hands you one constantly."

### Slide 18 — Even in up years, 30% of stocks finish red · `data-slide="16"`
- **Kicker:** The Raw Material **Title:** Even in up years, 30% of stocks finish in the red. **Subtitle:** So how do you turn that into money?
- **On screen:** "In +25% years, ~30% of S&P 500 stocks still finish negative — the raw material for tax-loss harvesting and the fuel for your conversion."
- **Purpose:** Establish that opportunity is *always* present, even in good years. Opens the "how" loop.
- **Talk track:** "Even in a good year, about a third of stocks finish down. Dips are always happening somewhere."

### Slide 19 — The index hides where the opportunity lives · `data-slide="18"`
- **Kicker:** Under The Index **Title:** The Index Hides Where The Opportunity Lives. **Subtitle:** We don't harvest the S&P 500 — we harvest the 500 stocks underneath it.
- **On screen:** S&P 500 trajectory chart with drawdowns shaded (live data from EODHD).
- **Purpose:** Show the surface area is far bigger than the headline index — sets up daily execution.
- **Talk track:** "We work with the 500 companies underneath the index. Even when it's green, dozens are red. That's our surface area."

### Slide 20 — More Shares, Same Tax · `data-slide="17"`
- **Kicker:** The Mechanic **Title:** More Shares, Same Tax **Subtitle:** Why converting during a dip accelerates your savings — without costing a dollar more in tax.
- **On screen:** Normal day: $50K = **250 shares** at $200. Dip −20%: $50K = **312 shares** at $160 (**25% more**). "Taxed on the dollar amount, not the share count — recovery is tax-free, forever."
- **Purpose:** The core mechanic. Make "same tax, more shares, tax-free recovery" concrete.
- **Talk track:** "When a holding's down 20%, the same tax bill moves ~25% more shares into your Roth. When they recover, all that growth is tax-free, forever."

### Slide 21 — Strategic Roth Conversions · `data-slide="19"`
- **Kicker:** Why Timing Is Everything **Title:** Strategic Roth Conversions **Subtitle:** Why market drops are your biggest conversion opportunity — not your biggest fear.
- **On screen:** Four points — Volatility Is Constant (1 in 3 stocks finish negative); Every Year Has a Dip (~14% avg intra-year drop); The Leverage (20% dip = 25% more shares); The Discipline (we watch daily, we act).
- **Purpose:** Brand the method ("Strategic Roth Conversions") and prove it's a disciplined, daily process — not luck.
- **Talk track:** "We watch daily; when a dip shows up, we move — turning a scary red day into permanent tax savings."

### Slide 22 — Perfect price means nothing in the wrong bracket · `data-slide="lever2-intro"`
- **Kicker:** Lever 2 — Your Tax Return **Title:** Perfect timing. Perfect price. None of it matters in the wrong bracket.
- **On screen:** Lever 2 divider.
- **Purpose:** Reframe to the lever even sophisticated DIYers miss — the conversion stacks on the 1040.
- **Talk track:** "You can nail the timing and price and still overpay if it lands in the wrong bracket. It doesn't land in a vacuum."

### Slide 23 — Full Price or Half Off · `data-slide="1040"`
- **Kicker:** The Lever Everyone Forgets **Title:** Full Price or Half Off. **Subtitle:** The same $40K conversion. The only difference is what's already on the return underneath it. Illustrative.
- **On screen:** Before — packed return: conversion lands in **24% · $9,600 tax** (red "tax bombs": interest, dividends, cap gains). After — planned year: same $40K fits the **12% · $4,800 tax**. "Half the tax — $4,800 kept in one planned year."
- **Purpose:** Demonstrate Lever 2 with a side-by-side 1040 stack. The "tax bombs" concept.
- **Talk track:** "Same $40K conversion, two returns. One fills a low bracket — half off. One stacks on a gain and gets pushed up — full price. The only difference is what's already on the 1040."

---

## ACT 3 — Lever 3: The Tax Code *(Why today's rates may be the sale price)*

### Slide 24 — When will tax rates go up? · `data-slide="hist-rates"`
- **Kicker:** Lever 3 — The Tax Code **Title:** When will tax rates go up? **Subtitle:** More than a century of the U.S. income tax — the top bracket has been as high as 94%; today's 37% sits near the floor.
- **On screen:** **94%** peak (1944–45) · **70%** (as recently as 1980) · **37%** today. (Historical rates chart.)
- **Purpose:** Lever 3. Reframe from "if" to "when" using a century of rates.
- **Talk track:** "I didn't say *if* rates go up — I said *when*. Today's 37% sits near the floor of modern history."

### Slide 25 — America earns $31T. It owes $39T. · `data-slide="debt-gdp"`
- **Kicker:** Lever 3 — The Tax Code **Title:** America earns $31 trillion. It owes $39 trillion. **Subtitle:** The national debt is now ~125% of what the whole economy produces in a year.
- **On screen:** GDP **$31.2T** vs Debt **$39.0T · 125% of GDP**.
- **Purpose:** Make the macro case for rising rates tangible via a household analogy.
- **Talk track:** "It earns ~$31T and owes ~$39T. Math like that only has two ways out."

### Slide 26 — Balancing the budget: only one way · `data-slide="two-exits"`
- **Kicker:** Lever 3 — The Tax Code **Title:** Balancing the budget: there is only one way.
- **On screen:** Exit 1 **Cut spending** ("sounds easy — until you see where the money goes") vs Exit 2 **Raise revenue (taxes)** ("…or do both!").
- **Purpose:** Narrow the macro outcomes to two levers — and foreshadow that only one is realistic.
- **Talk track:** "Two levers: cut spending or raise revenue. Only one is realistic. Let me show you why."

### Slide 27 — There's nothing left to cut… but benefits · `data-slide="budget-pie"`
- **Kicker:** Lever 3 — The Tax Code **Title:** There's Nothing Left to Cut… But Benefits! **Subtitle:** Nearly three-quarters of the budget is benefits and interest — money already promised.
- **On screen:** **58% Benefits** · **14% Interest** (>$1T/yr, can't cut without default) · **28% Government** (military 13%, veterans 5%, agencies 10%). "Your benefits are the budget." (FY2025 ≈$7.0T outlays, ≈$1.8T deficit.)
- **Purpose:** Prove spending cuts can't close the gap — which points at taxes.
- **Talk track:** "Defense and every agency add up to barely a quarter. You can't close an $8T gap from the small slice."

### Slide 28 — And it's been happening for years · `data-slide="one-choice"`
- **Kicker:** Lever 3 — The Tax Code **Title:** And it's been happening for years! **Subtitle:** They've already been cutting benefits for years — just quietly.
- **On screen:** 2007 IRMAA (means-tested Medicare) · 2016 Deemed Filing (SS claiming strategies killed) · 2020 The 10-Year Rule (SECURE Act) · 2032 Trust Fund runs dry (~20% auto cuts). "The benefit cuts already happened. Taxes are the lever they haven't fully pulled — yet."
- **Purpose:** Prove the squeeze is already underway — urgency, not speculation.
- **Talk track:** "Means-testing, later ages, taxing Social Security. The squeeze isn't coming — it started."

### Slide 29 — When Congress raises rates, how does it hit us? · `data-slide="13"`
- **Kicker:** The Legislative Risk **Title:** When Congress raises tax rates… how will that impact us? **Subtitle:** Today's 37% is near the lowest in our history and the developed world (Japan 56%, France 55%, Canada 54%, Germany 47%, U.K. 45%).
- **On screen:** Rate-sensitivity toggle — Current / +10% / +20% / +30%. Lifetime Federal Tax **$564K** (8%); "Additional Tax vs Today" updates per scenario.
- **Purpose:** Stress-test *their* plan against rising rates. Today's dollars convert at a known low rate.
- **Talk track:** "Watch what even a moderate 20% increase does to your lifetime bill. *Toggle the scenarios.* Wait, and you're betting rates stay here."

### Slide 30 — You control *when* you pay · `data-slide="the-turn"`
- **Kicker:** The Turn **Title:** You can't control tax rates. You control when you pay them.
- **On screen:** Out of your hands: ✗ tax rates ✗ Congress ✗ the debt ✗ quiet benefit cuts. In your hands: ✓ when you pay ✓ how much at a time ✓ which account ✓ who inherits the bill. "There's a date on the IRS calendar — the *Required* Minimum Distribution."
- **Purpose:** The turn from fear to agency — set up "take control" (and the RMD deadline pressure).
- **Talk track:** "You can't control Congress. But you control four things that matter more — until *[75]*, when the word *Required* tells you who's in charge."

---

## THE PAYOFF — claim the prize before you meet the vendor *(commit to the strategy first)*

### Slide 31 — Your heirs inherit a Roth, not a tax bill · `data-slide="21"`
- **Kicker:** The Prize **Title:** Your heirs inherit a Roth — not a $2.5M tax bill. **Subtitle:** Use the 12 low-bracket years you have left, and the tax the IRS would have taken all but disappears. *(12 = years-to-RMD, bound to age.)*
- **On screen:** Heirs never pay **$2.5M**; saved in your lifetime **$449K**; widow's penalty erased **$75K** (for Single: "single-filer penalty avoided — $0"). "At +20% rates your heirs avoid closer to **$3.0M** — it's the biggest it will ever be; at 75, RMDs force the worst of it." Illustrative.
- **Purpose:** Lead the close with the payoff so the prospect commits to the *strategy* before meeting the vendor (price/process come after).
- **Talk track:** "This is the prize. That *[$2.5M]* the IRS would take from three generations all but disappears. Use the *[12]* low-bracket years you've got."

### Slide 32 — Their timing vs. yours · `data-slide="23"`
- **Kicker:** The Choice **Title:** Their timing vs. yours **Subtitle:** Left column: their schedule. Right column: yours — over a 30-year retirement on your $1.50M IRA.
- **On screen:** Lifetime Tax **$992K** vs **~$544K** (saves $449K); Heirs' rate **37%** vs **0%**; Heirs' tax **$2.5M** vs **$0**; Conversion window **wasted at 75** vs **12 low-bracket years used**. "Doing nothing and deciding later are the same column — until 75."
- **Purpose:** Crystallize the decision as a two-column comparison; collapse "later" into "nothing" — still before any vendor/price content.
- **Talk track:** "Doing nothing and deciding later are the *same column*. You pick — but only until *[75]*. After that the IRS picks."

---

## TAKE CONTROL — Why this needs one set of hands

### Slide 33 — A ship with two captains runs aground · `data-slide="all-assets"`
- **Kicker:** Taking Control — Why One Set Of Hands **Title:** A ship with two captains doesn't sail twice as fast. It runs aground. **Subtitle:** You control the timing — but only if one set of hands runs it.
- **On screen:** Hand-drawn illustration (`img/two-captains.jpg`) — one ship, two captains each steering a divergent heading into the fog, toward a hidden rock (the red-eyed iceberg = your bracket). Right-hand cards: Two full charts (both look complete) → The fog between them (neither sees the other's moves) → The bracket is the rock (they collide on your 1040). "One set of hands, one chart — that's in-house. That's us."
- **Purpose:** Make the case that tax + investing must be a single operation — the wedge against split advisor/CPA.
- **Talk track:** "Your advisor optimizes returns; your CPA files what lands. They don't collide in the water — they collide on your 1040. One captain. One chart."

### Slide 34 — Make them check every box · `data-slide="24"`
- **Kicker:** Take Control — The Requirements **Title:** Before you let anyone run this, make them check every box. **Subtitle:** We didn't write this list to describe ourselves — the strategy wrote it. Score anyone against it, including us.
- **On screen:** Checklist — **Allowed to give tax advice** (where most fail) · **Watches the market daily** (where most fail) · **Manages every account on your 1040** · **Plans for spouse & heirs**. "Score your own advisor honestly. Most can't check the first two."
- **Purpose:** Install the buying criteria (Challenger "take control") so the prospect judges every advisor by *our* spec.
- **Talk track:** "Make them check every box — me or your current advisor. Most can't check the first two. Here's why."

### Slide 35 — Your advisor isn't *allowed* to tell you this · `data-slide="wedge-permission"`
- **Kicker:** Why Nobody Handed You The Controls **Title:** Your advisor isn't allowed to tell you this. **Subtitle:** Most firms — including the biggest names — prohibit advisors from giving tax advice. Not because they aren't smart. Because compliance says no.
- **On screen:** Advisor ("that's a tax question, ask your CPA") ✗ the strategy dies in the gap ✗ CPA ("I don't manage investments, ask your advisor"). "We're Enrolled Agents — licensed by the IRS — and we built our own firm so nobody could stop us."
- **Purpose:** Wedge 1 — the permission gap. Differentiates us structurally, not by talent.
- **Talk track:** "Most firms prohibit tax advice. The strategy dies in that gap. We're Enrolled Agents and built our own firm for exactly this reason."

### Slide 36 — Software that didn't exist, so I built it · `data-slide="wedge-platform"`
- **Kicker:** Why Almost Nobody Can Run It **Title:** This strategy needs software that didn't exist. So I built it. **Subtitle:** Off-the-shelf planners assume away the real world — steady returns, frozen brackets, no surprise November gain.
- **On screen:** My day job: **CTO of a national fintech platform**. Proven at scale (tens of thousands of clients, hundreds of advisors). "Everyone can *describe* this strategy. Almost nobody is instrumented to *run* it."
- **Purpose:** Wedge 2 — the tooling gap. Establishes a moat only this firm can cross.
- **Talk track:** "Off-the-shelf tools give a clean answer by assuming away reality. Building software like this is what I do for a living."

### Slide 37 — Leibel Sternbach · `data-slide="5"` *(renders as corner #38)*
- **On screen:** Full nine-credential list — **Bestselling Author** of *Living with Financial Anxiety* · **Enrolled Agent with the IRS** · **Accredited Portfolio Management Advisor** · **Chartered Financial Consultant** · **National Social Security Advisor Certificate Holder** · **Portfolio Manager for ETF: YFYA** · **Financial Sponsor for the ETF: RSMV** · **Frequently quoted as an expert in the media** · **Been helping educate retirees since 2007**. Portrait + "Featured On" media logos (CNN, Forbes, Yahoo Finance, CBS, WSJ, etc.). (linktr.ee/LeibelSternbach). *Restored 2026-06-14 to the full credential list (the prior trim to 4 EA/CTO creds was reverted); list spacing tightened (15px / 6px padding) so all nine fit above the fold.*
- **Purpose:** Credibility — the full résumé behind the strategy.
- **Talk track:** "Enrolled Agent — so I'm allowed to give the tax advice most can't. Author, portfolio manager, ETF sponsor, educating retirees since 2007. This is all I do."

### Slide 38 — Meet the team · `data-slide="4"`
- **Kicker:** The People Behind The Plan **Title:** Meet The Yields For You Team **Subtitle:** Portfolio managers, advisors, and traders — all focused on retiree tax planning.
- **On screen:** NYSE bell photo (Feb 25, 2025 — YFYA & RSMV listing). Leibel Sternbach (Founder), Moe Breitowitz (Trader), Chaya First (Financial Advisor).
- **Purpose:** Show it's a team, not a one-man shop — sets up the continuity/relationship slide.
- **Talk track:** "You're not hiring a one-man shop — portfolio managers, advisors, traders, all focused on retiree tax planning."

---

## WHAT IT'S LIKE TO WORK WITH US

### Slide 39 — A 12-year plan is a relationship · `data-slide="relationship"`
- **Kicker:** Beyond The Numbers **Title:** One conversion is a transaction. A 12-year plan is a relationship. **Subtitle:** Over 12 years, your plan will change — and so will what matters most to you…
- **On screen:** "At a national firm": You → salesperson → service team → Advisor #1 → #2 → … (account #4,000). "With Yields For You": You ⇄ the same named team. "Small isn't the risk. It's how you get someone in your corner instead of a number in a queue."
- **Purpose:** Reframe "small firm" risk into a relationship advantage — sets up the philosophy + the value-stack.
- **Talk track:** "One conversion is a transaction. A *[12]*-year plan is a relationship. A rotating team that's never seen your history — that's the risk."

### Slide 40 — Our Planning Philosophy *(the wheel)* · `data-slide="planning-wheel"`
- **Kicker:** Our Planning Philosophy **Title:** We don't just manage money. We help you live your dreams. **Subtitle:** Real planning isn't one thing — it's five, working together…
- **On screen:** The 5-area planning wheel (`img/planning-wheel.png`) around a **Live Your Dreams** center: **1 Investments** (grow & protect) · **2 Tax Minimization** (keep more of what you earn) · **3 Income** (sustainable, predictable) · **4 Life Planning** (care, dignity, control) · **5 Financial Continuity** (a legacy, not a burden). Capstone: "Five areas. One plan. Built entirely around you."
- **Purpose:** Introduce the *philosophy / scope* of what we plan (the 5 areas) before the value-stack and the price — high-level frame first.
- **Talk track:** "Here's everything we actually plan around. Five areas, one plan, all built around the life you want."

### Slide 40b — About Yields For You · `data-slide="mission"`
- **Kicker:** Our Mission **Title:** About *Yields For You.* **Hero line:** Help *ONE MILLION people* retire with financial security.
- **On screen:** Two-column layout. Left — "How We Accomplish This": FREE Education (Blog, Podcast, TikTok, etc.) · FREE & PAID Classes · ETF Sponsorships (YFYA & RSMV) · Advisor Support · Limited one-on-one clients. Right — the NYSE closing-bell GIF (`nyse-bell.gif`).
- **Purpose:** Mission frame right before the value-stack — situates the 1:1 engagement at the top of a much larger free-education funnel, so the prospect understands they've reached the most exclusive tier. The "limited one-on-one clients" line foreshadows the scarcity slide (Slide 47).
- **Talk track:** "Our mission is to help one million people retire with financial security. Most of that is free — the blog, the podcast, the classes, the ETFs. The one-on-one work is the smallest, most limited tier. That's the one you're in."

### Slide 41 — Four prices, or four different jobs? · `data-slide="value-stack"`
- **Kicker:** Before You Compare The Price **Title:** It looks like four prices. *It's really four different jobs — and three of them stop halfway.* **Subtitle:** A price only tells you what it costs, not what you get. So here's the whole job a tax-free retirement actually takes — read down the list, then look at who's still in the column when you reach the bottom.
- **On screen:** Four-column comparison — **On your own** (you run it all) · **A large brokerage** (holds the money, not the plan) · **A 1% AUM advisor** (plans, then hands off) · **Yields For You** (the whole job, highlighted dark). Six rows (the jobs): **Read your whole 1040** (not just the accounts one firm can see) · **Convert on the dip, not the calendar** (same tax, more shares — when someone's actually watching) · **Tax-return coordination** (one team on it — not "ask your CPA") · **Plan the whole life around it** (estate · survivor · LTC · Social Security) · **One firm, one fee, one roof** (one bill — nobody pointing at the other guy) · **The same people, year after year** (you're not re-explaining your life to a new face). Only the Yields For You column fills every row (● built to do it / ◐ partly / ○ not built for it). Capstone: "Everyone here does part of it. *We're built to do the whole thing — under one roof.*" (Illustrative; reflects typical service models across these categories, not any specific firm.)
- **Purpose:** The Challenger value reframe right before price — turn "four prices" into "four jobs" so the fee is judged on the *whole job*, not the sticker. Defuses the "why not just use a cheaper option" objection before it's asked. See `[[roth-challenger-framework]]`.
- **Talk track:** "Before we talk price — this looks like four prices, but it's really four different jobs, and three of them stop halfway. Read down the list: who's still in the column when you reach the bottom? Everyone here does part of it. We're built to do the whole thing, under one roof."

### Slide 42 — Full Circle: the persona payoff · `data-slide="full-circle"` *(variant by Slide 2 pick; spouse beat MFJ-only)*
- **Kicker:** Full Circle **Title (Steward variant — default):** You came in as *The Steward.* **(Protector variant):** You came in as *The Protector.*
- **On screen:** Renders the version matching the prospect's Slide 2 pick (defaults to Steward when unset). **Steward:** "You told me straight: you would not let the IRS take the lion's share of what you built before it reached your kids. So that's what we built — the engine that times every conversion, fills the low brackets, and routes what you earned to the people you chose." *Now the part you didn't come for:* the same move that beats the IRS for your kids **erases the widow's penalty for your spouse** (MFJ) / **frees you from the single-filer tax cliff** in your own later years (single). "You walked in to protect what you built. You protected your people, too." **Protector:** the mirror image — the plan that shields your spouse also keeps the IRS from taking the lion's share before it reaches your kids. "You walked in to protect your people. You protected what you built, too." Capstone: "The Steward and the Protector were never two people. *They were two reasons to make the same decision.*" (Illustrative; survivor/heir figures estimate the 10-year-rule drain at peak rates and single vs. joint brackets.)
- **Purpose:** Pays off the persona-fork open loop from Slide 2 — hands the prospect the fear they *didn't* name, so a single decision satisfies both motives. Emotional capstone right before the price question. See `[[protector-steward-archetypes]]`.
- **Talk track:** "You came in as the [Steward / Protector]. Here's what surprises most people: the very move you came for does the other thing too — [it erases the widow's penalty for your spouse / it gets your kids the money, not the IRS]. The Steward and the Protector were never two people. They were two reasons to make the same decision." *(Let it sit, then turn to price.)*

---

## THE OFFER & THE CLOSE

### Slide 43 — So what does all this cost? · `data-slide="cost-divider"`
- **Kicker:** The Investment **Title:** So — what does all this cost?
- **On screen:** Full-bleed divider.
- **Purpose:** Ask the money question head-on (Challenger "take control" of the price moment).
- **Talk track:** "Which brings us to the question you're too polite to ask, so I'll ask it for you: what does all this cost?"

### Slide 44 — The 30-Day Roth Accelerator · `data-slide="accelerator"`
- **Kicker:** Our Signature Process **Title:** The 30-Day Roth Accelerator. **Subtitle:** Signed, funded, and ready in 30 days. Three meetings to lock your plan — then we watch the market daily and convert on the dips. You don't wait at a desk for it; one more meeting at year-end trues it all up.
- **On screen:** Phase banner **First 30 Days → Ongoing** over a 4-node timeline. **Meeting 1 · Sign up** (Today) — we open your account and handle the paperwork, ~20 min. **Meeting 2 · Transfer your accounts** (~1 week) — your accounts move to Schwab in-kind, in your name, 7–10 days, no liquidating. **Meeting 3 · Review & sign your Roth conversion plan** (~Day 21) — built on your full tax picture; you sign and we go live. **Meeting 4 · End-of-year tax planning** (Year-end) — true up this year's conversions against your real return and map next year before the Dec 31 window closes. Pills: "Accounts in transit · 7–10 days" and "↻ Convert on the dips · ongoing." Capstone: "Most firms are still scheduling your kickoff. *You're funded, signed, and ready for the next dip.*" (Illustrative; conversions are made when market conditions allow, timing not guaranteed; transfer times depend on your custodian.)
- **Purpose:** The signature onboarding process — concrete, fast, low-effort on the prospect's side. Placed right after the cost question so the 30-day process leads straight into the price; the Conversion Only tier *is* "The 30-Day Roth Accelerator." Replaces the legacy 90-day "Tax-Free Retirement Accelerator" + "Year One" pair.
- **Talk track:** "Here's our signature process. You sign in about twenty minutes; your accounts move to Schwab in-kind over a week or so; by about day 21 we walk through and sign your conversion plan — then we're live, watching daily for the dips. One more meeting at year-end trues it all up. Most firms are still scheduling your kickoff — you'd already be funded, signed, and ready."

### ~~Slide 44b — Choose the onboarding structure~~ *(RETIRED 2026-06-12 — no longer renders)*
- Upfront onboarding fee removed; `showFee` hardcoded `false`. This slide does not appear in v2.
  The Slide 48 refundable-90-day card is also gone. See `[[onboarding-fee-toggle]]`.

### Slide 45 — Which way do you want to work together? · `data-slide="two-ways"`
- **Kicker:** Your Choice **Title:** Which way do you want to work together? **Subtitle:** Same tax engine either way — the difference is everything around the numbers.
- **On screen:** **Conversion Only — 0.5%/yr** ("The 30-Day Roth Accelerator"): Strategic Roth Conversions, tax-smart management of all accounts, two meetings/yr; nothing upfront, billed in arrears. **White Glove — 1.5%/yr** *(Recommended)*: everything plus unlimited meetings, standing Nov–Dec tax meeting, estate & legacy, long-term care & Social Security, in-house EA tax-return coordination, the survivor plan. *(Cards are selectable; the prospect's Slide 2 persona pre-selects the matching tier and the choice flows into the fee slide.)*
- **Purpose:** Present the two tiers as a choice (anchored by White Glove). Same engine; the relationship is the upgrade.
- **Talk track:** "Two ways in, tax engine in both. Conversion Only is just the numbers — the Accelerator. White Glove is everything around them — your personal CFO."

### Slide 46 — One fee, all-in · `data-slide="fee"`
- **Kicker:** What It Costs **Title:** One fee. 1.5%, all-in. **Subtitle:** No conversion fees, no per-trade charges, no surprise add-ons — White Glove covers it all… One fee, because it's one kitchen.
- **On screen:** Tier toggle (White Glove / Conversion Only) + %/$ toggle. Why it's affordable: we built the platform · we are the firm · tax + investing under one roof. Fee bar **1.5%** vs illustrative savings scenarios A **5%** / B **10%** / C **20%**. "Scenarios A–C are illustrative, not projections."
- **Purpose:** Frame the fee as a thin slice against potential tax savings; pre-empt sticker shock.
- **Talk track:** "One transparent fee. Here's how that slice sits against what a well-run strategy could save across common corrections. Start where you're comfortable — change anytime."

### Slide 47 — Why we stay small · `data-slide="scarcity"`
- **Kicker:** Why We Stay Small **Title:** We do 30–40 of these a month. We take on one or two. **Subtitle:** Not a tactic — a capacity limit.
- **On screen:** **30–40** analyses/mo → **1–2** new clients/mo. Small On Purpose (boutique) · It's Mutual (first to say yes *and* a genuine fit; doesn't guarantee a seat) · You'll Have Us Directly (clients text us). "We do it because we care — and caring only scales to a couple of new families a month."
- **Purpose:** Genuine, mutual scarcity — restraint as credibility. Don't oversell.
- **Talk track:** "We do 30–40 analyses a month and take on one or two. Saying yes today starts the conversation; it doesn't claim a seat."

### Slide 48 — You're never locked in · `data-slide="risk-reversal"`
- **Kicker:** No Risk In Starting **Title:** You're never locked in — not for a single day. **Subtitle:** Three ways we put the risk on us, not you.
- **On screen:** **Say stop, and we stop** — before we begin, walk away, no questions, no fees. **One phone call removes us** — accounts in your name at Schwab; call Schwab directly ("I don't want Yields For You on my accounts anymore") and we're gone in ~5 minutes. **We earn it first** — billed monthly in arrears; we don't collect until the first month after your money moves. *(When the onboarding-fee toggle is on, this third card becomes "Your 90-Day Safety Net — refundable after 90 days.")* "You hold every card. We earn the relationship — we never trap you in it."
- **Purpose:** Risk reversal right before the ask — remove every reason to hesitate.
- **Talk track:** "There's no risk in starting. Say stop anytime. One call to Schwab removes us in five minutes. And we bill in arrears — you feel what working with us is like before we're ever paid."

### Slide 49 — Take back the timing *(the close)* · `data-slide="25"`
- **Kicker:** Your Move **Title:** Take back the timing. **Subtitle:** Everything you just saw — your plan, your accounts, your names on everything — in motion within 30 days.
- **On screen:** **What You Take Back** (4 checks): You pick the year you pay — not the IRS at 75 · You pick the bracket — **12% now, not 24% later** (bound; Single shows 22% → 35%) · *(MFJ only)* Your spouse never faces the widow's penalty alone · Your kids inherit a Roth, not a **$2.5M** tax bill (bound). **Your First 30 Days** (5 steps): 1) You sign one document (~20 min) · 2) Your Schwab accounts open — your name, your control · 3) Your money transfers in-kind, nothing sold · 4) Your Year One plan goes live · 5) Your first conversion fires on the next dip. Safety line: "Your accounts live at Schwab, in your name. One phone call removes us in five minutes." Contact: **"Who picks the dates — you, or Congress?"** · 410-914-4894 · Yields4u.com.
- **Purpose:** Owner-voiced close — frames the decision as *taking back control*, concrete 30-day steps, the safety net, the final question. Then stop talking.
- **Talk track:** "Take back the timing. You sign one document, your Schwab accounts open in your name, money transfers in-kind, your Year One plan goes live, and your first conversion fires on the next dip. Who picks the dates — you, or Congress? … Want me to start the paperwork?" *(Then stop. Let them answer.)*

---

### Delivery reminders
- **Don't teach what they already know.** This audience often already does conversions — lean on the blind spots (the widow's penalty, the 1040 stacking, execution continuity), not Roth 101. See `[[big-day-audience-profile]]`.
- **Match the persona.** They pick on Slide 2; the Full Circle close (Slide 42) and the tier (Slide 45) follow automatically — but lean into the language of *their* pick (Protector vs Steward) all the way through. See `[[protector-steward-archetypes]]`.
- **Commit to the strategy before the vendor.** Slides 31–32 (the prize + the choice) lead the close — get the "yes, this strategy is for me" before any price or process. Don't jump to cost early.
- **Justify before you price.** Slide 41 (four jobs) and Slide 42 (Full Circle) do the value work right before the cost question on Slide 43 — don't skip them to get to the number faster.
- **Hold the tension** on Slides 10–13 (the threats) and 33–36 (the captains + the two wedges).
- **The numbers are illustrative** — say it on Slides 23, 31, 32, 41, 42, and 46. Route updated claims through compliance.
- **The Accelerator (Slide 44) is the process, not a quote.** Never give a specific conversion size or savings figure there — the real plan is built only after the full analysis.
- **Personalize** the open (Slide 1) and the prize (Slide 31) — those two are where specificity wins or loses the room.
- **Conditional content:** Slides 10–11 are MFJ-only; the Full Circle payoff (Slide 42) and the final-slide spouse line (Slide 49) swap for single filers; the onboarding-structure slide (44b) and the Slide 48 refund card appear only with the onboarding-fee toggle on.
