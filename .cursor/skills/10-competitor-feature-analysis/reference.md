# Reference — 10 Competitor Feature Analysis

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
| create | ... | ... |

[Repeat per competitor]

## Per-competitor notes

### [competitor slug]

- [Capability, scoping, UX pattern, plan gate visible in UI]
- ...

## Supplemental docs

| Competitor | Doc | URL |
|------------|-----|-----|
| | | |

## Data quality

- **Login failures:** [none | list]
- **Missing states:** [none | competitor:state]
- **Plan-gated UI:** [none | what was blocked]
- **Assumptions:** [none | list]

## Next steps (optional)

[Only when user wants to act — link to 02-pm-planner or 05-prd-to-tech-plan. Keep body neutral; no own-product recommendations here.]
```

Keep the report body **neutral** — no own-product recommendations unless user requested gap analysis (separate artifact).

---

## Navigation heuristics (`--navigate`)

When no cached Feature screens URL exists:

1. Open competitor **Login URL** from `Knowledge/competitors.md`.
2. If redirected to auth form → session expired; use headed mode for OAuth.
3. After login, use sidebar/settings search for feature keywords (e.g. "environment", "variables", "secrets").
4. Prefer **Settings → [Project/Service] → [Feature]** paths common in SaaS dashboards.
5. Capture `main` before attempting `create` / `edit` / `empty` / `error` states.
6. Do **not** perform destructive actions (delete prod resources) to reach `error` states.
7. After two failed navigation attempts, ask user for a deep link and cache in Feature screens table.

Optional: use **CloakBrowser MCP** (`browser_snapshot`, `browser_click`) when configured for complex navigation.

---

## Multi-state capture checklist

| State | Required | Notes |
|-------|----------|-------|
| `main` | Yes | Primary feature view |
| `create` | When safe | New resource form / modal |
| `edit` | When safe | Edit existing item |
| `empty` | When reachable | Zero-data state without deleting prod data |
| `error` | When reachable | Validation error without destructive ops |

---

## Value tiers (gap analysis)

| Tier | Label | Definition |
|------|-------|------------|
| P0 | Critical | Table-stakes or blocker for core workflow; competitors widely ship it |
| P1 | High | Strong expectation; meaningful conversion/retention impact |
| P2 | Medium | Differentiator or quality-of-life; not blocking |
| P3 | Lower | Nice-to-have; edge cases or power-user |

## Status values (gap analysis columns)

| Status | Meaning |
|--------|---------|
| Shipped | Available in production UI or documented as GA |
| Partial | Some scopes, plans, or flows missing |
| Gap | Competitor/own product lacks capability |
| Deferred | Explicitly postponed (PRD/TDD) |
| Not planned | Explicit non-goal |

---

## Own-product audit checklist

Before gap analysis JSON/HTML:

1. Read **Your product** slug/name from `Knowledge/competitors.md`.
2. Scan audit paths (default: `Knowledge/02-Product-Knowledge/`, `Outputs/Product PRDs/`).
3. Check active PRD **non-goals** and **out of scope** — do not mark Gap if Deferred/Not planned by intent.
4. If the repo has app code, spot-check implementation; PRD alone is not sufficient for Shipped.
5. Use `[NEED: verify in product]` when audit is inconclusive.

---

## Presentation JSON schema (comparison)

See `presentation-data.example.json`. Required fields:

- `type`: `"comparison"`
- `feature`, `featureSlug`, `date`, `runDir`
- `competitors`: string array of slugs
- `scope`: string
- `capabilities`: array of `{ name, [competitorSlug]: string }`
- `screenshots`: array of `{ competitor, state, path, url?, caption? }`
- `notes`: array of `{ competitor, bullets: string[] }`
- `docs`: array of `{ competitor, title, url }`
- `dataQuality`: `{ loginFailures, missingStates, planGated, assumptions }` (arrays)

Screenshot `path` values are **relative to run folder** (e.g. `screenshots/vercel-main.png`).

---

## Gap analysis JSON schema

See `gap-analysis.example.json`. Required fields:

- `type`: `"gap-analysis"`
- `feature`, `featureSlug`, `date`, `runDir`
- `ownProduct`: `{ slug, name }`
- `rows`: array of `{ capability, valueTier, [competitorSlug]: { status, note }, gapSummary }` plus own-product slug key
- `ownProductStrengths`: string array
- `dataQuality`: object

Optional:

- `comparisonReport`: filename in run folder
- `topSix`: array of `{ rank, capability, valueTier, communitySignal, communityUrls, productDifference }` when user asks for community/best-value ranking
- `screenshots`: thumbnail refs for HTML

Generate HTML:

```bash
npm run competitor-presentation -- \
  --data Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-gap-analysis-{date}.json
```

Link gap HTML from comparison markdown header when produced.
