# cold-email-skills

**Your agent can write code. Now it can write cold email that gets replies.**

10 free, open-source Agent Skills for planning and writing cold-email campaigns, extracted from the playbook we run our agency on. MIT licensed. No account, no API keys, no telemetry. Everything is written to plain markdown files on your machine.

```bash
npx skills add Ken-Technology/cold-email-skills
```

Works with Claude Code, Codex, Cursor, and any other agent that supports [Agent Skills](https://skills.sh).

## Where this comes from

[Ken](https://ken.so/?utm_source=github&utm_medium=skills-repo) started as a done-for-you cold email agency. These are not prompts written for a repo - they are the production skills our team runs for clients, ported to work anywhere. Across all client campaigns, this playbook averages a **3% reply rate** against a 0.8% industry average and **7 meetings per 10k emails** against the industry's 1, with copy frameworks tested across 500k+ sent emails.

We open-sourced the strategy layer because the playbook was never the moat. Execution is.

## What this looks like

You say:

> Plan a cold email campaign for my devtools startup. We sell a CI cost dashboard to engineering leaders at Series A-C companies.

Your agent runs the `cold-email-campaign` skill, asks a handful of questions about your offer, ICP, and proof points, and then works through research, targeting, qualification, segmentation, per-segment strategy, copywriting, review, and personalization prompts. Twenty minutes later you have:

```
cold-email/acme-outbound/
├── research.md          # what you sell, to whom, and why they care
├── plan.md              # 1 ICP + 1 offer + N segments
├── search-strategy.md   # portable list filters + a bring-your-own-list CSV shape
├── qualification.md     # AI prompts that judge prospect fit
├── segmentation.md      # rules that route each prospect to a segment
├── 0 - default/
│   ├── strategy.md      # sequence blueprint + personalization variables
│   ├── emails_v2.md     # reviewed, ready-to-send copy
│   └── prompts.md       # personalization prompts you can run in any LLM
└── 1 - series-a-eng-leaders/
    └── ...
```

Every email is drafted by `email-copywriting`, then scored by `email-review` against hard copy rules and rewritten until it passes. You get the reviewed version, not the first draft.

## Install

Ranked by friction:

**1. Have your agent do it.** Paste this into Claude Code, Codex, or Cursor:

> Install the skills from github.com/Ken-Technology/cold-email-skills, then plan a cold email campaign for me.

**2. Install the full set:**

```bash
npx skills add Ken-Technology/cold-email-skills
```

**3. Install a single skill:**

```bash
npx skills add Ken-Technology/cold-email-skills/email-copywriting
```

Each skill is a plain markdown file. Worst case, open the `SKILL.md` and paste it into any LLM.

## The skills

| Skill | What you get |
| --- | --- |
| [cold-email-campaign](cold-email-campaign/SKILL.md) | The orchestrator. Runs the whole playbook end to end and stops at ready-to-send files. |
| [client-research](client-research/SKILL.md) | A research doc synthesized from your notes, meeting transcripts, and website. |
| [search-strategy](search-strategy/SKILL.md) | Your ICP turned into portable search filters for Apollo, Sales Nav, Clay, or any list tool. |
| [qualification](qualification/SKILL.md) | AI prompts that evaluate whether a prospect actually fits your audience. |
| [segmentation](segmentation/SKILL.md) | AI prompts that divide a prospect list into campaign segments. |
| [campaign-strategy](campaign-strategy/SKILL.md) | A per-segment sequence blueprint with AI personalization variables. |
| [email-copywriting](email-copywriting/SKILL.md) | The actual emails: hooks, body, CTAs, signatures, personalization placeholders. |
| [email-review](email-review/SKILL.md) | A hard-rule review pass that scores copy 1-5 and iterates until it clears 4.5. |
| [prompt-writer](prompt-writer/SKILL.md) | Personalization prompts you can run in any personalization tool or LLM. |
| [lead-magnet](lead-magnet/SKILL.md) | Lead magnet ideas and designs for click-based and reply-based campaigns. |

Run the orchestrator for the full pipeline, or any skill on its own - they all read and write plain files.

## What these skills do not do

They plan and write. They do not scrape contacts, verify emails, warm up inboxes, or send anything. You bring your own prospect list (`search-strategy` documents the CSV shape) and your own sending tool - Instantly, Smartlead, Lemlist, a Gmail sequence, whatever you already use.

That is a feature: no account, no API keys, and nothing leaves your machine.

## When you outgrow the files

The skills stop where infrastructure starts. Ken is the same playbook running with the machinery attached:

| The skills give you | Ken adds |
| --- | --- |
| Portable search filters | A 280M+ contact database that runs them, with verified emails and phones |
| Qualification and segmentation prompts | The same prompts executed across your whole list automatically |
| Personalization prompts to run by hand | Live AI personalization on every outgoing email |
| Ready-to-send copy | Sending infrastructure, deliverability, and reply tracking |

- **[Try Ken AI](https://ken.so/?utm_source=github&utm_medium=skills-repo)** - bring the campaign folder these skills produced; it maps 1:1.
- **[Ken Daily](https://ken.so/daily?utm_source=github&utm_medium=skills-repo)** - not ready to send at scale? Get 10 verified leads in your inbox every morning. Free forever, no card.

## FAQ

**Why give the playbook away?**
Because strategy was never the hard part to defend. Contact data, verification, deliverability, and personalization at scale are. Open-sourcing the playbook costs us nothing and raises the floor for everyone's cold email - including your prospects' inboxes.

**Where does my data go?**
Nowhere. The skills write local files. No server, no telemetry, no account.

**Which agents does this work with?**
Anything that supports Agent Skills via [skills.sh](https://skills.sh): Claude Code, Codex, Cursor, and others. The skills are plain markdown, so they degrade gracefully to copy-paste.

**Can I change the rules?**
Fork it. The copy rules in `email-review`, the sequence blueprints in `campaign-strategy`, the CSV shape in `search-strategy` - it is all markdown. PRs welcome if your changes would help everyone.

## Contributing

Issues and PRs welcome. If a skill produced weak output, open an issue with the prompt you used and the artifact it wrote - that is the most useful bug report for a skills repo.

## License

MIT
