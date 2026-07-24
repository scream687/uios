# 07_RESEARCH_ENGINE: UIOS Research Engine Specification

## 1. Overview
The `ResearchEngine` class (`packages/compiler/src/v2/v2-core.ts`) analyzes visual reference inputs, benchmark datasets, and extracted features.

## 2. Capabilities
- **Feature Extraction**: Extracts typography tracking, HSL palettes, section padding rhythm, and motion physics.
- **Evidence Logging**: Stores reference records in `EvidenceLayer` with timestamped URLs and quality scores.
