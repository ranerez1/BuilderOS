#!/usr/bin/env node
/**
 * Generate self-contained HTML from comparison or gap-analysis JSON.
 */
import fs from 'node:fs';
import path from 'node:path';
import { findRepoRoot, parseArgs } from './lib/paths.mjs';

const CSS = `
  :root { --bg: #0f1117; --card: #1a1d27; --text: #e8eaed; --muted: #9aa0a6; --accent: #6ea8fe; --border: #2d3340; }
  * { box-sizing: border-box; }
  body { font-family: system-ui, -apple-system, sans-serif; background: var(--bg); color: var(--text); margin: 0; padding: 2rem; line-height: 1.5; }
  h1, h2, h3 { font-weight: 600; margin-top: 2rem; }
  h1 { margin-top: 0; font-size: 1.75rem; }
  .meta { color: var(--muted); font-size: 0.9rem; margin-bottom: 1.5rem; }
  .card { background: var(--card); border: 1px solid var(--border); border-radius: 8px; padding: 1.25rem; margin-bottom: 1rem; }
  table { width: 100%; border-collapse: collapse; font-size: 0.9rem; }
  th, td { border: 1px solid var(--border); padding: 0.6rem 0.75rem; text-align: left; vertical-align: top; }
  th { background: #222633; }
  .gallery { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem; }
  .shot { background: var(--card); border: 1px solid var(--border); border-radius: 8px; overflow: hidden; }
  .shot img { width: 100%; display: block; }
  .shot figcaption { padding: 0.75rem; font-size: 0.85rem; color: var(--muted); }
  .tier-P0 { color: #ff6b6b; font-weight: 600; }
  .tier-P1 { color: #ffa94d; }
  .tier-P2 { color: #74c0fc; }
  .tier-P3 { color: var(--muted); }
  .status-Shipped { color: #51cf66; }
  .status-Partial { color: #ffa94d; }
  .status-Gap { color: #ff6b6b; }
  ul { padding-left: 1.25rem; }
  a { color: var(--accent); }
`;

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function resolveImagePath(dataDir, imgPath, runDir, repoRoot) {
  const candidates = [
    path.join(dataDir, imgPath),
    path.join(repoRoot, runDir || '', imgPath),
    path.join(repoRoot, imgPath),
  ];
  for (const c of candidates) {
    if (fs.existsSync(c)) return path.relative(dataDir, c);
  }
  return imgPath;
}

