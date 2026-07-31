/**
 * Scoring for the developer scorecard.
 *
 * Pure functions only — every percentage rendered anywhere on the site derives
 * from here, so the grid, the per-developer pages and the methodology page
 * cannot drift apart.
 *
 * Rubric (see /scorecard/methodology):
 *   meets      3  publicly answers the question for IDMs, with specifics
 *   partial    2  addressed publicly, but not IDM-specific or lacking specificity
 *   adjacent   1  touched obliquely, or covers external models only
 *   none       0  no public statement addressing it
 *   unassessed —  could not verify; excluded from the denominator entirely
 *
 * Weighting: the four disclosures the paper singles out in §4 carry double
 * weight (flagged `priority` in src/data/framework.ts). Categories are weighted
 * EQUALLY against each other — the paper ranks items within its priority set but
 * never ranks the four categories, so we do not invent a cross-category
 * importance claim. Overall = unweighted mean of the four category percentages.
 */

import { categories, type DisclosureItem } from '@/data/framework';
import type { Developer, Cell, Verdict } from '@/data/scorecard';

export const VERDICT_POINTS: Record<Exclude<Verdict, 'unassessed'>, number> = {
  meets: 3,
  partial: 2,
  adjacent: 1,
  none: 0,
};

export const MAX_POINTS = 3;
export const PRIORITY_WEIGHT = 2;
export const STANDARD_WEIGHT = 1;

export function weightFor(item: DisclosureItem): number {
  return item.priority ? PRIORITY_WEIGHT : STANDARD_WEIGHT;
}

/** All 15 disclosure items, flattened, in Table 1 order. */
export const allItems: DisclosureItem[] = categories.flatMap((c) => c.disclosures);

/** Map of item slug → its parent category slug. */
export const itemCategory: Record<string, string> = Object.fromEntries(
  categories.flatMap((c) => c.disclosures.map((d) => [d.slug, c.slug])),
);

export function itemBySlug(slug: string): DisclosureItem | undefined {
  return allItems.find((i) => i.slug === slug);
}

export function cellFor(dev: Developer, itemSlug: string): Cell | undefined {
  return dev.cells.find((c) => c.itemSlug === itemSlug);
}

export type CategoryScore = {
  categorySlug: string;
  earned: number;
  possible: number;
  /** null when every item in the category is unassessed */
  percent: number | null;
  assessed: number;
  total: number;
};

export function categoryScore(dev: Developer, categorySlug: string): CategoryScore {
  const category = categories.find((c) => c.slug === categorySlug);
  if (!category) throw new Error(`Unknown category: ${categorySlug}`);

  let earned = 0;
  let possible = 0;
  let assessed = 0;

  for (const item of category.disclosures) {
    const cell = cellFor(dev, item.slug);
    if (!cell || cell.verdict === 'unassessed') continue;
    const weight = weightFor(item);
    earned += VERDICT_POINTS[cell.verdict] * weight;
    possible += MAX_POINTS * weight;
    assessed += 1;
  }

  return {
    categorySlug,
    earned,
    possible,
    percent: possible === 0 ? null : Math.round((earned / possible) * 100),
    assessed,
    total: category.disclosures.length,
  };
}

export function categoryScores(dev: Developer): CategoryScore[] {
  return categories.map((c) => categoryScore(dev, c.slug));
}

/**
 * Overall = unweighted mean of the four category percentages. Categories with
 * nothing assessed drop out of the mean rather than counting as zero.
 */
export function overallScore(dev: Developer): number | null {
  const percents = categoryScores(dev)
    .map((s) => s.percent)
    .filter((p): p is number => p !== null);
  if (percents.length === 0) return null;
  return Math.round(percents.reduce((a, b) => a + b, 0) / percents.length);
}

export function rankedDevelopers(devs: Developer[]): Developer[] {
  return [...devs].sort((a, b) => (overallScore(b) ?? -1) - (overallScore(a) ?? -1));
}

/** Count of each verdict across a developer's cells — drives the summary line. */
export function verdictTally(dev: Developer): Record<Verdict, number> {
  const tally: Record<Verdict, number> = {
    meets: 0,
    partial: 0,
    adjacent: 0,
    none: 0,
    unassessed: 0,
  };
  for (const cell of dev.cells) tally[cell.verdict] += 1;
  return tally;
}

/**
 * How each developer scored on one item — used for the per-item comparison rows.
 */
export function itemAcross(devs: Developer[], itemSlug: string) {
  return devs.map((dev) => ({ dev, cell: cellFor(dev, itemSlug) }));
}

export const VERDICT_LABEL: Record<Verdict, string> = {
  meets: 'Meets',
  partial: 'Partial',
  adjacent: 'Adjacent',
  none: 'None',
  unassessed: 'Not assessed',
};

/**
 * Build-time integrity check. Throws rather than shipping a malformed scorecard:
 * a cell that grades a developer without citing anything is exactly the failure
 * mode this site cannot afford.
 */
export function assertScorecardIntegrity(devs: Developer[]): void {
  const itemSlugs = new Set(allItems.map((i) => i.slug));
  const problems: string[] = [];

  for (const dev of devs) {
    const seen = new Set<string>();

    for (const cell of dev.cells) {
      if (!itemSlugs.has(cell.itemSlug)) {
        problems.push(`${dev.slug}: cell references unknown item "${cell.itemSlug}"`);
      }
      if (seen.has(cell.itemSlug)) {
        problems.push(`${dev.slug}: duplicate cell for "${cell.itemSlug}"`);
      }
      seen.add(cell.itemSlug);

      if (!cell.rationale?.trim()) {
        problems.push(`${dev.slug}/${cell.itemSlug}: missing rationale`);
      }
      if (cell.verdict !== 'unassessed' && cell.evidence.length === 0) {
        problems.push(
          `${dev.slug}/${cell.itemSlug}: verdict "${cell.verdict}" with no evidence`,
        );
      }
      for (const e of cell.evidence) {
        if (!/^https?:\/\//.test(e.url)) {
          problems.push(`${dev.slug}/${cell.itemSlug}: evidence URL is not absolute (${e.url})`);
        }
      }
    }

    for (const slug of itemSlugs) {
      if (!seen.has(slug)) problems.push(`${dev.slug}: no cell for "${slug}"`);
    }
  }

  if (problems.length) {
    throw new Error(`Scorecard integrity check failed:\n  - ${problems.join('\n  - ')}`);
  }
}
