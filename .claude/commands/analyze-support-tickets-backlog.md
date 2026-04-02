Analyze open support tickets and surface product backlog candidates — output in chat only, no writes.

**Canonical spec:** [.cursor/skills/analyze-support-tickets-backlog/SKILL.md](.cursor/skills/analyze-support-tickets-backlog/SKILL.md) — follow that file for the full workflow, grouping logic, and output format.

**Config:** Connection details (board URL, ID, MCP server) are in `Knowledge/workspace-tools.md` under **Support Tickets**.

**Summary:** Reads open tickets from the Support Tickets board, groups by theme (bugs, feature requests, UX friction), and proposes ranked backlog candidates in chat. Never creates or edits items — user decides what to add.
