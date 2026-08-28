---
name: email-copywriting
description: Write effective cold email copy using proven principles for hooks, body, CTAs, signatures, AI personalization, and QA processes. Use this skill when (1) writing email sequences from scratch, (2) consuming Campaign Strategy output to write email copy based on an email sequence blueprint and AI variables, or (3) reviewing and improving existing email campaigns. When a Campaign Strategy document is provided, this skill writes the actual email copy and generates AI personalization prompts.
model: opus
thinking: true
---

# How to write copy

## Output Contract

`emails_v2.md` (and `emails.md`) must follow a fixed structure so downstream campaign tooling can parse them reliably. Hard rules this skill must honor:

- `## Email N: {Descriptive Title}` - the title is the sequence step name (truncated to 25 chars). Missing title → step name falls back to `Variant A`.
- `### Variant A (desc)` / `### Variant B (desc)` - literal word `Variant`, never `Version` (tools should warn on `Version`). Letter in `A..D`. Parenthetical description becomes the step-name suffix.
- Combined step name `{title} - {variant_desc}` must be ≤25 chars. Longer strings get truncated - authors should pre-shorten to preserve intent.
- AI variables use double braces `{{Title Case}}` (uppercase-first required): `{{First Line}}`, `{{PS Line}}`, `{{Subject Line}}`. This is the canonical form for personalization tools and LLMs. (Legacy `[Title Case]` square brackets are still often auto-converted, but write `{{...}}` in all new copy.)
- Lead variables use `{camelCase}`: `{firstName}`, `{company}`. Never `{first_name}`.
- Signatures use the system variable `{sender_signature}` (single braces) in place of any hand-written sign-off - on every email. See the Signature rule below.
- Never write `{{tracking_link:...}}` in local copy - write raw URLs or markdown links; tracking wrappers are tool-side if used.
- End the file with a terminator H2 (`## Notes`, `## Signature Block`, `## AI Personalization Placeholders`) so trailing metadata doesn't get swallowed into the last email's body. Also supported: `**Variant Notes**:` / `**Test Notes**:` inline markers.
- Every AI variable used (e.g. `{{First Line}}`) must have a matching H3 in `prompts.md`. `{{Subject Line}}` is the exception you don't have to write: many personalization stacks auto-emit a Subject Line output prompt for it (kept `to_rewrite=0`, so it's generated but never rewritten). Add a `### Subject Line` H3 only when you want to override the default.

## Overview

This skill provides comprehensive guidance for writing effective cold email copy. Use this skill when creating email sequences, writing cold outreach, or reviewing email campaigns. Claude should reference these guidelines whenever writing or reviewing cold email copy.

**Campaign Strategy Integration:** When the user provides a Campaign Strategy document (containing an email sequence blueprint and AI variables), this skill consumes that input to write the actual email copy and generate the corresponding AI personalization prompts.

## Variable Naming Contract

Authors write AI variables, lead variables, and the signature variable **directly in their final form**. Only links convert downstream.

| Type | Syntax | Examples |
|------|--------|----------|
| Lead variable | `{camelCase}` single braces | `{firstName}`, `{company}`, `{title}` |
| AI variable | `{{Title Case}}` double braces | `{{Subject Line}}`, `{{First Line}}`, `{{PS Line}}`, `{{Final PS Line}}` |
| Signature | `{sender_signature}` single-brace system variable | one per email, in place of the sign-off |
| Sender name | `{sender_first_name}` / `{sender_last_name}` single-brace system variables | optional, when you reference the sender by name in the body |
| Link | Raw transparent URL or markdown link | `https://...` (tracking wrappers are tool-side if used) |

