# ArtCube Protocol Metadata Schema
## Canonical Bitcoin Ordinal Architecture
### Version 1.1

## 1. Overview

ArtCube is a Bitcoin-native protocol for anchoring:

- artwork identity
- provenance
- legal title reference
- declared intellectual property rights
- append-only event history

Bitcoin is the canonical source of truth.

ArtCube uses:

- **Genesis Title Anchor** inscriptions as the root of trust
- **Append-only Ledger Events** for updates
- **Bridge references** for interoperability with programmable chains such as Solana

ArtOS must treat Bitcoin as canonical and all non-Bitcoin representations as subordinate.

---

## 2. Protocol Design Principles

The ArtCube protocol follows these principles:

1. Immutable Genesis  
   The Genesis inscription is permanent and never edited.

2. Append-Only Updates  
   All updates are recorded as new inscriptions referencing Genesis.

3. Separation of Concerns  
   Identity, title, custody, condition, documents, and IP are separate event categories.

4. Hybrid Title Transfer  
   Canonical title requires both:
   - Genesis UTXO control alignment
   - corresponding Title Ledger Event

5. Structured Intellectual Property  
   Baseline display rights may be declared at Genesis.
   Expanded rights require explicit IP Events.

6. Institutional Governance  
   Genesis UTXO should be controlled by lawful authority, preferably multisig.

7. Bitcoin as Registrar  
   Bitcoin is canonical.
   Other chains provide programmability only.

---

## 3. Architecture Layers

### Layer 1 — Genesis Title Anchor
Establishes:

- artwork identity
- production facts
- ownership at Genesis
- governing law
- title anchoring framework
- baseline intellectual property rights
- append-only rule

### Layer 2 — Append-Only Ledger Events
All changes are recorded as new inscriptions referencing Genesis.

Supported event categories:

- TITLE_EVENT
- DOCUMENT_EVENT
- CONDITION_EVENT
- CUSTODY_EVENT
- IP_EVENT
- METADATA_UPDATE
- CORRECTION_EVENT
- SUPERSESSION_EVENT

### Layer 3 — Bridge Layer
External chains must reference:

- Genesis inscription ID
- latest valid Title Ledger Event ID
- verified Genesis UTXO control

Bridged representations must never override Bitcoin state.

---

## 4. Canonical Inscription Types

ArtOS MVP must support these inscription types:

- `GENESIS_TITLE_ANCHOR`
- `TITLE_EVENT`
- `DOCUMENT_EVENT`
- `CONDITION_EVENT`
- `CUSTODY_EVENT`
- `IP_EVENT`
- `METADATA_UPDATE`
- `CORRECTION_EVENT`
- `SUPERSESSION_EVENT`

---

## 5. Genesis Title Anchor Schema

### 5.1 Required Top-Level Fields

