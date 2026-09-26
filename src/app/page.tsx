import { Cabecera } from "@/components/Cabecera";
import { ordenarPorFecha, resumir, type Nota } from "@/lib/notas";

const notasDeEjemplo: Nota[] = [
  { id: 1, titulo: "Primera nota del sandbox", creadaEn: "2026-09-01T10:00:00Z" },
  { id: 2, titulo: "Repo de testeo del orquestador", creadaEn: "2026-09-20T10:00:00Z" },
];

export default function Home() {
  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Notas</h1>
        <ul className="mt-6 space-y-2">
          {ordenarPorFecha(notasDeEjemplo).map((nota) => (
            <li key={nota.id}>{resumir(nota.titulo)}</li>
          ))}
        </ul>
      </main>
    </>
  );
}