**Rules:**
- **AI variables use double braces `{{Title Case}}`** - write them in this form so personalization tools and LLMs resolve them correctly. Use `{{Subject Line}}`, `{{First Line}}`, `{{PS Line}}`, `{{Final PS Line}}`. Never `{{first_line}}`, `{{Subject line}}`, or alternate spellings. The legacy `[Title Case]` square-bracket form still often auto-converts so old files keep working, but do not author new variables that way.
- Lead variables use camelCase: `{firstName}`, `{company}`, `{title}`. Never `{first_name}` or `{company_name}`.
- **One AI variable = one value per LEAD, not one per email.** Personalization tooling generates a single value per prompt per lead; wherever you place that token, the identical text renders. Reusing `{{First Line}}` in Emails 1-3 means the same opening sentence sends three times. Give each email its own distinct-named opener - `{{First Line}}`, `{{Bump First Line}}`, `{{Nudge First Line}}` - each with its own H3 in `prompts.md`. Reuse on purpose is fine ONLY when you want the identical value on every step (`{{Subject Line}}` in every subject is correct and expected).
- **Signatures use `{sender_signature}`** on every email - see the Signature rule. Never hand-write the closer, name, and title as a literal signature. `{sender_first_name}` and `{sender_last_name}` are also available if you need to name the sender inside the body (they resolve to the sending mailbox at launch). Full list in [`references/lead-variables.md`](references/lead-variables.md).
- Links: write raw transparent URLs or markdown links. Never write `{{tracking_link:ID}}` or any tracking placeholder in local copy.

## Execution Tasks

**Execute these tasks in order. Do NOT skip any task unless noted.**

### Task 1: Load Context
- [ ] Read `{workspace}/research.md` - ICP, value proposition, messaging themes, product info, case studies
- [ ] Read `{segment_folder}/strategy.md` (if workflow mode) - Email sequence blueprint
- [ ] Read `{workspace}/notes.md` (if exists) - Client-specific preferences
- [ ] Read `references/lead-variables.md` - Correct lead variable names and syntax
- [ ] Read `references/gold-standard.md` - the 9/10 bar and the 12 patterns
- [ ] Skim `references/spam-words.md` (tiers + alternatives) and `references/sound-human.md` (AI-tells + voice card spec)

### Task 2: Check for A/B Tests
- [ ] Search strategy.md for `## Sequence Tests` section
- [ ] If found: Note which emails need variants and what varies

### Task 3: Generate Draft Email Copy
- [ ] Read `email_copywriting.md` for tactical guidance
- [ ] Write the offer as ONE plain sentence (deliverable + who + what they get) - this is the spine of Email 1; if it can't be written, return to research
- [ ] Write the 6-line ICP Voice Card (spec in `references/sound-human.md`) from client context + segment definition
- [ ] Write initial email sequence following strategy blueprint, in the Voice Card's language
- [ ] Insert AI variable placeholders where specified (e.g., `{{First Line}}`)
- [ ] Create variants if A/B test defined - test the offer variable (metric, angle, guarantee), not wording
- [ ] Run the list test + favor test on every email (one-on-one favor framing, `references/sound-human.md`) - reject your own draft if it reads like a marketing email
- [ ] Run the compression test + spam-word budget count + AI-tell scan on every email before handing off

### Task 4: Output Final Copy
- [ ] Write `emails.md` to campaign folder (workflow mode) OR return inline (standalone)
- [ ] Confirm to user where files are saved

---

## Required Context

Before writing email copy, always load the client context:

1. **Read `{workspace}/research.md`** - Get ICP, value proposition, messaging themes, detailed product info, case studies, and outbound angles
2. **Read `{workspace}/notes.md`** (if it exists) - Client-specific preferences

**Directory Structure Reference** (`{workspace}` = the client campaign workspace, default `./cold-email/{slug}/`):
```
{workspace}/
├── research.md       # Client research - ICP, value prop, key contacts
├── notes.md          # Optional client preferences
└── {date} - {plan-name}/          # Plan folder (shared files)
    ├── plan.md                     # Campaign plan
    ├── search-strategy.md          # Portable prospect-search filters
    ├── qualification.md            # Qualification criteria
    ├── segmentation.md             # Segmentation criteria
    └── {n} - {segment-slug}/       # Segment folder (per-segment files)
        ├── strategy.md             # Email sequence blueprint
        ├── emails.md               # Email copy
        ├── emails_v2.md            # Reviewed email copy
        └── prompts.md              # AI personalization prompts
```

## A/B Test Detection

Before writing emails, check if strategy.md contains a "Sequence Tests" section:

1. **Read strategy.md** looking for `## Sequence Tests`
2. **If found**, identify:
   - Which emails need variants (from "Affected Emails")
   - What varies between Variant A and Variant B
   - The implementation instructions
