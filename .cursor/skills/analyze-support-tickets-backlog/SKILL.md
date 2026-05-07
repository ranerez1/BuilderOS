---
name: analyze-support-tickets-backlog
description: Analyzes support tickets and suggests product backlog candidates (in chat only, no writes). Use when the user asks to analyze support tickets, support backlog themes, common issues, feature requests, bug patterns, or runs /analyze-support-tickets-backlog.
---

# Analyze support tickets → backlog candidates (no writes)

Turn support tickets into actionable product-backlog candidates. **Do not create or edit items**; only output suggestions in chat so the user can decide what to add.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under the relevant entries.
> All board IDs, URLs, and MCP server names come from that file.

## Source

- **Board**: the **Support Tickets** board (URL and ID from `Knowledge/workspace-tools.md`)
- **MCP server**: use the MCP server listed under **Support Tickets** in `Knowledge/workspace-tools.md`. If a call fails due to columns changing, re-fetch board metadata and retry.

## Default scope

- Analyze **open** tickets only (exclude Done/Closed/Resolved—use the board’s Status column labels to decide).
- If there’s no clear “closed” concept, treat anything not explicitly done/closed as open and note the ambiguity in the output.

## Workflow

### 1) Pull tickets (read-only)

1. Fetch board metadata (columns + label values).
2. Identify the columns that contain:
   - **Status** (open vs closed)
   - **Title**
   - **Description / long text**
   - **Category / component / area** (if present)
   - **Priority / severity** (if present)
   - **Created / updated date** (if present)
   - **Links / attachments / customer** (if present)
3. Fetch items from the board, filtering to **open**.

### 2) Extract signals from each ticket

For each open ticket, extract (best-effort):

- **User problem** (what they tried to do, what failed, what they expected)
- **Outcome/impact** (blocked / degraded / confusion / workaround exists)
- **Type**: bug vs UX gap vs missing capability vs docs gap vs performance vs reliability
- **Area** (if inferable)
- **Evidence snippet**: 1–2 short phrases from the ticket that justify the idea
- **Reference**: ticket name + item link (or item id if link isn’t available)

### 3) Cluster into backlog candidates

Create candidate ideas by clustering tickets by:

- Same underlying “job-to-be-done”
- Same root-cause / product area
- Same repeated confusion or UX trap
- Same missing capability / integration

De-duplicate aggressively; prefer 6–12 high-signal candidates over a long list.

### 4) Output (chat only)

Output a **flat list** of backlog-candidate ideas. Each idea must include evidence and a recommendation for what to do next.

#### Output template (Markdown)

```markdown
## Backlog candidates (from support tickets)

1) **[Idea title]**
   - **Problem**: [1 sentence]
   - **Why now**: [frequency / severity / risk; 1 sentence]
   - **Proposed change**: [1–3 bullets]
   - **Success metric**: [one measurable metric]
   - **Evidence (tickets)**:
     - [Ticket title] — [item link or id] — “[…]”
     - [Ticket title] — [item link or id] — “[…]”
   - **Notes / risks**: [optional]

... (repeat)
```

## Hard rules

- **No writes**: do not create items, updates, or change columns on any support-ticket board.
- **Evidence required**: every backlog candidate must cite at least **2** supporting tickets (unless there is only 1 open ticket in total; then note that).
- **No hallucinations**: if a column/value isn’t present, say so; don’t invent priorities/customers/dates.
- **Actionable wording**: phrase ideas as product changes (not “support should…”).

