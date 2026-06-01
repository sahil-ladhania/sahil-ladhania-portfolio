---
slug: yummmzo
name: YUMMMZO
logo: /logos/yummmzo.png
role: Founder & Lead Engineer
outcomeLine: My first full-stack build. Curiosity project, deployed like it's real
order: 3
contentVariant: curiosity
hasArchitectureDiagram: false
expandInWork: true
techStack:
  - React
  - TypeScript
  - Node.js
  - Express
  - Prisma
  - MySQL
  - Redis
  - BullMQ
  - Razorpay
highlights:
  - "Multi-dashboard architecture: user, restaurant owner, delivery partner"
  - Haversine-based restaurant discovery
  - Redis cart, coupon engine, multi-restaurant conflict handling
  - Razorpay payments and full order lifecycle
  - JWT auth, RBAC, email verification, password reset
  - 15,000+ seeded menu items across Indian cities
  - Deployed on Hostinger VPS + Vercel with PM2, Nginx, SSL
links:
  - label: Live app
    href: https://yummmzo.com
---

## About

Full-stack food delivery platform built from scratch to learn end-to-end product engineering: multi-role dashboards, real-time orders, payments, and production deployment. Built for curiosity. Deployed like it's real.

## Product Thinking

YUMMMZO was a learning project deployed like production — product decisions mirrored real marketplace friction, not tutorial simplicity.

### User insight
A food delivery app isn't one user type — customers, restaurant owners, and delivery partners each have different mental models and failure modes.

### Key decisions
Three separate dashboards on one backend instead of a single generic admin. Seeded 15,000+ menu items so discovery and cart logic could be tested at realistic scale.

### UX choices
Haversine-based restaurant discovery, Redis cart with multi-restaurant conflict handling, and a full order lifecycle (not just "place order" happy path). Razorpay integration with real payment states, not mocked success screens.
