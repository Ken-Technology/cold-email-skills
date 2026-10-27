# AI Personalization & Prompt Engineering

Detailed guidance for writing AI personalization prompts (AI variables) for cold email campaigns.

## Beyond Basic Personalization

AI is useful for more than subject lines, first lines and PS lines. Be creative with what the available data allows.

**Key question to ask yourself:**
> "If I had to write this email by hand and only had the data the AI has (LinkedIn and website), what would I write?"

### Variable Types

**Default variables:**
- Subject Line
- First Line
- PS Line
- Final PS Line (last email, when the strategy uses one)

**Custom variables (creative options):**
- Case study comparisons
- Industry-specific references
- Role-based pain points
- Company stage/size context
- Product/service-specific hooks
- Target market mentions

Most campaigns need only the defaults. Over-personalizing every email is the most common operator complaint, so add a custom variable only when the strategy asks for it.

---

## Prompt Structure: System vs User Prompts

The AI sees two kinds of prompts.

### System prompts (`to_output: false`) - the supporting context

You do not write these as variables. They are the context the AI sees with every prompt; when the user runs the prompts in their own tool or LLM, they load it once, filled from `research.md` and `emails_v2.md`. Shown here so you know what the AI already sees:

- **Instructions** - the task, plus the sender's name and company
- **Company Context** - the company context from `research.md`
- **Rules** - the default writing rules (below)
- **Email Sequence** - the segment's sequence from `emails_v2.md`

### User prompts (`to_output: true`) - what you write

Variable-specific instructions that generate the personalized content:
- **Subject Line** - short attention-grabbing text
- **First Line** - personalized opening hook
- **PS Line** - human, personal touch at the end
- **Custom variables** - role pain points, industry hooks, and so on

**CRITICAL - lead data is injected for you:**
- The contact's lead fields (first name, company, domain, title and so on) are already in the AI's context.
- **Do not put variable syntax in prompt text** (no `{firstName}` or `{company}` inside a prompt).
- Describe the data in plain words: "Use their job title from LinkedIn..." not "Use {title}...".

### What the system prompts say

**Instructions:**
```
Hey, your task is to help us write really good personalized emails on behalf of the sender, who is [position at company]. Your task is to only personalize variables inside our email templates that we send. These are cold prospects who might or might not know about our company. Your goal is to get their attention and keep them reading.
```

**Company Context:** a 4-sentence summary of the client - what it does, who it sells to, the value proposition, the strategy.

**Rules:**
```
Here are a few rules and recommendations you should follow:
- First and foremost, don't be boring. Be engaging. Make them want to read what you write. Sound like a real person using natural, everyday language. A good phrase to remember is: write like you talk.
- Do not follow sales or marketing patterns, use common clichés, or rely on vague statements such as, "I noticed you [did something]." Instead, write like an excited teammate telling you about a cool new idea.
- Use simple language, roughly at a seventh-grade reading level.
- Bring genuine new ideas, rather than simply summarizing what already exists.
- Never mention variables directly. This should feel like a one-on-one email, not a personalized template.
- Do not assume anything about the recipient or our company beyond what's already stated in the company context. Also, do not try to establish forced connections, such as, "We went to the same school."
```

**Email Sequence:** "Here's the email template you will personalize. Don't write or try to improve this email template. This is for your information and context only. Make sure your AI output fits well in this sequence." followed by the segment's subject lines and bodies.

Do not repeat any of this in your user prompts.

---

## Variable fields (one prompt each)

Each variable is one H3 in the segment's `prompts.md` (the **prompt-writer** skill has the file shape). Fields:

| Field | Required | Notes |
|-------|----------|-------|
| Name (the H3) | yes | Title Case plain text, max 30 characters, exactly the `{{Title Case}}` token used in the sequence (`First Line` for `{{First Line}}`). Unique after lowercase snake_case normalization. |
| Prompt | yes | The user prompt text, max 4096 characters, no `---` line inside. |
| Location, Email(s) | no | Where the token sits (subject, opener, body, PS) and which emails carry it, for the reader. |
| Rewrite | no | no keeps the output as written (Subject Line), yes sends it through rewriting once. |
| Fallback | no | Plain-text default used when the AI output is blank. No `\|`, `{` or `}`. |

Where a variable sits in the email and which email carries it are decided by where its `{{Title Case}}` token appears in the sequence, not by a field.

---

## Writing Effective Prompts

Every prompt should contain these elements:

### 1. Clear output instruction
Start with exactly what to generate:
- "Write a subject line that..."
- "Generate a 1-sentence opening that..."
- "Create a PS line starting with 'PS: ' that..."

### 2. Specific data sources
Tell the AI exactly where to look:
- "From their LinkedIn profile, find..."
- "Based on their company website..."
- "Using their job title from LinkedIn..."

### 3. Tone and style guidance
- "Keep it conversational and curious"
- "Professional but friendly"
- "Smart, concise, and straightforward"

### 4. Length constraints
- "Under 6 words"
- "Maximum 20 words"
- "1-2 sentences only"

### 5. What to avoid
- "Avoid emojis and exclamation marks"
- "Don't summarize their profile"
- "No generic compliments"
- "Don't sound robotic or salesy"

