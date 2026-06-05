---
name: 10-competitor-feature-analysis
description: Captures logged-in competitor product UI via CloakBrowser, compares a specific feature across competitors from Knowledge/competitors.md, saves screenshots and a neutral comparison report under Outputs/competitor-research/, and generates HTML presentations plus optional value-ranked gap analysis. Use when the user runs /10-competitor-feature-analysis, asks to compare a competitor feature, product research with screenshots, gap analysis, or analyze how competitors implement a capability.
disable-model-invocation: true
---

# 10 Competitor Feature Analysis

## Role

Neutral product researcher: compare one **feature** across competitors using logged-in UI (screenshots) plus public docs when needed.

## Quick start

1. **Gate:** `Knowledge/competitors.md` complete (no `[FILL]`, login URLs, ≥1 competitor). Else show template and **stop**.
2. Confirm competitor(s) + feature; create `Outputs/competitor-research/{feature-slug}-{YYYY-MM-DD}/`.
3. **Setup & auth** (first run / new machine) — then capture → report → JSON/HTML → update Feature screens on successful `main`.
4. Gap analysis only when user asks for own-product comparison or value ranking.

## Setup & auth

```bash
cd .cursor/skills/10-competitor-feature-analysis && npm install && cd ../../../
npm run competitor-setup    # installs CloakBrowser binary (~/.cloakbrowser/)
npm run competitor-login -- --competitor <slug> --verify "<app-url>"   # per competitor, once
```

- Sessions live in `.cloak-profiles/{slug}/` (gitignored). **Login must run in the user's interactive terminal** (Enter after OAuth) — not agent background shells.
- Captures are **headless only**. Exit **2** (`auth_required`) → give user the `competitor-login` command; wait for confirmation before retrying.
- Troubleshooting: [reference.md](reference.md#troubleshooting)

## Capture

Per competitor: `competitor-setup` shows `hasProfileData` → use cached URL from Feature screens or `--navigate`.

```bash
npm run competitor-screenshot -- \
  --competitor <slug> --feature "<name>" \
  --run-dir Outputs/competitor-research/<feature-slug>-<date> \
  --state main --url "<deep-link>"
```

States: `main` (required), then `create` / `edit` / `empty` / `error` when safe (no destructive ops). Optional: CloakBrowser MCP for complex `--navigate`. **Capture extra states when safe** — each becomes a numbered step in the competitor's flow storyboard (ordered `main → empty → create → edit → error`).

## Analysis

Inspect screenshots; add public docs when UI is unclear. Report stays **neutral** (no own-product recs). Navigation fails twice → ask for deep link, cache in `Knowledge/competitors.md`. Template: [reference.md](reference.md#comparison-report-template).

Write **3–5 key insights** (synthesized, neutral takeaways) and a one-line **summary** for the report hero. Keep comparison cells starting with `Yes`/`No`/`Partial`/`Pro`/`[NEED: …]` so they render as badges.

## Presentation

1. Write `{feature-slug}-comparison-{date}.json` (schema: `presentation-data.example.json`) — include `summary`, `keyInsights`, and optional `flows`. Omit `flows` to auto-group screenshots into per-competitor storyboards.
2. `npm run competitor-presentation -- --data Outputs/competitor-research/.../....json`
3. Open the HTML; verify hero, key insights, badge table, and flow storyboards render (screenshot paths relative to run folder).

## Gap analysis

After neutral comparison: audit own product ([checklist](reference.md#own-product-audit-checklist)), write `{feature-slug}-gap-analysis-{date}.json` (`gap-analysis.example.json`), tiers P0–P3, status `Shipped|Partial|Gap|Deferred|Not planned`. Same `competitor-presentation` command. Link gap HTML from comparison header.

## Outputs

| Artifact | Path |
|----------|------|
| Screenshots | `{run-dir}/screenshots/{competitor}-{state}.png` |
| Report / JSON / HTML | `{run-dir}/{feature-slug}-comparison-{date}.{md,json,html}` |
| Gap (optional) | `{run-dir}/{feature-slug}-gap-analysis-{date}.{json,html}` |
| Cache update | Feature screens row after successful `main` |

Kebab-case paths. Include **Data quality** (login failures, missing states, plan gates, assumptions). The HTML report leads with a hero + **key insights**, then the **comparison table** (badged cells), then per-competitor **flow storyboards**.

## Reference

Templates, navigation heuristics, multi-state checklist, JSON fields, value tiers, `competitors.md` gate template: [reference.md](reference.md).
