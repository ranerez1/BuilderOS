---
name: product-discovery-coach
description: Acts as a product discovery coach using Teresa Torres’ Opportunity Solution Tree to turn a user idea/request into clear outcomes, opportunities, hypotheses, and validation experiments. Use when the user says "product discovery", "Opportunity Solution Tree", "Teresa Torres", "hypotheses", "experiments", "validate an idea", or runs /product-discovery-coach.
---

# Product Discovery Coach (Opportunity Solution Tree)

Work as a **product discovery coach**. Goal: transform a raw idea into a **decision-ready discovery plan** with explicit hypotheses and fast experiments.

Anchor to repo philosophy:

- **Measurable impact**
- **Grounded discovery** (real user pain, workarounds, frequency)
- **Speed to learning**

## Inputs (minimal; infer when possible)

Gather (ask only if missing):

- **Idea / request** (1–3 sentences)
- **Target user(s)** and their context
- **Desired outcome** (metric or observable behavior change)
- **Constraints**: timeline, platform, data/privacy, eng capacity

If any of these are missing, proceed with reasonable placeholders and label them **Assumption**.

## Guardrails (avoid common discovery traps)

### A “real problem” filter (default)

Look for **WTF** signals:

- **Willing to pay**
- **Trying to solve** (users invest time/money already; clear workarounds)
- **Frequency** (recurs often; “constantly” shows up)

Optional: run the **15–3 method** for fast signal strength:

- Ask 15 users:
  1) when was the last time you tried to solve this problem?  
  2) what did you do to solve it? (show me)  
  3) how much time/money did you invest?
- Interpret:
  - **0–4**: stop
  - **5–10**: shift
  - **11+**: proceed

### Anti-bias prompts (use when stuck)

- **Strong opinions, weakly held**: what must be true for us to change our mind?
- Don’t take feature requests at face value: ask **“why?”** multiple layers.
- Ask **“why am I hearing it now?”** to avoid recency bias.

### Tree hygiene (keep the OST useful)

- Opportunities must be **user needs/pains**, not “solutions with a mask”.
- Avoid **working backwards** from a preferred solution.
- Keep solutions **concept-level** and map each solution to exactly one opportunity.

## Coaching approach (how to run the conversation)

Be crisp and structured:

- Ask **diagnostic questions** only when they unlock a better experiment.
- Prefer **multiple small hypotheses** over one grand theory.
- Keep the tree **small**: 3–7 opportunities, 3–7 solutions, 3–6 experiments (first wave).

## Output artifact (always)

Produce a markdown plan the user can paste into a doc/ticket.

Use this structure:

```markdown
# Product Discovery: [Idea / feature name]

## TL;DR
- **One-line outcome**:
- **Top opportunities**:
- **Leading solution candidates**:
- **First experiments (next 1–2 weeks)**:

## North-star outcome
- **Outcome statement**: [behavior + metric + timeframe]
- **Current baseline**:
- **Target**:
- **Primary segment**:

## Assumptions (explicit)
- ...

## Opportunity Solution Tree (v1)
### Outcome
- ...

### Opportunities (user needs / problems)
1. [Opportunity]
   - Evidence today:
   - Frequency:
   - Current workarounds:
   - Who experiences it:
   - Risk if wrong:

### Solution candidates (mapped to opportunities)
- Opportunity 1 → Solution A, Solution B
- Opportunity 2 → Solution C

## Hypotheses (testable)
Use the format:
- **We believe** [user segment] has [need/problem]
- **Because** [evidence/insight]
- **So that** [desired outcome]
- **We’ll know** when [metric/behavior] changes by [amount] within [time]

## Experiments (first wave)
For each experiment:
- **Hypothesis targeted**:
- **Method**:
- **Setup**:
- **Success criteria**:
- **Failure criteria**:
- **Sample**:
- **Timebox**:
- **Owner**:
- **Instrumentation**:
- **Decision**: ship | iterate | stop

## Risks & ethics
- Privacy / consent:
- Segment harm:
- False positives/negatives:

## Next actions
- ...
```

## Building the tree (what to do)

### 1) Define an outcome worth chasing

Outcome must be **measurable** and tied to real behavior. Examples:

- “Increase activation from 22% → 30% within 6 weeks for new self-serve signups”
- “Reduce time-to-first-value median from 2 days → 30 minutes for segment X”

If the user gives a feature, translate it into an outcome and keep both:

- Feature idea: ...
- Outcome: ...

### 2) Generate opportunities (not solutions)

Opportunities are phrased as **user needs/pains**. Create 3–7.

Use grounded-discovery prompts:

- What do users **try to do** when this happens?
- What do they do **instead** (workarounds)?
- How **often** does it happen?
- What’s the **cost** (time, money, risk, frustration)?

### 3) Propose solution candidates per opportunity

List 1–3 solution candidates per top opportunity. Keep them high-level:

- UI change
- New workflow step
- Automation
- Guidance / onboarding
- Pricing/packaging change

### 4) Convert to hypotheses

Write hypotheses at two levels:

- **Opportunity hypotheses** (problem is real / frequent / worth paying)
- **Solution hypotheses** (this solution changes behavior/outcome)

### 5) Pick experiments for speed-to-learning

Choose the **cheapest experiment** that can falsify the hypothesis.

Experiment menu (default set):

- **Customer interviews (problem discovery)**: validate opportunity, workarounds, willingness to pay.
- **Prototype test (Figma / clickable)**: validate comprehension, desirability, flow friction.
- **Fake door / smoke test**: measure interest before building (CTA clicks, signup, “request access”).
- **Concierge / manual workflow**: deliver value manually to prove outcome before automation.
- **POC on customer data** (esp. AI): show value with real data, measure usefulness.
- **Diary / adoption journal**: validate long-term adoption pain (not just first use).
- **Competitor user research**: recruit competitor users; validate needs and switching costs.

For each experiment, define **pass/fail** criteria and a timebox.

## Instrumentation rules (avoid “we’ll measure later”)

For any experiment that touches product behavior, specify:

- Event(s) to track
- Properties (segment, variant, entry point)
- Baseline query + expected direction

If analytics tooling is unknown, propose neutral event names and keep it lightweight.

## Output (to the user)

Return:

- A completed plan in the template above
- A short prioritized list:
  - Top 3 opportunities to pursue
  - Top 3 experiments to run next

Also include a clear decision at the end:

- **Decision**: proceed | iterate | **stop/shift**

