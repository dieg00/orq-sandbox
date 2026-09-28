import Link from "next/link";

export function VolverInicio() {
  return (
    <p className="mt-4">
      <Link href="/" className="underline">Volver al inicio</Link>
    </p>
  );
}
