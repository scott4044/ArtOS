import { z } from "zod";

import {
  ArtCubeConditionEventPlaceholderSchema,
  ArtCubeCorrectionEventPlaceholderSchema,
  ArtCubeCustodyEventPlaceholderSchema,
  ArtCubeDocumentEventPlaceholderSchema,
  ArtCubeGenesisSchema,
  ArtCubeIpEventPlaceholderSchema,
  ArtCubeSupersessionEventPlaceholderSchema,
  ArtCubeTitleEventPlaceholderSchema,
} from "./schema.js";
import { ArtCubeInscriptionType, type PlaceholderValidationResult } from "./types.js";

const createPlaceholderValidator = (
  inscriptionType: PlaceholderValidationResult["inscriptionType"],
  schema: z.ZodTypeAny,
) => {
  return (input: unknown): PlaceholderValidationResult => {
    schema.parse(input);

    return {
      success: false,
      error: `${inscriptionType} validation is not implemented yet.`,
      inscriptionType,
    };
  };
};

export const validateGenesisMetadata = (input: unknown) => ArtCubeGenesisSchema.parse(input);

export const safeValidateGenesisMetadata = (input: unknown) => ArtCubeGenesisSchema.safeParse(input);

export const validateTitleEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.TitleEvent,
  ArtCubeTitleEventPlaceholderSchema,
);

export const validateDocumentEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.DocumentEvent,
  ArtCubeDocumentEventPlaceholderSchema,
);

export const validateConditionEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.ConditionEvent,
  ArtCubeConditionEventPlaceholderSchema,
);

export const validateCustodyEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.CustodyEvent,
  ArtCubeCustodyEventPlaceholderSchema,
);

export const validateIpEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.IpEvent,
  ArtCubeIpEventPlaceholderSchema,
);

export const validateCorrectionEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.CorrectionEvent,
  ArtCubeCorrectionEventPlaceholderSchema,
);

export const validateSupersessionEventPlaceholder = createPlaceholderValidator(
  ArtCubeInscriptionType.SupersessionEvent,
  ArtCubeSupersessionEventPlaceholderSchema,
);
