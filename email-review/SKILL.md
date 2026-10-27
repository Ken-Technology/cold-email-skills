---
name: email-review
description: Review cold-email copy against hard rules, score it 1-5 and list every fix, iterating until it clears 4.5. Use after drafting a sequence and before sending it. Triggers on "review my cold email", "score this sequence", "check this copy".
---

# Email Review Skill

Review a segment's `emails.md` against the lint contract, the critical copy rules, the QA checklists and client preferences. Score it 1-5. **Pass = score >= 4.5 and zero HARD/REJECT violations.** On pass, write the fixed copy to `emails_v2.md` in the segment folder. On fail, write nothing and hand revision instructions back to **email-copywriting**. When you review your own fresh draft (self-review before handing copy back), apply the same checklist and fix every violation before returning the copy.

Loop with **email-copywriting** until the copy passes, at most 3 rounds; after the third failed round, show the last review and let the user decide (accept the open issues, or change the strategy). You only read and write files: sending and launch happen in the user's own tools.

## Inputs

- **Segment folder:** `./cold-email/{slug}/{n} - {segment-slug}/` (`0 - default/` for the Default segment). Ask when the user has more than one.
- **The copy:** the segment's `emails.md` from **email-copywriting**, or a draft the user pastes.
- **The offer and ICP to check claims against:** `research.md` in the campaign folder, `notes.md` when it exists, and the company files from **knowledge-setup** when the user keeps them, plus any research the user provides.
- **Strategy and ICP Voice Card:** the segment's `strategy.md`, and the Voice Card in the `## Notes` section of `emails.md`. Priority order is under Priority and scope.
- **The segment's AI variables:** the `###` headings of the segment's `prompts.md` when **prompt-writer** has run; otherwise the AI variable list in `strategy.md`.

## Reference material

- [`references/qa.md`](references/qa.md) - QA checklists, scoring criteria, self-review questions, first-line failure-to-fix pairs
- [`references/extra-info.md`](references/extra-info.md) - exercises, tips, common mistakes
- [`references/gold-standard.md`](references/gold-standard.md) - the 9/10 bar
- [`references/spam-words.md`](references/spam-words.md) - NEVER/HIGH/MEDIUM tiers, budget rule, safe alternatives
- [`references/sound-human.md`](references/sound-human.md) - AI-tell lexicon and structures, Voice Card spec
- [`references/copy-craft.md`](references/copy-craft.md) - start-with-them, pain math, so-what chain, proof lines
- [`references/review-template.md`](references/review-template.md) - review layout for a conversation
- [`references/lead-variables.md`](references/lead-variables.md) - every lead variable, which ones are safe in copy, the signature and fallbacks

## Checklist 1: Lint contract (HARD - the same list email-copywriting checks)

Any lint failure is a REJECT. Check each email:
- [ ] **Variables:** every single-brace `{name}` is one of the 38 allowed lead variables listed in [`references/lead-variables.md`](references/lead-variables.md) (`firstName`, `company`, `title`, ... `sender_first_name`, `sender_last_name`, `sender_signature`). `{first_name}`, `{company_name}`, `{job_title}` fail. Then REJECT names that pass the lint but sending tools do not map (`{companyName}`, `{role}`, `{name}`, `{website}`, `{city}`, `{state}`, `{country}`, `{lastJobTitle}`, `{skills}`, `{education}`, ...) and FLAG names that render blank at send (`{fullName}`, `{industry}`, `{location}`, `{headline}`, ...); the full split is in that reference. Safe in copy: `{firstName}`, `{lastName}`, `{company}`, `{companyDomain}`, `{title}`.
- [ ] **Spintax balanced:** `{option a|option b}` - every brace closes, two or more non-empty options. Also REJECT any spintax that passes: sending tools read `{a|b}` as a lead variable with a fallback. Only a listed lead variable with a plain fallback (`{firstName|there}`) may use `|`.
- [ ] **No em-dashes** in subject or body (simple `-` only).
- [ ] **Subject 1-60 characters** on every step, follow-ups included (`{{Subject Line}}` is fine).
- [ ] **Body 40-180 words**, counted on the whole body (greeting through signature and PS).
- [ ] **At most 1 link per email**, counting raw URLs, markdown links, `<a>` tags, tracking tokens and the signature company link.
- [ ] **No unresolved placeholders:** no `[Company]` / `[Name]` / `[First Line]` square brackets, no `TODO` / `TBD`, no double-brace token other than a declared `{{Title Case}}` AI variable (a tracking token is a REJECT: the copy carries real URLs).
- [ ] **No unsourced events:** the static copy names no event about the prospect (a raise, a hire, a launch, a promotion) unless the segment itself is defined by it; a per-lead event belongs in an AI variable. A funding round is not a buying event: write to what the money pays for, never "congrats on the raise".

