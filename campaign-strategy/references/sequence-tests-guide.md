# Email Sequence A/B Testing Guide

Define micro-level tests within a single campaign to optimize email delivery. These tests complement (not duplicate) macro-level tests from campaign-planning.

## What This Guide Covers

**Sequence tests** refine HOW a campaign is executed:
- Subject line format
- Body length and structure
- PS line inclusion
- CTA phrasing
- Timing

**Campaign-planning handles** WHAT is tested (don't duplicate):
- ICP testing (different personas)
- Messaging Angle testing (different hooks/pain points)
- Lead Magnet testing (different offers)

## Testable Variables

### Subject Line Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Personalization | AI-generated `{{Subject Line}}` | Static curiosity hook | When you want to test if personalization helps opens |
| Length | Short (3-4 words): "Quick q" | Medium (6-8 words): "Quick question about {company}" | When testing clarity vs intrigue |
| Format | Question: "Struggling with X?" | Statement: "Most CTOs miss this" | When testing engagement style |
| Specificity | Company reference: "{company} growth" | Role reference: "For CTOs scaling teams" | When testing relevance approach |

**Example Test Definition:**
```markdown
**Test Name**: Subject Line Personalization Test
**Variable**: Subject Line
- **Variant A (Control)**: AI-generated personalized subject `{{Subject Line}}`
- **Variant B (Test)**: Static curiosity hook "5,000 emails, zero cost"
- **Hypothesis**: Static hook may outperform because it directly communicates the offer value
- **Primary Metric**: Open rate
- **Affected Emails**: Email 1 only

**Implementation for email-copywriting:**
- Email 1 Variant A: Use `{{Subject Line}}` placeholder
- Email 1 Variant B: Use fixed text "5,000 emails, zero cost"
```

### Opening Hook Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| AI First Line | Include `{{First Line}}` placeholder | Direct value statement (no personalization) | When testing personalization impact on replies |
| Opening Style | Question: "Have you noticed..." | Observation: "Scaling sales at {company}..." | When testing engagement approach |
| Personalization Source | Role-based: "As a VP of Sales..." | Company-based: "Saw {company}'s growth..." | When testing relevance type |

### Body Structure Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Length | Short (3-4 lines, ~50 words) | Medium (5-7 lines, ~100 words) | When testing engagement vs detail |
| Format | Paragraph (flowing prose) | Bullets (scannable list) | When testing readability |
| Single vs Multiple Points | One focused benefit | 2-3 quick benefits | When testing clarity vs breadth |

**Example: Body Length Test**
```markdown
**Test Name**: Email Length Test
**Variable**: Body Structure
- **Variant A (Control)**: Standard 5-7 line body with full context
- **Variant B (Test)**: Concise 3-4 line body, minimal explanation
- **Hypothesis**: Busy executives may respond better to shorter, punchier emails
- **Primary Metric**: Reply rate
- **Affected Emails**: All emails

**Implementation for email-copywriting:**
- All emails Variant A: Write standard length (~100 words)
- All emails Variant B: Cut to essentials (~50 words)
```

### PS Line Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Inclusion | Include AI-generated `{{PS Line}}` | No PS line | When testing if personalization adds or detracts |
| Content Type | Personal (location/school reference) | Professional (role observation) | When testing connection type |
| Placement | Email 1 only | Multiple emails | When testing sequence engagement |

**Example: PS Line Inclusion Test**
```markdown
**Test Name**: PS Line Inclusion Test
**Variable**: PS Line
- **Variant A (Control)**: Include AI-personalized PS line after signature
- **Variant B (Test)**: No PS line - end email at CTA
- **Hypothesis**: The guarantee message is already strong; PS may dilute focus
- **Primary Metric**: Reply rate
- **Affected Emails**: Email 1 and Email 4 (the emails that currently use {{PS Line}})

**Implementation for email-copywriting:**
- Email 1: Write two versions - one with {{PS Line}}, one without
- Email 4: Write two versions - one with {{PS Line Final}}, one without
- Emails 2-3: No variants needed
```

### CTA Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Commitment Level | Low: "Curious if relevant?" | Direct: "Worth 15 minutes?" | When testing response friction |
| Format | Question: "Interested in learning more?" | Statement: "Let me know if this helps." | When testing engagement style |
| Specificity | Open: "Thoughts?" | Specific: "Can we chat Tuesday?" | When testing urgency |

### Tone Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Formality | Casual: "Hey", conversational | Professional: "Hi", polished | When targeting mixed audiences |
| Confidence | Humble: "We might be able to help..." | Assertive: "We've helped 30 companies..." | When testing credibility approach |
| Personality | Matter-of-fact: Standard copy | Playful: Humor, creative elements | When testing memorability |

### Timing Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Delay Pattern | Short: 2-2-3 days between emails | Long: 3-4-5 days between emails | When testing response timing |
| Sequence Length | 4 emails | 5 emails | When testing persistence vs fatigue |

**Note:** Timing tests affect the entire sequence structure and are less common. Only test when you have clear hypothesis about timing impact.

## Decision Framework

### Before Proposing a Test, Check:

1. **Does plan.md exist?**
   - YES: Read Testing Strategy section
   - NO: Skip tests (establish baseline first)

2. **What is the plan's macro test variable?**
   - ICP test → Skip sequence tests (keep execution identical)
   - Messaging Angle test → Sequence tests OK (refine delivery)
   - Lead Magnet test → Sequence tests OK (refine offer delivery)

3. **Is this the client's first campaign?**
   - YES: Skip tests (establish baseline)
   - NO: Consider tests if hypothesis exists

4. **What is the expected TAM?**
   - < 2,000: Skip tests (not enough volume)
   - 2,000-5,000: One simple test max
   - 5,000+: One test recommended if hypothesis exists

5. **Do you have a clear hypothesis?**
   - YES with reasoning: Propose test
   - NO / "let's just try something": Skip (testing for testing's sake)

### Flowchart

```
plan.md exists?
  ├── NO → Skip tests (first campaign needs baseline)
  └── YES → What macro variable?
              ├── ICP → Skip tests (isolate ICP performance)
              └── Angle/Magnet → TAM check?
                                  ├── < 2,000 → Skip tests
                                  └── 2,000+ → Clear hypothesis?
                                                ├── NO → Skip tests
                                                └── YES → Propose 1 test
```

## Integration with Downstream Skills

### How Tests Flow Through the System

1. **campaign-strategy** → Defines test in `## Sequence Tests` section of strategy.md
2. **email-copywriting** → Reads strategy.md, writes variant emails in emails.md
3. **prompts.md** → Usually unchanged (test copy delivery, not AI prompts)
4. **search-strategy.md** → Always unchanged (same audience for both variants)

### What Stays Constant Across Variants

- ICP targeting (search-strategy.md)
- AI personalization variables (prompts.md definitions)
- Messaging angle (strategy.md core positioning)
- Offer/Lead magnet (strategy.md funnel type)

### What Can Vary

- Email copy (emails.md variant sections)
- Subject line format
- Body structure/length
- PS line inclusion
- CTA phrasing

## Common Test Scenarios

### Scenario 1: Guarantee Campaign

**Plan macro test**: Messaging Angle (guarantee vs ROI)
**Compatible sequence test**: PS Line Inclusion

Why: Testing whether personal PS lines add or detract from the focused guarantee message.

### Scenario 2: Case Study Campaign

**Plan macro test**: Messaging Angle (case study vs ROI)
**Compatible sequence test**: Proof Placement

Why: Testing whether leading with the case study (Email 1) or building to it (Email 3) drives more engagement.

### Scenario 3: Lead Magnet Campaign

**Plan macro test**: Lead Magnet (PDF vs Demo)
**Compatible sequence test**: CTA Phrasing

Why: Testing whether low-commitment ("Curious?") or direct ("Worth 15 min?") CTAs drive more downloads/bookings.

## Anti-Patterns (What NOT to Do)

### Testing That Conflicts with Macro Test

**BAD:** Plan tests Messaging Angle, sequence test changes the angle
- Plan: "Testing guarantee vs ROI messaging"
- Sequence test: "Test playful vs professional tone" (changes the message feel)

### Testing Multiple Variables

**BAD:** Test changes more than one thing
- Variant A: Short body, with PS line, casual tone
- Variant B: Long body, no PS line, professional tone (which caused the difference?)

### Testing Without Hypothesis

**BAD:** "Let's just test different subject lines to see what happens"
- No expected outcome
- No reasoning for why one might outperform
- Testing for testing's sake

### Testing with Low TAM

**BAD:** Campaign targets 1,500 contacts, split 50/50 = 750 per variant
- Not enough volume for meaningful results
- Noise will overwhelm signal

## Evaluation Guidelines

After running the test:

1. **Wait for sufficient volume** (minimum 500 sends per variant)
2. **Compare primary metric** between variants
3. **Check for statistical significance** (at least 10% relative difference)
4. **Document learnings** in improvement-log.md
5. **Apply winner** to future campaigns (or run follow-up test)

### Success Criteria Template

```markdown
**Test Results: [Test Name]**
- Variant A: [metric value]
- Variant B: [metric value]
- Difference: [+/-X%]
- Winner: [A/B/Inconclusive]
- Sample size: [sends per variant]
- Learning: [What we now know]
- Next action: [Apply winner / Run follow-up / Need more data]
```