3. **Write variant emails** in emails.md for affected emails only
4. **Unaffected emails** remain single-variant (normal format)

When sequence tests exist, the email-copywriting skill must produce variant emails that match the test definition from strategy.md.

**A/B variants are NOT limited to Email 1.** Add variants to follow-up emails whenever there is a worth-testing hook there too - for example a proof-led follow-up vs a low-friction "just drop into one session" energy framing, or two different pain points in a bump. Don't default to testing only the first email. If a follow-up has a meaningfully different angle worth measuring, give it Variant A / Variant B as well (same Variant heading rules and ≤25 char step-name limit apply).

## Principles
_The state of mind when you write_
### The One-on-One Favor Mindset (READ FIRST)
AI personalization renders every email as an individual message to one specific person - so write it as one. You are a human typing a short note to another human, because you found something that helps THEM.
*   The posture is **doing them a favor, not asking for one** - you're handing them something free or fixing a problem they have. Write like the person who shows up with the thing, not the person who wants their time.
*   A marketing email talks about the sender: features, "we do X", what the platform offers. A one-on-one note talks about the reader: their situation, what they're getting, what happens next. If most sentences start with "we", rewrite.
*   **The list test:** if the exact email could go to 500 people unchanged and read the same, it's a marketing email. The static body is shared, but it must read like it was typed for this one reader.

Full frame + tests in [`references/sound-human.md`](references/sound-human.md).
### Core Philosophy
Contrary to what many people think, email copy is more about **what you say** than how you say it. Many focus on using or avoiding specific words, avoiding questions, or eliminating "passive language." But it's not about those rules - it's about:

*   **Who you're targeting** (ICP)
*   **What you're telling them** (value proposition, pain point)
*   **What you're offering** (offer)
*   **What happens next** (CTA & funnel)

In your copy, your main job is to determine which combination of these 4 will work best - not to fixate on the exact wording.
### Golden Rule
> "Do unto others as you would have them do unto you."
*   Write emails they would want to receive
*   Ask yourself: Would you reply/click if you'd receive this email?
### Write Like a Human
*   Write like you talk
*   Don't follow sales & marketing patterns
*   Write like an excited team mate just wrote to you about this cool new idea
### Make It Interesting
*   Don't be boring
*   Make them want to read it
*   **Quality hierarchy:** Long interesting copy > short interesting copy > short boring copy > long boring copy
*   Make them learn new interesting stuff
### Keep It Simple
*   Humans are lazy
*   Don't make them think too much, or put too much effort
*   Write at the level 90% of your audience would understand (Simple > fancy)
*   Make it easy to do the CTA you want them to do
*   Only 1 CTA and 1 idea per email

## Critical Copy Rules

These rules are **non-negotiable** and must be followed in every email sequence.

### The 9/10 Standard (READ FIRST)

The default AI draft is a 6-7/10. The gap to 9-10/10 is closed by compression, not polish. Read [`references/gold-standard.md`](references/gold-standard.md) - two operator-written exemplar campaigns with the 12 patterns extracted - before drafting anything.

The core discipline: **lay out the best possible value proposition and use case in as few words as possible.**

- **The offer fits in one breath.** Before drafting, write the client's offer as ONE plain sentence: concrete deliverable + who it's for + what they get ("We'll send 3,000 personalized emails to your ideal clients on us"). If you can't, go back to the research - the email isn't ready. That sentence IS the email's spine; everything else supports it.
- **Concrete nouns and numbers do the selling.** Every adjective must carry information ("qualified", "personalized") - zero hype adjectives, zero abstract benefit language.
- **Mechanism in verbs:** "We write the copy, build the list, handle everything" - never "end-to-end done-for-you solution".
- **The compression test on every draft:** could the prospect repeat the offer to a colleague after one skim? Delete each sentence and check what breaks; anything whose removal changes nothing is dead weight.
- **Show, don't claim.** Risk reversal is a specific consequence ("I'll send you a bottle of TOST Rose"), not the word "guarantee". Scarcity is a plain true reason ("each one takes real time from our team"), not "limited spots".

