# Phase 6: Build Order

**Status:** Approved  
**Domain:** sahilladhania.com  
**Depends on:** [phase-5-tech-architecture.md](./phase-5-tech-architecture.md)  
**Launch target:** Sunday, 31 May 2026  
**Last updated:** 2026-05-30

---

## Source answers

| Question | Answer |
|----------|--------|
| Q1 Deadline | **Sunday 31 May 2026** (tomorrow) |
| Q2 Time available | Full day — until done |
| Q3 Hard MVP | **Everything decided** across Phases 1–5 (full scope, not reduced) |
| Q4 Team | Solo |
| Q5 CI/CD | **No** — manual deploy flow |

---

## 1. Launch definition

**Done = live at `sahilladhania.com` with all of the following working:**

| Area | Deliverable |
|------|-------------|
| Design system | Tokens, theme toggle, UI primitives |
| Page | Single-page — all 7 sections + footer |
| Content | Markdown-driven copy (Phase 3) |
| Projects | Expand-in-place cards, Lulu teaser → `#now` |
| CV | Download CTA in hero, header, contact |
| Agent chat | Bottom-center RAG chatbot (OpenAI + pgvector) |
| Command palette | ⌘K — all 12 actions |
| Visitor log | Middleware → Supabase (query DB directly) |
| Contact | Form (Resend) + direct links |
| Spotify | Now Playing widget |
| Clock | IST timezone |
| Diagrams | Placeholders for TBK + Reachly (or SVGs if ready) |
| Analytics | Vercel Web Analytics |
| Aceternity UI | Added incrementally where you choose during build |
| Deploy | Manual Vercel deploy, domain connected |

**Remove before sharing URL:** `/design-system` route (or leave unlinked).

---

## 2. Pre-flight (before writing code)

Complete these **first** — blockers if skipped.

