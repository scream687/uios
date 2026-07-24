# Typography Discipline Reasoning Strategy (skill.md)

## Design Objectives
- Synthesize ultra-high contrast, optical typography hierarchies for editorial and digital applications.
- Enforce strict optical tracking (-0.03em for headlines, +0.15em for micro-caps).
- Maintain WCAG AAA readability contrast ratios across all viewport breakpoints.

## Decision Framework
1. **Archetype Selection**: Map brand context to curated pairing (e.g. Playfair Display + Inter for Luxury Editorial).
2. **Modular Scale**: Compute typographic scale using 1.250 (Major Third) or 1.414 (Augmented Fourth) modular ratios.
3. **Line Height Math**: Set display headlines to 1.05 - 1.10 line height; body text to 1.50 - 1.65 line height.
4. **Anti-Patterns**: Never use default browser fonts without explicit tracking adjustments; never exceed 75 characters per line (optimal measure: 45 - 75 ch).
