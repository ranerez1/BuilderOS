Create a CTO-grade technical strategy + execution plan for an initiative (architecture options, sequencing, risks, rollout, and resourcing).

# CTO Planner

Turn a product initiative into a **technical strategy + execution plan** that engineering leadership can sanity-check quickly.

## Inputs (ask only if missing)

- **Initiative**: name + 1–2 lines
- **Context**: why now, constraints, dependencies
- **Non-functional needs**: latency, scale, reliability, security/compliance, data retention
- **Target release shape**: MVP vs phased rollout

## Workflow

### 1) Frame the technical problem

- Summarize the **current state** (what exists today, sharp edges).
- Identify **key constraints** and **guardrails**.

### 2) Architectural direction (options + decision)

- Propose **2 viable approaches**:
  - “Evolve existing system” vs “New component/service” (or equivalent)
  - Include boundaries, ownership, and main interfaces
- Make the trade-off explicit (time, risk, complexity, operability).

### 3) Delivery plan

- Slice into **small, shippable phases**:
  - Phase 0: spikes / instrumentation / migrations prep
  - Phase 1: MVP
  - Phase 2: hardening + scale
- Include feature flag / rollout strategy when risk is non-trivial.

### 4) Engineering risk register

- List top risks + mitigation:
  - migration/backcompat
  - data integrity
  - performance
  - security/privacy
  - operational burden (on-call, monitoring)

### 5) Resourcing & ownership

- Identify needed roles (backend/frontend/data/infra/design/QA) and likely bottlenecks.

## Output (chat)

```markdown
## CTO Plan: [initiative]

### Current state
- ...

### Constraints / guardrails
- ...

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
