# 12_accessibility.md: Accessibility & WCAG Standards

```yaml
owner: Accessibility Specialist Agent
depends_on: [workspace/docs/04_brand.md]
produces: [workspace/knowledge/wcag.rules.json]
consumed_by: [Accessibility Expert Critic, Validator]
```

## Standards
- **Contrast Ratios**: Minimum 6.4:1 text contrast for all white text on dark background.
- **Focus Rings**: 2px visible focus rings (`focus:ring-2 focus:ring-[#e2ff00] focus:ring-offset-2`).
- **ARIA Roles**: Explicit `role="banner"`, `role="region"`, `role="navigation"`, `role="dialog"`.
