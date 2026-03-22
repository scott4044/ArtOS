import test from "node:test";
import assert from "node:assert/strict";

import centaursFixture from "../../../docs/artcube-centaurs-example.json" with { type: "json" };

import {
  ArtCubeGenesisSchema,
  ArtCubeInscriptionType,
  CopyrightStatus,
  IpRight,
  safeValidateGenesisMetadata,
  validateGenesisMetadata,
  validateTitleEventPlaceholder,
} from "../src/index.js";

test("ArtCubeGenesisSchema parses the centaurs fixture", () => {
  const parsed = ArtCubeGenesisSchema.parse(centaursFixture);

  assert.equal(parsed.protocol, "artcube");
  assert.equal(parsed.inscription_type, ArtCubeInscriptionType.GenesisTitleAnchor);
  assert.equal(parsed.intellectual_property.copyright.status, CopyrightStatus.Unknown);
  assert.deepEqual(parsed.intellectual_property.rights_grants.granted_to_holder.rights, [
    IpRight.DisplayNonCommercial,
    IpRight.Exhibit,
    IpRight.PublishImagesLowRes,
  ]);
});

test("validateGenesisMetadata returns the parsed fixture", () => {
  const parsed = validateGenesisMetadata(centaursFixture);

  assert.equal(parsed.record.object_id_record_date, "2026-03-14");
  assert.equal(parsed.object_id_core.maker.original_artist?.name, "Michelangelo Buonarroti");
});

test("safeValidateGenesisMetadata returns a successful result for the fixture", () => {
  const result = safeValidateGenesisMetadata(centaursFixture);

  assert.equal(result.success, true);
  assert.equal(result.data.legal_title_anchor.title_anchor, true);
});

test("safeValidateGenesisMetadata rejects an invalid Genesis payload", () => {
  const result = safeValidateGenesisMetadata({
    ...centaursFixture,
    version: "2.0",
  });

  assert.equal(result.success, false);
});



test("safeValidateGenesisMetadata accepts explicit UNKNOWN measurements", () => {
  const result = safeValidateGenesisMetadata({
    ...centaursFixture,
    object_id_core: {
      ...centaursFixture.object_id_core,
      measurements: "UNKNOWN",
    },
  });

  assert.equal(result.success, true);
  if (result.success) {
    assert.equal(result.data.object_id_core.measurements, "UNKNOWN");
  }
});

test("placeholder event validator parses the minimal event shape and returns a TODO result", () => {
  const result = validateTitleEventPlaceholder({
    protocol: "artcube",
    inscription_type: ArtCubeInscriptionType.TitleEvent,
    version: "1.1",
    parent_genesis_inscription: "genesis-inscription-id",
    effective_date: "2026-03-21",
    previous_event_pointer: null,
  });

  assert.deepEqual(result, {
    success: false,
    error: "TITLE_EVENT validation is not implemented yet.",
    inscriptionType: ArtCubeInscriptionType.TitleEvent,
  });
});