### Transitions (Smooth First-Line Bridge - CRITICAL)
- **Never have abrupt transitions** from personalized first line to body content. This is a top failure mode.
- When an email opens with an AI-personalized `{{First Line}}`, the first sentence of static body **MUST continue that thought**. Never jump from a personalized line straight into a generic statement like "Scaling a SaaS company..." - that abrupt jump reads like two unrelated emails stitched together.
- Design the `{{First Line}}` prompt to **end on a bridge** that the static body completes. The body's opening sentence should read as the natural next beat of the personalized line, not a topic change.
- Add transitional context or ensure the first line topic connects to the body.

### Greetings (Every Email)
- **Every email in the sequence, including follow-ups, MUST open with a greeting.** Email 1 opens `Hey {firstName},`. Follow-ups in the same thread may use the full `Hey {firstName},` or the bare `{firstName},` - the bare form reads like a real person continuing a conversation (see gold-standard.md pattern 12).
- Follow-ups that jump straight into the body with no greeting are wrong, even though they thread off Email 1.
- The greeting is always followed by an empty line, then the `{{First Line}}` or body.

### Spam Words & False Claims (Budgeted - HARD)
The full tiered list, structural triggers, and safe-alternatives table live in [`references/spam-words.md`](references/spam-words.md). Consult it while drafting, not just at review. The budget rule:
- **NEVER tier = zero occurrences**: "free", "credit card", phishing vocabulary (verify your account, action required...), fake `Re:`/`Fwd:`, and the scam cluster (winner, no obligation, risk-free, 100% guaranteed...).
- **HIGH tier = aim for zero** (guarantee, discount, limited time, act now, click here, special offer...): one HIGH word spends the email's entire spam budget.
- **MEDIUM tier = max 1-2 per email total** (cost, price, offer, deal, opportunity, ROI...): remove every one with a natural alternative; never two from the same cluster in one sentence.
- **Subject lines: zero spam words, no `$`/`%`/stacked numbers** - subjects are weighted heavier than body.
- **Never make an offer claim that is not true.** If a card is actually required, do not say "no card needed." If a trial has limits, do not imply it is unlimited. Every claim must be verifiable against the client's actual offer in `{workspace}/research.md`.

### Voice: Write in the ICP's Language (MANDATORY)
Every ICP has its own language - a platform engineer, a healthcare administrator, and an agency founder do not read the same email. Adjust tone of voice to the ICP and the client persona:
- **Write a 6-line ICP Voice Card before drafting** (spec in [`references/sound-human.md`](references/sound-human.md)): who exactly reads it, 5-8 terms they use daily, 3-5 phrases that mark you as an outsider, their peer-to-peer formality level, the sender persona, and which proof they believe.
- Derive it from `{workspace}/research.md` and the segment definition. A client founder voice profile in notes/memory overrides the generic persona.
- **Copy the finished Voice Card into the `## Notes` terminator section of `emails.md`** so the review pass can score the copy against it.
- Re-voice per segment: if two segments' emails differ only by an industry-noun swap, the voice card wasn't used.

### Sound Human (HARD)
The emails must read like a specific person typed them. Full AI-tell lexicon, banned structures, and human techniques in [`references/sound-human.md`](references/sound-human.md). Non-negotiables while drafting:
- **Zero AI-tell vocabulary** (delve, leverage, streamline, seamless, robust, unlock, elevate, journey, landscape, game-changer, tailored solution...) and **zero dead cold-email phrases** ("I hope this email finds you well", "I came across", "I couldn't help but notice", "I was impressed by", "As a [title], you know...").
- **No AI-tell structures:** no "It's not just X, it's Y", no tidy triads ("fast, reliable, and affordable"), no metronomic same-length sentences, no "serves as"/"boasts" copula dodging, no hedge chains.
- **Do the human things:** contractions, jagged rhythm (a 3-word fragment next to a longer thought), plain first-person verbs ("I created", "we built"), one personality flourish per email max, and the read-aloud test - if you wouldn't say it to their face, delete it.
- **Imperfection is allowed:** 1-2 small deliberate human imperfections per sequence (a lowercase start, a missing comma, casual shorthand like "btw"/"thats") - NEVER in names, companies, links, or numbers, and never scrambled-letter fake typos. Spec in `references/sound-human.md`. Don't polish the humanity out.

