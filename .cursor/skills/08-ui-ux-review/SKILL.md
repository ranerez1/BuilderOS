---
name: 08-ui-ux-review
description: Reviews a UI/UX design or implementation (screens, flows, copy) and returns prioritized feedback + fixes. Use when the user asks for a UI/UX review, microcopy review, or runs /08-ui-ux-review.
---

# UI/UX Review

Provide a **high-signal review** of a UI/UX artifact with prioritized issues and concrete recommendations.

## Inputs

One or more of:

- Figma link / screenshots / video
- Current build link (if available)
- Target persona + top task
- Known constraints (time, components, brand)

## Review lens (use all)

- **Clarity**: does the user understand what to do next?
- **Efficiency**: steps, cognitive load, defaults
- **Error prevention**: validation, confirmations, recoverability
- **States**: empty/loading/error/permissions
- **Accessibility**: keyboard, focus, contrast, semantics
- **Consistency**: component patterns, spacing, naming
- **Microcopy**: labels, helper text, errors, success messages

## Workflow

1. Restate the **primary user goal** and the **happy path**.
2. Identify the top **3 drop-off risks** (confusion points).
3. Provide feedback grouped by severity:
   - **P0**: blocks task completion / causes serious mistakes
   - **P1**: likely confusion / slows users down
   - **P2**: polish / consistency
4. Provide a **microcopy pass**:
   - rewrite the most important labels/errors/helper text
5. Close with a **fix plan** (5–10 bullets, ordered).

## Output (chat)

```markdown
## UI/UX Review: [artifact]

### Goal & happy path
- Goal:
- Happy path:

### Top risks
1. ...

### Findings
#### P0 (must fix)
- Issue:
  - Why it matters:
  - Recommendation:

#### P1 (should fix)
- ...

#### P2 (nice to have)
- ...

### Microcopy suggestions
- [current] → [recommended]

### Fix plan (ordered)
1. ...
```
