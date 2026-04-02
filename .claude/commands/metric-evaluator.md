Evaluate a proposed product metric using the **3-ingredient framework**.

**Canonical spec:** [.cursor/skills/metric-evaluator/SKILL.md](.cursor/skills/metric-evaluator/SKILL.md) — follow that file for steps, definitions, verdict rules, and the output template.

**Summary:** Gather metric + product context + team goal; rate **Unit of value**, **Truth detector**, and **Actionable** each PASS / WEAK / FAIL; emit **STRONG / NEEDS WORK / REPLACE IT** with concrete **WHAT'S BROKEN** and **SUGGESTED FIX** (including formula when helpful).

If `SKILL.md` is unavailable, use the same workflow: three ingredients (unit of value, truth detector, actionable), verdict rules below, and this output block.

**Verdict:** STRONG = all PASS; NEEDS WORK = 1–2 WEAK and fixable; REPLACE IT = any FAIL or 2+ WEAK.

**Output template:**

```
METRIC: [metric name]
CONTEXT: [product / team / goal]

─────────────────────────────────────────
INGREDIENT 1 — UNIT OF VALUE: [PASS / WEAK / FAIL]

[2–3 sentences]

─────────────────────────────────────────
INGREDIENT 2 — TRUTH DETECTOR: [PASS / WEAK / FAIL]

[2–3 sentences]

─────────────────────────────────────────
INGREDIENT 3 — ACTIONABLE: [PASS / WEAK / FAIL]

[2–3 sentences]

─────────────────────────────────────────
OVERALL VERDICT: [STRONG / NEEDS WORK / REPLACE IT]

WHAT'S BROKEN:
- [specific problems]

SUGGESTED FIX:
[Concrete revised metric or change, with formula if useful.]
```
