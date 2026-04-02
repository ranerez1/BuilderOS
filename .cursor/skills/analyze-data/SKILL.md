---
name: analyze-data
description: Pulls real product insights from the analytics tool via MCP and summarizes them for a product manager (what changed, why it matters, risks/caveats, and next actions) with deep links to reports. Use when the user runs /analyze-data or asks for analytics insights, product insights, funnel health, retention, engagement trends, or “what should a PM look at?”.
---

# Analyze data (Analytics → PM insights)

## Configuration

> Before running, read **`Knowledge/workspace-tools.md`** and use the values under **Analytics**.
> The MCP server name comes from that file.

Use the **Analytics MCP** (server name from `Knowledge/workspace-tools.md`) to pull real data and produce a **PM-ready briefing**: the narrative, implications, and next actions—plus deep links to open each report.

This skill is a “default PM pack” version of `mixpanel-data-insights`: it favors a small number of high-signal queries that are broadly useful when the user does not specify a precise question.

## Before calling tools

1. Read the relevant tool JSON descriptors for the analytics MCP server (server name from `Knowledge/workspace-tools.md`) so arguments match the live schema.
2. Use `call_mcp_tool` with the server name from `Knowledge/workspace-tools.md` (under **Analytics**).

## What to ask (keep it minimal)

If the user did not specify these, ask at most 2 questions total:

- What product / Mixpanel project should we analyze? (project name is fine)
- What time window matters? (default: last 30 days, weekly)

If the user mentions a **feature**, **screen**, **release**, or **experiment**, anchor the analysis on that (events/properties tied to it). Otherwise run the default PM pack below.

## Default PM pack (run these 3–6 queries)

### 0) Resolve project

- Call **Get-Projects** when `project_id` is unknown.
- If multiple projects match, pick the closest match to the product name in the user message; proceed.

### 1) Data trust quick check (optional but recommended)

- Call **Get-Issues** (small limit) and only report issues that could change interpretation (spikes, drops, schema drift, ingestion gaps).

### 2) Engagement pulse (insights)

Goal: “Are we up/down/stable in core activity?”

- Use **Run-Query** with `report_type: "insights"` and a simple report:
  - 30 days, `unit: "week"` (or 14 days, `unit: "day"` if a release happened recently)
  - 1–3 core events (start with one if unsure)
  - Prefer `unique` for “users did X”, `total` for “volume of X”

If you don’t know event names, call **Get-Events** and pick the closest “core activity” / “activation” event(s) from the project’s lexicon.

### 3) Activation funnel (funnels)

Goal: “Where do users drop?”

- If the user gives funnel steps, use them.
- Otherwise infer a sensible 3–5 step funnel from common patterns (e.g. sign up → first key action → repeat key action) using **Get-Events** and (if needed) **Get-Event-Details**.
- Call **Get-Query-Schema** for `report_type: "funnels"` before building the report object.
- Run **Run-Query** with a short window (14–30 days).

### 4) Retention shape (retention)

Goal: “Do new users come back, and when does it flatten?”

- Call **Get-Query-Schema** for `report_type: "retention"`.
- Choose exactly:
  - **Initial event**: activation / first key action
  - **Return event**: same key action (or a slightly broader “core activity” event)

### 5) Behavioral paths (flows) (optional)

Goal: “What do people do before/after the key event?”

- Call **Get-Query-Schema** for `report_type: "flows"`.
- Anchor on the key event; keep step depth modest so it stays interpretable.

### 6) Segments that diverge (optional)

Goal: “Which cohorts behave differently?”

If the project has stable properties (e.g. platform, plan, country, new vs returning):

- Use **Get-Property-Names** / **Get-Property-Values** to find candidate breakdowns.
- Apply one breakdown to either engagement or funnel query (but do not stack multiple breakdowns).

## Interpretation rules (PM lens)

- Summarize **directional change** and magnitude with 1–2 representative numbers.
- Identify **one primary bottleneck** (biggest funnel drop) and **one strongest segment divergence** (if any).
- Always include **caveats** when data quality issues exist or when you inferred event choices.
- Always include **`report_url`** deep links from **Run-Query** when present.

## Output format (markdown)

```markdown
## Mixpanel PM briefing — [Project] — [Date range]

### Executive takeaway
[2–4 sentences: what changed + what it implies]

### Key insights (highest signal)
- **Engagement**: [up/down/stable] — [representative #] — ([link])
- **Activation funnel**: biggest drop at **[step]** — [representative #] — ([link])
- **Retention**: [shape + where it flattens] — ([link])

### What to do next (actions)
1. [Concrete product action or experiment tied to the bottleneck]
2. [Concrete instrumentation fix or segmentation follow-up]
3. [Optional: user research / QA verification]

### Risks / data caveats
- [Only what could change the conclusion]

### Deep links
- [Report name]: [url]
```

## Anti-patterns

- Don’t dump tables; translate to “so what / now what”.
- Don’t run many heavy queries at once; stop when the narrative is clear.
- Don’t invent events/properties—discover with **Get-Events** / **Get-Property-Names** first.

