---
slug: yummmzo
name: YUMMMZO
logo: /logos/yummmzo.png
role: Pet project · Learning build
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

### User insight
People often know their craving, budget, or food mood before they know dish names, so discovery should translate intent into items from a specific menu.

### Key decisions
On the engineering side, this was built like a real product, with an Express.js and Prisma backend for the full order lifecycle, BullMQ for async notifications, Stripe integration, JWT auth with httpOnly cookies, Redis token blacklisting, and Zod validation.

### UX choices
Smart Cart should be framed as an intent-translation layer inside the restaurant menu, not as generic recommendations.

### Impact
No usage or retention metrics. This was a pet project. The payoff was the learning: Haversine for location-based restaurant discovery, Redis for cart caching, BullMQ for async order notifications, and wiring a full multi-role order lifecycle end to end.
