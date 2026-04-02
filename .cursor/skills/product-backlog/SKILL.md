---
name: product-backlog
description: Guides working from the Product Backlog board. Use when the user asks to work on a backlog item, pick a bug, or follow the backlog workflow. Workflow stops after commit (no push or deploy).
---

# Product backlog workflow

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Backlog**.
> Board URL, board ID, and MCP server name all come from that file.

Work with the **Backlog** board using the board's MCP server. Use this skill when tackling a bug or backlog item end-to-end.

> Column ids and status labels vary by board. Always call `get_board_info` first and use the returned ids/labels in subsequent calls.

Use the board's MCP tools (e.g. `get_board_items_page`, `get_board_info`, `change_item_column_values`, `create_update`) for board operations.

## Workflow (single item)

1. **Pick the first item**
   - Use `get_board_info` to understand board structure (groups, columns, status labels).
   - Get board items (include columns). Filter for items with status **"Ready for dev"** (or the first bug in list if none filtered). Do not bring items with status **"Verified Done!"** (or equivalent done/out-of-scope statuses).
   - Read the item names, Area column and any Task Description / updates for details.
   - Give the user a list of potential items and ask which item they want to work on.

2. **Mark in progress**
   - Set Status to **"Working on it"** (or the board’s equivalent) using `change_item_column_values` with the **status column id** and an **existing label** from `get_board_info`.

3. **Implement**
   - Fix the bug or implement the feature; add/update **unit or integration tests** as required; add **Storybook scenario(s)** when the change affects UI (e.g. new state, disabled option, new component). Do **not** commit yet.

4. **Pre-commit verification (MANDATORY)**
   Run **all** of the following before every commit. Fix any failures before proceeding.

   **Frontend** (from `frontend/`):
   ```bash
   yarn test          # vitest
   yarn lint           # eslint
   yarn format:check   # prettier --check
   yarn typecheck      # tsc --noEmit
   ```

   **Backend** (from `backend/`, with venv activated):
   ```bash
   python -m pytest tests/ -q   # pytest
   ruff check .                  # ruff lint
   ruff format --check .         # ruff format check
   ```

   If `format:check` or `ruff format --check` fails, run the write variant (`yarn format` / `ruff format .`) and re-verify.

5. **Self code review**
   - Review your own changes: correctness, tests, and style. Do **not** hand off to another agent or stop work—complete review in the same flow.
   - When satisfied, proceed to commit.

6. **Commit and update item**
   - Commit with a clear message (e.g. referencing the bug or item name).
   - Add an update on the item (e.g. commit hash, short summary of the fix).
   - **Stop here.** Do **not** push, do **not** verify deployment, and do **not** set a “fixed waiting validation” status. Push/deploy and status update are done separately (e.g. by the user or in a later step).

## Working on several items together

When optimizing or batching work across **multiple items**:

1. **Mark all chosen items as WIP**
   - For each item you will work on, set Status to **"Working on it"** so they are clearly in progress.

2. **Same flow per item**
   - For **each** item: implement → **pre-commit verification** → self code review → **commit for that item** (one commit per item, with a message referencing that item).
   - For **each** item: add an **update on the item** with that item’s commit hash and a short summary of what was done.

3. **Stop after commits and updates**
   - Do **not** push or deploy. Do **not** set any item to a “Fixed - waiting for validation” style status. Push/deploy and final status updates are done separately.

## Status rule

- When finishing the implementation and passing review, do **not** set status to “Fixed - waiting for validation” in this workflow (no push/deploy). “Fixed - waiting for validation” is for after the code is pushed and deployment is verified. “Verified Done!” is for after validation (e.g. QA or product sign-off).

## Checklist (single item)

- [ ] Read first bug item and its updates
- [ ] Mark item "Working on it"
- [ ] Implement, tests (and Storybook scenarios if UI change)
- [ ] **Pre-commit verification**: tests, lint, format:check, typecheck (frontend) / pytest, ruff check, ruff format --check (backend)
- [ ] **Self code review** (review changes; no agent handoff)
- [ ] Commit → post update on item (commit hash + summary) → **stop** (no push, no deploy, no final status changes)

## Checklist (multiple items)

- [ ] Mark each chosen item "Working on it"
- [ ] For each item: implement → **pre-commit verification** → self review → commit (one per item) → post update on that item
- [ ] **Stop** (no push, no deploy, no final status changes)

