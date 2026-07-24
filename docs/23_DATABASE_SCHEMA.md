# 23_DATABASE_SCHEMA: UIOS Persistence Schema Specification

## 1. Prisma Data Model Schema
Used for optional backend compilation persistence:

```prisma
model CompilationSession {
  id              String   @id @default(uuid())
  projectName     String
  archetype       String
  specJson        String
  astJson         String
  irJson          String
  emittedCode     String
  criticScore     Int
  createdAt       DateTime @default(now())
}
```
