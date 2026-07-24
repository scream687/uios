# 08_BRAND_DNA: UIOS BrandDNA Specification

## 1. Overview
`BrandDNA` (`packages/compiler/src/v2/v2-core.ts`) represents the complete visual identity token payload injected into compiled components.

## 2. Token Categories
- `personality`: Array of design attributes (e.g. `['Architectural', 'Minimal', 'Confident']`).
- `typographyDNA`: Heading fonts, display size, letter tracking (`-0.045em`), and line-height.
- `colorDNA`: HSL canvas colors, elevation surfaces, accent CTAs, and border tokens.
- `motionDNA`: Framer Motion spring physics curves and duration parameters.
- `spacingDNA`: Section vertical padding (`144px`), grid gaps, and item padding.
