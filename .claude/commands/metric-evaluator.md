Evaluate a proposed product metric against the 3-ingredient framework.

## Instructions

Ask the user for:
1. The metric name/formula they want to evaluate (e.g. "# of messages sent per week", "% of users who uploaded a file")
2. The product/feature context (what does it do, who uses it)
3. The team goal this metric is meant to track

Then evaluate the metric against each of the 3 ingredients. For each ingredient, give a clear PASS / WEAK / FAIL rating and explain why.

---

## The 3 Ingredients of a Good Metric

### 1. Unit of Value
**Definition:** Captures what users actually *do* or *get* from the product — the core action or outcome that represents real value.

**Ask:**
- Does this metric measure a meaningful user action, not just presence or access?
- Is it measuring something the user *does*, not something the system *enables*?
- Would a user themselves recognise this as valuable?

**Common failures:**
- Measuring logins or visits (presence, not value)
- Measuring feature availability, not usage
- Measuring proxy actions too far removed from actual value (e.g. "files uploaded" when value is "insights discovered")

---

### 2. Truth Detector
**Definition:** The metric reliably signals whether the product is working — it moves in the right direction and can't be easily gamed.

**Ask:**
- Is the direction clear? (more = better, or less = better — but never ambiguous)
- Could a team hit the number without actually improving the user experience?
- Would the metric go up for the wrong reasons (e.g. spam, confusion, forced usage)?

**Common failures:**
- Absolute counts that grow with user base regardless of product quality
- Averages that hide distribution problems (a few power users inflate the mean)
- Metrics that reward volume over quality (e.g. # support tickets closed vs. % resolved on first contact)

---

### 3. Actionable
**Definition:** The team owning this metric can actually move it with their work.

**Ask:**
- Does the team have direct levers that influence this metric?
- Is the feedback loop short enough to learn from? (days to weeks, not quarters)
- Is it too broad for any single team to own, or too narrow to matter?

**Common failures:**
- Revenue or retention — too many upstream factors, too slow
- Metrics owned by a different team
- Metrics that require infrastructure or platform changes outside the team's scope

---

## Output Format

Produce a structured evaluation like this:

```
METRIC: [metric name]
CONTEXT: [product / team / goal]

─────────────────────────────────────────
INGREDIENT 1 — UNIT OF VALUE: [PASS / WEAK / FAIL]

[2-3 sentences explaining the rating. What does this metric actually capture? 
Is it close enough to real user value?]

─────────────────────────────────────────
INGREDIENT 2 — TRUTH DETECTOR: [PASS / WEAK / FAIL]

[2-3 sentences. Can this be gamed? Does it reliably signal product health? 
Any directionality issues?]

─────────────────────────────────────────
INGREDIENT 3 — ACTIONABLE: [PASS / WEAK / FAIL]

[2-3 sentences. Who owns the levers? How fast is the feedback loop? 
Is this scoped correctly for the team?]

─────────────────────────────────────────
OVERALL VERDICT: [STRONG / NEEDS WORK / REPLACE IT]

WHAT'S BROKEN:
- [bullet list of specific problems]

SUGGESTED FIX:
[Propose a revised metric or a specific modification. Explain how the fix 
addresses the weaknesses. Keep it concrete — give the formula.]
```

---

## Scoring guidance
- **STRONG** — all 3 ingredients pass
- **NEEDS WORK** — 1-2 ingredients are WEAK but fixable with a small change
- **REPLACE IT** — any ingredient FAILs, or 2+ are WEAK — the metric is fundamentally measuring the wrong thing

Be direct. If the metric is bad, say so. Give a specific alternative, not a vague suggestion.
