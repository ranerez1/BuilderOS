---
name: create-prd
description: Writes a PRD (product requirements document) for a specific feature from the Product Backlog board, saves it as a markdown file under Outputs/Product PRDs, and posts it to the backlog item as an update (and uploads the file when possible). Use when the user runs /create-prd or asks to write a PRD for a backlog feature.
---

# Create PRD

Create a concise, decision-ready PRD for **one specific feature** the user is working on from the **Backlog** board, then:

- Save it as a markdown file in `Outputs/Product PRDs/`
- Post it back to the backlog item as an update
- Upload the markdown file to the item’s **Files** column when possible

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Backlog**.
> Board URL, board ID, and MCP server name all come from that file.

> Column ids and status labels vary by board. Always call `get_board_info` first and use the returned ids/labels.

## Inputs (minimal, infer when possible)

Prefer using existing backlog context and repo context over asking lots of questions.

Gather (ask only if missing):

- **Backlog item**: item id or exact name (if name, search the board for it)
- **Feature scope**: what is in / out (2–5 bullets)
- **Target user + scenario**: who, when, why (1–2 lines)
- **People problem + evidence (required)**:
  - **People problem**: 1–2 sentences describing the user’s real-world problem (no solution embedded; not a company KPI).
  - **Evidence**: 2–5 bullets (user quotes, support volume, analytics/funnel gap, observed workarounds).
- **Success**: how we’ll know it worked (1–3 measurable signals)
- **Constraints**: timeline, platform, dependencies, risks (bullets)
- **Alternatives considered**: at least 2 viable directions + the key trade-off for choosing this one

Defaults when unclear:

- Write for an **MVP** that can ship safely
- Prefer **explicit non-goals** to avoid scope creep
- Prefer **measurable acceptance criteria** over prose

## Guardrails (avoid solution-led PRDs)

- Keep **problem space** (external user framing) separate from **solution space** (what we build).
- A good “user problem” is a **People Problem**:
  - everyone can understand it
  - no solution embedded
  - not about our company
  - focuses on the “why” behind what we see
- If the item is written as a solution, translate it into a people problem + measurable outcome, and keep both.

## Workflow

### 1) Load board schema + find the item

1. Call `get_board_info` with the board ID from `Knowledge/workspace-tools.md` (under **Backlog**).
2. Identify:
   - Status column id and the relevant label for “Working on it” (if you will set it)
   - **Files** column id (if it exists)
3. Resolve the backlog item:
   - If user provides **item id**, use it directly.
   - If user provides **name**, fetch items and match by exact/closest name; if multiple matches, pick the best match and proceed (don’t stall).

### 2) Pull item context

Read:

- Item name
- Relevant columns (Area/Type/Priority if present)
- Existing updates (for decisions, constraints, and prior discussion)

### 3) Draft the PRD (markdown)

Write a PRD that is concise but complete enough to implement and QA.

Keep it:

- **1–3 pages** (roughly 150–350 lines max)
- Bullets over paragraphs
- Concrete, testable requirements

Use this structure:

```markdown
# PRD: [Feature name]

## TL;DR (GIFTS)
- **Goal (Outcome)**:
- **Insights (Evidence)**:
- **Focus (in-scope / out-of-scope)**:
- **Trade-offs (Option A vs Option B)**:
- **Suggested solution**:
- **Success**:
- **Release shape**:

## Context
- Background:
- Why now:
- Constraints / assumptions:

## Goals
- [goal]

## Non-goals
- [non-goal]

## Users & primary use cases
- **Primary user**:
- **Primary scenario**:
- Secondary scenarios:

## Requirements
### Functional requirements
- [FR1] ...

### UX / UI notes (if applicable)
- Screens/states:
- Empty/loading/error states:
- Copy requirements:

### Permissions / roles (if applicable)
- ...

### Data & analytics
- Events to track:
  - `[event_name]` — properties: ...
- Key dashboards / KPIs:

#### Success (quality check)
A good metric should be:
- **Unit of value** (reflects user value, not activity)
- **Truth detector** (if it improves, we’re truly better off)
- **Actionable** (the team can influence it)

#### Measuring AI (only if feature is AI)
Use **AIQ**:
- **Adoption**: is anyone using it?
- **Impact**: does it help users achieve their goal?
- **Quality**: does it work well from the user’s perspective?

### Performance & reliability
- ...

### Edge cases
- ...

## Acceptance criteria (definition of done)
- [ ] ...

## Rollout plan
- Shipping steps:
- Backward compatibility:
- Feature flag plan (if relevant):

## Risks & mitigations
- ...

## Open questions
- ...
```

### Naming the PRD file

Save as:

- `Outputs/Product PRDs/YYYY-MM-DD_<itemId>_<short-slug>.md`

Where `<short-slug>` is a 3–8 word kebab-case slug from the feature name.

### Include traceability

At the top or bottom of the PRD, include:

- Backlog item id
- Backlog item name

### 4) Write the PRD file locally

Create the markdown file under `Outputs/Product PRDs/`.

### 5) Post to the tracker as an update (always)

Post an update to the backlog item via `create_update` with:

- A short executive summary (TL;DR + key decisions)
- A reference to the saved file path
- The PRD body pasted below (preferred when file upload isn’t available)

Use **HTML** so it reads well in the tracker UI. Template:

```html
<p><strong>PRD</strong></p>
<p><strong>Local file</strong><br/><code>Outputs/Product PRDs/YYYY-MM-DD_ITEMID_slug.md</code></p>
<p><strong>TL;DR</strong><br/>• ...<br/>• ...</p>
<p><strong>Open questions</strong><br/>• ...</p>
<hr/>
<pre>[paste the PRD markdown here]</pre>
```

### 6) Upload the markdown file to the item (when possible)

If the board has a file column:

1. Prefer attaching the `.md` file to the item’s **Files** (or equivalent) column using whatever attachment flow is configured for this workspace.
2. **Do not hardcode** any vendor-specific CLI/tooling here. If an attachment helper exists, it must be referenced from `Knowledge/workspace-tools.md` only.

Fallbacks (in order):

- If upload can’t be done, paste the full PRD in the item update body (step 5).
- If the PRD is too long for the tracker update UI, paste only sections (TL;DR, Goals, Requirements, Acceptance criteria, Open questions) and keep the full PRD in the repo file.

## Output (to the user)

After running `/create-prd`, provide:

- The created PRD file path
- The backlog item link (board URL + item id is fine)
- A 5–10 bullet summary of the PRD (what’s shipping + how we’ll measure success)

