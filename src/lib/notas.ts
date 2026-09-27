export type Nota = {
  id: number;
  titulo: string;
  creadaEn: string;
  archivada: boolean;
};

export function resumir(texto: string, max = 40): string {
  const limpio = texto.trim().replace(/\s+/g, " ");
  if (limpio.length <= max) return limpio;
  return `${limpio.slice(0, max - 1).trimEnd()}…`;
}

export function ordenarPorFecha(notas: readonly Nota[]): Nota[] {
  return [...notas].sort((a, b) => b.creadaEn.localeCompare(a.creadaEn));
}

export function sinArchivadas(notas: readonly Nota[]): Nota[] {
  return notas.filter((nota) => !nota.archivada);
}
