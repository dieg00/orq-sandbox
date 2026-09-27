"use client";

import { useEffect, useRef, useState } from "react";

const DURACION_AVISO_MS = 2000;

export function BotonCopiar({ texto }: { texto: string }) {
  const [copiado, setCopiado] = useState(false);
  const temporizador = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => () => {
    if (temporizador.current) clearTimeout(temporizador.current);
  }, []);

  function copiar() {
    if (!navigator.clipboard) return;

    navigator.clipboard.writeText(texto).then(() => {
      if (temporizador.current) clearTimeout(temporizador.current);
      setCopiado(true);
      temporizador.current = setTimeout(() => setCopiado(false), DURACION_AVISO_MS);
    }).catch(() => {});
  }

  return (
    <button
      type="button"
      aria-label={`Copiar nota: ${texto}`}
      className="text-sm font-medium"
      onClick={copiar}
    >
      {copiado ? "Copiado" : "Copiar"}
    </button>
  );
}
