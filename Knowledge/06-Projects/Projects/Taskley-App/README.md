# Taskley

A simple task list you can run on your own computer: add tasks, set **priorities (P1–P3)**, **due dates**, and **notes**. By default nothing is sent to the cloud—your list is stored in your browser until you optionally connect **Supabase** for sync.

This README is written for a **first-time install** (for example during a **Claude Code** workshop). You do not need to be a full-time developer to get the app running.

---

## What you need on your computer

- **Git** (to download the project), or download the repo as a ZIP from GitHub and unzip it.
- **Node.js** (LTS recommended). Open Terminal (Mac) or PowerShell / Command Prompt (Windows) and run:

```bash
node -v
```

If you see a version number (for example `v20.x` or `v22.x`), you are ready.

- **Optional:** [Bun](https://bun.sh) if your team prefers it—you can use `bun` instead of `npm` in the commands below.

---

## Run the app in a few minutes (no cloud account required)

**You do not need Supabase** to try the app. Data is saved in your browser on this machine.

1. **Get the code**

   ```bash
   git clone https://github.com/ranerez1/todo-app.git
   cd todo-app
   ```

   If you cloned into a different folder name, `cd` into that folder instead.

2. **Install dependencies**

   ```bash
   npm install
   ```

   If you use Bun: `bun install`

3. **Start the dev server**

   ```bash
   npm run dev
   ```

   Or: `bun dev`

4. **Open the app** in your browser: [http://localhost:3000](http://localhost:3000)

---

## What you should see

- A short **“Running locally”** note at the top (that is expected when you have not added cloud keys).
- A couple of **starter tasks** you can edit, complete, or delete.
- Your list **stays after you refresh the page** (same browser, same computer). Clearing site data for localhost will remove it.

---

## Optional: connect Supabase (cloud sync)

Use this when you want tasks stored in a database (for example for a shared demo or backup).

1. Create a project at [supabase.com](https://supabase.com).
2. In the Supabase dashboard, open **SQL** → **New query**.
3. Run the SQL from this repo’s **`database.sql`** file (it creates the `todos` table and matches the app’s fields).  
   If you already have an older `todos` table, use **`database-migration-phase-c.sql`** instead to add missing columns.
4. Go to **Settings** → **API** and copy the **Project URL** and **anon public** key.
5. In the project folder, copy the env template and edit it:

   ```bash
   cp .env.local.example .env.local
   ```

   Set **`NEXT_PUBLIC_SUPABASE_URL`** and **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** in **`.env.local`**, then restart **`npm run dev`**.

If these variables are missing or wrong, the app **still runs in local-only mode** using browser storage.

---

## Claude Code workshop ideas

This repo is a small, readable **Next.js** app. In Claude Code you might ask:

- “Explain what `app/page.tsx` does in plain language.”
- “Where does the app save tasks when Supabase is not configured?”
- “What would we change to add a new field to every task?”

Official **Claude Code** documentation: [https://docs.anthropic.com/en/docs/claude-code](https://docs.anthropic.com/en/docs/claude-code)

---

## Troubleshooting

| Issue | What to try |
|--------|-------------|
| **Port 3000 is already in use** | Stop the other app using that port, or run `npx next dev -p 3001` and open [http://localhost:3001](http://localhost:3001). |
| **`npm install` errors** | Delete the **`node_modules`** folder and run **`npm install`** again. Make sure Node.js is LTS. |
| **Blank page or errors** | Check the terminal where `npm run dev` is running for error messages. Confirm you ran commands from the project root (the folder that contains **`package.json`**). |
| **Supabase not working** | Confirm **`.env.local`** has both URL and anon key, no extra quotes, then restart the dev server. You can always fall back to local-only mode by clearing those variables. |

---

## For developers

### What’s in the box

- Priorities, due dates, notes, filters, clear completed, local-first storage, optional Supabase when env is set.
- Stack (short): Next.js, React, TypeScript, Tailwind, shadcn/ui, optional Supabase.

### Project layout

```
todo-app/
├── app/
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx          # Main UI and todo logic
├── components/ui/        # shadcn/ui components
├── lib/
│   ├── supabase.ts       # Client when cloud is configured + types
│   ├── local-todos.ts    # Browser persistence for local-only mode
│   └── utils.ts
├── database.sql
├── database-migration-phase-c.sql
├── .env.local.example
└── README.md
```

### Supabase API (when configured)

The app uses the generated REST API, for example:

```typescript
const sb = getSupabase();
if (!sb) return;
const { data } = await sb.from("todos").select("*").order("created_at", { ascending: false });
```

See `app/page.tsx` and `lib/supabase.ts` for the full pattern.

### License

This project is open source under the [MIT License](LICENSE).

### Support

- [Supabase docs](https://supabase.com/docs)  
- [Next.js docs](https://nextjs.org/docs)  
- Issues: open one in this repository if something is wrong with the project itself.
