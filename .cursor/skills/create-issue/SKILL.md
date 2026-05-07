---
name: create-issue
description: Captures a bug/feature/improvement mid-development and creates a backlog item with a structured update (TL;DR, current vs expected, files, risks). Use when the user says “create an issue”, “log a bug”, “add to backlog”, “ticket this”, or runs /create-issue.
---

# Create issue

User is mid-development and thought of a bug/feature/improvement. Capture it fast so they can keep working.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Backlog**.
> Tool URL/ID (if any) and MCP server name all come from that file.

## Your goal

Create a complete backlog issue with:

- Clear title
- TL;DR of what this is about
- Current state vs expected outcome
- Relevant files that need touching (max **3**)
- Optional attachments (screenshots, logs, PDFs) if the user provides them
- Risk/notes if applicable
- Proper **type** and **priority** labels (default: priority = Medium)

## Where to create it

- **MCP server:** see **Backlog** entry in `Knowledge/workspace-tools.md`
- **Target**: the **Backlog** destination (URL/ID from `Knowledge/workspace-tools.md`, if provided)

### Column ids

Always inspect the tracker MCP’s tool descriptors (and/or call its “schema/metadata” tool, if available) to get live field ids and allowed values for your specific workspace. The values below are an example snapshot from one setup — they will differ elsewhere.

- **Status**: `color_mm1ttsmx` (labels include: Ready for dev, Not Started, Pending QA, Verified Done!, Check if possible)
- **Type**: `color_mm1tz08t` (labels include: Bug, New Feature, UX Improvement, Marketplace requirement, Google Requirement)
- **Priority**: `color_mm1tbvjg` (labels include: Low Priority, Medium Priority, High Priority, Critical Priority)
- **Area**: `color_mm1t9c72` (labels include: Google Slides, Board View, Both, Other)
- **Task Description (short text)**: `text_mm1tsn5f` (optional; keep it short—full detail goes in the update)
- **Files** (file column): `file_mm1t3gky`

### Optional file attachment (board file column)

If the user wants to attach a file to the issue:

- First call `get_board_info` and check whether the backlog board has a **file** column.
- If a file column exists, use whatever attachment flow is configured for this workspace (see `Knowledge/workspace-tools.md`).
- If the board has **no** file column, fall back to:
  - posting the file’s **link** (Drive/Slack/etc.) in the update, or
  - describing where the file lives locally (if the user is okay with that).

## How to get there (fast)

### Ask questions (2–3 max)

Be concise and conversational. One message with 2–3 targeted questions beats multiple back-and-forths.

Usually ask only what’s missing:

- **What’s the issue/feature?** (one sentence)
- **Current vs expected?** (one line each)
- **Type + priority** if not obvious (Bug/Feature/Improvement + High/Medium/Low)

Default assumptions when unclear:

- **Priority**: `Medium Priority`
- **Type**: infer from wording; if ambiguous default to `UX Improvement`
- **Status**: `Not Started` (use `Ready for dev` only when the user implies it’s ready to implement immediately)
- **Effort**: `Medium` (record in the update; the board has no effort column)

### Search for context only when helpful

- Use repo search only if it will materially improve the ticket (e.g. to name the most relevant 1–3 files).
- Skip web search unless it’s a complex feature with known best-practice pitfalls.

Hard rules:

- Keep it fast (total exchange under ~2 minutes).
- Max **3** files listed.
- Bullets over paragraphs.

## Create the issue (writes)

1. **Create the item** (exact MCP tool name varies; inspect descriptors)
   - Use the target identifier from `Knowledge/workspace-tools.md` (under **Backlog**) when required by the MCP
   - `name`: value-focused title
   - Set the equivalent of:
     - status (default `Not Started`)
     - type (Bug/New Feature/UX Improvement/…)
     - priority (default `Medium Priority`)
     - optional: area/component (if obvious)
     - optional: short TL;DR (keep it short)

2. **(Optional) Upload attachment(s) to a file column**
   - **Precondition:** backlog board has a **file** column (verify via `get_board_info`).
   - Use whatever attachment flow is configured for this workspace (see `Knowledge/workspace-tools.md`).
   - If upload isn’t possible (no file column / missing credentials / no local path), include a link or filename reference in the update instead.

3. **Add the description as an update/comment**
   - Use an **HTML** body so it’s readable in the tracker UI.
   - Structure:
     - **TL;DR**
     - **Current → Expected**
     - **Files to touch** (max 3)
     - **Attachments** (if any): uploaded filename(s) or link(s)
     - **Risk / notes**
     - **Labels chosen** (type/priority/status/area + effort as text)

### Update body template (HTML)

Use this template:

```html
<p><strong>TL;DR</strong><br/>[1–2 lines]</p>
<p><strong>Current</strong><br/>[1 line]</p>
<p><strong>Expected</strong><br/>[1 line]</p>
<p><strong>Files to touch</strong><br/>• <code>path/one</code><br/>• <code>path/two</code><br/>• <code>path/three</code></p>
<p><strong>Attachments</strong><br/>• [filename.ext] (uploaded) <em>or</em> <a href="[url]">link</a></p>
<p><strong>Risk / notes</strong><br/>[optional bullets]</p>
<p><strong>Labels</strong><br/>Type: [..] · Priority: [..] · Status: [..] · Area: [..] · Effort: Medium</p>
```

## Output (to the user)

After creating:

- Confirm it’s created
- Share the **item URL**
- Echo the **final title + labels** in 1–2 lines

