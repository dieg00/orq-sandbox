export type Nota = {
  id: number;
  titulo: string;
  creadaEn: string;
  actualizadaEn: string;
  archivada: boolean;
  fijada: boolean;
};

export type OrdenFecha = "descendente" | "ascendente";

export function resumir(texto: string, max = 40): string {
  const limpio = texto.trim().replace(/\s+/g, " ");
  if (limpio.length <= max) return limpio;
  return `${limpio.slice(0, max - 1).trimEnd()}…`;
}

export function ordenarPorFecha(notas: readonly Nota[], orden: OrdenFecha = "descendente"): Nota[] {
  return [...notas].sort((a, b) =>
    orden === "descendente"
      ? b.creadaEn.localeCompare(a.creadaEn)
      : a.creadaEn.localeCompare(b.creadaEn),
  );
}

/**
 * Pone primero las notas fijadas y después el resto, conservando el orden de entrada
 * dentro de cada grupo. Se compone después de `ordenarPorFecha`.
 */
export function fijadasPrimero(notas: readonly Nota[]): Nota[] {
  return [...notas.filter((nota) => nota.fijada), ...notas.filter((nota) => !nota.fijada)];
}

export function sinArchivadas(notas: readonly Nota[]): Nota[] {
  return notas.filter((nota) => !nota.archivada);
}

/** Busca una nota por su id decimal positivo, sin ceros a la izquierda. */
export function buscarNota(notas: readonly Nota[], id: string): Nota | undefined {
  if (!/^[1-9]\d*$/.test(id)) return undefined;
  const numero = Number(id);
  return notas.find((nota) => nota.id === numero);
}

export function textoContador(cantidad: number): string {
  return cantidad === 1 ? "1 nota" : `${cantidad} notas`;
}
