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
- Para probar componentes que dependen de la fecha, usa `vi.useFakeTimers({ toFake: ['Date'] })` + `vi.setSystemTime(...)` y restaura con `vi.useRealTimers()` en `afterEach`. Con `toFake: ['Date']` solo se falsea `Date` y no se bloquean `setTimeout` ni las promesas de Testing Library.
- Sin `cacheComponents` en `next.config.ts`, un componente de servidor puede usar `new Date()`: la página se sigue prerenderizando como estática y el valor queda fijado en el momento del build.
- Para comprobar el HTML prerenderizado, busca en `.next/server/app/<ruta>.html`. React inserta `<!-- -->` entre un texto y una expresión JSX contiguos, así que no hay que buscar la cadena completa de golpe.
- Los enlaces externos de la cabecera se escriben como `<a>` normal con `target="_blank" rel="noopener noreferrer"`, después del `enlaces.map(...)`. La lista `enlaces` y `next/link` son solo para rutas internas.
- Para comprobar el orden de la navegación en un test, usa `within(screen.getByRole("navigation")).getAllByRole("link")` y mira el primer o el último elemento.
- `src/components/Cabecera.test.tsx` ya existe y lo comparten las tareas que tocan la cabecera. Añade un `it` nuevo dentro del `describe("Cabecera")` existente, que ya llama a `cleanup` en `afterEach`, en lugar de crear el archivo. Si dos ramas lo crean a la vez, el rebase choca con un conflicto both added.
- La cabecera tiene dos enlaces a `/`: el nombre del sitio «orq-sandbox», fuera del `<nav>`, e «Inicio», dentro del `<nav>`. En los tests, busca los enlaces por nombre (`getByRole('link', { name })`) o con `within(screen.getByRole('navigation'))`, nunca por `href`.
- Para probar una función de ordenación, usa una entrada que no esté ya ordenada ni sea el inverso del resultado esperado (por ejemplo, ids [2, 3, 1]). Así el test falla si alguien implementa el orden invirtiendo el array con `.reverse()` o si la función devuelve la entrada sin tocar.
- `ordenarPorFecha(notas, orden)` acepta `"descendente"` (valor por defecto, la más reciente primero) o `"ascendente"`. Los parámetros de orden se nombran con una unión de cadenas en español y no con un booleano.
- Cuando dos ramas añaden aprendizajes al final de `AGENTS.md`, el rebase choca con un conflicto aunque ninguna borre nada. Se resuelve conservando las dos listas: primero las líneas de `main` y después las de la rama.
- El tema claro/oscuro se guarda en el atributo `data-tema` de `<html>`, que pone un script inline en el `<head>` del layout (`scriptTema` de `src/lib/tema.ts`). En el CSS, usa `border-borde`, `bg-background` y `text-foreground`, o `dark:`, que en Tailwind 4 está redefinido con `@custom-variant` para seguir a `data-tema` y no a prefers-color-scheme. No uses colores fijos tipo `border-zinc-200` en componentes nuevos.
- `SelectorTema` lee el tema del DOM con `useSyncExternalStore` y un `MutationObserver`. Como el observer notifica de forma asíncrona, en los tests el cambio de texto del botón se espera con `waitFor` o `findByRole`, no con una aserción síncrona justo después de `fireEvent.click`.
- Cualquier página que incluya `<Cabecera />` renderiza también el botón de tema («Tema oscuro» con localStorage vacío). Si un test busca botones por rol, tiene que contar con él.
- jsdom no implementa `window.matchMedia`. Para simular la preferencia del sistema, usa `vi.stubGlobal("matchMedia", vi.fn(() => ({ matches: true })))` y restaura en `afterEach` con `vi.unstubAllGlobals()`.
- Dentro del sandbox del hacedor también falla `pnpm dev` (`listen EPERM` al abrir el puerto), no solo `pnpm build`. Las comprobaciones visuales y de hidratación hay que hacerlas fuera del sandbox.
- Para probar un aviso temporal tras una promesa, usa `vi.useFakeTimers({ toFake: ["setTimeout", "clearTimeout"] })`, resuelve el clic con `await act(async () => { fireEvent.click(...); })` y avanza el tiempo con `act(() => { vi.advanceTimersByTime(...); })`. Con estos timers falsos no uses `waitFor` ni `findByRole`, porque Testing Library puede quedarse esperando.
- jsdom no implementa `navigator.clipboard`. Para simularlo, usa `Object.defineProperty(navigator, "clipboard", { value: { writeText: vi.fn().mockResolvedValue(undefined) }, configurable: true })`; con `value: undefined` pruebas que no haya portapapeles.
- Cuando haya varios botones con el mismo texto visible (uno por elemento de una lista), dales un `aria-label` que empiece por ese texto y lleve el elemento, como `Copiar nota: ${titulo}`. Así cada uno tiene un nombre accesible único y los tests pueden usar `getByRole("button", { name })`.
- Los botones que solo usan APIs del navegador van en un componente cliente propio (`"use client"`) que la página de servidor importa, como `BotonCopiar` y `SelectorTema`. La página no se convierte en cliente.
- Para comprobar en un test que un elemento va antes que otro en el DOM, usa `a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING` con `toBeTruthy()`. No hace falta jest-dom.
- `textoContador(n)` (`src/lib/notas.ts`) devuelve «1 nota» para 1 y «N notas» en el resto, incluido «0 notas». Úsalo para cualquier texto que cuente notas, en lugar de pluralizar a mano o con `Intl`.
- Para textos secundarios que deben seguir al tema claro/oscuro, usa `opacity-70` sobre el color heredado en lugar de un gris fijo tipo `text-zinc-500`.
- En la página de inicio, la lista visible de notas (sin archivar y ordenada) se calcula una sola vez en una variable `notas`, y el contador y la lista usan esa misma variable. El contador (`#contador-notas`) está enlazado al `<ul>` con `aria-describedby`.
- `getBy*` de Testing Library ya lanza un error si no encuentra el elemento. No añadas `expect(x).toBeDefined()` justo después: es una aserción que nunca falla. Úsala solo cuando el `getBy*` no se guarda en una variable.
- En la página de inicio, la lista visible de notas (sin archivar y ordenada) se calcula una sola vez en una variable `notas`. Todo lo que dependa de ella, como el contador o la propia lista, debe usar esa variable para que no diverjan.
- Al rebasar una rama que cambia la lista de la página de inicio sobre otra que cambia el `<li>` (por ejemplo, #23 con `BotonCopiar`), hay que combinar el marcado de `main` con la variable `notas` de la rama. No hay que elegir un lado del conflicto.
- Para mostrar la versión de la app, importa `package.json` por defecto (`import paquete from "../../package.json"`) en un componente de servidor y usa `paquete.version`. No lo importes con nombre (`import { version }`) ni desde un componente cliente: se metería el JSON entero en el bundle del navegador.
- En los tests que comprueban la versión mostrada, la versión va como literal (p. ej. «v0.1.0») y no importada de `package.json`. Al subir la versión hay que actualizar esos tests.
- Al añadir un campo obligatorio al tipo `Nota`, hay que actualizar todos sus literales: `notasDeEjemplo` en `src/lib/datos.ts` y los fixtures de `src/lib/notas.test.ts`. Si no, `pnpm typecheck` falla.
- Para que una fila del seed tenga un valor distinto del por defecto sin cambiar los ids generados, se saca a un `insert` propio con esa columna, en la misma posición. Así se hace en `supabase/seed.sql` con `archivada` y `fijada`, y las columnas nuevas llevan el mismo valor en el seed y en `notasDeEjemplo` de la portada.
- Una columna nueva de fecha en `notas` se rellena en el seed y en `notasDeEjemplo` con el mismo valor que `creada_en`/`creadaEn` de cada nota. Así los datos de ejemplo son fijos y el seed y la portada coinciden.
- La columna `actualizada_en` solo toma `now()` al insertar: no hay trigger que la actualice en un UPDATE (decisión de Diego en #27). Cuando se añada la edición de notas, habrá que crear el trigger `before update` en una migración aparte.
- Antes de elegir el timestamp de una migración creada a mano, mira `git ls-tree --name-only origin/main supabase/migrations/` y no la referencia local `main`, que puede estar desactualizada.
- `fijadasPrimero(notas)` (`src/lib/notas.ts`) es una partición estable: pone primero las fijadas y conserva el orden de entrada dentro de cada grupo, pero no ordena por fecha. Se aplica después de `ordenarPorFecha`. En la portada, `notas = fijadasPrimero(ordenarPorFecha(sinArchivadas(notasDeEjemplo), "ascendente"))`.
- Para probar una partición estable (p. ej. fijadas/no fijadas), usa una entrada con los grupos intercalados (ids [1 no, 2 sí, 3 no, 4 sí] → [2, 4, 1, 3]). Así el test falla si la función invierte el array, lo devuelve sin tocar o cambia el orden dentro de un grupo.
- Cuando `main` añade un campo obligatorio a `Nota` y la rama tiene fixtures nuevos, el rebase termina sin conflictos de git pero `pnpm typecheck` falla. Después de rebasar, hay que ejecutar `pnpm typecheck` y completar el campo en los literales nuevos de la rama con el mismo criterio que usa `main`.
- Los criterios de aceptación que piden ejecutar `vercel --prod` o cualquier otro comando remoto no los cumple ningún agente. Se pasan a acción de usuario, y la revisión los valora por el resultado (producción responde) y no por el comando. En este repo, el despliegue a producción se deja a la integración Git de Vercel al mergear en `main`.
- En el HTML prerenderizado (`.next/server/app/<ruta>.html`), un texto de la página aparece dos veces: en el marcado y en el payload RSC. Para comprobarlo, basta con que aparezca; no cuentes coincidencias.
- Los enlaces internos dentro del contenido de una página (no de la cabecera) usan `next/link` con `className="underline"` y ningún color fijo. En los tests se buscan por su nombre exacto (`getByRole("link", { name: "Volver al inicio" })`): como el nombre exacto no coincide con «Inicio», no chocan con los enlaces de la navegación que también apuntan a `/`.
- Para el enlace «Volver al inicio» en una página secundaria, usa el componente `VolverInicio` (`src/components/VolverInicio.tsx`) como último hijo de `<main>`. No repitas el `Link`. En el test de la página, busca el enlace con `getByRole("link", { name: "Volver al inicio" })` y comprueba que va detrás del contenido con `compareDocumentPosition`.
- Las variables `NEXT_PUBLIC_*` se leen con acceso literal (`process.env.NEXT_PUBLIC_X`), sin desestructurar `process.env` ni usar `process.env[nombre]`: Next solo sustituye el acceso literal en el build. En páginas estáticas, el valor se fija en el build y, para cambiarlo, hay que volver a desplegar.
- Para probar componentes que dependen de variables de entorno, usa `vi.stubEnv(nombre, valor)` en cada `it`, también `undefined` para el caso «sin variable», y llama a `vi.unstubAllEnvs()` en `afterEach`. Así el test no depende de lo que haya exportado en la shell.
- El banner de la portada (`Banner`, `src/components/Banner.tsx`) es un `<aside aria-label="Aviso">` y en los tests se busca con `getByRole("complementary", { name: "Aviso" })`. Si se añade otro `<aside>` a la portada, hay que darle otro `aria-label`.
- Un elemento que va antes del `<h1>` dentro de `<main>` se separa del título con margen inferior (`mb-*`), no con margen superior: `<main>` ya tiene padding arriba y el `<h1>` no tiene margen.
- Si una tarea es solo informativa (p. ej. «descríbeme el repo») y Diego elige «Solo respuesta, sin PR», el entregable es la descripción en el plan de la nota. El hacedor no crea ni modifica archivos, la rama queda sin diff contra `origin/main` y la tarea se cierra sin PR.
- Los datos de ejemplo de las notas (`notasDeEjemplo`) viven en `src/lib/datos.ts` y los comparten la portada y el detalle `/notas/[id]`. No vuelvas a definirlos dentro de una página.
- `/notas/[id]` se prerenderiza con `generateStaticParams` solo para las notas sin archivar y lleva `dynamicParams = false`. Las archivadas, los ids inexistentes o mal formados («01», «abc») dan 404 (decisión de Diego en #38). Para buscar una nota por id de la URL, usa `buscarNota(notas, id)` de `src/lib/notas.ts`, que solo acepta enteros positivos sin ceros a la izquierda.
- Las páginas `async` con `params` se prueban llamándolas directamente: `render(await Pagina({ params: Promise.resolve({ id: "2" }) }))`. Para eso, las props se tipan a mano como `{ params: Promise<{ id: string }> }`, no con `PageProps`. El caso 404 se comprueba con `await expect(Pagina(...)).rejects.toMatchObject({ digest: "NEXT_HTTP_ERROR_FALLBACK;404" })`.
- El layout define `title: { default: "orq-sandbox", template: "%s · orq-sandbox" }`. Una página que necesite título propio devuelve solo su parte (`{ title: nota.titulo }`) y la plantilla añade el sufijo. No concatenes «· orq-sandbox» a mano.
- `src/app/not-found.tsx` es el 404 propio de la app, con la cabecera, y sigue a `data-tema`. `notFound()` en cualquier ruta lo usa, así que no hace falta un `not-found.tsx` por segmento.
