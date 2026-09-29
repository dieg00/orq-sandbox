import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";
import { BotonCopiar } from "@/components/BotonCopiar";
import { Banner } from "@/components/Banner";
import { notasDeEjemplo } from "@/lib/datos";
import { fijadasPrimero, ordenarPorFecha, resumir, sinArchivadas, textoContador } from "@/lib/notas";

export default function Home() {
  const notas = fijadasPrimero(ordenarPorFecha(sinArchivadas(notasDeEjemplo), "ascendente"));

  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <Banner />
        <h1 className="text-2xl font-semibold">Notas</h1>
        <p id="contador-notas" className="mt-2 text-sm opacity-70">
          {textoContador(notas.length)}
        </p>
        <ul aria-describedby="contador-notas" className="mt-6 space-y-2">
          {notas.map((nota) => (
            <li key={nota.id} className="flex items-center justify-between gap-2">
              <span><Link href={`/notas/${nota.id}`} className="underline">{resumir(nota.titulo)}</Link></span>
              <BotonCopiar texto={nota.titulo} />
            </li>
          ))}
        </ul>
      </main>
    </>
  );
}
