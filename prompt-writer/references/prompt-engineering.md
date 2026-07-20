# AI Personalization & Prompt Engineering

This reference provides detailed guidance on creating effective AI personalization prompts for cold email campaigns.

## Beyond Basic Personalization

AI is powerful for more than just subject lines, first lines, and PS lines. Be creative with how you use AI based on available data.

**Key Question to Ask Yourself:**
> "If I were to manually write an email to someone and only had access to the data that the AI has (LinkedIn and website), what would I write?"

### Variable Types

**Default Variables:**
- First Line
- PS Line
- Subject Line

**Custom Variables (Creative Options):**
- Case study comparisons
- Industry-specific references
- Role-based pain points
- Company stage/size context
- Product/service-specific hooks
- Target market mentions

---

## Prompt Structure: System vs User Prompts

All AI personalization prompts consist of TWO parts:

### System / Context Prompts (To output: false)
> **Note**: Supporting context (who the sender is, company overview, style rules, the email sequence) is usually loaded into the personalization tool or LLM separately from the per-variable user prompts. You do not need to author these as H3 variable prompts. They are listed here so you understand what the model should see.

- **Instructions**: Sender role and goal of the personalization pass
- **Company Context**: Short client summary (what it does, who it sells to, value prop, strategy)
- **Rules**: Voice, anti-cliché, and safety rules
- **Email Sequence**: The sequence being personalized (for fit and handoff)

### User Prompts (To output: true)
Variable-specific instructions that generate actual personalized content:
- **Subject Line**: Short attention-grabbing text
- **First Line**: Personalized opening hook
- **PS Line**: Human, personal touch at end
- **Custom Variables**: Role pain points, industry hooks, etc.

**CRITICAL - Variables Are Auto-Injected:**
- Personalization tools often inject lead fields like `{firstName}`, `{company}`, `{companyDomain}` into the LLM context
- **DO NOT include variable syntax in your prompts** (no `{variable_name}` references)
- Just describe what data to use: "Use their first name..." not "Use {firstName}..."
- The LLM has access to prospect data through the tool - you just describe what to generate

---

## Template Structure

### System / Context Prompts Section

> These templates are supporting context for the LLM. They are shown so you understand what a strong personalization run includes; they are not the H3 user prompts this skill outputs.

#### Instructions
```
Hey, your task is to help us write really good personalized emails on behalf of [sender name], who is [position at company]. Your task is to only personalize variables inside our email templates that we send. These are cold prospects who might or might not know about our company. Your goal is to get their attention and keep them reading.
(To output: false)
```

#### Company Context
```
[Enter a 4 sentence summary of the client:
1. what it does
2. who it sells to
3. value proposition
4. strategy]
(To output: false)
```

#### Rules
```
Here are a few rules and recommendations you should follow:
- First and foremost, don't be boring. Be engaging. Make them want to read what you write. Sound like a real person using natural, everyday language. A good phrase to remember is: write like you talk.
- Do not follow sales or marketing patterns, use common clichés, or rely on vague statements such as, "I noticed you [did something]." Instead, write like an excited teammate telling you about a cool new idea.
- Use simple language, roughly at a seventh-grade reading level.
- Bring genuine new ideas, rather than simply summarizing what already exists.
- Never mention variables directly. This should feel like a one-on-one email, not a personalized template.
- Do not assume anything about the recipient or our company beyond what's already stated in the company context. Also, do not try to establish forced connections, such as, "We went to the same school."
(To output: false)
```

#### Email Sequence
```
[Start with the sentences below, Only keep the subject line and body, and copy-paste the email sequence:
"Here's the email template you will personalize. Don't write or try to improve this email template. This is for your information and context only. Make sure your AI output fit well in this sequence."]

[Paste actual email template here]

(To output: false)
```

---

## JSON Structure (prompts.json)

The `prompts.json` file is a JSON array of prompt objects:

```json
[
  {
    "prompt_name": "string",
    "prompt_location": "string",
    "email_number": number | null,
    "prompt": "string"
  }
]
```

### Field Definitions

#### prompt_name (required)
A clear, descriptive name for the variable. Use snake_case.
- Examples: `personalized_subject_line`, `first_line`, `ps_line`, `industry_hook`, `role_pain_point`

