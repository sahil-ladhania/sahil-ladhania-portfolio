# Phase 3: Copy

**Status:** Approved  
**Domain:** sahilladhania.com  
**Depends on:** [phase-2-section-structure.md](./phase-2-section-structure.md)  
**Last updated:** 2026-05-30

---

## Source answers

| Question | Answer |
|----------|--------|
| Q1 One-liner | Draft for now — Sahil to refine later |
| Q2 Hero feeling | This guy ships → I need to talk to him → this guy is rare |
| Q3 Metrics | Mock data for now — replace with real numbers later |
| Q4 BBA + self-taught | Mention with a real-life origin story |
| Q5 Zyntohouse | Proof that I think like a founder |
| Q6 Contact priority | Book a call → LinkedIn DM → email |
| Q7 Tone avoid | Cliché buzzwords, anything that doesn't mean anything |

---

## Copy principles (this document)

1. **Lead with outcomes**, not adjectives.
2. **Problem → Solution → Result** on every project.
3. **No fluff words:** passionate, ninja, rockstar, guru, visionary, synergy, leverage, disrupt, game-changer, cutting-edge, world-class, innovative (unless attached to a concrete thing).
4. **Short sentences.** If it sounds like a LinkedIn post, cut it.
5. **Mock data** is marked with `[MOCK]` — swap before launch.
6. **Placeholder story** in About is marked `[DRAFT STORY]` — Sahil replaces with his real origin story.

---

## Sidebar / meta copy

| Element | Copy |
|---------|------|
| Site title | Sahil Ladhania |
| Sidebar tagline | AI & Full-Stack Engineer |
| Footer copyright | © {year} Sahil Ladhania. Built with Next.js. |
| CV button label | Download CV |
| CV filename | `sahil-ladhania-cv.pdf` |

---

## `#hero`

### Greeting
Hi, I'm Sahil.

### Name (H1)
Sahil Ladhania

### One-liner `[DRAFT — refine when ready]`
I build production AI systems and full-stack products — from zero to paying users.

