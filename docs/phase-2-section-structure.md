# Phase 2: Section Structure

**Status:** Approved  
**Domain:** sahilladhania.com  
**Depends on:** [phase-1-design-system.md](./phase-1-design-system.md)  
**Last updated:** 2026-05-30

---

## Source answers

| Question | Answer |
|----------|--------|
| Q1 Page model | Single page, all sections scroll |
| Q2 Projects | Expand-in-place cards (no `/projects/[slug]`) |
| Q3 Zyntohouse | Own dedicated section |
| Q4 Currently building | Dedicated section (Lulu + current focus) |
| Q5 Blog | No |
| Q6 CV download | Yes, visible CTA |
| Q7 Priority | Engineering credibility first; Zyntohouse secondary (not stated on site) |

---

## 1. Routing & page model

| Route | Purpose |
|-------|---------|
| `/` | **Only public page.** All sections live here. |
| `/design-system` | Dev-only preview (Phase 1). Remove before launch. |
| `/admin` | Future visitor dashboard (Phase 4). Not linked in nav. |

**No routes for:** blog, about, projects, contact as separate pages.

**Deep linking:** Section IDs as hash anchors (`/#work`, `/#contact`). Expanding a project updates hash to `/#work-tbk-crm` (optional, shareable).

---

## 2. Global layout

Brittany Chiang pattern adapted to Phase 1 tokens.

### Desktop (`lg+`)

```
┌─────────────────────────────────────────────────────────┐
│  [Fixed left column ~240px]  │  [Scrollable main]       │
│                              │                          │
│  Name / logo                 │  #hero                   │
│  Short tagline (1 line)      │  #proof                  │
│                              │  #about                  │
│  Nav links (numbered)        │  #work                   │
│    01. About                 │  #now                    │
│    02. Work                  │  #zyntohouse             │
│    03. Now                   │  #contact                │
│    04. Studio                │                          │
│    05. Contact               │  [Footer widgets]        │
│                              │                          │
│  [Download CV]               │                          │
│  [Theme toggle]              │                          │
│  [IST clock]                 │                          │
│  [Spotify mini]              │                          │
│  [GitHub mini]               │                          │
└─────────────────────────────────────────────────────────┘
```

- Left column: `fixed`, full viewport height, scroll-independent.
- Main: `lg:ml-[240px]` (or `lg:pl-72` per Phase 1 `sidebar-width`).
- Active nav item: accent color + subtle indicator (no animation beyond color).

### Mobile / tablet (`< lg`)

```
┌──────────────────────────┐
│ [Sticky top bar]         │
│  Name    CV  Theme  Menu │
├──────────────────────────┤
│  Sections stack vertically│
│  ...                     │
│  [Footer widgets inline] │
└──────────────────────────┘
```

- Sticky top bar: `h-16`, glass background.
- Nav: slide-down panel or full-screen overlay from menu button.
- Widgets (Spotify, GitHub, clock): footer only on mobile — not in top bar.

---

## 3. Section order & rationale

Order optimizes for **“can this person ship?”** first. Zyntohouse comes after personal proof. Nothing on the page states hiring vs. client intent.

| # | Section ID | Nav label | Purpose |
|---|------------|-----------|---------|
| 1 | `#hero` | — (not in nav) | Identity, value prop, dual CTA |
| 2 | `#proof` | — (not in nav) | Early social proof — logos, quotes |
| 3 | `#about` | About | Who you are, range (AI + full-stack + founder) |
| 4 | `#work` | Work | Shipped projects — primary proof |
| 5 | `#now` | Now | What you're building today — momentum signal |
| 6 | `#zyntohouse` | Studio | Founder/operator proof — secondary |
| 7 | `#contact` | Contact | Conversion endpoint |
| — | `footer` | — | Legal, widgets, back-to-top |

**Why `#proof` before `#about`:** Conversion brief — social proof early. Small strip, not a full section in nav.

**Why `#work` before `#now`:** Shipped products (TBK, Reachly, YUMMMZO) are stronger hire signals than in-progress work.

**Why `#zyntohouse` after `#now`:** Studio credibility supports the person; it doesn't lead the story.

---

## 4. Section specs (structure only — copy is Phase 3)

### 4.1 Hero (`#hero`)

**Goal:** Clarity in 10 seconds. Who + what + what to do next.

| Block | Content type |
|-------|----------------|
| Greeting line | e.g. “Hi, I'm…” (Phase 3) |
| Name | H1, `text-4xl` / `text-5xl` |
| One-liner | AI Engineer + Full-Stack anchor |
| Subtext | 1–2 sentences max |
| Primary CTA | “See my work” → scroll to `#work` |
| Secondary CTA | “Get in touch” → scroll to `#contact` |
| Tertiary CTA | **Download CV** — text link or ghost button with download icon |

**Layout:** Left-aligned, `prose-max` width for text. No hero image unless added in Phase 3.

**Components:** `Button`, `Link`, `Container`.

---

### 4.2 Social proof (`#proof`)

**Goal:** Trust before they read about you.

