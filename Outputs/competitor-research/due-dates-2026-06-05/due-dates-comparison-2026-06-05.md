# Competitor comparison: Due dates & scheduling

> **Date:** 2026-06-05
> **Competitors:** todoist
> **Run folder:** Outputs/competitor-research/due-dates-2026-06-05/
> **Capture status:** No UI screenshots — CloakBrowser pre-built binary unavailable on macOS (linux-x64 only). Findings sourced from Todoist Help Center and product docs.

## Scope

How **Todoist** lets users assign, view, and reschedule **due dates** on tasks — including date-only vs. date+time, natural-language capture, recurring schedules, durations, deadlines (plan-gated), and the views that surface time-based work (Today, task view scheduler). Single-competitor run per user selection; TickTick excluded from this run.

## Capability comparison

| Capability | todoist |
|------------|---------|
| Date-only assignment | Yes — via task view **Date** field or Quick Add natural language |
| Date + time | Yes — type time in NLP (`tomorrow at 4pm`) or pick time in scheduler after setting date |
| Natural language dates in Quick Add | Yes — extensive formats (`every 3rd Tuesday`, `in 2 weeks`, `end of month`, etc.) |
| Recurring due dates | Yes — NLP in task name (`every Monday`, `every 12 hours starting at 9pm`); completion advances next occurrence |
| Separate **deadline** (hard cutoff) vs. scheduled date | Yes — **Deadline** field in task view; NLP with `{date}` syntax; distinct from “when you plan to work on it” |
| Task **duration** (time budget) | Yes — requires date+time; NLP `for 2h` / `for 1h15m`; max 24h per task; no multi-day span |
| Today / time-based list views | Yes — **Today**, **Upcoming** (documented app routes e.g. `app.todoist.com/app/today`) |
| Overdue surfacing | Yes — overdue tasks appear in Today/overdue treatment (UI detail: [NEED: logged-in screenshot] ) |
| Reschedule / clear date | Yes — task view Date scheduler; recurring tasks have Complete / Complete forever options |
| Reminders on due date/time | Yes — tied to date/time in task view (custom reminders; some location reminders Pro-gated) |
| Calendar layout for day planning | Pro/Business — calendar layout referenced for duration overview |
| Start dates / hide until start | No — Todoist explicitly does not hide tasks until a start time |
| Plan gates | **Deadline**, some reminders/location features — Pro plan |

## Screenshots

### todoist

| State | Screenshot | URL captured |
|-------|------------|--------------|
| main | _Not captured_ | https://app.todoist.com/app/today (intended) |
| create | _Not captured_ | Quick Add / task composer — [NEED: screenshot] |
| edit | _Not captured_ | Task view Date scheduler — [NEED: screenshot] |

## Per-competitor notes

### todoist

- **Dual time model:** Scheduled **date** (when you plan to work) can differ from **deadline** (fixed completion cutoff). Deadlines use `{natural language}` in Quick Add or Deadline control in task view sidebar.
- **Quick Add is primary capture surface:** Dates, recurrence, deadlines, priority, labels, and project hints parsed from one line; false positives (e.g. “monthly report”) can be clicked to demote highlighted tokens to plain text.
- **Recurring semantics:** Completing a daily task after midnight may shift next occurrence unexpectedly; docs suggest workarounds (`every 24 hours starting 6am`). Overdue recurring tasks reschedule to next future occurrence on complete, not backfill missed instances.
- **Duration planning:** `for Xh` NLP and scheduler toggle; requires time on the task; capped at 24 hours — multi-day workarounds use recurring patterns.
- **No start-date hiding:** Tasks stay visible in projects regardless of future start; trade-off documented for comment/access continuity.
- **Views:** Today-centric workflow aligns with list-first planning; deep scheduling controls live in per-task view right sidebar (web/desktop).

## Supplemental docs

| Competitor | Doc | URL |
|------------|-----|-----|
| todoist | Introduction to dates and time | https://www.todoist.com/help/articles/introduction-to-dates-and-time-q7VobO |
| todoist | Introduction to recurring dates | https://www.todoist.com/help/articles/introduction-to-recurring-dates-YUYVJJAV |
| todoist | Introduction to deadlines | https://www.todoist.com/help/articles/introduction-to-deadlines-in-todoist-uMqbSLM6U |
| todoist | Set a task duration | https://www.todoist.com/help/articles/set-a-task-duration-L1kYkZv8d |
| todoist | Use Task Quick Add | https://www.todoist.com/help/articles/use-task-quick-add-in-todoist-va4Lhpzz |
| todoist | Use the task view | https://www.todoist.com/help/articles/use-the-task-view-to-manage-tasks-in-todoist-eDeRDO0C |

## Data quality

- **Login failures:** CloakBrowser capture failed — pre-built binary only supports linux-x64; agent environment is macOS. No OAuth session attempted.
- **Missing states:** All UI states (`main`, `create`, `edit`) — no screenshots.
- **Plan-gated UI:** Deadline and some calendar/duration features documented as Pro/Business; not verified in logged-in UI.
- **Assumptions:** Overdue visual treatment and Today list layout inferred from product category norms; marked [NEED: screenshot] where UI-specific.
