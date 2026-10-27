---
name: email-copywriting
description: "Write the cold emails for a segment: subject lines, hooks, body, CTAs, signatures and personalization placeholders, following hard copy rules. Use when drafting or rewriting a cold-email sequence. Triggers on \"write the emails\", \"draft the sequence\", \"rewrite this cold email\"."
---

# How to write copy

Write the cold email sequence for one campaign segment: 2-6 steps (default 3), following the segment's angle, each step's purpose and its wait days. The copy must pass the lint contract below and the **email-review** checklist. In a conversation, draft in chat, get approval, then write it to the segment's `emails.md`. When a caller (the **create-campaign** workflow) hands you the plan and segment and saves the result itself, write the copy and return it.

You only write files. Sending, test sends and launch happen in the user's own sending tool (Instantly, Smartlead, Outreach, Apollo or any other), after a person approves the reviewed copy.

## Where this fits

This skill runs once per segment, `0 - default` included, inside the **create-campaign** workflow:

1. **campaign-strategy** - sequence blueprint and AI-variable definitions in the segment's `strategy.md`.
2. **email-copywriting** (this skill) - writes the sequence to the segment's `emails.md`.
3. **email-review** - scores the copy against the same rules and the lint; on pass, writes the fixed copy to `emails_v2.md`.
4. **prompt-writer** - writes the AI-variable prompts and the rewriting prompt to `prompts.md` and tests them on sample prospects.

On an **email-review** fail, leave `emails_v2.md` unwritten and rewrite `emails.md` with the review's instructions.

The campaign folder:

```
./cold-email/{slug}/
├── research.md          # client research: ICP, value prop, proof, voice
├── notes.md             # optional client preferences (they win over generic rules)
├── plan.md              # H1 = campaign name; 1 ICP + 1 offer + N segments
├── segmentation.md
├── 0 - default/
│   ├── strategy.md      # from campaign-strategy
│   ├── emails.md        # THIS skill's draft
│   ├── emails_v2.md     # reviewed copy from email-review
│   └── prompts.md       # from prompt-writer
└── 1 - {segment-slug}/
```

## Inputs

- **Campaign folder:** `./cold-email/{slug}/` and the segment's folder in it (`1 - {segment-slug}/`, or `0 - default/`). Ask when the user has more than one campaign.
- **Offer, ICP, proof, voice:** `research.md` in the campaign folder, `notes.md` when it exists, and the company files from **knowledge-setup** when the user keeps them, plus any research the user provides. Every claim must be checkable against it.
- **Segment:** name, angle, step purposes and wait days, from `plan.md` and the segment's `strategy.md`.
- **Strategy:** the segment's `strategy.md` (the `## Strategy - <segment name>` section from **campaign-strategy**). Without one, run **campaign-strategy** first. A Voice Card from an earlier draft sits in the `## Notes` section of the segment's `emails.md`.
- **AI-variable names:** if the segment already has a `prompts.md`, use its `###` headings exactly. Otherwise the strategy's AI-variable list is authoritative.
- **Priority:** feedback in this conversation > client notes > campaign strategy > the generic rules below.

## Lint contract (HARD - check every email)

Check every email against this list before you write the file; fix a failing email first. **email-review** uses the same list as its checklist and rejects any failure.

1. **Lead variables are single-brace `{name}` and must be one of these 38:**
   `firstName, lastName, fullName, name, company, companyName, companyDomain, title, role, location, city, state, country, headline, industry, linkedInUrl, linkedinUrl, profileUrl, website, email, summary, lastJobTitle, lastJobDescription, employmentType, employmentLocation, skills, education, companyLinkedInUrl, companyEmployeeCount, companyEmployeeCountRange, companySpecialities, companyLocation, companyDescription, companyCrunchbaseUrl, companyTechnologies, sender_signature, sender_first_name, sender_last_name`
   Anything else in single braces (`{first_name}`, `{company_name}`, `{job_title}`) fails. Passing the lint is not the same as working: in copy, stick to `{firstName}`, `{lastName}`, `{company}`, `{companyDomain}` and `{title}`. Several listed names, including the aliases (`{name}`, `{companyName}`, `{role}`, ...), are legacy names sending tools do not map, and others often render blank at send. Details: [`references/lead-variables.md`](references/lead-variables.md).
