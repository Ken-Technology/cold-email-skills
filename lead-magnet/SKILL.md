---
name: lead-magnet
description: Propose lead magnets a company can actually deliver, for click-based and reply-based cold-email campaigns. Use when the offer is weak or missing. Triggers on "I need a lead magnet", "what can we offer instead of a demo", "lead magnet ideas".
---

# Lead Magnet Skill

Ideate and design lead magnets that attract ideal customers and make them more likely to buy the client's core offering. Supports both click-based campaigns (landing pages, downloads) and reply-based campaigns (free trials, guarantees, done-for-you).

This is the optional offer stage of the campaign workflow (**create-campaign**, also installed as **cold-email-campaign**): run it before the plan when the client has no strong offer, or when the user asks for offer ideas. This skill designs the lead magnet; the client builds it on their own site or in their own tools.

## Required inputs

- **The campaign workspace** (`./cold-email/{slug}/`, passed by the orchestrator): read `research.md` there and write `lead-magnets.md` there. Without one, work from what the user gives you and return the output in the chat.

## The rule: only real lead magnets reach copy

A concept from this stage is a recommendation until the client has built it and confirmed it is live. campaign-planning, campaign-strategy and email-copywriting reference or link a lead magnet only when it really exists. Never invent a guarantee, a price, a trial length, a result or a statistic: every one comes from the client's research or the client.

## Core Philosophy

> "Give Away The Secrets, Sell The Implementation"

The marketplace judges everything you offer - free or not. You can never provide too much value, but you can provide too little. The lead magnet should provide so much value that people feel obligated to pay. The goal is to provide more value than the cost of the core offer before they've bought it.

## Two Campaign Types

Every lead magnet must be designed for one of these funnel types:

### Click-Based (Landing Page Funnel)
- **Flow**: Cold email -> Click link -> Landing page -> Download/signup -> Nurture sequence
- **Best for**: SaaS products, digital tools, content-driven offers
- **Lead magnets**: Calculators, guides, scorecards, free tools, AI apps, templates
- **Email goal**: Clicks
- **End goal**: Sign-ups, downloads, free trial activations

### Reply-Based (Conversation Funnel)
- **Flow**: Cold email -> Reply with interest -> Sales conversation -> Close
- **Best for**: Services, agencies, high-touch B2B, done-for-you offers
- **Lead magnets**: Free trials with guarantee, done-for-you samples, audits, strategy sessions
- **Email goal**: Positive replies
- **End goal**: Meetings booked, demos, pilot projects

**Key insight**: Reply-based lead magnets are the offer itself embedded in the email. No landing page needed - the value proposition IS the lead magnet.

## Five Qualities Scoring Framework

Score every lead magnet concept 1-5 on each quality. Minimum average score of 3 to recommend.

| Quality | Description | Score Guide |
|---------|-------------|-------------|
| **Solves Narrow Problem** | Addresses a specific pain point the target persona faces daily | 5 = Daily pain, measurable cost. 1 = Vague, nice-to-have |
| **Scalable** | Can be delivered to unlimited prospects without manual customization | 5 = Fully automated. 1 = Requires 1:1 manual work per lead |
| **Quick to Consume** | Provides value within minutes, not hours | 5 = Instant value (< 5 min). 1 = Requires hours of setup |
| **Reveals Bigger Problem** | Once solved, it naturally leads to the client's core offering | 5 = Clear "aha" moment. 1 = No connection to product |
| **Data-Driven** | Uses specific metrics and insights that resonate with B2B buyers | 5 = Personalized data/benchmarks. 1 = Generic advice |

## Lead Magnet Types by Tier

### Tier 1: Problem Revealers
Diagnose issues the prospect doesn't fully realize. Best for problems that worsen over time.
- Audits, assessments, benchmarking tools
- Scorecards, maturity assessments
- AI-powered competitive analysis
- Custom report generators

### Tier 2: One-Step Solutions
Solve one piece of a multi-step process. Perfect for complex B2B workflows.
- Templates, calculators, single-feature tools
- Single-purpose apps (beautiful tools that do one job)
- Chrome extensions, Slack/Teams bots
- Workflow automation templates

