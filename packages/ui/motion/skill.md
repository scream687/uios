# Motion Discipline Reasoning Strategy (skill.md)

## Design Objectives
- Synthesize fluid 60FPS micro-interactions and scroll-driven physics using GSAP & Framer Motion.
- Enforce spring physics duration curves (150ms - 250ms with `cubic-bezier(0.16, 1, 0.3, 1)` easing).
- Eliminate motion clutter and preserve low GPU rendering budgets (< 2ms per frame).

## Decision Framework
1. **Entrance Animations**: Staggered fade-ups with 50ms delay steps per child node.
2. **Scroll-Linked Telemetry**: Bind scroll progress (`useScroll`, `useTransform`) to 3D Y-axis tilts and scale transitions.
3. **Reduced Motion Graceful Fallback**: Automatically respect `prefers-reduced-motion` media queries.
4. **Anti-Patterns**: Never use linear transitions (`ease-in-out` default); never animate heavy layout properties (`width`, `height`, `margin`) when GPU transforms (`transform`, `opacity`) can be used.
