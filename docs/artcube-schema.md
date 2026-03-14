# ArtCube Protocol Metadata Schema
## Canonical Bitcoin Ordinal Architecture
### Version 1.1

---

# 1. Overview

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

# 2. Protocol Design Principles

The ArtCube protocol follows these principles:

## 2.1 Immutable Genesis

The Genesis inscription is permanent and never edited.

## 2.2 Append-Only Updates

All updates are recorded as new inscriptions referencing Genesis.

## 2.3 Separation of Concerns

Identity, title, custody, condition, documents, and IP are separate event categories.

## 2.4 Hybrid Title Transfer

Canonical title requires both:

- Genesis UTXO control alignment
- corresponding Title Ledger Event

## 2.5 Structured Intellectual Property

Baseline display rights may be declared at Genesis.

Expanded rights require explicit IP Events.

## 2.6 Institutional Governance

Genesis UTXO should be controlled by lawful authority, preferably multisig.

## 2.7 Bitcoin as Registrar

Bitcoin is canonical.

Other chains provide programmability only.

---

# 3. Architecture Layers

## 3.1 Layer 1 — Genesis Title Anchor

Establishes:

- artwork identity
- production facts
- ownership at Genesis
- governing law
- title anchoring framework
- baseline intellectual property rights
- append-only rule

Genesis serves as the permanent root of trust.

## 3.2 Layer 2 — Append-Only Ledger Events

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

## 3.3 Layer 3 — Bridge Layer

External chains must reference:

- Genesis inscription ID
- latest valid Title Ledger Event ID
- verified Genesis UTXO control

Bridged representations must never override Bitcoin state.

---

# 4. Canonical Inscription Types

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

# 5. Genesis Title Anchor Schema

## 5.1 Required Top-Level Fields

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
