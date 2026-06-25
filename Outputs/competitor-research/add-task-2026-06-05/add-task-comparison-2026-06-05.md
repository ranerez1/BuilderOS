# Competitor comparison: Add task

> **Date:** 2026-06-05 | **Competitors:** todoist, ticktick | **Run:** Outputs/competitor-research/add-task-2026-06-05/

## Scope

How users create a new task from the default Today view in Todoist and TickTick web apps. Covers entry points (button, inline composer, keyboard shortcut), what fields are exposed during capture, and the natural-language / quick-entry conventions each product uses to set due dates, priority, list/project, labels, and reminders without opening a full editor. Out of scope: bulk import, voice capture, mobile-only flows, third-party integrations (email, share extensions), and task editing after creation.

## Capability comparison

| Capability | todoist | ticktick |
|---|---|---|
| Primary entry point on Today view | Persistent **Add task** button pinned at top of left sidebar (always visible) | Inline composer **Add task to "Inbox"** anchored at top of the Today list pane |
| Secondary entry point | Inline **+ Add task** row at the bottom of each date section | Sidebar lacks a dedicated add-task CTA; entry is the inline composer |
| Quick-add keyboard shortcut | `Q` opens global Quick Add modal from anywhere | `Tab` (per docs) inside the composer; no global modal — focus the composer first |
| Natural-language date parsing | Yes — typing e.g. "buy milk tomorrow 5pm every Monday" inline parses date, time, and recurrence | Yes — typing e.g. "buy milk tomorrow" inline parses date; recurrence and time also supported in composer |
| Inline tokens for metadata | `#project`, `@label`, `!!1`–`!!4` priority, `+assignee` (paid) all typed directly into the title | `~list`, `#tag`, priority via keyboard or selector; tag syntax mirrors Todoist labels |
| Default destination | Defaults to Inbox unless a project is open or `#project` is typed | Defaults to Inbox; composer label reads `Add task to "Inbox"` |
| Fields visible before submit | Title, due date chip, priority chip, project chip, labels chip, reminder chip, description toggle | Title; chips for date, priority, list, tags appear as user types or via toolbar (varies by plan) |
| Add-from-anywhere | Add task button is always visible in sidebar across all views | Composer is per-view; the keyboard shortcut depends on focus |
| Empty-state guidance | None at the composer; tutorials live elsewhere | Sidebar Tags panel explicitly tells users "Quickly select a tag by typing `#` when adding a task" — discoverability nudge |
| Mobile-style FAB on web | No floating button | No floating button |

## Screenshots

### todoist

| State | Screenshot | URL |
|---|---|---|
| main | ![main](screenshots/todoist-main.png) | https://app.todoist.com/app/today |

### ticktick

| State | Screenshot | URL |
|---|---|---|
| main | ![main](screenshots/ticktick-main.png) | https://ticktick.com/webapp/#q/today/tasks |

## Per-competitor notes

### todoist

- **Entry point hierarchy:** the orange **+ Add task** button is the highest-contrast element in the sidebar — visible from every view, including Today, Upcoming, projects, and filters. A second affordance (`+ Add task` row) appears at the bottom of each date group inside Today, which scopes the new task to that date.
- **Composer placement:** clicking either entry point opens an inline composer in place (not a modal by default on the web). The composer exposes Title + Description, plus chips for Date, Priority, Project, Labels, Reminders, and Location.
- **Quick Add modal:** the `Q` shortcut opens a centered modal that works regardless of current view; it's the same composer surfaced as an overlay.
- **Inline tokens:** Todoist documents `#project`, `@label`, `!!1`–`!!4`, and `+assignee` as in-title tokens. The token system is identical in inline composer and Quick Add.
- **Today view detail:** Today already shows a "5 Jun · Today · Friday" header above an `+ Add task` row, so users adding from Today get the date pre-filled.
- **Defaults seen in screenshot:** Inbox is the default destination; sidebar shows 6/5 used project quota (free plan limit), which can constrain `#project` autocompletion.

### ticktick

- **Entry point hierarchy:** the top-of-list composer **+ Add task to "Inbox"** is the single primary affordance. There is no persistent sidebar Add-task button; switching views moves the composer with the view.
- **Composer placement:** the input expands inline; date and tag chips appear inside the row once the user types or invokes the toolbar.
- **Discoverability nudge:** the left rail Tags section reads "Categorize your tasks with tags. Quickly select a tag by typing `#` when adding a task" — TickTick teaches the tag token directly in the empty-state copy.
- **Natural language:** documented to parse date and time from free text (e.g., "tomorrow 9am"). Recurrence syntax and "skip weekends" are configurable in the date picker rather than typed.
- **Destination default:** the composer label literally reads `Inbox`, making it explicit; switching the destination requires the list selector or the `~list` token (per docs).
- **Plan gating:** TickTick gates certain capture features (e.g., voice input on web, smart date for habit) behind Premium; the inline composer itself is free.

## Supplemental docs

| Competitor | Doc | URL |
|---|---|---|
| todoist | Add a new task (Help Center) | https://www.todoist.com/help/articles/add-a-new-task-Pq3Pe34Pae |
| todoist | Use task quick add | https://www.todoist.com/help/articles/use-task-quick-add-2BvSXFKn |
| todoist | Keyboard shortcuts | https://www.todoist.com/help/articles/keyboard-shortcuts-c6tQVCSb |
| ticktick | Add a task | https://help.ticktick.com/articles/7055782558537715712 |
| ticktick | Smart date parsing | https://help.ticktick.com/articles/7055782559611928576 |

## Data quality

- **Login failures:** None — both sessions authenticated on first capture.
- **Missing states:** Only `main` captured. The screenshot tool drives navigation but cannot click; without a CloakBrowser MCP we couldn't capture `create` (composer expanded), `edit`, or `error`. Capability rows referencing composer fields rely on official docs plus the visible affordances in `main`.
- **Plan-gated UI:** Todoist account is on free tier (6/5 projects shown as exceeded) — `#project` autocomplete behavior on a paid account may differ. TickTick account plan not verified in UI; Premium-only capture options (voice, attachments above limit) are not reflected in the screenshot.
- **Assumptions:**
  - Inline tokens documented by each vendor are still active (no recent product changes that would have removed them).
  - The `Q` global shortcut in Todoist and the in-composer `Tab` cycle in TickTick still work as documented; not exercised live.
  - "Reminders" chip on Todoist composer is shown to paid users only; presence/absence depends on plan.

## Next steps (optional)

- If Taskley wants to commit to a capture pattern, run `/02-pm-planner` with this comparison as input to scope initiative candidates (e.g., "match Todoist token grammar," "lead with inline composer like TickTick + add sidebar shortcut").
- For a value-ranked gap analysis against Taskley's current Add task flow, ask for the gap analysis pass (rerun this skill with the gap step).