### 6. Fallback instructions
- "If industry isn't clear, reference their company size instead"
- "If no specific detail stands out, focus on their role"

---

## Standard templates

The Subject Line, First Line and PS Line templates live in the **prompt-writer** skill (Standard Variable Templates). Use them as the base and change them only slightly.

---

## Creative variable examples

### Industry Context
- **Name:** `Industry Context` (body of Email 1)
- **Prompt:** Based on the company's industry from their LinkedIn company page and website, create a 1-sentence industry-specific observation that connects their industry to a relevant challenge. Reference challenges or opportunities common in their specific industry based on what their company does. Use their actual industry and what you can infer from their website about their market. Keep it conversational and insightful, not generic.

### Role Pain Point
- **Name:** `Role Pain Point` (body of Email 2)
- **Prompt:** Based on the prospect's job title from LinkedIn, reference a pain point or goal specific to that role. For VPs/Directors: scaling challenges, team efficiency. For C-suite: strategic initiatives, competitive positioning. For individual contributors: day-to-day workflow pain. Make it specific to their actual title. 1 sentence maximum. The pain point should feel like something only someone in their role would truly understand.

### Company Stage Context
- **Name:** `Company Stage Context` (body of Email 3)
- **Prompt:** Based on company LinkedIn data (employee count), create a context-specific reference. For small companies (1-50): growth and scaling challenges. For large companies (500+): complexity and integration needs. For mid-market (50-500): resource constraints and agility balance. 1 sentence. Make it feel like you understand the unique challenges of companies at their stage.

---

## Complete example

A 3-email sequence whose strategy asked for an opener in every email. Each email that needs its own opener gets its own name, because one prompt produces one value per lead and a reused token sends the same sentence again.

Each entry below is one H3 in `prompts.md` (Rewrite no for Subject Line, yes for the rest).

```
variables = [
  {"name": "Subject Line", "order": 1, "prompt": "Write a 3-5 word subject line that references something specific from their company website or LinkedIn profile. Use lowercase except for names. No emojis or punctuation. Focus on a small detail that shows you did research - their product, their market, or their role. Goal: spark curiosity in under 6 words."},
  {"name": "First Line", "order": 2, "prompt": "Write a personalized opening line (no greeting) that hooks attention by referencing something specific from their LinkedIn profile or company website. Under 20 words. Should spark curiosity and lead into the email naturally. Avoid questions, emojis, exclamation marks. Don't summarize their profile - find an insight or angle that shows genuine interest."},
  {"name": "Industry Insight", "order": 3, "prompt": "Based on their industry (from the LinkedIn company page), write 1 sentence connecting a common challenge in their space to the value proposition. Make it specific to their industry, not generic. Should feel like an observation from someone who understands their market."},
  {"name": "PS Line", "order": 4, "prompt": "Write a PS line starting with 'PS: '. 1-2 sentences max. Reference a small, specific detail from their LinkedIn or website that most people wouldn't notice. Be casual and human. Can include subtle humor if appropriate. Goal: make them feel noticed without being creepy or generic."},
  {"name": "Bump First Line", "order": 5, "prompt": "Write a brief opener for a follow-up email that adds a new angle to the previous email's topic, tied to the challenges of their role based on their LinkedIn title. Under 15 words. Conversational, like a colleague continuing a conversation. Don't mention the previous email."},
  {"name": "Final First Line", "order": 6, "prompt": "Write a brief, respectful opener for the closing email that gives one more reason this matters to them, tied to something specific from their company website or LinkedIn page. Under 15 words. Never mention that this is the last email, and never sound desperate or guilt-tripping."}
]
```

---

## Alignment with Campaign Strategy

When a campaign strategy lists AI variables:

1. **Use the strategy's names**, in Title Case, exactly as the sequence tokens spell them.
2. **Follow the strategy's placement** - the token sits where the strategy put it.
3. **Expand each short description into a full prompt** - the strategy gives the intent; you write the detailed prompt.
4. **Check per-email scope** - a variable used in several emails sends the same value in each; flag a reused body token back to email-copywriting instead of writing one shared prompt.

---

## Common Prompt Mistakes

**Too vague:**
- Bad: "Write something personalized"
- Good: "Write a 1-sentence hook referencing their main product from their website"

**Impossible data sources:**
- Bad: "Reference their recent funding round" (not available)
- Good: "Reference their company size from LinkedIn" (always available)

**Missing constraints:**
- Bad: "Write a subject line"
- Good: "Write a 3-5 word subject line, lowercase except names, no emojis"

**No fallback:**
- Bad: "Reference their latest blog post" (might not exist, and blogs are not a data source)
- Good: "Reference something from their website; if nothing stands out, use their company tagline"

---

## Testing Your Prompts

Before saving:

1. **Run the prompt mentally** - can you produce good output from only the data sources named?
2. **Check data availability** - does the prompt reference only enriched data?
3. **Verify placement** - does the output fit where its token sits in the email?
4. **Test edge cases** - what happens when a field is missing?

After writing, test them by hand on 3 to 5 sample prospects (Task 5 of **prompt-writer**).
