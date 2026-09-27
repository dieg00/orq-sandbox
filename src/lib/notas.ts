export type Nota = {
  id: number;
  titulo: string;
  creadaEn: string;
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

export function sinArchivadas(notas: readonly Nota[]): Nota[] {
  return notas.filter((nota) => !nota.archivada);
}

export function textoContador(cantidad: number): string {
  return cantidad === 1 ? "1 nota" : `${cantidad} notas`;
}
