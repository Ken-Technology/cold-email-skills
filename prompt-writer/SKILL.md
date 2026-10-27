---
name: prompt-writer
description: Write the AI personalization prompts behind each variable in a cold-email sequence (first lines, subject lines, PS lines) and test them on sample prospects. Use after the copy is approved. Triggers on "write the personalization prompts", "write a first line prompt", "personalize these emails".
---

# Prompt Writer Skill

Write the AI personalization prompts (AI variables) for one campaign segment into the segment's `prompts.md`, with an optional rewriting steering paragraph, and test each prompt by hand on 3 to 5 sample prospects in any LLM. The user runs them per prospect in their own personalization tool (an AI column in Clay, their sending tool's AI step, or any LLM). You write only the **user prompts** (`to_output: true`) and the optional steering paragraph; the supporting context (who the sender is, the company context, the writing rules, the email sequence) comes from `research.md` and `emails_v2.md` when they run.

Never send or launch anything. Removing a variable from `prompts.md` happens only after the user asks for it.

**Where this fits:** after **campaign-strategy**, **email-copywriting** and **email-review** have set the AI variable names and placed their `{{Title Case}}` tokens in `emails_v2.md`; the last step before the segment is ready to send.

## Inputs

`{workspace}` = the campaign workspace (default `./cold-email/{slug}/`); `{segment_folder}` = the segment's folder in it (`0 - default/`, `1 - {segment-slug}/`).

- **Strategy AI variables** (name, placement, short description): the AI variables section of `{segment_folder}/strategy.md`, or from the caller.
- **The sequence:** `{segment_folder}/emails_v2.md`, the reviewed copy (`emails.md` when there is no v2 yet). Every `{{Title Case}}` token in a subject or body needs a prompt.
- **Written prompts:** `{segment_folder}/prompts.md` when it exists.
- **Company context:** the `## Company Context` section of `{workspace}/research.md` (its summary when there is none), plus the rest of the research and the client notes in `{workspace}/notes.md`.
- **Data sources:** what the user's personalization tool gives the AI for each prospect (see Data Source Constraints).

The prompts live in `{segment_folder}/prompts.md`.

## Live constraints (HARD)

Personalization tools enforce limits like these, and the copy relies on them. Breaking one fails the import or silently breaks the sequence.

| Constraint | Rule |
|------------|------|
| Variable name | Title Case plain text (`First Line`, `Subject Line`), no underscores, colons or special characters, **max 30 characters** |
| Prompt text | Non-empty, **max 4096 characters**, no `---` line inside |
| Name uniqueness | Unique after lowercase snake_case normalization (`Subject Line` collides with `subject_line`) |
| Sequence match | Names match the sequence's `{{Title Case}}` tokens exactly (`{{First Line}}` needs a variable named `First Line`) |
| One value per LEAD | One prompt produces one value per lead. A token reused in Emails 1-3 sends the same sentence three times (previews often show it filled on Email 1 and blank later - blank means reused, not missing). Distinct openers need distinct names (`First Line`, `Bump First Line`, `Nudge First Line`). Reuse is right only for an identical value, such as `{{Subject Line}}` on every subject. If the copy reuses a body token across emails, flag it back to **email-copywriting** instead of writing one shared prompt. |

**Good names:** `First Line`, `Subject Line`, `PS Line`, `Role Pain Point`
**Bad names:** `personalized_first_line`, `campaign_name:company_context`, `subject_line`

Keep it to 3-5 output variables per email: each one adds processing time, and over-personalizing every email is the most common operator complaint.

## Execution Tasks

Run these in order.

### Task 1: Load context
- [ ] Confirm the segment folder.
- [ ] Confirm the data sources the user's tool gives the AI (Inputs). If they don't know, do not stop: use the safe defaults below.
- [ ] Read `emails_v2.md` and list every `{{Title Case}}` token.
- [ ] Read the segment's `prompts.md` when it exists.
- [ ] Load the strategy's AI variables, the company context, research and client notes.
- [ ] Read the prompt engineering guide: `references/prompt-engineering.md`.

### Task 2: Draft user prompts (in chat)
- [ ] Expand each strategy variable (and every sequence token) into a full prompt.
- [ ] Base Subject Line, First Line, PS Line, Role Pain Point, Industry Context and Company Size Context on the Standard Variable Templates.
- [ ] Apply the Prompt Customization Rules (no examples in the standard variables).
- [ ] Use only valid data sources for this campaign.
- [ ] Include a **Subject Line** variable when the sequence uses `{{Subject Line}}`, from the template unless the strategy defined it.
- [ ] For a variable whose blank output would break the email (usually First Line), plan a **Fallback**: one plain-text sentence, no `|`, `{` or `}`.
- [ ] Show the full draft to the user for approval. Do not save yet.

