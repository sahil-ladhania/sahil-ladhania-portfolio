# Phase 5: Tech Architecture

**Status:** Approved  
**Domain:** sahilladhania.com  
**Depends on:** [phase-4-feature-specs.md](./phase-4-feature-specs.md)  
**Last updated:** 2026-05-30

---

## Source answers

| Question | Answer |
|----------|--------|
| Q1 Database | PostgreSQL (dedicated to this portfolio) |
| Q2 Hosting | Supabase |
| Q3 ORM | Prisma |
| Q4 AI provider | OpenAI |
| Q5 Content | Markdown (`.md`) files |
| Q6 i18n | No — English only |
| Q7 Third-party accounts | All available (OpenAI, Supabase, Resend, Spotify, GitHub, etc.) |
| UI components | **Aceternity UI** — adopt incrementally, selection decided during build |

---

## 1. Stack summary

| Layer | Choice |
|-------|--------|
| Framework | Next.js 16 App Router |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 |
| UI components | **Aceternity UI** (copy-in, adapted to design tokens) |
| Animation | Framer Motion |
| Database | PostgreSQL on Supabase |
| ORM | Prisma |
| Vector search | pgvector (Supabase extension) + LangChain.js |
| AI | OpenAI — `gpt-4o` (chat), `text-embedding-3-small` (embeddings) |
| Email | Resend |
| Music | Spotify Web API |
| Analytics | Vercel Web Analytics |
| Deployment | Vercel |
| Content | Local Markdown files with frontmatter |

---

