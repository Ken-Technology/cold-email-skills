# Lead Variables Reference

Lead variables are auto-resolved from contact data when emails are sent. Use them directly in email copy.

## Variable Syntax

| Type | Syntax | Example | Source |
|------|--------|---------|--------|
| Lead variable | `{variableName}` (single braces, camelCase) | `{firstName}`, `{company}` | Contact data |
| System variable | `{snake_case}` (single braces) | `{sender_signature}` | Sending inbox / sequencer |
| AI variable | `{{Variable Name}}` (double braces, Title Case) | `{{First Line}}`, `{{PS Line}}` | AI personalization prompts |
| Tracking link | `{{tracking_link:ID}}` | `{{tracking_link:116}}` | Redirect links (tool-side; do not author) |

## System Variables

System (sender) variables resolve to the **sending mailbox**, not the contact. Many sequencers rotate
inboxes at send time, so these are filled per-sender at launch. Single braces, snake_case (canonical).
Legacy double-brace `{{sender_*}}` tokens are sometimes still accepted by sending tools, but don't author with them.

| Variable | Syntax | Description |
|----------|--------|-------------|
| sender_signature | `{sender_signature}` | Injects the sending inbox's configured signature block. **Use it on every email in place of a hand-written sign-off** (closer + name + title). Passes through verbatim - no prompt, not cross-referenced. |
| sender_first_name | `{sender_first_name}` | The sending mailbox's first name. Use when you want to reference the sender by name in the body (e.g. an intro or sign-off line) without hardcoding it. |
| sender_last_name | `{sender_last_name}` | The sending mailbox's last name. Rarely needed on its own - `{sender_signature}` already carries the full sign-off. |

## Common Mistakes

| Wrong | Correct | Why |
|-------|---------|-----|
| `{first_name}` | `{firstName}` | Lead variables use camelCase, not snake_case |
| `{company_name}` | `{company}` | The variable is called "company", not "company_name" |
| `{website_url}` | `{companyDomain}` | Use the actual variable name |
| `{name}` | `{firstName}` or `{fullName}` | Be specific |
| `{{firstName}}` | `{firstName}` | Lead variables use single braces, not double |

## All Lead Variables

### Contact Variables

| Variable | Syntax | Description |
|----------|--------|-------------|
| firstName | `{firstName}` | Contact's first name |
| lastName | `{lastName}` | Contact's last name |
| fullName | `{fullName}` | Contact's full name |
| company | `{company}` | Contact's company name |
| companyDomain | `{companyDomain}` | Contact's company domain |
| title | `{title}` | Contact's job title |
| location | `{location}` | Contact's location |
| headline | `{headline}` | Contact's LinkedIn headline |
| industry | `{industry}` | Contact's company industry |
| linkedInUrl | `{linkedInUrl}` | Contact's LinkedIn profile URL |
| email | `{email}` | Contact's safe email address |
| summary | `{summary}` | Contact's summary/bio |
| profileUrl | `{profileUrl}` | Contact's profile URL |
| lastJobTitle | `{lastJobTitle}` | Contact's previous job title |
| lastJobDescription | `{lastJobDescription}` | Contact's previous job description |
| employmentType | `{employmentType}` | Contact's employment type |
| employmentLocation | `{employmentLocation}` | Contact's employment location |
| skills | `{skills}` | Contact's skills |
| education | `{education}` | Contact's education |

### Company Variables

| Variable | Syntax | Description |
|----------|--------|-------------|
| companyLinkedInUrl | `{companyLinkedInUrl}` | Company LinkedIn URL |
| companyEmployeeCount | `{companyEmployeeCount}` | Company employee count |
| companySpecialities | `{companySpecialities}` | Company specialities |
| companyLocation | `{companyLocation}` | Company headquarters location |
| companyDescription | `{companyDescription}` | Company description |
| companyCrunchbaseUrl | `{companyCrunchbaseUrl}` | Company Crunchbase URL |
| companyEmployeeCountRange | `{companyEmployeeCountRange}` | Company employee count range |
| companyTechnologies | `{companyTechnologies}` | Company technologies |

## Most Commonly Used

In email copy, you'll typically use these lead variables:

- `{firstName}` - In greetings: "Hey {firstName},"
- `{company}` - Company references: "I noticed {company} is..."
- `{title}` - Role references: "As a {title}, you probably..."
- `{lastName}` - Formal greetings: "Hi {firstName} {lastName},"
- `{industry}` - Industry references: "In the {industry} space..."

## Compatibility Notes

- `{company}` is the correct lead variable in copy. `{company_name}` is legacy/incorrect for authoring - it does not resolve to any contact field.
- Sending tools map lead variables to their native formats at launch time. Authors should only write the camelCase syntax shown above.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `{company_name}` in copy | Replace with `{company}` |
| `{first_name}` in copy | Replace with `{firstName}` |
| `{job_title}` in copy | Replace with `{title}` |
| `{linkedin_url}` in copy | Replace with `{linkedInUrl}` |
| `{{tracking_link:ID}}` in local copy | This is a skill/process bug, not authoring syntax. Local copy should contain raw URLs or markdown links only. Remove and replace with the actual URL. |
