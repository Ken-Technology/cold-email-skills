## Email Copywriting
_How to write email copy_

**0. The frame: a one-on-one favor, not a marketing email**

*   AI personalization renders every email as an individual note to one person - write it as one human typing to another because you found something that helps them.
*   You're doing them a favor: handing over something on you or fixing a problem they have. Features and "we offer / our platform provides" framing are marketing-email tells - say what THEY get, in plain verbs.
*   Full frame, tests, and the deliberate-imperfection spec in `references/sound-human.md`.

**1. Value Proposition Compression (the core skill)**

*   Write the offer as ONE plain sentence first: concrete deliverable + who it's for + what they get. "We'll send 3,000 personalized emails to your ideal clients on us." If you can't write that sentence, you don't understand the offer yet - go back to the research.
*   That sentence is the spine of Email 1. Everything else in the sequence supports it: proof, risk reversal, close.
*   Explore angles, case studies, and social proof building blocks - then compress each back to its fewest words. The best value prop and use case in as few words as possible IS the job.
*   Concrete nouns and numbers over adjectives, mechanism in verbs ("we write the copy, build the list, handle everything"), objections killed in one line ("You don't need to pay anything, just sign up if you want it").
*   Study `references/gold-standard.md` - the two operator-written campaigns are the bar.

**2. Campaign Strategy Driven (When Strategy Provided)**

*   Start with the segment's strategy (`## Strategy - <segment name>`): its email sequence blueprint is the plan, and your copy is the execution layer
*   Each email's **Goal**, **Hook**, **Content**, **Proof**, **CTA** and **Tone** guide your writing; its **Delay** is the step's wait days
*   Insert AI variable placeholders where the strategy specifies
*   Let the strategy's structure guide your copy flow; the funnel type (click, reply or story) sets the technique, length and tone (`references/copywriting-guide.md`)

### Formatting
#### Basic Rules
*   **Plain text only** - No markdown formatting in emails
*   No headings, no bulleted lists, no numbered lists
*   For bullets, use simple dashes (the minus sign on keyboard)
*   For numbered items, write manually as 1, 2, 3, 4 (no auto-formatting)
*   No bold, italic, or other text styles
*   **One link maximum per email, signature company link included** - a markdown link on a few plain words, `https` only. Never a bare URL and never link text that reads like a web address (`acme.com`): click tracking routes the link through a tracking domain, and a visible host that does not match reads as phishing
*   Don't use special dash characters (no em or en dashes); use only the simple dash from keyboard
*   Numbers as digits: "40-50%", "3,000 emails", never "forty to fifty percent"

#### AI Variable Placeholders
When including AI personalization variables in email copy:
*   Use double braces: `{{Variable Name}}`
*   Match the variable name from the Campaign Strategy
*   Common placeholders: `{{First Line}}`, `{{PS Line}}`, `{{Subject Line}}`, `{{Industry Hook}}`
*   Place variables exactly where the strategy specifies
*   **Use stable Title Case display names** - never a lowercase or snake_case spelling of `{{First Line}}`, and no alternate spellings like `{{Subject line}}`
*   **Write the double-brace form directly** - `{{First Line}}` is exactly what personalization tools and LLMs resolve. Never use square brackets (`[First Line]`); the lint rejects them as unresolved placeholders.

#### Lead Variables (Contact Data)
Lead variables are auto-resolved from contact data. Use single braces with camelCase:
*   `{firstName}` - Contact's first name (most common, used in greetings)
*   `{lastName}` - Contact's last name
*   `{company}` - Company name (NOT `{company_name}`)
*   `{companyDomain}` - Company domain
*   `{title}` - Job title
*   Only the 38 lead variables listed in `references/lead-variables.md` (the lint contract in **email-copywriting**) pass the lint, and several of those are legacy names sending tools do not map or render blank at send time; which ones are safe is in that file
*   **Never use snake_case** - `{first_name}` is WRONG, `{firstName}` is correct

#### Subject Lines as AI Variables
*   **Default approach**: Subject lines should usually be AI personalization prompts, not static text
*   Use the `{{Subject Line}}` placeholder on every step (follow-ups included) and create a corresponding AI prompt
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
*   Generic market percentages ("80% of companies...") read like marketing; use words instead ("almost no one")
*   A specific, true count from a real customer is proof, not a statistic: "7 meetings per 10k contacts" sells
*   Never a `%` or `$` in a subject line, and never stack several figures in one sentence (`references/spam-words.md`)

**3. Risk Reversal**
*   Objection handling
*   Guarantees
*   Trials and samples (never the word "free" in copy - see `references/spam-words.md`)

**Important:** Risk reversal is less relevant in cold emails since the goal is to make them reply, not buy. Risk concerns typically arise at purchase moment, not interest stage.

