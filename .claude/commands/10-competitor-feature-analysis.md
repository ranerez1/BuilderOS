Captures logged-in competitor product UI via CloakBrowser, compares a specific feature across competitors from Knowledge/competitors.md, saves screenshots and a neutral comparison report under Outputs/competitor-research/, and generates HTML presentations plus optional value-ranked gap analysis.

# 10 Competitor Feature Analysis

## Role

Act as a **neutral product researcher**. Compare how competitors implement a **specific feature** using logged-in product UI (screenshots as evidence) plus public docs when the UI is unclear.

## Quick Start

When invoked:

1. **Gate:** verify `Knowledge/competitors.md` is complete (no `[FILL]`, valid Login URLs, at least one competitor row). If missing or incomplete → create/show template and **stop** until user fills it.
2. Confirm **competitor(s)** and **feature** to analyze.
3. Create run folder: `Outputs/competitor-research/{feature-slug}-{YYYY-MM-DD}/`.
4. Read Feature screens table in `Knowledge/competitors.md` for cached URLs.
5. Capture screenshots per competitor using CloakBrowser (see Capture workflow).
6. Write neutral comparison report using Comparison report template below.
7. Write comparison JSON and generate HTML (see Presentation workflow).
8. When user wants own-product comparison or value ranking: run Gap analysis workflow.
9. Update `Knowledge/competitors.md` Feature screens after successful `main` capture.

**One-time setup:** `cd .cursor/skills/10-competitor-feature-analysis && npm install`

## Inputs

| Input | Required | Notes |
| --- | --- | --- |
| Competitor(s) | Yes | Slugs from `Knowledge/competitors.md` |
| Feature name | Yes | e.g. "environment variables", "deploy logs" |
| Project context | No | Helps navigation when dashboards have many projects |

## Capture workflow

For **each** competitor:

1. Check **Feature screens** in `Knowledge/competitors.md` for a cached URL.
2. Run the screenshot script (headless by default; headed only for first login or expired OAuth):

```bash
npm run competitor-screenshot -- \
  --competitor competitor-a \
  --feature "environment variables" \
  --run-dir Outputs/competitor-research/environment-variables-2026-06-05 \
  --state main \
  --url "https://example.com/.../settings/environment-variables"

# Or navigate from login when no cached URL:
npm run competitor-screenshot -- \
  --competitor competitor-a \
  --feature "environment variables" \
  --state main \
  --navigate
```

3. Capture **multi-state** screenshots from the same feature URL:
   - `main` (required)
   - `create` or `edit` when safely reachable
   - `empty`, `error` when reachable without destructive actions
4. Repeat `--state` runs; script prints JSON with `url`, `screenshotPath`, `browserMode`.
5. After successful `main` capture, update the competitor's **Feature screens** row.

**Browser policy:** headless for probe, navigation, and screenshots. If session is missing or expired, script relaunches **headed** for manual OAuth, then resumes headless. Never store credentials in the repo. Profiles live in `.cloak-profiles/{competitor-slug}/` (gitignored).

**Optional:** CloakBrowser MCP for agent-driven navigation when `--navigate` is insufficient.

### Navigation heuristics (`--navigate`)

When no cached Feature screens URL exists:

1. Open competitor **Login URL** from `Knowledge/competitors.md`.
2. If redirected to auth form → session expired; use headed mode for OAuth.
3. After login, use sidebar/settings search for feature keywords (e.g. "environment", "variables", "secrets").
4. Prefer **Settings → [Project/Service] → [Feature]** paths common in SaaS dashboards.
5. Capture `main` before attempting `create` / `edit` / `empty` / `error` states.
6. Do **not** perform destructive actions (delete prod resources) to reach `error` states.
7. After two failed navigation attempts, ask user for a deep link and cache in Feature screens table.

### Multi-state capture checklist

| State | Required | Notes |
|-------|----------|-------|
| `main` | Yes | Primary feature view |
| `create` | When safe | New resource form / modal |
| `edit` | When safe | Edit existing item |
| `empty` | When reachable | Zero-data state without deleting prod data |
| `error` | When reachable | Validation error without destructive ops |

## Analysis workflow