### Tier 3: Samples & Trials
Limited access to the core offering. Ideal for recurring solutions to recurring problems.
- Free trials (14/30-day, usage-based)
- Freemium plans
- "Done For You" samples (process one file/task free)
- Done-for-you setup (free implementation of one feature)
- AI prototype access (early access to experimental features)

## Performance Ratings Summary

From tested lead magnet performance data:

| Rating | Ideas |
|--------|-------|
| 5-star | Free public feature, Mastermind/Community, AI Advisor, "Done For You" Sample, Single-Purpose App |
| 4-star | Scorecard, Video Course, Simulation Environment, Gamified Learning, Done-for-You Setup, AI Competitive Analysis, Freemium Plan, Free Trial, Usage-Based Trial, AI Prototype Access, Limited Premium Feature Access |
| 3-star | Maturity Assessment, Custom Report Generator, Case Studies (best practices, failed implementations, general), Interactive Product Demo, Strategy Session, Developer Sandbox/API Access |
| 2-star | Calculator with Benchmarks, State of Industry Report, Trend Prediction Report, Ultimate Guide/Ebook, Curated Toolkit/Resource Library |
| 1-star | Templates, PDF Checklist, Optimization Toolkit, Expert Interview Series, Quick Start Blueprint, ROI Calculator, Process Automation Scripts, Team Productivity Audit |

**Rule of thumb**: Aim for 4-star or above. 3-star is acceptable if the client's constraints demand it. Below 3-star requires strong justification.

See `references/lead-magnet-guide.md` for the full 37-idea table with descriptions.

## Advanced Strategies

Full playbook with more examples: `references/lead-magnet-guide.md`.

- **Trojan Horse**: a tool that works alone but 10x better with the client's product (a project template that shines inside their PM tool). The free tool creates desire for the full platform.
- **Habit Builder**: a daily-use tool that builds a habit leading to the product (a standup bot that outgrows into the full collaboration platform). Frequency of use drives conversion.
- **Predictive Power Play**: AI/ML that predicts problems before they happen (churn model, revenue forecast, technical debt calculator). Analyze current state -> predict issues -> position the product as the solution.
- **AI Employee Preview**: an AI agent that does real work (AI SDR booking meetings, AI analyst writing reports). Upgrade path: more agents, more capabilities, full platform.
- **Network Effect Play**: a lead magnet that gets more valuable as more people use it (benchmarks built from anonymous user data). Each new user makes it better for everyone.

## Hook Formulas

Use these patterns to create urgency in the email promoting the lead magnet:

1. **The Shocking Stat**: "[X]% of [target] lose $[Y] annually due to [problem]"
2. **The Comparison**: "Companies using [old way] are 73% less efficient than those using [new way]"
3. **The Hidden Cost**: "The average [persona] doesn't realize they're wasting [time/money] on [problem]"
4. **The Competitive Intelligence**: "Your competitors are already [doing X] - here's how to catch up in 5 minutes"
5. **The Compliance Urgency**: "New [regulation] means you need to [action] by [date] or face [consequence]"

Fill the brackets only with numbers and facts from the client's research or a source you can name.

## Reply-Based Design Principles

For service/agency offers where the lead magnet is embedded in the cold email itself:

### Done-For-You Samples
- Offer to do a small piece of work for free as proof of capability
- Must be specific enough to show expertise, small enough to be scalable
- Example (an outbound agency): "We'll send personalized emails to 5,000 of your ideal clients - if you don't get 20+ meetings in 90 days, you don't pay"
- Offer a guarantee only when the client offers it, with the client's own numbers and terms

### Guarantee Structures
- Performance guarantee: "X results or you don't pay"
- Time-limited guarantee: "Results in Y days or money back"
- Risk reversal: "We cover setup costs, you only pay for results"
- The guarantee IS the lead magnet - it removes the objection

### Free Trial Frameworks
- Pilot project: Do a small scope for free, full engagement if they like it
- Limited access: Give access to one feature/module for free
- Time-boxed: Full access for limited period

