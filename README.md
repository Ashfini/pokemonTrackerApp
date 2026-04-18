# IT 431 — Project 2 Starter (Basic)

A minimal starter template for **IT 431 Project 2** using only the tools we covered in class.

**Navigation is handled with `useState` in `App.tsx`** — no React Router. This matches **Option A** in the Project 2 assignment and is the recommended path if you didn't go through the optional React Router tutorial.

> Using React Router? There's a sibling starter at
> [rmichak/it431-project2-starter](https://github.com/rmichak/it431-project2-starter)
> that has React Router v7 pre-wired. Pick whichever matches the tutorial path you took.

## Tech Stack

- **React 18** + **Vite** — Module 5
- **TypeScript** — Module 4
- **Supabase** (DB + Auth + RLS) — Modules 7 and 8
- **Vercel** — Deployment

## Getting Started

### 1. Clone and install

```bash
git clone https://github.com/rmichak/it431-project2-starter-basic.git
cd it431-project2-starter-basic
npm install
```

### 2. Set up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. In the dashboard, go to **Settings → API** and copy your **Project URL** and **anon/public key**.
3. Copy the env template and fill it in:

   ```bash
   cp .env.example .env
   ```

   ```
   VITE_SUPABASE_URL=https://YOUR-PROJECT-REF.supabase.co
   VITE_SUPABASE_ANON_KEY=YOUR-ANON-KEY
   ```

### 3. Create your table

Open the **SQL Editor** in Supabase and run [`supabase/schema.sql`](supabase/schema.sql). Edit the column list first to match your own domain (recipes, games, movies, etc.) — the file includes a `TODO` where the placeholder fields live.

The schema also enables **Row Level Security** with the four policies you need:
- `SELECT` — anyone (anonymous users can browse)
- `INSERT` / `UPDATE` / `DELETE` — authenticated users only, and only on rows they own

### 4. Run the dev server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173). You should see the nav bar, click between Home / Products / Sign In / Sign Up, and create an account.

## What's Already Wired Up

- ✅ `useState`-based view switcher in `App.tsx` (the four views: `home`, `list`, `signin`, `signup`)
- ✅ NavBar with auth-aware buttons (shows email + Sign Out when signed in)
- ✅ Supabase client with env-var validation (`src/lib/supabase.ts`)
- ✅ Auth state via `supabase.auth.onAuthStateChange`
- ✅ Working Sign In / Sign Up forms with error handling
- ✅ Sign Out
- ✅ Conditional Add / Edit / Delete buttons (only render when a user is present)
- ✅ Loading + error UI patterns on the list view
- ✅ Reusable `ProductForm` component shared between Add and Edit
- ✅ SQL schema with RLS policies

## What You Fill In

Search the codebase for `TODO` — each marker tells you what to change:

1. **`src/types.ts`** — replace the `Product` interface with your 5+ fields
2. **`supabase/schema.sql`** — rename columns to match your fields, then run in Supabase
3. **`src/pages/ProductListView.tsx`** — uncomment the Supabase calls in `fetchProducts`, `handleAdd`, `handleEdit`, `handleDelete`
4. **`src/components/ProductForm.tsx`** — add one `useState` + labeled `<input>` per field
5. **`src/pages/HomeView.tsx`** — replace the landing-page copy
6. **`src/components/NavBar.tsx`** — update the brand name

## Where Each Piece Came From (Course Material)

| You'll need... | Look at... |
|---|---|
| View switching with `useState` | Module 5, Part 2 (State, Events); Module 8, Part 2 (Protected Routes / Conditional Rendering) |
| TypeScript interfaces | Module 4, Part 1 |
| Supabase CRUD calls | Module 7, Part 2; Assignment: Database-Powered Todo App |
| Sign up / sign in / sign out | Module 8, Part 2; Assignment: Authenticated Todo App |
| RLS policies | Module 7, Part 2 and Module 8, Part 2 |

## Deploy to Vercel

1. Push your code to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Under the project's **Settings → Environment Variables**, add:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. Redeploy. Visit the live URL.

Environment variables are the #1 thing that breaks on first deploy — if the deployed app shows a blank screen or a Supabase-related error, check these first.

## Project Structure

```
src/
├── components/
│   ├── NavBar.tsx          # button-based nav, auth-aware
│   └── ProductForm.tsx     # shared add/edit form
├── pages/
│   ├── HomeView.tsx        # landing page
│   ├── ProductListView.tsx # list + CRUD (TODOs to wire up)
│   ├── SignInView.tsx      # sign-in form
│   └── SignUpView.tsx      # sign-up form
├── lib/
│   └── supabase.ts         # Supabase client
├── App.tsx                 # useState view switcher + auth state
├── main.tsx                # entry point
├── index.css               # starter styles
├── types.ts                # View + Product types
└── vite-env.d.ts           # typed env vars
supabase/
└── schema.sql              # table + RLS policies
```

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the Vite dev server on port 5173 |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run typecheck` | Run TypeScript without emitting files |
