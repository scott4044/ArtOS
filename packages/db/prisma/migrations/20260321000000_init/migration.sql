-- CreateEnum
CREATE TYPE "ArtworkLifecycleStatus" AS ENUM (
  'DRAFT',
  'METADATA_GENERATED',
  'ARWEAVE_UPLOADED',
  'INSCRIPTION_PENDING',
  'ORDINAL_CREATED',
  'SOLANA_BRIDGE_CREATED',
  'ACTIVE'
);

-- CreateEnum
CREATE TYPE "MetadataValidationStatus" AS ENUM ('PENDING', 'VALID', 'INVALID');

-- CreateEnum
CREATE TYPE "OrdinalInscriptionStatus" AS ENUM ('PENDING', 'SUBMITTED', 'CONFIRMED', 'FAILED');

-- CreateEnum
CREATE TYPE "SolanaBridgeStatus" AS ENUM ('PENDING', 'MINTED', 'FAILED');

-- CreateEnum
CREATE TYPE "JobType" AS ENUM (
  'METADATA_VALIDATION',
  'ARWEAVE_UPLOAD',
  'ORDINAL_INSCRIPTION',
  'SOLANA_BRIDGE_MINT'
);

-- CreateEnum
CREATE TYPE "JobStatus" AS ENUM ('QUEUED', 'RUNNING', 'SUCCEEDED', 'FAILED');

-- CreateTable
CREATE TABLE "User" (
  "id" UUID NOT NULL,
  "email" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Artwork" (
  "id" UUID NOT NULL,
  "title" TEXT NOT NULL,
  "artist" TEXT NOT NULL,
  "object_type" TEXT NOT NULL,
  "physical_location" TEXT NOT NULL,
  "lifecycle_status" "ArtworkLifecycleStatus" NOT NULL DEFAULT 'DRAFT',
  "owner_user_id" UUID NOT NULL,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "Artwork_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArtCubeMetadata" (
  "id" UUID NOT NULL,
  "artwork_id" UUID NOT NULL,
  "metadata_json" JSONB NOT NULL,
  "schema_version" TEXT NOT NULL,
  "validation_status" "MetadataValidationStatus" NOT NULL DEFAULT 'PENDING',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ArtCubeMetadata_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArweaveAsset" (
  "id" UUID NOT NULL,
  "artwork_id" UUID NOT NULL,
  "arweave_uri" TEXT NOT NULL,
  "file_hash" TEXT NOT NULL,
  "asset_type" TEXT NOT NULL,
  "content_type" TEXT,
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "ArweaveAsset_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrdinalInscription" (
  "id" UUID NOT NULL,
  "artwork_id" UUID NOT NULL,
  "inscription_id" TEXT NOT NULL,
  "tx_id" TEXT NOT NULL,
  "status" "OrdinalInscriptionStatus" NOT NULL DEFAULT 'PENDING',
  "submitted_at" TIMESTAMP(3),
  "confirmed_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "OrdinalInscription_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SolanaBridgeToken" (
  "id" UUID NOT NULL,
  "artwork_id" UUID NOT NULL,
  "mint_address" TEXT NOT NULL,
  "parent_genesis_inscription" TEXT NOT NULL,
  "status" "SolanaBridgeStatus" NOT NULL DEFAULT 'PENDING',
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "SolanaBridgeToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JobRun" (
  "id" UUID NOT NULL,
  "artwork_id" UUID,
  "created_by_id" UUID,
  "job_type" "JobType" NOT NULL,
  "status" "JobStatus" NOT NULL DEFAULT 'QUEUED',
  "error_message" TEXT,
  "started_at" TIMESTAMP(3),
  "finished_at" TIMESTAMP(3),
  "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMP(3) NOT NULL,
  CONSTRAINT "JobRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE INDEX "Artwork_owner_user_id_idx" ON "Artwork"("owner_user_id");
CREATE INDEX "Artwork_lifecycle_status_idx" ON "Artwork"("lifecycle_status");
CREATE INDEX "ArtCubeMetadata_artwork_id_idx" ON "ArtCubeMetadata"("artwork_id");
CREATE INDEX "ArtCubeMetadata_validation_status_idx" ON "ArtCubeMetadata"("validation_status");
CREATE UNIQUE INDEX "ArweaveAsset_arweave_uri_key" ON "ArweaveAsset"("arweave_uri");
CREATE INDEX "ArweaveAsset_artwork_id_idx" ON "ArweaveAsset"("artwork_id");
CREATE INDEX "ArweaveAsset_asset_type_idx" ON "ArweaveAsset"("asset_type");
CREATE UNIQUE INDEX "OrdinalInscription_inscription_id_key" ON "OrdinalInscription"("inscription_id");
CREATE UNIQUE INDEX "OrdinalInscription_tx_id_key" ON "OrdinalInscription"("tx_id");
CREATE INDEX "OrdinalInscription_artwork_id_idx" ON "OrdinalInscription"("artwork_id");
CREATE INDEX "OrdinalInscription_status_idx" ON "OrdinalInscription"("status");
CREATE UNIQUE INDEX "SolanaBridgeToken_artwork_id_key" ON "SolanaBridgeToken"("artwork_id");
CREATE UNIQUE INDEX "SolanaBridgeToken_mint_address_key" ON "SolanaBridgeToken"("mint_address");
CREATE INDEX "SolanaBridgeToken_status_idx" ON "SolanaBridgeToken"("status");
CREATE INDEX "JobRun_artwork_id_idx" ON "JobRun"("artwork_id");
CREATE INDEX "JobRun_created_by_id_idx" ON "JobRun"("created_by_id");
CREATE INDEX "JobRun_job_type_status_idx" ON "JobRun"("job_type", "status");

-- AddForeignKey
ALTER TABLE "Artwork" ADD CONSTRAINT "Artwork_owner_user_id_fkey" FOREIGN KEY ("owner_user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
ALTER TABLE "ArtCubeMetadata" ADD CONSTRAINT "ArtCubeMetadata_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "ArweaveAsset" ADD CONSTRAINT "ArweaveAsset_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "OrdinalInscription" ADD CONSTRAINT "OrdinalInscription_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "SolanaBridgeToken" ADD CONSTRAINT "SolanaBridgeToken_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE CASCADE ON UPDATE CASCADE;
ALTER TABLE "JobRun" ADD CONSTRAINT "JobRun_artwork_id_fkey" FOREIGN KEY ("artwork_id") REFERENCES "Artwork"("id") ON DELETE SET NULL ON UPDATE CASCADE;
ALTER TABLE "JobRun" ADD CONSTRAINT "JobRun_created_by_id_fkey" FOREIGN KEY ("created_by_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
