# internaldeployments.ai — Project Instructions

Independent policy reference site for internal deployment (IDM) governance, built around the paper *"What Should Frontier AI Developers Disclose About Internal Deployments?"* (arXiv:2604.23065v2). Authors: Jacob Charnock, Raja Mehta Moreno, Justin Miller, William L. Anderson.

## Project context

- **Local:** `/Users/nomads/internaldeployments/` (standalone repo, lifted out of the Nomads monorepo 2026-07-31)
- **Remote:** `github.com/NomadsandVagabonds/internaldeployments`
- **Stack:** Astro (static-first, light client interactivity)
- **Hosting:** Vercel — `internaldeployments.vercel.app`
- **Domain:** `internaldeployments.ai` / `.com` are NOT attached. Both still URL301 to arXiv via Namecheap. **Do not point DNS without explicit go-ahead** — publication is gated on co-author review of the scorecard.
- **Attribution:** Site is paper-attributed only. **Do not** add Resonant Research or MATS branding, logos, or palette tokens from the parent monorepo. Authors appear in the citation footer, not in site chrome.

## Source material

- `docs/internal_deployments.pdf` — the paper (v2, 1 July 2026)
- `docs/internal_deployments.bib` — 54-entry bibliography, seed for the resources page
- `docs/idm-microsite-scope.md` — original project scope
- `.impeccable.md` — **design context (read this before any UI work)**

## Site structure

1. **Landing** — paper title, real abstract, arXiv link, last-updated, section index
2. **`/framework`** — Table 1 rendered cleanly, four categories expandable with the paper's benefits/risks analysis, public-vs-confidential toggle
3. **`/scorecard`** — six frontier developers graded against all fifteen disclosure questions, plus `/scorecard/[developer]` and `/scorecard/methodology`
4. **`/tracker`** — legislation tracker, filterable, sortable, per-row permalinks
5. **`/checklist`** — fillable public and confidential templates with worked examples
6. **`/resources`** — annotated bibliography, primary legal texts, BibTeX

## Scorecard rules (non-negotiable)

The scorecard assigns public grades to named companies. It measures **disclosure, not safety** — never write copy that blurs this.

- Every verdict except `unassessed` cites at least one retrievable primary source. Enforced at build time by `assertScorecardIntegrity()` in `src/lib/score.ts`.
- Never fabricate a quote, a URL, or a verdict. If a source cannot be verified, the verdict is `unassessed` and it leaves the denominator.
- `src/data/framework.ts` item slugs are the join key for `src/data/scorecard.ts` and are permalinks. Renaming one means updating both.
- Run `node scripts/check-links.mjs` before publishing any refresh.

## Checklist artifact

Two versions of a fillable disclosure template:
1. **Public report template** — high-level summaries (model system card register)
2. **Confidential regulator template** — granular fields (compute ranges, safeguard architectures, access controls, incident logs)

Format: real fillable HTML form with URL state + print-to-PDF, plus markdown source. Include 2–3 mock lab fill-ins as worked examples (sample completions showing what a good submission looks like in practice).

## Maintenance

User (Justin) owns refresh cadence. Quarterly minimum to align with SB 53 OES reporting cycles. Tracker and scorecard data live in typed TS files so non-dev co-authors can update via PR. Bump `lastUpdatedISO` in `src/data/site.ts` on every refresh, and add a changelog line to the scorecard methodology page when verdicts change.

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
