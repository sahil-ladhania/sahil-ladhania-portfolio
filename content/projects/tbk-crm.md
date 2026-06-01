---
slug: tbk-crm
name: TBK Villas
logo: /logos/tbk-crm.svg
role: Founder & Lead Engineer
outcomeLine: Villa management platform powering a live Goa rental business
order: 1
hasArchitectureDiagram: true
expandInWork: true
techStack:
  - Node.js
  - PostgreSQL
  - WhatsApp API
  - Puppeteer
---

## Problem

A Goa villa rental business ran entirely on WhatsApp and Excel: no central system, no owner visibility, and manual booking confirmations that were slow and error-prone.

## Solution

Built a villa platform with three apps on one backend: admin dashboard for bookings and finances, owner portal for property performance, and a public booking page. Confirmed bookings auto-generate a PDF voucher and send it to the guest via WhatsApp.

## Result

Live for one business with two active admins. Booking → voucher → WhatsApp runs end to end with no manual steps. Backend handles 620 RPS at 26ms p95 with zero errors at 1,000 concurrent users. Single source of truth for bookings, revenue, and guest comms.

## Product Thinking

TBK wasn't a greenfield SaaS play — it had to fit how villa owners and staff already worked, not force a new habit.

### User insight
Owners and ops staff lived in WhatsApp and spreadsheets. Asking them to abandon those tools for a standalone app would have killed adoption on day one.

### Key decisions
One backend with three surfaces (admin, owner portal, public booking) instead of three separate products. Automated PDF voucher + WhatsApp send as the "booking is done" moment — no manual follow-up.

### UX choices
Split admin vs owner views so non-technical owners see performance, not operational complexity. Public booking page stays simple; heavy lifting stays behind the dashboard.
