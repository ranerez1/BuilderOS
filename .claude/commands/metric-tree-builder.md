Build a **product metric tree** from North Star Metric (NSM) down to L3 feature-level indicators.

**Canonical spec:** [.cursor/skills/data-skills/metric-tree-builder/SKILL.md](.cursor/skills/data-skills/metric-tree-builder/SKILL.md) — follow that file for phases, level definitions, anti-patterns, and the output template.

**Summary:** Gather mission, NSM, and teams; build **top-down** (2–4 L1s, 2–4 L2s per L1, 1–2 L3s per L2); after the draft, run the **anti-pattern check** (vertical hierarchy, too many parents, working backwards); emit the structured tree plus **STRONG / NEEDS REVISION** overall health.

**Related:** To critique individual metrics (NSM, L1, experiments), use [.cursor/skills/data-skills/metric-evaluator/SKILL.md](.cursor/skills/data-skills/metric-evaluator/SKILL.md).

If `SKILL.md` is unavailable, use the same workflow: Phase 1 discovery, Phase 2 NSM/L1/L2/L3 rules, Phase 3 anti-patterns, Phase 4 optional metric-evaluator pass — and this output block:

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
      Use: [experiment or build phase]
      Timeline: Hours–days

  L2: [metric name]                        Owner: [team]
    ...

L1: [metric name]                          Owner: [team/role]
  ...

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ANTI-PATTERN CHECK:
[ ] Vertical hierarchy — [CLEAR / FLAGGED: explanation]
[ ] Too many parents   — [CLEAR / FLAGGED: explanation]
[ ] Working backwards  — [CLEAR / FLAGGED: explanation]

OVERALL HEALTH: [STRONG / NEEDS REVISION]
[1–2 sentences on the biggest structural risk, if any]
```