## Checklist 2: Critical copy rules

#### First lines and the bridge (CRITICAL - top failure mode)
Run the four checks on every static opener, and on 3-5 filled `{{First Line}}` samples when they exist: **prompt-writer**'s test outputs on sample prospects, or lines the user ran in their own tool. Without samples, check the strategy's First Line description against the same four checks and say no samples were checked.
- [ ] **(a) Specific, checkable fact:** named people or customers, years, counts, places, product mechanisms. A stranger could verify it on the company site or LinkedIn in ten seconds.
- [ ] **(b) No first person:** no I, me, my, we, our, us; no "aligns with my interest" or "aligns with our expertise".
- [ ] **(c) No praise or reaction:** no impressive, unique, innovative, beautiful, remarkable, game-changer, "caught my attention", "came across", "impressed me".
- [ ] **(d) Certainty:** no hedging (appears to, seems, likely, apparently, suggests).
- [ ] **Length:** 8-20 words, aim for 12-16.
- [ ] **Bridge:** the first static sentence continues the opener's thought, and the opener gives the offer a reason to exist. FLAG any jump to a generic statement ("Scaling a SaaS company...") and any true fact the offer ignores (a complete booking site pitched a booking page).

A static opener that fails (a)-(d) is a REJECT. A failing sample is fixed in its variable's prompt (prompt-writer), not in the copy: report it as a failure-to-fix pair (subtract the opinion, keep the fact; pairs in [`references/qa.md`](references/qa.md)) and say how many samples passed. A blank sample is right when the source had no specific detail. Separate a wrong buyer (qualification) from a wrong bridge (copy).

#### Language to avoid (REJECT)
- [ ] No "Quick followup", "quick question", "touching base", "Quick insight:", apologetic lines ("No worries if timing isn't right"), cold-email cliches.
- [ ] **Final email (REJECT):** never announces itself - "Last note from me", "Last email", "Last one", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", "One last try". Check the final email every time.

#### Spam words (budgeted - count and report per email - HARD)
- [ ] Report every spam word as `word (tier)` ([`references/spam-words.md`](references/spam-words.md)).
- [ ] **NEVER tier = REJECT:** "free", "credit card", phishing vocabulary, fake `Re:`/`Fwd:`, the scam cluster.
- [ ] **HIGH:** 2+ in one email = REJECT; one = FLAG with the safe alternative.
- [ ] **MEDIUM:** 3+ in one email = REJECT; two from one cluster in a sentence = FLAG.
- [ ] **Subjects:** any tiered word, `$`, `%` or stacked numbers = REJECT.
- [ ] **Structural:** ALL CAPS, more than one `!`, URL shorteners, attachments = REJECT.
- [ ] **No false or unverifiable claims:** cross-check every offer claim, price, time, case study and metric against the company context; nothing invented. FLAG what you cannot verify.

#### Value-prop compression (the 9/10 bar - HARD)
- [ ] **One-breath test:** Email 1 has one plain sentence carrying the whole offer (deliverable + who + what they get). REJECT a smeared offer, with the compressed rewrite.
- [ ] **Repeatability:** could the prospect repeat the deal to a colleague after one skim?
- [ ] **Dead sentences:** FLAG every sentence whose removal changes nothing.
- [ ] **Concrete over abstract:** FLAG hype adjectives and abstract benefits; numbers must be real.
- [ ] **Shown, not claimed:** a specific consequence beats "guarantee"; a true reason beats "limited spots".

#### One-on-one favor framing (HARD)
- [ ] **List test:** REJECT an email that would read the same sent to 500 people.
- [ ] **Favor test:** delete every sentence about the sender's product; if nothing is left for the reader, REJECT.
- [ ] REJECT feature lists and "we offer / our platform provides" framing. FLAG sender-heavy emails.
- [ ] **Sentence starts:** REJECT "I wanted", "I think", "I was reaching out". The offer line may start with "I" or "we" once. FLAG a body where most sentences start with "I".

