Turn an unstructured problem space into 2–3 initiative candidates, then a crisp pre-PRD plan.

# PM Planner (problem → initiatives → pre-PRD)

This is a **problem-to-initiative planning tool**: start with messy inputs (observations, complaints, hypotheses) and converge on **potential initiatives** that could address the problem.

It is **not a full PRD**. The goal is to help a PM transition from **problem space → solution space**, align on direction with design/engineering, and only then write a full PRD.

## Inputs (ask only if missing)

- **Starting point**: what do we know so far? (notes, doc, snippet, or 3–8 bullets)
- **Optional working title**: feature/initiative name + 1–2 lines (if already decided)
- **Target user + scenario** (who, when, why)
- **People problem + evidence** (required; 2–5 bullets, use `[NEED: ...]` for gaps)
- **Constraints**: timing, platform, dependencies, compliance, stakeholders
- **Baseline + success**: current state + 1–2 measurable success signals (keep light; detailed metrics come only after direction is set)

## Workflow

### 0) Pull in existing workspace knowledge (before asking questions)

Before asking the user for missing inputs, scan for relevant context and reuse it.

- Look for anything relevant in:
  - `Knowledge/02-Product-Knowledge/`
  - `Knowledge/03-Market-Knowledge/`
  - `Knowledge/04-ICP/`
  - `Outputs/Discovery/`
- Extract and cite the **highest-signal facts** (problem evidence, ICP details, constraints, competitive notes, prior decisions, metrics baselines).
- If these folders are empty or not relevant, proceed without them (don’t fabricate).

### 1) Clarify the problem (no solution yet)

- Translate any solution-y wording into:
  - **People Problem** (1–2 sentences)
  - **Desired outcome** (1 sentence)
- List **assumptions** explicitly and mark unknowns with `[NEED: ...]`.
- **Evidence bar**: if the problem or evidence is thin (mostly hypotheses, no user signals, heavy `[NEED: ...]`), say so explicitly. In Step 3, at least one of the 2–3 candidates must be a **discovery / validation initiative** (e.g. interviews, prototype tests, data pulls) aimed at strengthening the problem—not only “build the feature” options.

### 2) Define the decision you need

- What decision do we need from the team? (ship vs not, MVP shape, sequencing, trade-offs)
- What “must be true” for this to succeed?



### 3) Propose initiative candidates + recommended shape

- Propose **2–3 initiative candidates** (distinct ways to address the problem or reduce uncertainty about it).
- When evidence is weak, include a **discovery-first candidate** alongside any build candidates; do not pretend the solution space is settled.
- For each candidate, include:
  - **One-liner** (what it is)
  - **Who it’s for / when**
  - **Why it works** (the mechanism)
  - **Key trade-off**
- End with a **recommended shape** (which candidate + how big for MVP) and why.

### 4) Stack-rank & prioritize (lightweight)

Apply a lightweight prioritization pass using these lenses (score each **1–5**; higher is more):

- **Impact**: How significantly does this move the needle on the core problem?
- **Reach**: How many users or use cases does this affect?
- **Confidence**: How well-understood is the problem and solution space?
- **Effort**: How complex or costly is this likely to be? (higher = harder)
- **Strategic Fit**: Does this align with stated business goals or OKRs?

Present a compact table:

- Candidate | Impact (1–5) | Reach (1–5) | Confidence (1–5) | Effort (1–5) | Strategic Fit (1–5) | Notes

Then provide:

- **Priority order**: a simple stack-rank (1 → N) with 1–2 bullets explaining the trade-offs that drove the ordering.
- **Sensitivities (optional)**: what would change the order (e.g., “If effort is 2 points higher than expected, #2 becomes #1”).

### 5) Confirm direction (checkpoint)

- **Stop here. Ask the user to confirm the direction** (pick a candidate or adjust the recommendation) **before** generating the full pre-PRD plan below.

### 6) Plan the work at “pre-PRD” fidelity

- **MVP scope** (3–8 bullets)
- **Non-goals** (3–8 bullets)
- **Milestones** (Discovery → Prototype → Build → Rollout)
- **Risks & mitigations** (product + delivery + measurement)
- **Open questions** (ranked by urgency)

### 7) Measurement (light pre-PRD)

- Define **one primary success metric** and **1–2 supporting signals** that tie to the chosen initiative.
- Add **leading indicators** only when they are obvious from an existing baseline or prior instrumentation; otherwise omit or use `[NEED: ...]` instead of inventing a tracking design.

## Output (chat)

Return a single markdown plan using this template:

```markdown
## PM Plan: [initiative]

### Problem & outcome
- **People problem**:
- **Desired outcome**:
- **Evidence**:

### Users & scenarios
- **Primary user**:
- **Primary scenario**:
- Secondary scenarios:

### Scope
#### MVP (in)
- ...

#### Out (non-goals)
- ...

### Prioritization (lightweight)

- Score each candidate **1–5** using:
  - **Impact** (moves the core problem)
  - **Reach** (users / use cases affected)
  - **Confidence** (how well-understood)
  - **Effort** (higher = harder)
  - **Strategic Fit** (aligns with goals / OKRs)
- Provide a compact table:
  - Candidate | Impact | Reach | Confidence | Effort | Strategic Fit | Notes
- End with a **priority order** (1 → N) and 1–2 bullets explaining why.

### Chosen initiative
- **Selected candidate** (from Step 3; do not re-list all options here):
- **MVP shape**:
- **Why this over the other candidates** (1–2 bullets):
- **Key trade-offs accepted**:

### Milestones
- Discovery:
- Prototype:
- Build:
- Rollout:

### Risks & mitigations
- ...

### Measurement
- **Primary metric**:
- Supporting (1–2):
- Leading indicators (only if grounded in known baseline / data; else `[NEED: ...]` or omit):

### Open questions
1. ...
```
