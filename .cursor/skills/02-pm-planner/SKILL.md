---
name: 02-pm-planner
description: Translates discovery outputs (problems, trends, evidence) into actionable product initiatives with clear outcomes, scope, milestones, and metrics. Use when the user wants to turn discovery into an initiative plan or runs /02-pm-planner.
---

# PM Planner

Turn discovery findings into a **practical, decision-ready initiative plan** a PM can share with design/engineering before writing a full PRD.

## Inputs (ask only if missing)

- **Discovery inputs** (preferred):
  - Key trend(s) / problem statement(s)
  - Evidence snippets (quotes, record refs, counts)
  - Who/where it shows up (persona/segment/product area)
- **Initiative framing** (if already decided):
  - Initiative name + 1–2 lines
- **Constraints**: timing, platform, dependencies, compliance, stakeholders
- **Baseline + success**: current state + 1–3 measurable success signals

If the user only provides a raw idea, first restate it as a discovery-backed problem:

- People problem + evidence (required; 2–5 bullets, use `[NEED: ...]` for gaps)
- **Constraints**: timing, platform, dependencies, compliance, stakeholders
- **Baseline + success**: current state + 1–3 measurable success signals

## Workflow

### 1) Convert discovery into initiative candidates (no solution yet)

- Start from trends/problems and generate **1–3 initiative candidates** (not feature tasks).
- Translate any solution-y wording into:
  - **People Problem** (1–2 sentences)
  - **Desired outcome** (1 sentence)
- Attach **evidence** to each candidate (quotes/refs + frequency when available).
- List **assumptions** explicitly and mark unknowns with `[NEED: ...]`.

### 2) Pick the initiative shape (options + recommendation)

- Propose **2 options** for how to address the problem (MVP shapes or sequencing variants).
- Make the trade-off explicit (speed, risk, scope, UX quality, tech constraints).
- State what “must be true” for the initiative to be worth doing now.

### 3) Plan the work at “pre-PRD” fidelity

- **MVP scope** (3–8 bullets)
- **Non-goals** (3–8 bullets)
- **Milestones** (Discovery → Prototype → Build → Rollout)
- **Risks & mitigations** (product + delivery + measurement)
- **Open questions** (ranked by urgency)

### 4) Measurement & instrumentation

- Define:
  - **Primary success metric** (1)
  - **Supporting metrics** (1–3)
  - **Leading indicators** (2–5)
- Add a short **instrumentation plan** (events/properties at a high level).

## Output (chat)

Return a single markdown plan. If multiple discovery trends exist, output **up to 3** initiative candidates, then recommend one.

```markdown
## PM Plan: [initiative]

### Problem & outcome
- **People problem**:
- **Desired outcome**:
- **Evidence**:
  - [record ref] — “[…]”
  - [record ref] — “[…]”

### Users & scenarios
- **Primary user**:
- **Primary scenario**:
- Secondary scenarios:

### Scope
#### MVP (in)
- ...

#### Out (non-goals)
- ...

### Trade-offs / options
- Option A:
  - Pros:
  - Cons:
- Option B:
  - Pros:
  - Cons:
- **Recommendation**:

### Milestones
- Discovery:
- Prototype:
- Build:
- Rollout:

### Risks & mitigations
- ...

### Measurement
- **Primary metric**:
- Supporting:
- Leading indicators:
- Instrumentation notes:

### Open questions
1. ...
```
