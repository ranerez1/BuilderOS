Pull targeted product analytics (trends, funnels, flows, retention) and deliver a PM-oriented narrative with deep links.

**Config:** Analytics MCP server name is in `Knowledge/workspace-tools.md` under **Analytics**.

## Goal

Use the **Analytics MCP** (server name from `Knowledge/workspace-tools.md`) to fetch real data, then deliver a **high-level, PM-oriented narrative**: what changed, what matters, what to validate next—not a raw data dump.

## Before calling tools

1. Read each tool’s JSON descriptor for the analytics MCP server (server name from `Knowledge/workspace-tools.md`) so arguments match the live schema.
2. Use `call_mcp_tool` with the server name from `Knowledge/workspace-tools.md` (under **Analytics**).

## Default workflow

1. **Resolve project**  
   If `project_id` is unknown, call **Get-Projects**. If several projects exist, ask which one (or use the one named in the user message). Note **workspace_id** when the project has multiple workspaces and the user cares about a non-default view.

2. **Optional: data trust check**  
   Call **Get-Issues** with a small `limit` when the user wants a “state of analytics” read or when numbers look noisy. Summarize only issues that could affect interpretation (volume spikes, property drift, etc.).

3. **Discover events when needed**  
   Call **Get-Events** (`project_id`, optional substring `query`) to align metric names with the project’s lexicon before building reports.

4. **Run analytics**  
   - For **simple trends** (one or few metrics, basic breakdowns): use **Run-Query** with `report_type: "insights"` and a compact `report` object (see tool description for the minimal insights shape).  
   - For **funnels**, **flows**, **retention**, or **complex insights** (multiple events, filters, formulas): call **Get-Query-Schema** for that `report_type` first, then **Run-Query**.

5. **Keep queries PM-friendly**  
   Follow **Run-Query** guidance: prefer **7–30 day** windows (or coarse **week/month** units), avoid stacking many breakdowns on fine-grained series, and keep result sets small enough to interpret.

6. **Interpret for a PM**  
   Turn tables into **directional insight**: up/down/stable, segments that diverge, funnel steps that lose the most users, paths that suggest confusion or success, retention curves that flatten early.  
   Always include **`report_url`** from **Run-Query** when present so the user can open the chart in Mixpanel.

## What to pull (pick what fits the question)

| PM question | Mixpanel lever |
|-------------|----------------|
| “Are we growing / engaging?” | Insights: key activity events over time (`total` or `unique` as appropriate). |
| “Where do we lose users?” | Funnels between critical steps; call out biggest drop-off step. |
| “What do people do before/after X?” | Flows into/out of/between anchor events (keep step count modest). |
| “Do new users come back?” | Retention: exactly one “initial” and one “return” event per schema. |
| “Can we trust this?” | Get-Issues + caveats in the narrative. |

If the user names specific events or properties, prioritize those; otherwise infer from **Get-Events** and the project context string from **Get-Projects** when useful.

## Output format

Use this structure (adapt sections to what was actually queried):

```markdown
## Mixpanel overview — [Project name] — [Date range]

### Executive takeaway
[2–4 sentences: the single story a PM should remember]

### Headline metrics
- [Metric / event]: [direction + rough scale; note uniqueness vs totals if it changes meaning]

### Behavior and product signals
- [Segment, funnel step, path, or cohort pattern worth acting on]

### Risks and data caveats
- [Issues from Get-Issues or methodology limits; what would invalidate a conclusion]

### Deep links
- [Insights / funnel / flow / retention URLs from Run-Query]

### Suggested next checks
- [1–3 concrete follow-up analyses or experiments, tied to the data]
```

## Anti-patterns

- Don’t paste large tables; summarize patterns and cite a **representative** number or rank.  
- Don’t run many heavy queries in one shot; sequence and stop when the narrative is clear.  
- Don’t invent events: use **Get-Events** or the user’s named events.

**Related:** For a quick default PM briefing without a specific question, use `/mixpanel-data-insights` with “default PM overview” as the request.
