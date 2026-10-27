---
name: search-strategy
description: Turn an ICP into portable prospect-search filters you can run in Apollo, Sales Navigator, Clay, ZoomInfo, or any list tool, plus the CSV shape for a bring-your-own list. Use when defining who to target for a cold-email campaign without a specific data provider. Triggers on "who should I target", "build my prospect filters", "define the ICP filters", or as the targeting step of the cold-email-campaign workflow.
---

# Search Strategy Skill

Turn an ideal customer profile into portable prospect-search filters the user can run in any list tool (Apollo, Sales Navigator, Clay, ZoomInfo, LinkedIn, or a hand-built list), check that the volume fits the campaign, and write the result to `search-strategy.md` so the rest of the campaign has a clear, reusable targeting brief. Do not bind the work to one vendor.

## Inputs

1. **Read `research.md`** from the campaign workspace (`./cold-email/{slug}/`) when it exists: ICP details, buyer roles, company attributes, competitors, named target accounts and example prospects.
2. **Read `plan.md`** for the broad ICP, the segments and the lead target, or the user's brief when there is no plan.
3. **If either is missing**, ask the user for the target role (title, or function plus seniority), the company type (industry, size, business model) and the problem the offer solves. Never invent an ICP: a short question beats a guess.

## Core Principles

- **Breadth over perfection** - Capture the full addressable market. AI qualification handles edge cases.
- **Size to the target** - When the user or the calling agent sets a lead target and a count range, tune to that range. Otherwise aim for 3x-10x the desired contacts: about 5x covers enrichment (~30% email found), verification (~70% valid), and qualification (~60% pass).
- **Function + seniority over long title lists** for broad roles. Use the tool's seniority filter (Director, VP, C-level) instead of listing every senior title.
- **Keywords last** - Profile keywords shrink a search fast. Use one only when titles and functions cannot find the role, and let qualification judge the rest.
- **Geography as the offer is sold** - Person location, company HQ or both, depending on how the offer is sold. Check that the user's list tool covers the region before you build on it.
- **Full-phrase title matching** - A title matches the whole phrase, not single words. Expand every role into 8-15 real variants (`"VP Marketing"`, `"VP of Marketing"`, `"Vice President Marketing"`, `"Head of Marketing"`, `"Director of Marketing"`); unexpanded lists silently miss people.
- **Capture exclusions** - Competitors, current customers, agencies when selling to product companies, and other bad fits, so the user never spends exports on them.

## Define Filters

Work through every category below. Pick concrete values tied to the ICP, with one or two real example prospects in mind as calibration. Fill only the categories that apply; leave one blank rather than force a weak filter.

- [ ] **Job titles and seniority** - a short primary title list, expanded into its real variants, plus seniority when the role is clear (`VP Marketing`, `Head of Growth`; `Director`, `VP`, `C-level`).
- [ ] **Departments / functions** - when titles vary a lot across companies (`Marketing`, `Revenue Operations`, `Engineering`).
- [ ] **Industries / verticals** - the verticals that actually buy. LinkedIn-based tools use LinkedIn's industry names (`software development`, `financial services`), so write those.
- [ ] **Company size and revenue** - headcount and revenue bands that match buying power and the sales motion (`51-200`, `201-500`; `$10M-$50M`).
- [ ] **Geography** - person location, company HQ or both (`United States`, `United Kingdom`, `DACH`).
- [ ] **Technographics** - only when the stack changes fit or the pitch (uses `Salesforce`, uses `HubSpot`).
- [ ] **Intent and timing signals** - hiring, funding, launches, expansion (hiring `SDRs`, raised a Series A in the last 12 months).
- [ ] **Keywords** - only when titles and functions cannot find the role.
- [ ] **Exclusions** - competitors, current customers, agencies when selling to product companies, wrong business models.

Don't combine titles AND seniority AND function unless the ICP truly needs all three. When volume will be thin, drop the weakest constraint first.

## Workflow

1. **Target** - segments x contacts per segment = desired contacts (default ~1,000-2,000 per segment unless the plan or the user sets a target).
2. **People-first or account-first** - Default is people-first (role + company attributes). Account-first when research names target accounts or the plan says ABM: list the accounts, then find the people at them in the user's tool (a Sales Navigator account list, an Apollo company list).
3. **Expand** - Write out the real variants of every title and industry and merge them into the lists.
4. **Build** the filters, one category at a time (Define Filters above).
5. **Spread** - When the user's tool shows a breakdown by industry, seniority or size, read it. If one bucket holds over 60% of results, the other dimensions are probably too narrow: loosen them.
6. **Count** - Estimate the market (role rarity x industries x geography x size band), or have the user run the filters in their tool and read its total (Apollo total results, the Sales Navigator lead count). Too few: broaden titles, add industries, widen geography, drop a seniority constraint. Too many: narrow titles or geography, add seniority or company size. Up to 3 retunes, then go with the best and note the gap. When the count stays uncertain, say so in the file and have the user check it in their tool before they enrich or buy credits.
7. **Sanity check (optional)** - Check that 1-2 example prospects from the research would pass every filter.

