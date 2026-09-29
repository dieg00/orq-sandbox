import { Cabecera } from "@/components/Cabecera";
import { VolverInicio } from "@/components/VolverInicio";

export default function Version() {
  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">orq-sandbox · notas</h1>
        <VolverInicio />
      </main>
    </>
  );
}
