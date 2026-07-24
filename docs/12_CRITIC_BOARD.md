# 12_CRITIC_BOARD: UIOS Impeccable Critic Board Specification

## 1. 8 Specialist Personas
Defined in `packages/critics/src/index.ts`:

1. **Visual Critic**: Audits color rationing and hairline border parameters.
2. **UX Architect**: Audits layout flow, DOM hierarchy, and navigation ease.
3. **Accessibility Expert**: Audits WCAG AAA contrast ratios (6.4:1) and ARIA attributes.
4. **Motion Designer**: Audits spring physics stiffness and transition durations.
5. **Performance Engineer**: Audits GPU render load and DOM node counts.
6. **Brand Reviewer**: Audits BrandDNA token adherence.
7. **Frontend Architect**: Audits React RSC best practices and Tailwind utility hygiene.
8. **Design Critic**: Enforces anti-slop rules (removes uncurated blur blobs and generic icon boxes).

## 2. Automatic Remediation (`autoFix`)
If any persona score falls below threshold, `criticBoard.autoFix(astNode)` mutates the AST properties to guarantee 100% compliance before emission.
