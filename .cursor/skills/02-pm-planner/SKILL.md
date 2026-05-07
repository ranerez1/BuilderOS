---
name: 02-pm-planner
description: Turns a raw idea/backlog item into a crisp PM plan (problem, outcomes, scope, risks, milestones, and metrics). Use when the user asks for a PM plan or runs /02-pm-planner.
---

# PM Planner

Create a **practical plan** a PM can share with design/engineering to align on direction before writing a full PRD.

## Inputs (ask only if missing)

- **What are we planning?** (feature/initiative name + 1–2 lines)
- **Target user + scenario** (who, when, why)
- **People problem + evidence** (required; 2–5 bullets, use `[NEED: ...]` for gaps)
- **Constraints**: timing, platform, dependencies, compliance, stakeholders
- **Baseline + success**: current state + 1–3 measurable success signals

## Workflow

### 1) Clarify the problem (no solution yet)

- Translate any solution-y wording into:
  - **People Problem** (1–2 sentences)
  - **Desired outcome** (1 sentence)
- List **assumptions** explicitly and mark unknowns with `[NEED: ...]`.

### 2) Define the decision you need

- What decision do we need from the team? (ship vs not, MVP shape, sequencing, trade-offs)
- What “must be true” for this to succeed?

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

Return a single markdown plan using this template:

```markdown
## PM Plan: [initiative]

### Problem & outcome
- **People problem**:
- **Desired outcome**:
- **Evidence**:

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
