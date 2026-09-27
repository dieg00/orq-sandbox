export function formatearFecha(iso: string): string {
  const fecha = new Date(iso);
  if (Number.isNaN(fecha.getTime())) {
    throw new RangeError(`Fecha no válida: ${iso}`);
  }

  const dia = String(fecha.getUTCDate()).padStart(2, "0");
  const mes = String(fecha.getUTCMonth() + 1).padStart(2, "0");
  const anio = String(fecha.getUTCFullYear());
  return `${dia}/${mes}/${anio}`;
}