```json
{
  "protocol": "artcube",
  "inscription_type": "GENESIS_TITLE_ANCHOR",
  "version": "1.1",
  "record": {},
  "object_id_core": {},
  "ownership_at_genesis": {},
  "legal_title_anchor": {},
  "intellectual_property": {}
}
5.2 Genesis Field Definitions
protocol

type: string

required

must equal: artcube

inscription_type

type: string

required

must equal: GENESIS_TITLE_ANCHOR

version

type: string

required

current MVP value: 1.1

record

type: object

required

Fields:

asset_id — string, required

object_id_record_date — string (ISO date), required

object_id_core

type: object

required

Fields:

type_of_object — string, required

title — string, required

subject — string, optional but recommended

date_or_period — object, required

maker — object, required

materials_and_techniques — object, required

measurements — object, required unless UNKNOWN

All unknown values must be explicitly marked "UNKNOWN".

ownership_at_genesis

type: object

required

Fields:

legal_owner_entity — object, required

physical_custodian — object, optional but recommended

legal_title_anchor

type: object

required

Fields:

title_anchor — boolean, required

governing_law — string, required

hybrid_transfer_rule — string, required

statement — string, required

intellectual_property

type: object

required

Fields:

copyright

moral_rights

rights_grants

6. Object ID Core Structure

The object_id_core block must capture museum-grade object identity.

Required fields
{
  "type_of_object": "string",
  "title": "string",
  "date_or_period": {},
  "maker": {},
  "materials_and_techniques": {},
  "measurements": {}
}
Recommended fields

subject

production_details

inscriptions

distinguishing_features

Example structure
{
  "object_id_core": {
    "type_of_object": "Sculpture",
    "title": "Battle of the Centaurs",
    "subject": "Mythological battle scene",
    "date_or_period": {
      "original_work": "c.1490–1492",
      "silver_casting": "2022"
    },
    "maker": {
      "original_artist": {
        "name": "Michelangelo Buonarroti",
        "role": "Original composition"
      }
    },
    "materials_and_techniques": {
      "materials": [
        { "name": ".999 Fine Silver", "confirmed": true }
      ],
      "techniques": [
        { "name": "Lost-wax casting", "confirmed": true }
      ]
    },
    "measurements": {
      "dimensions_cm": {
        "height": 80.0,
        "width": 88.9,
        "depth": 11.4
      },
      "weight_kg": 72.57
    }
  }
}
7. Ownership at Genesis

This block records the lawful starting ownership state.

Schema
{
  "ownership_at_genesis": {
    "legal_owner_entity": {
      "name": "string",
      "jurisdiction": "string"
    },
    "physical_custodian": {
      "name": "string",
      "location": "string"
    }
  }
}
Notes

legal_owner_entity is required

physical_custodian may differ from legal owner

custody does not imply title

8. Legal Title Anchor Block

This block establishes the legal/title framing of the Genesis inscription.

Required schema
{
  "legal_title_anchor": {
    "title_anchor": true,
    "governing_law": "string",
    "hybrid_transfer_rule": "string",
    "statement": "string"
  }
}
Required statement

Genesis must state that it serves as the canonical Bitcoin provenance and legal title anchor for the identified artwork.

9. Intellectual Property Block

Genesis must include a structured IP baseline.

Schema
{
  "intellectual_property": {
    "copyright": {
      "status": "OWNED | LICENSED | PUBLIC_DOMAIN | UNKNOWN | DISPUTED"
    },
    "moral_rights": {
      "waived": "YES | NO | UNKNOWN",
      "attribution_required": "YES | NO | UNKNOWN",
      "integrity_rights_notes": "string | null"
    },
    "rights_grants": {
      "baseline_policy": "BASELINE_DISPLAY_RIGHTS",
      "granted_to_holder": {
        "holder_scope": "ALIGNED_HOLDER",
        "rights": [],
        "status": "GRANTED",
        "limitations": {
          "territory": "string",
          "term": "string",
          "exclusivity": "NON_EXCLUSIVE | EXCLUSIVE",
          "revocable": "YES | NO",
          "notes": "string"
        }
      },
      "not_granted_by_default": []
    }
  }
}
Baseline rights that may be granted

DISPLAY_NONCOMMERCIAL

EXHIBIT

PUBLISH_IMAGES_LOWRES

Rights not granted by default

PUBLISH_IMAGES_HIGHRES

REPRODUCE_PRINTS

MERCHANDISING

COMMERCIALIZE

CREATE_DERIVATIVES

AI_TRAINING_ALLOWED

AI_GENERATION_ALLOWED

SUBLICENSE

Expanded rights require explicit IP events.

10. Hybrid Title Transfer Rule

Canonical title recognition requires both:

Condition 1 — UTXO Transfer

The Genesis inscription UTXO must be transferred to the new lawful authority.

Condition 2 — Title Ledger Event

A valid TITLE_EVENT must be appended.

If UTXO control and latest valid title event are misaligned, title state is indeterminate until corrected.

ArtOS must enforce this rule at the application level whenever displaying current title status or minting bridged assets.

11. Event Model

All non-Genesis updates are append-only event inscriptions.

Common Event Fields

Every event must include:

{
  "protocol": "artcube",
  "inscription_type": "TITLE_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "previous_event_pointer": "string | null"
}

Recommended common fields:

event_id

event_timestamp

declared_by

notes

12. Title Event Schema
Allowed status values

OWNED

TRANSFERRED

PLEDGED

RELEASED

CORRECTED

Schema
{
  "protocol": "artcube",
  "inscription_type": "TITLE_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "title_status": "TRANSFERRED",
  "current_legal_owner_entity": {
    "name": "string",
    "jurisdiction": "string"
  },
  "utxo_control_entity": {
    "wallet_address": "string",
    "entity_name": "string"
  },
  "previous_event_pointer": "string",
  "agreement_hash": "string | null"
}
13. Document Event Schema

Documents remain off-chain.
On-chain events store references and integrity proofs.

Schema
{
  "protocol": "artcube",
  "inscription_type": "DOCUMENT_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "document_type": "APPRAISAL",
  "issuer": "string",
  "document_hash_sha256": "string",
  "document_uri": "arweave://...",
  "previous_event_pointer": "string | null"
}
Supported use cases

appraisal

insurance

assay

legal agreement

licensing contract

14. Condition Event Schema
{
  "protocol": "artcube",
  "inscription_type": "CONDITION_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "inspection_date": "YYYY-MM-DD",
  "inspector_entity": "string",
  "condition_summary": "string",
  "damage_or_repairs": "string | null",
  "media_hashes": [],
  "previous_event_pointer": "string | null"
}
15. Custody Event Schema
{
  "protocol": "artcube",
  "inscription_type": "CUSTODY_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "custodian": {
    "name": "string",
    "location": "string"
  },
  "authorization_reference": "string | null",
  "previous_event_pointer": "string | null"
}

Custody changes do not imply title transfer.

16. IP Event Schema

Supported event variants include:

IP_ATTESTATION_EVENT

RIGHTS_GRANT_EVENT

LICENSE_EVENT

RIGHTS_CHANGE_EVENT

REVOCATION_EVENT

DISPUTE_EVENT

MVP envelope schema
{
  "protocol": "artcube",
  "inscription_type": "IP_EVENT",
  "version": "1.1",
  "parent_genesis_inscription": "string",
  "effective_date": "YYYY-MM-DD",
  "ip_event_type": "RIGHTS_GRANT_EVENT",
  "rights_subject": "COMMERCIAL_REPRODUCTION",
  "granted_to": "string",
  "status": "ACTIVE",
  "terms_hash": "string | null",
  "previous_event_pointer": "string | null"
}

IP rights changes do not imply title transfer.

17. Correction and Supersession
Minor Errors

Handled with CORRECTION_EVENT

Material Identity Errors

Require:

new Genesis

SUPERSESSION_EVENT referencing old Genesis

Genesis is never edited.

18. Storage Rules
Bitcoin Ordinals

Must store:

Genesis metadata

event metadata

canonical references

title and IP state declarations

Arweave

May store:

high-resolution images

certificates

appraisals

legal documents

provenance packets

inspection media

ArtOS must store Arweave URIs and document hashes in linked event records.

19. Bridge Integrity Rules

Before minting or updating a bridged Solana representation, ArtOS must verify:

Genesis inscription exists

latest valid Title Ledger Event exists or Genesis ownership is authoritative

title status aligns with Genesis UTXO control

bridge record references Bitcoin identifiers

Bridged tokens must include:

parent_genesis_inscription

latest_valid_title_event

bridge_chain = solana

Bridged assets must never supersede Bitcoin canonical state.

20. MVP Scope for ArtOS Implementation

For MVP, ArtOS must support:

Required

Genesis Title Anchor creation

metadata validation

Arweave file upload

Bitcoin inscription job creation

Solana bridge creation referencing Genesis

dashboard display of canonical state

Deferred

live append-only event authoring UI for all event types

multisig governance tooling

advanced dispute workflows

automated UTXO verification infrastructure

fractionalization logic

lending integrations

21. Validation Rules for Codex

Codex implementation should enforce:

valid JSON structure

required fields by inscription type

explicit "UNKNOWN" where required fields are unavailable

ISO date formatting

valid protocol version

event parent linkage

previous_event_pointer requirements for append-only sequencing

title events cannot be treated as valid if Genesis reference is missing

22. Canonical Example

The Battle of the Centaurs Genesis metadata should validate against this schema as a Genesis Title Anchor reference implementation.


---

## After you replace it

Commit and push:

```bash
git add docs/artcube-schema.md
git commit -m "expand ArtCube schema spec for Codex implementation"
git push
