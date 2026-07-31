# IDM Disclosure Microsite — Project Scope

**Working title:** idm-disclosure.org (or similar)
**Paper:** "What Should Frontier AI Developers Disclose About Internal Deployments?" (arXiv:2604.23065)
**Authors:** Jacob Charnock, Raja Mehta Moreno, Justin Miller, William L. Anderson
**Date:** April 28, 2026

---

## Purpose

Turn the paper's disclosure framework into a living policy resource that outlasts the PDF. Three goals:

1. Make the disclosure table usable by safety teams, policy staff, and regulators — not just readable by researchers.
2. Provide a maintained tracker of how current/pending legislation maps to the paper's four disclosure categories.
3. Give the paper a citable, shareable URL for policy contexts where an arXiv link doesn't land.

---

## Site structure

### 1. Landing page
- Paper title, one-paragraph summary, author info
- PDF download link (arXiv)
- Navigation to the three core sections below
- Last-updated date

### 2. Disclosure framework (`/framework`)
- Clean HTML rendering of Table 1 (capabilities, usage, safety mitigations, governance)
- Each category expandable with the paper's benefits/risks analysis
- Downloadable checklist version (PDF or markdown) that a safety team lead could fill in or adapt internally
- Optional: interactive toggle showing "public disclosure" vs. "confidential regulator report" scope for each item

### 3. Legislation tracker (`/tracker`)
- Current MVP upgraded (see improvements below)
- Filterable table: jurisdiction, status, grade, focus area
- Each row: bill name, IDM grade (A–D rubric from paper), coverage tags, assessment notes, gap-to-fix, primary source link
- Summary metrics bar (count, average score, pending vs. enacted)

### 4. Resources (`/resources`)
- Links to key referenced documents (SB 53 text, NY RAISE text, EU GPAI Code of Practice, model system cards from Anthropic/OpenAI/DeepMind cited in paper)
- Brief reading list of the related literature (Stix et al., Kwon & Casper, Chan et al., Acharya & Delaney)
- Contact or feedback channel

---

## Legislation tracker improvements (from current MVP)

### Data additions
- **International instruments:** UK AI Safety Institute voluntary agreements, Seoul Frontier AI Safety Commitments, Singapore Model AI Governance Framework, Canada's Voluntary Code of Conduct, Japan Hiroshima Process guidelines
- **Federal procurement hooks:** OMB M-24-10, DoD CDAO AI adoption guidance, DOE AI risk management orders — flag where contract conditions could reach internal deployments
- **Agency implementation:** SB 53 OES reporting templates (when published), EU AI Office GPAI guidance, state AG rulemaking

### Functional improvements
- Sort by column (score, jurisdiction, status)
- Permalink anchors per row for citation
- Changelog or diff view when entries are updated
- Mobile layout cleanup (table currently overflows)

---

## Disclosure checklist / template

A standalone downloadable artifact derived from Table 1. Two versions:

1. **Public report template** — high-level summaries appropriate for model system cards or public transparency reports. Covers all four categories at a level consistent with what Anthropic/OpenAI already publish, plus the paper's recommended additions.
2. **Confidential regulator template** — more granular version for non-public reports to regulators or third-party evaluators (SB 53 OES submissions, EU AI Office reports, METR-style reviews). Includes fields for compute allocation ranges, specific safeguard architectures, access control details, incident logs.

Format: markdown or fillable HTML. Not a legal form — a structured starting point.

---

## Open questions

### Branding and ownership
- Does this live under Resonant Research, as an independent project site, or as a neutral co-author resource?
- Domain choice depends on this. Options: `idm-disclosure.org`, a subdomain of resonantresearch.org, or a standalone GitHub Pages site.
- All co-authors should agree before anything goes live.

### Anonymity / review timing
- If ICML workshop review is double-blind, the site cannot be publicly linked to the authors until after the decision.
- **Option A:** Build now, launch after review outcome.
- **Option B:** Launch tracker and checklist as independent policy tools that reference the paper by arXiv ID only (no author names on the site). Add author attribution post-review.
- **Option C:** Wait entirely until post-review.

### Maintenance commitment
- The tracker is only valuable if it stays current. Who owns updates? Quarterly refresh cadence minimum to match SB 53 reporting cycles.
- Consider a public changelog or RSS feed so subscribers know when entries change.

### Scope creep risks
- Resist adding commentary, blog posts, or opinion pieces. The site's value is as a reference tool, not a publication venue.
- If the paper gets accepted and revised, the framework page needs to reflect the final version — plan for one update cycle.

---

## Technical approach

- Static site (single-page or minimal multi-page). No backend needed.
- Host on GitHub Pages, Cloudflare Pages, or Vercel.
- Legislation data as a JSON file that renders client-side (current approach works fine).
- Checklist templates as downloadable `.md` and `.pdf` files in a `/templates` directory.

---

## Suggested timeline

| Phase | Milestone | Timing |
|-------|-----------|--------|
| 1 | Co-author alignment on branding, ownership, anonymity approach | Before build |
| 2 | Build site with framework page, upgraded tracker, checklist templates | 1–2 weeks |
| 3 | Internal review by co-authors | 1 week |
| 4 | Soft launch (unlisted, shared with trusted reviewers) | Pre-review or post-review depending on anonymity decision |
| 5 | Public launch | Post ICML workshop decision |
| 6 | First tracker update cycle | 90 days after launch |
