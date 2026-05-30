---
slug: yummmzo
name: YUMMMZO
role: Lead Engineer
outcomeLine: Food delivery app with 800ms → 120ms discovery latency and Stripe checkout
order: 3
hasArchitectureDiagram: false
expandInWork: true
techStack:
  - Node.js
  - Redis
  - BullMQ
  - Stripe
  - JWT
  - PostgreSQL
links:
  - label: Live app
    href: "#"
---

## Problem

Restaurant discovery on the platform was slow — users bounced before seeing results. Token management needed to handle logout and session invalidation securely at scale.

## Solution

Implemented Haversine-based restaurant discovery with Redis caching layer, BullMQ for async order processing, Stripe payment integration, and JWT auth with Redis token blacklisting for secure session management.

## Result

Discovery latency dropped from 800ms to 120ms. 2,000+ orders processed in beta. Secure token invalidation on logout — no stale sessions.