### Brevity & Punch (HARD - the #1 recurring failure)
- **The default draft is always too long.** Operator feedback, repeatedly: even copy that went through the full review workflow still ships too long. Cut harder than feels natural - assume your first instinct is 30%+ over.
- **Hard ceiling: each email's static body is ≤80 words** (body = prose + CTA, not counting the greeting, the AI-variable lines, or `{sender_signature}`). Tighter is better. The first email may sit near the ceiling because it carries the offer (gold standard: ~72 words); follow-ups should land well under it (aim ≤55; closes run 35-45).
- **Value-stack exception:** ONE email per sequence may reach ~100 words IF the overage is a numbered value/proof stack where every line carries a real number (see gold-standard.md Email 2). Prose never gets that budget.
- A static PS line is excluded from the body count but capped at ~35 words, in at most 1-2 emails of the sequence.
- After drafting, run a mandatory "cut at least 30%" pass: delete every word not earning its place, every restated idea, every throat-clearing clause. Then count the body words and confirm it is under the ceiling before moving on.
- **Punchy, not staccato.** Punchy means lean and direct. It does NOT mean one-sentence-per-line fragments ("It just runs.") - those read jittery and AI-generated. Keep full thoughts and group related ideas into a paragraph; break only when the beat genuinely changes. Target one or two short paragraphs plus the CTA.
- Remember AI personalization adds 1-2 sentences on top of the static body, so keep the static copy tight enough that the rendered email still breathes.

### Signature (Use `{sender_signature}` - HARD)
- **Every email signs off with the single token `{sender_signature}` on its own line, in place of the closer + name + title.** Do not hand-write "Best,", "Cheers,", the sender's name, their title, or a tagline as a literal signature. The sending inbox owns its signature and injects it through this variable, which keeps multi-inbox / multi-sender sends consistent and lets sender identity vary at the inbox layer.
- Placement: `{sender_signature}` goes where the sign-off was, after the CTA. A PS variable (`{{PS Line}}`, `{{Final PS Line}}`) goes on its own line **after** `{sender_signature}`.
- This replaces the older "social-proof signature block" guidance. Put credibility in the body, not in a hand-typed signature.

### Sequence Length (Default to 3)
- **Default toward a 3-email sequence, not 4-5.** More emails is not better.
- Only go beyond 3 when the strategy gives each extra email a distinct, worth-sending idea (e.g. a new proof point or angle). If a 4th or 5th email just restates earlier ones, cut it.

### Subject Line Threading
- **Email 1**: Use AI-generated subject line as default (unless testing a specific static alternative)
- **Follow-up emails (2-5+)**: Leave subject line empty to maintain threading
- Threads are the preferred approach for email sequences

### Language to Avoid
Never use these phrases or patterns:
- "Quick followup", "quick question", "touching base"
- "No worries if timing isn't right" (or any apologetic/defensive language)
- "Quick insight:" prefix - just state the insight directly
- Any typical sales clichés that scream "cold email"
- Any AI-tell word, dead phrase, or structure from `references/sound-human.md`

**Final-email endings (HARD).** The last email in a sequence must NOT announce itself as a follow-up or a last attempt. Never use "Last note from me", "Last email", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", or "One last try". These are the salesy endings operators flag most, and they keep slipping through - the email-review skill rejects them. The final email earns its open with a real idea or value beat and closes on the offer CTA; it never leans on the fact that it is a follow-up.

### Formatting Requirements
- **Short paragraphs only**: 1-3 sentences max per paragraph
- **Add spacing** between thoughts - AI personalization adds 1-2 sentences, so keep body concise with breathing room
- **Never use ALL CAPS** for emphasis - use structure or italics instead

### First Email Requirements
- **MUST mention the solution**, not just the problem
- State the problem AND offer the solution in the same email
- Don't ask if they have problems - state their problem and offer solution
- **State UVP clearly** in first email - don't keep your value prop secret

