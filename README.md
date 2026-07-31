# IDM Disclosure microsite

Independent reference site for the paper *"What Should Frontier AI Developers Disclose About Internal Deployments?"* (arXiv:2604.23065).

See `../CLAUDE.md` and `../.impeccable.md` for project context and design system.

## Structure

| Path | Purpose |
|------|---------|
| `src/pages/index.astro` | Landing — paper title, abstract, table of contents |
| `src/pages/framework/` | Section 01 — Table 1 + four-category benefit/risk drawers, public/confidential toggle |
| `src/pages/tracker/` | Section 02 — filterable tracker of laws and bills, graded |
| `src/pages/checklist/` | Section 03 — fillable templates with three worked-example fill-ins |
| `src/pages/resources/` | Section 04 — primary texts, system cards, literature, auditors |
| `src/data/framework.ts` | Source of truth for Table 1 (extracted from paper) |
| `src/data/tracker.ts` | Source of truth for the tracker — edit this to refresh |
| `src/data/checklistMocks.ts` | Three fictional lab fill-ins |
| `src/data/resources.ts` | Resource lists |
| `src/styles/tokens.css` | Design tokens (color, type, space, motion) |
| `src/styles/global.css` | Base styles, type, layout primitives, print rules |

## Commands

```sh
npm install
npm run dev      # localhost:4321
npm run build    # static export to ./dist/
npm run preview  # serve ./dist/
```

## Content updates

- **Tracker refresh:** edit `src/data/tracker.ts` and update the `lastUpdated` constant in `src/components/SiteFooter.astro` and `src/pages/tracker/index.astro`.
- **Framework changes:** edit `src/data/framework.ts`. Slugs are stable — do not rename them without updating permalinks.
- **Resources:** edit `src/data/resources.ts`.
