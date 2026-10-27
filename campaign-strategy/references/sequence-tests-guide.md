# Email Sequence A/B Testing Guide

Define micro-level tests within a single campaign to optimize email delivery. These tests complement (not duplicate) the macro-level tests in the campaign plan (`plan.md`).

## What This Guide Covers

**Sequence tests** refine HOW a campaign is executed:
- Subject line format
- Body length and structure
- PS line inclusion
- CTA phrasing
- Timing

**The campaign plan handles** WHAT is tested (don't duplicate):
- ICP testing (different personas)
- Messaging Angle testing (different hooks/pain points)
- Lead Magnet testing (different offers)

**Every test is judged on** reply rate, positive (interested) reply rate or click rate. Count replies as distinct contacts and leave out out-of-office. Opens are never reported or used as a goal or a primary metric.

## Testable Variables

### Subject Line Tests

| Test | Variant A | Variant B | When to Use |
|------|-----------|-----------|-------------|
| Personalization | AI-generated `{{Subject Line}}` | Static curiosity hook | When you want to test if a personalized subject earns more replies |
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
- **Primary Metric**: Reply rate
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

## Section Format

The test sits under `### Sequence Tests` in the segment's strategy section, so its parts are `####` headings:

```markdown
### Sequence Tests

#### Test Context
**Plan Test Variable**: [the plan's macro test, e.g. Messaging Angle (guarantee vs ROI)]
**Supporting Hypothesis**: [how this micro-test supports the macro test]

#### Active Test
**Test Name**: [e.g. PS Line Inclusion Test]
**Variable**: [what is being tested]
- **Variant A (Control)**: [the default approach]
- **Variant B (Test)**: [the alternative]
- **Hypothesis**: [why B might outperform A]
- **Primary Metric**: [Reply rate / Positive reply rate / Click rate]
- **Affected Emails**: [e.g. "Email 1 only", "All emails", "Emails 2-3"]

**Implementation for email-copywriting:**
[Clear instructions for writing each variant]
```

### Alignment with the plan's macro test

| Plan tests | Compatible sequence tests | Why compatible |
|------------|---------------------------|----------------|
| Messaging Angle | Subject format, PS line, body length | Same audience, same offer, different delivery |
| ICP | None | Keep execution identical to isolate the ICP |
| Lead Magnet | CTA phrasing, proof placement | Same audience, refines how the offer is delivered |

## Decision Framework

### Before Proposing a Test, Check:

1. **Does the campaign have a plan?**
   - YES: Read its testing hypothesis
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
Plan exists?
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

1. **campaign-strategy** → Defines the test under `### Sequence Tests` in the segment's `strategy.md`
2. **email-copywriting** → Reads that strategy, writes Variant B as a `### Variant B ({desc})` section under the same `## Email N` heading as Variant A in the segment's `emails.md`
3. **AI variables** → Usually unchanged (test copy delivery, not AI prompts)
4. **Search filters** (`search-strategy.md`) → Always unchanged (same audience for both variants)

### Before sending vs while sending

Variants are A/B arms: every variant sends to its share of the segment. Plan a test before the first send. Once the sequence is sending, a structural copy change replaces the steps in the sending tool, never a new Variant B; add a variant then only when the user asks for a new A/B test. Any sequence change on a client's sending campaign needs a yes that names that client.

### What Stays Constant Across Variants

- ICP targeting (the search filters)
- AI personalization variables (their definitions)
- Messaging angle (the strategy file's core positioning)
- Offer/Lead magnet (the strategy file's funnel type)

### What Can Vary

- Email copy (the variant sections in `emails.md`)
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
2. **Check the replies first** - read their classification (interested replies filed wrong skew the result) and check bounces (a variant whose sends bounced did not get a fair test)
3. **Compare primary metric** between variants
4. **Check for statistical significance** (at least 10% relative difference)
5. **Document learnings** in `improvement-log.md` in the campaign folder
6. **Apply winner** to future campaigns (or run follow-up test)

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
