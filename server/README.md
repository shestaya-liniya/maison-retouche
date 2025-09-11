# server-trpc

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run dev
```

#### Migration

1. Create migration file:  
   `bun wrangler --env dev d1 migrations create maison-retouche-dev [MIGRATION_NAME]`

2. Export dev db:
   `bun wrangler d1 export maison-retouche-dev --env=dev --remote --output=./remote_dev_db.sql`
   `sqlite3 remote_dev_db.db < remote_dev_db.sql`

3. Generate SQL:
   `bun prisma migrate diff --from-url "file:remote_dev_db.db" --to-schema-datamodel ./src/db/prisma/schema.prisma --script --output ./src/db/migrations/[XXXX_MIGRATION_NAME].sql`

4. Apply in dev  
   `bun wrangler d1 migrations apply maison-retouche-dev --remote --env=dev`

5. Apply in prod  
   `bun wrangler d1 migrations apply maison-retouche-prod --remote --env=prod`
