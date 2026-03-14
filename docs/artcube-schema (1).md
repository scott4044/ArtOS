\# ArtCube Protocol Metadata Schema  
\#\# Canonical Bitcoin Ordinal Architecture  
\#\#\# Version 1.1  
\---  
\# 1\. Overview  
ArtCube is a Bitcoin-native protocol for anchoring:  
\- artwork identity  
\- provenance  
\- legal title reference  
\- declared intellectual property rights  
\- append-only event history  
Bitcoin is the canonical source of truth.  
ArtCube uses:  
\- \*\*Genesis Title Anchor inscriptions\*\* as the root of trust  
\- \*\*Append-only Ledger Events\*\* for updates  
\- \*\*Bridge references\*\* for interoperability with programmable chains such as Solana  
ArtOS must treat Bitcoin as canonical and all non-Bitcoin representations as subordinate.  
\---  
\# 2\. Protocol Design Principles  
The ArtCube protocol follows these principles.  
\#\# 2.1 Immutable Genesis  
The Genesis inscription is permanent and never edited.  
\#\# 2.2 Append-Only Updates  
All updates are recorded as new inscriptions referencing Genesis.  
\#\# 2.3 Separation of Concerns  
Identity, title, custody, condition, documents, and intellectual property rights are recorded as distinct event categories.  
\#\# 2.4 Hybrid Title Transfer Model  
Canonical title recognition requires:  
\- Genesis UTXO control alignment  
\- Corresponding Title Ledger Event  
Both conditions must be satisfied.  
\#\# 2.5 Structured Intellectual Property Framework  
Baseline display rights may be declared at Genesis.  
All expanded commercial rights require explicit IP Events.  
\#\# 2.6 Institutional Governance  
Genesis UTXO must be controlled by the lawful authority (preferably multisig).  
\#\# 2.7 Bitcoin as Registrar  
Bitcoin anchors truth.  
Smart contract chains provide programmability but must reference Bitcoin as canonical.  
\---  
\# 3\. System Architecture Overview  
The ArtCube architecture consists of three layers.  
\#\# 3.1 Layer 1 — Genesis Title Anchor  
The Genesis inscription establishes:  
\- object identity (Object ID compliant)  
\- production facts  
\- ownership at time zero  
\- governing law  
\- legal title anchoring framework  
\- baseline intellectual property rights  
\- append-only update policy  
Genesis serves as the permanent root of trust.  
\---  
\#\# 3.2 Layer 2 — Append-Only Ledger Events  
All updates are recorded as new inscriptions referencing Genesis.  
Event categories include:  
\- TITLE\_EVENT  
\- DOCUMENT\_EVENT  
\- CONDITION\_EVENT  
\- CUSTODY\_EVENT  
\- IP\_EVENT  
\- METADATA\_UPDATE  
\- CORRECTION\_EVENT  
\- SUPERSESSION\_EVENT  
Each event must reference:  
\- Genesis inscription ID  
\- version number  
\- effective date  
\- previous event pointer (when applicable)  
This produces a permanent reconstructable state history.  
\---  
\#\# 3.3 Layer 3 — Bridge Layer  
Other blockchain systems must reference:  
\- Genesis inscription ID  
\- latest valid Title Ledger Event ID  
\- verified UTXO control  
Bitcoin remains the canonical root of truth.  
\---  
\# 4\. Canonical Inscription Types  
ArtOS MVP must support the following inscription types:  
\- \`GENESIS\_TITLE\_ANCHOR\`  
\- \`TITLE\_EVENT\`  
\- \`DOCUMENT\_EVENT\`  
\- \`CONDITION\_EVENT\`  
\- \`CUSTODY\_EVENT\`  
\- \`IP\_EVENT\`  
\- \`METADATA\_UPDATE\`  
\- \`CORRECTION\_EVENT\`  
\- \`SUPERSESSION\_EVENT\`  
\---  
\# 5\. Genesis Title Anchor Schema  
\#\# 5.1 Required Top-Level Structure  
\`\`\`json  
{  
  "protocol": "artcube",  
  "inscription\_type": "GENESIS\_TITLE\_ANCHOR",  
  "version": "1.1",  
  "record": {},  
  "object\_id\_core": {},  
  "ownership\_at\_genesis": {},  
  "legal\_title\_anchor": {},  
  "intellectual\_property": {}  
}  
**5.2 Genesis Field Definitions**

**protocol**

* type: string  
* required  
* must equal: artcube

**inscription\_type**

* type: string  
* required  
* must equal: GENESIS\_TITLE\_ANCHOR

**version**

* type: string  
* required  
* current MVP value: 1.1

**record**

* type: object  
* required

Fields:

* asset\_id — string, required  
* object\_id\_record\_date — string (ISO date), required

**object\_id\_core**

* type: object  
* required

Fields:

* type\_of\_object — string, required  
* title — string, required  
* subject — string, optional but recommended  
* date\_or\_period — object, required  
* maker — object, required  
* materials\_and\_techniques — object, required  
* measurements — object, required unless UNKNOWN

All unknown values must be explicitly marked "UNKNOWN".

**ownership\_at\_genesis**

* type: object  
* required

Fields:

* legal\_owner\_entity — object, required  
* physical\_custodian — object, optional but recommended

**legal\_title\_anchor**

* type: object  
* required

Fields:

* title\_anchor — boolean, required  
* governing\_law — string, required  
* hybrid\_transfer\_rule — string, required  
* statement — string, required

**intellectual\_property**

* type: object  
* required

Fields:

* copyright  
* moral\_rights  
* rights\_grants

**6\. Object ID Core Structure**

The object\_id\_core block must capture museum-grade object identity.

**6.1 Required Fields**

{  
  "type\_of\_object": "string",  
  "title": "string",  
  "date\_or\_period": {},  
  "maker": {},  
  "materials\_and\_techniques": {},  
  "measurements": {}  
}  
**6.2 Recommended Fields**

* subject  
* production\_details  
* inscriptions  
* distinguishing\_features

**6.3 Example Structure**

{  
  "object\_id\_core": {  
    "type\_of\_object": "Sculpture",  
    "title": "Battle of the Centaurs",  
    "subject": "Mythological battle scene",  
    "date\_or\_period": {  
      "original\_work": "c.1490–1492",  
      "silver\_casting": "2022"  
    },  
    "maker": {  
      "original\_artist": {  
        "name": "Michelangelo Buonarroti",  
        "role": "Original composition"  
      }  
    },  
    "materials\_and\_techniques": {  
      "materials": \[  
        { "name": ".999 Fine Silver", "confirmed": true }  
      \],  
      "techniques": \[  
        { "name": "Lost-wax casting", "confirmed": true }  
      \]  
    },  
    "measurements": {  
      "dimensions\_cm": {  
        "height": 80.0,  
        "width": 88.9,  
        "depth": 11.4  
      },  
      "weight\_kg": 72.57  
    }  
  }  
}  
**7\. Ownership at Genesis**

This block records the lawful starting ownership state.

**7.1 Schema**

{  
  "ownership\_at\_genesis": {  
    "legal\_owner\_entity": {  
      "name": "string",  
      "jurisdiction": "string"  
    },  
    "physical\_custodian": {  
      "name": "string",  
      "location": "string"  
    }  
  }  
}  
**7.2 Notes**

* legal\_owner\_entity is required  
* physical\_custodian may differ from legal owner  
* custody does not imply title

**8\. Legal Title Anchor Block**

This block establishes the legal/title framing of the Genesis inscription.

**8.1 Required Schema**

{  
  "legal\_title\_anchor": {  
    "title\_anchor": true,  
    "governing\_law": "string",  
    "hybrid\_transfer\_rule": "string",  
    "statement": "string"  
  }  
}  
**8.2 Required Statement**

Genesis must state that it serves as the **canonical Bitcoin provenance and legal title anchor for the identified artwork**.

**9\. Intellectual Property Block**

Genesis must include a structured IP baseline.

**9.1 Schema**

{  
  "intellectual\_property": {  
    "copyright": {  
      "status": "OWNED | LICENSED | PUBLIC\_DOMAIN | UNKNOWN | DISPUTED"  
    },  
    "moral\_rights": {  
      "waived": "YES | NO | UNKNOWN",  
      "attribution\_required": "YES | NO | UNKNOWN",  
      "integrity\_rights\_notes": "string | null"  
    },  
    "rights\_grants": {  
      "baseline\_policy": "BASELINE\_DISPLAY\_RIGHTS",  
      "granted\_to\_holder": {  
        "holder\_scope": "ALIGNED\_HOLDER",  
        "rights": \[\],  
        "status": "GRANTED",  
        "limitations": {  
          "territory": "string",  
          "term": "string",  
          "exclusivity": "NON\_EXCLUSIVE | EXCLUSIVE",  
          "revocable": "YES | NO",  
          "notes": "string"  
        }  
      },  
      "not\_granted\_by\_default": \[\]  
    }  
  }  
}  
**9.2 Baseline Rights That May Be Granted**

* DISPLAY\_NONCOMMERCIAL  
* EXHIBIT  
* PUBLISH\_IMAGES\_LOWRES

**9.3 Rights Not Granted by Default**

* PUBLISH\_IMAGES\_HIGHRES  
* REPRODUCE\_PRINTS  
* MERCHANDISING  
* COMMERCIALIZE  
* CREATE\_DERIVATIVES  
* AI\_TRAINING\_ALLOWED  
* AI\_GENERATION\_ALLOWED  
* SUBLICENSE

Expanded rights require explicit IP events.

**10\. Hybrid Title Transfer Rule**

Canonical title recognition requires both conditions.

**10.1 Condition 1 — UTXO Transfer**

The Genesis inscription UTXO must be transferred to the new lawful authority.

**10.2 Condition 2 — Title Ledger Event**

A valid TITLE\_EVENT must be appended.

If UTXO control and latest valid title event are misaligned, title state is considered indeterminate until corrected.

ArtOS must enforce this rule whenever displaying title status or minting bridged assets.

**11\. Event Model**

All non-Genesis updates are append-only event inscriptions.

**11.1 Common Event Fields**

{  
  "protocol": "artcube",  
  "inscription\_type": "TITLE\_EVENT",  
  "version": "1.1",  
  "parent\_genesis\_inscription": "string",  
  "effective\_date": "YYYY-MM-DD",  
  "previous\_event\_pointer": "string | null"  
}  
**11.2 Recommended Common Fields**

* event\_id  
* event\_timestamp  
* declared\_by  
* notes

**12\. Title Event Schema**

**12.1 Allowed Status Values**

* OWNED  
* TRANSFERRED  
* PLEDGED  
* RELEASED  
* CORRECTED

**12.2 Schema**

{  
  "protocol": "artcube",  
  "inscription\_type": "TITLE\_EVENT",  
  "version": "1.1",  
  "parent\_genesis\_inscription": "string",  
  "effective\_date": "YYYY-MM-DD",  
  "title\_status": "TRANSFERRED",  
  "current\_legal\_owner\_entity": {  
    "name": "string",  
    "jurisdiction": "string"  
  },  
  "utxo\_control\_entity": {  
    "wallet\_address": "string",  
    "entity\_name": "string"  
  },  
  "previous\_event\_pointer": "string",  
  "agreement\_hash": "string | null"  
}  
**13\. Document Event Schema**

Documents remain off-chain.

On-chain events store references and integrity proofs.

**13.1 Schema**

{  
  "protocol": "artcube",  
  "inscription\_type": "DOCUMENT\_EVENT",  
  "version": "1.1",  
  "parent\_genesis\_inscription": "string",  
  "effective\_date": "YYYY-MM-DD",  
  "document\_type": "APPRAISAL",  
  "issuer": "string",  
  "document\_hash\_sha256": "string",  
  "document\_uri": "arweave://...",  
  "previous\_event\_pointer": "string | null"  
}  
**13.2 Supported Use Cases**

* appraisal  
* insurance  
* assay  
* legal agreement  
* licensing contract

**14\. Condition Event Schema**

{  
  "protocol": "artcube",  
  "inscription\_type": "CONDITION\_EVENT",  
  "version": "1.1",  
  "parent\_genesis\_inscription": "string",  
  "effective\_date": "YYYY-MM-DD",  
  "inspection\_date": "YYYY-MM-DD",  
  "inspector\_entity": "string",  
  "condition\_summary": "string",  
  "damage\_or\_repairs": "string | null",  
  "media\_hashes": \[\],  
  "previous\_event\_pointer": "string | null"  
}  
**15\. Custody Event Schema**

{  
  "protocol": "artcube",  
  "inscription\_type": "CUSTODY\_EVENT",  
  "version": "1.1",  
  "parent\_genesis\_inscription": "string",  
  "effective\_date": "YYYY-MM-DD",  
  "custodian": {  
    "name": "string",  
    "location": "string"  
  },  
  "authorization\_reference": "string | null",  
  "previous\_event\_pointer": "string | null"  
}  
Custody changes do **not** imply title transfer.

**21\. Validation Rules for Codex**

Codex implementation should enforce:

* valid JSON structure  
* required fields by inscription type  
* explicit "UNKNOWN" where required fields are unavailable  
* ISO date formatting  
* valid protocol version  
* event parent linkage  
* previous\_event\_pointer requirements for append-only sequencing  
* title events cannot be treated as valid if Genesis reference is missing

**22\. Canonical Example**

The **Battle of the Centaurs Genesis metadata** should validate against this schema as a Genesis Title Anchor reference implementation.

\---  
If you'd like, the \*\*next extremely helpful thing\*\* I can give you is a second file for your repo:  
docs/artcube-centaurs-example.json

That file will act as the \*\*first test fixture for the protocol package\*\*, which makes Codex much more reliable when generating the validator code.  
