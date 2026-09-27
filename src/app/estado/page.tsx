import Link from "next/link";
import { Cabecera } from "@/components/Cabecera";

export default function Estado() {
  return (
    <>
      <Cabecera />
      <main className="mx-auto max-w-2xl px-6 py-12">
        <h1 className="text-2xl font-semibold">Estado</h1>
        <p className="mt-4">Todo en orden</p>
        <p className="mt-4">
          <Link href="/" className="underline">Volver al inicio</Link>
        </p>
      </main>
    </>
  );
}