2. **Spintax is balanced:** `{option a|option b}` - every `{` closes, at least two non-empty options, no nesting. Do not write spintax at all: sending tools read `{a|b}` as a lead variable with an inline fallback. The only legitimate `{x|y}` is a listed lead variable with a short plain fallback, such as `{firstName|there}`.
3. **No em-dashes** (and no en-dashes) anywhere in subject or body. Use the simple keyboard dash `-`.
4. **Subject is 1-60 characters** on every step, follow-ups included.
5. **Body is 40-180 words**, counted on the whole body (greeting through signature and PS). The editorial bands below (Email 1 50-80 static words, follow-ups 30-60) are stricter at the top; at the bottom, count the whole body: the greeting and a `{sender_signature}` line add only about 3 words, so a close under about 37 static words with no PS fails.
6. **At most 1 link per email**, counting raw URLs, markdown links and a linked company name in the signature.
7. **No unresolved placeholders:** no square-bracket stand-ins (`[Company]`, `[Name]`, `[First Line]`), no `TODO` / `TBD`, and no double-brace token other than a declared `{{Title Case}}` AI variable. Never write a tracking token: put the real URL in a markdown link, and the sending tool adds click tracking.

## Variables

| Type | Syntax | Examples |
|------|--------|----------|
| Lead variable | `{camelCase}` single braces, from the list above | `{firstName}`, `{company}`, `{title}` |
| AI variable | `{{Title Case}}` double braces | `{{Subject Line}}`, `{{First Line}}`, `{{PS Line}}`, `{{Final PS Line}}` |
| Signature | `{sender_signature}` on its own line | every email, after the CTA |
| Sender | `{sender_first_name}` / `{sender_last_name}` | only in the two-line signature alternative |
| Link | markdown link on plain words, `https` only | the sending tool may wrap it for click tracking |

- **AI variables** use Title Case names (max 30 characters), uppercase-first, exactly as declared. No square brackets, no lowercase or snake_case spellings, no alternate spellings (`{{Subject line}}`). This is the form personalization tools and LLMs resolve.
- **Links** are markdown links on a few plain words (`[Acme](https://acme.com)`, `[grab a spot](https://acme.com/pilot)`), never a bare URL and never link text that reads like a web address: click tracking sends every link through a tracking domain, and a visible host that does not match it reads as phishing.
- **One AI variable = one value per LEAD, not per email.** Personalization runs one prompt per lead and fills one value; the same token in Emails 1-3 sends the identical sentence three times. An email that needs its own opener gets its own name (`{{First Line}}`, `{{Bump First Line}}`, `{{Nudge First Line}}`). Reuse is intentional only for `{{Subject Line}}` on every step.
- **Default AI-variable layout:** Email 1 carries `{{First Line}}` and `{{PS Line}}`; the last email may carry `{{Final PS Line}}`; middle emails carry no AI-variable lines unless the strategy asks. Never an opener and a PS on every email - over-personalization is the top operator complaint.
- **Every AI variable in the copy needs a matching prompt**: a `###` heading of the same name in the segment's `prompts.md` (**prompt-writer** writes them, one per variable). `{{Subject Line}}` needs one too.

## Execution tasks

### Task 1: Load context
- [ ] Offer, ICP, proof points and client notes (Inputs above)
- [ ] Segment angle, step purposes, wait days, AI-variable names
- [ ] Read [`references/gold-standard.md`](references/gold-standard.md) - the 9/10 bar and 12 patterns
- [ ] Skim [`references/spam-words.md`](references/spam-words.md), [`references/sound-human.md`](references/sound-human.md) and [`references/copy-craft.md`](references/copy-craft.md)
- [ ] Tactics while drafting: [`references/email-copywriting-tactics.md`](references/email-copywriting-tactics.md)

### Task 2: Check for A/B tests
- [ ] Look for `### Sequence Tests` in the segment's strategy (`## Strategy - <segment name>`): which emails get variants and what varies. When the caller asks for one body per step, write no variants.