## 2. High-level architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Vercel (Edge + Node)                      │
├─────────────────────────────────────────────────────────────────┤
│  middleware.ts          → visitor log (session cookie + insert)  │
│  app/page.tsx           → single-page portfolio (MD → sections)  │
│  app/api/chat           → RAG stream (OpenAI + pgvector)         │
│  app/api/contact        → Resend email                             │
│  app/api/spotify/*      → Now playing + sync                       │
├─────────────────────────────────────────────────────────────────┤
│  content/*.md           → source of truth for site copy            │
│  scripts/rag-reindex    → MD + resume → chunk → embed → DB       │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Supabase PostgreSQL                           │
│  visitor_events · knowledge_chunks · music_snapshots             │
│  pgvector extension on knowledge_chunks.embedding                │
└─────────────────────────────────────────────────────────────────┘
                               │
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
          OpenAI API      Spotify API       Resend API
```

---

## 3. Folder structure

```
sahil-ladhania-portfolio/
├── app/
│   ├── layout.tsx                 # Root layout, fonts, providers, analytics
│   ├── page.tsx                   # Single-page portfolio
│   ├── globals.css                # Design tokens (Phase 1)
│   ├── design-system/
│   │   └── page.tsx               # Dev component preview (remove pre-launch)
│   └── api/
│       ├── chat/
│       │   └── route.ts           # POST — streaming RAG chat
│       ├── contact/
│       │   └── route.ts           # POST — contact form → Resend
│       └── spotify/
│           ├── now-playing/
│           │   └── route.ts       # GET — cached now playing
│           └── sync/
│               └── route.ts       # POST — cron/manual music sync → RAG
├── components/
│   ├── ui/                        # Phase 1 primitives (Button, GlassCard, etc.)
│   ├── aceternity/                # Aceternity UI components (added incrementally)
│   │   └── floating-dock.tsx      # Site navigation
│   ├── theme/                     # ThemeProvider, ThemeToggle
│   ├── layout/
│   │   ├── SiteLayout.tsx
│   │   ├── SiteHeader.tsx
│   │   └── SiteFooter.tsx
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── ProofStrip.tsx
│   │   ├── AboutSection.tsx
│   │   ├── ProjectList.tsx
│   │   ├── ProjectCard.tsx
│   │   ├── CurrentlySection.tsx
│   │   ├── ZyntohouseSection.tsx
│   │   └── ContactSection.tsx
│   └── features/
│       ├── agent-chat/
│       │   ├── AgentChat.tsx
│       │   ├── AgentChatProvider.tsx
│       │   └── agent-chat.types.ts
│       ├── command-palette/
│       │   ├── CommandPalette.tsx
│       │   └── command-palette.types.ts
│       ├── contact-form/
│       │   ├── ContactForm.tsx
│       │   ├── useContactForm.ts
│       │   └── contact-form.types.ts
│       ├── spotify-widget/
│       │   └── SpotifyWidget.tsx
│       ├── timezone-clock/
│       │   └── TimezoneClock.tsx
│       └── architecture-diagram/
│           └── ArchitectureDiagram.tsx
├── content/
│   ├── resume.md                  # CV content for RAG + about context
│   ├── about.md                   # About section body + origin story
│   ├── zyntohouse.md              # Studio section
│   ├── site.md                    # Hero, proof, contact meta (frontmatter)
│   ├── projects/
│   │   ├── tbk-crm.md
│   │   ├── reachly.md
│   │   ├── yummmzo.md
│   │   └── lulu.md
│   └── posts/
│       └── *.md                   # Curated posts for RAG (manual updates)
├── config/
│   └── env.ts                     # Zod-validated env (single source)
├── lib/
│   ├── prisma.ts                  # Prisma singleton
│   ├── cn.ts
│   ├── motion.ts
│   ├── content/
│   │   ├── loader.ts              # Read + parse MD files
│   │   ├── projects.ts            # Typed project accessors
│   │   └── posts.ts               # Typed post accessors
│   ├── rag/
│   │   ├── chunker.ts             # Split MD into chunks
│   │   ├── embed.ts               # OpenAI embeddings
│   │   ├── ingest.ts              # Full reindex pipeline
│   │   ├── search.ts              # pgvector similarity search
│   │   └── chat.ts                # System prompt + completion
│   ├── openai.ts                  # OpenAI client singleton
│   ├── resend.ts                  # Resend client singleton
│   └── spotify.ts                 # Spotify token + API helpers
├── prisma/
│   ├── schema.prisma
│   └── migrations/
├── scripts/
│   └── rag-reindex.ts             # CLI: npm run rag:reindex
├── types/
│   ├── api.types.ts               # ApiResponse<T>
│   └── content.types.ts           # Project, Post, SiteMeta interfaces
├── public/
│   ├── cv/
│   │   └── sahil-ladhania-cv.pdf
│   └── diagrams/
│       ├── tbk-crm.svg
│       └── reachly.svg
├── docs/                          # Planning docs (this folder)
├── middleware.ts                  # Visitor logging
├── .env.example
├── .env                           # gitignored
├── next.config.ts
├── package.json
├── postcss.config.mjs
└── tsconfig.json
```

### Path aliases (`tsconfig.json`)

```json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./*"]
    }
  }
}
```

---

## 4. Supabase setup

### 4.1 Project

- Create a **new Supabase project** dedicated to `sahilladhania.com`
- Enable **pgvector** extension:

```sql
CREATE EXTENSION IF NOT EXISTS vector;
```

### 4.2 Connection strings

| Variable | Use |
|----------|-----|
| `DATABASE_URL` | Prisma pooled connection (Supabase pooler, port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Prisma migrations (direct connection, port 5432) |

Prisma `schema.prisma`:

```prisma
datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")
  directUrl = env("DIRECT_URL")
}
```

### 4.3 Supabase features used

| Feature | Used? |
|---------|-------|
| PostgreSQL | Yes |
| pgvector | Yes |
| Supabase Auth | No |
| Supabase Storage | No (assets in `/public`) |
| Supabase Realtime | No |
| Row Level Security | Optional — API routes use service role via Prisma, not client-side Supabase SDK |

**Decision:** Use Supabase as **hosted Postgres only**. No `@supabase/supabase-js` in the frontend. All DB access through Prisma in API routes / middleware.

---

## 5. Prisma schema

```prisma
generator client {
  provider        = "prisma-client-js"
  previewFeatures = ["postgresqlExtensions"]
}

datasource db {
  provider   = "postgresql"
  url        = env("DATABASE_URL")
  directUrl  = env("DIRECT_URL")
  extensions = [vector]
}

model VisitorEvent {
  id         String   @id @default(uuid()) @db.Uuid
  sessionId  String   @map("session_id") @db.Uuid
  pathname   String
  referrer   String?
  country    String?  @db.Char(2)
  createdAt  DateTime @default(now()) @map("created_at") @db.Timestamptz

  @@index([createdAt(sort: Desc)])
  @@index([sessionId])
  @@index([country])
  @@map("visitor_events")
}

model KnowledgeChunk {
  id          String                      @id @default(uuid()) @db.Uuid
  content     String
  embedding   Unsupported("vector(1536)")?
  sourceType  String                      @map("source_type") // resume | project | post | music
  sourceId    String                      @map("source_id")
  title       String
  updatedAt   DateTime                    @updatedAt @map("updated_at") @db.Timestamptz

  @@index([sourceType, sourceId])
  @@map("knowledge_chunks")
}

model MusicSnapshot {
  id         String   @id @default(uuid()) @db.Uuid
  trackName  String   @map("track_name")
  artist     String
  album      String?
  spotifyId  String?  @map("spotify_id")
  snapshotType String @map("snapshot_type") // now_playing | top_track | liked
  fetchedAt  DateTime @default(now()) @map("fetched_at") @db.Timestamptz

  @@index([snapshotType, fetchedAt(sort: Desc)])
  @@map("music_snapshots")
}
```

### Vector operations

Prisma `Unsupported` type for `embedding` — reads/writes via **`$queryRaw` / `$executeRaw`**:

```typescript
// lib/rag/search.ts — similarity search
await prisma.$queryRaw`
  SELECT id, content, source_type, source_id, title,
         1 - (embedding <=> ${embedding}::vector) AS score
  FROM knowledge_chunks
  WHERE 1 - (embedding <=> ${embedding}::vector) > 0.7
  ORDER BY embedding <=> ${embedding}::vector
  LIMIT 5
`;
```

Alternative: LangChain `PGVectorStore` pointed at same `DATABASE_URL` — acceptable if it reduces boilerplate. Primary ORM remains Prisma for relational models.

---

## 6. Content system (Markdown)

### 6.1 Parser

- **`gray-matter`** — frontmatter + body split
- **`remark` / `remark-html`** or **`react-markdown`** — render MD body in sections where needed
- Content loaded at **build time** (`import fs` in server components) or via `lib/content/loader.ts`

### 6.2 File conventions

#### `content/projects/tbk-crm.md`

```markdown
---
slug: tbk-crm
name: TBK CRM
role: Founder & Lead Engineer
outcomeLine: Multi-tenant hospitality SaaS powering 50+ clients
order: 1
hasArchitectureDiagram: true
expandInWork: true
techStack:
  - Node.js
  - PostgreSQL
  - Redis
links:
  - label: Live app
    href: https://example.com
---

## Problem

Villa and hospitality operators were running bookings...

## Solution

Built a multi-tenant SaaS CRM...

## Result

50+ paying clients...
```

#### `content/posts/example.md`

```markdown
---
id: post-001
title: Why I build agentic systems with approval gates
platform: linkedin
publishedAt: 2025-11-15
url: https://linkedin.com/...
---

Full post body here...
```

#### `content/site.md`

```markdown
---
hero:
  greeting: "Hi, I'm Sahil."
  oneLiner: "I build production AI systems..."
  subtext: "Full-stack and AI engineer..."
contact:
  email: hello@sahilladhania.com
  calUrl: https://cal.com/sahilladhania
  linkedin: https://linkedin.com/in/sahilladhania
  github: https://github.com/sahilladhania
proof:
  testimonial:
    quote: "..."
    author: Raj Mehta
    role: Founder, Horizon Stays
  clients:
    - Horizon Stays
    - Coastal Villas
---
```

### 6.3 Content → UI flow

```
content/*.md
    ↓
lib/content/loader.ts (parse frontmatter + body)
    ↓
app/page.tsx (server component — passes typed data to sections)
    ↓
Section components (render copy + MD body where needed)
```

### 6.4 Content → RAG flow

```
content/*.md + public/cv/*.pdf (text extracted)
    ↓
scripts/rag-reindex.ts
    ↓
lib/rag/chunker.ts (split by headings, ~500 tokens per chunk)
    ↓
lib/rag/embed.ts (OpenAI text-embedding-3-small)
    ↓
Upsert knowledge_chunks (delete old chunks per sourceId, insert new)
```

**Trigger reindex:** `npm run rag:reindex` after content changes. Optional: Vercel deploy hook post-build step.

---

## 7. API routes

### 7.1 `POST /api/chat`

| Item | Detail |
|------|--------|
| Runtime | Node.js |
| Input | `{ messages: { role, content }[] }` |
| Flow | Embed last user message → pgvector search → build context → `gpt-4o` stream |
| SDK | Vercel AI SDK (`streamText`) or OpenAI SDK streaming |
| Rate limit | 10 req/min per session cookie |
| max_tokens | 500 |
| Response | `text/event-stream` |

### 7.2 `POST /api/contact`

| Item | Detail |
|------|--------|
| Input | `{ name, email, message }` |
| Validation | Zod schema |
| Action | Resend → `CONTACT_EMAIL_TO` |
| Rate limit | 3 req/hour per IP |
| Honeypot | `website` field — reject if filled |

### 7.3 `GET /api/spotify/now-playing`

| Item | Detail |
|------|--------|
| Cache | `revalidate: 30` |
| Auth | Refresh token flow server-side |
| Response | `{ success, data: { track, artist, isPlaying, url } }` |

### 7.4 `POST /api/spotify/sync` (optional cron)

| Item | Detail |
|------|--------|
| Auth | `CRON_SECRET` header (Vercel Cron) |
| Action | Fetch top tracks → insert `music_snapshots` → reindex music chunks |

---

## 8. Middleware (`middleware.ts`)

```typescript
// Pseudocode
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip static, api, _next
  if (shouldSkip(pathname)) return NextResponse.next();

  const sessionId = getOrSetSessionCookie(request);
  const shouldLog = await dedupePageview(sessionId, pathname);

  if (shouldLog) {
    await logVisitorEvent({
      sessionId,
      pathname,
      referrer: request.headers.get("referer"),
      country: request.headers.get("x-vercel-ip-country"),
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|cv|diagrams).*)"],
};
```

**Note:** Middleware DB writes on Vercel — use edge-compatible approach or fire-and-forget fetch to internal API if Prisma edge issues arise. Fallback: log via `POST /api/visitor` from middleware using `waitUntil`. Document both; prefer **`waitUntil` + Prisma** on Node middleware (Next.js 16 supports Node middleware option) or lightweight fetch to API route.

---

## 9. Environment variables

### 9.1 `config/env.ts`

```typescript
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),

  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),

  OPENAI_API_KEY: z.string().startsWith("sk-"),

  RESEND_API_KEY: z.string().startsWith("re_"),
  CONTACT_EMAIL_TO: z.string().email(),
  CONTACT_EMAIL_FROM: z.string().email(),

  SPOTIFY_CLIENT_ID: z.string().min(1),
  SPOTIFY_CLIENT_SECRET: z.string().min(1),
  SPOTIFY_REFRESH_TOKEN: z.string().min(1),

  CRON_SECRET: z.string().min(16).optional(),

  NEXT_PUBLIC_SITE_URL: z.string().url().default("https://sahilladhania.com"),
});

export const env = envSchema.parse(process.env);
```

### 9.2 `.env.example`

```bash
# Database (Supabase)
DATABASE_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true
DIRECT_URL=postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:5432/postgres

# OpenAI
OPENAI_API_KEY=sk-...

# Resend
RESEND_API_KEY=re_...
CONTACT_EMAIL_TO=hello@sahilladhania.com
CONTACT_EMAIL_FROM=onboarding@resend.dev

# Spotify
SPOTIFY_CLIENT_ID=
SPOTIFY_CLIENT_SECRET=
SPOTIFY_REFRESH_TOKEN=

# Cron (Vercel)
CRON_SECRET=your-random-secret-here

# Site
NEXT_PUBLIC_SITE_URL=https://sahilladhania.com
```

**Never access `process.env` outside `config/env.ts`.**

---

## 10. Aceternity UI

### 10.1 Role in the stack

[Aceternity UI](https://ui.aceternity.com) provides pre-built animated React components (copy-paste, not an npm package). Used **alongside** Phase 1 primitives — not as a replacement for the design system.

**Adoption model:** Incremental. Specific components are chosen **during build**, not pre-planned. Sahil decides on the go which effects to use and where.

### 10.2 Integration rules

| Rule | Detail |
|------|--------|
| Copy-in | Paste component source into `components/aceternity/` — one file per component |
| Token alignment | Replace hardcoded Aceternity colors with Phase 1 CSS variables (`--accent`, `--background`, etc.) |
| Phase 1 guardrails | Default to minimal. Expressive Aceternity effects (glow, particles, 3D) only where Sahil explicitly approves per component |
| Dependencies | Aceternity components may require extra packages (e.g. `three`, `@react-three/fiber`) — install only when that component is added |
| Framer Motion | Already in stack — most Aceternity components depend on it |
| No blanket import | Do not install all Aceternity components upfront |

### 10.3 Folder convention

```
components/aceternity/
├── README.md              # Log of adopted components + source URLs + date added
├── TextGenerateEffect.tsx # example — added when needed
├── BackgroundBeams.tsx    # example — added when needed
└── ...
```

Each file header comment:

```typescript
// Source: https://ui.aceternity.com/components/[name]
// Added: YYYY-MM-DD
// Used in: components/sections/Hero.tsx
// Notes: accent colors mapped to --accent-900 / --accent-300
```

### 10.4 Component selection log (updated during build)

| Component | Section / use | Status |
|-----------|---------------|--------|
| *TBD* | *Decided during Phase 6 build* | — |

*This table is filled in as components are adopted — not decided in planning.*

### 10.5 Relationship to Phase 1 primitives

```
Phase 1 ui/          →  base tokens, buttons, cards, layout
Aceternity copy-ins  →  selective visual enhancement on top
Section components   →  compose both layers
```

When an Aceternity component conflicts with Phase 1 minimalism, **Phase 1 wins unless Sahil overrides for that instance**.

---

## 11. Key dependencies

### Production

| Package | Purpose |
|---------|---------|
| `next` | Framework |
| `react`, `react-dom` | UI |
| `@prisma/client` | Database ORM |
| `zod` | Env + request validation |
| `openai` | Embeddings + chat |
| `ai` | Vercel AI SDK streaming |
| `@langchain/openai` | Optional — LangChain embeddings/chat |
| `@langchain/community` | Optional — PGVectorStore |
| `langchain` | RAG orchestration (per original brief) |
| `resend` | Contact form email |
| `gray-matter` | MD frontmatter |
| `react-markdown` | Render MD content |
| `framer-motion` | Animations (Phase 1 + Aceternity UI) |
| `cmdk` | Command palette |
| `clsx`, `tailwind-merge` | className utility |
| `@vercel/analytics` | Analytics |

### Dev

| Package | Purpose |
|---------|---------|
| `prisma` | CLI + migrations |
| `tsx` | Run `scripts/rag-reindex.ts` |
| `tailwindcss`, `@tailwindcss/postcss` | Styling |
| `typescript`, `@types/node`, `@types/react` | Types |

**Aceternity UI:** No single package. Components copied from [ui.aceternity.com](https://ui.aceternity.com) as needed. Additional deps (e.g. `three`, `@tabler/icons-react`) added per component.

---

## 12. RAG pipeline detail

### 12.1 Ingestion sources

| Source | File / origin | sourceType | sourceId |
|--------|---------------|------------|----------|
| Resume | `content/resume.md` + PDF text extract | `resume` | `resume` |
| Projects | `content/projects/*.md` | `project` | slug from frontmatter |
| Posts | `content/posts/*.md` | `post` | id from frontmatter |
| About | `content/about.md` | `resume` | `about` |
| Zyntohouse | `content/zyntohouse.md` | `project` | `zyntohouse` |
| Music | Spotify sync → `music_snapshots` | `music` | spotify track id |

### 12.2 Chunking rules

- Split on `##` headings — keep heading in chunk text
- Max ~500 tokens per chunk, 50 token overlap
- Store `title` = file title or heading

### 12.3 Chat completion

```typescript
// Model config
model: "gpt-4o"
temperature: 0.3
max_tokens: 500

// System prompt — see phase-4-feature-specs.md §1.4
// Context injected as:
// "## Relevant context\n{chunks}\n\n## User question\n{message}"
```

### 12.4 Reindex script

```bash
npm run rag:reindex
# → reads all content/*.md
# → chunks + embeds
# → deletes existing chunks per sourceId
# → inserts new rows with embeddings
# → syncs latest music snapshots
```

---

## 13. Deployment (Vercel)

| Setting | Value |
|---------|-------|
| Framework | Next.js |
| Domain | `sahilladhania.com` |
| Env vars | All from `.env.example` |
| Build command | `prisma generate && prisma migrate deploy && next build` |
| Post-build | Optional: `npm run rag:reindex` (or manual after content deploys) |

### Vercel Cron (optional)

```json
// vercel.json
{
  "crons": [
    {
      "path": "/api/spotify/sync",
      "schedule": "0 6 * * *"
    }
  ]
}
```

---

## 14. Security

| Concern | Mitigation |
|---------|------------|
| API keys | Server-only env via `config/env.ts` |
| OpenAI abuse | Rate limit per session, max_tokens cap |
| Contact spam | Honeypot + rate limit + Zod validation |
| Visitor privacy | No raw IP, anonymous session UUID |
| Spotify tokens | Refresh token server-only |
| DB access | Prisma from server only — never expose Supabase creds to client |
| CRON route | `CRON_SECRET` header check |

---

## 15. i18n

**Not implemented.** English only. No `next-intl`, no locale routing, no translation files.

---

## 16. Explicit non-decisions (deferred)

| Item | Status |
|------|--------|
| Redis caching for chat | Optional P2 |
| Admin dashboard | Excluded (Phase 4) |
| CMS (Sanity, Contentful) | Excluded — MD files |
| GitHub widget | Excluded (Phase 4) |
| Multi-language | Excluded |

---

## 17. Phase 5 implementation scope

When approved, implementation prep includes:

1. Supabase project + pgvector extension
2. Prisma schema + initial migration
3. `config/env.ts` + `.env.example`
4. `lib/prisma.ts`, `lib/openai.ts`, `lib/resend.ts`, `lib/spotify.ts`
5. `lib/content/loader.ts` + initial MD content files (from Phase 3 copy)
6. `lib/rag/*` + `scripts/rag-reindex.ts`
7. API route stubs (`/api/chat`, `/api/contact`, `/api/spotify/now-playing`)
8. `middleware.ts` visitor logging
9. `package.json` scripts: `rag:reindex`, `db:migrate`, `db:generate`

**Does not include:** Full UI build (Phase 6 build order).

---

## 18. Approval checklist

Reply **Approved** or list edits:

- [x] Supabase PostgreSQL + pgvector
- [x] Prisma schema (visitor_events, knowledge_chunks, music_snapshots)
- [x] Markdown content system with frontmatter
- [x] OpenAI gpt-4o + text-embedding-3-small
- [x] Folder structure
- [x] Env validation via Zod
- [x] English only, no i18n
- [x] Vercel deployment + build pipeline
- [x] Aceternity UI — incremental copy-in model

**Approved by Sahil Ladhania — 2026-05-30**
