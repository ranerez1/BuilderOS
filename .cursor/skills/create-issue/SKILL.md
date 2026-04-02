---
name: create-issue
description: Captures a bug/feature/improvement mid-development and creates a backlog item with a structured update (TL;DR, current vs expected, files, risks). Use when the user says “create an issue”, “log a bug”, “add to backlog”, “ticket this”, or runs /create-issue.
---

# Create issue

User is mid-development and thought of a bug/feature/improvement. Capture it fast so they can keep working.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Backlog**.
> Board URL, board ID, and MCP server name all come from that file.

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
- **Board:** the **Backlog** board (URL and ID from `Knowledge/workspace-tools.md`)

### Column ids

Always call `get_board_info` first to get live column ids and labels for your specific board. The values below are an example snapshot from one board setup — they will differ on other boards.

- **Status**: `color_mm1ttsmx` (labels include: Ready for dev, Not Started, Pending QA, Verified Done!, Check if possible)
- **Type**: `color_mm1tz08t` (labels include: Bug, New Feature, UX Improvement, Marketplace requirement, Google Requirement)
- **Priority**: `color_mm1tbvjg` (labels include: Low Priority, Medium Priority, High Priority, Critical Priority)
- **Area**: `color_mm1t9c72` (labels include: Google Slides, Board View, Both, Other)
- **Task Description (short text)**: `text_mm1tsn5f` (optional; keep it short—full detail goes in the update)
- **Files** (file column): `file_mm1t3gky`

### Optional file attachment (board file column)

If the user wants to attach a file to the issue:

- First call `get_board_info` and check whether the backlog board has a **file** column.
- If a file column exists, use `Tools/monday-file-upload` to upload the file to that column.
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

1. **Create the item** (`create_item`)
   - `boardId`: board ID from `Knowledge/workspace-tools.md` (under **Backlog**)
   - `name`: value-focused title
   - `columnValues`: JSON string with:
     - `color_mm1ttsmx`: status label (default `Not Started`)
     - `color_mm1tz08t`: type label (Bug/New Feature/UX Improvement/…)
     - `color_mm1tbvjg`: priority label (default `Medium Priority`)
     - Optional: `color_mm1t9c72` (Area) if obvious
     - Optional: `text_mm1tsn5f` with a short TL;DR (keep it short)

2. **(Optional) Upload attachment(s) to a file column**
   - **Precondition:** backlog board has a **file** column (verify via `get_board_info`).
   - Use the local CLI tool `Tools/monday-file-upload` (multipart upload) for binaries.
   - **Requirements:**
     - Environment variable `MONDAY_API_TOKEN` must be set (the CLI does not use MCP auth).
     - You need the **item id** (from step 1) and the **file column id** (from `get_board_info`).
     - You need a **local absolute path** to the file.
   - Command pattern:

     ```bash
     cd Tools/monday-file-upload && npm install && npm run build   # once
     export MONDAY_API_TOKEN="..."
     node dist/cli.js --item <ITEM_ID> --column <FILE_COLUMN_ID> --file "/absolute/path/to/file.ext"
     ```

   - If upload isn’t possible (no file column / no token / no local path), include a link or filename reference in the update instead.

3. **Add the description as an update** (`create_update`)
   - Use **HTML** body so it’s readable in monday.
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