### Task 3: Draft
- [ ] Write the offer as ONE plain sentence (deliverable + who + what they get). That is the spine of Email 1. If you can't write it, go back to the research.
- [ ] Write the 6-line ICP Voice Card ([`references/sound-human.md`](references/sound-human.md))
- [ ] Draft the sequence in the Voice Card's language, following the blueprint; insert AI variables where specified
- [ ] Run the list test + favor test on every email; reject your own draft if it reads like a marketing email
- [ ] Run the so-what chain on the main claim and quantify the pain with real numbers when you have them ([`references/copy-craft.md`](references/copy-craft.md))
- [ ] Go line by line: rewrite any sentence that cannot start with them, their team, their initiative, or a specific observation
- [ ] Run the compression test, the spam-word budget count, the AI-tell scan, the event-claim check, then the lint contract on every email
- [ ] Read the draft as a cold prospect with the self-review questions in [`references/qa.md`](references/qa.md) and the exercises in [`references/extra-info.md`](references/extra-info.md); fix what fails before you show it

### Task 4: Approval (conversation only)
- [ ] Show the full sequence in chat, each email with its static word count; revise until the user explicitly approves. No file write before approval.

### Task 5: Write `emails.md` (after approval) - see Write the file below

## Principles

### The one-on-one favor mindset (read first)
AI personalization renders every email as a note to one person, so write it as one: a human typing to another human because they found something that helps them.
- **Do them a favor, don't ask for one.** Show up with the thing; don't ask for their time.
- A marketing email talks about the sender ("we do X"). A one-on-one note talks about the reader: their situation, what they get, what happens next. If most sentences start with "we", rewrite.
- **The list test:** if the email could go to 500 people unchanged and read the same, it's a marketing email.

### What matters
Copy is more about **what you say** than how you say it: who you target (ICP), what you tell them (value prop, pain), what you offer, and what happens next (CTA). Pick the best combination; don't fixate on wording.
- Write emails you would want to receive. Would you reply to this?
- Write like you talk, like an excited teammate explaining a cool idea to a smart, skeptical friend. No sales patterns.
- Make it interesting: long interesting > short interesting > short boring > long boring.
- Keep it simple: write for the 90% reader, one idea and one CTA per email, easy to act on.

## Critical copy rules

### The 9/10 standard (read first)
The default AI draft is a 6-7/10. The gap is closed by compression, not polish: **lay out the best value proposition and use case in as few words as possible.**
- **The offer fits in one breath** ("We'll send 3,000 personalized emails to your ideal clients on us").
- **Concrete nouns and numbers do the selling.** Adjectives must carry information ("qualified", "personalized"); zero hype.
- **Mechanism in verbs:** "We write the copy, build the list, handle everything", never "end-to-end done-for-you solution".
- **Compression test:** could the prospect repeat the offer to a colleague after one skim? Delete each sentence; if nothing breaks, it was dead weight.
- **Show, don't claim.** Risk reversal is a specific consequence, not the word "guarantee". Scarcity is a plain true reason, not "limited spots".

### Transitions (CRITICAL)
- When an email opens with `{{First Line}}`, the first static sentence **must continue that thought**. Jumping from a personalized line to a generic statement ("Scaling a SaaS company...") reads like two emails stitched together - a top failure mode.
- Design the `{{First Line}}` prompt to end on a bridge the static body completes.

### Greetings (every email)
- Every email, follow-ups included, opens with a greeting and an empty line. Email 1: `Hey {firstName},`. Follow-ups: `Hey {firstName},` or the bare `{firstName},`.

### Spam words and false claims (budgeted - HARD)
Full tiers, structural triggers and safe alternatives: [`references/spam-words.md`](references/spam-words.md). Apply while drafting.
- **NEVER tier = zero:** "free", "credit card", phishing vocabulary, fake `Re:`/`Fwd:`, the scam cluster (winner, no obligation, risk-free, 100% guaranteed...).
- **HIGH tier = aim for zero** (guarantee, discount, limited time, act now, click here...): one spends the email's whole budget.
- **MEDIUM tier = max 1-2 per email** (cost, price, offer, deal, opportunity, ROI...); never two from one cluster in a sentence.
- **Subjects: zero spam words, no `$` / `%` / stacked numbers.**
- **Never make an offer claim that is not true.** No "no card needed" when a card is required; no implied unlimited trial. Never invent a price, a time, an offer, a case study or a metric: each one comes from the client's research and notes, or it stays out.

### Voice: the ICP's language (MANDATORY)
- Write a **6-line ICP Voice Card** before drafting (spec in [`references/sound-human.md`](references/sound-human.md)): who reads it, 5-8 terms they use daily, 3-5 outsider phrases, peer formality, sender persona, the proof they believe. A founder voice profile in client notes overrides the generic persona.
- Re-voice per segment: if two segments differ only by an industry-noun swap, the card wasn't used.

