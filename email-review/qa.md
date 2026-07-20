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
   6th-8th grade (mimic tools like Hemingway Editor)

#### 3. Active Voice
   Avoid passive constructions

#### 4. Specific Benefit
   Not feature - for their business

#### 5. Word Choice

   **Spam words are tiered and budgeted** - the full policy lives in `../email-copywriting/references/spam-words.md` and is enforced as a HARD checklist item in SKILL.md. Summary:
   * NEVER tier ("free", "credit card", phishing vocabulary, scam cluster) = automatic fail
   * HIGH tier (guarantee, discount, limited time, act now, click here, special offer...) = aim for zero; 2+ in one email = fail
   * MEDIUM tier (cost, price, offer, deal, opportunity, ROI, marketing, sales, money, income, earn...) = max 1-2 per email
   * Subject lines: zero tiered words, no `$`/`%`/stacked numbers
   * Count and report every spam word per email as `word (tier)`

   **Additional restrictions:**
   * `$`/`%` symbols: never in subject lines; in body, a single specific figure is fine ("$1,850 in value"), stacking figures with urgency/deal language is not
   * Avoid superlatives like "impressive," "fascinating," "revolutionary," "remarkable," "inspiring," "caught my attention," or "caught my eye"
   * No buzzwords, no AI-tell vocabulary or structures (`../email-copywriting/references/sound-human.md`)
   * **No false offer claims** - e.g. do not say "no card needed" if a card is actually required. Verify every offer claim against the client's real offer before passing it

---

### Email Formatting

#### 1. Has Personalization Variables

#### 2. Has Signature (sender first + last name, linked client company)
   Every email has the two-line signature block. Reject `{sender_signature}`. Required shape: signoff line, then `{sender_first_name} {sender_last_name} - [title] at [Client Company](best client link)`.

#### 3. Length (HARD ceiling 80 words)
   Static body per email is at most 80 words (prose + CTA, excluding the greeting, the `{{...}}` AI-variable lines, and the signature block). Over 80 = fail. Follow-ups target under 55. Punchy, not staccato.

#### 4. Mobile-Friendly
   Short lines, scannable format, lots of spaces

#### 5. 3-6 Emails In sequence

#### 6. Spell and grammar check (favor-frame aware)
   Names, companies, links, numbers, and offer claims must be perfect. Do NOT fail the copy for 1-2 deliberate casual imperfections per sequence (a lowercase start, a missing comma, shorthand like "btw"/"thats") - that's intended human voice, spec in `../email-copywriting/references/sound-human.md`. Fail only misplaced or excessive imperfections.

```

```

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
3. **Spam Testing:** Run copy through a spam checker tool
4. **Complete exercises** from Extra Info section below

### List Building QA
1. **Title Verification:** Check accuracy
2. **ICP Fit:** Random check ~50 leads
3. **Preview Testing:** Always preview before launching
4. **AI Lines Review:** Check quality and relevance

### Version Control
*   Name active versions clearly
*   Format: "Campaign 1 -> Version 2, Active"
*   Only one active version per campaign
*   For A/B tests, create separate campaigns with different active versions

Do QA every single time. It's very annoying for clients not to have proper QA.
