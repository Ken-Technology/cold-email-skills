# Internal Prompt Review Workflow

This document specifies the **internal text review** of drafted personalization prompts (Task 3 in SKILL.md). It is a quality pass over the draft before `prompts.md` is saved. It does not require a live campaign, platform connection, or contact sampling.

No user input required when it runs (unless the user passed `--skip-review`, in which case this whole workflow is skipped).

## Overview

The text review ensures high-quality AI personalization prompts by running an internal reviewer subagent over the draft. The review happens silently - do NOT output intermediate steps to the user.

## Reviewer Agent Spec

The spec has three conceptual stages: the draft (already produced by Task 2 in SKILL.md), the reviewer pass (below), and the writer's revision pass (apply feedback, still within Task 3 in SKILL.md).

### Draft (input to the reviewer)

**Context to load:**
- SKILL.md (this skill's orchestration)
- references/prompt-engineering.md (detailed prompt guidance and examples)

**Output:** Draft prompts.md (internal, not saved yet)

---

### Reviewer Pass (Quality Check)

**Context loading order (PRIORITY MATTERS):**

#### Priority 1: Client-Specific Context (HIGHEST)
Load these first - they override all other guidance:

1. `{workspace}/notes.md` - Any client preferences for personalization approach
2. **Conversation history** - Any inline feedback from the current session

#### Priority 2: Campaign Context
3. `{campaign_folder}/strategy.md` - AI variables defined here (prompt_name, prompt_location, prompt_description)
4. Campaign plan context if available

#### Priority 3: Validation Rules (LOWEST)
5. Data source constraints from SKILL.md
6. Quality checklist from SKILL.md

**Review Scope - ONLY check:**
- User prompts (to_output: true) - these are the only prompts this skill authors
- Data source validity
- Prompt quality (constraints, fallbacks, tone)
- Variable coverage from strategy
- Rewriting Instructions steering paragraph (if present): length 2-10 sentences, does not duplicate generic default rules, focuses on voice/tone/sequence flow, no examples or formatting rules

**DO NOT review:**
- System/context prompts the personalization tool may inject separately (Instructions, Rules, Company Context, Email Sequence)
- Generic default rewriting rules (only the user's steering paragraph is in scope)

**Also DO NOT review:**
- Email copy content
- List building criteria
- Campaign strategy itself

**Output format:**
```
## Prompt Review

### Overall Score: [1-5]

### Variable Coverage Check
- [ ] All variables from strategy.md have prompts: [Yes/No]
- Missing variables: [list if any]

### Data Source Violations
[List any prompts referencing invalid data sources]

### Prompt-by-Prompt Feedback

**personalized_subject_line:**
- Issues: [list specific problems]
- Suggestions: [specific improvements]

**personalized_first_line:**
...

### Client-Specific Notes Applied
[Any notes from {workspace}/notes.md that were applied]

### Priority Fixes
1. [Most critical issue]
2. [Second priority]
3. [Third]
```

---

### Revision Pass (Writer Incorporates Feedback)

**Context to load:**
- Same as the Draft stage
- PLUS: Reviewer feedback from the Reviewer Pass above

**Task:** Incorporate all reviewer suggestions, especially:
- Fix any data source violations
- Add missing variables
- Apply client-specific preferences

**Output:** Final prompts.md (this is what gets saved)

---

## Critical Data Source Validation

Prompts can ONLY reference:
- Company website main page
- LinkedIn company page (industry, size, description, employee count)
- LinkedIn individual profile (title, company, tenure, location, previous roles, education, skills, summary)

**REJECT prompts that reference:**
- News articles or press releases
- Funding announcements
- Recent events or triggers
- Social media posts
- Blog content
- Tech stack data
- Any time-sensitive information

If a prompt references invalid data, the reviewer MUST flag it and suggest a valid alternative.

---

## Prompt Customization Rules Checklist

**MANDATORY**: The reviewer MUST check prompts against these non-negotiable rules from SKILL.md.

### Examples Policy
- [ ] **NO examples for First Line prompts** (unless heavily customized)
- [ ] **NO examples for PS Line prompts** (unless heavily customized)
- [ ] **NO examples for Subject Line prompts** (unless heavily customized)
- [ ] **CAN add examples** for other custom prompts that need specific structure/format
- [ ] **Rationale**: Standard variables should feel natural and unrestricted - examples constrain creativity

### PS Line Guidelines
- [ ] **Uses DEFAULT PS line template** from SKILL.md as base
- [ ] **Only SLIGHT modifications** for campaign context - not complete rewrites
- [ ] **Format check**: Always uses "PS: " (with colon and space)
- [ ] **REJECT**: "PS -" or "PS." or just "PS" without proper formatting
- [ ] **Modifications are minor adjustments**, not structural changes

### Subject Line Guidelines
- [ ] **Keeps close to default formula** from SKILL.md
- [ ] **Never adds "Quick question"** or typical outreach messaging
- [ ] **Customizations are SLIGHT** to match email sequence or client tone
- [ ] **Avoids sales clichés** in subject line instructions
- [ ] **Only customize**: campaign-specific angle, NOT fundamental approach

### What Can Be Customized (Allowed)
- Data source references (which LinkedIn fields to prioritize)
- Tone adjustments (more casual, more professional)
- Industry-specific context or pain points
- Length constraints (shorter or longer)

### What Cannot Be Customized (Forbidden)
- The core structure of First Line, PS Line, or Subject Line templates
- Adding example outputs that constrain the AI
- Changing the fundamental approach of these standard variables

---

## Feedback Priority Rules

When the reviewer encounters conflicting guidance, apply in this order:

1. **Client notes override everything** - If notes.md says "client wants industry-specific hooks", prioritize that
2. **Conversation feedback overrides notes.md** - If user mentioned something in this session, it's the latest preference
3. **Campaign strategy defines the variables** - Don't add or remove variables from what strategy.md specifies
4. **Data source constraints are non-negotiable** - Never approve prompts that reference unavailable data

## Integration with SKILL.md

This reviewer pass is invoked inside **Task 3 (Internal Text Review)** in SKILL.md. If the user passed `--skip-review`, the reviewer subagent is NOT spawned and `prompts.md` is written from the draft.

## Example Flow

```
User: "Write prompts for Acme Corp campaign"

[Internal - not shown to user]
1. Prompt Writer generates 5 prompts based on strategy.md
2. Reviewer loads:
   - {workspace}/notes.md: "Client wants casual tone in personalization"
   - {campaign}/strategy.md: 5 AI variables defined
   - Data source constraints
3. Reviewer finds:
   - industry_hook prompt references "recent news" (INVALID)
   - ps_line prompt missing fallback behavior
   - Tone too formal (violates client preference)
4. Prompt Writer revises:
   - Changed industry_hook to use LinkedIn company description
   - Added fallback to ps_line: "If nothing stands out, reference their role"
   - Made tone more casual throughout
5. Final prompts output to user
```

## Notes Directory Structure

Client notes are stored in:
```
{workspace}/
├── notes.md          # Client preferences and feedback
└── research.md       # ICP, value prop, overview, full research
```

The reviewer MUST check `notes.md` before applying generic validation rules.
