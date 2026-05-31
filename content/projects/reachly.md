---
slug: reachly
name: Reachly
logo: /logos/reachly.png
role: Founder & Lead Engineer
outcomeLine: AI outbound copilot for job hunting, human approval at every step
order: 2
hasArchitectureDiagram: true
expandInWork: true
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
