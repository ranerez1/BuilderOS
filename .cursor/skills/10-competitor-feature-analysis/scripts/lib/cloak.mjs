import { ensureBinary, getDefaultStealthArgs } from 'cloakbrowser';

/**
 * Persistent CloakBrowser context — cookies/localStorage survive across runs.
 */
export async function launchPersistentContext({ userDataDir, headless = true, viewport }) {
  const { chromium } = await import('playwright-core');
  const binaryPath = process.env.CLOAKBROWSER_BINARY_PATH || (await ensureBinary());
  return chromium.launchPersistentContext(userDataDir, {
    executablePath: binaryPath,
    headless,
    args: getDefaultStealthArgs(),
    ignoreDefaultArgs: ['--enable-automation'],
    viewport: viewport || { width: 1440, height: 900 },
  });
}
