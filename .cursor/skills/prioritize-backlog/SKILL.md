---
name: prioritize-backlog
description: Fills missing product prioritization inputs (Reach, Impact, Confidence, Effort) on the Product Backlog board using RICE/ICE best practices. Use when the user asks to prioritize the backlog, add RICE scores, fill Reach/Impact/Confidence/Effort, or says items are missing prioritization fields.
---

# Prioritize backlog (RICE)

Go over items in the **Backlog** board and fill **missing** values for:

- Reach
- Impact
- Confidence
- Effort

Use a consistent RICE-style rubric and write back the values.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Backlog**.
> Board URL, board ID, and MCP server name all come from that file.

> Column ids, column types, and status labels vary by board. Always call `get_board_info` first and use the returned ids/labels.

## Principles (best-practice guardrails)

- **Be consistent, not “perfect.”** Use the same scale and assumptions across items.
- **Don’t fabricate facts.** If the item lacks context, still fill the fields using a conservative rubric:
  - Keep **Confidence low**.
  - Prefer smaller **Reach** and higher **Effort** when unclear.
  - Add an **item update** noting assumptions + what data would raise confidence.
- **Prefer relative sizing.** RICE is a ranking tool; use it to compare items, not to claim exact outcomes.

## Scales and mappings (match board schema)

Always adapt to the **actual column types** returned by `get_board_info`.

### This board (current structure)

On the **Backlog** board (ID from `Knowledge/workspace-tools.md`), these are **status** columns with labels (example from one common backlog setup — verify with `get_board_info` for your actual board):

- Reach: `High | Medium | Low`
- Impact: `High | Medium | Low`
- Confidence: `High | Medium | Low`
- Effort: `High | Medium | Low`

So you must write values using **status labels** (not numbers), e.g.:

```json
{ "color_mm1t7q6r": { "label": "High" } }
```

### Numeric mapping (for computing an internal RICE score)

Use a consistent mapping so you can compute and compare scores:

- **Reach**: Low=1, Medium=2, High=3
- **Impact**: Low=0.5, Medium=1, High=2
- **Confidence**: Low=0.3, Medium=0.6, High=0.9
- **Effort**: Low=1, Medium=2, High=4  (higher effort = worse)

If the board schema changes to numbers later, keep the same intent and map back to these buckets for consistency.

## Scoring (for your own ranking)

Compute (even if there’s no column for it) using the numeric mapping above:

\[
\text{RICE score} = \frac{\text{Reach} \times \text{Impact} \times \text{Confidence}}{\text{Effort}}
\]

Use the score to sanity-check ranking. Do not overwrite any existing “Priority” column unless explicitly requested.

## Workflow

### 1) Load board schema and find the relevant columns

1. Call `get_board_info` with the board ID from `Knowledge/workspace-tools.md` (under **Backlog**).
2. Identify the column ids for:
   - Reach
   - Impact
   - Confidence
   - Effort
3. Record for each of these columns:
   - Column id
   - Column type (numbers vs status vs dropdown, etc.)
   - Allowed labels (if status/dropdown)

### 2) Fetch backlog items and filter for missing values

1. Use `get_board_items_page` to fetch items with their column values.
2. Filter to items where **any** of Reach/Impact/Confidence/Effort is empty/unset.
3. Skip items that are clearly “done” or archived equivalents (use the board’s Status column if present).

### 3) Estimate values using item context + rubric

For each item missing one or more fields, infer from:

- Item name
- Type/Area columns (if present)
- Any description-like column (Task Description, Notes, etc.)
- Existing updates (promises, urgency, user pain, constraints)

Heuristics:

- **Reach**:
  - Higher if it’s a default path, onboarding, pricing/checkout, core navigation, reliability.
  - Lower if it’s an admin-only flow, a single integration, or power-user tooling.
- **Impact**:
  - Higher if it removes a blocker, prevents failure, improves retention/conversion, or unblocks multiple roadmap items.
  - Lower if it’s “nice-to-have”, cosmetic, or minor convenience.
- **Confidence**:
  - Raise if there’s explicit evidence in the item (user quotes, repeated reports, metrics mentioned, prior incidents).
  - Lower if it’s speculative or the scope is not defined.
- **Effort**:
  - Higher with unknown dependencies, migrations, auth/permissions, multi-surface UI, data model changes.
  - Lower for isolated UI copy tweaks, small bug fixes with clear repro, single-file changes.

### 4) Write values back to the tracker (only missing fields)

For each item:

1. Build `columnValues` ONLY for fields that are missing.
2. Use `change_item_column_values`.
3. If a field is a status/dropdown:
   - Choose the closest existing label that matches the numeric intent.
   - Do not create new labels.

### 5) Add an update per item with rationale

Use `create_update` with a short HTML body:

- The values you set (Reach/Impact/Confidence/Effort)
- Computed RICE score
- 1–3 bullets: why (key assumptions)
- 1–2 bullets: what to learn/measure to increase confidence

Template:

```html
<p><strong>RICE filled</strong></p>
<p><strong>Reach</strong>: X<br/>
<strong>Impact</strong>: Y<br/>
<strong>Confidence</strong>: Z<br/>
<strong>Effort</strong>: E<br/>
<strong>Score</strong>: (R×I×C)/E = S</p>
<p><strong>Assumptions</strong><br/>• ...<br/>• ...</p>
<p><strong>To improve confidence</strong><br/>• ...</p>
```

## Output (to the user)

After completing, provide:

- Count of items updated
- A small table-like summary (top ~10 by score): item name, id, R/I/C/E, score
- Any schema notes (e.g., Impact is dropdown so mapping used)

