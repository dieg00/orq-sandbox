# orq-sandbox

Repo de testeo de La Comparsa (el orquestador de agentes). Ver `AGENTS.md` para stack, comandos y convenciones.

```bash
pnpm install
supabase start      # Postgres local con la migración inicial y seed
pnpm dev
```

Gates: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.
