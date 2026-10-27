---
name: campaign-strategy
description: "Design the per-segment cold-email sequence: each email's goal, timing, hook, proof and CTA, and the AI personalization variables it needs. Use before writing copy for a segment. Triggers on \"plan the sequence\", \"design the email strategy\", \"what should each email say\"."
---

# Campaign Strategy Skill

Transform the client research and the campaign plan into an actionable email strategy for **one segment**: a sequence blueprint and AI personalization variables for **email-copywriting** and **prompt-writer** to execute. Save it as `strategy.md` in the segment's folder.

## Workflow Position

Runs after the campaign plan (**create-campaign**) and **segmentation**, once per segment (`0 - default` included). Then: **email-copywriting** drafts the segment's `emails.md`, **email-review** scores it and writes the reviewed `emails_v2.md`, and **prompt-writer** writes and tests the AI variable prompts in `prompts.md`. Never skip to copy without a strategy for that segment.

## Workspace

Everything lives in the campaign folder `./cold-email/{slug}/`:

```
./cold-email/{slug}/
├── research.md          # client research: ICP, value prop, case studies, lead magnets
├── notes.md             # optional client preferences and feedback
├── plan.md              # H1 = campaign name; 1 ICP + 1 offer + N segments
├── segmentation.md      # segment names and definitions
├── 0 - default/
│   └── strategy.md      # THIS skill's output for the Default segment
└── 1 - {segment-slug}/
    └── strategy.md      # one per segment
```

`strategy.md` is read by **email-copywriting** and **prompt-writer**, not parsed by code, but three things must agree exactly: the AI variable names here, the `{{Title Case}}` tokens in `emails.md`, and the `###` headings in `prompts.md`.

## Inputs

- **Campaign folder** (required) - `./cold-email/{slug}/`. Ask for it when the user has more than one.
- **Segment** (required) - its folder (`1 - {segment-slug}/`, or `0 - default/`) or its name in `segmentation.md`; if several match, list them and ask.
- **Campaign goal** - book demos or meetings, drive landing-page clicks, get replies for qualification, or promote a lead magnet.

