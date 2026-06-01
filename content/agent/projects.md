# Projects

## TBK Villas (TBK CRM)

**Role:** Founder & Lead Engineer  
**Outcome:** Villa management platform powering a live Goa rental business.

**Problem:** A Goa villa rental business ran on WhatsApp and Excel—no central system, slow manual booking confirmations.

**Solution:** Three apps on one backend: admin dashboard, owner portal, public booking page. Confirmed bookings auto-generate PDF vouchers and send via WhatsApp.

**Result:** Live for one business. Booking → voucher → WhatsApp is end-to-end automated. Backend handles 620 RPS at 26ms p95 with zero errors at 1,000 concurrent users.

**Stack:** Node.js, PostgreSQL, WhatsApp API, Puppeteer

---

## Reachly

**Role:** Founder & Lead Engineer  
**Outcome:** AI outbound copilot for job hunting with human approval at every step.

**Problem:** Cold outreach was manual—15–20 minutes per personalized email, ~3–4% reply rates, poor follow-up tracking.

**Solution:** Seven LangGraph agents discover companies, research dossiers, find contacts (Apollo), score hire-fit, and draft emails with GPT-4o and RAG. User approves each stage; Gmail sends with caps and tracking.

**Result:** ~5 emails/week → 75/week at similar quality; ~15 min/email → ~30 seconds. Production RAG, LangSmith tracing, eval harnesses.

**Stack:** LangGraph, GPT-4o, pgVector, Gmail API, Apollo, LangSmith

---

## YUMMMZO

**Role:** Founder & Lead Engineer  
**Outcome:** Full-stack food delivery platform—first major build, deployed like production.

**Highlights:** Multi-dashboard (user, restaurant, delivery), Haversine discovery, Redis cart, Razorpay, JWT + RBAC, 15,000+ seeded menu items, Hostinger VPS + Vercel.

**Stack:** React, TypeScript, Node.js, Express, Prisma, MySQL, Redis, BullMQ, Razorpay  
**Live:** https://yummmzo.com

---

## Lulu (in progress)

**Role:** Founder & Lead Engineer  
Voice-first, personality-based matchmaking for Indian Gen Z—connection before photo-first swiping.

**Stack:** LangGraph, Voice AI, Next.js, PostgreSQL

---

## Castra (in progress)

**Role:** Founder & Lead Engineer  
AI creative intelligence: ingests reviews, Reddit, ad comments, support tickets; outputs ranked ad angles, hooks, and UGC briefs from real customer language.

**Stack:** Next.js, PostgreSQL, GPT-4o, pgVector
