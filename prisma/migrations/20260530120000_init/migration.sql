-- CreateExtension
CREATE EXTENSION IF NOT EXISTS vector;

-- CreateTable
CREATE TABLE "visitor_events" (
    "id" UUID NOT NULL,
    "session_id" UUID NOT NULL,
    "pathname" TEXT NOT NULL,
    "referrer" TEXT,
    "country" CHAR(2),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "visitor_events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "knowledge_chunks" (
    "id" UUID NOT NULL,
    "content" TEXT NOT NULL,
    "embedding" vector(1536),
    "source_type" TEXT NOT NULL,
    "source_id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "updated_at" TIMESTAMPTZ NOT NULL,

    CONSTRAINT "knowledge_chunks_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "music_snapshots" (
    "id" UUID NOT NULL,
    "track_name" TEXT NOT NULL,
    "artist" TEXT NOT NULL,
    "album" TEXT,
    "spotify_id" TEXT,
    "snapshot_type" TEXT NOT NULL,
    "fetched_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "music_snapshots_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "visitor_events_created_at_idx" ON "visitor_events"("created_at" DESC);

-- CreateIndex
CREATE INDEX "visitor_events_session_id_idx" ON "visitor_events"("session_id");

-- CreateIndex
CREATE INDEX "visitor_events_country_idx" ON "visitor_events"("country");

-- CreateIndex
CREATE INDEX "knowledge_chunks_source_type_source_id_idx" ON "knowledge_chunks"("source_type", "source_id");

-- CreateIndex
CREATE INDEX "music_snapshots_snapshot_type_fetched_at_idx" ON "music_snapshots"("snapshot_type", "fetched_at" DESC);
