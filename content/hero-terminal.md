---
username: sahil
shell: zsh
typingSpeed: 45
delayBetweenCommands: 600
initialDelay: 800
enableSound: true
sequences:
  - command: whoami
    output:
      - Sahil Ladhania
      - AI & full-stack engineer · Founder @ Zyntohouse
      - IST (UTC+5:30)
  - command: cat intro.txt
    output:
      - I build production AI systems and full-stack products from zero to paying users.
  - command: ls ~/projects/shipped
    output:
      - tbk-crm/
      - reachly/
      - yummmzo/
      - lulu/  (in progress)
      - castra/  (in progress)
  - command: npm run stack --production
    output:
      - "✓ Next.js · TypeScript · PostgreSQL · Redis"
      - "✓ LangGraph · LangChain · GPT-4o · pgVector"
      - 50+ hospitality clients · 800ms → 120ms API latency
  - command: curl -s localhost:3000/api/agent/health
    output:
      - '{"status":"online","grounded":"cv+projects"}'
      - → Ask my agent anything. Click ✦ top-right
---
