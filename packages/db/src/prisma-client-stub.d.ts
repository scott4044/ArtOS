// Temporary compile-time Prisma shim for this repository snapshot.
declare module "@prisma/client" {
  export enum ArtworkLifecycleStatus {
    DRAFT = "DRAFT",
    METADATA_GENERATED = "METADATA_GENERATED",
    ARWEAVE_UPLOADED = "ARWEAVE_UPLOADED",
    INSCRIPTION_PENDING = "INSCRIPTION_PENDING",
    ORDINAL_CREATED = "ORDINAL_CREATED",
    SOLANA_BRIDGE_CREATED = "SOLANA_BRIDGE_CREATED",
    ACTIVE = "ACTIVE",
  }

  export enum MetadataValidationStatus {
    PENDING = "PENDING",
    VALID = "VALID",
    INVALID = "INVALID",
  }

  export enum OrdinalInscriptionStatus {
    PENDING = "PENDING",
    SUBMITTED = "SUBMITTED",
    CONFIRMED = "CONFIRMED",
    FAILED = "FAILED",
  }

  export enum SolanaBridgeStatus {
    PENDING = "PENDING",
    MINTED = "MINTED",
    FAILED = "FAILED",
  }

  export enum JobType {
    METADATA_VALIDATION = "METADATA_VALIDATION",
    ARWEAVE_UPLOAD = "ARWEAVE_UPLOAD",
    ORDINAL_INSCRIPTION = "ORDINAL_INSCRIPTION",
    SOLANA_BRIDGE_MINT = "SOLANA_BRIDGE_MINT",
  }

  export enum JobStatus {
    QUEUED = "QUEUED",
    RUNNING = "RUNNING",
    SUCCEEDED = "SUCCEEDED",
    FAILED = "FAILED",
  }

  export namespace Prisma {
    type JsonPrimitive = string | number | boolean | null;
    type JsonObject = { [key: string]: InputJsonValue };
    type JsonArray = InputJsonValue[];
    export type InputJsonValue = JsonPrimitive | JsonObject | JsonArray;
  }

  type Delegate = {
    create(args: { data: Record<string, unknown> }): Promise<unknown>;
    update(args: { where: Record<string, unknown>; data: Record<string, unknown> }): Promise<unknown>;
    upsert(args: {
      where: Record<string, unknown>;
      update: Record<string, unknown>;
      create: Record<string, unknown>;
    }): Promise<unknown>;
    findUnique(args: Record<string, unknown>): Promise<unknown>;
    findMany(args?: Record<string, unknown>): Promise<unknown[]>;
  };

  export class PrismaClient {
    constructor(options?: { log?: string[] });
    user: Delegate;
    artwork: Delegate;
    artCubeMetadata: Delegate;
    arweaveAsset: Delegate;
    ordinalInscription: Delegate;
    solanaBridgeToken: Delegate;
    jobRun: Delegate;
    $disconnect(): Promise<void>;
  }
}

declare const process: {
  env: Record<string, string | undefined>;
  exitCode?: number;
};
