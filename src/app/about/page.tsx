import { Cabecera } from "@/components/Cabecera";
import { VolverInicio } from "@/components/VolverInicio";

export default function AcercaDe() {
  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Acerca de</h1>
        <p className="mt-4">
          Esta app es el repo de testeo del orquestador (La Comparsa): una app mínima de notas para ejercitar el ciclo completo de plan, ejecución, revisión y merge.
        </p>
        <VolverInicio />
      </main>
    </>
  );
}
