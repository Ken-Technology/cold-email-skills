---
name: client-research
description: Synthesize client research from meeting recordings, website data, and other resources into a comprehensive Markdown strategy document. Use when the user uploads meeting transcripts, call recordings, or scraped website data and needs a complete client research document for GTM strategy, list building, or email copywriting. Triggers on requests like "create a client research doc", "summarize this client", "build a strategy document from these resources", or when multiple client-related sources are provided for synthesis.
model: sonnet
thinking: false
---

# Client Research Skill

Synthesize multiple research sources into a comprehensive client strategy document optimized for both human review and downstream AI agents (GTM strategy, list building, email copywriting).

## Required Context

Before generating the research document, load all available client sources. `{workspace}` = the client campaign workspace (default `./cold-email/{slug}/` under the current directory):

**Directory Structure Reference:**
```
{workspace}/
├── research.md       # Existing research (preserve metadata if updating) - THIS skill's output
├── notes.md          # Optional client preferences
├── research/         # Source material: scraped website content,
│   └── website/      # transcripts, documents the user dropped in
└── {plan folders}/   # Past campaign plans (note what worked)
```

Sources may also arrive as user uploads or paths given in the conversation - use whatever is provided.

## Inputs

Expect one or more of these source types:
- Meeting recordings/transcripts (Fireflies, Otter, Gong, etc.)
- Scraped website content
- Product documentation
- Competitor analysis
- Customer testimonials or case studies
- Sales materials

## Output Format

Generate ONE document, `{workspace}/research.md`, with a quick-reference summary on top followed by the comprehensive research. This single file is what every downstream campaign skill reads.

### Part 1: Summary (top of research.md)

Quick-reference section for daily use. See `references/context-template.md` for the exact structure. Key sections:

- Header metadata (client slug, created date, owner)
- **Elevator Pitch** - Short hook answering: "If I met {ICP} in an elevator with {Company}, what should I say in a couple seconds to make them really hooked?"
- **About the Company** - 3-paragraph executive summary
- **Target Audience** - Condensed ICP (1-2 paragraphs)
- **Core Problems Solved** - Bulleted list (3-5 items)
- **Key Assets** - Top 3 lead magnets (table format)
- **Case Studies** - Top 3 results (table format)
- **Quick Links** - Website, other client links

### Part 2: Comprehensive research (rest of research.md)

Full research for strategy and copywriting. Generate with these sections in order:

```markdown
# [Company Name] Strategy

## Elevator Pitch

> If you met [primary ICP - role/title at company type] in an elevator with [Company], what should you say in a couple seconds to make them really hooked?

[1-3 sentences. Plain English, no buzzwords. Lead with the specific pain or outcome that hits hardest for the ICP, then the mechanism. Should feel like something you'd actually say out loud, not marketing copy.]

## About the Company

### Summary
[3 paragraphs: Business overview, Differentiation & approach, Strategic context]

## Product

### What it is
[2-3 paragraphs on core functionality, technical approach, fundamental methodology]

### Benefits & Features
[Max 3 focused paragraphs on unique capabilities - not generic features]

### Problems it solves
[3-5 problems with structure: Problem Title, The Pain, The Solution, Outbound Angle]

### Why this matters
[2-3 paragraphs: Market timing, Financial impact, Operational reality]

### Pricing
[Tiers, ACV, sales cycle if available]

### Unique Competitive Advantages
[3-5 advantages with: What Makes This Different, Outbound Angle]

## Target Market

### Filters
[Table: Filter, Value, Rationale - for company size, industry, geography, roles]

### Core Problems Solved
[Numbered list of 3-5 core problems with business impact and urgency triggers]

## Assets

### Lead Magnets
[Top 3 existing lead magnets with: Type/Format, What It Is, What It Does, Strength Assessment, Access Details, Outbound Usage Strategy]

## Case Studies
[Top 3 case studies with: Customer Type, Situation, Results Achieved (with metrics), GTM Application]

## Additional Insights
[Past outbound efforts, sales process, channel performance, decision-maker dynamics, pain point language, onboarding model, strategic context - only what exists in sources]
```

## Section Guidelines

Read [references/section-prompts.md](references/section-prompts.md) for detailed instructions on each section before writing.

## Critical Rules

1. **Extract, don't invent**: Only include information present in the provided sources. Never suggest new ideas or speculate.

2. **Avoid generic language**: Never use "innovative", "cutting-edge", "AI-powered" without explaining the actual mechanism. Be specific about how things work.

3. **Quantify when possible**: Include specific metrics, percentages, dollar amounts, time savings. Numbers make content actionable for outbound.

4. **Include outbound angles**: Every problem, advantage, and lead magnet should have a concrete question or hook for cold email usage.

5. **Prioritize by ICP fit**: When selecting case studies, lead magnets, or problems to highlight, prioritize those most relevant to the primary target audience.

6. **Write for dual audiences**: Content must be scannable by humans AND parseable by AI agents. Use consistent headers and structured formats.

## Quality Checklist

Before finalizing, verify:
- [ ] All sections populated from source material (or explicitly noted as "Not found in resources")
- [ ] No speculative or suggested content
- [ ] Specific metrics included where available
- [ ] Outbound angles are concrete questions, not vague statements
- [ ] Problems describe actual pain with business impact
- [ ] Competitive advantages explain WHY they're hard to replicate
- [ ] Lead magnets include access details or links when available

## Output Handling

After generating the research document, tell the user the research is saved to `{workspace}/research.md`. Do not push to any platform or call any external API.
