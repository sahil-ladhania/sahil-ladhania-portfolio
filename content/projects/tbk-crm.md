---
slug: tbk-crm
name: TBK Villas
logo: /logos/tbk-crm.svg
role: Zyntohouse · Built end to end
outcomeLine: Villa management platform powering a live Goa rental business
order: 1
expandInWork: true
links:
  - label: Live app
    href: https://tbkvillasapp.online
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

### User insight
Villa owners and ops staff already worked in WhatsApp and spreadsheets, so adoption depended on fitting those habits instead of forcing a dashboard-first workflow. Your shipped system already supports that story through WhatsApp Cloud API automation and bi-directional Google Sheets sync.

### Key decisions
One property-management backend handled guest confirmations, booking vouchers, financial analytics, and multi-owner access control, which made the product feel like one operating system instead of scattered tools.

### UX choices
Staff needed execution speed, while owners needed visibility, so the interface logic should separate operational complexity from owner reporting instead of showing both users the same surface.

### Impact
Automated guest confirmations reduced manual administrative work by 80%.
