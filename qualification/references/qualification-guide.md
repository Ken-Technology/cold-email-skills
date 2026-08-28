# Qualification Prompt Guidelines

## Purpose

Write structured qualification variables that a qualification AI (or any LLM-based qualification step) uses to evaluate individual prospects. Three structured fields build the prompt automatically.

## Structured Fields

These structured fields are used for Qualification:

| Field | Required | Purpose |
|-------|----------|---------|
| `audience_description` | Yes | Who the target audience is - short description |
| `disqualification_criteria` | Yes (preferred) | Conditions that DISQUALIFY a prospect |
| `qualification_criteria` | Optional | Conditions that QUALIFY a prospect |

At least 2 of 3 fields must be provided. Strong preference for `audience_description` + `disqualification_criteria` only.

## Key Principles

### Write Short, Trust the AI
- The qualification AI is intelligent - give it a brief and let it reason, don't script every edge case
- A few high-signal lines beat a long rulebook. No exhaustive lists of titles, industries, or product names
- Shorter prompts = more room for the AI's own judgment, which is the point

### Never Repeat Search Filters
- `search-strategy.md` already bounds the list. Whatever dimension it sets - headcount, geography, title, seniority, industry - the prompt says NOTHING about it
- Example: if the filter sets company headcount to 2,000-50,000, do not mention employee count anywhere in the prompt. If the filter sets geography to US/Canada, don't name a country. The list is already that.
- Restating a filter wastes the AI's attention and can fight the filter. Qualification only catches what the filters CAN'T see:
  - B2B vs B2C business model
  - Product vs services/consulting company
  - Active vs defunct/stealth company
  - Competitor exclusion

### Don't Over-Qualify
- Keep criteria loose - we don't want to shrink the list too much
- Qualification is a safety net, not a precision filter
- Better to include marginal prospects than exclude good ones

### Disqualification > Qualification
- Prefer disqualification criteria over qualification criteria
- Only remove prospects with clear, obvious deal-breakers
- Err on the side of qualifying when data is ambiguous

### Data Availability
The qualification AI has access to:
- LinkedIn profile (title, company, location, previous roles, education, skills, summary)
- Company data (industry, headcount, headquarters, description)
- Website metadata (page title and meta description ONLY)

NOT available:
- Full website content, product pages, tech stack
- News articles, press releases, funding data
- Social media activity

## Common Disqualification Criteria

A menu to pick from, not a checklist to include in full. Always include competitor exclusion; add one or two others only if they're a real risk for this audience. Keep each line short.

- **Competitor** (always): "Company provides [client's service/product category]"
- **Business model**: B2C when targeting B2B; agency/consultancy when targeting product companies
- **Company stage**: pre-revenue/stealth, or acquired/merged
- **Role mismatch**: contractors/freelancers or board/advisors when targeting operators

Remember: none of these should restate a search-filter dimension.