#### Sound human / AI-tells (REJECT)
- [ ] No AI-tell vocabulary (delve, leverage, streamline, seamless, robust, unlock, elevate, empower, transform, journey, landscape, game-changer, tailored solution, actionable insights...).
- [ ] No dead phrases ("I hope this email finds you well", "I came across", "I couldn't help but notice", "I was impressed by", formulaic funding congratulations, "As a [title], you know...", "In today's fast-paced world", "Let's dive in").
- [ ] No AI-tell structures: "not just X, it's Y", tidy triads, three same-length sentences in a row, "serves as"/"boasts", hedge chains, compliment-then-pitch seams.
- [ ] Read-aloud test; contractions and varied rhythm present; one personality flourish per email max.
- [ ] **Do not flag deliberate small imperfections** (a lowercase start, "btw", up to ~2 per sequence) and do not "correct" them in fixes. DO reject any imperfection in names, companies, links, numbers or claims; FLAG fake typos ("teh").

#### ICP voice match
- [ ] A Voice Card exists for the segment (REJECT if missing) and comes from client context.
- [ ] The copy uses the ICP's daily vocabulary, none of the card's outsider phrases, and their peer formality.
- [ ] FLAG copy that differs from a sibling segment only by an industry-noun swap.
- [ ] The proof type is the kind this reader believes.

#### Greetings (every email)
- [ ] Every email opens with a greeting and an empty line. Email 1 `Hey {firstName},`; follow-ups `Hey {firstName},` or the bare `{firstName},` (both valid). FLAG a follow-up with no greeting.

#### Variables and signature (REJECT)
- [ ] Merge fields: lead variables are single-brace camelCase (`{firstName}`); AI variables are double-brace `{{Title Case}}` names declared for this segment. REJECT square-bracket or lowercase spellings.
- [ ] **Every AI variable has a prompt:** each AI variable in a subject or body matches by name a `###` heading in the segment's `prompts.md`, or, before **prompt-writer** has run, a variable in the strategy's AI variable list (then name the prompts it must write). REJECT a variable with neither: it sends blank.
- [ ] **One value per lead:** REJECT the same body AI variable in several emails (the identical sentence sends each time). Each email's opener has its own name. `{{Subject Line}}` on every subject is correct. In a preview, a variable filled on Email 1 but blank later means reused, not missing.
- [ ] Default layout respected: openers and PS lines not on every email.
- [ ] **Signature:** every email ends with `{sender_signature}` on its own line, or, when the user's sending tool has no signature variable, a signoff then `{sender_first_name} {sender_last_name} - <title> at <Client Company>`. REJECT a hard-coded sender name or a missing signature. In the two-line block the company name is a link to the client site, except in an email whose one link is the CTA link, where it stays plain.
- [ ] A PS variable sits on its own line after the signature.

#### Formatting
- [ ] Paragraphs of 1-3 sentences with spacing; no ALL CAPS; plain text; no calendar link in Email 1.

#### Brevity and punch (HARD - the #1 operator complaint)
- [ ] **Count the static body words** of every email (prose + CTA; not the greeting, AI-variable lines, or signature; a static PS is excluded but capped at ~35 words in at most 1-2 emails). Bands: **Email 1 50-80 words, follow-ups 30-60.** REJECT an Email 1 over 80 or a follow-up over 60, except one value-stack email per sequence (~100 words, numbered lines with real numbers). FLAG an email under its band. The lint's 40-word floor on the whole body still applies. Report each count.
- [ ] Run the "cut 30%" pass: if it loses 30% without losing meaning, REJECT with the tighter version.
- [ ] FLAG long multi-clause sentences and staccato one-line fragments.

#### Sequence length
- [ ] Default 3 emails. FLAG any 4th+ email that restates an earlier one.

#### First email (Email 1 only)
- [ ] Mentions the solution, states problem and solution together, states the UVP, doesn't ask if they have the problem.

