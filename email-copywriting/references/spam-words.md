# Spam Words & Deliverability Content Rules

Compiled 2026-07 from 25+ deliverability sources (Google/Microsoft official sender docs, Spamhaus, Al Iverson/Spam Resource, Hunter's 31M-email dataset, Mailmodo/HubSpot/ActiveCampaign/Smartlead/Instantly/Mailreach/Folderly/Woodpecker word lists). This file is the single source of truth for spam-word policy across email-copywriting and email-review.

## How to think about this (the reality)

- Filtering is **reputation-first**: authentication, domain reputation, and engagement outweigh content. Content is a distant third at Gmail/Outlook consumer filtering - but it matters more at **corporate B2B gateways** (Proofpoint, Mimecast, Barracuda) which still run SpamAssassin-style static content scoring. Our prospects sit behind those gateways, so content rules still pay.
- Filters score **clusters and density, not single words**. One flagged word in natural context is fine; three from the same cluster in one sentence, plus a "$" in the subject, is a promotional-intent pattern.
- **Subject lines are weighted heavier than body** (practitioner consensus: 2-3x), and Microsoft is the quirkiest provider - subject-level flips happen most at Outlook.
- Follow-ups inside an existing thread offend filters less than the opener.

## The budget rule (HARD)

- **NEVER tier: zero occurrences, ever.** These are hard-reject in review.
- **HIGH tier: aim for zero.** One HIGH word consumes the entire email's spam budget - only keep it when the sentence is genuinely impossible without it.
- **MEDIUM tier: max 1-2 per email, total.** Remove every one that has a natural alternative; never two from the same cluster in one sentence.
- **Subject lines: zero words from any tier**, no `$`, `%`, or stacked numbers. Subjects should read like an internal email - 1-3 plain descriptive words.
- The reviewer counts and reports spam words per email (word + tier).

## NEVER tier (hard reject)

**Operator hard bans (standing rules, regardless of filter nuance):**
- `free` - reframe: "on us", "You don't need to pay anything", "no invoice", a trial with a date
- `credit card` (incl. "no credit card required") - just describe how fast they start

**Phishing-adjacent vocabulary** (the fastest content-only route to junk - filters are tuned hardest against credential phishing):
- account suspended · verify your account / verify your identity · suspicious activity · new login detected · update required · confirm your details · action required / immediate action required · important update · official message

**Deceptive structure:**
- Fake `Re:` / `Fwd:` subject prefixes on a first touch (also a CAN-SPAM violation)

**Scam-cluster vocabulary:**
- winner / you've been selected / congratulations (as an opener) · claim your prize · this isn't spam / not a scam · dear friend · no catch / no gimmick / no strings attached · no obligation · no questions asked · $$$ · make money fast · get rich quick · double your income/money · fast cash · be your own boss · work from home · financial freedom · while you sleep · 100% guaranteed · risk-free / no risk · once in a lifetime

## HIGH tier (aim for zero; one = whole budget spent)

- **Money/pricing:** save money · save up to X% · discount · cheap · bargain · lowest/best price · X% off · money back / full refund · no hidden costs/fees · pre-approved · cents on the dollar · why pay more
- **Urgency/pressure:** act now / act fast · buy now / order now · apply now · limited time (offer) · offer expires / expires today · last chance · final notice / final call · urgent · hurry · don't miss out · while supplies last · sign up free · before it's too late · what are you waiting for
- **Overclaiming:** guarantee / guaranteed (show the guarantee instead - see gold-standard.md pattern 4) · promise · miracle · amazing / incredible / unbelievable / fantastic (as deal descriptors) · unbeatable · #1 · join millions · life-changing · revolutionary
- **Mass-mail vocabulary:** special promotion · special/exclusive offer/deal · free trial / free consultation / free gift / free quote / free sample · click here / click below · bulk email · email marketing / internet marketing / direct marketing · MLM · increase sales / increase traffic / increase your revenue (as a bare claim) · visit our website · one time mailing · click to remove
- **Income claims:** extra income / additional income · earn $X · potential earnings · instant income · get paid · passive income · investment opportunity

## MEDIUM tier (budget: max 1-2 per email)

cost · price · quote · rates · affordable · offer · deal · sale / sales · marketing · outreach · trial · promotion · opportunity · money · income · investment · credit · debt · loans · insurance · mortgage · bonus · profit(s) · ROI · revenue (in a claim) · save · proven · certified · solution · instant · only / now / today (urgency use) · subscribe / opt-in · member · performance · get · chance · return · success · earn · buy · ad · for you

Notes:
- Vertical exemption: for clients IN finance/insurance/real-estate/lending, the domain vocabulary (insurance, mortgage, loans, investment, rates) is unavoidable - do not contort sentences to dodge it; spend the budget there and keep every other tier clean.
- Concrete numbers are GOOD copy ("saves teams ~$40k/yr", "7 meetings per 10k contacts") - a single specific figure in the body is fine and persuasive. What scores is repetition of $ figures + urgency + deal language, and any `$`/`%`/number stacking in subject lines.

## Structural triggers (often stronger than any word)

- ALL CAPS words anywhere · more than one `!` per email · `!!!` / `???`
- `$`, `%`, numbers, or emoji in subject lines (one emoji in body max, only on a warmed domain)
- More than 1 link in a first touch (2 absolute max in any email); anchor text must say where the link goes; never URL shorteners (bit.ly etc. carry shared blocklist reputation)
- Image-heavy HTML, attachments on first touch, hidden text (explicit Google flag)
- Designed-looking emails: plain text structure always - heavy HTML bounces ~6.5x more (Hunter, 2.2M emails)
- Formal unsubscribe LINKS in cold email add newsletter-classification signals - use the plain-text opt-out line instead ("If this isn't relevant, just reply and I'll stop emailing")

## Safe alternatives (the reach-for list)

| Instead of | Write |
|---|---|
| free | "on us" · "You don't need to pay anything" · "no invoice on my side" |
| free trial | "a pilot" · "try it until [date], then decide" |
| no credit card required | describe speed: "you're live the same day" |
| guarantee | show it: "if we don't get you X, I'll [specific consequence]" |
| risk-free / no obligation | "you can walk away after the pilot" · "no pressure either way" |
| discount / special offer | make it concrete: "teams that start this quarter get onboarding included" |
| limited time / act now | a real named reason: "we're onboarding 3 more teams before March 1" · "each one takes real time from our team" |
| save money | name the cut: "trim QA spend by ~20%" |
| increase revenue / make money | the specific metric: "add 10-15 qualified meetings a month" |
| ROI | do their math: "pays for itself in ~3 months" |
| opportunity | name the outcome, drop the word |
| buy now / order now | "Want to try it?" · "Want me to send details?" |
| click here | descriptive link text or the raw link on its own line |
| cheap / best price | "competitive with what you're paying for [tool]" |
| 100% / #1 / superlatives | exact number + source: "40+ B2B SaaS companies, 7 meetings per 10k contacts" |
| instant | "same-day" · "live within a week" |
| exclusive | "we only run a few of these each month" (true scarcity, stated plainly) |

## What NOT to worry about (folklore)

- "book a call" / "quick call" / "demo" / "meeting" - on no evidence-based risk list; a reply-rate consideration, not deliverability.
- Single everyday-B2B words in natural context (problem, here, never, stop, sample, avoid...) - the long 400-word lists are legacy noise; only the tiers above are enforced.
- One specific dollar figure in the body of a warmed domain's email.
- A plain-text opt-out sentence - recommended, not penalized.