### Pain Point Testing
- **Don't assume the first pain point is the best.** The opening pain you reach for is rarely the winner.
- Propose **several candidate pain points** for the ICP and test them - e.g. as Email 1 opener variants (Variant A vs Variant B) rather than committing to one.
- When you list candidates, note which pain each variant leads with so the A/B result tells you which pain resonates, not just which wording.

### CTA Requirements
- **Every email's CTA asks for the actual offer - including Email 1.** Whatever the campaign sells (a walkthrough, a demo, a call, a sample), every email closes by asking for that. The first email must lead with the strongest, most direct version of the offer CTA, not a soft warm-up. The most powerful CTA belongs in the first email, not held back for later.
- **Diagnostic / soft questions are NOT CTAs.** Asking about the prospect's situation does not count. Banned as CTAs: "Do you have a system for X?", "Do you have anything in place?", "Where do your clients come from?", "Is it worth a look?", "a quick look", "Curious if...?", "Worth exploring...?". They ask about *them* instead of asking for the meeting, and they consistently underperform. Replace every one with a direct ask for the offer.
- Make CTAs **strong, direct, and specific to the offer** - e.g. "Want me to walk you through how it works?", "Open to a quick walkthrough?", "Want me to show you how it'd run for your {company}?". For SaaS-style calls, position as a "strategy call" or "conversion optimization call".
- Never use "Should I close the loop?" - instead: "Reply if you'd like me to stop emailing"
- Don't ask complex rhetorical questions that require too much thought. Yes/no (or either/or) only.
- **No time commitments in the CTA** - duration ("30 minutes", "15 min") surfaces on the call, never in the CTA line.
- **Preferred CTA pattern (question + link on its own line):** a strong CTA can be a short direct question with the link on the very next line by itself, rather than burying the link inside a sentence. This reads cleaner and lifts clicks:
  ```
  Do you want to apply?

  https://example.com/apply
  ```
  Other good questions: "Want a seat?", "Want the breakdown?" Keep the question to a few words and put the raw transparent URL on its own line directly below.

### Rhetorical Questions
- If using rhetorical questions like "What if your site could guide them?", you **MUST** immediately follow with the answer/solution
- Never leave prospects hanging - rhetorical questions need payoff in the next sentence

### Offer Strategy (Mid-Market)
- **Sell the PRODUCT**, not audits/analysis/friction analysis
- Mid-market companies need solutions, not indie hacker-style audits
- Friction analysis can be mentioned as proof/demo, but not as the primary offer
- Offer should be: "See how [Product] monitors X automatically" not "Get a free audit"

### Case Study Relevance
- **Match proof points to prospect's vertical** - don't use irrelevant case studies
- Examples: Don't mention Crocs or consumer brands to B2B SaaS prospects
- Use case studies from same or adjacent industries
- If no relevant case study exists, use a generic metric without naming the company

## Output Format

### File Structure
When creating or improving email copy, output **three separate files**:

**IMPORTANT - Do NOT Include These Sections in emails.md:**
- ~~Compliance Notes~~ (handled separately outside the copy file)
- ~~QA Checklist~~ (internal process, not for output file)

Keep emails.md clean - only email copy, subject lines, sequence notes, and AI placeholders.

1. **Email Sequence File** (`emails.md`)
   - Contains only the email sequence
   - Email body must be **plain text only** (no markdown formatting except external links)
   - Use proper email structure (Subject, Body, etc.)
   - Include placeholders for AI variables: `{{Variable Name}}`
   - If A/B test defined: include variant sections for affected emails (see below)

2. **Notes File** (`notes.md`)
   - **Target ICP**: Who this is for
   - **Goal & Angle**: What we're trying to achieve and approach
   - **Pain Point Focus**: Core problem being addressed
   - **Campaign Strategy Alignment**: How the copy aligns with the provided strategy (if applicable)
   - **Summary of Changes**: (Only when improving existing copy) Brief list of what was changed and why

3. **AI Personalization Prompts File** (`prompts.json`) - **Only when AI variables are specified**
   - JSON array of prompt objects
   - Each prompt corresponds to an AI variable from the campaign strategy
   - See `ai_prompts_format.md` for detailed structure

### Email and Variant Naming

Every email in `emails.md` MUST have a short descriptive title in its heading, whether or not it has A/B variants. These titles become the sequence step names used in your sending tool or sequence editor.