### Sound human (HARD)
Lexicon, structures and techniques: [`references/sound-human.md`](references/sound-human.md).
- **Zero AI-tell vocabulary** (delve, leverage, streamline, seamless, robust, unlock, elevate, journey, landscape, game-changer, tailored solution...) and **zero dead phrases** ("I hope this email finds you well", "I came across", "I couldn't help but notice", "As a [title], you know...", "Let's dive in").
- **No AI-tell structures:** "It's not just X, it's Y", tidy triads, same-length sentences, "serves as"/"boasts", hedge chains.
- **Do the human things:** contractions, jagged rhythm, plain first-person verbs, one personality flourish per email max, the read-aloud test.
- **Imperfection is allowed:** 1-2 small deliberate ones per sequence (a lowercase start, "btw") - never in names, companies, links, numbers or claims.

### Start with them
Outreach dies when every sentence starts with "I". "I wanted to", "I think" and "I was reaching out" are autobiography - rewrite them into an observation about the reader. The offer line may start with "I" or "we" once, when it names what you will do for them.

### Brevity and punch (HARD - the #1 recurring failure)
- **The first draft is always too long.** Assume you are 30%+ over and cut harder than feels natural.
- **Word bands** (static body = prose + CTA; not the greeting, AI-variable lines, or signature): **Email 1 50-80 words** (gold standard ~72); **follow-ups 30-60 words**. Email-review checks these bands; the value-stack email below is the only one allowed past them.
- **Value-stack exception:** ONE email per sequence may reach ~100 words if the overage is a numbered stack where every line carries a real number.
- A static PS is excluded from the count but capped at ~35 words, in at most 1-2 emails.
- Run a mandatory "cut 30%" pass, then count. AI variables add 1-2 sentences per lead on top, so the rendered email is longer than what you count.
- **Punchy, not staccato:** lean and direct, but full thoughts grouped into one or two short paragraphs plus the CTA. One-sentence-per-line fragments read jittery and AI-generated.

### Event claims (HARD)
- Static copy never names an event about the prospect (raised a round, hiring, a new role, a launch, an acquisition) unless the segment's filters source that event for every lead. Otherwise the event belongs in an AI variable that checks it per lead. **email-review** rejects an unsourced event claim.
- **A funding round is not a buying event.** Write to the plan the money pays for (the hires, the market, the launch), never "congrats on the raise".

### Signature (sender variables - HARD)
- Every email signs off with `{sender_signature}` on its own line after the CTA, never a hard-coded name. The sending tool swaps it for the sending inbox's own signature, so sender identity can vary per inbox. Map it to your tool's signature tag, or delete the line when the tool appends the inbox signature by itself.
- When the user's sending tool has no signature, write a two-line block with sender variables instead:
  ```
  Best,
  {sender_first_name} {sender_last_name} - Founder at [Client Company](https://client-site.example)
  ```
  Signoff by reader: `Best regards,` for enterprise, finance and legal; `Best,` or `Cheers,` for SaaS and technical buyers; `Cheers,` for startups and creative teams (`Regards,` also works). The title, company name and URL are literal client values from context. `{sender_first_name}` / `{sender_last_name}` resolve to the sending mailbox at launch.
- **Company name as a link:** in the two-line block, link the client company to its root domain (deep link when it fits better). That link is the email's one link. In an email whose CTA needs a link, write the company name plain so the email still has exactly one link.
- Placement: after the CTA. A PS variable goes on its own line after the signature. No taglines, phone numbers, proof lines, or extra sender variables.

### Sequence length
Default to 3 emails. Go beyond 3 only when each extra email carries a distinct, worth-sending idea.

### Subject lines
- Put `{{Subject Line}}` on **every step**, follow-ups included. One value per lead threads the sequence, and every step needs a subject for the lint.
- Static subjects only when the strategy specifies them or you test a static alternative. Static subjects stay under 6 words, ideally 3-4.

### Language to avoid
- "Quick followup", "quick question", "touching base", "Quick insight:"
- "No worries if timing isn't right" or any apologetic language
- Sales cliches; any AI-tell word, phrase or structure
- Keyword-trigger CTAs ("Reply 'X' and I'll send Y")
- **Final-email endings (HARD):** the last email never announces itself. Banned: "Last note from me", "Last email", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", "One last try". It earns its open with a real idea and closes on the offer CTA.

