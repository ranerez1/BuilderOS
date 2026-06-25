# Feature Kickoff One-Pager - Today-First Scheduling (MVP)

## What problem are we trying to solve?

Taskley's primary users capture tasks constantly but struggle to decide *when* each item belongs on their day. Without a credible scheduling layer, the task list becomes an infinite backlog and due dates turn into guilt triggers rather than planning aids. The pain shows up every morning ("what should I actually work on today?") and throughout the day when meetings move and plans need to shift. Taskley's product strategy positions the **Today Plan** as the primary surface, but the current app only supports a basic `due_at` picker on a flat list — no Today view, no overdue grouping, no quick reschedule, and no visible time semantics on task rows.

- **Evidence**: ICP research describes users who "know what to do but don't plan time well," with backlogs of ignored overdue reminders ([Knowledge/04-ICP/taskley-icp.md](Knowledge/04-ICP/taskley-icp.md)). Product strategy defines North Star as **Completed Planned Days** and mandates plan-first, realism-aware scheduling ([Knowledge/02-Product-Knowledge/taskley-product-strategy.md](Knowledge/02-Product-Knowledge/taskley-product-strategy.md)). Competitor scan (Todoist, TickTick) confirms Today + overdue + reschedule is table stakes for time-oriented task apps ([Outputs/competitor-research/scheduled-tasks-2026-06-05/scheduled-tasks-comparison-2026-06-05.md](Outputs/competitor-research/scheduled-tasks-2026-06-05/scheduled-tasks-comparison-2026-06-05.md)).
- **Current workaround(s)**: Users leave tasks undated, set vague "someday" due dates, or maintain a separate calendar for real scheduling. Some churn back to Todoist/TickTick for Today/Upcoming views.

**The main problem we are focused on:** Users cannot turn captured tasks into a trustworthy, time-aware plan for today — so the daily planning habit Taskley is built around never forms.

## What is our motivation and expectation?

Scheduling is not a standalone feature for Taskley; it is the foundation for Completed Planned Days. Every pillar in the product strategy depends on it: plan-first (Today as default), realism (knowing what's on the day), time awareness (when tasks land), and gentle guidance (reschedule without shame). Shipping a Today-first scheduling MVP closes the largest gap between Taskley's vision and the current prototype, and gives the Core Experience Squad a testable loop to instrument before layering differentiated realism (duration, capacity signals) in a fast-follow.

- **Objective / KR**: `[NEED: explicit squad OKR]` — proposed proxy: increase **Planned Days per Active User per Month** by making Today the habitual entry point.
- **Expected impact**: Users who schedule ≥1 task for today and return to the Today view are more likely to confirm a plan and complete planned work vs. random list check-offs.
- **Success signal**: **Primary** — % of WAU with ≥1 task scheduled for today who open the Today view and complete ≥1 scheduled task that day. **Supporting** — overdue reschedule rate (users acting on overdue section vs. ignoring it).

## What is the feature? High-level overview

**Initiative:** Today-first scheduling MVP — upgrade bare due dates into a Today-centric scheduling experience.

1. **Today view (default surface)** — Dedicated view showing tasks scheduled for today, grouped by overdue (if any) and current day. Sidebar or tab navigation with task counts. Replaces flat list as the default landing experience per plan-first strategy.
2. **Date + time scheduling** — Extend `due_at` to support optional time-of-day on tasks. Show schedule on list rows (e.g., "Today · 2:00 PM") with color semantics for overdue (red), today, and upcoming.
3. **Quick capture with schedule** — Inline date/time picker on create and edit; preserve fast capture from Inbox with optional "schedule for today" shortcut.
4. **Overdue grouping + one-tap reschedule** — Overdue tasks surfaced in a distinct section with a bulk or per-task **Reschedule** action (competitor pattern: Todoist Reschedule, TickTick Postpone). Language stays encouraging, not punitive.
5. **Inbox → Today flow** — Undated tasks live in Inbox; gentle prompt or drag/action to "schedule for today" when user is planning. No forced scheduling — undated capture still works.

**Explicitly out of MVP scope** (fast-follow candidates): recurrence, NLP date parsing, task duration/time blocks, calendar drag-and-drop, separate deadline vs. planned-date model, multi-device sync changes, AI scheduling.

## Why would this fail?

1. **Adoption** — Users keep adding undated tasks and never visit Today; scheduling becomes optional metadata like every other to-do app instead of a planning habit.
2. **Trust / comfort** — Overdue section feels judgmental; red dates and overdue counts increase anxiety and drive users away from opening the app.
3. **Discoverability** — Today view ships but Inbox remains the mental default; users don't discover reschedule flows when plans change mid-day.
4. **Scope creep** — Team bundles recurrence, calendar views, or NLP into MVP and delays the core Today loop; ships "Todoist parity" without Taskley's planning opinion.
5. **Measurement** — No instrumentation on Today view opens, schedule actions, or reschedule events; team can't tell if the habit loop is forming or which flows to iterate.

## Decisions needed before PRD

1. **Default landing** — Confirm Today view replaces the current flat list as default on web; define behavior for first-time users with no scheduled tasks (empty state + Inbox CTA).
2. **Time model** — Date-only vs. date+time: is time required for Today inclusion, or do date-only tasks appear as "anytime today"? Align with `[NEED: ICP preference data]`.
3. **Reschedule semantics** — What does Reschedule do by default (move to today, pick new date, smart suggestion)? Single action vs. date picker?
4. **Overdue policy** — How many days overdue before a task is hidden, archived, or escalated? Roll forward automatically or stay in overdue until user acts?
5. **Platform priority** — Web-first for workshop prototype, or parity requirement for iOS/Android in v1?
6. **Premium boundary** — Any scheduling features gated to Premium, or full MVP on free tier to maximize habit formation?
7. **Upcoming view** — Include a lightweight Upcoming (next 7 days) in MVP, or defer to keep scope tight?
