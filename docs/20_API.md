# 20_API: UIOS HTTP & tRPC API Specification

## 1. Endpoints
The Studio app (`apps/studio/src/app/api/pipeline/route.ts`) exposes API endpoints for compilation:

- `POST /api/pipeline`: Accepts a design specification JSON payload and returns compiled AST, IR, Critic Report, and emitted React TSX code.
- `GET /api/health`: Returns server status and registered skill runtime manifests.
