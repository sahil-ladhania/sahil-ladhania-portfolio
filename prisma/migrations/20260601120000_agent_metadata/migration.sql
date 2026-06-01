-- AlterTable
ALTER TABLE "knowledge_chunks" ADD COLUMN IF NOT EXISTS "metadata" JSONB;

-- IVFFlat index for cosine similarity (useful after ingest populates rows)
CREATE INDEX IF NOT EXISTS "knowledge_chunks_embedding_idx"
  ON "knowledge_chunks"
  USING ivfflat ("embedding" vector_cosine_ops)
  WITH (lists = 100);