### Formatting
- Plain text; short paragraphs (1-3 sentences) with spacing; never ALL CAPS.
- Bullets as simple dashes, numbered items typed as 1, 2, 3. No markdown except links.
- No calendar link in Email 1.

### First email
- Mention the solution, not just the problem; state the problem and offer the solution together. State the UVP clearly. Don't ask if they have the problem.

### Pain point testing
- The first pain you reach for is rarely the winner. Propose several candidates and test them as Email 1 variants; note which pain each variant leads with.

### CTA requirements (HARD)
- **Every email's CTA asks for the actual offer**, including Email 1, which carries the strongest version.
- **Diagnostic questions are not CTAs:** "Do you have a system for X?", "Where do your clients come from?", "Is it worth a look?", "a quick look", "Curious if...?", "Worth exploring...?".
- Direct and specific: "Want me to walk you through how it works?", "Open to a quick walkthrough?". For SaaS calls, a "strategy call".
- Yes/no or either/or only. No time commitments ("15 min") in the CTA line; when the length matters, say it in the body before the CTA. Never "Should I close the loop?"; use "Reply if you'd like me to stop emailing".
- Preferred pattern: a short question with the link on its own line, on a short phrase ("Do you want to apply?" then `[Apply here](https://...)`). That link is the email's one link.

### Rhetorical questions
Answer a rhetorical question in the very next sentence. Never leave the prospect hanging.

### Offer strategy (mid-market)
Sell the product, not audits or "friction analysis". An analysis can be proof or a demo, never the primary offer.

### Case study relevance
Match proof to the prospect's vertical (no consumer brands for B2B SaaS). If no relevant case study exists, use a metric without the company name.

## Variants and step names

- Each email has a short descriptive title; it becomes the step `name`: `Offer`, `Bump`, `Case Study`, `Final Nudge` - never `Step 1`.
- Variant labels: `Variant A (With PS)`, `Variant B (No PS)` - always the word `Variant`, never `Version`. Step name = `{title}` or `{title} - {variant desc}`, **25 characters max** (`Offer - With PS`, `Bump - Short`).
- Variants A-D share one step and its wait days. Every variant is a prospect-facing arm that sends, so write variants only when the strategy defines a test. Test the offer variable (metric, angle, guarantee, pain), not wording. Variants are fine on follow-ups too.
- Unaffected emails stay single-variant. Add short test notes: metric, hypothesis, difference.
- Chat draft layout: `## Email N: {title}`, `### Variant A (desc)` when testing, then `**Subject**:`, body, signature, optional PS. Example sequences: [`references/gold-standard.md`](references/gold-standard.md); funnel-type techniques: [`references/copywriting-guide.md`](references/copywriting-guide.md).

## Write the file (after approval)

Write the approved sequence to `{segment folder}/emails.md`, replacing the file when it exists. **email-review** reads it and writes the reviewed copy to `emails_v2.md`; the user moves `emails_v2.md` into their sending tool. Keep the shape fixed, so a person or a script can map it onto any sending tool's steps:

- `# {Client} - {Segment Name} Emails` as the H1.
- `## Email N: {Title}` per step, then `**Wait:** N days` (Email 1 is 0; each follow-up counts the days before it sends, from the strategy). The title is the step name in the sending tool, 25 characters max.
- `### Variant A ({desc})` / `### Variant B ({desc})` only on tested emails: always the word `Variant`, letters A-D, the description names what differs (`With PS`, `Short Body`).
- `**Subject**:` on its own line, then `**Body**:` and the body in a fenced `text` block, exactly as it should send: greeting, body, CTA, signature, PS line.
- Lead variables `{camelCase}`, AI variables `{{Title Case}}`, links as markdown links on plain words. No tracking tokens, no HTML.
- End the file with `## Notes`: the ICP Voice Card, the test notes (metric, hypothesis, difference) and anything the reviewer must know. Nothing after an email belongs to it once `## Notes` starts.

````markdown
# Acme - Series A Eng Leaders Emails

## Email 1: Offer
**Wait:** 0 days

**Subject**: {{Subject Line}}

**Body**:
```text
Hey {firstName},

{{First Line}}

<body, offer and CTA>

{sender_signature}

{{PS Line}}
```

## Email 2: Case Study
**Wait:** 3 days

### Variant A (Metric)
...

