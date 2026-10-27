# Review Layout (conversation)

Use this layout when you show a review to a person. When a caller asks for a different output shape, follow the caller.

```markdown
## Email Review

### Overall Score: [1-5, decimals allowed, e.g. 4.5]

### Lint Contract
[Per email: pass, or each failing rule (variables, spintax, em-dash, subject length, body word count, link count, placeholders, unsourced events)]

### Critical Copy Rules Violations
[Every HARD / REJECT / FLAG finding from the checklist, or "None found"]

### First Lines
- Static openers: [per email: pass, or the failing check (fact, first person, praise, hedging, length) as a failure-to-fix pair]
- Samples: [N of M passed; each failing sample as failure -> fix, for prompt-writer]
- Bridge: [any email whose first static sentence does not follow from the opener, or whose opener gives the offer no reason to exist]

### Email-by-Email Feedback

**Email 1: [Title]**
- Score: [1-5]
- Static words: [count] (band 50-80)
- Issues: [specific problems]
- Suggestions: [specific improvements with before/after]

**Email 2: [Title]**
- Static words: [count] (band 30-60)
...

### Client-Specific Notes Applied
[Client notes that shaped the review]

### Quality Exercise Results
- "So what?" failures: [lines that could not be justified]
- Tightening opportunities: [lines that can lose words]
- Awkward phrasing: [from the read-aloud test]
- Length and brevity: [any email outside its band or that fails the "30% shorter?" pass, with the tighter rewrite]
- Spam-word budget: [per email: each spam word as `word (tier)`, or "clean"]
- One-breath test: [the offer sentence found in Email 1, or REJECT + compressed rewrite]
- One-on-one favor check: [per email: list test and favor test; any brochure framing or sender-heavy sentences]
- AI-tell scan: [lexicon words, dead phrases, or structures found, per email]
- Voice Card match: [card present? copy in the ICP's language? any outsider phrases?]
- Greeting check: [any follow-up missing a greeting]
- Merge fields: [lead variables valid; every AI variable has a personalization prompt, or the ones missing]
- Links: [link count per email; no tracking tokens, no bare URLs]

### Priority Improvements
1. [Most important fix]
2. [Second]
3. [Third]
```

On a fail, end with:

```text
Email review score: [X]/5 - below 4.5 or a HARD/REJECT rule failed.
emails_v2.md NOT written. Email copy needs revision.

Revision instructions for email-copywriting:
[Specific, actionable fixes organized by email]

First-line prompt fixes for prompt-writer (if any):
[Each failing sample as failure -> fix]
```

On a pass, end with:

```text
Email review passed with score [X]. emails_v2.md written to [segment folder].
```
