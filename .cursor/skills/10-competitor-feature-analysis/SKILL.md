---
name: 10-competitor-feature-analysis
description: Captures logged-in competitor product UI via CloakBrowser, compares a specific feature across competitors from Knowledge/competitors.md, saves screenshots and a neutral comparison report under Outputs/competitor-research/, and generates HTML presentations plus optional value-ranked gap analysis. Use when the user runs /10-competitor-feature-analysis, asks to compare a competitor feature, product research with screenshots, gap analysis, or analyze how competitors implement a capability.
disable-model-invocation: true
---

# 10 Competitor Feature Analysis

## Role

Act as a **neutral product researcher**. Compare how competitors implement a **specific feature** using logged-in product UI (screenshots as evidence) plus public docs when the UI is unclear.

## Quick Start

When invoked:

1. **Gate:** verify `Knowledge/competitors.md` is complete (no `[FILL]`, valid Login URLs, at least one competitor row). If missing or incomplete → create/show template and **stop** until user fills it.
2. Confirm **competitor(s)** and **feature** to analyze.
3. Create run folder: `Outputs/competitor-research/{feature-slug}-{YYYY-MM-DD}/`.
4. Read Feature screens table in `Knowledge/competitors.md` for cached URLs.
5. Capture screenshots per competitor using CloakBrowser (see [Capture workflow](#capture-workflow)).
6. Write neutral comparison report using template in [reference.md](reference.md).
7. Write comparison JSON and generate HTML (see [Presentation workflow](#presentation-workflow)).
8. When user wants own-product comparison or value ranking: run [Gap analysis workflow](#gap-analysis-workflow).
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

## Analysis workflow

1. Inspect screenshots; note capabilities, scoping, UX patterns, and plan gates visible in UI.
2. Supplement with **public docs** when UI is unclear or plan-gated (cite URLs).
3. If navigation fails twice, ask user for a deep link and cache in `Knowledge/competitors.md`.
4. Save report using template in [reference.md](reference.md).
5. Keep report **neutral** — no own-product recommendations in the body.
6. Add **Next steps (optional)** footer only when user wants to act (`02-pm-planner`, `05-prd-to-tech-plan`).

## Presentation workflow

After markdown report is complete:

1. Create `{feature-slug}-comparison-{YYYY-MM-DD}.json` in the run folder using [presentation-data.example.json](presentation-data.example.json) as schema. Mirror markdown content.
2. Generate HTML:

```bash
npm run competitor-presentation -- \
  --data Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-comparison-{date}.json
```

3. Open output HTML locally; verify screenshots render (paths relative to run folder).
4. Optional: `--output` for custom path.

HTML is self-contained (embedded CSS), works offline: scope, capability table, screenshot gallery, notes, docs, data quality.

## Gap analysis workflow

Run when user asks how competitors compare **to own product**, wants features **ranked by value**, or requests a gap table.

1. Complete neutral comparison (markdown + JSON + HTML) first.
2. Audit own product using checklist in [reference.md](reference.md#own-product-audit-checklist).
3. Write `{feature-slug}-gap-analysis-{YYYY-MM-DD}.json` using [gap-analysis.example.json](gap-analysis.example.json). Set `"type": "gap-analysis"`.
4. Assign value tier per row: `P0` Critical, `P1` High, `P2` Medium, `P3` Lower.
5. Per row: each competitor + own-product slug with `status` (`Shipped` | `Partial` | `Gap` | `Deferred` | `Not planned`) and `gapSummary`.
6. When user asks for **best value** or **community ranking**: add `topSix` array (see reference.md).
7. Generate HTML:

```bash
npm run competitor-presentation -- \
  --data Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-gap-analysis-{date}.json
```

8. Link gap HTML from neutral comparison markdown header.

Keep neutral report body free of own-product recommendations; gap HTML holds status and gap notes.

## Output requirements

Every run must produce:

- PNGs under `{run-dir}/screenshots/` named `{competitor}-{state}.png`
- Report: `{run-dir}/{feature-slug}-comparison-{date}.md`
- JSON: `{run-dir}/{feature-slug}-comparison-{date}.json`
- HTML: `{run-dir}/{feature-slug}-comparison-{date}.html`
- **Gap analysis (when requested):** JSON + HTML in same run folder
- Updated **Feature screens** URL in `Knowledge/competitors.md` when `main` capture succeeds

Include **Data quality** section for login failures, missing states, plan-gated UI, and assumptions.

All folder and path segments use **kebab-case with no whitespace**.

## Additional reference

Report template, navigation heuristics, multi-state checklist, JSON schemas, value tiers, own-product audit checklist: [reference.md](reference.md).