**Email heading format:** `## Email N: {short title}` - e.g., `## Email 1: Offer`, `## Email 2: Bump`, `## Email 3: Case Study`, `## Email 4: Final Nudge`. Describe the email's angle/role, not generic labels like "Step 1" or "Email One".

**Variant heading format (when A/B testing):** `### Variant A ({short description})` - the parenthetical description is required and should name what makes this variant different (e.g., `(With PS)`, `(No PS)`, `(Short Body)`, `(Static Subject)`). Downstream tooling typically combines the email title and variant description into the step name.

**ALWAYS use the literal word `Variant`, never `Version`.** Use it consistently for every email in the sequence including the closing email - do NOT switch to `### Version A` / `### Version B` for later emails in the sequence even if it feels more natural semantically. Some parsers accept `Version` as a fallback alias but emitting it is a drift signal and loses schema consistency. One word, always: **Variant**.

**Hard length rule:** the final combined step name (title or `title - variant`) MUST be ≤25 characters. Examples that pass: `Offer - With PS` (15), `Bump` (4), `Case Study - Short` (18). Examples that fail: `The Offer - With PS Line` (24 chars and still clunky - prefer `Offer - With PS`), `Follow-up Bump` is fine alone but `Follow-up Bump - Short Body` (27) is too long, shorten to `Bump - Short`. Abbreviate aggressively; clarity in the sequence editor matters more than full-word titles.

### A/B Test Variants in emails.md

When strategy.md defines sequence tests, affected emails include variants:

```markdown
## Email 1: The Offer

### Variant A (With PS Line)

**Subject**: {{Subject Line}}

**Body**:
```
Hey {firstName},

{{First Line}}

We'll send personalized emails to 5,000 of your ideal clients...

Want me to walk you through how it works?

{sender_signature}

{{PS Line}}
```

### Variant B (No PS Line)

**Subject**: {{Subject Line}}

**Body**:
```
Hey {firstName},

{{First Line}}

We'll send personalized emails to 5,000 of your ideal clients...

Want me to walk you through how it works?

{sender_signature}
```

**Test Notes**:
- Primary metric: Reply rate
- Hypothesis: PS line may dilute the focused offer message
- Difference: Variant B removes PS line, ends at CTA
```

