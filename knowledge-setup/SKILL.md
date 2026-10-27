---
name: knowledge-setup
description: "Set up a company knowledge folder as plain markdown files: company overview, ideal customer profile, pricing, proof, competitors, voice and instructions, each fact with its source. Use when someone wants their agent to know their company before writing outbound. Triggers on \"set up my company knowledge\", \"write our company files\", \"capture our voice\"."
---

# Knowledge setup

The knowledge folder is what your agent knows about a company: what it sells, its offer and prices, who it sells to, its proof and competitors, and how its people write. It is plain markdown files on the user's machine, kept next to their campaign folders, so every campaign starts from the same facts: **client-research** reads it when it writes a campaign's `research.md`, and every campaign skill after it reads that.

This skill writes the folder and keeps it true. It writes files only: no account, no API keys, nothing sent anywhere.

## The folder

Default `./knowledge/` under the current directory, next to `./cold-email/`; use another path when the user names one.

```
./knowledge/
├── company-overview.md        # what the company does, for whom, and why it wins
├── ideal-customer-profile.md  # who buys, their problems, who is not a fit
├── pricing.md                 # plans and prices exactly as stated, with source and date
├── proof/                     # one file per case study or result
│   └── {customer-slug}.md
├── competitors/               # one file per competitor
│   └── {competitor-slug}.md
├── voice.md                   # how the company's people write, each rule with its source
└── instructions.md            # rules every email follows, each with its source
```

## Related skills

- **client-research** researches a company for one campaign and writes `research.md` in the campaign workspace (`./cold-email/{slug}/`). It reads this folder first when it exists.
- **qualification** writes who is in and who is out for a campaign (`qualification.md`).
- **prompt-writer** writes and tests the personalization prompts for a segment (`prompts.md`).
- **create-campaign** builds a whole campaign, from plan to ready-to-send copy.

## Rules

- **Extract, never invent.** Every fact in a file comes from a source you can name: the website, a call, a document, or the person's words in this conversation. Never invent a price, a customer, a result or a number. A gap stays a gap: write it as an open question and ask.
- **Cite what people want.** A rule about how the company writes, or a claim about what a client wants, carries its source: who said it, where and when ("Dana, kickoff call, 2026-10-14"). With no source, ask; never fill the gap from a ticket's or an issue's claim.
- **A yes before each write.** Show what you will write, file by file, and save after the person agrees. A yes to the pricing file covers that file, not the folder.
- **Read, then write.** Read a file before you change it. When it changed since you read it (the person or someone else edited it), read it again, merge, show the person, save.
- **Edit sections, keep files.** Change the one section that changed and leave the rest. A restructure rewrites the same file, never a delete and a new file. When the folder sits in a git repo, its history keeps every version.
- **Keep secrets out.** Never write a password, an API key or a private link into these files: people share and commit them.
- This skill never sends, launches, or changes a campaign's schedule or volume. A person approves every send and launch.

## Step 1: Read what is there

1. List `./knowledge/` (or the folder the person names) and read every file in it.
2. Read what the campaigns already know: `research.md` in each `./cold-email/{slug}/`, and its `notes.md` when there is one.
3. Ask what else the person has: the website, call transcripts or recaps, decks, case studies, emails they wrote.

Tell the person in a few lines what is there, what is missing and what you would fill first. Most companies need, in order: the company overview, the ideal customer profile, pricing, proof and competitors, then the voice and instructions.

## Step 2: Company files

The folder holds the company-wide files. Aim for:

| File | Holds |
|---|---|
| Company overview | What the company does, for whom, and why it wins, in plain words |
| Ideal customer profile | Industries, sizes, roles, the problems they have, and who is not a fit |
| Pricing | Plans, prices and terms exactly as the company states them, with the source and its date |
| Proof (folder) | One file per case study or result: customer, problem, result, source |
| Competitors (folder) | One file per competitor: what they do, where the company wins, where it loses |

1. Gather: the website (Step 3), calls and documents (Step 5), a `research.md` that **client-research** wrote for a campaign, or what the person pastes or says.
2. For each file: when it exists, read it and update only the sections that changed. Otherwise write it in the shape below. Proof and competitor files go in `proof/` and `competitors/`, one file each, named by a short slug (`proof/acme-logistics.md`).
3. Keep `company-overview.md` short and plain: it is the first thing **client-research** reads when it writes a campaign's research.

Each file opens with its name and the date it was last checked, then short sections. Every fact carries its source and date; a gap is an open question, never a guess:

```markdown
# Pricing

Checked: 2026-10-27

## Plans
- Starter: $49 per user per month, billed yearly. Source: website /pricing, read 2026-10-27.
- Enterprise: quoted per deal. Source: Dana, kickoff call, 2026-10-14.

## Open questions
- Is there a monthly plan? The site shows yearly prices only.
```

A proof file holds the customer, the problem, the result with its numbers, and the source. A competitor file holds what they do, where the company wins, where it loses, and the source of each.

## Step 3: The website

Read the pages that say what the company sells and to whom - home, product or service pages, pricing, customers or case studies, about - following `references/website-scraping.md`: with your own web tools, or page text the person pastes. Skip blog posts, careers and legal pages. Each fact goes into its file with the page and the date you read it as its source; a price goes into `pricing.md` exactly as the page states it.

## Step 4: Voice and Instructions

- **Instructions** (`instructions.md`) are rules every email follows ("never promise a delivery date", "say workspace, not account"). One rule per line, each with its source: `- Never promise a delivery date. (Dana, kickoff call, 2026-10-14)`.
- **Voice** (`voice.md`) is how the company's people write: sentence length, words they use and avoid, how formal they are. One `- rule` line each, with its source. When people write differently, give each person their own section.
- A voice rule needs its source: the person's words, a sample they wrote, or a call. With nothing to learn from, ask for two or three emails they are proud of.

## Step 5: Calls and documents

- **Calls:** a transcript or recap the person gives you (a file path or pasted text) is a source like the website. Take out facts, proof, objections and voice rules, each cited by the call's name and date ("Kickoff with Acme, 2026-10-14"). `Name: words` lines tell you who said what: a voice rule comes from the company's own people, not from the prospect.
- **Documents:** decks, one-pagers and case studies the person points you to. Read them the same way and cite each by its file name.
- Leave the sources where they are. The folder holds what you took from them, with the citation.

## Step 6: Check and hand off

1. Read the folder back the way a campaign skill will: overview, ideal customer profile, pricing, proof, competitors, voice, instructions. Check that nothing is wrong, stale or without a source.
2. Report in a few lines: each file you wrote or changed, with its path.
3. List the open questions you left as gaps: a price you could not confirm, a competitor with no source.
4. Name what comes next: **client-research** writes a campaign's `research.md` from this folder, and **create-campaign** builds a whole campaign on top of it.

## What this skill does not do

- It writes markdown files and nothing else: it never sends, uploads or syncs anything.
- It does not read a mailbox, a CRM or a call recorder on its own, and does not watch the website for changes. Bring it the sources, or run it again when they change.
