import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Repo root: four levels up from scripts/lib/ */
export function findRepoRoot() {
  return path.resolve(__dirname, '../../../../..');
}

export function slugify(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

export function defaultRunDir(repoRoot, feature, date = todayISO()) {
  const featureSlug = slugify(feature);
  return path.join(repoRoot, 'Outputs', 'competitor-research', `${featureSlug}-${date}`);
}

export function competitorsPath(repoRoot) {
  return path.join(repoRoot, 'Knowledge', 'competitors.md');
}

export function profilesDir(repoRoot, competitorSlug) {
  return path.join(repoRoot, '.cloak-profiles', competitorSlug);
}

export function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

export function parseArgs(argv) {
  const args = {};
  const positional = [];
  for (let i = 0; i < argv.length; i++) {
    const token = argv[i];
    if (token.startsWith('--')) {
      const key = token.slice(2);
      const next = argv[i + 1];
      if (next !== undefined && !next.startsWith('--')) {
        args[key] = next;
        i++;
      } else {
        args[key] = true;
      }
    } else {
      positional.push(token);
    }
  }
  return { args, positional };
}
