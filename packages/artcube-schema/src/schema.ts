import { z } from "zod";

import {
  ArtCubeInscriptionType,
  CopyrightStatus,
  IpRight,
  TitleStatus,
  UnknownableBoolean,
} from "./types.js";

const nonEmptyString = z.string().trim().min(1);
const unknownableString = nonEmptyString;
const isoDateString = z.iso.date();
const unknownLiteral = z.literal("UNKNOWN");

const nonEmptyRecord = <T extends z.ZodTypeAny>(valueSchema: T) =>
  z.record(nonEmptyString, valueSchema).refine((value) => Object.keys(value).length > 0, {
    message: "Expected at least one entry.",
  });

const makerEntitySchema = z.object({
  name: unknownableString,
  role: unknownableString,
});

const materialOrTechniqueSchema = z.object({
  name: unknownableString,
  confirmed: z.boolean(),
});

const measurementsSchema = z
  .object({
    dimensions_cm: z
      .object({
        height: z.number().finite().nonnegative().optional(),
        width: z.number().finite().nonnegative().optional(),
        depth: z.number().finite().nonnegative().optional(),
      })
      .refine((value) => Object.keys(value).length > 0, {
        message: "At least one dimension is required when dimensions_cm is provided.",
      })
      .optional(),
    weight_kg: z.number().finite().nonnegative().optional(),
  })
  .refine((value) => Object.keys(value).length > 0, {
    message: "Measurements must include at least one populated field or be set to UNKNOWN.",
  });

const legalOrCustodyEntitySchema = z.object({
  name: unknownableString,
  jurisdiction: unknownableString.optional(),
  location: unknownableString.optional(),
});

const nonGenesisInscriptionTypeSchema = z
  .nativeEnum(ArtCubeInscriptionType)
  .refine((inscriptionType) => inscriptionType !== ArtCubeInscriptionType.GenesisTitleAnchor, {
    message: "Event inscription types cannot be GENESIS_TITLE_ANCHOR.",
  });

export const ArtCubeProtocolSchema = z.literal("artcube");
export const ArtCubeVersionSchema = z.literal("1.1");
export const ArtCubeInscriptionTypeSchema = z.nativeEnum(ArtCubeInscriptionType);
export const TitleStatusSchema = z.nativeEnum(TitleStatus);
export const CopyrightStatusSchema = z.nativeEnum(CopyrightStatus);
export const IpRightSchema = z.nativeEnum(IpRight);
export const UnknownableBooleanSchema = z.nativeEnum(UnknownableBoolean);

export const ArtCubeGenesisSchema = z.object({
  protocol: ArtCubeProtocolSchema,
  inscription_type: z.literal(ArtCubeInscriptionType.GenesisTitleAnchor),
  version: ArtCubeVersionSchema,
  record: z.object({
    asset_id: unknownableString,
    object_id_record_date: isoDateString,
  }),
  object_id_core: z.object({
    type_of_object: unknownableString,
    title: unknownableString,
    subject: unknownableString.optional(),
    date_or_period: nonEmptyRecord(unknownableString),
    maker: nonEmptyRecord(makerEntitySchema),
    materials_and_techniques: z.object({
      materials: z.array(materialOrTechniqueSchema).min(1),
      techniques: z.array(materialOrTechniqueSchema).min(1),
    }),
    measurements: z.union([measurementsSchema, unknownLiteral]),
    production_details: nonEmptyRecord(unknownableString).optional(),
    inscriptions: unknownableString.optional(),
    distinguishing_features: unknownableString.optional(),
  }),
  ownership_at_genesis: z.object({
    legal_owner_entity: z.object({
      name: unknownableString,
      jurisdiction: unknownableString,
    }),
    physical_custodian: z
      .object({
        name: unknownableString,
        location: unknownableString,
      })
      .optional(),
  }),
  legal_title_anchor: z.object({
    title_anchor: z.boolean(),
    governing_law: unknownableString,
    hybrid_transfer_rule: unknownableString,
    statement: unknownableString,
  }),
  intellectual_property: z.object({
    copyright: z.object({
      status: CopyrightStatusSchema,
    }),
    moral_rights: z.object({
      waived: UnknownableBooleanSchema,
      attribution_required: UnknownableBooleanSchema,
      integrity_rights_notes: z.string().nullable(),
    }),
    rights_grants: z.object({
      baseline_policy: z.literal("BASELINE_DISPLAY_RIGHTS"),
      granted_to_holder: z.object({
        holder_scope: z.literal("ALIGNED_HOLDER"),
        rights: z.array(IpRightSchema).min(1),
        status: z.literal("GRANTED"),
        limitations: z.object({
          territory: unknownableString,
          term: unknownableString,
          exclusivity: z.enum(["NON_EXCLUSIVE", "EXCLUSIVE"]),
          revocable: UnknownableBooleanSchema,
          notes: unknownableString,
        }),
      }),
      not_granted_by_default: z.array(IpRightSchema),
    }),
  }),
});

export const ArtCubeEventBaseSchema = z.object({
  protocol: ArtCubeProtocolSchema,
  inscription_type: nonGenesisInscriptionTypeSchema,
  version: ArtCubeVersionSchema,
  parent_genesis_inscription: nonEmptyString,
  effective_date: isoDateString,
  previous_event_pointer: nonEmptyString.nullable(),
});

export const ArtCubeTitleEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.TitleEvent),
  title_status: TitleStatusSchema.optional(),
});

export const ArtCubeDocumentEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.DocumentEvent),
});

export const ArtCubeConditionEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.ConditionEvent),
});

export const ArtCubeCustodyEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.CustodyEvent),
  custodian: legalOrCustodyEntitySchema.optional(),
});

export const ArtCubeIpEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.IpEvent),
});

export const ArtCubeCorrectionEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.CorrectionEvent),
});

export const ArtCubeSupersessionEventPlaceholderSchema = ArtCubeEventBaseSchema.extend({
  inscription_type: z.literal(ArtCubeInscriptionType.SupersessionEvent),
});
