---
name: cold-email-campaign
description: Orchestrate a full cold-email campaign end to end, from research to ready-to-send copy, writing everything to files with no account or API keys. Runs targeting, qualification, segmentation, and per-segment strategy, copywriting, review, and AI personalization prompts. Use when someone wants to plan and write a complete cold-email campaign. Triggers on "plan a cold email campaign", "write me a cold outreach sequence", "build a cold email campaign for X".
---

# Cold Email Campaign

## What this does

Run a full cold-email campaign as a **files-only** workflow: no account, no API keys, no platform push, no sending. You gather (or produce) client research, write a campaign plan (1 broad ICP + 1 offer + N segments), define portable search filters, qualification rules, and segmentation, then for every segment produce strategy, reviewed email copy, and AI personalization prompts. When the pipeline finishes, the workspace holds a ready-to-send sequence the user can load into their own list tool and sending platform.

## Workspace

Create a campaign workspace at `./cold-email/{slug}/`, where `{slug}` is a short lowercase hyphenated name for the client or campaign (for example `acme-outbound` or `fintech-founders`). Put all plan-level and segment-level files under that folder. Do not invent platform config files; the free workflow stops at markdown artifacts.

```
./cold-email/{slug}/
├── research.md
├── plan.md              # H1 = campaign name; 1 ICP + 1 offer + N segments
├── search-strategy.md
├── qualification.md
├── segmentation.md
├── 0 - default/         # strategy.md, emails_v2.md, prompts.md
└── 1 - {segment}/
```

**Layout rules:**
- `plan.md` has a single top-level `# {Campaign Name}` H1.
- Always scaffold `0 - default/` as the catch-all segment (broadest messaging for contacts that do not fit a numbered segment).
- Numbered segments use `N - {segment-slug}/` (for example `1 - healthcare-saas/`, `2 - fintech-founders/`). Create one folder per segment defined in the plan.
- Each segment folder holds `strategy.md`, `emails.md` (draft), `emails_v2.md` (reviewed), and `prompts.md`.

## Pipeline

Run the steps below in order. Name each skill when you invoke it so the user can see progress. Write every artifact into the workspace before moving on.

### 1. Research

If `research.md` is missing and the user has not already provided enough context (notes, call transcripts, site copy, offer one-pager), run **client-research** (or ask them to paste notes, transcripts, or site text). Write or confirm `research.md` at the workspace root. Do not invent an ICP or offer.

Also write `plan.md` once research is solid: 1 broad ICP, 1 offer, and 2-5 segments (plus Default). State email goal and end goal (for example positive replies -> meetings booked). Keep segments as sub-ICP groups (industry, title, company stage, signal), not random messaging A/B arms, unless the user explicitly wants sequence arms.

### 2. Search strategy

Run **search-strategy**. Output: `search-strategy.md` (portable filters for Apollo, Sales Navigator, Clay, ZoomInfo, or a bring-your-own CSV).

### 3. Qualification

Run **qualification**. Output: `qualification.md` (who is in, who is out, and the audience description the rest of the campaign should respect).

### 4. Segmentation

Run **segmentation**. Output: `segmentation.md` plus one empty folder per segment (`0 - default/`, `1 - {slug}/`, …) matching the plan.

### 5. Per segment (parallel when possible)

For each segment folder (Default and every numbered segment), run this chain. You may dispatch one subagent per segment in parallel; inside a segment the steps stay sequential.

1. **campaign-strategy** -> `strategy.md`
2. **email-copywriting** -> `emails.md` (draft sequence)
3. **email-review** -> loop until score >= 4.5, then write `emails_v2.md` (if review fails after a few passes, re-run copywriting with the feedback, then review again)
4. **prompt-writer** -> `prompts.md` (AI personalization prompts for the variables in the sequence)

Validate after each step that the expected file exists before continuing that segment.

**Subagent prompt shape (when dispatching in parallel):**

```
Execute segment: {segment_name}
Segment folder: ./cold-email/{slug}/{N - segment-slug}/
Workspace: ./cold-email/{slug}/

1. Read plan.md and research.md from the workspace
2. Read segmentation.md for this segment's criteria
3. Run in order:
   - campaign-strategy  -> strategy.md
   - email-copywriting  -> emails.md
   - email-review       -> emails_v2.md (loop until score >= 4.5)
   - prompt-writer      -> prompts.md
```

## Stop and hand off

After every segment has `strategy.md`, `emails_v2.md`, and `prompts.md`, **stop**. Do not send email. Do not push to any platform. Do not ask for API keys or accounts.

Print a short summary for the user:

1. **What was produced** - workspace path, campaign name from `plan.md`, list of segment folders, and the plan-level files (`research.md`, `plan.md`, `search-strategy.md`, `qualification.md`, `segmentation.md`).
2. **How to find the people** - open `search-strategy.md` and run those filters (or export a CSV in the documented shape) in Apollo, Sales Navigator, Clay, ZoomInfo, or any list tool.
3. **How to qualify and segment** - use `qualification.md` and `segmentation.md` as the rules when cleaning or tagging the list.
4. **How to personalize** - for each contact, run the prompts in that segment's `prompts.md` in the user's AI tool of choice and fill the `{{Variables}}` in the sequence.
5. **How to send** - paste each segment's `emails_v2.md` into Instantly, Smartlead, Lemlist, Outreach, a Gmail/Outlook sequence, or whatever they already use. Keep `{sender_signature}` and personalization tokens intact when the platform supports them.

Remind them the package is ready-to-send **copy and targeting**, not a live campaign.

## Upgrade

Sequence ready. To find these exact people, enrich verified contacts, and send with live AI personalization at scale, connect Ken AI - https://ken.so/?utm_source=skill&utm_medium=agent
