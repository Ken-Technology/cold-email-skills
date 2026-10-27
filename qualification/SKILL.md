---
name: qualification
description: "Write AI prompts that judge whether a prospect fits the campaign's audience: who is in, who is out, and why. Use when cleaning or qualifying a prospect list for cold email. Triggers on \"qualify my leads\", \"who should we exclude\", \"write a qualification prompt\"."
---

# Qualification Skill

Turn a campaign plan's qualify/disqualify rules into the variables an AI qualifier runs on every prospect: an audience description, disqualification criteria, and (rarely) qualification criteria. They go in `qualification.md` at the root of the campaign workspace (`./cold-email/{slug}/`), ready for any qualification step: an AI column in Clay or a spreadsheet, or any LLM.

## Inputs

- The plan's broad ICP and its qualify/disqualify rules.
- The search filters already applied (`search-strategy.md` in the campaign workspace). They tell you what NOT to restate.
- The research (`research.md` and its company context) for competitors and ICP nuances, and the company knowledge folder (`./knowledge/`) when it exists: its `competitors/` files and who the ideal customer profile says is not a fit.
- A sample of sourced leads, when available, to see real edge cases.

Use what the conversation already holds. Read only what is missing: `plan.md`, `search-strategy.md` and `research.md` in the campaign workspace (default `./cold-email/{slug}/` under the current directory).

## What the qualifier can see

The qualifier sees ONLY:
- LinkedIn profile: title, company, location, previous roles, education, skills, summary.
- Company data: industry, headcount, HQ, description.
- Website metadata: page title and meta description only.

It does NOT see full site content, tech stack, news, funding, social posts, press, events, or any time-sensitive signal. Every criterion must be checkable against the data above. Rewrite or drop any rule that depends on something else.

## Core Principles

- **Write short, trust the AI** - Give it a short, plain-language brief and let it reason. A few high-signal lines beat an exhaustive rulebook. No long lists of titles, industries, or product names.
- **Never repeat the search filters** - The filters already bound the list (headcount, geography, titles, seniority, industries). Do not restate any of it, not in the audience description and not as a criterion. Qualification only catches what the filters can't see.
- **Don't over-qualify** - Qualification is a safety net, not a precision filter. When data is incomplete or ambiguous, qualify.
- **Disqualification over qualification** - Prefer audience description + a few disqualifiers. Add qualification criteria only for a real positive signal worth confirming.
- **Always exclude competitors** - The one disqualifier that is always worth including.

Details, examples, and a disqualifier menu: `references/qualification-guide.md`.

## Write the Variables

**Audience description** (required): one plain sentence on who we target, 5-20 words. No headcount, geography, title lists, or industries.

**Disqualification criteria** (strongly preferred): binary deal-breakers the filters can't see, such as competitor or wrong business model. Usually 2-4 lines, never more than 6. Always include competitor exclusion. Don't pad.

**Qualification criteria** (optional, usually empty): only a genuine positive signal visible in the data above.

At least the audience description and the disqualification criteria must be non-empty. Fewer than two substantive sections is a hard stop: revise first.

## Running it

The three sections make one yes/no question per prospect, asked with the company context. Run it where the list lives: an AI column in Clay or a spreadsheet, or any LLM with the prospect's data pasted in. A starting prompt:

```
You judge whether a prospect fits a cold email campaign. Answer yes or no, then one short reason.
Company: {the company context from research.md}
Audience: {audience description}
Qualifies when: {qualification criteria, or "no extra conditions"}
Disqualified when: {disqualification criteria}
When the data is incomplete or ambiguous, answer yes.
Prospect: {LinkedIn profile, company data, website title and description}
```

Check 10 to 20 answers by hand before you trust it on the whole list. When you change the criteria, run the list again: earlier answers no longer hold.

## Save

Show the three sections to the user and get approval. Then write `qualification.md` at the root of the campaign workspace:

```markdown
# Qualification Prompt

## Audience Description
[One plain sentence on who we target. No headcount, geography, titles, or industries.]

## Disqualification Criteria
- [Competitor exclusion]
- [One or two more deal-breakers the filters can't see]

## Qualification Criteria
[Usually empty. Only a real positive signal worth confirming.]
```

- Exactly these three H2 headings and no others: a tool that reads the file looks for them.
- Keep one qualification file per campaign: when it exists, update its sections, never write a second.
- With no campaign workspace (a one-off request), give the three sections in the chat instead.

Confirm: "Qualification saved to `./cold-email/{slug}/qualification.md`."

## Recruiting campaigns

A recruiting campaign fills a role: the plan or the user gives the role (title, level, place or remote policy, must-haves). The leads are candidates, so the prompt decides who could take this job, not who would buy.

- Audience description: the role in one or two sentences (title, level, place or remote policy) and the kind of person who could do it.
- Qualification criteria: the role's must-haves, each written as something a profile shows (a current or past title, years of experience, a skill, a degree). Leave out what a profile never shows, such as notice period or salary expectations.
- Disqualification criteria: people who already work at the hiring company, people far more senior or junior than the role, and people whose profile shows none of the must-haves. A nice-to-have never disqualifies.
- Location: for an onsite or hybrid role, people outside the role's area do not qualify unless the role allows relocation. A remote role disqualifies no one on location.
- Never qualify or disqualify on age, gender, race, religion, disability, family status or nationality, or on a guess at any of them (a name, a photo, a graduation year). A language the job needs is a skill, and fine.

Save it exactly as above.
