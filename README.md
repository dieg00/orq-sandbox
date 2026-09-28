# orq-sandbox

Repo de testeo de La Comparsa (el orquestador de agentes). Ver `AGENTS.md` para stack, comandos y convenciones.

```bash
pnpm install
supabase start      # Postgres local con la migración inicial y seed
pnpm dev
```

Gates: `pnpm typecheck && pnpm lint && pnpm test && pnpm build`.

## Variables de entorno

`NEXT_PUBLIC_BANNER_TEXT` es opcional. Si tiene texto, muestra un banner en la portada; si falta o solo contiene espacios, no se muestra. En producción se define en el proyecto de Vercel. Como la portada es estática, el valor se fija en el build y hay que volver a desplegar para cambiarlo.
