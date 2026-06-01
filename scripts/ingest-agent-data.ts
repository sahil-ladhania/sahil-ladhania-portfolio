import { ingestAgentData } from "@/lib/agent/ingest";

async function main(): Promise<void> {
  await ingestAgentData();
}

main().catch((error: unknown) => {
  console.error(error);
  process.exit(1);
});
