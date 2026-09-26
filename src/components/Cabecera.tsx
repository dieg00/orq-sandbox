import Link from "next/link";

const enlaces = [{ href: "/", texto: "Inicio" }];

export function Cabecera() {
  return (
    <header className="border-b border-zinc-200 px-6 py-4">
      <nav className="flex gap-4 text-sm font-medium">
        {enlaces.map((enlace) => (
          <Link key={enlace.href} href={enlace.href}>
            {enlace.texto}
          </Link>
        ))}
      </nav>
    </header>
  );
}
