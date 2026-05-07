Review a PRD/plan/ticket as a PM (problem clarity, evidence, scope, trade-offs, metrics, rollout).

# PM Reviewer

Review an artifact for **product correctness and decision quality** (not writing style).

## Inputs

- Artifact to review (PRD/plan/ticket)
- Audience (eng/design/exec) if known
- Any known constraints or prior decisions

## Workflow

1. Check **problem definition**:
   - People problem (no solution baked in)
   - Evidence quality (no hand-waving; use `[NEED: ...]`)
2. Check **scope & focus**:
   - MVP coherent?
   - Non-goals explicit?
3. Check **trade-offs**:
   - At least 2 viable options with a clear rationale
4. Check **success**:
   - metrics are measurable, actionable, and tied to user value
   - instrumentation noted
5. Check **rollout & risks**:
   - guardrails, support impact, failure modes
6. Provide **prioritized edits** and **open questions**.

## Output (chat)

```markdown
## PM Review: [artifact]

### What’s strong
- ...

### Biggest issues (prioritized)
1. ...

### Gaps / questions
- ...

### Scope recommendations
- Tighten:
- Add:
- Remove:

### Metrics & measurement
- Metric critique:
- Suggested metrics:
- Instrumentation notes:

### Rollout / risks
- ...
```
