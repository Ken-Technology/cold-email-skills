# Plan Templates

The plan keeps a single top-level `# {Campaign Name}` H1. That name is the campaign's name.

## Where the plan lives

The plan is `plan.md` at the root of the campaign workspace, `./cold-email/{slug}/plan.md`. The later stages write their own files next to it (`search-strategy.md`, `qualification.md`, `segmentation.md`) and into one folder per segment (`0 - default/`, then `N - {segment-slug}/`), so `plan.md` holds only the plan. Each segment's folder name comes from its name in the plan: lowercase, hyphens for spaces, no special characters. Name each segment the way its folder should read.

When a later campaign learns from this one, add an `## Improvement log` section at the end of `plan.md`, with dated entries, newest last.

## AI mode (sub-ICP segments, default)

```markdown
# {Campaign Name}
**Date**: [mm/dd/yyyy]
**Prepared by**: [Name - ask the user for the sign-off name if unknown]

## Executive Summary
[1-2 sentences: the broad ICP, the offer, and the segments]

## Client Context
- **Primary ICP**: [from the company context]
- **Main Value Prop**: [from research]
- **Available Lead Magnets**: [only ones that exist, from `lead-magnets.md` or the user]
- **Past Learnings**: [what the user shares about earlier campaigns, or "none yet"]

## Goals
- **Email Goal**: [positive replies, clicks, or both; never opens]
- **End Goal**: [meetings, trials, sign-ups, demos]

## Offer and CTA
- **Offer**: [the single product, service, or lead magnet]
- **CTA**: [the exact ask every email closes on]

## Broad ICP
[Titles, seniority, industries, company size, geography]

## Audience
- **Search filters**: [key filters: roles, industries, headcount, geography]
- **Estimated lead count**: [count from the search, and the target it was sized to]
- **Import mode**: [single list | multi_list with shares, e.g. 60/40]

## Qualification
- **Qualify**: [who counts as in-ICP, in one or two lines]
- **Disqualify**: [2-4 hard exclusions, competitors included]

## Copy and CTA Conventions
[The four conventions from the skill, plus any client-specific rules]

## Segmentation Mode
[`ai` (default) | `manual` | `percentage`]

## Segments

### Default Segment
- **Sub-ICP**: Every qualified contact that fits no numbered segment.
- **Angle**: {Broadest framing of the offer, no segment-specific hooks}
- **Relevant Proof**: {Most universal case studies or data points}
- **Sequence outline**: {2-6 steps, one line each}

### Segment 1: {Name}
- **Sub-ICP**: {Who: industry, title, company stage, etc.}
- **Angle**: {How messaging is tailored for this sub-group}
- **Relevant Proof**: {Case studies, references, or data points for this group}
- **Sequence outline**: {2-6 steps, one line each}

### Segment 2: {Name}
- **Sub-ICP**: {Who}
- **Angle**: {How}
- **Relevant Proof**: {What proof}
- **Sequence outline**: {Steps}
```

## Percentage mode (sequence A/B test)

Replace the Segments section with weighted arms. Default is the baseline / control arm. All weights, Default included, are integers summing to exactly 100. If the draft leaves Default's weight off, compute it as `100 - sum(arms)` before saving.

```markdown
## Segmentation Mode
percentage

## Segments

### Default Segment (baseline / control arm)
- **Weight**: 34
- **Role**: The variant the other arms are measured against. Gets its share of traffic and runs its own sequence.

### Arm 1: {Name}
- **Weight**: 33
- **Sequence hypothesis**: {What this entire sequence tests: structure, angle, or offer}

### Arm 2: {Name}
- **Weight**: 33
- **Sequence hypothesis**: {...}
```

## Improvement-driven plan

```markdown
# {Campaign Name} - Iteration [N]
**Date**: [mm/dd/yyyy]
**Prepared by**: [Name]
**Based On**: [Source campaign name and id]
**Source Learnings**: [e.g. guarantee angle won on positive replies, ROI angle lost]

## Executive Summary
Building on learnings from [source campaign], this plan tests [what we're testing].

## Prior Learnings
- **What Worked**: [winning patterns]
- **What Failed**: [losing patterns]
- **Key Insight**: [main takeaway]

## Broad ICP
[Same or expanded ICP based on learnings]

## Offer and CTA
[Same or refined offer]

## Segments
[New segments designed from the learnings]
```
