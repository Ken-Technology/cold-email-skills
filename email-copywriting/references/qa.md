## QA (Quality Assurance)
### Email Copy QA Checklist
1. **AI Review:** Use this prompt to check basic requirements
```
# Cold Email Copy Review & Grading

## Overview

Please check if the cold email copy attached for the client fits these criteria. Grade each criterion from **1 to 5** and assign it a score based on how well the campaign performed. For everything that can be improved, suggest the improved with before and after.

## Format

Output your response in a table format with Criteria, Score, What's good, What's bad, What to improve (with actual improvements).

Then, at the end, output the total score.

---

## Context

* Take into account the strategy of the client

* The only goal of the email is to make prospects go to the next step in the sequence

* When AI variables are included, the email is specifically personalized based on their LinkedIn or website information

* These emails go in a reply thread, so they have context of what was previously sent

---

## Scoring Criteria

### Confusedness Score

#### 1. Clear CTA
   * Only 1 clear CTA
   * The only goal of the email is to make prospects go to the next step in the sequence. Is that happening?

#### 2. Clear ICP

#### 3. Clear Value Proposition

#### 4. At Most 1 Question

---

### Tone & Style

#### 1. Conversational Tone
   Write like you're talking to a colleague

#### 2. Reading Level
   6th-8th grade

#### 3. Active Voice
   Avoid passive constructions

#### 4. Specific Benefit
   Not feature - for their business

#### 5. Word Choice

   **Spam words are tiered and budgeted** - the full policy lives in `references/spam-words.md` and is enforced as a HARD checklist item in **email-review**. Summary:
   * NEVER tier ("free", "credit card", phishing vocabulary, scam cluster) = automatic fail
   * HIGH tier (guarantee, discount, limited time, act now, click here, special offer...) = aim for zero; 2+ in one email = fail
   * MEDIUM tier (cost, price, offer, deal, opportunity, ROI, marketing, sales, money, income, earn...) = max 1-2 per email
   * Subject lines: zero tiered words, no `$`/`%`/stacked numbers
   * Count and report every spam word per email as `word (tier)`

   **Additional restrictions:**
   * `$`/`%` symbols: never in subject lines; in body, a single specific figure is fine ("$1,850 in value"), stacking figures with urgency/deal language is not
   * Avoid superlatives like "impressive," "fascinating," "revolutionary," "remarkable," "inspiring," "caught my attention," or "caught my eye"
   * No buzzwords, no AI-tell vocabulary or structures (`references/sound-human.md`)
   * **No false offer claims** - e.g. do not say "no card needed" if a card is actually required. Verify every offer claim, price, time and metric against the client's real offer before passing it; never invent one

---

### Email Formatting

#### 1. Has Personalization Variables
   Every `{{Title Case}}` variable in the copy has a personalization prompt of the same name for this segment

#### 2. Has Signature
   Every email ends with `{sender_signature}` on its own line, or, when the sending tool has no signature variable, the two-line block: signoff line, then `{sender_first_name} {sender_last_name} - Founder at [Acme](https://acme.com)` with the client's real title and company. In the two-line block the linked company name is the email's one link (default root domain homepage; deep link OK when it fits), plain only in an email whose CTA carries the one link. Reject a hard-coded sender name or a missing signature.

#### 3. Length (word bands)
   Static body (prose + CTA, excluding the greeting, the `{{...}}` AI-variable lines, and the signature block): Email 1 50-80 words, follow-ups 30-60. Over the band = fail, except one value-stack email per sequence (~100 words as a numbered list of real numbers). Punchy, not staccato. Separately, the lint counts the whole body (greeting through signature and PS) and needs 40-180 words.

#### 4. Mobile-Friendly
   Short lines, scannable format, lots of spaces

#### 5. 2-6 Emails in the sequence (default 3)

#### 6. Spell and grammar check (favor-frame aware)
   Names, companies, links, numbers, and offer claims must be perfect. Do NOT fail the copy for 1-2 deliberate casual imperfections per sequence (a lowercase start, a missing comma, shorthand like "btw"/"thats") - that's intended human voice, spec in `references/sound-human.md`. Fail only misplaced or excessive imperfections.

## Questions to Ask Yourself

These are some questions to check the email copy with.

*Assume you are a cold prospect that receives this cold email.*

## Format

Output your response in a table format with Question, Result (Pass or No Pass), Why this answer, What to improve (with actual improvements). Only output What to Improve if the Result is No Pass and the copywriter actually needs to improve something.

### Clarity & Understanding

* **Can a 12-year-old understand this?** If not, simplify the language
  * *Exception: If the ICP would totally understand it*

* **What's the ONE thing I want them to do?** Is it crystal clear?
  * *This rule applies per email. Each email can have a different ONE thing*

* **Would I understand this if I knew nothing about my company?**

* **Does the copy flow nicely from line to line and from email to email?**

* **Am I using jargon or industry terms they might not know?**
  * *Exception: If the industry terms are something that 80%+ of the ICP would understand*

### Recipient Focus

* **Why should THEY care about this?** (Not why you care)

* **What problem am I solving for them specifically?**

* **How does this make their life easier/better/more profitable?**

* **Am I talking about them more than about me/my company?**

### Credibility & Trust

* **Why should they believe me?** Do I have proof?

* **Would I respond to this email if I received it?**

* **Does this sound like every other sales email they get?**

* **Am I making claims I can back up?**

### Emotional Impact

* **What emotion am I triggering?** (Curiosity, urgency, FOMO, relief)

* **Does this create a "pattern interrupt" or blend into their inbox?**

* **Would this make them think "finally, someone gets it"?**

### Technical Execution

* **Is this scannable in 10 seconds?** Most people won't read deeply

* **Is my CTA so easy a caveman could do it?**

* **Would this look good on mobile?**

---

## The Ultimate Test

**If I were them, would I do the next step (click/reply) or delete?**

*Be brutally honest.*

```


2. **Strategy Alignment:** Does copy follow the laid-out strategy?
3. **Spam Word Count:** Count every spam word per email against `references/spam-words.md` and report it as `word (tier)`
4. **First lines:** Run the four first-line checks and the bridge rule below on every static opener and on 3-5 filled samples
5. **Complete exercises** from `references/extra-info.md`

### First lines: failure-to-fix pairs

A first line holds one fact the reader could verify on their own site in ten seconds. Persuasion belongs in the body. The four checks (a specific, checkable fact; no first person; no praise or reaction; no hedging) and the 8-20 word length are in **email-review**. When a line fails, subtract the opinion and keep the fact. Teach and report with pairs like these, never with a long list of passing lines: later batches fail words earlier batches let through ("unique", "seamlessly", "recently", "aligns with").

| Failure | Example | Fix |
|---|---|---|
| Praise | "Your impressive client roster stands out." | Name them: "Your client roster includes Nike and Adobe." |
| First-person pitch | "Your culture aligns with my approach to hiring." | Describe their process only: "Every hire at Acme ships code in week one." |
| Reaction | "Your new store launch caught my attention." | Delete the reaction; keep the fact: "Acme opened its fourth store, in Leeds, in March." |
| Hedging | "Acme appears to specialize in dental clinics." | State it: "Acme builds booking systems for 300 dental clinics." |
| Speculation | "Pricing is likely a key factor for your buyers." | Claim only what the source supports, or leave the line blank |
| Buzzword | "Your innovative wearables platform..." | Say what it does: "Your ring tracks sleep and heart rate overnight." |
| Filler | "You recently launched a new ERP integration now." | Cut "recently" and the trailing "now"; name the ERP |

Quick self-check before you pass a line: could a stranger verify the claim from the company site or LinkedIn? Does the sentence still stand with every adjective removed? Is the sender mentioned anywhere (rewrite if so)? Is the line in the prospect's language (an English line built from a non-English page reads as a translation)?

**Batch signal.** Report how many samples pass. Pass rates of 30-75% are normal across models and verticals; under about 40%, the prompt needs tighter anchoring on concrete facts before it needs more banned words. A blank line where the source had nothing specific is correct, never a reason to force one.

### The bridge: examples

The opener is only the sentence before the first static sentence, and that sentence must follow from it. A true, specific line can still fail here.

- Pass: the site shows a hosting placeholder page, and the next sentence offers a small replacement site.
- Fail: a studio with a complete gallery and booking site, pitched "a small first page". The fact is true and the offer reads blind.
- Fail: a long-established multi-location brand pitched a starter package. Route it to another tier or skip it.
- Fail: a line that lists products ("offers X, Y and Z") or starts with "<Company> provides": brochure copy that sets up nothing.
- Wrong buyer, not wrong bridge: a company that sells the same service as the sender, or an in-house employee at an unrelated firm. That is a qualification fix.

### List Building QA
1. **Title Verification:** Check accuracy
2. **ICP Fit:** Random check ~50 leads of the segment's list (the CSV or your list tool)
3. **Preview Testing:** Merge a few real leads into the copy (the sending tool's preview, or by hand from the CSV) and check that every variable fills
4. **AI Lines Review:** Check quality and relevance with the first-line checks above

### Version Control
*   `emails.md` is the draft and `emails_v2.md` the reviewed copy; keep both. Fixes to a sequence that is already sending replace its steps in the sending tool
*   Variants (A-D) of a step are A/B arms that send to prospects. Add one only for an A/B test the user asked for, never to hold review fixes

Do QA every single time. It's very annoying for clients not to have proper QA.
