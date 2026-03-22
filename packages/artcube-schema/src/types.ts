import type { z } from "zod";

import type {
  ArtCubeConditionEventPlaceholderSchema,
  ArtCubeCorrectionEventPlaceholderSchema,
  ArtCubeCustodyEventPlaceholderSchema,
  ArtCubeDocumentEventPlaceholderSchema,
  ArtCubeGenesisSchema,
  ArtCubeIpEventPlaceholderSchema,
  ArtCubeSupersessionEventPlaceholderSchema,
  ArtCubeTitleEventPlaceholderSchema,
} from "./schema.js";

export enum ArtCubeInscriptionType {
  GenesisTitleAnchor = "GENESIS_TITLE_ANCHOR",
  TitleEvent = "TITLE_EVENT",
  DocumentEvent = "DOCUMENT_EVENT",
  ConditionEvent = "CONDITION_EVENT",
  CustodyEvent = "CUSTODY_EVENT",
  IpEvent = "IP_EVENT",
  MetadataUpdate = "METADATA_UPDATE",
  CorrectionEvent = "CORRECTION_EVENT",
  SupersessionEvent = "SUPERSESSION_EVENT",
}

export enum TitleStatus {
  Owned = "OWNED",
  Transferred = "TRANSFERRED",
  Pledged = "PLEDGED",
  Released = "RELEASED",
  Corrected = "CORRECTED",
}

export enum CopyrightStatus {
  Owned = "OWNED",
  Licensed = "LICENSED",
  PublicDomain = "PUBLIC_DOMAIN",
  Unknown = "UNKNOWN",
  Disputed = "DISPUTED",
}

export enum IpRight {
  DisplayNonCommercial = "DISPLAY_NONCOMMERCIAL",
  Exhibit = "EXHIBIT",
  PublishImagesLowRes = "PUBLISH_IMAGES_LOWRES",
  PublishImagesHighRes = "PUBLISH_IMAGES_HIGHRES",
  ReproducePrints = "REPRODUCE_PRINTS",
  Merchandising = "MERCHANDISING",
  Commercialize = "COMMERCIALIZE",
  CreateDerivatives = "CREATE_DERIVATIVES",
  AiTrainingAllowed = "AI_TRAINING_ALLOWED",
  AiGenerationAllowed = "AI_GENERATION_ALLOWED",
  Sublicense = "SUBLICENSE",
}

export enum UnknownableBoolean {
  Yes = "YES",
  No = "NO",
  Unknown = "UNKNOWN",
}

export type PlaceholderValidationResult = {
  success: false;
  error: string;
  inscriptionType: Exclude<ArtCubeInscriptionType, ArtCubeInscriptionType.GenesisTitleAnchor>;
};

export type ArtCubeGenesis = z.infer<typeof ArtCubeGenesisSchema>;
export type ArtCubeTitleEventPlaceholder = z.infer<typeof ArtCubeTitleEventPlaceholderSchema>;
export type ArtCubeDocumentEventPlaceholder = z.infer<typeof ArtCubeDocumentEventPlaceholderSchema>;
export type ArtCubeConditionEventPlaceholder = z.infer<typeof ArtCubeConditionEventPlaceholderSchema>;
export type ArtCubeCustodyEventPlaceholder = z.infer<typeof ArtCubeCustodyEventPlaceholderSchema>;
export type ArtCubeIpEventPlaceholder = z.infer<typeof ArtCubeIpEventPlaceholderSchema>;
export type ArtCubeCorrectionEventPlaceholder = z.infer<typeof ArtCubeCorrectionEventPlaceholderSchema>;
export type ArtCubeSupersessionEventPlaceholder = z.infer<typeof ArtCubeSupersessionEventPlaceholderSchema>;
