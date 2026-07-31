# IDM Disclosure Microsite — Project Instructions

Independent policy reference site for the paper *"What Should Frontier AI Developers Disclose About Internal Deployments?"* (arXiv:2604.23065). Authors: Jacob Charnock, Raja Mehta Moreno, Justin Miller, William L. Anderson.

## Project context

- **Local:** `/Users/nomads/Nomads/IDM/site/`
- **Remote target:** `github.com/nomads/IDM`
- **Stack:** Astro (static-first, light client interactivity)
- **Hosting target:** Cloudflare Pages or Vercel (TBD — static export must work on both)
- **Attribution:** Site is paper-attributed only. **Do not** add Resonant Research or MATS branding, footers, logos, or color palettes from the parent monorepo. Authors are credited in citation footer only.

## Source material

- `2604.23065v1.pdf` — the paper itself (extract Table 1 and category text from here for the framework page; user will proof)
- `idm_legislation_tracker_v3_primary_links.html` — current tracker MVP (treat as **seed dataset of truth** — extract its rows into structured JSON, then upgrade per scope doc)
- `idm-microsite-scope.md` — full project scope, site structure, open questions, timeline
- `.impeccable.md` — **design context (read this before any UI work)**

## Site structure

1. **Landing** — paper title, one-paragraph summary, author info, arXiv link, last-updated, nav to three core sections
2. **`/framework`** — Table 1 rendered cleanly, four categories expandable with paper's benefits/risks analysis, downloadable checklist, optional public-vs-confidential toggle
3. **`/tracker`** — upgraded legislation tracker, filterable, sortable, per-row permalinks, mobile-clean
4. **`/resources`** — referenced documents, reading list, contact

## Checklist artifact

Two versions of a fillable disclosure template:
1. **Public report template** — high-level summaries (model system card register)
2. **Confidential regulator template** — granular fields (compute ranges, safeguard architectures, access controls, incident logs)

Format: real fillable HTML form with URL state + print-to-PDF, plus markdown source. Include 2–3 mock lab fill-ins as worked examples (sample completions showing what a good submission looks like in practice).

## Maintenance

User (Justin) owns refresh cadence. Quarterly minimum to align with SB 53 OES reporting cycles. Tracker data lives in JSON so non-dev co-authors can update via PR.

## Build conventions

- Tracker data: single JSON file, schema documented, validated at build time
- Framework content: MDX so prose and structured data live together
- Permalink anchors on every framework row and tracker entry (slug-based, stable across updates)
- Print stylesheet for framework + checklist pages (these get printed)
- Lighthouse 95+ on all four pages (this is a reference site — performance matters for credibility)

## What NOT to do

- Don't import any styling, fonts, or palette tokens from the MATS/Six Americas project
- Don't add hero animations, scroll-triggered reveals, count-up numbers, or KPI tiles
- Don't editorialize beyond the paper — site is a reference tool, not a publication venue
- Don't ship the tracker without primary-source links on every row (this is the v3's strongest feature — preserve it)
- Don't use cards-with-shadows for the tracker rebuild — hairline rules only

## Design

See `.impeccable.md` for full design context. Key principles:
1. Substance is the design — every visual choice serves use/citation/trust
2. Earn credibility through restraint — one accent, one display face, one body face
3. Citation-first — permalinks, primary sources, structured data are the product
4. Reading is the primary action — optimize for 1,000+ word sittings
5. Alive, not flashy — sharp typography, felt attention to detail, almost no motion
