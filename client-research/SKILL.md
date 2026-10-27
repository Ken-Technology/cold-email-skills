---
name: client-research
description: "Research a company and write a research doc from your notes, meeting transcripts, and website: what it sells, to whom, its proof, competitors and voice. Use before planning a cold-email campaign for a company. Triggers on \"research this company\", \"write the client research\", or as the research step of the cold-email-campaign workflow."
---

# Client Research Skill

Turn a company's sources into the research every campaign skill builds on: `research.md` in the campaign workspace, with a quick-reference summary, the full research for strategy and copy, and a short company context that personalization prompts run with.

`{workspace}` = the campaign workspace, default `./cold-email/{slug}/` under the current directory:

```
{workspace}/
├── research.md       # this skill's output (keep its metadata when updating)
├── notes.md          # optional: the client's preferences
└── research/         # source material: website pages, transcripts, documents
    └── website/
```

When the company keeps a knowledge folder (`./knowledge/`, written by **knowledge-setup**), read it first: its overview, ideal customer profile, pricing, proof, competitors, voice and instructions are sourced facts. Start from them, cite them, and add what this campaign's sources say on top.

## Sources

- **Website pages** (the primary source). Read them with your own web tools, or ask the user to paste the page text, following `references/website-scraping.md`: at most 8 pages from the site's own host, homepage, about, product, pricing, and customers first, never blog posts, careers, legal, or login pages.
- Meeting transcripts (Fireflies, Otter, Gong, etc.), product docs, sales materials, case studies, testimonials, competitor notes, and any links or uploads the user shared in the conversation.
- Existing research: `{workspace}/research.md`, and the company knowledge folder `./knowledge/` when it exists. Preserve metadata and facts that still hold; extend rather than overwrite.

Read saved files only when they are not already in the conversation: `{workspace}/research/` holds saved website pages (`research/website/*.md`), transcripts and documents, and `{workspace}/notes.md` the client's preferences.

## Critical Rules

1. **Extract, don't invent**: Only include information present in the sources. Never suggest new ideas or speculate.
2. **Avoid generic language**: Never use "innovative", "cutting-edge", "AI-powered" without explaining the actual mechanism. Be specific about how things work.
3. **Quantify when possible**: Include specific metrics, percentages, dollar amounts, time savings. Numbers make content actionable for outbound.
4. **Include outbound angles**: Every problem, advantage, and lead magnet gets a concrete question or hook for cold email.
5. **Prioritize by ICP fit**: Pick the case studies, lead magnets, and problems most relevant to the primary target audience.
6. **Write for dual audiences**: Scannable by humans AND parseable by AI agents. Use consistent headers and structured formats.

## Company context

A short summary of the company that every personalization prompt runs with: the AI uses it to understand *who it is writing as* and *who it is writing to*, across ALL current and future campaigns. Write it campaign-agnostic: general enough for any ICP or angle tested later. With a knowledge folder, take Voice & tone from its `voice.md` and Don'ts from its `instructions.md`.

**Structure (use these exact section headers):**

**Company** - One sentence: what they do and for whom. Plain English, no buzzwords.

**What we do** - 2-3 sentences on the product or service: how it actually works, the mechanism, the delivery model (SaaS, agency, marketplace, etc.). Not "AI-powered platform" but "ingests X, runs Y, returns Z".

**Who we serve** - 2-3 sentences on the kinds of companies and roles that typically buy. Describe the archetype, not a filter: "mid-market B2B SaaS companies with a sales team", not "50-500 employees, ARR > $5M, has SDRs". No numbers, exclusions, or disqualifiers - those belong in qualification and segmentation.

**Value prop & differentiation** - 2-4 sentences on the core pains this solves and why the client wins vs. alternatives (in-house, competitors, status quo). Lead with the pain in the buyer's language, then the mechanism. Include 1-2 genuine differentiators supported by the sources.

**Voice & tone** - 2-3 prescriptive sentences: "Write in [adjectives]. Use [style cues]. Sound like [persona]." Derive it from how the client talks on their website, in meetings, in emails, and add 1-2 phrasing cues when the voice is distinctive ("direct second person, no corporate hedging, occasional dry humor"). If the sources don't establish a voice, write a conservative default ("Professional, plain-English, no jargon").

**Don'ts** (only if applicable, otherwise omit) - Bullets for compliance constraints ("no ROI claims - regulated industry"), explicit client aversions ("client hates the word 'leverage'"), or factual guardrails ("never claim we integrate with Salesforce - we don't").

**Writing rules:**
- Extract from sources only. A section without source material gets shorter, never invented.
- No proof points, metrics, case studies, or customer names (those live in campaign strategy).
- No campaign-specific angles, offers, CTAs, segmentation criteria, filters, or disqualifiers.
- First-person plural ("we do X") - this is the client's own voice the AI adopts.
- Target 400-700 tokens (~300-550 words, under 3,500 characters). Under 300 words is probably too vague; over 600 probably carries campaign specifics.

## Company Profile

When a short profile is needed next to the company context:

- **One-liner**: one plain sentence on what the company does for its buyers. No buzzwords without the mechanism.
- **Offer**: the primary offer or CTA the site pushes (demo, trial, free audit, etc.) in one short phrase. Leave it empty when the sources show none.
- **Industry**: a short industry or vertical label ("B2B SaaS", "healthcare staffing"), empty when unclear.

Never invent customers, metrics, product claims, or URLs absent from the sources.

## Full Research Document

Write `{workspace}/research.md`: a quick-reference summary at the top (structure in `references/context-template.md`), then these sections in order. Before writing, read the per-section guidance in `references/section-prompts.md`.

```markdown
# [Company Name] Strategy
## Elevator Pitch
> If you met [primary ICP - role/title at company type] in an elevator with [Company], what should you say in a couple seconds to make them really hooked?
[1-3 sentences, plain spoken English: the sharpest pain or outcome, then the mechanism.]
## About the Company
### Summary
[3 paragraphs: Business overview, Differentiation & approach, Strategic context]
## Product
### What it is
### Benefits & Features
### Problems it solves
[3-5 problems: Problem Title, The Pain, The Solution, Outbound Angle]
### Why this matters
[2-3 paragraphs: market timing, financial impact, operational reality]
### Pricing
### Unique Competitive Advantages
[3-5 advantages: What Makes This Different, Outbound Angle]
## Target Market
### Filters
[Table: Filter, Value, Rationale - company size, industry, geography, roles]
### Core Problems Solved
## Assets
### Lead Magnets
[Top 3 existing: Type/Format, What It Is, What It Does, Strength, Access Details, Outbound Usage]
## Case Studies
[Top 3: Customer Type, Situation, Results Achieved (metrics), GTM Application]
## Additional Insights
[Only what exists in sources: past outbound, sales process, decision-maker dynamics, pain point language]
```

## Quality Checklist

- [ ] Every section comes from source material (or says "Not found in resources")
- [ ] No speculative or suggested content
- [ ] Specific metrics where available
- [ ] Outbound angles are concrete questions, not vague statements
- [ ] Problems describe actual pain with its business impact
- [ ] Competitive advantages explain WHY they're hard to replicate
- [ ] Lead magnets include access details or links when available

## Save

Show the research document and the company context, and get the user's OK before writing. Then:

1. Research document: write `{workspace}/research.md`. When it exists, update it in place: keep its created date and owner, keep the facts that still hold, and never write a second research file.
2. Company context: put it in `research.md` as the last section, `## Company Context`, with the headers above. **prompt-writer** gives it to the AI with every prompt.
3. Confirm: "Saved the research to `{workspace}/research.md`."

Do not push it to any platform or tool.
