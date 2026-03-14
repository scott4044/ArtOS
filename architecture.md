# ArtOS Architecture

## System Overview
ArtOS is a SaaS platform that orchestrates tokenization of physical artwork using the ArtCube protocol.

Primary layers:
- Bitcoin Ordinals — canonical provenance, title reference, and IP anchor
- Solana — programmable bridge layer
- Arweave — supplemental off-chain storage
- ArtOS Web Platform — user-facing workflow and orchestration layer

Bitcoin is the canonical source of truth.
Solana representations must always defer to Bitcoin canonical state.