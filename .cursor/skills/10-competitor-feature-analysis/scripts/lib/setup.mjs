import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SKILL_ROOT = path.resolve(__dirname, '../..');

/** CloakBrowser npm versions below this only ship linux-x64 binaries. */
export const MIN_CLOAKBROWSER_VERSION = '0.3.14';

function parseVersion(v) {
  return v.split('.').map((n) => parseInt(n, 10) || 0);
}

export function versionAtLeast(current, minimum) {
  const a = parseVersion(current);
  const b = parseVersion(minimum);
  for (let i = 0; i < Math.max(a.length, b.length); i++) {
    const x = a[i] ?? 0;
    const y = b[i] ?? 0;
    if (x > y) return true;
    if (x < y) return false;
  }
  return true;
}

export function clearProfileLock(profilePath) {
  for (const name of ['SingletonLock', 'SingletonSocket', 'SingletonCookie']) {
    try {
      fs.unlinkSync(path.join(profilePath, name));
    } catch {
      /* ignore */
    }
  }
}

export function profileHasData(profilePath) {
  if (!fs.existsSync(profilePath)) return false;
  const entries = fs.readdirSync(profilePath);
  return entries.some((e) => !e.startsWith('Singleton'));
}

/**
 * Verify cloakbrowser npm dep, download stealth binary, return binaryInfo.
 */
export async function ensureCloakBrowser({ download = true } = {}) {
  const pkgPath = path.join(SKILL_ROOT, 'node_modules/cloakbrowser/package.json');
  if (!fs.existsSync(pkgPath)) {
    throw new Error(
      'CloakBrowser not installed. Run: cd .cursor/skills/10-competitor-feature-analysis && npm install'
    );
  }
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
  const installed = pkg.version;
  if (!versionAtLeast(installed, MIN_CLOAKBROWSER_VERSION)) {
    throw new Error(
      `cloakbrowser@${installed} is too old (needs >= ${MIN_CLOAKBROWSER_VERSION} for macOS/Windows). ` +
        'Run: cd .cursor/skills/10-competitor-feature-analysis && npm install cloakbrowser@^0.3.31'
    );
  }

  const { binaryInfo, ensureBinary } = await import('cloakbrowser');
  const before = binaryInfo();

  if (download && !before.installed) {
    await ensureBinary();
  }

  const info = binaryInfo();
  if (!info.installed) {
    throw new Error(
      `CloakBrowser binary not installed for ${info.platform}. ` +
        `Run: npm run competitor-setup (from repo root). See https://cloakbrowser.dev/`
    );
  }

  return info;
}