### Task 2b: Rewriting steering (optional, recommended)
- [ ] Pull voice and tone cues from the company context, `research.md`, `emails_v2.md` and `notes.md`.
- [ ] Draft 2-10 sentences on voice, sentence rhythm, sequence flow or campaign-specific anti-patterns (see Rewriting Instructions).
- [ ] Do not repeat generic rewriting defaults (no em-dashes, spam words, AI-tells, formatting).

### Task 3: Self-review (REQUIRED before saving)

One inline pass in the same turn; apply fixes, then present the revised draft if anything material changed. Checklist: `references/review-workflow.md`.

Priority: conversation feedback, then client notes, then the strategy's variable set, then the Prompt Customization Rules, then data source constraints (non-negotiable).

**Reject or fix any prompt that:**
- references news, press, funding, events, non-LinkedIn social media or blog content;
- adds examples to First Line, PS Line or Subject Line (unless heavily customized);
- uses a PS format other than `PS: ` (not `PS -`, `PS.` or a bare `PS`);
- adds "Quick question" or typical outreach phrasing to the subject line;
- rewrites the PS or Subject Line template wholesale (slight changes only);
- puts lead-variable syntax (`{firstName}`) inside the prompt text;
- leaves a sequence token without a prompt, or a name that does not match its token.

### Task 4: Write prompts.md (after user approval)

Write `{segment_folder}/prompts.md` in this shape:

```markdown
# AI Personalization Prompts

Campaign: [campaign name from plan.md] | Segment: [segment folder name]
Written: [date]

## Variables Overview

| Variable | Location | Email(s) | Rewrite | Fallback |
|----------|----------|----------|---------|----------|
| Subject Line | subject | all | no | - |
| First Line | opener | 1 | yes | "..." |

## User Prompts (To output: true)

### Subject Line
**Location**: subject
**Email(s)**: all
**Rewrite**: no

**Prompt**:
[full text]

### First Line
**Location**: opener
**Email(s)**: 1
**Rewrite**: yes
**Fallback**: [one plain sentence]

**Prompt**:
[full text]

## Rewriting Instructions
[2-10 sentences, or leave this section out]
```

- One H3 per variable, named exactly as its `{{Title Case}}` token in `emails_v2.md`. The prompt text runs from `**Prompt**:` to the next `### `, `## ` or `---` line, so never put a `---` line inside a prompt.
- Write **every** sequence token plus Subject Line. When `prompts.md` exists, change only the prompts that changed and keep the rest as they are.
- `Rewrite`: no for Subject Line and other short keep-as-is outputs, yes for First Line, PS Line and body variables (see Rewriting Instructions).
- Remove a variable only when the user asked for it, or its token left the sequence and the user agreed. A rename must match a token `emails_v2.md` already has.
- Confirm: the prompts are in `{segment_folder}/prompts.md`, ready to run in the user's personalization tool or any LLM.

### Task 5: Test by hand (after writing)

Gate: the user has sample prospects - rows from their list with the data the prompts read (LinkedIn profile, company page, website text). If not, skip, say so, and stop after writing.

- 3 to 5 sample prospects per round, **max 3 rounds**. Run the prompts yourself on the samples the user gives you, or give the user the steps to run them in any LLM: the supporting context once (the Instructions, Company Context, Rules and Email Sequence in `references/prompt-engineering.md`, filled from `research.md` and `emails_v2.md`), then each prospect's data with each prompt.
- When the user's stack rewrites outputs, run the rewriting steering on the variables with Rewrite yes, and judge the rewritten line: that is what reaches the prospect.
- Score each round: Pass when every sample is acceptable, Minor when most are, Major when half or fewer are or a problem is systemic. On Minor or Major, fix the pattern, rewrite `prompts.md` (Task 4), and re-test. After round 3 still failing, keep the best version, warn the user and recommend a manual review.
- Summarize each round in chat; write no results file.

Criteria, quality thresholds, issue patterns and the round summary: `references/live-test.md`.

## Data Source Constraints

**CRITICAL:** prompts may reference only the data the user's personalization tool gives the AI for each prospect. Ask the user which of these it provides; do not assume.

| Source | Data available |
|--------|----------------|
| LinkedIn profile | Title, company, location, previous roles, education, skills, summary |
| LinkedIn company | Industry, headcount, headquarters, description |
| Website content | Company website pages (home by default): products, services, target market, value prop |
| Website metadata | Site title and description |
| Technology data | Tech stack - reference only when the user's tool provides it |
| LinkedIn posts | Recent posts - only when provided; most prospects rarely post, so never rely on it |

