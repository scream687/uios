# 15_constraints.md: System Constraints & Quality Thresholds

```yaml
owner: Performance Engineer Agent
depends_on: [workspace/docs/04_brand.md, workspace/docs/14_tech_stack.md]
produces: [workspace/knowledge/constraints.rules.json]
consumed_by: [Performance Engineer Critic, Validator]
```

## Quantitative Constraints
- **GPU Render Budget**: `< 1.6ms` per frame during hover transitions.
- **Accessibility Contrast**: `>= 6.4:1` WCAG AAA contrast ratio.
- **Build Target**: Zero compilation errors during `npm run build`.
- **Slop Score**: Zero uncurated blur blobs or broken placeholder components.