| # | Task | Where |
|---|------|-------|
| 1 | Create Supabase project | [supabase.com](https://supabase.com) |
| 2 | Run `CREATE EXTENSION IF NOT EXISTS vector;` in SQL editor | Supabase |
| 3 | Copy `DATABASE_URL` (pooler, 6543) + `DIRECT_URL` (5432) | Supabase → Settings → Database |
| 4 | Create `.env.local` from `.env.example` | Local |
| 5 | Confirm OpenAI API key with credits | platform.openai.com |
| 6 | Confirm Resend API key + verify sender domain | resend.com |
| 7 | Spotify app + refresh token | developer.spotify.com |
| 8 | Place CV PDF at `public/cv/sahil-ladhania-cv.pdf` | Local |
| 9 | Vercel project linked to repo (or ready for `vercel` CLI) | vercel.com |
| 10 | Domain `sahilladhania.com` DNS pointed to Vercel | Domain registrar |

---

## 3. Build sequence overview

```
Day 1 (31 May) — solo, full day
─────────────────────────────────────────────────────────
 0. Foundation     → deps, env, Prisma, Supabase
 1. Design system  → tokens, theme, ui/*
 2. Content        → content/*.md + loader
 3. Page shell     → layout, nav, sections (static)
 4. Backend        → middleware, API routes, RAG
 5. Features       → chat, palette, contact, widgets
 6. Aceternity     → on the go (during 3 & 5)
 7. Polish         → metadata, a11y, mobile pass
 8. Deploy         → manual Vercel + migrate + reindex
 9. Verify         → launch checklist
─────────────────────────────────────────────────────────
```

**Rule:** Finish each block before moving on. Do not start Phase 4 features until page shell renders.

---

## Block 0 — Foundation (~45 min)

**Goal:** Repo ready for feature work.

- [ ] Install production deps:
  ```bash
  npm install framer-motion clsx tailwind-merge zod @prisma/client openai ai langchain @langchain/openai resend gray-matter react-markdown cmdk @vercel/analytics
  ```
- [ ] Install dev deps:
  ```bash
  npm install -D prisma tsx
  ```
- [ ] Create `config/env.ts` (Zod validation — Phase 5 §9)
- [ ] Create `.env.example` + `.env.local` (gitignore confirmed)
- [ ] Init Prisma: `prisma/schema.prisma` (Phase 5 §5)
- [ ] Run `npx prisma migrate dev --name init`
- [ ] Create `lib/prisma.ts` singleton
- [ ] Create `lib/cn.ts`, `lib/motion.ts`
- [ ] Create `types/api.types.ts`, `types/content.types.ts`

**Exit criteria:** `npx prisma studio` opens; env validates without error.

---

## Block 1 — Design system (~1.5 h)

**Goal:** Phase 1 complete per [phase-1-design-system.md](./phase-1-design-system.md).

- [ ] Replace `app/globals.css` with full token system (Phase 1 §9)
- [ ] Update `app/layout.tsx` — Geist, `class="light"`, theme script anti-flash
- [ ] Build `components/theme/ThemeProvider.tsx` + `ThemeToggle.tsx`
- [ ] Build `components/ui/*` — Button, Link, Badge, GlassCard, Container, Section, SectionHeading, Divider, Input, Textarea, IconButton, Skeleton, VisuallyHidden
- [ ] Build `app/design-system/page.tsx` — token + component preview
- [ ] Smoke test: theme toggle, light/dark tokens, focus rings

**Exit criteria:** `/design-system` renders all primitives correctly in both themes.

---

## Block 2 — Content layer (~45 min)

**Goal:** All copy lives in Markdown; loader returns typed data.

- [ ] Create folder structure:
  ```
  content/
    site.md
    about.md
    resume.md
    zyntohouse.md
    projects/tbk-crm.md
    projects/reachly.md
    projects/yummmzo.md
    projects/lulu.md
    posts/          (empty or 1 stub)
  ```
- [ ] Populate MD files from [phase-3-copy.md](./phase-3-copy.md)
- [ ] Build `lib/content/loader.ts` + `lib/content/projects.ts`
- [ ] Verify frontmatter parses correctly

**Exit criteria:** Loader returns typed project list + site meta in a test script or temp page.

---

## Block 3 — Page shell (~2.5 h)

**Goal:** Phase 2 complete — full single page with real content.

- [ ] `components/layout/SiteLayout.tsx` — floating dock + agent chat sidebar
- [ ] `SiteHeader.tsx` — Aceternity Floating Dock nav
- [ ] `components/sections/Hero.tsx`
- [ ] `components/sections/ProofStrip.tsx`
- [ ] `components/sections/AboutSection.tsx` — render MD body
- [ ] `components/sections/ProjectList.tsx` + `ProjectCard.tsx` — expand-in-place, one-at-a-time, hash update
- [ ] `components/sections/CurrentlySection.tsx`
- [ ] `components/sections/ZyntohouseSection.tsx`
- [ ] `components/sections/ContactSection.tsx` — links row only (form in Block 5)
- [ ] `components/layout/SiteFooter.tsx` — copyright, back to top
- [ ] `components/features/timezone-clock/TimezoneClock.tsx` — footer
- [ ] `components/shared/DownloadCvButton.tsx`
- [ ] Wire `app/page.tsx` — server component, load MD, compose sections
- [ ] Scroll spy + section hash navigation
- [ ] **Aceternity (on the go):** add components to `components/aceternity/` as you decide; map to `--accent` tokens; log in `components/aceternity/README.md`

**Exit criteria:** Full page scrolls, all sections populated, project cards expand/collapse, CV downloads, IST clock ticks.

---

## Block 4 — Backend core (~1 h)

**Goal:** Database writes + API skeletons.

- [ ] `middleware.ts` — visitor logging (session cookie, dedupe, insert `visitor_events`)
  - If Prisma edge fails: fallback `POST /api/visitor` + `waitUntil`
- [ ] `lib/openai.ts`, `lib/resend.ts`, `lib/spotify.ts`
- [ ] `lib/rag/chunker.ts`, `embed.ts`, `ingest.ts`, `search.ts`, `chat.ts`
- [ ] `scripts/rag-reindex.ts` + `"rag:reindex": "tsx scripts/rag-reindex.ts"` in package.json
- [ ] Run `npm run rag:reindex` locally — confirm `knowledge_chunks` populated

**Exit criteria:** Visitor row appears in DB on page load; knowledge chunks exist after reindex.

---

## Block 5 — Features (~3 h)

**Goal:** Phase 4 features live per [phase-4-feature-specs.md](./phase-4-feature-specs.md).

### 5a. Contact (~45 min)
- [ ] `components/features/contact-form/ContactForm.tsx` + `useContactForm.ts`
- [ ] `POST /api/contact` — Zod, honeypot, Resend, rate limit
- [ ] Wire form into `ContactSection` below direct links

### 5b. Command palette (~30 min)
- [ ] `components/features/command-palette/CommandPalette.tsx` (cmdk)
- [ ] All 12 actions: 5 nav, open agent, copy email, book call, GitHub, LinkedIn, download CV, toggle theme
- [ ] Register in `SiteLayout`

### 5c. Agent chat (~1.5 h)
- [ ] `components/features/agent-chat/AgentChat.tsx` + `AgentChatProvider.tsx`
- [ ] Bottom-center collapsed bar → expanded panel
- [ ] `POST /api/chat` — embed → pgvector search → `gpt-4o` stream
- [ ] Rate limit (10/min/session), error states, reduced motion
- [ ] Command palette "Ask my agent" opens chat

### 5d. Spotify (~30 min)
- [ ] `GET /api/spotify/now-playing`
- [ ] `components/features/spotify-widget/SpotifyWidget.tsx` — footer
- [ ] Optional: `POST /api/spotify/sync` + one manual sync for RAG music chunks

### 5e. Diagrams + analytics (~15 min)
- [ ] `components/features/architecture-diagram/ArchitectureDiagram.tsx`
- [ ] Placeholders in TBK + Reachly expanded cards (`public/diagrams/`)
- [ ] Add `@vercel/analytics` to root layout

**Exit criteria:** Chat streams grounded answers; ⌘K works; contact email sends; Spotify shows track or hides gracefully.

---

## Block 6 — Polish (~1 h)

**Goal:** Production-ready, not demo-ready.

- [ ] `metadata` in layout — title, description, OG tags, `sahilladhania.com`
- [ ] Favicon + `apple-touch-icon`
- [ ] Mobile pass — chat bar doesn't overlap content; nav menu works
- [ ] `prefers-reduced-motion` — verify animations respect it
- [ ] Replace `[MOCK]` URLs in content where real links exist
- [ ] Remove or unlink `/design-system`
- [ ] Quick pass: no `console.log`, no hardcoded secrets
- [ ] Run `npm run build` — fix all errors before deploy

**Exit criteria:** `npm run build` passes cleanly.

---

## Block 7 — Manual deploy (~45 min)

**Goal:** Live on production domain.

### 7a. Vercel setup
- [ ] Push code to GitHub (or deploy via `vercel` CLI)
- [ ] Create/import Vercel project
- [ ] Add **all** env vars from `.env.example` in Vercel dashboard
- [ ] Set build command:
  ```bash
  npx prisma generate && npx prisma migrate deploy && next build
  ```

### 7b. Database
- [ ] Confirm production Supabase URLs in Vercel env
- [ ] `prisma migrate deploy` runs successfully on build

### 7c. Domain
- [ ] Add `sahilladhania.com` in Vercel → Domains
- [ ] Confirm DNS + SSL active

### 7d. Post-deploy
- [ ] Run RAG reindex against production DB:
  ```bash
  DATABASE_URL="..." npm run rag:reindex
  ```
  (Or trigger via one-off script / local with prod `DATABASE_URL`)
- [ ] Test Spotify + Resend on production (env vars correct)

**No CI/CD:** Every future deploy = push to main + manual `vercel --prod` or Vercel dashboard redeploy.

---

## Block 8 — Launch verification

Run through before sharing the URL.

| # | Test | Pass |
|---|------|------|
| 1 | Site loads at `sahilladhania.com` | ☐ |
| 2 | Light/dark toggle persists on refresh | ☐ |
| 3 | All 5 nav sections scroll correctly | ☐ |
| 4 | Project cards expand/collapse (one at a time) | ☐ |
| 5 | CV downloads from hero, header, contact | ☐ |
| 6 | ⌘K palette — all 12 actions work | ☐ |
| 7 | Agent chat answers a project question from RAG | ☐ |
| 8 | Agent refuses a question outside knowledge base | ☐ |
| 9 | Contact form sends email | ☐ |
| 10 | Direct links (Cal, LinkedIn, email) work | ☐ |
| 11 | Spotify widget shows track or hides silently | ☐ |
| 12 | IST clock shows correct time | ☐ |
| 13 | Visitor row logged in Supabase on pageview | ☐ |
| 14 | Mobile layout — no broken overlap | ☐ |
| 15 | Vercel Analytics receiving data | ☐ |

---

## 4. Time budget (realistic solo estimate)

| Block | Estimate | Cumulative |
|-------|----------|------------|
| 0 Foundation | 45 min | 0:45 |
| 1 Design system | 1.5 h | 2:15 |
| 2 Content | 45 min | 3:00 |
| 3 Page shell | 2.5 h | 5:30 |
| 4 Backend | 1 h | 6:30 |
| 5 Features | 3 h | 9:30 |
| 6 Polish | 1 h | 10:30 |
| 7 Deploy | 45 min | 11:15 |
| 8 Verify | 30 min | **~12 h** |

**Full scope in one day is tight but doable** if you stay sequential and skip perfection on Aceternity extras. Use AI-assisted coding (Cursor) aggressively in Blocks 3 and 5.

**If time runs out — cut order (only if emergency):**
1. Spotify sync → RAG music (keep Now Playing widget)
2. Architecture diagram placeholders → plain text "Coming soon"
3. Aceternity effects → ship without, add post-launch
4. `content/posts/` → empty (agent skips posts until you add them)

Do **not** cut: page sections, CV, contact form, agent chat, command palette, visitor log.

---

## 5. Manual deploy workflow (ongoing)

```
Local changes
    ↓
npm run build          (verify locally)
    ↓
git add + commit
    ↓
git push origin main
    ↓
vercel --prod          OR Vercel dashboard → Redeploy
    ↓
If schema changed → prisma migrate deploy (via build command)
If content changed → npm run rag:reindex (manual, prod DATABASE_URL)
    ↓
Smoke test production
```

**No GitHub Actions. No auto-reindex. No staging environment in MVP.**

---

## 6. Post-launch (week 1 — not launch day)

| Task | When |
|------|------|
| Replace `[MOCK]` metrics with real numbers | When ready |
| Write real About origin story | When ready |
| Refine hero one-liner | When ready |
| Add real client logos to `#proof` | When ready |
| Upload TBK + Reachly architecture SVGs | When ready |
| Add curated posts to `content/posts/` + reindex | Ongoing |
| Remove `/design-system` route entirely | Anytime |
| Add more Aceternity components | On the go |

---

## 7. Reference map

| Build block | Planning doc |
|-------------|--------------|
| Block 1 | [phase-1-design-system.md](./phase-1-design-system.md) |
| Block 2–3 | [phase-2-section-structure.md](./phase-2-section-structure.md) + [phase-3-copy.md](./phase-3-copy.md) |
| Block 5 | [phase-4-feature-specs.md](./phase-4-feature-specs.md) |
| Block 0, 4, 7 | [phase-5-tech-architecture.md](./phase-5-tech-architecture.md) |

---

## 8. Approval checklist

Reply **Approved** to begin execution.

- [x] Launch date: 31 May 2026
- [x] Full scope (everything decided)
- [x] Solo build
- [x] Manual Vercel deploy, no CI/CD
- [x] 8-block build sequence accepted
- [x] Emergency cut order understood

**Approved by Sahil Ladhania — 2026-05-30**
