# Reference — 10 Competitor Feature Analysis

## Knowledge/competitors.md gate template

If missing or contains `[FILL]`, create and stop until user fills:

```markdown
# Competitors
## Your product
- **Slug**: [FILL] · **Name**: [FILL] · **Login URL**: [FILL]
- **Audit paths**: Knowledge/02-Product-Knowledge/, Outputs/Product PRDs/
## Competitors
| Slug | Name | Login URL | Notes |
## Feature screens (cached deep links)
| Competitor slug | Feature | Cached URL | Last verified |
```

---

## Comparison report template

Save to `Outputs/competitor-research/{feature-slug}-{date}/{feature-slug}-comparison-{date}.md`.

```markdown
# Competitor comparison: [Feature name]

> **Date:** YYYY-MM-DD | **Competitors:** [slugs] | **Run:** Outputs/competitor-research/{feature-slug}-{date}/

## Summary

[One or two sentences — the headline takeaway across competitors. Powers the HTML hero deck.]

## Scope

[One paragraph: capability + scope — project, service, org, etc.]

## Key insights

[3–5 synthesized takeaways, numbered. Each = a short bold claim + one sentence of evidence; tag a competitor when the insight is about one. Still neutral — no own-product recs.]

1. **[Claim]** — [evidence]. _(competitor)_
2. **[Claim]** — [evidence].

## Capability comparison

| Capability | [competitor-a] | [competitor-b] |
|------------|----------------|----------------|
| [row] | | |

> Cells starting with `Yes` / `No` / `Partial` / `Pro` / `[NEED: …]` render as colored badges in the HTML; keep the leading token consistent.

## Flows

Per competitor, an ordered storyboard of states (`main → empty → create → edit`). The HTML auto-groups screenshots by competitor in this order; capturing more states yields richer flows.

### [competitor slug] — [what the flow accomplishes]

| Step | State | Screenshot | Caption |
|------|-------|------------|---------|
| 1 | main | ![main](screenshots/{competitor}-main.png) | [what the user sees] |
| 2 | create | ![create](screenshots/{competitor}-create.png) | [next step] |

## Per-competitor notes

### [competitor slug]

- [Capability, UX, plan gates from UI]

## Supplemental docs

| Competitor | Doc | URL |
|------------|-----|-----|

## Data quality

- **Login failures:** [none | list]
- **Missing states:** [none | competitor:state]
- **Plan-gated UI:** [none | detail]
- **Assumptions:** [none | list]

## Next steps (optional)

[Only if user wants to act — 02-pm-planner / 05-prd-to-tech-plan. Body stays neutral.]
```

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| Binary / platform error (macOS) | `npm install` in skill folder + `npm run competitor-setup` (needs `cloakbrowser@^0.3.31`) |
| Login page or marketing site in PNG | `npm run competitor-login` in **interactive** terminal |
| SPA spinner / splash / load error | Use webapp `--url`; scripts run `settlePage()` after `domcontentloaded` |
| Browser won't start | Kill hung login; re-run login/setup (clears `SingletonLock`) |
| Login hangs in agent | User runs `competitor-login` locally — stdin Enter required |
| `auth_required` (exit 2) | Same as login page row |

---

## Navigation (`--navigate`)

No cached URL: open Login URL → if auth wall, `competitor-login` → search settings/sidebar for feature keywords → capture `main` first → ask user for deep link after 2 failures → cache in Feature screens. No destructive ops for `error` state. Optional: CloakBrowser MCP.

---

## Multi-state capture

| State | When |
|-------|------|
| `main` | Always |
| `create` / `edit` | When safely reachable |
| `empty` / `error` | When reachable without deleting prod data |

Capture extra states when safe — each becomes a numbered step in the competitor's flow storyboard (ordered `main → empty → create → edit → error`). A single `main` still renders; more states = a richer flow.

---

## Gap analysis enums

**Tiers:** P0 Critical · P1 High · P2 Medium · P3 Lower

**Status:** Shipped · Partial · Gap · Deferred · Not planned

---

## Own-product audit checklist

1. Your product slug/name from `Knowledge/competitors.md`.
2. Scan audit paths (default: `Knowledge/02-Product-Knowledge/`, `Outputs/Product PRDs/`).
3. Respect PRD non-goals — don't mark Gap if Deferred/Not planned by intent.
4. Spot-check app code for Shipped; PRD alone insufficient.
5. Use `[NEED: verify in product]` when inconclusive.

---

## JSON schemas

**Comparison** — see `presentation-data.example.json`: `type`, `feature`, `featureSlug`, `date`, `runDir`, `competitors`, `scope`, `capabilities`, `screenshots` (paths relative to run dir), `notes`, `docs`, `dataQuality`. Report-quality fields:
- `summary` — one/two-sentence headline; renders as the hero deck.
- `keyInsights` — `[{ title, detail, competitor? }]`; numbered editorial list. `competitor` colors the tag to that competitor's accent.
- `flows` — `[{ competitor, label?, steps: [{ state, path, caption, url? }] }]`; explicit storyboards. **Optional** — if omitted, the HTML auto-groups `screenshots` by competitor in canonical state order (`main, empty, create, edit, error`). Provide `flows` when you want custom step order, labels, or captions.

Cell badges: a capability cell whose first token is `Yes`/`No`/`None`/`Not`/`Partial`/`Pro`/`Business`/`Premium`, or that contains `[NEED: …]`, renders as a colored pill plus the remaining text.

**Gap analysis** — see `gap-analysis.example.json`: `type: gap-analysis`, `ownProduct`, `rows` (capability, valueTier, per-slug `{ status, note }`, `gapSummary`), `ownProductStrengths`, `dataQuality`. Optional: `summary`, `keyInsights`, `topSix`, `screenshots`, `comparisonReport`.

```bash
npm run competitor-presentation -- --data Outputs/competitor-research/{feature-slug}-{date}/{artifact}.json
```
