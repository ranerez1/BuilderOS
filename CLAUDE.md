# PM Context

- **Role:** Product Manager / Product Ops
- **Company:** BuilderOS (personal PM infrastructure)
- **Product:** BuilderOS — a modular, MCP-integrated PM operations framework that automates product workflows from discovery to release using Claude AI + connected tools (Monday.com, Mixpanel, Notion, Jira, Linear)
- **Target users:** Product managers and product leaders who use Monday.com/Jira/Linear for backlogs, Mixpanel/Amplitude for analytics, and Notion/Slack for documentation and communication
- **Current focus:** Expanding the skill library and metric-driven product planning; end-to-end workflow from backlog item → PRD → implementation → release tracking → retrospective
- **Primary metric:** Cycle time from problem identification to validated release (instrumented per workflow run)
- **Guardrails:**
  - Never fabricate data, quotes, or metrics — use `[NEED: data from X]` for gaps
  - Separate problem space from solution space in all PRDs
  - Evidence-based requirements: 2–5 bullets of user research, quotes, or analytics per PRD
  - No solution-led requirements
  - Max 3 files per backlog issue; default priority: Medium
- **OKRs:** [NEED: define explicit OKRs for BuilderOS roadmap]
- **Terminology:**

| Term | Definition |
|------|-----------|
| **NSM** | North Star Metric — single metric capturing delivered user value (months–quarter level) |
| **L1** | 2–4 direct NSM drivers; cross-team; weeks–months timeline |
| **L2** | Team-owned behavioural metrics under each L1; days–weeks timeline |
| **L3** | Feature-level leading indicators; hours–days feedback; often temporary |
| **People Problem** | User's real-world friction — no solution baked in; grounded in evidence |
| **TL;DR (GIFTS)** | PRD format: Goal, Insights, Focus, Trade-offs, Suggested solution, Success |
| **RICE** | Backlog prioritization: Reach, Impact, Confidence, Effort |
| **Skill** | Reusable AI-powered task (e.g., `/metric-tree-builder`, `/create-prd`) in `.claude/commands/` |
| **Board** | Monday.com (or swappable Jira/Linear) project for Backlog, Releases, Tickets, etc. |
| **MCP server** | API gateway connecting Claude to external tools (Monday, Mixpanel, Notion) |
| **Workflow** | Core loop: backlog item → PRD → implementation → commit → release tracking |

---

## Writing Rules

- Direct, concise, active voice. No filler.
- Lead with the recommendation, then context.
- Audience-match: casual for Slack, structured for docs, precise for specs.
- Banned words: delve, landscape, synergy, leverage, robust, streamline, cutting-edge.
- Never fabricate data, quotes, or metrics. Use `[NEED: data from X]` for gaps.

---

## Sub-Agent Roles

When I say "review as [role]," fully adopt that perspective:

| Role | Lens | Key Questions |
|------|------|---------------|
| **Engineer** | Feasibility | Missing from spec? Edge cases? Technical risks? |
| **Designer** | Usability | Flow clear? Where do users drop off? |
| **Executive** | Strategy | Aligned with OKRs? ROI case? |
| **Skeptic** | Risk | What could go wrong? Untested assumptions? |
| **Customer** | Value | Would I use this? Would I pay? |
| **Data Analyst** | Measurement | Metrics precise? Baselines? Instrumentation? |

---

## Verification Sequence

For any deliverable, follow this order:
1. Clarify — ask 3–5 questions before generating. Never assume.
2. Draft — default short. Over 2 pages? Ask first.
3. Self-review — check against the relevant skill's checklist and anti-patterns.
4. Flag gaps — surface unknowns with `[NEED: ...]`, don't fill them with guesses.

---

## Self-Improvement Protocol

- When I correct you, immediately propose a rule for this file. Wait for approval before editing.
- When you hit a recurring issue, propose a `.claude/rules/` file for it instead of bloating this file.
- Every rule in this file must earn its place. If removing it wouldn't cause mistakes, it doesn't belong.

---

## Context Management

- Suggest `/clear` when switching between unrelated tasks.
- After ~40 exchanges, offer to write a HANDOFF.md (state, decisions, open questions, next steps) and restart.
- Use `@path/to/file` to reference docs — never ask me to paste. Keep the context window lean.
- Use Plan Mode (Shift+Tab) before multi-step tasks. Outline first, execute after approval.
- Parallelize independent subtasks with subagents. Don't serialize what can run concurrently.

---

## Memory Architecture

This file is one layer. The full system:

```
~/.claude/CLAUDE.md          → personal defaults (all projects)
./CLAUDE.md                  → this file (project-level, shared via git)
.claude/rules/*.md           → modular rules scoped by glob pattern
.claude/skills/*/SKILL.md    → task workflows, loaded on demand
```

Domain knowledge → skills. Scoped rules → `.claude/rules/`. Universal behavior → this file.

---

## MCP Connections

| Tool | Purpose | MCP Server | Board ID |
|------|---------|------------|----------|
| **Backlog** | Feature/bug items | `monday-ran-erez-mcp` | `5093728739` |
| **Release Board** | Version tracking | `monday-ran-erez-mcp` | `5093729041` |
| **Customer Meeting Transcripts** | User research | `monday-ran-erez-mcp` | `5093729255` |
| **Support Tickets** | Customer issues | `monday-ran-erez-mcp` | `5093729699` |
| **Analytics** | Product metrics | `user-mixpanel` | N/A |

Config reference: [Knowledge/workspace-tools.md](Knowledge/workspace-tools.md)

---

## Output Conventions

- PRDs → `Outputs/Product PRDs/YYYY-MM-DD_<itemId>_<slug>.md`
- Technical Design Docs → `Outputs/Technical Docs/`
- Retrospectives → `Learnings/`

