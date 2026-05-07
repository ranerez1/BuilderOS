---
name: 04-ux-planner
description: Produces a UX plan from a problem statement: users, journeys, IA, key screens/states, research plan, and UX acceptance criteria. Use when the user asks for a UX plan or runs /04-ux-planner.
---

# UX Planner

Turn a problem into a **design-ready plan**: what to design, what to validate, and how to measure usability and success.

## Inputs (ask only if missing)

- **Feature/initiative**: name + 1–2 lines
- **Primary user** + context of use
- **People problem** + evidence (quotes/support/analytics)
- **Constraints**: platform (web/mobile), accessibility level, brand, deadlines

## Workflow

### 1) Define users and jobs

- Primary persona + JTBD
- Secondary personas (if any)
- Success for the user (not the company)

### 2) Map the journey

- Current flow (happy path + key friction points)
- Proposed flow (steps only; no UI yet)

### 3) Information architecture & content

- Objects/entities users think in (projects, tasks, docs, etc.)
- Key terminology and labels
- Error prevention and recovery

### 4) Screen/state inventory

- Required screens / views
- Required states:
  - empty, loading, error
  - permission denied
  - first-run / onboarding (if needed)

### 5) Research/validation plan (lightweight)

- 3–5 research questions
- Proposed method (prototype test, usability test, dogfooding, etc.)
- Success criteria (task success, time-on-task, comprehension)

### 6) UX acceptance criteria

- Convert key usability expectations into testable bullets.

## Output (chat)

```markdown
## UX Plan: [initiative]

### Users & jobs
- **Primary user**:
- **JTBD**:
- Secondary users:

### Journey
#### Current flow
1. ...

#### Proposed flow (steps)
1. ...

### IA / content
- Objects & labels:
- Terminology risks:

### Screens & states
- Screens/views:
- States (empty/loading/error/etc.):

### Research / validation
- Questions:
- Method:
- Success criteria:

### UX acceptance criteria
- [ ] ...
```
