## Email Copywriting
_How to write email copy_

**0. The frame: a one-on-one favor, not a marketing email**

*   AI personalization renders every email as an individual note to one person - write it as one human typing to another because you found something that helps them.
*   You're doing them a favor: handing over something free or fixing a problem they have. Features and "we offer / our platform provides" framing are marketing-email tells - say what THEY get, in plain verbs.
*   Full frame, tests, and the deliberate-imperfection spec in `references/sound-human.md`.

**1. Value Proposition Expansion**

*   Start with a clear value proposition
*   Expand based on that foundation
*   Ask: What angles can I put on this?
*   What case studies support this?
*   What social proof building blocks can I use?
*   Build outward from the core value

**2. Campaign Strategy Driven (When Strategy Provided)**

*   Start with the email sequence blueprint from Campaign Strategy
*   Each email's `primary_goal` and `description` guides your writing
*   Insert AI variable placeholders where the strategy specifies
*   Let the strategy's structure guide your copy flow

### Formatting
#### Basic Rules
*   **Plain text only** - No markdown formatting in emails
*   No headings, no bulleted lists, no numbered lists
*   For bullets, use simple dashes (the minus sign on keyboard)
*   For numbered items, write manually as 1, 2, 3, 4 (no auto-formatting)
*   No bold, italic, or other text styles
*   **One link maximum** - Must be transparent (not embedded)
*   Don't use special dash characters; use only the simple dash from keyboard

#### AI Variable Placeholders
When including AI personalization variables in email copy:
*   Use double braces: `{{Variable Name}}`
*   Match the variable name from the Campaign Strategy
*   Common placeholders: `{{First Line}}`, `{{PS Line}}`, `{{Subject Line}}`, `{{Industry Hook}}`
*   Place variables exactly where the strategy specifies
*   **Use stable Title Case display names** - do not mix `{{First Line}}` and `{{first_line}}`, and do not create alternate spellings like `{{Subject line}}`
*   **Write the double-brace form directly** - `{{First Line}}` is the canonical form personalization tools and LLMs expect. (The legacy `[First Line]` square-bracket form still often auto-converts for old files, but use `{{...}}` in all new copy.)

#### Lead Variables (Contact Data)
Lead variables are auto-resolved from contact data. Use single curly braces with camelCase:
*   `{firstName}` - Contact's first name (most common, used in greetings)
*   `{lastName}` - Contact's last name
*   `{fullName}` - Contact's full name
*   `{company}` - Company name (NOT `{company_name}`)
*   `{title}` - Job title
*   `{industry}` - Company industry
*   See `references/lead-variables.md` for the full list of 28 available variables
*   **Never use snake_case** - `{first_name}` is WRONG, `{firstName}` is correct

#### Subject Lines as AI Variables
*   **Default approach**: Subject lines should usually be AI personalization prompts, not static text
*   Use `{{Subject Line}}` placeholder and create a corresponding AI prompt
*   Static subject lines are acceptable only when:
    - Testing multiple static options explicitly requested by user
    - Subject line is part of a specific tested formula
    - Campaign strategy specifies static subjects
*   When in doubt, default to AI-generated subject lines for maximum personalization

#### Layout & Readability
*   Write like a normal person and use lots of white space
*   Keep paragraphs short - no more than three lines each
*   Put one empty line between paragraphs
*   The greeting should always be followed by an empty line
*   **Mobile optimization:** 60% of people read email on mobile
    *   Test every email on your phone
    *   If email is longer than one phone screen, it's probably too long
    *   At minimum, ensure the hook is immediately visible

### Email Blocks
#### Key Principle: Flow is Everything
One of the most important points is to make all blocks flow nicely. While we structure emails in terms of copywriting blocks (hooks, body blocks, social proof, CTAs), the most important thing is for the email itself to read nicely.

**Remember:**
*   You don't write good sentences, you write good email sequences
*   The whole email sequence has to make sense
*   It shouldn't read like sentences stitched together
*   It should feel like a single comprehensive email
*   Every single block can be one sentence, two sentences, or even the whole email
*   AI variables should blend seamlessly - they shouldn't feel like "insert personalization here"

#### One Idea Per Email
Every single email has to have **one idea** and drive one piece of information home. Don't focus on many things.

**Examples:**
*   If talking about a case study, focus entirely on that case study
*   If introducing an offer, make that the sole focus
*   You can have multiple supporting elements IF they reinforce the main idea
*   If a testimonial makes the offer sound better, include it
*   If a testimonial distracts from the offer, leave it out

### Hook
#### What Makes a Good Hook
**Most Reliable Approach:** Insightful + Relevant Information
*   Share something they didn't know about
*   Make it relevant to their business
*   Ask clients for unknown but insightful information their audience needs

**Example:** "HubSpot backs up your data for seven days only. After that, if you lose it, you lose it."
*   Insightful
*   Useful
*   Probably unknown