#### prompt_location (required)
Where the variable appears in the email. Use one of:
- `subject_line` - The email subject
- `first_line` - The opening line after greeting
- `body` - Within the main email body
- `ps_line` - The P.S. section
- `signature` - Within the signature block

#### email_number (required)
Which email in the sequence this prompt applies to:
- Use `1`, `2`, `3`, etc. for specific emails
- Use `null` if the same prompt applies to all emails

#### prompt (required)
The actual prompt instructions for generating this variable.

---

## Writing Effective Prompts

Every prompt should contain these elements:

### 1. Clear Output Instruction
Start with exactly what to generate:
- "Write a subject line that..."
- "Generate a 1-sentence opening that..."
- "Create a PS line starting with 'PS' that..."

### 2. Specific Data Sources
Tell the AI exactly where to look:
- "From their LinkedIn profile, find..."
- "Based on their company website..."
- "Using their job title from LinkedIn..."

### 3. Tone and Style Guidance
Define how it should sound:
- "Keep it conversational and curious"
- "Professional but friendly"
- "Smart, concise, and straightforward"

### 4. Length Constraints
Be explicit about limits:
- "Under 6 words"
- "Maximum 20 words"
- "1-2 sentences only"

### 5. What to Avoid
Prevent common mistakes:
- "Avoid emojis and exclamation marks"
- "Don't summarize their profile"
- "No generic compliments"
- "Don't sound robotic or salesy"

### 6. Fallback Instructions
Handle missing data gracefully:
- "If industry isn't clear, reference their company size instead"
- "If no specific detail stands out, focus on their role"

---

## User Prompt Templates (To output: true)

### Subject Line
```
Write a very short subject line that grabs attention and sparks curiosity in fewer than 6 words, ideally 3-4.
Make it relevant to a challenge, wish, hobby, or activity. Do not add emojis or punctuation. Use lowercase except for the first letter, and capitalize the first letter of company and person names.
Focus on a single, specific small detail from your research; it can be personal. The goal is to intrigue the prospect quickly and make them curious about the email's contents in just 3-4 words.
(To output: true)
```

### First Line
```
Write the first line of the email. Refer to the template above to see where it fits in the initial message. Don't write any greeting.
The goal is to hook their attention, make the line very personalized, and lead smoothly into the rest of the email. Keep this line short, under 20 words.
It should spark curiosity, be intriguing and simple, and avoid gimmicks. Do not sound robotic. Most important: do not be boring.
Avoid emojis, exclamation marks, and questions. Don't just summarize information about them.
Aim for a pleasant, genuine tone that reflects the company: smart, concise, personalized, and straightforward, using simple language.
(To output: true)
```

### PS Line
```
Write a PS line for this email that starts with "PS" and continues. Keep it short: one or two sentences. The goal is to be human and to reflect your personality as a creator. This line should be casual and personal - an opportunity to add more humanity to your outreach.
Make the PS about them, not about you. Include a very small personal detail that few people notice - something hidden on their website or LinkedIn profile. Don't try too hard or make broad assumptions; if you do assume something, mention that you're assuming. Humor is good but subtle - if you see something funny in their profile, you can laugh at it or lightly develop the joke.
This is also a chance to share a small, catchy idea for them. Keep it genuine and brief. Do not invent connections, invite them to anything, or offer help you can't back up. Avoid generic compliments; instead, make them feel noticed and special.
(To output: true)
```

---

## Creative Variable Examples (JSON)

### Industry Context Hook
```json
{
  "prompt_name": "industry_context",
  "prompt_location": "body",
  "email_number": 1,
  "prompt": "Based on the company's industry from their LinkedIn company page and website, create a 1-sentence industry-specific observation that connects their industry to a relevant challenge. Reference challenges or opportunities common in their specific industry based on what their company does. Use their actual industry and what you can infer from their website about their market. Keep it conversational and insightful, not generic."
}
```

### Role-Based Pain Point
```json
{
  "prompt_name": "role_pain_point",
  "prompt_location": "body",
  "email_number": 2,
  "prompt": "Based on the prospect's job title from LinkedIn, reference a pain point or goal specific to that role. For VPs/Directors: scaling challenges, team efficiency. For C-suite: strategic initiatives, competitive positioning. For individual contributors: day-to-day workflow pain. Make it specific to their actual title. 1 sentence maximum. The pain point should feel like something only someone in their role would truly understand."
}
```