#### CTA (every email - HARD)
- [ ] REJECT any close that does not ask for the real offer (call, demo, walkthrough, sample), Email 1 included.
- [ ] REJECT diagnostic questions used as the CTA ("Do you have a system for X?", "Where do your clients come from?", "Is it worth a look?", "a quick look", "Curious if...?", "Worth exploring...?").
- [ ] No "Should I close the loop?", no complex rhetorical CTA, no time commitment in the CTA line, no keyword-trigger CTA ("Reply 'X' and I'll send Y").
- [ ] A short question with the link on its own line, on a short phrase, is PREFERRED; flag only a weak question or a buried link.
- [ ] REJECT a bare URL, link text that reads like a web address (`acme.com`), or a non-`https` link: click tracking routes every link through a tracking domain, and a visible host that does not match reads as phishing.

#### Rhetorical questions, offer, proof
- [ ] A rhetorical question is answered in the next sentence.
- [ ] Sells the product, not an audit (an analysis is proof or demo only).
- [ ] Proof matches the prospect's vertical; no B2C names for B2B; no relevant case study means a metric without the name.

#### Subject threading
- [ ] Every step carries `{{Subject Line}}` (operator standard since 2026-06-03). Do not flag a follow-up for it and do not leave follow-up subjects empty.

## Checklist 3: QA scoring and exercises

- [ ] Score each email with the criteria in [`references/qa.md`](references/qa.md); run the self-review questions as a cold prospect; check strategy alignment.
- [ ] "So what?" test on every line; cut what you can't justify.
- [ ] **So-what chain:** the main claim goes three levels down to money or emotion, and the email is written from the bottom. FLAG a draft that stops at the product benefit.
- [ ] **Pain math:** FLAG a vague problem when a real number was available. Invented math is a false claim.
- [ ] **Proof shape:** before + action + specific outcome + timeframe. FLAG adjective-only proof.
- [ ] Word reduction, read-aloud, feature-to-story.

No code checks this copy for you: count words, links and spam words, and check first lines and merge fields by reading.

## Score decision

**Hard gate:** any HARD or REJECT violation fails the review regardless of score: a lint failure, an unsourced event, a static opener failing a first-line check, an email over its word band (outside the one value-stack exception), a missing or weak offer CTA, a salesy final-email ending, a square-bracket AI variable or an AI variable with no prompt, a hard-coded, missing or malformed signature, a NEVER-tier word or blown spam budget, an Email 1 that fails the one-breath test, an AI-tell, a failed list or favor test, or a missing Voice Card.

Before deciding, prepare the corrected copy (mechanical fixes where possible: variable syntax, signature, trimming to the band, safe spam alternatives, removing a second link) and re-check it against every HARD/REJECT rule and the lint.

**Pass (score >= 4.5 and no HARD/REJECT left after fixes):**
1. Apply every fix to the copy and re-check the result against the lint and every HARD/REJECT rule.
2. Write the corrected sequence to `{segment folder}/emails_v2.md` in the same shape as `emails.md` (headings, wait days, variants, `## Notes` with the Voice Card), replacing the file when it exists. Leave `emails.md` as it is: it is the draft of record.
3. Report: "Email review passed with score [X]. emails_v2.md written.", with the fixes applied.

Without a segment folder (the user pasted a draft), return the review and the fixed copy inline instead of writing a file.

Fixes change the copy in place. Never express review fixes as a new variant: variants A-D are A/B arms that send to prospects. Add a variant only for an A/B test the strategy or the user asked for.

**Fail (score < 4.5 or any HARD/REJECT left):** do not write `emails_v2.md`. Output the review with specific, per-email revision instructions for **email-copywriting** (and failing first-line samples for **prompt-writer**). In the workflow, run **email-copywriting** with those instructions and review the new `emails.md`. After the third failed round, stop: show the last review and let the user decide.

## Priority and scope

1. Feedback in this conversation (the latest preference).
2. Client notes.
3. The campaign strategy.
4. The QA checklist and generic guidelines (the baseline).

Review only subject lines, bodies, CTAs, formatting, tone and the filled first lines. AI-variable prompts belong to prompt-writer (you report failing samples, you do not rewrite the prompt); list building and the strategy itself are out of scope.

## Recruiting campaigns

A recruiting campaign is reviewed against **email-copywriting**'s Recruiting campaigns section, with the same lint, bands and gate. REJECT copy that mentions or guesses age, gender, race, religion, disability, family status or nationality, or says the candidate looks open to work; REJECT invented pay or perks, and any ask bigger than a reply or a short call.

