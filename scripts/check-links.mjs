#!/usr/bin/env node
/**
 * Link-checks every evidence URL cited by the scorecard, plus the resources
 * lists. Run before publishing a scorecard refresh:
 *
 *   node scripts/check-links.mjs
 *
 * Several developer sites (openai.com, ai.meta.com) sit behind bot protection
 * and reject non-browser clients with 403/400 while serving real browsers
 * normally. Those are reported as NEEDS-BROWSER, not as failures — a dead link
 * and a bot-blocked link are different problems and only one of them is ours.
 * Exit code is non-zero only for genuinely broken links (404/410/DNS).
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');

/**
 * Hosts that cannot be checked from automation. Not link rot — verify by hand.
 *   openai.com, ai.meta.com  — bot protection; serve real browsers normally
 *   ilga.gov, legiscan.com   — refuse or drop connections from this network
 *                              entirely; the Illinois links need a human check
 */
const BOT_PROTECTED = ['openai.com', 'ai.meta.com', 'ilga.gov', 'legiscan.com'];

const UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 ' +
  '(KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36';

function urlsFrom(file) {
  const src = readFileSync(join(root, file), 'utf8');
  return [...src.matchAll(/url:\s*'([^']+)'/g)].map((m) => m[1]);
}

const urls = [...new Set([...urlsFrom('src/data/scorecard.ts'), ...urlsFrom('src/data/resources.ts')])]
  .filter((u) => u.startsWith('http'))
  .sort();

const isBotProtected = (u) => BOT_PROTECTED.some((h) => new URL(u).hostname.endsWith(h));

async function check(url) {
  try {
    const res = await fetch(url, {
      redirect: 'follow',
      headers: { 'User-Agent': UA, Accept: '*/*' },
      signal: AbortSignal.timeout(30_000),
    });
    if (res.ok) return { url, state: 'OK', detail: res.status };
    if (isBotProtected(url)) return { url, state: 'NEEDS-BROWSER', detail: res.status };
    if ([403, 429, 400].includes(res.status))
      return { url, state: 'NEEDS-BROWSER', detail: res.status };
    return { url, state: 'BROKEN', detail: res.status };
  } catch (err) {
    if (isBotProtected(url)) return { url, state: 'NEEDS-BROWSER', detail: err.name };
    return { url, state: 'BROKEN', detail: err.name };
  }
}

const results = [];
for (let i = 0; i < urls.length; i += 6) {
  results.push(...(await Promise.all(urls.slice(i, i + 6).map(check))));
}

const order = { BROKEN: 0, 'NEEDS-BROWSER': 1, OK: 2 };
results.sort((a, b) => order[a.state] - order[b.state] || a.url.localeCompare(b.url));

for (const r of results) {
  console.log(`${r.state.padEnd(14)} ${String(r.detail).padEnd(6)} ${r.url}`);
}

const broken = results.filter((r) => r.state === 'BROKEN');
const manual = results.filter((r) => r.state === 'NEEDS-BROWSER');

console.log(
  `\n${results.length} links · ${results.length - broken.length - manual.length} ok · ` +
    `${manual.length} need manual check · ${broken.length} broken`,
);

if (broken.length) {
  console.error('\nBroken links must be fixed before publishing a refresh.');
  process.exit(1);
}
