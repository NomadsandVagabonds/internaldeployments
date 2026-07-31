/**
 * Single source of truth for paper metadata and the site's last-updated stamp.
 *
 * The date was previously duplicated across SiteFooter, the landing page and
 * the tracker, which is exactly the kind of thing that silently drifts. Import
 * from here instead of hardcoding.
 */

export const paper = {
  title:
    'What Should Frontier AI Developers Disclose About Internal Deployments?',
  arxivId: '2604.23065',
  version: 'v2',
  /** Date this version was posted to arXiv */
  versionDate: '2026-07-01',
  venue: 'Second Workshop on Technical AI Governance Research (TAIGR) @ ICML 2026',
  venueShort: 'TAIGR @ ICML 2026',
  pages: 15,
  status: 'preprint',
  authors: [
    'Jacob Charnock',
    'Raja Mehta Moreno',
    'Justin Miller',
    'William L. Anderson',
  ],
  abstractUrl: 'https://arxiv.org/abs/2604.23065',
  pdfUrl: '/paper.pdf',
} as const;

/** When the site's data (tracker, scorecard, resources) was last reviewed. */
export const lastUpdatedISO = '2026-07-31';

export const lastUpdated = new Date(lastUpdatedISO).toLocaleDateString('en-US', {
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  timeZone: 'UTC',
});

export const versionDateLong = new Date(paper.versionDate).toLocaleDateString(
  'en-US',
  { year: 'numeric', month: 'long', timeZone: 'UTC' },
);

/** "arXiv:2604.23065v2" — used in eyebrows and citation blocks. */
export const arxivLabel = `arXiv:${paper.arxivId}${paper.version}`;
