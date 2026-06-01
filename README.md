# sahilladhania.com

Personal portfolio of **Sahil Ladhania** — AI & full-stack engineer, founder of Zyntohouse.

**Live:** [sahilladhania.com](https://sahilladhania.com)

## Personal agent (RAG)

Grounded chat uses markdown in `content/agent/` only.

1. Copy `.env.example` → `.env.local` and set `DATABASE_URL`, `DIRECT_URL`, `OPENAI_API_KEY`.
2. Run migrations: `npm run db:migrate`
3. Ingest knowledge: `npm run ingest:agent`
4. Start dev: `npm run dev`

API: `POST /api/agent` (streaming). Health: `GET /api/agent/health`.

After editing agent content, re-run `npm run ingest:agent` (use production `DATABASE_URL` for prod DB).
