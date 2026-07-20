# AI Personalization Variables Guide

Create prompts that generate custom content for each prospect using their website and LinkedIn data.

## JSON Structure

```json
[
  {
    "prompt_name": "descriptive_name",
    "prompt_location": "where it goes in email(s)",
    "prompt_description": "detailed instructions for generating this variable"
  }
]
```

## Data Sources (ONLY these available)

**LinkedIn Individual Profile:**
- Job title
- Current company
- Location
- Previous roles/companies
- Education/schools
- Skills listed
- Profile summary/headline

**LinkedIn Company Page:**
- Industry
- Company size (headcount)
- Headquarters location
- Company description

**Company Website (main page):**
- Products/services offered
- Target customers/market
- Value proposition
- Company description

**NOT available:**
- News articles
- Funding announcements
- Recent events or triggers
- Social media posts
- Blog content
- Tech stack
- Growth signals
- Any time-sensitive information

## Standard Variable Types

### Subject Line
```json
{
  "prompt_name": "personalized_subject_line",
  "prompt_location": "subject_line",
  "prompt_description": "Write a very short subject line (3-4 words, max 6). Focus on a single specific detail from their profile or company - their role, industry, product they sell, or market they serve. Make it intriguing without being clickbait. No emojis or ending punctuation. Lowercase except first letter and proper nouns."
}
```

### First Line
```json
{
  "prompt_name": "personalized_first_line",
  "prompt_location": "first_line",
  "prompt_description": "Write the opening line (no greeting). Hook attention with a personalized observation about their role, company, or industry that leads into the email body. Under 20 words. No questions or emojis. Show insight about their situation based on what their company does or who they serve."
}
```

### PS Line
```json
{
  "prompt_name": "ps_line",
  "prompt_location": "last_line_email_1",
  "prompt_description": "Write a PS line starting with 'PS'. Keep short (1-2 sentences). Be human and casual. Reference a specific detail from their profile - their background, school, location, or something unique about their company. Don't invent connections or offer things you can't deliver."
}
```

## Additional Variable Types

### Role-Specific Pain
```json
{
  "prompt_name": "role_pain_point",
  "prompt_location": "email_2_hook",
  "prompt_description": "Based on job title from LinkedIn, reference a pain point typical to that role. VPs/Directors: scaling, team efficiency, cross-functional alignment. C-suite: strategy, competitive positioning, board concerns. Managers: execution, reporting, resource constraints. Make it specific to their actual title. 1 sentence."
}
```

### Product/Service Reference
```json
{
  "prompt_name": "product_hook",
  "prompt_location": "email_1_body",
  "prompt_description": "From company website, identify their main product or service. Reference it specifically to show you understand their business. Example: 'Helping [their target market] with [their product/service] means [relevant challenge].' Use exact product names or service descriptions from their website."
}
```

### Target Market Mention
```json
{
  "prompt_name": "target_market_ref",
  "prompt_location": "email_2_body",
  "prompt_description": "From website's description of their customers or market, create a reference showing you understand who they serve. Example: 'Selling to [their customer type], you probably deal with [relevant challenge].' Use their actual target market from website. 1 sentence."
}
```

### Industry Context
```json
{
  "prompt_name": "industry_context",
  "prompt_location": "email_1_body",
  "prompt_description": "Based on company industry from LinkedIn, reference a common challenge or priority in that industry. Not news or events - general industry dynamics. Example for healthcare: 'In healthcare, compliance and patient data security are always top of mind.' Keep evergreen, not time-sensitive."
}
```

### Company Size Context
```json
{
  "prompt_name": "company_size_ref",
  "prompt_location": "email_body",
  "prompt_description": "Based on LinkedIn company headcount, reference challenges typical to that size. 10-50: wearing multiple hats, limited resources. 50-200: scaling pains, process gaps. 200-1000: coordination complexity, tool sprawl. 1000+: enterprise complexity, change management. 1 sentence that shows you understand their scale."
}
```

### Background Reference
```json
{
  "prompt_name": "background_hook",
  "prompt_location": "ps_line or first_line",
  "prompt_description": "From LinkedIn profile, reference their professional background - previous company, role transition, education, or career path. Example: 'Coming from [previous company/industry], you probably have a different perspective on...' Only use if genuinely relevant. Keep natural."
}
```

## Prompt Description Requirements

Every description must specify:

1. **What to generate** - "Create a subject line that...", "Generate a 1-sentence reference..."
2. **Data source** - "From LinkedIn profile...", "Based on company website..."
3. **Tone/style** - "Conversational", "Professional but friendly"
4. **Constraints** - "Under 50 characters", "1 sentence", "No questions"
5. **Fallback** - "If [data] not available, skip this variable"

## Personalization Depth

### Level 1: Minimum
- Subject line
- First line
- {firstName} and {company}

### Level 2: Standard (recommended)
- Level 1 +
- Role-specific reference
- Product/service mention
- PS line for Email 1

### Level 3: Deep
- Level 2 +
- Multiple variables per email
- Target market references
- Background/career references
- Industry context

## Example Output

```json
[
  {
    "prompt_name": "personalized_subject_line",
    "prompt_location": "subject_line",
    "prompt_description": "Write 3-4 word subject line. Reference one specific detail: their job title, the product they sell, their target market, or their industry. Make it feel personal. No punctuation. Lowercase except proper nouns. Examples: 'scaling the sales team', 'enterprise healthcare sales'."
  },
  {
    "prompt_name": "personalized_first_line",
    "prompt_location": "first_line",
    "prompt_description": "Write opening line connecting their role to the pain point we address. Use their job title and what their company does. Under 15 words. No greeting. Example: 'Running sales at a [company type] means [relevant challenge] is probably constant.'"
  },
  {
    "prompt_name": "product_context",
    "prompt_location": "email_1_body",
    "prompt_description": "From company website, identify what they sell and to whom. Write 1 sentence showing you understand their business model. Example: 'Selling [product type] to [customer type] usually means [relevant operational challenge].' Use their actual product/market language."
  },
  {
    "prompt_name": "role_challenge",
    "prompt_location": "email_2_hook",
    "prompt_description": "Based on their LinkedIn title, reference a challenge typical for that role. Be specific to seniority level. Directors: cross-team coordination, resource allocation. VPs: strategic initiatives, executive reporting. Keep to 1 sentence."
  },
  {
    "prompt_name": "ps_personal_touch",
    "prompt_location": "email_1_last_line",
    "prompt_description": "Write PS referencing a detail from LinkedIn: their location, school, previous company, or years in role. Keep genuine and brief. Example: 'PS - Fellow [city] person here' or 'PS - Saw you came from [previous company] - interesting transition.' Start with 'PS'. 1 sentence max."
  }
]
```
