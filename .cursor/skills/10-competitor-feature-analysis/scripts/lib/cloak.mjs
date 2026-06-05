import { launchPersistentContext as cloakLaunchPersistentContext } from 'cloakbrowser';

/**
 * Persistent CloakBrowser context — cookies/localStorage survive across runs.
 */
export async function launchPersistentContext({ userDataDir, headless = true, viewport }) {
  return cloakLaunchPersistentContext({
    userDataDir,
    headless,
    viewport: viewport || { width: 1440, height: 900 },
    humanize: true,
  });
}
