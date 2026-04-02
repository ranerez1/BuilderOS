Build a product metric tree from North Star Metric down to L3 feature-level indicators.

## Instructions

Ask the user for:
1. **Product mission** — what value does the product create for users? (one sentence)
2. **North Star Metric (NSM)** — the single metric that best captures delivered value (or ask the user if they want help defining it)
3. **Teams / workstreams** — list the main product teams or feature areas (e.g. Onboarding, Core Loop, Monetisation, Growth)

If the user doesn't have an NSM yet, help them define one by asking: "What is the one action or outcome that, if every user did it more, would mean the product is clearly working?" Push for a metric that captures *value delivered*, not just activity.

Then build the tree level by level, asking clarifying questions as needed.

---

## The Metric Tree Structure

### North Star Metric (NSM)
- Single metric representing core value delivered to users
- Owned by the entire product org
- Moves on a timeline of months to quarters
- Example: "Weekly active projects with ≥3 collaborators" (Notion-style), "Rides completed per week" (Uber)

### L1 — Direct NSM Drivers
- 2–4 metrics that directly decompose the NSM
- Cross-team, cross-functional
- Each L1 should mathematically or causally contribute to the NSM
- Timeline: weeks to months to move
- Ask: "What has to be true for the NSM to go up?"

### L2 — Team-Owned Behavioral Metrics
- Each L1 should have 2–4 L2 metrics beneath it
- Owned by a single product team
- Measure specific user behaviours that drive the L1
- Timeline: days to weeks to move
- Ask: "What user behaviour, owned by this team, drives the L1?"

### L3 — Feature-Level Leading Indicators
- Each L2 can have 1–3 L3 metrics
- Feature-specific, often temporary (used during build/experiment phase)
- Very fast feedback loop: hours to days
- Ask: "What is the earliest signal that this feature is working?"

---

## Anti-pattern Checklist

After building the tree, check for these structural problems and flag any that apply:

### 1. Vertical Hierarchy (Single Chain)
**Problem:** Each metric has only one parent and one child — a straight line, not a tree.
**Why it's bad:** Means the NSM has only one driver. No breadth. One team owns everything.
**Fix:** Ensure L1 has at least 2 drivers, each with distinct team ownership.

### 2. Too Many Parents
**Problem:** One L2 or L3 metric sits under multiple parent metrics.
**Why it's bad:** No clear team ownership. Nobody is accountable for moving it.
**Fix:** Each metric should have exactly one parent and one owning team.

### 3. Working Backwards (Wrong Arrows)
**Problem:** A lower-level metric is actually an output of a higher-level metric, not an input.
**Why it's bad:** Creates circular logic. Teams can't act on it — they're measuring effects, not causes.
**Fix:** Trace each arrow: "Does improving [child] *cause* [parent] to improve?" If not, flip or remove it.

---

## Output Format

Produce the tree in this structure:

```
PRODUCT MISSION: [one sentence]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NSM: [metric name]
Definition: [what exactly is being measured]
Owner: Full product org
Timeline: Months–quarters

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
L1: [metric name]                          Owner: [team/role]
  Definition: [what it measures]
  Why it drives NSM: [causal link]
  Timeline: Weeks–months

  L2: [metric name]                        Owner: [team]
    Definition: [what it measures]
    Why it drives L1: [causal link]
    Timeline: Days–weeks

    L3: [metric name]                      Owner: [squad/feature]
      Definition: [what it measures]
      Use: [during what experiment or build phase]
      Timeline: Hours–days

  L2: [metric name]                        Owner: [team]
    ...

L1: [metric name]                          Owner: [team/role]
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANTI-PATTERN CHECK:
[ ] Vertical Hierarchy — [CLEAR / FLAGGED: explanation]
[ ] Too Many Parents   — [CLEAR / FLAGGED: explanation]
[ ] Working Backwards  — [CLEAR / FLAGGED: explanation]

OVERALL HEALTH: [STRONG / NEEDS REVISION]
[1-2 sentences on the biggest structural risk, if any]
```

---

## Facilitation tips

- If the user gives a vanity NSM (e.g. "revenue", "DAUs"), push back gently: "Revenue is a result, not a value signal. What user behaviour most directly generates that revenue?"
- If L1s don't decompose mathematically from the NSM, point it out: "These L1s feel parallel to the NSM, not drivers of it. Let's check the causal logic."
- If a team owns no L2 metrics, flag it: "This team has no clear metric of their own. They'll struggle to know if their work is moving anything."
- Keep the tree to a manageable size: 2–4 L1s, 2–4 L2s per L1, 1–2 L3s per L2. Bigger isn't better.