**When Using AI Variables for Hooks:**
*   The `{{First Line}}` variable often serves as the personalized hook
*   Template body should flow naturally from the personalized opening
*   Write your template assuming the AI variable creates the initial connection

#### Hook Strategies
**1. Questions (Use Carefully)**
*   Questions are marketing patterns - avoid when possible
*   Only use when it genuinely makes sense
*   Avoid: "Did you know that this thing happened?" (Too generic)

**2. Describe the Situation/Pain Point**
*   Don't describe the pain - just mention it
*   People already know how it feels
*   Your job is to make it painful/urgent

**3. Statistics (Use Sparingly)**
*   Stats sound specific but are overused marketing patterns
*   Better approach: Be dramatic and controversial
*   Instead of "80% of companies don't back up their data"
*   Say: "Almost no one backs up their data"

**4. Be Controversial (Within Reason)**
*   You're allowed to be a bit controversial
*   Speak like this is an issue you deeply care about
*   If 80-90% of your audience will understand, that's good enough

**Example Hook:**
"Almost no one has someone in charge of data backups. And when something goes wrong, which does in three out of four cases, companies lose data permanently because no one else besides you are tasked to protect your data. That costs you money."

### Body
The body primarily provides supporting statements for the hook. If the hook is personalization/icebreaker, the body becomes the real hook where you keep them engaged.

#### Three Primary Categories of Body Copy
**1. Information**
*   Value proposition (most important)
*   Outcomes
*   Bold claims
*   Pain points
*   Solutions and outcomes (never a feature list - the mechanism gets one plain clause at most)
*   Stories

**Power of Direct Value Props:**
Sometimes your value proposition alone is enough. Example: "Our business saves 20% of your AWS bill" - no need for elaborate benefits or stories if the value prop is compelling enough.

**2. Social Proof**
*   Case studies (combination of all social proof elements)
*   Testimonials (what clients said about you)
*   Results (specific outcomes achieved)
*   Statistics (use sparingly, prefer "4 out of 5" over "80%")
*   Name dropping (Google, Microsoft, Apple, etc.)

**Note on Statistics:**
*   Overused marketing pattern
*   Flagged as spam by algorithms
*   Use words instead of percentages when possible

**3. Risk Reversal**
*   Objection handling
*   Guarantees
*   Free trials/samples

**Important:** Risk reversal is less relevant in cold emails since the goal is to make them reply, not buy. Risk concerns typically arise at purchase moment, not interest stage.

**Exception:** Powerful for creating compelling offers
Example: "We'll create 10 LinkedIn posts for free. If they don't beat your current performance, we'll pay you $500."

### CTA (Call to Action)
#### CTA Rules
A call to action is a short piece that should **always** exist in every single email. It tells prospects clearly what they should do.

**What NOT to do:**
*   Don't have two CTAs
*   Don't ask two questions
*   Don't make long CTAs (avoid multi-line CTAs)
*   Don't use marketing patterns ("click here to learn more", "reply yes if interested")

**What TO do:**
*   **Every email's CTA asks for the real offer** (the call, demo, walkthrough, or sample), including Email 1. Lead with the strongest version of that ask up front - don't hold it back for later emails.
*   CTAs should feel like something a human would write
*   Keep it simple and direct
*   One CTA per email (but vary the phrasing of the same offer across the sequence)
*   **Never use a soft diagnostic question as the CTA** ("Do you have a system for X?", "Where do your clients come from?", "Is it worth a look?", "a quick look"). Asking about their situation is not a CTA - ask for the meeting.

#### Two Types of CTAs

**1. Reply-Based CTAs**
Best for:
*   Asking directly for a call
*   Gauging interest in value proposition
*   When email focused on offer/value prop
*   Example: After offering "10 free LinkedIn posts"

**2. Click-Based CTAs**
Best for:
*   Sharing lead magnets
*   Sharing PDFs, interactive tools, AI tools
*   Sharing case studies
*   Video content

**Key Insight:**
*   More people click than reply
*   Clicks are not equal to replies in value
*   Use clicks for wide distribution (videos, resources)
*   Use replies for driving real sales conversations

**Campaign Strategy Alignment:**
Follow the CTA approach specified in the Campaign Strategy. If strategy says "reply-based," use conversational reply CTAs. If it specifies a lead magnet click, structure the CTA around that.

### Signature

**HARD RULE: every email signs off with the single token `{sender_signature}`** on its own line, in place of the closer + name + title. Do not hand-type "Best,", a name, a title, or a tagline as a literal signature in the body. The sending inbox owns its signature and injects it through `{sender_signature}`, which keeps sends consistent across inboxes and lets sender identity vary at the inbox layer. Use it on **every** email, not just the first.

Placement: `{sender_signature}` goes where the sign-off was, after the CTA. A PS variable (`{{PS Line}}` / `{{Final PS Line}}`) goes on its own line **after** `{sender_signature}`.

