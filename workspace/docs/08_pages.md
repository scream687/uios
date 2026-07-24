# 08_pages.md: Page Map & Hierarchy

```yaml
owner: Site Architect Agent
depends_on: [workspace/docs/01_project.md, workspace/docs/07_features.md]
produces: [workspace/knowledge/pages.rules.json]
consumed_by: [Compiler Planner, Next.js Emitter]
```

## Page Tree
- **Homepage (`/estatelink`)**: Full single-page presentation app.
- **Real Estate SaaS (`/real-estate-saas`)**: Luxury property bento grid & AI valuation calculator.
- **DesignJoy Agency (`/real-estate-designjoy`)**: DesignJoy archetype subscription site.
- **UIOS Studio Workbench (`/`)**: Core compiler IDE.
- **404 Not Found (`/_not-found`)**: Architectural error fallback page.