| Block | Content type |
|-------|----------------|
| Client logos | 3–6 grayscale logos, single row (wrap on mobile) |
| OR testimonial | 1–2 short quotes with name + role |
| OR both | Logos row + one featured quote |

**Layout:** Compact — `py-12` max. `GlassCard` optional wrapper. Not in side nav.

**Components:** `GlassCard`, `Divider` (optional separator from hero).

---

### 4.3 About (`#about`)

**Goal:** Context without resume dump.

| Block | Content type |
|-------|----------------|
| Section heading | `01. About` (Brittany numbered pattern) |
| Bio | 2–3 short paragraphs |
| Highlights | 3–4 bullet points (outcomes, not skills) |
| Tech range | Inline mono badges — groups, not skill bars |
| Optional link | LinkedIn, GitHub |

**Layout:** Two-column on `md+`: text left, highlights/badges right. Single column mobile.

**Components:** `SectionHeading`, `Badge`, `GlassCard` (optional for highlights panel).

---

### 4.4 Work / Projects (`#work`)

**Goal:** Problem → Solution → Result for every project. Lead with outcomes.

**Projects in this section (4 cards):**

| Order | Project | Notes |
|-------|---------|-------|
| 1 | TBK CRM | Top project — architecture diagram slot (Phase 4) |
| 2 | Reachly | Second — architecture diagram slot (Phase 4) |
| 3 | YUMMMZO | Full expand content |
| 4 | Lulu | **Teaser only** — collapsed summary + “Building now →” link to `#now`. No full case study here. |

Zyntohouse is **not** a project card — it has its own section.

#### Expand-in-place card behavior

**Collapsed state (default):**

- Project name (linked style on hover)
- Your role (e.g. “Founder & Lead Engineer”)
- One-line outcome metric
- 4–6 tech `Badge`s
- Expand affordance: chevron or “Read more”

**Expanded state (on click):**

- Animates open (height + fade, 300ms max, respects reduced motion)
- **Problem** — 1–2 sentences
- **Solution** — what you built
- **Result** — metrics, clients, latency, revenue signals
- Extended tech stack
- Links: live site, GitHub (if public), case study external
- Architecture diagram area (TBK + Reachly only — placeholder in Phase 2 impl)
- Collapse control

**Interaction rules:**

- **One card expanded at a time** — opening another closes the previous
- Clicking expanded header toggles collapse
- Optional: update URL hash to `#work-{slug}` on expand
- Keyboard: Enter/Space to toggle; Escape to collapse

**Layout:** Vertical stack of `GlassCard`s, `space-y-6`. Expanded content inside same card (no modal).

**Components:** `GlassCard`, `Badge`, `Button`/`Link`, custom `ProjectCard` wrapper.

---

### 4.5 Currently Building (`#now`)

**Goal:** Show you're active, technical, and building something ambitious.

| Block | Content type |
|-------|----------------|
| Section heading | `03. Now` |
| Primary focus | **Lulu** — voice-first matchmaking |
| Status badge | “In progress” |
| Description | 2–3 sentences — partial detail per brief |
| Stack badges | LangGraph, voice, etc. |
| Optional | Secondary “current focus” items (1–2 max) — e.g. portfolio RAG chatbot |
| No links | Unless Lulu has a public landing page |

**Layout:** Single `GlassCard` or two cards if secondary focus exists. Visually distinct from `#work` shipped cards (e.g. `Badge` “Building”).

**Components:** `SectionHeading`, `GlassCard`, `Badge`.

---

### 4.6 Zyntohouse (`#zyntohouse`)

**Goal:** Founder proof — real studio, real clients, real revenue. Secondary to personal engineering brand.

| Block | Content type |
|-------|----------------|
| Section heading | `04. Studio` (nav) / “Zyntohouse” (heading) |
| One-liner | What the studio is |
| Proof points | 10 months, real clients, real revenue (Phase 3 numbers) |
| Services | 2–4 lines — what you take on (not a sales page) |
| Client types | Who you work with |
| CTA | Soft — “Work with Zyntohouse” → `#contact` with pre-filled context OR separate mailto. **Not** primary site CTA. |

**Layout:** `GlassCard` with text + optional small logo. No project-style expand.

**Tone on site:** Proof that you think like a founder — not “hire my agency” landing page.

**Components:** `SectionHeading`, `GlassCard`, `Button` (secondary variant).

---

### 4.7 Contact (`#contact`)

**Goal:** Make reaching out frictionless.

| Block | Content type |
|-------|----------------|
| Section heading | `05. Contact` |
| Headline | Short invitation (Phase 3) |
| Email | Visible + copy-to-clipboard |
| Links | LinkedIn, GitHub, Cal.com/booking (if applicable) |
| **Download CV** | Repeated here — button + icon |
| Form | **Deferred to Phase 4** — placeholder for mailto-only at first |

**Layout:** Centered or left-aligned, minimal. No big form in Phase 2 structure.

**Components:** `SectionHeading`, `Button`, `Link`, `IconButton` (copy email).

---

### 4.8 Footer

**Goal:** Personality + utility without clutter.

