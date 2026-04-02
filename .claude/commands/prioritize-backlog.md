Fill missing RICE prioritization fields (Reach, Impact, Confidence, Effort) on the Backlog board.

**Canonical spec:** [.cursor/skills/prioritize-backlog/SKILL.md](.cursor/skills/prioritize-backlog/SKILL.md) — follow that file for the rubric, scoring scales, and write-back logic.

**Config:** Connection details (board URL, ID, MCP server) are in `Knowledge/workspace-tools.md` under **Backlog**.

**Summary:** Reads all backlog items, identifies those missing RICE inputs, applies consistent scoring using product best-practices, and writes the values back. Only fills missing fields — does not overwrite existing scores.
