# Prompt Self-Review Workflow

The text review the skill runs on its own draft (Task 3 of **prompt-writer**) before anything is written. It is one inline pass in the same turn: review, fix, then show the user the revised draft. Do not show the review scaffolding unless the user asks for detail. The hand test on sample prospects (Task 5) is separate and runs after `prompts.md` is written.

## Context, in priority order

### Priority 1: client-specific context (highest)
1. **Conversation feedback** from this session - the latest preference.
2. **Client notes** - from the caller, or `notes.md` in the campaign workspace.

### Priority 2: campaign context
3. **The campaign strategy's AI variables** (name, placement, short description) - from the caller, or the AI variables section of the segment's `strategy.md`.
4. **The sequence** for the segment: `emails_v2.md` - every `{{Title Case}}` token needs a prompt.

### Priority 3: validation rules (lowest)
5. Data source constraints and the Prompt Customization Rules in the prompt writer playbook.

## Review scope

**Check only:**
- User prompts (`to_output: true`) - the only prompts you write
- Data source validity
- Prompt quality (what to generate, data sources, tone, constraints, fallbacks)
- Variable coverage against the strategy and the live sequence tokens
- The rewriting steering paragraph, if drafted: 2-10 sentences, no duplicated platform defaults, focused on voice, rhythm or sequence flow, no output examples or formatting rules

**Do not review:**
- System prompts (Instructions, Rules, Company Context, Email Sequence) - supporting context, not written here
- The default rewriting prompt - only your steering paragraph is in scope
- Email copy (email-review owns it), list building, or the strategy itself

## Critical data source validation

Prompts may reference only the sources the campaign's data enrichments provide (see the prompt writer playbook), by default:
- Company website main page
- LinkedIn company page (industry, size, description, employee count)
- LinkedIn individual profile (title, company, tenure, location, previous roles, education, skills, summary)

**REJECT prompts that reference:**
- News articles or press releases
- Funding announcements
- Recent events or triggers
- Social media posts (LinkedIn posts only when that enrichment is on)
- Blog content
- Tech stack data (only when that enrichment is on)
- Any time-sensitive information

Flag every invalid reference and replace it with a valid source.

## Prompt Customization Rules checklist (mandatory)

### Examples policy
- [ ] No examples in First Line, PS Line or Subject Line prompts (unless heavily customized)
- [ ] Examples allowed in other custom prompts that need a specific structure or format

### PS Line
- [ ] Built on the default PS template, with only slight changes for campaign context
- [ ] Format is `PS: ` (colon and space). REJECT `PS -`, `PS.` or a bare `PS`

### Subject Line
- [ ] Close to the default formula; only the campaign angle is customized
- [ ] No "Quick question" or typical outreach phrasing; no sales clichés

### Allowed customization
- Which LinkedIn or website fields to prioritize
- Tone (more casual, more professional)
- Industry-specific context or pain points
- Length constraints

### Forbidden customization
- Changing the core structure of the First Line, PS Line or Subject Line templates
- Adding example outputs that constrain the AI
- Changing the fundamental approach of the standard variables

### Platform constraints
- [ ] Names are Title Case, max 30 characters, unique after snake_case normalization, and match the sequence tokens exactly
- [ ] One name per distinct value: no body token reused across emails (except `{{Subject Line}}`)
- [ ] Prompt text max 4096 characters, no `---` line inside, no `{leadVariable}` syntax inside

## Review notes (internal)

Keep the pass short. For each prompt: issues and the fix. Then:

```
Coverage: every strategy variable and sequence token has a prompt? [yes / missing: ...]
Data source violations: [none / list]
Customization rule violations: [none / list]
Client notes applied: [list]
Fixes made: [list]
```

## Feedback priority rules

When guidance conflicts:
1. **Conversation feedback** overrides client notes - it is the latest preference.
2. **Client notes** override generic guidance ("client wants industry-specific hooks").
3. **The strategy defines the variables** - do not add or drop variables it specifies; flag a mismatch with the live sequence instead.
4. **Data source constraints are non-negotiable** - never approve a prompt that references unavailable data.

## Example

```
User: "Write prompts for the Acme campaign"

[internal]
1. Draft 5 prompts from the strategy's AI variables.
2. Load client notes: "Client wants a casual tone in personalization."
3. Review finds:
   - Industry Hook references "recent news" (invalid source)
   - PS Line has no fallback
   - Tone too formal for the client note
4. Fix:
   - Industry Hook now uses the LinkedIn company description
   - PS Line fallback: "If nothing stands out, reference their role"
   - Tone made more casual throughout
5. Show the revised draft for approval.
```
