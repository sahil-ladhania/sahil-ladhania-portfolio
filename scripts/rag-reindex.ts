import { reindexAll } from "@/lib/rag/ingest";

async function main(): Promise<void> {
  await reindexAll();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
