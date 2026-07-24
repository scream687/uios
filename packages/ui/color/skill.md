# Color Discipline Reasoning Strategy (skill.md)

## Design Objectives
- Synthesize curated HSL-tailored color palettes anchored in brand psychology.
- Enforce strict WCAG AAA contrast ratios (>= 7.0:1 for body text, >= 4.5:1 for headlines).
- Prevent pure `#000000` blacks and pure `#FFFFFF` whites in favor of rich obsidian (`#0A0A0B`) and warm off-white cream (`#FDFBF7`).

## Decision Framework
1. **Psychology Alignment**: Map domain intent to palette (e.g. Volcanic Vermilion `#FF4500` for specialty coffee).
2. **Surface Hierarchy**: Define distinct surface elevations (`background`, `surface`, `surface-elevated`, `border`).
3. **Restrained Chromatic Accent**: Limit bright primary accents to <= 10% surface area occupancy to maximize visual saliency.
4. **Anti-Patterns**: Never use uncurated pure RGB primaries (`#0000FF`, `#FF0000`); never use low-contrast gray text on dark backgrounds.
