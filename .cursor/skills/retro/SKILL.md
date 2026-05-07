---
name: retro
description: Documents a completed feature or bugfix retro by updating the relevant PRD and Technical Design Doc, and writing a durable learning note under Memory/Learnings. Use when the user says "retro", "retrospective", "postmortem", "lessons learned", "what went well/poorly", or runs /retro after shipping a feature or fixing a bug.
---

# Retro (feature / bugfix)

Capture **what we learned** from a shipped feature or bugfix and make it reusable:

- Update the relevant **PRD** (product intent) when it exists
- Update the relevant **TDD / technical plan** (technical intent + what shipped)
- Write a durable learning note in `Memory/Learnings/`

Prefer being **specific and actionable** over being exhaustive.

## Inputs (minimal; infer when possible)

Gather (ask only if missing):

- **Work item**: feature or bugfix name
- **Identifier(s)** (any that exist): ticket id, tracker item id, PR link/number, commit hash, doc slugs
- **Outcome**: shipped / reverted / partially shipped
- **Scope delta**: what changed vs original plan (if any)
- **Timeline**: start → ship date (rough)

## Find the relevant docs

### PRD

Look for:

- `Outputs/Product PRDs/*<ticketId>*`
- Any PRD file that matches the feature name/slug

If no PRD exists:

- Do **not** invent product intent.
- Create a small “retro-only” PRD addendum file:
  - `Outputs/Product PRDs/YYYY-MM-DD_<ticketId?>_<short-slug>_retro-addendum.md`

### Technical doc (TDD)

Look for:

- `Outputs/Technical Docs/*<ticketId>*`
- Any TDD file that matches the feature name/slug

If no TDD exists:

- Create one using the `technical-plan` structure in **Post-build** mode:
  - `Outputs/Technical Docs/YYYY-MM-DD_<ticketId?>_<short-slug>.md`

## Update rules (keep diffs small)

- Prefer **appending** rather than rewriting history.
- Add clearly labeled retro sections (dated) so multiple retros can accumulate.
- If reality diverged from the plan, document the **delta and the why**.

## What to write

### 1) PRD update (product-facing)

Add a section near the end:

```markdown
## Retro (YYYY-MM-DD)
- **What shipped**:
- **What didn’t ship (and why)**:
- **User impact observed**:
- **Metrics / success signals**:
- **Follow-ups**:
```

Keep “user impact” honest (what we know vs what we assume).

### 2) TDD update (engineering-facing)

In the doc’s post-build area (or append a new section), add:

```markdown
## Retro (YYYY-MM-DD)
### Delta vs plan
- ...

### Incidents / surprises
- ...

### Decisions that paid off
- ...

### Decisions we’d change next time
- ...

### Operational notes
- Observability gaps:
- Runbook updates needed:
```

### 3) Memory learning note (durable, reusable)

Write a new file:

- `Memory/Learnings/YYYY-MM-DD_<short-slug>.md`

Use this template:

```markdown
# Learning: [short title]

## Context
- **Work item**:
- **Date**: YYYY-MM-DD
- **Type**: feature | bugfix | refactor | infra
- **Stack area**: (if relevant)
- **Links**: PRs, docs, dashboards

## What went well
- ...

## What went poorly
- ...

## Root causes (if relevant)
- ...

## Changes we’ll make next time
- ...

## Checklists / heuristics
- If [condition], then [do this].
- Prefer [pattern] over [anti-pattern] because [reason].
```

Guidelines:

- Make at least **1 concrete checklist item** someone can apply in the future.
- If something was painful, record the **trigger** and the **early signal**.
- Avoid names/blame; focus on systems and process.

## Workflow

1. Resolve identifiers (ticket id / PR / commit) and compute `<short-slug>`.
2. Locate PRD + TDD; create missing docs as described above.
3. Apply the PRD retro section.
4. Apply the TDD retro section.
5. Write the Memory learning note under `Memory/Learnings/`.

## Output (to the user)

Return:

- Paths of the updated/created PRD + TDD + Memory file
- 5–10 bullets summarizing the key learnings and follow-ups