### Subtext
Full-stack and AI engineer. Founder of [Zyntohouse](#zyntohouse). I've shipped multi-tenant SaaS, agentic pipelines, and consumer apps used by real clients — not demos.

### CTAs

| Priority | Label | Action |
|----------|-------|--------|
| Primary | See my work | Scroll to `#work` |
| Secondary | Book a call | External link — `[MOCK]` `https://cal.com/sahilladhania` |
| Tertiary | Download CV | `/cv/sahil-ladhania-cv.pdf` |

### Hero tone check
- ✅ Ships: "production," "paying users," "real clients"
- ✅ Talk to him: "Book a call" as secondary CTA
- ✅ Rare: implied through scope (AI + full-stack + founder), not stated

---

## `#proof`

### Format
One featured testimonial + client name strip.

### Testimonial `[MOCK]`
> "Sahil took a messy ops problem and turned it into a product our team actually uses every day. He ships fast, communicates clearly, and doesn't disappear after launch."
>
> — **Raj Mehta**, Founder, `[MOCK]` Horizon Stays

### Client strip labels `[MOCK — replace with real client names/logos]`
Horizon Stays · Coastal Villas · Reachly Beta · NutriPlate · `[MOCK]` Studio North

*Note: Use real client names and logos when available. Grayscale treatment per design system.*

---

## `#about`

### Section heading
01. About

### Bio — paragraph 1
I'm a full-stack and AI engineer based in India (IST). I write TypeScript, design systems that hold up in production, and build AI features that are grounded in real data — not slide-deck demos.

### Bio — paragraph 2 `[DRAFT STORY — replace with your real story]`
I studied business (BBA), not computer science. I got into engineering the honest way: I had a problem I wanted solved, nobody was going to build it for me, and I couldn't afford to wait. I started with tutorials and small scripts, broke things, fixed them, and kept going until I was shipping full products. Business school taught me how companies actually work — who pays, what breaks at scale, why clean handoffs matter. That combination stuck. I still think like someone who has to make the numbers work, not just pass the tests.

### Bio — paragraph 3
Today I split time between client work through Zyntohouse and products I'm building myself. I'm strongest where backend systems, AI pipelines, and product decisions overlap — the place most teams feel a gap.

### Highlights (bullets)
- Shipped multi-tenant SaaS serving `[MOCK]` 50+ hospitality clients across `[MOCK]` 50+ properties
- Built agentic outbound systems with RAG, approval gates, and streaming UI
- Cut API response times from `[MOCK]` 800ms to 120ms with Redis caching and query optimization
- Founded Zyntohouse — `[MOCK]` 10 months in, real clients, real revenue

### Tech range badges
`Node.js` · `TypeScript` · `React` · `Next.js` · `PostgreSQL` · `Redis` · `BullMQ` · `LangChain.js` · `LangGraph` · `GPT-4o` · `pgVector` · `Docker`

### Links
- GitHub → `[MOCK]` `https://github.com/sahilladhania`
- LinkedIn → `[MOCK]` `https://linkedin.com/in/sahilladhania`

---

## `#work`

### Section heading
02. Work

### Section intro
Selected projects. Each one started as a real problem — not a portfolio piece.

---

### Project 1: TBK CRM

**Collapsed**

| Field | Copy |
|-------|------|
| Name | TBK CRM |
| Role | Founder & Lead Engineer |
| Outcome line | Multi-tenant hospitality SaaS powering `[MOCK]` 50+ clients and `[MOCK]` 50+ properties |
| Tech badges | `Node.js` · `PostgreSQL` · `Redis` · `BullMQ` · `WhatsApp API` · `Puppeteer` |

**Expanded**

| Field | Copy |
|-------|------|
| **Problem** | Villa and hospitality operators were running bookings, guest comms, and ops across WhatsApp threads, spreadsheets, and disconnected tools. Nothing scaled past a handful of properties. |
| **Solution** | Built a multi-tenant SaaS CRM with property management, automated guest messaging via WhatsApp Cloud API, PDF generation, Gmail SMTP, Google Sheets/Drive sync, and role-based access — one platform per client, isolated data. |
| **Result** | `[MOCK]` 50+ paying clients. `[MOCK]` 50+ properties onboarded. Automated workflows replaced hours of manual coordination daily. System handles concurrent PDF generation and message queues without choking. |
| **Architecture diagram** | Placeholder — Phase 4 |
| **Links** | Live app → `[MOCK]` `#` · Case study → `[MOCK]` `#` |

---

### Project 2: Reachly

**Collapsed**

| Field | Copy |
|-------|------|
| Name | Reachly |
| Role | Founder & Lead Engineer |
| Outcome line | Agentic outbound SaaS with RAG-grounded personalization and human approval gates |
| Tech badges | `LangChain.js` · `GPT-4o` · `pgVector` · `trigger.dev` · `Vercel AI SDK` |

**Expanded**

| Field | Copy |
|-------|------|
| **Problem** | Outbound sales teams send generic emails that get ignored. Fully automated tools hallucinate or send embarrassing messages. Teams need speed without losing control. |
| **Solution** | Built an agentic outbound platform: scrape and enrich leads, RAG over company context via pgVector, GPT-4o drafts personalized sequences, human approval gates before anything sends, Gmail API integration, streaming UI for real-time generation. |
| **Result** | `[MOCK]` 3x reply rate vs. template-based outreach in beta. `[MOCK]` 40% reduction in time-to-first-send. Zero unsupervised sends — every outbound passes an approval gate. |
| **Architecture diagram** | Placeholder — Phase 4 |
| **Links** | Live app → `[MOCK]` `#` · GitHub → `[MOCK]` `#` |

---

### Project 3: YUMMMZO

**Collapsed**

| Field | Copy |
|-------|------|
| Name | YUMMMZO |
| Role | Lead Engineer |
| Outcome line | Food delivery app with `[MOCK]` 800ms → 120ms discovery latency and Stripe checkout |
| Tech badges | `Node.js` · `Redis` · `BullMQ` · `Stripe` · `JWT` · `PostgreSQL` |

**Expanded**

| Field | Copy |
|-------|------|
| **Problem** | Restaurant discovery on the platform was slow — users bounced before seeing results. Token management needed to handle logout and session invalidation securely at scale. |
| **Solution** | Implemented Haversine-based restaurant discovery with Redis caching layer, BullMQ for async order processing, Stripe payment integration, and JWT auth with Redis token blacklisting for secure session management. |
| **Result** | Discovery latency dropped from `[MOCK]` 800ms to 120ms. `[MOCK]` 2,000+ orders processed in beta. Secure token invalidation on logout — no stale sessions. |
| **Links** | Live app → `[MOCK]` `#` |

---

### Project 4: Lulu (teaser only)

**Collapsed**

| Field | Copy |
|-------|------|
| Name | Lulu |
| Role | Founder & Lead Engineer |
| Outcome line | Voice-first, personality-based matchmaking — in progress |
| Tech badges | `LangGraph` · `Voice AI` · `Next.js` · `PostgreSQL` |
| Teaser link | Building now → `#now` |

**Expanded**
*Does not expand here. Click routes to `#now`.*

---

## `#now`

### Section heading
03. Now

### Primary: Lulu

| Field | Copy |
|-------|------|
| Name | Lulu |
| Status badge | In progress |
| Description | Voice-first matchmaking app. The thesis: personality and conversation matter more than photos and swipe mechanics. Building agentic pipelines for personality inference, voice interaction, and match recommendations — early stage, details intentionally light. |
| Tech badges | `LangGraph` · `Voice AI` · `GPT-4o` · `Next.js` · `PostgreSQL` |

### Secondary: This portfolio

| Field | Copy |
|-------|------|
| Name | sahilladhania.com |
| Status badge | Shipping |
| Description | This site — including a RAG chatbot grounded strictly on my CV and project data. Because if I'm going to talk about AI, the portfolio should use it. |
| Tech badges | `Next.js` · `LangChain.js` · `pgVector` · `GPT-4o` |

---

## `#zyntohouse`

### Section heading
04. Studio

### Display title
Zyntohouse

### Tagline
A tech studio I founded to build and ship products for clients who need a technical partner — not a slide deck.

### Body
Zyntohouse is proof that I think like a founder, not just an engineer. `[MOCK]` 10 months in: real clients, real revenue, real deadlines. I take on full-stack builds, AI integrations, and product architecture — the work where someone needs to own the problem end-to-end.

### Proof points
- `[MOCK]` 10 months operating — not a side project on paper
- `[MOCK]` 8+ client engagements completed or in flight
- Products shipped across hospitality, AI SaaS, and consumer apps
- I scope honestly, communicate in writing, and ship in iterations

### What I take on
- Greenfield product builds (MVP → production)
- AI feature integration (RAG, agents, streaming UI)
- Backend architecture and performance work
- Technical due diligence and rebuilds

### Who it's for
Seed-stage founders who need a technical co-pilot. Small teams with a product gap and no time to hire full-time yet.

### CTA
| Label | Action |
|-------|--------|
| Get in touch | Scroll to `#contact` |

*Tone: founder proof, not agency sales page. No "hire us" hero language.*

---

## `#contact`

### Section heading
05. Contact

### Headline
Have a project, a role, or a problem worth solving? Reach out.

### Subtext
Fastest way to reach me is a call. LinkedIn works too. Email if you prefer async.

### Contact methods (priority order)

| Priority | Method | Label | Value / link |
|----------|--------|-------|--------------|
| 1 | Book a call | Book a 30-min call | `[MOCK]` `https://cal.com/sahilladhania` |
| 2 | LinkedIn | Message me on LinkedIn | `[MOCK]` `https://linkedin.com/in/sahilladhania` |
| 3 | Email | hello@sahilladhania.com | `[MOCK]` — confirm real address |
| 4 | GitHub | github.com/sahilladhania | `[MOCK]` `https://github.com/sahilladhania` |

### CV repeat
| Label | Action |
|-------|--------|
| Download CV | `/cv/sahil-ladhania-cv.pdf` |

### Copy-to-clipboard microcopy
- Success: "Email copied."
- Error: "Couldn't copy — use the address above."

---

## `#footer`

| Element | Copy |
|---------|------|
| IST clock label | `[MOCK]` New Delhi · IST |
| Spotify | No copy — widget shows track info |
| GitHub widget | No copy — widget shows activity |
| Back to top | Back to top |
| Colophon | Built with Next.js, deployed on Vercel. |

---

## Words & phrases — do not use

| Banned | Why |
|--------|-----|
| passionate | Empty |
| ninja / rockstar / guru | Cliché |
| synergy, leverage (as buzzwords) | Corporate noise |
| disrupt / disruptive | Overused |
| game-changer | Means nothing |
| cutting-edge | Say what it actually is |
| innovative (standalone) | Show the innovation instead |
| visionary | Let others decide |
| hustle / grind | Performative |
| coding wizard | Cringe |
| tech enthusiast | Weak |
| open to opportunities | Implied by contact section |

---

## Mock data inventory — replace before launch

| Location | Mock value | Real source needed |
|----------|------------|-------------------|
| TBK clients | 50+ | Client count |
| TBK properties | 50+ | Property count |
| Reachly reply rate | 3x | Beta metrics |
| Reachly time-to-send | 40% reduction | Beta metrics |
| YUMMMZO latency | 800ms → 120ms | Confirm exact numbers |
| YUMMMZO orders | 2,000+ | Beta metrics |
| Zyntohouse age | 10 months | Confirm |
| Zyntohouse clients | 8+ engagements | Confirm |
| Testimonial | Raj Mehta / Horizon Stays | Real quote + attribution |
| Client strip names | 5 mock names | Real client logos/names |
| Cal.com link | cal.com/sahilladhania | Real booking URL |
| Email | hello@sahilladhania.com | Confirm |
| GitHub / LinkedIn URLs | Placeholder paths | Real profile URLs |
| About origin story | Draft narrative | **Sahil's real story** |
| Hero one-liner | Draft | **Sahil's refined version** |

---

## Approval checklist

Reply **Approved** or list edits:

- [x] Hero copy + draft one-liner
- [x] About copy + `[DRAFT STORY]` placeholder flagged
- [x] All 4 project cards (Lulu teaser + full Now section)
- [x] Zyntohouse as founder proof (not agency pitch)
- [x] Contact priority: call → LinkedIn → email
- [x] Mock data clearly marked
- [x] Banned words list

**Approved by Sahil Ladhania — 2026-05-30**