**Exception:** Powerful for creating compelling offers
Example: "We'll create 10 LinkedIn posts on us. If they don't beat your current performance, we'll pay you $500."

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
*   Example: After offering "10 LinkedIn posts on us"

**2. Click-Based CTAs**
Best for:
*   Sharing lead magnets
*   Sharing PDFs, interactive tools, AI tools
*   Sharing case studies
*   Video content
*   A click CTA carries the email's one link, so the signature company name stays plain in that email

**Key Insight:**
*   More people click than reply
*   Clicks are not equal to replies in value
*   Use clicks for wide distribution (videos, resources)
*   Use replies for driving real sales conversations

**Campaign Strategy Alignment:**
Follow the CTA approach specified in the Campaign Strategy. If strategy says "reply-based," use conversational reply CTAs. If it specifies a lead magnet click, structure the CTA around that.

### Signature

**HARD RULE: every email signs off with `{sender_signature}` on its own line, after the CTA.** The sending tool swaps it for the sending inbox's own signature, so multi-inbox sends stay consistent and sender identity varies at the inbox layer. Never hand-write the closer, name and title as a literal signature.

**When the sending tool has no signature variable**, use a two-line block with only `{sender_first_name}` and `{sender_last_name}` as sender variables.

**Formula:**
```markdown
[Greeting - Best, Best regards, Cheers, etc.]
{sender_first_name} {sender_last_name} - [title] at [Client company name](https://client-site.example)
```

**Company name as a link (DEFAULT in the two-line block):** link the client company name in the signature. That link is the email's one link (the lint allows at most 1 link per email). In an email whose CTA already carries a link, write the company name plain.

- **Default URL:** the company's root domain homepage, from the client's website in the company context; strip `www.`; always `https://`.
- **Deep links are fine when they fit** - product page, case study, vertical landing, or other destination if it is a stronger signature click than the homepage for this campaign.

**Examples:**
```markdown
Cheers,
{sender_first_name} {sender_last_name} - Founder at [Acme](https://acme.com)

Best,
{sender_first_name} {sender_last_name} - CEO at [Acme](https://acme.com/pricing)
```

The title and company name are literal campaign/client values from context, not sender variables.

**Placement:** the signature (the `{sender_signature}` line or the block) goes after the CTA. A PS variable (`{{PS Line}}` / `{{Final PS Line}}`) goes on its own line **after** the signature. Signoff choice by audience: the Signature rules in **email-copywriting**.

**What to avoid:**
*   A hard-coded sender name, or any sender variable besides `{sender_signature}`, `{sender_first_name}` and `{sender_last_name}`
*   An unlinked company name (plain `Acme`), except in an email whose one link is the CTA
*   Extra social-proof lines, taglines, phone numbers, or a second link
*   Different signature complexity by email position

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

**Frequency:** Use PS lines in at most 1-2 emails of the sequence (default: Email 1 and the last email), never every email

**AI Variable Integration:**
The `{{PS Line}}` variable is perfect for AI personalization - it's where prospects expect personal touches. When using this variable, ensure the template PS (if any) complements rather than duplicates the personalized content.

**Example Use Case:**
If body discusses offer, PS can add quick social proof - two different ideas that support each other.



## What to avoid

- Avoid all salesy and marketing language at all costs. 
- Never write from the marketer's chair. If the email is a list of what "we" do or offer, it's a brochure - rewrite it as a note about what this one reader gets (the favor frame in `references/sound-human.md`).
- Skip straight to the topic and to the best piece of information you have. Instead of "Quick follow-up - most advisors know retention beats acquisition", use "Retention beats acquisition".
- Don't ever use Quick follow-up, Noticed that, Just wanted to share, and all other usual salesy language.
- **In the last email, never announce it as a follow-up or last attempt.** Banned: "Last email", "Last note from me", "Just following up", "Following up", "Circling back", "Checking in", "Wanted to follow up", "Bumping this", "One last try". This rule keeps getting violated - email-review rejects on it. The final email opens on a real idea and closes on the offer CTA.
- **Spam words are budgeted, not vibes**: the tiered policy (NEVER / HIGH / MEDIUM, max 1-2 MEDIUM per email, subject lines fully clean) plus safe alternatives lives in `references/spam-words.md`. "free" and "credit card" are hard-banned. Apply it while drafting, not just at review time.
- **Never make a false offer claim** - e.g. don't write "no card needed" if a card is actually required. Every claim must match the client's real offer.
- **No AI-tells**: the lexicon (delve, leverage, seamless, "I hope this email finds you well"...), the structures ("It's not just X, it's Y", tidy triads, metronomic sentences), and the human-voice techniques live in `references/sound-human.md`. Draft in the ICP's language per the Voice Card, and read every email aloud before handing it off.