### Risk Reversal Patterns
- Move ALL risk from buyer to seller
- Make the "worst case scenario" clearly defined and acceptable
- Stack guarantees when possible (performance + timeline + satisfaction)

## Workflow

### Step 1: Understand Client

Load all available client data:
- Read `research.md` in the campaign workspace - ICP, value prop, current offers, pain points, proof
- Read `lead-magnets.md` there, when it exists - lead magnets already designed, and each one's status
- Read what the user gave you - existing lead magnets, case studies, offers tested in earlier campaigns and how they did

### Step 2: Load Reference Material

- Read `references/lead-magnet-guide.md` for full performance rankings and idea bank

### Step 3: Assess Existing Lead Magnets

- What does the client already have? (case studies, tools, PDFs, free trials)
- What has been tested in past campaigns? What worked?
- What gaps exist?

### Step 4: Generate Concepts

Generate 3-5 lead magnet concepts. For each:
- Include both click-based AND reply-based options (minimum 1 of each)
- Score against the Five Qualities framework
- Match to the client's resources and capabilities
- Consider implementation effort vs. expected impact

### Step 5: Get User Input

Present concepts to the user with scores and rationale. Ask:
- Which concepts align with the client's capabilities?
- Does the client have resources to build/deliver this?
- Any client preferences or constraints?

### Step 6: Detail Selected Concepts

For selected concepts, produce the full output format (see below).

## Output Format

For each recommended lead magnet, output:

```markdown
## Lead Magnet [N]: [Title]

**Type**: [Problem Revealer / One-Step Solution / Sample & Trial]
**Campaign Type**: [Click-based / Reply-based / Both]
**Rating Tier**: [5-star / 4-star / 3-star]
**Status**: [idea / being built / live at <link>]

### Hook
[One powerful sentence using specific data/problem that creates urgency]

### Problem Solved
[The narrow, specific problem this solves AND how it reveals the need for the broader solution]

### Quality Scores
| Quality | Score | Rationale |
|---------|-------|-----------|
| Solves Narrow Problem | X/5 | [Why] |
| Scalable | X/5 | [Why] |
| Quick to Consume | X/5 | [Why] |
| Reveals Bigger Problem | X/5 | [Why] |
| Data-Driven | X/5 | [Why] |
| **Average** | **X/5** | |

### Implementation Plan
- **Format**: [Software tool / PDF / Landing page / Email offer / etc.]
- **Build effort**: [Low / Medium / High]
- **Delivery mechanism**: [Link in email / Attached / Reply to get / Auto-delivered]
- **Steps**: [Numbered list of what needs to happen to create this]

### Email Integration
- **How it fits in the email sequence**: [Where in the sequence does this appear?]
- **CTA style**: [Click link / Reply to request / Book a call]
- **Example email hook**: [1-2 sentence example of how to reference this in the cold email]
```

## Integration with Other Skills

This skill feeds into the campaign workflow:

```
client-research -> lead-magnet -> campaign-planning -> campaign-strategy -> email-copywriting
```

### Feeding into campaign-planning
- The plan's Offer and CTA come from this stage's recommendations, once the client agrees to the offer
- If multiple lead magnets are recommended, campaign-planning can test them across campaigns

### Feeding into campaign-strategy
- The selected lead magnet informs the funnel type (click-based vs reply-based)
- Campaign strategy email sequence blueprint references the lead magnet in CTAs

### Feeding into email-copywriting
- The hook formula and email integration notes guide how the copy references the offer
- Click-based: Email drives to landing page with lead magnet (only once the page is live)
- Reply-based: Lead magnet value proposition is embedded in email body

## Output Handling

**With a campaign workspace:** after the user confirms, write `lead-magnets.md` at the workspace root (`./cold-email/{slug}/lead-magnets.md`), one `## Lead Magnet [N]` section per recommended concept, in the output format above. Keep one file, never a duplicate: when it exists, keep the entries already there and update each one's **Status**.

**Standalone, or ideas only:** present the output in the chat.

Then tell the user which concepts are recommended and why.
