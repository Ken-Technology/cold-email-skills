# Hand Test Reference

Details for Task 5 of **prompt-writer**: testing the written prompts by hand on sample prospects, judging outputs and revising.

## When it runs

All of these hold:
- `prompts.md` is written for the segment;
- the user has sample prospects with the data the prompts read (LinkedIn profile, company page, website text);
- at least one `to_output: true` prompt exists;
- the user did not ask to skip testing.

Otherwise skip it, say why, and tell the user to re-test once they have samples.

## The run

- 3 to 5 sample prospects per round, maximum 3 rounds. Use new samples each round when the user has them.
- Supporting context first, once: the Instructions, Company Context, Rules and Email Sequence in `references/prompt-engineering.md`, filled from `research.md` and `emails_v2.md`. Then, for each prospect, their data and each prompt in `prompts.md`.
- Run them yourself when the user gives you the sample data: act as the AI, one prospect at a time, with only that prospect's data. Or give the user these steps to run in any LLM or their personalization tool.
- When the user's stack rewrites outputs, run the rewriting steering on the variables with Rewrite yes.
- To compare models, run the same samples through each.

## Outputs

- Judge what reaches the prospect: the rewritten line when a rewrite ran, else the raw output.
- Map outputs to variables by name. Only `to_output: true` prompts produce one.
- A run that errors or returns nothing is a tool failure, not a prompt verdict: run it again before you judge it.

## Judging outputs

| Criterion | Question | Check |
|-----------|----------|-------|
| Natural | Does it sound like a human wrote it? | No robotic patterns |
| Contextual | Does it fit the email sequence flow? | Matches tone and style |
| Relevant | Does it use the contact's real data? | References their LinkedIn or company |
| Constrained | Does it follow length and format rules? | Word counts, no emojis, `PS: ` |
| Fallback | Did missing data degrade gracefully? | No blank or error output |

**Scoring:** Pass = every sample acceptable. Minor = most acceptable (3-4 of 5). Major = half or fewer, or a systemic problem.

### Quality thresholds

| Variable | Max length | Required elements |
|----------|------------|-------------------|
| Subject Line | 6 words (ideally 3-4) | Specific detail, no emojis |
| First Line | 20 words | Hook, personalization, no greeting |
| PS Line | 2 sentences | Personal detail, starts with `PS: ` |
| Body variable | Varies | Relevant to context |

### Issue patterns

| Issue | Detection | Severity | Fix |
|-------|-----------|----------|-----|
| Generic output | "I noticed you work at a company" pattern | Major | Name the LinkedIn or website fields to use: "Reference a specific detail from their LinkedIn profile, such as their current role, past experience, or listed skills" |
| Wrong data source | References news, funding, events | Major | Remove it; substitute a valid source |
| Too long | Subject over 6 words, first line over 20 | Minor | "MUST be under X words. Count your words before outputting." |
| Forced connection | "We went to the same school" | Major | "Never assume shared schools, connections or history" |
| Missing fallback | Blank or error output | Major | Add an explicit fallback line, and consider a **Fallback** for the variable |
| Repetitive | Same phrase for 3+ contacts | Minor | "Vary your approach for each contact. Don't reuse the same structure or phrases." |
| Off-tone | Clashes with the sequence style | Minor | Point the prompt at the sequence's tone explicitly |
| "I noticed / I saw" opener | Starts with "I noticed you" or "I saw that" | Minor | "Never start with 'I noticed' or 'I saw' - state the observation directly" |

## Revision loop (max 3 rounds)

1. All pass: done.
2. Minor: find the prompt causing it, apply a targeted fix.
3. Major: look for the pattern across failures, rewrite the affected prompts.
4. Change only the prompts you fixed in `prompts.md` and keep their other lines. A new variable is a new H3 (**prompt-writer** Task 4).
5. Re-run the test on 3 to 5 samples.
6. After round 3 still failing: leave the best version saved, warn the user, and recommend a manual review.

Minor fixes (length limits, small wording) need no new approval. Changing data sources or restructuring variables does.

## Other prompts

The same hand test checks the campaign's other prompts:
- **Qualification** (`qualification.md`): run it on the samples and cross-check each yes or no against the prospect's data. Qualification is assistive, not definitive. If accuracy is weak, sharpen the qualification and disqualification criteria.
- **Segmentation** (`segmentation.md`): check each prospect's segment against its attributes and the edge cases between segments.

## Round summary (chat)

```markdown
## Prompt test - Round N

**Status**: PASS / MINOR / MAJOR
**Contacts**: 5 | Pass rate: X/5

| Prospect | Variable | Output (short) | Eval |
|---------|----------|---------------------|------|
| ... | Subject Line | "..." | pass/fail |
| ... | First Line | "..." | pass/fail |

**Issues / fixes applied**: ...
**Next**: re-test | done | need your call
```

When the user wants less, one line per round is enough: `Round 1: 3/5 pass, fixed subject length and first-line specificity`.