The homepage alone is usually enough website content. Lean on product or services pages only when a prompt discusses the prospect's offerings.

**Safe defaults** (the user does not know what their tool provides): company website main page, LinkedIn company page, LinkedIn individual profile. Continue with these; no hard stop.

**Never available**, whatever the campaign: news articles or press releases, funding, recent events or triggers, social media other than LinkedIn, blog content, tech stack (unless the user's tool provides it), anything time-sensitive.

**Lead data is injected for you.** First name, company and the other lead fields are already in the AI's context. Never put variable syntax in prompt text; describe the data in words: "Based on their job title from LinkedIn..." not "Based on {title}...". Double-brace tokens belong only in the email sequence; a prompt's **name** is the Title Case form without braces.

## Prompt Writing Guidelines

Each prompt states:
1. **What to generate** - "Write a subject line that...", "Generate a 1-sentence opening that..."
2. **Tone and style** - conversational, professional but friendly, insightful not generic
3. **Constraints** - length, format, no questions or emojis, start with `PS: `
4. **Fallback** - "If not available, use their role instead" / "Skip if no relevant data"

## Standard Variable Templates

### Subject Line
```
Write a very short subject line that grabs attention and sparks curiosity in fewer than 6 words, ideally 3-4.
Make it relevant to a challenge, wish, hobby, or activity. Do not add emojis or punctuation. Use lowercase except for the first letter, and capitalize the first letter of company and person names.
Focus on a single, specific small detail from your research; it can be personal. The goal is to intrigue the prospect quickly and make them curious about the email's contents in just 3-4 words.
```

### First Line
```
Write the first line of the email. Refer to the template above to see where it fits in the initial message. Don't write any greeting.
The goal is to hook their attention, make the line very personalized, and lead smoothly into the rest of the email. Keep this line short, under 20 words.
It should spark curiosity, be intriguing and simple, and avoid gimmicks. Do not sound robotic. Most important: do not be boring.
Avoid emojis, exclamation marks, and questions. Don't just summarize information about them.
Aim for a pleasant, genuine tone that reflects the company: smart, concise, personalized, and straightforward, using simple language.
```

### PS Line
```
Write a PS line for this email that starts with "PS: " and continues. Keep it short: one or two sentences. The goal is to be human and to reflect your personality as a creator. This line should be casual and personal - an opportunity to add more humanity to your outreach.
Make the PS about them, not about you. Include a very small personal detail that few people notice - something hidden on their website or LinkedIn profile. Don't try too hard or make broad assumptions; if you do assume something, mention that you're assuming. Humor is good but subtle - if you see something funny in their profile, you can laugh at it or lightly develop the joke.
This is also a chance to share a small, catchy idea for them. Keep it genuine and brief. Do not invent connections, invite them to anything, or offer help you can't back up. Avoid generic compliments; instead, make them feel noticed and special.
```

### Role Pain Point
```
Based on their job title from LinkedIn, reference a pain point typical for that role. Be specific to seniority: VPs/Directors - scaling, team efficiency, cross-functional alignment. C-suite - strategy, competitive positioning, board concerns. Managers - execution, reporting, resource constraints. 1 sentence max that feels like something only someone in their role would understand.
```

### Industry Context
```
Based on company industry from LinkedIn, reference a common challenge or priority in that industry. Keep evergreen - not news or events, just general industry dynamics. Example for healthcare: 'In healthcare, compliance and patient data security are always top of mind.' 1 sentence, conversational.
```

### Company Size Context
```
Based on LinkedIn company headcount, reference challenges typical to that size. 10-50: wearing multiple hats, limited resources. 50-200: scaling pains, process gaps. 200-1000: coordination complexity, tool sprawl. 1000+: enterprise complexity, change management. 1 sentence showing you understand their scale.
```

## Prompt Customization Rules

- **Examples:** none in First Line, PS Line or Subject Line unless heavily customized - examples constrain creativity. Other custom prompts may carry examples when they need a specific structure.
- **PS Line:** start from the default template and change it only slightly; never write a PS prompt from scratch. Format is always `PS: `.
- **Subject Line:** stay close to the default formula, customize only the campaign angle, never add "Quick question" or outreach clichés.
- **You may customize:** which LinkedIn or website fields to prioritize, tone, industry context or pain points, length limits.
- **Do not customize:** the core structure of the First Line, PS Line or Subject Line templates, or the fundamental approach of the standard variables; do not add example outputs that constrain the AI.

## Rewriting Instructions

When the user's stack runs a rewriting pass on the personalized lines, its own rewriting prompt carries the defaults (core principles, email flow, style, spam and deliverability rules, formatting) with the company context, the audience and the email sequence, and your **steering paragraph** goes on top as higher-priority custom instructions. You write only that paragraph.

### Rewrite per user prompt

| Rewrite | Typical use |
|---------|-------------|
| no | Subject Line and other short keep-as-is outputs (rewriting them is too risky), very simple or formulaic outputs where consistency matters more than variation |
| yes | First Line, PS Line, body variables |

Only user prompts with Rewrite yes go through rewriting.

### What to write

Pick 1-3 angles distinctive to this client or segment: voice and tone (punchy, technical, warm, dry, founder-to-founder); sentence structure and rhythm; how personalized lines hand off into this segment's body copy; campaign-specific anti-patterns ("don't sound like a recruiter"); how much the rewrite should show research.

**Do not write:** the injected defaults (em-dashes, spam words, "I noticed", exclamation marks, formatting), long justifications, or output examples.

**Length and style:** 2-10 sentences (3-6 is the sweet spot), conversational prose, not bullets. The rewriter picks up the instruction's own tone.

**Example:**
```
Make it sound as cool as possible. Show you've researched them. Use shorter sentences like I'm doing now. Better to have 2 shorter punchy sentences instead of 1 long boring one. Use power words. Sound human.
```
Six sentences, conversational, covering voice, rhythm and research signaling, with no defaults repeated.

**When to omit:** only when the campaign has no distinctive voice or flow need. In practice most campaigns benefit from 2-3 sentences, so include them by default.

## Models

- Write prompts that work on any capable model; never name a model in a prompt.
- When the user wants to compare models, run the same samples through each in Task 5.

## Chat draft shape (for approval)

Show the draft in the `prompts.md` shape from Task 4, before you write the file.

## Approval points

- **Auto-proceed:** minor test fixes (length limits, small wording); a pass on the first round.
- **Pause for approval:** the first draft before writing; major rewrites (data sources, restructured variables); removing or renaming a variable; a third test round with persistent issues.

## Quality checklist (before saving)

- [ ] Every strategy variable and every live-sequence `{{Title Case}}` token has a prompt; Subject Line included when used
- [ ] Names Title Case, max 30 chars, unique after snake_case normalization, matching the tokens
- [ ] No body token reused across emails (one value per lead)
- [ ] Prompt text max 4096 chars, no `---` line, no lead-variable syntax
- [ ] Valid data sources only (enrichments or safe defaults)
- [ ] Clear format and length constraints and a fallback in every prompt
- [ ] Rewrite plan: no for Subject Line, yes for First Line, PS Line and body variables
- [ ] Rewriting steering 2-10 sentences, no repeated defaults, or deliberately omitted
- [ ] No hard-coded model ids

## Edit mode

When asked to improve existing prompts (`mode: "edit"`, analytics or feedback):
1. Read `{segment_folder}/prompts.md`.
2. Scope the change (subject only, first line only, all user prompts, add or remove a variable). Keep unaffected prompts, names and data-source limits intact.
3. Show a before/after with a one-line rationale and get approval.
4. Change only the prompts in scope in `prompts.md` and keep the rest, with their Rewrite and Fallback lines. Adding a variable adds an H3, removing one deletes its H3, and a rename must match a token `emails_v2.md` already has.
5. Optionally re-test (Task 5).

| Cue | Response |
|-----|----------|
| "AI feels off" | Tighten constraints and fallbacks |
| "Too generic" | Name specific LinkedIn or website fields |
| "Forced connections" | Strengthen the never-assume rules |
| An underperforming email (analytics) | Check which prompts that email uses and whether personalization helps or hurts there |

Weak output usually has one of three causes: the campaign lacks the enrichment a prompt leans on, the prompt is vague, or rewriting is off. Check them in that order before rewriting prompts wholesale.

## Errors

| Error | Action |
|-------|--------|
| Enrichments unreadable or empty | Use the safe default sources; continue |
| Name or length validation on save | Fix names (Title Case, max 30) or prompt length (max 4096); re-approve if the change is material |

## Resources

Each one is in `references/`:

- `prompt-engineering.md` - prompt anatomy, what the system prompts already say, the variable fields, creative variables, complete example, common mistakes
- `review-workflow.md` - self-review checklist and priority rules
- `live-test.md` - hand test runs, criteria, issue patterns, revision loop, other prompts, round summary

## Confirm

> Personalization prompts written to `{segment_folder}/prompts.md`. Rewrite on all non-subject variables. Rewriting steering [written | omitted]. Hand test: [PASS after N rounds | skipped - no samples | PARTIAL - see summary].
