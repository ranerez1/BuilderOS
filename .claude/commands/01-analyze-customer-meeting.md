Analyze customer meeting transcripts and extract backlog candidates (features, bugs, UX issues).

**Canonical spec:** [.cursor/skills/01-analyze-customer-meeting/SKILL.md](.cursor/skills/01-analyze-customer-meeting/SKILL.md) — follow that file for the full workflow and "AI analyzed" status column handling.

**Config:** Connection details (board URL, ID, MCP server) are in `Knowledge/workspace-tools.md` under **Customer Meeting Transcripts**.

**Summary:** Reads unanalyzed items from the Customer Meeting Transcripts board, extracts product signals, proposes backlog candidates in chat, and marks each processed meeting as Analyzed. No backlog writes without user confirmation.
