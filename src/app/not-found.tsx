import { Cabecera } from "@/components/Cabecera";
import { VolverInicio } from "@/components/VolverInicio";

export default function NoEncontrada() {
  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Página no encontrada</h1>
        <p className="mt-4">La página que buscas no existe o se ha movido.</p>
        <VolverInicio />
      </main>
    </>
  );
}
