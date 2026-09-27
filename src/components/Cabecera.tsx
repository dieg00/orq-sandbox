import Link from "next/link";

const enlaces = [{ href: "/", texto: "Inicio" }, { href: "/about", texto: "Acerca de" }];

export function Cabecera() {
  return (
    <header className="flex items-center justify-between border-b border-zinc-200 px-6 py-4">
      <Link href="/" className="font-bold">orq-sandbox</Link>
      <nav className="flex gap-4 text-sm font-medium">
        {enlaces.map((enlace) => (
          <Link key={enlace.href} href={enlace.href}>
            {enlace.texto}
          </Link>
        ))}
        <a
          href="https://github.com/dieg00/orq-sandbox"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </nav>
    </header>
  );
}