## Notes

### ICP Voice Card
...
````

Then confirm: "Sequence saved to `{segment folder}/emails.md` (N emails, word counts per email). Next: run **email-review** for this segment."

## Edit mode

When asked to improve an existing sequence (`mode: "edit"`, analytics or feedback):
1. On a client's campaign that is already sending, a sequence change needs a yes that names that client, with its source (who said it, where, when). Without it, draft the change and stop there.
2. Read the segment's `emails_v2.md` (or `emails.md` when there is no reviewed copy yet), or the copy the user pastes from their sending tool.
3. Change only the scope asked (one subject, one body, all subjects, all CTAs, tone, full rewrite). Keep AI-variable names, wait days, step order and variants unless the instruction changes them.
4. Show a before/after diff with a one-line rationale per change and wait for approval.
5. Write the approved changes to `emails.md` and run **email-review** on it, so `emails_v2.md` holds the new reviewed copy. Add a dated line to `improvement-log.md` in the campaign folder: what changed and why. The user then replaces the steps in their sending tool.
- Analytics context: use the `sequence_stats`, `weak_spots` and `sibling_comparison` fields of the caller's improvement context, judged on replies and positive replies (never opens). Check reply classification before blaming the copy. Feedback context: match the fix to the complaint ("too pushy" means softer).

## Recruiting campaigns

A recruiting campaign writes to candidates about one role; take the role (title, company, place, remote policy, pay range) from the user or the plan. The lint contract, the variables and the principles above all hold, with these changes:

- You write as a recruiter to one person about one job. Open with why people like them fit (the segment's angle) and say the role in plain words: title, company, place and remote policy, and the pay range when the role gives one. Never invent pay, perks or a team size.
- The ask is small: a reply, or a 15 minute call. Never a demo, a trial or pricing.
- Never mention or guess age, gender, race, religion, disability, family status or nationality, and never say they look open to work or unhappy where they are. Name an event about the candidate (a promotion, a new job) only when the segment sources it, like any event claim.
- LinkedIn goes first, email second, unless the plan names one channel. The candidate gets a connection request with a note, then a message (InMail when they did not connect), and email only when LinkedIn did not reach them. Every email must read well to someone who never saw the LinkedIn messages: never write "as I said on LinkedIn". An email-only plan writes the emails and no LinkedIn texts; a LinkedIn-only plan writes the LinkedIn texts and no emails.
- LinkedIn texts: the note is at most 275 characters with no link; the message is at most 1,900 characters; the InMail subject is 1 to 200 characters. Most LinkedIn tools fill only the first name, last name and company, so keep to `{firstName}`, `{lastName}` and `{company}`, each with an optional fallback such as `{firstName|there}`. Never put an AI variable in LinkedIn text.
- Write each segment's LinkedIn texts under `## LinkedIn` in its `emails.md`, before `## Notes`: step 1 a connection request with the note, step 2 a message three days later with the InMail subject. The user loads them into their LinkedIn tool.

## Resources

- [`references/email-copywriting-tactics.md`](references/email-copywriting-tactics.md) - hooks, body, CTAs, signatures, PS lines
- [`references/copy-craft.md`](references/copy-craft.md) - headlines, openers, start-with-them, pain math, so-what chain, proof lines
- [`references/gold-standard.md`](references/gold-standard.md) - the 9/10 bar, exemplar campaigns, 12 patterns
- [`references/spam-words.md`](references/spam-words.md) - NEVER/HIGH/MEDIUM budget, structural triggers, alternatives
- [`references/sound-human.md`](references/sound-human.md) - AI-tell lexicon, human-voice techniques, ICP Voice Card
- [`references/lead-variables.md`](references/lead-variables.md) - every lead and sender variable, which are safe in copy, fallbacks, common mistakes
- [`references/ai-variables-guide.md`](references/ai-variables-guide.md) - AI variable types, the data each one may use, fallbacks, depth levels
- [`references/qa.md`](references/qa.md) - scoring criteria, self-review questions, first-line failure-to-fix pairs
- [`references/extra-info.md`](references/extra-info.md) - exercises, writing tips, common mistakes
- [`references/copywriting-guide.md`](references/copywriting-guide.md) - funnel types (click, reply, story) with word ranges and tone

AI-variable prompts belong to **prompt-writer**; sequence blueprints to **campaign-strategy**; scoring to **email-review**.