You need the plan (broad ICP, this segment's criteria and angle, the offer and CTA, any Testing Hypothesis) and the client research (overview, ICP, value prop, case studies, lead magnets, preferences). Use what the conversation already holds and read only what is missing:

1. **Plan** - `plan.md` in the campaign folder.
2. **Research** - `research.md` in the campaign folder, and `notes.md` when it exists (client preferences win over generic rules). When the user keeps a company folder from **knowledge-setup**, read its overview, ICP, proof and voice files too.
3. **Segments** - `segmentation.md`, so the target segment and its exact name are right.

Stop only when there is no plan or no research anywhere; then name the skill to run first (**create-campaign** for the plan, **client-research** for the research). Never invent the ICP, angle, offer, case studies or metrics.

**Section name**: `Strategy - <segment name>`, with the segment's name exactly as `segmentation.md` has it. The Default segment's section is `Strategy - Default`.

## Strategy Document

`strategy.md` holds this one section, in the same shape a combined plan uses, so its parts are `###` headings and each email is `####`:

```markdown
## Strategy - {Segment Name}

### Segment Overview
- **ICP**: {Broad ICP from the plan}
- **Segment**: {Segment criteria from the plan / segmentation.md}
- **Angle**: {Messaging angle from the plan}
- **Goal**: reply-based / click-based
- **Funnel Type**: {type}

### Email Sequence
Cadence: waitDays 0/3/4/4
[One blueprint per email, each under `#### Email N` - see Per-Email Blueprint]

### AI Personalization Variables
[One entry per variable - see AI Personalization Variables]

### AI Rewriting (Optional)
Enable: [yes/no]
Tone: [description]

### Sequence Tests (Optional)
[Only when it supports the plan's Testing Hypothesis]
```

## Core Principles

1. **Building blocks** - Treat copy and campaigns as modular blocks tested in many combinations; volume of combinations is how we learn what works (`references/building-blocks.md`).
2. **Start strong, diversify, close strong** - Email 1 uses the strongest angle, middle emails try new angles, the final email uses the second-strongest.
3. **Relevance over personalization** - Not just `{firstName}`: show real understanding of their world with AI variables from LinkedIn and the website.
4. **One idea per email** - One goal, one CTA, one main point.
5. **Value-first** - Every touch gives insight, education, or genuine help.
6. **Data constraints** - AI variables can use ONLY the company website main page, the LinkedIn company page, and the LinkedIn profile. No news, events, funding, or timely triggers.
7. **A funding round is not a buying event** - When the plan names a raise, write to what the money pays for (hiring, a launch, a new market). Never "congrats on the raise".

## Sequence Structure

- **2-6 emails, usually 3-5.** Follow the step count in the plan.
- **Wait days**: the wait on Email N is the days **before Email N sends**, counted from the previous email. Email 1 is `0`; follow-ups wait 2-4 days; the final email may wait up to 5. Send days 0/3/7/11 are wait days **0/3/4/4** (not cumulative). Putting the gap after Email N onto Email N is the common off-by-one. State the cadence once (`Cadence: waitDays 0/3/4/4`) and on each email (`**Delay:** N days`).
- **CTAs**: reply-based for meetings, click-based for lead magnets. **Every email asks for the actual offer, including Email 1**, which leads with the strongest version of that ask. No soft diagnostic questions as CTAs. Never send a naked booking link; ask a direct question first.
- **Length**: static bodies at or under ~80 words, follow-ups well under. email-review enforces a hard ceiling.
- **Format**: AI variables are double-brace Title Case tokens (e.g. `{{First Line}}`). Every email signs off with `{sender_signature}` on its own line, or the two-line sender-name block when the user's sending tool has no signature variable (**email-copywriting** has the rule).
- **Lead magnets**: you may recommend an asset for the client to create, but never reference or link one in the sequence unless the research proves it exists.

### Per-Email Blueprint

You are not writing the emails; you define what each one accomplishes. Give every email: **Goal**, **Delay**, **Hook** (what the first 1-2 lines do), **Content** (which value prop, case study, or insight), **Proof** (names, metrics, methodology), **CTA** (reply or click, and the exact ask for the offer), and **Tone** (style and length).

Be specific. Not "make it relevant" but "Open by asking if they've noticed [specific trend]; curious, not salesy." Not "add social proof" but "Include the 3x metric and two recognizable customers in their industry." Proof comes only from the research: never invent a customer, a metric or a result.

- **Email 1** - the best value prop or insight, relevance immediately, the most direct offer ask.
- **Middle emails** - each makes ONE distinct point (case study, different pain, lead magnet, industry insight), distinct from Email 1 and each other.
- **Final email** - the second-best angle, then the offer ask. It never announces itself ("Just following up", "Last note from me"); urgency comes from value.

Format and a full worked example: `references/email-sequence-guide.md`.

### AI Personalization Variables

Each variable is a name plus a description.

- **Name** - Title Case with spaces, 30 characters or fewer (`Subject Line`, `First Line`, `PS Line`). It must match exactly across this strategy, the `{{...}}` tokens in the copy, and the prompt-writer variable names. Name a recurring slot uniquely (`PS Line`, `PS Line 2`).
- **Description** - states all five: what to generate, the exact data source, tone, a length limit, and a fallback ("If [data] is not available, skip").
- **Default layout** - `First Line` + `PS Line` in Email 1 and `PS Line 2` in the last email only, not a first line and PS on every email.
- **Proven templates** - Subject Line: 3-4 words (max 6), lowercase except the first letter and proper nouns, no ending punctuation or emojis, one specific detail. First Line: under 20 words, no greeting, no question, an observation about their role, company, or market. PS Line: 1-2 casual sentences starting with "PS", one small profile detail, never an invented connection.

Data fields, more variable types, and depth levels: `references/ai-variables-guide.md`.

### AI Rewriting

Include the AI Rewriting section when the campaign uses AI personalization (first lines, PS lines, body variables), higher quality or variation is wanted, and the budget allows: rewriting runs one more model call on every contact. Skip it when there are no AI variables, only subject-line variables (rewriting subjects is too risky), or the budget is tight. When enabled, **prompt-writer** adds a rewriting prompt at the end of `prompts.md` and marks the non-subject variables for rewriting.

## Sequence Tests

Two A/B levels, don't confuse them:

- **Email-step A/B** (this skill) - Variant A / Variant B inside one step: subject, hook, body length, CTA phrasing, PS line, timing, proof placement. **email-copywriting** writes the variants in `emails.md`.
- **Whole-sequence A/B** - the plan's `percentage` mode: each arm is its own segment folder with a totally different sequence. Write each arm's sequence normally and usually skip in-step variants there.

The campaign plan (`plan.md`) owns ICP, messaging-angle, offer, and whole-sequence tests; never duplicate them. Rules:

- At most **1 test per strategy**, and it must support the plan's Testing Hypothesis (refine HOW, never change WHAT).
- Hold constant the ICP, angle, offer, and AI variables; vary one delivery element only.
- State a hypothesis and one primary metric: reply rate, positive (interested) reply rate, or click rate. Never opens.
- Propose only with 5,000+ prospects and two reasonable approaches. Skip for a first campaign, under 2,000 contacts, an already complex macro test, no clear hypothesis, or when the plan tests ICP.
- Variants are A/B arms: each one sends to its share of the segment. Once the sequence is sending, a copy change replaces the steps, never a new Variant B; add a variant then only when the user asks for a new test.

Testable variables, the section format, examples, and anti-patterns: `references/sequence-tests-guide.md`.

## Workflow

1. Confirm the campaign folder and the target segment.
2. Read `segmentation.md` and take the segment's exact name (Default -> `Strategy - Default`).
3. Load the plan and research (above).
4. Read the references as needed.
5. Check for a sequence-test opportunity (optional, rules above).
6. Draft the full strategy in chat.
7. Get the user's approval.
8. Write it to the segment's `strategy.md` (below).
9. Hand off: run **email-copywriting** for this segment, then **email-review** and **prompt-writer**.

## Save

Write the approved strategy to `strategy.md` in the segment folder, replacing the file when it exists. The other segments' folders and `plan.md` stay as they are. Then confirm:

> Strategy saved to `{segment folder}/strategy.md`. Next: run **email-copywriting** for this segment, then **email-review** and **prompt-writer**.

## Alignment Checklist

- [ ] Value props from the research run through the sequence
- [ ] Segment-specific pains drive the hooks
- [ ] The plan's angle shows in the messaging
- [ ] Funnel type matches the campaign goal
- [ ] Lead magnets (only real ones) appear at the right point
- [ ] AI variables are feasible with the allowed data sources
- [ ] Each email has a distinct purpose
- [ ] Wait days follow the before-email rule
- [ ] Variable names are Title Case, 30 characters or fewer, and match the planned tokens

## Edit Mode

With improvement context (`mode: "edit"`, a `trigger` of `analytics` or `feedback`, and an `improvement_instruction`), edit only the requested parts of the segment's `strategy.md`: preserve the ICP, data constraints, funnel type, and core value prop unless told otherwise, show a before/after diff, save only after approval, tell the user which downstream skills to re-run, and add a dated entry to `improvement-log.md` in the campaign folder. Check reply classification and bounces before you blame the strategy. Scopes, preservation rules, the diff format, and cascade rules: `references/edit-mode.md`.

