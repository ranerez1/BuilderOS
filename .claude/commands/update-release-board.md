Log a release entry on the Product Release board.

**Canonical spec:** [.cursor/skills/update-release-board/SKILL.md](.cursor/skills/update-release-board/SKILL.md) — follow that file for the required columns and update content format.

**Config:** Connection details (board URL, ID, MCP server) are in `Knowledge/workspace-tools.md` under **Release Board**.

**Summary:** Creates a new item on the Release Board with release name, version, date, scope summary, and a structured update. Always calls `get_board_info` first to resolve live column ids and status labels.
