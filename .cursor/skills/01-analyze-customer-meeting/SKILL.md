---
name: 01-analyze-customer-meeting
description: Analyzes customer meeting transcripts and extracts candidate features/bugs/UX issues to add to the Product Backlog. Creates/uses an “AI analyzed” Status column and marks processed meetings as Analyzed. Use when the user asks to analyze customer calls, meeting transcripts, call notes, voice-of-customer insights, or runs /01-analyze-customer-meeting.
---

# Analyze customer meetings → backlog candidates (marks items as analyzed)

Turn customer meeting transcripts into actionable product-backlog candidates, then mark each processed meeting as analyzed so future runs only pick up new items.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under the relevant entries.
> All board IDs, URLs, and MCP server names come from that file.

## Source

- **Board**: the **Customer Meeting Transcripts** board (URL and ID from `Knowledge/workspace-tools.md`)
- **Backlog board (reference only)**: the **Backlog** board (URL and ID from `Knowledge/workspace-tools.md`)
- **MCP server**: use the MCP server listed under **Customer Meeting Transcripts** in `Knowledge/workspace-tools.md`. If a call fails due to schema changes, re-fetch board metadata and retry.

## Default scope

- Analyze items where **AI analyzed** is **Not analyzed** (or empty/unknown if the column is newly created).

## Workflow

### 0) Ensure an “AI analyzed” Status column exists (write allowed)

1. Call `get_board_info` for the **Customer Meeting Transcripts** board (ID from `Knowledge/workspace-tools.md`).
2. Find a **Status** column whose title matches (case-insensitive) one of:
   - `AI analyzed`
   - `AI Analysed`
   - `Analyzed by AI`
   - `Analysed by AI`
3. If missing, create it with `create_column`:
   - `columnType`: `status`
   - `columnTitle`: `AI analyzed`
   - `columnDescription`: `Set by AI skill after processing meeting transcript`
   - `columnSettings` (JSON string): create labels at minimum:
     - `Not analyzed`
     - `Analyzed`
     - `Skip` (optional, for noisy/empty items)
4. Re-run `get_board_info` and capture the created column id + available status labels.

### 1) Pull meeting items (read-only)

1. Fetch board metadata (columns + label values + groups).
2. Identify where transcripts live (best-effort):
   - **Long text** columns (call notes / transcript / summary)
   - **Files** column (uploaded transcript or recording notes)
   - **Updates** on the item (often contains pasted transcript)
   - Optional: **Customer / account**, **date**, **attendees**, **topic**, **product area**
3. Fetch items from the board (include columns) filtered to:
   - `AI analyzed` is `Not analyzed` (preferred), or
   - `AI analyzed` is empty/unknown (if filtering by label isn’t supported; document fallback)
4. If pagination exists, iterate until you have all not-yet-analyzed items (or a sane cap like 40, then ask the user if they want to continue).

### 2) Extract signals per meeting

From each meeting, extract (best-effort, with short evidence snippets):

- **Customer context**: who (account/persona), scenario (if available)
- **Jobs-to-be-done**: what they are trying to accomplish
- **Pain points**: friction, confusion, time waste, manual work, reliability concerns
- **Requests**: explicit feature asks, missing capabilities, integrations
- **Bugs**: clear “it doesn’t work / breaks / wrong result” statements
- **Workarounds**: what they do instead
- **Importance**: urgency, frequency, deal risk, “must-have”, “nice-to-have” language
- **Exact evidence**: 1–2 short quotes per extracted point (or paraphrase if no direct text exists)

Reference for each meeting must include **meeting item name + item link (or item id)**.

### 3) Cluster into backlog candidates

Create candidate ideas by clustering across meetings by:

- Same underlying job / outcome
- Same repeated confusion or UX trap
- Same missing capability / integration
- Same reliability/performance issue

De-duplicate aggressively; prefer **6–12** high-signal candidates over a long list.

### 4) Output (chat only)

Output a **flat list** of backlog-candidate ideas. Each idea must include evidence and a recommendation for what to do next.

#### Output template (Markdown)

```markdown
## Backlog candidates (from customer meetings)

1) **[Idea title]** ([Bug] / [New Feature] / [UX Improvement])
   - **Problem**: [1 sentence]
   - **Who is impacted**: [persona / customer type, if known]
   - **Why now**: [frequency / severity / deal risk; 1 sentence]
   - **Proposed change**:
     - [bullet]
     - [bullet]
   - **Success metric**: [one measurable metric]
   - **Evidence (meetings)**:
     - [Meeting title] — [item link or id] — “[…]”
     - [Meeting title] — [item link or id] — “[…]”
   - **Notes / risks**: [optional]

... (repeat)
```

### 5) Mark items as analyzed (write allowed)

After successfully extracting signals from a meeting item (even if it yields “no actionable insights”), set:

- `AI analyzed` → `Analyzed`

using `change_item_column_values` with a status label value (nested `{ "label": "Analyzed" }`).

If the item is missing transcript content (empty), set:

- `AI analyzed` → `Skip`

and include a one-line note in the output indicating it was skipped and why.

## Hard rules

- **Allowed writes are limited**:
  - Create the single `AI analyzed` Status column (if missing) on the **Customer Meeting Transcripts** board
  - Update `AI analyzed` for analyzed items on the **Customer Meeting Transcripts** board
  - Do **not** create/update anything on the **Backlog** board in this skill
- **Evidence required**: every backlog candidate must cite at least **2** supporting meetings (unless there is only 1 unanalyzed meeting item in total; then note that).
- **No hallucinations**: if a column/value isn’t present, say so; don’t invent customer names, dates, priorities, or quotes.
- **Actionable wording**: phrase ideas as product changes (not “sales should…”).

