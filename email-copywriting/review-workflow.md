# Internal Email Review Workflow

This workflow runs automatically during email copy generation. No user input required.

## Overview

The review workflow ensures high-quality email copy by running an internal review cycle before outputting the final copy. This happens silently - do NOT output intermediate steps to the user.

## Workflow Steps

### Step 1: Copywriter Agent (Initial Draft)

**Context to load:**
- SKILL.md (this skill's orchestration)
- email_copywriting.md (tactical guidance for hooks, body, CTA, signature, PS)

**Output:** Draft email sequence (internal, not saved yet)

---

### Step 2: Reviewer Agent (Quality Check)

**Context loading order (PRIORITY MATTERS):**

#### Priority 1: Client-Specific Context (HIGHEST)
Load these first - they override all other guidance:

1. `{workspace}/notes.md` - Any client-specific preferences, past feedback, or explicit requests
2. **Conversation history** - Any inline feedback from the current session

#### Priority 2: Campaign Context
3. `{campaign_folder}/strategy.md` - Campaign-specific strategy and goals
4. Campaign plan context if available

#### Priority 3: QA Guidelines (LOWEST)
5. QA Checklists section below
6. Common Mistakes section below

**Review Scope - ONLY check:**
- Subject lines
- Email body content
- CTAs
- Formatting and readability
- Tone alignment with client preferences

**DO NOT review:**
- AI personalization prompts (handled by prompt-writer)
- List building criteria
- Campaign strategy itself

**Output format:**
```
## Email Review

### Overall Score: [1-5]

### Email-by-Email Feedback

**Email 1:**
- Issues: [list specific problems]
- Suggestions: [specific improvements with before/after]

**Email 2:**
...

### Client-Specific Notes Applied
[Any notes from {workspace}/notes.md that were applied]

### Priority Improvements
1. [Most important fix]
2. [Second most important]
3. [Third]
```

---

### Step 3: Copywriter Agent (Revision)

**Context to load:**
- Same as Step 1
- PLUS: Reviewer feedback from Step 2

**Task:** Incorporate all reviewer suggestions, especially client-specific preferences.

**Output:** Final email sequence (this is what gets saved)

---

## Feedback Priority Rules

When the reviewer encounters conflicting guidance, apply in this order:

1. **Client notes override everything** - If `notes.md` says "client hates emojis", never use emojis even if other guidance suggests it
2. **Conversation feedback overrides notes.md** - If user said something in this session, it's the latest preference
3. **Campaign strategy overrides generic guidelines** - The strategy was created for this specific campaign
4. **QA checklist provides baseline** - Use as default when no specific guidance exists

---

## QA Checklists

### Email Copy QA Checklist

Use this checklist to evaluate email copy quality. Grade each criterion from 1 to 5.

**Format:** Output as a table with Criteria, Score, What's good, What's bad, What to improve.

#### Clarity (Confusedness Score)

1. **Clear CTA** - Only 1 clear CTA. Is the email moving prospects to the next step?
2. **Clear ICP** - Is the target audience obvious?
3. **Clear Value Proposition** - Is the benefit crystal clear?
4. **At Most 1 Question** - Keep questions minimal

#### Tone & Style

1. **Conversational Tone** - Write like you're talking to a colleague
2. **Reading Level** - 6th-8th grade (Hemingway Editor style)
3. **Active Voice** - Avoid passive constructions
4. **Specific Benefit** - Focus on their benefit, not your features

#### Word Choice

**Spam words are tiered and budgeted** (full policy: `references/spam-words.md`):
- NEVER tier ("free", "credit card", phishing vocabulary, scam cluster) = automatic fail
- HIGH tier (guarantee, discount, limited time, act now, click here, special offer...) = aim for zero; 2+ in one email = fail
- MEDIUM tier (cost, price, offer, deal, opportunity, ROI, marketing, sales, money, income, earn...) = max 1-2 per email
- Subject lines: zero tiered words, no `$`/`%`/stacked numbers
- Count and report spam words per email as `word (tier)`

**Also avoid:**
- `$`/`%` in subject lines (single specific body figures are fine; stacked figures + urgency are not)
- Superlatives: "impressive," "fascinating," "revolutionary," "remarkable," "caught my attention"
- Buzzwords, AI-tell vocabulary and structures (`references/sound-human.md`)

#### Email Formatting

1. **Has Personalization Variables** - AI variables present
2. **Has Signature Variable** - Proper signature handling
3. **Length (HARD 80-word ceiling)** - Static body ≤80 words per email (one value-stack email may reach ~100 as a numbered list of real numbers); follow-ups ≤55
4. **Mobile-Friendly** - Short lines, scannable, lots of whitespace
5. **3-6 Emails** - In sequence
6. **Spell and grammar check** - names, companies, links, numbers, and offer claims perfect; 1-2 deliberate casual imperfections per sequence are intended human voice (`references/sound-human.md`), not typos to fix

### Self-Review Questions

*Assume you're a cold prospect receiving this email.*

#### Clarity & Understanding
- Can a 12-year-old understand this? (Exception: industry-specific ICPs)
- What's the ONE thing I want them to do? Is it crystal clear?
- Would I understand this knowing nothing about the company?
- Does copy flow from line to line and email to email?
- Am I using jargon they might not know?

#### Recipient Focus
- Why should THEY care about this?
- What problem am I solving for them specifically?
- How does this make their life easier/better/more profitable?
- Am I talking about them more than about me/my company?

#### Credibility & Trust
- Why should they believe me? Do I have proof?
- Would I respond to this email if I received it?
- Does this sound like every other sales email they get?
- Am I making claims I can back up?

#### Emotional Impact
- What emotion am I triggering? (Curiosity, urgency, FOMO, relief)
- Does this create a pattern interrupt or blend into their inbox?
- Would this make them think "finally, someone gets it"?

#### Technical Execution
- Is this scannable in 10 seconds?
- Is my CTA so easy a caveman could do it?
- Would this look good on mobile?

**Ultimate Test:** If I were them, would I click/reply or delete? Be brutally honest.

### Additional QA Steps

1. **Strategy Alignment** - Does copy follow the campaign strategy?
2. **Spam Testing** - Run copy through a spam checker tool
3. **Complete quality exercises** (see below)

---

## Critical Copy Rules Checklist

**MANDATORY**: The reviewer MUST check every email against these non-negotiable rules from SKILL.md.

### Transitions & Flow
- [ ] **No abrupt transitions** from {{First Line}} to body - personalized opening flows naturally into next sentence
- [ ] **Transitional context** provided or first line topic connects to body

### Language to Avoid (REJECT if found)
- [ ] No "Quick followup", "quick question", "touching base"
- [ ] No "No worries if timing isn't right" or apologetic/defensive language
- [ ] No "Quick insight:" prefix - state insights directly
- [ ] No typical sales clichés that scream "cold email"
- [ ] **Final-email salesy endings (REJECT)** - no "Last note from me", "Last email", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", "One last try". Check the final email every time.

### Brevity & Variables (REJECT)
- [ ] **Static body <=80 words** per email (prose + CTA, excluding the greeting, `{{...}}` lines, and `{sender_signature}`). Over 80 = fail. Follow-ups target <=55.
- [ ] **AI variables use `{{Title Case}}`** - reject any `[bracket]` AI variable.
- [ ] **Every email signs with `{sender_signature}`** - reject any hand-written sign-off.

### Formatting Requirements
- [ ] **Short paragraphs only**: 1-3 sentences max per paragraph
- [ ] **Adequate spacing** between thoughts (remember: AI adds 1-2 sentences)
- [ ] **Never ALL CAPS** for emphasis (use structure or italics only)

### First Email Requirements (Email 1 ONLY)
- [ ] **MUST mention the solution** - not just the problem
- [ ] **States problem AND offers solution** in the same email
- [ ] **Don't ask if they have problems** - state their problem and offer solution
- [ ] **UVP stated clearly** - don't keep value prop secret

### CTA Requirements (Check ALL emails - HARD)
- [ ] **Every email's CTA asks for the real offer, including Email 1** - reject any close that doesn't ask for the actual offer (demo/walkthrough/call/sample). Email 1 leads with the strongest version.
- [ ] **Reject diagnostic / soft questions as CTAs** - "Do you have a system for X?", "Where do your clients come from?", "Is it worth a look?", "a quick look", "Curious if...?", "Worth exploring...?"
- [ ] **Strong, direct, offer-specific CTAs** - "Want me to walk you through it?", "Open to a quick walkthrough?"
- [ ] **No "Should I close the loop?"** - use direct unsubscribe language instead
- [ ] **No complex rhetorical questions** that require too much thought to answer
- [ ] **No time commitment in the CTA** (no "30 minutes")

### Rhetorical Questions
- [ ] **If rhetorical question used**, it's immediately followed by answer/solution in next sentence
- [ ] **Never leave prospects hanging** - rhetorical questions need payoff

### Offer Strategy (Mid-Market)
- [ ] **Sells the PRODUCT**, not audits/analysis/friction analysis
- [ ] **Solution-focused for mid-market** - not indie hacker-style audits
- [ ] **Analysis/audit mentioned as proof/demo only**, not primary offer

### Case Study Relevance
- [ ] **Proof points match prospect's vertical** - no irrelevant case studies
- [ ] **No B2C examples for B2B prospects** (e.g., no Crocs for B2B SaaS)
- [ ] **Same or adjacent industry** case studies used
- [ ] **If no relevant case study**, use generic metric without company name

### Subject Line Threading
- [ ] **Email 1**: Uses AI-generated subject line (or tested static alternative)
- [ ] **Follow-up emails (2-5+)**: Subject line left empty to maintain threading

---

## Quality Exercises

*These exercises turn good copy into great copy.*

1. **Word Reduction** - Strip 50% of words while maintaining meaning. You won't hit 50%, but copy gets tighter.

2. **Read Aloud Test** - Read entire copy out loud. Identifies awkward phrasing immediately.

3. **Write Without Adjectives/Adverbs** - Use only nouns and verbs. Forces stronger word choices.

4. **Objection Handling** - List top 5 reasons someone might say "no". Write 1-2 sentences addressing each.

5. **"So What?" Test** - For every line, ask "So what?" If you can't justify it, cut it.

6. **Feature-to-Story Transformation** - Take a boring feature ("24/7 customer support") and rewrite as mini-story: "At 2AM, your system crashes. Within 3 minutes, our engineer is on the line..."

---

## Writing Techniques

### Core Techniques
- Use active voice instead of passive
- Explain complex products using everyday language
- Write sentences of 15 words or fewer
- Hierarchy: Pain points > benefits > features
- Start sentences with "You" more than "I" or "We"
- Use concrete numbers ("14 days" not "two weeks")
- Replace jargon with simple explanations
- Write at 8th-grade reading level
- Use contractions (it's, you'll) to sound natural
- Include specific timeframes ("3 minutes" vs "quickly")

### Advanced Techniques
- **Pattern Interrupts** - Break expectations to maintain attention
- **Future Pacing** - Help them visualize success after using your solution
- **Micro-Commitments** - Get small yeses before the big ask
- **Trojan Horse** - Lead with what they want, deliver what they need
- **Damaging Admission** - Admit a small flaw to build trust
- **Specificity Sells** - "2,847 companies" beats "thousands of companies"
- **Social Proof Stacking** - Layer different types of proof

### Psychological Triggers
- **Loss Aversion** - What they'll miss out on
- **Social Proof** - Others are already doing this
- **Authority** - Credentials and expertise
- **Reciprocity** - Give value first
- **Scarcity** - Limited availability or time
- **Curiosity Gaps** - Tease information they want
- **Identity** - Align with who they want to be

---

## Common Mistakes to Avoid

Don't follow templates blindly. Most cold email templates online are obvious cold emails that get ignored.

### The Offensive Words Rule
Never use offensive words (spam filter + professionalism issue).

**Important distinction:**
- Don't use offensive words ≠ don't offend people
- Be controversial but professional
- Be controversial enough to stand out, agreeable enough that 80-90% won't be turned off

### Opening Mistakes
- "I hope this email finds you well"
- "Sorry to bother you"
- "I know you're busy, but..."
- "Just following up"
- Company introductions in first line
- Weather, restaurant, school, soccer, or holiday references

### Body Mistakes
- Walls of text (paragraphs > 3 lines)
- Multiple ideas in one email
- Feature dumps without benefits
- Generic value props that apply to everyone
- Trying to educate before engaging
- Name-dropping without context
- False urgency or fake deadlines
- Obviously templated sections

### CTA Mistakes
- Multiple calls to action
- Vague CTAs ("Let me know your thoughts")
- High-commitment first asks ("Schedule a 1-hour demo?")
- Calendar links in first email
- Assumptive CTAs ("When can we meet?")

### Tone Mistakes
- Too formal/corporate
- Excessive exclamation points!!!
- ALL CAPS for emphasis
- Too many emojis
- Desperate language ("Please, please reply")
- Arrogant or condescending tone
- Too casual/unprofessional

### Technical Mistakes
- Broken personalization tags {FirstName}
- Multiple links
- Attachments in cold emails
- Images that don't load
- Signatures longer than email body
- Colored text or fancy fonts
- Email longer than 150 words (first touch)

### Strategic Mistakes
- Sending to generic emails (info@, support@)
- Not researching the company
- No follow-up sequence planned
- Same message to different ICPs
- Pitching competitors' clients with same message

---

## Version Control

- Name active versions clearly
- Format: "Campaign 1 -> Version 2, Active"
- Only one active version per campaign
- For A/B tests, create separate campaigns with different active versions

**Do QA every single time.** It's very annoying for clients not to have proper QA.

---

## Integration with SKILL.md

This workflow is triggered automatically by the Internal QA Process section in SKILL.md. The entire cycle runs silently before any output is shown to the user.

## Client Notes Location

```
{workspace}/
├── notes.md          # Client preferences and feedback
└── research.md       # ICP, value prop, overview, full research
```

The reviewer MUST check `notes.md` before applying any generic QA rules.
