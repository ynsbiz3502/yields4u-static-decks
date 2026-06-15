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
- **47 slides** in the canonical render (MFJ; onboarding-fee toggle retired as of 2026-06-12 — `showFee` hardcoded false), **45 for single filers** (the two MFJ widow slides drop). Corner numbers auto-renumber to actual order at render time. **Close sequence rebuilt 2026-06-14:** the standalone **two-ways**, **scarcity**, and **risk-reversal** slides were removed; the de-risk is folded into the Accelerator + close; a closing **micro-gate** (`gate-close`) was added; and the **fee** slide now leads the offer, ahead of the process. All slides verified above-the-fold at 1280×768.
- **Filing status:** Slides 10–11 (the widow's-penalty pair) render **only for Married Filing
  Jointly**. Single filers don't see them (≈46 slides), and the Full Circle close (Slide 42)
  swaps its spouse payoff for a single-filer version.
- **Chart rendering (2026-06-14):** Slides 24 (hist-rates), 25 (debt-gdp), 27 (budget-pie), and 29 (legRiskSlide) were fixed for full-width layout. Root cause: `display:flex` on `.slide.active` caused `margin:auto` children to shrink to canvas default width. Fix: `width:100%` on direct slide children + `c.resize()` on navigation + `animation:false` on the pie chart.
- **Persona fork:** Slide 2 lets the prospect self-select **Protector** vs **Steward**. The pick
  pre-selects the matching tier on the fee slide (Slide 44) and selects the matching variant of
  the **Full Circle** close (Slide 42). Unset defaults to Steward so the close is always coherent.
  See `[[protector-steward-archetypes]]`.
- **Onboarding-fee toggle** — **RETIRED 2026-06-12.** `showFee` is hardcoded `false`; the onboarding-structure
  slide no longer renders, and its refundable-90-day card is gone with the old risk-reversal slide (removed
  2026-06-14). See `[[onboarding-fee-toggle]]` for historical context.
- **Two service tiers** drive the fee slides: Conversion Only 0.5% / White Glove 1.5%. See
  `[[yields4u-service-tiers]]`.
- **Presenter cue layer (`C`):** Each slide can carry a `<template class="pres-cue">` (verbatim ask + STOP + objection branches) that's hoisted into a right-side panel toggled with the **`C`** key — presenter-only, hidden in print and `?view=audience`, and never painted on the client canvas (confirm pixel-identical with cues on/off before screen-sharing). Three **commitment gates** ride this layer: **Gate A** (do they believe the savings, after Slide 32), **Gate B** (the right hands?, after Slide 42), and a closing **micro-gate** (`gate-close`, "anything between you and yes?", right before the close) — figure-free *question* slides whose branch logic lives only in the cue.
- **Objection-jump bar (`J`; rides the `C` toggle):** A persistent, collapsible bar in the presenter layer (auto-expands on the close, `data-slide="25"`) that jumps to the slide answering whatever the prospect just said — by `data-slide` anchor, with a **return stack** so "← Back to where we were" pops to the launch slide and chained jumps unwind in order. Buttons are the prospect's words: *"How does it work?"* → Accelerator · *"Is this safe?"* → Accelerator (the process is the de-risk) · *"Let me think"* → the closing micro-gate (`gate-close`) · *"Talk to my spouse"* → Spouse Mobilizer action card. Hidden with the cues for screen-share; never on the client canvas or in print/export.

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

### Gate A — Do you believe it saves you at least *[their floor]* in taxes? *(commitment gate)* · `data-slide="gate-strategy"`
- **Treatment:** dark/ink (the heavy turn). **On screen (client):** Eyebrow "Before we go further" · Headline "Do you believe strategic Roth conversions can save you at least *[$449K]* in taxes in your lifetime?" · gold rule · "Forget the firm. Forget the fee — just the math you just saw." **No figures-as-buttons** — a slide that's *only* a question, so the advisor has to ask it and stop. **The dollar figure auto-fills from the prospect's own base "saves" number on Slide 32** (the *minimum* — since higher future rates only increase it, "at least" is conservative).
- **Purpose:** Strategy commitment *before* any vendor/price content — and made concrete: get them to own the specific savings number out loud before "who runs it" and "what it costs." Universal (all filing statuses and personas).
- **Cue (presenter only):** ASK "Set the firm and the fee aside for a second — based on the numbers you just saw, do you believe these strategic Roth conversions can save you at least *[$449K]* in taxes over your lifetime?" → **STOP.** Branches: *clear yes* → "Then the only two questions left are who runs it, and what it costs" → advance to the captains slide; *hesitation* → **don't advance**, "tell me what's giving you pause" (timing/market → the levers; "just moves the tax" → widow + heir math); *"ask my spouse"* → book a 20-min joint call this week; *"think about it"* → "about what — the strategy, the firm, or the fee?"

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

### Slide 36 — We built the software. Nobody else has it. · `data-slide="wedge-platform"`
- **Kicker:** Our Technology **Title:** We built the software. Nobody else has it. **Subtitle:** Leibel Sternbach built a national fintech platform — hundreds of advisors use it to manage billions in assets. Even that platform doesn't run *this*. So for the dip-watching Roth conversion process, we built a separate engine — one nobody else has.
- **On screen:** Three cards — **Our Edge · Built by Leibel Sternbach** (the national fintech platform he created runs in-house, not licensed from a vendor) · **Proven At Scale · Hundreds of advisors · billions managed** (the proof he ships real software at scale) · **Purpose-Built · The Roth Accelerator Engine** (our own engine, built only for the conversion process — it watches the market daily and converts on the dips; nobody else runs it). Verdict: "Everyone can *describe* this strategy. Almost nobody is instrumented to *run* it."
- **Purpose:** Wedge 2 — the tooling gap. The at-scale platform is *credibility* (he ships real fintech); the **Roth Accelerator Engine** is the separate, purpose-built moat. Don't conflate the two — the platform hundreds of advisors run on does **not** perform this conversion process.
- **Talk track:** "I built a platform hundreds of advisors run on — billions in assets. Even that doesn't do this. So we built a separate engine just for the conversion process — the Roth Accelerator Engine. Nobody else has it."

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
- **Purpose:** Mission frame before the offer — situates the 1:1 engagement at the top of a much larger free-education funnel, so the prospect understands they've reached the most exclusive tier. The "limited one-on-one clients" line reinforces the boutique, capacity-limited positioning (the standalone scarcity slide was removed 2026-06-14).
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

### Gate B — The right hands for your money? *(commitment gate)* · `data-slide="gate-value"`
- **Treatment:** light/paper (a quick beat before price). **On screen (client):** Eyebrow "Before the numbers" · Headline "Does this feel like *the right hands* for your money?" · gold rule · "You've seen the whole job — and the people who'd actually do it. The only question left is what it costs." · stop cue "A 'yes' here just means we've earned the cost conversation." **No figures.**
- **Purpose:** Value commitment immediately *before* price — a short beat that earns the right to the cost conversation. Universal.
- **Cue (presenter only):** ASK "Before I answer the cost question you've been too polite to ask — does the way we'd run this feel like the right hands for your money?" → **STOP.** Branches: *yes/nod* → "Then let's talk about what it costs" → advance; *"what's it cost?"* → "Exactly where I'm headed" → advance and weight the tax-drag anchor on the fee slide.

---

## THE OFFER & THE CLOSE

### Slide 43 — So what does all this cost? · `data-slide="cost-divider"`
- **Kicker:** The Investment **Title:** So — what does all this cost?
- **On screen:** Full-bleed divider.
- **Purpose:** Ask the money question head-on (Challenger "take control" of the price moment) — and set the yardstick before the number lands.
- **Talk track:** "Which brings us to the question you're too polite to ask, so I'll ask it for you — what does all this cost? And before I give you the number, I'll tell you what to measure it against. The fee is the small number on this slide."

### Slide 44 — The real fee in retirement isn't ours · `data-slide="fee"` *(re-anchored on tax drag; now leads the offer, before the process)*
- **Kicker:** What It Costs **Title:** The real fee in retirement isn't ours. **Subtitle:** It's the rate the IRS runs on an unmanaged drawdown — one fee, all-in, because it's one kitchen. Measure ours against the column on the left.
- **On screen:** A red **Do Nothing** anchor card (peak bracket at RMD time; the illustrative heir figure the IRS takes under the 10-year rule) sits left of the two tier cards — **Conversion Only 0.5%** (the Accelerator) and **White Glove 1.5%** *(Recommended)*. Tier toggle + %/$ toggle. Optional "compare to a market move" chart: fee **1.5%** vs illustrative correction scenarios A **5%** / B **10%** / C **20%**. Verdict: "The fee is the thin slice that moves you from the left column to the right. You're not paying us 1.5% — measured against the lifetime tax bill on the left, it's how you stop paying that column." (Figures are the same illustrative numbers from earlier slides — disclosed, not new.)
- **Purpose:** Anchor the price against the cost of the problem already quantified — in *their* numbers, not the advisor down the street. Moved **ahead of the process** so the number lands against the tax-drag column first. The Conversion Only tier *is* the 30-Day Roth Accelerator.
- **Talk track:** "Here's the number: one transparent fee, 1.5%, all-in. Now here's what to measure it against — not the advisor down the street at 1%. Measure it against the column on the left: the lifetime tax bill you're on track to pay by doing nothing. You're not paying us 1.5% — you're paying the IRS the difference between these two columns if no one runs this, and our fee is how you stop."

### ~~Slide 44b — Choose the onboarding structure~~ *(RETIRED 2026-06-12 — no longer renders)*
- Upfront onboarding fee removed; `showFee` hardcoded `false`. This slide does not appear in v2.
  (The legacy refundable-90-day card lived on the old risk-reversal slide, which has since been removed entirely — see the close-rebuild note at the end of this section.) See `[[onboarding-fee-toggle]]`.

### Slide 45 — Here's exactly what happens — and what doesn't · `data-slide="accelerator"` *(the process IS the risk reversal)*
- **Kicker:** What Happens Next **Title:** Here's exactly what happens — and what doesn't. **Subtitle:** Open the door today. Nothing transfers until you've seen everything and said go.
- **On screen:** Phase banner **Before a dollar moves → Then, ongoing** over three de-risk steps. **Step 1 · Today — You open the door:** Schwab emails you; you open your accounts and sign. Empty accounts, in your name, not ours. Nothing moves. **Step 2 · Only then — We move only what you choose:** if it still fits, we transfer only the accounts you choose, and we begin; then we convert on the dips with a year-end true-up. **Step 3 (dark) · Our next call — We review everything** [, together with your spouse]: top to bottom, every number, every account, the whole plan. Pill: "↻ Convert on the dips · year-end true-up · ongoing." Capstone: "Most firms are still scheduling your kickoff. *You'll have the door open and the review booked.*" (Illustrative; conversions made when conditions allow, timing not guaranteed; transfer times depend on your custodian.)
- **Purpose:** The process **is** the risk reversal. By making the only step today "open empty accounts," the commitment shrinks to its true size and the easy-out is structural — which is why the separate scarcity and risk-reversal slides were removed. The Conversion Only tier *is* this Accelerator. *(On-screen step order is open → move → review per Leibel's 2026-06-14 edit; the talk track follows the same order.)*
- **Talk track:** "Before you decide, see exactly what today commits you to — it's much smaller than it feels. Today: Schwab emails you, you open your accounts and sign. The accounts are empty, in your name. Nothing transfers. Then, only when it fits, we move just the accounts you choose — and on our next call we review everything together, every number. Today just opens the door."

### Micro-gate — Anything between you and yes? *(commitment gate)* · `data-slide="gate-close"`
- **Treatment:** light/paper, one line. **On screen (client):** Eyebrow "One straight question" · Headline "Before the last piece — is there anything *between you and yes?*" **No figures.**
- **Purpose:** Pull the real objection into the open while you can still handle it, instead of hoping the jump-bar routes it (Challenger "take control"). Sits right before the close. Universal.
- **Cue (presenter only):** ASK "Before I take you through the last piece — straight question: is there anything between you and yes?" → **STOP.** Branches: *nothing / "I'm good"* → go straight to the close, Beat 5 (skip the run-up, just ask); *a real objection surfaces* → handle it now, then close; *"the cost"* → "The cost is nothing today — we bill in arrears, after your money moves, which isn't today. So what's left?"

### Slide 46 — So, do we open the door? *(the close — figure-free)* · `data-slide="25"`
- **Kicker:** Your Move **Title:** So — do we open the door? **Subtitle:** Not a transfer. Not a dollar moved. Just the door — open today, or open a little less next year.
- **On screen:** Three-step **"What happens next"** spine: **1 · Today** — Schwab emails you; you open and sign. Nothing moves — empty accounts, in your name. **2 · Our next call** — we review everything [, with your spouse]; top to bottom, you see every number first. **3 · Only then** — transfer the accounts you choose, and begin. Control line: "You hold every card at every step. Today opens the door — it doesn't walk you through it." Easing line: "Change your mind before our next call? One call to Schwab, five minutes, and your money never left your name." Contact: **"Who picks the dates — you, or Congress?"** · 410-914-4894 · Yields4u.com. **No dollar/percent figures anywhere — by design.**
- **Purpose:** Owner-voiced Challenger close. Collapses "think about it" into the left column (carry the tension), shrinks the commitment to opening empty accounts, then the advisor takes control by prescribing the path. One easy-out line as power, not apology. Ends on a direct ask tied to the persona payoff, then silence. *(Note: the close's on-screen spine keeps the logical de-risk order open → review → move; the Accelerator on Slide 45 shows open → move → review per Leibel's edit — the two slides intentionally differ.)*
- **Talk track (five-beat spine — presenter cue):** **1 Collapse the third option:** "You already told me the right-hand column is the one you want — so the strategy's answered. What's left is *when*. 'I'll think about it' isn't a third option — it's the left column with a nicer name; a little low-bracket room closes every year, and for good at 75." → **2 Shrink the commitment:** "The decision today is much smaller than it feels — I'm not asking you to move a dollar. I'm asking you to open the door." → **3 Prescribe the process:** "Schwab emails you, you open and sign — empty accounts, in your name. Then we review everything [with your spouse], and only then do we move the accounts you choose." → **4 Easy-out as power:** "If anything gives you pause, one call to Schwab and we're gone in five minutes — your money never leaves your name. There's just a door." → **5 Ask, then stop:** "You came in to protect [your people / what you built]. The door's open today — or a little less next year. Do we open it?" *(Then silence — let them answer.)* *(⚠ Guardrail: never quote a cost-of-delay dollar figure.)*

### ~~Removed 2026-06-14: two-ways, scarcity, risk-reversal~~
- The close sequence was rebuilt. **two-ways** (the standalone "which way to work together" tier slide), **scarcity** ("why we stay small"), and **risk-reversal** ("you're never locked in") were all removed. The de-risk is now structural in the **Accelerator** (open empty accounts; nothing moves until you say go) and the **close**; the tier choice lives on the **fee** slide (Slide 44). The objection-jump bar was repointed: *"Is this safe?"* → **Accelerator**, *"Let me think"* → the closing micro-gate (`gate-close`).

---

### Delivery reminders
- **Don't teach what they already know.** This audience often already does conversions — lean on the blind spots (the widow's penalty, the 1040 stacking, execution continuity), not Roth 101. See `[[big-day-audience-profile]]`.
- **Match the persona.** They pick on Slide 2; the Full Circle close (Slide 42) and the tier (now on the fee slide) follow automatically — but lean into the language of *their* pick (Protector vs Steward) all the way through. See `[[protector-steward-archetypes]]`.
- **Commit to the strategy before the vendor.** Slides 31–32 (the prize + the choice) lead the close — get the "yes, this strategy is for me" before any price or process. Don't jump to cost early.
- **Justify before you price.** Slide 42 (Full Circle) and **Gate B** ("the right hands?") do the value work right before the cost question on Slide 43 — don't skip them to get to the number faster.
- **Hold the tension** on Slides 10–13 (the threats) and 33–36 (the captains + the two wedges). **The widow's penalty (Slides 10–11) is the rate-jump permanence can't fix:** with the 2017 rates now permanent, the filing-status cliff is the cleanest place the prospect's *own* rate actually moves — slow down and hold the tension there the way you do on the captains slide.
- **The numbers are illustrative** — say it on Slides 23, 31, 32, 42, and the fee slide (44). Route updated claims through compliance.
- **The Accelerator (Slide 45) is the process, not a quote.** Never give a specific conversion size or savings figure there — the real plan is built only after the full analysis.
- **Never quote a cost-of-delay figure at the close.** The close (`data-slide="25"`) is figure-free *by design* (and so is its five-beat cue) — the conviction of the ask carries the beat, not a digit the intake may not support. If pushed for a number: "that's exactly what the planning meeting produces — what's certain is the window is open, and closing."
- **Personalize** the open (Slide 1) and the prize (Slide 31) — those two are where specificity wins or loses the room.
- **Conditional content:** Slides 10–11 are MFJ-only; the Full Circle payoff (Slide 42) swaps for single filers; the Accelerator (Slide 45) and the close (Slide 46) drop the "with your spouse" line for single filers. The onboarding-fee toggle is retired (`showFee` false), so the onboarding-structure slide and the old refundable card never render. **Gates A and B and the closing micro-gate are universal** — they render for every filing status and persona.
