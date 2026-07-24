# 13_motion.md: Motion Physics & Animation Rules

```yaml
owner: Motion Designer Agent
depends_on: [workspace/docs/04_brand.md]
produces: [workspace/knowledge/motion.rules.json]
consumed_by: [Motion Director Critic, React Emitter]
```

## Motion Rules
- **Library**: `framer-motion` v11
- **Easing**: `cubic-bezier(0.16, 1, 0.3, 1)` (Spring physics curve)
- **Duration Cap**: `250ms` / `300ms` for interactive transitions
- **Infinite Marquee**: Linear infinite scroll (`duration: 25s`, `ease: 'linear'`)
- **Queue State**: `AnimatePresence` for dynamic list addition
