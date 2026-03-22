import {
  ArtworkLifecycleStatus,
  JobStatus,
  JobType,
  MetadataValidationStatus,
  OrdinalInscriptionStatus,
  SolanaBridgeStatus,
} from "@prisma/client";

import { prisma } from "../src/client.js";

async function main() {
  const user = (await prisma.user.upsert({
    where: { email: "collector@example.com" },
    update: { name: "Sample Collector" },
    create: {
      email: "collector@example.com",
      name: "Sample Collector",
    },
  })) as { id: string };

  const artwork = (await prisma.artwork.upsert({
    where: {
      id: "11111111-1111-1111-1111-111111111111",
    },
    update: {
      lifecycle_status: ArtworkLifecycleStatus.ACTIVE,
      owner_user_id: user.id,
      title: "Battle of the Centaurs",
      artist: "Michelangelo Buonarroti",
      object_type: "Sculpture",
      physical_location: "Miami, Florida, United States",
    },
    create: {
      id: "11111111-1111-1111-1111-111111111111",
      owner_user_id: user.id,
      title: "Battle of the Centaurs",
      artist: "Michelangelo Buonarroti",
      object_type: "Sculpture",
      physical_location: "Miami, Florida, United States",
      lifecycle_status: ArtworkLifecycleStatus.ACTIVE,
    },
  })) as { id: string };

  await prisma.artCubeMetadata.upsert({
    where: {
      id: "22222222-2222-2222-2222-222222222222",
    },
    update: {
      metadata_json: {
        protocol: "artcube",
        inscription_type: "GENESIS_TITLE_ANCHOR",
      },
      schema_version: "1.1",
      validation_status: MetadataValidationStatus.VALID,
    },
    create: {
      id: "22222222-2222-2222-2222-222222222222",
      artwork_id: artwork.id,
      metadata_json: {
        protocol: "artcube",
        inscription_type: "GENESIS_TITLE_ANCHOR",
      },
      schema_version: "1.1",
      validation_status: MetadataValidationStatus.VALID,
    },
  });

  await prisma.arweaveAsset.upsert({
    where: { arweave_uri: "arweave://battle-of-the-centaurs-image" },
    update: {
      file_hash: "sha256-sample-image-hash",
      asset_type: "ARTWORK_IMAGE",
      content_type: "image/jpeg",
      artwork_id: artwork.id,
    },
    create: {
      artwork_id: artwork.id,
      arweave_uri: "arweave://battle-of-the-centaurs-image",
      file_hash: "sha256-sample-image-hash",
      asset_type: "ARTWORK_IMAGE",
      content_type: "image/jpeg",
    },
  });

  await prisma.ordinalInscription.upsert({
    where: { inscription_id: "genesis-inscription-id" },
    update: {
      tx_id: "genesis-tx-id",
      status: OrdinalInscriptionStatus.CONFIRMED,
      submitted_at: new Date("2026-03-20T10:00:00.000Z"),
      confirmed_at: new Date("2026-03-20T10:10:00.000Z"),
      artwork_id: artwork.id,
    },
    create: {
      artwork_id: artwork.id,
      inscription_id: "genesis-inscription-id",
      tx_id: "genesis-tx-id",
      status: OrdinalInscriptionStatus.CONFIRMED,
      submitted_at: new Date("2026-03-20T10:00:00.000Z"),
      confirmed_at: new Date("2026-03-20T10:10:00.000Z"),
    },
  });

  await prisma.solanaBridgeToken.upsert({
    where: { artwork_id: artwork.id },
    update: {
      mint_address: "So1anaMintAddress1111111111111111111111111111111",
      parent_genesis_inscription: "genesis-inscription-id",
      status: SolanaBridgeStatus.MINTED,
    },
    create: {
      artwork_id: artwork.id,
      mint_address: "So1anaMintAddress1111111111111111111111111111111",
      parent_genesis_inscription: "genesis-inscription-id",
      status: SolanaBridgeStatus.MINTED,
    },
  });

  await prisma.jobRun.upsert({
    where: { id: "33333333-3333-3333-3333-333333333333" },
    update: {
      artwork_id: artwork.id,
      created_by_id: user.id,
      job_type: JobType.ORDINAL_INSCRIPTION,
      status: JobStatus.SUCCEEDED,
      started_at: new Date("2026-03-20T10:00:00.000Z"),
      finished_at: new Date("2026-03-20T10:10:00.000Z"),
      error_message: null,
    },
    create: {
      id: "33333333-3333-3333-3333-333333333333",
      artwork_id: artwork.id,
      created_by_id: user.id,
      job_type: JobType.ORDINAL_INSCRIPTION,
      status: JobStatus.SUCCEEDED,
      started_at: new Date("2026-03-20T10:00:00.000Z"),
      finished_at: new Date("2026-03-20T10:10:00.000Z"),
      error_message: null,
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
  });
