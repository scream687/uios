# 14_EMITTERS: UIOS Multi-Target Code Emitters Specification

## 1. Overview
The Emitters package (`packages/adapters`) converts `DesignIRNode` graphs into framework-idiomatic source code.

## 2. Supported Emitter Targets
- `react-19-tsx`: React 19 RSC with Tailwind CSS and Framer Motion.
- `next14-app-router`: Next.js 14 App Router layout and page components.
- `vue-3`: Vue 3 Composition API SFCs with Tailwind CSS.
- `svelte-5`: Svelte 5 runes components.
- `html-vanilla`: Pure semantic HTML5 + Vanilla CSS tokens.
