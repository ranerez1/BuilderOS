#!/usr/bin/env node
/**
 * Capture competitor feature screenshots via CloakBrowser persistent profiles.
 */
import fs from 'node:fs';
import path from 'node:path';
import {
  findRepoRoot,
  defaultRunDir,
  competitorsPath,
  profilesDir,
  ensureDir,
  parseArgs,
  todayISO,
} from './lib/paths.mjs';
import {
  loadCompetitors,
  getCachedFeatureUrl,
  validateCompetitorsConfig,
} from './lib/competitors.mjs';
import { launchPersistentContext } from './lib/cloak.mjs';

const VALID_STATES = new Set(['main', 'create', 'edit', 'empty', 'error']);

function printHelp() {
  console.log(`Usage: competitor-screenshot [options]

Options:
  --competitor <slug>   Competitor slug from Knowledge/competitors.md (required)
  --feature <name>      Feature name (required)
  --state <state>       main | create | edit | empty | error (default: main)
  --run-dir <path>      Output run folder (default: Outputs/competitor-research/{feature-slug}-{date}/)
  --url <deep-link>     Navigate directly to feature URL
  --navigate            Start from Login URL (use when no cached URL)
  --headed              Force headed browser (OAuth / manual login)
  --help                Show this help
`);
}

async function isLoginPage(page) {
  const url = page.url();
  if (/login|signin|sign-in|auth|oauth/i.test(url)) return true;
  const passwordField = await page.locator('input[type="password"]').count();
  return passwordField > 0;
}

async function captureScreenshot({ repoRoot, competitor, feature, state, runDir, url, navigate, headed }) {
  const config = loadCompetitors(competitorsPath(repoRoot));
  validateCompetitorsConfig(config);

  const entry = config.competitors[competitor];
  if (!entry) {
    throw new Error(`Unknown competitor "${competitor}". Add it to Knowledge/competitors.md.`);
  }

  const cached = getCachedFeatureUrl(config.featureScreens, competitor, feature);
  const targetUrl = url || cached;
  const loginUrl = entry.loginUrl;

  if (!targetUrl && !navigate) {
    throw new Error(
      `No --url, no cached Feature screens URL, and --navigate not set for ${competitor} / "${feature}".`
    );
  }

  const screenshotsDir = path.join(runDir, 'screenshots');
  ensureDir(screenshotsDir);
  const screenshotPath = path.join(screenshotsDir, `${competitor}-${state}.png`);
  const profilePath = profilesDir(repoRoot, competitor);
  ensureDir(profilePath);

  let browserMode = headed ? 'headed' : 'headless';
  const headless = !headed;

  let context;
  try {
    context = await launchPersistentContext({
      userDataDir: profilePath,
      headless,
      viewport: { width: 1440, height: 900 },
    });
    const page = context.pages()[0] || (await context.newPage());

    if (navigate && !targetUrl) {
      await page.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });
      if (await isLoginPage(page)) {
        await context.close();
        if (!headed) {
          console.error(
            JSON.stringify({
              status: 'auth_required',
              message: `Session missing for ${competitor}. Re-run with --headed to complete OAuth.`,
              competitor,
            })
          );
          process.exit(2);
        }
        console.error(`Complete login for ${competitor} in the browser window, then press Enter...`);
        await new Promise((resolve) => {
          process.stdin.once('data', resolve);
        });
        context = await launchPersistentContext({
          userDataDir: profilePath,
          headless: false,
          viewport: { width: 1440, height: 900 },
        });
        const retryPage = context.pages()[0] || (await context.newPage());
        await retryPage.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });
        browserMode = 'headed-auth';
        await context.close();
        context = await launchPersistentContext({
          userDataDir: profilePath,
          headless: true,
          viewport: { width: 1440, height: 900 },
        });
        const finalPage = context.pages()[0] || (await context.newPage());
        await finalPage.goto(loginUrl, { waitUntil: 'networkidle', timeout: 60000 });
        if (await isLoginPage(finalPage)) {
          throw new Error(`Still on login page after headed auth for ${competitor}.`);
        }
        console.error(
          JSON.stringify({
            status: 'auth_complete',
            message: `Auth saved for ${competitor}. Re-run without --headed to capture.`,
            competitor,
          })
        );
        await context.close();
        process.exit(0);
      }
      throw new Error(
        `--navigate without --url only verifies login for ${competitor}. Provide --url or cache Feature screens URL, or use agent navigation.`
      );
    }

    const page2 = context.pages()[0] || (await context.newPage());
    await page2.goto(targetUrl, { waitUntil: 'networkidle', timeout: 90000 });

    if (await isLoginPage(page2)) {
      await context.close();
      console.error(
        JSON.stringify({
          status: 'auth_required',
          message: `Session expired for ${competitor}. Re-run with --headed.`,
          competitor,
          url: page2.url(),
        })
      );
      process.exit(2);
    }

    await page2.screenshot({ path: screenshotPath, fullPage: false });
    const finalUrl = page2.url();

    const result = {
      url: finalUrl,
      screenshotPath: path.relative(repoRoot, screenshotPath),
      browserMode,
      competitor,
      feature,
      state,
      runDir: path.relative(repoRoot, runDir),
    };
    console.log(JSON.stringify(result, null, 2));
    return result;
  } finally {
    if (context) await context.close();
  }
}

async function main() {
  const { args } = parseArgs(process.argv.slice(2));
  if (args.help) {
    printHelp();
    process.exit(0);
  }

  const competitor = args.competitor;
  const feature = args.feature;
  const state = args.state || 'main';

  if (!competitor || !feature) {
    printHelp();
    process.exit(1);
  }
  if (!VALID_STATES.has(state)) {
    throw new Error(`Invalid --state "${state}". Use: ${[...VALID_STATES].join(', ')}`);
  }

  const repoRoot = findRepoRoot();
  const date = todayISO();
  const runDir = args['run-dir']
    ? path.isAbsolute(args['run-dir'])
      ? args['run-dir']
      : path.join(repoRoot, args['run-dir'])
    : defaultRunDir(repoRoot, feature, date);

  ensureDir(runDir);

  await captureScreenshot({
    repoRoot,
    competitor,
    feature,
    state,
    runDir,
    url: args.url,
    navigate: Boolean(args.navigate),
    headed: Boolean(args.headed),
  });
}

main().catch((err) => {
  console.error(err.message || err);
  process.exit(1);
});
