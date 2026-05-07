---
name: 07-prototype-to-jira-ticket
description: Converts a prototype (Figma/screenshots/spec notes) into a Jira-ready ticket: summary, context, requirements, acceptance criteria, subtasks, and QA notes. Use when the user asks to turn a prototype into a Jira ticket or runs /07-prototype-to-jira-ticket.
---

# Prototype → Jira ticket

Convert a prototype into an **implementation ticket** that engineering can pick up with minimal back-and-forth.

## Inputs

Use what the user provides (links, screenshots, notes). Ask only if missing:

- **Prototype link** (Figma, screenshots, Loom)
- **Target platform** (web/mobile) + scope boundaries
- **Dependencies** (API, data, auth, feature flag)
- **Analytics needs** (events, tracking plan)

## Workflow

### 1) Extract requirements from the prototype

- Identify:
  - user goal
  - screens/components
  - states (empty/loading/error)
  - permissions/roles
  - data inputs/outputs
  - edge cases

### 2) Write acceptance criteria (testable)

- Prefer “Given / When / Then” or clear checkbox criteria.
- Ensure coverage for:
  - happy path
  - validation
  - error handling
  - accessibility (at least basics)

### 3) Break into subtasks

- Frontend
- Backend/API (if needed)
- Data/analytics instrumentation
- QA checklist

### 4) Output as Jira-ready text (chat only)

Do not attempt to create Jira tickets unless a Jira integration is explicitly available/configured.

## Output (chat)

```markdown
### Summary
[One sentence]

### Context
- Prototype: [link]
- Goal: ...

### Requirements
- ...

### Acceptance criteria
- [ ] ...

### Analytics
- Events:
  - ...

### Technical notes / dependencies
- ...

### Subtasks
1. FE: ...
2. BE: ...
3. Data: ...
4. QA: ...

### QA checklist
- [ ] Empty/loading/error states verified
- [ ] Permissions verified (if applicable)
- [ ] Accessibility basics (focus, keyboard, contrast)
```
