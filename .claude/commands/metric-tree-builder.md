Build a **product metric tree** from North Star Metric (NSM) down to L3 feature-level indicators.

# Metric tree builder

## Related technique

To stress-test individual metrics (NSM, L1 drivers, experiments), use the **3-ingredient framework** (unit of value, truth detector, actionable). Optional after the tree: evaluate the NSM and one L1.

---

## Phase 1 — Discovery (gather inputs)

Ask for anything missing before drafting:

1. **Product mission** — One sentence: what value the product creates for users.
2. **North Star Metric (NSM)** — The single metric that best captures delivered value. If absent, help define it with: *"What is the one action or outcome that, if every user did it more, would mean the product is clearly working?"* Steer toward *value delivered*, not raw activity alone.
3. **Teams / workstreams** — Main product teams or feature areas (e.g. Onboarding, Core loop, Monetisation, Growth).

**Conditional:**

- **Vanity or result-only NSM** (e.g. revenue-only, undifferentiated DAU): Gently reframe — *"What user behaviour most directly generates that outcome?"*
- **No NSM yet:** Do not skip to L1 until NSM is plausible; iterate in one tight loop, then continue.

Copyable progress:

```
Metric tree progress:
- [ ] Mission + teams captured
- [ ] NSM defined (value-oriented)
- [ ] L1 drivers (2–4, causal to NSM)
- [ ] L2 per L1 (2–4 each, team-owned behaviours)
- [ ] L3 where useful (1–3 per L2, leading/experiment signals)
- [ ] Anti-pattern check + overall health
```

---

## Phase 2 — Build the tree (level definitions)

Build **top-down**, one level at a time. Ask clarifying questions; keep **2–4 L1s**, **2–4 L2s per L1**, **1–2 L3s per L2** (cap breadth; avoid a bushy unmaintainable tree).

### NSM

- Single metric for core user value; owned by the full product org.
- Moves on **months–quarters**.
- Examples: "Weekly active projects with ≥3 collaborators" (collab product); "Rides completed per week" (marketplace).

### L1 — Direct NSM drivers

- **2–4** metrics that decompose or causally drive the NSM; cross-team.
- **Weeks–months** to move.
- Prompt: *"What has to be true for the NSM to go up?"*

### L2 — Team-owned behavioural metrics

- Under each L1: **2–4** L2s; **one owning team** each.
- Specific user behaviours that move the L1.
- **Days–weeks** to move.
- Prompt: *"What user behaviour, owned by this team, drives the L1?"*

### L3 — Feature-level leading indicators

- **1–3** under an L2 when needed; feature/squad scope; often **temporary** during build or experiment.
- **Hours–days** feedback.
- Prompt: *"What is the earliest signal that this feature is working?"*

**While building:**

- If L1s feel **parallel to the NSM** rather than **drivers**, call it out and fix causal direction.
- If a **team has no L2**, flag it — they lack a line-of-sight metric.

---

## Phase 3 — Structural anti-patterns (after draft)

Check the tree for these; list **CLEAR** or **FLAGGED** with a one-line fix in the output block.

### 1. Vertical hierarchy (single chain)

Each level is a single parent → single child. **Why bad:** One implicit driver; no breadth. **Fix:** At least **two** L1s with distinct logic and ownership.

### 2. Too many parents

An L2 or L3 appears under multiple parents. **Why bad:** Blurred accountability. **Fix:** Exactly **one** parent and **one** owning team per metric.

### 3. Working backwards (wrong arrows)

A lower metric is an **output** of a higher one, not an **input**. **Why bad:** Circular logic; teams can't act on causes. **Fix:** For each link ask: *"Does improving [child] cause [parent] to improve?"* If not, flip or remove.

---

## Output format

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

---

## Phase 4 — Verification (optional)

- Offer to **evaluate the NSM** (and optionally one L1) with the 3-ingredient framework if the user wants deeper critique on definitions, gameability, or ownership.
- Confirm **every arrow** is cause → effect toward the NSM, not vanity stacking.