**Format rules for variant emails:**
- Each variant gets its own section (### Variant A, ### Variant B) - ALWAYS `Variant`, NEVER `Version`, for every email in the sequence
- Include a short variant description in parentheses naming what varies (`With PS Line`, `No PS Line`, `Short Body`). Avoid noise words like "Control" / "Test" - downstream uses this text verbatim as the step name suffix.
- Copy body differences are the ONLY change (same Subject line format unless testing subject)
- Add "Test Notes" at end summarizing the test
- Unaffected emails keep normal format (no variant sections), but still need a descriptive `## Email N: {title}` heading

### Writing Style
- **Be concise** - Don't overload context
- Use numbers over words: "40-50%" not "forty to fifty percent"
- Use symbols and abbreviations where appropriate
- Every word must earn its place

### Workflow
- **Expect iteration** - This is a conversation, not a one-shot
- Be ready to make improvements based on user feedback
- When revising, update the Summary of Changes in the notes file

### Campaign Strategy Integration Workflow
When a Campaign Strategy document is provided:

1. **Parse the Input**: Extract the email sequence blueprint and AI variables
2. **Write Email Copy**: For each email in the sequence:
   - Follow the `primary_goal` and `description` from the blueprint
   - Respect the `delay_in_days` for sequence timing
   - Insert AI variable placeholders where specified (e.g., `{{First Line}}`, `{{PS Line}}`)
3. **Match AI Variables**: Use placeholders that match the prompts.md file (if in workflow mode)
4. **Output**: emails.md (notes.md merged into strategy.md in workflow mode)

### Workflow Mode (Segment Folder)
When invoked with a segment folder path:

1. **Read inputs from segment folder**:
   - `{segment_folder}/strategy.md` - Email sequence blueprint
   - `{segment_folder}/prompts.md` - AI personalization prompts (already generated)
2. **Write email copy**: Follow the strategy blueprint exactly
3. **Match variable names**: Use the exact placeholder names from prompts.md
4. **Output emails.md only**: Notes are not needed (strategy.md has that context)
5. **Skip prompts.json**: Already generated by prompt-writer skill

## Resources

For detailed guidance on specific topics, see the following reference files:

- **email_copywriting.md** - How to write email copy including hooks, body, CTAs, signatures, and PS lines
- **references/gold-standard.md** - The 9/10 bar: two operator-written exemplar campaigns + the 12 patterns + the compression test
- **references/spam-words.md** - Tiered spam-word policy (NEVER/HIGH/MEDIUM budget rule), structural triggers, safe alternatives
- **references/sound-human.md** - AI-tell lexicon and structures to reject, human-voice techniques, ICP Voice Card spec

**Moved to other skills:**
- AI personalization prompts → `prompt-writer` skill
- Building block philosophy → `campaign-strategy` skill
- Review workflow, QA checklists, exercises → `email-review` skill

## Output Handling

After generating the email copy:

### If segment folder specified (workflow mode):

1. **Write emails.md**: Save to `{segment_folder}/emails.md`
2. **Confirm**: Tell the user emails are saved to the segment folder
3. **Report**: Summarize the campaign completion (strategy, filters, prompts, emails all done)

### If standalone mode:

1. **Return inline**: Present all outputs concatenated inline to the user using this format:

   ```
   # Emails

   [emails.md content]

   ---

   # Notes

   [notes.md content]

   ---

   # AI Prompts

   [prompts.json content]
   ```

## Edit Mode (Improvement Context)

When invoked with improvement context (`mode: "edit"`), this skill edits existing emails.md rather than generating new copy.

### Detecting Edit Mode

Check for improvement context in the conversation:
- `mode: "edit"` indicates edit mode
- `trigger: "analytics"` or `trigger: "feedback"` indicates source
- `improvement_instruction` contains specific changes to make

### Edit Mode Workflow

1. **Read improvement context**: Extract `improvement_instruction` object
2. **Load existing emails.md**: Read current email copy from campaign folder
3. **Identify scope**: What specifically to change (see scope table below)
4. **Apply targeted changes**: Only modify what's specified
5. **Generate diff**: Show before/after comparison
6. **Get approval**: Wait for user to confirm changes
7. **Save**: Update emails.md with approved changes
8. **Log**: Update improvement-log.md in plan folder

### Handling Edit Scopes

| Scope | Action | What Changes |
|-------|--------|--------------|
| "Email 1 subject" | Modify Email 1 subject line only | Subject line text |
| "Email 3 body" | Modify Email 3 body text only | Body content |
| "All subjects" | Modify all subject lines | All subject lines |
| "All CTAs" | Modify call to action in all emails | CTA sentences |
| "Tone adjustment" | Rewrite with new tone | All body text |
| "Full rewrite" | Generate new copy from strategy.md | Everything |

### Edit Mode Output Format

```markdown
## Proposed Changes to emails.md

### Email 3 Subject Line

**Before:**
Subject: {{Subject Line}}

**After:**
Subject: Quick q about {company}

**Rationale:** Less AI-heavy subject line to test if personalization is causing fatigue

---

Approve these changes? [Yes/No/Modify]
```

### Preserving Context During Edits

When editing:
- **Keep unchanged emails intact**: Don't touch emails not in scope
- **Maintain placeholder names**: Use exact same AI variable names
- **Preserve email structure**: Keep delays, numbering, format
- **Respect strategy.md**: Changes should align with campaign goals

### Analytics-Informed Editing

When `analytics_context` is provided:
- Reference `sequence_stats` to understand email-specific performance
- Use `weak_spots` to focus improvements
- Consider `sibling_comparison` for what worked elsewhere

### Feedback-Informed Editing

When `feedback_context` is provided:
- Address specific client/CSM concerns
- Match tone to feedback type (e.g., "too pushy" = softer approach)
- Document feedback in improvement-log.md

### Edit Mode Checklist

Before saving edits, verify:
- [ ] Only specified scope was modified
- [ ] AI variable placeholders match prompts.md
- [ ] Email structure preserved
- [ ] Changes align with improvement rationale
- [ ] Diff shown and approved by user
