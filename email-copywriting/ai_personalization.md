## AI Personalization
_How to use AI in your copy_
### Beyond Basic Personalization
AI is powerful for more than just subject lines, first lines, and PS lines. Be creative with how you use AI based on available data.

**Available Data Points:**
*   Website data (main page only)
*   LinkedIn data
    *   Profile (title, company, tenure, location, previous roles)
    *   Company page (industry, size, description, employee count)
    *   Recommendations (if visible)
    *   Posts & Articles (if accessible)

**Key Question to Ask Yourself**
> "If I were to manually write an email to someone and only had access to the data that the AI has (LinkedIn and website), what would I write?"

---

## Prompt Engineering
### System Context is Already Included
The AI that generates personalization variables already has system prompts with full context. You only need to write the specific instructions for each variable.

**The AI already has context about:**
1. Rules (what to do and not do)
2. Who the client is (company details)
3. Sender context (e.g., CEO of company)
4. Email sequence context (where AI variables fit)
5. Case studies (if relevant)

**What you write:** Only the personalization variable instructions - the specific prompt for generating that variable's content. Do NOT include company context, email sequence details, or general rules in your prompts.

### Variable Creation
**Default Variables:**
*   First Line
*   PS Line
*   Subject Line

**Custom Variables (Creative Options):**
*   Case study comparisons
*   Industry-specific references
*   Role-based pain points
*   Company stage/size context
*   Product/service-specific hooks
*   Target market mentions

### Prompting Best Practices
*   Write only the variable-specific instructions
*   Do NOT include company context or email sequence details
*   Prompt as if instructing an intern on this one specific task
*   Provide examples when helpful
*   Keep prompts focused on the single variable being generated

---

## Writing AI Personalization Prompts
_How to write effective prompts for the prompts.json file_

### Important: Context is Already Provided
The AI generating these variables already has full context about:
- The client company and what they do
- The email sequence and where each variable fits
- The sender's role and credentials
- Case studies and social proof

**You only write the variable-specific instructions.** Do not include company descriptions, email templates, or general rules in your prompts.

### Prompt Structure
Every prompt should contain these elements:

**1. Clear Output Instruction**
Start with exactly what to generate:
- "Write a subject line that..."
- "Generate a 1-sentence opening that..."
- "Create a PS line starting with 'PS' that..."

**2. Specific Data Sources**
Tell the AI exactly where to look:
- "From their LinkedIn profile, find..."
- "Based on their company website..."
- "Using their job title from LinkedIn..."

**3. Tone and Style Guidance**
Define how it should sound:
- "Keep it conversational and curious"
- "Professional but friendly"
- "Smart, concise, and straightforward"

**4. Length Constraints**
Be explicit about limits:
- "Under 6 words"
- "Maximum 20 words"
- "1-2 sentences only"

**5. What to Avoid**
Prevent common mistakes:
- "Avoid emojis and exclamation marks"
- "Don't summarize their profile"
- "No generic compliments"
- "Don't sound robotic or salesy"

**6. Fallback Instructions**
Handle missing data gracefully:
- "If industry isn't clear, reference their company size instead"
- "If no specific detail stands out, focus on their role"

### Prompt Examples by Variable Type

#### Subject Line Prompts
```
Write a very short subject line that grabs attention in 3-5 words. 
Make it relevant to something specific from their LinkedIn or website - 
a product they offer, a challenge in their industry, or their role. 
Use lowercase except for the first letter and proper names. 
No emojis or punctuation. 
The goal is to spark curiosity, not explain the email.
```

#### First Line Prompts
```
Write the first line of the email (no greeting). 
Hook their attention with something personalized from their LinkedIn profile 
or company website. Under 20 words. 
Should spark curiosity and flow naturally into the email body.
Avoid questions, emojis, and exclamation marks.
Don't just summarize their profile - find an angle or insight.
Tone: genuine, smart, concise.
```

#### PS Line Prompts
```
Write a PS line starting with "PS". 1-2 sentences max.
Reference a small, specific detail from their LinkedIn or website 
that most people wouldn't notice. Be casual and human.
Can include subtle humor if something naturally funny appears.
Goal: make them feel noticed without being generic or creepy.
Don't invent connections or offer help you can't back up.
```

#### Industry Hook Prompts
```
Based on their industry from LinkedIn company page and website, 
write 1 sentence connecting a common challenge in their space 
to [specific value proposition]. 
Make it specific to their industry, not generic.
Should sound like an observation from someone who understands their market.
```

#### Role-Based Pain Point Prompts
```
Based on their job title from LinkedIn, reference a pain point 
specific to that role in 1 sentence.
- For VPs/Directors: scaling challenges, team efficiency, strategic priorities
- For C-suite: competitive positioning, growth initiatives, organizational change
- For ICs: workflow friction, tool fatigue, day-to-day blockers
Make it feel like only someone in their role would truly understand.
```

### Testing Your Prompts
Before finalizing prompts.json:

1. **Run the prompt mentally** - Can you generate good output from the data sources specified?
2. **Check data availability** - Does the prompt only reference accessible data?
3. **Verify placement** - Does the variable fit naturally where it's inserted?
4. **Test edge cases** - What happens if certain data isn't available?

### Common Prompt Mistakes

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