### Company Stage Context
```json
{
  "prompt_name": "company_stage_context",
  "prompt_location": "body",
  "email_number": 3,
  "prompt": "Based on company LinkedIn data (employee count), create a context-specific reference. For small companies (1-50): growth and scaling challenges. For large companies (500+): complexity and integration needs. For mid-market (50-500): resource constraints and agility balance. 1 sentence. Make it feel like you understand the unique challenges of companies at their stage."
}
```

---

## Complete Example Output

For a 3-email sequence with subject line, first line, and PS line variables:

```json
[
  {
    "prompt_name": "personalized_subject_line",
    "prompt_location": "subject_line",
    "email_number": null,
    "prompt": "Write a 3-5 word subject line that references something specific from their company website or LinkedIn profile. Use lowercase except for names. No emojis or punctuation. Focus on a small detail that shows you did research - could be their product, a recent company update, or their role. Goal: spark curiosity in under 6 words."
  },
  {
    "prompt_name": "personalized_first_line",
    "prompt_location": "first_line",
    "email_number": 1,
    "prompt": "Write a personalized opening line (no greeting) that hooks attention by referencing something specific from their LinkedIn profile or company website. Under 20 words. Should spark curiosity and lead into the email naturally. Avoid questions, emojis, exclamation marks. Don't summarize their profile - find an insight or angle that shows genuine interest."
  },
  {
    "prompt_name": "industry_insight",
    "prompt_location": "body",
    "email_number": 1,
    "prompt": "Based on their industry (from LinkedIn company page), write 1 sentence connecting a common challenge in their space to the value proposition. Make it specific to their industry, not generic. Should feel like an observation from someone who understands their market."
  },
  {
    "prompt_name": "ps_line_email1",
    "prompt_location": "ps_line",
    "email_number": 1,
    "prompt": "Write a PS line starting with 'PS'. 1-2 sentences max. Reference a small, specific detail from their LinkedIn or website that most people wouldn't notice. Be casual and human. Can include subtle humor if appropriate. Goal: make them feel noticed without being creepy or generic."
  },
  {
    "prompt_name": "follow_up_hook",
    "prompt_location": "first_line",
    "email_number": 2,
    "prompt": "Write a brief follow-up hook that references the previous email's topic while adding a new angle. Could reference their role-specific challenges based on their LinkedIn title. Under 15 words. Conversational tone - like checking back in with a colleague."
  },
  {
    "prompt_name": "breakup_personalization",
    "prompt_location": "first_line",
    "email_number": 3,
    "prompt": "Write a brief, respectful final follow-up opener. Acknowledge this is the last email in a non-pushy way. Can reference something specific from their company to show continued interest. Under 15 words. Tone: professional, not desperate or guilt-tripping."
  }
]
```

---

## Alignment with Campaign Strategy

When consuming a Campaign Strategy document:

1. **Match prompt_name to the strategy's AI variables** - Use the same names defined in the strategy
2. **Follow prompt_location from the strategy** - Place variables exactly where specified
3. **Expand prompt_description into full prompts** - The strategy provides high-level instructions; you write the detailed prompt
4. **Respect email_number** - Variables may apply to specific emails or all emails

---

## Common Prompt Mistakes

**Too Vague:**
- Bad: "Write something personalized"
- Good: "Write a 1-sentence hook referencing their main product from their website"

**Impossible Data Sources:**
- Bad: "Reference their recent funding round" (not always available)
- Good: "Reference their company size from LinkedIn" (always available)

**Missing Constraints:**
- Bad: "Write a subject line"
- Good: "Write a 3-5 word subject line, lowercase except names, no emojis"

**No Fallback:**
- Bad: "Reference their latest blog post" (might not exist)
- Good: "Reference something from their website; if nothing stands out, use their company tagline"

---

## Testing Your Prompts

Before finalizing:

1. **Run the prompt mentally** - Can you generate good output from the data sources specified?
2. **Check data availability** - Does the prompt only reference accessible data?
3. **Verify placement** - Does the variable fit naturally where it's inserted?
4. **Test edge cases** - What happens if certain data isn't available?
