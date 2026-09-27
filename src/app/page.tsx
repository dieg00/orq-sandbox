import { Cabecera } from "@/components/Cabecera";
import { BotonCopiar } from "@/components/BotonCopiar";
import { ordenarPorFecha, resumir, sinArchivadas, textoContador, type Nota } from "@/lib/notas";

const notasDeEjemplo: Nota[] = [
  { id: 1, titulo: "Primera nota del sandbox", creadaEn: "2026-09-01T10:00:00Z", actualizadaEn: "2026-09-01T10:00:00Z", archivada: false, fijada: false },
  { id: 2, titulo: "Repo de testeo del orquestador", creadaEn: "2026-09-20T10:00:00Z", actualizadaEn: "2026-09-20T10:00:00Z", archivada: false, fijada: true },
  { id: 3, titulo: "Nota archivada de ejemplo", creadaEn: "2026-09-25T10:00:00Z", actualizadaEn: "2026-09-25T10:00:00Z", archivada: true, fijada: false },
];

export default function Home() {
  const notas = ordenarPorFecha(sinArchivadas(notasDeEjemplo), "ascendente");

  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Notas</h1>
        <p id="contador-notas" className="mt-2 text-sm opacity-70">
          {textoContador(notas.length)}
        </p>
        <ul aria-describedby="contador-notas" className="mt-6 space-y-2">
          {notas.map((nota) => (
            <li key={nota.id} className="flex items-center justify-between gap-2">
              <span>{resumir(nota.titulo)}</span>
              <BotonCopiar texto={nota.titulo} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