function renderComparison(data, dataDir, repoRoot) {
  const capHeaders = ['Capability', ...data.competitors];
  const capRows = (data.capabilities || [])
    .map((row) => {
      const cells = capHeaders
        .map((h) => {
          if (h === 'Capability') return `<td>${escapeHtml(row.name)}</td>`;
          return `<td>${escapeHtml(row[h] || '—')}</td>`;
        })
        .join('');
      return `<tr>${cells}</tr>`;
    })
    .join('');

  const gallery = (data.screenshots || [])
    .map((s) => {
      const rel = resolveImagePath(dataDir, s.path, data.runDir, repoRoot);
      return `<figure class="shot"><img src="${escapeHtml(rel)}" alt="${escapeHtml(s.competitor)} ${escapeHtml(s.state)}"><figcaption><strong>${escapeHtml(s.competitor)}</strong> · ${escapeHtml(s.state)}${s.caption ? ` — ${escapeHtml(s.caption)}` : ''}${s.url ? `<br><a href="${escapeHtml(s.url)}">${escapeHtml(s.url)}</a>` : ''}</figcaption></figure>`;
    })
    .join('');

  const notes = (data.notes || [])
    .map(
      (n) =>
        `<div class="card"><h3>${escapeHtml(n.competitor)}</h3><ul>${(n.bullets || []).map((b) => `<li>${escapeHtml(b)}</li>`).join('')}</ul></div>`
    )
    .join('');

  const docs = (data.docs || [])
    .map(
      (d) =>
        `<tr><td>${escapeHtml(d.competitor)}</td><td>${escapeHtml(d.title)}</td><td><a href="${escapeHtml(d.url)}">${escapeHtml(d.url)}</a></td></tr>`
    )
    .join('');

  const dq = data.dataQuality || {};
  const dqList = [
    ['Login failures', dq.loginFailures],
    ['Missing states', dq.missingStates],
    ['Plan-gated UI', dq.planGated],
    ['Assumptions', dq.assumptions],
  ]
    .map(
      ([label, arr]) =>
        `<li><strong>${label}:</strong> ${Array.isArray(arr) && arr.length ? escapeHtml(arr.join('; ')) : 'none'}</li>`
    )
    .join('');

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(data.feature)} — Competitor comparison</title><style>${CSS}</style></head><body>
<h1>Competitor comparison: ${escapeHtml(data.feature)}</h1>
<p class="meta">Date: ${escapeHtml(data.date)} · Competitors: ${escapeHtml((data.competitors || []).join(', '))}</p>
<div class="card"><h2>Scope</h2><p>${escapeHtml(data.scope || '')}</p></div>
<h2>Capability comparison</h2>
<table><thead><tr>${capHeaders.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${capRows}</tbody></table>
<h2>Screenshots</h2><div class="gallery">${gallery || '<p class="meta">No screenshots</p>'}</div>
<h2>Per-competitor notes</h2>${notes || '<p class="meta">None</p>'}
<h2>Supplemental docs</h2>
<table><thead><tr><th>Competitor</th><th>Doc</th><th>URL</th></tr></thead><tbody>${docs || '<tr><td colspan="3">None</td></tr>'}</tbody></table>
<h2>Data quality</h2><ul>${dqList}</ul>
</body></html>`;
}

function statusCell(cell) {
  if (!cell || typeof cell === 'string') {
    const status = cell || '—';
    const cls = typeof status === 'string' && status.match(/^\w+/) ? `status-${status.split(' ')[0]}` : '';
    return `<td class="${cls}">${escapeHtml(status)}</td>`;
  }
  const cls = `status-${cell.status || ''}`;
  const note = cell.note ? `<br><span class="meta">${escapeHtml(cell.note)}</span>` : '';
  return `<td class="${cls}">${escapeHtml(cell.status || '—')}${note}</td>`;
}

function renderGapAnalysis(data, dataDir, repoRoot) {
  const ownSlug = data.ownProduct?.slug || 'your-product';
  const competitorSlugs = new Set();
  for (const row of data.rows || []) {
    for (const key of Object.keys(row)) {
      if (!['capability', 'valueTier', 'gapSummary'].includes(key)) competitorSlugs.add(key);
    }
  }
  competitorSlugs.delete(ownSlug);

  const headers = ['Capability', 'Tier', ...[...competitorSlugs], ownSlug, 'Gap summary'];
  const rows = (data.rows || [])
    .map((row) => {
      const tier = row.valueTier || '';
      const cells = [
        `<td>${escapeHtml(row.capability)}</td>`,
        `<td class="tier-${escapeHtml(tier)}">${escapeHtml(tier)}</td>`,
        ...[...competitorSlugs].map((s) => statusCell(row[s])),
        statusCell(row[ownSlug]),
        `<td>${escapeHtml(row.gapSummary || '')}</td>`,
      ];
      return `<tr>${cells.join('')}</tr>`;
    })
    .join('');

  const topSix = (data.topSix || [])
    .map(
      (t) =>
        `<div class="card"><h3>#${t.rank} ${escapeHtml(t.capability)} <span class="tier-${escapeHtml(t.valueTier)}">(${escapeHtml(t.valueTier)})</span></h3>
<p>${escapeHtml(t.communitySignal || '')}</p>
<ul>${(t.communityUrls || []).map((u) => `<li><a href="${escapeHtml(u)}">${escapeHtml(u)}</a></li>`).join('')}</ul>
<p><strong>Product difference:</strong> ${escapeHtml(t.productDifference || '')}</p></div>`
    )
    .join('');

  const strengths = (data.ownProductStrengths || [])
    .map((s) => `<li>${escapeHtml(s)}</li>`)
    .join('');

  const thumbs = (data.screenshots || [])
    .map((s) => {
      const rel = resolveImagePath(dataDir, s.path, data.runDir, repoRoot);
      return `<img src="${escapeHtml(rel)}" alt="${escapeHtml(s.competitor)}" style="max-width:160px;border-radius:4px;border:1px solid var(--border)">`;
    })
    .join(' ');

  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(data.feature)} — Gap analysis</title><style>${CSS}</style></head><body>
<h1>Gap analysis: ${escapeHtml(data.feature)}</h1>
<p class="meta">Date: ${escapeHtml(data.date)} · Own product: ${escapeHtml(data.ownProduct?.name || ownSlug)}</p>
${topSix ? `<h2>Top priorities</h2>${topSix}` : ''}
<h2>Value-ranked comparison</h2>
<table><thead><tr>${headers.map((h) => `<th>${escapeHtml(h)}</th>`).join('')}</tr></thead><tbody>${rows}</tbody></table>
<div class="card"><h2>${escapeHtml(data.ownProduct?.name || 'Own product')} strengths</h2><ul>${strengths || '<li>None listed</li>'}</ul></div>
${thumbs ? `<h2>Screenshot references</h2><p>${thumbs}</p>` : ''}
</body></html>`;
}

function printHelp() {
  console.log(`Usage: competitor-presentation [options]

Options:
  --data <path>     Path to comparison or gap-analysis JSON (required)
  --output <path>   Output HTML path (default: same dir as JSON, .html extension)
  --help            Show this help
`);
}

async function main() {
  const { args } = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const dataPath = args.data;
  if (!dataPath) {
    printHelp();
    process.exit(1);
  }

  const repoRoot = findRepoRoot();
  const absData = path.isAbsolute(dataPath) ? dataPath : path.join(repoRoot, dataPath);
  if (!fs.existsSync(absData)) {
    throw new Error(`Data file not found: ${absData}`);
  }

  const data = JSON.parse(fs.readFileSync(absData, 'utf8'));
  const dataDir = path.dirname(absData);
  const output =
    args.output
      ? path.isAbsolute(args.output)
        ? args.output
        : path.join(repoRoot, args.output)
      : absData.replace(/\.json$/i, '.html');

  const html =
    data.type === 'gap-analysis'
      ? renderGapAnalysis(data, dataDir, repoRoot)
      : renderComparison(data, dataDir, repoRoot);

  fs.writeFileSync(output, html, 'utf8');
  console.log(JSON.stringify({ output: path.relative(repoRoot, output) }, null, 2));
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