1. Inspect screenshots; note capabilities, scoping, UX patterns, and plan gates visible in UI.
2. Supplement with **public docs** when UI is unclear or plan-gated (cite URLs).
3. If navigation fails twice, ask user for a deep link and cache in `Knowledge/competitors.md`.
4. Save report using Comparison report template below.
5. Keep report **neutral** — no own-product recommendations in the body.
6. Add **Next steps (optional)** footer only when user wants to act (`02-pm-planner`, `05-prd-to-tech-plan`).

## Comparison report template

Save to `Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-comparison-{date}.md`.

```markdown
# Competitor comparison: [Feature name]

> **Date:** YYYY-MM-DD
> **Competitors:** [slug list]
> **Run folder:** Outputs/competitor-research/{feature-slug}-{date}/

## Scope

[One paragraph: what feature capability is being compared and at what scope — project, service, org, etc.]

## Capability comparison

| Capability | [competitor-a] | [competitor-b] | ... |
|------------|----------------|----------------|-----|
| [row] | | | |

## Screenshots

### [competitor slug]

| State | Screenshot | URL captured |
|-------|------------|--------------|
| main | ![main](screenshots/{competitor}-main.png) | [url] |

## Per-competitor notes

### [competitor slug]

- [Capability, scoping, UX pattern, plan gate visible in UI]

## Supplemental docs

| Competitor | Doc | URL |
|------------|-----|-----|

## Data quality

- **Login failures:** [none | list]
- **Missing states:** [none | competitor:state]
- **Plan-gated UI:** [none | what was blocked]
- **Assumptions:** [none | list]

## Next steps (optional)

[Only when user wants to act — link to 02-pm-planner or 05-prd-to-tech-plan. Keep body neutral.]
```

## Presentation workflow

After markdown report is complete:

1. Create `{feature-slug}-comparison-{YYYY-MM-DD}.json` in the run folder. Required fields:
   - `type`: `"comparison"`
   - `feature`, `featureSlug`, `date`, `runDir`
   - `competitors`: string array of slugs
   - `scope`, `capabilities`, `screenshots`, `notes`, `docs`, `dataQuality`
   - Screenshot paths relative to run folder (e.g. `screenshots/competitor-a-main.png`)
2. Generate HTML:

```bash
npm run competitor-presentation -- \
  --data Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-comparison-{date}.json
```

3. Open output HTML locally; verify screenshots render.
4. Optional: `--output` for custom path.

## Gap analysis workflow

Run when user asks how competitors compare **to own product**, wants features **ranked by value**, or requests a gap table.

1. Complete neutral comparison (markdown + JSON + HTML) first.
2. Audit own product:
   - Read **Your product** slug/name from `Knowledge/competitors.md`
   - Scan audit paths (default: `Knowledge/02-Product-Knowledge/`, `Outputs/Product PRDs/`)
   - Check PRD non-goals — do not mark Gap if Deferred/Not planned by intent
   - Spot-check app code if repo has implementation; PRD alone is not sufficient for Shipped
3. Write `{feature-slug}-gap-analysis-{YYYY-MM-DD}.json` with `"type": "gap-analysis"`.
4. Value tiers: `P0` Critical, `P1` High, `P2` Medium, `P3` Lower.
5. Status per cell: `Shipped` | `Partial` | `Gap` | `Deferred` | `Not planned`.
6. Optional `topSix` when user asks for community/best-value ranking.
7. Generate HTML:

```bash
npm run competitor-presentation -- \
  --data Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-gap-analysis-{date}.json
```

8. Link gap HTML from neutral comparison markdown header.

## Output requirements

Every run must produce:

- PNGs under `{run-dir}/screenshots/` named `{competitor}-{state}.png`
- Report, JSON, HTML in `{run-dir}/`
- Gap JSON/HTML (optional) in same run folder
- Updated Feature screens URL in `Knowledge/competitors.md` when `main` capture succeeds

All folder and path segments use **kebab-case with no whitespace**.

## Knowledge/competitors.md template

If missing, create and stop until user fills:

```markdown
# Competitors

## Your product
- **Slug**: [FILL]
- **Name**: [FILL]
- **Login URL**: [FILL]
- **Audit paths**: Knowledge/02-Product-Knowledge/, Outputs/Product PRDs/

## Competitors

| Slug | Name | Login URL | Notes |
|------|------|-----------|-------|
| [FILL] | | | |

## Feature screens (cached deep links)

| Competitor slug | Feature | Cached URL | Last verified |
|-----------------|---------|------------|---------------|
```