Because the same inbox signature renders on every email, the older position-based strategy (heavy social-proof signature on Email 1, minimal on follow-ups) no longer applies. Keep the inbox signature clean and consistent, and put any credibility in the **body**, where it can vary by email. The formulas below describe what a good **inbox signature** should contain (configured once per inbox) - they are not something you paste into each email body.

#### What a good inbox signature contains

---

If the inbox signature includes a credential, keep it semi-casual with one biggest credibility marker. This establishes authority without being pushy.

**Formula:**
```
[Signoff]
[First name] [Last Name]
[Position] at [Company]
[Biggest social proof/credibility marker]
```

**Signoff Options:**
*   Best,
*   Cheers,
*   Best regards,

**Social Proof Examples:**

*Exit/Revenue:*
*   "$169M exit"
*   "8-figure founder"
*   "$50M ARR"

*Client Results:*
*   "273 companies scaled"
*   "1,000+ clients served"
*   "Generated $2.3M for SaaS companies"

*Credibility Markers:*
*   "Ex-Google"
*   "YC W21"
*   "Forbes 30 Under 30"

*Industry Recognition:*
*   "#1 Cold Email Agency"
*   "Top 10 Marketing Expert - Inc"
*   "TechCrunch Featured"

**Complete Example:**
```
Cheers,
Ryan Allis
Founder of SaasRise
$169M exit
```

**What to Avoid:**
*   Long titles or multiple credentials
*   Weak social proof ("5 years experience")
*   Generic descriptions ("Marketing Expert")
*   Multiple social proof points (pick your strongest ONE)

---

#### Keep it minimal

A clean inbox signature beats a busy one. One credential at most. Authority is better carried in the body than repeated under every email.

**Formula:**
```
[Signoff]
[Full Name]
```

**Signoff Selection by Audience:**
Match the signoff formality to your ICP:

| Audience Type | Recommended Signoffs |
|---------------|---------------------|
| Enterprise / C-Suite / Finance / Legal | Best regards, Best, |
| Mid-market / Technical / SaaS | Best, Cheers, |
| SMB / Startups / Creative | Cheers, Best, |

**Examples:**
```
Best regards,
Ryan Allis
```

```
Best,
Sarah Chen
```

```
Cheers,
Michael Torres
```

**Why minimal signatures work for follow-ups:**
*   Maintains conversational tone appropriate to continued dialogue
*   Avoids repetition of credibility already established
*   Keeps focus on the email content
*   Feels like continued conversation, not repeated pitch

### PS Line
#### The Power of PS
The PS-Line is one of the most overpowered lines in cold email sequences, but everyone uses it - be careful not to betray your audience.

#### PS Line Best Practices
**Uses:**
*   Personal references (AI personalization about prospect)
*   Breaking the "one idea" rule strategically
*   Adding social proof that supports main message
*   Quick additional ideas
*   Jokes (but they must be good/smart, not cheesy)

**Characteristics:**
*   More casual and personal than body
*   Not unprofessional, but more relaxed
*   Treat as "personal space" for missed details
*   Technically "post-scriptum" but use as personal addition

**Frequency:** Use PS lines in 2-3 out of 5 emails (not every email)

**AI Variable Integration:**
The `{{PS Line}}` variable is perfect for AI personalization - it's where prospects expect personal touches. When using this variable, ensure the template PS (if any) complements rather than duplicates the personalized content.

**Example Use Case:**
If body discusses offer, PS can add quick social proof - two different ideas that support each other.



## What to avoid

- Avoid all salesy and marketing language at all costs. 
- Never write from the marketer's chair. If the email is a list of what "we" do or offer, it's a brochure - rewrite it as a note about what this one reader gets (the favor frame in `references/sound-human.md`).
- Skip straight to the topic and to the best piece of information you have. Instead of "Quick follow-up - most advisors know retention beats acquisition", use "Retention beats acquisition".
- Don't ever use Quick follow-up, Noticed that, Just wanted to share, and all other usual salesy language.
- **In the last email, never announce it as a follow-up or last attempt.** Banned: "Last email", "Last note from me", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", "One last try". This rule keeps getting violated - the review pass rejects on it. The final email opens on a real idea and closes on the offer CTA.
- **Spam words are budgeted, not vibes**: the tiered policy (NEVER / HIGH / MEDIUM, max 1-2 MEDIUM per email, subject lines fully clean) plus safe alternatives lives in `references/spam-words.md`. "free" and "credit card" are hard-banned. Apply it while drafting, not just at review time.
- **Never make a false offer claim** - e.g. don't write "no card needed" if a card is actually required. Every claim must match the client's real offer.
- **No AI-tells**: the lexicon (delve, leverage, seamless, "I hope this email finds you well"...), the structures ("It's not just X, it's Y", tidy triads, metronomic sentences), and the human-voice techniques live in `references/sound-human.md`. Draft in the ICP's language per the Voice Card, and read every email aloud before handing it off.

