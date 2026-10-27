---
name: segmentation
description: Divide a prospect list into campaign segments with AI prompts or hard filters, so each group gets messaging that fits it. Use after qualification when planning a cold-email campaign. Triggers on "segment my list", "split these leads into segments", "write segment descriptions".
---

# Segmentation Skill

Split a campaign's qualified leads into the plan's segments so each group gets the right messaging. You write the segment descriptions the assigner reads, plus the Default segment's description.

You write them to `segmentation.md` in the campaign workspace (`./cold-email/{slug}/`) and create one folder per segment. The user runs the AI segments' descriptions as prompts in any AI tool (a chat, an AI column in Clay or a spreadsheet, one lead at a time) and the manual segments as hard filters in their list tool. Nothing is written to any platform.

## Inputs

The plan's segments (name, sub-ICP, angle), the qualification audience description, and the applied search filters and qualification criteria (so you repeat neither). Read them from the campaign workspace:

1. `plan.md` - the segments, their angles and the segmentation mode.
2. `qualification.md`, when it exists - the audience description to reuse, and the criteria not to repeat.
3. `search-strategy.md` - the filters already applied. Never restate any of them in a segment.
4. `research.md` - the client and the ICP.

When the skill runs on its own, without a workspace, take the same inputs from the user.

## Pick the Mode

| Mode | In `segmentation.md` | Use when |
|------|----------------------|----------|
| Manual | `manual` | The split is a hard filter: industry, seniority, function, geo, company type, email validity. The user's list tool applies it for free. Prefer it. |
| AI | `ai` (the default) | The split needs judgment from profile or company text (e.g. product company vs services hybrid). One AI call per lead. |
| A/B arms | `percentage` | A sequence test: random split by weight, no criteria. |

Never mix A/B arms with criteria segments in one campaign.

## The Default Segment

- Every campaign has a Default segment, and its folder is always `0 - default/` (literal, no variation). Never rename it.
- Default catches every qualified lead that fits no other segment, plus any lead the assigner is not confident about.
- Its description is the short general audience description: persona + org type only (e.g. "Financial advisors at independent advisory practices"). No criteria, filters, headcount, geography, value prop, or "doesn't fit the above" wording.
- Default gets its own sequence like any other segment. Leads that fall through still receive email.

## Write Segment Descriptions (AI mode)

- **Write short, trust the AI** - a sentence or two per segment. Describe the persona, not a keyword list.
- **Self-contained and mutually exclusive** - each description names its own observable signals (role focus, company type, industry cues, stage, size) and never refers to other segments.
- **Checkable** - write each description around what a LinkedIn profile and basic company data (industry, headcount, HQ, description, website title) show, since that is what the user's AI tool usually gets per lead. Do not lean on news, tech stack, funding, or full site content unless the user's list carries those columns.
- **Never restate a search filter or a qualification criterion.** Reuse only the audience description.
- **Cover the audience** - every qualified lead lands somewhere; Default takes the rest. Ask the AI for a one-line reason per lead, so concrete signals keep routing auditable.

## How the User Runs the Assignment (AI mode)

- One choice question per lead. Each AI segment is an option, with its description as the option text. Default is listed last as the catch-all. Manual segments are not options: their filters run in the list tool first, and only the leads left over go to the AI.
- The AI also gets the audience description from `qualification.md`, and answers with the segment name, a confidence from 0 to 1 and a one-line reason. Confidence of 0.6 or more keeps the chosen segment; anything lower, or an answer that names no segment, goes to Default.
- Write that prompt into `segmentation.md` under `## Assignment Prompt`, ready to paste, with `{lead}` where the user puts one lead's profile and company data. Keep it short: the descriptions carry the judgment.

## Write the Files

Show the proposed Default description and each segment to the user first. Write nothing until approved. Then:

1. Write `segmentation.md` at the workspace root, in the shape below.
2. Create one folder per segment: `0 - default/` always, then `1 - {segment-slug}/`, `2 - {segment-slug}/` and so on, in plan order. The slug is the segment's name in lowercase, with hyphens for spaces and no special characters, and it must match the segment's name in `segmentation.md` and `plan.md`.
3. Confirm: "Segmentation saved. Created segment folders: [list]".

When the skill runs on its own, without a workspace, return `segmentation.md` in the chat instead.

AI mode (the default):

```markdown
# Segmentation - {Campaign Name}

## Segmentation Mode
ai

## Audience Description
[Reused from qualification.md, or one short sentence: persona + org type, no filters]

## Segments

### Segment 1: {Name from plan.md}
[One or two sentences: who belongs here, by signals a profile or company page shows]

### Segment 2: {Name from plan.md}
[...]

## Default Segment
[The short general audience description: persona + org type only. No criteria, filters, headcount, geography, or "doesn't fit the above" wording. Folder: `0 - default/`.]

## Assignment Prompt
[The ready-to-paste choice question above]
```

**Manual:** write each segment's filters instead of a description, in the same terms as `search-strategy.md` (title, seniority, function, industry, headcount, geography, company type), so the user can apply them in their list tool or as a filter on their spreadsheet. Check that no two segments' filters overlap, and that the leads they leave out land in Default. When **search-strategy** built separate lists for one campaign, re-split them with manual segments; qualification still covers the union of the lists.

**A/B arms (`percentage`):** each arm, Default included, carries a `- **Weight**: N` line instead of a description, and no Assignment Prompt. All weights, Default included, are integers summing to exactly 100 (Default = `100 - sum(arms)` when not stated). Default is the baseline, or control, arm. Each arm's whole sequence lives in its own folder, and the user splits the list at random by those weights in their list or sending tool.

Report the mode, the Default description, and each segment with its folder.

## Recruiting campaigns

For a recruiting campaign, one that fills a role, segments split the candidates by why they would move, not by what they would buy. Take the role from `plan.md`.

- Good angles: the step up (more scope, the next title), the match (they already do this work, with this stack or in this domain), the place (close to the office, or remote when they are not today), the tenure (a long time in their current role), the company stage (from a large company to a smaller one, or the reverse).
- Each description names what a profile shows, so the AI can assign people: current title, past titles, years in the current role, company size, skills.
- Never segment on age, gender, race, religion, disability, family status or nationality, or on a guess at any of them.
- The Default keeps everyone who fits the role but no named angle.
