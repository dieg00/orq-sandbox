# orq-sandbox

Repo de testeo del orquestador (La Comparsa). App mínima de notas para ejercitar el ciclo completo: plan, ejecución, gates, revisión, PR, migraciones y merge.

## Stack

- Next.js 16 (App Router, `src/`), React 19, TypeScript estricto, Tailwind CSS 4.
- pnpm como gestor de paquetes. No uses npm ni yarn.
- Vitest + Testing Library (jsdom) para tests.
- Supabase local para la base de datos. Las migraciones viven en `supabase/migrations/`.

## Comandos

| Comando | Qué hace |
| --- | --- |
| `pnpm dev` | Servidor de desarrollo (usa el puerto de `PORT` si está definido) |
| `pnpm typecheck` | Genera los tipos de rutas y ejecuta `tsc --noEmit` |
| `pnpm lint` | ESLint |
| `pnpm test` | Vitest una vez |
| `pnpm build` | Build de producción |

Los cuatro gates son `typecheck`, `lint`, `test` y `build`, en ese orden. Una tarea no está terminada hasta que pasan los cuatro.

## Estructura

- `src/app/`: rutas. Cada página nueva lleva su test junto a ella (`page.test.tsx`).
- `src/components/`: componentes compartidos. `Cabecera.tsx` contiene la navegación: una página nueva que deba aparecer en el menú se añade a su lista `enlaces`.
- `src/lib/`: lógica sin React, con tests unitarios (`*.test.ts`).
- `supabase/migrations/`: migraciones SQL. `supabase/seed.sql`: datos de ejemplo.

## Convenciones

- Código, nombres y textos de la interfaz en español.
- Componentes como funciones con export nombrado; las páginas usan `export default`.
- Nada de fuentes ni recursos remotos en build (`next/font/google` incluido): el build debe funcionar sin red.
- Crear una migración nueva: `supabase migration new <nombre>`. Nunca edites una migración ya mergeada.

## Límites para agentes

- No hagas `git push`, no abras PRs ni hagas merge: eso lo hace el orquestrador.
- Nunca ejecutes `supabase db push`, `supabase link`, `vercel` ni nada que toque servicios remotos. Si hace falta, decláralo como acción de usuario.
- Solo existe `.env.local` con valores de desarrollo. No crees ni pidas claves de producción.
- `.agentes/` es de trabajo local del orquestrador y no se commitea.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Aprendizajes

- Los tests de páginas usan imports explícitos de `vitest` sin globals. Sin globals, Testing Library no hace `cleanup` automático: hay que usar un único `it` por archivo o llamar a `cleanup` en `afterEach`.
- jest-dom no está instalado: las aserciones se escriben con `toBeDefined()` y `toBe()`, no con `toBeInTheDocument()`.
- Cualquier página que incluya `<Cabecera />` repite los textos de la navegación. Las consultas del test deben ir por rol (`heading`, `link`) y no por `getByText`, que encontraría varias coincidencias.
- `pnpm build` (Turbopack) puede fallar dentro del sandbox del hacedor con `Operation not permitted`, porque intenta abrir un puerto al procesar `globals.css`. Es una limitación del entorno, no un fallo del código: el build hay que verificarlo fuera del sandbox.
- Dentro del sandbox del hacedor, `supabase migration new` falla con EPERM porque intenta escribir telemetría en `~/.supabase`. Se puede crear el archivo a mano con el formato `supabase/migrations/<YYYYMMDDHHMMSS>_<nombre>.sql`, con un timestamp posterior al de la última migración.
- Para lógica de fechas en `src/lib/`, usar getters `getUTC*` y no `toLocaleDateString`/`Intl`. Conviene incluir en los tests un caso con desfase horario explícito (p. ej. `-05:00`) que cambie de día en UTC, y ejecutarlos con otra zona horaria (`TZ=Asia/Tokyo pnpm test`) para detectar dependencias de la zona local.
