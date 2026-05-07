Evaluate a proposed product metric using the **3-ingredient framework**.

# Metric evaluator (3-ingredient framework)

## Collect inputs first

Ask the user for:

1. **Metric** — name or formula (e.g. messages per user per week, % of users who uploaded a file)
2. **Context** — product or feature, who uses it, what it does
3. **Goal** — what team outcome this metric is meant to track

If any input is missing, ask before scoring.

---

## The 3 ingredients

### 1. Unit of value

**Definition:** Reflects what users *do* or *get* — the core action or outcome that represents real value.

**Check:**

- Meaningful user action, not just presence or access?
- User *behavior*, not only what the system *enables*?
- Would users recognize it as valuable?

**Common failures:** logins/visits; feature flags or availability; proxies far from real value (e.g. uploads when value is insights).

### 2. Truth detector

**Definition:** Moves predictably with product quality and resists gaming.

**Check:**

- Direction unambiguous (more vs less = better)?
- Can the team hit the number without improving UX?
- Would it rise for bad reasons (spam, confusion, forced usage)?

**Common failures:** raw counts that scale with users; means that hide skew; volume over quality (e.g. tickets *closed* vs first-contact resolution).

### 3. Actionable

**Definition:** The owning team can move it with work they control.

**Check:**

- Direct levers exist?
- Feedback loop in days–weeks, not only quarters?
- Scoped for one team’s ownership — not too broad or too narrow?

**Common failures:** revenue or retention as sole team KPI; metric owned elsewhere; dependency on faraway platform work.

---

## Ratings

Per ingredient: **PASS**, **WEAK**, or **FAIL** — with a short rationale (about 2–3 sentences).

**Overall verdict**

| Verdict       | When |
|---------------|------|
| **STRONG**    | All three PASS |
| **NEEDS WORK** | One or two WEAK and fixable with a small change |
| **REPLACE IT** | Any FAIL, or two or more WEAK — wrong construct |

Be direct. If the metric is weak, say so. Prefer a **concrete alternative** (clear name + formula) over generic advice.

---

## Output template

```text
METRIC: [metric name]
CONTEXT: [product / team / goal]

─────────────────────────────────────────
INGREDIENT 1 — UNIT OF VALUE: [PASS / WEAK / FAIL]

[2–3 sentences: what does it actually capture? How close to real user value?]

─────────────────────────────────────────
INGREDIENT 2 — TRUTH DETECTOR: [PASS / WEAK / FAIL]

[2–3 sentences: gameability, directionality, signal vs noise]

─────────────────────────────────────────
INGREDIENT 3 — ACTIONABLE: [PASS / WEAK / FAIL]

[2–3 sentences: levers, owner, feedback-loop speed, scope]

─────────────────────────────────────────
OVERALL VERDICT: [STRONG / NEEDS WORK / REPLACE IT]

WHAT'S BROKEN:
- [specific problems]

SUGGESTED FIX:
[Revised metric or modification. Name the weakness it fixes. Include formula where useful.]
```
