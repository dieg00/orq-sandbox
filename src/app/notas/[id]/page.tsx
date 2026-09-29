import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BotonCopiar } from "@/components/BotonCopiar";
import { Cabecera } from "@/components/Cabecera";
import { VolverInicio } from "@/components/VolverInicio";
import { notasDeEjemplo } from "@/lib/datos";
import { formatearFecha } from "@/lib/fechas";
import { buscarNota, sinArchivadas } from "@/lib/notas";

const notasConDetalle = sinArchivadas(notasDeEjemplo);

export const dynamicParams = false;

export function generateStaticParams() {
  return notasConDetalle.map((nota) => ({ id: String(nota.id) }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const nota = buscarNota(notasConDetalle, id);
  return nota ? { title: nota.titulo } : {};
}

export default async function NotaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const nota = buscarNota(notasConDetalle, id);
  if (!nota) notFound();

  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">{nota.titulo}</h1>
        {nota.fijada && <p className="mt-2 text-sm opacity-70">Fijada</p>}
        <dl className="mt-6 grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-sm">
          <dt>Creada</dt>
          <dd><time dateTime={nota.creadaEn}>{formatearFecha(nota.creadaEn)}</time></dd>
          <dt>Actualizada</dt>
          <dd><time dateTime={nota.actualizadaEn}>{formatearFecha(nota.actualizadaEn)}</time></dd>
        </dl>
        <div className="mt-6"><BotonCopiar texto={nota.titulo} /></div>
        <VolverInicio />
      </main>
    </>
  );
}
