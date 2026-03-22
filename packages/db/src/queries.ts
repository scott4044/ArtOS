import {
  ArtworkLifecycleStatus,
  JobStatus,
  JobType,
  MetadataValidationStatus,
  OrdinalInscriptionStatus,
  SolanaBridgeStatus,
} from "@prisma/client";
import type { Prisma } from "@prisma/client";

import { prisma } from "./client.js";

export const createUser = (input: { email: string; name: string }) => {
  return prisma.user.create({
    data: input,
  });
};

export const createArtwork = (input: {
  owner_user_id: string;
  title: string;
  artist: string;
  object_type: string;
  physical_location: string;
  lifecycle_status?: ArtworkLifecycleStatus;
}) => {
  return prisma.artwork.create({
    data: {
      ...input,
      lifecycle_status: input.lifecycle_status ?? ArtworkLifecycleStatus.DRAFT,
    },
  });
};

export const createArtCubeMetadata = (input: {
  artwork_id: string;
  metadata_json: Prisma.InputJsonValue;
  schema_version: string;
  validation_status?: MetadataValidationStatus;
}) => {
  return prisma.artCubeMetadata.create({
    data: {
      ...input,
      validation_status: input.validation_status ?? MetadataValidationStatus.PENDING,
    },
  });
};

export const createArweaveAsset = (input: {
  artwork_id: string;
  arweave_uri: string;
  file_hash: string;
  asset_type: string;
  content_type?: string;
}) => {
  return prisma.arweaveAsset.create({
    data: input,
  });
};

export const createOrdinalInscription = (input: {
  artwork_id: string;
  inscription_id: string;
  tx_id: string;
  status?: OrdinalInscriptionStatus;
  submitted_at?: Date;
  confirmed_at?: Date;
}) => {
  return prisma.ordinalInscription.create({
    data: {
      ...input,
      status: input.status ?? OrdinalInscriptionStatus.PENDING,
    },
  });
};

export const createSolanaBridgeToken = (input: {
  artwork_id: string;
  mint_address: string;
  parent_genesis_inscription: string;
  status?: SolanaBridgeStatus;
}) => {
  return prisma.solanaBridgeToken.create({
    data: {
      ...input,
      status: input.status ?? SolanaBridgeStatus.PENDING,
    },
  });
};

export const createJobRun = (input: {
  artwork_id?: string;
  created_by_id?: string;
  job_type: JobType;
  status?: JobStatus;
  error_message?: string;
  started_at?: Date;
  finished_at?: Date;
}) => {
  return prisma.jobRun.create({
    data: {
      ...input,
      status: input.status ?? JobStatus.QUEUED,
    },
  });
};

export const getArtworkById = (artworkId: string) => {
  return prisma.artwork.findUnique({
    where: { id: artworkId },
    include: {
      owner: true,
      metadata_records: {
        orderBy: { created_at: "desc" },
      },
      arweave_assets: true,
      inscriptions: {
        orderBy: { created_at: "desc" },
      },
      bridge_token: true,
      job_runs: {
        orderBy: { created_at: "desc" },
      },
    },
  });
};

export const listArtworksByLifecycleStatus = (lifecycle_status: ArtworkLifecycleStatus) => {
  return prisma.artwork.findMany({
    where: { lifecycle_status },
    orderBy: { created_at: "desc" },
    include: {
      owner: true,
      metadata_records: {
        orderBy: { created_at: "desc" },
        take: 1,
      },
      inscriptions: {
        orderBy: { created_at: "desc" },
        take: 1,
      },
      bridge_token: true,
    },
  });
};

export const listPendingJobRuns = () => {
  return prisma.jobRun.findMany({
    where: {
      status: {
        in: [JobStatus.QUEUED, JobStatus.RUNNING],
      },
    },
    orderBy: { created_at: "asc" },
    include: {
      artwork: true,
      created_by: true,
    },
  });
};

export const updateArtworkLifecycleStatus = (artworkId: string, lifecycle_status: ArtworkLifecycleStatus) => {
  return prisma.artwork.update({
    where: { id: artworkId },
    data: { lifecycle_status },
  });
};

export const markMetadataValidationStatus = (
  metadataId: string,
  validation_status: MetadataValidationStatus,
) => {
  return prisma.artCubeMetadata.update({
    where: { id: metadataId },
    data: { validation_status },
  });
};

export const closeJobRun = (input: {
  jobRunId: string;
  status: JobStatus.SUCCEEDED | JobStatus.FAILED;
  error_message?: string;
  finished_at?: Date;
}) => {
  return prisma.jobRun.update({
    where: { id: input.jobRunId },
    data: {
      status: input.status,
      error_message: input.error_message,
      finished_at: input.finished_at ?? new Date(),
    },
  });
};
