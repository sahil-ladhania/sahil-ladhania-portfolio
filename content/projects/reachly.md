---
slug: reachly
name: Reachly
logo: /logos/reachly.png
role: Solo build · Personal tool
outcomeLine: AI outbound copilot for job hunting, human approval at every step
order: 2
expandInWork: true
links:
  - label: Live app
    href: https://reachly.fun
techStack:
  - LangGraph
  - GPT-4o
  - pgVector
  - Gmail API
  - Apollo
  - LangSmith
---

## Problem

Job hunting through cold outreach was almost entirely manual: endless LinkedIn scrolling, no filtered company list, and 15–20 minutes per truly personalized email. At a 3–4% reply rate, ~100 quality emails wasn't realistic. No reliable open or reply tracking, follow-ups got skipped, and tools like Instantly (~$97/mo) were built for sales blasts, not thoughtful job hunting.

## Solution

Reachly is an AI outbound copilot. Set up your profile once; your resume is parsed into structured fields reused on every draft. Seven agents discover companies, research dossiers, find contacts via Apollo, score hire-fit, and write personalized emails with GPT-4o. You approve at each stage; nothing sends without you. Approved emails go through Gmail (15/day cap) with open tracking and automatic follow-up drafts.

## Result

Roughly 5 emails/week → 75/week at the same quality, and 15 minutes per email → ~30 seconds. Follow-ups run on a schedule instead of being forgotten. ~$20–50/month on self-hosted APIs vs Instantly's $97/month. Production system with RAG, LangGraph agents, Gmail integration, eval harnesses, and LangSmith tracing. A real product to demo, not a mockup.

## Product Thinking

### User insight
The real user is not a sales team optimizing for volume, but a single operator who needs deeply researched and highly personalized outreach. That matches the product you built, which automates company research, contact enrichment, and hyper-personalized email generation.

### Key decisions
The product should stay human-in-the-loop, because your system already uses approval gates and hard send caps to protect sender reputation instead of blindly automating sends.

### UX choices
Follow-up scheduling, reply classification, and thread-level conversion tracking make the product feel like an outbound copilot, not just an email generator.

### Impact
Reachly reduced per-lead research time from about 20 minutes to under 30 seconds.