---
name: 01-analyze-customer-meeting
description: Analyzes customer meeting transcripts and extracts candidate features/bugs/UX issues to add to the Product Backlog. Creates/uses an “AI analyzed” Status column and marks processed meetings as Analyzed. Use when the user asks to analyze customer calls, meeting transcripts, call notes, voice-of-customer insights, or runs /01-analyze-customer-meeting.
---

# Analyze customer meetings → backlog candidates (marks items as analyzed)

Turn customer meeting transcripts into actionable product-backlog candidates, then mark each processed meeting as analyzed so future runs only pick up new items.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under the relevant entries.
> All board IDs, URLs, and MCP server names come from that file.

## Source

- **Board**: the **Customer Meeting Transcripts** board (URL and ID from `Knowledge/workspace-tools.md`)
- **Backlog board (reference only)**: the **Backlog** board (URL and ID from `Knowledge/workspace-tools.md`)
- **MCP server**: use the MCP server listed under **Customer Meeting Transcripts** in `Knowledge/workspace-tools.md`. If a call fails due to schema changes, re-fetch board metadata and retry.

## Default scope

- Analyze items where **AI analyzed** is **Not analyzed** (or empty/unknown if the column is newly created).

## Workflow

### 0) Ensure an “AI analyzed” Status column exists (write allowed)

1. Call `get_board_info` for the **Customer Meeting Transcripts** board (ID from `Knowledge/workspace-tools.md`).
2. Find a **Status** column whose title matches (case-insensitive) one of:
   - `AI analyzed`
   - `AI Analysed`
   - `Analyzed by AI`
   - `Analysed by AI`
3. If missing, create it with `create_column`:
   - `columnType`: `status`
   - `columnTitle`: `AI analyzed`
   - `columnDescription`: `Set by AI skill after processing meeting transcript`
   - `columnSettings` (JSON string): create labels at minimum:
     - `Not analyzed`
     - `Analyzed`
     - `Skip` (optional, for noisy/empty items)
4. Re-run `get_board_info` and capture the created column id + available status labels.

### 1) Pull meeting items (read-only)

1. Fetch board metadata (columns + label values + groups).
2. Identify where transcripts live (best-effort):
   - **Long text** columns (call notes / transcript / summary)
   - **Files** column (uploaded transcript or recording notes)
   - **Updates** on the item (often contains pasted transcript)
   - Optional: **Customer / account**, **date**, **attendees**, **topic**, **product area**
3. Fetch items from the board (include columns) filtered to:
   - `AI analyzed` is `Not analyzed` (preferred), or
   - `AI analyzed` is empty/unknown (if filtering by label isn’t supported; document fallback)
4. If pagination exists, iterate until you have all not-yet-analyzed items (or a sane cap like 40, then ask the user if they want to continue).

### 2) Extract signals per meeting

From each meeting, extract (best-effort, with short evidence snippets):

- **Customer context**: who (account/persona), scenario (if available)
- **Jobs-to-be-done**: what they are trying to accomplish
- **Pain points**: friction, confusion, time waste, manual work, reliability concerns
- **Requests**: explicit feature asks, missing capabilities, integrations
- **Bugs**: clear “it doesn’t work / breaks / wrong result” statements
- **Workarounds**: what they do instead
- **Importance**: urgency, frequency, deal risk, “must-have”, “nice-to-have” language
- **Exact evidence**: 1–2 short quotes per extracted point (or paraphrase if no direct text exists)

Reference for each meeting must include **meeting item name + item link (or item id)**.

### 3) Cluster into backlog candidates

Create candidate ideas by clustering across meetings by:

- Same underlying job / outcome
- Same repeated confusion or UX trap
- Same missing capability / integration
- Same reliability/performance issue

De-duplicate aggressively; prefer **6–12** high-signal candidates over a long list.

### 4) Output (chat only)

Output a **flat list** of backlog-candidate ideas. Each idea must include evidence and a recommendation for what to do next.

#### Output template (Markdown)

```markdown
## Backlog candidates (from customer meetings)

1) **[Idea title]** ([Bug] / [New Feature] / [UX Improvement])
   - **Problem**: [1 sentence]
   - **Who is impacted**: [persona / customer type, if known]
   - **Why now**: [frequency / severity / deal risk; 1 sentence]
   - **Proposed change**:
     - [bullet]
     - [bullet]
   - **Success metric**: [one measurable metric]
   - **Evidence (meetings)**:
     - [Meeting title] — [item link or id] — “[…]”
     - [Meeting title] — [item link or id] — “[…]”
   - **Notes / risks**: [optional]

... (repeat)
```

### 5) Mark items as analyzed (write allowed)

After successfully extracting signals from a meeting item (even if it yields “no actionable insights”), set:

- `AI analyzed` → `Analyzed`

using `change_item_column_values` with a status label value (nested `{ "label": "Analyzed" }`).

If the item is missing transcript content (empty), set:

- `AI analyzed` → `Skip`

and include a one-line note in the output indicating it was skipped and why.

## Hard rules

- **Allowed writes are limited**:
  - Create the single `AI analyzed` Status column (if missing) on the **Customer Meeting Transcripts** board
  - Update `AI analyzed` for analyzed items on the **Customer Meeting Transcripts** board
  - Do **not** create/update anything on the **Backlog** board in this skill
- **Evidence required**: every backlog candidate must cite at least **2** supporting meetings (unless there is only 1 unanalyzed meeting item in total; then note that).
- **No hallucinations**: if a column/value isn’t present, say so; don’t invent customer names, dates, priorities, or quotes.
- **Actionable wording**: phrase ideas as product changes (not “sales should…”).

