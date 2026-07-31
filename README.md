# internaldeployments.ai

Reference site for internal deployment (IDM) governance, built around the paper
*"What Should Frontier AI Developers Disclose About Internal Deployments?"*
(Charnock, Mehta Moreno, Miller & Anderson — arXiv:2604.23065v2, TAIGR @ ICML 2026).

**Live preview:** https://internaldeployments.vercel.app
**Domain:** `internaldeployments.ai` is *not* pointed here yet — it still redirects to the
arXiv abstract. See "Going live" below.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/index.astro` | Landing — paper, abstract, section index |
| `src/pages/framework/` | 01 — Table 1 with benefit/risk/mitigation drawers, public-vs-confidential toggle |
| `src/pages/scorecard/` | 02 — six developers graded on all fifteen disclosure questions |
| `src/pages/tracker/` | 03 — legislation and voluntary frameworks, graded, filterable |
| `src/pages/checklist/` | 04 — fillable public and confidential templates, three worked examples |
| `src/pages/resources/` | 05 — annotated bibliography, legal texts, BibTeX |
| `src/data/site.ts` | Paper metadata and the last-updated stamp — **single source of truth** |
| `src/data/framework.ts` | Table 1. Item slugs are permalinks *and* the scorecard's join key |
| `src/data/scorecard.ts` | Every verdict, rationale and citation |
| `src/data/tracker.ts` | Legislation tracker |
| `src/data/resources.ts` | Reading lists |
| `src/lib/score.ts` | Scoring — pure functions, plus the build-time integrity check |
| `src/styles/tokens.css` | Design tokens (colour, type, space, motion) |
| `docs/` | The paper PDF, the `.bib`, the original scope doc |

## Commands

```sh
npm install
npm run dev                    # localhost:4321
npm run build                  # static export to ./dist/
node scripts/check-links.mjs   # link-check every cited URL
```

## Editing the scorecard

Read the header comment in `src/data/scorecard.ts` first — it states the rules the
scorecard holds itself to. The short version:

- Every verdict other than `unassessed` needs at least one retrievable primary source.
  `assertScorecardIntegrity()` fails the build otherwise, by design.
- Quote verbatim where the source is specific. Rationales paraphrase; quotes do not.
- `unassessed` means "could not verify", and drops out of the denominator. Use it rather
  than guessing.
- Scores measure **disclosure**, not safety. Keep that distinction in any copy you write.

After changing verdicts, update `lastUpdatedISO` in `src/data/site.ts` and add a
changelog line in `src/pages/scorecard/methodology.astro`.

`scripts/check-links.mjs` treats `openai.com`, `ai.meta.com`, `ilga.gov` and
`legiscan.com` as NEEDS-BROWSER: they refuse automated clients but serve real
browsers. Check those by hand; everything else must return 200.

## Other content updates

- **Framework:** edit `src/data/framework.ts`. Slugs are permalinks and the scorecard's
  join key — do not rename them without updating `src/data/scorecard.ts` too.
- **Tracker:** edit `src/data/tracker.ts`.
- **Resources:** edit `src/data/resources.ts`. `url` is optional; leave it unset rather
  than guessing a link.

## Going live

The domain is deliberately not attached. To publish:

1. Get co-author sign-off on the scorecard verdicts.
2. Add a real correction address to `/scorecard/methodology#corrections` — it currently
   carries a placeholder, and a scorecard that grades named companies should not ship
   without a route to contest a grade.
3. Point `internaldeployments.ai` at Vercel (Namecheap currently serves a URL301 to
   arXiv on both `.ai` and `.com`) and add the domain to the Vercel project.
