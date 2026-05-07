---
name: 03-cto-planner
description: Reviews initiative candidates (preferably from /02-pm-planner) from a technical perspective and produces a CTO-grade plan: architecture options, dependencies, non-functional requirements, edge cases, rollout, sequencing, and engineering risks. Use when the user asks for a CTO plan or runs /03-cto-planner.
---

# CTO Planner

Turn a product initiative into a **technical strategy + execution plan** that engineering leadership can sanity-check quickly, and that helps a PM refine scope based on technical realities.

## Inputs (ask only if missing)

- **Preferred input**: paste the output of **`/02-pm-planner`** (initiative candidates + evidence + options + recommendation).
- If not available, gather:
  - **Initiative**: name + 1–2 lines
  - **Context**: why now, constraints, dependencies
  - **Non-functional needs**: latency, scale, reliability, security/compliance, data retention
  - **Target release shape**: MVP vs phased rollout

## Workflow

### 1) Translate PM intent into technical problem statements

- Restate:
  - **Outcome** (what changes for users)
  - **MVP scope** vs **non-goals**
  - **Evidence** (so we don’t overbuild)
- Identify the “technical question” behind the initiative:
  - Where does state live?
  - What are the boundaries/interfaces?
  - What must be reliable/secure?

### 2) Discover technical requirements + constraints (make them explicit)

- Summarize the **current state** (what exists today, sharp edges).
- Identify **key constraints** and **guardrails**.
  - data model/schema constraints
  - authorization/privacy constraints
  - performance/latency constraints
  - platform constraints (web/mobile/desktop)
  - integration constraints (3rd party APIs, rate limits)

### 3) Edge cases & failure modes (so scope is real)

- Enumerate the top edge cases for MVP:
  - empty states, partial state, invalid inputs
  - concurrency (multi-device, retries, offline)
  - timezone/locale formatting (if time/date involved)
  - permission denied / missing entitlements
- Enumerate failure modes:
  - network failures, API timeouts, partial writes
  - data corruption / migration mismatch
  - third-party degradation
- For each, propose an MVP handling strategy (block / degrade / recover / ignore-with-guardrail).

### 4) Architectural direction (options + decision)

- Propose **2 viable approaches**:
  - “Evolve existing system” vs “New component/service” (or equivalent)
  - Include boundaries, ownership, and main interfaces
- Make the trade-off explicit (time, risk, complexity, operability).
  - Include “buy vs build” only when it’s realistic in the constraints and timeline.

### 5) Delivery plan (phases + sequencing)

- Slice into **small, shippable phases**:
  - Phase 0: spikes / instrumentation / migrations prep
  - Phase 1: MVP
  - Phase 2: hardening + scale
- Include feature flag / rollout strategy when risk is non-trivial.
  - Include migration sequencing and backfill strategy when schema changes exist.

### 6) Engineering risk register (plus PM-facing implications)

- List top risks + mitigation:
  - migration/backcompat
  - data integrity
  - performance
  - security/privacy
  - operational burden (on-call, monitoring)
  - For each risk, include: **what the PM should change** (scope, sequencing, guardrails, comms).

### 7) Resourcing & ownership

- Identify needed roles (backend/frontend/data/infra/design/QA) and likely bottlenecks.
  - Flag dependencies that require other teams or long lead time.

## Output (chat)

```markdown
## CTO Plan: [initiative]

### PM intent (as understood)
- Outcome:
- MVP scope:
- Non-goals:
- Evidence (why this is worth doing):

### Current state
- ...

### Constraints / guardrails
- ...

### Technical requirements & edge cases (MVP)
- Requirements:
- Edge cases:
- Failure modes + handling:

### Architecture options
#### Option A
- Approach:
- Interfaces/contracts:
- Pros:
- Cons:

#### Option B
- Approach:
- Interfaces/contracts:
- Pros:
- Cons:

### Recommendation
- Decision:
- Why:
- PM implications (scope/trade-offs):

### Execution plan
- Phase 0:
- Phase 1 (MVP):
- Phase 2 (hardening):

### Rollout / risk management
- Feature flags:
- Backward compatibility:
- Rollback strategy:

### Risks & mitigations
- ...

### Resourcing / ownership
- ...
```
