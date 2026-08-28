## AI Personalization Prompts Format
_How to structure the prompts.json output file_

### Overview

When writing email copy that includes AI personalization variables, you must output a `prompts.json` file containing the actual prompts that will be used to generate personalized content for each prospect.

This file is **only created when AI variables are specified** - either in a Campaign Strategy document or explicitly requested by the user.

### Important: System vs User Prompts

The AI personalization system uses TWO types of prompts:

**System Prompts (To output: false)** - Context provided once for entire campaign:
- Instructions for the AI task
- Company context (4-sentence summary)
- Rules and guidelines
- Complete email sequence template

**User Prompts (To output: true)** - Generate actual variables in the copy:
- Subject line
- First line
- PS line
- Custom variables (role pain, industry hook, etc.)

When outputting `prompts.json`, separate these two sections clearly. System prompts provide static context; user prompts generate dynamic content.

### JSON Structure

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
- Use `null` if the same prompt applies to all emails (e.g., a universal subject line pattern)

#### prompt (required)
The actual prompt instructions for generating this variable. This is the core content - write it as if instructing an AI to generate the personalized content.

### Writing Effective Prompts

Each prompt should be focused solely on generating that specific variable. Include:

#### 1. What to Generate
What's the actual output?
- "Write a subject line that..."
- "Generate a 1-2 sentence opening that..."
- "Reference a specific pain point by..."

#### 2. Data Sources to Use
Where should the AI look?
- "From their LinkedIn profile..."
- "Based on their company website..."
- "Using their job title..."

#### 3. Tone and Style (for this variable)
How should it sound?
- "Keep it conversational and curious"
- "Professional but friendly"
- "Data-driven and analytical"

#### 4. Constraints
Any limits or rules?
- "Keep under 50 characters"
- "1-2 sentences max"
- "Avoid salesy language"

#### 5. Fallback Strategy
What if data isn't available?
- "If no recent job change, reference their current role instead"
- "If industry isn't clear, use company size instead"

### Data Source Constraints
Prompts can ONLY reference these data sources:
- Company website main page
- LinkedIn company page (industry, size, description)
- LinkedIn individual profile (title, company, tenure, location)

Do NOT reference:
- News articles or press releases
- Social media posts
- Blog content beyond main page
- Funding data (unless on LinkedIn)
- Internal company data
- Trigger events or signals

### System Prompt Template

**Instructions** (To output: false)
```
Hey, your task is to help us write really good personalized emails on behalf of [sender name], who is [position at company]. Your task is to only personalize variables inside our email templates that we send. These are cold prospects who might or might not know about our company. Your goal is to get their attention and keep them reading.
```

**Company Context** (To output: false)
```
[4-sentence summary:
1. what company does
2. who it sells to
3. value proposition
4. strategy]
```

**Rules** (To output: false)
```
- First and foremost, don't be boring. Be engaging. Sound like a real person. Write like you talk.
- Do not follow sales patterns or use clichés like "I noticed you [did something]."
- Use simple language, seventh-grade reading level.
- Bring genuine new ideas, not summaries.
- Never mention variables directly. One-on-one feel, not template.
- Don't assume or force connections.
```

**Email Sequence** (To output: false)
```
Here's the email template you will personalize. Don't write or improve this template. This is context only. Make sure your AI output fits well in this sequence.

[Paste email sequence]
```

---

### User Prompt Templates (To output: true)

#### Subject Line
```
Write a very short subject line that grabs attention and sparks curiosity in fewer than 6 words, ideally 3-4.
Make it relevant to a challenge, wish, hobby, or activity. Do not add emojis or punctuation. Use lowercase except for the first letter, and capitalize the first letter of company and person names.
Focus on a single, specific small detail from your research; it can be personal. The goal is to intrigue the prospect quickly and make them curious about the email's contents in just 3-4 words.
```

#### First Line
```
Write the first line of the email. Refer to the template above to see where it fits in the initial message. Don't write any greeting.
The goal is to hook their attention, make the line very personalized, and lead smoothly into the rest of the email. Keep this line short, under 20 words.
It should spark curiosity, be intriguing and simple, and avoid gimmicks. Do not sound robotic. Most important: do not be boring.
Avoid emojis, exclamation marks, and questions. Don't just summarize information about them.
Aim for a pleasant, genuine tone that reflects the company: smart, concise, personalized, and straightforward, using simple language.
```

#### PS Line
```
Write a PS line for this email that starts with "PS" and continues. Keep it short: one or two sentences. The goal is to be human and to reflect your personality as a creator. This line should be casual and personal - an opportunity to add more humanity to your outreach.
Make the PS about them, not about you. Include a very small personal detail that few people notice - something hidden on their website or LinkedIn profile. Don't try too hard or make broad assumptions; if you do assume something, mention that you're assuming. Humor is good but subtle - if you see something funny in their profile, you can laugh at it or lightly develop the joke.
This is also a chance to share a small, catchy idea for them. Keep it genuine and brief. Do not invent connections, invite them to anything, or offer help you can't back up. Avoid generic compliments; instead, make them feel noticed and special.
```

### Creative Prompt Examples

#### Industry Context Hook
```json
{
  "prompt_name": "industry_context",
  "prompt_location": "body",
  "email_number": 1,
  "prompt": "Based on the company's industry from their LinkedIn company page and website, create a 1-sentence industry-specific observation that connects their industry to a relevant challenge. Reference challenges or opportunities common in their specific industry based on what their company does. Use their actual industry and what you can infer from their website about their market. Keep it conversational and insightful, not generic."
}
```

#### Role-Based Pain Point
```json
{
  "prompt_name": "role_pain_point",
  "prompt_location": "body",
  "email_number": 2,
  "prompt": "Based on the prospect's job title from LinkedIn, reference a pain point or goal specific to that role. For VPs/Directors: scaling challenges, team efficiency. For C-suite: strategic initiatives, competitive positioning. For individual contributors: day-to-day workflow pain. Make it specific to their actual title. 1 sentence maximum. The pain point should feel like something only someone in their role would truly understand."
}
```

#### Company Stage Context
```json
{
  "prompt_name": "company_stage_context",
  "prompt_location": "body",
  "email_number": 3,
  "prompt": "Based on company LinkedIn data (employee count), create a context-specific reference. For small companies (1-50): growth and scaling challenges. For large companies (500+): complexity and integration needs. For mid-market (50-500): resource constraints and agility balance. 1 sentence. Make it feel like you understand the unique challenges of companies at their stage."
}
```

### Complete Example Output

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

### Alignment with Campaign Strategy

When consuming a Campaign Strategy document:

1. **Match prompt_name to the strategy's AI variables** - Use the same names defined in the strategy
2. **Follow prompt_location from the strategy** - Place variables exactly where specified
3. **Expand prompt_description into full prompts** - The strategy provides high-level instructions; you write the detailed prompt
4. **Respect email_number** - Variables may apply to specific emails or all emails

### Quality Checklist

Before outputting prompts.json, verify:

- [ ] Each variable from the Campaign Strategy has a corresponding prompt
- [ ] All prompts specify realistic data sources (website, LinkedIn only)
- [ ] Prompts include clear output format and length constraints
- [ ] Prompts specify what to avoid and fallback behavior
- [ ] prompt_location matches where the variable appears in the email copy
- [ ] email_number accurately reflects which email(s) use this variable
