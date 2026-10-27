# Website Scraping Skill

Pick the pages of a company website that explain what it sells and to whom, and read them as markdown with your own web tools (a page fetch or a browser), or from page text the user pastes. The pages feed client research, the company knowledge folder, campaign strategy, and copy.

## Tools

Use the web tools your agent has: one that fetches a page as markdown or text and, when there is one, a site map or site search. To map a site without one, read the homepage and collect its links, and `/sitemap.xml` when the site has one.

Read one URL per call. For 8 pages it is the simplest and the most reliable path.

With no web tool, ask the user for the pages' text or the links they want read, and say that you cannot read the site yourself.

## The site

Read the site the user names. When they name none, use the website in `research.md` or the knowledge folder's `company-overview.md`. With no website anywhere, ask for it.

## Page Selection

If the user gives explicit URLs, scrape exactly those: no filtering, no cap.

Otherwise map the site and pick **at most 8 pages**:

1. **Same host only** - the site's own domain (a leading `www.` does not matter). Skip subdomains such as `blog.`, `docs.`, `app.`, `help.`, and every external link.
2. **Priority order** - homepage; about (`/about`, `/company`, `/team`, `/our-story`); product (`/product`, `/products`, `/solutions`, `/services`, `/platform`, `/features`, `/how-it-works`, `/process`); pricing (`/pricing`, `/plans`, `/packages`); customers (`/customers`, `/case-studies`, `/success-stories`, `/testimonials`, `/reviews`); industries and use cases (`/industries`, `/use-cases`, `/verticals`); integrations (`/integrations`, `/partners`); why-us.
3. **Skip** - blog posts and articles (`/blog/*`, `/news/*`, `/press/*`, single resource items), careers and jobs, legal (`/privacy`, `/terms`, `/legal`, `/cookie-policy`, `/gdpr`), login, signup, account, and app pages, search results and pagination (`?q=`, `?page=`, `/page/2`), media files (`.pdf`, `.jpg`, `.png`, `.mp4`), `/admin`, `/api`, `/webhook`, single event or webinar pages.
4. **One URL per page** - drop query strings, fragments, and trailing slashes before comparing, so the same page is never scraped twice.

If map fails or returns nothing usable, scrape the homepage alone.

## Scraping

- A page that fails is skipped; keep going. Never abort a site for one failure.
- Site unreachable: report it and stop for that site.
- Never echo scraped markdown back into the conversation. Report one line per page: URL and `ok` or `failed`, then how many URLs the map found and how many pages were read.
- With several sites, finish one before starting the next.

## Save pages

When the pages should be kept for later skills, save each one in the campaign workspace (`./cold-email/{slug}/`) right after reading it, before the next page:

- Name: `research/website/<page-slug>.md`. `/` -> `research/website/index.md`, `/about` -> `research/website/about.md`, `/products/x` -> `research/website/products--x.md`. Nested path segments join with `--`.
- Content: front matter with `url`, `title` (from the page, or empty), and `read_at` (ISO timestamp), then the page markdown.
- One file per page: when the file exists, overwrite it. Never create duplicates.

**client-research** reads the saved pages from there. For **knowledge-setup**, saving is optional: each fact goes into its knowledge file with the page and the date as its source.
