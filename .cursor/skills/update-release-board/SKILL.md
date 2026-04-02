---
name: update-release-board
description: Create a release-board entry on the Product Release board using board columns and an update for content. Use when the user asks to log a release, update the release board, or /update-release-board.
---

# Update release board command

Create an entry on the **Product Release** board using the board's MCP.

Use this skill when the user runs **/update-release-board** or asks to create a release note / changelog entry on the release board.

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Release Board**.
> Board URL, board ID, and MCP server name all come from that file.

## Board reference (live)

> Column ids, dropdown/status labels, and required fields vary by board. Always call `get_board_info` first and then use the returned column ids/labels in `create_item` / `change_item_column_values`.

## What to gather (product increment & value)

Before creating the item, collect enough detail to write an exciting, value-first update. Ask or infer:

- **What shipped:** Features, fixes, or improvements in this increment (be specific).
- **Who it helps:** Which users or workflows.
- **Outcome / impact:** Concrete benefit—what people can do now, what’s faster or clearer, what problem is solved.
- **Scope (optional):** E.g. first release of X, major improvement to Y, foundation for Z.

Use this to craft:

- **Item name:** Short, punchy title that reflects the value shipped.
- **Update body:** A celebratory value section + a short technical summary.

## Writing the update (exciting & inspiring)

- **Tone:** Celebratory and clear. Lead with the benefit, not the implementation.
- **What's the value:**
  - One-sentence main win.
  - 1–3 concrete points (bullets) of what changed + outcome.
- **Technical summary:**
  - 1–3 sentences: what was built at a high level (no jargon dump).
- **Format:** Use **HTML** in the update body. Example structure:
  - `<p><strong>What's the value</strong></p><p>…</p><p>• …</p><p>• …</p><p><strong>Technical summary</strong></p><p>…</p>`

## Workflow

1. **Load board schema**
   - Call `get_board_info` with the board ID from `Knowledge/workspace-tools.md` (under **Release Board**).
   - Identify the board’s relevant columns (typically: date, type/category, owner, area/component, links).

2. **Get content from the user**
   - Item name (value-focused)
   - What's the value (2–4 sentences or short bullets)
   - Technical summary (1–3 sentences)
   - Optional: release date (default today), type/category (default Feature/Improvement equivalent), owner (default current user when appropriate)

3. **Create the item**
   - Use `create_item` with:
     - `boardId`: board ID from `Knowledge/workspace-tools.md` (under **Release Board**)
     - `name`: the entry title
     - `columnValues`: JSON string using the **actual column ids** from `get_board_info` (date/type/etc).

4. **Post the release notes as an update**
   - Use `create_update` with:
     - `itemId`: the created item id
     - `body`: HTML per the writing guidelines above

5. **Confirm**
   - Tell the user it was created and share the item URL (or board URL).

## Checklist

- [ ] Read board ID from `Knowledge/workspace-tools.md` (under **Release Board**), call `get_board_info`, and map required column ids/labels
- [ ] Draft: item name + What’s the value + Technical summary (value-first, celebratory)
- [ ] `create_item` with correct `columnValues`
- [ ] `create_update` with HTML body
- [ ] Confirm + link