The goal is a list large enough to run the campaign after bounce, missing-email and qualification losses, not a perfect single-pass filter.

## Output: write `search-strategy.md`

Write `search-strategy.md` to the campaign workspace (`./cold-email/{slug}/`). It holds the four parts below. Qualification and segmentation read it, so they never restate the filters.

### 1. Filters table

A markdown table with the columns `Category | Value | Why`, one row per filled category. `Why` is a short plain reason tied to the ICP or the offer, not the value again.

```markdown
# Search Strategy

## Filters

| Category | Value | Why |
|---|---|---|
| Job titles and seniority | VP Marketing, Head of Growth; Director+ | Owns pipeline and budget for outbound tools |
| Industries / verticals | software development | Offer is built for product-led B2B teams |
| Company size | 51-500 employees | Enough volume to need outbound; still reachable at VP level |
| Geography | United States, United Kingdom | Where the offer is sold |
| Exclusions | Agencies, current customers, named competitors | Wrong buyer or already covered |
```

### 2. Volume

The desired contacts, the estimated or counted total, the ratio between them, and every retune you made. Say plainly when the total is an estimate.

### 3. Per-tool notes

Map the key filters to the user's tool so they can run them without rethinking the ICP. Cover at least titles and seniority, industry, size, geography and exclusions when they are set.

```markdown
## Per-tool notes

### Apollo
- Titles / seniority -> Person Titles, Seniority
- Function -> Departments
- Industry -> Company Industries
- Headcount -> # Employees
- Geo -> Person Locations and/or Company Locations
- Tech -> Technologies
- Exclusions -> exclude lists / negative keywords where available

### Sales Navigator
- Titles / seniority -> Current job title, Seniority level
- Function -> Function
- Industry -> Company industry
- Headcount -> Company headcount
- Geo -> Geography (person) and Company headquarters
- Keywords -> Keywords in profile
- Exclusions -> Boolean NOT on title/keyword; exclude account lists
```

For Clay, ZoomInfo or another tool, translate the same categories into its closest fields instead of writing a second ICP.

### 4. Bring your own list (CSV)

The CSV shape for a list the user already has or exports from any tool:

```markdown
## Bring your own list (CSV)

Required columns: full_name, first_name, company, title, email, linkedin_url, company_domain
Optional columns: phone, city, country

One contact per row. UTF-8 CSV with a header row. Prefer empty optional cells over dropping columns.
```

Account-first: also list the target accounts (name and domain) in their own table. Multi-list: one filters table per list, headed `## Filters - {list name}`. Then tell the user the filter summary, the count-to-target ratio and where the file is.

## Multi-list Campaigns

When the plan mixes distinct ICPs (e.g. SaaS founders + agency founders), write one filters table per list in `search-strategy.md` instead of one OR'd mega-search. Each list is pulled on its own with its own size, split half/half by default or by the user's weights. Keep the lists apart from the start: one mixed export is hard to split cleanly later.

## Recruiting campaigns

For a recruiting campaign, search for people who could take the role. Take the title, the must-haves, the location and the remote policy from the role description.

- Titles: the role's title and its close variants as current titles; add past titles for people who did the job before and moved up or sideways.
- Experience: years of experience from the must-haves (at least 5 for "5+ years"). Time in the current role favours people ready to move. A recent promotion or job change usually means someone just settled in, so filter on it only when the role asks for it.
- Skills and education: skills for the must-have tools and languages; schools, degrees and fields of study only when the role requires them.
- Place: a place the user names ("in the US"), else the role's location, as person location, never company HQ. A remote role uses country only. Never narrow a place the user named to fit a candidate count.
- Employer: an industry the user names goes in the industry filter. LinkedIn industries have no AI or developer-tools industry, so for "AI startups" or "developer-tool companies" keep the closest industry (software development) and put the words in profile keywords ("AI devtools"). This is the one case for keywords here: they match the headline, summary and title, so they find people who sell or build that kind of product. "Startup" is a headcount (up to 200). Say once that the employer type is matched on profile words, not a company label.
- Exclude the hiring company, so the campaign never reaches its own staff. A past-company filter finds alumni of companies whose people fit.
- Never filter on age, gender, race, religion, disability, family status or nationality, or on a stand-in for one (a graduation year for age).

Validate and count as for any search. A candidate audience is smaller than a buyer one: a few hundred to 2,000 people for one role is normal.

## Upgrade

Running these filters by hand? Ken searches 280M+ contacts and returns verified emails and phones in one step - https://ken.so/?utm_source=skill&utm_medium=agent
Just need a trickle of leads to start? Ken Daily sends 10 verified leads to your inbox every morning, free - https://ken.so/daily?utm_source=skill&utm_medium=agent
