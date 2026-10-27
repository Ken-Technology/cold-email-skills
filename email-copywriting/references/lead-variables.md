# Lead Variables Reference

Lead variables are filled from contact data when emails are sent. Use them directly in email copy. The copy lint (**email-copywriting**'s lint contract) accepts these 38 names and nothing else in single braces:

`firstName, lastName, fullName, name, company, companyName, companyDomain, title, role, location, city, state, country, headline, industry, linkedInUrl, linkedinUrl, profileUrl, website, email, summary, lastJobTitle, lastJobDescription, employmentType, employmentLocation, skills, education, companyLinkedInUrl, companyEmployeeCount, companyEmployeeCountRange, companySpecialities, companyLocation, companyDescription, companyCrunchbaseUrl, companyTechnologies, sender_signature, sender_first_name, sender_last_name`

This file says what each one is and which ones are safe to use.

## Variable Syntax

| Type | Syntax | Example | Source |
|------|--------|---------|--------|
| Lead variable | `{variableName}` (single braces, camelCase), optional fallback after a bar (Fallbacks below) | `{firstName}`, `{company}` | Contact data |
| Sender variable | `{sender_snake_case}` (single braces) | `{sender_signature}`, `{sender_first_name}` | Sending inbox |
| AI variable | `{{Variable Name}}` (double braces, Title Case, max 30 characters) | `{{First Line}}`, `{{PS Line}}` | AI personalization prompts |
| Tracking link | never written in copy; the sending tool adds click tracking to real URLs | - | Sending tool |

## Safe to use in copy

These fill reliably at send time. Stick to them:

| Variable | Syntax | Description |
|----------|--------|-------------|
| firstName | `{firstName}` | Contact's first name - greetings: "Hey {firstName}," |
| lastName | `{lastName}` | Contact's last name |
| company | `{company}` | Contact's company name in the short form a person would write (trademark signs, taglines and tails like "Technologies" removed): "how {company} handles..." |
| companyDomain | `{companyDomain}` | Contact's company domain |
| title | `{title}` | Contact's job title (use sparingly; mirroring a title back reads like a template) |

`{linkedInUrl}`, `{profileUrl}`, `{email}` and `{companyTechnologies}` also fill, but rarely belong in a cold email.

## Fallbacks

- A safe lead variable may carry a short plain fallback after `|`: `{firstName|there}`, `{company|your team}`. The fallback renders when the contact has no value. Write the exact name with no spaces inside the braces (`{ firstName | there }` renders as literal text), one fallback, never empty, and no `|`, `{` or `}` inside it.
- Sender variables take no fallback: never write `{sender_first_name|...}`.
- A fallback is not spintax. Sending tools read `{a|b}` as a lead variable `a` with fallback `b`, so any `{option a|option b}` breaks.

## Accepted by the lint, but never use

The lint accepts all 38 names, but most of them are not safe in a sent email.

**Never use:** detail fields most lists do not carry, and legacy aliases sending tools do not map. A sequence that uses any of these sends broken merges.
- `{lastJobTitle}`, `{lastJobDescription}`, `{employmentType}`, `{employmentLocation}`, `{skills}`, `{education}`
- `{companyEmployeeCount}`, `{companySpecialities}`, `{companyCrunchbaseUrl}`
- the legacy aliases `{name}`, `{companyName}`, `{role}`, `{website}`, `{city}`, `{state}`, `{country}`

**Often empty:** they fill from the contact record at send, and most contacts lack the field, so the merge comes out blank and leaves a broken sentence. **email-review** flags them as rendering blank.
- `{fullName}`, `{location}`, `{headline}`, `{industry}`, `{summary}`
- `{companyLinkedInUrl}`, `{companyLocation}`, `{companyDescription}`, `{companyEmployeeCountRange}`

Put that kind of detail into an AI-variable prompt instead (**prompt-writer**), which reads the profile and company data and can skip a lead that lacks it.

| Alias | Use instead |
|-------|-------------|
| `{name}` | `{firstName}` |
| `{companyName}` | `{company}` |
| `{role}` | `{title}` |
| `{website}` | `{companyDomain}` |
| `{linkedinUrl}` | `{linkedInUrl}` (or leave it out) |
| `{city}`, `{state}`, `{country}` | leave out; put location context in an AI-variable prompt |

## Every lead variable

What each name holds, and whether it is safe to send.

| Variable | Holds | Status |
|----------|-------|--------|
| `{firstName}` | First name | Safe |
| `{lastName}` | Last name | Safe |
| `{fullName}` | Full name | Often empty |
| `{company}` | Company name | Safe |
| `{companyDomain}` | Company domain | Safe |
| `{title}` | Job title | Safe |
| `{location}` | Contact's location | Often empty |
| `{headline}` | LinkedIn headline | Often empty |
| `{industry}` | Company industry | Often empty |
| `{linkedInUrl}` | LinkedIn profile URL | Fills; rarely useful |
| `{profileUrl}` | Profile URL (same as `{linkedInUrl}`) | Fills; rarely useful |
| `{email}` | The contact's verified email address | Fills; rarely useful |
| `{summary}` | Profile summary or bio | Often empty |
| `{lastJobTitle}` | Previous job title | Never use |
| `{lastJobDescription}` | Previous job description | Never use |
| `{employmentType}` | Employment type | Never use |
| `{employmentLocation}` | Employment location | Never use |
| `{skills}` | Skills | Never use |
| `{education}` | Education | Never use |
| `{companyLinkedInUrl}` | Company LinkedIn URL | Often empty |
| `{companyEmployeeCount}` | Company employee count | Never use |
| `{companyEmployeeCountRange}` | Company size range | Often empty |
| `{companySpecialities}` | Company specialities | Never use |
| `{companyLocation}` | Company headquarters | Often empty |
| `{companyDescription}` | Company description | Often empty |
| `{companyCrunchbaseUrl}` | Company Crunchbase URL | Never use |
| `{companyTechnologies}` | Company technologies | Fills; rarely useful |

## Campaign custom variables

Contacts imported from a CSV can carry extra columns as custom variables in the sending tool. The copy lint does not know them. Use one only when the user asks for it and the column is filled for every contact, write it in the same `{camelCase}` form, and give it a fallback.

## Sender Variables

Sender variables resolve to the **sending mailbox**, not the contact. Inboxes rotate at send time, so these are filled per sender. Single braces, snake_case.

| Variable | Syntax | Description |
|----------|--------|-------------|
| sender_signature | `{sender_signature}` | The sending inbox's own signature. Every email ends with it on its own line, after the CTA. Map it to the sending tool's signature tag, or delete the line when the tool appends the inbox signature by itself. |
| sender_first_name | `{sender_first_name}` | The sending mailbox's first name. Used in the two-line signature block. |
| sender_last_name | `{sender_last_name}` | The sending mailbox's last name. Used in the two-line signature block. |

When the sending tool has no signature variable, use the explicit two-line formula instead, never a hard-coded sender name:

```markdown
Best,
{sender_first_name} {sender_last_name} - Founder at [Acme](https://acme.com)
```

**Company name link (DEFAULT in the two-line block):** link the client company name to its root domain homepage, or a deep link when it fits the campaign better. It is the email's one link; in an email whose CTA already carries a link, write the company name plain.

## Common Mistakes

| Wrong | Correct | Why |
|-------|---------|-----|
| `{first_name}` | `{firstName}` | Lead variables use camelCase, not snake_case |
| `{company_name}` | `{company}` | Not a lead variable; fails the lint |
| `{website_url}` | `{companyDomain}` | Use the actual variable name |
| `{job_title}` | `{title}` | Use the actual variable name |
| `{linkedin_url}` | `{linkedInUrl}` | camelCase |
| `{name}` | `{firstName}` | A legacy alias sending tools do not map |
| `{industry}` in a sentence | an AI variable, or leave it out | Often empty: "In the  space" reads broken |
| Lead variable in double braces | `{firstName}` | Lead variables use single braces; double braces are only for AI variables |
| `[Company]`, `[First Name]` | `{company}`, `{firstName}` | Square-bracket stand-ins fail the lint as unresolved placeholders |
| `{{tracking_link:ID}}` or any tracking token | a markdown link on plain words | The sending tool adds click tracking; write the real URL in the link |

## Compatibility Notes

- Sending tools spell merge tags their own way. Authors write only the camelCase syntax above; when the copy moves into the tool, map each tag to the tool's own field in one find-and-replace pass, and check one preview.
- Anything in single braces that is neither on the lint list nor a custom variable the user asked for (`{first_name}`, `{company_name}`) fails the lint.