| Block | Placement |
|-------|-----------|
| IST timezone clock | Desktop: sidebar. Mobile: footer. |
| Spotify Now Playing | Same |
| GitHub activity widget | Same |
| Copyright | `© {year} Sahil Ladhania` |
| Built with / colophon | Optional one line |
| Back to top | Subtle link |

Not a numbered nav section.

---

## 5. Navigation spec

### Side nav items (desktop)

| Order | Label | Target | Number prefix |
|-------|-------|--------|---------------|
| 1 | About | `#about` | `01.` |
| 2 | Work | `#work` | `02.` |
| 3 | Now | `#now` | `03.` |
| 4 | Studio | `#zyntohouse` | `04.` |
| 5 | Contact | `#contact` | `05.` |

**Not in nav:** Hero, Proof, Footer widgets.

### Persistent actions (sidebar / mobile header)

| Action | Placement |
|--------|-----------|
| Download CV | Sidebar button + mobile header icon/link |
| Theme toggle | Sidebar + mobile header |
| Command palette | Phase 4 — not in Phase 2 structure |

### Scroll spy

- Intersection Observer highlights active nav item based on visible section.
- Offset accounts for sticky header on mobile.

---

## 6. CV download CTA — placement summary

| Location | Format |
|----------|--------|
| Hero | Tertiary link / ghost button |
| Desktop sidebar | Persistent “Download CV” button below nav |
| Mobile header | Compact icon + “CV” text |
| Contact section | Primary-style button repeated |

**File:** `/public/cv/sahil-ladhania-cv.pdf` (path TBD in Phase 5).  
**Behavior:** Direct download, `download` attribute, track click in analytics later (Phase 4).

---

## 7. Explicit exclusions (Phase 2)

| Excluded | Reason |
|----------|--------|
| Blog section | No blog per brief |
| `/projects/[slug]` routes | Expand-in-place on home |
| Multi-page About/Contact | Single page model |
| Skill bars / carousels | Conversion principles |
| “Open to work” / “Hire Zyntohouse” banners | Intent shapes order, not copy |
| RAG chatbot UI | Phase 4 feature spec |
| Command palette | Phase 4 |
| Contact form | Phase 4 — mailto for now |

---

## 8. Component map (new in Phase 2)

| Component | Section(s) | Notes |
|-----------|------------|-------|
| `SiteLayout` | Global | Sidebar + main grid |
| `SideNav` | Global | Numbered links, scroll spy |
| `MobileNav` | Global | Top bar + overlay menu |
| `Hero` | `#hero` | |
| `ProofStrip` | `#proof` | Logos and/or quotes |
| `AboutSection` | `#about` | |
| `ProjectList` | `#work` | Manages expand state |
| `ProjectCard` | `#work` | Collapsed + expanded |
| `CurrentlySection` | `#now` | |
| `ZyntohouseSection` | `#zyntohouse` | |
| `ContactSection` | `#contact` | |
| `SiteFooter` | Footer | Widgets + copyright |
| `DownloadCvButton` | Hero, nav, contact | Shared component |
| `ScrollSpyProvider` | Global | Optional context |

All consume Phase 1 primitives: `Container`, `Section`, `GlassCard`, `SectionHeading`, `Badge`, `Button`, `Link`.

---

## 9. Data shape (structure only — content in Phase 3)

```typescript
// types/content.types.ts (Phase 2 stub)

interface Project {
  slug: string;
  name: string;
  role: string;
  outcomeLine: string;
  techStack: string[];
  problem: string;
  solution: string;
  result: string;
  links?: { label: string; href: string }[];
  hasArchitectureDiagram: boolean; // true for TBK, Reachly
  expandInWork: boolean;           // false for Lulu → points to #now
}

interface CurrentlyBuilding {
  name: string;
  status: "in-progress" | "shipping-soon";
  description: string;
  techStack: string[];
}

interface ZyntohouseContent {
  tagline: string;
  proofPoints: string[];
  services: string[];
  clientTypes: string[];
}
```

Hardcoded TS/JSON file — confirmed in Phase 5.

---

## 10. Phase 2 implementation scope

When implementation begins (after Phase 1 is implemented):

1. `SiteLayout` with desktop sidebar + mobile header
2. All 7 sections as **structural shells** with placeholder/lorem content
3. `ProjectList` + `ProjectCard` expand-in-place logic
4. `DownloadCvButton` in all three placements (placeholder PDF OK)
5. Hash-based deep linking for sections + expanded projects
6. Scroll spy on nav
7. Footer widget **slots** (empty placeholders — widgets in Phase 4)

**Out of scope:** Real copy (Phase 3), chatbot, analytics, diagrams, Spotify/GitHub live data.

---

## 11. Approval

- [x] Section order: Hero → Proof → About → Work → Now → Studio → Contact
- [x] 4 project cards (Lulu teaser in Work, full detail in Now)
- [x] Expand-in-place, one-at-a-time
- [x] Zyntohouse as section `04. Studio`
- [x] CV download in hero + sidebar + contact
- [x] No blog, no sub-routes
- [x] Brittany-style fixed sidebar on desktop

**Approved by Sahil Ladhania — 2026-05-30**
