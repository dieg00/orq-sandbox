export function Banner() {
  const texto = process.env.NEXT_PUBLIC_BANNER_TEXT?.trim();

  if (!texto) {
    return null;
  }

  return <aside aria-label="Aviso" className="mt-4 rounded border border-borde px-4 py-2 text-sm">{texto}</aside>;
}
