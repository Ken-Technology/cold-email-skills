# Campaign Plan Skill

Generate strategic campaign plans that define a broad ICP and offer, then split the prospect list into sub-ICP segments for more relevant, targeted messaging. After the user approves the plan in chat, write it to `plan.md` at the root of the campaign workspace, `./cold-email/{slug}/`.

## Campaign Model

- **1 broad ICP** + **1 offer** + **multiple segments**.
- Different broad ICPs or different products = different campaigns.
- 1 approved plan = 1 `plan.md` = 1 campaign workspace.
- The plan keeps a single top-level `# {Campaign Name}` H1. That name is the campaign's name.

## Segmentation Modes

A plan uses exactly one mode:

| Mode | What it is | Use when |
|------|------------|----------|
| **`ai`** (default) | Segments are sub-ICP groups (industry, title, stage, signal), each with tailored messaging. AI assigns leads by segment description. | The broad ICP splits into groups that need judgment to tell apart |
| **`manual`** | Same sub-ICP idea, but leads are assigned by hard filters (industry, title, size, geo). Free. | The split is filterable. Prefer it over `ai` |
| **`percentage`** | A sequence A/B test: segments are random arms with weights, each running a totally different sequence. | Testing whole sequences, structures, or offers on one audience |

- Email-step A/B (variants of one step's subject, hook, CTA, or PS) is separate from the mode. campaign-strategy and email-copywriting handle it inside any mode.
- In `percentage` mode the arms get weights, not criteria. All weights, Default included, are integers summing to exactly 100, and Default is the control arm.

## Required Context

Load everything available before planning:

1. **Workspace** - the campaign workspace `./cold-email/{slug}/`. Create it when it does not exist.
2. **Research** - `research.md` in the workspace (from **client-research**), and the company folder from **knowledge-setup** when the user keeps one.
3. **Offers** - `lead-magnets.md` in the workspace, when **lead-magnet** wrote one; otherwise the offers the research or the user names.
4. **Files the user provided** - briefs, transcripts, case studies.

If there is no `research.md` and the user gave no context, offer to run **client-research** first. When the client has no strong offer, run **lead-magnet** first.

**When the offer or audience is unclear**, ask the user at most 3 questions, all in one message. Otherwise draft the plan with sensible defaults and state your assumptions.

## Planning Principles

### 1. Campaign Size
When the user or the calling agent sets a lead target, size the plan to it. Otherwise each campaign targets at least 5,000 contacts: combine small audiences or broaden targeting rather than creating tiny campaigns.

### 2. Segments Are Sub-ICP Groups, Not A/B Tests
Outside `percentage` mode, segments divide the list so each group gets more relevant messaging. They never test messaging angles against each other.

**Split by:** sub-industry ("Healthcare SaaS founders" vs "FinTech SaaS founders"), title ("CEOs" vs "VP Marketing"), company stage ("Seed" vs "Series A-B"), or behavior ("hiring SDRs" vs "using a competitor"). A funding round is not a buying event: plan to what the money pays for (hiring, a launch, a new market), never to the raise itself.

**Each segment gets** messaging tailored to its pains and language, proof points that match its context, and CTAs that fit its buying process. Test hooks with email-step A/B inside a segment, so segment analytics stay clean (you learn which sub-ICP responds).

- Good segments: DevTools SaaS founders (Zenarmor case study), HR/Recruiting SaaS founders (Emissary case study), Healthcare SaaS founders (Performance Health Partners case study).
- Not segments: "Guarantee hook", "Pain agitation", "Social proof". To test those, use `percentage` mode arms.

### 3. Separate Campaigns
Different broad ICPs (titles, industries, company sizes, personas) and different offers (products, lead magnets: demo, PDF, audit, webinar) each need their own campaign.

### 4. Vertical Separation
- **Separate campaigns** when verticals need different offers, value props, or buying processes (Healthcare vs Insurance; DTC vs B2B SaaS; Enterprise vs SMB).
- **Segments in one campaign** when it is the same type of person serving different end-markets (B2B SaaS founders by vertical): match industry case studies, pains, and similar companies per segment.

Rule of thumb: a fundamentally different person (title, buying process) means a separate campaign; the same person in a different context means a segment.

### 5. Default Segment
Every campaign has a Default segment, and its folder is always `0 - default/`. Plan it like any other segment: it catches every qualified lead that fits no numbered segment and gets its own angle and sequence. Never leave it without a sequence: leads that fall through still need email.

### 5a. Designing Segments for AI Assignment
Assignment is one choice question per lead over the segment descriptions. Make it easy:
- 1-5 audience segments plus Default, with mutually exclusive, self-contained descriptions. Each names its own observable signals (titles, company type, industry cues, size, geo) and never refers to another segment.
- Default goes last, as the catch-all: a lead the AI is not confident about (below 0.6) lands there. A genuine catch-all Default keeps that safe.
- Keep the broad-ICP wording consistent across qualification and segments: the same audience description reads the same in `qualification.md` and `segmentation.md`.

### 5b. Multi-list Targeting and Manual Segments
A campaign can draw on several lists. When the broad ICP spans groups that should stay separable (e.g. SaaS founders + agency founders):
1. Plan separate filters per group in **search-strategy**, not one OR of every industry, unless the user wants one blended list.
2. Pull each list separately for the same campaign; split volume half/half by default or by the user's weights.
3. Qualification still covers the union (SaaS **or** agency); it does not replace the list split.
4. Prefer `manual` segments when the split is filterable; use `ai` only when filters cannot express it.
5. Record in the plan: `Import mode: multi_list`, the list shares, and the segmentation mode.

### 6. Campaign Goals
Every plan names an **Email Goal** (positive replies, clicks, or both) and an **End Goal** (meetings, trials, sign-ups, demos). E.g. positive replies -> meetings booked; clicks -> free-trial sign-ups. Opens are never a goal or a metric.

### 7. Analytics-Driven
Campaigns also serve market research (which segments engage), message testing (which hooks land), and offer validation (what buyers want).

### 8. Copy & CTA Conventions (carry into every segment)
State these in the plan so they flow to campaign-strategy, email-copywriting, and email-review:
- **The offer drives every email.** Every email closes by asking for the actual offer (demo, walkthrough, call, sample), **including Email 1**. Never open with a soft diagnostic question as a fake CTA.
- **Short and punchy.** Static bodies stay at or under ~80 words; follow-ups well under.
- **No salesy follow-up endings.** The final email never announces itself ("Last note from me", "just following up").
- **Variable + signature format.** AI variables use double braces around a Title Case name. Every email signs off `{sender_first_name} {sender_last_name} - [title] at [linked client company]`. `{sender_signature}` is deprecated.

## Plan Contents

The plan covers: campaign name (the H1), date, executive summary, client context, Email and End goals, the offer and the exact CTA, the broad ICP, the audience (key search filters, estimated lead count, import mode), qualify and disqualify rules (short; never restating filters), the copy conventions, the segmentation mode, and the segments. Each segment (Default first) has a sub-ICP, an angle, relevant proof, and a 2-6 step sequence outline. Percentage-mode arms carry a weight and a sequence hypothesis instead.

Every offer, price, guarantee, case study and metric in the plan comes from the research or the user. Never invent one; a lead magnet goes in the plan only when it exists or the client agreed to build it.

Full templates (AI mode, percentage mode, improvement-driven) and the plan file's layout: `references/plan-template.md`.

## Workflow

1. **Gather context** (above) and decide whether to ask questions.
2. **Identify opportunities** - what hasn't been tested, what might work better.
3. **Size the market** - estimate the audience: the user runs the draft filters in their list tool (Apollo, Sales Navigator, Clay) and reads the total, or you estimate it from public numbers and say it is an estimate. Adjust the ICP until it fits the target.
4. **Design segments** (or arms) for the mode.
5. **Draft the plan in chat** for review (H1 = intended campaign name).
6. **Get explicit approval** before you write the file.
7. **Write `plan.md`** in the campaign workspace (below).
8. **Hand off** to the next stage, **search-strategy**, then **qualification**, **segmentation** and the per-segment loop (Handoff below).

## Write the Plan

After the yes, write the plan to `./cold-email/{slug}/plan.md`, laid out as `references/plan-template.md` shows. One plan per campaign workspace: when `plan.md` already exists, update it in place and keep the parts the user did not ask to change, never start a second plan.

The later stages write their own files next to it (`search-strategy.md`, `qualification.md`, `segmentation.md`) and into the segment folders (`strategy.md`, `emails.md`, `emails_v2.md`, `prompts.md`), so `plan.md` holds only the plan. Tell the user where it is saved.

## Handoff

The campaign is built stage by stage, each a skill of its own, each reading and writing files in the same workspace:

1. **search-strategy** - portable filters in `search-strategy.md`
2. **qualification** - who is in and who is out, in `qualification.md`
3. **segmentation** - `segmentation.md` and one folder per segment (AI, manual, or percentage arms)
4. **Per segment, Default included**: **campaign-strategy** (`strategy.md`) -> **email-copywriting** (`emails.md`) -> **email-review** (`emails_v2.md`) -> **prompt-writer** (`prompts.md`)

No stage sends email, pushes to a platform or asks for an account. The user loads the finished files into their own tools.

## Improvement Context

When the user brings results from an earlier campaign (which angles, segments and offers got positive replies, which did not), build the new plan on them: lead the summary with what worked and failed, refine or expand sub-ICP segments or test a new offer, never repeat a failed angle unmodified, and use the improvement-driven template in `references/plan-template.md`. Before you call an angle a failure, check that its numbers count positive replies from distinct contacts, not bounces or out-of-office answers.

## Recruiting campaigns

A recruiting campaign fills one role. Take the role from the user: the title, the hiring company, the place and remote policy, the pay range when there is one, the must-haves and the nice-to-haves. The plan has the same shape, with these changes:

- Offer: the role pitch. The title, the hiring company, the place and remote policy, the pay range when the role has one, and one concrete reason the job is good (scope, team, stack). Never invent pay or perks.
- Call to action: a reply, or a short call with the recruiter. Never a demo, a trial or a meeting about buying.
- Audience: the people who could do the job, described by what a profile shows. Write the filters for them with **search-strategy**.
- Qualification: the role's must-haves, written with **qualification**. Nice-to-haves never disqualify.
- Segments: angles for why someone would move, as in the segmentation stage's Recruiting campaigns section.
- Channels: by default LinkedIn first (a connection request with a short note, then a message that goes as InMail when they did not connect), then work email only when LinkedIn did not reach them. Plan the email steps as that fallback: every email must make sense to someone who never saw the LinkedIn messages. When the user asks for one channel, plan that channel only: email only means work email steps and no LinkedIn steps, LinkedIn only means the LinkedIn steps and no email.
- Size: a candidate count the user gives ("up to 25 candidates") caps what is sourced, so an audience larger than the count is fine: never narrow the audience, or a place the user named, to fit it.
- Never plan on age, gender, race, religion, disability, family status or nationality.

Never plan a sales campaign for a role.
