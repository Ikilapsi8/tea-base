# Tea Base — Convex Seed Kit

## What's included

| File | What it does | Where to put it |
|------|-------------|-----------------|
| `schema.ts` | Defines your database tables (teas, users, collections) | `convex/schema.ts` |
| `seedTeas.ts` | Inserts all 28 teas with photo URLs into the database | `convex/seedTeas.ts` |
| `teas.ts` | Queries for your frontend (list, filter, search, detail) | `convex/teas.ts` |

## Step-by-step

### 1. Copy files into your project

```bash
cd ~/Desktop/tea-base/tea-base   # your nested project folder

# Back up existing schema if you have one
cp convex/schema.ts convex/schema.ts.bak 2>/dev/null

# Copy the three files
cp [download-location]/schema.ts convex/schema.ts
cp [download-location]/seedTeas.ts convex/seedTeas.ts
cp [download-location]/teas.ts convex/teas.ts
```

### 2. Start Convex dev server

```bash
npm run dev
```

Wait for "Convex functions ready!" — the schema changes will auto-deploy.

### 3. Seed the database

Open a **new terminal tab** (keep `npm run dev` running):

```bash
npx convex run seedTeas:seed
```

You should see:
```
✅ Seeded 28 teas successfully!
```

### 4. Verify in Convex Dashboard

Go to https://dashboard.convex.dev/d/blissful-ant-614 → Data → teas table.
You should see 28 rows with all tea data and photo URLs.

### 5. Use in your React frontend

```tsx
import { useQuery } from "convex/react";
import { api } from "../convex/_generated/api";

// List all teas
const teas = useQuery(api.teas.list);

// Get one tea by slug (for detail page)
const tea = useQuery(api.teas.getBySlug, { slug: "long-jing" });

// Filter by type
const greenTeas = useQuery(api.teas.listByType, { type: "green" });

// Search
const results = useQuery(api.teas.search, { searchQuery: "dragon" });
```

## Safe to re-run

The seed script clears existing teas first, so you can run it again anytime
without getting duplicates.

## What's next

After seeding, you're ready for **Step 2: Build the tea browse page** in Cursor.
You can use this prompt in Cursor:

> Build a tea browse page at the root route. Use `useQuery(api.teas.list)` to
> fetch all teas from Convex. Display them as a responsive card grid. Each card
> shows the tea image (imageUrl), name, nameNative, type badge, origin region,
> and caffeine level. Cards should link to `/tea/{slug}` for the detail page.
> Use Tailwind CSS. Make it mobile-first and beautiful.
