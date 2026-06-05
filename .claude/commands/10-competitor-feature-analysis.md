Captures logged-in competitor product UI via CloakBrowser, compares a specific feature across competitors from Knowledge/competitors.md, saves screenshots and a neutral comparison report under Outputs/competitor-research/, and generates HTML presentations plus optional value-ranked gap analysis.

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

### Troubleshooting

| Symptom | Fix |
|---------|-----|
| Binary / platform error (macOS) | `npm install` in skill folder + `npm run competitor-setup` |
| Login page in screenshot | `competitor-login` in interactive terminal |
| SPA spinner / splash | Webapp `--url`; scripts use `settlePage()` |
| Browser won't start | Kill hung login; re-run login/setup |
| Login hangs in agent | User runs login locally |

## Capture

Per competitor: `competitor-setup` shows `hasProfileData` → use cached URL from Feature screens or `--navigate`.

```bash
npm run competitor-screenshot -- \
  --competitor <slug> --feature "<name>" \
  --run-dir Outputs/competitor-research/<feature-slug>-<date> \
  --state main --url "<deep-link>"
```

States: `main` (required), then `create` / `edit` / `empty` / `error` when safe. Optional: CloakBrowser MCP for complex `--navigate`.

**Navigate:** Login URL → auth wall → `competitor-login` → search settings for feature → cache deep link after 2 failures.

## Analysis

Inspect screenshots; add public docs when UI is unclear. Report stays **neutral**. Template below.

## Comparison report template

`Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-comparison-{date}.md`

```markdown
# Competitor comparison: [Feature name]

> **Date:** YYYY-MM-DD | **Competitors:** [slugs] | **Run:** Outputs/competitor-research/{feature-slug}-{date}/

## Scope
[One paragraph]

## Capability comparison
| Capability | [competitor-a] | [competitor-b] |
| [row] | | |

## Screenshots
### [slug]
| State | Screenshot | URL |
| main | ![main](screenshots/{competitor}-main.png) | [url] |

## Per-competitor notes
### [slug]
- [Notes from UI]

## Supplemental docs
| Competitor | Doc | URL |

## Data quality
- **Login failures:** · **Missing states:** · **Plan-gated UI:** · **Assumptions:**

## Next steps (optional)
[02-pm-planner / 05-prd-to-tech-plan if user wants to act]
```

## Presentation

1. `{feature-slug}-comparison-{date}.json` — `type: comparison`, `feature`, `featureSlug`, `date`, `runDir`, `competitors`, `scope`, `capabilities`, `screenshots` (paths relative to run dir), `notes`, `docs`, `dataQuality`.
2. `npm run competitor-presentation -- --data Outputs/competitor-research/.../....json`

## Gap analysis

After neutral comparison: audit own product (`Knowledge/competitors.md` slug, audit paths, PRD non-goals, spot-check code). Write `{feature-slug}-gap-analysis-{date}.json` — tiers P0–P3, status `Shipped|Partial|Gap|Deferred|Not planned`. Optional `topSix` for value ranking. Same presentation command. Link gap HTML from comparison header.

## Outputs

- `{run-dir}/screenshots/{competitor}-{state}.png`
- `{run-dir}/{feature-slug}-comparison-{date}.{md,json,html}`
- Gap JSON/HTML when requested
- Update Feature screens after successful `main`

Kebab-case paths. Include **Data quality** section.

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
| [FILL] | | | |

## Feature screens (cached deep links)
| Competitor slug | Feature | Cached URL | Last verified |
```
